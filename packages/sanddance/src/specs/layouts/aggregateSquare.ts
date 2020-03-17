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
import { GroupMark, JoinAggregateTransform } from 'vega-typings';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { testForCollapseSelection } from '../selection';

export interface AggregateSquareProps extends LayoutProps {
    sumBy: Column;
    localAggregateMaxExtentSignal: string;
    localAggregateMaxExtentScaledSignal: string;
    parentHeight: string;
}

export class AggregateSquare extends Layout {
    private aggregation: 'sum' | 'count';
    private names: {
        barCount: string,
        aggregateField: string,
        globalAggregateExtentSignal: string,
        localAggregateExtentSignal: string,
        extentData: string,
        squareMaxArea: string,
        squareMaxSide: string,
        squareArea: string,
        squareSide: string,
        shrinkRatio: string
    };

    constructor(public props: AggregateSquareProps & LayoutBuildProps) {
        super(props);
        const a = this.aggregation = this.getAggregation();
        const p = this.prefix = `agg_${this.id}`;
        this.names = {
            barCount: `${p}_count`,
            aggregateField: `${p}_aggregate_value`,
            globalAggregateExtentSignal: `${p}_${a}_extent`,
            localAggregateExtentSignal: `${p}_local_extent`,
            extentData: `data_${p}_extent`,
            squareMaxArea: `${p}_square_max_area`,
            squareMaxSide: `${p}_square_max_side`,
            squareArea: `${p}_square_area`,
            squareSide: `${p}_square_side`,
            shrinkRatio: `${p}_shrink_ratio`
        };
    }

    public build(): InnerScope {
        const { aggregation, names, prefix, props } = this;
        const { globalScope, groupings, parentHeight, parentScope } = props;
        const { sizeSignals } = parentScope;

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
                name: names.squareMaxSide,
                update: `min((${sizeSignals.layoutHeight}), (${sizeSignals.layoutWidth}))`
            },
            {
                name: names.squareMaxArea,
                update: [names.squareMaxSide, names.squareMaxSide].join(' * ')
            }
        );
        addSignal(parentScope.scope,
            {
                name: props.localAggregateMaxExtentSignal,
                update: `${names.localAggregateExtentSignal}[0]`
            },
            {
                name: names.shrinkRatio,
                update: `${props.localAggregateMaxExtentSignal} / ${names.globalAggregateExtentSignal}[1]`
            },
            {
                name: names.squareArea,
                update: [names.squareMaxArea, names.shrinkRatio].join(' * ')
            },
            {
                name: names.squareSide,
                update: `sqrt(${names.squareArea})`
            },
            {
                name: props.localAggregateMaxExtentScaledSignal,
                update: names.squareSide
            }

        );
        const mark: GroupMark = {
            name: prefix,
            type: 'group',
            encode: {
                update: {
                    x: {
                        signal: `(${parentScope.sizeSignals.layoutWidth} - ${names.squareSide}) / 2`
                    },
                    y: {
                        signal: `(${parentScope.sizeSignals.layoutHeight} - ${names.squareSide}) / 2`
                    },
                    height: {
                        signal: names.squareSide
                    },
                    width: {
                        signal: names.squareSide
                    }
                }
            }
        };
        addMarks(parentScope.scope, mark);

        addSignal(globalScope.scope,
            {
                name: parentHeight,
                update: sizeSignals.layoutHeight
            }
        );

        return {
            dataName: parentScope.dataName,
            scope: mark,
            sizeSignals: {
                layoutHeight: names.squareSide,
                layoutWidth: names.squareSide
            },
            globalScales: {
                showAxes: false,
                scales: {}
            },
            encodingRuleMap: {
                y: [{
                    test: testForCollapseSelection(),
                    signal: '0'
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
        s = props.axesScales.y;
        switch (s.aggregate) {
            case 'sum':
                return 'sum';
            default:
                return 'count';
        }
    }
}
