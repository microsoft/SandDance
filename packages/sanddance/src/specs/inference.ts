// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from '../vega-deck.gl';
import { Column, ColumnStats, ColumnTypeMap } from './types';

function isQuantitative(column: Column) {
    return column.type === 'number' || column.type === 'integer';
}

/**
 * Derive column metadata from the data array.
 * @param data Array of data objects.
 */
export function getColumnsFromData(data: object[], columnTypes?: ColumnTypeMap) {
    const sample = data[0];
    const fields = sample ? Object.keys(sample) : [];
    const inferences = { ...VegaDeckGl.base.vega.inferTypes(data, fields), ...columnTypes };
    const columns = fields.map(name => {
        const column: Column = {
            name,
            type: inferences[name]
        };
        return column;
    });
    inferAll(columns, data);
    return columns;
}

/**
 * Populate columns with type inferences and stats.
 * @param columns Array of columns.
 * @param data Array of data objects.
 */
export function inferAll(columns: Column[], data: object[]) {
    columns.forEach(column => {
        if (column) {
            if (typeof column.quantitative !== 'boolean') {
                column.quantitative = isQuantitative(column);
            }
            if (!column.stats) {
                column.stats = getStats(data, column);
            }
        }
    });
}

function getStats(data: object[], column: Column) {
    const distinctMap = {};
    const stats: ColumnStats = {
        distinctValueCount: null,
        max: null,
        min: null
    }
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        let value = row[column.name];
        distinctMap[value] = true;
        if (stats.max === null || value > stats.max) {
            stats.max = value;
        }
        if (stats.min === null || value < stats.min) {
            stats.min = value;
        }
    }
    stats.distinctValueCount = Object.keys(distinctMap).length;
    return stats;
}
