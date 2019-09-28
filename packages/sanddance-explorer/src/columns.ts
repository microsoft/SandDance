// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { preferredColumnForTreemapSize } from '@msrvida/chart-recommender';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from './language';

export function ensureColumnsExist(insightColumns: SandDance.types.InsightColumns, actualColumns: SandDance.types.Column[]) {
    //ensure columns exist
    for (let role in insightColumns) {
        let columnName = insightColumns[role];
        let column = actualColumns.filter(c => c.name === columnName)[0];
        if (!column) {
            delete insightColumns[role];
        }
    }
}

export function ensureColumnsPopulated(chart: SandDance.types.Chart, insightColumns: SandDance.types.InsightColumns, actualColumns: SandDance.types.Column[]) {
    //ensure columns are populated
    const firstColumn = actualColumns.filter(c => !SandDance.util.isInternalFieldName(c.name))[0];
    const firstColumnName = firstColumn && firstColumn.name;
    const ensureColumn = (role: SandDance.types.InsightColumnRoles) => {
        if (!insightColumns[role]) {
            insightColumns[role] = firstColumnName;
        }
    };
    switch (chart) {
    case 'barchart':
    case 'barchartV':
        ensureColumn('x');
        break;
    case 'barchartH':
        ensureColumn('y');
        break;
    case 'density':
    case 'scatterplot':
    case 'stacks':
        ensureColumn('x');
        ensureColumn('y');
        break;
    case 'treemap':
        if (!insightColumns.size) {
            insightColumns.size = preferredColumnForTreemapSize(actualColumns, true);
            if (!insightColumns.size) {
                insightColumns.size = preferredColumnForTreemapSize(actualColumns, false);
            }
        }
        if (!insightColumns.size) {
            //error - no numeric column
            return [strings.errorColumnMustBeNumeric];
        }
        break;
    }
}
