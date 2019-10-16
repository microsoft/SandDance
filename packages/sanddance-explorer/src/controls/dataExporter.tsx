// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { DataExportHandler, DataFileType } from '../interfaces';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from '../language';

export interface Props {
    data: object[];
    displayName: string;
    datasetExportHandler: DataExportHandler;
    disabled?: boolean;
}

export interface State {
    dialogHidden: boolean;
    fileType: DataFileType;
    displayName: string;
    displayNameError: string;
    working: boolean;
    error: string,
    delayAction?: () => void;
}

export class DataExportPicker extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dialogHidden: true,
            fileType: DataExportPicker.fileTypes[0],
            displayName: props.displayName,
            displayNameError: '',
            working: false,
            error: ''
        };
    }

    static fileTypes: DataFileType[] = ['json', 'csv', 'tsv'];

    // Converts to dataExport type and calls dataExportHandler to deal with data
    createExport(fileType: DataFileType, displayName: string) {
        const final = (data: any) => {
            this.props.datasetExportHandler(data, fileType, displayName);
            this.close();
        };
        const json = JSON.stringify(this.props.data, columnReplacer);
        switch (fileType) {
            case 'json': {
                final(json);
                break;
            }
            case 'csv': {
                final(convertToDelimited(JSON.parse(json), ','));
                break;
            }
            case 'tsv': {
                final(convertToDelimited(JSON.parse(json), '\t,'));
                break;
            }
        }
    }

    close() {
        this.setState({ dialogHidden: true, working: false });
    }

    render() {
        const closeDialog = () => this.close();

        if (this.state.delayAction) {
            setTimeout(() => {
                //allow render to complete
                if (this.state.delayAction) {
                    this.state.delayAction();
                    this.setState({ delayAction: null });
                }
            }, 0);
        }

        const disabled = this.state.working || this.state.dialogHidden;

        return (
            <div className="sanddance-dataExporter">
                <base.fabric.DefaultButton
                    className="search-action search-bottom-action"
                    text={strings.buttonExportCount(this.props.data.length)}
                    onClick={() => this.setState({ dialogHidden: false })}
                    disabled={this.props.disabled}
                />
                <base.fabric.Dialog
                    hidden={this.state.dialogHidden}
                    onDismiss={closeDialog}
                    dialogContentProps={{
                        className: 'sanddance-dialog',
                        type: base.fabric.DialogType.normal,
                        title: strings.labelExport
                    }}
                >
                    <base.fabric.TextField
                        label="fil ename"
                        onChange={(e, displayName) => {
                            const displayNameError = getDisplayNameError(displayName);
                            this.setState({ displayName, displayNameError });
                        }}
                        errorMessage={this.state.displayNameError}
                        value={this.state.displayName}
                    />
                    <base.fabric.ChoiceGroup
                        disabled={disabled}
                        options={
                            DataExportPicker.fileTypes.map(fileType => {
                                return {
                                    key: fileType,
                                    text: fileType,
                                    disabled: false,
                                    checked: fileType === this.state.fileType
                                } as FabricTypes.IChoiceGroupOption;
                            })
                        }
                        onChange={(ev: React.FormEvent<HTMLInputElement>, option: FabricTypes.IChoiceGroupOption) =>
                            this.setState({ fileType: option.text as DataFileType })
                        }
                        label={strings.labelExportFormat}
                    />
                    <base.fabric.DialogFooter>
                        <base.fabric.PrimaryButton
                            disabled={disabled || !!this.state.displayNameError}
                            onClick={e => this.setState({
                                delayAction: () => this.createExport(this.state.fileType, this.state.displayName),
                                working: true
                            })}
                            text={strings.buttonExport}
                        />
                        <base.fabric.DefaultButton
                            onClick={closeDialog} text={strings.buttonClose}
                        />
                    </base.fabric.DialogFooter>
                </base.fabric.Dialog>
            </div>
        );
    }
}

const illegalChars = `\\/:*?"<>|`;

function getDisplayNameError(displayName: string) {
    if (!displayName) {
        return strings.errorExportFilenameEmpty;
    }
    for (let i = 0; i < illegalChars.length; i++) {
        if (displayName.indexOf(illegalChars[i]) >= 0) {
            return strings.errorExportFilenameCharacters(illegalChars);
        }
    }
}

function columnReplacer(name: string, value: any) {
    if (SandDance.util.isInternalFieldName(name, true)) {
        return undefined;
    }
    return value === null ? '' : value;
}

function convertToDelimited(data: object[], delimiter?: string) {
    var fields = Object.keys(data[0]);
    var file = data.map(row => {
        return fields.map(fieldName => {
            const value: any = row[fieldName];
            if (typeof value === 'number') {
                return value;
            }
            if (typeof value === 'string') {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return '';
        }).join(delimiter)
    })
    file.unshift(fields.join(delimiter));
    return (file.join('\r\n'));
}
