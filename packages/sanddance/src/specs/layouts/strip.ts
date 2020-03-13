// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Orientation, InnerScope } from '../interfaces';
import { LayoutProps, Layout, LayoutBuildProps } from './layout';
import { Column } from '../types';
import { LinearScale, RectMark } from 'vega-typings';
import { testForCollapseSelection } from '../selection';
import { addMarks } from '../scope';
import { addZScale } from '../zBase';

export interface StripProps extends LayoutProps {
    addPercentageScale?: boolean;
    orientation: Orientation;
    z: Column;
    zSize?: string;
}

export class Strip extends Layout {
    private names: {
        scale: string,
        zScale: string
    }

    constructor(public props: StripProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `strip_${this.id}`;
        this.names = {
            scale: `scale_${p}`,
            zScale: `scale_${p}_z`
        };
    }

    public build(): InnerScope {
        const { names, prefix, props } = this;
        const { addPercentageScale, globalScope, orientation, parentScope, z } = props;

        let { zSize } = props;
        zSize = zSize || parentScope.sizeSignals.layoutHeight;
        addZScale(z, zSize, globalScope, names.zScale);

        const horizontal = orientation === 'horizontal';

        let scale: LinearScale;

        if (addPercentageScale) {
            scale = {
                type: 'linear',
                name: names.scale,
                domain: [0, 100],
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
                    ]
            };
        }

        const mark: RectMark = {
            name: prefix,
            type: 'rect',
            from: { data: parentScope.dataName },
            encode: {
                update: {
                    height: {
                        value: 50
                    },
                    width: {
                        value: 50
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

        addMarks(parentScope.scope, mark);

        //TODO production rules for selection collapse

        return {
            dataName: prefix,
            globalScales: {
                showAxes: true,
                scales: {
                    x: horizontal ? scale : undefined,
                    y: horizontal ? undefined : scale
                }
            },
            sizeSignals: {
                layoutHeight: null,
                layoutWidth: null
            },
            mark
        };
    }
}
