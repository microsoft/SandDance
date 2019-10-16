// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { DataFileType } from '../interfaces';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from '../language';

export interface Props {
    data: object[];
    datasetExportHandler: (data: any, datatype: DataFileType) => void;
    disabled?: boolean;
}

export interface State {
    dialogHidden: boolean;
    fileType?: DataFileType;
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
            working: false,
            error: ''
        };
    }

    static fileTypes: DataFileType[] = ['json', 'csv', 'tsv'];

    // Converts to dataExport type and calls dataExportHandler to deal with data
    createExport(fileType: DataFileType) {
        const final = (data: any) => {
            this.props.datasetExportHandler(data, fileType);
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
                <base.fabric.PrimaryButton
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
                            disabled={disabled}
                            onClick={e => this.setState({
                                delayAction: () => this.createExport(this.state.fileType),
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
