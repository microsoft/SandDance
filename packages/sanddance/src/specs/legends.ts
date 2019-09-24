// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ScaleNames } from './constants';
import { Column, Insight, SpecColumns } from './types';
import { Legend } from 'vega-typings';

function legend(column: Column) {
    const legend: Legend = {
        "orient": "none",
        "title": column.name,
        "fill": ScaleNames.Color,
        "encode": {
            "symbols": {
                "update": {
                    "shape": {
                        "value": "square"
                    }
                }
            }
        }
    };
    if (column.quantitative) {
        legend.type = "symbol";
    }
    return legend;
}

export function getLegends(insight: Insight, columns: SpecColumns) {
    if (columns.color && !insight.hideLegend && !columns.color.isColorData) {
        return [legend(columns.color)];
    }
}
