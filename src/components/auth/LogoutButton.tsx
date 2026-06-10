import { useState, useEffect } from "react";
import { getBrowserClient } from "../../lib/supabase";

export default function LogoutButton() {
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState<any>(null);
    const [isPending, setIsPending] = useState(true);

    const supabase = getBrowserClient();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setIsPending(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, [supabase.auth]);

    // If loading session state, show a small loader or placeholder
    if (isPending) {
        return <div className="animate-pulse h-8 w-16 bg-white/10 rounded-lg"></div>;
    }

    // If no session, show Login button
    if (!session) {
        return (
            <a
                href="/login"
                className="inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 bg-brand-blue/10 text-brand-blue border border-brand-blue/20 hover:bg-brand-blue/20 hover:text-white active:scale-95 uppercase tracking-wider font-mono"
            >
                Entrar
            </a>
        );
    }

    const handleLogout = async () => {
        setLoading(true);

        try {
            await supabase.auth.signOut();
            window.location.href = "/";
        } catch (error) {
            console.error("[Logout] Error:", error);
            // Fallback: redirigir manualmente
            window.location.href = "/login";
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={handleLogout}
                disabled={loading}
                className="px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider font-mono"
            >
                {loading ? "..." : "Salir"}
            </button>
            {/* Debug Info for User */}
            {/* <span className="text-[9px] text-white/20 font-mono">User: {session.user.email}</span> */}
        </div>
    );
}
