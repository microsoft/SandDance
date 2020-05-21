// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as path from 'path';
import * as vscode from 'vscode';


export function getWebviewContent(webView: vscode.Webview, extensionPath: string, fileUriFsPath: string) {

    function resourceUrl(resource: string) {
        // Get path to resource on disk
        const onDiskPath = vscode.Uri.file(path.join(extensionPath, 'resources', resource));

        // And get the special URI to use with the webview
        return webView.asWebviewUri(onDiskPath);
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SandDance</title>
    ${link(resourceUrl('app.css'))}
</head>
<body>
    <div id="app"></div>
    ${script(resourceUrl('dist.min.js'))}
    ${script(resourceUrl('vega.js'))}
    ${script(resourceUrl('react.production.min.js'))}
    ${script(resourceUrl('react-dom.production.min.js'))}
    ${script(resourceUrl('fluentui-react.js'))}
    ${script(resourceUrl('sanddance-explorer.js'))}
    ${script(resourceUrl('app.js'))}
</body>
</html>`;
}

function link(href: vscode.Uri) {
    return `<link rel="stylesheet" type="text/css" href="${href}" />`;
}

function script(src: vscode.Uri) {
    return `<script src="${src}"></script>`;
}
