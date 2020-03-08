// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Binnable } from "./bin";
import { FieldNames } from "./constants";

export function displayBin(bin: Binnable) {
    const val = (index: number) => `datum[${JSON.stringify(bin.fields[index])}]`;
    return bin.discreteColumn.column.quantitative ?
        `format(${val(0)}, '~r') + ' - ' + format(${val(1)}, '~r')`
        :
        val(0);
}

export function serializeAsVegaExpression(bin: Binnable) {
    let nameValues: string[];
    if (bin.discreteColumn.column.quantitative) {
        //between
        //column: Column, facetRange: any[], isFirst: boolean, isLast: boolean
        nameValues = [
            `op:'between'`,
            `col:${JSON.stringify(bin.discreteColumn.column.name)}`,
            `val:[datum[${JSON.stringify(bin.fields[0])}], datum[${JSON.stringify(bin.fields[1])}]]`,
            `first:datum[${JSON.stringify(FieldNames.First)}]`,
            `last:datum[${JSON.stringify(FieldNames.Last)}]`
        ];
    } else {
        //exact
        //column: Column, value: SearchExpressionValue
        nameValues = [
            `op:'exact'`,
            `col:${JSON.stringify(bin.discreteColumn.column.name)}`,
            `val:datum[${JSON.stringify(bin.fields[0])}]`
        ];
    }
    return `{${nameValues.join()}}`;
}

export function compoundExpression(bins: Binnable[]) {
    const binsString = bins.map(bin => serializeAsVegaExpression(bin));
    const nameValues = [
        `op:'and'`,
        `exs:[${binsString.join()}]`
    ];
    return `{${nameValues.join()}}`;
}

export function deserializeAsSearchExpression() {

}
