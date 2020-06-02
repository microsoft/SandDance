// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from './base';
import { strings } from './language';
import { DataSource, DataSourceSnapshot, DataSourceType } from './types';
import { invalidUrlError } from './url';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { controls, DataFileType } from '@msrvida/sanddance-explorer';
import * as React from 'react';

export interface Props {
    dataSource: DataSource;
    dataSources: DataSource[];
    changeDataSource: (dataSource: DataSource) => Promise<void>;
}

export interface ButtonProps extends Props {
    getPicker: () => DataSourcePicker;
}

export function DataSourceButton(props: ButtonProps) {
    const picker = props.getPicker();
    if (!picker) return null;
    const menuProps: FluentUITypes.IContextualMenuProps = {
        items: [
            {
                key: 'sample-section',
                itemType: base.fluentUI.ContextualMenuItemType.Section,
                sectionProps: {
                    title: strings.sampleDataPrefix,
                    items: props.dataSources.map((ds, i) => {
                        const item: FluentUITypes.IContextualMenuItem = {
                            key: ds.id,
                            text: ds.displayName,
                            onClick: e => {
                                picker.changeDataSource(ds);
                            }
                        };
                        return item;
                    })
                }
            },
            {
                key: 'user-section',
                itemType: base.fluentUI.ContextualMenuItemType.Section,
                sectionProps: {
                    topDivider: true,
                    title: strings.menuUserData,
                    items: [
                        {
                            key: 'local',
                            text: strings.menuLocal,
                            onClick: e => picker.setState({ dialogMode: 'local' })
                        },
                        {
                            key: 'url',
                            text: strings.menuUrl,
                            onClick: e => picker.setState({ dialogMode: 'url' })
                        }
                    ]
                }
            }
        ]
    };
    return (
        <base.fluentUI.PrimaryButton
            className="sanddance-datasource-picker"
            text={dataSourcePrefix(props.dataSource.dataSourceType, props.dataSource.displayName)}
            menuProps={menuProps}
        />
    );
}

export interface DialogProps extends Props {
    theme: string;
}

export interface State {
    uploadFormatError?: string;
    url?: string;
    urlType?: DataFileType;
    urlError?: string;
    working: boolean;
    dialogMode?: DataSourceType;
}

export class DataSourcePicker extends React.Component<DialogProps, State> {
    constructor(props: DialogProps) {
        super(props);
        this.state = {
            url: '',
            urlType: DataSourcePicker.urlTypes[0],
            working: false
        };
    }

    static urlTypes: DataFileType[] = ['json', 'csv', 'tsv', 'topojson'];

    changeDataSource(dataSource: DataSource) {
        this.setState({ working: true });
        return new Promise<void>((resolve, reject) => {
            const uploadFormatError = '';
            const urlError = '';
            this.setState({ uploadFormatError, urlError });
            this.props
                .changeDataSource(dataSource)
                .then(() => {
                    this.setState({
                        working: false,
                        uploadFormatError: '',
                        urlError: '',
                        dialogMode: null
                    });
                    resolve();
                })
                .catch(reason => {
                    this.setState({ working: false });
                    reject(reason);
                });
        });
    }

