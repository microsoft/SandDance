/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { preferredColumnForTreemapSize } from '@msrvida/chart-recommender';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from './language';
import { Transforms } from 'vega-typings/types';
import { BackgroundImageColumnBound, DataExtent } from './interfaces';

import TotalStyle = SandDance.specs.TotalStyle;

export function ensureColumnsExist(insightColumns: SandDance.specs.InsightColumns, actualColumns: SandDance.types.Column[], transform: Transforms[]) {
    //ensure columns exist
    for (const role in insightColumns) {
        const columnName = insightColumns[role];
        const column = actualColumns.filter(c => c.name === columnName)[0];
        const transformColumn = transform ? transform.filter(t => {
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

export function ensureColumnsPopulated(chart: SandDance.specs.Chart, totalStyle: TotalStyle, insightColumns: SandDance.specs.InsightColumns, actualColumns: SandDance.types.Column[]) {
    //ensure columns are populated
    const nonInternal = actualColumns.filter(c => !SandDance.util.isInternalFieldName(c.name));
    const firstColumn = nonInternal[0];
    const firstColumnName = firstColumn && firstColumn.name;
    const firstQuantitative = nonInternal.filter(c => c.quantitative)[0];
    const firstQuantitativeColumnName = firstQuantitative && firstQuantitative.name;
    const ensureColumn = (role: SandDance.specs.InsightColumnRoles, quantitative?: boolean, treemap?: boolean) => {
        if (!insightColumns[role]) {
            if (treemap) {
                insightColumns[role] = getTreemapColumn(actualColumns).name;
            } else {
                insightColumns[role] = quantitative ? firstQuantitativeColumnName : firstColumnName;
            }
        }
    };
    function checkRequiresSize() {
        switch (totalStyle) {
            case 'sum-strip':
            case 'sum-strip-percent':
                ensureColumn('size', true);
                break;
            case 'sum-treemap':
                ensureColumn('size', true, true);
                break;
        }
    }
    switch (chart) {
        case 'barchart':
        case 'barchartV':
            ensureColumn('x');
            checkRequiresSize();
            break;
        case 'barchartH':
            ensureColumn('y');
            checkRequiresSize();
            break;
        case 'density':
            ensureColumn('x');
            ensureColumn('y');
            checkRequiresSize();
            break;
        case 'scatterplot':
        case 'stacks':
            ensureColumn('x');
            ensureColumn('y');
            break;
        case 'treemap':
            if (!insightColumns.size) {
                insightColumns.size = getTreemapColumn(actualColumns).name;
            }
            if (!insightColumns.size) {
                //error - no numeric column
                return [strings.errorColumnMustBeNumeric];
            }
            break;
    }
}

export function getTreemapColumn(columns: SandDance.types.Column[]) {
    let column = preferredColumnForTreemapSize(columns, true);
    if (!column) {
        column = preferredColumnForTreemapSize(columns, false);
    }
    return column;
}

export function colorMapping(insight: SandDance.specs.Insight, columns: SandDance.types.Column[]) {
    if (columns && insight.columns && insight.columns.color) {
        return columns.filter(c => c.name === insight.columns.color)[0];
    }
}

export function getBackgroundImageColumnBounds(columns: SandDance.types.Column[]) {
    const bounds: BackgroundImageColumnBound[] = [];
    const getBound = (dimension: SandDance.types.Dimension2D, dataExtent: DataExtent, column: SandDance.types.Column): BackgroundImageColumnBound => {
        const { stats } = column;
        const numericValue = dataExtent === 'max' ? stats.max : stats.min;
        return {
            columnName: column.name,
            dimension,
            valid: true,
            dataExtent,
            numericValue,
            stringValue: numericValue.toString(),
        };
    };
    const dataExtents: DataExtent[] = ['max', 'min'];
    const dimensions: SandDance.types.Dimension2D[] = ['x', 'y'];
    columns.forEach(c => {
        if (c.quantitative) {
            dimensions.forEach(dimension => dataExtents.forEach(dataExtent => bounds.push(getBound(dimension, dataExtent, c))));
        }
    });
    return bounds;
}
