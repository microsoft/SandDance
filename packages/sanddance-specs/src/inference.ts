/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { color as d3color } from 'd3-color';
import { Column, ColumnStats, ColumnTypeMap } from '@msrvida/chart-types';
import { inferTypes, TypeInference } from 'vega-typings';
import { Insight, SpecColumns } from './types';

function isColor(cssColorSpecifier: string) {
    return !!d3color(cssColorSpecifier);
}

function isQuantitative(column: Column) {
    return column.type === 'number' || column.type === 'integer';
}

/**
 * Derive column metadata from the data array.
 * @param data Array of data objects.
 */
export function getColumnsFromData(inferTypesFn: typeof inferTypes, data: object[], columnTypes?: ColumnTypeMap) {
    const sample = data[0];
    const fields = sample ? Object.keys(sample) : [];
    const inferences = { ...inferTypesFn(data, fields), ...columnTypes };
    const columns = fields.map(name => {
        const column: Column = {
            name,
            type: inferences[name],
        };
        return column;
    });
    inferAll(columns, data);
    return columns;
}

/**
 * Get columns associated with each Insight role.
 * @param insight Insight to specify column roles.
 * @param columns Array of Columns inferred from the data.
 */
export function getSpecColumns(insight: Insight, columns: Column[]): SpecColumns {
    function getColumnByName(name: string) {
        return columns.filter(c => c.name === name)[0];
    }
    return {
        color: getColumnByName(insight.columns && insight.columns.color),
        facet: getColumnByName(insight.columns && insight.columns.facet),
        facetV: getColumnByName(insight.columns && insight.columns.facetV),
        group: getColumnByName(insight.columns && insight.columns.group),
        size: getColumnByName(insight.columns && insight.columns.size),
        sort: getColumnByName(insight.columns && insight.columns.sort),
        uid: getColumnByName(insight.columns && insight.columns.uid),
        x: getColumnByName(insight.columns && insight.columns.x),
        y: getColumnByName(insight.columns && insight.columns.y),
        z: getColumnByName(insight.columns && insight.columns.z),
    };
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
            if (column.type === 'string' && typeof column.isColorData !== 'boolean') {
                checkIsColorData(data, column);
            }
        }
    });
}

function checkIsColorData(data: object[], column: Column) {
    if (!column.stats.hasColorData) {
        column.isColorData = false;
        return;
    }
    for (let i = 0; i < data.length; i++) {
        if (!isColor(data[i][column.name])) {
            column.isColorData = false;
            return;
        }
    }
    column.isColorData = true;
}

export function getStats(data: object[] | Float64Array, columnName: string | number, columnType: TypeInference, columnQuantitative: boolean, distinctValuesCallback?: (distinctValues: string[]) => void): ColumnStats;
export function getStats(data: object[], column: Column, distinctValuesCallback?: (distinctValues: string[]) => void): ColumnStats;
export function getStats(data: object[] | Float64Array, ...args: any[]) {
    console.log('ok here we go')
    let columnName: string | number;
    let columnType: TypeInference;
    let columnQuantitative: boolean;
    let distinctValuesCallback: (distinctValues: string[]) => void;
    if (args.length <= 2) {
        const column = args[0] as Column;
        columnName = column.name;
        columnType = column.type;
        columnQuantitative = column.quantitative;
        distinctValuesCallback = args[1];
    } else {
        columnName = args[0];
        columnType = args[1];
        columnQuantitative = args[2];
        distinctValuesCallback = args[3];
    }
    const distinctMap = {};
    const stats: ColumnStats = {
        distinctValueCount: null,
        max: null,
        mean: null,
        min: null,
    };
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const value = columnName == null ? row : row[columnName];
        const num = +value;
        distinctMap[value] = true;
        if (!isNaN(num)) {
            if (stats.max === null || num > stats.max) {
                stats.max = num;
            }
            if (stats.min === null || num < stats.min) {
                stats.min = num;
            }
            sum += num;
        }
        if (columnType === 'string' && !stats.hasColorData && isColor(value)) {
            stats.hasColorData = true;
        }
    }
    if (columnQuantitative) {
        stats.mean = data.length > 0 && (sum / data.length);
        stats.hasNegative = detectNegative(columnName, data);
        if (columnType === 'integer') {
            stats.isSequential = detectSequentialColumn(columnName, data);
        }
    }
    const distinctValues = Object.keys(distinctMap);
    if (distinctValuesCallback) {
        distinctValues.sort();
        distinctValuesCallback(distinctValues);
    }
    stats.distinctValueCount = distinctValues.length;
    return stats;
}

function detectNegative(columnName: string | number, data: object[] | Float64Array) {
    for (let i = 1; i < data.length; i++) {
        const value = columnName == null ? data[i] : data[i][columnName];
        if (value < 0) return true;
    }
    return false;
}

function detectSequentialColumn(columnName: string | number, data: object[] | Float64Array): boolean {
    if (data.length < 2) return false;
    for (let i = 1; i < data.length; i++) {
        const curr = columnName == null ? data[i] : data[i][columnName];
        const prev = columnName == null ? data[i - 1] : data[i - 1][columnName];
        if (curr !== prev + 1) return false;
    }
    return true;
}
