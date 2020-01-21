// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales, SpecBuilderProps } from '../specBuilder';
import { Density, DensityProps } from '../layouts/density';
import { SignalNames } from '../constants';
import { SpecContext } from '../types';
import { Stack } from '../layouts/stack';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { specColumns } = specContext;
    const axisScales: AxisScales = {
        x: { discrete: true },
        y: { discrete: true },
        z: { discrete: false, aggregate: 'multiply' }
    };
    return {
        axisScales,
        customZScale: true,
        specContext,
        layouts: [
            {
                layoutClass: Density,
                props: { mode: 'cube' } as DensityProps,
            },
            {
                layoutClass: Stack
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
