// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { LayoutProps, Layout } from './layout';

export interface SquareProps extends LayoutProps {
    growDirection: 'right-down' | 'right-up' | 'down-right';
}

export class Square extends Layout {
}
