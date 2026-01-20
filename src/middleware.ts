import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    // 1. Definimos qué rutas queremos proteger
    const isProtectedRoute = context.url.pathname.startsWith("/curso") ||
        context.url.pathname.startsWith("/telemetria");

    // 2. Si es una ruta protegida, revisamos la "Session Cookie"
    if (isProtectedRoute) {
        // Buscamos la cookie que crea Better Auth
        const sessionCookie = context.cookies.get("better-auth.session_token");

        console.log(`[Middleware] Checking access to ${context.url.pathname}`);
        console.log(`[Middleware] Session Cookie present: ${!!sessionCookie?.value}`);
        if (sessionCookie) {
            console.log(`[Middleware] Cookie value (partial): ${sessionCookie.value.substring(0, 10)}...`);
        }

        // Si no existe la cookie, lo mandamos al login
        if (!sessionCookie) {
            console.log(`[Middleware] Access denied - redirecting to /login`);
            return context.redirect("/login");
        }
    }

    // Si todo está bien o la ruta es pública (como el Index), dejamos pasar
    return next();
});