// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Orientation } from '../interfaces';
import { UnitLayout, UnitLayoutProps } from './unitLayout';

export interface StripProps extends UnitLayoutProps {
    orientation: Orientation;
}

export class Strip extends UnitLayout {

}
