/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { AggregateContainerProps } from '../layouts/aggregateContainer.js';
import { AxisScales } from '../interfaces.js';
import { LayoutPair } from '../layouts/layout.js';
import { SignalNames } from '../constants.js';
import { SpecBuilderProps } from '../specBuilder.js';
import { SpecContext } from '../types.js';
import { StripProps } from '../layouts/strip.js';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { insight, specColumns } = specContext;
    const { view } = insight;
    const stripProps: StripProps = {
        sortOrder: 'ascending',
        orientation: 'vertical',
        size: specColumns.size,
        sort: specColumns.sort,
        z: specColumns.z,
        showAxes: !insight.hideAxes,
        view,
    };
    const axisScales: AxisScales = {
        z: { title: specColumns.z && specColumns.z.name },
    };
    const layouts: LayoutPair[] = [];
    if (specColumns.facet) {
        axisScales.y = {
            title: null,
            aggregate: specColumns.size ? 'sum' : 'count',
        };
        const globalAggregateMaxExtentScaledSignal = 'globalAggregateMaxExtentScaledSignal';
        const globalAggregateMaxExtentSignal = 'globalAggregateMaxExtentSignal';
        const props: AggregateContainerProps = {
            dock: 'top',
            niceScale: false,
            globalAggregateMaxExtentScaledSignal,
            globalAggregateMaxExtentSignal,
            sumBy: specColumns.size,
            showAxes: false,
        };
        layouts.push({
            layoutType: 'AggregateContainer',
            props,
        });
    }
    layouts.push({
        layoutType: 'Strip',
        props: stripProps,
    });
    return {
        axisScales,
        layouts,
        specCapabilities: {
            countsAndSums: false,
            roles: [
                {
                    role: 'size',
                    allowNone: true,        //size by none is a count
                    excludeCategoric: true,
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
