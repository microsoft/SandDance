// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { FieldNames } from '../constants';
import { safeFieldName } from '../expr';
import { InnerScope, LayoutOffsets, Orientation } from '../interfaces';
import {
    addMarks,
    addOffsets,
    addTransforms,
    getGroupBy
} from '../scope';
import { testForCollapseSelection } from '../selection';
import { addZScale } from '../zBase';
import { Column } from '@msrvida/chart-types';
import {
    LinearScale,
    RectMark,
    SortOrder,
    StackTransform,
    Transforms
} from 'vega-typings';

export interface StripProps extends LayoutProps {
    sortOrder: SortOrder;
    addPercentageScale?: boolean;
    orientation: Orientation;
    size?: Column;
    sort: Column;
    z: Column;
}

export class Strip extends Layout {
    private names: {
        firstField: string,
        lastField: string,
        valueField: string,
        scale: string,
        zScale: string
    }

    constructor(public props: StripProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `strip_${this.id}`;
        this.names = {
            firstField: `${p}${FieldNames.First}`,
            lastField: `${p}${FieldNames.Last}`,
            valueField: `${p}${FieldNames.Value}`,
            scale: `scale_${p}`,
            zScale: `scale_${p}_z`
        };
    }

    public build(): InnerScope {
        const { names, prefix, props } = this;
        const { addPercentageScale, globalScope, groupings, orientation, size, sort, sortOrder, parentScope, z } = props;

        addZScale(z, globalScope.zSize, globalScope, names.zScale);

        const horizontal = orientation === 'horizontal';

        const transform: Transforms[] = [];

        if (sort) {
            transform.push({
                type: 'collect',
                sort: {
                    field: safeFieldName(sort.name),
                    order: sortOrder
                }
            });
        }

        let stackField: string;
        if (size) {
            stackField = size.name;
            transform.push({
                type: 'filter',
                expr: `datum[${JSON.stringify(size.name)}] > 0`
            });
        } else {
            stackField = names.valueField;
            transform.push({
                type: 'formula',
                expr: '1',
                as: stackField
            });
        }

        const stackTransform: StackTransform = {
            type: 'stack',
            field: safeFieldName(stackField),
            offset: 'normalize',
            as: [names.firstField, names.lastField]
        };
        if (groupings.length) {
            stackTransform.groupby = getGroupBy(groupings).map(safeFieldName);
        }
        transform.push(stackTransform);

        addTransforms(globalScope.data, ...transform);

        const span = [names.lastField, names.firstField].map(f => `datum[${JSON.stringify(f)}]`).join(' - ');

        const offsets: LayoutOffsets = {
            x: addOffsets(parentScope.offsets.x,
                horizontal ?
                    `datum[${JSON.stringify(names.firstField)}] * (${parentScope.offsets.w})`
                    :
                    ''
            ),
            y: addOffsets(parentScope.offsets.y,
                horizontal ?
                    ''
                    :
                    `datum[${JSON.stringify(names.firstField)}] * (${parentScope.offsets.h})`
            ),
            h: horizontal
                ? parentScope.offsets.h
                : `(${span}) * (${parentScope.offsets.h})`,
            w: horizontal
                ? `(${span}) * (${parentScope.offsets.w})`
                : parentScope.offsets.w
        };

        const mark: RectMark = {
            name: prefix,
            type: 'rect',
            from: { data: globalScope.markDataName },
            encode: {
                update: {
                    height: {
                        signal: offsets.h
                    },
                    width: {
                        signal: offsets.w
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
                                field: safeFieldName(z.name)
                            }
                        ]
                    }
                }
            }
        };

        addMarks(globalScope.markGroup, mark);

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
            globalScales: {
                showAxes: true,
                scales: {
                    x: horizontal ? percentageScale : undefined,
                    y: horizontal ? undefined : percentageScale
                }
            },
            offsets,
            sizeSignals: {
                layoutHeight: null,
                layoutWidth: null
            },
            mark
        };
    }
}
