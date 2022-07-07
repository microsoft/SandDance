/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

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
