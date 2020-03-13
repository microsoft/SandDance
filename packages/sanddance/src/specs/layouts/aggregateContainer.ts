// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    addData,
    addMarks,
    addSignal,
    addTransforms,
    getDataByName
} from '../scope';
import { AxisScale, InnerScope } from '../interfaces';
import { Column } from '../types';
import { GroupMark, JoinAggregateTransform, LinearScale } from 'vega-typings';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { testForCollapseSelection } from '../selection';

export interface AggregateContainerProps extends LayoutProps {
    dock: 'bottom' | 'top' | 'left';
    sumBy: Column;
    globalAggregateMaxExtentSignal: string;
    globalAggregateMaxExtentScaledSignal: string;
    parentHeight: string;
}

export class AggregateContainer extends Layout {
    private aggregation: 'sum' | 'count';
    private names: {
        barCount: string,
        aggregateField: string,
        globalAggregateExtentSignal: string,
        scale: string,
        localAggregateExtentSignal: string,
    };

    constructor(public props: AggregateContainerProps & LayoutBuildProps) {
        super(props);
        const a = this.aggregation = this.getAggregation();
        const p = this.prefix = `agg_${this.id}`;
        this.names = {
            barCount: `${p}_count`,
            aggregateField: `${p}_aggregate_value`,
            globalAggregateExtentSignal: `${p}_${a}_extent`,
            scale: `scale_${p}`,
            localAggregateExtentSignal: `${p}_local_extent`
        };
    }

    public build(): InnerScope {
        const { aggregation, names, prefix, props } = this;
        const { dock, globalScope, groupings, parentScope } = props;

        console.log(groupings);

        //this needs to be global since the scale depends on it
        addTransforms(getDataByName(globalScope.scope.data, globalScope.dataName),
            {
                ...this.getTransforms(
                    aggregation,
                    groupings.reduce((acc, val) => acc.concat(val), [])
                ),
                as: [names.aggregateField]
            },
            {
                type: 'extent',
                field: names.aggregateField,
                signal: names.globalAggregateExtentSignal
            }
        );
        addData(parentScope.scope, {
            name: 'TODOtemp',
            source: parentScope.dataName,
            transform: [
                {
                    type: 'extent',
                    field: names.aggregateField,
                    signal: names.localAggregateExtentSignal
                }
            ]
        });
        addSignal(globalScope.scope,
            {
                name: props.globalAggregateMaxExtentSignal,
                update: `${names.globalAggregateExtentSignal}[1]`
            }
        );
        const scaledAggregateValue = `scale(${JSON.stringify(names.scale)}, ${names.localAggregateExtentSignal}[0])`;
        const horizontal = dock === 'left';
        const mark: GroupMark = {
            style: 'cell',
            name: prefix,
            type: 'group',
            encode: {
                update: {
                    x: {
                        value: 0
                    },
                    y: dock === 'bottom' ?
                        {
                            signal: `${parentScope.sizeSignals.layoutHeight} - ${scaledAggregateValue}`
                        }
                        :
                        {
                            value: 0
                        },
                    height: horizontal ?
                        {
                            signal: parentScope.sizeSignals.layoutHeight
                        }
                        :
                        {
                            signal: scaledAggregateValue
                        },
                    width: horizontal ?
                        {
                            signal: scaledAggregateValue
                        }
                        :
                        {
                            signal: parentScope.sizeSignals.layoutWidth
                        }
                }
            }
        };
        addMarks(parentScope.scope, mark);

        const scale: LinearScale = {
            type: 'linear',
            name: names.scale,
            domain: [
                0,
                {
                    signal: props.globalAggregateMaxExtentSignal
                }
            ],
            range: [
                0,
                {
                    signal: horizontal
                        ? parentScope.sizeSignals.layoutWidth
                        : parentScope.sizeSignals.layoutHeight
                }
            ],
            nice: true,
            zero: true
        };

        addSignal(globalScope.scope,
            {
                name: props.globalAggregateMaxExtentScaledSignal,
                update: `scale(${JSON.stringify(names.scale)}, ${props.globalAggregateMaxExtentSignal})`
            },
            {
                name: props.parentHeight,
                update: parentScope.sizeSignals.layoutHeight
            }
        );

        return {
            dataName: parentScope.dataName,
            scope: mark,
            sizeSignals: horizontal ?
                {
                    layoutHeight: parentScope.sizeSignals.layoutHeight,
                    layoutWidth: scaledAggregateValue
                }
                :
                {
                    layoutHeight: scaledAggregateValue,
                    layoutWidth: parentScope.sizeSignals.layoutWidth
                },
            globalScales: {
                x: horizontal ? scale : undefined,
                y: horizontal ? undefined : scale
            },
            encodingRuleMap: horizontal ?
                {
                    x: [{
                        test: testForCollapseSelection(),
                        value: 0
                    }],
                    width: [{
                        test: testForCollapseSelection(),
                        value: 0
                    }]
                }
                :
                {
                    y: [{
                        test: testForCollapseSelection(),
                        signal: scaledAggregateValue
                    }],
                    height: [{
                        test: testForCollapseSelection(),
                        value: 0
                    }]
                }
        };
    }

    private getTransforms(aggregation: 'count' | 'sum', groupby: string[]) {
        console.log('groupby', groupby);
        const trans: JoinAggregateTransform = {
            type: 'joinaggregate',
            groupby,
            ops: [aggregation]
        };
        if (aggregation === 'sum') {
            trans.fields = [this.props.sumBy.name];
        }
        return trans;
    }

    private getAggregation() {
        const { props } = this;
        let s: AxisScale;
        if (props.dock === 'left') {
            s = props.axesScales.x;
        } else {
            s = props.axesScales.y;
        }
        switch (s.aggregate) {
            case 'sum':
                return 'sum';
            default:
                return 'count';
        }
    }
}
