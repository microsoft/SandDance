// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales, SpecBuilderProps } from '../specBuilder';
import { Density, DensityProps } from '../layouts/density';
import { SignalNames } from '../constants';
import { SpecContext } from '../types';
import { Square } from '../layouts/square';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { specColumns } = specContext;
    const axisScales: AxisScales = {
        x: { discrete: true },
        y: { discrete: true },
        z: { discrete: false }
    };
    const densityProps: DensityProps = {
        mode: 'square',
        groupbyX: specColumns.x,
        groupbyY: specColumns.y
    };
    return {
        axisScales,
        specContext,
        layouts: [
            {
                layoutClass: Density,
                props: densityProps
            },
            {
                layoutClass: Square
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
