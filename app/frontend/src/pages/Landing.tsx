import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="text-center pt-24 pb-16 px-8 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                ML packages,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-rose-400">
                    one upload away.
                </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                Upload and integrate machine learning packages with zero Python configuration. Everything managed in one place.
            </p>

            <div className="inline-flex items-center gap-2 px-6 py-4 mb-10 bg-slate-900 border border-slate-800 rounded-xl font-mono text-emerald-400 shadow-inner">
                <span className="text-slate-500">$</span> mlnexus install package-name
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/explore" className="px-6 py-3 text-base font-semibold text-white bg-pink-600 rounded-lg shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:bg-pink-500 hover:-translate-y-0.5 transition-all">
                    Explore Packages
                </Link>
                <Link to="/register" className="px-6 py-3 text-base font-semibold text-pink-400 border border-pink-500/50 rounded-lg hover:bg-pink-500/10 transition-all">
                    Get Started
                </Link>
            </div>
        </div>
    );
}
