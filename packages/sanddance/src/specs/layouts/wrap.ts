// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnable, Binnable } from '../bin';
import { createOrdinalsForFacet } from '../ordinal';
import { DiscreteColumn, InnerScope } from '../interfaces';
import { facetPadding } from '../defaults';
import { FieldNames, SignalNames } from '../constants';
import { GroupMark } from 'vega-typings';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
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
        const growCellCount = `${prefix}_growCellCount`;
        const growCellWidth = `${prefix}_growCellWidth`;
        const fitsArea = `${prefix}_fitsArea`;
        const cellCount = `${prefix}_cellCount`;

        if (bin.native === false) {
            global.scope.signals.push(bin.maxbinsSignal);
            push(global.scope.data[0].transform, bin.transforms);
            global.scope.data.push(bin.dataSequence);
        }
        const ord = createOrdinalsForFacet(parent.dataName, prefix, bin.fields);
        parent.scope.data = parent.scope.data || [];
        parent.scope.data.push(ord.data);

        //need to sort by the bin, since there is no scale for positioning
        parent.scope.data.push.apply(parent.scope.data, [
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
                        expr: `${SignalNames.ViewportX} / datum.cols`,
                        as: 'cellw'
                    },
                    {
                        type: 'formula',
                        expr: `${SignalNames.ViewportY} / datum.rows`,
                        as: 'cellh'
                    },
                    {
                        type: 'formula',
                        expr: `(datum.cols === 1 || datum.rows === 1) || (datum.cellw >= ${SignalNames.MinCellX} && datum.cellh >= ${SignalNames.MinCellY})`,
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
                        expr: `floor((datum.row_number - 1) / ${cellCount})`,
                        as: 'r'
                    },
                    {
                        type: 'formula',
                        expr: `(datum.row_number - 1) % ${cellCount}`,
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

        parent.scope.scales = parent.scope.scales || [];
        parent.scope.scales.push(ord.scale);

        parent.scope.signals = parent.scope.signals || [];
        parent.scope.signals.push.apply(parent.scope.signals, [
            {
                name: minAspect,
                update: `${SignalNames.MinCellX} / ${SignalNames.MinCellY}`
            },
            {
                name: target,
                update: `${minAspect} === 1 ? ${1.2} : ${minAspect}`
            },
            {
                name: minArea,
                update: `${SignalNames.MinCellX}*${SignalNames.MinCellY}`
            },
            {
                name: aspect,
                update: `${SignalNames.ViewportX} / ${SignalNames.ViewportY}`
            },
            {
                name: dataLength,
                update: `data(${JSON.stringify(ord.data.name)}).length`
            },
            {
                name: growCellCount,
                update: `max(floor(${SignalNames.ViewportX} / ${SignalNames.MinCellX}), 1)`
            },
            {
                name: growCellWidth,
                update: `${SignalNames.ViewportX} / ${growCellCount}`
            },
            {
                name: fitsArea,
                update: `((${dataLength} * ${minArea}) <= (${SignalNames.ViewportX} * ${SignalNames.ViewportY}))`
            },
            {
                name: fits,
                update: `${fitsArea} && length(data(${JSON.stringify(rxc)})) > 0`
            },
            {
                name: cellCount,
                update: `${fits} ? data(${JSON.stringify(rxc)})[0].cols : ${growCellCount}`
            },
            {
                name: cellWidth,
                update: `${fits} ? data(${JSON.stringify(rxc)})[0].cellw : ${growCellWidth}`
            },
            {
                name: cellHeight,
                update: `${fits} ? data(${JSON.stringify(rxc)})[0].cellh : ${SignalNames.MinCellY}`
            }
        ]);

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
                height: `(${cellHeight} - ${facetPadding})`,
                width: `(${cellWidth} - ${facetPadding})`
            }
        };
    }
}
