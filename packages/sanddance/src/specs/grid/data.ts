// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { Data, Transforms } from 'vega-typings';
import { DataNames, FieldNames } from '../constants';
import { SpecColumns, SpecViewOptions } from '../types';
import { topLookup } from '../top';

export default function (columns: SpecColumns, specViewOptions: SpecViewOptions) {
    const categoricalColor = columns.color && !columns.color.quantitative;
    const data = allTruthy<Data>(
        [
            {
                "name": DataNames.Main,
                "transform": allTruthy<Transforms>([
                    columns.sort && {
                        "type": "collect",
                        "sort": { "field": columns.sort.name }
                    },
                    {
                        "type": "window",
                        "ops": [
                            "count"
                        ],
                        "as": [
                            FieldNames.GridIndex
                        ]
                    }
                ])
            }
        ],
        categoricalColor && topLookup(columns.color, specViewOptions.maxLegends)
    );
    return data;
}
