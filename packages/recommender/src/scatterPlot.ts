// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    defaultColorScheme,
    maxCategoricalColors,
    Recommendation,
    RecommenderColumn
} from './recommender';

export class ScatterPlotRecommenderSummary {
    public best: Recommendation;

    constructor(columns: RecommenderColumn[], data: object[]) {
        let longi = false;
        let lati = false;
        let rec: Recommendation = {
            chart: 'scatterplot',
            score: undefined,
            columns: {},
            scheme: undefined,
            view: "2d"
        }
        columns.forEach(column => {
            if (longi === false && column.name.toLowerCase() === 'longitude') {
                longi = true;
                rec.columns.x = column.name;
            }
            else if (lati === false && column.name.toLowerCase() === 'latitude') {
                lati = true;
                rec.columns.y = column.name;
            }
            else if (!rec.columns.color && !column.isSequential) {
                if (column.quantitative || column.stats.distinctValueCount < maxCategoricalColors) {
                    rec.columns.color = rec.columns.sort = column.name;
                    rec.scheme = defaultColorScheme(column);
                    if (column.quantitative) {
                        rec.colorBin = 'quantile';
                    }
                }
            }
        });
        if (longi && lati) {
            this.best = rec;
        }
    }

    recommend() {
        return this.best;
    }
}