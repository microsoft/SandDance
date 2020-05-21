// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
'use strict';

import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { newPanel, WebViewWithUri } from 'common-backend';

export function activate(context: vscode.ExtensionContext) {
    let current: WebViewWithUri | undefined = undefined;
    context.subscriptions.push(
        vscode.commands.registerCommand('sandance.view',
            (fileUri: vscode.Uri) => {
                const columnToShowIn = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
                const uriFsPath = fileUri.fsPath;
                //only allow one SandDance at a time
                if (current && current.uriFsPath !== uriFsPath) {
                    current.panel.dispose();
                    current = undefined;
                }
                if (current) {

                    //TODO: registerWebviewPanelSerializer to hydrate state

                    // If we already have a panel, show it in the target column
                    current.panel.reveal(columnToShowIn);

                } else {
                    // Otherwise, create a new panel
                    current = newPanel(context, uriFsPath);

                    current.panel.onDidDispose(() => {
                        current = undefined;
                    }, null, context.subscriptions);

                    // Handle messages from the webview
                    current.panel.webview.onDidReceiveMessage(message => {
                        switch (message.command) {
                            case 'getFileContent':
                                fs.readFile(uriFsPath, (err, data) => {
                                    if (current && current.panel.visible) {

                                        //TODO string type of dataFile
                                        const dataFile = {
                                            type: path.extname(uriFsPath).substring(1),
                                            rawText: data.toString('utf8')
                                        };
                                        current.panel.webview.postMessage({ command: 'gotFileContent', dataFile });
                                    }
                                });
                                break;
                        }
                    }, undefined, context.subscriptions);
                }
            }
        )
    );
}

export function deactivate() {
}
