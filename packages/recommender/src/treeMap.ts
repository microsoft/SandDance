import * as SandDance from "@msrvida/sanddance";
import { Recommender, Recommendation, Rule } from './recommender';

const minCV = 0.3;

export class TreeMapRecommenderSummary {
    public best: Recommendation;
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

        for (let k = 0; k < columns.length; k++) {
            if(columns[k].name===this.best.columns.size ) continue;
            if(columns[k].quantitative || columns[k].stats.distinctValueCount<5) {
                this.best.columns.size = columns[k].name ;
                break;
            }
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
        //total score is 1
        this.rules = [

            (columns) => {
                //standard deviation of the variable should be large enough
                if (columns[0].quantitative && this.calcCVColumn(columns[0], data) && this.calcCVColumn(columns[0], data) > minCV) {
                    return true;
                }

            }

        ];
        for (let i = 0; i < this.rules.length; i++) {
            if (this.rules[i](columns)) this.score++;
        }

    }

    //Calculate the coefficient of variation (CV) of one column
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
            chart: 'treemap',
            
            score: this.score
        }
        return rec;
    }

}