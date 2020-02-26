// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Column, SpecCapabilities, SpecContext } from './types';
import {
    Mark,
    NewSignal,
    Scale,
    Scope,
    Spec
} from 'vega-typings';

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
    layoutHeight: string;
    layoutWidth: string;
    colCount?: string;
    rowCount?: string;
}

export interface InnerScope {
    dataName: string;
    scope?: Scope;
    mark?: Mark;
    globalScales?: { x?: Scale, y?: Scale, z?: Scale };
    sizeSignals: SizeSignals;
}

export interface GlobalScope extends InnerScope {
    signals: {
        minCellWidth: NewSignal;
        minCellHeight: NewSignal;
        plotHeightOut: NewSignal;
        plotWidthOut: NewSignal;
    }
}

export type Orientation = 'horizontal' | 'vertical';

export type Aggregate = 'count' | 'sum' | 'percent';

export type AxisScaleType = 'discrete' | 'continuous' | 'continuousAggregate' | 'zFloor' | 'zFree' | 'zDiscrete';

export interface AxisScale {
    type: AxisScaleType;

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

export interface DiscreteColumn {
    column: Column;
    maxbins: number;
    maxbinsSignalName: string;
    maxbinsSignalDisplayName: string;
}
