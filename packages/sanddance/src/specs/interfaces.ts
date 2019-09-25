// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Spec } from 'vega-typings';
import { SpecCapabilities, SpecContext } from './types';

/**
 * Specification result object.
 */
export interface SpecResult {
    errors?: string[];
    vegaSpec: Spec;
    specCapabilities: SpecCapabilities;
}

export interface SpecCreator {
    (context: SpecContext): SpecResult;
}
