/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { CrossProps } from './layouts/cross.js';
import { DiscreteColumn } from './interfaces.js';
import {
    facetPaddingBottom,
    facetPaddingLeft,
    facetPaddingRight,
    facetPaddingTop,
} from './defaults.js';
import { FacetStyle } from './types.js';
import { LayoutPair } from './layouts/layout.js';
import { WrapProps } from './layouts/wrap.js';

export interface PlotPadding {
    x: number;
    y: number;
}

export interface FacetPadding {
    top: number;
    left: number;
    bottom: number;
}

export interface FacetLayout {
    facetPadding: FacetPadding;
    plotPadding: PlotPadding;
}

export function getFacetLayout(facetStyle: FacetStyle, facetColumn: DiscreteColumn, facetVColumn: DiscreteColumn, axisTextColor: string) {
    let layoutPair: LayoutPair;
    const groupby = facetColumn;
    const plotPadding: PlotPadding = {
        x: 0,
        y: 0,
    };
    let facetPadding: FacetPadding;
    switch (facetStyle) {
        case 'cross': {
            const props: CrossProps = {
                axisTextColor,
                colRowTitles: true,
                groupbyX: groupby,
                groupbyY: facetVColumn,
            };
            layoutPair = {
                layoutType: 'Cross',
                props,
            };
            facetPadding = {
                bottom: facetPaddingBottom,
                left: facetPaddingLeft,
                top: 0,
            };
            plotPadding.y = facetPaddingTop;
            plotPadding.x = facetPaddingRight;
            break;
        }
        case 'wrap':
        default: {
            const props: WrapProps = {
                axisTextColor,
                cellTitles: true,
                groupby,
            };
            layoutPair = {
                layoutType: 'Wrap',
                props,
            };
            facetPadding =
            {
                bottom: facetPaddingBottom,
                left: facetPaddingLeft,
                top: facetPaddingTop,
            };
            break;
        }
    }
    const facetLayout: FacetLayout = {
        facetPadding,
        plotPadding,
    };
    return {
        layoutPair,
        facetLayout,
    };
}

