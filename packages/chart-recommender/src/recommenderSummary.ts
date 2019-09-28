// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as SandDance from '@msrvida/sanddance';
import { BarChartRecommenderSummary } from './barChart';
import { Recommendation } from './recommender';
import { ScatterPlotRecommenderSummary } from './scatterPlot';

export class RecommenderSummary {
    public rec: Recommendation;

    constructor(columns: SandDance.types.Column[], data: object[]) {
        let quickRec: Recommendation = new ScatterPlotRecommenderSummary(columns, data).recommend();
        if (quickRec) {
            this.rec = quickRec;
        } else {
            let barChartrec: Recommendation = new BarChartRecommenderSummary(columns, data).recommend();
            if (barChartrec.score >= 1) {
                this.rec = barChartrec;
            } else {
                this.rec = {
                    chart: 'grid',
                    columns: {},
                    score: 1
                };
            }
        }
    }

    recommend() {
        return this.rec;
    }


}
