/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

namespace SandDanceEmbed {

    declare let vega: SandDanceExplorer.SandDance.VegaMorphCharts.types.VegaBase;
    declare let FluentUIReact: _FluentUI.FluentUIComponents;

    export function defaultDependencies(): EmbedDependency[] {
        return [
            {
                type: 'stylesheet',
                url: 'https://unpkg.com/@msrvida/sanddance-embed@4/dist/css/sanddance-embed.css',
            },
            {
                type: 'stylesheet',
                url: 'https://unpkg.com/@msrvida/sanddance-explorer@4/dist/css/sanddance-explorer.css',
            },
            {
                type: 'script',
                url: 'https://unpkg.com/react@17/umd/react.production.min.js',
            },
            {
                type: 'script',
                url: 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
            },
            {
                type: 'script',
                url: 'https://unpkg.com/vega@5.22/build/vega.min.js',
            },
            {
                type: 'script',
                url: 'https://unpkg.com/@fluentui/react@8/dist/fluentui-react.js',
            },
            {
                type: 'script',
                url: 'https://unpkg.com/@msrvida/sanddance-explorer@4/dist/umd/sanddance-explorer.js',
            }
        ];
    }

    export function getDependencies(): EmbedDependency[] {
        const qs = decodeURIComponent(document.location.search.substring(1));
        if (qs[0] === '[') {
            try {
                return JSON.parse(qs);
            }
            catch (e) { }
        }
        return defaultDependencies();
    };

    export let deps: EmbedDependency[];

    function getUnloadedDeps(depType: EmbedDependencyType, tagType: string, tagAttr: string) {
        const depsToLoad = deps.filter(dep => dep.type === depType);
        const elements = [
            ...Array.from(document.head.querySelectorAll(tagType)),
            ...Array.from(document.body.querySelectorAll(tagType)),
        ];
        depsToLoad.forEach(dep => {
            const element = elements.find(element => element.attributes[tagAttr].nodeValue === dep.url);
            if (element) {
                dep.existed = true;
                dep.loaded = true;
            }
        });
        return depsToLoad.filter(dep => !dep.loaded);
    }

    function loadStyleSheets() {
        const promises: Promise<void>[] = [];
        const deps = getUnloadedDeps('stylesheet', 'link', 'href');
        deps.forEach(dep => {
            promises.push(new Promise<void>((resolve, reject) => {
                const el = document.createElement('link');
                el.rel = 'stylesheet';
                el.type = 'text/css';
                el.href = dep.url;
                el.onload = () => {
                    dep.loaded = true;
                    resolve();
                };
                document.head.appendChild(el);
            }));
        });
        return promises;
    }

    function loadScripts() {
        const deps = getUnloadedDeps('script', 'script', 'src');
        const promise = new Promise<void>((resolve, reject) => {
            const next = (index: number) => {
                if (index >= deps.length) {
                    resolve();
                } else {
                    const dep = deps[index];
                    const el = document.createElement('script');
                    el.src = dep.url;
                    el.onload = () => {
                        dep.loaded = true;
                        next(++index);
                    };
                    document.head.appendChild(el);
                }
            }
            next(0);
        });
        return [promise];
    }

    const prepare = new Promise<void>((resolve, reject) => {
        deps = getDependencies();
        Promise.all([...loadStyleSheets(), ...loadScripts()]).then(() => resolve());
    });

    interface DataWithInsight {
        data: DataToLoad;
        insight: Partial<SandDanceExplorer.SandDance.specs.Insight>;
    }

    export let sandDanceExplorer: SandDanceExplorer.Explorer_Class;
    export const requests: MessageRequestWithSource[] = [];
    let creating = false;
    let innerLoad: () => void;

