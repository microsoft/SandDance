// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    Insight,
    SpecCapabilities,
    SpecColumns,
    SpecViewOptions
} from './types';
import { Spec } from 'vega-typings';

/**
 * Specification result object.
 */
export interface SpecResult {
    errors?: string[];
    vegaSpec: Spec;
    specCapabilities: SpecCapabilities;
}

export interface SpecCreator {
    (insight: Insight, specColumns: SpecColumns, specViewOptions: SpecViewOptions): SpecResult;
}
