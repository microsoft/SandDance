/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Column } from '@msrvida/chart-types';
import {
    defaultColorScheme,
    maxCategoricalColors,
    Recommendation,
    Recommender,
    Rule,
} from './recommender';

const maxDistinctVal = 20;
const minDistinctVal = 2;

export class BarChartRecommenderSummary {
    public best: Recommendation;

    constructor(columns: Column[], data: object[]) {
        let score: number = -1;
        for (let i = 0; i < columns.length; i++) {
            const recommendation = new BarChartRecommender(columns[i], data).recommend();
            if (recommendation.score > score) {
                this.best = recommendation;
                score = recommendation.score;
            }
            if (score === 1) break;
        }

        for (let k = 0; k < columns.length; k++) {
            const column = columns[k];
            if (column.name === this.best.columns.x || column.stats.isSequential) continue;
            if (column.quantitative || (column.stats.distinctValueCount < maxCategoricalColors && column.stats.distinctValueCount > 1)) {
                this.best.columns.color = this.best.columns.sort = column.name;
                this.best.scheme = defaultColorScheme(column);
                if (column.quantitative) {
                    this.best.colorBin = 'quantile';
                }
                break;
            }
        }
    }

    recommend() {
        return this.best;
    }

}

export class BarChartRecommender implements Recommender {
    public rules: Rule[];
    public column: Column;
    public score: number;

    constructor(column: Column, data: object[]) {
        this.score = 0;
        this.column = column;
        //the total score for bar chart is 1
        this.rules = [
            (column) => {
                if (column.stats.isSequential) return false;
                else if (column.quantitative) {
                    return true;
                } else if (!column.quantitative && column.stats.distinctValueCount <= maxDistinctVal && column.stats.distinctValueCount >= minDistinctVal) {
                    return true;
                } else {
                    return false;
                }
            },
        ];
        for (let i = 0; i < this.rules.length; i++) {
            if (this.rules[i](column)) this.score++;
        }

    }

    recommend() {
        const rec: Recommendation = {
            chart: 'barchart',
            columns: {
                x: this.column.name,
            },
            score: this.score,
            scheme: undefined,
            view: '2d',
        };
        return rec;
    }

}