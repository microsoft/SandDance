// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Column, SpecContext } from './types';
import { Legend } from 'vega-typings';
import { ScaleNames } from './constants';

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

export function getLegends(context: SpecContext) {
    const { specColumns, insight } = context;
    if (specColumns.color && !insight.hideLegend && !insight.directColor && !specColumns.color.isColorData) {
        return [legend(specColumns.color)];
    }
}
