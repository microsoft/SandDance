// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { strings } from '../language';

export interface IDialogProps extends FluentUITypes.IDialogProps {
    title?: string;
    children?: React.ReactNode;
    buttons?: JSX.Element | JSX.Element[];
}

export function Dialog(props: IDialogProps) {
    return (
        <base.fluentUI.Dialog
            {...props}
            dialogContentProps={{
                ...{
                    type: base.fluentUI.DialogType.normal,
                    title: props.title,
                },
                ...props.dialogContentProps
            }}
        >
            <div
                onKeyUp={e => {
                    e.nativeEvent.stopImmediatePropagation();
                }}
            >
                {props.children}
            </div>
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