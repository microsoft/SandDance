/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { AxisScales } from '../interfaces';
import { BandProps } from '../layouts/band';
import { defaultBins, maxbins, minBarBandWidth } from '../defaults';
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { StackProps } from '../layouts/stack';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { insight, specColumns, specViewOptions } = specContext;
    const axisScales: AxisScales = {
        x: { title: specColumns.x?.name },
        y: { title: specColumns.y?.name },
        z: { title: specViewOptions.language.count },
    };
    const backgroundImage =  specColumns.x?.quantitative && specColumns.y?.quantitative && insight.backgroundImage?.extents && insight.backgroundImage;
    const showAxes = !backgroundImage;
    const hBandProps: BandProps = {
        excludeEncodingRuleMap: true,
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
        outerSignalExtents: backgroundImage && { max: backgroundImage.extents.top, min: backgroundImage.extents.bottom },
    };
    const vBandProps: BandProps = {
        excludeEncodingRuleMap: true,
        orientation: 'vertical',
        groupby: {
            column: specColumns.x,
            defaultBins,
            maxbinsSignalName: SignalNames.XBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
            maxbins,
        },
        minBandWidth: minBarBandWidth,
        showAxes,
        outerSignalExtents: backgroundImage && { max: backgroundImage.extents.right, min: backgroundImage.extents.left },
    };
    const stackProps: StackProps = {
        sort: specColumns.sort,
        showAxes,
    };
    return {
        axisScales,
        customZScale: true,
        layouts: [
            {
                layoutType: 'Band',
                props: vBandProps,
            },
            {
                layoutType: 'Band',
                props: hBandProps,
            },
            {
                layoutType: 'Stack',
                props: stackProps,
            },
        ],
        specCapabilities: {
            backgroundImage: true,
            countsAndSums: false,
            roles: [
                {
                    role: 'x',
                    binnable: true,
                    axisSelection: specColumns.x?.quantitative ? 'range' : 'exact',
                    axisSelectionBetweenTicks: true,
                    signals: [SignalNames.XBins],
                },
                {
                    role: 'y',
                    binnable: true,
                    axisSelection: specColumns.y?.quantitative ? 'range' : 'exact',
                    axisSelectionBetweenTicks: true,
                    signals: [SignalNames.YBins],
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
