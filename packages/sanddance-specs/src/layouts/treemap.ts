// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addData, addMarks, addSignal } from '../scope';
import { addZScale } from '../zBase';
import { Column } from '@msrvida/chart-types';
import { InnerScope } from '../interfaces';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { RectMark } from 'vega-typings';
import { SignalNames } from '../constants';
import { testForCollapseSelection } from '../selection';

export interface TreemapProps extends LayoutProps {
    corner: 'top-left' | 'bottom-left';
    group?: Column;
    size: Column;
    treeMapMethod: string;
    z: Column;
    zSize?: string;
}

export class Treemap extends Layout {
    private names: {
        dataName: string,
        fieldX0: string,
        fieldY0: string,
        fieldX1: string,
        fieldY1: string,
        fieldDepth: string,
        fieldChildren: string,
        zScale: string
    };

    constructor(public props: TreemapProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `treemap_${this.id}`;
        this.names = {
            dataName: `data_${p}`,
            fieldChildren: `${p}_children`,
            fieldDepth: `${p}_depth`,
            fieldX0: `${p}_x0`,
            fieldX1: `${p}_x1`,
            fieldY0: `${p}_y0`,
            fieldY1: `${p}_y1`,
            zScale: `scale_${p}_z`
        };
    }

    public build(): InnerScope {
        const { names, prefix, props } = this;
        const { globalScope, group, parentScope, size, treeMapMethod, z } = props;
        let { zSize } = props;

        zSize = zSize || parentScope.sizeSignals.layoutHeight;
        addZScale(z, zSize, globalScope, names.zScale);

        addData(globalScope.scope, {
            name: names.dataName,
            source: parentScope.data.name,
            transform: [
                {
                    type: 'filter',
                    expr: `datum[${JSON.stringify(size.name)}] > 0`
                },
                {
                    type: 'nest',
                    keys: [(group && group.name) || '__NONE__']
                },
                {
                    type: 'treemap',
                    field: size.name,
                    sort: { field: 'value', order: 'descending' },
                    round: true,
                    method: { signal: SignalNames.TreeMapMethod },
                    paddingInner: 1,
                    paddingOuter: 0,
                    size: [
                        { signal: parentScope.sizeSignals.layoutWidth },
                        { signal: parentScope.sizeSignals.layoutHeight }
                    ],
                    as: [
                        names.fieldX0,
                        names.fieldY0,
                        names.fieldX1,
                        names.fieldY1,
                        names.fieldDepth,
                        names.fieldChildren
                    ]
                }
            ]
        });

        const subtract = (...fields: string[]) => {
            return fields.map(n => `datum[${JSON.stringify(n)}]`).join(' - ');
        };

        const mark: RectMark = {
            name: prefix,
            type: 'rect',
            from: { data: names.dataName },
            encode: {
                update: {
                    x: {
                        field: names.fieldX0
                    },
                    y: {
                        field: names.fieldY0
                    },
                    width: {
                        signal: subtract(names.fieldX1, names.fieldX0)
                    },
                    height: {
                        signal: subtract(names.fieldY1, names.fieldY0)
                    },
                    ...z && {
                        z: { value: 0 },
                        depth: [
                            {
                                test: testForCollapseSelection(),
                                value: 0
                            },
                            {
                                scale: names.zScale,
                                field: z.name
                            }
                        ]
                    }
                }
            }
        };

        addMarks(globalScope.markGroup, mark);

        addSignal(globalScope.scope, {
            name: SignalNames.TreeMapMethod,
            value: 'squarify',
            bind: {
                name: treeMapMethod,
                input: 'select',
                options: [
                    'squarify', 'binary'
                ]
            }
        });

        return {
            mark,
            //dataName: null,
            data: parentScope.data,
            sizeSignals: {
                layoutHeight: null,
                layoutWidth: null
            }
        };
    }

}
