// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { embedHtml } from './dataExporterHtml';
import { Dialog } from './dialog';
import { base } from '../base';
import { convertToDelimited } from '../exportDelimited';
import {
    DataExportHandler,
    DataExportType,
    DataFile
} from '../interfaces';
import { strings } from '../language';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { SandDance, util } from '@msrvida/sanddance-react';

import Snapshot = SandDance.types.Snapshot;

export interface IInitializer {
    fileName: string;
}

export interface Props {
    initializer: IInitializer;
    data: object[];
    dataExportHandler: DataExportHandler;
    disabled?: boolean;
    theme: string;
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

function _DataExportPicker(props: Props) {

    class __DataExportPicker extends base.react.Component<Props, State> {
        constructor(props: Props) {
            super(props);
            this.state = this.getInitialState(this.props);
        }

        private getInitialState(props: Props) {
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
        private createExport(exportType: DataExportType, displayName: string) {
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
                    const csv = convertToDelimited(JSON.parse(json), ',');
                    const html = embedHtml(`${strings.appName} - ${escape(displayName)}`, embedScript(csv, displayName));
                    final(html);
                }
            }
        }

        private close() {
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
                    <base.fluentUI.DefaultButton
                        className="search-action search-bottom-action"
                        text={strings.buttonExportCount(this.props.data.length)}
                        onClick={() => this.setState({ dialogHidden: false })}
                        disabled={this.props.disabled}
                    />
                    <Dialog
                        hidden={this.state.dialogHidden}
                        onDismiss={closeDialog}
                        dialogContentProps={{
                            className: `sanddance-dialog ${this.props.theme}`,
                            type: base.fluentUI.DialogType.normal,
                            title: strings.labelExport
                        }}
                        buttons={[
                            (
                                <base.fluentUI.PrimaryButton
                                    key={0}
                                    disabled={disabled || !!this.state.fileNameError}
                                    onClick={e => this.setState({
                                        delayAction: () => this.createExport(this.state.exportType, this.state.fileName),
                                        working: true
                                    })}
                                    text={strings.buttonExport}
                                    iconProps={{
                                        iconName: 'Download'
                                    }}
                                />
                            )
                        ]}
                    >
                        <base.fluentUI.TextField
                            label={strings.labelExportFileName}
                            onChange={(e, displayName) => {
                                const displayNameError = getFileNameError(displayName);
                                this.setState({ fileName: displayName, fileNameError: displayNameError });
                            }}
                            errorMessage={this.state.fileNameError}
                            value={this.state.fileName}
                        />
                        <base.fluentUI.ChoiceGroup
                            className="sanddance-form-separate"
                            disabled={disabled}
                            options={
                                exportTypes.map(([exportType, text]) => {
                                    return {
                                        key: exportType,
                                        text,
                                        disabled: false,
                                        checked: exportType === this.state.exportType
                                    } as FluentUITypes.IChoiceGroupOption;
                                })
                            }
                            onChange={(ev: React.FormEvent<HTMLInputElement>, option: FluentUITypes.IChoiceGroupOption) =>
                                this.setState({ exportType: option.key as DataExportType })
                            }
                            label={strings.labelExportFormat}
                        />
                    </Dialog>
                </div>
            );
        }
    }

    return new __DataExportPicker(props);
}

export const DataExportPicker: typeof DataExportPicker_Class = _DataExportPicker as any;

export declare class DataExportPicker_Class extends base.react.Component<Props, State> {
}

const illegalChars = '\\/:*?"<>|';

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

function embedScript(csv: string, displayName: string, snapshots?: Snapshot[]) {
    const dataFile: DataFile = { type: 'csv', displayName, snapshots };
    return `<pre id='csv-data' style='display:none'>${csv}</pre>
    <script>SandDanceEmbed.load(Object.assign({rawText: document.getElementById('csv-data').innerText}, ${JSON.stringify(dataFile)}))</script>`;
}

export function getEmbedHTML(data: object[], displayName: string, snapshots?: Snapshot[]) {
    const json = JSON.stringify(data, columnReplacer);
    const csv = convertToDelimited(JSON.parse(json), ',');
    const html = embedHtml(
        `${strings.appName} - ${escape(displayName)}`,
        embedScript(csv, displayName, snapshots)
    );
    return html;
}