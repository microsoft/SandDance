var test;
(function (test) {
    var data = [
        { myUid: 0, myColor: 0, mySort: 0, myX: 0, myY: 0, myZ: 0 },
        { myUid: 1, myColor: 1, mySort: 1, myX: 1, myY: 1, myZ: 1 },
        { myUid: 2, myColor: 2, mySort: 2, myX: 2, myY: 2, myZ: 2 }
    ];
    var options = {
        columns: {
            color: 'myColor',
            sort: 'mySort',
            uid: 'myUid',
            x: 'myX',
            y: 'myY',
            z: 'myZ'
        },
        size: {
            height: 700,
            width: 700
        },
        chart: "scatterplot"
    };
    SandDance.use(vega, deck, deck, luma);
    test.viewer = new SandDance.Viewer(document.querySelector('#vis'));
    test.viewer.render(options, data);
})(test || (test = {}));
