// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { CommandBarButtonStyles } from './CommandBarButton.styles';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { Logo } from './logo';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from '../language';

export interface Props {
    logoClickUrl: string;
    logoClickTarget: string;
    buttons?: FabricTypes.ICommandBarItemProps[];
    doFilter: { (search: SandDance.types.Search): void };
    doUnfilter: { (): void };
    doDeselect: { (): void };
    filter: SandDance.types.Search;
    loaded: boolean;
    selectionState: SandDance.types.SelectionState;
    selectionSearch: SandDance.types.Search;
    view: SandDance.VegaDeckGl.types.View;
    onViewClick: { (): void };
    onHomeClick: { (): void };
    themePalette: Partial<FabricTypes.IPalette>;
}

export function Topbar(props: Props) {
    const zeroResults = props.selectionState.selectedData && props.selectionState.selectedData.length === 0;
    const disabled = !props.loaded;
    const items: FabricTypes.ICommandBarItemProps[] = [
        {
            key: 'deselect',
            name: strings.buttonDeselect,
            iconProps: {
                iconName: 'Cancel'
            },
            disabled: disabled || !props.selectionSearch,
            onClick: props.doDeselect
        },
        {
            key: 'isolate',
            name: strings.buttonIsolate,
            iconProps: {
                iconName: "Filter"
            },
            disabled: disabled || !props.selectionSearch || zeroResults,
            onClick: () => props.doFilter(props.selectionSearch)
        },
        {
            key: 'exclude',
            name: strings.buttonExclude,
            iconProps: {
                iconName: "ClearFilter"
            },
            disabled: disabled || !props.selectionSearch || zeroResults,
            onClick: () => props.doFilter(SandDance.searchExpression.invert(props.selectionSearch))
        },
        {
            key: 'reset',
            name: strings.buttonReset,
            iconProps: {
                iconName: "RemoveFilter"
            },
            disabled: disabled || !props.filter,
            onClick: props.doUnfilter
        }
    ];
    if (props.buttons) {
        items.push.apply(items, props.buttons);
    }
    const farItems: FabricTypes.ICommandBarItemProps[] = [
        {
            key: 'view',
            iconProps: {
                iconName: props.view === '2d' ? "Product" : "Page"
            },
            title: props.view === '2d' ? strings.labelViewType3d : strings.lavelViewType2d,
            onClick: props.onViewClick
        },
        {
            key: 'home',
            iconProps: {
                iconName: "PicturePosition"
            },
            title: strings.buttonCameraHome,
            onClick: props.onHomeClick
        }
    ];

    return (
        <div className="sanddance-explorer-topbar">
            <div className="logo">
                <Logo />
                <a href={props.logoClickUrl || "/"} target={props.logoClickTarget || '_blank'}>{strings.appName}</a>
            </div>
            <div className="sanddance-explorer-commandbar">
                <base.fabric.Customizer
                    scopedSettings={{
                        CommandBarButton: {
                            styles: (buttonProps: FabricTypes.IButtonProps) => {
                                buttonProps.theme.palette = props.themePalette as FabricTypes.IPalette;
                                return CommandBarButtonStyles(buttonProps);
                            }
                        }
                    }}
                >
                    <base.fabric.CommandBar
                        items={items}
                        farItems={farItems}
                        styles={{
                            root: {
                                backgroundColor: "transparent",
                                height: "unset",
                                paddingLeft: 0,
                                paddingRight: 0
                            }
                        }}
                    />
                </base.fabric.Customizer>
            </div>
        </div>
    );
}
