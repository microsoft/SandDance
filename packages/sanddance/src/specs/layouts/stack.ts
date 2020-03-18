// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addData } from '../scope';
import { Column } from '../types';
import { FieldNames } from '../constants';
import { InnerScope } from '../interfaces';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { testForCollapseSelection } from '../selection';

export interface StackProps extends LayoutProps {
    sort: Column;
}

export class Stack extends Layout {
    private names: {
        globalDataName: string,
        extent: string,
        localDataName: string
    };

    constructor(public props: StackProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `stack_${this.id}`;
        this.names = {
            globalDataName: `data_${p}_count`,
            extent: `${p}_extent`,
            localDataName: `data_${p}`
        };
    }

    public build(): InnerScope {
        const { names, props } = this;
        const { globalScope, groupings, parentScope, sort } = props;

        addData(globalScope.scope, {
            name: names.globalDataName,
            source: globalScope.dataName,
            transform: [
                {
                    type: 'aggregate',
                    groupby: groupings.reduce((acc, val) => acc.concat(val), []),
                    ops: ['count'],
                    as: [FieldNames.Count]
                },
                {
                    type: 'extent',
                    field: FieldNames.Count,
                    signal: names.extent
                }
            ]
        });

        addData(parentScope.scope, {
            name: names.localDataName,
            source: parentScope.dataName,
            transform: [
                {
                    type: 'window',
                    ops: ['row_number'],
                    as: [FieldNames.Ordinal]
                }
            ]
        });

        return {
            dataName: null,
            scope: null,
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
                    value: 0
                }],
                height: [{
                    test: testForCollapseSelection(),
                    value: 0
                }]
            }
        };
    }
}
