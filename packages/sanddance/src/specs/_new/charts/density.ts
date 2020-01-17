// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Density, DensityProps } from '../footprints/density';
import { Grid } from '../unitLayouts/grid';
import { SignalNames } from '../../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../../types';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { specColumns } = specContext;
    return {
        specContext,
        footprintClass: Density,
        footprintProps: { mode: 'square' } as DensityProps,
        unitLayoutClass: Grid,
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
