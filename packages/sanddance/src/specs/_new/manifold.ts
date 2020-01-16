// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Spec, Mark, Facet, Scope } from 'vega-typings';
import { InsightColumns } from '../types';

export function manifold(columns: InsightColumns, vegaSpec: Spec, dataInputName: string, dataOutputName: string): Scope {
    //TODO: deal with size
    // height: size.height,
    // width: size.width,

    //TODO facet row & column headers > driven by data
    //TODO axes

    const groupby = [columns.facet];

    const facet: Facet = {
        name: dataOutputName,
        data: dataInputName,
        groupby
    };

    if (columns.facetV) {
        groupby.push(columns.facetV);
        facet.aggregate = { cross: true } as any;
        //TODO column count from X

    } else {
        //TODO column count signal
    }

    const mark: Mark = {
        name: 'cell',
        type: 'group',
        style: 'cell',
        from: {
            facet
        },
        sort: {
            field: groupby.map(g => `datum[${JSON.stringify(g)}]`),
            order: groupby.map(g => 'ascending')
        },
        encode: {
            update: {
                width: { signal: 'child_width' },
                height: { signal: 'child_height' }
            }
        },
        marks: []
    };

    vegaSpec.marks.push(mark);

    vegaSpec.signals.push(
        { name: 'child_width', value: 200 },
        { name: 'child_height', value: 200 }
    )

    vegaSpec.layout = {
        padding: 20,    //TODO
        columns: { signal: `length(data('column_domain'))` },
        bounds: 'full',
        align: 'all'
    };

    return mark;
}
