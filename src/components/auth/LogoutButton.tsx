import { useState } from "react";
import { signOut, useSession } from "../../lib/auth-client";

export default function LogoutButton() {
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();

    // Solo mostrar si hay sesión activa
    if (!session) {
        return null;
    }

    const handleLogout = async () => {
        setLoading(true);

        try {
            await signOut({
                fetchOptions: {
                    onSuccess: () => {
                        window.location.href = "/";
                    },
                },
            });
        } catch (error) {
            console.error("[Logout] Error:", error);
            // Fallback: redirigir manualmente
            window.location.href = "/login";
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider font-mono"
        >
            {loading ? "..." : "Salir"}
        </button>
    );
}
