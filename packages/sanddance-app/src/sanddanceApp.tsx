// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from './base';
import {
    ColorSettings,
    Explorer,
    getColorSettingsFromThemePalette,
    Options,
    SandDance,
    themePalettes,
    ViewerOptions
} from '@msrvida/sanddance-explorer';
import { DataSource, DataSourceSnapshot, InsightMap } from './types';
import { DataSourcePicker } from './dataSourcePicker';
import { downloadData } from './download';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import {
    serializeSnapshot,
    SnapshotExport,
    SnapshotImport,
    validSnapshots
} from './snapshots';
import { strings } from './language';

import VegaDeckGl = SandDance.VegaDeckGl;
import types = SandDance.types;

export interface Props {
    themeColors: { [theme: string]: ColorSettings };
    setTheme?: (darkTheme: boolean) => void;
    darkTheme?: boolean;
    dataSources: DataSource[];
    mounted?: (app: SandDanceApp) => void;
    insights?: InsightMap;
    initialOptions?: { [dataSetId: string]: Options };
}

export interface State {
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
    public explorer: Explorer;

    constructor(props: Props) {
        super(props);
        this.state = {
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

    private hydrateSnapshot(snapshot: DataSourceSnapshot) {
        if (!snapshot.dataSource || snapshot.dataSource.id === this.state.dataSource.id) {
            this.explorer.setInsight(snapshot.insight, true);
            if (snapshot.dataSource && snapshot.dataSource.snapshotsUrl && snapshot.dataSource.snapshotsUrl !== this.state.dataSource.snapshotsUrl) {
                //load new shaphots url
                fetch(snapshot.dataSource.snapshotsUrl)
                    .then(response => response.json())
                    .then(snapshots => {
                        if (validSnapshots(snapshots)) {
                            this.explorer.setState({ snapshots })
                            const dataSource = { ...this.state.dataSource };
                            dataSource.snapshotsUrl = snapshot.dataSource.snapshotsUrl;
                            this.setState({ dataSource });
                        }
                    });
            }
        }
        else {
            if (snapshot.dataSource && snapshot.dataSource.dataSourceType !== 'local') {
                this.load(snapshot.dataSource, snapshot.insight);
            }
            //this.setState({ snapshots: this.state.snapshots.filter(snapshot => snapshot.dataSource.dataSourceType !== 'local') });
        }
    }

    load(dataSource: DataSource, partialInsight?: Partial<types.Insight>) {
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
        VegaDeckGl.base.vega.scheme(SandDance.constants.ColorScaleNone, x => VegaDeckGl.util.colorToString(this.explorer.viewer.options.colors.defaultCube));
        this.explorer && this.explorer.viewer && this.explorer.viewer.render(this.explorer.viewer.insight, this.explorer.state.dataContent.data);
        base.fabric.loadTheme({ palette: this.getThemePalette(darkTheme) });
    }

    render() {
        return (
            <section className="sanddance-app">
                <Explorer
                    logoClickTarget="_self"
                    theme={this.state.darkTheme && 'dark-theme'}
                    snapshotProps={{
                        modifySnapShot: (snapshot: DataSourceSnapshot) => {
                            snapshot.dataSource = this.state.dataSource;
                        },
                        getTopActions: snapshots => {
                            const items: FabricTypes.IContextualMenuItem[] = [
                                {
                                    key: 'import-file',
                                    text: strings.menuSnapshotsImportFile
                                },
                                {
                                    key: 'import-url',
                                    text: strings.menuSnapshotsImportUrl
                                }
                            ];
                            return items;
                        },

                        //,
                        // getSidebarChildren: (snapshots, snapshotElement) => (
                        //     <div>
                        //         <SnapshotImport
                        //             dataSource={this.state.dataSource}
                        //             onImportSnapshot={snapshots => this.explorer.setState({ snapshots })}
                        //             onSnapshotsUrl={snapshotsUrl => {
                        //                 const dataSource = { ...this.state.dataSource };
                        //                 dataSource.snapshotsUrl = snapshotsUrl;
                        //                 this.setState({ dataSource });
                        //             }}
                        //         />
                        //         {snapshotElement}
                        //         <SnapshotExport
                        //             dataSource={this.state.dataSource}
                        //             snapshots={snapshots}
                        //         />
                        //     </div>
                        // )

                        getActions: (snapshot: DataSourceSnapshot, i) => {
                            const url = '#' + serializeSnapshot(snapshot);
                            let element: JSX.Element;
                            if (snapshot.dataSource && snapshot.dataSource.dataSourceType === 'local') {
                                element = (<span>{strings.labelLocal}</span>);
                            } else {
                                element = (<a key={`link${i}`} href={url}>{strings.labelLink}</a>);
                            }
                            return [{ element }];
                        },
                        getTitle: insight => `${this.state.dataSource.displayName} ${insight.chart}`,
                        getDescription: insight => '' //TODO create description from filter etc.
                    }}
                    onSnapshotClick={(snapshot: DataSourceSnapshot) => this.hydrateSnapshot(snapshot)}
                    initialView="2d"
                    mounted={e => {
                        this.explorer = e;
                        this.load(this.state.dataSource, snapshotOnLoad && snapshotOnLoad.insight);
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
                        <DataSourcePicker
                            dataSource={this.state.dataSource}
                            dataSources={this.props.dataSources}
                            changeDataSource={ds => {
                                document.location.hash = '';
                                return this.load(ds);
                            }}
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
                >
                </Explorer>
            </section >
        );
    }
}
