var transformTest;
(function (transformTest) {
    var insight = {
        columns: {
            color: 'brand',
            x: 'Horsepower',
            y: 'Miles_per_Gallon',
            z: 'Cylinders',
        },
        transform: [
            {
                type: 'formula',
                expr: 'split(datum.Name, " ")',
                as: 'name_split',
            },
            {
                type: 'formula',
                expr: 'datum.name_split[0]',
                as: 'brand',
            },
        ],
        size: {
            height: 700,
            width: 700,
        },
        scheme: 'category20',
        view: '2d',
        chart: 'scatterplot',
        signalValues: {
            Chart_PointScaleSignal: 8,
            Text_AngleXSignal: 0,
            Text_AngleYSignal: -90,
        },
    };
    SandDance.use(vega);
    transformTest.viewer = new SandDance.Viewer(document.querySelector('#vis'));
    fetch('https://vega.github.io/editor/data/cars.json').then(function (response) {
        return response.json();
    }).then(function (json) {
        transformTest.viewer.render({ insight: insight }, json);
    });
})(transformTest || (transformTest = {}));
