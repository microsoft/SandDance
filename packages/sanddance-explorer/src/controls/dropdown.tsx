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
    const newProps = { ...props };
    let selectedKey: string | number = null;
    if (newProps.options && newProps.options.length > 1) {
        const selectedOptions = newProps.options.filter(option => option.selected);
        if (selectedOptions && selectedOptions.length > 0) {
            selectedKey = selectedOptions[0].key;
        }
    }
    if (newProps.collapseLabel) {
        newProps.onRenderTitle = ((a, b) => {
            return (
                <span>
                    {newProps.label}: {(a[0] as FabricTypes.IDropdownOption).text}
                </span>
            );
        })
    }
    return (
        <base.fabric.Dropdown
            dropdownWidth={dropdownWidth}
            {...newProps}
            label={newProps.collapseLabel ? null : newProps.label}
            selectedKey={selectedKey}
        />
    );
}
