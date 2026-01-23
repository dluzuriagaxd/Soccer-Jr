// ============================================================================
// TypeScript Types for Activity Tracking System
// ============================================================================

export type ActivityType = 'lesson' | 'quiz' | 'project' | 'assessment';

export type ActivityStatus = 'not_started' | 'in_progress' | 'completed' | 'failed';

// ============================================================================
// Activity Type Metadata
// ============================================================================

export interface LessonMetadata {
    hasVideo: boolean;
    videoCount?: number;
    hasCode: boolean;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    sectionsViewed?: string[];
    videoProgress?: Record<string, number>; // video ID -> percentage
}

export interface QuizMetadata {
    questionCount: number;
    passingScore: number;
    maxAttempts: number;
    timeLimit?: number; // seconds
    attempts?: QuizAttempt[];
    bestScore?: number;
}

export interface ProjectMetadata {
    requiresSubmission: boolean;
    submissionType?: 'github' | 'file' | 'url';
    rubricUrl?: string;
    submissionUrl?: string;
    submittedAt?: string;
    feedback?: string;
    grade?: string;
}

export interface AssessmentMetadata {
    questionCount: number;
    passingScore: number;
    timeLimit?: number;
    proctored?: boolean;
}

export type ActivityMetadata =
    | LessonMetadata
    | QuizMetadata
    | ProjectMetadata
    | AssessmentMetadata;

// ============================================================================
// Quiz Types
// ============================================================================

export interface QuizAttempt {
    attemptNumber: number;
    score: number;
    timestamp: string;
    answers: QuizAnswer[];
    timeSpent?: number;
}

export interface QuizAnswer {
    questionId: string;
    answer: string | string[]; // Single or multiple choice
    isCorrect: boolean;
    pointsEarned: number;
}

// ============================================================================
// Database Record Types
// ============================================================================

export interface ActivityTypeRecord {
    id: string;
    name: ActivityType;
    displayName: string;
    icon?: string;
    requiresCompletion: boolean;
    createdAt: Date;
}

export interface ActivityRecord {
    id: string;
    typeId: string;
    slug: string;
    moduleId?: string;
    title: string;
    description?: string;
    orderIndex: number;
    moduleOrder?: number;
    estimatedDurationMinutes?: number;
    points: number;
    isRequired: boolean;
    prerequisites?: string; // JSON string
    metadata?: string; // JSON string
    createdAt: Date;
    updatedAt: Date;
}

export interface UserActivityProgressRecord {
    id: string;
    userId: string;
    activityId: string;
    status: ActivityStatus;
    startedAt?: Date;
    completedAt?: Date;
    lastVisitedAt: Date;
    progressPercentage: number;
    timeSpentSeconds: number;
    score?: number;
    maxScore?: number;
    attemptsCount: number;
    metadata?: string; // JSON string
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

// ============================================================================
// API Request/Response Types
// ============================================================================

export interface StartActivityRequest {
    activityId: string;
    activityType?: ActivityType; // Optional for validation
}

export interface UpdateProgressRequest {
    activityId: string;
    progressPercentage?: number;
    metadata?: ActivityMetadata;
    timeSpentSeconds?: number;
}

export interface CompleteActivityRequest {
    activityId: string;
    score?: number;
    metadata?: ActivityMetadata;
}

export interface SubmitQuizRequest {
    quizId: string;
    answers: Array<{
        questionId: string;
        answer: string | string[];
    }>;
}

// ============================================================================
// Progress Summary Types
// ============================================================================

export interface OverallProgress {
    totalActivities: number;
    completedActivities: number;
    percentageComplete: number;
    totalPoints: number;
    earnedPoints: number;
}

export interface ProgressByType {
    total: number;
    completed: number;
    inProgress: number;
    notStarted: number;
}

export interface UserProgressSummary {
    overall: OverallProgress;
    byType: Record<ActivityType, ProgressByType>;
    activities: ActivityWithProgress[];
    recentActivity: ActivityWithProgress[];
    nextRecommended?: ActivityWithProgress;
}

export interface ActivityWithProgress {
    activity: ActivityRecord;
    progress?: UserActivityProgressRecord;
    type: ActivityTypeRecord;
}

// ============================================================================
// Utility Types
// ============================================================================

export interface ActivityPrerequisites {
    activityIds: string[];
    allRequired: boolean; // true = all must be completed, false = any one
}

export interface ProgressUpdate {
    activityId: string;
    userId: string;
    updates: Partial<UserActivityProgressRecord>;
}

// ============================================================================
// Constants
// ============================================================================

export const ACTIVITY_TYPE_CONFIG = {
    lesson: {
        id: 'lesson',
        name: 'lesson' as const,
        displayName: 'Lección',
        icon: '📖',
        defaultPoints: 10,
    },
    quiz: {
        id: 'quiz',
        name: 'quiz' as const,
        displayName: 'Quiz',
        icon: '❓',
        defaultPoints: 30,
    },
    project: {
        id: 'project',
        name: 'project' as const,
        displayName: 'Proyecto',
        icon: '🛠️',
        defaultPoints: 50,
    },
    assessment: {
        id: 'assessment',
        name: 'assessment' as const,
        displayName: 'Evaluación',
        icon: '📝',
        defaultPoints: 100,
    },
} as const;

export const POINTS_CONFIG = {
    lesson: {
        completion: 10,
        firstTime: 5,
    },
    quiz: {
        perfect: 50,
        passing: 30,
        attempt: 5,
    },
    project: {
        submitted: 20,
        gradeA: 100,
        gradeB: 75,
        gradeC: 50,
    },
    assessment: {
        perfect: 150,
        passing: 100,
    },
} as const;
