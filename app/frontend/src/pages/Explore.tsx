import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import CustomToast from "../components/CustomToast";
import { useToastState } from "../hooks/useToastState";

type PackageSummary = {
    id: string;
    name: string;
    description: string;
    owner: string;
    access_count: number;
    created_at: string;
    updated_at: string;
};

export default function Explore() {
    const [packages, setPackages] = useState<PackageSummary[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    const { toast, showToast, setOpen } = useToastState();

    const trimmedSearch = useMemo(() => search.trim(), [search]);

    useEffect(() => {
        let isActive = true;
        setLoading(true);
        setError("");

        const timer = setTimeout(async () => {
            try {
                const params = new URLSearchParams();
                if (trimmedSearch.length > 0) {
                    params.set("search", trimmedSearch);
                }
                const query = params.toString();

                const data = await api(`/packages${query ? `?${query}` : ""}`) as { packages: PackageSummary[] };
                if (!isActive) {
                    return;
                }
                setPackages(data.packages ?? []);
            } catch (err) {
                if (!isActive) {
                    return;
                }
                const message = err instanceof Error ? err.message : "Failed to load packages";
                setError(message);
                showToast({
                    title: "Explore failed",
                    message,
                    variant: "error",
                });
                setPackages([]);
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        }, 250);

        return () => {
            isActive = false;
            clearTimeout(timer);
        };
    }, [trimmedSearch, showToast]);

    const hasResults = packages.length > 0;
    const showEmpty = !loading && !error && !hasResults;

    return (
        <div className="max-w-5xl w-full mx-auto px-6 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white mb-2">
                    Explore Packages
                </h1>
                <p className="text-slate-400">
                    Browse ML models available on the MLnexus registry
                </p>
            </div>

            <div className="mb-8">
                <label className="block text-sm font-medium text-slate-400 mb-2">
                    Search by package name
                </label>
                <div className="relative">
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search for a model..."
                        className="w-full rounded-xl border border-white/20 bg-black px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-colors"
                    />
                </div>
            </div>

            {error ? null : null}

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-white/5 bg-black/50 p-5 shadow-[0_0_20px_rgba(236,72,153,0.05)] animate-pulse"
                        />
                    ))}
                </div>
            ) : null}

            {!loading && hasResults ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <Link
                            key={pkg.id}
                            to={`/packages/${pkg.name}`}
                            className="rounded-2xl border border-white/10 bg-black/50 p-5 shadow-[0_0_20px_rgba(236,72,153,0.05)] transition-all hover:-translate-y-0.5 hover:border-pink-500/50 hover:bg-black/80 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 block"
                            aria-label={`Open ${pkg.name} package`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-lg font-semibold text-white">
                                    {pkg.name}
                                </h2>
                                <span className="text-xs text-pink-400 font-medium px-2 py-1 bg-pink-500/10 rounded-full">
                                    {pkg.access_count.toLocaleString()} views
                                </span>
                            </div>
                            <p className="text-sm text-slate-400 mb-4 line-clamp-2 overflow-hidden h-10">
                                {pkg.description ||
                                    "No description provided yet."}
                            </p>
                            <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>by {pkg.owner}</span>
                                <span>
                                    Updated{" "}
                                    {new Date(
                                        pkg.updated_at,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : null}

            {showEmpty ? (
                <div className="col-span-full py-16 text-center bg-black/50 border border-dashed border-white/20 rounded-2xl backdrop-blur-sm">
                    <p className="text-xl text-slate-300 font-medium mb-3">
                        {trimmedSearch.length > 0
                            ? "No packages match that search"
                            : "No packages published yet"}
                    </p>
                    <p className="text-slate-500 mb-6">
                        {trimmedSearch.length > 0
                            ? "Try another name or clear the search."
                            : "Be the first! Use the Manage dashboard to publish an ONNX model."}
                    </p>
                    {trimmedSearch.length === 0 && (
                        <Link
                            to="/manage"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white font-medium rounded-xl transition-colors"
                        >
                            Publish First Model
                        </Link>
                    )}
                </div>
            ) : null}
            <CustomToast toast={toast} onOpenChange={setOpen} />
        </div>
    );
}
