// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { LayoutProps, Layout } from './layout';
import { Column } from '../types';

export interface CrossProps extends LayoutProps {
    groupbyX: Column;
    groupbyY: Column;
}

export class Cross extends Layout {

}
