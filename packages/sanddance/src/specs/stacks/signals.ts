// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import {
    colorBinCountSignal,
    colorReverseSignal,
    defaultZProportion,
    textSignals
} from '../signals';
import { facetSignals } from '../facet';
import { Signal } from 'vega-typings';
import { SignalNames } from '../constants';
import { SpecContext } from '../types';

export default function (context: SpecContext) {
    const { specColumns, insight, specViewOptions } = context;
    const signals = allTruthy<Signal>(
        textSignals(context),
        [
            colorBinCountSignal(context),
            colorReverseSignal(context),
            {
                name: SignalNames.XGridSize,
                value: 3,
                bind: {
                    name: specViewOptions.language.XGridSize,
                    input: 'range',
                    min: 1,
                    max: 20,
                    step: 1
                }
            },
            {
                name: SignalNames.YGridSize,
                value: 3,
                bind: {
                    name: specViewOptions.language.YGridSize,
                    input: 'range',
                    min: 1,
                    max: 20,
                    step: 1
                }
            },
            specColumns.x.quantitative && {
                name: SignalNames.XBins,
                value: 30,
                bind: {
                    name: specViewOptions.language.XBinSize,
                    input: 'range',
                    min: 1,
                    max: 60,
                    step: 1
                }
            },
            specColumns.y.quantitative && {
                name: SignalNames.YBins,
                value: 30,
                bind: {
                    name: specViewOptions.language.YBinSize,
                    input: 'range',
                    min: 1,
                    max: 60,
                    step: 1
                }
            },
            {
                name: SignalNames.InnerPadding,
                value: 0.1,
                bind: {
                    name: specViewOptions.language.InnerPaddingSize,
                    input: 'range',
                    min: 0.1,
                    max: 0.6,
                    step: 0.1
                }
            },
            {
                name: SignalNames.OuterPadding,
                value: 0.2,
                bind: {
                    name: specViewOptions.language.OuterPaddingSize,
                    input: 'range',
                    min: 0.1,
                    max: 0.6,
                    step: 0.1
                }
            },
            {
                name: 'columns',
                update: `${SignalNames.XGridSize}*${SignalNames.YGridSize}`
            },
            {
                name: 'xbandw',
                update: 'bandwidth(\'xband\')'
            },
            {
                name: 'xbandsize',
                update: `(xbandw / (${SignalNames.XGridSize} + ${SignalNames.InnerPadding}))*(1-${SignalNames.InnerPadding})`
            },
            {
                name: 'ybandw',
                update: `height/((${specColumns.y.quantitative ? SignalNames.YBins : specColumns.y.stats.distinctValueCount}) * (1 + ${SignalNames.OuterPadding}))`
            },
            {
                name: 'ybandsize',
                update: `(ybandw / (${SignalNames.YGridSize} + ${SignalNames.InnerPadding}))*(1-${SignalNames.InnerPadding})`
            },
            {
                name: 'actsize',
                update: 'min(xbandsize,ybandsize)'
            },
            {
                name: 'countheight',
                update: `rowxtent[1]*actsize*${SignalNames.ZProportion}/${defaultZProportion}`
            }
        ],
        insight.columns.facet && facetSignals(context)
    );
    return signals;
}
