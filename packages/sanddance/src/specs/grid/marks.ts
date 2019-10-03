// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ColumnCount } from './constants';
import { FieldNames, ScaleNames } from '../constants';
import { fill, opacity } from '../fill';
import { Mark } from 'vega-typings';
import { SpecContext } from '../types';
import { testForCollapseSelection } from '../selection';

export default function (context: SpecContext, data: string) {
    const { specColumns } = context;
    const marks: Mark[] = [
        {
            type: 'rect',
            from: {
                data
            },
            encode: {
                update: {
                    x: {
                        signal: `(datum.${FieldNames.GridIndex}-1)%${ColumnCount}`,
                        scale: ScaleNames.X
                    },
                    width: {
                        scale: ScaleNames.X,
                        band: true
                    },
                    y: {
                        signal: `floor((datum.${FieldNames.GridIndex}-1)/${ColumnCount})`,
                        scale: ScaleNames.Y
                    },
                    height: {
                        scale: ScaleNames.Y,
                        band: true
                    },
                    fill: fill(context),
                    opacity: opacity(context)
                }
            }
        }
    ];
    if (specColumns.z) {
        const update = marks[0].encode.update;
        update.z = {
            value: 0
        };
        update.depth = [
            {
                test: testForCollapseSelection(),
                value: 0
            },
            {
                scale: ScaleNames.Z,
                field: specColumns.z.name
            }
        ];
    }
    return marks;
}
