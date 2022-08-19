// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as vega from 'vega';
import * as SandDance from '@msrvida/sanddance';

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
        const id = x * y;
        const z = Math.random() * size * (x % 10) * (y % 10);
        const w = Math.random() * size;
        data.push({ id, x, y, z, w });
    }
}

SandDance.use(vega);

const viewer = new SandDance.Viewer(document.getElementById('vis'));

const insight: SandDance.specs.Insight = {
    columns: {
        color: 'z',
        uid: 'id',
        x: 'x',
        y: 'y',
        z: 'z',
    },
    scheme: 'blues',
    size: { height: 500, width: 500 },
    chart: 'scatterplot',
    view: '3d',
};

viewer.render({ insight }, data);
