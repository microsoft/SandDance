// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { LayoutProps, Layout, BuildProps } from './layout';
import { InnerScope } from '../interfaces';

export interface SquareProps extends LayoutProps {
    growDirection: 'right-down' | 'right-up' | 'down-right';
}

export class Square extends Layout {
    public props: SquareProps & BuildProps;

    public build(): InnerScope {
        return null;
    }
}
