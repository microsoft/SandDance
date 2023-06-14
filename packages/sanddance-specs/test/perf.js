// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { build, getColumnsFromData, getSpecColumns } from '../dist/es6';
import * as vega from 'vega';

vega.loader().load('../../docs/sample-data/demovote.tsv').then(tsv_data => {
    const data = vega.read(tsv_data, { type: 'tsv', parse: 'auto' });
    const columns = getColumnsFromData(vega.inferTypes, data);

    const specViewOptions = {
        colors: {
            defaultCube: [0, 0, 0],
            axisLine: [0, 0, 0],
            axisText: [0, 0, 0],
        },
        language: {},
        maxLegends: 20,
        tickSize: 10,
    };

    const insightPasses = [
        {
            name: 'scatter',
            insight: {
                columns: {
                    x: 'Longitude',
                    y: 'Latitude',
                    color: 'Obama',
                    z: 'Education',
                },
                scheme: 'redblue',
                size: {
                    height: 600,
                    width: 800,
                },
                chart: 'scatterplot',
                view: '3d',
            },
        },
        {
            name: 'scatter facet wrap',
            insight: {
                columns: {
                    x: 'Longitude',
                    y: 'Latitude',
                    color: 'Obama',
                    z: 'Education',
                    facet: 'MedAge',
                },
                facetStyle: 'wrap',
                scheme: 'redblue',
                size: {
                    height: 600,
                    width: 800,
                },
                chart: 'scatterplot',
                view: '3d',
            },
        },
        {
            name: 'scatter facet cross',
            insight: {
                columns: {
                    x: 'Longitude',
                    y: 'Latitude',
                    color: 'Obama',
                    z: 'Education',
                    facet: 'MedAge',
                    facetV: 'Income',
                },
                facetStyle: 'cross',
                scheme: 'redblue',
                size: {
                    height: 600,
                    width: 800,
                },
                chart: 'scatterplot',
                view: '3d',
            },
        },
        {
            name: 'density',
            insight: {
                columns: {
                    x: 'Longitude',
                    y: 'Latitude',
                    color: 'Obama',
                    z: 'Education',
                },
                scheme: 'redblue',
                size: {
                    height: 600,
                    width: 800,
                },
                chart: 'density',
                view: '3d',
            },
        },
        {
            name: 'density facet wrap',
            insight: {
                columns: {
                    x: 'Longitude',
                    y: 'Latitude',
                    color: 'Obama',
                    z: 'Education',
                    facet: 'MedAge',
                },
                facetStyle: 'wrap',
                scheme: 'redblue',
                size: {
                    height: 600,
                    width: 800,
                },
                chart: 'density',
                view: '3d',
            },
        },
        {
            name: 'density facet cross',
            insight: {
                columns: {
                    x: 'Longitude',
                    y: 'Latitude',
                    color: 'Obama',
                    z: 'Education',
                    facet: 'MedAge',
                    facetV: 'Income',
                },
                facetStyle: 'cross',
                scheme: 'redblue',
                size: {
                    height: 600,
                    width: 800,
                },
                chart: 'density',
                view: '3d',
            },
        },
        {
            name: 'column',
            insight: {
                columns: {
                    x: 'Income',
                    color: 'Obama',
                    z: 'Education',
                },
                scheme: 'redblue',
                size: {
                    height: 600,
                    width: 800,
                },
                chart: 'barchartV',
                view: '3d',
            },
        },
        {
            name: 'column facet wrap',
            insight: {
                columns: {
                    x: 'Income',
                    color: 'Obama',
                    z: 'Education',
                    facet: 'MedAge',
                },
                facetStyle: 'wrap',
                scheme: 'redblue',
                size: {
                    height: 600,
                    width: 800,
                },
                chart: 'barchartV',
                view: '3d',
            },
        },
        {
            name: 'column facet cross',
            insight: {
                columns: {
                    x: 'Income',
                    color: 'Obama',
                    z: 'Education',
                    facet: 'MedAge',
                    facetV: 'Income',
                },
                facetStyle: 'cross',
                scheme: 'redblue',
                size: {
                    height: 600,
                    width: 800,
                },
                chart: 'barchartV',
                view: '3d',
            },
        },
        {
            name: 'stacks not faceted',
            insight: {
                columns: {
                    x: 'Longitude',
                    y: 'Latitude',
                    color: 'Obama',
                    z: 'Education',
                    sort: 'State',
                },
                scheme: 'redblue',
                size: {
                    height: 600,
                    width: 800,
                },
                chart: 'stacks',
                view: '3d',
            },
        },
        {
            name: 'stacks facet wrap',
            insight: {
                columns: {
                    x: 'Longitude',
                    y: 'Latitude',
                    color: 'Obama',
                    z: 'Education',
                    sort: 'State',
                    facet: 'MedAge',
                },
                facetStyle: 'wrap',
                scheme: 'redblue',
                size: {
                    height: 600,
                    width: 800,
                },
                chart: 'stacks',
                view: '3d',
            },
        },
        {
            name: 'stacks facet cross',
            insight: {
                columns: {
                    x: 'Longitude',
                    y: 'Latitude',
                    color: 'Obama',
                    z: 'Education',
                    sort: 'State',
                    facet: 'MedAge',
                    facetV: 'Income',
                },
                facetStyle: 'cross',
                scheme: 'redblue',
                size: {
                    height: 600,
                    width: 800,
                },
                chart: 'stacks',
                view: '3d',
            },
        },
    ];

    const run = i => {
        const pass = insightPasses[i];
        if (!pass) {
            console.log('complete');
            return;
        }

        const { insight, name } = pass;
        const context = { specColumns: getSpecColumns(insight, columns), insight, specViewOptions };
        const specResult = build(context, data);

        if (specResult.errors) {
            console.log(specResult.errors);
        } else {
            const runtime = vega.parse(specResult.vegaSpec);
            const vegaView = new vega.View(runtime);
            const startTime = new Date();
            vegaView.runAsync().then(() => {
                const stopTime = new Date();
                console.log(`${name} done in ${stopTime - startTime}`);

                // const d0 = specResult.vegaSpec.data[0];
                // delete d0.values;
                // d0.url = "https://sanddance.js.org/sample-data/demovote.tsv";
                // d0.format = {
                //     "parse": "auto",
                //     "type": "tsv"
                // };
                //writeFileSync(`${name}.vg.json`, JSON.stringify(specResult.vegaSpec, null, 2), 'utf8');

                run(++i);
            }).catch(e => {
                console.log(`${name} error ${e}`);
            });
        }
    };

    run(0);
});
