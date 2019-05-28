// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SandDance } from '@msrvida/sanddance-react';

function comparableGroup(group: SandDance.types.SearchExpressionGroup): SandDance.types.SearchExpressionGroup {
    return { ...group, clause: null };
}

function compareGroup(a: SandDance.types.SearchExpressionGroup, b: SandDance.types.SearchExpressionGroup) {
    return SandDance.searchExpression.compareGroup(comparableGroup(a), comparableGroup(b));
}

export function toggleSearch(haystack: SandDance.types.SearchExpressionGroup[], needle: SandDance.types.SearchExpressionGroup) {
    const groups: SandDance.types.SearchExpressionGroup[] = [];
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
