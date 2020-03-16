// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales } from '../interfaces';
import { defaultBins, maxbins, minBarBandWidth } from '../defaults';
import { Density, DensityProps } from '../layouts/density';
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { Square, SquareProps } from '../layouts/square';
import { BandProps, Band } from '../layouts/band';
import { AggregateContainerProps, AggregateContainer } from '../layouts/aggregateContainer';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { specColumns } = specContext;
    const axisScales: AxisScales = {
        x: { title: specColumns.x && specColumns.x.name },
        y: { title: specColumns.y && specColumns.y.name },
        z: { title: specColumns.z && specColumns.z.name }
    };
    const hBandProps: BandProps = {
        style: 'cell',
        orientation: 'horizontal',
        groupby: {
            column: specColumns.y,
            defaultBins,
            maxbinsSignalName: SignalNames.YBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
            maxbins
        },
        minBandWidth: minBarBandWidth,
        showAxes: true,
        parentHeight: 'hBandParentHeight'
    };
    const vBandProps: BandProps = {
        orientation: 'vertical',
        groupby: {
            column: specColumns.x,
            defaultBins,
            maxbinsSignalName: SignalNames.XBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
            maxbins
        },
        minBandWidth: minBarBandWidth,
        showAxes: true,
        parentHeight: 'vBandParentHeight'
    };
    const aggProps: AggregateContainerProps = {
        niceScale: true,
        dock: 'top',
        globalAggregateMaxExtentSignal: 'aggMaxExtent',
        globalAggregateMaxExtentScaledSignal: 'aggMaxExtentScaled',
        parentHeight: 'aggParentHeight',
        sumBy: specColumns.size,
        showAxes: false
    };
    const squareProps: SquareProps = {
        sortBy: specColumns.sort,
        fillDirection: 'right-down',
        z: specColumns.z,
        maxGroupedUnits: aggProps.globalAggregateMaxExtentSignal,
        maxGroupedFillSize: aggProps.globalAggregateMaxExtentScaledSignal,
        zSize: aggProps.parentHeight
    };

    return {
        axisScales,
        layouts: [
            {
                layoutClass: Band,
                props: vBandProps
            },
            {
                layoutClass: Band,
                props: hBandProps
            },
            {
                layoutClass: AggregateContainer,
                props: aggProps
            },
            {
                layoutClass: Square,
                props: squareProps
            }
        ],
        specCapabilities: {
            roles: [
                {
                    role: 'x',
                    binnable: true,
                    axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact',
                    signals: [SignalNames.XBins]
                },
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
