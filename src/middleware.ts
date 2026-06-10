import { defineMiddleware } from "astro:middleware";
import { getServerClient } from "./lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
    const maintenance = import.meta.env.PUBLIC_MAINTENANCE_MODE === 'true';

    // 1. Definimos qué rutas queremos proteger
    const isProtectedRoute = context.url.pathname.startsWith("/curso") ||
        context.url.pathname.startsWith("/telemetria") ||
        context.url.pathname.startsWith("/simulador");

    const supabase = getServerClient(context);

    // Obtener la sesión actual de Supabase
    const {
        data: { session },
    } = await supabase.auth.getSession();

    // Inyectar supabase y session en locals para que otras páginas los usen fácilmente
    context.locals.supabase = supabase;
    context.locals.session = session;

    // 2. Si es una ruta protegida, verificamos la sesión
    if (isProtectedRoute) {
        console.log(`[Middleware] Checking access to ${context.url.pathname}`);
        console.log(`[Middleware] Session present: ${!!session}`);

        // Si no existe la sesión, lo mandamos al login
        if (!session) {
            console.log(`[Middleware] Access denied - redirecting to /login`);
            return context.redirect("/login");
        }

        // Si estamos en modo mantenimiento, verificar rol de admin
        if (maintenance) {
            try {
                // Fetch the user's role from user_profile table
                const { data: profile, error } = await supabase
                    .from('user_profile')
                    .select('role')
                    .eq('user_id', session.user.id)
                    .single();

                if (error) {
                    console.error("[Middleware] Error fetching profile:", error);
                    return context.redirect("/login");
                }

                console.log(`[Middleware] User role: ${profile?.role}`);

                // Si no es admin, denegar acceso
                if (profile?.role !== 'admin') {
                    console.log(`[Middleware] Maintenance mode: Access denied for non-admin`);
                    return context.redirect("/");
                }
            } catch (error) {
                console.error("[Middleware] Error checking user role:", error);
                return context.redirect("/login");
            }
        }
    }

    // Si todo está bien o la ruta es pública, dejamos pasar
    return next();
});