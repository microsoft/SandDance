// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { util } from '@msrvida/sanddance-react';

export interface Props {
    children: React.ReactNode;
    className?: string;
}

export function Scrollable(props: Props) {
    return (
        <div className={util.classList("scrollable-container", props.className)}>
            <div className="scrollable">
                {props.children}
            </div>
        </div>
    );
}
