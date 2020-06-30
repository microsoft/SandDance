// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as deck from '@deck.gl/core';
import { fluentUIComponents } from './fluentUIComponents';
import * as layers from '@deck.gl/layers';
import * as luma from '@luma.gl/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as vega from 'vega';
import {
    capabilities,
    DataFile,
    Explorer,
    Explorer_Class,
    Props as ExplorerProps,
    SandDance,
    themePalettes,
    use,
    util
} from '@msrvida/sanddance-explorer';
import { Logo } from '@msrvida/sanddance-explorer/dist/es6/controls/logo';
import { language } from './language';
import { version } from './version';

// tslint:disable-next-line
use(fluentUIComponents, React as any, ReactDOM as any, vega, deck, layers, luma);

function getThemePalette(darkTheme: boolean) {
    const theme = darkTheme ? 'dark-theme' : '';
    return themePalettes[theme];
}

export interface ViewChangeOptions {
    signalChange?: boolean;
    tooltipExclusions?: string[];
}

export interface Props {
    mounted: (app: App) => void;
    onViewChange: (viewChangeOptions: ViewChangeOptions) => void;
    onError: (e: any) => void;
    onDataFilter: (filter: SandDance.searchExpression.Search, filteredData: object[]) => void;
    onSelectionChanged: (search: SandDance.searchExpression.Search, activeIndex: number, selectedData: object[]) => void;
    onSnapshotsChanged: (snapshots: SandDance.types.Snapshot[]) => void;
}

export interface State {
    loaded: boolean;
    chromeless: boolean;
    darkTheme: boolean;
    rowCount: number;
    fetching: boolean;
}

export class App extends React.Component<Props, State> {
    private viewerOptions: Partial<SandDance.types.ViewerOptions>;
    private signalChanged: boolean;
    public explorer: Explorer_Class;

    constructor(props: Props) {
        super(props);
        this.state = {
            loaded: false,
            chromeless: false,
            darkTheme: null,
            rowCount: null,
            fetching: false
        };
        this.viewerOptions = this.getViewerOptions();
    }

    finalize() {
        this.explorer && this.explorer.finalize();
        this.explorer = null;
    }

    private getViewerOptions(darkTheme?: boolean): Partial<SandDance.types.ViewerOptions> {
        const textColor = darkTheme ? 'white' : 'black';
        const color = textColor;
        return {
            colors: {
                axisLine: color,
                axisText: color,
                hoveredCube: color
            },
            onDataFilter: this.props.onDataFilter,
            onSelectionChanged: this.props.onSelectionChanged,
            preserveDrawingBuffer: true
        };
    }

    getDataContent() {
        return this.explorer && this.explorer.state.dataContent && this.explorer.state.dataContent.data;
    }

    load(data: DataFile | object[], getPartialInsight: (columns: SandDance.types.Column[]) => Partial<SandDance.specs.Insight>, snapshots: SandDance.types.Snapshot[], tooltipExclusions: string[]) {
        const wasLoaded = this.state.loaded;
        this.setState({ loaded: true });
        if (wasLoaded) {
            this.explorer.setState({
                calculating: () => {
                    this.explorer.load(data, getPartialInsight, { tooltipExclusions });
                    this.explorer.setState({ snapshots });
                }
            });
        } else {
            this.explorer.load(data, getPartialInsight, { tooltipExclusions });
            this.explorer.setState({ snapshots });
        }
    }

    unload() {
        this.setState({ loaded: false });
    }

    fetchStatus(rowCount: number, fetching: boolean) {
        this.setState({ rowCount, fetching });
    }

    changeTheme(darkTheme: boolean) {
        this.viewerOptions = this.getViewerOptions(darkTheme);
        if (this.state.darkTheme !== darkTheme && this.explorer) {
            this.explorer.updateViewerOptions(this.viewerOptions);
            if (this.explorer.viewer) {
                this.explorer.viewer.renderSameLayout(this.explorer.viewerOptions);
            }
        }
        fluentUIComponents.loadTheme({ palette: getThemePalette(darkTheme) });
        this.setState({ darkTheme });
    }

    setChromeless(chromeless: boolean) {
        if (chromeless === this.state.chromeless) return;
        this.setState({ chromeless });
        this.explorer.sidebar(chromeless, !chromeless);
        this.explorer.resize();
    }

    render() {
        const className = util.classList(
            'sanddance-app',
            this.state.chromeless && 'chromeless',
            this.state.loaded && 'loaded'
        );
        const explorerProps: ExplorerProps = {
            hideSidebarControls: true,
            logoClickUrl: 'https://microsoft.github.io/SandDance/',
            bingSearchDisabled: true,
            searchORDisabled: true,
            theme: this.state.darkTheme && 'dark-theme',
            viewerOptions: this.viewerOptions,
            initialView: '2d',
            mounted: explorer => {
                // explorer.snapshotThumbWidth = 240;
                this.explorer = explorer;
                this.props.mounted(this);
            },
            onSignalChanged: (signalName, signalValue) => {
                this.props.onViewChange({ signalChange: true });
                this.signalChanged = true;
            },
            onSnapshotsChanged: this.props.onSnapshotsChanged,
            onTooltipExclusionsChanged: tooltipExclusions => this.props.onViewChange({ tooltipExclusions }),
            onView: () => {
                this.props.onViewChange({ signalChange: this.signalChanged });
                this.signalChanged = false;
            },
            onError: this.props.onError,
            systemInfoChildren: [
                React.createElement('li', null, `${language.powerBiCustomVisual}: ${version}`)
            ]
        };
        return React.createElement('div', { className },
            React.createElement(Explorer, explorerProps),
            React.createElement('div', { className: 'sanddance-init' },
                React.createElement('div', null,
                    React.createElement(Logo)
                ),
                !capabilities.webgl && React.createElement('div', { className: 'sanddance-webgl-required' },
                    language.webglDisabled
                )
            ),
            this.state.fetching && React.createElement('div', { className: 'sanddance-fetch' },
                `${language.fetching} ${this.state.rowCount ? `(${this.state.rowCount} ${language.fetched})` : ''}`
            )
        );
    }
}
