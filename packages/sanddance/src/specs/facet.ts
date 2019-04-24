// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    Axis,
    Data,
    LayoutParams,
    Mark,
    Signal,
    Transforms
} from 'vega-typings';
import {
    FieldNames,
    DataNameEmptyBin,
    DataNameFacetCellTitles,
    FacetColumnsSignal,
    DataNameFacetGroupCell,
    FacetRowsSignal,
    DataNamePre,
    TextSizeSignal
} from './constants';
import {
    Column,
    Facets,
    Size,
    SpecViewOptions
} from './types';
import { util } from '../vega-deck.gl';

const FacetColumnsSequence = "FacetColumnsSequence";
const FacetRowsSequence = "FacetRowsSequence";
const SequenceNumber = "SequenceNumber";
const CellTitle = "CellTitle";
const CellFiller = "CellFiller";

export const facetTitleSeparator = ' - ';

export function facetSignals(facets: Facets, specViewOptions: SpecViewOptions) {
    const signals: Signal[] = [
        {
            "name": FacetColumnsSignal,
            "value": facets.columns,
            // "bind": {
            //     "name": viewerOptions.language.facetColumns,
            //     "debounce": 50,
            //     "input": "range",
            //     "min": 1,
            //     "max": 10,
            //     "step": 1
            // }
        },
        {
            "name": FacetRowsSignal,
            "value": facets.rows,
            // "bind": {
            //     "name": viewerOptions.language.facetRows,
            //     "debounce": 50,
            //     "input": "range",
            //     "min": 1,
            //     "max": 10,
            //     "step": 1
            // }
        }
    ];
    return signals;
}

export function checkForFacetErrors(facets: Facets, errors: string[]) {
    if (facets) {
        const gridCapacity = facets.columns * facets.rows;
        if (!gridCapacity) {
            errors.push('Must set facets columns & rows to non-zero.');
        }
        if (gridCapacity < 2) {
            errors.push('Not enough facets to facet.');
        }
        if (!facets.columns || facets.columns < 1) {
            errors.push('Facet column columns must be greater than 1.')
        }
        if (!facets.rows || facets.rows < 1) {
            errors.push('Facet column rows must be greater than 1.')
        }
    }
}

export function facetSize(facets: Facets, size: Size, specViewOptions: SpecViewOptions): Size {
    return {
        height: (size.height - (facets.rows + 1) * (specViewOptions.tickSize + specViewOptions.facetMargins.column)) / facets.columns,
        width: (size.width - (facets.columns + 1) * (specViewOptions.tickSize + specViewOptions.facetMargins.row)) / facets.rows,
    };
}

export function layout(specViewOptions: SpecViewOptions): LayoutParams {
    const layout: LayoutParams = {
        "columns": {
            "signal": FacetColumnsSignal
        },
        "bounds": "full",
        "padding": {
            "column": specViewOptions.facetMargins.column,
            "row": specViewOptions.facetMargins.row
        }
    };
    return layout;
}

export function facetBinStep(facetColumn: Column, facetCount: number) {
    const range = facetColumn.stats.max - facetColumn.stats.min;
    return range / facetCount;
}

function emptyBinsDataSource(name: string, facetColumn: Column, facets: Facets) {
    const gridCapacity = facets.columns * facets.rows;
    const step = facetBinStep(facetColumn, gridCapacity);
    const steps: number[] = [];
    for (let i = 0; i < gridCapacity; i++) {
        steps[i] = facetColumn.stats.min + i * step + step / 2;
    }
    const values = steps.map(s => {
        const obj = {};
        obj[FieldNames.Collapsed] = true;
        obj[facetColumn.name] = s;
        return obj;
    });
    const data: Data = { name, values };
    return data;
}

export function facetSourceData(facetColumn: Column, facets: Facets, name: string) {
    let data: Data[]
    if (facetColumn && facetColumn.quantitative) {
        data = [
            {
                "name": DataNamePre
            },
            emptyBinsDataSource(DataNameEmptyBin, facetColumn, facets),
            {
                name,
                "source": [DataNamePre, DataNameEmptyBin]
            }
        ];
    } else {
        data = [{ name }];
    }
    return data;
}

export function facetGroupData(source: string) {
    const data: Data[] = [
        {
            "name": DataNameFacetCellTitles,
            source,
            "transform": [
                {
                    "type": "aggregate",
                    "groupby": [CellTitle]
                }
            ]
        },
        {
            "name": CellFiller,
            "transform": [
                {
                    "type": "sequence",
                    "start": 0,
                    "step": 1,
                    "stop": { "signal": `${FacetColumnsSignal} * ${FacetRowsSignal} - length(data('${DataNameFacetCellTitles}'))` }
                }
            ]
        },
        {
            "name": FacetColumnsSequence,
            "transform": [
                {
                    "type": "sequence",
                    "start": 0,
                    "stop": {
                        "signal": FacetColumnsSignal
                    },
                    "as": SequenceNumber
                }
            ]
        },
        {
            "name": FacetRowsSequence,
            "transform": [
                {
                    "type": "sequence",
                    "start": 0,
                    "stop": {
                        "signal": FacetRowsSignal
                    },
                    "as": SequenceNumber
                }
            ]
        }
    ];
    return data;
}

