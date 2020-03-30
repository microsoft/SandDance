// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from '@msrvida/vega-deck.gl';
import { Column, ColumnStats, ColumnTypeMap } from '@msrvida/chart-types';
import { Insight, SpecColumns } from './types';

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
        z: getColumnByName(insight.columns && insight.columns.z)
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

export function getStats(data: object[], column: Column) {
    const distinctMap = {};
    const stats: ColumnStats = {
        distinctValueCount: null,
        max: null,
        mean: null,
        min: null
    };
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
        if (column.type === 'string' && !stats.hasColorData && VegaDeckGl.util.isColor(value)) {
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
    let colname = column.name;
    for (let i = 1; i < data.length; i++) {
        if (data[i][colname] !== data[i - 1][colname] + 1) return false;
    }
    return true;
}
