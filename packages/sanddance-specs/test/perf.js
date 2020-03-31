// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { cloneVegaSpecWithData, getColumnsFromData, getSpecColumns } from '../dist/es6';
import * as vega from 'vega';

vega.loader().load('../../docs/sample-data/demovote.tsv').then(tsv_data => {
    const data = vega.read(tsv_data, { type: 'tsv', parse: 'auto' });

    const specViewOptions = {
        colors: {
            defaultCube: [0, 0, 0],
            axisLine: [0, 0, 0],
            axisText: [0, 0, 0]
        },
        language: {},
        maxLegends: 20,
        tickSize: 10
    };

    // const insight = {};

    const columns = getColumnsFromData(vega.inferTypes, data);
    console.log(columns);

    // const context = { specColumns: getSpecColumns(insight, columns), insight, specViewOptions };

    // const specResult = cloneVegaSpecWithData(context, currData);

});