export function facetTransforms(facetColumn: Column, facets: Facets) {
    let transforms: Transforms[];
    if (facetColumn.quantitative) {
        const gridCapacity = facets.columns * facets.rows;
        const step = facetBinStep(facetColumn, gridCapacity);
        transforms = [
            {
                "type": "bin",
                "field": facetColumn.name,
                step,
                nice: false,
                "extent": [facetColumn.stats.min, facetColumn.stats.max],
                "as": ["facetBin0", "facetBin1"]
            },
            {
                "type": "collect",
                "sort": {
                    "field": "facetBin0"
                }
            },
            {
                "type": "formula",
                "expr": `format(datum.facetBin0, '~r') + '${facetTitleSeparator}' + format(datum.facetBin1, '~r')`,
                "as": CellTitle
            }
        ];
    } else {
        transforms = [
            {
                "type": "formula",
                "expr": `datum[${JSON.stringify(facetColumn.name)}]`,
                "as": CellTitle
            }
        ];
    }
    return transforms;
}

export function facetMarks(specViewOptions: SpecViewOptions, sourceDataName: string, childMarks: Mark[], childAxes: Axis[], childData?: Data[]) {
    //TODO: create a style
    const cellFillerLineColor = util.colorToString(specViewOptions.colors.cellFillerLine);
    const style = "cell";

    const mark: Mark = {
        style,
        "type": "group",
        "from": {
            "facet": {
                "name": DataNameFacetGroupCell,
                "data": sourceDataName,
                "groupby": [CellTitle]
            }
        },
        "title": {
            "frame": "group",
            "offset": specViewOptions.facetMargins.title,
            "text": {
                "signal": `parent['${CellTitle}']`
            },
            "limit": {
                "signal": "width"
            },
            "color": util.colorToString(specViewOptions.colors.axisText),
            "fontSize": {
                "signal": TextSizeSignal
            }
        },
        "encode": {
            "update": {
                "width": {
                    "signal": "width"
                },
                "height": {
                    "signal": "height"
                }
            }
        },
        "data": childData,
        "marks": childMarks.map(mark => {
            if (mark.from && mark.from.data && mark.from.data === sourceDataName) {
                mark.from.data = DataNameFacetGroupCell;
            }
            return mark;
        })
    };
    if (childAxes) {
        mark.axes = childAxes.map(axis => {
            const clone = util.clone(axis);
            //remove all labels and titles
            clone.labels = false;
            delete clone.title;
            delete clone.titleAlign;
            delete clone.titleAngle;
            delete clone.titleFontSize;
            return clone;
        });
    }

    const filler: Mark = {
        "style": "cell",
        "type": "group",
        "from": { "data": CellFiller },
        "title": {
            "frame": "group",
            "offset": specViewOptions.facetMargins.title,
            "text": "",
            "fontSize": {
                "signal": TextSizeSignal
            }
        },
        "encode": {
            "update": {
                "width": { "signal": "width" },
                "height": { "signal": "height" }
            }
        }
    };
    if (childAxes) {
        filler.axes = childAxes.map(axis => {
            const clone = util.clone(axis);
            //remove all labels and titles
            clone.labels = false;
            delete clone.title;
            delete clone.titleAlign;
            delete clone.titleAngle;
            delete clone.titleFontSize;
            //change tick & domain color
            clone.tickColor = cellFillerLineColor;
            clone.domainColor = cellFillerLineColor;
            return clone;
        });
    }

    const rowHeader: Mark = {
        "type": "group",
        "role": "row-header",
        "from": {
            "facet": {
                "name": "row-headers",
                "data": FacetRowsSequence,
                "groupby": [
                    SequenceNumber
                ]
            }
        }
    };
    if (childAxes) {
        rowHeader.axes = [
            cloneAndOffsetAxis(childAxes.filter(axis => axis.orient === 'left')[0], specViewOptions.facetMargins.column)
        ];
    }

    const columnFooter: Mark = {
        "type": "group",
        "role": "column-footer",
        "from": {
            "facet": {
                "name": "column-footers",
                "data": FacetColumnsSequence,
                "groupby": [
                    SequenceNumber
                ]
            }
        }
    };
    if (childAxes) {
        columnFooter.axes = [
            cloneAndOffsetAxis(childAxes.filter(axis => axis.orient === 'bottom')[0], specViewOptions.facetMargins.row)
        ];
    }

    const marks: Mark[] = [
        mark,
        filler,
        rowHeader,
        columnFooter
    ];
    return marks;
}

function cloneAndOffsetAxis(axis: Axis, margin: number) {
    if (axis) {
        const clone = util.clone(axis);
        clone.offset = margin;
        return clone;
    }
}
