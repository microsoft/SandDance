// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { DataNames, SignalNames } from './specs/constants';
import { Facets } from './specs/types';

import { ViewGl_Class } from '@msrvida/vega-deck.gl/dist/es6/vega-classes/viewGl';

export function adjustActualFacetSignals(fc: Facets, view: ViewGl_Class) {
    if (fc) {
        let reRender = false;
        const innerState = view.getState();
        const actualCellCount = view.data(DataNames.FacetCellTitles).length;
        const actualRows = Math.ceil(actualCellCount / fc.columns);
        const signalRows = view.signal(SignalNames.FacetRows);
        if (actualRows !== signalRows) {
            //VegaDeckGl.signal(FacetRowsSignal, actualRows);
            innerState.signals[SignalNames.FacetRows] = actualRows;
            reRender = true;
        }
        if (actualRows === 1 && actualCellCount < fc.columns) {
            //VegaDeckGl.signal(FacetColumnsSignal, actualCellCount);
            innerState.signals[SignalNames.FacetColumns] = actualCellCount;
            reRender = true;
        }
        if (reRender) {
            //TODO: notify consumer?
            //VegaDeckGl.setState(innerState);
        }
    }
}