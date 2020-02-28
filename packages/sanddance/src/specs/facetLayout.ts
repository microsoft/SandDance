// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addData, addMarks, addScale } from './scope';
import { AxesScopeMap } from './globalScales';
import { Column, FacetStyle, SpecViewOptions } from './types';
import { Cross, CrossProps } from './layouts/cross';
import {
    Data,
    GroupMark,
    LinearScale,
    Scale,
    Scope,
    Signal
} from 'vega-typings';
import {
    DataNames,
    FieldNames,
    ScaleNames,
    SignalNames
} from './constants';
import { DiscreteColumn, InnerScope, SizeSignals } from './interfaces';
import { facetPaddingBottom, facetPaddingLeft, facetPaddingTop } from './defaults';
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
                fill: {
                    value: util.colorToString(specViewOptions.colors.axisText)
                },
                limit: {
                    signal: sizeSignals.layoutWidth
                },
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

export function addFacetAxesGroupMarks(globalScope: Scope, plotScope: Scope, facetScope: InnerScope, plotHeightOut: string, plotWidthOut: string) {
    const { scope, sizeSignals } = facetScope;
    const colSeqName = DataNames.FacetCellColTitles;
    const rowSeqName = DataNames.FacetCellRowTitles;

    //create data sequences based on rows / cols
    addData(globalScope, createSequence(colSeqName, sizeSignals.colCount));
    addData(globalScope, createSequence(rowSeqName, sizeSignals.rowCount));

    //create group marks based on data sequences
    const cellsColFooter: GroupMark = {
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

    const cellsRowHeader: GroupMark = {
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

    addMarks(globalScope, cellsColFooter, cellsRowHeader);

    const colTitleScale: LinearScale = {
        type: 'linear',
        name: ScaleNames.ColTitle,
        domain: [0, 1],
        range: [0, { signal: plotWidthOut }]
    };

    const rowTitleScale: LinearScale = {
        type: 'linear',
        name: ScaleNames.RowTitle,
        domain: [0, 1],
        range: [{ signal: plotHeightOut }, 0]
    };

    addScale(globalScope, colTitleScale, rowTitleScale);

    const map: AxesScopeMap = {
        main: [
            {
                scope,
                lines: true,
                labels: false,
                title: false
            }
        ],
        x: [
            {
                scope: cellsColFooter,
                lines: true,
                labels: true,
                title: false
            },
            {
                scope: plotScope,
                scale: colTitleScale.name,
                lines: false,
                labels: false,
                title: true
            }
        ],
        y: [
            {
                scope: cellsRowHeader,
                lines: true,
                labels: true,
                title: false
            },
            {
                scope: plotScope,
                scale: rowTitleScale.name,
                lines: false,
                labels: false,
                title: true
            }
        ]
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
