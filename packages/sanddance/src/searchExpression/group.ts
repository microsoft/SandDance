// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    Search,
    SearchExpression,
    SearchExpressionGroup,
    SearchExpressionGroupLogic
} from './types';

export function isSearchExpressionGroup(search: Search) {
    if (!search) {
        return false;
    }
    return !!(search as SearchExpressionGroup).expressions;
}

export function createGroupFromExpression(input: SearchExpression, logic?: SearchExpressionGroupLogic) {
    const output: SearchExpressionGroup = {
        expressions: [input]
    };
    if (logic) {
        output.logic = logic;
    }
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
