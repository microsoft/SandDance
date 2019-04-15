// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
declare var vega: SandDanceExplorer.SandDance.VegaDeckGl.types.VegaBase;
declare var deck: SandDanceExplorer.SandDance.VegaDeckGl.types.DeckBase & SandDanceExplorer.SandDance.VegaDeckGl.types.DeckLayerBase;
declare var luma: SandDanceExplorer.SandDance.VegaDeckGl.types.LumaBase;
declare var Fabric: any;

SandDanceExplorer.use(ReactDOM.render, Fabric, vega, deck, deck, luma);

function getTextcolor() {
    const cssColor = getComputedStyle(document.body).color;
    return SandDanceExplorer.SandDance.VegaDeckGl.util.colorFromString(cssColor);
}

function getViewerOptions() {
    const color = getTextcolor();
    const viewerOptions: Partial<SandDanceExplorer.SandDance.types.ViewerOptions> = {
        colors: {
            axisLine: color,
            axisText: color,
            hoveredCube: color
        }
    };
    return viewerOptions;
}

function getVscodeThemeClassName() {
    const classList = [].slice.apply(document.body.classList) as string[];
    const prefixed = classList.filter(className => className.indexOf('vscode') === 0);
    if (prefixed.length) {
        return prefixed[0];
    }
}

function mounted(explorer: SandDanceExplorer.Explorer) {

    // Handle the message inside the webview
    window.addEventListener('message', event => {

        const message = event.data as Message;

        switch (message.command) {
            case 'gotFileContent':
                explorer.load(message.dataFile);

                //TODO: hydrate state

                break;
        }
    });

    const vscode = acquireVsCodeApi();

    vscode.postMessage({
        command: 'getFileContent'
    })

    let vscodeThemeClassName = getVscodeThemeClassName();
    new MutationObserver((mutationRecords) => {
        const newClassName = getVscodeThemeClassName();
        if (newClassName !== vscodeThemeClassName) {
            vscodeThemeClassName = newClassName;
            explorer.updateViewerOptions(getViewerOptions());
            explorer.viewer.renderSameLayout(explorer.viewerOptions);
        }
    }).observe(document.body, { attributeFilter: ['class'] });
}

const props: SandDanceExplorer.Props = {
    viewerOptions: getViewerOptions(),
    initialView: "2d",
    mounted
};

const app = React.createElement(SandDanceExplorer.Explorer, props);
ReactDOM.render(app, document.getElementById('app'));
