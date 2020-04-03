// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from '@msrvida/vega-deck.gl';
import { push } from './array';
import { SearchExpressionGroup } from '@msrvida/search-expression';

export function getSearchGroupFromVegaValue(search: any) {
    let group: SearchExpressionGroup;
    const vegaSearch: SearchExpressionGroup | SearchExpressionGroup[] = search;
    if (Array.isArray(vegaSearch)) {
        //flatten into one group
        group = { expressions: [] };
        vegaSearch.forEach(g => {
            const clonedExpressions = VegaDeckGl.util.clone(g.expressions).filter(Boolean);
            clonedExpressions[0].clause = '&&';
            push(group.expressions, clonedExpressions);
        });
    }
    else {
        group = vegaSearch ?
            { expressions: vegaSearch.expressions.filter(Boolean) }
            : null;
    }
    return group;
}

