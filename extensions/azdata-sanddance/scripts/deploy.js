const fs = require('fs');
const package = require('../package.json');
const filename = `${package.name}-${package.version}.vsix`;
fs.copyFileSync(`./${filename}`, `../../docs/dist/azdata/v4/${filename}`);
