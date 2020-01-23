// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales } from '../specBuilder';
import { Column } from '../types';
import { InnerScope } from '../interfaces';

export interface GroupLayoutProps extends LayoutProps {
    groupby: Column
}

export interface LayoutProps {
}

export interface BuildProps {
    axesScales: AxisScales;
    global: InnerScope;
    parent: InnerScope;
}

export class Layout {
    public id: number;

    constructor(public props: LayoutProps & BuildProps) {
    }

    public build(): InnerScope {
        throw 'Not implemented';
    }
}
