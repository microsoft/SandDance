// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as powerbiModels from 'powerbi-models';
import powerbiVisualsApi from 'powerbi-visuals-api';
import { SandDance } from '@msrvida/sanddance-explorer';

export function convertFilter(searchFilter: SandDance.types.Search, columns: powerbiVisualsApi.DataViewMetadataColumn[]) {
    // const convertGroup = (group: SandDance.types.SearchExpressionGroup): powerbiModels.IFilter => {
    //     const target: powerbiModels.ITupleFilterTarget = [];
    //     const values: powerbiModels.ITupleElementValue[][] = [];
    //     group.expressions.forEach(ex => {
    //         target.push({
    //             table: "DataTable",
    //             column: "State"
    //         });

    //         values.push(
    //             [
    //                 {
    //                     value: "Texas"
    //                 }
    //             ]
    //         );
    //     });
    //     let filter: powerbiModels.ITupleFilter = {
    //         $schema: "https://powerbi.com/product/schema#tuple",
    //         filterType: powerbiModels.FilterType.Tuple,
    //         operator: "In",
    //         target,
    //         values
    //     };
    //     return filter;
    // };
    // const groups = SandDance.util.ensureSearchExpressionGroupArray(searchFilter);
    // const filters = groups.map(convertGroup);
    const table = columns[0].queryName.substr(0, columns[0].queryName.indexOf('.')); // table
    const filters = [convertFilterBasic(searchFilter, table).toJSON()];
    return filters;
}


function convertFilterAdvanced(filter: SandDance.types.Search, table: string): powerbiModels.AdvancedFilter {
    const a = new powerbiModels.AdvancedFilter(null, null, null);


    return null;
}

function convertFilterBasic(filter: SandDance.types.Search, table: string) {
    const b = new powerbiModels.BasicFilter({ table, column: 'State' }, 'In', ['Texas', 'Ohio']);
    return b;
}
