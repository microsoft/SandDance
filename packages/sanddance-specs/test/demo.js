// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { build, getColumnsFromData, getSpecColumns } from '../dist/es6';

import { inferTypes, loader, parse, read, View } from 'vega';

loader().load('../../docs/sample-data/titanicmaster.tsv').then(tsv_data => {
    const data = read(tsv_data, { type: 'tsv', parse: 'auto' });

    const insight = {
        colorBin: 'quantize',
        columns: {
            x: 'Gender',
            color: 'Survived',
            sort: 'Survived',
            facet: 'Age',
        },
        scheme: 'set1',   //see https://vega.github.io/vega/docs/schemes/#reference
        facetStyle: 'wrap',
        size: {
            height: 600,
            width: 800,
        },
        chart: 'barchartV',
    };

    const columns = getColumnsFromData(inferTypes, data);
    const specColumns = getSpecColumns(insight, columns);
    const specViewOptions = {
        colors: {
            defaultCube: 'steelblue',
            axisLine: '#000',
            axisText: '#000',
        },
        language: {
            count: 'Count',
        },
        maxLegends: 20,
        tickSize: 10,
    };
    const context = { specColumns, insight, specViewOptions };
    const specResult = build(context, data);

    if (specResult.errors) {
        console.log(specResult.errors);
    } else {
        console.log(specResult.vegaSpec);
    }

    const runtime = parse(specResult.vegaSpec);
    const vegaView = new View(runtime);
    vegaView.runAsync().then(() => {
        console.log('done');
    }).catch(e => {
        console.log(`error ${e}`);
    });

});
