/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { SandDance } from '@msrvida/sanddance-react';

import SearchExpressionGroup = SandDance.searchExpression.SearchExpressionGroup;

function comparableGroup(group: SearchExpressionGroup): SearchExpressionGroup {
    return { ...group, clause: null };
}

function compareGroup(a: SearchExpressionGroup, b: SearchExpressionGroup) {
    return SandDance.searchExpression.compareGroup(comparableGroup(a), comparableGroup(b));
}

export function compareGroups(haystack: SearchExpressionGroup[], needle: SearchExpressionGroup) {
    const groups: SearchExpressionGroup[] = [];
    let found = false;

    //look for item in all
    haystack.forEach(group => {
        if (compareGroup(group, needle)) {
            //if it exists, don't add it
            found = true;

            console.log('compareGroups found ===========================')
            console.log('compareGroups found haystack', JSON.stringify(haystack))
            console.log('compareGroups found needle', JSON.stringify(needle))
            console.log('compareGroups found')
        } else {
            groups.push(group);
        }
    });

    console.log('compareGroups exit', found)
    return { groups, found };
}
