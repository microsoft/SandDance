// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from './base';
import { Snapshot } from '@msrvida/sanddance-explorer';

export interface Props {
    snapshots: Snapshot[];
}

export type DialogMode = 'snapshot' | 'importFile' | 'importUrl' | 'exportJson' | 'exportMarkdown';

export interface ImportState {
    dialogMode: DialogMode;
    working: boolean;
    uploadFormatError?: string;
}

export class SnapshotImport extends React.Component<Props, ImportState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            dialogMode: null,
            working: false
        };
    }

    upload(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = e.target.files[0];
            const split = file.name.split('.');
            const reader = new FileReader();
            reader.onload = () => {
                const id = file.name;
                const displayName = file.name;
                const rawText = reader.result as string;
                //this.changeDataSource(ds);
            };
            reader.readAsText(file);
        }
    }

    commonDialog(dialogMode: DialogMode, title: string, children: JSX.Element, buttons: JSX.Element | JSX.Element[]) {
        return (
            <base.fabric.Dialog
                hidden={this.state.dialogMode !== dialogMode}
                onDismiss={() => this.setState({ dialogMode: null })}
                title={title}
            //buttons={buttons}
            >
                {children}
            </base.fabric.Dialog>
        );
    }

    render() {
        return (
            <div>
                <base.fabric.DefaultButton
                    text='Export... TODO'
                    menuProps={{
                        items: [
                            {
                                key: 'json',
                                text: `TODO json file`,
                                onClick: e => {
                                    this.setState({ dialogMode: 'exportJson' });
                                }
                            },
                            {
                                key: 'md',
                                text: `TODO markdown page`,
                                onClick: e => {
                                    this.setState({ dialogMode: 'exportMarkdown' });
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
                            text={"???"}
                        />
                    )
                )}
            </div>
        );
    }
}

export interface ExportState {
}

export class SnapshotExport extends React.Component<Props, ExportState> {

    constructor(props: Props) {
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
                                        this.setState({ dialogMode: 'exportJson' });
                                    }
                                },
                                {
                                    key: 'md',
                                    text: `TODO markdown page`,
                                    onClick: e => {
                                        this.setState({ dialogMode: 'exportMarkdown' });
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
