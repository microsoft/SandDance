// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Grid } from '../unitLayouts/grid';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../../types';
import { Whole } from '../footprints/whole';

export default function (specContext: SpecContext): SpecBuilderProps {
    return {
        specContext,
        footprintClass: Whole,
        unitLayoutClass: Grid,
        specCapabilities: {
            roles: [
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
