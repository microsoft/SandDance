// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { cloneVegaSpecWithData, getColumnsFromData, getSpecColumns } from '../dist/es6';
//import { openSync } from 'fs';
import { loader, read } from 'vega-loader';

loader().load('../../docs/sample-data/demovote.tsv').then(tsv_data => {
    const data = read(tsv_data, { type: 'tsv', parse: 'auto' });
    console.log(data.length);
});

// process.exit();

// const specViewOptions = {
//     colors: {
//         defaultCube: [0, 0, 0],
//         axisLine: [0, 0, 0],
//         axisText: [0, 0, 0]
//     },
//     language: {},
//     maxLegends: 20,
//     tickSize: 10
// };

// const insight = {};

// const columns = getColumnsFromData();

// const context = { specColumns: getSpecColumns(insight, columns), insight, specViewOptions };

// const specResult = cloneVegaSpecWithData(context, currData);
