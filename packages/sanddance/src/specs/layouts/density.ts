// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout, LayoutProps } from "./layout";
import { Scopes } from "../interfaces";

export interface DensityProps extends LayoutProps {
    mode: 'square' | 'cube';
}

export class Density extends Layout {
    constructor(public props: DensityProps & Scopes) {
        super(props);
    }
}
