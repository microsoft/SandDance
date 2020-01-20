// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales, SpecBuilderProps } from '../specBuilder';
import { Scatter } from '../unitLayouts/scatter';
import { SignalNames } from '../constants';
import { SpecContext } from '../types';
import { Whole } from '../layouts/whole';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { specColumns } = specContext;
    const axisScales: AxisScales = {
        x: { discrete: false },
        y: { discrete: false },
        z: { discrete: false }
    };
    return {
        axisScales,
        specContext,
        footprintClass: Whole,
        unitLayoutClass: Scatter,
        specCapabilities: {
            roles: [
                {
                    role: 'x',
                    axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact'
                },
                {
                    role: 'y',
                    axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact'
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
                    role: 'facet',
                    allowNone: true
                },
                {
                    role: 'facetV',
                    allowNone: true
                }
            ],
            signals: [SignalNames.PointSize]
        }
    };
}
