const fs = require('fs');
const path = require('path');

const cwd = process.cwd();

console.log(`versioning in ${cwd}...`);

const packageJson = require(path.resolve(cwd, 'package.json'));

const file = path.resolve(cwd, 'dist', 'es6', 'version.js');
const js = fs.readFileSync(file, 'utf8').replace('DEBUG', packageJson.version);

fs.writeFileSync(file, js);

console.log(`versioning complete`);
