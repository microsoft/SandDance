// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Column } from "./types";
import { BinTransform, ExtentTransform, Transforms } from "vega-typings";

export function binnable(column: Column, maxbins: number): { transforms: Transforms[], field: string, binSignal: string } {
    if (column.quantitative) {
        const field = `bin_${column.name}`;
        const binSignal = `${field}_bins`;
        const extentSignal = `${field}_extent`;
        const extentTransform: ExtentTransform = {
            type: 'extent',
            field: column.name,
            signal: extentSignal
        };
        const binTransform: BinTransform = {
            type: 'bin',
            field: column.name,
            as: [
                field,
                `${field}_end`,
            ],
            signal: binSignal,
            extent: {
                signal: extentSignal
            },
            maxbins
        };
        return { transforms: [extentTransform, binTransform], field, binSignal };
    } else {
        return { transforms: null, field: column.name, binSignal: null };
    }
}
