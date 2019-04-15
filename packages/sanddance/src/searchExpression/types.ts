// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export type SearchExpressionClause = '&&' | '||';

export type SearchExpressionStringSearchOperators = 'starts' | 'contains';

export type SearchExpressionOperators =
    '==' | '!=' |
    '<' | '<=' |
    '>' | '>=' |
    'isnullorEmpty' |
    SearchExpressionStringSearchOperators;

export interface SearchExpression {
    clause?: SearchExpressionClause;
    name: string;
    operator: SearchExpressionOperators;
    value?: boolean | Date | number | string;
}

export type SearchExpressionGroupLogic = '!';

export interface SearchExpressionGroup<T extends SearchExpression = SearchExpression> {
    logic?: SearchExpressionGroupLogic;
    clause?: SearchExpressionClause;
    expressions: T[];
}

export type Search = SearchExpression | SearchExpressionGroup | SearchExpressionGroup[];
