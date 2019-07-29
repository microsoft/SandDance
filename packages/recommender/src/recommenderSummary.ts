import * as SandDance from "@msrvida/sanddance";
import { Recommender, Recommendation, Rule } from './recommender';
import { ScatterPlotRecommenderSummary } from './scatterPlot';
import { DensityPlotRecommenderSummary } from './densityPlot';
import { BarChartRecommenderSummary } from './barChart';
import { TreeMapRecommenderSummary } from './treeMap';
export class RecommenderSummary {
    public recs: Recommendation[];

    //all columns
    constructor(columns: SandDance.types.Column[], data: object[]) {
        this.recs = [];
        let scatterPlotrec = new ScatterPlotRecommenderSummary(columns,data).recommend();
        let densityPlotrec = new DensityPlotRecommenderSummary(columns,data).recommend();
        let barChartrec = new BarChartRecommenderSummary(columns,data).recommend();
        let treeMaprec = new TreeMapRecommenderSummary(columns,data).recommend();
        this.recs.push(scatterPlotrec, densityPlotrec, barChartrec, treeMaprec);
        this.recs.sort(function(a, b){return b.score - a.score});
        }

    

    recommend() {
        return this.recs;
    }

}
