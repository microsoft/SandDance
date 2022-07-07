var cubeTest;
(function (cubeTest) {
    var VegaDeckGl = SandDance.VegaDeckGl;
    VegaDeckGl.use(null, deck, deck, luma);
    var colors = {
        red: [255, 0, 0],
        green: [0, 255, 0],
        blue: [0, 0, 255],
        gray: [128, 128, 128]
    };
    cubeTest.presenter = new VegaDeckGl.Presenter(document.querySelector('#vis'));
    var stage = {
        cubeData: [
            {
                color: colors.red,
                position: [0, 0, 0],
                size: [100, 100, 100]
            },
            {
                color: colors.green,
                position: [100, 0, 100],
                size: [100, 100, 100]
            },
            {
                color: colors.blue,
                position: [0, 100, 100],
                size: [100, 100, 100]
            },
        ],
        legend: { rows: {} },
        axes: {
            x: [{
                    domain: {
                        color: [0, 0, 0, 255],
                        sourcePosition: [0, 0, 0],
                        targetPosition: [400, 0, 0],
                        strokeWidth: 10
                    },
                    ticks: [],
                    tickText: []
                }],
            y: [{
                    domain: {
                        color: [0, 0, 0, 255],
                        sourcePosition: [0, 0, 0],
                        targetPosition: [0, 200, 0],
                        strokeWidth: 10
                    },
                    ticks: [],
                    tickText: []
                }],
            z: [{
                    domain: {
                        color: [0, 0, 0, 255],
                        sourcePosition: [0, 0, 0],
                        targetPosition: [0, 0, 200],
                        strokeWidth: 10
                    },
                    ticks: [],
                    tickText: []
                }]
        },
        textData: [],
        view: '3d'
    };
    cubeTest.presenter.present(stage, 200, 400);
    var orbitViewState = {
        target: [90, 15, 23],
        rotationOrbit: -45,
        rotationX: 67,
        zoom: 0.01
    };
    cubeTest.presenter.deckgl.setProps({ initialViewState: orbitViewState });
    document.getElementById('animate').addEventListener('click', function (e) {
        stage.cubeData = [
            {
                color: colors.blue,
                position: [0, 300, 100],
                size: [100, 100, 100]
            },
            {
                color: colors.gray,
                position: [100, 100, 300],
                size: [10, 10, 10]
            },
            {
                color: colors.red,
                position: [300, 0, 0],
                size: [100, 100, 100]
            },
            {
                color: colors.green,
                position: [100, 300, 100],
                size: [100, 100, 100]
            },
        ];
        cubeTest.presenter.present(stage, 200, 400);
    });
})(cubeTest || (cubeTest = {}));
