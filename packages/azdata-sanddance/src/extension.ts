// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
'use strict';

import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import * as azdata from 'azdata';
import * as tempWrite from 'temp-write';
import { getWebviewContent } from './html';
import { MssqlExtensionApi, IFileNode } from './mssqlapis';

interface WebViewWithUri {
    panel: vscode.WebviewPanel;
    uriFsPath: string;
}
let current: WebViewWithUri | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('sandance.view', (commandContext: vscode.Uri | azdata.ObjectExplorerContext) => {
            if (!commandContext) {
                vscode.window.showErrorMessage('No file was specified for the View in Sandance command');
                return;
            }
            if (commandContext instanceof vscode.Uri) {
                viewInSandance(<vscode.Uri>commandContext, context);
            } else if (commandContext.nodeInfo) {
                // This is a call from the object explorer right-click.
                downloadAndViewInSandance(commandContext, context);
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
                let rowCount =  args.rowCount;

                // Create Json
                let jsonArray = [];

                interface jsonType {
                    [key: string]: any
                }

                for (let row = 0; row < rowCount; row++) {
                let jsonObject: jsonType = {};
                    for (let col = 0; col < columns.length; col++) {
                        if (!rows[row][col].isNull) {
                            jsonObject[columns[col].columnName] = rows[row][col].displayValue;
                        }
                        // If display value is null, don't do anything for now
                    }
                    jsonArray.push(jsonObject);
                }

                let json = JSON.stringify(jsonArray);
                let fileuri = saveTemp(json);
                queryViewInSandance(fileuri, context, document);
            }
        }
    });
}

async function downloadAndViewInSandance(commandContext: azdata.ObjectExplorerContext, context: vscode.ExtensionContext): Promise<void> {
    try {
        let fileUri = await saveHdfsFileToTempLocation(commandContext);
        if (fileUri) {
            viewInSandance(fileUri, context);
        }
    } catch (error) {
        vscode.window.showErrorMessage(`Error viewing in Sandance: ${error.message ? error.message : error}`);
    }
}

function viewInSandance(fileUri: vscode.Uri, context: vscode.ExtensionContext): void {
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
    }
    else {
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

// View in SandDance for SQL query editor
function queryViewInSandance(fileUri: vscode.Uri, context: vscode.ExtensionContext, editorUri: azdata.queryeditor.QueryDocument): void {
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
    }
    else {
        // Otherwise, create a new panel
        const uriTabName = editorUri.uri;
        current = newPanelQuery(context, uriFsPath, uriTabName);
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


export async function saveHdfsFileToTempLocation(commandContext: azdata.ObjectExplorerContext): Promise<vscode.Uri | undefined> {
    let extension = vscode.extensions.getExtension('Microsoft.mssql');
    if (!extension) {
        return undefined;
    }
    let extensionApi: MssqlExtensionApi = extension.exports;
    let browser = extensionApi.getMssqlObjectExplorerBrowser();
    let node: IFileNode = await browser.getNode<IFileNode>(commandContext);
    let contents = await node.getFileContentsAsString();
    if (contents !== undefined) {
        let localFile = tempWrite.sync(contents, node.getNodeInfo().label);
        return vscode.Uri.file(localFile);
    }   // else ignore for now
    return undefined;
}


function saveTemp(data: string): vscode.Uri {
    let localFile = tempWrite.sync(data, "file.json");
    return vscode.Uri.file(localFile);
}


export function deactivate() {
    vscode.commands.executeCommand('setContext', 'showVisualizer', false);
}

function newPanel(context: vscode.ExtensionContext, uriFsPath: string) {
    const webViewWithUri: WebViewWithUri = {
        panel: vscode.window.createWebviewPanel(
            'sandDance',
            `SandDance: ${path.basename(uriFsPath)}`,
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
    webViewWithUri.panel.webview.html = getWebviewContent(context.extensionPath, uriFsPath);
    return webViewWithUri;
}

function newPanelQuery(context: vscode.ExtensionContext, uriFsPath: string, uriTabName: string) {
    const webViewWithUri: WebViewWithUri = {
        panel: vscode.window.createWebviewPanel(
            'sandDance',
            `SandDance: ${path.basename(uriTabName)}`,
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
    webViewWithUri.panel.webview.html = getWebviewContent(context.extensionPath, uriFsPath);
    return webViewWithUri;
}