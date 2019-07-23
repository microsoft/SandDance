import * as SandDance from "@msrvida/sanddance";
import { Recommender, Recommendation, Rule } from './recommender';

export class BarChartRecommenderSummary {
    public best: Recommendation;
    //all columns
    constructor(columns: SandDance.types.Column[], data: object[]) {
        let score = -1;
        for (let i = 0; i < columns.length; i++) {
            let axes = [];
            axes.push(columns[i]);
            let recommendation = new BarChartRecommender(axes, data).recommend();
            if (recommendation.score > score) {
                this.best = recommendation;
                score = recommendation.score;
            };
        }

    }

    recommend() {
        return this.best;
    }

}

export class BarChartRecommender implements Recommender {
    public rules: Rule[];
    public columns: SandDance.types.Column[];
    public score: number;

    constructor(columns: SandDance.types.Column[], data: object[]) {
        this.score = 0;
        this.columns = columns;
        this.rules = [

            (columns) => {
                //If x axis is numerical, return true
                if (columns[0].quantitative) {
                    return true;
                } else if (!columns[0].quantitative && columns[0].stats.distinctValueCount < 20) {
                    //If x axis categorical & distinct values < 20, return true
                    return true;
                } else {
                    return false;
                }

            }

        ];
        for (let i = 0; i < this.rules.length; i++) {
            if (this.rules[i](columns)) this.score++;
        }

    }

    recommend() {
        let rec: Recommendation = {
            x: this.columns[0],
            y: undefined,
            score: this.score
        }
        return rec;
    }

}