// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addData, addMarks, addScales } from './scope';
import { AxesScopeMap } from './axes';
import {
    Data,
    GroupMark,
    LinearScale,
    Scope
} from 'vega-typings';
import { FieldNames, SignalNames } from './constants';
import { InnerScope, SizeSignals, TitleSource } from './interfaces';

export function addFacetColRowTitles(globalScope: Scope, colTitleSource: TitleSource, rowTitleSource: TitleSource, sizeSignals: SizeSignals, axisTextColor: string) {
    const titleSignal = `parent[${JSON.stringify(FieldNames.FacetTitle)}]`;
    const index = `datum[${JSON.stringify(FieldNames.Ordinal)}] - 1`;
    const col = facetColumnHeaderFooter(colTitleSource.dataName, sizeSignals, index);
    const row = facetRowHeaderFooter(rowTitleSource.dataName, sizeSignals, index);
    addMarks(globalScope, col.header, row.footer);
    addMarks(col.header,
        {
            type: 'text',
            encode: {
                enter: {
                    align: {
                        value: 'center'
                    },
                    baseline: {
                        value: 'middle'
                    },
                    fill: {
                        value: axisTextColor
                    }
                },
                update: {
                    metaData: {
                        signal: `{search: parent[${JSON.stringify(FieldNames.FacetSearch)}]}`
                    },
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
                        signal: titleSignal
                    }
                }
            }
        }
    );
    addMarks(row.footer,
        {
            type: 'text',
            encode: {
                enter: {
                    align: {
                        value: 'left'
                    },
                    baseline: {
                        value: 'middle'
                    },
                    fill: {
                        value: axisTextColor
                    }
                },
                update: {
                    metaData: {
                        signal: `{search: parent[${JSON.stringify(FieldNames.FacetSearch)}]}`
                    },
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
                        signal: titleSignal
                    }
                }
            }
        }
    );
}

export function addFacetCellTitles(scope: Scope, sizeSignals: SizeSignals, axisTextColor: string) {
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
                    value: axisTextColor
                }
            },
            update: {
                metaData: {
                    signal: `{search: parent[${JSON.stringify(FieldNames.FacetSearch)}]}`
                },
                x: {
                    signal: `(${sizeSignals.layoutWidth}) / 2`
                },
                text: {
                    signal: `parent[${JSON.stringify(FieldNames.FacetTitle)}]`
                },
                fontSize: {
                    signal: SignalNames.TextSize
                },
                limit: {
                    signal: sizeSignals.layoutWidth
                },
                y: {
                    signal: `-${SignalNames.FacetPaddingTop} / 2`
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
    const { sizeSignals } = facetScope;

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

    addScales(globalScope, colTitleScale, rowTitleScale);

    const map: AxesScopeMap = {
        main: [
            {
                scope: facetScope.facetScope,
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
