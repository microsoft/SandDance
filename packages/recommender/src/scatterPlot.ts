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
            if (longi === false && column.name.toLowerCase() === 'longitude') {
                longi = true;
                rec.columns.x = column.name;
            }
            else if (lati === false && column.name.toLowerCase() === 'latitude') {
                lati = true;
                rec.columns.y = column.name;
            }
            else if (!rec.columns.color) {
                if(column.quantitative || column.stats.distinctValueCount < 20) {
                    rec.columns.color = column.name;
                    rec.scheme = defaultColorScheme(column);
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