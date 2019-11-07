// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
///<reference path='../node_modules/@msrvida/sanddance/dist/umd/sanddance.d.ts' />
///<reference path='deckgl.d.ts' />

namespace cubeTest {

    declare var deck: SandDance.VegaDeckGl.types.DeckBase & SandDance.VegaDeckGl.types.DeckLayerBase;
    declare var luma: SandDance.VegaDeckGl.types.LumaBase;

    SandDance.use(null, deck, deck, luma);

    const colors: { [name: string]: deck.Color } = {
        red: [255, 0, 0],
        green: [0, 255, 0],
        blue: [0, 0, 255],
        gray: [128, 128, 128]
    };

    export var presenter = new SandDance.VegaDeckGl.Presenter(document.querySelector('#vis'));
    var stage: SandDance.VegaDeckGl.types.Stage = {
        shapeData: [
            {
                color: colors.red,
                polygon: [[0, 0, 0], [100, 0, 0], [100, 100, 0], [0, 100, 0], [0, 0, 0]],
                depth: 100
            },
            {
                color: colors.green,
                polygon: [[100, 0, 100], [200, 0, 100], [200, 100, 100], [100, 100, 100], [100, 0, 100]],
                depth: 100
            },
            {
                color: colors.blue,
                polygon: [[0, 100, 100], [100, 100, 100], [100, 200, 100], [0, 200, 100], [0, 100, 100]],
                depth: 100
            }
        ],
        legend: { rows: {} },
        axes: {
            x: [{
                domain: {
                    color: [0, 0, 0],
                    sourcePosition: [0, 0, 0],
                    targetPosition: [400, 0, 0],
                    strokeWidth: 10
                },
                ticks: [],
                tickText: []
            }],
            y: [{
                domain: {
                    color: [0, 0, 0],
                    sourcePosition: [0, 0, 0],
                    targetPosition: [0, 200, 0],
                    strokeWidth: 10
                },
                ticks: [],
                tickText: []
            }]
        },
        textData: [],
        view: '3d'
    };

    presenter.present(stage, 200, 400);

    var orbitViewState: deck.OrbitViewState = {
        distance: 10,
        fov: 60,
        lookAt: [90, 15, 23, 1],
        rotationOrbit: -45,
        rotationX: 67,
        zoom: 0.01
    };

    presenter.deckgl.setProps({ viewState: orbitViewState });

    document.getElementById('animate').addEventListener('click', e => {

        stage.shapeData = [
            {
                color: colors.blue,
                polygon: [[0, 300, 100], [100, 300, 100], [100, 400, 100], [0, 400, 100], [0, 300, 100]],
                depth: 100
            },
            {
                color: colors.gray,
                polygon: [[100, 100, 300], [110, 100, 300], [110, 110, 300], [100, 110, 300], [100, 100, 300]],
                depth: 10
            },
            {
                color: colors.red,
                polygon: [[300, 0, 0], [400, 0, 0], [400, 100, 0], [300, 100, 0], [300, 0, 0]],
                depth: 100
            },
            {
                color: colors.green,
                polygon: [[100, 300, 100], [200, 300, 100], [200, 400, 100], [100, 400, 100], [100, 300, 100]],
                depth: 100
            },
        ];

        presenter.present(stage, 200, 400);

    });
}
