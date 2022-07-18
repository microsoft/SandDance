/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import * as VegaMorphCharts from '@msrvida/vega-morphcharts';
import { ColorContext } from './types';

export function populateColorContext(colorContext: ColorContext, presenter: VegaMorphCharts.Presenter) {
    if (!colorContext.colorMap) {
        colorContext.colorMap = presenter.mcRenderResult.getCubeUnitColorMap();
    }
    colorContext.legend = VegaMorphCharts.util.clone(presenter.stage.legend);
    colorContext.legendElement = presenter.getElement(VegaMorphCharts.PresenterElement.legend).children[0] as HTMLElement;
}
