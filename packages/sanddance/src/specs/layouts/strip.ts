// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Orientation } from '../interfaces';
import { LayoutProps, Layout } from './layout';

export interface StripProps extends LayoutProps {
    orientation: Orientation;
}

export class Strip extends Layout {

}
