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
            if (column.type === 'string') {
                checkIsColorData(data, column);
            }
            if (!column.stats) {
                column.stats = getStats(data, column);
            }
        }
    });
}

function checkIsColorData(data: object[], column: Column) {
    for (let i = 0; i < data.length; i++) {
        if (!VegaDeckGl.util.isColor(data[i][column.name])) {
            return;
        }
    }
    column.isColorData = true;
}

function getStats(data: object[], column: Column) {
    const distinctMap = {};
    const stats: ColumnStats = {
        distinctValueCount: null,
        max: null,
        mean: null,
        min: null
    }
    let isColorData = true;
    let sum = 0;
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
        let num = +value;
        if (!isNaN(num)) {
            sum += num;
        }
        if (column.type === 'string' && isColorData) {}
    }
    if (column.quantitative) {
        stats.mean = data.length > 0 && (sum / data.length);
        stats.hasNegative = detectNegative(column, data);
        if (column.type === 'integer') {
            stats.isSequential = detectSequentialColumn(column, data);
        }
    }
    stats.distinctValueCount = Object.keys(distinctMap).length;
    return stats;
}

function detectNegative(column: Column, data: object[]) {
    for (let i = 1; i < data.length; i++) {
        if (data[i][column.name] < 0) return true;
    }
    return false;
}

function detectSequentialColumn(column: Column, data: object[]): boolean {
    if (data.length < 2) return false;
    let colname = column.name;
    for (let i = 1; i < data.length; i++) {
        if (data[i][colname] !== data[i - 1][colname] + 1) return false;
    }
    return true;
}
