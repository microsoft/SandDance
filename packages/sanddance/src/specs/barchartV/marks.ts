// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from '../../vega-deck.gl';
import { FieldNames, ScaleNames, SignalNames } from '../constants';
import { fill } from '../fill';
import { NameSpace } from './namespace';
import { RectMark } from 'vega-typings';
import { SpecColumns, SpecViewOptions } from '../types';
import { testForCollapseSelection } from '../selection';

export default function (namespace: NameSpace, columns: SpecColumns, specViewOptions: SpecViewOptions): RectMark[] {
    const mark: RectMark = {
        "type": "rect",
        "from": {
            "data": namespace.stacked
        },
        "encode": {
            "update": {
                "x": {
                    "scale": ScaleNames.X,
                    "field": columns.x.quantitative ? FieldNames.BarChartBin0 : columns.x.name,
                    "offset": {
                        "scale": "xnewinternalscale",
                        "field": namespace.__column
                    }
                },
                "width": [
                    {
                        "test": `bandwidth('xnewinternalscale') < 1`,
                        "value": VegaDeckGl.defaults.minPixelSize
                    },
                    {
                        "scale": "xnewinternalscale",
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
                        "field": namespace.__row,
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
                "fill": fill(columns.color, specViewOptions)
            }
        }
    };
    if (columns.z) {
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
                "field": columns.z.name
            }
        ];
    }
    return [mark];
}
