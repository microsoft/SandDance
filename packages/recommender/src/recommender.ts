// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as SandDance from "@msrvida/sanddance";
import { Insight } from "@msrvida/sanddance/dist/es6/specs/types";

export const maxCategoricalColors : number = 20;

export interface Rule {
    (column: RecommenderColumn): boolean;
}

export interface Recommendation extends Partial<Insight> {
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

export function detectSequential(column: SandDance.types.Column, data: object[]): boolean {
    let rowCount = data.length;
    let colname = column.name;
    if (data.length>1000) {
        rowCount = 1000;
    }
    let startPointer = 0;
    let endPointer = rowCount-1;
    if(data[endPointer][colname] - data[startPointer][colname] !== endPointer-startPointer) return false;
    while(startPointer < endPointer){
        if(data[endPointer][colname] !== data[endPointer-1][colname]+1 ) return false;
        if(data[startPointer][colname] !== data[startPointer+1][colname]-1 ) return false;
        startPointer++;
        endPointer--;
    }
    return true;
}

export function detectSequentialAll(columns: SandDance.types.Column[], data: object[]): RecommenderColumn[] {
    let recommenderColumns :RecommenderColumn[] = [];
    columns.forEach(column => {
        let isSequential = detectSequential(column, data);
        let col : RecommenderColumn= {
            name: column.name,
            type: column.type,
            quantitative: column.quantitative,
            stats: column.stats,
            isSequential: isSequential
        }
        recommenderColumns.push(col);
    });
    return recommenderColumns;
}