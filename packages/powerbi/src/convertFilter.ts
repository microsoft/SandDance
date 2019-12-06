// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as powerbiModels from 'powerbi-models';
import powerbiVisualsApi from 'powerbi-visuals-api';
import { SandDance } from '@msrvida/sanddance-explorer';

export function convertFilter(searchFilter: SandDance.types.Search, columns: powerbiVisualsApi.DataViewMetadataColumn[], data: object[]) {
    const filters: powerbiModels.IFilter[] = [];
    const groups = SandDance.util.ensureSearchExpressionGroupArray(searchFilter);
    groups.forEach(group =>
        group.expressions.forEach(ex => {
            const column = columns.filter(c => c.displayName === ex.name)[0];
            if (column) {
                const a = convertFilterAdvanced(ex, column);
                if (a) {
                    filters.push(a.toJSON());
                }
            }
        })
    );
    return filters;
}

function convertFilterAdvanced(ex: SandDance.types.SearchExpression, column: powerbiVisualsApi.DataViewMetadataColumn): powerbiModels.AdvancedFilter {
    const condition = convertCondition(ex);
    if (condition.operator === 'None') {
        return null;
    } else {
        let target: powerbiModels.IFilterColumnTarget = {
            table: column.queryName.substr(0, column.queryName.indexOf('.')),
            column: column.displayName
        };
        return new powerbiModels.AdvancedFilter(target, 'And', condition);
    }
}

function convertCondition(ex: SandDance.types.SearchExpression): powerbiModels.IAdvancedFilterCondition {
    return {
        operator: convertExpressionOperator(ex.operator),
        value: ex.value
    };
}

function convertExpressionOperator(operator: SandDance.types.SearchExpressionOperators): powerbiModels.AdvancedFilterConditionOperators {
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
