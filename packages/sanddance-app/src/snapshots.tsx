// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from './base';
import { Snapshot } from '@msrvida/sanddance-explorer';
import { strings } from './language';

function isSnapshot(snapshot: Snapshot) {
    return snapshot.insight && snapshot.title;
}

export interface ImportProps {
    onImport: (snapshots: Snapshot[]) => void;
}

export type ImportDialogMode = 'importFile' | 'importUrl';

export interface ImportState {
    dialogMode: ImportDialogMode;
    working: boolean;
    uploadFormatError?: string;
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

    upload(e: React.ChangeEvent<HTMLInputElement>) {
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
                    this.setState({ uploadFormatError: 'TODO JSON error', working: false });
                }
                //validate these are snapshots
                if (Array.isArray(snapshots)) {
                    for (let i = 0; i < snapshots.length; i++) {
                        if (!isSnapshot(snapshots[i])) {
                            this.setState({ uploadFormatError: 'TODO JSON error', working: false });
                            return;
                        }
                    }
                    this.props.onImport(snapshots);
                    this.setState({ dialogMode: null });
                } else {
                    this.setState({ uploadFormatError: 'TODO JSON error', working: false });
                }
            };
            reader.readAsText(file);
        }
    }

    commonDialog(dialogMode: ImportDialogMode, title: string, children: JSX.Element, buttons: JSX.Element | JSX.Element[]) {
        const onDismiss = () => this.setState({ dialogMode: null });

        return (
            <base.fabric.Dialog
                hidden={this.state.dialogMode !== dialogMode}
                onDismiss={onDismiss}
                title={title}
            //buttons={buttons}
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
                    text='Import... TODO'
                    menuProps={{
                        items: [
                            {
                                key: 'file',
                                text: `TODO json file ...`,
                                onClick: e => {
                                    this.setState({ dialogMode: 'importFile' });
                                }
                            },
                            {
                                key: 'url',
                                text: `TODO from url ...`,
                                onClick: e => {
                                    this.setState({ dialogMode: 'importUrl' });
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
                                onChange={e => this.upload(e)}
                                disabled={this.state.working}
                            />
                            {this.state.uploadFormatError && (
                                <div className="error">{this.state.uploadFormatError}</div>
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
                            TODO URL dialog
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
            </div>
        );
    }
}

export interface ExportProps {
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
                        text='Export... TODO'
                        menuProps={{
                            items: [
                                {
                                    key: 'json',
                                    text: `TODO json file`,
                                    onClick: e => {
                                        //TODO export json
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
