/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { color as d3color } from 'd3-color';
import { Column, ColumnStats, ColumnTypeMap } from '@msrvida/chart-types';
import { inferTypes } from 'vega-typings';
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

export function getStats(data: object[], column: Column) {
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
        const value = row[column.name];
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
        if (column.type === 'string' && !stats.hasColorData && isColor(value)) {
            stats.hasColorData = true;
        }
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
    const colname = column.name;
    for (let i = 1; i < data.length; i++) {
        if (data[i][colname] !== data[i - 1][colname] + 1) return false;
    }
    return true;
}
