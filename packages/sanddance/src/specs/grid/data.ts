// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { Data, Transforms } from 'vega-typings';
import { DataNames, FieldNames } from '../constants';
import { SpecContext } from '../types';
import { topLookup } from '../top';

export default function (context: SpecContext) {
    const { specColumns, specViewOptions } = context;
    const categoricalColor = specColumns.color && !specColumns.color.quantitative;
    const data = allTruthy<Data>(
        [
            {
                "name": DataNames.Main,
                "transform": allTruthy<Transforms>([
                    specColumns.sort && {
                        "type": "collect",
                        "sort": { "field": specColumns.sort.name }
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
        categoricalColor && topLookup(specColumns.color, specViewOptions.maxLegends)
    );
    return data;
}
