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

    try {
        return await auth(db).handler(context.request);
    } catch (error) {
        console.error("Auth Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};