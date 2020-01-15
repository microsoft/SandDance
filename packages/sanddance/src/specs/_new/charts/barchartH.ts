// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { footprintClassFromSumStyle, unitLayoutClassFromSumStyle } from './barCommon';
import { SignalNames } from '../../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../../types';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { insight, specColumns } = specContext;
    const footprintClass = footprintClassFromSumStyle(insight.sumStyle, true);
    const unitLayoutClass = unitLayoutClassFromSumStyle(insight.sumStyle, true);
    return {
        specContext,
        footprintClass,
        unitLayoutClass,
        specCapabilities: {
            roles: [
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
                    role: 'sum',
                    allowNone: false,
                    excludeCategoric: true
                },
                {
                    role: 'facet',
                    allowNone: true
                }
            ]
        }
    };
}
