// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as powerbiModels from 'powerbi-models';
import powerbiVisualsApi from 'powerbi-visuals-api';
import { SandDance } from '@msrvida/sanddance-explorer';

export function convertFilter(searchFilter: SandDance.searchExpression.Search, columns: powerbiVisualsApi.DataViewMetadataColumn[], data: object[]) {
    const selectedIds: powerbiVisualsApi.extensibility.ISelectionId[] = [];
    const filters: powerbiModels.IFilter[] = [];
    const groups = SandDance.searchExpression.ensureSearchExpressionGroupArray(searchFilter);
    groups.forEach(group =>
        group.expressions.forEach(ex => {
            if (!ex) return;
            if (ex.name === SandDance.constants.GL_ORDINAL) {
                // it would be ideal to filter to a single row identity, but the PoerBI API currently does not let us do that.
                // so, we will filter to data points that have the same values
                const dataPoint = getDataPoint(<number>ex.value, data);
                if (dataPoint) {
                    filterSimilar(dataPoint, columns, filters);
                    // then we will select this data point
                    selectedIds.push(dataPoint[SandDance.constants.FieldNames.PowerBISelectionId]);
                }
            } else {
                const column = columns.filter(c => c.displayName === ex.name)[0];
                if (column) {
                    const advancedFilter = convertExpressionToAdvancedFilter(ex, column);
                    if (advancedFilter) {
                        filters.push(advancedFilter.toJSON());
                    }
                }
            }
        })
    );
    return { filters, selectedIds };
}

function getDataPoint(GL_ORDINAL: number, data: object[]) {
    for (let i = 0; i < data.length; i++) {
        if (data[i][SandDance.constants.GL_ORDINAL] === GL_ORDINAL) {
            return data[i];
        }
    }
}

function filterSimilar(data: object, columns: powerbiVisualsApi.DataViewMetadataColumn[], filters: powerbiModels.IFilter[]) {
    columns.forEach(column => {
        const value = data[column.displayName];

        // INVESTIGATION: booleans do not work with filter api
        if (typeof value === 'boolean') return;

        filters.push(createAdvancedFilter(column, {
            operator: 'Is',
            value
        }).toJSON());
    });
}

function createAdvancedFilter(column: powerbiVisualsApi.DataViewMetadataColumn, condition: powerbiModels.IAdvancedFilterCondition): powerbiModels.AdvancedFilter {
    if (condition.operator === 'None') {
        return null;
    } else {
        let target: powerbiModels.IFilterColumnTarget = {
            table: getTable(column.queryName),
            column: column.displayName
        };
        return new powerbiModels.AdvancedFilter(target, 'And', condition);
    }
}

function getTable(queryName: string) {
    const regExp = /\(([^)]+)\)/.exec(queryName);
    if (regExp) {
        queryName = regExp[1];
    }
    return queryName.substr(0, queryName.indexOf('.'));
}

function convertExpressionToAdvancedFilter(ex: SandDance.searchExpression.SearchExpression, column: powerbiVisualsApi.DataViewMetadataColumn): powerbiModels.AdvancedFilter {
    return createAdvancedFilter(
        column,
        {
            operator: convertExpressionOperator(ex.operator),
            value: ex.value
        }
    );
}

function convertExpressionOperator(operator: SandDance.searchExpression.SearchExpressionOperators): powerbiModels.AdvancedFilterConditionOperators {
    switch (operator) {
        case '!=': return 'IsNot';
        case '!contains': return 'DoesNotContain';
        case '!isnullorEmpty': return 'IsNotBlank';
        case '!starts': return 'DoesNotStartWith';
        case '<': return 'LessThan';
        case '<=': return 'LessThanOrEqual';
        case '==': return 'Is';
        case '>': return 'GreaterThan';
        case '>=': return 'GreaterThanOrEqual';
        case 'contains': return 'Contains';
        case 'isnullorEmpty': return 'IsBlank';
        case 'starts': return 'StartsWith';
        default: return 'None';
    }
}
