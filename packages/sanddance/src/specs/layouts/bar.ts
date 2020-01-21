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
import { BuildProps, Layout, LayoutProps } from './layout';
import { Column } from '../types';
import { ContinuousAxisScale } from '../specBuilder';
import { InnerScope, Orientation } from '../interfaces';
import { push } from '../../array';

export interface BarProps extends LayoutProps {
    sumBy: Column;
    orientation: Orientation;
    maxbins: number;
}

export class Bar extends Layout {
    public props: BarProps & BuildProps;

    public build(): InnerScope {
        const { props } = this;
        const { global, groupby, maxbins, orientation, parent, sumBy } = props;
        const name = `bar_${this.id}`;
        const facetDataName = `facet_${name}`;
        const aggregation = this.getAgregation();
        const globalAggregateDataName = `${name}_${aggregation}`;
        const globalAggregateExtentSignal = `${globalAggregateDataName}_extent`;
        const globalAggregateMaxExtentSignal = `${globalAggregateDataName}_max`;
        const xScaleName = `${name}_scale_x`;
        const yScaleName = `${name}_scale_y`;
        const bandWidth = `${name}_bandwidth`;

        const trans: AggregateTransform = {
            type: 'aggregate',
            groupby: [props.groupby.name],
            ops: [aggregation]
        };
        if (aggregation === 'sum') {
            trans.fields = [sumBy.name];
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
        push(global.scope.signals,
            [
                {
                    name: globalAggregateMaxExtentSignal,
                    update: `max(${globalAggregateExtentSignal}[0],${globalAggregateExtentSignal}[1])`
                },
                {
                    name: bandWidth,
                    update: `bandwidth(${JSON.stringify(orientation === 'horizontal' ? yScaleName : xScaleName)})`
                }
            ]
        );
        const mark: Mark = {
            style: 'cell',
            name,
            type: 'group',
            from: {
                facet: {
                    name: facetDataName,
                    data: parent.dataName,
                    groupby: groupby.name,
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
                            signal: `scale(${JSON.stringify(yScaleName)}, datum[${JSON.stringify(bin.field)}])`
                        },
                        height: {
                            signal: bandWidth
                        },
                        width: {
                            signal: `scale(${JSON.stringify(xScaleName)}, datum[${JSON.stringify(aggregation)}])`
                        }
                    }
                    :
                    {
                        x: {
                            signal: `scale(${JSON.stringify(xScaleName)}, datum[${JSON.stringify(bin.field)}])`
                        },
                        y: {
                            signal: `scale(${JSON.stringify(yScaleName)}, datum[${JSON.stringify(aggregation)}])`
                        },
                        height: {
                            signal: `${parent.sizeSignals.height} - scale(${JSON.stringify(yScaleName)}, datum[${JSON.stringify(aggregation)}])`
                        },
                        width: {
                            signal: bandWidth
                        },
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
        const { orientation, parent } = this.props;
        let xScale: Scale;
        let yScale: Scale;
        if (orientation === 'vertical') {
            xScale = <BandScale>{
                type: 'band',
                name: xScaleName,
                range: [
                    0,
                    {
                        signal: parent.sizeSignals.width
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
                        signal: parent.sizeSignals.width
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
                        signal: parent.sizeSignals.height
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
