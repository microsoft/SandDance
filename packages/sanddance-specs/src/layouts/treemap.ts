// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { SignalNames } from '../constants';
import { safeFieldName } from '../expr';
import { InnerScope, LayoutOffsets } from '../interfaces';
import {
    addData,
    addMarks,
    addOffsets,
    addSignals,
    addTransforms,
    getGroupBy
} from '../scope';
import { testForCollapseSelection } from '../selection';
import { addZScale } from '../zBase';
import { Column } from '@msrvida/chart-types';
import {
    Data,
    GroupMark,
    RectMark,
    Scope
} from 'vega-typings';

export interface TreemapProps extends LayoutProps {
    corner: 'top-left' | 'bottom-left';
    group?: Column;
    size: Column;
    treeMapMethod: string;
    z: Column;
}

export class Treemap extends Layout {
    private names: {
        dataName: string,
        dataHeightWidth: string,
        dataExtents: string,
        dataFacet: string,
        dataFacetMark: string,
        fieldX0: string,
        fieldY0: string,
        fieldX1: string,
        fieldY1: string,
        fieldDepth: string,
        fieldChildren: string,
        fieldHeight: string,
        fieldWidth: string,
        heightExtent: string,
        widthExtent: string,
        zScale: string
    };

    constructor(public props: TreemapProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `treemap_${this.id}`;
        this.names = {
            dataName: `data_${p}`,
            dataHeightWidth: `data_${p}_hw`,
            dataExtents: `data_${p}_extents`,
            dataFacet: `data_${p}_facet`,
            dataFacetMark: `data_${p}_facetMark`,
            fieldChildren: `${p}_children`,
            fieldDepth: `${p}_depth`,
            fieldX0: `${p}_x0`,
            fieldX1: `${p}_x1`,
            fieldY0: `${p}_y0`,
            fieldY1: `${p}_y1`,
            fieldHeight: `${p}_h`,
            fieldWidth: `${p}_w`,
            heightExtent: `${p}_heightExtent`,
            widthExtent: `${p}_widthExtent`,
            zScale: `scale_${p}_z`
        };
    }

    public build(): InnerScope {
        const { names, props } = this;
        const { globalScope, parentScope, treeMapMethod, z } = props;

        addZScale(z, globalScope.zSize, globalScope, names.zScale);

        const offsets: LayoutOffsets = {
            x: addOffsets(parentScope.offsets.x, fn(names.fieldX0)),
            y: addOffsets(parentScope.offsets.y, fn(names.fieldY0)),
            h: subtract(names.fieldY1, names.fieldY0),
            w: subtract(names.fieldX1, names.fieldX0)
        };

        const mark = this.transformedMark(offsets);

        addSignals(globalScope.scope, {
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
            offsets,
            sizeSignals: {
                layoutHeight: null,
                layoutWidth: null
            }
        };
    }

    private transformedMark(offsets: LayoutOffsets) {
        const { names, props } = this;
        const { globalScope, groupings, parentScope } = props;

        if (groupings.length) {
            //treemap transform can't have it's boundary size grouped, so we need to facet the data.

            addData(globalScope.scope,
                {
                    name: names.dataHeightWidth,
                    source: globalScope.markDataName,
                    transform: [
                        {
                            type: 'formula',
                            expr: parentScope.offsets.h,
                            as: names.fieldHeight
                        },
                        {
                            type: 'formula',
                            expr: parentScope.offsets.w,
                            as: names.fieldWidth
                        }
                    ]
                }
            );

            const treemapData: Data = {
                name: names.dataFacetMark,
                source: names.dataFacet
            };

            const facets: GroupMark = {
                type: 'group',
                from: {
                    facet: {
                        name: names.dataFacet,
                        data: names.dataHeightWidth,
                        groupby: getGroupBy(groupings).map(safeFieldName)
                    }
                },
                data: [
                    {
                        name: names.dataExtents,
                        source: names.dataFacet,
                        transform: [
                            {
                                type: 'extent',
                                field: names.fieldHeight,
                                signal: names.heightExtent
                            },
                            {
                                type: 'extent',
                                field: names.fieldWidth,
                                signal: names.widthExtent
                            }
                        ]
                    },
                    treemapData
                ]
            };

            globalScope.setMarkDataName(names.dataFacetMark);

            addMarks(globalScope.markGroup, facets);

            //assign new markgroup after adding mark to original group
            globalScope.setMarkGroup(facets);

            this.treemapTransform(treemapData, `${names.widthExtent}[0]`, `${names.heightExtent}[0]`);
            return this.addMark(offsets, facets, globalScope.markDataName);
        } else {
            this.treemapTransform(globalScope.data, parentScope.offsets.w, parentScope.offsets.h);
            return this.addMark(offsets, globalScope.markGroup, globalScope.markDataName);
        }
    }

    private addMark(offsets: LayoutOffsets, markParent: Scope, markDataName: string) {
        const { names, prefix, props } = this;
        const { z } = props;
        const mark: RectMark = {
            name: prefix,
            type: 'rect',
            from: { data: markDataName },
            encode: {
                update: {
                    width: {
                        signal: offsets.w
                    },
                    height: {
                        signal: offsets.h
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
        addMarks(markParent, mark);
        return mark;
    }

    private treemapTransform(treemapData: Data, widthSignal: string, heightSignal: string) {
        const { names, props } = this;
        const { group, size } = props;
        addTransforms(treemapData,
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
                field: safeFieldName(size.name),
                sort: { field: 'value', order: 'descending' },
                round: true,
                method: { signal: SignalNames.TreeMapMethod },
                paddingInner: 1,
                paddingOuter: 0,
                size: [
                    { signal: widthSignal },
                    { signal: heightSignal }
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
        );
    }
}

function fn(n: string) {
    return `datum[${JSON.stringify(n)}]`;
}

function subtract(...fields: string[]) {
    return fields.map(n => fn(n)).join(' - ');
}
