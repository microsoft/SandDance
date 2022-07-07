const fs = require('fs');

const pubversion = 'v3';

let html = fs.readFileSync(`../../docs/embed/${pubversion}/sanddance-embed.html`, 'utf8');

const regex = /<title>(.*?)<\/title>/;

html = html.replace(regex, '<title>${title}</title>');
html = html.replace('<!--EMBED-->', '${embed}');

fs.writeFileSync('src/controls/dataExporterHtml.ts', `/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

export const embedHtml = (title: string, embed: string) => \`${html}\`;`);
