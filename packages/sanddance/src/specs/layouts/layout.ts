// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales, InnerScope } from '../interfaces';
import { Column } from '../types';

export interface GroupLayoutProps extends LayoutProps {
    groupby: Column;
    maxbins: number
}

export interface LayoutProps {
    addScaleAxes?: boolean;
}

export interface LayoutPair {
    props?: LayoutProps;
    layoutClass: typeof Layout;
}

export interface LayoutBuildProps {
    axesScales: AxisScales;
    global: InnerScope;
    parent: InnerScope;
}

export class Layout {
    public id: number;

    constructor(public props: LayoutProps & LayoutBuildProps) {
    }

    public build(): InnerScope {
        throw 'Not implemented';
    }
}
