import type { APIRoute } from "astro";
import { auth } from "@/lib/auth";
import { updateProgress } from "@/lib/progress";
import type { UpdateProgressRequest } from "@/lib/progress/types";

export const POST: APIRoute = async ({ request }) => {
    try {
        // Check authentication
        const session = await auth.api.getSession({ headers: request.headers });

        if (!session?.user) {
            return new Response(
                JSON.stringify({ error: "Unauthorized" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        // Parse request body
        const body: UpdateProgressRequest = await request.json();
        const { activityId, progressPercentage, metadata, timeSpentSeconds } = body;

        if (!activityId) {
            return new Response(
                JSON.stringify({ error: "activityId is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Update progress
        await updateProgress(session.user.id, activityId, {
            progressPercentage,
            metadata,
            timeSpentSeconds,
            status: progressPercentage === 100 ? "completed" : "in_progress",
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: "Progress updated successfully",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("Error updating progress:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
