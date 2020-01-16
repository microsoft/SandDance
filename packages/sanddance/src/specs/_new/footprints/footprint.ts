// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { InnerScope, Scopes } from '../../interfaces';

export interface FootprintProps {

}

export class Footprint {
    constructor (public props: FootprintProps & Scopes) {
    }

    public build(): InnerScope {

        //TODO apply the x/y/z scales

        return this.props.parent;
    }
}
