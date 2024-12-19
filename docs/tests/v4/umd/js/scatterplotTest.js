var scatterplotTest;
(function (scatterplotTest) {
    SandDance.use(vega);
    scatterplotTest.viewer = new SandDance.Viewer(document.querySelector('#vis'));
    var glDiv = scatterplotTest.viewer.presenter.getElement(SandDance.VegaMorphCharts.PresenterElement.gl);
    var insight = {
        columns: {
            color: 'Education',
            sort: 'TotalPop',
            uid: 'Id',
            x: 'Longitude',
            y: 'Latitude',
            z: 'Income',
        },
        scheme: 'redblue',
        size: {
            height: glDiv.offsetHeight,
            width: glDiv.offsetWidth,
        },
        chart: 'scatterplot',
    };
    vega.loader().load('../../../sample-data/demovote.tsv').then(function (text) {
        var data = vega.read(text, { type: 'tsv' });
        scatterplotTest.viewer.render({ insight: insight }, data);
    });
})(scatterplotTest || (scatterplotTest = {}));
