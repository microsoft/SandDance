/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Column } from '@msrvida/chart-types';
import { Insight } from '@msrvida/sanddance-specs';

export const maxCategoricalColors: number = 20;

export interface Rule {
    (column: Column): boolean;
}

export interface Recommendation extends Partial<Insight> {
    score: number;
}

export abstract class Recommender {
    constructor(columns: Column, data: object[]) { }
    abstract rules: Rule[];
    abstract recommend(): Recommendation;
}

export function defaultColorScheme(c: Column) {
    if (c.quantitative) {
        return 'redyellowgreen';
    } else if (c.stats.distinctValueCount === 2) {
        return 'dual_redgreen';
    } else if (c.stats.distinctValueCount <= 10) {
        return 'category10';
    }
    return 'category20';
}
