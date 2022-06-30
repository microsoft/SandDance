// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
'use strict';

import * as path from 'path';
import * as vscode from 'vscode';
import { newPanel, WebViewWithUri } from 'common-backend';
import { TextDecoder } from 'util';

export function activate(context: vscode.ExtensionContext) {
    let current: WebViewWithUri | undefined = undefined;
    context.subscriptions.push(
        vscode.commands.registerCommand('sanddance.view',
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
                            case 'getFileContent': {
                                vscode.workspace.fs.readFile(fileUri).then(uint8array => {
                                    if (current && current.panel.visible) {

                                        //TODO string type of dataFile
                                        const dataFile = {
                                            type: path.extname(uriFsPath).substring(1),
                                            rawText: new TextDecoder().decode(uint8array),
                                        };
                                        const compactUI = context.globalState.get('compactUI');
                                        current.panel.webview.postMessage({ command: 'gotFileContent', dataFile, compactUI });
                                    }
                                });
                                break;
                            }
                            case 'setCompactUI': {
                                context.globalState.update('compactUI', message.compactUI);
                                break;
                            }
                        }
                    }, undefined, context.subscriptions);
                }
            },
        ),
    );
}

export function deactivate() {
}
