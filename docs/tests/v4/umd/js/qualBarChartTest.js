var qualBarChartTest;
(function (qualBarChartTest) {
    SandDance.use(vega);
    qualBarChartTest.viewer = new SandDance.Viewer(document.getElementById('vis'));
    function getValue(i) {
        if (i < 20)
            return 0;
        if (i < 25)
            return 1;
        if (i < 35)
            return 2;
        return 3;
    }
    var data = [];
    for (var i = 0; i < 70; i++) {
        var v = getValue(i);
        data.push({
            myUid: i,
            myX: "cat".concat(v),
            myY: i,
            myZ: i,
            myColor: v.toString(),
            mySort: i,
        });
    }
    var glDiv = qualBarChartTest.viewer.presenter.getElement(SandDance.VegaMorphCharts.PresenterElement.gl);
    var insight = {
        columns: {
            color: 'myColor',
            sort: 'mySort',
            uid: 'myUid',
            x: 'myX',
            y: 'myY',
            z: 'myZ',
        },
        scheme: 'category20',
        size: {
            height: glDiv.offsetHeight,
            width: glDiv.offsetWidth,
        },
        chart: 'barchart',
        view: '2d',
    };
    qualBarChartTest.viewer.render({ insight: insight }, data, { columnTypes: { myColor: 'string' } });
})(qualBarChartTest || (qualBarChartTest = {}));
