-- Migration: Add user profile and lesson progress tables
-- Created: 2026-01-20

CREATE TABLE IF NOT EXISTS user_profile (
    user_id TEXT PRIMARY KEY REFERENCES user(id),
    phone_number TEXT,
    organization TEXT,
    updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS lesson_progress (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    lesson_slug TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    completed_at INTEGER,
    last_visited_at INTEGER NOT NULL
);

-- Index for faster queries on lesson progress
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_slug ON lesson_progress(lesson_slug);
