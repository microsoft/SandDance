// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
declare var vega: SandDanceExplorer.SandDance.VegaDeckGl.types.VegaBase;
declare var deck: SandDanceExplorer.SandDance.VegaDeckGl.types.DeckBase & SandDanceExplorer.SandDance.VegaDeckGl.types.DeckLayerBase;
declare var luma: SandDanceExplorer.SandDance.VegaDeckGl.types.LumaBase;
declare var Fabric: _Fabric.FabricComponents;

function SandDanceEmbed(data: object[] | SandDanceExplorer.DataFile, insight?: Partial<SandDanceExplorer.SandDance.types.Insight>) {
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
