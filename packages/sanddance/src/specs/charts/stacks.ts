// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales } from '../interfaces';
import { defaultBins, maxbins } from '../defaults';
import { Density, DensityProps } from '../layouts/density';
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { Stack } from '../layouts/stack';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { specColumns } = specContext;
    const axisScales: AxisScales = {
        x: { title: specColumns.x && specColumns.x.name },
        y: { title: specColumns.y && specColumns.y.name }
    };
    const densityProps: DensityProps = {
        mode: 'cube',
        groupbyX: {
            column: specColumns.x,
            defaultBins,
            maxbins,
            maxbinsSignalDisplayName: 'TODO maxbins x',
            maxbinsSignalName: 'TODO maxbins x'
        },
        groupbyY: {
            column: specColumns.y,
            defaultBins,
            maxbins,
            maxbinsSignalDisplayName: 'TODO maxbins y',
            maxbinsSignalName: 'TODO maxbins y'
        },
        addScaleAxes: true
    };
    return {
        axisScales,
        customZScale: true,
        layouts: [
            {
                layoutClass: Density,
                props: densityProps,
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
