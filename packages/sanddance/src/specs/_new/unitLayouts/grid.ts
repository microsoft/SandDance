// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Scopes } from '../../interfaces';
import { UnitLayout, UnitLayoutProps } from './unitLayout';

export interface GridProps extends UnitLayoutProps {
    growDirection: 'right-down' | 'right-up' | 'down-right';
}

export class Grid extends UnitLayout {
    constructor(public props: GridProps & Scopes) {
        super(props);
    }
}
