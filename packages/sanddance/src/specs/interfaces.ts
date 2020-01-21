// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Scale, Scope, Spec, Transforms } from 'vega-typings';
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

export interface SizeSignals {
    height: string;
    width: string;
}

export interface InnerScope {
    dataName: string;
    scope: Scope;
    globalScales?: { x?: Scale, y?: Scale, z?: Scale };
    globalTransforms?: { [columnName: string]: Transforms[] };
    sizeSignals: SizeSignals;
}

export type Orientation = 'horizontal' | 'vertical';
