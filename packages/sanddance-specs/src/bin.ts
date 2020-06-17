// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { FieldNames } from './constants';
import { exprSafeFieldName, safeFieldName } from './expr';
import { DiscreteColumn } from './interfaces';
import {
    BinTransform,
    Data,
    ExtentTransform,
    Signal,
    Transforms
} from 'vega-typings';

export interface BaseBinnable {
    fields: string[];
    domainDataName: string;
    fullScaleDataname: string;
    discreteColumn: DiscreteColumn;
}

export interface NativeBinnable extends BaseBinnable {
    native: true;
}

export interface AugmentBinnable extends BaseBinnable {
    native: false;
    transforms: Transforms[];
    binSignal: string;
    maxbinsSignal: Signal;
    dataSequence: Data;
}

export type Binnable = NativeBinnable | AugmentBinnable;

export function binnable(prefix: string, domainDataName: string, discreteColumn: DiscreteColumn): Binnable {
    const { column, defaultBins, maxbins, maxbinsSignalDisplayName, maxbinsSignalName } = discreteColumn;
    if (column.quantitative) {
        const field = `${prefix}_bin_${exprSafeFieldName(column.name)}`;
        const fieldEnd = `${field}_end`;
        const binSignal = `${field}_bins`;
        const extentSignal = `${field}_bin_extent`;
        domainDataName = `${field}_sequence`;   //override the data name
        const extentTransform: ExtentTransform = {
            type: 'extent',
            field: safeFieldName(column.name),
            signal: extentSignal
        };
        const maxbinsSignal: Signal = {
            name: maxbinsSignalName,
            value: defaultBins,
            bind: {
                name: maxbinsSignalDisplayName,
                debounce: 50,
                input: 'range',
                min: 1,
                max: maxbins,
                step: 1
            }
        };
        const binTransform: BinTransform = {
            type: 'bin',
            field: safeFieldName(column.name),
            as: [
                field,
                fieldEnd,
            ],
            signal: binSignal,
            extent: {
                signal: extentSignal
            },
            maxbins: {
                signal: maxbinsSignalName
            }
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
                },
                {
                    type: 'formula',
                    expr: `datum.data + ${binSignal}.step`,
                    as: fieldEnd
                },
                {
                    type: 'window',
                    ops: ['row_number'],
                    as: [FieldNames.Ordinal]
                },
                {
                    type: 'formula',
                    expr: `datum.data === ${binSignal}.start`,
                    as: FieldNames.First
                },
                {
                    type: 'formula',
                    expr: `datum.data === ${binSignal}.stop - ${binSignal}.step`,
                    as: FieldNames.Last
                }
            ]
        };
        return {
            discreteColumn,
            native: false,
            transforms: [extentTransform, binTransform],
            fields: [field, fieldEnd],
            binSignal,
            dataSequence,
            domainDataName,
            maxbinsSignal,
            fullScaleDataname: dataSequence.name
        };
    } else {
        return {
            discreteColumn,
            native: true,
            fields: [column.name],
            domainDataName,
            fullScaleDataname: domainDataName
        };
    }
}
