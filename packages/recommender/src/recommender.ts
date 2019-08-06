import * as SandDance from "@msrvida/sanddance";
import { Column } from "@msrvida/sanddance/dist/es6/types";
import { Insight } from "@msrvida/sanddance/dist/es6/specs/types";

export interface Rule {
    (columns: SandDance.types.Column[]): boolean;
}

export interface Recommendation  extends Partial<Insight> {
    //type: SandDance.types.Chart;
    //x: Column;
    //y: Column;
    score: number;
    //sizeBy: Column;
    //colorBy: Column;
}

export abstract class Recommender {
    constructor(columns: SandDance.types.Column[], data: object[]) { }
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
