// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScale, AxisScales } from '../interfaces';
import { Bar, BarProps } from '../layouts/bar';
import { Layout, LayoutProps } from '../layouts/layout';
import { maxbins, minBarBandWidth } from '../defaults';
import { SignalNames } from '../constants';
import { Slice, SliceProps } from '../layouts/slice';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { Square, SquareProps } from '../layouts/square';
import { Strip, StripProps } from '../layouts/strip';
import { Treemap, TreemapProps } from '../layouts/treemap';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { insight, specColumns } = specContext;
    let footprintClass: typeof Layout = Bar;
    const barProps: BarProps = {
        orientation: 'horizontal',
        groupby: specColumns.y,
        sumBy: specColumns.sum,
        maxbins,
        minBandWidth: minBarBandWidth
    };
    let footprintProps: LayoutProps = barProps;
    let unitLayoutClass: typeof Layout;
    let unitLayoutProps: LayoutProps;
    const x: AxisScale = { type: 'continuousAggregate' };
    const axisScales: AxisScales = {
        x,
        y: { type: 'discrete' },
        z: { type: 'zFloor' }
    };
    switch (insight.sumStyle) {
        case 'treemap': {
            x.aggregate = 'sum';
            unitLayoutClass = Treemap;
            const treemapProps: TreemapProps = { corner: 'top-left' };
            unitLayoutProps = treemapProps;
            break;
        }
        case 'strip': {
            x.aggregate = 'sum';
            unitLayoutClass = Strip;
            const stripProps: StripProps = { orientation: 'vertical' };
            unitLayoutProps = stripProps;
            break;
        }
        case 'strip-percent': {
            x.aggregate = 'percent';
            footprintClass = Slice;
            const sliceProps: SliceProps = { orientation: 'horizontal', groupby: specColumns.y, maxbins };
            footprintProps = sliceProps;
            unitLayoutClass = Strip;
            const stripProps: StripProps = { orientation: 'vertical' };
            unitLayoutProps = stripProps;
            break;
        }
        default: {
            x.aggregate = 'count';
            unitLayoutClass = Square;
            const squareProps: SquareProps = { sortBy: specColumns.sort, fillDirection: 'down-right', markType: 'rect' };
            barProps.onBuild = barBuild => {
                squareProps.maxSignal = barBuild.globalAggregateMaxExtentSignal;
                squareProps.aspect = `${barBuild.bandWidth}/${barBuild.parentSize}`;
            };
            unitLayoutProps = squareProps;
            break;
        }
    }
    footprintProps.addScaleAxes = true;
    return {
        axisScales,
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
