// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import getMarks from './marks';
import getScales from './scales';
import getSignals from './signals';
import { SpecContext } from '../../types';
import { UnitLayout } from '../unitLayout';
import { push } from '../../../array';

export class Scatter extends UnitLayout {
    public build(specContext: SpecContext) {

        //TODO clean data in global scope
        // filterInvalidWhenNumeric(specColumns.x),
        // filterInvalidWhenNumeric(specColumns.y),
        // filterInvalidWhenNumeric(specColumns.z),

        //Add scales to global scope
        const { scales, signals } = this.props.global.scope;
        push(scales, getScales(specContext));
        push(signals, getSignals(specContext));

        this.props.parent.scope.marks = getMarks(specContext, this.props.parent.dataName);
    }
}
