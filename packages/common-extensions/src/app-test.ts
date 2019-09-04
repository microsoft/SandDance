// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
namespace testSandDance {

    SandDanceExplorer.use(Fabric, vega, deck, deck, luma);

    interface Datum {
        id: number;
        x: number;
        y: number;
        z: number;
        w: number;
    }

    const data: Datum[] = [];
    const size = 100;

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            let id = x * y;
            let z = Math.random() * size * (x % 10) * (y % 10);
            let w = Math.random() * size;
            data.push({ id, x, y, z, w });
        }
    }

    function specifycolumns(columns: SandDance.types.Column[]) {
        return {
            columns: {
                color: 'z',
                uid: 'id',
                x: 'x',
                y: 'y',
                z: 'z'
            },
            scheme: 'yelloworangered'
        };
    }

    function mounted(explorer: SandDanceExplorer.Explorer) {
        explorer.load(data, specifycolumns);
    }

    const testApp = React.createElement(SandDanceExplorer.Explorer, { initialView: "3d", mounted });

    ReactDOM.render(testApp, document.getElementById('app'));
}
