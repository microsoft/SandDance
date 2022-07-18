/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Column } from '@msrvida/chart-types';
import { BarChartRecommenderSummary } from './barChart';
import { Recommendation } from './recommender';
import { ScatterPlotRecommenderSummary } from './scatterPlot';

export class RecommenderSummary {
    public rec: Recommendation;

    constructor(columns: Column[], data: object[]) {
        const quickRec: Recommendation = new ScatterPlotRecommenderSummary(columns, data).recommend();
        if (quickRec) {
            this.rec = quickRec;
        } else {
            const barChartrec: Recommendation = new BarChartRecommenderSummary(columns, data).recommend();
            if (barChartrec && barChartrec.score >= 1) {
                this.rec = barChartrec;
            } else {
                this.rec = {
                    chart: 'grid',
                    columns: {},
                    score: 1,
                };
            }
        }
    }

    recommend() {
        return this.rec;
    }


}
