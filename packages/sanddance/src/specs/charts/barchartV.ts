// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AggregateContainer, AggregateContainerProps } from '../layouts/aggregateContainer';
import { AxisScale, AxisScales } from '../interfaces';
import { Band, BandProps } from '../layouts/band';
import { defaultBins, maxbins, minBarBandWidth } from '../defaults';
import { LayoutPair } from '../layouts/layout';
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { Square, SquareProps } from '../layouts/square';
import { Strip, StripProps } from '../layouts/strip';
import { Treemap, TreemapProps } from '../layouts/treemap';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { insight, specColumns, specViewOptions } = specContext;
    const { language } = specViewOptions;
    const bandProps: BandProps = {
        orientation: 'vertical',
        groupby: {
            column: specColumns.x,
            defaultBins,
            maxbinsSignalName: SignalNames.XBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
            maxbins
        },
        minBandWidth: minBarBandWidth,
        showAxes: true
    };
    const y: AxisScale = { title: null };
    const axisScales: AxisScales = {
        x: { title: specColumns.x && specColumns.x.name },
        y,
        z: { title: specColumns.z && specColumns.z.name }
    };
    const layouts: LayoutPair[] = [
        {
            layoutClass: Band,
            props: bandProps
        }
    ];
    if (insight.sumStyle === 'strip-percent') {
        y.aggregate = 'percent';
        y.title = language.percent;
        const stripProps: StripProps = { orientation: 'horizontal' };
        layouts.push({
            layoutClass: Strip,
            props: stripProps
        });
    } else {
        const aggProps: AggregateContainerProps = {
            niceScale: true,
            dock: 'bottom',
            globalAggregateMaxExtentSignal: 'globalAggregateMaxExtent',
            globalAggregateMaxExtentScaledSignal: 'globalAggregateMaxExtentScaled',
            parentHeight: 'parentSize',
            sumBy: specColumns.size,
            showAxes: true
        };
        layouts.push({
            layoutClass: AggregateContainer,
            props: aggProps
        });
        switch (insight.sumStyle) {
            case 'treemap': {
                //TODO disable sort
                y.aggregate = 'sum';
                y.title = language.sum;
                const treemapProps: TreemapProps = {
                    corner: 'bottom-left',
                    size: specColumns.size,
                    treeMapMethod: specViewOptions.language.treeMapMethod,
                    z: specColumns.z,
                    zSize: aggProps.parentHeight
                };
                layouts.push({
                    layoutClass: Treemap,
                    props: treemapProps
                });
                break;
            }
            case 'strip': {
                y.aggregate = 'sum';
                y.title = language.sum;
                const stripProps: StripProps = { orientation: 'horizontal' };
                layouts.push({
                    layoutClass: Strip,
                    props: stripProps
                });
                break;
            }
            default: {
                y.aggregate = 'count';
                y.title = language.count;
                const squareProps: SquareProps = {
                    sortBy: specColumns.sort,
                    fillDirection: 'right-up',
                    z: specColumns.z,
                    maxGroupedUnits: aggProps.globalAggregateMaxExtentSignal,
                    maxGroupedFillSize: aggProps.globalAggregateMaxExtentScaledSignal,
                    zSize: aggProps.parentHeight
                };
                layouts.push({
                    layoutClass: Square,
                    props: squareProps
                })
                break;
            }
        }
    }
    return {
        axisScales,
        layouts,
        specCapabilities: {
            roles: [
                {
                    role: 'x',
                    binnable: true,
                    axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact',
                    signals: [SignalNames.XBins]
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
                    role: 'size',
                    allowNone: true,
                    excludeCategoric: true,
                    signals: [SignalNames.TreeMapMethod]
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
            ]
        }
    };
}
