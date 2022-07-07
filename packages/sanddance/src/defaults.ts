/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import * as VegaDeckGl from '@msrvida/vega-deck.gl';
import { ViewerOptions } from './types';

const { defaultPresenterConfig, defaultPresenterStyle } = VegaDeckGl.defaults;
const { desaturate } = VegaDeckGl.util;

export const defaultViewerOptions: ViewerOptions = {
    colors: {
        activeCube: 'purple',
        defaultCube: VegaDeckGl.util.colorToString(defaultPresenterStyle.defaultCubeColor),
        hoveredCube: VegaDeckGl.util.colorToString(defaultPresenterStyle.highlightColor),
        selectedCube: 'yellow',
        axisSelectHighlight: VegaDeckGl.util.colorToString([128, 128, 128, 128]),
        axisLine: '#000',
        axisText: '#000',
        unselectedColorMethod: (color) => {
            const c = desaturate(color, 0.05);
            c[3] = 171;
            return c;
        },
    },
    language: {
        headers: {
            chart: 'Chart',
            details: 'Details',
            legend: 'Legend',
            selection: 'Select & Filter',
        },
        bing: 'bing',
        newColorMap: 'remap color to filtered items',
        oldColorMap: 'keep same colors',
        deselect: 'deselect',
        exclude: 'exclude',
        isolate: 'isolate',
        legendOther: 'other',
        nextDetail: '>',
        previousDetail: '<',
        reset: 'reset',
        colorBinCount: 'Color bin count',
        colorReverse: 'Color reverse',
        count: 'Count',
        percent: 'Percent',
        sum: 'Sum',
        scatterPointScale: 'Point scale',
        FacetMaxBins: 'Facet max bins',
        FacetVMaxBins: 'Cross facet max bins',
        XMaxBins: 'X axis max bins',
        YMaxBins: 'Y axis max bins',
        XGridSize: 'X grid size',
        YGridSize: 'Y grid size',
        InnerPaddingSize: 'Inner padding size',
        OuterPaddingSize: 'Outer padding size',
        treeMapMethod: 'Treemap layout',
        facetColumns: 'Facet columns',
        facetRows: 'Facet rows',
        markOpacitySignal: 'Mark opacity',
        textScaleSignal: 'Text scale',
        xAxisTextAngleSignal: 'X axis text angle',
        yAxisTextAngleSignal: 'Y axis text angle',
        zGrounded: 'Z grounded',
        zScaleProportion: 'Z scale proportion to Y',
        selectionCount: count => `${count} items selected`,
    },
    maxLegends: 19, //20 would be "other"
    onError: (errors) => {
        //console.log(`UnitVisViewer errors: ${errors.join('\n')}`);
    },
    transitionDurations: {
        ...defaultPresenterConfig.transitionDurations,
        scope: 600,
    },
    selectionPolygonZ: -1,
    tickSize: 10,
};

export function getPresenterStyle(options: ViewerOptions) {
    const style: VegaDeckGl.types.PresenterStyle = {
        cssPrefix,
        fontFamily: options.fontFamily,
        defaultCubeColor: VegaDeckGl.util.colorFromString(options.colors.defaultCube),
    };
    if (options.colors.hoveredCube) {
        style.highlightColor = VegaDeckGl.util.colorFromString(options.colors.hoveredCube);
    }
    //if (options.lightSettings) {
    // style.lightSettings = options.lightSettings;
    //}
    return style;
}

export const cssPrefix = 'sanddance-';

export const dualColorSchemeColors = {
    black: '#212121',
    gray: '#D2D2D2',
    blue: '#0060F0',
    green: '#00C000',
    orange: '#FF9900',
    red: '#E00000',
};
