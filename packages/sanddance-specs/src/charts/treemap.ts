// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales } from '../interfaces';
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { TreemapProps } from '../layouts/treemap';
import { LayoutPair } from '../layouts/layout';
import { AggregateContainerProps } from '../layouts/aggregateContainer';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { specColumns, specViewOptions } = specContext;
    const treemapProps: TreemapProps = {
        corner: 'top-left',
        group: specColumns.group,
        size: specColumns.size,
        treeMapMethod: specViewOptions.language.treeMapMethod,
        z: specColumns.z
    };
    const axisScales: AxisScales = {
        z: { title: specColumns.z && specColumns.z.name }
    };
    const layouts: LayoutPair[] = [];
    if (specColumns.facet) {
        axisScales.y = {
            title: null,
            aggregate: 'sum'
        };
        const globalAggregateMaxExtentScaledSignal = 'globalAggregateMaxExtentScaledSignal';
        const globalAggregateMaxExtentSignal = 'globalAggregateMaxExtentSignal';
        const props: AggregateContainerProps = {
            dock: 'top',
            niceScale: false,
            globalAggregateMaxExtentScaledSignal,
            globalAggregateMaxExtentSignal,
            sumBy: specColumns.size,
            showAxes: false
        };
        layouts.push({
            layoutType: 'AggregateContainer',
            props
        });
    }
    layouts.push({
        layoutType: 'Treemap',
        props: treemapProps
    });
    return {
        axisScales,
        layouts,
        specCapabilities: {
            countsAndSums: false,
            roles: [
                {
                    role: 'size',
                    excludeCategoric: true,
                },
                {
                    role: 'group',
                    allowNone: true
                },
                {
                    role: 'z',
                    axisSelection: specColumns.z && specColumns.z.quantitative ? 'range' : 'exact',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'facet',
                    allowNone: true,
                    signals: [SignalNames.FacetBins]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [SignalNames.FacetVBins]
                }
            ],
            signals: [SignalNames.TreeMapMethod]
        }
    };
}
