import type { APIRoute } from "astro";
import { auth } from "@/lib/auth";
import { getUserProgressSummary } from "@/lib/progress";

export const GET: APIRoute = async ({ request }) => {
    try {
        // Check authentication
        const session = await auth.api.getSession({ headers: request.headers });

        if (!session?.user) {
            return new Response(
                JSON.stringify({ error: "Unauthorized" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        // Get user's progress summary
        const summary = await getUserProgressSummary(session.user.id);

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
