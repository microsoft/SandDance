// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from './base';
import { DataSource, DataSourceSnapshot } from './types';
import { downloadData } from './download';
import { SandDance, Snapshot } from '@msrvida/sanddance-explorer';
import { strings } from './language';

function isSnapshot(snapshot: Snapshot) {
    return snapshot.insight && snapshot.title;
}

export function validSnapshots(snapshots: Snapshot[]) {
    if (Array.isArray(snapshots)) {
        for (let i = 0; i < snapshots.length; i++) {
            if (!isSnapshot(snapshots[i])) {
                return false;
            }
        }
        return true;
    }
    return false;
}

export interface ImportProps {
    onImportSnapshot: (snapshots: Snapshot[]) => void;
    onSnapshotsUrl: (snapshotsUrl: string) => void;
    dataSource: DataSource;
}

export type ImportDialogMode = 'importFile' | 'importUrl';

export interface ImportState {
    dialogMode: ImportDialogMode;
    working: boolean;
    fileFormatError?: string;
    url?: string;
    urlError?: string;
}

export class SnapshotImport extends React.Component<ImportProps, ImportState> {

    constructor(props: ImportProps) {
        super(props);
        this.state = {
            dialogMode: null,
            working: false
        };
    }

    readFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            this.setState({ working: true });
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const rawText = reader.result as string;
                let snapshots: Snapshot[];
                try {
                    snapshots = JSON.parse(rawText);
                }
                catch (e) {
                    this.setState({ fileFormatError: 'TODO JSON error', working: false });
                }
                //validate these are snapshots
                if (validSnapshots(snapshots)) {
                    this.props.onImportSnapshot(snapshots);
                    this.setState({ dialogMode: null, working: false });
                } else {
                    this.setState({ fileFormatError: 'TODO JSON error', working: false });
                }
            };
            reader.readAsText(file);
        }
    }

    getUrlShortcut() {
        const dataSource = SandDance.VegaDeckGl.util.clone(this.props.dataSource);
        delete dataSource.snapshots;
        dataSource.snapshotsUrl = this.state.url;
        const dss: DataSourceSnapshot = {
            dataSource
        };
        return '#' + JSON.stringify(dss);
    }

    invalidUrlError() {
        if (!this.state.url) {
            return strings.errorNoUrl;
        }
        if (this.state.url.toLocaleLowerCase().substr(0, 4) !== 'http') {
            return strings.errorUrlHttp;
        }
    }

    loadUrl() {
        //TODO: check url
        const urlError = this.invalidUrlError();
        if (urlError) {
            return this.setState({ urlError });
        }
        const { url } = this.state;
        fetch(url)
            .then(response => response.json())
            .then(snapshots => {
                if (validSnapshots(snapshots)) {
                    this.props.onImportSnapshot(snapshots);
                    this.props.onSnapshotsUrl(url);
                    this.setState({ dialogMode: null, working: false });
                } else {
                    this.setState({ fileFormatError: 'TODO URL error', working: false });
                }
            })
            .catch(() => {
                this.setState({ urlError: 'TODO: url error' });
            });
    }

    commonDialog(dialogMode: ImportDialogMode, title: string, children: JSX.Element, buttons: JSX.Element | JSX.Element[]) {
        const onDismiss = () => this.setState({ dialogMode: null });
        return (
            <base.fabric.Dialog
                hidden={this.state.dialogMode !== dialogMode}
                onDismiss={onDismiss}
                title={title}
            >
                {children}
                <base.fabric.DialogFooter>
                    {buttons}
                    <base.fabric.DefaultButton onClick={onDismiss} text={strings.dialogCloseButton} />
                </base.fabric.DialogFooter>
            </base.fabric.Dialog>
        );
    }

    render() {
        return (
            <div>
                <base.fabric.DefaultButton
                    text='Import TODO'
                    menuProps={{
                        items: [
                            {
                                key: 'file',
                                text: `TODO json file ...`,
                                onClick: e => {
                                    this.setState({ dialogMode: 'importFile', working: false });
                                }
                            },
                            {
                                key: 'url',
                                text: `TODO from url ...`,
                                onClick: e => {
                                    this.setState({ dialogMode: 'importUrl', working: false });
                                }
                            }
                        ]
                    }}
                />
                {this.commonDialog(
                    'importFile',
                    'TODO Import file',
                    (
                        <div>
                            <input
                                type="file"
                                onChange={e => this.readFile(e)}
                                disabled={this.state.working}
                            />
                            {this.state.fileFormatError && (
                                <div className="error">{this.state.fileFormatError}</div>
                            )}
                        </div>
                    ),
                    (
                        <base.fabric.PrimaryButton
                            //disabled={!this.state.image || !this.state.title} 
                            key={0}
                            //onClick={e => this.saveSnapshot()}
                            text={"TODO Import"}
                        />
                    )
                )}
                {this.commonDialog(
                    'importUrl',
                    'TODO Import url',
                    (
                        <div>
                            <base.fabric.TextField
                                label={strings.labelUrl}
                                placeholder={strings.urlInputPlaceholder}
                                onKeyUp={e => e.keyCode === 13 && this.loadUrl()}
                                onChange={(e, url) =>
                                    this.setState({ url, urlError: '' })
                                }
                                value={this.state.url}
                                disabled={this.state.working}
                            />
                            {this.props.dataSource.dataSourceType !== 'local' && !this.invalidUrlError() && (
                                <a href={this.getUrlShortcut()}>shortcut</a>
                            )}
                            {this.state.urlError && (
                                <div className="error">{this.state.urlError}</div>
                            )}
                        </div>
                    ),
                    (
                        <base.fabric.PrimaryButton
                            disabled={!this.state.url || !!this.state.urlError}
                            key={0}
                            onClick={e => this.loadUrl()}
                            text={"TODO Import"}
                        />
                    )
                )}
            </div>
        );
    }
}

export interface ExportProps {
    dataSource: DataSource;
    snapshots: Snapshot[];
}

export interface ExportState {
}

export class SnapshotExport extends React.Component<ExportProps, ExportState> {

    constructor(props: ExportProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                {this.props.snapshots.length > 0 && (
                    <base.fabric.DefaultButton
                        text='Export TODO'
                        menuProps={{
                            items: [
                                {
                                    key: 'json',
                                    text: `TODO json file`,
                                    onClick: e => {
                                        //clean prior to exporting
                                        const snapshots = SandDance.VegaDeckGl.util.clone(this.props.snapshots) as DataSourceSnapshot[];
                                        snapshots.forEach(snapshot => {
                                            if (snapshot.dataSource) {
                                                delete snapshot.dataSource.snapshotsUrl;
                                            }
                                        });
                                        downloadData(JSON.stringify(snapshots, null, 2), `${this.props.dataSource.displayName}.snapshots`);
                                    }
                                },
                                {
                                    key: 'md',
                                    text: `TODO markdown page`,
                                    onClick: e => {
                                        //TODO export md
                                    }
                                }
                            ]
                        }}
                    />
                )}
            </div>
        );
    }
}
