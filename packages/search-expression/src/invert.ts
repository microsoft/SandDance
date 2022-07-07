/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { isSearchExpressionGroup } from './group';
import {
    Search,
    SearchExpression,
    SearchExpressionClause,
    SearchExpressionGroup,
    SearchExpressionOperators,
} from './types';

function invertSearchExpressionGroup(input: SearchExpressionGroup) {
    //this only works if all expressions in this group have the same clause
    const output: SearchExpressionGroup = {
        expressions: input.expressions.map(invertSearchExpression),
    };
    if (input.clause) {
        output.clause = invertedClauses[input.clause];
    }
    return output;
}

const invertedOperators: { [key in SearchExpressionOperators]: SearchExpressionOperators } = {
    '!=': '==',
    '==': '!=',
    '<': '>=',
    '>=': '<',
    '<=': '>',
    '>': '<=',
    '!contains': 'contains',
    'contains': '!contains',
    '!isnullorEmpty': 'isnullorEmpty',
    'isnullorEmpty': '!isnullorEmpty',
    '!starts': 'starts',
    'starts': '!starts',
};

const invertedClauses: { [key in SearchExpressionClause]: SearchExpressionClause } = {
    '&&': '||',
    '||': '&&',
};

function invertSearchExpression(input: SearchExpression) {
    const operator = invertedOperators[input.operator];
    const output: SearchExpression = { ...input, operator };
    if (input.clause) {
        output.clause = invertedClauses[input.clause];
    }
    return output;
}

export function invert(search: Search): Search {
    if (Array.isArray(search)) {
        return (search as SearchExpressionGroup[]).map(invertSearchExpressionGroup);
    } else if (isSearchExpressionGroup(search)) {
        return invertSearchExpressionGroup(search as SearchExpressionGroup);
    } else {
        return invertSearchExpression(search as SearchExpression);
    }
}
