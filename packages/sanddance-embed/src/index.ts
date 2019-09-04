// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import SandDance = SandDanceExplorer.SandDance;
import VegaDeckGl = SandDance.VegaDeckGl;

declare var vega: VegaDeckGl.types.VegaBase;
declare var deck: VegaDeckGl.types.DeckBase & VegaDeckGl.types.DeckLayerBase;
declare var luma: VegaDeckGl.types.LumaBase;
declare var Fabric: _Fabric.FabricComponents;

function SandDanceEmbed(data: object[] | SandDanceExplorer.DataFile, insight?: Partial<SandDance.types.Insight>) {
    SandDanceExplorer.use(Fabric, vega, deck, deck, luma);
    const explorerProps: SandDanceExplorer.Props = {
        logoClickUrl: 'https://microsoft.github.io/SandDance/',
        mounted: explorer => {
            explorer.load(data, columns => {
                return insight || {};
            });
        }
    };
    ReactDOM.render(React.createElement(SandDanceExplorer.Explorer, explorerProps), document.getElementById('app'));
}
