// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { Button, Props as TopBarButtonProps } from './button';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from '../language';

export { TopBarButtonProps };

export interface Props {
    logoClickTarget: string;
    buttons?: TopBarButtonProps[];
    doFilter: { (search: SandDance.types.Search): void };
    doUnfilter: { (): void };
    doDeselect: { (): void };
    filter: SandDance.types.Search;
    loaded: boolean;
    selectionState: SandDance.types.SelectionState;
    selectionSearch: SandDance.types.Search;
    themePalette: Partial<FabricTypes.IPalette>;
}

export function Topbar(props: Props) {
    const zeroResults = props.selectionState.selectedData && props.selectionState.selectedData.length === 0;
    const disabled = !props.loaded;
    return (
        <div className="sanddance-explorer-topbar">
            <div className="logo">
                <base.fabric.Icon iconName="Blur" />
                <a href="/SandDance/" target={props.logoClickTarget || '_blank'}>{strings.appName}</a>
            </div>
            <div>
                <Button
                    themePalette={props.themePalette}
                    text={strings.buttonDeselect}
                    iconName="Cancel"
                    disabled={disabled || !props.selectionSearch}
                    onClick={props.doDeselect}
                />
                <Button
                    themePalette={props.themePalette}
                    text={strings.buttonIsolate}
                    iconName="Filter"
                    disabled={disabled || !props.selectionSearch || zeroResults}
                    onClick={() => props.doFilter(props.selectionSearch)}
                />
                <Button
                    themePalette={props.themePalette}
                    text={strings.buttonExclude}
                    iconName="ClearFilter"
                    disabled={disabled || !props.selectionSearch || zeroResults}
                    onClick={() => props.doFilter(SandDance.searchExpression.invert(props.selectionSearch))}
                />
                <Button
                    themePalette={props.themePalette}
                    text={strings.buttonReset}
                    iconName="RemoveFilter"
                    disabled={disabled || !props.filter}
                    onClick={props.doUnfilter}
                />
                {props.buttons && props.buttons.map((bp, i) => (
                    <Button key={i} {...bp} />
                ))}
            </div>
        </div>
    );
}
