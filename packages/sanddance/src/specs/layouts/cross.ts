// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { DiscreteColumn } from '../interfaces';
import { Layout, LayoutProps } from './layout';

export interface CrossProps extends LayoutProps {
    groupbyX: DiscreteColumn;
    groupbyY: DiscreteColumn;
}

export class Cross extends Layout {

}
