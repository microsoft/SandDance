// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as SandDance from '@msrvida/sanddance';
import { defaultColorScheme, maxCategoricalColors, Recommendation } from './recommender';
import { isLatitude, isLongitude } from './geo';

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
            view: '2d'
        };
        columns.forEach(column => {
            if (longi === false && isLongitude(column)) {
                longi = true;
                rec.columns.x = column.name;
            }
            else if (lati === false && isLatitude(column)) {
                lati = true;
                rec.columns.y = column.name;
            }
            else if (!rec.columns.color && !column.stats.isSequential) {
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