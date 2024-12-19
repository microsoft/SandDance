var treeMapTest;
(function (treeMapTest) {
    SandDance.use(vega);
    treeMapTest.viewer = new SandDance.Viewer(document.querySelector('#vis'));
    var glDiv = treeMapTest.viewer.presenter.getElement(SandDance.VegaMorphCharts.PresenterElement.gl);
    var insight = {
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
    vega.loader().load('../../../sample-data/titanicmaster.tsv').then(function (text) {
        var data = vega.read(text, { type: 'tsv' });
        treeMapTest.viewer.render({ insight: insight }, data);
    });
})(treeMapTest || (treeMapTest = {}));
