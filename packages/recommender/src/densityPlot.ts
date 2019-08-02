import * as SandDance from "@msrvida/sanddance";
import { Recommender, Recommendation, Rule } from './recommender';

const maxDistinctVal = 5;

export class DensityPlotRecommenderSummary {
    public best: Recommendation;
    constructor(columns: SandDance.types.Column[], data: object[]) {
        let score = -1;
        for (let i = 0; i < columns.length; i++) {
            for (let j = i + 1; j < columns.length; j++) {
                let axes = [];
                axes.push(columns[i],columns[j]);
                let recommendation = new DensityPlotRecommender(axes, data).recommend();
                if (recommendation.score > score) {
                    this.best = recommendation;
                    score = recommendation.score;
                }
                if(score===3) break;
            };
            if(score===3) break;
        }

        for (let k = 0; k < columns.length; k++) {
            if(columns[k].name ===this.best.columns.x || columns[k].name ===this.best.columns.y ) continue;
            if(columns[k].quantitative || columns[k].stats.distinctValueCount<5) {
                this.best.columns.color = columns[k].name;
                break;
            }
        }

    }

    recommend() {
        return this.best;
    }

}

export class DensityPlotRecommender implements Recommender {
    public rules: Rule[];
    public columns: SandDance.types.Column[];
    public score: number;

    constructor(columns: SandDance.types.Column[], data: object[]) {
        this.score = 0;
        this.columns = columns;
        //total score is 3
        this.rules = [
            //If both axes are categorical, return true
            (columns) => {
                if (!columns[0].quantitative && !columns[1].quantitative) {
                    return true;
                } else {
                    return false;
                }

            },
            //x-axis distinct value<5
            (columns) => {
                if (columns[0].stats.distinctValueCount < maxDistinctVal) {
                    return true;
                } else {
                    return false;
                }
            },
            //y-axis distinct value<5
            (columns) => {
                if (columns[1].stats.distinctValueCount < maxDistinctVal) {
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
            chart: 'density',
            columns: {
                x: this.columns[0].name,
                y: this.columns[1].name
            },
            score: this.score,
        }
        return rec;
    }

}