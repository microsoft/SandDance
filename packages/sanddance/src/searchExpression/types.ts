// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export type SearchExpressionClause = '&&' | '||';

export type SearchExpressionStringSearchOperators = 'starts' | '!starts' | 'contains' | '!contains';

export type SearchExpressionOperators =
    '==' | '!=' |
    '<' | '<=' |
    '>' | '>=' |
    'isnullorEmpty' | '!isnullorEmpty' |
    SearchExpressionStringSearchOperators;

export type SearchExpressionValue = boolean | Date | number | string;

export interface SearchExpression {
    clause?: SearchExpressionClause;
    name: string;
    operator: SearchExpressionOperators;
    value?: SearchExpressionValue;
}

export interface SearchExpressionGroup<T extends SearchExpression = SearchExpression> {
    clause?: SearchExpressionClause;
    expressions: T[];
}

export type Search = SearchExpression | SearchExpressionGroup | SearchExpressionGroup[];
