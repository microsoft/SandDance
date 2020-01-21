// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AggregateTransform, Mark, Scale, BandScale, Transforms, LinearScale } from 'vega-typings';
import { BuildProps, Layout, LayoutProps } from './layout';
import { ContinuousAxisScale } from '../specBuilder';
import { InnerScope, Orientation } from '../interfaces';
import { binnable, Binnable } from '../bin';

export interface BarProps extends LayoutProps {
    orientation: Orientation;
    maxbins: number;
}

export class Bar extends Layout {
    public props: BarProps & BuildProps;

    public build(): InnerScope {
        const { props } = this;
        const { global, groupby, maxbins, parent, specContext } = props;
        const name = `bar_${this.id}`;
        const facetDataName = `facet_${name}`;
        const aggregation = this.getAgregation();
        const globalAggregateDataName = `${name}_${aggregation}`;
        const globalAggregateExtentSignal = `${globalAggregateDataName}_extent`;
        const globalAggregateMaxExtentSignal = `${globalAggregateDataName}_max`;
        const localAggregateDataName = `${facetDataName}_${aggregation}`;
        const xScaleName = `${name}_scale_x`;
        const yScaleName = `${name}_scale_y`;
        const trans: AggregateTransform = {
            type: 'aggregate',
            groupby: [props.groupby.name],
            ops: [aggregation]
        };
        if (aggregation === 'sum') {
            trans.fields = [specContext.insight.columns.sum];
        }
        const bin = binnable(global.dataName, groupby, maxbins);
        let globalTransforms: { [columnName: string]: Transforms[] };
        if (bin.transforms) {
            globalTransforms = {};
            globalTransforms[groupby.name] = bin.transforms;
            global.scope.data.push(bin.dataSequence);
        }
        global.scope.data.push({
            name: globalAggregateDataName,
            source: global.dataName,
            transform: [
                {
                    ...trans,
                    as: [aggregation]
                },
                {
                    type: 'extent',
                    field: aggregation,
                    signal: globalAggregateExtentSignal
                }
            ]
        });
        global.scope.signals.push({
            name: globalAggregateMaxExtentSignal,
            update: `max(${globalAggregateExtentSignal}[0],${globalAggregateExtentSignal}[1])`
        })
        const mark: Mark = {
            style: 'cell',
            name,
            type: 'group',
            from: {
                facet: {
                    name: facetDataName,
                    data: parent.dataName,
                    groupby: this.props.groupby.name
                }
            },
            data: [
                {
                    name: localAggregateDataName,
                    source: facetDataName,
                    transform: [trans]
                }
            ],
            encode: {
                update: {
                    // x: {
                    //     scale: ScaleNames.X,
                    //     field: specColumns.x.name,
                    //     offset: 1
                    // },
                    // width: { signal: SignalNames.PointSize },
                    // y: [
                    //     {
                    //         scale: ScaleNames.Y,
                    //         test: testForCollapseSelection(),
                    //         signal: `${SignalNames.YDomain}[0]`
                    //     },
                    //     {
                    //         scale: ScaleNames.Y,
                    //         field: specColumns.y.name,
                    //         offset: {
                    //             signal: `-${SignalNames.PointSize}`
                    //         }
                    //     }
                    // ],
                    // height: [
                    //     {
                    //         test: testForCollapseSelection(),
                    //         value: 0
                    //     },
                    //     {
                    //         signal: SignalNames.PointSize
                    //     }
                    // ]
                }
            },
            marks: [
                {
                    type: 'text',
                    encode: {
                        update: {
                            text: {
                                signal: `length(data(${JSON.stringify(facetDataName)}))`
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

        const { xScale, yScale } = this.getScales(bin, xScaleName, yScaleName, globalAggregateMaxExtentSignal);

        return {
            dataName: facetDataName,
            scope: mark,
            sizeSignals: parent.sizeSignals,
            globalScales: {
                x: xScale,
                y: yScale
            }
        };
    }

    private getScales(bin: Binnable, xScaleName: string, yScaleName: string, globalAggregateMaxExtentSignal: string) {
        let xScale: Scale;
        let yScale: Scale;
        if (this.props.orientation === 'horizontal') {
            xScale = <BandScale>{
                type: 'band',
                name: xScaleName,
                range: [
                    0,
                    {
                        signal: this.props.parent.sizeSignals.width
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
                name: yScaleName,
                domain: [
                    0,
                    {
                        signal: globalAggregateMaxExtentSignal
                    }
                ],
                range: [
                    0,
                    {
                        signal: this.props.parent.sizeSignals.height
                    }
                ],
                nice: true,
                zero: true
            };
        } else {
            xScale = <LinearScale>{
                type: 'linear',
                name: xScaleName,
                domain: [
                    0,
                    {
                        signal: globalAggregateMaxExtentSignal
                    }
                ],
                range: [
                    0,
                    {
                        signal: this.props.parent.sizeSignals.width
                    }
                ],
                nice: true,
                zero: true
            };
            yScale = <BandScale>{
                type: 'band',
                name: yScaleName,
                range: [
                    0,
                    {
                        signal: this.props.parent.sizeSignals.height
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
