/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Column } from '@msrvida/chart-types';
import { defaultColorScheme, maxCategoricalColors, Recommendation } from './recommender.js';
import { isLatitude, isLongitude } from './geo.js';

export class ScatterPlotRecommenderSummary {
    public best: Recommendation;

    constructor(columns: Column[], data: object[]) {
        const rec: Recommendation = {
            chart: 'scatterplot',
            score: undefined,
            columns: {},
            scheme: undefined,
            view: '2d',
        };
        columns.forEach(column => {
            if (!rec.columns.x) {
                if (column.name.toLowerCase() === 'x') {
                    return rec.columns.x = column.name;
                } else if (isLongitude(column)) {
                    return rec.columns.x = column.name;
                }
            }
            if (!rec.columns.y) {
                if (column.name.toLowerCase() === 'y') {
                    return rec.columns.y = column.name;
                } else if (isLatitude(column)) {
                    return rec.columns.y = column.name;
                }
            }
            if (!rec.columns.color && !column.stats.isSequential) {
                if (column.quantitative || column.stats.distinctValueCount < maxCategoricalColors) {
                    rec.columns.color = rec.columns.sort = column.name;
                    rec.scheme = defaultColorScheme(column);
                    if (column.quantitative) {
                        rec.colorBin = 'quantile';
                    }
                    return;
                }
            }
        });
        if (rec.columns.x && rec.columns.y) {
            this.best = rec;
        }
    }

    recommend() {
        return this.best;
    }
}