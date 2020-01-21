// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { GroupLayoutProps, GroupLayout } from './layout';
import { Column } from '../types';

export interface CrossProps extends GroupLayoutProps {
    groupbyV: Column;
}

export class Cross extends GroupLayout {

}
