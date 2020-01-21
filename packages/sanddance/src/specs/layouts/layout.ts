// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { InnerScope, SizeSignals } from '../interfaces';
import { SpecContext, Column } from '../types';
import { AxisScales } from '../specBuilder';

export interface LayoutProps {
    groupby: Column;
}

export interface BuildProps {
    specContext: SpecContext;
    axesScales: AxisScales;
    global: InnerScope;
    parent: InnerScope;
}


export class Layout {
    public static count = 0;
    public id: number;

    constructor(public props: LayoutProps & BuildProps) {
    }

    public build(): InnerScope {
        throw 'Not implemented';
    }
}
