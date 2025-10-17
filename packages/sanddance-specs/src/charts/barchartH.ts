/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

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
    const showAxes = !insight.hideAxes;
    const bandProps: BandProps = {
        orientation: 'horizontal',
        groupby: {
            column: specColumns.y,
            defaultBins,
            maxbinsSignalName: SignalNames.YBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
            maxbins,
        },
        minBandWidth: minBarBandWidth,
        showAxes,
    };
    const x: AxisScale = { title: null };
    const axisScales: AxisScales = {
        x,
        y: { title: specColumns.y?.name },
        z: { title: specColumns.z?.name },
    };
    const layouts: LayoutPair[] = [{
        layoutType: 'Band',
        props: bandProps,
    }];
    const { totalStyle, view } = insight;
    if (totalStyle === 'sum-strip-percent') {
        x.aggregate = 'percent';
        x.title = language.percent;
        const stripProps: StripProps = {
            addPercentageScale: true,
            sortOrder: 'ascending',
            orientation: 'horizontal',
            size: specColumns.size,
            sort: specColumns.sort,
            z: specColumns.z,
            showAxes,
            view,
        };
        layouts.push({
            layoutType: 'Strip',
            props: stripProps,
        });
    } else {
        const aggProps: AggregateContainerProps = {
            dock: 'left',
            globalAggregateMaxExtentSignal: 'aggMaxExtent',
            globalAggregateMaxExtentScaledSignal: 'aggMaxExtentScaled',
            sumBy: specColumns.size,
            showAxes,
        };
        layouts.push({
            layoutType: 'AggregateContainer',
            props: aggProps,
        });
        switch (totalStyle) {
            case 'sum-treemap': {
                x.aggregate = 'sum';
                x.title = language.sum;
                const treemapProps: TreemapProps = {
                    corner: 'top-left',
                    size: specColumns.size,
                    treeMapMethod: specViewOptions.language.treeMapMethod,
                    z: specColumns.z,
                    showAxes,
                    view,
                };
                layouts.push({
                    layoutType: 'Treemap',
                    props: treemapProps,
                });
                break;
            }
            case 'sum-strip': {
                x.aggregate = 'sum';
                x.title = language.sum;
                const stripProps: StripProps = {
                    sortOrder: 'ascending',
                    orientation: 'horizontal',
                    size: specColumns.size,
                    sort: specColumns.sort,
                    z: specColumns.z,
                    showAxes,
                    view,
                };
                layouts.push({
                    layoutType: 'Strip',
                    props: stripProps,
                });
                break;
            }
            case 'count-strip': {
                x.aggregate = 'count';
                x.title = language.count;
                const stripProps: StripProps = {
                    sortOrder: 'ascending',
                    orientation: 'horizontal',
                    size: specColumns.size,
                    sort: specColumns.sort,
                    z: specColumns.z,
                    showAxes,
                    view,
                };
                layouts.push({
                    layoutType: 'Strip',
                    props: stripProps,
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
                    showAxes,
                    view,
                };
                layouts.push({
                    layoutType: 'Square',
                    props: squareProps,
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
            signals: totalStyle !== 'sum-strip-percent' ? [SignalNames.ScaleNice] : undefined,
            roles: [
                {
                    role: 'y',
                    binnable: true,
                    axisSelection: specColumns.y?.quantitative ? 'range' : 'exact',
                    axisSelectionBetweenTicks: true,
                    signals: [SignalNames.YBins],
                },
                {
                    role: 'z',
                    axisSelection: specColumns.z?.quantitative ? 'range' : 'exact',
                    allowNone: true,
                    disabled: view === '2d',
                },
                {
                    role: 'color',
                    allowNone: true,
                },
                {
                    role: 'sort',
                    allowNone: true,
                },
                {
                    role: 'size',
                    allowNone: allowNoneForSize,
                    excludeCategoric: true,
                    signals: [SignalNames.TreeMapMethod],
                },
                {
                    role: 'facet',
                    allowNone: true,
                    signals: [SignalNames.FacetBins],
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [SignalNames.FacetVBins],
                },
            ],
        },
    };
}
