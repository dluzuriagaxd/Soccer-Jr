import type { APIRoute } from "astro";
import { auth } from "@/lib/auth";
import { completeActivity } from "@/lib/progress";
import type { CompleteActivityRequest } from "@/lib/progress/types";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        // Initialize DB with D1 binding from locals
        // Casting to any to avoid "Property 'env' does not exist" type error
        const runtime = locals.runtime as any;
        const db = drizzle(runtime.env.DB, { schema });

        // Check authentication
        const betterAuth = auth(runtime.env.DB, import.meta.env.BETTER_AUTH_SECRET);
        const session = await betterAuth.api.getSession({ headers: request.headers });

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

        // Complete the activity
        await completeActivity(db, session.user.id, activityId, score, metadata);

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
