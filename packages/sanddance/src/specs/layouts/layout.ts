// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { InnerScope, Scopes } from '../interfaces';

export interface LayoutProps {

}

export class Layout {
    constructor (public props: LayoutProps & Scopes) {
    }

    public build(): InnerScope {

        //TODO apply the x/y/z scales

        return this.props.parent;
    }
}
