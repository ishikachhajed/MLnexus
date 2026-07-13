import ora from "ora";
import { log } from "../utils/logger.js";
import { removePackage } from "../utils/scaffold.js";
import { removeMlnexusEntry, getMlnexusEntries } from "../utils/pkg-json.js";

export async function uninstallCommand(packageName: string): Promise<void> {
    log.br();

    const entries = getMlnexusEntries();
    if (!entries[packageName]) {
        log.error(`${packageName} is not an mlnexus package in this project.`);
        process.exit(1);
    }

    const spinner = ora(`Removing ${packageName}...`).start();
    removePackage(packageName);
    spinner.succeed(`Removed node_modules/${packageName}/`);

    const pkgSpinner = ora("Updating package.json...").start();
    removeMlnexusEntry(packageName);
    pkgSpinner.succeed("Updated package.json");

    log.br();
    log.success(`${packageName} uninstalled.`);
    log.br();
}
