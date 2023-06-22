/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Column, ColumnTypeMap } from '@msrvida/chart-types';
import { inferTypes } from 'vega-typings';
import { checkIsColorData } from './color';
import { isQuantitative } from './numeric';
import { getStats } from './stats';

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
