import type { APIRoute } from "astro";
import { completeActivity } from "@/lib/progress/utils";
import type { CompleteActivityRequest } from "@/lib/progress/types";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const { supabase, session } = locals;

        if (!session?.user) {
            return new Response(
                JSON.stringify({ error: "Unauthorized" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        // Parse request body
        const body: CompleteActivityRequest = await request.json();
        const { activityId, score, metadata } = body;

        if (!activityId) {
            return new Response(
                JSON.stringify({ error: "activityId is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Update progress
        await completeActivity(supabase, session.user.id, activityId, score, metadata);

        return new Response(
            JSON.stringify({
                success: true,
                message: "Activity completed successfully",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("Error completing activity:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
