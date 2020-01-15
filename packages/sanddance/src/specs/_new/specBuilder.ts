// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Footprint } from './footprints/footprint';
import { Spec } from 'vega-typings';
import { SpecContext, SpecCapabilities } from '../types';
import { UnitLayout } from './unitLayouts/unitLayout';
import { SpecResult } from '../interfaces';

export interface SpecBuilderProps {
    footprintClass: typeof Footprint;
    unitLayoutClass: typeof UnitLayout;
    specContext: SpecContext;
    errors?: string[];
    specCapabilities: SpecCapabilities;
}

export class SpecBuilder {

    constructor(public props: SpecBuilderProps) {

    }

    public build(): SpecResult {
        //create manifold

        //create aggregate layouts (if any) within manifolds

        //create unit layouts
        const vegaSpec: Spec = null;

        const specResult: SpecResult = {
            vegaSpec,
            specCapabilities: this.props.specCapabilities,
            errors: this.props.errors
        };

        return specResult;
    }

}
