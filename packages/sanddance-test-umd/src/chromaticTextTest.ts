// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
///<reference path='../node_modules/@msrvida/sanddance/dist/umd/sanddance.d.ts' />
///<reference path='deckgl.d.ts' />

namespace chromaticTextTest {

    declare var deck: SandDance.VegaDeckGl.types.DeckBase & SandDance.VegaDeckGl.types.DeckLayerBase;
    declare var luma: SandDance.VegaDeckGl.types.LumaBase;

    SandDance.use(null, deck, deck, luma);

    const colors: { [name: string]: deck.Color } = {
        red: [255, 0, 0],
        green: [0, 255, 0],
        blue: [0, 0, 255],
        black: [0, 0, 0]
    };

    export var presenter = new SandDance.VegaDeckGl.Presenter(document.querySelector('#vis'));
    var stage: SandDance.VegaDeckGl.types.Stage = {
        view: "2d",
        cubeData: [],
        axes: { "x": [], "y": [] },
        legend: { rows: {} },
        gridLines: [],
        textData: [
            {
                color: colors.black,
                text: "red",
                position: [-100, 0, 0],
                size: 500,
                textAnchor: "middle"
            },
            {
                color: colors.black,
                text: "green",
                position: [0, 0, 0],
                size: 500,
                textAnchor: "middle"
            },
            {
                color: colors.black,
                text: "blue",
                position: [100, 0, 0],
                size: 500,
                textAnchor: "middle"
            }
        ]
    };

    presenter.present(stage, 0, 0, {
        getTextHighlightColor: t => {
            switch (t.text) {
                case 'red':
                    return colors.red;
                case 'green':
                    return colors.green;
                case 'blue':
                    return colors.blue;
            }
            return colors.black;
        }
    });

    var orbitViewState: deck.OrbitViewState = {
        distance: 10,
        fov: 60,
        lookAt: [0, 0, 0],
        rotationOrbit: 0,
        rotationX: 90,
        zoom: 0.05
    };

    presenter.deckgl.setProps({ viewState: orbitViewState });
}
