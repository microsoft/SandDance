/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import * as VegaMorphCharts from '@msrvida/vega-morphcharts';
import { ColorContext } from './types';

export function populateColorContext(colorContext: ColorContext, presenter: VegaMorphCharts.Presenter) {
    if (!colorContext.colorMap) {
        colorContext.colorMap = presenter.morphChartsRenderResult.getCubeLayer().unitColorMap;
    }
    colorContext.legend = VegaMorphCharts.util.clone(presenter.stage.legend);
    colorContext.legendElement = presenter.getElement(VegaMorphCharts.PresenterElement.legend).children[0] as HTMLElement;
}
