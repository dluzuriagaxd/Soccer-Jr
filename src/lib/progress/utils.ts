import { drizzle } from "drizzle-orm/libsql";
import { eq, and, desc } from "drizzle-orm";
import { turso } from "@/db/turso";
import {
    activities,
    userActivityProgress,
    activityTypes
} from "@/db/schema";
import type {
    ActivityRecord,
    UserActivityProgressRecord,
    ActivityStatus,
    ActivityMetadata,
    UserProgressSummary,
    OverallProgress,
    ProgressByType,
    ActivityWithProgress,
} from "./types";

const db = drizzle(turso);

// ============================================================================
// Core Progress Functions
// ============================================================================

/**
 * Get or create progress record for a user and activity
 */
export async function getOrCreateProgress(
    userId: string,
    activityId: string
): Promise<UserActivityProgressRecord> {
    const existing = await db
        .select()
        .from(userActivityProgress)
        .where(
            and(
                eq(userActivityProgress.userId, userId),
                eq(userActivityProgress.activityId, activityId)
            )
        )
        .get();

    if (existing) {
        return existing as UserActivityProgressRecord;
    }

    // Create new progress record
    const newProgress = {
        id: crypto.randomUUID(),
        userId,
        activityId,
        status: "not_started" as ActivityStatus,
        lastVisitedAt: new Date(),
        progressPercentage: 0,
        timeSpentSeconds: 0,
        attemptsCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    await db.insert(userActivityProgress).values(newProgress);

    return newProgress as UserActivityProgressRecord;
}

/**
 * Update progress for an activity
 */
export async function updateProgress(
    userId: string,
    activityId: string,
    updates: {
        status?: ActivityStatus;
        progressPercentage?: number;
        timeSpentSeconds?: number;
        score?: number;
        maxScore?: number;
        metadata?: ActivityMetadata;
        notes?: string;
    }
): Promise<void> {
    const progress = await getOrCreateProgress(userId, activityId);

    const updateData: any = {
        ...updates,
        lastVisitedAt: new Date(),
        updatedAt: new Date(),
    };

    // Convert metadata to JSON string if provided
    if (updates.metadata) {
        updateData.metadata = JSON.stringify(updates.metadata);
    }

    // Set timestamps based on status
    if (updates.status === "in_progress" && !progress.startedAt) {
        updateData.startedAt = new Date();
    }
    if (updates.status === "completed" && !progress.completedAt) {
        updateData.completedAt = new Date();
        updateData.progressPercentage = 100;
    }

    await db
        .update(userActivityProgress)
        .set(updateData)
        .where(eq(userActivityProgress.id, progress.id));
}

/**
 * Mark activity as completed
 */
export async function completeActivity(
    userId: string,
    activityId: string,
    score?: number,
    metadata?: ActivityMetadata
): Promise<void> {
    await updateProgress(userId, activityId, {
        status: "completed",
        progressPercentage: 100,
        score,
        metadata,
    });
}

/**
 * Register a visit to an activity (auto-updates lastVisitedAt)
 */
export async function registerVisit(
    userId: string,
    activityId: string
): Promise<void> {
    const progress = await getOrCreateProgress(userId, activityId);

    // If not started, mark as in_progress
    if (progress.status === "not_started") {
        await updateProgress(userId, activityId, {
            status: "in_progress",
        });
    } else {
        // Just update lastVisitedAt
        await db
            .update(userActivityProgress)
            .set({
                lastVisitedAt: new Date(),
                updatedAt: new Date(),
            })
            .where(eq(userActivityProgress.id, progress.id));
    }
}

// ============================================================================
// Query Functions
// ============================================================================

/**
 * Get user's progress for a specific activity
 */
export async function getUserActivityProgress(
    userId: string,
    activityId: string
): Promise<UserActivityProgressRecord | null> {
    const progress = await db
        .select()
        .from(userActivityProgress)
        .where(
            and(
                eq(userActivityProgress.userId, userId),
                eq(userActivityProgress.activityId, activityId)
            )
        )
        .get();

    return progress as UserActivityProgressRecord | null;
}

/**
 * Get all user's progress
 */
export async function getAllUserProgress(
    userId: string
): Promise<UserActivityProgressRecord[]> {
    const progress = await db
        .select()
        .from(userActivityProgress)
        .where(eq(userActivityProgress.userId, userId))
        .all();

    return progress as UserActivityProgressRecord[];
}

/**
 * Get user's progress summary
 */
export async function getUserProgressSummary(
    userId: string
): Promise<UserProgressSummary> {
    // Get all activities
    const allActivities = await db.select().from(activities).all();

    // Get all user progress
    const allProgress = await getAllUserProgress(userId);

    // Get all activity types
    const allTypes = await db.select().from(activityTypes).all();

    // Create progress map
    const progressMap = new Map(
        allProgress.map(p => [p.activityId, p as UserActivityProgressRecord])
    );

    // Create type map
    const typeMap = new Map(allTypes.map(t => [t.id, t]));

    // Calculate overall progress
    const completedCount = allProgress.filter(p => p.status === "completed").length;
    const totalPoints = allActivities.reduce((sum, a) => sum + (a.points || 0), 0);
    const earnedPoints = allProgress
        .filter(p => p.status === "completed")
        .reduce((sum, p) => {
            const activity = allActivities.find(a => a.id === p.activityId);
            return sum + (activity?.points || 0);
        }, 0);

    const overall: OverallProgress = {
        totalActivities: allActivities.length,
        completedActivities: completedCount,
        percentageComplete: allActivities.length > 0
            ? Math.round((completedCount / allActivities.length) * 100)
            : 0,
        totalPoints,
        earnedPoints,
    };

    // Calculate progress by type
    const byType: Record<string, ProgressByType> = {};

    for (const type of allTypes) {
        const activitiesOfType = allActivities.filter(a => a.typeId === type.id);
        const progressOfType = allProgress.filter(p => {
            const activity = allActivities.find(a => a.id === p.activityId);
            return activity?.typeId === type.id;
        });

        byType[type.name] = {
            total: activitiesOfType.length,
            completed: progressOfType.filter(p => p.status === "completed").length,
            inProgress: progressOfType.filter(p => p.status === "in_progress").length,
            notStarted: activitiesOfType.length - progressOfType.length,
        };
    }

    // Create activities with progress
    const activitiesWithProgress: ActivityWithProgress[] = allActivities.map(activity => ({
        activity: activity as ActivityRecord,
        progress: progressMap.get(activity.id),
        type: typeMap.get(activity.typeId)!,
    }));

    // Get recent activity (last 5 visited)
    const recentActivity = activitiesWithProgress
        .filter(a => a.progress)
        .sort((a, b) => {
            const aTime = a.progress!.lastVisitedAt.getTime();
            const bTime = b.progress!.lastVisitedAt.getTime();
            return bTime - aTime;
        })
        .slice(0, 5);

    // Get next recommended (first incomplete required activity)
    const nextRecommended = activitiesWithProgress
        .filter(a => a.activity.isRequired && (!a.progress || a.progress.status !== "completed"))
        .sort((a, b) => a.activity.orderIndex - b.activity.orderIndex)[0];

    return {
        overall,
        byType: byType as Record<any, ProgressByType>,
        activities: activitiesWithProgress,
        recentActivity,
        nextRecommended,
    };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if prerequisites are met for an activity
 */
export async function checkPrerequisites(
    userId: string,
    activityId: string
): Promise<{ met: boolean; missing: string[] }> {
    const activity = await db
        .select()
        .from(activities)
        .where(eq(activities.id, activityId))
        .get();

    if (!activity || !activity.prerequisites) {
        return { met: true, missing: [] };
    }

    const prerequisiteIds: string[] = JSON.parse(activity.prerequisites);
    const missing: string[] = [];

    for (const prereqId of prerequisiteIds) {
        const progress = await getUserActivityProgress(userId, prereqId);
        if (!progress || progress.status !== "completed") {
            missing.push(prereqId);
        }
    }

    return {
        met: missing.length === 0,
        missing,
    };
}

/**
 * Calculate points earned for completing an activity
 */
export function calculatePoints(
    activityType: string,
    score?: number,
    maxScore?: number
): number {
    // Base points from activity
    let points = 0;

    if (activityType === "lesson") {
        points = 10; // Base points for lesson
    } else if (activityType === "quiz" && score !== undefined && maxScore !== undefined) {
        const percentage = (score / maxScore) * 100;
        if (percentage === 100) {
            points = 50; // Perfect score
        } else if (percentage >= 70) {
            points = 30; // Passing score
        } else {
            points = 5; // Attempt
        }
    } else if (activityType === "project") {
        points = 50; // Base for project submission
    }

    return points;
}

/**
 * Parse metadata from JSON string
 */
export function parseMetadata<T = ActivityMetadata>(
    metadataString?: string | null
): T | null {
    if (!metadataString) return null;
    try {
        return JSON.parse(metadataString) as T;
    } catch {
        return null;
    }
}
