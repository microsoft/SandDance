import * as SandDance from "@msrvida/sanddance";
import { Column } from "@msrvida/sanddance/dist/es6/types";

export interface Rule {
    (columns: SandDance.types.Column[]): boolean;
}

export interface Recommendation {
    type: SandDance.types.Chart;
    x: Column;
    y: Column;
    score: number;
    sizeBy: Column;
    colorBy: Column;
}

export abstract class Recommender {
    constructor(columns: SandDance.types.Column[], data: object[]) { }
    abstract rules: Rule[];
    abstract recommend(): Recommendation;
}
