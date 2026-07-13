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

                <div className="mt-16 space-y-12">
                    {/* Section 5 */}
                    <section className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-[0_0_40px_rgba(236,72,153,0.05)] hover:bg-white/10 transition-colors">
                        <h2 className="text-2xl font-bold text-white mb-4">5. TypeScript Interface Reference</h2>
                        <p className="mb-3 text-sm text-slate-300">
                            <strong>The Execution Wrapper (.ts, .js, .mjs):</strong> Models are essentially enormous, blind mathematical calculators. A web developer has absolutely no idea what structure of tensor you require. This critical file specifically teaches the local MLnexus ecosystem precisely how to translate normal web developer input gracefully into your required structure safely.
                        </p>
                        <p className="mb-6 text-sm text-slate-300">
                            This file is uploaded alongside your <code className="text-pink-400">.onnx</code> file at publish time. You can author your wrapper in <strong>TypeScript (.ts)</strong> for full type-safety, or standard <strong>JavaScript (.js/.mjs)</strong>. When you upload a <code className="text-pink-400">.ts</code> file via the dashboard, it is automatically compiled to clean JavaScript before being stored. When a developer runs <code className="text-pink-400">mlnexus install</code>, this wrapper is downloaded and injected directly into their project as the executable interface for your model, always named <code className="text-pink-400">wrapper.config.js</code>.
                        </p>
                        
                        <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-5 mb-8">
                            <h3 className="text-red-500 font-bold mb-2">Important for Scikit-Learn Users</h3>
                            <p className="text-sm text-slate-300 mb-4">
                                If you are using <code className="text-pink-400">skl2onnx</code> to export your model, you **MUST** disable ZipMap.
                                By default, scikit-learn ONNX exporters try to output a "Map" type for probabilities, which is not supported by the MLnexus Runtime (Node.js/Web).
                            </p>
                            <p className="text-xs text-slate-400 mb-2 font-mono">❌ Error if ignored: "Non tensor type is temporarily not supported"</p>
                            <div className="bg-black/40 p-4 rounded-lg">
                                <p className="text-xs text-white font-bold mb-2">Correct Export Setting in Python:</p>
                                <pre className="text-xs text-emerald-400 overflow-x-auto">
{`from skl2onnx import convert_sklearn

# THE CRITICAL FIX: Add options={'zipmap': False}
onx = convert_sklearn(
    model,
    initial_types=initial_types,
    options={'zipmap': False} # <--- Exact setting needed
)

with open("model.onnx", "wb") as f:
    f.write(onx.SerializeToString())`}
                                </pre>
                            </div>
                        </div>
                        <p className="mb-4 text-sm text-slate-400">
                            For authors writing wrappers in TypeScript, or developers consuming models with TypeScript, the following interfaces define the exact shape expected by the MLnexus Runtime engine.
                        </p>
                        <pre className="bg-black/80 border border-white/10 p-4 rounded-xl text-sm overflow-x-auto text-cyan-300 font-mono">
{`// The full structure of a wrapper.config.js when typed
interface WrapperConfig {
    // Human-readable list of keys the developer must supply
    inputs: string[];
    
    // Human-readable list of keys present in the returned result
    outputs: string[];
    
    // Optional: single-shot prediction. One call -> one result object.
    predict?: (
        sessions: Record<string, OnnxSession>,
        input: Record<string, unknown>
    ) => Promise<Record<string, unknown>>;
    
    // Optional: streaming generation. One call -> async iterable of chunks.
    stream?: (
        sessions: Record<string, OnnxSession>,
        input: Record<string, unknown>
    ) => AsyncGenerator<Record<string, unknown>, void, unknown>;
}

// The shape every tensor must conform to inside engine.run({})
interface TensorConfig {
    data: number[] | bigint[] | string[] | boolean[];
    shape: number[];     // e.g. [1, 3] for 1 batch of 3 features
    type: "float32" | "int32" | "int64" | "bool" | "string";
}`}
                        </pre>
                    </section>

                    {/* Section 6 */}
                    <section className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-[0_0_40px_rgba(236,72,153,0.05)] hover:bg-white/10 transition-colors">
                        <h2 className="text-2xl font-bold text-white mb-4">6. Supported Tensor Types</h2>
                        <p className="mb-4 text-sm text-slate-400">
                            Every tensor you pass into <code className="text-pink-400">engine.run()</code> must have a <code className="text-pink-400">type</code> field matching one of these exact string values:
                        </p>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-700">
                                        <th className="text-left py-2 pr-6 text-slate-400 font-semibold">Type Value</th>
                                        <th className="text-left py-2 pr-6 text-slate-400 font-semibold">JS Data Array</th>
                                        <th className="text-left py-2 text-slate-400 font-semibold">Use Case</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-300">
                                    <tr className="border-b border-slate-800">
                                        <td className="py-2 pr-6"><code className="text-indigo-400">"float32"</code></td>
                                        <td className="py-2 pr-6"><code>number[]</code></td>
                                        <td className="py-2">Most regression and classification models. Default choice for continuous numeric data.</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-2 pr-6"><code className="text-indigo-400">"int32"</code></td>
                                        <td className="py-2 pr-6"><code>number[]</code></td>
                                        <td className="py-2">Token IDs for NLP models. Class indices. Integer sequences.</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-2 pr-6"><code className="text-indigo-400">"int64"</code></td>
                                        <td className="py-2 pr-6"><code>bigint[]</code></td>
                                        <td className="py-2">Large integer IDs, timestamps. Required by some HuggingFace transformer models.</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-2 pr-6"><code className="text-indigo-400">"bool"</code></td>
                                        <td className="py-2 pr-6"><code>boolean[]</code></td>
                                        <td className="py-2">Attention masks and binary flags.</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 pr-6"><code className="text-indigo-400">"string"</code></td>
                                        <td className="py-2 pr-6"><code>string[]</code></td>
                                        <td className="py-2">Text input for native string-processing ONNX models.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-pink-950/20 border border-pink-900/50 rounded-xl p-6 mt-8">
                            <h3 className="text-lg font-bold text-pink-500 mb-2">Architectural Best Practices</h3>
                            <p className="text-sm text-slate-300">
                                Machine learning dynamically processes extreme execution boundaries perfectly. Always structurally embrace explicit <code className="text-pink-400">try / catch</code> block encapsulation around predictions securely! 
                                If the wrapper author declared <code className="text-pink-400">inputs: ["age"]</code> and your code passes a string instead of a number, the ONNX runtime will throw a typed error — you want to catch and handle that gracefully rather than letting it crash your server.
                            </p>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-[0_0_40px_rgba(236,72,153,0.05)] hover:bg-white/10 transition-colors">
                        <h2 className="text-2xl font-bold text-white mb-4">7. End-to-End Examples</h2>
                        <p className="mb-6 text-slate-400">Complete, real-world usage patterns across common ML model categories.</p>

                        <h3 className="text-lg font-semibold text-white mb-3">Tabular Regression (Express.js)</h3>
                        <pre className="bg-black/80 border border-white/10 p-4 rounded-xl text-sm overflow-x-auto text-pink-300 font-mono">
{`import express from "express";
import housePriceModel from "house-price-predictor";

const app = express();
app.use(express.json());

app.post("/predict-price", async (req, res) => {
    try {
        await housePriceModel.init();
        const result = await housePriceModel.predict({
            bedrooms: req.body.bedrooms,
            sqft: req.body.sqft,
            location_score: req.body.location_score
        });
        res.json({ price_usd: result.price });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000);`}
                        </pre>

                        <h3 className="text-lg font-semibold text-white mt-8 mb-3">Text Classification (Next.js API Route)</h3>
                        <pre className="bg-black/80 border border-white/10 p-4 rounded-xl text-sm overflow-x-auto text-indigo-300 font-mono">
{`// app/api/sentiment/route.ts
import sentimentModel from "sentiment-classifier";

export async function POST(req: Request) {
    const { text } = await req.json();

    await sentimentModel.init();
    const result = await sentimentModel.predict({ text });

    return Response.json({
        label: result.label,          // e.g. "positive"
        confidence: result.confidence  // e.g. 0.94
    });
}`}
                        </pre>

                        <h3 className="text-lg font-semibold text-white mt-8 mb-3">LLM Text Generation with Streaming (Node.js)</h3>
                        <pre className="bg-black/80 border border-white/10 p-4 rounded-xl text-sm overflow-x-auto text-pink-300 font-mono">
{`import textGenerator from "local-llm";

async function generate(prompt: string) {
    await textGenerator.init();

    // model.stream() returns an AsyncGenerator
    const tokens = textGenerator.stream({ prompt });

    let fullResponse = "";
    for await (const chunk of tokens) {
        process.stdout.write(chunk.token); // stream to terminal in real-time
        fullResponse += chunk.token;
    }

    return fullResponse;
}

generate("Explain machine learning in one paragraph:");`}
                        </pre>
                    </section>
                </div>
            </div>
        </div>
    );
}
