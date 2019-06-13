// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
declare var vega: SandDanceExplorer.SandDance.VegaDeckGl.types.VegaBase;
declare var deck: SandDanceExplorer.SandDance.VegaDeckGl.types.DeckBase & SandDanceExplorer.SandDance.VegaDeckGl.types.DeckLayerBase;
declare var luma: SandDanceExplorer.SandDance.VegaDeckGl.types.LumaBase;
declare var Fabric: _Fabric.FabricComponents;

function SandDanceEmbed(data: object[] | SandDanceExplorer.DataFile, insight?: Partial<SandDanceExplorer.SandDance.types.Insight>) {
    SandDanceExplorer.use(Fabric, vega, deck, deck, luma);
    ReactDOM.render(React.createElement(SandDanceExplorer.Explorer, {
        mounted: explorer => {
            explorer.load(data, columns => {
                return insight || {};
            });
        }
    }), document.getElementById('app'));
}
