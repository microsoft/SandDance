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

function obj(nameValues: string[], clause?: string) {
    if (clause) {
        nameValues = [clause, ...nameValues];
    }
    return `{${nameValues.join()}}`;
}

export function serializeAsVegaExpression(bin: Binnable, clause?: string) {
    if (bin.discreteColumn.column.quantitative) {
        const low = [
            `name:${JSON.stringify(bin.discreteColumn.column.name)}`,
            `operator:'>='`,
            `value:datum[${JSON.stringify(bin.fields[0])}]`
        ];
        const high = [
            `clause:'&&'`,
            `name:${JSON.stringify(bin.discreteColumn.column.name)}`,
            `operator:'<'`,
            `value:datum[${JSON.stringify(bin.fields[1])}]`
        ];
        return obj([
            `expressions:[ datum[${JSON.stringify(FieldNames.First)}] ? null : ${obj(low)}, datum[${JSON.stringify(FieldNames.Last)}] ? null : ${obj(high)}]`
        ], clause);
    } else {
        const exact = [
            `name:${JSON.stringify(bin.discreteColumn.column.name)}`,
            `operator:'=='`,
            `value:datum[${JSON.stringify(bin.fields[0])}]`
        ];
        return obj([
            `expressions:[${obj(exact)}]`
        ], clause);
    }
}
