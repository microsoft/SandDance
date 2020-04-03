// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SandDance } from '@msrvida/sanddance-react';

import SearchExpressionGroup = SandDance.searchExpression.SearchExpressionGroup;

function comparableGroup(group: SearchExpressionGroup): SearchExpressionGroup {
    return { ...group, clause: null };
}

function compareGroup(a: SearchExpressionGroup, b: SearchExpressionGroup) {
    return SandDance.searchExpression.compareGroup(comparableGroup(a), comparableGroup(b));
}

export function toggleSearch(haystack: SearchExpressionGroup[], needle: SearchExpressionGroup) {
    const groups: SearchExpressionGroup[] = [];
    let found = false;

    //look for item in all
    haystack.forEach(group => {
        if (compareGroup(group, needle)) {
            //if it exists, don't add it
            found = true;
        } else {
            groups.push(group);
        }
    });

    return { groups, found };
}
