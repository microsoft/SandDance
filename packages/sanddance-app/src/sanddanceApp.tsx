// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from './base';
import { DataSourceButton, DataSourcePicker, Props as DataSourceProps } from './dataSourcePicker';
import { downloadData } from './download';
import { strings } from './language';
import {
    downloadSnapshotsJSON,
    serializeSnapshot,
    SnapshotExport,
    SnapshotImportLocal,
    SnapshotImportRemote,
    validSnapshots
} from './snapshots';
import { DataSource, DataSourceSnapshot, InsightMap } from './types';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import {
    ColorSettings,
    Explorer,
    Explorer_Class,
    getColorSettingsFromThemePalette,
    Options,
    SandDance,
    SideTabId,
    themePalettes,
    ViewerOptions
} from '@msrvida/sanddance-explorer';
import * as React from 'react';

import VegaDeckGl = SandDance.VegaDeckGl;
import types = SandDance.types;
import specs = SandDance.specs;

export interface Props {
    themeColors: { [theme: string]: ColorSettings };
    setTheme?: (darkTheme: boolean) => void;
    darkTheme?: boolean;
    dataSources: DataSource[];
    mounted?: (app: SandDanceApp) => void;
    insights?: InsightMap;
    initialOptions?: { [dataSetId: string]: Options };
}

export type Dialogs = 'import-local' | 'import-remote' | 'export';

export interface State {
    compactUI: boolean;
    dialogMode: Dialogs;
    dataSource: DataSource;
    darkTheme: boolean;
}

function getViewerOptions(darkTheme: boolean, themeColors: { [theme: string]: ColorSettings }) {
    const colors = themeColors && themeColors[darkTheme ? 'dark' : 'light'];
    const viewerOptions: Partial<ViewerOptions> = {
        colors: {
            ...getColorSettingsFromThemePalette(themePalettes[darkTheme ? 'dark-theme' : '']),
            ...colors
        }
    };
    return viewerOptions;
}

function getSnapshotFromHash() {
    const hash = document.location.hash && document.location.hash.substring(1);
    if (hash) {
        try {
            return JSON.parse(decodeURIComponent(hash)) as DataSourceSnapshot;
        }
        catch (e) {
            // continue regardless of error
        }
    }
}

let snapshotOnLoad = getSnapshotFromHash();
if (snapshotOnLoad && snapshotOnLoad.dataSource && snapshotOnLoad.dataSource.dataSourceType === 'local') {
    snapshotOnLoad = null;
}

interface Handlers {
    hashchange: (e: HashChangeEvent) => void;
    resize: (e: UIEvent) => void;
}

export class SandDanceApp extends React.Component<Props, State> {
    private viewerOptions: Partial<types.ViewerOptions>;
    private handlers: Handlers;
    private dataSourcePicker: DataSourcePicker;
    private postLoad: (dataSource: DataSource) => void;

    public explorer: Explorer_Class;

    constructor(props: Props) {
        super(props);
        this.state = {
            compactUI: !!localStorage.getItem('compactUI'),
            dialogMode: null,
            dataSource: snapshotOnLoad && snapshotOnLoad.dataSource || props.dataSources[0],
            darkTheme: props.darkTheme
        };
        this.viewerOptions = getViewerOptions(this.state.darkTheme, props.themeColors);
        this.handlers = {
            hashchange: e => {
                const snapshot = getSnapshotFromHash();
                if (snapshot) {
                    this.explorer && this.explorer.calculate(() => this.hydrateSnapshot(snapshot));
                }
            },
            resize: e => {
                this.explorer && this.explorer.resize();
            }
        };
        this.wireEventHandlers(true);
        this.changeColorScheme(this.state.darkTheme);
    }

    private wireEventHandlers(add: boolean) {
        for (let key in this.handlers) {
            if (add) {
                window.addEventListener(key, this.handlers[key]);
            } else {
                window.removeEventListener(key, this.handlers[key]);
            }
        }
    }

    private isSameDataSource(a: DataSource, b: DataSource) {
        if (a.dataSourceType === b.dataSourceType && a.type === b.type && a.id === b.id) {
            if (a.dataSourceType === 'url') {
                return a.dataUrl === b.dataUrl;
            }
            return true;
        }
        return false;
    }

