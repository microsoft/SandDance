// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as deck from '@deck.gl/core';
import * as layers from '@deck.gl/layers';
import * as luma from 'luma.gl';
import * as vega from 'vega';
import { types, use, Viewer } from '../sanddance/src';

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
    data.push({ id, x, y: y, z, w });
  }
}

use(vega, deck, layers, luma);

export const viewer = new Viewer(document.getElementById("vis"));

const insight: types.Insight = {
  scheme: "blues",
  columns: {
    color: "z",
    uid: "id",
    x: "x",
    y: "y",
    z: "z"
  },
  size: { height: 500, width: 500 },
  chart: 'scatterplot',
  view: '3d'
};

viewer.render(insight, data);
