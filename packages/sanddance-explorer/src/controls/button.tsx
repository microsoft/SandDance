// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { IButtonProps, ICSSRule, ICSSPixelUnitRule, IPalette } from '@msrvida/office-ui-fabric-react-cdn-typings/types';

export interface Props extends IButtonProps {
    iconName?: string;
    onClick: { (event: React.MouseEvent<{}>): void };
    textAlign?: string;
    width?: ICSSRule | ICSSPixelUnitRule;
    themePalette: Partial<IPalette>;
}

export function Button(props: Props) {
    return (
        <base.fabric.DefaultButton
            {...props}
            styles={{
                root: {
                    backgroundColor: "transparent",
                    height: "30px",
                    width: props.width,
                    padding: 0
                },
                rootDisabled: {
                    backgroundColor: "transparent"
                },
                icon: {
                    color: props.themePalette.themePrimary
                },
                label: {
                    fontWeight: "400",
                    textAlign: props.textAlign || "left"
                }
            }}
            iconProps={{ iconName: props.iconName }}
        />
    );
}
