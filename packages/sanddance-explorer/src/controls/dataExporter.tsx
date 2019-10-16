// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { convertToDelimited } from '../exportDelimited';
import { DataExportHandler, DataExportType, DataFile } from '../interfaces';
import { embedHtml } from './dataExporterHtml';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { SandDance, util } from '@msrvida/sanddance-react';
import { strings } from '../language';

export interface IInitializer {
    fileName: string;
}

export interface Props {
    initializer: IInitializer;
    data: object[];
    dataExportHandler: DataExportHandler;
    disabled?: boolean;
}

export interface State {
    initializer: IInitializer;
    dialogHidden: boolean;
    exportType: DataExportType;
    fileName: string;
    fileNameError: string;
    working: boolean;
    delayAction?: () => void;
}

const exportTypes: ([DataExportType, string])[] = [
    ['json', strings.labelExportJSON],
    ['csv', strings.labelExportCSV],
    ['tsv', strings.labelExportTSV],
    ['html', strings.labelExportHTML]
];

export class DataExportPicker extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = this.getInitialState(this.props);
    }

    getInitialState(props: Props) {
        const initialState: State = {
            initializer: props.initializer,
            dialogHidden: true,
            exportType: exportTypes[0][0],
            fileName: props.initializer.fileName,
            fileNameError: '',
            working: false
        };
        return initialState;
    }

    componentDidUpdate() {
        if (!util.deepCompare(this.props.initializer, this.state.initializer)) {
            this.setState(this.getInitialState(this.props));
        }
    }

    // Converts to dataExport type and calls dataExportHandler to deal with data
    createExport(exportType: DataExportType, displayName: string) {
        const final = (data: any) => {
            this.props.dataExportHandler(data, exportType, displayName);
            this.close();
        };
        const json = JSON.stringify(this.props.data, columnReplacer);
        switch (exportType) {
            case 'json': {
                final(json);
                break;
            }
            case 'csv': {
                final(convertToDelimited(JSON.parse(json), ','));
                break;
            }
            case 'tsv': {
                final(convertToDelimited(JSON.parse(json), '\t'));
                break;
            }
            case 'html': {
                final(embedHtml(`${strings.appName} - ${escape(displayName)}`, embedScript(convertToDelimited(JSON.parse(json), ','), displayName)));
            }
        }
    }

    close() {
        this.setState({ dialogHidden: true, working: false });
    }

    render() {
        const closeDialog = () => this.close();

        if (this.state.delayAction) {
            requestAnimationFrame(() => {
                //allow render to complete
                if (this.state.delayAction) {
                    this.state.delayAction();
                    this.setState({ delayAction: null });
                }
            });
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
                        label={strings.labelExportFileName}
                        onChange={(e, displayName) => {
                            const displayNameError = getFileNameError(displayName);
                            this.setState({ fileName: displayName, fileNameError: displayNameError });
                        }}
                        errorMessage={this.state.fileNameError}
                        value={this.state.fileName}
                    />
                    <base.fabric.ChoiceGroup
                        className="sanddance-form-separate"
                        disabled={disabled}
                        options={
                            exportTypes.map(([exportType, text]) => {
                                return {
                                    key: exportType,
                                    text,
                                    disabled: false,
                                    checked: exportType === this.state.exportType
                                } as FabricTypes.IChoiceGroupOption;
                            })
                        }
                        onChange={(ev: React.FormEvent<HTMLInputElement>, option: FabricTypes.IChoiceGroupOption) =>
                            this.setState({ exportType: option.key as DataExportType })
                        }
                        label={strings.labelExportFormat}
                    />
                    <base.fabric.DialogFooter>
                        <base.fabric.PrimaryButton
                            disabled={disabled || !!this.state.fileNameError}
                            onClick={e => this.setState({
                                delayAction: () => this.createExport(this.state.exportType, this.state.fileName),
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

function getFileNameError(displayName: string) {
    if (!displayName) {
        return strings.errorExportFilenameEmpty;
    }
    for (let i = 0; i < illegalChars.length; i++) {
        if (displayName.indexOf(illegalChars[i]) >= 0) {
            return strings.errorExportFilenameCharacters(illegalChars);
        }
    }
}

export function removeExtensions(fileName: string) {
    exportTypes.forEach(([exportType]) => {
        const re = new RegExp(`\\.${exportType}`, 'ig');
        fileName = fileName.replace(re, '');
    });
    return fileName;
}

function columnReplacer(name: string, value: any) {
    if (SandDance.util.isInternalFieldName(name, true)) {
        return undefined;
    }
    return value === null ? '' : value;
}

function embedScript(csv: string, displayName: string) {
    const dataFile: DataFile = { type: 'csv', displayName };
    return `<pre id='csv-data' style='display:none'>${csv}</pre>    
    <script>SandDanceEmbed.load(Object.assign({rawText: document.getElementById('csv-data').innerText}, ${JSON.stringify(dataFile)}))</script>`;
}
