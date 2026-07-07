import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-start justify-center pt-24 px-6">
            <div className="w-full max-w-3xl rounded-3xl border border-white/20 bg-black/80 backdrop-blur-md shadow-[0_10px_40px_rgba(236,72,153,0.12)]">

                <div className="flex flex-col items-center text-center px-10 py-16 sm:px-16 sm:py-20">

                    <p className="text-pink-500 text-2xl font-semibold tracking-[0.35em]">
                        404
                    </p>

                    <h1 className="mt-6 text-5xl font-bold text-white">
                        Page not found
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                        The page you are looking for does not exist or was moved.
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">

    <Link
        to="/"
        className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-2xl border border-pink-500/60 bg-pink-500/10 px-8 text-lg font-semibold text-pink-400 transition-all duration-300 hover:bg-pink-500/20 hover:scale-[1.03]"
    >
        Go home
    </Link>

    <Link
        to="/explore"
        className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-2xl border border-white/20 bg-black px-8 text-lg font-semibold text-white transition-all duration-300 hover:border-white/40 hover:scale-[1.03]"
    >
        Explore packages
    </Link>

</div>

                </div>

            </div>
        </div>
    );
}