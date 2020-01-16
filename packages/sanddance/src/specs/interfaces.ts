// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Scope, Spec } from 'vega-typings';
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

export interface InnerScope {
    dataName: string;
    scope: Scope;
}

export interface Scopes {
    global: InnerScope;
    parent: InnerScope;
}

export type Orientation = 'horizontal' | 'vertical';
