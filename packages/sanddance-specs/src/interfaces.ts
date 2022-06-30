// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SpecCapabilities, SpecContext } from './types';
import { Column } from '@msrvida/chart-types';
import {
    AggregateOp,
    Mark,
    NumericValueRef,
    Scale,
    Scope,
    Spec,
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

export interface GlobalScales {
    showAxes: boolean;
    scales: {
        x?: Scale[];
        y?: Scale[];
        z?: Scale[];
    }
}

export interface TitleSource {
    dataName: string;
    quantitative: boolean;
}

export interface Titles {
    x: TitleSource;
    y: TitleSource;
}

export type EncodingRule = { test?: string } & NumericValueRef;

export interface InnerScope {
    id?: number;
    titles?: Titles;
    facetScope?: Scope;             //TODO add counts
    mark?: Mark;
    globalScales?: GlobalScales;
    encodingRuleMap?: { [key: string]: EncodingRule[] };
    sizeSignals: SizeSignals;
    offsets: LayoutOffsets;
}

export type Orientation = 'horizontal' | 'vertical';

export type Aggregate = 'count' | 'sum' | 'percent';

export interface AxisScale {
    title: string;
    aggregate?: Aggregate;
}

export interface AxisScales {
    x?: AxisScale;
    y?: AxisScale;
    z?: AxisScale;
}

export interface DiscreteColumn {
    column: Column;
    defaultBins: number;
    maxbins: number;
    maxbinsSignalName: string;
    maxbinsSignalDisplayName: string;
}

export interface FieldOp {
    field: string;
    op: AggregateOp;
    as: string;
}

export interface Grouping {
    id: number;
    groupby: string[];
    fieldOps: FieldOp[];
}

export interface LayoutOffsets {
    x: string;
    y: string;
    h: string;
    w: string;
}
