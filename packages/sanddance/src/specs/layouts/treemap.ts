// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { InnerScope } from '../interfaces';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { Data, Mark, RectMark } from 'vega-typings';
import { addMarks, addTransforms, getDataByName, addSignal, addData } from '../scope';
import { Column } from '../types';
import { SignalNames } from '../constants';
import { testForCollapseSelection } from '../selection';
import { addZScale } from '../zBase';

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
        zScaleName: string
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
            zScaleName: `scale_${p}_z`
        };
    }

    public build(): InnerScope {
        const { names, prefix, props } = this;
        const { globalScope, group, parentScope, size, treeMapMethod, z } = props;
        let { zSize } = props;

        zSize = zSize || parentScope.sizeSignals.layoutHeight;
        addZScale(z, zSize, globalScope, names.zScaleName);

        addData(parentScope.scope, {
            name: names.dataName,
            source: parentScope.dataName,
            transform: [
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
                    padding: 1,
                    size: [
                        //TODO same global scale
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

        const mark: RectMark = {
            type: 'rect',
            from: { data: names.dataName },
            encode: {
                update: {
                    x: { field: names.fieldX0 },
                    y: { field: names.fieldY0 },
                    x2: { field: names.fieldX1 },
                    y2: { field: names.fieldY1 },
                    ...z && {
                        z: { value: 0 },
                        depth: [
                            {
                                test: testForCollapseSelection(),
                                value: 0
                            },
                            {
                                scale: names.zScaleName,
                                field: z.name
                            }
                        ]
                    }
                }
            }
        };

        addMarks(parentScope.scope, mark);

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
            dataName: null,
            scope: null,
            sizeSignals: {
                layoutHeight: null,
                layoutWidth: null
            }
        };
    }

}
