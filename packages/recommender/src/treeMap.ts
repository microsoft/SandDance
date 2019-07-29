import * as SandDance from "@msrvida/sanddance";
import { Recommender, Recommendation, Rule } from './recommender';

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
                if (this.calcCVColumn(columns[0], data) && this.calcCVColumn(columns[0], data) > 0.5) {
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
            let sum: number = 0;
            let size: number = data.length;
            let colname = column.name;
            for (let i = 0; i < size; i++) {
                let value = data[i][colname];
                sum = sum + value;
            }
            let mean: number = sum / size;
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