    export function load(data: DataToLoad, insight?: Partial<SandDanceExplorer.SandDance.specs.Insight>, props?: SandDanceExplorer.Props) {
        return new Promise((resolve) => {

            innerLoad = () => {
                let getPartialInsight: (columns: SandDanceExplorer.SandDance.types.Column[]) => Partial<SandDanceExplorer.SandDance.specs.Insight>;
                if (insight) {
                    //TODO make sure that insight columns exist in dataset
                    getPartialInsight = columns => insight;
                }
                sandDanceExplorer.load(data, getPartialInsight).then(resolve);
            };

            const create = () => {
                creating = true;
                prepare.then(() => {
                    SandDanceExplorer.use(FluentUIReact, React, ReactDOM, vega);

                    const theme = props?.theme || '';
                    if (theme) {
                        FluentUIReact.loadTheme({ palette: SandDanceExplorer.themePalettes[theme] });
                    }
                    const viewerOptions = getViewerOptions(theme, props?.viewerOptions);

                    const explorerProps: SandDanceExplorer.Props = {
                        logoClickUrl: 'https://microsoft.github.io/SandDance/',
                        ...props,
                        mounted: explorer => {
                            sandDanceExplorer = explorer;
                            creating = false;
                            innerLoad();
                            props?.mounted && props.mounted(explorer);
                        },
                        viewerOptions,
                    };
                    ReactDOM.render(React.createElement(SandDanceExplorer.Explorer, explorerProps), document.body);
                });
            };

            if (sandDanceExplorer) {
                innerLoad();
            } else if (!creating) {
                create();
            }
        });
    }

    function getViewerOptions(theme: string, viewerOptions: Partial<SandDanceExplorer.SandDance.types.ViewerOptions>): Partial<SandDanceExplorer.ViewerOptions> {
        return {
            ...viewerOptions,
            colors: SandDanceExplorer.getColorSettingsFromThemePalette(SandDanceExplorer.themePalettes[theme]),
        };
    }

    export function changeColorScheme(darkTheme: boolean) {
        const theme = darkTheme ? 'dark-theme' : '';
        FluentUIReact.loadTheme({ palette: SandDanceExplorer.themePalettes[theme] });

        const viewerOptions = getViewerOptions(theme, sandDanceExplorer.viewerOptions);
        vega.scheme(SandDanceExplorer.SandDance.constants.ColorScaleNone, () => viewerOptions.colors.defaultCube);

        sandDanceExplorer.updateViewerOptions(viewerOptions);
        sandDanceExplorer.viewer.renderSameLayout(viewerOptions);
        const props: SandDanceExplorer.Props = { ...sandDanceExplorer.props, theme, viewerOptions };
        ReactDOM.render(React.createElement(SandDanceExplorer.Explorer, props), document.body);
    }

    export function respondToRequest(requestWithSource: MessageRequestWithSource) {
        requests.push(requestWithSource);
        const copy: MessageRequestWithSource = { ...requestWithSource };
        delete copy.source;
        const request: MessageRequest = { ...copy };
        let response: MessageResponse;
        switch (request.action) {
            case 'init': {
                response = {
                    request,
                };
                break;
            }
            case 'load': {
                const request_load = request as MessageRequest_Load;
                load(request_load.data, request_load.insight, request_load.props).then(() => {
                    response = {
                        request,
                    };
                    requestWithSource.source.postMessage(response, '*');
                });
                //don't keep a copy of the array
                delete request_load.data;
                break;
            }
            case 'getData': {
                response = <MessageResponse_GetData>{
                    request,
                    data: sandDanceExplorer.state.dataContent.data,
                };
                break;
            }
            case 'getInsight': {
                response = <MessageResponse_GetInsight>{
                    request,
                    insight: sandDanceExplorer.viewer.getInsight(),
                };
                break;
            }
            case 'theme': {
                const request_theme = request as MessageRequest_Theme;
                if (request_theme.dark !== undefined) {
                    changeColorScheme(request_theme.dark);
                }
                response = <MessageResponse_Theme>{
                    request,
                    theme: sandDanceExplorer.props.theme,
                };
            }
        }
        prepare.then(() => {
            if (response) {
                requestWithSource.source.postMessage(response, '*');
            }
        });
    }

    window.addEventListener('message', e => {
        let payload: object[] | DataWithInsight | MessageRequest = e.data;
        if (!payload) return;
        if (Array.isArray(payload)) {
            const data = payload;
            const requestLoadFromArray: MessageRequest_Load = {
                action: 'load',
                data,
                insight: null,
            };
            payload = requestLoadFromArray;
        } else {
            const dataWithInsight = payload as DataWithInsight;
            if (Array.isArray(dataWithInsight.data)) {
                const requestLoadFromDataWithInsight: MessageRequest_Load = {
                    action: 'load',
                    ...dataWithInsight,
                };
                payload = requestLoadFromDataWithInsight;
            }
        }
        const request = payload as MessageRequest;
        if (!request) return;
        const requestWithSource = { ...request, source: e.source as WindowProxy };
        respondToRequest(requestWithSource);
    });

    if (window.opener) {
        const request: MessageRequest_Init = {
            action: 'init',
            ts: new Date(),
        };
        respondToRequest({ ...request, source: window.opener });
    }
}
