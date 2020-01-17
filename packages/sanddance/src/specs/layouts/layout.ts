// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { InnerScope, Scopes } from '../interfaces';

export interface LayoutProps {

}

export class Layout {
    public static count = 0;
    public id: number;

    constructor(public props: LayoutProps & Scopes) {
        this.id = Layout.count++;
    }

    public build(): InnerScope {

        //TODO apply the x/y/z scales

        return this.props.parent;
    }
}
