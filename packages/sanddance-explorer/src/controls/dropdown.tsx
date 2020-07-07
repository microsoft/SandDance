// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';

export const dropdownWidth = 200;

export interface IDropdownProps extends FluentUITypes.IDropdownProps {
    collapseLabel?: boolean;
}

export function Dropdown(props: IDropdownProps) {
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
                    {newProps.label}: {(a[0] as FluentUITypes.IDropdownOption).text}
                </span>
            );
        });
    }
    return (
        <base.fluentUI.Dropdown
            dropdownWidth={dropdownWidth}
            {...newProps}
            label={newProps.collapseLabel ? null : newProps.label}
            selectedKey={selectedKey}
        />
    );
}
