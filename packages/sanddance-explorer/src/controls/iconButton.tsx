// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';

export interface IIconButtonProps {
    className?: string;
    disabled?: boolean;
    iconName: string;
    onClick: { (event: React.MouseEvent<{}>): void };
    onMouseOver?: { (event: React.MouseEvent<{}>): void };
    menuProps?: FluentUITypes.IContextualMenuProps;
    title: string;
    themePalette: Partial<FluentUITypes.IPalette>;
}

export function IconButton(props: IIconButtonProps) {
    return (
        <base.fluentUI.IconButton
            {...props}
            styles={{
                root: {
                    color: props.themePalette.black
                },
                rootHovered: {
                    background: 'transparent',
                    color: props.themePalette.themePrimary
                },
                rootPressed: {
                    background: 'transparent'
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
