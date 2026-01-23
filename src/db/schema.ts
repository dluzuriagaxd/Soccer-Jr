import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: integer("emailVerified", { mode: "boolean" }).notNull(),
    image: text("image"),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
    role: text("role").default("student"),
});

export const session = sqliteTable("session", {
    id: text("id").primaryKey(),
    expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId").notNull().references(() => user.id),
});

export const account = sqliteTable("account", {
    id: text("id").primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: text("userId").notNull().references(() => user.id),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    accessTokenExpiresAt: integer("accessTokenExpiresAt", { mode: "timestamp" }),
    refreshTokenExpiresAt: integer("refreshTokenExpiresAt", { mode: "timestamp" }),
    scope: text("scope"),
    password: text("password"),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }),
    updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

// Extended user profile information
export const userProfile = sqliteTable("user_profile", {
    userId: text("user_id").primaryKey().references(() => user.id),
    phoneNumber: text("phone_number"),
    organization: text("organization"),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

// ============================================================================
// FLEXIBLE ACTIVITY TRACKING SYSTEM
// Supports: lessons, quizzes, projects, assessments, and future activity types
// ============================================================================

// Activity types catalog (lesson, quiz, project, assessment, etc.)
export const activityTypes = sqliteTable("activity_types", {
    id: text("id").primaryKey(),
    name: text("name").notNull().unique(),
    displayName: text("display_name").notNull(),
    icon: text("icon"), // Emoji or icon name
    requiresCompletion: integer("requires_completion", { mode: "boolean" }).default(true),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

// Activities catalog (all course activities)
export const activities = sqliteTable("activities", {
    id: text("id").primaryKey(),
    typeId: text("type_id").notNull().references(() => activityTypes.id),
    slug: text("slug").notNull().unique(),
    moduleId: text("module_id"), // e.g., '01-introduccion'
    title: text("title").notNull(),
    description: text("description"),
    orderIndex: integer("order_index").notNull(), // Global order in course
    moduleOrder: integer("module_order"), // Order within module
    estimatedDurationMinutes: integer("estimated_duration_minutes"),
    points: integer("points").default(0), // Gamification points
    isRequired: integer("is_required", { mode: "boolean" }).default(true),
    prerequisites: text("prerequisites"), // JSON array of activity IDs
    metadata: text("metadata"), // JSON for type-specific data
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

// User progress for any activity type
export const userActivityProgress = sqliteTable("user_activity_progress", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => user.id),
    activityId: text("activity_id").notNull().references(() => activities.id),

    // General status
    status: text("status").notNull().default("not_started"), // 'not_started', 'in_progress', 'completed', 'failed'
    startedAt: integer("started_at", { mode: "timestamp" }),
    completedAt: integer("completed_at", { mode: "timestamp" }),
    lastVisitedAt: integer("last_visited_at", { mode: "timestamp" }).notNull(),

    // Progress tracking
    progressPercentage: integer("progress_percentage").default(0), // 0-100
    timeSpentSeconds: integer("time_spent_seconds").default(0),

    // Results (for quizzes/assessments)
    score: integer("score"), // Score obtained (can be decimal stored as int * 100)
    maxScore: integer("max_score"), // Maximum possible score
    attemptsCount: integer("attempts_count").default(0),

    // Additional data
    metadata: text("metadata"), // JSON for type-specific data
    notes: text("notes"), // Student notes

    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

// ============================================================================
// LEGACY TABLE (kept for backward compatibility during migration)
// TODO: Remove after migration to new system
// ============================================================================
export const lessonProgress = sqliteTable("lesson_progress", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => user.id),
    lessonSlug: text("lesson_slug").notNull(),
    completed: integer("completed", { mode: "boolean" }).default(false),
    completedAt: integer("completed_at", { mode: "timestamp" }),
    lastVisitedAt: integer("last_visited_at", { mode: "timestamp" }).notNull(),
});
