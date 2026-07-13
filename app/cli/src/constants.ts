import { homedir } from "node:os";
import { join } from "node:path";

export const REGISTRY_URL = process.env.MLNEXUS_REGISTRY || "https://mlnexus.onrender.com";
export const CACHE_DIR = join(homedir(), ".mlnexus", "cache");
export const MLNEXUS_SECTION = "mlnexus";
export const POSTINSTALL_COMMAND = "mlnexus restore";
