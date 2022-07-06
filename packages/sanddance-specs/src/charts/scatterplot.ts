// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales } from '../interfaces';
import { ScatterProps } from '../layouts/scatter';
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { insight, specColumns, specViewOptions } = specContext;
    const backgroundImageExtents =  specColumns.x?.quantitative && specColumns.y?.quantitative && insight.backgroundImage?.extents;
    const scatterProps: ScatterProps = {
        x: specColumns.x,
        y: specColumns.y,
        z: specColumns.z,
        size: specColumns.size,
        scatterPointScaleDisplay: specViewOptions.language.scatterPointScale,
        zGrounded: specViewOptions.language.zGrounded,
        backgroundImageExtents,
        showAxes: !backgroundImageExtents,
    };
    const axisScales: AxisScales = {
        x: { title: specColumns.x?.name },
        y: { title: specColumns.y?.name },
        z: { title: specColumns.z?.name },
    };
    return {
        axisScales,
        layouts: [
            {
                layoutType: 'Scatter',
                props: scatterProps,
            },
        ],
        specCapabilities: {
            backgroundImage: true,
            countsAndSums: false,
            roles: [
                {
                    role: 'x',
                    axisSelection: specColumns.x?.quantitative ? 'range' : 'exact',
                },
                {
                    role: 'y',
                    axisSelection: specColumns.y?.quantitative ? 'range' : 'exact',
                },
                {
                    role: 'z',
                    axisSelection: specColumns.z?.quantitative ? 'range' : 'exact',
                    allowNone: true,
                },
                {
                    role: 'color',
                    allowNone: true,
                },
                {
                    role: 'size',
                    excludeCategoric: true,
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
            signals: [SignalNames.PointScale, SignalNames.ZGrounded],
        },
    };
}
