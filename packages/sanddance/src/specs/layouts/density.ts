// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { DiscreteColumn } from '../interfaces';
import { Layout, LayoutProps } from './layout';

export interface DensityBuild {
}

export interface DensityProps extends LayoutProps {
    groupbyX: DiscreteColumn;
    groupbyY: DiscreteColumn;
    mode: 'square' | 'cube';
    onBuild?: (densityBuild: DensityBuild) => void;
}

export class Density extends Layout {
}
