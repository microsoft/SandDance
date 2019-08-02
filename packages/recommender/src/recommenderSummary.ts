import * as SandDance from "@msrvida/sanddance";
import { Recommender, Recommendation, Rule } from './recommender';
import { ScatterPlotRecommenderSummary } from './scatterPlot';
import { DensityPlotRecommenderSummary } from './densityPlot';
import { BarChartRecommenderSummary } from './barChart';
import { TreeMapRecommenderSummary } from './treeMap';
export class RecommenderSummary {
    public rec: Recommendation;

    //all columns
    constructor(columns: SandDance.types.Column[], data: object[]) {
        let quickRec = this.detectQuickScatterPlot(columns, data);
        if(quickRec) this.rec = quickRec;
        else{
            let barChartrec = new BarChartRecommenderSummary(columns,data).recommend();
            if(barChartrec.score>=1)  this.rec = barChartrec;
            //update
            else if(columns.length>=2) {
                let scatterPlotrec = new ScatterPlotRecommenderSummary(columns,data).recommend();
                if(scatterPlotrec.score>=3) this.rec = barChartrec;
                else {
                    let densityPlotrec = new DensityPlotRecommenderSummary(columns,data).recommend();
                    this.rec = scatterPlotrec.score>=densityPlotrec.score ? scatterPlotrec :densityPlotrec;
                }
            } else {
                let treeMaprec = new TreeMapRecommenderSummary(columns,data).recommend();
                if(treeMaprec.score>=1) this.rec = barChartrec;
            }
        }
    }

    recommend() {
        return this.rec;
    }

    detectQuickScatterPlot(columns: SandDance.types.Column[], data: object[]): Recommendation | undefined {
        let latAndLogRec : Recommendation = this.detectLatAndLog(columns, data);
        if(latAndLogRec) {
            return latAndLogRec;
        } 
        /*else {
            let timeRec : Recommendation = this.detectTimeSeries(columns, data);
            if(timeRec) return timeRec;
        }*/
    }

    detectLatAndLog(columns: SandDance.types.Column[], data: object[]): Recommendation | undefined {
        let longi = false;
        let lati = false;
        let rec: Recommendation = {
            chart: 'scatterplot',
            score:undefined,
            columns:{
                
            }
        }
        columns.forEach(column => {
            if(column.name.toLowerCase() === 'longitude') {
                longi= true;
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

    /*
    detectTimeSeries(columns: SandDance.types.Column[], data: object[]): Recommendation | undefined {
        let time = false;
        let rec: Recommendation = {
            type: 'scatterplot',
            x: undefined,
            y: undefined,
            score: undefined,
            sizeBy: undefined
        }
        columns.forEach(column => {
            if(rec.x && rec.y) return rec;
            if(column.name.toLowerCase().includes('date') || column.name.toLowerCase().includes('time')) {
                rec.x = column;
            }
            else if (column.quantitative && column.stats.distinctValueCount > 20){
                rec.y=column;
            }
        });
        if(rec.x && rec.y) {
            return rec;
        } 
    }
    */


}
