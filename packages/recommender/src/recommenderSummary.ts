import * as SandDance from "@msrvida/sanddance";
import { Recommender, Recommendation, Rule, defaultColorScheme } from './recommender';
import { BarChartRecommenderSummary } from './barChart';

export class RecommenderSummary {
    public rec: Recommendation;

    constructor(columns: SandDance.types.Column[], data: object[]) {
        let quickRec : Recommendation = this.detectLatAndLog(columns, data);
        if(quickRec) this.rec = quickRec;
        else{
            let barChartrec : Recommendation = new BarChartRecommenderSummary(columns,data).recommend();
            if(barChartrec.score>=1)  this.rec = barChartrec;
        }
    }

    recommend() {
        return this.rec;
    }

    detectLatAndLog(columns: SandDance.types.Column[], data: object[]): Recommendation | undefined {
        let longi = false;
        let lati = false;
        let rec: Recommendation = {
            chart: 'scatterplot',
            score:undefined,
            columns:{},
            scheme: undefined,
            view: "2d"
        }
        columns.forEach(column => {
            if(column.name.toLowerCase() === 'longitude') {
                longi= true;
                rec.scheme =  defaultColorScheme(column);
                rec.columns.x = column.name;
            }
            else if(column.name.toLowerCase() === 'latitude') {
                lati= true;
                rec.columns.y = column.name;
            }
            else if(column.quantitative || column.stats.distinctValueCount<5){
                rec.columns.color = column.name;
            }
        });
        if(longi&&lati) {
            return rec;
        } 
    }
}
