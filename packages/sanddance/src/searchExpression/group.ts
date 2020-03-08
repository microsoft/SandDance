// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    Search,
    SearchExpression,
    SearchExpressionGroup
} from './types';

export function isSearchExpressionGroup(search: Search) {
    if (!search) {
        return false;
    }
    return !!(search as SearchExpressionGroup).expressions;
}

export function createGroupFromExpression(input: SearchExpression) {
    const output: SearchExpressionGroup = {
        expressions: [input]
    };
    return output;
}

export function ensureSearchExpressionGroupArray(search: Search): SearchExpressionGroup[] {
    if (Array.isArray(search)) {
        return [...search];
    } else if (isSearchExpressionGroup(search)) {
        return [search as SearchExpressionGroup];
    } else {
        return [createGroupFromExpression(search as SearchExpression)];
    }
}

export function cleanSearchExpression(search: Search): SearchExpressionGroup[] {
    const groups = ensureSearchExpressionGroupArray(search).filter(Boolean);
    groups.forEach(group => {
        group.expressions = group.expressions.filter(Boolean);
    });
    return groups;
}
