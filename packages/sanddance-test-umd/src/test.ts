// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
///<reference path='../node_modules/@msrvida/sanddance/dist/umd/sanddance.d.ts' />

namespace test {

    declare var deck: SandDance.VegaDeckGl.types.DeckBase & SandDance.VegaDeckGl.types.DeckLayerBase;
    declare var luma: SandDance.VegaDeckGl.types.LumaBase;
    declare var vega: SandDance.VegaDeckGl.types.VegaBase;

    interface MyData {
        myColor: number;
        mySort: number;
        myUid: number;
        myX: number;
        myY: number;
        myZ: number;
    }

    const data: MyData[] = [
        { myUid: 0, myColor: 0, mySort: 0, myX: 0, myY: 0, myZ: 0 },
        { myUid: 1, myColor: 1, mySort: 1, myX: 1, myY: 1, myZ: 1 },
        { myUid: 2, myColor: 2, mySort: 2, myX: 2, myY: 2, myZ: 2 }
    ];

    const options: SandDance.specs.Insight = {
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
        chart: 'scatterplot'
    };

    SandDance.use(vega, deck, deck, luma);
    export const viewer = new SandDance.Viewer(document.querySelector('#vis'));
    viewer.render(options, data);
}