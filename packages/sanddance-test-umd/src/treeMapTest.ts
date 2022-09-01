// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
///<reference path='../node_modules/@msrvida/sanddance/dist/umd/sanddance.d.ts' />

namespace treeMapTest {

    declare const vega: SandDance.VegaMorphCharts.types.VegaBase;

    SandDance.use(vega);
    export const viewer = new SandDance.Viewer(document.querySelector('#vis'));

    const glDiv = viewer.presenter.getElement(SandDance.VegaMorphCharts.PresenterElement.gl);
    const insight: SandDance.specs.Insight = {
        columns: {
            color: 'Class',
            size: 'TicketCost',
            uid: 'Name',
        },
        scheme: 'category10',
        size: {
            height: glDiv.offsetHeight,
            width: glDiv.offsetWidth,
        },
        chart: 'treemap',
    };

    vega.loader().load('../../../sample-data/titanicmaster.tsv').then(text => {
        const data = vega.read(text, { type: 'tsv' });
        viewer.render({ insight }, data);
    });

}
