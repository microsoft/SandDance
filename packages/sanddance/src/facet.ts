// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { FacetCellTitles, FacetColumnsSignal, FacetRowsSignal } from './specs/constants';
import { Facets } from './specs/types';
import { ViewGl_Class } from './vega-deck.gl/vega-classes/viewGl';

export function adjustActualFacetSignals(fc: Facets, VegaDeckGl: ViewGl_Class) {
    if (fc) {
        let reRender = false;
        const innerState = VegaDeckGl.getState();
        const actualCellCount = VegaDeckGl.data(FacetCellTitles).length;
        const actualRows = Math.ceil(actualCellCount / fc.columns);
        const signalRows = VegaDeckGl.signal(FacetRowsSignal);
        if (actualRows !== signalRows) {
            //VegaDeckGl.signal(FacetRowsSignal, actualRows);
            innerState.signals[FacetRowsSignal] = actualRows;
            reRender = true;
        }
        if (actualRows === 1 && actualCellCount < fc.columns) {
            //VegaDeckGl.signal(FacetColumnsSignal, actualCellCount);
            innerState.signals[FacetColumnsSignal] = actualCellCount;
            reRender = true;
        }
        if (reRender) {
            //TODO: notify consumer?
            //VegaDeckGl.setState(innerState);
        }
    }
}