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

    const insight = {
        "columns": {
            "x": "Longitude",
            "y": "Latitude",
            "color": "Obama",
            "z": "Education",
            "sort": "State",
            "facet": "MedAge"
        },
        "facetStyle": "wrap",
        "scheme": "redblue",
        "size": {
            "height": 600,
            "width": 800
        },
        "chart": "stacks",
        "view": "3d"
    };

    const columns = getColumnsFromData(vega.inferTypes, data);

    const context = { specColumns: getSpecColumns(insight, columns), insight, specViewOptions };

    const specResult = cloneVegaSpecWithData(context, data);

    if (specResult.errors) {
        console.log(errors);
    } else {
        const runtime = vega.parse(specResult.vegaSpec);
        const vegaView = new vega.View(runtime);
        const startTime = new Date();
        vegaView.runAsync().then(() => {
            const stopTime = new Date();
            console.log(`done in ${stopTime - startTime}`);
        });
    }
});
