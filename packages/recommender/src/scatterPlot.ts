import * as SandDance from "@msrvida/sanddance";
import { Recommender, Recommendation, Rule, defaultColorScheme } from './recommender';

const minDistinctVal = 10;

export class ScatterPlotRecommenderSummary {
    public best: Recommendation;
    
    constructor(columns: SandDance.types.Column[], data: object[]) {
        let score = -1;
        for (let i = 0; i < columns.length; i++) {
            for (let j = i + 1; j < columns.length; j++) {
                let axes = [];
                axes.push(columns[i],columns[j]);
                let recommendation = new ScatterPlotRecommender(axes, data).recommend();
                if (recommendation.score > score) {
                    this.best = recommendation;
                    score = recommendation.score;
                }
                if(score===3) break;
            };
            if(score===3) break;
        }

        for (let k = 0; k < columns.length; k++) {
            if(columns[k].name===this.best.columns.x || columns[k].name===this.best.columns.y ) continue;
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

export class ScatterPlotRecommender implements Recommender {
    public rules: Rule[];
    public columns: SandDance.types.Column[];
    public score: number;

    constructor(columns: SandDance.types.Column[], data: object[]) {
        this.score = 0;
        this.columns = columns;
        //total score of 3
        this.rules = [
            //If both axes are numerical, return true
            (columns) => {
                if (columns[0].quantitative && columns[1].quantitative) {
                    return true;
                } else {
                    return false;
                }

            },
            //if x-axis distinct value>10, return true
            (columns) => {
                if (columns[0].stats.distinctValueCount > minDistinctVal) {
                    return true;
                } else {
                    return false;
                }
            },
            //if y-axis distinct value>10, return true
            (columns) => {
                if (columns[1].stats.distinctValueCount > minDistinctVal) {
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
        let scheme = defaultColorScheme(this.columns[0]);
        let rec: Recommendation = {
            chart: 'scatterplot',
            columns: {
                x: this.columns[0].name,
                y: this.columns[1].name
            },
            score: this.score,
            scheme: scheme
        }
        return rec;
    }

}