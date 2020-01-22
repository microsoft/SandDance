// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { LayoutProps, Layout } from "./layout";
import { Column } from "../types";

export interface DensityBuild {
}

export interface DensityProps extends LayoutProps {
    groupbyX: Column;
    groupbyY: Column;
    mode: 'square' | 'cube';
    onBuild?: (densityBuild: DensityBuild) => void;
}

export class Density extends Layout {
}
