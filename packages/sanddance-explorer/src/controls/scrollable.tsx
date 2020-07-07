// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { util } from '@msrvida/sanddance-react';

export interface Props {
    children: React.ReactNode;
    className?: string;
    role?: string;
}

export function Scrollable(props: Props) {
    return (
        <div className={util.classList('scrollable-container', props.className)} role={props.role}>
            <div className="scrollable">
                {props.children}
            </div>
        </div>
    );
}
