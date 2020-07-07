// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { preferredColumnForTreemapSize } from '@msrvida/chart-recommender';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from './language';
import { Transforms } from 'vega-typings/types';

export function ensureColumnsExist(insightColumns: SandDance.specs.InsightColumns, actualColumns: SandDance.types.Column[], transform: Transforms[]) {
    //ensure columns exist
    for (let role in insightColumns) {
        let columnName = insightColumns[role];
        let column = actualColumns.filter(c => c.name === columnName)[0];
        let transformColumn = transform ? transform.filter(t => {
            switch (t.type) {
                case 'formula': {
                    return t.as === columnName;
                }
            }
        })[0] : null;
        if (!(column || transformColumn)) {
            delete insightColumns[role];
        }
    }
}

export function ensureColumnsPopulated(chart: SandDance.specs.Chart, insightColumns: SandDance.specs.InsightColumns, actualColumns: SandDance.types.Column[]) {
    //ensure columns are populated
    const nonInternal = actualColumns.filter(c => !SandDance.util.isInternalFieldName(c.name));
    const firstColumn = nonInternal[0];
    const firstColumnName = firstColumn && firstColumn.name;
    const firstQuantitative = nonInternal.filter(c => c.quantitative)[0];
    const firstQuantitativeColumnName = firstQuantitative && firstQuantitative.name;
    const ensureColumn = (role: SandDance.specs.InsightColumnRoles, quantitative?: boolean) => {
        if (!insightColumns[role]) {
            insightColumns[role] = quantitative ? firstQuantitativeColumnName : firstColumnName;
        }
    };
    switch (chart) {
        case 'barchart':
        case 'barchartV':
            ensureColumn('x');
            ensureColumn('size', true);
            break;
        case 'barchartH':
            ensureColumn('y');
            ensureColumn('size', true);
            break;
        case 'density':
            ensureColumn('x');
            ensureColumn('y');
            ensureColumn('size', true);
            break;
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
