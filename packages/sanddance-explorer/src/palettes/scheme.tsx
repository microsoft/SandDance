// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';

export interface ISchemeOption extends FabricTypes.IDropdownOption {
    scheme: string;
    children: React.ReactNode;
}

export function schemeOption(selected: string, scheme: string): ISchemeOption {
    return {
        key: scheme,
        text: scheme,
        selected: selected === scheme,
        scheme: scheme,
        children: schemesJSX[scheme]
    };
}

export const schemesJSX: { [scheme: string]: JSX.Element } = {};
