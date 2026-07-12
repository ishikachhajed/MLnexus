import { isCached, getCachePath } from "./cache.js";
import { downloadToCache, formatBytes } from "./downloader.js";
import { OnnxSession } from "./session.js";
import type { ModelConfig, ModelInstance, ManifestResponse } from "./types.js";

export type { WrapperConfig, ModelConfig, ModelInstance, ManifestResponse, TensorConfig } from "./types.js";
export { isCached, getCachePath, getCacheDir, ensureCacheDir, listCache, clearCache, getCacheRoot } from "./cache.js";
export { downloadToCache, formatBytes } from "./downloader.js";

export function createModel(config: ModelConfig): ModelInstance {
    let sessions: Record<string, OnnxSession> = {};
    let ready = false;

    return {
        async init(): Promise<void> {
            if (ready) {
                return;
            }

            console.log(`[MLnexus] Checking cache for ${config.name}@${config.version}...`);

            const manifestUrl = `${config.registryUrl}/packages/${config.name}/versions/${config.version}/manifest`;
            const res = await fetch(manifestUrl);
            
            if (!res.ok) {
                throw new Error(`Failed to fetch manifest for ${config.name}@${config.version}: ${res.status} ${res.statusText}`);
            }

            const manifest = (await res.json()) as ManifestResponse;
            
            if (!manifest.model_files || manifest.model_files.length === 0) {
                throw new Error(`No model files found for ${config.name}@${config.version}`);
            }

            for (const modelFile of manifest.model_files) {
                let savedPath: string;

                if (isCached(config.name, config.version, modelFile.file_name)) {
                    savedPath = getCachePath(config.name, config.version, modelFile.file_name);
                } else {
                    const totalSize = formatBytes(modelFile.file_size);
                    console.log(`[MLnexus] Downloading ${modelFile.file_name} (${totalSize})...`);
                    
                    savedPath = await downloadToCache(
                        modelFile.download_url,
                        config.name,
                        config.version,
                        modelFile.file_name,
                        (percent) => {
                            process.stdout.write(`\r[MLnexus] Progress: ${percent}%`);
                        },
                    );
                    process.stdout.write("\r" + " ".repeat(50) + "\r");
                }

                if (modelFile.file_name.endsWith(".onnx") && !modelFile.file_name.includes(".data")) {
                    const engine = new OnnxSession(savedPath);
                    await engine.load();
                    sessions[modelFile.file_name] = engine;
                }
            }
            
            if (Object.keys(sessions).length === 0) {
                 throw new Error(`[MLnexus] Downloaded files but could not find a valid .onnx graph core file.`);
            }

            console.log(`[MLnexus] ✓ Downloaded and cached ${config.name}@${config.version}`);
            ready = true;
            console.log(`[MLnexus] ✓ ${config.name}@${config.version} ready`);
        },

        async predict(
            input: Record<string, unknown>,
        ): Promise<Record<string, unknown>> {
            if (!ready) {
                throw new Error(`[MLnexus] ${config.name}: Model not initialized. Call await model.init() first.`);
            }
            
            return await config.predict(sessions, input);
        },

        async *stream(input: Record<string, unknown>): AsyncGenerator<Record<string, unknown>, void, unknown> {
            if (!ready) {
                throw new Error(`[MLnexus] ${config.name}: Model not initialized. Call await model.init() first.`);
            }
            if (!config.stream) {
                throw new Error(`[MLnexus] ${config.name}: This model wrapper does not support streaming.`);
            }
            
            yield *config.stream(sessions, input);
        },

        isReady(): boolean {
            return ready;
        },

        dispose(): void {
            for (const [key, session] of Object.entries(sessions)) {
                 session.dispose();
            }
            sessions = {};
            ready = false;
        },
    };
}
