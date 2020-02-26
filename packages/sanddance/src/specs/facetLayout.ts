// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Cross, CrossProps } from './layouts/cross';
import { DiscreteColumn } from './interfaces';
import { FacetStyle } from './types';
import { LayoutPair } from './layouts/layout';
import { Scale, Signal } from '@msrvida/vega-deck.gl/node_modules/vega-typings/types';
import { Slice, SliceProps } from './layouts/slice';
import { Wrap, WrapProps } from './layouts/wrap';

export function getFacetLayout(facetStyle: FacetStyle, facetColumn: DiscreteColumn, facetVColumn: DiscreteColumn) {
    let layoutPair: LayoutPair;
    const scales: Scale[] = [];
    const signals: Signal[] = [];
    const groupby = facetColumn;
    switch (facetStyle) {
        case 'horizontal': {
            const props: SliceProps = {
                orientation: 'horizontal',
                groupby
            };
            layoutPair = {
                layoutClass: Slice,
                props
            };
            break;
        }
        case 'vertical': {
            const props: SliceProps = {
                orientation: 'vertical',
                groupby
            };
            layoutPair = {
                layoutClass: Slice,
                props
            };
            break;
        }
        case 'cross': {
            const props: CrossProps = {
                groupbyX: groupby,
                groupbyY: facetVColumn
            };
            layoutPair = {
                layoutClass: Cross,
                props
            };
            break;
        }
        case 'wrap':
        default:
            const props: WrapProps = {
                groupby
            };
            layoutPair = {
                layoutClass: Wrap,
                props
            };
            break;
    }
    return { layoutPair, scales, signals };
}
