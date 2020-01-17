// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Bar, BarProps } from '../footprints/bar';
import { Footprint, FootprintProps } from '../footprints/footprint';
import { Grid, GridProps } from '../unitLayouts/grid';
import { Percent, PercentProps } from '../footprints/percent';
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { Strip, StripProps } from '../unitLayouts/strip';
import { Treemap, TreemapProps } from '../unitLayouts/treemap';
import { UnitLayout, UnitLayoutProps } from '../unitLayouts/unitLayout';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { insight, specColumns } = specContext;
    let footprintClass: typeof Footprint = Bar;
    let footprintProps: FootprintProps = { orientation: 'horizontal' } as BarProps;
    let unitLayoutClass: typeof UnitLayout;
    let unitLayoutProps: UnitLayoutProps;
    switch (insight.sumStyle) {
        case 'treemap': {
            unitLayoutClass = Treemap;
            unitLayoutProps = { corner: 'top-left' } as TreemapProps;
            break;
        }
        case 'strip-percent': {
            footprintClass = Percent;
            footprintProps = { orientation: 'horizontal' } as PercentProps;
            unitLayoutClass = Strip;
            unitLayoutProps = { orientation: 'vertical' } as StripProps;
            break;
        }
        default: {
            unitLayoutClass = Grid;
            unitLayoutProps = { growDirection: 'down-right' } as GridProps;
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
