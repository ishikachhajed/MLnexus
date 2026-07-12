import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { MLNEXUS_SECTION, POSTINSTALL_COMMAND } from "../constants.js";

export function readPkgJson(cwd: string = process.cwd()): Record<string, any> {
    const pkgPath = join(cwd, "package.json");
    if (!existsSync(pkgPath)) {
        throw new Error(
            "No package.json found in current directory.\nRun `npm init -y` first.",
        );
    }
    const raw = readFileSync(pkgPath, "utf-8");
    return JSON.parse(raw);
}

export function writePkgJson(
    data: Record<string, any>,
    cwd: string = process.cwd(),
): void {
    const pkgPath = join(cwd, "package.json");
    writeFileSync(pkgPath, JSON.stringify(data, null, 2) + "\n");
}

export function addMlnexusEntry(
    name: string,
    version: string,
    cwd: string = process.cwd(),
): void {
    const pkg = readPkgJson(cwd);

    if (!pkg[MLNEXUS_SECTION]) {
        pkg[MLNEXUS_SECTION] = {};
    }

    pkg[MLNEXUS_SECTION][name] = version;
    writePkgJson(pkg, cwd);
}

export function removeMlnexusEntry(
    name: string,
    cwd: string = process.cwd(),
): void {
    const pkg = readPkgJson(cwd);

    if (!pkg[MLNEXUS_SECTION]) return;

    delete pkg[MLNEXUS_SECTION][name];

    if (Object.keys(pkg[MLNEXUS_SECTION]).length === 0) {
        delete pkg[MLNEXUS_SECTION];
    }

    writePkgJson(pkg, cwd);
}

export function getMlnexusEntries(
    cwd: string = process.cwd(),
): Record<string, string> {
    const pkg = readPkgJson(cwd);
    return pkg[MLNEXUS_SECTION] || {};
}

export function ensurePostinstall(cwd: string = process.cwd()): void {
    const pkg = readPkgJson(cwd);

    if (!pkg.scripts) {
        pkg.scripts = {};
    }

    const current = pkg.scripts.postinstall;
    
    if (!current) {
        pkg.scripts.postinstall = POSTINSTALL_COMMAND;
    } else if (!current.includes(POSTINSTALL_COMMAND)) {
        pkg.scripts.postinstall = `${current} && ${POSTINSTALL_COMMAND}`;
    }
    
    writePkgJson(pkg, cwd);
}
