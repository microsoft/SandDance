// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { colorBinCountSignal, colorReverseSignal, textSignals } from '../signals';
import { facetSignals } from '../facet';
import { Insight, SpecColumns, SpecViewOptions } from '../types';
import { Signal } from 'vega-typings';
import { SignalNames } from '../constants';

export default function (insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions) {
    const signals = allTruthy<Signal>(
        textSignals(specViewOptions),
        [
            colorBinCountSignal(specViewOptions),
            colorReverseSignal(specViewOptions),
            {
                "name": SignalNames.XGridSize,
                "value": 3,
                "bind": {
                    "name": specViewOptions.language.XGridSize,
                    "input": "range",
                    "min": 1,
                    "max": 20,
                    "step": 1
                }
            },
            {
                "name": SignalNames.YGridSize,
                "value": 3,
                "bind": {
                    "name": specViewOptions.language.YGridSize,
                    "input": "range",
                    "min": 1,
                    "max": 20,
                    "step": 1
                }
            },
            columns.x.quantitative && {
                "name": SignalNames.XBins,
                "value": 30,
                "bind": {
                    "name": specViewOptions.language.XBinSize,
                    "input": "range",
                    "min": 1,
                    "max": 60,
                    "step": 1
                }
            },
            columns.y.quantitative && {
                "name": SignalNames.YBins,
                "value": 30,
                "bind": {
                    "name": specViewOptions.language.YBinSize,
                    "input": "range",
                    "min": 1,
                    "max": 60,
                    "step": 1
                }
            },
            {
                "name": SignalNames.InnerPadding,
                "value": 0.1,
                "bind": {
                    "name": specViewOptions.language.InnerPaddingSize,
                    "input": "range",
                    "min": 0.1,
                    "max": 1,
                    "step": 0.1
                }
            },
            {
                "name": SignalNames.OuterPadding,
                "value": 0.1,
                "bind": {
                    "name": specViewOptions.language.OuterPaddingSize,
                    "input": "range",
                    "min": 0.1,
                    "max": 1,
                    "step": 0.1
                }
            },
            {
                "name": "columns",
                "update": `${SignalNames.XGridSize}*${SignalNames.YGridSize}`
            },
            {
                "name": "xbandw",
                "update": `width/(${columns.x.quantitative ? SignalNames.XBins : columns.x.stats.distinctValueCount}+${SignalNames.OuterPadding})`
            },
            {
                "name": "xbandsize",
                "update": `(xbandw / (${SignalNames.XGridSize} + ${SignalNames.InnerPadding}))*(1-${SignalNames.InnerPadding})`
            },
            {
                "name": "ybandw",
                "update": `height/(${columns.y.quantitative ? SignalNames.YBins : columns.y.stats.distinctValueCount}+${SignalNames.OuterPadding})`
            },
            {
                "name": "ybandsize",
                "update": `(ybandw / (${SignalNames.YGridSize} + ${SignalNames.InnerPadding}))*(1-${SignalNames.InnerPadding})`
            },
            {
                "name": "actsize",
                "update": "min(xbandsize,ybandsize)"
            },
            {
                "name": "xbandsignal",
                "update": "bandwidth('xband')"
            },
            {
                "name": "ybandsignal",
                "update": "bandwidth('yband')"
            },
            {
                "name": "countheight",
                "update": "rowxtent[1]*actsize"
            }
        ],
        insight.columns.facet && facetSignals(insight.facets, specViewOptions)
    );
    return signals;
}
