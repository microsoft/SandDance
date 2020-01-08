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

function markdownImageLink(alt: string, imageUrl: string, link: string) {
    return `[![${alt}](${imageUrl})](${link})`;
}

export function cleanSnapshots(snapshots: Snapshot[]) {
    //remove data sources from snapshots
    const clean = util.clone(snapshots) as DataSourceSnapshot[];
    clean.forEach(snapshot => {
        if (snapshot.dataSource) {
            delete snapshot.dataSource.snapshotsUrl;
        }
    });
    return clean as Snapshot[];
}

export function downloadSnapshotsJSON(snapshots: Snapshot[], filename: string) {
    //clean prior to exporting
    const clean = cleanSnapshots(snapshots);
    downloadData(JSON.stringify(clean, null, 2), filename);
}

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
    onDismiss: () => void;
    onImportSnapshot: (snapshots: Snapshot[]) => void;
    dataSource: DataSource;
}

export interface ImportState {
    working: boolean;
    fileFormatError?: string;
}

export class SnapshotImportLocal extends React.Component<ImportProps, ImportState> {

    constructor(props: ImportProps) {
        super(props);
        this.state = {
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
                    this.setState({ working: false });
                } else {
                    this.setState({ fileFormatError: strings.errorInvalidFileFormat, working: false });
                }
            };
            reader.readAsText(file);
        }
    }

    render() {
        return (
            <div>
                <base.fabric.Dialog
                    hidden={false}
                    onDismiss={this.props.onDismiss}
                    dialogContentProps={{
                        className: 'sanddance-dialog',
                        type: base.fabric.DialogType.normal,
                        title: strings.dialogTitleSnapshotsLocal,
                        subText: strings.dialogSubtextSnapshotsLocal
                    }}
                >
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
                    <base.fabric.DialogFooter>
                        <base.fabric.DefaultButton onClick={this.props.onDismiss} text={strings.dialogCloseButton} />
                    </base.fabric.DialogFooter>
                </base.fabric.Dialog>
            </div>
        );
    }
}

export interface ImportRemoteProps extends ImportProps {
    onSnapshotsUrl: (snapshotsUrl: string) => void;
}

export interface ImportRemoteState extends ImportState {
    url?: string;
    urlError?: string;
}

export class SnapshotImportRemote extends React.Component<ImportRemoteProps, ImportRemoteState> {

    constructor(props: ImportRemoteProps) {
        super(props);
        this.state = {
            working: false
        };
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
                    this.setState({ working: false });
                    this.props.onDismiss();
                } else {
                    this.setState({ fileFormatError: strings.errorInvalidFileFormat, working: false });
                }
            })
            .catch(e => {
                this.setState({ urlError: e });
            });
    }

    render() {
        return (
            <div>
                <base.fabric.Dialog
                    hidden={false}
                    onDismiss={this.props.onDismiss}
                    dialogContentProps={{
                        className: 'sanddance-dialog',
                        type: base.fabric.DialogType.normal,
                        title: strings.dialogTitleSnapshotsUrl
                    }}
                >

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
                    <base.fabric.DialogFooter>
                        <base.fabric.PrimaryButton
                            disabled={!this.state.url || !!this.state.urlError}
                            key={0}
                            onClick={e => this.loadUrl()}
                            text={strings.dialogLoadButton}
                        />
                        <base.fabric.DefaultButton onClick={this.props.onDismiss} text={strings.dialogCloseButton} />
                    </base.fabric.DialogFooter>
                </base.fabric.Dialog>
            </div>
        );
    }
}

export interface ExportProps {
    onDismiss: () => void;
    dataSource: DataSource;
    snapshots: Snapshot[];
}

export function SnapshotExport(props: ExportProps) {
    return (
        <base.fabric.Dialog
            hidden={false}
            onDismiss={props.onDismiss}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
                <section>
                    <h4>HTML</h4>
                    <div>
                        A self contained html page with these snapshots pre-loaded.
                    </div>
                    <base.fabric.PrimaryButton
                        text={'TODO Download'}
                        onClick={e => {
                            const clean = cleanSnapshots(props.snapshots);
                            const snapshotsJSON = JSON.stringify(clean, null, 2);
                            //TODO add to HTML
                        }}
                    />
                </section>
                <section>
                    <h4>Markdown file</h4>
                    <div>
                        Export a Markdown file. Markdown is commonly used to create blog posts.
                    </div>
                    <base.fabric.PrimaryButton
                        text={'TODO Download'}
                        onClick={e => {
                            const sections = props.snapshots.map(snapshot => {
                                const section = [`## ${snapshot.title}`];
                                section.push(snapshot.description);
                                section.push('\n');
                                const url = `${location.origin}/#${encodeURIComponent(serializeSnapshot(snapshot))}`;
                                section.push(markdownImageLink(snapshot.title, snapshot.image, url));
                                return section.join('\n');
                            });
                            sections.unshift(`# ${props.dataSource.displayName}`);
                            downloadData(sections.join('\n\n'), `${props.dataSource.displayName}.snapshots.md`);
                        }}
                    />
                </section>
            </div>
        </base.fabric.Dialog>
    );
}
