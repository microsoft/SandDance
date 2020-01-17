// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Square, SquareProps } from '../unitLayouts/square';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { Whole } from '../layouts/whole';

export default function (specContext: SpecContext): SpecBuilderProps {
    return {
        specContext,
        footprintClass: Whole,
        unitLayoutClass: Square,
        unitLayoutProps: { growDirection: 'right-down' } as SquareProps,
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
