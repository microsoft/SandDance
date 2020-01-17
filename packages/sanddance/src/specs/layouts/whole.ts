// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout } from "./layout";

export class Whole extends Layout {
    public build() {
        return this.props.parent;
    }
}
