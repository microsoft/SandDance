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
        orientation: 'horizontal',
        groupby: {
            column: specColumns.y,
            defaultBins,
            maxbinsSignalName: SignalNames.YBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
            maxbins
        },
        minBandWidth: minBarBandWidth,
        showAxes: true
    };
    const x: AxisScale = { title: null };
    const axisScales: AxisScales = {
        x,
        y: { title: specColumns.y && specColumns.y.name },
        z: { title: specColumns.z && specColumns.z.name }
    };
    const layouts: LayoutPair[] = [
        {
            layoutClass: Band,
            props: bandProps
        }
    ];
    if (insight.sumStyle === 'strip-percent') {
        x.aggregate = 'percent';
        x.title = language.percent;
        const stripProps: StripProps = { orientation: 'vertical' };
        layouts.push({
            layoutClass: Strip,
            props: stripProps
        });
    } else {
        const aggProps: AggregateContainerProps = {
            niceScale: true,
            dock: 'left',
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
                x.aggregate = 'sum';
                x.title = language.sum;
                const treemapProps: TreemapProps = {
                    corner: 'top-left',
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
                x.aggregate = 'sum';
                x.title = language.sum;
                const stripProps: StripProps = { orientation: 'vertical' };
                layouts.push({
                    layoutClass: Strip,
                    props: stripProps
                });
                break;
            }
            default: {
                x.aggregate = 'count';
                x.title = language.count;
                const squareProps: SquareProps = {
                    sortBy: specColumns.sort,
                    fillDirection: 'down-right',
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
