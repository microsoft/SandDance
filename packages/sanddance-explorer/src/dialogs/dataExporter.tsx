// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { DataFileType } from '../interfaces';
import { strings } from '../language';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { base } from '../base';
import { SandDance } from '@msrvida/sanddance-react';

export interface Props {
    data: object[];
    datasetExportHandler: (data: any, datatype: string) => void;
    disabled?: boolean;
}

export interface State {
    dialogHidden: boolean;
    exportType?: DataFileType;
    working: boolean;
    exportData?: any;
    error: string
}

export class DataExportPicker extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dialogHidden: true,
            exportType: DataExportPicker.urlTypes[0],
            working: true,
            error: ''
        };
    }

    static urlTypes: DataFileType[] = ['json', 'csv', 'tsv'];

    // Converts to dataExport type and calls dataExportHandler to deal with data
    changeDataExport(dataExport: DataFileType) {
        this.setState({ working: false });
        return new Promise<void>((resolve, reject) => {
            const uploadFormatError = '';
            const urlError = '';
            var convertedData: any;
            this.setState({ exportType: dataExport });
            if (dataExport == 'json') {
                convertedData = this.convertToJson(this.props.data);
                this.props
                    .datasetExportHandler(convertedData, 'json');
            } else if (dataExport == 'csv') {
                convertedData = this.convertToDelimited(this.props.data, ',');
                this.props
                    .datasetExportHandler(convertedData, 'csv');
            } else if (dataExport == 'tsv') {
                convertedData = this.convertToDelimited(this.props.data, '\t');
                this.props
                    .datasetExportHandler(convertedData, 'tsv');
            }
        });
    }

    export() {
        if (!this.state.exportType) {
            return this.setState({ error: 'Error' });
        }

        this.changeDataExport(this.state.exportType).catch((e: Error) => {
            this.setState({ error: e.message });
        });
    }

    columnReplacer(name, value) {
        switch (name) {
        case SandDance.VegaDeckGl.constants.GL_ORDINAL:
        case SandDance.constants.FieldNames.Active:
        case SandDance.constants.FieldNames.Collapsed:
        case SandDance.constants.FieldNames.Index:
        case SandDance.constants.FieldNames.Selected:
        case SandDance.constants.FieldNames.Top:
            return undefined;
        }
        return value === null ? '' : value;
    }

    convertToDelimited(data: object[], delimiter: string) {
        // Adapted from: https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable
        var json = JSON.parse(this.convertToJson(data));
        var fields = Object.keys(json[0]);
        var replacer = function (key, value) { return value === null ? '' : value; };
        var dsv = json.map(function (row) {
            return fields.map(function (fieldName) {
                return JSON.stringify(row[fieldName], replacer);
            }).join(delimiter);
        });
        dsv.unshift(fields.join(delimiter));
        return (dsv.join('\r\n'));
    }

    // Convert to json and store in dataExport state
    convertToJson(data: object[]) {
        return JSON.stringify(data, this.columnReplacer);
    }
  
    render() {
        const closeDialog = () => {
            this.setState({ dialogHidden: true, working: true, exportType: DataExportPicker.urlTypes[0] });
        };

        return (
            <div className= "sanddance-dataExporter">
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
                        options={
                            DataExportPicker.urlTypes.map((urlType, i) => {
                                return {
                                    key: `${i}`,
                                    text: urlType,
                                    disabled: false,
                                    checked: i === 0
                                } as FabricTypes.IChoiceGroupOption;
                            })
                        }
                        onChange={(ev: React.FormEvent<HTMLInputElement>, option: FabricTypes.IChoiceGroupOption) =>
                            this.setState({ exportType: option.text as DataFileType, error: '' })
                        }
                        label={strings.labelExportFormat}
                    />
                    <base.fabric.DialogFooter>
                        <base.fabric.PrimaryButton onClick={e => this.export()} text={strings.buttonExport} />
                        <base.fabric.DefaultButton onClick={closeDialog} text={strings.buttonClose} />
                    </base.fabric.DialogFooter>
                </base.fabric.Dialog>
            </div>
        );
    }
}
