// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as SandDance from "@msrvida/sanddance";
import { Recommender, Recommendation, Rule, defaultColorScheme, maxCategoricalColors, RecommenderColumn } from './recommender';

const maxDistinctVal = 20;
const minDistinctVal = 2;

export class BarChartRecommenderSummary {
    public best: Recommendation;

    constructor(columns: RecommenderColumn[], data: object[]) {
        let score: number = -1;
        for (let i = 0; i < columns.length; i++) {
            let recommendation = new BarChartRecommender(columns[i], data).recommend();
            if (recommendation.score > score) {
                this.best = recommendation;
                score = recommendation.score;
            };
            if (score === 1) break;
        }

        for (let k = 0; k < columns.length; k++) {
            if (columns[k].name === this.best.columns.x || columns[k].isSequential) continue;
            if (columns[k].quantitative || (columns[k].stats.distinctValueCount < maxCategoricalColors && columns[k].stats.distinctValueCount > 1)) {
                this.best.columns.color = this.best.columns.sort = columns[k].name;
                this.best.scheme = defaultColorScheme(columns[k]);
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
    public column: RecommenderColumn;
    public score: number;

    constructor(column: RecommenderColumn, data: object[]) {
        this.score = 0;
        this.column = column;
        //the total score for bar chart is 1
        this.rules = [
            (column) => {
                if (column.isSequential) return false;
                else if (column.quantitative) {
                    return true;
                } else if (!column.quantitative && column.stats.distinctValueCount <= maxDistinctVal && column.stats.distinctValueCount >= minDistinctVal) {
                    return true;
                } else {
                    return false;
                }
            }
        ];
        for (let i = 0; i < this.rules.length; i++) {
            if (this.rules[i](column)) this.score++;
        }

    }

    recommend() {
        let rec: Recommendation = {
            chart: 'barchart',
            columns: {
                x: this.column.name
            },
            score: this.score,
            scheme: undefined,
            view: "2d"
        }
        return rec;
    }

}