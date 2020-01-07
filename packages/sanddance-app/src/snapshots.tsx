// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from './base';
import { DataSource, DataSourceSnapshot } from './types';
import { downloadData } from './download';
import { SandDance, Snapshot } from '@msrvida/sanddance-explorer';
import { strings } from './language';

import VegaDeckGl = SandDance.VegaDeckGl;
import util = VegaDeckGl.util;

export function serializeSnapshot(snapshotWithImage: Snapshot) {
    const snapshot = util.clone(snapshotWithImage) as DataSourceSnapshot;
    //remove the image data from the snapshot
    delete snapshot.bgColor;
    delete snapshot.image;
    if (snapshot.dataSource) {
        delete snapshot.dataSource.rawText;
    }
    return JSON.stringify(snapshot);
}

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
                    this.setState({ fileFormatError: strings.errorInvalidFileFormat, working: false });
                }
                //validate these are snapshots
                if (validSnapshots(snapshots)) {
                    this.props.onImportSnapshot(snapshots);
                    this.setState({ dialogMode: null, working: false });
                } else {
                    this.setState({ fileFormatError: strings.errorInvalidFileFormat, working: false });
                }
            };
            reader.readAsText(file);
        }
    }

    getUrlShortcut() {
        const dataSource = util.clone(this.props.dataSource);
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
        const urlError = this.invalidUrlError();
        if (urlError) {
            return this.setState({ urlError });
        }
        const { url } = this.state;
        fetch(url)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    this.setState({ urlError: response.statusText });
                }
            })
            .then(snapshots => {
                if (validSnapshots(snapshots)) {
                    this.props.onImportSnapshot(snapshots);
                    this.props.onSnapshotsUrl(url);
                    this.setState({ dialogMode: null, working: false });
                } else {
                    this.setState({ fileFormatError: strings.errorInvalidFileFormat, working: false });
                }
            })
            .catch(e => {
                console.log(e);
                //this.setState({ urlError: e });
            });
    }

    commonDialog(dialogMode: ImportDialogMode, title: string, subText: string, children: JSX.Element, buttons?: JSX.Element | JSX.Element[]) {
        const onDismiss = () => this.setState({ dialogMode: null });
        return (
            <base.fabric.Dialog
                hidden={this.state.dialogMode !== dialogMode}
                onDismiss={onDismiss}
                dialogContentProps={{
                    className: 'sanddance-dialog',
                    type: base.fabric.DialogType.normal,
                    title,
                    subText
                }}
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
                    text={strings.labelImportSnapshots}
                    menuProps={{
                        items: [
                            {
                                key: 'file',
                                text: strings.menuLocal,
                                onClick: e => {
                                    this.setState({ dialogMode: 'importFile', fileFormatError: null, working: false });
                                }
                            },
                            {
                                key: 'url',
                                text: strings.menuUrl,
                                onClick: e => {
                                    this.setState({ dialogMode: 'importUrl', url: '', urlError: null, working: false });
                                }
                            }
                        ]
                    }}
                />
                {this.commonDialog(
                    'importFile',
                    strings.dialogTitleSnapshotsLocal,
                    strings.dialogSubtextSnapshotsLocal,
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
                    )
                )}
                {this.commonDialog(
                    'importUrl',
                    strings.dialogTitleSnapshotsUrl,
                    '',
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
                            {this.props.dataSource.dataSourceType !== 'local'
                                && !this.invalidUrlError()
                                && !this.state.urlError
                                && (
                                    <a href={this.getUrlShortcut()}>shortcut</a>
                                )
                            }
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
                            text={strings.dialogLoadButton}
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
                        text={strings.labelExportSnapshots}
                        menuProps={{
                            items: [
                                {
                                    key: 'json',
                                    text: strings.menuSnapshotExportJson,
                                    onClick: e => {
                                        //clean prior to exporting
                                        const snapshots = util.clone(this.props.snapshots) as DataSourceSnapshot[];
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
                                    text: strings.menuSnapshotExportMarkdown,
                                    onClick: e => {
                                        const sections = this.props.snapshots.map(snapshot => {
                                            const section = [`## ${snapshot.title}`];
                                            section.push(snapshot.description);
                                            section.push('\n');
                                            const url = `${location.origin}/#${encodeURIComponent(serializeSnapshot(snapshot))}`;
                                            section.push(markdownImageLink(snapshot.title, snapshot.image, url));
                                            return section.join('\n');
                                        });
                                        sections.unshift(`# ${this.props.dataSource.displayName}`);
                                        downloadData(sections.join('\n\n'), `${this.props.dataSource.displayName}.snapshots.md`);
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


function markdownImageLink(alt: string, imageUrl: string, link: string) {
    return `[![${alt}](${imageUrl})](${link})`;
}
