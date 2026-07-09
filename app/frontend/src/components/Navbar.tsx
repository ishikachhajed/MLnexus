import { useState } from "react";
import { Menu, X } from "lucide-react";
import * as Avatar from "@radix-ui/react-avatar";
import { getToken } from "../utils/api";
import type { User } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

function Navbar({
    user,
    onLogout,
}: {
    user: User | null;
    onLogout: () => void;
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [avatarOpen, setAvatarOpen] = useState(false);
    const navigate = useNavigate();

    const isAuthenticated = Boolean(user && getToken());

    const handleLogout = () => {
        onLogout();
        navigate("/");
        setMenuOpen(false);
        setAvatarOpen(false);
    };

    return (
        <>
            {menuOpen ? (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={() => setMenuOpen(false)}
                />
            ) : null}
            <nav
                className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md"
                onClick={() => {
                    if (menuOpen) {
                        setMenuOpen(false);
                    }
                    if (avatarOpen) {
                        setAvatarOpen(false);
                    }
                }}
            >
                <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link
                        className="text-2xl font-extrabold tracking-tight text-white"
                        to="/"
                        onClick={() => setMenuOpen(false)}
                    >
                        ML<span className="text-pink-500">nexus</span>
                    </Link>
                    <div className="hidden items-center gap-6 md:flex">
                        <Link
                            to="/explore"
                            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                        >
                            Explore
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <div
                                    className="relative ml-4"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    <button
                                        type="button"
                                        className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black p-0.5 hover:border-white/20 transition-colors"
                                        aria-label="Open user menu"
                                        aria-expanded={avatarOpen}
                                        onClick={() =>
                                            setAvatarOpen((open) => !open)
                                        }
                                    >
                                        <Avatar.Root className="h-7 w-7 overflow-hidden rounded-full">
                                            <Avatar.Image
                                                src="/avatar.jpg"
                                                alt="User avatar"
                                                className="h-full w-full object-cover"
                                            />
                                            <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-black border border-white/10 text-[10px] font-semibold text-white/70">
                                                <img src="/avatar.jpg" alt="Fallback" className="h-full w-full object-cover opacity-50" />
                                            </Avatar.Fallback>
                                        </Avatar.Root>
                                    </button>
                                    {avatarOpen ? (
                                        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/10 bg-black/80 backdrop-blur-md p-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                            <Link
                                                to="/profile"
                                                className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                                onClick={() =>
                                                    setAvatarOpen(false)
                                                }
                                            >
                                                Profile
                                            </Link>
                                            <Link
                                                to="/upload"
                                                className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                                onClick={() =>
                                                    setAvatarOpen(false)
                                                }
                                            >
                                                Upload a Model
                                            </Link>
                                            <Link
                                                to="/delete"
                                                className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                                onClick={() =>
                                                    setAvatarOpen(false)
                                                }
                                            >
                                                Delete a Model
                                            </Link>
                                            <button
                                                type="button"
                                                className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:bg-pink-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-black px-3 py-2 text-slate-200 transition-colors hover:bg-white/5 md:hidden"
                        aria-label="Toggle navigation"
                        aria-expanded={menuOpen}
                        onClick={(event) => {
                            event.stopPropagation();
                            setMenuOpen((open) => !open);
                        }}
                    >
                        {menuOpen ? (
                            <X className="h-5 w-5 text-white" />
                        ) : (
                            <Menu className="h-5 w-5 text-white" />
                        )}
                    </button>
                </div>
                {menuOpen ? (
                    <div
                        className="border-t border-white/10 px-4 py-4 sm:px-6 md:hidden"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex flex-col gap-3">
                            <Link
                                to="/explore"
                                className="text-sm font-medium text-slate-300"
                                onClick={() => setMenuOpen(false)}
                            >
                                Explore
                            </Link>
                            {isAuthenticated ? (
                                <>
                                    <div className="pt-2">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-3 cursor-pointer"
                                            onClick={() =>
                                                setAvatarOpen((open) => !open)
                                            }
                                        >
                                            <Avatar.Root className="h-7 w-7 overflow-hidden rounded-full border border-white/10">
                                                <Avatar.Image
                                                    src="/avatar.jpg"
                                                    alt="User avatar"
                                                    className="h-full w-full object-cover"
                                                />
                                                <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-black border border-white/10 text-[10px] font-semibold text-white/70">
                                                    <img src="/avatar.jpg" alt="Fallback" className="h-full w-full object-cover opacity-50" />
                                                </Avatar.Fallback>
                                            </Avatar.Root>
                                            <span className="text-sm font-medium text-white/90">
                                                Account
                                            </span>
                                        </button>
                                        {avatarOpen ? (
                                            <div className="mt-3 flex flex-col gap-1 rounded-xl border border-white/10 bg-black/80 backdrop-blur-md p-2">
                                                <Link
                                                    to="/profile"
                                                    className="rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                                    onClick={() => {
                                                        setAvatarOpen(false);
                                                        setMenuOpen(false);
                                                    }}
                                                >
                                                    Profile
                                                </Link>
                                                <Link
                                                    to="/upload"
                                                    className="rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                                    onClick={() => {
                                                        setAvatarOpen(false);
                                                        setMenuOpen(false);
                                                    }}
                                                >
                                                    Upload a Model
                                                </Link>
                                                <Link
                                                    to="/delete"
                                                    className="rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                                    onClick={() => {
                                                        setAvatarOpen(false);
                                                        setMenuOpen(false);
                                                    }}
                                                >
                                                    Delete a Model
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="rounded-lg px-3 py-2 text-left text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-sm font-medium text-slate-300"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="inline-flex items-center justify-center rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                ) : null}
            </nav>
        </>
    );
}

export default Navbar;
