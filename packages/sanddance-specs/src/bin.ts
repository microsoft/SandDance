/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { FieldNames } from './constants.js';
import { exprSafeFieldName, safeFieldName } from './expr.js';
import { DiscreteColumn } from './interfaces.js';
import {
    BinTransform,
    Data,
    Signal,
    Transforms,
} from 'vega-typings';
import { debounce } from './defaults.js';
import { dataExtent } from './transforms.js';
import { Column } from '@msrvida/chart-types';

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
    extentSignal: string;
    signals: Signal[];
    dataSequence: Data;
}

export type Binnable = NativeBinnable | AugmentBinnable;

export function binnable(prefix: string, domainDataName: string, discreteColumn: DiscreteColumn, outerSignalExtents?: { min: number, max: number }): Binnable {
    const { column, defaultBins, maxbins, maxbinsSignalDisplayName, maxbinsSignalName } = discreteColumn;
    if (column.quantitative) {
        const field = `${prefix}_bin_${exprSafeFieldName(column.name)}`;
        const fieldEnd = `${field}_end`;
        const binSignal = `${field}_bins`;
        const dataExtentSignal = `${field}_bin_extent`;
        const dataExtentSpanSignal = `${field}_bin_extent_span`;
        const outerSignal = `${field}_outer_extent`;
        domainDataName = `${field}_sequence`;   //override the data name
        const extentTransform = dataExtent(column, dataExtentSignal);
        let imageSignal: Signal;
        if (outerSignalExtents) {
            imageSignal = outerExtentSignal(outerSignal, outerSignalExtents.min, outerSignalExtents.max, dataExtentSignal);
        }
        const maxbinsSignal: Signal = {
            name: maxbinsSignalName,
            value: defaultBins,
            bind: {
                name: maxbinsSignalDisplayName,
                debounce,
                input: 'range',
                min: 1,
                max: maxbins,
                step: 1,
            },
        };
        const extentSignal = imageSignal?.name || dataExtentSignal;
        const binTransform: BinTransform = {
            type: 'bin',
            field: safeFieldName(column.name),
            as: [
                field,
                fieldEnd,
            ],
            signal: binSignal,
            extent: {
                signal: `[${extentSignal}[0], ${extentSignal}[1] + 1e-11]`, //add a tiny bit to the upper extent to force the extra bin - https://github.com/vega/vega/issues/2899
            },
            minstep: shouldBeIntegralBinStep(column) ? 1 : 0,
            maxbins: {
                signal: maxbinsSignalName,
            },
        };
        const dataSequence: Data = {
            name: domainDataName,
            transform: [
                {
                    type: 'sequence',
                    start: {
                        signal: `${binSignal}.start`,
                    },
                    stop: {
                        signal: `${binSignal}.stop`,
                    },
                    step: {
                        signal: `${binSignal}.step`,
                    },
                },
                {
                    type: 'formula',
                    expr: 'datum.data',
                    as: field,
                },
                {
                    type: 'formula',
                    expr: `datum.data + ${binSignal}.step`,
                    as: fieldEnd,
                },
                {
                    type: 'window',
                    ops: ['row_number'],
                    as: [FieldNames.Ordinal],
                },
                {
                    type: 'formula',
                    expr: `datum.data === ${binSignal}.start`,
                    as: FieldNames.First,
                },
                {
                    type: 'formula',
                    expr: `datum.data === ${binSignal}.stop - ${binSignal}.step`,
                    as: FieldNames.Last,
                },
                {
                    // when there is only one bin, use only first sequence element
                    type: 'filter',
                    expr: `${dataExtentSpanSignal} === 0 ? datum[${JSON.stringify(FieldNames.First)}] : true`,
                },
            ],
        };
        const signals: Signal[] = [
            maxbinsSignal,
            {
                name: dataExtentSpanSignal,
                update: `${extentSignal}[1] - ${extentSignal}[0]`,
            },
        ];
        if (imageSignal) {
            signals.push(imageSignal);
        }
        const augmentBinnable: AugmentBinnable = {
            discreteColumn,
            native: false,
            transforms: [extentTransform, binTransform],
            fields: [field, fieldEnd],
            binSignal,
            extentSignal,
            dataSequence,
            domainDataName,
            signals,
            fullScaleDataname: dataSequence.name,
        };
        return augmentBinnable;
    } else {
        const nativeBinnable: NativeBinnable = {
            discreteColumn,
            native: true,
            fields: [column.name],
            domainDataName,
            fullScaleDataname: domainDataName,
        };
        return nativeBinnable;
    }
}

export function outerExtentSignal(name: string, min: number, max: number, dataExtent: string): Signal {
    return {
        name,
        update: `[min(${min}, ${dataExtent}[0]), max(${max}, ${dataExtent}[1])]`,
    };
}

export function shouldBeIntegralBinStep(column: Column) {
    //prevent Vega from showing ".5" steps between integer scale values
    return column.quantitative && (column.type === 'integer' && (column.stats.max - column.stats.min) <= 7);
}
