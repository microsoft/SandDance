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

let iconclicked: boolean = false;

interface WebViewWithUri {
    panel: vscode.WebviewPanel;
    uriFsPath: string;
}
let current: WebViewWithUri | undefined = undefined;
//let insight: azdata.Insight;

export function activate(context: vscode.ExtensionContext) {
    //let icon = azdata.DataProviderType.IconProvider;
    //let test = azdata.dataprotocol.registerIconProvider(icon);
    console.log("----------------------------");
    context.subscriptions.push(
        vscode.commands.registerCommand('sandance.view', (commandContext: vscode.Uri | azdata.ObjectExplorerContext) => {
                if (!commandContext) {
                    vscode.window.showErrorMessage('No file was specified for the View in Sandance command');
                    return;
                }
                if (commandContext instanceof vscode.Uri) {
                    viewInSandance( <vscode.Uri>commandContext, context);
                } else if (commandContext.nodeInfo) {
                    // This is a call from the object explorer right-click.
                    downloadAndViewInSandance(commandContext, context);
                }
            }
        )
    );

	vscode.commands.registerCommand('query.sandance', () => {
		iconclicked = !iconclicked;
	});

	azdata.queryeditor.registerQueryEventListener({
		onQueryEvent(type: azdata.queryeditor.QueryEvent, document: azdata.queryeditor.QueryDocument, args: any) {
			if (type === 'queryStart') {
				if (iconclicked) {
					let sdtab = azdata.window.createTab('Visualizer');
					sdtab.registerContent(async view => {
                        let properties: azdata.WebViewProperties = {
                            options: {
                            enableScripts: true,
                            // Only allow the webview to access resources in our extension's media directory
                            localResourceRoots: [
                                vscode.Uri.file(path.join(context.extensionPath, 'resources'))
                            ]
                            }
                        };
                        let webview = view.modelBuilder.webView().withProperties(properties).component();
    					let flexModel = view.modelBuilder.flexContainer().component();						
					    flexModel.addItem(webview, { flex: '1' });                     
                        flexModel.setLayout({
							flexFlow: 'column',
							alignItems: 'stretch',
						    height: '100%'
                            });
                        await view.initializeModel(flexModel);
                        //let uri= vscode.Uri.file("file:///C:/Users/t-rewang/sample.csv"); //temp
                        const providerid = document.providerId;
                        let provider: azdata.QueryProvider;
                        provider = azdata.dataprotocol.getProvider(providerid, azdata.DataProviderType.QueryProvider);
                        let data = await provider.getQueryRows({
                            ownerUri: document.uri,
                            batchIndex: 0,
                            resultSetIndex: 0,
                            rowsStartIndex: 0,
                            rowsCount: 500
                        });
                        let datavalue = data.resultSubset.rows;
                        /*
                        for(let i=0; i<datavalue.length; i++){
                            for(let j=0; j<datavalue[0].length; j++){
                                let x = datavalue[i][j].displayValue;
                            }
                        }
                        */
                        let j = JSON.stringify(datavalue);
                        //let i = jsonToURI(datavalue);
                        let fileuri =  saveTemp(datavalue);
                        //let uri = vscode.Uri.parse(i);
                        //let uri2 = vscode.Uri.file(i);
						setTimeout(() => {
						if (webview) {
                            //webview.html =  printstuff(datavalue);//r.messages.length
                            viewInSandance(fileuri,context);
                            //queryviewInSandance(webview,fileuri, context);                                   
							}
						}, 2000);
							
					});
					document.createQueryTab(sdtab);
				}
			}
		}
	});
}

function jsonToURI(json){ return encodeURIComponent(JSON.stringify(json)); }

function printstuff(para: any) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SandDance</title>
</head>
<body>
    <div id="app"></div>
    ${para}
</body>
</html>`;
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


function queryviewInSandance(webview: azdata.WebViewComponent,fileUri: vscode.Uri , context: vscode.ExtensionContext): void {
    //const columnToShowIn = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
    // Otherwise, create a new panel
    const uriFsPath = fileUri.fsPath;
    webview.html = getWebviewContent(context.extensionPath, uriFsPath);
    // Handle messages from the webview
        webview.onMessage(message => {
            switch (message.command) {
                case 'getFileContent':
                    fs.readFile(uriFsPath, (err, data) => {
                            //TODO string type of dataFile
                            const dataFile = {
                                type: path.extname(uriFsPath).substring(1),
                                rawText: data.toString('utf8')
                            };
                           webview.message({ command: 'gotFileContent', dataFile });
                        
                    });
                    break;
            }
        }, undefined, context.subscriptions);
    
    
}


export async function saveHdfsFileToTempLocation(commandContext: azdata.ObjectExplorerContext): Promise<vscode.Uri|undefined> {
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


function saveTemp(data: azdata.DbCellValue[][]): vscode.Uri {
        
        let localFile = tempWrite.sync( JSON.stringify(data), undefined);
        return vscode.Uri.file(localFile);
}


export function deactivate() {
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