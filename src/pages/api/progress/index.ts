import type { APIRoute } from "astro";
import { auth } from "@/lib/auth";
import { getUserProgressSummary } from "@/lib/progress";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";

export const GET: APIRoute = async ({ request, locals }) => {
    try {
        // Initialize DB with D1 binding from locals
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

        // Get user's progress summary
        const summary = await getUserProgressSummary(db, session.user.id);

        return new Response(
            JSON.stringify(summary),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("Error fetching progress:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
