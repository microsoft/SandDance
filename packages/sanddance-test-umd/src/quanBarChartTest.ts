// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
///<reference path='../../sanddance/dist/umd/sanddance.d.ts' />

namespace quanBarChartTest {

    declare const vega: SandDance.VegaMorphCharts.types.VegaBase;

    SandDance.use(vega);
    export const viewer = new SandDance.Viewer(document.getElementById('vis'));

    interface MyData {
        myColor: number;
        mySort: number;
        myUid: number;
        myX: number;
        myY: number;
        myZ: number;
    }

    function getValue(i: number) {
        if (i < 200) return 0;
        if (i < 250) return 1;
        if (i < 350) return 2;
        return 3;
    }

    const data: MyData[] = [];

    for (let i = 0; i < 700; i++) {
        const v = getValue(i);
        data.push({
            myUid: i,
            myX: v,
            myY: i,
            myZ: i,
            myColor: v,
            mySort: i,
        });
    }
    const glDiv = viewer.presenter.getElement(SandDance.VegaMorphCharts.PresenterElement.gl);
    const insight: SandDance.specs.Insight = {
        columns: {
            color: 'myColor',
            sort: 'mySort',
            uid: 'myUid',
            x: 'myX',
            y: 'myY',
            z: 'myZ',
        },
        scheme: 'redblue',
        size: {
            height: glDiv.offsetHeight,
            width: glDiv.offsetWidth,
        },
        chart: 'barchart',
        view: '2d',
    };

    viewer.render({ insight }, data);
}
