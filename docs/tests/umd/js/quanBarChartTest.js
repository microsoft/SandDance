var quanBarChartTest;
(function (quanBarChartTest) {
    SandDance.use(vega, deck, deck, luma);
    quanBarChartTest.viewer = new SandDance.Viewer(document.getElementById('vis'));
    function getValue(i) {
        if (i < 200)
            return 0;
        if (i < 250)
            return 1;
        if (i < 350)
            return 2;
        return 3;
    }
    var data = [];
    for (var i = 0; i < 700; i++) {
        var v = getValue(i);
        data.push({
            myUid: i,
            myX: v,
            myY: i,
            myZ: i,
            myColor: v,
            mySort: i
        });
    }
    var glDiv = quanBarChartTest.viewer.presenter.getElement(SandDance.VegaDeckGl.PresenterElement.gl);
    var insight = {
        columns: {
            color: 'myColor',
            sort: 'mySort',
            uid: 'myUid',
            x: 'myX',
            y: 'myY',
            z: 'myZ'
        },
        scheme: 'redblue',
        size: {
            height: glDiv.offsetHeight,
            width: glDiv.offsetWidth
        },
        chart: "barchart",
        view: "2d"
    };
    quanBarChartTest.viewer.render(insight, data);
})(quanBarChartTest || (quanBarChartTest = {}));
