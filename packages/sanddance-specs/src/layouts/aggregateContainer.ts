// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { FieldNames } from '../constants';
import { safeFieldName } from '../expr';
import {
    AxisScale,
    FieldOp,
    InnerScope,
    LayoutOffsets
} from '../interfaces';
import {
    addOffsets,
    addSignals,
    addTransforms,
    getGroupBy
} from '../scope';
import { testForCollapseSelection } from '../selection';
import { Column } from '@msrvida/chart-types';
import { JoinAggregateTransform, LinearScale } from 'vega-typings';

export interface AggregateContainerProps extends LayoutProps {
    dock: 'bottom' | 'top' | 'left';
    sumBy: Column;
    globalAggregateMaxExtentSignal: string;
    globalAggregateMaxExtentScaledSignal: string;
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
            extentData: `data_${p}_extent`,
            offsets: `data_${p}_offsets`
        };
    }

    public getAggregateSumOp() {
        if (this.aggregation === 'sum') {
            const fieldOp: FieldOp = {
                field: safeFieldName(this.props.sumBy.name),
                op: 'sum',
                as: FieldNames.Sum
            };
            return fieldOp;
        }
    }

    public build(): InnerScope {
        const { aggregation, names, props } = this;
        const { dock, globalScope, groupings, niceScale, parentScope, showAxes } = props;

        addTransforms(globalScope.data,
            {
                ...this.getTransforms(
                    aggregation,
                    getGroupBy(groupings)
                ),
                as: [names.aggregateField]
            },
            {
                type: 'extent',
                field: safeFieldName(names.aggregateField),
                signal: names.globalAggregateExtentSignal
            }
        );
        addSignals(globalScope.scope,
            {
                name: props.globalAggregateMaxExtentSignal,
                update: `${names.globalAggregateExtentSignal}[1]`
            }
        );
        const horizontal = dock === 'left';
        const groupScaled = `scale(${JSON.stringify(names.scale)}, datum[${JSON.stringify(names.aggregateField)}])`;
        const offsets: LayoutOffsets = {
            x: parentScope.offsets.x,
            y: addOffsets(parentScope.offsets.y,
                dock === 'bottom' ?
                    groupScaled
                    :
                    ''
            ),
            h: horizontal ?
                parentScope.offsets.h
                :
                dock === 'top'
                    ? groupScaled
                    : `${parentScope.offsets.h} - ${groupScaled}`
            ,
            w: horizontal ?
                groupScaled
                :
                parentScope.offsets.w
        };

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

        addSignals(globalScope.scope,
            {
                name: props.globalAggregateMaxExtentScaledSignal,
                update: dock === 'bottom'
                    ? `${parentScope.sizeSignals.layoutHeight} - ${globalAggregateMaxExtentScaledValue}`
                    : globalAggregateMaxExtentScaledValue
            }
        );

        return {
            offsets,
            sizeSignals: horizontal ?
                {
                    layoutHeight: parentScope.sizeSignals.layoutHeight,
                    layoutWidth: null
                }
                :
                {
                    layoutHeight: null,
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
                        signal: parentScope.offsets.x
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
                            ? parentScope.offsets.y
                            : addOffsets(parentScope.offsets.y, parentScope.offsets.h)
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
            groupby: groupby.map(safeFieldName),
            ops: [aggregation]
        };
        if (aggregation === 'sum') {
            trans.fields = [this.props.sumBy.name].map(safeFieldName);
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
