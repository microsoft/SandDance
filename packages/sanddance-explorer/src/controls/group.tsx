// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { util } from '@msrvida/sanddance-react';

export interface Props {
    label: string;
    labelCount?: string;
    children?: string | React.ReactText[] | JSX.Element | JSX.Element[];
    className?: string;
}

export function Group(props: Props) {
    return (
        <div className={util.classList("sanddance-group", props.className)}>
            <div className="group-head">
                <label>{props.label}</label>
                {props.labelCount && <span className="count">({props.labelCount})</span>}
            </div>
            {props.children && (
                <div className="group-body">
                    {props.children}
                </div>
            )}
        </div>
    );
}
