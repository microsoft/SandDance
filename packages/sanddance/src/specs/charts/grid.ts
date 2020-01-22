// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Square, SquareProps } from '../layouts/square';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';

export default function (specContext: SpecContext): SpecBuilderProps {
    return {
        specContext,
        layouts: [
            {
                layoutClass: Square,
                props: { fillDirection: 'right-down' } as SquareProps
            }
        ],
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