    private hydrateSnapshot(snapshot: DataSourceSnapshot, selectedSnapshotIndex = -1) {
        if (snapshot.dataSource) {
            if (this.isSameDataSource(snapshot.dataSource, this.state.dataSource)) {
                if (selectedSnapshotIndex === -1) {
                    this.explorer.reviveSnapshot(snapshot);
                } else {
                    this.explorer.reviveSnapshot(selectedSnapshotIndex);
                }
                if (snapshot.dataSource.snapshotsUrl && snapshot.dataSource.snapshotsUrl !== this.state.dataSource.snapshotsUrl) {
                    //load new snapshots url
                    fetch(snapshot.dataSource.snapshotsUrl)
                        .then(response => response.json())
                        .then(snapshots => {
                            if (validSnapshots(snapshots)) {
                                this.explorer.setState({ snapshots });
                                const dataSource = { ...this.state.dataSource };
                                dataSource.snapshotsUrl = snapshot.dataSource.snapshotsUrl;
                                this.setState({ dataSource });
                            }
                        });
                }
            } else {
                if (snapshot.dataSource.dataSourceType === 'local') {
                    this.dataSourcePicker.setState({ dialogMode: 'local' });
                    this.postLoad = ds => {
                        if (this.isSameDataSource(snapshot.dataSource, ds)) {
                            this.hydrateSnapshot(snapshot, selectedSnapshotIndex);
                            //} else {                            //local file does not match snapshot
                        }
                    };
                } else {
                    this.load(snapshot.dataSource, snapshot.insight).then(() => {
                        this.explorer.setState({ sideTabId: SideTabId.Snapshots, note: snapshot.description });
                        this.explorer.scrollSnapshotIntoView(selectedSnapshotIndex);
                    }).catch(e => {
                        this.loadError(snapshot.dataSource);
                    });
                }
            }
            return true;
        }
    }

    load(dataSource: DataSource, partialInsight?: Partial<specs.Insight>) {
        //clone so that we do not modify original object
        dataSource = VegaDeckGl.util.clone(dataSource);
        this.setState({ dataSource });
        document.title = `SandDance - ${dataSource.displayName}`;
        return this.explorer.load(
            dataSource,
            columns => {
                return partialInsight || (this.props.insights && this.props.insights[dataSource.id]);
            },
            this.props.initialOptions && VegaDeckGl.util.deepMerge({}, this.props.initialOptions['*'], this.props.initialOptions[dataSource.id])
        );
    }

    private dataSourceError(dataSource: DataSource) {
        switch (dataSource.dataSourceType) {
            case 'local':
                return strings.errorDataSourceFromLocal(dataSource);
            case 'sample':
            case 'url':
                return strings.errorDataSourceFromUrl(dataSource);
        }
    }

    private loadError(dataSource: DataSource) {
        let error = this.dataSourceError(dataSource);
        this.explorer.setState({ errors: [error] });
        this.setState({ dataSource: { dataSourceType: null, id: null, type: null } });
    }

    updateExplorerViewerOptions(viewerOptions: Partial<types.ViewerOptions>) {
        this.viewerOptions = viewerOptions;
        this.explorer && this.explorer.updateViewerOptions(this.viewerOptions);
    }

    getThemePalette(darkTheme: boolean) {
        const theme = darkTheme ? 'dark-theme' : '';
        return themePalettes[theme];
    }

    changeColorScheme(darkTheme: boolean) {
        this.updateExplorerViewerOptions(getViewerOptions(darkTheme, this.props.themeColors));
        VegaDeckGl.base.vega.scheme(SandDance.constants.ColorScaleNone, x => this.explorer.viewer.options.colors.defaultCube);
        this.explorer && this.explorer.viewer && this.explorer.viewer.renderSameLayout(this.viewerOptions);
        base.fluentUI.loadTheme({ palette: this.getThemePalette(darkTheme) });
    }

