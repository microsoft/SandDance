// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';

export const dropdownWidth = 200;

export interface Props extends FabricTypes.IDropdownProps {
    collapseLabel?: boolean;
}

export function Dropdown(props: Props) {
    let selectedKey: string | number = null;
    if (props.options && props.options.length > 1) {
        const selectedOptions = props.options.filter(option => option.selected);
        if (selectedOptions && selectedOptions.length > 0) {
            selectedKey = selectedOptions[0].key;
        }
    }
    return (
        <base.fabric.Dropdown
            dropdownWidth={dropdownWidth}
            {...props}
            label={props.collapseLabel ? null : props.label}
            selectedKey={selectedKey}
            onRenderTitle={props.collapseLabel && ((a, b) => {
                return (
                    <span>
                        {props.label}: {(a[0] as FabricTypes.IDropdownOption).text}
                    </span>
                );
            })}
        />
    );
}
