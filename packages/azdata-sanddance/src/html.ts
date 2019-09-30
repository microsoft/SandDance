// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as path from 'path';
import * as vscode from 'vscode';

function resourceUrl(extensionPath: string, resource: string) {
    // Get path to resource on disk
    const onDiskPath = vscode.Uri.file(path.join(extensionPath, 'resources', resource));

    // And get the special URI to use with the webview
    return onDiskPath.with({ scheme: 'vscode-resource' });
}

export function getWebviewContent(extensionPath: string, fileUriFsPath: string) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SandDance</title>
    ${link(resourceUrl(extensionPath, 'app.css'))}
</head>
<body>
    <div id="app"></div>
    ${script(resourceUrl(extensionPath, 'deckgl.min.js'))}
    ${script(resourceUrl(extensionPath, 'vega.js'))}
    ${script(resourceUrl(extensionPath, 'react.production.min.js'))}
    ${script(resourceUrl(extensionPath, 'react-dom.production.min.js'))}
    ${script(resourceUrl(extensionPath, 'office-ui-fabric-react.js'))}
    ${script(resourceUrl(extensionPath, 'sanddance-explorer.js'))}
    ${script(resourceUrl(extensionPath, 'app.js'))}
</body>
</html>`;
}

function link(href: vscode.Uri) {
    return `<link rel="stylesheet" type="text/css" href="${href}" />`;
}

function script(src: vscode.Uri) {
    return `<script src="${src}"></script>`;
}
