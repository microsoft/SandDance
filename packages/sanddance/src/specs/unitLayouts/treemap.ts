// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { UnitLayout, UnitLayoutProps } from "./unitLayout";

export interface TreemapProps extends UnitLayoutProps {
    corner: 'top-left' | 'bottom-left';
}

export class Treemap extends UnitLayout {
    //TODO implement corner
}
