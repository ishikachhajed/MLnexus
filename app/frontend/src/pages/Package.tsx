import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomToast from "../components/CustomToast";
import { useToastState } from "../hooks/useToastState";
import { api } from "../utils/api";

type PackageVersion = {
    id: string;
    version: string;
    onnx_file_size: number;
    created_at: string;
    is_yanked: boolean;
};

type PackageDetails = {
    name: string;
    description?: string;
    owner: string;
    created_at: string;
    versions: PackageVersion[];
};

function formatBytes(bytes: number) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export default function Package() {
    const { name } = useParams<{ name: string }>();
    const [pkg, setPkg] = useState<PackageDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const { toast, showToast, setOpen } = useToastState();
    
    // Command specific to this package
    const publishCommand = `mlnexus install ${name}`;

    useEffect(() => {
        if (!name) {
            showToast({
                title: "Missing package",
                message: "No package name was provided in the route.",
                variant: "error",
            });
            return;
        }

        let isActive = true;
        queueMicrotask(() => {
            if (isActive) {
                setLoading(true);
            }
        });

        api(`/packages/${name}`)
            .then((data) => {
                if (!isActive) {
                    return;
                }
                const details = data.package as PackageDetails;
                setPkg(details);
                if (!details?.versions?.length) {
                    showToast({
                        title: "No versions yet",
                        message: "This package has no published versions.",
                        variant: "info",
                    });
                }
            })
            .catch((err: unknown) => {
                if (!isActive) {
                    return;
                }
                const message =
                    err instanceof Error
                        ? err.message
                        : "Failed to load package";
                showToast({
                    title: "Package load failed",
                    message,
                    variant: "error",
                });
                setPkg(null);
            })
            .finally(() => {
                if (isActive) {
                    setLoading(false);
                }
            });

        return () => {
            isActive = false;
        };
    }, [name, showToast]);

    if (loading && !pkg) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-6">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!pkg) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-10">
                <CustomToast toast={toast} onOpenChange={setOpen} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-10 p-8 bg-black border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(236,72,153,0.1)]">
                <h1 className="text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 mb-4">
                    {pkg.name}
                </h1>
                <p className="text-xl text-slate-300">
                    {pkg.description || "No description provided."}
                </p>
                <div className="text-sm text-slate-500 mt-6 flex items-center gap-2">
                    Published by{" "}
                    <strong className="text-white bg-white/5 px-2 py-1 rounded-md">{pkg.owner}</strong> ·
                    Created {new Date(pkg.created_at).toLocaleDateString()}
                </div>
            </div>

            <button
                type="button"
                onClick={async () => {
                    try {
                        await navigator.clipboard.writeText(publishCommand);
                        showToast({
                            title: "Copied",
                            message: "Install command copied to clipboard.",
                            variant: "success",
                        });
                    } catch {
                        showToast({
                            title: "Copy failed",
                            message: "Please try again.",
                            variant: "error",
                        });
                    }
                }}
                className="inline-flex items-center gap-2 px-6 py-4 mb-12 bg-black border border-white/20 rounded-xl font-mono text-pink-400 shadow-inner hover:border-pink-400/60 hover:text-pink-300 transition-colors w-full sm:w-auto cursor-pointer"
                aria-label="Copy install command"
            >
                <span className="text-slate-500">$</span> {publishCommand}
            </button>

            {pkg.versions.length > 0 ? (
                <div className="mt-4">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        Versions
                        <span className="bg-pink-500/20 text-pink-400 text-sm py-1 px-3 rounded-full">{pkg.versions.length}</span>
                    </h2>
                    <div className="bg-black/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        Version
                                    </th>
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        Size
                                    </th>
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        Published
                                    </th>
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {pkg.versions.map((version) => (
                                    <tr
                                        key={version.id}
                                        className="hover:bg-white/5 transition-colors"
                                    >
                                        <td className="py-5 px-6">
                                            <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold tracking-wide bg-pink-500/10 text-pink-400 border border-pink-500/20">
                                                {version.version}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6">
                                            <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                {formatBytes(
                                                    version.onnx_file_size,
                                                )}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6 text-sm text-slate-400">
                                            {new Date(
                                                version.created_at,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="py-5 px-6">
                                            {version.is_yanked ? (
                                                <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold tracking-wide bg-red-500/10 text-red-500 border border-red-500/20">
                                                    Yanked
                                                </span>
                                            ) : (
                                                <span className="text-sm font-medium text-slate-300">
                                                    Active
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : null}

            <CustomToast toast={toast} onOpenChange={setOpen} />
        </div>
    );
}
