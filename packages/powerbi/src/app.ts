// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as fabric from "office-ui-fabric-react";
import * as React from 'react';
import { Explorer, SandDance, themePalettes, use } from "@msrvida/sanddance-explorer";

function getThemePalette(darkTheme: boolean) {
    const theme = darkTheme ? 'dark-theme' : '';
    return themePalettes[theme];
}

export interface Props {
    mounted: (app: App) => void;
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
        this.viewerOptions = this.getViewerOptions();
    }

    private getViewerOptions(darkTheme?: boolean) {
        const textColor = darkTheme ? "white" : "black";
        const color = SandDance.VegaDeckGl.util.colorFromString(textColor);
        const viewerOptions: Partial<SandDance.types.ViewerOptions> = {
            colors: {
                axisLine: color,
                axisText: color,
                hoveredCube: color
            }
        };
        return viewerOptions;
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

    render() {
        return React.createElement(
            Explorer,
            {
                logoClickUrl: "https://microsoft.github.io/SandDance/",
                theme: this.state.darkTheme && 'dark-theme',
                viewerOptions: this.viewerOptions,
                initialView: "2d",
                mounted: explorer => {
                    this.explorer = explorer;
                    this.props.mounted(this);
                }
            }
        );
    }
}
