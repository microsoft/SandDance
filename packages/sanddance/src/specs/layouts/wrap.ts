// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnable, Binnable } from '../bin';
import { createOrdinalsForFacet } from '../ordinal';
import { DiscreteColumn, InnerScope } from '../interfaces';
import { facetPadding } from '../defaults';
import { FieldNames, SignalNames } from '../constants';
import { GroupMark } from 'vega-typings';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { modifySignal } from '../signals';
import { push } from '../../array';

export interface WrapProps extends LayoutProps {
    groupby: DiscreteColumn;
}

export class Wrap extends Layout {
    private bin: Binnable;

    constructor(public props: WrapProps & LayoutBuildProps) {
        super(props);
        this.prefix = `wrap_${this.id}`;
        this.bin = binnable(this.prefix, props.global.dataName, props.groupby);
    }

    public getGrouping() {
        return this.bin.fields;
    }

    public build(): InnerScope {
        const { bin, prefix, props } = this;
        const { global, parent } = props;
        const facetDataName = `data_${prefix}_facet`;
        const sortedDataName = `data_${prefix}_sort`;
        const rowColumnDataName = `data_${prefix}_row_col`;
        const cellHeight = `${prefix}_cellHeight`;
        const cellWidth = `${prefix}_cellWidth`;
        const fits = `${prefix}_fits`;
        const target = `${prefix}_target`;
        const minArea = `${prefix}_minArea`;
        const aspect = `${prefix}_aspect`;
        const minAspect = `${prefix}_minAspect`;
        const idealAspect = `${prefix}_idealAspect`;
        const dataLength = `${prefix}_dataLength`;
        const rxc0 = `${prefix}_rxc0`;
        const rxc1 = `${prefix}_rxc1`;
        const rxc2 = `${prefix}_rxc2`;
        const rxc = `${prefix}_rxc`;
        const growColCount = `${prefix}_growColCount`;
        const growCellWidth = `${prefix}_growCellWidth`;
        const fitsArea = `${prefix}_fitsArea`;
        const colCount = `${prefix}_colCount`;

        if (bin.native === false) {
            global.scope.signals.push(bin.maxbinsSignal);
            push(global.scope.data[0].transform, bin.transforms);
            global.scope.data.push(bin.dataSequence);
        }
        const ord = createOrdinalsForFacet(parent.dataName, prefix, bin.fields);
        global.scope.data = global.scope.data || [];
        global.scope.data.push(ord.data);

        //need to sort by the bin, since there is no scale for positioning
        global.scope.data.push.apply(global.scope.data, [
            {
                name: rxc0,
                transform: [
                    {
                        type: 'sequence',
                        start: 1,
                        stop: {
                            signal: `ceil(sqrt(${dataLength})) + 1`
                        }
                    },
                    {
                        type: 'formula',
                        expr: `ceil(${dataLength} / datum.data)`,
                        as: 'complement'
                    }
                ]
            },
            {
                name: rxc1,
                source: rxc0,
                transform: [
                    {
                        type: 'project',
                        fields: ['data'],
                        as: ['cols']
                    }
                ]
            },
            {
                name: rxc2,
                source: rxc0,
                transform: [
                    {
                        type: 'project',
                        fields: ['complement'],
                        as: ['cols']
                    }
                ]
            },
            {
                name: rxc,
                source: [rxc1, rxc2],
                transform: [
                    {
                        type: 'formula',
                        expr: `ceil(${dataLength} / datum.cols)`,
                        as: 'rows'
                    },
                    {
                        type: 'formula',
                        expr: `${parent.sizeSignals.layoutWidth} / datum.cols`,
                        as: 'cellw'
                    },
                    {
                        type: 'formula',
                        expr: `${parent.sizeSignals.layoutHeight} / datum.rows`,
                        as: 'cellh'
                    },
                    {
                        type: 'formula',
                        expr: `(datum.cols === 1 || datum.rows === 1) || (datum.cellw >= ${SignalNames.MinCellWidth} && datum.cellh >= ${SignalNames.MinCellHeight})`,
                        as: 'meetsmin'
                    },
                    {
                        type: 'filter',
                        expr: 'datum.meetsmin'
                    },
                    {
                        type: 'formula',
                        expr: 'datum.cellw / datum.cellh',
                        as: aspect
                    },
                    {
                        type: 'formula',
                        expr: `abs(datum.${aspect} - ${target})`,
                        as: idealAspect
                    },
                    {
                        type: 'formula',
                        expr: `${dataLength} / (datum.cols * datum.rows)`,
                        as: 'coverage'
                    },
                    {
                        type: 'collect',
                        sort: {
                            field: [idealAspect, 'coverage'],
                            order: ['ascending', 'descending']
                        }
                    }
                ]
            },
            {
                name: rowColumnDataName,
                source: ord.data.name,
                transform: [
                    {
                        type: 'window',
                        ops: ['row_number']
                    },
                    {
                        type: 'formula',
                        expr: `floor((datum.row_number - 1) / ${colCount})`,
                        as: 'r'
                    },
                    {
                        type: 'formula',
                        expr: `(datum.row_number - 1) % ${colCount}`,
                        as: 'c'
                    }
                ]
            },
            {
                name: sortedDataName,
                source: parent.dataName,
                transform: [
                    {
                        type: 'collect',
                        sort: {
                            field: bin.fields
                        }
                    },
                    {
                        type: 'formula',
                        expr: `[${bin.fields.map(f => `datum[${JSON.stringify(f)}]`).join()}]`,
                        as: FieldNames.FacetRange
                    },
                    {
                        type: 'lookup',
                        from: rowColumnDataName,
                        key: bin.fields[0],
                        fields: [bin.fields[0]],
                        values: ['r', 'c']
                    }
                ]
            }
        ]);

        global.scope.scales = global.scope.scales || [];
        global.scope.scales.push(ord.scale);

        global.scope.signals = global.scope.signals || [];
        global.scope.signals.push.apply(global.scope.signals, [
            {
                name: minAspect,
                update: `${SignalNames.MinCellWidth} / ${SignalNames.MinCellHeight}`
            },
            {
                name: target,
                update: `${minAspect} === 1 ? ${1.2} : ${minAspect}`
            },
            {
                name: minArea,
                update: `${SignalNames.MinCellWidth}*${SignalNames.MinCellHeight}`
            },
            {
                name: aspect,
                update: `${parent.sizeSignals.layoutWidth} / ${parent.sizeSignals.layoutHeight}`
            },
            {
                name: dataLength,
                update: `data(${JSON.stringify(ord.data.name)}).length`
            },
            {
                name: growColCount,
                update: `max(floor(${parent.sizeSignals.layoutWidth} / ${SignalNames.MinCellWidth}), 1)`
            },
            {
                name: growCellWidth,
                update: `${parent.sizeSignals.layoutWidth} / ${growColCount}`
            },
            {
                name: fitsArea,
                update: `((${dataLength} * ${minArea}) <= (${parent.sizeSignals.layoutWidth} * ${parent.sizeSignals.layoutHeight}))`
            },
            {
                name: fits,
                update: `${fitsArea} && length(data(${JSON.stringify(rxc)})) > 0`
            },
            {
                name: colCount,
                update: `${fits} ? data(${JSON.stringify(rxc)})[0].cols : ${growColCount}`
            },
            {
                name: cellWidth,
                update: `${fits} ? data(${JSON.stringify(rxc)})[0].cellw : ${growCellWidth}`
            },
            {
                name: cellHeight,
                update: `${fits} ? data(${JSON.stringify(rxc)})[0].cellh : ${SignalNames.MinCellHeight}`
            }
        ]);

        modifySignal(global.signals.plotHeightOut, 'max', `(${cellHeight} * ceil(${dataLength} / ${colCount}))`);
        modifySignal(global.signals.plotWidthOut, 'max', `(${cellWidth} * ${colCount})`);

        const mark: GroupMark = {
            style: 'cell',
            name: prefix,
            type: 'group',
            from: {
                facet: {
                    name: facetDataName,
                    data: sortedDataName,
                    groupby: bin.fields.concat(['r', 'c', FieldNames.FacetRange])
                }
            },
            encode: {
                update: {
                    height: {
                        signal: `${cellHeight} - ${facetPadding}`
                    },
                    width: {
                        signal: `${cellWidth} - ${facetPadding}`
                    },
                    x: {
                        signal: `datum.c * ${cellWidth} + ${facetPadding}`
                    },
                    y: {
                        signal: `datum.r * ${cellHeight}`
                    }
                }
            },
            marks: []
        };
        parent.scope.marks.push(mark);

        return {
            dataName: facetDataName,
            scope: mark,
            sizeSignals: {
                layoutHeight: `(${cellHeight} - ${facetPadding})`,
                layoutWidth: `(${cellWidth} - ${facetPadding})`
            }
        };
    }
}
