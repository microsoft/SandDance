/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';

export interface ISchemeOption extends FluentUITypes.IDropdownOption {
    scheme: string;
    children: React.ReactNode;
}

export function schemeOption(selected: string, scheme: string): ISchemeOption {
    return {
        key: scheme,
        text: scheme,
        selected: selected === scheme,
        scheme: scheme,
        children: schemesJSX[scheme],
    };
}

export const schemesJSX: { [scheme: string]: JSX.Element } = {};
