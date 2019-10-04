// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import SandDance = SandDanceExplorer.SandDance;
import VegaDeckGl = SandDance.VegaDeckGl;

declare var vega: VegaDeckGl.types.VegaBase;
declare var deck: VegaDeckGl.types.DeckBase & VegaDeckGl.types.DeckLayerBase;
declare var luma: VegaDeckGl.types.LumaBase;
declare var Fabric: _Fabric.FabricComponents;

namespace SandDanceEmbed {
    export let sandDanceExplorer: SandDanceExplorer.Explorer;
    export const requests: (MessageRequest & { source: WindowProxy })[] = [];

    export function load(data: object[] | SandDanceExplorer.DataFile, insight?: Partial<SandDance.types.Insight>) {

        const _load = () => {
            let getPartialInsight: (columns: SandDance.types.Column[]) => Partial<SandDance.types.Insight>;
            if (insight) {
                //TODO make sure that insight columns exist in dataset
                getPartialInsight = columns => insight;
            }
            sandDanceExplorer.load(data, getPartialInsight);
        };

        const init = () => {
            SandDanceExplorer.use(Fabric, vega, deck, deck, luma);
            const explorerProps: SandDanceExplorer.Props = {
                logoClickUrl: 'https://microsoft.github.io/SandDance/',
                mounted: explorer => {
                    sandDanceExplorer = explorer;
                    _load();
                }
            };
            ReactDOM.render(React.createElement(SandDanceExplorer.Explorer, explorerProps), document.getElementById('app'));
        };

        if (sandDanceExplorer) {
            _load();
        } else {
            init();
        }
    }

    interface DataWithInsight {
        data: object[];
        insight: Partial<SandDance.types.Insight>;
    }

    window.addEventListener('message', e => {
        const payload: object[] | DataWithInsight | MessageRequest = e.data;
        if (!payload) return;
        if (Array.isArray(payload)) {
            load(payload);
        } else {
            const dataWithInsight = payload as DataWithInsight;
            if (Array.isArray(dataWithInsight.data)) {
                load(dataWithInsight.data, dataWithInsight.insight);
            } else {
                const request = payload as MessageRequest;
                const requestWithSource = { ...request, source: e.source as WindowProxy };
                requests.push(requestWithSource);
                switch (request.action) {
                    case 'load': {
                        const request_load = request as MessageRequest_Load;
                        load(request_load.data, request_load.insight);
                        //don't keep a copy of the array
                        delete request_load.data;
                    }
                        break;
                    case 'getData': {
                        const response: MessageResponse_GetData = {
                            request,
                            data: sandDanceExplorer.state.dataContent.data
                        };
                        requestWithSource.source.postMessage(response, '*');
                    }
                        break;
                    case 'getInsight': {
                        const response: MessageResponse_GetInsight = {
                            request,
                            insight: sandDanceExplorer.viewer.getInsight()
                        };
                        requestWithSource.source.postMessage(response, '*');
                    }
                        break;
                }
            }
        }
    });
}
