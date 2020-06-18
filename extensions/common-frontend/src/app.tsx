// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import SandDance = SandDanceExplorer.SandDance;
import VegaDeckGl = SandDance.VegaDeckGl;

declare var vega: VegaDeckGl.types.VegaBase;
declare var deck: VegaDeckGl.types.DeckBase & VegaDeckGl.types.DeckLayerBase;
declare var luma: VegaDeckGl.types.LumaBase;
declare var FluentUIReact: _FluentUI.FluentUIComponents;

namespace SandDanceApp {
    SandDanceExplorer.use(FluentUIReact, React, ReactDOM, vega, deck, deck, luma);

    function getTextcolor() {
        return getComputedStyle(document.body).color;
    }

    function getThemePalette(darkTheme: boolean) {
        const theme = darkTheme ? 'dark-theme' : '';
        return SandDanceExplorer.themePalettes[theme];
    }

    function getViewerOptions(darkTheme: boolean) {
        const color = getTextcolor();
        const viewerOptions: Partial<SandDanceExplorer.ViewerOptions> = {
            colors: {
                ...SandDanceExplorer.getColorSettingsFromThemePalette(getThemePalette(darkTheme)),
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

    interface State {
        compactUI: boolean;
        darkTheme: boolean;
    }

    interface Handlers {
        message: (e: MessageEvent) => void;
        resize: (e: UIEvent) => void;
        keyup: (e: KeyboardEvent) => void;
    }

    const z = 'z'.charCodeAt(0);
    const Z = 'Z'.charCodeAt(0);

    export class App extends React.Component<{}, State> {
        private viewerOptions: Partial<SandDance.types.ViewerOptions>;
        private handlers: Handlers;
        public explorer: SandDanceExplorer.Explorer_Class;
        public vscode: VsCode;

        constructor(props: {}) {
            super(props);

            this.vscode = acquireVsCodeApi();

            this.state = {
                compactUI: false,
                darkTheme: null
            };
            this.viewerOptions = getViewerOptions(this.state.darkTheme);

            this.handlers = {
                message: event => {
                    // Handle the message inside the webview
                    const message = event.data as Message;

                    switch (message.command) {
                        case 'gotFileContent':
                            if (this.explorer) {
                                this.explorer.load(message.dataFile);
                                this.setState({ compactUI: message.compactUI });
                            }

                            //TODO: hydrate state
                            break;
                    }
                },
                resize: e => {
                    this.explorer && this.explorer.resize();
                },
                keyup: e => {
                    //look for CTRL Z or CTRL SHIFT Z
                    if (e.ctrlKey && (e.keyCode === z || e.keyCode === Z)) {
                        if (e.shiftKey) {
                            this.explorer.redo();
                        } else {
                            this.explorer.undo();
                        }
                    }
                }
            };
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

        checkForDarkTheme() {
            let vscodeThemeClassName = getVscodeThemeClassName();
            const darkTheme = vscodeThemeClassName.indexOf('dark') >= 0;
            this.viewerOptions = getViewerOptions(darkTheme);
            if (this.state.darkTheme !== darkTheme && this.explorer) {
                this.explorer.updateViewerOptions(this.viewerOptions);
                if (this.explorer.viewer) {
                    this.explorer.viewer.renderSameLayout(this.explorer.viewerOptions);
                }
            }
            FluentUIReact.loadTheme({ palette: getThemePalette(darkTheme) });
            this.setState({ darkTheme });
        }

        mounted(explorer: SandDanceExplorer.Explorer_Class) {
            this.explorer = explorer;

            this.wireEventHandlers(true);

            this.vscode.postMessage({
                command: 'getFileContent'
            });

            this.checkForDarkTheme();

            new MutationObserver((mutationRecords) => {
                this.checkForDarkTheme();
            }).observe(document.body, { attributeFilter: ['class'] });
        }

        render() {
            return (
                <SandDanceExplorer.Explorer
                    logoClickUrl="https://microsoft.github.io/SandDance/"
                    theme={this.state.darkTheme && 'dark-theme'}
                    viewerOptions={this.viewerOptions}
                    initialView="2d"
                    mounted={e => this.mounted(e)}
                    compactUI={this.state.compactUI}
                    additionalSettings={[
                        {
                            groupLabel: strings.labelPreferences,
                            children: (
                                <FluentUIReact.Toggle
                                    label={strings.labelCompactUI}
                                    title={strings.labelCompactUIDescription}
                                    checked={this.state.compactUI}
                                    onChange={(e, checked?) => {
                                        this.vscode.postMessage({
                                            command: 'setCompactUI',
                                            compactUI: checked
                                        });
                                        this.setState({ compactUI: checked });
                                    }}
                                />
                            )
                        }
                    ]}
                />
            );
        }
    }

    const app = React.createElement(App);
    ReactDOM.render(app, document.getElementById('app'));
}
