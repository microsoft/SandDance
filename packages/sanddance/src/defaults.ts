// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from '@msrvida/vega-deck.gl';
import { ViewerOptions } from './types';

const { defaultPresenterConfig, defaultPresenterStyle } = VegaDeckGl.defaults;
const { desaturate } = VegaDeckGl.util;

export const defaultViewerOptions: ViewerOptions = {
    colors: {
        activeCube: [128, 0, 128, 255], //purple
        defaultCube: defaultPresenterStyle.defaultCubeColor,
        hoveredCube: defaultPresenterStyle.highlightColor,
        selectedCube: [255, 255, 0, 255],   //yellow
        axisSelectHighlight: [128, 128, 128, 128],
        axisLine: [0, 0, 0, 255],
        axisText: [0, 0, 0, 255],
        cellFillerLine: [128, 128, 128, 255],
        unselectedColorMethod: (color) => {
            const c = desaturate(color, 0.05);
            c[3] = 171;
            return c;
        }
    },
    language: {
        headers: {
            chart: 'Chart',
            details: 'Details',
            legend: 'Legend',
            selection: 'Select & Filter'
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
        scatterPointSize: 'Point size',
        XBinSize: 'X axis bin size',
        YBinSize: 'Y axis bin size',
        XGridSize: 'X grid size',
        YGridSize: 'Y grid size',
        InnerPaddingSize: 'Inner padding size',
        OuterPaddingSize: 'Outer padding size',
        treeMapMethod: 'Method',
        facetColumns: 'Facet columns',
        facetRows: 'Facet rows',
        markOpacitySignal: 'Mark opacity',
        textScaleSignal: 'Text scale',
        xAxisTextAngleSignal: 'X axis text angle',
        yAxisTextAngleSignal: 'Y axis text angle',
        zScaleProportion: 'Z scale proportion to Y',
        selectionCount: count => `${count} items selected`
    },
    maxLegends: 19, //20 would be "other"
    onError: (errors) => {
        //console.log(`UnitVisViewer errors: ${errors.join('\n')}`);
    },
    transitionDurations: {
        ...defaultPresenterConfig.transitionDurations,
        scope: 600
    },
    selectionPolygonZ: -1,
    tickSize: 10,
    facetMargins: {
        column: 40,
        row: 40,
        title: 40
    }
};

export function getPresenterStyle(options: ViewerOptions) {
    var style: VegaDeckGl.types.PresenterStyle = {
        cssPrefix,
        fontFamily: options.fontFamily,
        defaultCubeColor: options.colors.defaultCube
    };
    if (options.colors.hoveredCube) {
        style.highlightColor = options.colors.hoveredCube;
    }
    if (options.lightSettings) {
        style.lightSettings = options.lightSettings;
    }
    return style;
}

export const cssPrefix = 'sanddance-';

export const dualColorSchemeColors = {
    black: '#212121',
    gray: '#D2D2D2',
    blue: '#0060F0',
    green: '#00C000',
    orange: '#FF9900',
    red: '#E00000'
};
