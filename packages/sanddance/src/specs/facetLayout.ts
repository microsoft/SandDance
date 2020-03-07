// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addData, addMarks, addScale } from './scope';
import { AxesScopeMap } from './axes';
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
import { DiscreteColumn, InnerScope, SizeSignals, TitleSource } from './interfaces';
import { facetPaddingBottom, facetPaddingLeft, facetPaddingTop, facetPaddingRight } from './defaults';
import { FieldNames, SignalNames } from './constants';
import { LayoutPair } from './layouts/layout';
import { Slice, SliceProps } from './layouts/slice';
import { util } from '@msrvida/vega-deck.gl';
import { Wrap, WrapProps } from './layouts/wrap';

export interface FacetLayout {
    cellTitles: boolean;
    colRowTitles: boolean;
    layoutPair: LayoutPair;
    plotPadding: { x: number, y: number };
    scales: Scale[];
    signals: Signal[];
};

export function getFacetLayout(facetStyle: FacetStyle, facetColumn: DiscreteColumn, facetVColumn: DiscreteColumn): FacetLayout {
    let layoutPair: LayoutPair;
    const scales: Scale[] = [];
    let signals: Signal[];
    let cellTitles: boolean;
    let colRowTitles: boolean;
    const groupby = facetColumn;
    const plotPadding = {
        x: 0,
        y: 0
    };
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
            signals = [
                {
                    name: SignalNames.FacetPaddingBottom,
                    update: `${facetPaddingBottom}`
                },
                {
                    name: SignalNames.FacetPaddingLeft,
                    update: `${facetPaddingLeft}`
                },
                {
                    name: SignalNames.FacetPaddingTop,
                    update: `0`
                }
            ];
            colRowTitles = true;
            plotPadding.y = facetPaddingTop;
            plotPadding.x = facetPaddingRight;
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
            signals = [
                {
                    name: SignalNames.FacetPaddingBottom,
                    update: `${facetPaddingBottom}`
                },
                {
                    name: SignalNames.FacetPaddingLeft,
                    update: `${facetPaddingLeft}`
                },
                {
                    name: SignalNames.FacetPaddingTop,
                    update: `${facetPaddingTop}`
                }
            ];
            cellTitles = true;
            break;
    }
    return { cellTitles, colRowTitles, layoutPair, plotPadding, scales, signals };
}

export function addFacetColRowTitles(globalScope: Scope, colTitleSource: TitleSource, rowTitleSource: TitleSource, sizeSignals: SizeSignals) {
    const field = `parent[${JSON.stringify(FieldNames.FacetRange)}]`;
    const index = `datum[${JSON.stringify(FieldNames.Ordinal)}] - 1`;
    const col = facetColumnHeaderFooter(colTitleSource.dataName, sizeSignals, index);
    const row = facetRowHeaderFooter(rowTitleSource.dataName, sizeSignals, index);
    addMarks(globalScope, col.header, row.footer);
    addMarks(col.header,
        {
            type: 'text',
            encode: {
                update: {
                    x: {
                        signal: `${sizeSignals.layoutWidth} / 2`
                    },
                    limit: {
                        signal: sizeSignals.layoutWidth
                    },
                    fontSize: {
                        signal: SignalNames.TextSize
                    },
                    text: {
                        signal: colTitleSource.quantitative ?
                            `format(${field}[0], '~r') + ' - ' + format(${field}[1], '~r')`
                            :
                            `${field}[0]`
                    },
                    baseline: {
                        value: 'middle'
                    },
                    align: {
                        value: 'center'
                    }
                }
            }
        }
    );
    addMarks(row.footer,
        {
            type: 'text',
            encode: {
                update: {
                    y: {
                        signal: `${sizeSignals.layoutHeight} / 2`
                    },
                    limit: {
                        signal: SignalNames.PlotOffsetRight
                    },
                    fontSize: {
                        signal: SignalNames.TextSize
                    },
                    text: {
                        signal: rowTitleSource.quantitative ?
                            `format(${field}[0], '~r') + ' - ' + format(${field}[1], '~r')`
                            :
                            `${field}[0]`
                    },
                    baseline: {
                        value: 'middle'
                    },
                    align: {
                        value: 'left'
                    }
                }
            }
        }
    );
}

