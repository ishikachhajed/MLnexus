import type { User } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

function Navbar({ user, onLogout }: { user: User | null; onLogout: () => void }) {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        onLogout();
        navigate("/");
    };

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-black/80 border-b border-white/10 sticky top-0 z-50 backdrop-blur-md">
            <Link className="text-2xl font-extrabold tracking-tight text-white" to="/">
                ML<span className="text-pink-500">nexus</span>
            </Link>
            <div className="flex items-center gap-4">
                <Link to="/explore" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Explore</Link>
                {user ? (
                <>
                    <span className="text-sm font-medium text-slate-300">{user.username}</span>
                    <button 
                    className="px-4 py-2 text-sm font-medium text-pink-400 border border-pink-500/50 rounded-lg hover:bg-pink-500/10 transition-colors" 
                    onClick={handleLogout}
                    >
                    Logout
                    </button>
                </>
                ) : (
                <>
                    <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Login</Link>
                    <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:bg-pink-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all">
                    Sign Up
                    </Link>
                </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;
