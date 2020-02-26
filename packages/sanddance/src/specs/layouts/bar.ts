// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    AggregateTransform,
    BandScale,
    LinearScale,
    Mark,
    Scale
} from 'vega-typings';
import {
    AxisScale,
    DiscreteColumn,
    InnerScope,
    Orientation
} from '../interfaces';
import { binnable, Binnable } from '../bin';
import { Column } from '../types';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { modifySignal } from '../signals';
import { push } from '../../array';

export interface BarBuild {
    globalAggregateMaxExtentSignal: string;
    globalAggregateMaxExtentScaledSignal: string;
    bandWidth: string;
    parentSize: string;
}

export interface BarProps extends LayoutProps {
    groupby: DiscreteColumn;
    minBandWidth: number;
    sumBy: Column;
    orientation: Orientation;
    onBuild?: (barBuild: BarBuild) => void;
}

export class Bar extends Layout {
    private bin: Binnable;
    private names: {
        barCount: string,
        facetData: string,
        globalAggregateData: string,
        globalAggregateExtentSignal: string,
        globalAggregateMaxExtentSignal: string,
        xScale: string,
        yScale: string,
        bandWidth: string,
        scaledSize: string,
        accumulative: string
    };

    constructor(public props: BarProps & LayoutBuildProps) {
        super(props);
        this.prefix = `bar_${this.id}`;
        this.bin = binnable(this.prefix, props.global.dataName, props.groupby);
    }

    public getGrouping() {
        return this.bin.fields;
    }

    public build(): InnerScope {
        const { bin, prefix, props } = this;
        const { global, groupings, minBandWidth, orientation, parent, sumBy } = props;
        const aggregation = this.getAgregation();
        this.names = {
            barCount: `${prefix}_count`,
            facetData: `facet_${prefix}`,
            globalAggregateData: `${prefix}_aggregate_${aggregation}`,
            globalAggregateExtentSignal: `${prefix}_${aggregation}_extent`,
            globalAggregateMaxExtentSignal: `${prefix}_${aggregation}_max`,
            xScale: `${prefix}_scale_x`,
            yScale: `${prefix}_scale_y`,
            bandWidth: `${prefix}_bandwidth`,
            scaledSize: `${prefix}_scaled_size`,
            accumulative: `${prefix}_accumulative`
        };
        const { names } = this;
        const binField = bin.fields[0];
        if (bin.native === false) {
            global.scope.signals.push(bin.maxbinsSignal);
            push(global.scope.data[0].transform, bin.transforms);
            global.scope.data.push(bin.dataSequence);
        }

        parent.scope.data = parent.scope.data || [];
        parent.scope.data.push(
            {
                name: 'local',  //TODO
                source: parent.dataName,
                transform: [
                    {
                        ...this.getTransforms(
                            aggregation,
                            this.bin.fields
                        ),
                        as: [aggregation]
                    }
                ]
            },
            {
                name: 'pivot', //TODO
                source: 'local',
                transform: [
                    {
                        type: 'pivot',
                        field: binField,
                        value: aggregation
                    }
                ]
            }
        );
        //this needs to be global since the scale depends on it
        global.scope.data.push(
            {
                name: names.globalAggregateData,
                source: global.dataName,
                transform: [
                    {
                        ...this.getTransforms(
                            aggregation,
                            groupings.concat(this.getGrouping()).reduce((acc, val) => acc.concat(val), [])
                        ),
                        as: [aggregation]
                    },
                    {
                        type: 'extent',
                        field: aggregation,
                        signal: names.globalAggregateExtentSignal
                    }
                ]
            },
            {
                name: names.accumulative,
                source: global.dataName,
                transform: [
                    {
                        type: 'aggregate',
                        groupby: this.getGrouping(),
                        ops: ['count']
                    }
                ]
            }
        );
        const s = (orientation === 'vertical') ? props.global.signals.minCellWidth : props.global.signals.minCellHeight;
        modifySignal(s, 'max', `length(data(${JSON.stringify(names.accumulative)}))*${minBandWidth}`);
        push(global.scope.signals,
            [
                {
                    name: names.globalAggregateMaxExtentSignal,
                    update: `${names.globalAggregateExtentSignal}[1]`
                },
                {
                    name: names.bandWidth,
                    update: `bandwidth(${JSON.stringify(orientation === 'horizontal' ? names.yScale : names.xScale)})`
                }
            ]
        );
        const mark: Mark = {
            style: 'cell',
            name: prefix,
            type: 'group',
            from: {
                facet: {
                    name: names.facetData,
                    data: parent.dataName,
                    groupby: bin.fields,
                    aggregate: {
                        fields: [aggregation === 'sum' ? sumBy.name : null],
                        ops: [aggregation],
                        as: [aggregation]
                    }
                }
            },
            encode: {
                update: orientation === 'horizontal' ?
                    {
                        x: {
                            value: 0
                        },
                        y: {
                            signal: `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(binField)}])`
                        },
                        height: {
                            signal: names.bandWidth
                        },
                        width: {
                            signal: `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(aggregation)}])`
                        }
                    }
                    :
                    {
                        x: {
                            signal: `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(binField)}])`
                        },
                        y: {
                            signal: `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(aggregation)}])`
                        },
                        height: {
                            signal: `${parent.sizeSignals.layoutHeight} - scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(aggregation)}])`
                        },
                        width: {
                            signal: names.bandWidth
                        },
                    }
            },
            marks: []
        };
        parent.scope.marks.push(mark);

        const { xScale, yScale } = this.getScales(bin);

        props.onBuild && props.onBuild({
            globalAggregateMaxExtentSignal: names.globalAggregateMaxExtentSignal,
            globalAggregateMaxExtentScaledSignal: orientation === 'horizontal'
                ?
                `scale(${JSON.stringify(names.xScale)}, ${names.globalAggregateMaxExtentSignal})`
                :
                `(${parent.sizeSignals.layoutHeight} - scale(${JSON.stringify(names.yScale)}, ${names.globalAggregateMaxExtentSignal}))`,
            bandWidth: names.bandWidth,
            parentSize: orientation === 'horizontal' ? parent.sizeSignals.layoutWidth : parent.sizeSignals.layoutHeight
        });

        return {
            dataName: names.facetData,
            scope: mark,
            sizeSignals: orientation === 'horizontal' ?
                {
                    layoutHeight: names.bandWidth,
                    layoutWidth: `scale(${JSON.stringify(names.xScale)}, data('pivot')[0][datum[${JSON.stringify(binField)}]])`
                }
                :
                {
                    layoutHeight: `${parent.sizeSignals.layoutHeight} - scale(${JSON.stringify(names.yScale)}, data('pivot')[0][datum[${JSON.stringify(binField)}]])`,
                    layoutWidth: names.bandWidth
                },
            globalScales: {
                x: xScale,
                y: yScale
            }
        };
    }