export function addFacetCellTitles(scope: Scope, sizeSignals: SizeSignals, specViewOptions: SpecViewOptions, column: Column) {
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
                y: {
                    signal: `-${SignalNames.FacetPaddingTop} / 2`
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
                },
                fontSize: {
                    signal: SignalNames.TextSize
                }
            }
        }
    });
}

interface Props {
    globalScope: Scope;
    plotScope: Scope;
    facetScope: InnerScope;
    plotHeightOut: string;
    plotWidthOut: string;
    colTitleScaleName: string;
    rowTitleScaleName: string;
    colSeqName: string;
    rowSeqName: string;
}

export function addFacetAxesGroupMarks(props: Props) {
    const { colSeqName, colTitleScaleName, globalScope, facetScope, plotHeightOut, plotScope, plotWidthOut, rowSeqName, rowTitleScaleName } = props;
    const { scope, sizeSignals } = facetScope;

    const colSequence = createSequence(colSeqName, sizeSignals.colCount);
    const rowSequence = createSequence(rowSeqName, sizeSignals.rowCount);

    const index = 'datum.data';
    const col = facetColumnHeaderFooter(colSeqName, sizeSignals, index);
    const row = facetRowHeaderFooter(rowSeqName, sizeSignals, index);

    addData(globalScope, colSequence, rowSequence);
    addMarks(globalScope, col.footer, row.header);

    const colTitleScale: LinearScale = {
        type: 'linear',
        name: colTitleScaleName,
        domain: [0, 1],
        range: [0, { signal: plotWidthOut }]
    };

    const rowTitleScale: LinearScale = {
        type: 'linear',
        name: rowTitleScaleName,
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
                scope: col.footer,
                lines: true,
                labels: true,
                title: false
            },
            {
                scope: plotScope,
                scale: colTitleScaleName,
                lines: false,
                labels: false,
                title: true
            }
        ],
        y: [
            {
                scope: row.header,
                lines: true,
                labels: true,
                title: false
            },
            {
                scope: plotScope,
                scale: rowTitleScaleName,
                lines: false,
                labels: false,
                title: true
            }
        ]
    };
    return map;
}

export function facetRowHeaderFooter(data: string, sizeSignals: SizeSignals, index: string) {
    const rowFn = (xSignal: string) => {
        return <GroupMark>{
            type: 'group',
            from: { data },
            encode: {
                update: {
                    x: { signal: xSignal },
                    y: {
                        signal: `${SignalNames.PlotOffsetTop} + ${SignalNames.FacetPaddingTop} + (${index}) * (${sizeSignals.layoutHeight} + ${SignalNames.FacetPaddingTop} + ${SignalNames.FacetPaddingBottom})`
                    },
                    height: { signal: sizeSignals.layoutHeight }
                }
            }
        };
    };
    const header = rowFn(SignalNames.PlotOffsetLeft);
    const footer = rowFn(`${SignalNames.PlotOffsetLeft} + ${SignalNames.PlotWidthOut} + ${SignalNames.PlotOffsetRight} / 2`);
    return { header, footer };
}

export function facetColumnHeaderFooter(data: string, sizeSignals: SizeSignals, index: string) {
    const colFn = (ySignal: string) => {
        return <GroupMark>{
            type: 'group',
            from: { data },
            encode: {
                update: {
                    x: {
                        signal: `(${index}) * (${sizeSignals.layoutWidth} + ${SignalNames.FacetPaddingLeft}) + ${SignalNames.FacetPaddingLeft} + ${SignalNames.PlotOffsetLeft}`
                    },
                    y: { signal: ySignal },
                    width: { signal: sizeSignals.layoutWidth }
                }
            }
        };
    };
    //create group marks based on data sequences
    const header = colFn(`${SignalNames.PlotOffsetTop} / 2`);
    const footer = colFn(`${SignalNames.PlotOffsetTop} + ${SignalNames.PlotHeightOut}`);
    return { header, footer };
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
