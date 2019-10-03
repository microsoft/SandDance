// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { DataNames, ScaleNames, SignalNames } from '../constants';
import { fill, opacity } from '../fill';
import { Mark } from 'vega-typings';
import { SpecContext } from '../types';
import { testForCollapseSelection } from '../selection';

export default function (context: SpecContext) {
    const { specColumns } = context;
    const categoricalColor = specColumns.color && !specColumns.color.quantitative;
    const marks: Mark[] = [
        {
            type: 'rect',
            from: {
                data: categoricalColor ? DataNames.Legend : DataNames.Main
            },
            encode: {
                update: {
                    x: {
                        scale: ScaleNames.X,
                        field: specColumns.x.name,
                        offset: 1
                    },
                    width: { signal: SignalNames.PointSize },
                    y: [
                        {
                            scale: ScaleNames.Y,
                            test: testForCollapseSelection(),
                            signal: `${SignalNames.YDomain}[0]`
                        },
                        {
                            scale: ScaleNames.Y,
                            field: specColumns.y.name,
                            offset: {
                                signal: `-${SignalNames.PointSize}`
                            }
                        }
                    ],
                    height: [
                        {
                            test: testForCollapseSelection(),
                            value: 0
                        },
                        {
                            signal: SignalNames.PointSize
                        }
                    ],
                    fill: fill(context),
                    opacity: opacity(context)
                }
            }
        }
    ];
    if (specColumns.z) {
        const update = marks[0].encode.update;
        update.z = [
            {
                test: testForCollapseSelection(),
                value: 0
            },
            {
                scale: ScaleNames.Z,
                field: specColumns.z.name
            }
        ];
        update.depth = { signal: SignalNames.PointSize };
    }
    return marks;
}
