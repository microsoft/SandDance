const fs = require('fs');
const path = require('path');

const cwd = process.cwd();

console.log(`versioning in ${cwd}...`);

const packageJson = require(path.resolve(cwd, 'package.json'));

const index = path.resolve(cwd, 'dist', 'es6', 'index.js');
const js = fs.readFileSync(index, 'utf8').replace('DEBUG', packageJson.version);

fs.writeFileSync(index, js);

console.log(`versioning complete`);
