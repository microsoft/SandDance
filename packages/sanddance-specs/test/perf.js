// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { cloneVegaSpecWithData, getColumnsFromData, getSpecColumns } from '../dist/es6';
import * as vega from 'vega';
import { writeFileSync } from 'fs';

vega.loader().load('../../docs/sample-data/demovote.tsv').then(tsv_data => {
    const data = vega.read(tsv_data, { type: 'tsv', parse: 'auto' });
    const columns = getColumnsFromData(vega.inferTypes, data);

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

    const insightPasses = [
        {
            name: "scatter",
            insight: {
                "columns": {
                    "x": "Longitude",
                    "y": "Latitude",
                    "color": "Obama",
                    "z": "Education"
                },
                "scheme": "redblue",
                "size": {
                    "height": 600,
                    "width": 800
                },
                "chart": "scatterplot",
                "view": "3d"
            }
        },
        ,
        {
            name: "stacks not faceted",
            insight: {
                "columns": {
                    "x": "Longitude",
                    "y": "Latitude",
                    "color": "Obama",
                    "z": "Education",
                    "sort": "State"
                },
                "scheme": "redblue",
                "size": {
                    "height": 600,
                    "width": 800
                },
                "chart": "stacks",
                "view": "3d"
            }
        },
        {
            name: "stacks facet wrap",
            insight: {
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
            }
        },
        {
            name: "stacks facet cross",
            insight: {
                "columns": {
                    "x": "Longitude",
                    "y": "Latitude",
                    "color": "Obama",
                    "z": "Education",
                    "sort": "State",
                    "facet": "MedAge",
                    "facetV": "Income"
                },
                "facetStyle": "cross",
                "scheme": "redblue",
                "size": {
                    "height": 600,
                    "width": 800
                },
                "chart": "stacks",
                "view": "3d"
            }
        }
    ];

    insightPasses.forEach(pass => {
        const { insight, name } = pass;
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
                console.log(`${name} done in ${stopTime - startTime}`);

                const d0 = specResult.vegaSpec.data[0];

                delete d0.values;
                d0.url = "https://sanddance.js.org/sample-data/demovote.tsv";
                d0.format = {
                    "parse": "auto",
                    "type": "tsv"
                };

                writeFileSync(`${name}.vg.json`, JSON.stringify(specResult.vegaSpec, null, 2), 'utf8');
            });
        }
    });
});
