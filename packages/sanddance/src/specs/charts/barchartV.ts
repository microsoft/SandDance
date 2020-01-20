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
    let footprintProps: LayoutProps = { orientation: 'vertical' } as BarProps;
    let unitLayoutClass: typeof UnitLayout;
    let unitLayoutProps: UnitLayoutProps;
    const y: ContinuousAxisScale = { discrete: false };
    const axisScales: AxisScales = {
        x: { discrete: true },
        y,
        z: { discrete: false }
    };
    switch (insight.sumStyle) {
        case 'treemap': {
            y.aggregate = 'sum';
            unitLayoutClass = Treemap;
            unitLayoutProps = { corner: 'bottom-left' } as TreemapProps;
            break;
        }
        case 'strip-percent': {
            y.aggregate = 'percent';
            footprintClass = Stack;
            footprintProps = { orientation: 'vertical' } as StackProps;
            unitLayoutClass = Strip;
            unitLayoutProps = { orientation: 'horizontal' } as StripProps;
            break;
        }
        default: {
            y.aggregate = 'count';
            unitLayoutClass = Square;
            unitLayoutProps = { growDirection: 'right-up' } as SquareProps;
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
                    role: 'x',
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
