// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { SandDance } from '@msrvida/sanddance-react';
import { schemeOption, schemesJSX } from './scheme';

let loaded = false;

function load() {
    SandDance.colorSchemes.filter(cs => cs.colors.length === 2).map((binaryScheme, i) => {
        schemesJSX[binaryScheme.scheme] = (
            <div className="swatch">
                {binaryScheme.colors.map((color, j) => (
                    <div key={j} title={color} style={{ width: '50%', backgroundColor: color }}></div>
                ))}
            </div>
        );
    });
    loaded = true;
}

export function dual(selected: string) {
    if (!loaded) load();
    return SandDance.colorSchemes.filter(cs => cs.colors.length === 2).map((binaryScheme, i) => (
        schemeOption(selected, binaryScheme.scheme)
    ));
}
