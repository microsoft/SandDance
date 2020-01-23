// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales } from '../interfaces';
import { Scatter } from '../layouts/scatter';
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { specColumns } = specContext;
    const axisScales: AxisScales = {
        x: { type: 'continuous' },
        y: { type: 'continuous' },
        z: { type: 'zFree' }
    };
    return {
        axisScales,
        layouts: [
            {
                layoutClass: Scatter,
                props: { addScaleAxes: true }
            }
        ],
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
