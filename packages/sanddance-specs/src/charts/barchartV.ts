// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SignalNames } from '../constants';
import { defaultBins, maxbins, minBarBandWidth } from '../defaults';
import { AxisScale, AxisScales } from '../interfaces';
import { AggregateContainerProps } from '../layouts/aggregateContainer';
import { BandProps } from '../layouts/band';
import { LayoutPair } from '../layouts/layout';
import { SquareProps } from '../layouts/square';
import { StripProps } from '../layouts/strip';
import { TreemapProps } from '../layouts/treemap';
import { allowNoneForSize } from '../size';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';

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
    const layouts: LayoutPair[] = [{
        layoutType: 'Band',
        props: bandProps
    }];
    if (insight.totalStyle === 'sum-strip-percent') {
        y.aggregate = 'percent';
        y.title = language.percent;
        const stripProps: StripProps = {
            addPercentageScale: true,
            sortOrder: 'descending',
            orientation: 'vertical',
            size: specColumns.size,
            sort: specColumns.sort,
            z: specColumns.z
        };
        layouts.push({
            layoutType: 'Strip',
            props: stripProps
        });
    } else {
        const aggProps: AggregateContainerProps = {
            niceScale: true,
            dock: 'bottom',
            globalAggregateMaxExtentSignal: 'aggMaxExtent',
            globalAggregateMaxExtentScaledSignal: 'aggMaxExtentScaled',
            sumBy: specColumns.size,
            showAxes: true
        };
        layouts.push({
            layoutType: 'AggregateContainer',
            props: aggProps
        });
        switch (insight.totalStyle) {
            case 'sum-treemap': {
                y.aggregate = 'sum';
                y.title = language.sum;
                const treemapProps: TreemapProps = {
                    corner: 'bottom-left',
                    size: specColumns.size,
                    treeMapMethod: specViewOptions.language.treeMapMethod,
                    z: specColumns.z
                };
                layouts.push({
                    layoutType: 'Treemap',
                    props: treemapProps
                });
                break;
            }
            case 'sum-strip': {
                y.aggregate = 'sum';
                y.title = language.sum;
                const stripProps: StripProps = {
                    sortOrder: 'descending',
                    orientation: 'vertical',
                    size: specColumns.size,
                    sort: specColumns.sort,
                    z: specColumns.z
                };
                layouts.push({
                    layoutType: 'Strip',
                    props: stripProps
                });
                break;
            }
            case 'count-strip': {
                y.aggregate = 'count';
                y.title = language.count;
                const stripProps: StripProps = {
                    sortOrder: 'descending',
                    orientation: 'vertical',
                    sort: specColumns.sort,
                    z: specColumns.z
                };
                layouts.push({
                    layoutType: 'Strip',
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
                    maxGroupedFillSize: aggProps.globalAggregateMaxExtentScaledSignal
                };
                layouts.push({
                    layoutType: 'Square',
                    props: squareProps
                });
                break;
            }
        }
    }
    return {
        axisScales,
        layouts,
        specCapabilities: {
            countsAndSums: true,
            percentage: true,
            roles: [
                {
                    role: 'x',
                    binnable: true,
                    axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact',
                    axisSelectionBetweenTicks: true,
                    signals: [SignalNames.XBins]
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
                    role: 'sort',
                    allowNone: true
                },
                {
                    role: 'size',
                    allowNone: allowNoneForSize,
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
