// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addData, addMarks } from './scope';
import { AxesScopeMap } from './globalScales';
import { Column, FacetStyle, SpecViewOptions } from './types';
import { Cross, CrossProps } from './layouts/cross';
import {
    Data,
    GroupMark,
    Scale,
    Scope,
    Signal
} from 'vega-typings';
import { DiscreteColumn, InnerScope, SizeSignals } from './interfaces';
import { facetPaddingBottom, facetPaddingLeft, facetPaddingTop } from './defaults';
import { FieldNames, SignalNames } from './constants';
import { LayoutPair } from './layouts/layout';
import { Slice, SliceProps } from './layouts/slice';
import { util } from '@msrvida/vega-deck.gl';
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

export function addFacetTitles(scope: Scope, sizeSignals: SizeSignals, specViewOptions: SpecViewOptions, column: Column) {
    const field = `parent[${JSON.stringify(FieldNames.FacetRange)}]`;
    addMarks(scope, {
        type: 'text',
        encode: {
            enter: {
                align: {
                    value: 'center'
                },
                baseline: {
                    value: 'bottom'
                },
                limit: {
                    signal: sizeSignals.layoutWidth
                },
                color: util.colorToString(specViewOptions.colors.axisText) as any,
                fontSize: {
                    signal: SignalNames.TextSize
                },
                y: {
                    value: -facetPaddingTop / 2
                }
            },
            update: {
                x: {
                    signal: `(${sizeSignals.layoutWidth}) / 2`
                },
                text: {
                    signal: column.quantitative ?
                        `format(${field}[0], '~r') + ' - ' + format(${field}[1], '~r')`
                        :
                        `${field}[0]`
                }
            }
        }
    });
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
                    signal: `datum.data * (${sizeSignals.layoutWidth} + ${facetPaddingLeft}) + ${facetPaddingLeft} + ${SignalNames.PlotOffsetLeft}`
                },
                y: {
                    signal: `${SignalNames.PlotOffsetTop} + ${SignalNames.PlotHeightOut}`
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
                    signal: SignalNames.PlotOffsetLeft
                },
                y: {
                    signal: `${SignalNames.PlotOffsetTop} + ${facetPaddingTop} + datum.data * (${sizeSignals.layoutHeight} + ${facetPaddingTop} + ${facetPaddingBottom})`
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
