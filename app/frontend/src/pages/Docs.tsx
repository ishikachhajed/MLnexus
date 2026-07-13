import { Terminal, Download, Code } from "lucide-react";

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
                </div>
            </div>
        </div>
    );
}
