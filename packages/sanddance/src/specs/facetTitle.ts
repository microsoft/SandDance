// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Binnable } from "./bin";

export function serializeAsVegaExpression(bin: Binnable) {
    return `[${bin.fields.map(f => `datum[${JSON.stringify(f)}]`).join()}]`;
}

export function displayBin(bin: Binnable) {
    const val = (index: number) => `datum[${JSON.stringify(bin.fields[index])}]`;
    return bin.discreteColumn.column.quantitative ?
        `format(${val(0)}, '~r') + ' - ' + format(${val(1)}, '~r')`
        :
        val(0);
}

export function deserializeAsSearchExpression() {

}
