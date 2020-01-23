// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    AggregateTransform,
    BandScale,
    LinearScale,
    Mark,
    Scale,
    Transforms
} from 'vega-typings';
import { binnable, Binnable } from '../bin';
import { BuildProps, LayoutProps, Layout } from './layout';
import { Column } from '../types';
import { ContinuousAxisScale } from '../specBuilder';
import { InnerScope, Orientation } from '../interfaces';
import { push } from '../../array';
import { createOrdinalsForFacet } from '../ordinal';

export interface BarBuild {
    globalAggregateMaxExtentSignal: string;
}

export interface BarProps extends LayoutProps {
    minBandWidth: number;
    groupby: Column;
    sumBy: Column;
    orientation: Orientation;
    maxbins: number;
    onBuild?: (barBuild: BarBuild) => void;
}

export class Bar extends Layout {
    public props: BarProps & BuildProps;
    private names: {
        barCount: string,
        minSize: string,
        facetData: string,
        globalAggregateData: string,
        globalAggregateExtentSignal: string,
        globalAggregateMaxExtentSignal: string,
        xScale: string,
        yScale: string,
        bandWidth: string
    };

    public build(): InnerScope {
        const { props } = this;
        const { global, groupby, maxbins, minBandWidth, orientation, parent, sumBy } = props;
        const aggregation = this.getAgregation();
        const name = `bar_${this.id}`;
        this.names = {
            barCount: `${name}_count`,
            minSize: `${name}_minsize`,
            facetData: `facet_${name}`,
            globalAggregateData: `${name}_${aggregation}`,
            globalAggregateExtentSignal: `${name}_${aggregation}_extent`,
            globalAggregateMaxExtentSignal: `${name}_${aggregation}_max`,
            xScale: `${name}_scale_x`,
            yScale: `${name}_scale_y`,
            bandWidth: `${name}_bandwidth`
        };
        const { names } = this;
        const bin = binnable(global.dataName, groupby, maxbins);
        let globalTransforms: { [columnName: string]: Transforms[] };
        if (bin.transforms) {
            globalTransforms = {};
            globalTransforms[groupby.name] = bin.transforms;
            global.scope.data.push(bin.dataSequence);
        }
        const trans: AggregateTransform = {
            type: 'aggregate',
            groupby: [bin.field],
            ops: [aggregation]
        };
        if (aggregation === 'sum') {
            trans.fields = [sumBy.name];
        }
        global.scope.data.push({
            name: names.globalAggregateData,
            source: global.dataName,
            transform: [
                {
                    ...trans,
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
            name,
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
            marks: [
                {
                    type: 'text',
                    encode: {
                        update: {
                            text: {
                                signal: `length(data(${JSON.stringify(names.facetData)}))`
                            },
                            fontSize: {
                                value: 20
                            }
                        }
                    }
                }
            ]
        };
        parent.scope.marks.push(mark);

        const { xScale, yScale } = this.getScales(bin, minBandWidth);

        props.onBuild && props.onBuild({ globalAggregateMaxExtentSignal: names.globalAggregateMaxExtentSignal });

        return {
            dataName: names.facetData,
            scope: mark,
            sizeSignals: orientation === 'horizontal' ?
                {
                    height: names.bandWidth,
                    width: parent.sizeSignals.width
                }
                :
                {
                    height: parent.sizeSignals.height,
                    width: names.bandWidth
                },
            globalScales: {
                x: xScale,
                y: yScale
            },
            globalTransforms
        };
    }

    private getScales(bin: Binnable, minBandWidth: number) {
        const { names } = this;
        const { global, groupby, orientation, parent } = this.props;

        const ord = createOrdinalsForFacet(global.scope, parent.dataName, name, groupby.name);
        global.scope.signals.push(
            {
                name: names.barCount,
                update: `length(data(${JSON.stringify(ord.dataName)}))`
            },
            {
                name: names.minSize,
                update: `${names.barCount} * ${minBandWidth}`
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
                        signal: `max(${parent.sizeSignals.width},${names.minSize})`
                    }
                ],
                padding: 0.01,
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
                padding: 0.01,
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
        let s: ContinuousAxisScale;
        if (props.orientation === 'vertical') {
            s = <ContinuousAxisScale>props.axesScales.y;
        } else {
            s = <ContinuousAxisScale>props.axesScales.x;
        }
        switch (s.aggregate) {
            case 'sum':
                return 'sum';
            default:
                return 'count';
        }
    }
}
