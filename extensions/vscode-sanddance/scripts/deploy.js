const fs = require('fs');
const package = require('../package.json');
const filename = `${package.name}-${package.version}.vsix`;
fs.copyFileSync(`./${filename}`, `../../docs/dist/vscode/v4/${filename}`);
