// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from './base';
import { Snapshot } from '@msrvida/sanddance-explorer';
import { strings } from './language';

export interface ImportProps {
}

export type ImportDialogMode = 'importFile' | 'importUrl';

export interface ImportState {
    dialogMode: ImportDialogMode;
    working: boolean;
    uploadFormatError?: string;
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
                            text={"???"}
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
