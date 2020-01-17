// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { UnitLayout } from "../unitLayout";
import getScales from './scales';
import { SpecContext } from "../../types";

export class Scatter extends UnitLayout {
    public build(specContext: SpecContext) {
        //Add scales to global scope
        const { scales } = this.props.global.scope;
        scales.push.apply(scales, getScales(specContext));

        //TODO marks - parent scope
    }
}
