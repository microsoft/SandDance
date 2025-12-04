/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Column } from '@msrvida/chart-types';
import { Insight, SpecColumns } from './types.js';

export { getColumnsFromData, getStats, inferAll } from '@msrvida/data-inference';

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
