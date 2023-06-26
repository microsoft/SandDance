import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { globSync } from 'glob';

function getNpmVersion(packageName) {
    let version;
    try {
        console.log(`Fetching NPM version for ${packageName}...`);
        const stdout = execSync(`npm view ${packageName} version`, { encoding: 'utf8' });
        version = stdout.trim();
        console.log(`Fetched NPM version for ${packageName}: ${version}`);
    } catch (error) {
        console.error(`Failed to get version of ${packageName} from npm`);
    }
    return version;
}

// read lerna.json
console.log('Reading lerna.json...');
const lernaJson = JSON.parse(fs.readFileSync('./lerna.json', 'utf8'));
console.log('Successfully read lerna.json');

const packagesDirectories = lernaJson.packages; // the directories where the packages are located
console.log(`Package directories to be scanned: ${packagesDirectories}`);

packagesDirectories.forEach(packagesPattern => {
    console.log(`Inspecting packages matching pattern ${packagesPattern}...`);

    // Use glob to match directories
    const directories = globSync(packagesPattern);
    console.log(`Found directories: ${directories}`);

    directories.forEach(dirPath => {
        console.log(`Inspecting directory ${dirPath}`);
        const packageJsonPath = path.join(dirPath, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            console.log(`Reading package.json from ${packageJsonPath}`);
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

            // bail if its private
            if (packageJson.private) {
                console.log(`Skipping private package ${packageJson.name}`);
                return;
            }

            const localVersion = packageJson.version;
            const packageName = packageJson.name;
            console.log(`Read package.json for ${packageName}, local version: ${localVersion}`);

            const npmVersion = getNpmVersion(packageName);

            console.log(`Package: ${packageName}`);
            console.log(`Local version: ${localVersion}`);
            console.log(`NPM version: ${npmVersion}`);
            console.log('------');
        } else {
            console.log(`No package.json found in ${dirPath}`);
        }
    });
});
