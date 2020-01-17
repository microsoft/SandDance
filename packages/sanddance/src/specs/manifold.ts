// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Column, SpecColumns } from './types';
import {
    Data,
    Facet,
    Mark,
    Scope,
    Spec
} from 'vega-typings';
import { Orientation } from './interfaces';

export function manifold(columns: SpecColumns, vegaSpec: Spec, dataInputName: string, dataOutputName: string): Scope {
    //TODO: deal with size
    // height: size.height,
    // width: size.width,

    //TODO facet row & column headers > driven by data
    //TODO axes

    //TODO make sure cells are selectable

    const d0 = vegaSpec.data[0];
    const horizontalCells = prepareCells(vegaSpec.data, dataInputName, 'horizontal', columns.facet, d0);

    const groupby = [horizontalCells.groupBy];
    const facet: Facet = {
        name: dataOutputName,
        data: dataInputName,
        groupby
    };

    if (columns.facetV) {
        const verticalCells = prepareCells(vegaSpec.data, dataInputName, 'vertical', columns.facetV, d0);
        groupby.push(verticalCells.groupBy);
        facet.aggregate = { cross: true } as any;
    }

    const mark: Mark = {
        name: 'cell',
        type: 'group',
        style: 'cell',
        from: { facet },
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
        { name: 'child_width', value: 200 },    //TODO get size
        { name: 'child_height', value: 200 }
    )

    vegaSpec.layout = {
        padding: 20,    //TODO defaults
        columns: {
            signal: `length(data(${JSON.stringify(horizontalCells.domainData.name)}))`
        },
        bounds: 'full',
        align: 'all'
    };

    return mark;
}

function prepareCells(dataList: Data[], dataInputName: string, orientation: Orientation, column: Column, data: Data) {
    const groupBy = cellGroupBy(orientation, column, data);
    const domainData: Data = {
        name: `cell-${orientation}-domain`,
        source: dataInputName,
        transform: [
            {
                type: 'aggregate',
                groupby: [groupBy]
            }
        ]
    };
    dataList.push(domainData);
    return { groupBy, domainData };
}

function cellGroupBy(orientation: Orientation, column: Column, data: Data) {
    if (column.quantitative) {
        const extentSignal = `bin-cells-${orientation}-extent`;
        const binStartName = `bin-cells-${orientation}-start`;
        const groupBy = `cell-${orientation}-bin`;
        data.transform.push(
            {
                type: 'extent',
                field: column.name,
                signal: extentSignal
            },
            {
                type: 'bin',
                field: column.name,
                as: [
                    binStartName,
                    `bin-cells-${orientation}-end`
                ],
                extent: {
                    signal: extentSignal
                },
                maxbins: 30     //TODO signalize
            },

            //bug in Vega? does not want to cross-aggregate numeric values. Se we make a string value.
            {
                type: 'formula',
                expr: `${JSON.stringify(orientation)} + datum[${JSON.stringify(binStartName)}]`,
                as: groupBy
            }
        );
        return groupBy;
    } else {
        return column.name;
    }
}
