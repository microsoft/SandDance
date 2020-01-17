// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Bar, BarProps } from '../layouts/bar';
import { Layout, LayoutProps } from '../layouts/layout';
import { Square, SquareProps } from '../unitLayouts/square';
import { Stack, StackProps } from '../layouts/stack';
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { Strip, StripProps } from '../unitLayouts/strip';
import { Treemap, TreemapProps } from '../unitLayouts/treemap';
import { UnitLayout, UnitLayoutProps } from '../unitLayouts/unitLayout';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { insight, specColumns } = specContext;
    let footprintClass: typeof Layout = Bar;
    let footprintProps: LayoutProps = { orientation: 'horizontal' } as BarProps;
    let unitLayoutClass: typeof UnitLayout;
    let unitLayoutProps: UnitLayoutProps;
    switch (insight.sumStyle) {
        case 'treemap': {
            unitLayoutClass = Treemap;
            unitLayoutProps = { corner: 'top-left' } as TreemapProps;
            break;
        }
        case 'strip-percent': {
            footprintClass = Stack;
            footprintProps = { orientation: 'horizontal' } as StackProps;
            unitLayoutClass = Strip;
            unitLayoutProps = { orientation: 'vertical' } as StripProps;
            break;
        }
        default: {
            unitLayoutClass = Square;
            unitLayoutProps = { growDirection: 'down-right' } as SquareProps;
            break;
        }
    }
    return {
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
