// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from '../../vega-deck.gl';
import { BarChartScaleNames } from './constants';
import { FieldNames, ScaleNames, SignalNames } from '../constants';
import { fill } from '../fill';
import { NameSpace } from './namespace';
import { RectMark } from 'vega-typings';
import { SpecContext } from '../types';
import { testForCollapseSelection } from '../selection';

export default function (context: SpecContext, namespace: NameSpace): RectMark[] {
    const { specColumns } = context;
    const mark: RectMark = {
        "type": "rect",
        "from": {
            "data": namespace.stacked
        },
        "encode": {
            "update": {
                "x": {
                    "scale": ScaleNames.X,
                    "field": specColumns.x.quantitative ? FieldNames.BarChartBin0 : specColumns.x.name,
                    "offset": {
                        "scale": BarChartScaleNames.compartmentScale,
                        "field": namespace.__compartment
                    }
                },
                "width": [
                    {
                        "test": `bandwidth('${BarChartScaleNames.compartmentScale}') < 1`,
                        "value": VegaDeckGl.defaults.minPixelSize
                    },
                    {
                        "scale": BarChartScaleNames.compartmentScale,
                        "band": 1
                    }
                ],
                "y": [
                    {
                        "scale": ScaleNames.Y,
                        "test": testForCollapseSelection(),
                        "signal": `${SignalNames.YDomain}[0]`
                    },
                    {
                        "scale": ScaleNames.Y,
                        "field": namespace.__level,
                        "band": 1,
                        "offset": {
                            "signal": `-bandwidth('${ScaleNames.Y}')-1`
                        }
                    }
                ],
                "height": [
                    {
                        "test": testForCollapseSelection(),
                        "value": 0
                    },
                    {
                        "test": `bandwidth('${ScaleNames.Y}') < 1`,
                        "value": VegaDeckGl.defaults.minPixelSize
                    },
                    {
                        "scale": ScaleNames.Y,
                        "band": 1
                    }
                ],
                "fill": fill(context)
            }
        }
    };
    if (specColumns.z) {
        const update = mark.encode.update;
        update.z = {
            "value": 0
        };
        update.depth = [
            {
                "test": testForCollapseSelection(),
                "value": 0
            },
            {
                "scale": ScaleNames.Z,
                "field": specColumns.z.name
            }
        ];
    }
    return [mark];
}
