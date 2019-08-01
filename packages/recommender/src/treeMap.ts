import * as SandDance from "@msrvida/sanddance";
import { Recommender, Recommendation, Rule } from './recommender';

const minCV = 0.3;

export class TreeMapRecommenderSummary {
    public best: Recommendation;
    //all columns
    constructor(columns: SandDance.types.Column[], data: object[]) {
        let score = -1;
        for (let i = 0; i < columns.length; i++) {
            let axes = [];
            axes.push(columns[i]);
            let recommendation = new TreeMapRecommender(axes, data).recommend();
            if (recommendation.score > score) {
                this.best = recommendation;
                score = recommendation.score;
            };
            if(score===1) break;
        }

    }

    recommend() {
        return this.best;
    }

}

export class TreeMapRecommender implements Recommender {
    public rules: Rule[];
    public columns: SandDance.types.Column[];
    public score: number;

    constructor(columns: SandDance.types.Column[], data: object[]) {
        this.score = 0;
        this.columns = columns;
        this.rules = [

            (columns) => {
                //standard deviation
                if (columns[0].quantitative && this.calcCVColumn(columns[0], data) && this.calcCVColumn(columns[0], data) > minCV) {
                    return true;
                }

            }

        ];
        for (let i = 0; i < this.rules.length; i++) {
            if (this.rules[i](columns)) this.score++;
        }

    }

    calcCVColumn(column: SandDance.types.Column, data: object[]) {
        if (column.quantitative) {
            let size: number = data.length;
            let colname = column.name;
            let mean: number = column.stats.mean;
            let sd: number = 0;
            for (let i = 0; i < size; i++) {
                let value = data[i][colname];
                sd = sd + (value - mean) * (value - mean);
            }
            sd = Math.sqrt(sd / size);
            let cv: number = sd / mean;
            return cv;
        }
    }



    recommend() {
        let rec: Recommendation = {
            type: 'treemap',
            x: undefined,
            y: undefined,
            sizeBy: this.columns[0],
            score: this.score
        }
        return rec;
    }

}