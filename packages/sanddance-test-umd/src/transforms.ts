// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
///<reference path='../node_modules/@msrvida/sanddance/dist/umd/sanddance.d.ts' />

namespace transformTest {

    declare var deck: SandDance.VegaDeckGl.types.DeckBase & SandDance.VegaDeckGl.types.DeckLayerBase;
    declare var luma: SandDance.VegaDeckGl.types.LumaBase;
    declare var vega: SandDance.VegaDeckGl.types.VegaBase;

    const insight: SandDance.specs.Insight = {
        columns: {
            color: 'brand',
            x: 'Horsepower',
            y: 'Miles_per_Gallon',
            z: 'Cylinders'
        },
        transform: [
            {
                type: 'formula',
                expr: 'split(datum.Name, " ")',
                as: 'name_split'
            },
            {
                type: 'formula',
                expr: 'datum.name_split[0]',
                as: 'brand'
            }
        ],
        size: {
            height: 700,
            width: 700
        },
        scheme: 'category20',
        view: '2d',
        chart: 'scatterplot',
        signalValues: {
            Chart_PointScaleSignal: 8,
            Text_AngleXSignal: 0,
            Text_AngleYSignal: -90,

        }
    };

    SandDance.use(vega, deck, deck, luma);
    export const viewer = new SandDance.Viewer(document.querySelector('#vis'));

    fetch('https://vega.github.io/editor/data/cars.json').then(response => {
        return response.json();
    }).then(json => {
        viewer.render(insight, json);
    });

}