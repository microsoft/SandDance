// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addData, addMarks } from './scope';
import { AxesScopeMap } from './globalScales';
import { Cross, CrossProps } from './layouts/cross';
import { DiscreteColumn, InnerScope } from './interfaces';
import { facetPadding } from './defaults';
import { FacetStyle } from './types';
import {
    GroupMark,
    Scale,
    Scope,
    Signal,
    Data
} from 'vega-typings';
import { LayoutPair } from './layouts/layout';
import { SignalNames } from './constants';
import { Slice, SliceProps } from './layouts/slice';
import { Wrap, WrapProps } from './layouts/wrap';

export function getFacetLayout(facetStyle: FacetStyle, facetColumn: DiscreteColumn, facetVColumn: DiscreteColumn) {
    let layoutPair: LayoutPair;
    const scales: Scale[] = [];
    const signals: Signal[] = [];
    const groupby = facetColumn;
    switch (facetStyle) {
        case 'horizontal': {
            const props: SliceProps = {
                orientation: 'horizontal',
                groupby
            };
            layoutPair = {
                layoutClass: Slice,
                props
            };
            break;
        }
        case 'vertical': {
            const props: SliceProps = {
                orientation: 'vertical',
                groupby
            };
            layoutPair = {
                layoutClass: Slice,
                props
            };
            break;
        }
        case 'cross': {
            const props: CrossProps = {
                groupbyX: groupby,
                groupbyY: facetVColumn
            };
            layoutPair = {
                layoutClass: Cross,
                props
            };
            break;
        }
        case 'wrap':
        default:
            const props: WrapProps = {
                groupby
            };
            layoutPair = {
                layoutClass: Wrap,
                props
            };
            break;
    }
    return { layoutPair, scales, signals };
}

export function addFacetAxesMarks(globalScope: Scope, facetScope: InnerScope) {
    const { scope, sizeSignals } = facetScope;
    const colSeqName = 'TODOCOLS';
    const rowSeqName = 'TODOROWS';

    //create data sequences based on rows / cols
    addData(globalScope, createSequence(colSeqName, sizeSignals.colCount));
    addData(globalScope, createSequence(rowSeqName, sizeSignals.rowCount));

    //create group marks based on data sequences
    const colFooter: GroupMark = {
        type: 'group',
        from: { data: colSeqName },
        encode: {
            update: {
                x: {
                    signal: `datum.data * (${sizeSignals.layoutWidth} + ${facetPadding}) + ${facetPadding} + ${SignalNames.PlotOffsetX}`
                },
                y: {
                    signal: SignalNames.PlotHeightOut
                },
                width: {
                    signal: `${sizeSignals.layoutWidth}`
                }
            }
        }
    };
    addMarks(globalScope, colFooter);

    const rowHeader: GroupMark = {
        type: 'group',
        from: { data: rowSeqName },
        encode: {
            update: {
                x: {
                    signal: SignalNames.PlotOffsetX
                },
                y: {
                    signal: `datum.data * (${sizeSignals.layoutHeight} + ${facetPadding})`
                },
                height: {
                    signal: `${sizeSignals.layoutHeight}`
                }
            }
        }
    };
    addMarks(globalScope, rowHeader);

    const map: AxesScopeMap = {
        main: {
            scope,
            labels: false
        },
        x: {
            scope: colFooter,
            labels: true
        },
        y: {
            scope: rowHeader,
            labels: true
        }
    };
    return map;
}

function createSequence(dataName: string, countSignal: string): Data {
    return {
        name: dataName,
        transform: [
            {
                type: 'sequence',
                start: 0,
                stop: {
                    signal: countSignal
                }
            }
        ]
    };
}
