// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
'use strict';

import * as path from 'path';
import * as vscode from 'vscode';
import * as azdata from 'azdata';
import { TextDecoder } from 'util';
import { newPanel, WebViewWithUri } from 'common-backend';
import { MssqlExtensionApi, IFileNode } from './mssqlapis';

let current: WebViewWithUri | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('sanddance.view', (commandContext: vscode.Uri | azdata.ObjectExplorerContext) => {
            if (!commandContext) {
                vscode.window.showErrorMessage('No file was specified for the View in SandDance command');
                return;
            }
            if (commandContext instanceof vscode.Uri) {
                viewFileUriInSandDance(<vscode.Uri>commandContext, context);
            } else if (commandContext.nodeInfo) {
                // This is a call from the object explorer right-click.
                downloadAndViewInSandDance(commandContext, context);
            }
        }
        )
    );

    //make the visualizer icon visible
    vscode.commands.executeCommand('setContext', 'showVisualizer', true);

    // Ideally would unregister listener on deactivate, but this is currently a void function.
    // Issue #6374 created in ADS repository to track this ask
    azdata.queryeditor.registerQueryEventListener({
        async onQueryEvent(type: azdata.queryeditor.QueryEvent, document: azdata.queryeditor.QueryDocument, args: any) {
            if (type === 'visualize') {
                const providerid = document.providerId;
                let provider: azdata.QueryProvider;
                provider = azdata.dataprotocol.getProvider(providerid, azdata.DataProviderType.QueryProvider);
                let data = await provider.getQueryRows({
                    ownerUri: document.uri,
                    batchIndex: args.batchId,
                    resultSetIndex: args.id,
                    rowsStartIndex: 0,
                    rowsCount: args.rowCount
                });

                let rows = data.resultSubset.rows;
                let columns = args.columnInfo;
                let rowsCount = args.rowCount;

                // Create Json
                let jsonArray: jsonType[] = [];

                interface jsonType {
                    [key: string]: any
                }

                for (let row = 0; row < rowsCount; row++) {
                    let jsonObject: jsonType = {};
                    for (let col = 0; col < columns.length; col++) {
                        if (!rows[row][col].isNull) {
                            jsonObject[columns[col].columnName] = rows[row][col].displayValue;
                        }
                        // If display value is null, don't do anything for now
                    }
                    jsonArray.push(jsonObject);
                }

                viewInSandDance(() => {
                    return new Promise<string>(resolve => resolve(JSON.stringify(jsonArray)));
                }, document.uri, 'json', context);
            }
        }
    });
}

async function downloadAndViewInSandDance(commandContext: azdata.ObjectExplorerContext, context: vscode.ExtensionContext): Promise<void> {
    try {
        let file = await getHdfsFileAsString(commandContext);
        if (file) {
            const { contents } = file;
            viewInSandDance(() => new Promise<string>(resolve => resolve(contents)), file.fsUriPath, path.extname(file.fsUriPath).substring(1), context);
        }
    } catch (error) {
        vscode.window.showErrorMessage(`Error viewing in sanddance: ${error.message ? error.message : error}`);
    }
}

function viewInSandDance(rawTextPromise: () => Thenable<string>, uriFsPath: string, type: string, context: vscode.ExtensionContext, uriTabName?: string | undefined): void {
    const columnToShowIn = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
    //only allow one SandDance at a time
    if (current && current.uriFsPath !== uriFsPath) {
        current.panel.dispose();
        current = undefined;
    }
    if (current) {
        //TODO: registerWebviewPanelSerializer to hydrate state
        // If we already have a panel, show it in the target column
        current.panel.reveal(columnToShowIn);
    }
    else {
        // Otherwise, create a new panel
        current = newPanel(context, uriFsPath, uriTabName);
        current.panel.onDidDispose(() => {
            current = undefined;
        }, null, context.subscriptions);
        // Handle messages from the webview
        current.panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'getFileContent': {
                    rawTextPromise().then(rawText => {
                        if (current && current.panel.visible) {
                            const dataFile = {
                                type,
                                rawText
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
}

function viewFileUriInSandDance(fileUri: vscode.Uri, context: vscode.ExtensionContext, uriTabName?: string | undefined): void {
    const p = () => new Promise<string>(resolve => {
        vscode.workspace.fs.readFile(fileUri).then(uint8array => {
            resolve(new TextDecoder().decode(uint8array));
        });
    });
    viewInSandDance(p, fileUri.fsPath, path.extname(fileUri.fsPath).substring(1), context, uriTabName);
}

export async function getHdfsFileAsString(commandContext: azdata.ObjectExplorerContext): Promise<{ contents: string, fsUriPath: string } | undefined> {
    let extension = vscode.extensions.getExtension('Microsoft.mssql');
    if (extension) {
        let extensionApi: MssqlExtensionApi = extension.exports;
        let browser = extensionApi.getMssqlObjectExplorerBrowser();
        let node: IFileNode = await browser.getNode<IFileNode>(commandContext);
        let contents = await node.getFileContentsAsString();
        if (contents !== undefined) {
            return {
                contents,
                fsUriPath: node.getNodeInfo().label
            };
        }
    }
}

export function deactivate() {
    vscode.commands.executeCommand('setContext', 'showVisualizer', false);
}
