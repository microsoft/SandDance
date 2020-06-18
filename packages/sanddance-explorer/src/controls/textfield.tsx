// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { ITextFieldProps } from '@msrvida/fluentui-react-cdn-typings/types';

export function TextField(props: ITextFieldProps) {
    return (
        <base.fluentUI.TextField
            onKeyUp={e => {
                e.nativeEvent.stopImmediatePropagation();
            }}
            {...props}
        />
    );
}
