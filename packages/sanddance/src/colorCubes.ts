// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from './vega-deck.gl';
import { FieldNames } from './specs/constants';
import { Color } from '@deck.gl/core/utils/color';
import {
    ColorContext,
    ColorMap,
    ColorMethod,
    ViewerOptions,
    ColorMappedItem
} from './types';

export function getSelectedColorMap(currentData: object[], showSelectedData: boolean, showActive: boolean, viewerOptions: ViewerOptions) {
    function getSelectionColorItem(datum: object) {
        let item: ColorMappedItem;
        if (showSelectedData) {
            item = datum[FieldNames.Selected] ?
                { color: viewerOptions.colors.selectedShape }
                :
                { unSelected: true };
        }
        if (showActive && datum[FieldNames.Active]) {
            item = { color: viewerOptions.colors.activeShape };
        }
        return item;
    }
    const colorMap: ColorMap = {};
    currentData.forEach(datum => {
        const selectionColor = getSelectionColorItem(datum);
        if (selectionColor) {
            const ordinal = datum[VegaDeckGl.constants.GL_ORDINAL];
            colorMap[ordinal] = selectionColor;
        }
    });
    return colorMap;
}

export function colorMapFromShapes(shapes: VegaDeckGl.types.Shape[]) {
    const map: ColorMap = {};
    shapes.forEach(shape => {
        map[shape.ordinal] = { color: shape.color };
    });
    return map;
}

export function populateColorContext(colorContext: ColorContext, presenter: VegaDeckGl.Presenter) {
    if (!colorContext.colorMap) {
        const shapes = presenter.getShapeData();
        colorContext.colorMap = colorMapFromShapes(shapes);
    }
    colorContext.legend = VegaDeckGl.util.clone(presenter.stage.legend);
    colorContext.legendElement = presenter.getElement(VegaDeckGl.PresenterElement.legend).children[0] as HTMLElement;
}

export function applyColorMapToShapes(maps: ColorMap[], shapes: VegaDeckGl.types.Shape[], unselectedColorMethod?: ColorMethod) {
    Object.keys(maps[0]).forEach(ordinal => {
        const shape = shapes[+ordinal];
        if (shape && !shape.isEmpty) {
            const actualColorMappedItem: ColorMappedItem = maps[0][ordinal];
            if (maps.length > 1) {
                const selectedColorMappedItem: ColorMappedItem = maps[1][ordinal];
                if (selectedColorMappedItem) {
                    if (selectedColorMappedItem.unSelected && unselectedColorMethod) {
                        shape.color = unselectedColorMethod(actualColorMappedItem.color);
                    } else {
                        shape.color = selectedColorMappedItem.color;
                    }
                    return;
                }
            }
            shape.color = actualColorMappedItem.color;
        }
    });
}
