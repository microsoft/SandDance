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
        minSize: string,
        facetData: string,
        globalAggregateData: string,
        globalAggregateExtentSignal: string,
        globalAggregateMaxExtentSignal: string,
        xScale: string,
        yScale: string,
        bandWidth: string,
        scaledSize: string
    };

    constructor(public props: BarProps & LayoutBuildProps) {
        super(props);
        this.prefix = `bar_${this.id}`;
        this.bin = binnable(this.prefix, props.global.dataName, props.groupby);
    }

    public getGrouping() {
        return [this.bin.field];
    }

    public build(): InnerScope {
        const { bin, prefix, props } = this;
        const { global, groupings, minBandWidth, orientation, parent, sumBy } = props;
        const aggregation = this.getAgregation();
        this.names = {
            barCount: `${prefix}_count`,
            minSize: `${prefix}_minsize`,
            facetData: `facet_${prefix}`,
            globalAggregateData: `${prefix}_aggregate_${aggregation}`,
            globalAggregateExtentSignal: `${prefix}_${aggregation}_extent`,
            globalAggregateMaxExtentSignal: `${prefix}_${aggregation}_max`,
            xScale: `${prefix}_scale_x`,
            yScale: `${prefix}_scale_y`,
            bandWidth: `${prefix}_bandwidth`,
            scaledSize: `${prefix}_scaled_size`,
        };
        const { names } = this;
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
                            [this.bin.field]
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
                        field: this.bin.field,
                        value: aggregation
                    }
                ]
            }
        );
        //this needs to be global since the scale depends on it
        global.scope.data.push({
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
        });
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
                    groupby: bin.field,
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
                            signal: `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(bin.field)}])`
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
                            signal: `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(bin.field)}])`
                        },
                        y: {
                            signal: `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(aggregation)}])`
                        },
                        height: {
                            signal: `${parent.sizeSignals.height} - scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(aggregation)}])`
                        },
                        width: {
                            signal: names.bandWidth
                        },
                    }
            },
            marks: []
        };
        parent.scope.marks.push(mark);

        const { xScale, yScale } = this.getScales(prefix, bin, minBandWidth);

        props.onBuild && props.onBuild({
            globalAggregateMaxExtentSignal: names.globalAggregateMaxExtentSignal,
            globalAggregateMaxExtentScaledSignal: orientation === 'horizontal' ? `scale(${JSON.stringify(names.xScale)}, ${names.globalAggregateMaxExtentSignal})` : `(${parent.sizeSignals.height} - scale(${JSON.stringify(names.yScale)}, ${names.globalAggregateMaxExtentSignal}))`,
            bandWidth: names.bandWidth,
            parentSize: orientation === 'horizontal' ? parent.sizeSignals.width : parent.sizeSignals.height
        });

        return {
            dataName: names.facetData,
            scope: mark,
            sizeSignals: orientation === 'horizontal' ?
                {
                    height: names.bandWidth,
                    width: `scale(${JSON.stringify(names.xScale)}, data('pivot')[0][datum[${JSON.stringify(bin.field)}]])`
                }
                :
                {
                    height: `${parent.sizeSignals.height} - scale(${JSON.stringify(names.yScale)}, data('pivot')[0][datum[${JSON.stringify(bin.field)}]])`,
                    width: names.bandWidth
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

    private getScales(prefix: string, bin: Binnable, minBandWidth: number) {
        const { names } = this;
        const { global, groupings, orientation, parent } = this.props;

        const accumulative = `${prefix}_accumulative`;
        global.scope.data.push({
            name: accumulative,
            source: global.dataName,
            transform: [
                {
                    type: 'aggregate',
                    groupby: groupings.concat(this.getGrouping()).reduce((acc, val) => acc.concat(val), []),
                    ops: ['count']
                }
            ]
        });

        global.scope.signals.push(
            {
                name: names.minSize,
                update: `length(data(${JSON.stringify(accumulative)}))*${minBandWidth}`
            }
        );

        let xScale: Scale;
        let yScale: Scale;
        if (orientation === 'vertical') {
            xScale = <BandScale>{
                type: 'band',
                name: names.xScale,
                range: [
                    0,
                    {
                        //signal: `max(${parent.sizeSignals.width},${names.minSize})`   //for minumum size of bar
                        signal: `${parent.sizeSignals.width}`
                    }
                ],
                padding: 0.1,
                domain: {
                    data: bin.domainDataName,
                    field: bin.field,
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
                        signal: parent.sizeSignals.height
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
                        signal: parent.sizeSignals.width
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
                        signal: `max(${parent.sizeSignals.height},${names.minSize})`
                    }
                ],
                padding: 0.1,
                domain: {
                    data: bin.domainDataName,
                    field: bin.field,
                    sort: true
                }
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
