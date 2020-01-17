// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Footprint } from "./footprint";

export class Whole extends Footprint {
    public build() {
        return this.props.parent;
    }
}
