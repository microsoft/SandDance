// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
///<reference path='../node_modules/@msrvida/sanddance/dist/umd/sanddance.d.ts' />

namespace scatterplotTest {

    declare var deck: SandDance.VegaDeckGl.types.DeckBase & SandDance.VegaDeckGl.types.DeckLayerBase;
    declare var luma: SandDance.VegaDeckGl.types.LumaBase;
    declare var vega: SandDance.VegaDeckGl.types.VegaBase;

    SandDance.use(vega, deck, deck, luma);
    export const viewer = new SandDance.Viewer(document.querySelector('#vis'));

    const glDiv = viewer.presenter.getElement(SandDance.VegaDeckGl.PresenterElement.gl);
    const options: SandDance.specs.Insight = {
        columns: {
            color: 'Education',
            sort: 'TotalPop',
            uid: 'Id',
            x: 'Longitude',
            y: 'Latitude',
            z: 'Income'
        },
        scheme: 'redblue',
        size: {
            height: glDiv.offsetHeight,
            width: glDiv.offsetWidth
        },
        chart: 'scatterplot'
    };

    vega.loader().load('../../sample-data/demovote.tsv').then(text => {
        const data = vega.read(text, { type: 'tsv' });
        viewer.render(options, data);
    });

}
