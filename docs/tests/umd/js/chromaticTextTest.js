var chromaticTextTest;
(function (chromaticTextTest) {
    SandDance.use(null, deck, deck, luma);
    var colors = {
        red: [255, 0, 0],
        green: [0, 255, 0],
        blue: [0, 0, 255],
        black: [0, 0, 0]
    };
    chromaticTextTest.presenter = new SandDance.VegaDeckGl.Presenter(document.querySelector('#vis'));
    var stage = {
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
    chromaticTextTest.presenter.present(stage, 0, 0, {
        getTextHighlightColor: function (t) {
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
    var orbitViewState = {
        distance: 10,
        fov: 60,
        lookAt: [0, 0, 0],
        rotationOrbit: 0,
        rotationX: 90,
        zoom: 0.05
    };
    chromaticTextTest.presenter.deckgl.setProps({ viewState: orbitViewState });
})(chromaticTextTest || (chromaticTextTest = {}));
