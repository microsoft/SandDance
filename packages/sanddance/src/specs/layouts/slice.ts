// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout, LayoutProps } from "./layout";
import { Orientation } from "../interfaces";

export interface SliceProps extends LayoutProps {
    orientation: Orientation;
}

export class Slice extends Layout {

}
