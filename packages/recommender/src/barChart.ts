import * as SandDance from "@msrvida/sanddance";
import { Recommender, Recommendation, Rule } from './recommender';

const maxDistinctVal = 20;
const minDistinctVal = 2;

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
            if(score===2) break;
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
                    // put 20 and 1 as constant 
                } else if (!columns[0].quantitative && columns[0].stats.distinctValueCount <= maxDistinctVal && columns[0].stats.distinctValueCount >= minDistinctVal) {
                    //If x axis categorical & distinct values < 20, return true
                    return true;
                } else {
                    return false;
                }
            }
            /*
            (columns) => {
                if (!columns[0].quantitative || columns[0].stats.distinctValueCount<7) { 
                    return false; 
                }
                //detect outliers for numerical variable
                let max = columns[0].stats.max;
                let min = columns[0].stats.min;
                let colname = columns[0].name;
                let bin = (max - min) / 60;
                if(bin===0) return false;
                let bins: number[] = new Array(7).fill(0);
               
                for (let i = 0; i < data.length; i++) {
                    let binIndex = Math.floor((data[i][colname] - min) / bin);
                    if(binIndex===60) binIndex--;
                    bins[binIndex]++;
                };
                let emptyBin = 0;
                console.log(bins);
                bins.forEach(binNum => {
                    if (binNum === 0) emptyBin++;
                });
                if (emptyBin < 20) {
                    return true;
                } else {
                    return false;
                }
            }
            */
            
        ];
        for (let i = 0; i < this.rules.length; i++) {
            if (this.rules[i](columns)) this.score++;
        }

    }

    calcBinColumn(column: SandDance.types.Column, data: object[], min: number, max: number) {

    }

    recommend() {
        let rec: Recommendation = {
            type: 'barchart',
            x: this.columns[0],
            y: undefined,
            score: this.score,
            sizeBy: undefined
        }
        return rec;
    }

}