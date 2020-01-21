// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout, LayoutProps } from "./layout";

export interface TreemapProps extends LayoutProps {
    corner: 'top-left' | 'bottom-left';
}

export class Treemap extends Layout {
    //TODO implement corner
}
