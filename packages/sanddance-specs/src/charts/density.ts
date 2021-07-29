// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SignalNames } from '../constants';
import { defaultBins, maxbins, minBarBandWidth } from '../defaults';
import { AxisScales } from '../interfaces';
import { AggregateSquareProps } from '../layouts/aggregateSquare';
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
    const axisScales: AxisScales = {
        x: { title: specColumns.x && specColumns.x.name },
        y: { title: specColumns.y && specColumns.y.name },
        z: { title: specColumns.z && specColumns.z.name }
    };
    const hBandProps: BandProps = {
        excludeEncodingRuleMap: true,
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
    const vBandProps: BandProps = {
        excludeEncodingRuleMap: true,
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
    const aggProps: AggregateSquareProps = {
        onBuild: null,
        aggregation: null,
        sumBy: specColumns.size
    };
    const layouts: LayoutPair[] = [
        {
            layoutType: 'Band',
            props: vBandProps
        },
        {
            layoutType: 'Band',
            props: hBandProps
        },
        {
            layoutType: 'AggregateSquare',
            props: aggProps
        }
    ];
    switch (insight.totalStyle) {
        case 'sum-treemap': {
            aggProps.aggregation = 'sum';
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
            aggProps.aggregation = 'sum';
            const stripProps: StripProps = {
                sortOrder: 'ascending',
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
            aggProps.aggregation = 'count';
            const stripProps: StripProps = {
                sortOrder: 'ascending',
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
            aggProps.aggregation = 'count';
            const squareProps: SquareProps = {
                sortBy: specColumns.sort,
                fillDirection: 'right-down',
                z: specColumns.z,
                maxGroupedUnits: null,
                maxGroupedFillSize: null
            };
            aggProps.onBuild = (aggMaxExtent, aggMaxExtentScaled) => {
                squareProps.maxGroupedUnits = aggMaxExtent;
                squareProps.maxGroupedFillSize = aggMaxExtentScaled;
            };
            layouts.push({
                layoutType: 'Square',
                props: squareProps
            });
            break;
        }
    }
    return {
        axisScales,
        layouts,
        specCapabilities: {
            countsAndSums: true,
            roles: [
                {
                    role: 'x',
                    binnable: true,
                    axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact',
                    axisSelectionBetweenTicks: true,
                    signals: [SignalNames.XBins]
                },
                {
                    role: 'y',
                    binnable: true,
                    axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
                    axisSelectionBetweenTicks: true,
                    signals: [SignalNames.YBins]
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
