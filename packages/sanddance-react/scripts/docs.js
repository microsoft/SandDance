const fs = require('fs');

const pubversion = 'v3';

const docroot = `../../docs/docs/sanddance-react/${pubversion}/api/`;

fs.unlinkSync(docroot + 'index/sanddance.md');

let index = fs.readFileSync(docroot + 'index.md', 'utf8');
index = index.replace(/(?!## Namespaces[\s\S]*)### \[SandDance\].*\n/, `### SandDance - instance of [sanddance](../../../sanddance/${pubversion}/api)`);
fs.writeFileSync(docroot + 'index.md', index, 'utf8');
