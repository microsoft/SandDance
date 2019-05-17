// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as fabric from "office-ui-fabric-react";
import * as React from 'react';
import { Explorer, SandDance, themePalettes, use } from "@msrvida/sanddance-explorer";

function getTextcolor() {
    const cssColor = getComputedStyle(document.body).color;
    return SandDance.VegaDeckGl.util.colorFromString(cssColor);
}

function getThemePalette(darkTheme: boolean) {
    const theme = darkTheme ? 'dark-theme' : '';
    return themePalettes[theme];
}

function getViewerOptions() {
    const color = getTextcolor();
    const viewerOptions: Partial<SandDance.types.ViewerOptions> = {
        colors: {
            axisLine: color,
            axisText: color,
            hoveredCube: color
        }
    };
    return viewerOptions;
}

export interface Props {
    mounted: (explorer: Explorer) => void;
}

export interface State {
    darkTheme: boolean;
}

export class App extends React.Component<Props, State> {
    private viewerOptions: Partial<SandDance.types.ViewerOptions>;
    public explorer: Explorer;

    constructor(props: Props) {
        super(props);
        this.state = {
            darkTheme: null
        };
        this.viewerOptions = getViewerOptions();
    }

    checkForDarkTheme() {
        this.viewerOptions = getViewerOptions();
        const darkTheme = false;
        if (this.state.darkTheme !== darkTheme && this.explorer) {
            this.explorer.updateViewerOptions(this.viewerOptions);
            if (this.explorer.viewer) {
                this.explorer.viewer.renderSameLayout(this.explorer.viewerOptions);
            }
        }
        fabric.loadTheme({ palette: getThemePalette(darkTheme) });
        this.setState({ darkTheme });
    }

    render() {
        return React.createElement(
            Explorer,
            {
                logoClickUrl: "https://microsoft.github.io/SandDance/",
                theme: this.state.darkTheme && 'dark-theme',
                viewerOptions: this.viewerOptions,
                initialView: "2d",
                mounted: (e) => this.props.mounted(e)
            }
        );
    }
}
