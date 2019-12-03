// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { strings } from '../language';

export interface Props extends FabricTypes.IDialogProps {
    title?: string;
    children?: React.ReactNode;
    buttons?: JSX.Element | JSX.Element[];
}

export function Dialog(props: Props) {
    return (
        <base.fabric.Dialog
            {...props}
            dialogContentProps={{
                type: base.fabric.DialogType.normal,
                title: props.title
            }}
        >
            {props.children}
            <base.fabric.DialogFooter>
                {props.buttons}
                <base.fabric.DefaultButton onClick={props.onDismiss} text={strings.buttonClose} />
            </base.fabric.DialogFooter>
        </base.fabric.Dialog>

    );
}