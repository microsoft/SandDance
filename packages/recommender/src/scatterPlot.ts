// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as SandDance from "@msrvida/sanddance";
import { Recommender, Recommendation, defaultColorScheme } from './recommender';

export class ScatterPlotRecommenderSummary {
    public best: Recommendation;

    constructor(columns: SandDance.types.Column[], data: object[]) {
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
            if (column.name.toLowerCase() === 'longitude') {
                longi = true;
                rec.scheme = defaultColorScheme(column);
                rec.columns.x = column.name;
            }
            else if (column.name.toLowerCase() === 'latitude') {
                lati = true;
                rec.columns.y = column.name;
            }
            else if (column.quantitative || column.stats.distinctValueCount < 5) {
                rec.columns.color = column.name;
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