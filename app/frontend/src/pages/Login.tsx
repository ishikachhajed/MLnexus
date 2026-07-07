import { useState } from "react";
import CustomToast from "../components/CustomToast";
import { useToastState } from "../hooks/useToastState";
import { Link, useNavigate } from "react-router-dom";
import { api, setAuth } from "../utils/api";

export default function Login({ onLogin }: { onLogin: () => void }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { toast, showToast, setOpen } = useToastState();

    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const data = await api("/auth/login", {
                method: "POST",
                body: JSON.stringify({ username, password }),
            });
            setAuth(data.token, data.user);
            onLogin();
            navigate("/explore");
        } catch (err: unknown) {
            showToast({
                title: "Login failed",
                message: (err as Error).message,
                variant: "error",
            });
        }
    };
    
    return (
        <div className="max-w-md w-full mx-auto mt-16 px-6">
            <div className="bg-black border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(236,72,153,0.1)]">
                <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-400">
                    Welcome Back
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2.5 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                            required
                        />
                    </div>
                    <div className="text-center">
                        <Link
                            to="/forgot"
                            className="text-sm text-pink-400 hover:text-pink-300"
                        >
                            Forgot username or password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-lg shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all mt-6"
                    >
                        Login
                    </button>
                    <div className="text-center text-slate-400 text-sm mt-8">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-pink-400 hover:text-pink-300 font-medium transition-colors"
                        >
                            Register
                        </Link>
                    </div>
                </form>
            </div>
            <CustomToast toast={toast} onOpenChange={setOpen} />
        </div>
    );
}
