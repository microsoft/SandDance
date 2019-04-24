// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { colorBinCountSignal, textSignals } from '../signals';
import { facetSignals } from '../facet';
import { Insight, SpecViewOptions, SpecColumns } from '../types';
import { ScaleNames, PointSizeSignal, YDomainSignal, BinXSignal, BinYSignal } from '../constants';
import { Signal } from 'vega-typings';

export default function (insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions) {
    const signals = allTruthy<Signal>(
        textSignals(specViewOptions),
        [
            columns.x.quantitative && {
                "name": BinXSignal,
                "value": 20,
                "bind": {
                    "name": specViewOptions.language.barChartBinSize,
                    "input": "range",
                    "min": 1,
                    "max": 50,
                    "step": 1
                }
            },
            columns.y.quantitative && {
                "name": BinYSignal,
                "value": 20,
                "bind": {
                    "name": specViewOptions.language.barChartBinSize,
                    "input": "range",
                    "min": 1,
                    "max": 50,
                    "step": 1
                }
            },
            colorBinCountSignal(specViewOptions),
            {
                "name": "mywidth",
                "value": 3,
                "bind": {
                    "name": "TODO width",
                    "input": "range",
                    "min": 1,
                    "max": 20,
                    "step": 1
                }
            },
            {
                "name": "mydepth",
                "value": 3,
                "bind": {
                    "name": "TODO depth",
                    "input": "range",
                    "min": 1,
                    "max": 20,
                    "step": 1
                }
            },
            {
                "name": "x_padding",
                "value": 0.1,
                "bind": {
                    "name": "TODO x padding",
                    "input": "range",
                    "min": 0.1,
                    "max": 1,
                    "step": 0.1
                }
            },
            {
                "name": "x_out_padding",
                "value": 0.1,
                "bind": {
                    "name": "TODO x out padding",
                    "input": "range",
                    "min": 0.1,
                    "max": 1,
                    "step": 0.1
                }
            },
            {
                "name": "actheight",
                "update": "actsize*rowxtent[1] * (1+ x_padding)"
            },

            {
                "name": "columns",
                "update": "mywidth*mydepth"
            },
            {
                "name": "xbandw",
                "update": `width/(${BinXSignal}+x_out_padding)`
            },
            {
                "name": "xbandsize",
                "update": "(xbandw / (mywidth + x_padding))*(1-x_padding)"
            },
            {
                "name": "ybandw",
                "update": `height/(${BinYSignal}+x_out_padding)`
            },
            {
                "name": "ybandsize",
                "update": "(ybandw / (mydepth + x_padding))*(1-x_padding)"
            },
            {
                "name": "actsize",
                "update": "min(xbandsize,ybandsize)"
            }
        ],
        insight.columns.facet && facetSignals(insight.facets, specViewOptions)
    );
    return signals;
}
