import type { SupabaseClient } from "@supabase/supabase-js";
import type {
    ActivityRecord,
    UserActivityProgressRecord,
    ActivityStatus,
    ActivityMetadata,
    UserProgressSummary,
    OverallProgress,
    ProgressByType,
    ActivityWithProgress,
    ActivityTypeRecord
} from "./types";

// ============================================================================
// Core Progress Functions
// ============================================================================

/**
 * Get or create progress record for a user and activity
 */
export async function getOrCreateProgress(
    supabase: SupabaseClient,
    userId: string,
    activityId: string
): Promise<UserActivityProgressRecord> {
    // 1. Try to fetch existing
    const { data: existing, error: fetchError } = await supabase
        .from('user_activity_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('activity_id', activityId)
        .single();

    if (existing) {
        return mapToCamelCase(existing) as UserActivityProgressRecord;
    }

    // 2. If not found, create new progress record
    const { data: newProgress, error: insertError } = await supabase
        .from('user_activity_progress')
        .insert({
            user_id: userId,
            activity_id: activityId,
            status: "not_started",
            last_visited_at: new Date().toISOString(),
            progress_percentage: 0,
            time_spent_seconds: 0,
            attempts_count: 0,
        })
        .select()
        .single();

    if (insertError) {
        throw new Error(`Failed to create progress: ${insertError.message}`);
    }

    return mapToCamelCase(newProgress) as UserActivityProgressRecord;
}

/**
 * Update progress for an activity
 */
export async function updateProgress(
    supabase: SupabaseClient,
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
    const progress = await getOrCreateProgress(supabase, userId, activityId);

    const updateData: any = {
        last_visited_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };

    if (updates.status) updateData.status = updates.status;
    if (updates.progressPercentage !== undefined) updateData.progress_percentage = updates.progressPercentage;
    if (updates.timeSpentSeconds !== undefined) updateData.time_spent_seconds = updates.timeSpentSeconds;
    if (updates.score !== undefined) updateData.score = updates.score;
    if (updates.maxScore !== undefined) updateData.max_score = updates.maxScore;
    if (updates.notes !== undefined) updateData.notes = updates.notes;

    // Convert metadata to JSON string if provided
    if (updates.metadata) {
        updateData.metadata = JSON.stringify(updates.metadata);
    }

    // Set timestamps based on status
    if (updates.status === "in_progress" && !progress.startedAt) {
        updateData.started_at = new Date().toISOString();
    }
    if (updates.status === "completed" && !progress.completedAt) {
        updateData.completed_at = new Date().toISOString();
        updateData.progress_percentage = 100;
    }

    await supabase
        .from('user_activity_progress')
        .update(updateData)
        .eq('id', progress.id);
}

/**
 * Mark activity as completed
 */
export async function completeActivity(
    supabase: SupabaseClient,
    userId: string,
    activityId: string,
    score?: number,
    metadata?: ActivityMetadata
): Promise<void> {
    await updateProgress(supabase, userId, activityId, {
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
    supabase: SupabaseClient,
    userId: string,
    activityId: string
): Promise<void> {
    const progress = await getOrCreateProgress(supabase, userId, activityId);

    // If not started, mark as in_progress
    if (progress.status === "not_started") {
        await updateProgress(supabase, userId, activityId, {
            status: "in_progress",
        });
    } else {
        // Just update lastVisitedAt
        await supabase
            .from('user_activity_progress')
            .update({
                last_visited_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .eq('id', progress.id);
    }
}

// ============================================================================
// Query Functions
// ============================================================================

/**
 * Get user's progress for a specific activity
 */
export async function getUserActivityProgress(
    supabase: SupabaseClient,
    userId: string,
    activityId: string
): Promise<UserActivityProgressRecord | null> {
    const { data: progress } = await supabase
        .from('user_activity_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('activity_id', activityId)
        .single();

    return progress ? mapToCamelCase(progress) as UserActivityProgressRecord : null;
}

/**
 * Get all user's progress
 */
export async function getAllUserProgress(
    supabase: SupabaseClient,
    userId: string
): Promise<UserActivityProgressRecord[]> {
    const { data: progress } = await supabase
        .from('user_activity_progress')
        .select('*')
        .eq('user_id', userId);

    return (progress || []).map(mapToCamelCase) as UserActivityProgressRecord[];
}

/**
 * Get user's progress summary
 */
export async function getUserProgressSummary(
    supabase: SupabaseClient,
    userId: string
): Promise<UserProgressSummary> {
    // Fetch all required data in parallel
    const [
        { data: allActivitiesData },
        { data: allProgressData },
        { data: allTypesData }
    ] = await Promise.all([
        supabase.from('activities').select('*'),
        supabase.from('user_activity_progress').select('*').eq('user_id', userId),
        supabase.from('activity_types').select('*')
    ]);

    const allActivities = (allActivitiesData || []).map(mapToCamelCase) as ActivityRecord[];
    const allProgress = (allProgressData || []).map(mapToCamelCase) as UserActivityProgressRecord[];
    const allTypes = (allTypesData || []).map(mapToCamelCase) as ActivityTypeRecord[];

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
    const activitiesWithProgress: ActivityWithProgress[] = allActivities.map(activity => {
        const activityType = typeMap.get(activity.typeId)!;
        return {
            activity: activity,
            progress: progressMap.get(activity.id),
            type: {
                ...activityType,
                name: activityType.name as any,
                icon: activityType.icon ?? undefined
            }
        };
    });

    // Get recent activity (last 5 visited)
    const recentActivity = activitiesWithProgress
        .filter(a => a.progress && a.progress.lastVisitedAt)
        .sort((a, b) => {
            const aTime = new Date(a.progress!.lastVisitedAt).getTime();
            const bTime = new Date(b.progress!.lastVisitedAt).getTime();
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

/**
 * Check if prerequisites are met for an activity
 */
export async function checkPrerequisites(
    supabase: SupabaseClient,
    userId: string,
    activityId: string
): Promise<{ met: boolean; missing: string[] }> {
    const { data: activity } = await supabase
        .from('activities')
        .select('*')
        .eq('id', activityId)
        .single();

    if (!activity || !activity.prerequisites) {
        return { met: true, missing: [] };
    }

    const prerequisiteIds: string[] = JSON.parse(activity.prerequisites);
    const missing: string[] = [];

    for (const prereqId of prerequisiteIds) {
        const progress = await getUserActivityProgress(supabase, userId, prereqId);
        if (!progress || progress.status !== "completed") {
            missing.push(prereqId);
        }
    }

    return {
        met: missing.length === 0,
        missing,
    };
}

// Helper to convert snake_case DB columns to camelCase for TS types
function mapToCamelCase(obj: any): any {
    if (!obj) return null;
    const newObj: any = {};
    for (const key in obj) {
        const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        newObj[camelKey] = obj[key];
    }
    return newObj;
}
