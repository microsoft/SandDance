// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Column } from '../types';
import { InnerScope } from '../interfaces';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { testForCollapseSelection } from '../selection';

export interface StackProps extends LayoutProps {
    sort: Column;
}

export class Stack extends Layout {
    private names: {
        barCount: string,
    };

    constructor(public props: StackProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `agg_${this.id}`;
        this.names = {
            barCount: `${p}_count`,
        };
    }

    public build(): InnerScope {
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
