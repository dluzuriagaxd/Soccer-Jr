export const prerender = false;

import { auth } from "../../../lib/auth";
import type { APIRoute } from "astro";

export const ALL: APIRoute = async (context) => {
    // 1. Extraemos la DB buscando en todas las ubicaciones posibles
    // Forzamos el tipado
    const locals = context.locals as any;

    // Intenta encontrar 'env' en multiple lugares
    const env = locals.runtime?.env || locals.env;

    // Diagnóstico simple si falla
    if (!env) {
        return new Response("Error: Cloudflare bindings (env) not found.", { status: 500 });
    }

    const db = env.DB;
    // Fallback: try to find secret in process.env if not in bindings (though on CF it should be in env)
    const secret = env.BETTER_AUTH_SECRET || import.meta.env.BETTER_AUTH_SECRET || "default_dev_secret_do_not_use";

    try {
        return await auth(db, secret).handler(context.request);
    } catch (error) {
        console.error("Auth Error details:", error);
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        // Return the actual error for debugging
        return new Response(JSON.stringify({ error: errorMessage, details: String(error) }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};