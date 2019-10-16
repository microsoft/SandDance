const fs = require('fs');

const html = fs.readFileSync('../../docs/embed/v1/sanddance-embed.html', 'utf8');

fs.writeFileSync('src/controls/dataExporterHtml.ts', `// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
export const embedHtml = \`${html}\`;`);
