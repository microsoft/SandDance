var chromaticTextTest;
(function (chromaticTextTest) {
    SandDance.use(null, deck, deck, luma);
    var colors = {
        red: [255, 0, 0],
        green: [0, 255, 0],
        blue: [0, 0, 255],
        orange: [255, 165, 0],
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
                color: colors.red,
                text: "red",
                position: [-100, 0, 0],
                size: 500,
                textAnchor: "middle"
            },
            {
                color: colors.green,
                text: "green",
                position: [0, 0, 0],
                size: 500,
                textAnchor: "middle"
            },
            {
                color: colors.blue,
                text: "blue",
                position: [100, 0, 0],
                size: 500,
                textAnchor: "middle"
            },
            {
                color: colors.black,
                text: "black",
                position: [0, 0, -20],
                size: 500,
                textAnchor: "middle"
            }
        ]
    };
    chromaticTextTest.presenter.present(stage, 0, 0, {
        getTextHighlightColor: function (t) {
            switch (t.text) {
                case 'red':
                    return colors.green;
                case 'green':
                    return colors.red;
                case 'blue':
                    return colors.orange;
            }
            return colors.black;
        },
        onTextClick: function (e, t) {
            alert(t.text + ' clicked');
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
