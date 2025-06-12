const fs = require('fs');
const path = require('path');

const cwd = process.cwd();

console.log('versioning...');

const pbivizJson = require(path.resolve(cwd, 'pbiviz.json'));

const ts = `// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export const version: string = '${pbivizJson.visual.version}';
`;

const file = path.resolve(cwd, 'src', 'version.ts');

fs.writeFileSync(file, ts);

console.log('versioning complete');
