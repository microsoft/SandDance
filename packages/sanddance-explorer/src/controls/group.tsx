/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { util } from '@msrvida/sanddance-react';

export interface Props {
    label: string;
    labelCount?: string;
    children?: React.ReactNode;
    className?: string;
}

export function Group(props: Props) {
    return (
        <div className={util.classList('sanddance-group', props.className)}>
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
