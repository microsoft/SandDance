// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales, GlobalScope, InnerScope } from '../interfaces';

export interface LayoutProps {
}

export interface LayoutPair {
    props?: LayoutProps;
    layoutClass: typeof Layout;
}

export interface LayoutBuildProps {
    axesScales: AxisScales;
    globalScope: GlobalScope;
    parentScope: InnerScope;
    groupings: string[][];
    id: number;
}

export class Layout {
    protected prefix: string;
    public id: number;

    constructor(public props: LayoutProps & LayoutBuildProps) {
        this.id = props.id;
    }

    public getGrouping(): string[] {
        return null;
    }

    public build(): InnerScope {
        throw 'Not implemented';
    }
}
