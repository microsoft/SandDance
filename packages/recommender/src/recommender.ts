import * as SandDance from "@msrvida/sanddance";

export interface Rule {
    (columns: SandDance.types.Column[]): boolean;
}

export interface Recommendation {
    score: number;

}

export abstract class Recommender {
    constructor(columns: SandDance.types.Column[]) { }
    abstract rules: Rule[];
    abstract recommend(): Recommendation[];
}