    private getTransforms(aggregation: 'count' | 'sum', groupby: string[]) {
        const trans: AggregateTransform = {
            type: 'aggregate',
            groupby,
            ops: [aggregation]
        };
        if (aggregation === 'sum') {
            trans.fields = [this.props.sumBy.name];
        }
        return trans;
    }

    private getScales(bin: Binnable) {
        const { names } = this;
        const { orientation, parent } = this.props;
        const binField = bin.fields[0];

        let xScale: Scale;
        let yScale: Scale;
        if (orientation === 'vertical') {
            xScale = <BandScale>{
                type: 'band',
                name: names.xScale,
                range: [
                    0,
                    {
                        signal: parent.sizeSignals.layoutWidth
                    }
                ],
                padding: 0.1,
                domain: {
                    data: bin.domainDataName,
                    field: binField,
                    sort: true
                }
            };
            yScale = <LinearScale>{
                type: 'linear',
                name: names.yScale,
                domain: [
                    0,
                    {
                        signal: names.globalAggregateMaxExtentSignal
                    }
                ],
                range: [
                    {
                        signal: parent.sizeSignals.layoutHeight
                    },
                    0
                ],
                nice: true,
                zero: true
            };
        } else {
            xScale = <LinearScale>{
                type: 'linear',
                name: names.xScale,
                domain: [
                    0,
                    {
                        signal: names.globalAggregateMaxExtentSignal
                    }
                ],
                range: [
                    0,
                    {
                        signal: parent.sizeSignals.layoutWidth
                    }
                ],
                nice: true,
                zero: true
            };
            yScale = <BandScale>{
                type: 'band',
                name: names.yScale,
                range: [
                    0,
                    {
                        signal: parent.sizeSignals.layoutHeight
                    }
                ],
                padding: 0.1,
                domain: {
                    data: bin.domainDataName,
                    field: binField,
                    sort: true
                },
                reverse: true
            };
        }
        return { xScale, yScale };
    }

    private getAgregation() {
        const { props } = this;
        let s: AxisScale;
        if (props.orientation === 'vertical') {
            s = props.axesScales.y;
        } else {
            s = props.axesScales.x;
        }
        switch (s.aggregate) {
            case 'sum':
                return 'sum';
            default:
                return 'count';
        }
    }
}
