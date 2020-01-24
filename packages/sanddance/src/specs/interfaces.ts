// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    Mark,
    Scale,
    Scope,
    Spec,
    Transforms
} from 'vega-typings';
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
    scope?: Scope;
    mark?: Mark;
    globalScales?: { x?: Scale, y?: Scale, z?: Scale };
    sizeSignals: SizeSignals;
}

export type Orientation = 'horizontal' | 'vertical';

export type Aggregate = 'count' | 'sum' | 'percent';

export interface AxisScale {
    type: 'discrete' | 'continuous' | 'continuousAggregate' | 'zFloor' | 'zFree' | 'zDiscrete';

    /**
     * Only used when type = continuousAggregate
     */
    aggregate?: Aggregate;
}

export interface AxisScales {
    x?: AxisScale;
    y?: AxisScale;
    z?: AxisScale;
}
