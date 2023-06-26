import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { globSync } from 'glob';

const isLoggingEnabled = process.argv.includes('--log');

function log(message) {
    if (isLoggingEnabled) {
        console.log(message);
    }
}

function getNpmVersion(packageName) {
    let version;
    try {
        log(`Fetching NPM version for ${packageName}...`);
        const stdout = execSync(`npm view ${packageName} version`, { encoding: 'utf8' });
        version = stdout.trim();
        log(`Fetched NPM version for ${packageName}: ${version}`);
    } catch (error) {
        return null;  // Package not found in npm registry, it needs to be published
    }
    return version;
}

const packagesDirectory = 'packages'; // the directory where the packages are located

let packagesToPublish = [];  // Hold the list of packages to be published

log(`Inspecting packages in ${packagesDirectory}...`);

// Use glob to match directories
const directories = globSync(`${packagesDirectory}/*`);
log(`Found directories: ${directories}`);

directories.forEach(dirPath => {
    log(`Inspecting directory ${dirPath}`);
    const packageJsonPath = path.join(dirPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        log(`Reading package.json from ${packageJsonPath}`);
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        if (packageJson.private) {
            log(`Skipping private package ${packageJson.name}`);
            return;
        }

        const localVersion = packageJson.version;
        const packageName = packageJson.name;
        log(`Read package.json for ${packageName}, local version: ${localVersion}`);

        const npmVersion = getNpmVersion(packageName);

        if (npmVersion !== localVersion) {
            packagesToPublish.push(packageName);  // This package needs to be published
        }
    }
});

// Log out the packages that need to be published
if (packagesToPublish.length > 0) {
    console.log('The following packages need to be published:');
    packagesToPublish.forEach(packageName => console.log(packageName));
} else {
    console.log('No packages need to be published.');
}
