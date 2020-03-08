// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    addData,
    addMarks,
    addSignal,
    addTransforms,
    getDataByName
} from '../scope';
import {
    AggregateTransform,
    BandScale,
    GroupMark,
    LinearScale,
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
    private aggregation: 'sum' | 'count';
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
        accumulative: string,
        localAggregation: string,
        pivot: string
    };

    constructor(public props: BarProps & LayoutBuildProps) {
        super(props);
        const a = this.aggregation = this.getAgregation();
        const p = this.prefix = `bar_${this.id}`;
        this.names = {
            barCount: `${p}_count`,
            facetData: `facet_${p}`,
            globalAggregateData: `${p}_aggregate_${a}`,
            globalAggregateExtentSignal: `${p}_${a}_extent`,
            globalAggregateMaxExtentSignal: `${p}_${a}_max`,
            xScale: `scale_${p}_x`,
            yScale: `scale_${p}_y`,
            bandWidth: `${p}_bandwidth`,
            scaledSize: `${p}_scaled_size`,
            accumulative: `${p}_accumulative`,
            localAggregation: `data_${p}_localAggregation`,
            pivot: `data_${p}_pivot`
        };
        this.bin = binnable(this.prefix, props.globalScope.dataName, props.groupby);
    }

    public getGrouping() {
        return this.bin.fields;
    }

    public build(): InnerScope {
        const { aggregation, bin, names, props } = this;
        const { globalScope, groupings, minBandWidth, orientation, parentScope, sumBy } = props;
        const binField = bin.fields[0];
        if (bin.native === false) {
            addSignal(globalScope.scope, bin.maxbinsSignal);
            addTransforms(getDataByName(globalScope.scope.data, globalScope.dataName), ...bin.transforms);
            addData(globalScope.scope, bin.dataSequence);
        }
        addData(parentScope.scope,
            {
                name: names.localAggregation,
                source: parentScope.dataName,
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
                name: names.pivot,
                source: names.localAggregation,
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
        addData(globalScope.scope,
            {
                name: names.globalAggregateData,
                source: globalScope.dataName,
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
                source: bin.fullScaleDataname,
                transform: [
                    {
                        type: 'aggregate',
                        groupby: this.getGrouping(),
                        ops: ['count']
                    }
                ]
            }
        );
        const minCellSignal = (orientation === 'vertical') ? globalScope.signals.minCellWidth : globalScope.signals.minCellHeight;
        modifySignal(minCellSignal, 'max', `length(data(${JSON.stringify(names.accumulative)})) * ${minBandWidth}`);
        addSignal(globalScope.scope,
            {
                name: names.globalAggregateMaxExtentSignal,
                update: `${names.globalAggregateExtentSignal}[1]`
            },
            {
                name: names.bandWidth,
                update: `bandwidth(${JSON.stringify(orientation === 'horizontal' ? names.yScale : names.xScale)})`
            }
        );
        const mark = this.getMark(parentScope, sumBy, orientation, binField);
        addMarks(parentScope.scope, mark);

        const { xScale, yScale } = this.getScales(bin);

        props.onBuild && props.onBuild({
            globalAggregateMaxExtentSignal: names.globalAggregateMaxExtentSignal,
            globalAggregateMaxExtentScaledSignal: orientation === 'horizontal'
                ?
                `scale(${JSON.stringify(names.xScale)}, ${names.globalAggregateMaxExtentSignal})`
                :
                `(${parentScope.sizeSignals.layoutHeight} - scale(${JSON.stringify(names.yScale)}, ${names.globalAggregateMaxExtentSignal}))`,
            bandWidth: names.bandWidth,
            parentSize: orientation === 'horizontal' ? parentScope.sizeSignals.layoutWidth : parentScope.sizeSignals.layoutHeight
        });

        return {
            dataName: names.facetData,
            scope: mark,
            sizeSignals: orientation === 'horizontal' ?
                {
                    layoutHeight: names.bandWidth,
                    layoutWidth: `scale(${JSON.stringify(names.xScale)}, data(${JSON.stringify(names.pivot)})[0][datum[${JSON.stringify(binField)}]])`
                }
                :
                {
                    layoutHeight: `${parentScope.sizeSignals.layoutHeight} - scale(${JSON.stringify(names.yScale)}, data(${JSON.stringify(names.pivot)})[0][datum[${JSON.stringify(binField)}]])`,
                    layoutWidth: names.bandWidth
                },
            globalScales: {
                x: xScale,
                y: yScale
            }
        };
    }

    private getMark(parentScope: InnerScope, sumBy: Column, orientation: string, binField: string): GroupMark {
        const { aggregation, bin, names, prefix } = this;
        return {
            name: prefix,
            type: 'group',
            from: {
                facet: {
                    name: names.facetData,
                    data: parentScope.dataName,
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
                            scale: names.yScale,
                            field: binField
                        },
                        height: {
                            signal: names.bandWidth
                        },
                        width: {
                            scale: names.xScale,
                            field: aggregation
                        }
                    }
                    :
                    {
                        x: {
                            scale: names.xScale,
                            field: binField
                        },
                        y: {
                            scale: names.yScale,
                            field: aggregation
                        },
                        height: {
                            signal: `${parentScope.sizeSignals.layoutHeight} - scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(aggregation)}])`
                        },
                        width: {
                            signal: names.bandWidth
                        },
                    }
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
        const { orientation, parentScope } = this.props;
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
                        signal: parentScope.sizeSignals.layoutWidth
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
                        signal: parentScope.sizeSignals.layoutHeight
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
                        signal: parentScope.sizeSignals.layoutWidth
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
                        signal: parentScope.sizeSignals.layoutHeight
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
