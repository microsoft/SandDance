// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { safeFieldName } from '../expr';
import { InnerScope, LayoutOffsets } from '../interfaces';
import {
    addOffsets,
    addTransforms,
    getGroupBy
} from '../scope';
import { testForCollapseSelection } from '../selection';
import { Column } from '@msrvida/chart-types';
import { JoinAggregateTransform } from 'vega-typings';

export interface AggregateSquareProps extends LayoutProps {
    aggregation: 'sum' | 'count';
    sumBy: Column;
    onBuild: (localAggregateMaxExtent: string, localAggregateMaxExtentScaled: string) => void;
}

export class AggregateSquare extends Layout {
    private names: {
        barCount: string,
        aggregateField: string,
        globalAggregateExtentSignal: string,
        extentData: string
    };

    constructor(public props: AggregateSquareProps & LayoutBuildProps) {
        super(props);
        const a = this.props.aggregation;
        const p = this.prefix = `agg_${this.id}`;
        this.names = {
            barCount: `${p}_count`,
            aggregateField: `${p}_aggregate_value`,
            globalAggregateExtentSignal: `${p}_${a}_extent`,
            extentData: `data_${p}_extent`
        };
    }

    public build(): InnerScope {
        const { names, props } = this;
        const { aggregation, globalScope, groupings, onBuild, parentScope } = props;
        const { sizeSignals } = parentScope;

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

        const localAggregateMaxExtent = `datum[${JSON.stringify(names.aggregateField)}]`;
        const squareMaxSide = `min((${sizeSignals.layoutHeight}), (${sizeSignals.layoutWidth}))`;
        const squareMaxArea = `(${[squareMaxSide, squareMaxSide].join(' * ')})`;
        const shrinkRatio = `((${localAggregateMaxExtent}) / (${names.globalAggregateExtentSignal}[1]))`;
        const squareArea = `(${[squareMaxArea, shrinkRatio].join(' * ')})`;
        const squareSide = `sqrt(${squareArea})`;
        const localAggregateMaxExtentScaled = squareSide;

        onBuild && onBuild(localAggregateMaxExtent, localAggregateMaxExtentScaled);

        const offsets: LayoutOffsets = {
            x: addOffsets(parentScope.offsets.x, `(${parentScope.offsets.w} - ${squareSide}) / 2`),
            y: addOffsets(parentScope.offsets.y, `(${parentScope.offsets.h} - ${squareSide}) / 2`),
            h: squareSide,
            w: squareSide
        };

        return {
            offsets,
            sizeSignals: {
                layoutHeight: null,
                layoutWidth: null
            },
            globalScales: {
                showAxes: false,
                scales: {}
            },
            encodingRuleMap: {
                y: [{
                    test: testForCollapseSelection(),
                    signal: offsets.y
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
}
