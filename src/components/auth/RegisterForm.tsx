import { useState } from "react";
import { getBrowserClient } from "../../lib/supabase";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const supabase = getBrowserClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        console.log("Submitting registration for:", email);

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: name,
                    }
                }
            });

            if (signUpError) {
                console.error("Registration error:", signUpError);
                setError(signUpError.message || "Unknown error during registration");
                setLoading(false);
            } else {
                console.log("Registration success!");
                setLoading(false);
                setSuccess(true);
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            setError("An unexpected error occurred. Please try again.");
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="w-full max-w-md p-8 rounded-xl bg-[#0a0a0a] border border-green-500/30 shadow-[0_0_50px_-12px_rgba(34,197,94,0.1)] text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Registration Complete</h2>
                <p className="text-white/50 text-sm mb-6">Redirecting to login portal...</p>
                <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                    <div className="bg-green-500 h-full animate-[width_2s_ease-out_forwards]" style={{ width: '0%' }}></div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-md p-8 rounded-xl bg-[#0a0a0a] border border-white/10 shadow-[0_0_50px_-12px_rgba(59,130,246,0.1)]">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                    <span className="text-brand-blue">OPERATOR</span> REGISTRY
                </h2>
                <p className="mt-2 text-sm text-white/40 font-mono tracking-wide uppercase">
                    Create new access credentials
                </p>
            </div>

            <div className="space-y-6">
                {error && (
                    <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-900/50 rounded font-mono break-words">
                        [ERROR] {error}
                    </div>
                )}

                <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-bold text-white/50 uppercase tracking-widest font-mono">
                        Full Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue text-white placeholder-white/20 outline-none transition-all font-mono text-sm"
                        placeholder="John Doe"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-bold text-white/50 uppercase tracking-widest font-mono">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue text-white placeholder-white/20 outline-none transition-all font-mono text-sm"
                        placeholder="operator@lfr.system"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="block text-xs font-bold text-white/50 uppercase tracking-widest font-mono">
                        Set Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue text-white placeholder-white/20 outline-none transition-all font-mono text-sm"
                        placeholder="Min 8 characters"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-3 px-4 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-lg transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                >
                    {loading ? (
                        <span className="animate-pulse">Processing...</span>
                    ) : (
                        "Register Operator"
                    )}
                </button>

                <div className="text-center pt-4 border-t border-white/5">
                    <a href="/login" className="text-xs text-brand-orange hover:text-brand-orange/80 font-mono transition-colors">
                        [RETURN TO LOGIN]
                    </a>
                </div>
            </div>
        </div>
    );
}
