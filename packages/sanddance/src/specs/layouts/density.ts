// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { GroupLayoutProps, GroupLayout } from "./layout";

export interface DensityProps extends GroupLayoutProps {
    mode: 'square' | 'cube';
}

export class Density extends GroupLayout {
}
