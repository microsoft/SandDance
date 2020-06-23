// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import SandDance = SandDanceExplorer.SandDance;
import VegaDeckGl = SandDance.VegaDeckGl;

declare var vega: VegaDeckGl.types.VegaBase;
declare var deck: VegaDeckGl.types.DeckBase & VegaDeckGl.types.DeckLayerBase;
declare var luma: VegaDeckGl.types.LumaBase;
declare var FluentUIReact: _FluentUI.FluentUIComponents;

namespace SandDanceEmbed {

    interface DataWithInsight {
        data: object[];
        insight: Partial<SandDance.specs.Insight>;
    }

    export let sandDanceExplorer: SandDanceExplorer.Explorer_Class;
    export const requests: MessageRequestWithSource[] = [];

    export function load(data: object[] | SandDanceExplorer.DataFile, insight?: Partial<SandDance.specs.Insight>) {
        return new Promise((resolve) => {

            const innerLoad = () => {
                let getPartialInsight: (columns: SandDance.types.Column[]) => Partial<SandDance.specs.Insight>;
                if (insight) {
                    //TODO make sure that insight columns exist in dataset
                    getPartialInsight = columns => insight;
                }
                sandDanceExplorer.load(data, getPartialInsight).then(resolve);
            };

            const create = () => {
                SandDanceExplorer.use(FluentUIReact, React, ReactDOM, vega, deck, deck, luma);
                const explorerProps: SandDanceExplorer.Props = {
                    logoClickUrl: 'https://microsoft.github.io/SandDance/',
                    mounted: explorer => {
                        sandDanceExplorer = explorer;
                        innerLoad();
                    }
                };
                ReactDOM.render(React.createElement(SandDanceExplorer.Explorer, explorerProps), document.getElementById('app'));
            };

            if (sandDanceExplorer) {
                innerLoad();
            } else {
                create();
            }
        });
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
                    request
                };
                break;
            }
            case 'load': {
                const request_load = request as MessageRequest_Load;
                load(request_load.data, request_load.insight).then(() => {
                    response = {
                        request
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
                    data: sandDanceExplorer.state.dataContent.data
                };
                break;
            }
            case 'getInsight': {
                response = <MessageResponse_GetInsight>{
                    request,
                    insight: sandDanceExplorer.viewer.getInsight()
                };
                break;
            }
        }
        if (response) {
            requestWithSource.source.postMessage(response, '*');
        }
    }

    window.addEventListener('message', e => {
        let payload: object[] | DataWithInsight | MessageRequest = e.data;
        if (!payload) return;
        if (Array.isArray(payload)) {
            const data = payload;
            const requestLoadFromArray: MessageRequest_Load = {
                action: 'load',
                data,
                insight: null
            };
            payload = requestLoadFromArray;
        } else {
            const dataWithInsight = payload as DataWithInsight;
            if (Array.isArray(dataWithInsight.data)) {
                const requestLoadFromDataWithInsight: MessageRequest_Load = {
                    action: 'load',
                    ...dataWithInsight
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
            ts: new Date()
        };
        respondToRequest({ ...request, source: window.opener });
    }
}