    upload(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = e.target.files[0];
            const split = file.name.split('.');
            const type = split[split.length - 1] as DataFileType;
            if (DataSourcePicker.urlTypes.indexOf(type) >= 0) {
                const reader = new FileReader();
                reader.onload = () => {
                    const id = file.name;
                    const displayName = file.name;
                    const rawText = reader.result as string;
                    const ds: DataSource = {
                        dataSourceType: 'local',
                        displayName,
                        id,
                        rawText,
                        type
                    };
                    this.changeDataSource(ds);
                };
                reader.readAsText(file);
            } else {
                const uploadFormatError = strings.errorInvalidFileFormat;
                this.setState({ uploadFormatError });
            }
        }
    }

    loadUrl() {
        if (!this.state.url) {
            return this.setState({ urlError: strings.errorNoUrl });
        }
        if (this.state.url.toLocaleLowerCase().substr(0, 4) !== 'http') {
            return this.setState({ urlError: strings.errorUrlHttp });
        }
        //TODO: check url
        const { url } = this.state;
        const ds: DataSource = {
            dataSourceType: 'url',
            displayName: url,
            id: url,
            dataUrl: url,
            type: this.state.urlType
        };
        this.changeDataSource(ds).catch((e: Error) => {
            this.setState({ urlError: e.message });
        });
    }

    getUrlShortcut(dataUrl: string, type: DataFileType) {
        const dss: DataSourceSnapshot = {
            dataSource: {
                dataSourceType: 'url',
                dataUrl,
                displayName: dataUrl.substring(dataUrl.lastIndexOf('/') + 1, dataUrl.lastIndexOf('.')),
                id: '',
                type,
            }
        };
        return '#' + JSON.stringify(dss);
    }

    render() {
        const closeDialog = () => {
            this.setState({ dialogMode: null });
        };
        let shortcut: string;
        if (this.state.url && !invalidUrlError(this.state.url) && !this.state.urlError) {
            shortcut = this.getUrlShortcut(this.state.url, this.state.urlType);
        }
        return [(
            <controls.Dialog
                key='local'
                hidden={!(this.state.dialogMode === 'local')}
                onDismiss={closeDialog}
                dialogContentProps={{
                    className: `sanddance-dialog ${this.props.theme}`,
                    type: base.fluentUI.DialogType.normal,
                    title: strings.dialogTitleLocal,
                    subText: strings.dialogSubtextLocal
                }}
            >
                <input
                    type="file"
                    onChange={e => this.upload(e)}
                    disabled={this.state.working}
                />
                {this.state.uploadFormatError && (
                    <div className="error">{this.state.uploadFormatError}</div>
                )}
            </controls.Dialog>
        ), (
            <controls.Dialog
                key='url'
                hidden={!(this.state.dialogMode === 'url')}
                onDismiss={closeDialog}
                dialogContentProps={{
                    className: `sanddance-dialog ${this.props.theme}`,
                    type: base.fluentUI.DialogType.normal,
                    title: strings.dialogTitleUrl
                }}
                buttons={[
                    (
                        <base.fluentUI.PrimaryButton
                            key={0}
                            onClick={e => this.loadUrl()}
                            iconProps={{ iconName: 'CloudDownload' }}
                            text={strings.dialogLoadButton}
                            disabled={this.state.working}
                        />
                    )
                ]}
            >
                <section>
                    <base.fluentUI.TextField
                        label={strings.labelUrl}
                        placeholder={strings.urlInputPlaceholder}
                        onKeyUp={e => e.keyCode === 13 && this.loadUrl()}
                        onChange={(e, url) =>
                            this.setState({ url, urlError: '' })
                        }
                        value={this.state.url}
                        disabled={this.state.working}
                    />
                    {this.state.urlError && (
                        <div className="error">{this.state.urlError}</div>
                    )}
                </section>
                <section>
                    <base.fluentUI.ChoiceGroup
                        options={
                            DataSourcePicker.urlTypes.map((urlType, i) => {
                                return {
                                    key: `${i}`,
                                    text: urlType,
                                    disabled: this.state.working,
                                    checked: i === 0
                                } as FluentUITypes.IChoiceGroupOption;
                            })
                        }
                        onChange={(ev: React.FormEvent<HTMLInputElement>, option: FluentUITypes.IChoiceGroupOption) =>
                            this.setState({ urlType: option.text as DataFileType, urlError: '' })
                        }
                        label={strings.labelDataFormat}
                    />
                </section>
                <section className='tip' style={{ visibility: !invalidUrlError(this.state.url) && !this.state.urlError ? 'visible' : 'hidden' }} >
                    {strings.labelDataUrlShortcut} <a
                        href={shortcut}
                        title={strings.labelLinkDescription}
                        aria-label={strings.labelLinkDescription}
                    >{strings.labelLink}</a>
                </section>
            </controls.Dialog>
        )];
    }
}

function dataSourcePrefix(dt: DataSourceType, displayName: string) {
    switch (dt) {
        case 'sample':
            return `${strings.sampleDataPrefix}: ${displayName}`;
        case 'local':
            return strings.localFilePrefix;
        case 'url':
            return strings.urlPrefix;
    }
    return strings.buttonLoadData;
}
