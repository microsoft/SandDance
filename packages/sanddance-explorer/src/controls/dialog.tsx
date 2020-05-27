// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { strings } from '../language';

export interface Props extends FluentUITypes.IDialogProps {
    title?: string;
    children?: React.ReactNode;
    buttons?: JSX.Element | JSX.Element[];
}

export function Dialog(props: Props) {
    return (
        <base.fluentUI.Dialog
            {...props}
            dialogContentProps={{
                type: base.fluentUI.DialogType.normal,
                title: props.title
            }}
        >
            {props.children}
            <base.fluentUI.DialogFooter>
                {props.buttons}
                <base.fluentUI.DefaultButton
                    iconProps={{ iconName: 'Cancel' }}
                    onClick={props.onDismiss}
                    text={strings.buttonClose}
                />
            </base.fluentUI.DialogFooter>
        </base.fluentUI.Dialog>

    );
}