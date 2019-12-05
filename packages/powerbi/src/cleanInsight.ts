// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { SandDance } from '@msrvida/sanddance-explorer';

export function cleanInsight(insight: SandDance.types.Insight) {
    delete insight.size;
    visit(insight);
}

function visit(o: object) {
    for (let prop in o) {
        if (o[prop] === null) {
            delete o[prop];
        } else if (typeof o[prop] === 'object') {
            visit(o[prop]);
        }
    }
}
