// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales, ContinuousAxisScale, SpecBuilderProps } from '../specBuilder';
import { Bar, BarProps } from '../layouts/bar';
import { Layout, LayoutProps } from '../layouts/layout';
import { SignalNames } from '../constants';
import { SpecContext } from '../types';
import { Square, SquareProps } from '../layouts/square';
import { Slice, SliceProps } from '../layouts/slice';
import { Strip, StripProps } from '../layouts/strip';
import { Treemap, TreemapProps } from '../layouts/treemap';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { insight, specColumns } = specContext;
    let footprintClass: typeof Layout = Bar;
    let footprintProps: LayoutProps = <BarProps>{ orientation: 'horizontal', groupby: specContext.specColumns.y };
    let unitLayoutClass: typeof Layout;
    let unitLayoutProps: LayoutProps;
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
            unitLayoutProps = <TreemapProps>{ corner: 'top-left' } ;
            break;
        }
        case 'strip-percent': {
            x.aggregate = 'percent';
            footprintClass = Slice;
            footprintProps = <SliceProps>{ orientation: 'horizontal' } ;
            unitLayoutClass = Strip;
            unitLayoutProps = <StripProps>{ orientation: 'vertical' } ;
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
