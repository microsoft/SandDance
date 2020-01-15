// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Scatter } from '../unitLayouts/scatter';
import { SignalNames } from '../../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../../types';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { specColumns } = specContext;
    return {
        specContext,
        footprintClass: null,
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
                    role: 'sort',
                    allowNone: true
                },
                {
                    role: 'facet',
                    allowNone: true
                }
            ],
            signals: [SignalNames.PointSize]
        }
    };
}
