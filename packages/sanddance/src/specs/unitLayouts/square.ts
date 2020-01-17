// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Scopes } from '../interfaces';
import { UnitLayout, UnitLayoutProps } from './unitLayout';

export interface SquareProps extends UnitLayoutProps {
    growDirection: 'right-down' | 'right-up' | 'down-right';
}

export class Square extends UnitLayout {
    constructor(public props: SquareProps & Scopes) {
        super(props);
    }
}
