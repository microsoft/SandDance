// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales, ContinuousAxisScale, SpecBuilderProps } from '../specBuilder';
import { Bar, BarProps } from '../layouts/bar';
import { Layout, LayoutProps } from '../layouts/layout';
import { maxbins } from '../defaults';
import { SignalNames } from '../constants';
import { Slice, SliceProps } from '../layouts/slice';
import { SpecContext } from '../types';
import { Square, SquareProps } from '../layouts/square';
import { Strip, StripProps } from '../layouts/strip';
import { Treemap, TreemapProps } from '../layouts/treemap';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { insight, specColumns } = specContext;
    let footprintClass: typeof Layout = Bar;
    let footprintProps: LayoutProps = <BarProps>{ orientation: 'vertical', groupby: specContext.specColumns.x };
    let unitLayoutClass: typeof Layout;
    let unitLayoutProps: LayoutProps;
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
            unitLayoutProps = <TreemapProps>{ corner: 'bottom-left' };
            break;
        }
        case 'strip-percent': {
            y.aggregate = 'percent';
            footprintClass = Slice;
            footprintProps = <SliceProps>{ orientation: 'vertical', maxbins };
            unitLayoutClass = Strip;
            unitLayoutProps = <StripProps>{ orientation: 'horizontal' };
            break;
        }
        default: {
            y.aggregate = 'count';
            unitLayoutClass = Square;
            unitLayoutProps = <SquareProps>{ growDirection: 'right-up' };
            break;
        }
    }
    return {
        axisScales,
        specContext,
        layouts: [
            {
                layoutClass: footprintClass,
                props: footprintProps
            },
            {
                layoutClass: unitLayoutClass,
                props: unitLayoutProps
            }
        ],
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
