// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from '@msrvida/vega-deck.gl';
import { BarChartScaleNames } from '../../constants';
import { FieldNames, ScaleNames, SignalNames } from '../../constants';
import { fill, opacity } from '../../fill';
import { BarChartNameSpace } from '../../namespace';
import { RectMark } from 'vega-typings';
import { SpecContext } from '../../types';
import { testForCollapseSelection } from '../../selection';

export default function (context: SpecContext, namespace: BarChartNameSpace): RectMark[] {
    const { specColumns } = context;
    const mark: RectMark = {
        type: 'rect',
        from: {
            data: namespace.stacked
        },
        encode: {
            update: {
                y: {
                    scale: ScaleNames.Y,
                    field: specColumns.y.quantitative ? FieldNames.BarChartBin0 : specColumns.y.name,
                    offset: {
                        scale: BarChartScaleNames.compartmentScale,
                        field: namespace.__compartment
                    }
                },
                height: [
                    {
                        test: `bandwidth('${BarChartScaleNames.compartmentScale}') < 1`,
                        value: VegaDeckGl.defaults.minPixelSize
                    },
                    {
                        scale: BarChartScaleNames.compartmentScale,
                        band: 1
                    }
                ],
                x: [
                    {
                        scale: ScaleNames.X,
                        test: testForCollapseSelection(),
                        signal: `${SignalNames.XDomain}[0]`
                    },
                    {
                        scale: ScaleNames.X,
                        field: namespace.__level,
                        band: 1,
                        offset: {
                            signal: `-bandwidth('${ScaleNames.X}')-1`
                        }
                    }
                ],
                width: [
                    {
                        test: testForCollapseSelection(),
                        value: 0
                    },
                    {
                        test: `bandwidth('${ScaleNames.X}') < 1`,
                        value: VegaDeckGl.defaults.minPixelSize
                    },
                    {
                        scale: ScaleNames.X,
                        band: 1
                    }
                ],
                fill: fill(context),
                opacity: opacity(context)
            }
        }
    };
    if (specColumns.z) {
        const update = mark.encode.update;
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
    return [mark];
}
