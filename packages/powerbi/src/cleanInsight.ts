// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { SandDance } from '@msrvida/sanddance-explorer';

export function cleanInsight(insight: SandDance.specs.Insight) {
    delete insight.size;
    delete insight.filter;
    visit(insight);
}

function visit(o: object) {
    const props = Object.keys(o);
    props.forEach(prop => {
        if (o[prop] === null) {
            delete o[prop];
        } else if (typeof o[prop] === 'object') {
            visit(o[prop]);
        }
    });
}
