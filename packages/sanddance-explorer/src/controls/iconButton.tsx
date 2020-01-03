// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';

export interface IconButtonProps {
    className?: string;
    disabled?: boolean;
    iconName: string;
    onClick?: { (event: React.MouseEvent<{}>): void };
    onMouseOver?: { (event: React.MouseEvent<{}>): void };
    menuProps?: FabricTypes.IContextualMenuProps;
    title: string;
    themePalette: Partial<FabricTypes.IPalette>;
}

export function IconButton(props: IconButtonProps) {
    return (
        <base.fabric.IconButton
            {...props}
            styles={{
                rootHovered: {
                    color: props.themePalette.themePrimary
                },
                menuIcon: {
                    display: 'none'
                }
            }}
            iconProps={{ iconName: props.iconName }}
            menuProps={props.menuProps}
        />
    );
}
