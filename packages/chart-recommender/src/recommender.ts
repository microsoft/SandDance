/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import * as SandDance from '@msrvida/sanddance';

export const maxCategoricalColors: number = 20;

export interface Rule {
    (column: SandDance.types.Column): boolean;
}

export interface Recommendation extends Partial<SandDance.specs.Insight> {
    score: number;
}

export abstract class Recommender {
    constructor(columns: SandDance.types.Column, data: object[]) { }
    abstract rules: Rule[];
    abstract recommend(): Recommendation;
}

export function defaultColorScheme(c: SandDance.types.Column) {
    if (c.quantitative) {
        return 'redyellowgreen';
    } else if (c.stats.distinctValueCount === 2) {
        return 'dual_redgreen';
    } else if (c.stats.distinctValueCount <= 10) {
        return 'category10';
    }
    return 'category20';
}
