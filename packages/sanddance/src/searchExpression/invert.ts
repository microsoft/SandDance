// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { createGroupFromExpression, isSearchExpressionGroup } from './group';
import { Search, SearchExpression, SearchExpressionGroup } from './types';

function invertSearchExpressionGroup(input: SearchExpressionGroup) {
    const output: SearchExpressionGroup = {
        expressions: input.expressions
    };
    if (input.logic !== '!') {
        output.logic = '!';
    }
    return output;
}

function invertSearchExpression(input: SearchExpression) {
    return createGroupFromExpression(input, '!');
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
