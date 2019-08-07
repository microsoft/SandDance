import * as SandDance from "@msrvida/sanddance";
import { Recommender, Recommendation, Rule, defaultColorScheme } from './recommender';

const maxDistinctVal = 20;
const minDistinctVal = 2;

export class BarChartRecommenderSummary {
    public best: Recommendation;

    constructor(columns: SandDance.types.Column[], data: object[]) {
        let score : number = -1;
        for (let i = 0; i < columns.length; i++) {
            let x : SandDance.types.Column = columns[i];
            let recommendation = new BarChartRecommender(x, data).recommend();
            if (recommendation.score > score) {
                this.best = recommendation;
                score = recommendation.score;
            };
            if(score===1) break;
        }

        for (let k = 0; k < columns.length; k++) {
            if(columns[k].name ===this.best.columns.x ) continue;
            if(columns[k].quantitative) {
                this.best.columns.color = columns[k].name;
                this.best.columns.sort = columns[k].name;
                break;
            } else if ( columns[k].stats.distinctValueCount<5 && columns[k].stats.distinctValueCount>1) {
                this.best.columns.color = columns[k].name;
                this.best.columns.sort = columns[k].name;
                break;
            }
        }
    }

    recommend() {
        return this.best;
    }

}

export class BarChartRecommender implements Recommender {
    public rules: Rule[];
    public column: SandDance.types.Column;
    public score: number;

    constructor(column: SandDance.types.Column, data: object[]) {
        this.score = 0;
        this.column = column;
        //the total score for bar chart is 1
        this.rules = [
            (column) => {
                if (column.quantitative) {
                    return true;
                } else if (!column.quantitative && column.stats.distinctValueCount <= maxDistinctVal && column.stats.distinctValueCount >= minDistinctVal) { 
                    return true;
                } else {
                    return false;
                }
            }    
        ];
        for (let i = 0; i < this.rules.length; i++) {
            if (this.rules[i](column)) this.score++;
        }

    }

    recommend() {
        let scheme = defaultColorScheme(this.column);
        let rec: Recommendation = {
            chart: 'barchart',
            columns: {
                x: this.column.name
            },
            score: this.score,
            scheme: scheme,
            view: "2d"
        }
        return rec;
    }

}