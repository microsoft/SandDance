const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const visualDirectory = path.resolve(__dirname, '..');
const apiPath = path.join(visualDirectory, 'node_modules', 'powerbi-visuals-api', 'index.js');

if (!fs.existsSync(apiPath)) {
    if (!process.env.npm_execpath) {
        throw new Error('Run this script through npm run ensure-api.');
    }
    console.log('Restoring local Power BI dependencies required by pbiviz...');
    execFileSync(process.execPath, [
        process.env.npm_execpath,
        'install',
        '--prefix=.',
        '--workspaces=false',
    ], { cwd: visualDirectory, stdio: 'inherit' });
    if (!fs.existsSync(apiPath)) {
        throw new Error('Power BI dependency installation did not create the local powerbi-visuals-api package.');
    }
}
