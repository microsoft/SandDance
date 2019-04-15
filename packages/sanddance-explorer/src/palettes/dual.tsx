// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { SandDance } from '@msrvida/sanddance-react';
import { schemeOption, schemesJSX } from './scheme';

SandDance.colorSchemes.filter(cs => cs.colors.length === 2).map((binaryScheme, i) => {
    schemesJSX[binaryScheme.scheme] = (
        <div className="swatch">
            {binaryScheme.colors.map((color, j) => (
                <div key={j} title={color} style={{ width: '50%', backgroundColor: color }}></div>
            ))}
        </div>
    );
});

export function dual(selected: string) {
    return SandDance.colorSchemes.filter(cs => cs.colors.length === 2).map((binaryScheme, i) => (
        schemeOption(selected, binaryScheme.scheme)
    ));
}
