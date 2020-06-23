// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Cross, CrossProps } from './layouts/cross';
import { DiscreteColumn } from './interfaces';
import {
    facetPaddingBottom,
    facetPaddingLeft,
    facetPaddingRight,
    facetPaddingTop
} from './defaults';
import { FacetStyle } from './types';
import { LayoutPair } from './layouts/layout';
import { Scale, Signal } from 'vega-typings';
import { SignalNames } from './constants';
import { Wrap, WrapProps } from './layouts/wrap';

export interface FacetLayout {
    layoutPair: LayoutPair;
    plotPadding: { x: number, y: number };
    scales: Scale[];
    signals: Signal[];
}

export function getFacetLayout(facetStyle: FacetStyle, facetColumn: DiscreteColumn, facetVColumn: DiscreteColumn, axisTextColor: string): FacetLayout {
    let layoutPair: LayoutPair;
    const scales: Scale[] = [];
    let signals: Signal[];
    const groupby = facetColumn;
    const plotPadding = {
        x: 0,
        y: 0
    };
    switch (facetStyle) {
        case 'cross': {
            const props: CrossProps = {
                axisTextColor,
                colRowTitles: true,
                groupbyX: groupby,
                groupbyY: facetVColumn
            };
            layoutPair = {
                layoutClass: Cross,
                props
            };
            signals = [
                {
                    name: SignalNames.FacetPaddingBottom,
                    update: `${facetPaddingBottom}`
                },
                {
                    name: SignalNames.FacetPaddingLeft,
                    update: `${facetPaddingLeft}`
                },
                {
                    name: SignalNames.FacetPaddingTop,
                    update: '0'
                }
            ];
            plotPadding.y = facetPaddingTop;
            plotPadding.x = facetPaddingRight;
            break;
        }
        case 'wrap':
        default: {
            const props: WrapProps = {
                axisTextColor,
                cellTitles: true,
                groupby
            };
            layoutPair = {
                layoutClass: Wrap,
                props
            };
            signals = [
                {
                    name: SignalNames.FacetPaddingBottom,
                    update: `${facetPaddingBottom}`
                },
                {
                    name: SignalNames.FacetPaddingLeft,
                    update: `${facetPaddingLeft}`
                },
                {
                    name: SignalNames.FacetPaddingTop,
                    update: `${facetPaddingTop}`
                }
            ];
            break;
        }
    }
    return { layoutPair, plotPadding, scales, signals };
}

