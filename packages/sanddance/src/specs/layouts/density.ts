// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Binnable, binnable } from '../bin';
import { DiscreteColumn } from '../interfaces';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';

export interface DensityBuild {
}

export interface DensityProps extends LayoutProps {
    groupbyX: DiscreteColumn;
    groupbyY: DiscreteColumn;
    mode: 'square' | 'cube';
    onBuild?: (densityBuild: DensityBuild) => void;
}

export class Density extends Layout {
    private binX: Binnable;
    private binY: Binnable;

    constructor(public props: DensityProps & LayoutBuildProps) {
        super(props);
        this.prefix = `density_${this.id}`;
        this.binX = binnable(this.prefix, props.global.dataName, props.groupbyX);
        this.binY = binnable(this.prefix, props.global.dataName, props.groupbyY);
    }

    public getGrouping() {
        return [this.binX.field, this.binY.field];
    }

}
