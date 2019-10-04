// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import SandDance = SandDanceExplorer.SandDance;
import VegaDeckGl = SandDance.VegaDeckGl;

declare var vega: VegaDeckGl.types.VegaBase;
declare var deck: VegaDeckGl.types.DeckBase & VegaDeckGl.types.DeckLayerBase;
declare var luma: VegaDeckGl.types.LumaBase;
declare var Fabric: _Fabric.FabricComponents;

let sandDanceExplorer: SandDanceExplorer.Explorer;

function SandDanceEmbed(data: object[] | SandDanceExplorer.DataFile, insight?: Partial<SandDance.types.Insight>) {

    const load = () => {
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
                load();
            }
        };
        ReactDOM.render(React.createElement(SandDanceExplorer.Explorer, explorerProps), document.getElementById('app'));
    };

    if (sandDanceExplorer) {
        load();
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
        SandDanceEmbed(payload);
    } else {
        const dataWithInsight = payload as DataWithInsight;
        if (Array.isArray(dataWithInsight.data)) {
            SandDanceEmbed(dataWithInsight.data, dataWithInsight.insight);
        } else {
            const request = payload as MessageRequest;
            switch (request.action) {
                case 'load': {
                    const request_load = request as MessageRequest_Load;
                    SandDanceEmbed(request_load.data, request_load.insight);
                }
                    break;
                case 'getData': {
                    const response: MessageResponse_GetData = {
                        requestAction: request.action,
                        data: sandDanceExplorer.state.dataContent.data
                    };
                    (e.source as WindowProxy).postMessage(response, '*');
                }
                    break;
                case 'getInsight': {
                    const response: MessageResponse_GetInsight = {
                        requestAction: request.action,
                        insight: sandDanceExplorer.viewer.getInsight()
                    };
                    (e.source as WindowProxy).postMessage(response, '*');
                }
                    break;
            }
        }
    }
});
