import { Terminal, Download, Code, Database } from "lucide-react";

export default function Docs() {
    return (
        <div className="min-h-[calc(100vh-73px)] bg-black text-slate-300">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        ML<span className="text-pink-500">nexus</span> Documentation
                    </h1>
                    <p className="mt-4 text-lg text-slate-400">
                        Everything you need to publish, install, and run decentralized AI models globally.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Section 1 */}
                    <section className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-[0_0_40px_rgba(236,72,153,0.05)] hover:bg-white/10 transition-colors">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                            <Download className="h-6 w-6 text-pink-500" />
                            1. Installation
                        </h2>
                        <p className="mb-4">
                            First, install the MLnexus CLI globally on your machine to unlock the full power of the registry.
                        </p>
                        <div className="rounded-lg bg-black p-4 font-mono text-sm text-pink-400 border border-white/10">
                            npm install -g @mlnexus/cli
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-[0_0_40px_rgba(236,72,153,0.05)] hover:bg-white/10 transition-colors">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                            <Terminal className="h-6 w-6 text-pink-500" />
                            2. Managing Models
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Installing a Model</h3>
                                <p className="mb-2 text-sm text-slate-400">Download an AI model into your project's local cache and update your package.json automatically.</p>
                                <div className="rounded-lg bg-black p-4 font-mono text-sm text-slate-300 border border-white/10">
                                    <span className="text-pink-500">mlnexus</span> install &lt;model-name&gt;
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Listing Models</h3>
                                <p className="mb-2 text-sm text-slate-400">View all the MLnexus models currently installed in your project.</p>
                                <div className="rounded-lg bg-black p-4 font-mono text-sm text-slate-300 border border-white/10">
                                    <span className="text-pink-500">mlnexus</span> list
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Managing Global Cache</h3>
                                <p className="mb-2 text-sm text-slate-400">View or clean up massive AI models taking up space on your hard drive.</p>
                                <div className="rounded-lg bg-black p-4 font-mono text-sm text-slate-300 border border-white/10">
                                    <span className="text-pink-500">mlnexus</span> cache list<br />
                                    <span className="text-pink-500">mlnexus</span> cache clean
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Restoring Models (CI/CD)</h3>
                                <p className="mb-4 text-sm text-slate-300">
                                    The command that re-downloads all your MLnexus models on a fresh machine or inside a CI/CD deployment environment.
                                </p>
                                <div className="rounded-lg bg-black p-4 font-mono text-sm text-slate-300 border border-white/10 mb-4">
                                    <span className="text-pink-500">mlnexus</span> restore
                                </div>
                                <p className="mb-4 text-sm text-slate-300">
                                    When you deploy your application to Vercel, AWS Amplify, Render, Railway, or any cloud platform, those environments clone your git repository and run <code className="text-pink-400">npm install</code> — but your <code className="text-pink-400">.onnx</code> model files are not in git (they are too large and live in <code className="text-pink-400">~/.mlnexus/cache</code> on your machine).
                                </p>
                                <p className="mb-4 text-sm text-slate-300">
                                    <code className="text-pink-400">mlnexus restore</code> reads the <code className="text-pink-400">"mlnexus"</code> section of your <code className="text-pink-400">package.json</code>, identifies every model your project depends on, and downloads them fresh into the deployment environment before your build starts.
                                </p>
                                <div className="rounded-xl border border-pink-500/30 bg-pink-500/10 p-4 mt-4 text-sm">
                                    <strong className="text-pink-400 block mb-2">This is set up automatically — you do not need to do anything.</strong>
                                    <p className="text-slate-300 mb-3">
                                        Every time you run <code className="text-pink-400">mlnexus install &lt;package&gt;</code>, the CLI automatically injects the following into your <code className="text-pink-400">package.json</code> scripts without any manual steps:
                                    </p>
                                    <pre className="bg-black/40 p-3 rounded text-xs text-pink-300 font-mono">
{`"scripts": {
  "postinstall": "mlnexus restore"
}`}
                                    </pre>
                                    <p className="text-slate-400 mt-3 text-xs">
                                        If a <code className="text-pink-400">postinstall</code> script already exists in your project, MLnexus appends itself safely with <code className="text-pink-400">&&</code> rather than overwriting your existing script. Your existing hooks are never removed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-[0_0_40px_rgba(236,72,153,0.05)] hover:bg-white/10 transition-colors">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                            <Code className="h-6 w-6 text-pink-500" />
                            3. Running Models in Code
                        </h2>
                        <p className="mb-4">
                            Once installed via the CLI, you can easily load and run any model using our universal engine!
                        </p>
                        <div className="rounded-lg bg-black p-4 font-mono text-sm text-slate-300 border border-white/10 overflow-x-auto whitespace-pre">
<span className="text-purple-400">import</span> {"{ createModel }"} <span className="text-purple-400">from</span> <span className="text-green-300">"@mlnexus/runtime"</span>;<br />
<span className="text-purple-400">import</span> config <span className="text-purple-400">from</span> <span className="text-green-300">"my-awesome-model/wrapper.config.js"</span>;<br />
<br />
<span className="text-slate-500">{'// Initialize the model (auto-downloads if missing)'}</span><br />
<span className="text-blue-400">const</span> model = <span className="text-yellow-200">createModel</span>(config);<br />
<span className="text-purple-400">await</span> model.<span className="text-yellow-200">init</span>();<br />
<br />
<span className="text-slate-500">{'// Run a prediction'}</span><br />
<span className="text-blue-400">const</span> result = <span className="text-purple-400">await</span> model.<span className="text-yellow-200">predict</span>({"{ "} image: myImage {" }"});<br />
<span className="text-blue-400">console</span>.<span className="text-yellow-200">log</span>(result);
                        </div>
                    </section>
                    {/* Section 4 */}
                    <section className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-[0_0_40px_rgba(236,72,153,0.05)] hover:bg-white/10 transition-colors">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
                            <Database className="h-6 w-6 text-pink-500" />
                            4. Environment Variables
                        </h2>
                        <p className="mb-6 text-slate-300">
                            The MLnexus CLI reads one optional environment variable. Most users will never need to set it — the CLI ships pre-configured to point at the official MLnexus registry automatically.
                        </p>
                        
                        <div className="mt-4">
                            <code className="text-lg font-bold text-pink-400 block mb-2">MLNEXUS_REGISTRY</code>
                            <p className="text-sm text-slate-300 mb-3">
                                Overrides the registry URL that the CLI connects to. By default, all CLI commands target the official MLnexus global registry. You only need to set this variable if you are:
                            </p>
                            <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1 mb-4">
                                <li>Running your own private self-hosted MLnexus instance inside a corporate network.</li>
                                <li>A contributor working on MLnexus itself locally and pointing the CLI at a local dev server.</li>
                            </ul>
                            
                            <p className="text-sm text-slate-400 mb-4">
                                Because the CLI is a global system tool and not a web application, this variable is set in your operating system shell — not in a <code className="text-pink-400">.env</code> file. No dotenv library is required.
                            </p>

                            <div className="bg-black/50 border border-white/10 rounded-xl p-4 mt-4">
                                <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-semibold">Mac / Linux — add to ~/.bashrc or ~/.zshrc</p>
                                <pre className="text-sm text-pink-300"><code>export MLNEXUS_REGISTRY="https://your-private-registry.com"</code></pre>
                            </div>

                            <div className="bg-black/50 border border-white/10 rounded-xl p-4 mt-3">
                                <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-semibold">Windows — PowerShell (current session)</p>
                                <pre className="text-sm text-pink-300"><code>$env:MLNEXUS_REGISTRY = "https://your-private-registry.com"</code></pre>
                            </div>

                            <div className="bg-black/50 border border-white/10 rounded-xl p-4 mt-3">
                                <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-semibold">Windows — set permanently via System Properties</p>
                                <pre className="text-sm text-slate-400 whitespace-pre-wrap"><code>Start → "Edit the system environment variables" → Environment Variables → New
Variable name:  MLNEXUS_REGISTRY
Variable value: https://your-private-registry.com</code></pre>
                            </div>

                            <p className="text-sm text-slate-500 mt-4">
                                Once set, every subsequent CLI command — <code className="text-pink-400">mlnexus install</code>, <code className="text-pink-400">mlnexus restore</code>, <code className="text-pink-400">mlnexus list</code> — will point at your custom registry. No other configuration is required.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
