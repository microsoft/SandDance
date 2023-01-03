/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
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

export function schemeHeader(key: string, text: string): FluentUITypes.IDropdownOption {
    return {
        key,
        text,
        itemType: base.fluentUI.DropdownMenuItemType.Header,
    };
}

export const schemesJSX: { [scheme: string]: JSX.Element } = {};
