// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ScaleNames } from './constants';
import { Column } from './types';
import { Legend } from 'vega-typings';

export function legend(column: Column) {
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
