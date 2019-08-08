// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as SandDance from "@msrvida/sanddance";
import { Recommendation, detectSequentialAll } from './recommender';
import { BarChartRecommenderSummary } from './barChart';
import { ScatterPlotRecommenderSummary } from './scatterPlot';

export class RecommenderSummary {
    public rec: Recommendation;

    constructor(columns: SandDance.types.Column[], data: object[]) {
        let recommenderColumns = detectSequentialAll(columns, data);
        let quickRec: Recommendation = new ScatterPlotRecommenderSummary(recommenderColumns, data).recommend();
        if (quickRec) this.rec = quickRec;
        else {
            let barChartrec: Recommendation = new BarChartRecommenderSummary(recommenderColumns, data).recommend();
            if (barChartrec.score >= 1) this.rec = barChartrec;
        }
    }

    recommend() {
        return this.rec;
    }


}
