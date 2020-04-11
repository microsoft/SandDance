// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { FieldNames } from '../constants';
import { AxisScale, FieldOp, InnerScope } from '../interfaces';
import {
    addData,
    addMarks,
    addSignal,
    addTransforms,
    getDataByName,
    getGroupBy
} from '../scope';
import { testForCollapseSelection } from '../selection';
import { Column } from '@msrvida/chart-types';
import { GroupMark, JoinAggregateTransform, LinearScale } from 'vega-typings';

export interface AggregateContainerProps extends LayoutProps {
    dock: 'bottom' | 'top' | 'left';
    sumBy: Column;
    globalAggregateMaxExtentSignal: string;
    globalAggregateMaxExtentScaledSignal: string;
    parentHeight: string;
    niceScale: boolean;
    showAxes: boolean;
}

export class AggregateContainer extends Layout {
    private aggregation: 'sum' | 'count';
    private names: {
        barCount: string,
        aggregateField: string,
        globalAggregateExtentSignal: string,
        scale: string,
        localAggregateExtentSignal: string,
        localScaled: string,
        extentData: string,
        offsets: string
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
            localAggregateExtentSignal: `${p}_local_extent`,
            localScaled: `${p}_local_scaled`,
            extentData: `data_${p}_extent`,
            offsets: `data_${p}_offsets`
        };
    }

    public getAggregateSumOp() {
        if (this.aggregation === 'sum') {
            const fieldOp: FieldOp = {
                field: this.props.sumBy.name,
                op: 'sum',
                as: FieldNames.Sum
            };
            return fieldOp;
        }
    }

    public build(): InnerScope {
        const { aggregation, id, names, prefix, props } = this;
        const { dock, globalScope, groupings, niceScale, parentHeight, parentScope, showAxes } = props;
        const lastGrouping = groupings[groupings.length - 1];

        //this needs to be global since the scale depends on it
        addTransforms(getDataByName(globalScope.scope.data, globalScope.dataName).data,
            {
                ...this.getTransforms(
                    aggregation,
                    getGroupBy(groupings)
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
            name: names.extentData,
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
        addSignal(parentScope.scope, {
            name: names.localScaled,
            update: `scale(${JSON.stringify(names.scale)}, ${names.localAggregateExtentSignal}[0])`
        });
        const horizontal = dock === 'left';
        const mark: GroupMark = {
            name: prefix,
            type: 'group',
            encode: {
                update: {
                    x: {
                        value: 0
                    },
                    y: dock === 'bottom' ?
                        {
                            signal: names.localScaled
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
                            signal: dock === 'top'
                                ? names.localScaled
                                : `${parentScope.sizeSignals.layoutHeight} - ${names.localScaled}`
                        },
                    width: horizontal ?
                        {
                            signal: names.localScaled
                        }
                        :
                        {
                            signal: parentScope.sizeSignals.layoutWidth
                        }
                }
            }
        };
        addMarks(parentScope.scope, mark);

        const offsetKey = lastGrouping.groupby[0];
        const f = aggregation === 'sum' ? FieldNames.Sum : FieldNames.Count;
        const groupScaled = `scale(${JSON.stringify(names.scale)}, datum[${JSON.stringify(f)}])`;
        addData(globalScope.scope, {
            name: names.offsets,
            source: `group_${lastGrouping.id}`,
            transform: [
                {
                    type: 'formula',
                    expr: `0`,
                    as: FieldNames.OffsetX
                },
                {
                    type: 'formula',
                    expr: dock === 'bottom' ? groupScaled : '0'
                    ,
                    as: FieldNames.OffsetY
                },
                {
                    type: 'lookup',
                    from: parentScope.offsetData.dataName,
                    key: lastGrouping.groupby[0],
                    fields: [lastGrouping.groupby[0]],
                    values: [FieldNames.OffsetHeight, FieldNames.OffsetWidth],
                    as: [`parent_${FieldNames.OffsetHeight}`, `parent_${FieldNames.OffsetWidth}`]
                },
                {
                    type: 'formula',
                    expr: horizontal ?
                        `datum[${JSON.stringify(`parent_${FieldNames.OffsetHeight}`)}]`
                        :
                        dock === 'top'
                            ? groupScaled
                            : `datum[${JSON.stringify(`parent_${FieldNames.OffsetHeight}`)}] - ${groupScaled}`
                    ,
                    as: FieldNames.OffsetHeight
                },
                {
                    type: 'formula',
                    expr: horizontal ?
                        groupScaled
                        :
                        `datum[${JSON.stringify(`parent_${FieldNames.OffsetWidth}`)}]`
                    ,
                    as: FieldNames.OffsetWidth
                }
            ]
        });

        const scale: LinearScale = {
            type: 'linear',
            name: names.scale,
            domain: [
                0,
                {
                    signal: props.globalAggregateMaxExtentSignal
                }
            ],
            range: horizontal ?
                [
                    0,
                    {
                        signal: parentScope.sizeSignals.layoutWidth
                    }
                ]
                :
                [
                    {
                        signal: parentScope.sizeSignals.layoutHeight
                    },
                    0
                ],
            nice: niceScale,
            zero: true,
            reverse: dock === 'top'
        };

        const globalAggregateMaxExtentScaledValue = `scale(${JSON.stringify(names.scale)}, ${props.globalAggregateMaxExtentSignal})`;

        addSignal(globalScope.scope,
            {
                name: props.globalAggregateMaxExtentScaledSignal,
                update: dock === 'bottom'
                    ? `${parentScope.sizeSignals.layoutHeight} - ${globalAggregateMaxExtentScaledValue}`
                    : globalAggregateMaxExtentScaledValue
            },
            {
                name: parentHeight,
                update: parentScope.sizeSignals.layoutHeight
            }
        );

        return {
            dataName: parentScope.dataName,
            offsetData: {
                dataName: names.offsets,
                key: offsetKey
            },
            scope: mark,
            sizeSignals: horizontal ?
                {
                    layoutHeight: parentScope.sizeSignals.layoutHeight,
                    layoutWidth: names.localScaled
                }
                :
                {
                    layoutHeight: dock === 'top'
                        ? names.localScaled
                        : `${parentScope.sizeSignals.layoutHeight} - ${names.localScaled}`,
                    layoutWidth: parentScope.sizeSignals.layoutWidth
                },
            globalScales: {
                showAxes,
                scales: {
                    x: horizontal ? scale : undefined,
                    y: horizontal ? undefined : scale
                }
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
                        signal: dock === 'top'
                            ? '0'
                            : `${parentScope.sizeSignals.layoutHeight} - ${names.localScaled}`
                    }],
                    height: [{
                        test: testForCollapseSelection(),
                        value: 0
                    }]
                }
        };
    }

    private getTransforms(aggregation: 'count' | 'sum', groupby: string[]) {
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
