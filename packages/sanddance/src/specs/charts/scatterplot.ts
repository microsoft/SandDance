// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Scatter } from '../unitLayouts/scatter';
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { Whole } from '../footprints/whole';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { specColumns } = specContext;
    return {
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
