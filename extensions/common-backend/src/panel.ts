// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as path from 'path';
import * as vscode from 'vscode';
import { getWebviewContent } from './html';

export interface WebViewWithUri {
    panel: vscode.WebviewPanel;
    uriFsPath: string;
}

export function newPanel(context: vscode.ExtensionContext, uriFsPath: string, uriTabName?: string) {
    const webViewWithUri: WebViewWithUri = {
        panel: vscode.window.createWebviewPanel(
            'sandDance',
            `SandDance: ${path.basename(uriTabName || uriFsPath)}`,
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                // Only allow the webview to access resources in our extension's media directory
                localResourceRoots: [
                    vscode.Uri.file(path.join(context.extensionPath, 'resources'))
                ],
                retainContextWhenHidden: true
            }
        ),
        uriFsPath
    };
    const webView = webViewWithUri.panel.webview;
    webViewWithUri.panel.webview.html = getWebviewContent(webView, context.extensionPath, uriFsPath);
    return webViewWithUri;
}
