import * as SandDance from "@msrvida/sanddance";
import { Recommender, Recommendation, Rule } from './recommender';

export class ScatterPlotRecommender implements Recommender {
    public rules: Rule[];

    constructor(columns: SandDance.types.Column[]) {

        this.rules = [
            () => {
                //x axis should be numeric
                return true;
            },
            () => {
                return false;
            },
        ];

    }

    recommend() {
        const recs: Recommendation[] = [];
        return recs;
    }

}
