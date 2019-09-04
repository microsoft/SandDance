// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as deck from '@deck.gl/core';
import * as fabric from 'office-ui-fabric-react';
import * as layers from '@deck.gl/layers';
import * as luma from 'luma.gl';
import * as React from 'react';
import * as vega from 'vega-lib';
import {
    capabilities,
    DataFile,
    Explorer,
    Props as ExplorerProps,
    SandDance,
    themePalettes,
    use,
    util
} from '@msrvida/sanddance-explorer';
import { Logo } from '@msrvida/sanddance-explorer/dist/es6/controls/logo';
import { strings } from './language';

fabric.initializeIcons();

use(fabric as any, vega as any, deck, layers, luma);

function getThemePalette(darkTheme: boolean) {
    const theme = darkTheme ? 'dark-theme' : '';
    return themePalettes[theme];
}

export interface Props {
    mounted: (app: App) => void;
    onViewChange: (tooltipExclusions?: string[]) => void;
    onDataFilter: (filter: SandDance.types.Search, filteredData: object[]) => void;
}

export interface State {
    loaded: boolean;
    chromeless: boolean;
    darkTheme: boolean;
}

export class App extends React.Component<Props, State> {
    private viewerOptions: Partial<SandDance.types.ViewerOptions>;
    public explorer: Explorer;

    constructor(props: Props) {
        super(props);
        this.state = {
            loaded: false,
            chromeless: false,
            darkTheme: null
        };
        this.viewerOptions = this.getViewerOptions();
    }

    finalize() {
        this.explorer && this.explorer.finalize();
        this.explorer = null;
    }

    private getViewerOptions(darkTheme?: boolean) {
        const textColor = darkTheme ? "white" : "black";
        const color = SandDance.VegaDeckGl.util.colorFromString(textColor);
        const viewerOptions: Partial<SandDance.types.ViewerOptions> = {
            colors: {
                axisLine: color,
                axisText: color,
                hoveredCube: color
            },
            onDataFilter: this.props.onDataFilter
        };
        return viewerOptions;
    }

    getDataContent() {
        return this.explorer && this.explorer.state.dataContent && this.explorer.state.dataContent.data;
    }

    load(data: DataFile | object[], getPartialInsight: (columns: SandDance.types.Column[]) => Partial<SandDance.types.Insight>, tooltipExclusions?: string[]) {
        this.setState({ loaded: true });
        return this.explorer.load(data, getPartialInsight, { tooltipExclusions });
    }

    unload() {
        this.setState({ loaded: false });
    }

    changeTheme(darkTheme: boolean) {
        this.viewerOptions = this.getViewerOptions(darkTheme);
        if (this.state.darkTheme !== darkTheme && this.explorer) {
            this.explorer.updateViewerOptions(this.viewerOptions);
            if (this.explorer.viewer) {
                this.explorer.viewer.renderSameLayout(this.explorer.viewerOptions);
            }
        }
        fabric.loadTheme({ palette: getThemePalette(darkTheme) });
        this.setState({ darkTheme });
    }

    setChromeless(chromeless: boolean) {
        this.setState({ chromeless });
        this.explorer.sidebar(chromeless, !chromeless);
        this.explorer.resize();
    }

    render() {
        const className = util.classList(
            "sanddance-app",
            this.state.chromeless && "chromeless",
            this.state.loaded && "loaded"
        );
        const explorerProps: ExplorerProps = {
            hideSidebarControls: true,
            logoClickUrl: "https://microsoft.github.io/SandDance/",
            theme: this.state.darkTheme && 'dark-theme',
            viewerOptions: this.viewerOptions,
            initialView: "2d",
            mounted: explorer => {
                this.explorer = explorer;
                this.props.mounted(this);
            },
            onSignalChanged: this.props.onViewChange,
            onTooltipExclusionsChanged: tooltipExclusions => this.props.onViewChange(tooltipExclusions),
            onView: this.props.onViewChange
        };
        return React.createElement("div", { className },
            React.createElement(Explorer, explorerProps),
            React.createElement("div", { className: "sanddance-init" },
                React.createElement("div", null,
                    React.createElement(Logo)
                ),
                !capabilities.webgl && React.createElement("div", { className: "sanddance-webgl-required" },
                    strings.webglDisabled
                ),
            )
        );
    }
}
