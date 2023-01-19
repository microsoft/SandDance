/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

const fs = require('fs');
const { defaultDependencies } = SandDanceEmbed;

function getHTML(localDev: boolean, extra: string = '') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SandDance</title>
${defaultDependencies(localDev, true)
        .filter(d => d.type === 'stylesheet')
        .map(d => {
            return `    <link rel="stylesheet" type="text/css" href="${d.url}" />`;
        })
        .join('\n')
}
</head>
<body>
${defaultDependencies(localDev, true)
        .filter(d => d.type === 'script')
        .map(d => {
            return `    <script src="${d.url}"></script>`;
        })
        .join('\n')
}
${extra}</body>
</html>`;
}

function writeHTML(relPath: string, localDev: boolean, extra?: string) {
    const fullPath = `${__dirname}/${relPath}`;
    console.log(`writing html to ${fullPath}`);
    fs.writeFileSync(fullPath, getHTML(localDev, extra));
    console.log(`wrote html to ${fullPath}`);
}

//local standalone
const data = [
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 1, z: 1 },
    { x: 2, y: 2, z: 2 },
];
writeHTML('../test/standalone/test.html', true, `<script>\nconst data = ${JSON.stringify(data, null, 4)};\nSandDanceEmbed.load(data);\n</script>\n`);

//local static
writeHTML('../test/static-deps/target.html', true);

//prod static
writeHTML('../../../docs/embed/v4/sanddance-embed.html', false, '    <!--EMBED-->\n');
