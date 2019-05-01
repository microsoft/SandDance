// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from './vega-deck.gl';
import { Column } from './specs/types';
import { facetTitleSeparator } from './specs/facet';
import { SearchExpression, SearchExpressionGroup, SearchExpressionOperators } from './searchExpression/types';

export function notNice(niceValue: string) {
    //convert "nice" numbers to numeric value
    return niceValue.replace(/,/g, '');
}

function tickValue(axis: VegaDeckGl.types.Axis, i: number) {
    const tick = axis.tickText[i];
    let value: any;
    if (tick) {
        value = axis.tickText[i].value;
    }
    return { tick, value };
}

export function selectNullOrEmpty(column: Column) {
    const searchExpression: SearchExpression = {
        name: column.name,
        operator: 'isnullorEmpty'
    };
    return searchExpression;
}

export function selectExact(column: Column, value: string) {
    const searchExpression: SearchExpression = {
        name: column.name,
        operator: '==',
        value
    };
    return searchExpression;
}

export function selectNone(column: Column, values: string[]) {
    const expressions = values.map((value, i) => {
        const searchExpression: SearchExpression = {
            name: column.name,
            operator: '!=',
            value
        };
        if (i) {
            searchExpression.clause = '&&';
        }
        return searchExpression;
    });
    const searchExpressionGroup: SearchExpressionGroup = {
        expressions
    }
    return searchExpressionGroup;
}

export function selectExactAxis(axis: VegaDeckGl.types.Axis, column: Column, i: number) {
    const result = tickValue(axis, i);
    if (result.tick) {
        return selectExact(column, result.value);
    }
}

export function selectBetween(column: Column, lowValue: string, highValue: string, lowOperator: SearchExpressionOperators = '>=', highOperator: SearchExpressionOperators = '<') {
    const expressions: SearchExpression[] = [];
    if (lowValue !== undefined) {
        expressions.push({
            name: column.name,
            operator: lowOperator,
            value: lowValue
        });
    }
    if (highValue !== undefined) {
        expressions.push({
            name: column.name,
            operator: highOperator,
            value: highValue
        });
    }
    if (expressions.length > 1) {
        expressions[1].clause = '&&';
    }
    const searchExpressionGroup: SearchExpressionGroup = {
        expressions
    };
    return searchExpressionGroup;
}

export function selectBetweenAxis(axis: VegaDeckGl.types.Axis, column: Column, i: number) {
    const low = tickValue(axis, i);
    const high = tickValue(axis, i + 1);
    return selectBetween(column, low.value, high.value);
}

export function selectBetweenFacet(column: Column, title: string, isFirst: boolean, isLast: boolean) {
    const values = title.split(facetTitleSeparator);
    return selectBetween(column, isFirst ? undefined : values[0], isLast ? undefined : values[1]);
}