// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as SandDance from "@msrvida/sanddance";

export const maxCategoricalColors: number = 20;

export interface Rule {
    (column: RecommenderColumn): boolean;
}

export interface Recommendation extends Partial<SandDance.types.Insight> {
    score: number;
}

export interface RecommenderColumn extends SandDance.types.Column {
    isSequential: boolean;
}

export abstract class Recommender {
    constructor(columns: RecommenderColumn, data: object[]) { }
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

function detectSequentialColumn(column: SandDance.types.Column, data: object[]): boolean {
    if (data.length < 2) return false;
    let colname = column.name;
    let startPointer = 0;
    let endPointer = data.length - 1;
    while (startPointer < 1000 && startPointer < endPointer) {
        if (data[endPointer][colname] !== data[endPointer - 1][colname] + 1) return false;
        if (data[startPointer][colname] !== data[startPointer + 1][colname] - 1) return false;
        startPointer++;
        endPointer--;
    }
    return true;
}

export function getRecommenderColumns(columns: SandDance.types.Column[], data: object[]) {
    columns.forEach(column => {
        if (!column.quantitative || column.type !== 'integer') return;
        (column as RecommenderColumn).isSequential = detectSequentialColumn(column, data);
    });
    return columns as RecommenderColumn[];
}