    render() {
        const theme = this.state.darkTheme ? 'dark-theme' : '';
        const dataSourceProps: DataSourceProps = {
            dataSource: this.state.dataSource,
            dataSources: this.props.dataSources,
            changeDataSource: (dataSource: DataSource) => {
                document.location.hash = '';
                return this.load(dataSource).then(() => {
                    if (this.postLoad) {
                        this.postLoad(dataSource);
                        this.postLoad = null;
                    }
                }).catch(() => this.loadError(dataSource));
            }
        };
        return (
            <section className="sanddance-app">
                <Explorer
                    logoClickTarget="_self"
                    theme={theme}
                    snapshotProps={{
                        modifySnapShot: (snapshot: DataSourceSnapshot) => {
                            snapshot.dataSource = this.state.dataSource;
                        },
                        getTopActions: snapshots => {
                            const items: FluentUITypes.IContextualMenuItem[] = [
                                {
                                    key: 'import',
                                    text: strings.menuSnapshotsImport,
                                    subMenuProps: {
                                        items: [
                                            {
                                                key: 'import-local',
                                                text: strings.menuLocal,
                                                onClick: () => this.setState({ dialogMode: 'import-local' })
                                            },
                                            {
                                                key: 'import-remote',
                                                text: strings.menuUrl,
                                                onClick: () => this.setState({ dialogMode: 'import-remote' })
                                            }
                                        ]
                                    }
                                },
                                {
                                    key: 'export',
                                    text: strings.menuSnapshotsExportAsJSON,
                                    disabled: snapshots.length === 0,
                                    onClick: () => downloadSnapshotsJSON(snapshots, `${this.state.dataSource.displayName}.snapshots`)
                                },
                                {
                                    key: 'export-as',
                                    text: strings.menuSnapshotsExportAs,
                                    disabled: snapshots.length === 0,
                                    onClick: () => this.setState({ dialogMode: 'export' })
                                }
                            ];
                            return items;
                        },
                        getChildren: snapshots => (
                            <div>
                                {this.state.dialogMode === 'import-local' && (
                                    <SnapshotImportLocal
                                        theme={theme}
                                        dataSource={this.state.dataSource}
                                        onImportSnapshot={snapshots => this.explorer.setState({ snapshots })}
                                        onDismiss={() => this.setState({ dialogMode: null })}
                                    />
                                )}
                                {this.state.dialogMode === 'import-remote' && (
                                    <SnapshotImportRemote
                                        theme={theme}
                                        dataSource={this.state.dataSource}
                                        onImportSnapshot={snapshots => this.explorer.setState({ snapshots })}
                                        onSnapshotsUrl={snapshotsUrl => {
                                            const dataSource = { ...this.state.dataSource };
                                            dataSource.snapshotsUrl = snapshotsUrl;
                                            this.setState({ dataSource });
                                        }}
                                        onDismiss={() => this.setState({ dialogMode: null })}
                                    />
                                )}
                                {this.state.dialogMode === 'export' && (
                                    <SnapshotExport
                                        explorer={this.explorer}
                                        dataSource={this.state.dataSource}
                                        snapshots={snapshots}
                                        onDismiss={() => this.setState({ dialogMode: null })}
                                        theme={theme}
                                    />
                                )}
                            </div>
                        ),

                        getActions: (snapshot: DataSourceSnapshot, i) => {
                            const url = '#' + serializeSnapshot(snapshot);
                            let element: JSX.Element;
                            if (snapshot.dataSource && snapshot.dataSource.dataSourceType === 'local') {
                                element = (<span key={`link${i}`}>{strings.labelLocal}</span>);
                            } else {
                                element = (
                                    <a
                                        key={`link${i}`}
                                        href={url}
                                        title={strings.labelLinkDescription}
                                        aria-label={strings.labelLinkDescription}
                                    >{strings.labelShare}</a>
                                );
                            }
                            return [{ element }];
                        },
                        getTitle: insight => `${this.state.dataSource.displayName} ${insight.chart}`,
                        getDescription: insight => '' //TODO create description from filter etc.
                    }}
                    onSnapshotClick={(snapshot: DataSourceSnapshot, selectedSnapshotIndex) => this.hydrateSnapshot(snapshot, selectedSnapshotIndex)}
                    initialView="2d"
                    mounted={e => {
                        this.explorer = e;
                        this.load(this.state.dataSource, snapshotOnLoad && snapshotOnLoad.insight).catch(e => {
                            this.loadError(this.state.dataSource);
                        });
                        this.props.mounted(this);
                    }}
                    dataExportHandler={(data, datatype, displayName) => {
                        try {
                            downloadData(data, `${displayName}.${datatype}`);
                        }
                        catch (e) {
                            this.explorer.setState({ errors: [strings.errorDownloadFailure] });
                        }
                    }}
                    datasetElement={(
                        <DataSourceButton
                            getPicker={() => this.dataSourcePicker}
                            {...dataSourceProps}
                        />
                    )}
                    topBarButtonProps={[
                        {
                            key: 'theme',
                            text: this.state.darkTheme ? strings.buttonThemeLight : strings.buttonThemeDark,
                            iconProps: {
                                iconName: this.state.darkTheme ? 'Sunny' : 'ClearNight'
                            },
                            onClick: () => {
                                const darkTheme = !this.state.darkTheme;
                                this.props.setTheme && this.props.setTheme(darkTheme);
                                this.setState({ darkTheme });
                                this.changeColorScheme(darkTheme);
                            }
                        }
                    ]}
                    viewerOptions={this.viewerOptions}
                    compactUI={this.state.compactUI}
                    additionalSettings={[
                        {
                            groupLabel: strings.labelPreferences,
                            children: (
                                <base.fluentUI.Toggle
                                    label={strings.labelCompactUI}
                                    title={strings.labelCompactUIDescription}
                                    checked={this.state.compactUI}
                                    onChange={(e, checked?) => {
                                        if (checked) {
                                            localStorage.setItem('compactUI', 'true');
                                        } else {
                                            localStorage.removeItem('compactUI');
                                        }
                                        this.setState({ compactUI: checked });
                                    }}
                                />
                            )
                        }
                    ]}
                >
                </Explorer>
                <DataSourcePicker
                    ref={dsp => { if (dsp && !this.dataSourcePicker) this.dataSourcePicker = dsp; }}
                    theme={theme}
                    {...dataSourceProps}
                />
            </section >
        );
    }
}
