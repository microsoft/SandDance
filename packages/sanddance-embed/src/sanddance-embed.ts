// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import SandDance = SandDanceExplorer.SandDance;
import VegaDeckGl = SandDance.VegaDeckGl;

declare var vega: VegaDeckGl.types.VegaBase;
declare var deck: VegaDeckGl.types.DeckBase & VegaDeckGl.types.DeckLayerBase;
declare var luma: VegaDeckGl.types.LumaBase;
declare var Fabric: _Fabric.FabricComponents;

let explorer: SandDanceExplorer.Explorer;

function SandDanceEmbed(data: object[] | SandDanceExplorer.DataFile, insight?: Partial<SandDance.types.Insight>) {

    const load = () => {
        let getPartialInsight: (columns: SandDance.types.Column[]) => Partial<SandDance.types.Insight>;
        if (insight) {
            //TODO make sure that insight columns exist in dataset
            getPartialInsight = columns => insight;
        }
        explorer.load(data, getPartialInsight);
    };

    const init = () => {
        SandDanceExplorer.use(Fabric, vega, deck, deck, luma);
        const explorerProps: SandDanceExplorer.Props = {
            logoClickUrl: 'https://microsoft.github.io/SandDance/',
            mounted: e => {
                explorer = e;
                load();
            }
        };
        ReactDOM.render(React.createElement(SandDanceExplorer.Explorer, explorerProps), document.getElementById('app'));
    };

    if (explorer) {
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
    const payload: object[] | DataWithInsight = e.data;
    if (Array.isArray(payload)) {
        SandDanceEmbed(payload);
    } else {
        if (Array.isArray(payload.data)) {
            SandDanceEmbed(payload.data, payload.insight);
        }
    }
});
