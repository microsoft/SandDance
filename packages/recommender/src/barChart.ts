import * as SandDance from "@msrvida/sanddance";
import { Recommender, Recommendation, Rule, defaultColorScheme } from './recommender';

const maxDistinctVal = 20;
const minDistinctVal = 2;

export class BarChartRecommenderSummary {
    public best: Recommendation;
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
    public columns: SandDance.types.Column[];
    public score: number;

    constructor(columns: SandDance.types.Column[], data: object[]) {
        this.score = 0;
        this.columns = columns;
        //total score is 1
        this.rules = [
            (columns) => {
                //If x axis is numerical, return true
                if (columns[0].quantitative) {
                    return true;
                } 
                //If x axis categorical & 1 < distinct values < 20, return true
                else if (!columns[0].quantitative && columns[0].stats.distinctValueCount <= maxDistinctVal && columns[0].stats.distinctValueCount >= minDistinctVal) { 
                    return true;
                } else {
                    return false;
                }
            }
            /*
            // outlier rule
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

    recommend() {
        let scheme = defaultColorScheme(this.columns[0]);
        let rec: Recommendation = {
            chart: 'barchart',
            columns: {
                x: this.columns[0].name
            },
            score: this.score,
            scheme: scheme
        }
        return rec;
    }

}