// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    BinTransform,
    Data,
    ExtentTransform,
    Transforms
} from 'vega-typings';
import { Column } from './types';

export interface Binnable {
    transforms?: Transforms[];
    field: string;
    binSignal?: string;
    domainDataName?: string;
    dataSequence?: Data;
}

export function binnable(domainDataName: string, column: Column, maxbins: number): Binnable {
    if (column.quantitative) {
        const field = `bin_${column.name}`;
        const binSignal = `${field}_bins`;
        const extentSignal = `${field}_extent`;
        domainDataName = `${field}_sequence`;
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
        const dataSequence: Data = {
            name: domainDataName,
            transform: [
                {
                    type: 'sequence',
                    start: {
                        signal: `${binSignal}.start`
                    },
                    stop: {
                        signal: `${binSignal}.stop`
                    },
                    step: {
                        signal: `${binSignal}.step`
                    }
                },
                {
                  type: 'formula',
                  expr: 'datum.data',
                  as: field
                }
            ]
        };
        return {
            transforms: [extentTransform, binTransform],
            field,
            binSignal,
            dataSequence,
            domainDataName
        };
    } else {
        return {
            field: column.name,
            domainDataName
        };
    }
}
