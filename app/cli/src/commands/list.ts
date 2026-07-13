import chalk from "chalk";
import { log } from "../utils/logger.js";
import { getMlnexusEntries } from "../utils/pkg-json.js";
import { isInstalled } from "../utils/scaffold.js";

export async function listCommand(): Promise<void> {
    const entries = getMlnexusEntries();
    const packageNames = Object.keys(entries);

    log.br();

    if (packageNames.length === 0) {
        log.info("No mlnexus packages installed in this project.");
        log.info("Run `mlnexus install <package-name>` to get started.");
        log.br();
        return;
    }

    log.header("  mlnexus packages in this project:\n");

    console.log(
        "  " +
        chalk.dim(
            padRight("Package", 35) +
            padRight("Version", 15) +
            "Status",
        ),
    );
    console.log("  " + chalk.dim("─".repeat(65)));

    for (const name of packageNames) {
        const version = entries[name]!;
        const installed = isInstalled(name);

        const status = installed
            ? chalk.green("✅ installed")
            : chalk.yellow("⚠️  missing (run mlnexus restore)");

        console.log(
            "  " +
            padRight(chalk.white(name), 35) +
            padRight(chalk.cyan(version), 15) +
            status,
        );
    }

    log.br();
}

function padRight(str: string, len: number): string {
    const rawLen = str.replace(/\x1b\[[0-9;]*m/g, "").length;
    return str + " ".repeat(Math.max(0, len - rawLen));
}
