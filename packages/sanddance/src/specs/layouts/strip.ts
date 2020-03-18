// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addData, addMarks } from '../scope';
import { addZScale } from '../zBase';
import { Column } from '../types';
import { FieldNames } from '../constants';
import { InnerScope, Orientation } from '../interfaces';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import {
    LinearScale,
    RectMark,
    SortOrder,
    Transforms
} from 'vega-typings';
import { testForCollapseSelection } from '../selection';

export interface StripProps extends LayoutProps {
    sortOrder: SortOrder;
    addPercentageScale?: boolean;
    orientation: Orientation;
    size?: Column;
    sort: Column;
    z: Column;
    zSize?: string;
}

export class Strip extends Layout {
    private names: {
        dataName: string,
        scale: string,
        zScale: string
    }

    constructor(public props: StripProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `strip_${this.id}`;
        this.names = {
            dataName: `data_${p}`,
            scale: `scale_${p}`,
            zScale: `scale_${p}_z`
        };
    }

    public build(): InnerScope {
        const { names, prefix, props } = this;
        const { addPercentageScale, globalScope, orientation, size, sort, sortOrder, parentScope, z } = props;

        let { zSize } = props;
        zSize = zSize || parentScope.sizeSignals.layoutHeight;
        addZScale(z, zSize, globalScope, names.zScale);

        const horizontal = orientation === 'horizontal';

        const transform: Transforms[] = [];

        if (sort) {
            transform.push({
                type: 'collect',
                sort: {
                    field: sort.name,
                    order: sortOrder
                }
            });
        }

        let field: string;
        if (size) {
            field = size.name;
        } else {
            field = FieldNames.Value;
            transform.push({
                type: 'formula',
                expr: '1',
                as: field
            });
        }

        transform.push({
            type: 'stack',
            field,
            offset: 'normalize',
            as: [FieldNames.First, FieldNames.Last]
        });

        addData(parentScope.scope, {
            name: names.dataName,
            source: parentScope.dataName,
            transform
        });

        const span = [FieldNames.Last, FieldNames.First].map(f => `datum[${JSON.stringify(f)}]`).join(' - ');

        const mark: RectMark = {
            name: prefix,
            type: 'rect',
            from: { data: names.dataName },
            encode: {
                update: {
                    x: horizontal ?
                        {
                            signal: `datum[${JSON.stringify(FieldNames.First)}] * (${parentScope.sizeSignals.layoutWidth})`
                        }
                        :
                        {
                            value: 0
                        },
                    y: horizontal ?
                        {
                            value: 0
                        }
                        :
                        {
                            signal: `datum[${JSON.stringify(FieldNames.First)}] * (${parentScope.sizeSignals.layoutHeight})`
                        },
                    height: {
                        signal: horizontal
                            ? parentScope.sizeSignals.layoutHeight
                            : `(${span}) * (${parentScope.sizeSignals.layoutHeight})`
                    },
                    width: {
                        signal: horizontal
                            ? `(${span}) * (${parentScope.sizeSignals.layoutWidth})`
                            : parentScope.sizeSignals.layoutWidth
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

        let percentageScale: LinearScale;
        if (addPercentageScale) {
            percentageScale = {
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

        return {
            dataName: prefix,
            globalScales: {
                showAxes: true,
                scales: {
                    x: horizontal ? percentageScale : undefined,
                    y: horizontal ? undefined : percentageScale
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
