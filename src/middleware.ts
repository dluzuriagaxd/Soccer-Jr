import { defineMiddleware } from "astro:middleware";
import { getServerClient } from "./lib/supabase";
import { PUBLIC_MAINTENANCE_MODE } from "astro:env/client";

export const onRequest = defineMiddleware(async (context, next) => {
    const pathname = context.url.pathname;
    const maintenance = PUBLIC_MAINTENANCE_MODE;
    const supabase = getServerClient(context);

    // Fetch user and session
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    const { data: { session } } = await supabase.auth.getSession();

    context.locals.supabase = supabase;
    context.locals.session = session;

    // Determine admin role
    let isAdmin = false;
    if (user) {
        if (user.app_metadata?.role === 'admin') {
            isAdmin = true;
        } else if (user.app_metadata?.role === 'student') {
            isAdmin = false;
        } else {
            // Check public.user_profile as fallback
            try {
                const { data: profile } = await supabase
                    .from('user_profile')
                    .select('role')
                    .eq('user_id', user.id)
                    .single();
                isAdmin = profile?.role === 'admin';
            } catch (err) {
                console.error("[Middleware] Error checking admin role in DB:", err);
            }
        }
    }
    context.locals.isAdmin = isAdmin;

    // Define route checks
    const isCursoRoute = pathname.startsWith("/curso");
    const isTelemetriaRoute = pathname.startsWith("/telemetria");
    const isMaterialesRoute = pathname.startsWith("/materiales");
    const isRootRoute = pathname === "/";
    const isConstructionRoute = pathname === "/en-construccion";

    // Pages protected for guests (require login)
    const isProtectedRoute = isCursoRoute || isTelemetriaRoute || isMaterialesRoute;

    // 1. Redirect guests (not logged in) to login for protected routes
    if (isProtectedRoute && (!user || userError)) {
        console.log(`[Middleware] Guest access denied to ${pathname} - redirecting to /login`);
        return context.redirect("/login");
    }

    // 2. Redirect logged-in students (non-admins) to /en-construccion
    const isLoggedIn = !!user;
    if (isLoggedIn && !isAdmin) {
        // Students are ONLY allowed to access: /en-construccion, /simulador, /api, /login, /register
        const isAllowedForStudent = 
            isConstructionRoute || 
            pathname.startsWith("/simulador") || 
            pathname.startsWith("/api") || 
            pathname === "/login" || 
            pathname === "/register";

        if (!isAllowedForStudent) {
            console.log(`[Middleware] Student redirected from ${pathname} to /en-construccion`);
            return context.redirect("/en-construccion");
        }
    }

    // 3. Maintenance mode check for non-admins
    if (maintenance && !isAdmin) {
        if (isProtectedRoute || isRootRoute) {
            console.log(`[Middleware] Maintenance mode: Access denied - redirecting to /en-construccion`);
            return context.redirect("/en-construccion");
        }
    }

    // If authorized, continue
    return next();
});