import { useEffect, useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
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
    has_predict: boolean;
    has_stream: boolean;
};

type PackageDetails = {
    name: string;
    description?: string;
    documentation_md?: string;
    owner: string;
    created_at: string;
    versions: PackageVersion[];
};

const markdownComponents: Components = {
    h1: ({ children }) => (
        <h1 className="mt-5 mb-3 text-2xl font-bold text-white">{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 className="mt-5 mb-3 text-xl font-bold text-white">{children}</h2>
    ),
    h3: ({ children }) => (
        <h3 className="mt-4 mb-2 text-lg font-semibold text-white">
            {children}
        </h3>
    ),
    h4: ({ children }) => (
        <h4 className="mt-4 mb-2 text-base font-semibold text-white">
            {children}
        </h4>
    ),
    p: ({ children }) => (
        <p className="my-2 text-sm text-slate-200">{children}</p>
    ),
    ul: ({ children }) => (
        <ul className="my-2 list-disc pl-5 text-sm text-slate-200">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="my-2 list-decimal pl-5 text-sm text-slate-200">
            {children}
        </ol>
    ),
    code: ({ className, children, ...props }) => {
        const isInline = !className;

        return (
            <code
                className={
                    isInline
                        ? "rounded-md bg-slate-950/80 px-1.5 py-0.5 font-mono text-[0.85rem] text-slate-100"
                        : "text-slate-100"
                }
                {...props}
            >
                {children}
            </code>
        );
    },
    pre: ({ children }) => (
        <pre className="my-3 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm">
            {children}
        </pre>
    ),
    a: ({ children, href }) => (
        <a className="text-pink-400 underline" href={href}>
            {children}
        </a>
    ),
    blockquote: ({ children }) => (
        <blockquote className="my-3 border-l-2 border-pink-500 pl-3 text-sm text-slate-400">
            {children}
        </blockquote>
    ),
    table: ({ children }) => (
        <div className="my-3 overflow-x-auto">
            <table className="w-full border-collapse text-sm text-slate-200">
                {children}
            </table>
        </div>
    ),
    th: ({ children }) => (
        <th className="border border-slate-800 bg-slate-950/70 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="border border-slate-800 px-3 py-2 text-sm text-slate-200">
            {children}
        </td>
    ),
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
    const installCommand = useMemo(() => `mlnpm install ${name ?? ""}`, [name]);

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

        api(`/packages/${name}?view=1`)
            .then((data) => {
                if (!isActive) {
                    return;
                }
                const payload = data as { package: PackageDetails };
                const details = payload.package;
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

    const latestVersion = useMemo(() => {
        if (!pkg?.versions?.length) return null;
        return pkg.versions[0];
    }, [pkg]);

    if (loading && !pkg) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
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
        <div className="max-w-6xl w-full mx-auto px-6 py-10">
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
                        await navigator.clipboard.writeText(installCommand);
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
            >
                <span className="text-slate-500">$</span> mlnpm install{" "}
                {pkg.name}
            </button>

            <div className="mt-6 mb-12 w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Documentation
                </h2>
                <div className="max-w-none text-[0.95rem] leading-relaxed text-slate-200">
                    {pkg.documentation_md ? (
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={markdownComponents}
                        >
                            {pkg.documentation_md}
                        </ReactMarkdown>
                    ) : (
                        <p className="text-sm text-slate-500">
                            No documentation provided yet.
                        </p>
                    )}
                </div>
            </div>

            {pkg.versions.length > 0 ? (
                <>
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
                                                <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    Active
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : null}

            <div className="mt-10 mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Usage Example</h2>
                <pre
                    className="overflow-x-auto rounded-3xl border border-white/10 p-8 text-[0.95rem] leading-relaxed font-mono shadow-[0_0_40px_rgba(236,72,153,0.05)]"
                    style={{ background: "#09090b" }}
                >
                    <code>
                        <span style={{ color: "#e879f9", fontStyle: "italic" }}>import</span>
                        <span style={{ color: "#d6deeb" }}> model </span>
                        <span style={{ color: "#e879f9", fontStyle: "italic" }}>from</span>
                        <span style={{ color: "#d6deeb" }}> </span>
                        <span style={{ color: "#fda4af" }}>{`"${pkg.name}"`}</span>
                        <span style={{ color: "#fb7185" }}>;</span>
                        {"\n\n"}

                        <span style={{ color: "#637777", fontStyle: "italic" }}>{"// Downloads the model on first run, then loads from cache"}</span>
                        {"\n"}

                        <span style={{ color: "#e879f9", fontStyle: "italic" }}>await</span>
                        <span style={{ color: "#d6deeb" }}> model</span>
                        <span style={{ color: "#fb7185" }}>.</span>
                        <span style={{ color: "#f472b6" }}>init</span>
                        <span style={{ color: "#d6deeb" }}>()</span>
                        <span style={{ color: "#fb7185" }}>;</span>
                        {"\n\n"}

                        {((!latestVersion?.has_predict && !latestVersion?.has_stream) || latestVersion?.has_predict) && (
                            <>
                                <span style={{ color: "#637777", fontStyle: "italic" }}>{"// Run inference with plain JS objects"}</span>
                                {"\n"}
                                <span style={{ color: "#e879f9", fontStyle: "italic" }}>const</span>
                                <span style={{ color: "#d6deeb" }}> result </span>
                                <span style={{ color: "#fb7185" }}>=</span>
                                <span style={{ color: "#d6deeb" }}> </span>
                                <span style={{ color: "#e879f9", fontStyle: "italic" }}>await</span>
                                <span style={{ color: "#d6deeb" }}> model</span>
                                <span style={{ color: "#fb7185" }}>.</span>
                                <span style={{ color: "#f472b6" }}>predict</span>
                                <span style={{ color: "#fb7185" }}>{"({"}</span>
                                <span style={{ color: "#637777", fontStyle: "italic" }}>{" /* input data */ "}</span>
                                <span style={{ color: "#fb7185" }}>{"})"}</span>
                                <span style={{ color: "#fb7185" }}>;</span>
                                {"\n"}
                                <span style={{ color: "#d6deeb" }}>console</span>
                                <span style={{ color: "#fb7185" }}>.</span>
                                <span style={{ color: "#f472b6" }}>log</span>
                                <span style={{ color: "#d6deeb" }}>(result)</span>
                                <span style={{ color: "#fb7185" }}>;</span>
                                {latestVersion?.has_stream ? "\n\n" : ""}
                            </>
                        )}

                        {latestVersion?.has_stream && (
                            <>
                                <span style={{ color: "#637777", fontStyle: "italic" }}>{"// Or stream tokens/chunks in real-time"}</span>
                                {"\n"}
                                <span style={{ color: "#e879f9", fontStyle: "italic" }}>const</span>
                                <span style={{ color: "#d6deeb" }}> stream </span>
                                <span style={{ color: "#fb7185" }}>=</span>
                                <span style={{ color: "#d6deeb" }}> model</span>
                                <span style={{ color: "#fb7185" }}>.</span>
                                <span style={{ color: "#f472b6" }}>stream</span>
                                <span style={{ color: "#fb7185" }}>{"({"}</span>
                                <span style={{ color: "#637777", fontStyle: "italic" }}>{" /* prompt/input */ "}</span>
                                <span style={{ color: "#fb7185" }}>{"})"}</span>
                                <span style={{ color: "#fb7185" }}>;</span>
                                {"\n\n"}
                                <span style={{ color: "#e879f9", fontStyle: "italic" }}>for await</span>
                                <span style={{ color: "#d6deeb" }}> (</span>
                                <span style={{ color: "#e879f9", fontStyle: "italic" }}>const</span>
                                <span style={{ color: "#d6deeb" }}> chunk </span>
                                <span style={{ color: "#e879f9", fontStyle: "italic" }}>of</span>
                                <span style={{ color: "#d6deeb" }}> stream) {"{"}</span>
                                {"\n"}
                                <span style={{ color: "#d6deeb" }}>{"    "}process.stdout.write(chunk.token);</span>
                                {"\n"}
                                <span style={{ color: "#d6deeb" }}>{"}"}</span>
                            </>
                        )}
                    </code>
                </pre>
            </div>

            <CustomToast toast={toast} onOpenChange={setOpen} />
        </div>
    );
}
