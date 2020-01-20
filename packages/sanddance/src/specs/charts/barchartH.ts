// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales, ContinuousAxisScale, SpecBuilderProps } from '../specBuilder';
import { Bar, BarProps } from '../layouts/bar';
import { Layout, LayoutProps } from '../layouts/layout';
import { SignalNames } from '../constants';
import { SpecContext } from '../types';
import { Square, SquareProps } from '../unitLayouts/square';
import { Stack, StackProps } from '../layouts/stack';
import { Strip, StripProps } from '../unitLayouts/strip';
import { Treemap, TreemapProps } from '../unitLayouts/treemap';
import { UnitLayout, UnitLayoutProps } from '../unitLayouts/unitLayout';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { insight, specColumns } = specContext;
    let footprintClass: typeof Layout = Bar;
    let footprintProps: LayoutProps = { orientation: 'horizontal' } as BarProps;
    let unitLayoutClass: typeof UnitLayout;
    let unitLayoutProps: UnitLayoutProps;
    const x: ContinuousAxisScale = { discrete: false };
    const axisScales: AxisScales = {
        x,
        y: { discrete: true },
        z: { discrete: false }
    };
    switch (insight.sumStyle) {
        case 'treemap': {
            x.aggregate = 'sum';
            unitLayoutClass = Treemap;
            unitLayoutProps = { corner: 'top-left' } as TreemapProps;
            break;
        }
        case 'strip-percent': {
            x.aggregate = 'percent';
            footprintClass = Stack;
            footprintProps = { orientation: 'horizontal' } as StackProps;
            unitLayoutClass = Strip;
            unitLayoutProps = { orientation: 'vertical' } as StripProps;
            break;
        }
        default: {
            x.aggregate = 'count';
            unitLayoutClass = Square;
            unitLayoutProps = { growDirection: 'down-right' } as SquareProps;
            break;
        }
    }
    return {
        axisScales,
        specContext,
        footprintClass,
        footprintProps,
        unitLayoutClass,
        unitLayoutProps,
        specCapabilities: {
            roles: [
                {
                    role: 'y',
                    binnable: true,
                    axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
                    signals: [SignalNames.YBins]
                },
                {
                    role: 'z',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'sort',
                    allowNone: true
                },
                {
                    role: 'sum',
                    allowNone: false,
                    excludeCategoric: true
                },
                {
                    role: 'facet',
                    allowNone: true
                },
                {
                    role: 'facetV',
                    allowNone: true
                }
            ]
        }
    };
}
