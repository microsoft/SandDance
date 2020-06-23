// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { CommandBarButtonStyles } from './CommandBarButton.styles';
import { Logo } from './logo';
import { base } from '../base';
import { HistoryItem } from '../explorer';
import { strings } from '../language';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { SandDance } from '@msrvida/sanddance-react';

import Search = SandDance.searchExpression.Search;

export interface Props {
    collapseLabels: boolean;
    logoClickUrl: string;
    logoClickTarget: string;
    buttons?: FluentUITypes.ICommandBarItemProps[];
    doFilter: { (search: Search, historicFilterChange: string): void };
    doUnfilter: (historicFilterChange: string) => void;
    doDeselect: () => void;
    filter: Search;
    loaded: boolean;
    selectionState: SandDance.types.SelectionState;
    selectionSearch: Search;
    view: SandDance.types.View;
    snapshots: SandDance.types.Snapshot[];
    onSnapshotClick: () => void;
    onSnapshotNextClick: () => void;
    onSnapshotPreviousClick: () => void;
    onViewClick: () => void;
    onHomeClick: () => void;
    themePalette: Partial<FluentUITypes.IPalette>;
    historyIndex: number;
    historyItems: HistoryItem[];
    undo: () => void;
    redo: () => void;
}

export function Topbar(props: Props) {
    const zeroResults = props.selectionState.selectedData && props.selectionState.selectedData.length === 0;
    const disabled = !props.loaded;
    const items: FluentUITypes.ICommandBarItemProps[] = [
        {
            key: 'undo',
            name: strings.buttonUndo,
            iconProps: {
                iconName: 'Undo'
            },
            disabled: disabled || props.historyItems.length === 0 || props.historyIndex === 0,
            onClick: props.undo
        },
        {
            key: 'redo',
            name: strings.buttonRedo,
            iconProps: {
                iconName: 'Redo'
            },
            disabled: disabled || props.historyItems.length <= 1 || props.historyIndex >= props.historyItems.length - 1,
            onClick: props.redo
        },
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
                iconName: 'Filter'
            },
            disabled: disabled || !props.selectionSearch || zeroResults,
            onClick: () => props.doFilter(props.selectionSearch, strings.labelHistoryFilterIsolate)
        },
        {
            key: 'exclude',
            name: strings.buttonExclude,
            iconProps: {
                iconName: 'ClearFilter'
            },
            disabled: disabled || !props.selectionSearch || zeroResults,
            onClick: () => props.doFilter(SandDance.searchExpression.invert(props.selectionSearch), strings.labelHistoryFilterIExclude)
        },
        {
            key: 'reset',
            name: strings.buttonReset,
            iconProps: {
                iconName: 'RemoveFilter'
            },
            disabled: disabled || !props.filter,
            onClick: () => props.doUnfilter(strings.labelHistoryFilterClear)
        }
    ];
    if (props.buttons) {
        items.push.apply(items, props.buttons);
    }
    if (props.collapseLabels) {
        items.forEach(item => item.iconOnly = true);
    }
    const farItems: FluentUITypes.ICommandBarItemProps[] = [
        {
            key: 'previous-snapshot',
            iconProps: {
                iconName: 'Previous'
            },
            title: strings.buttonPrevSnapshot,
            onClick: props.onSnapshotPreviousClick,
            disabled: props.snapshots.length < 2
        },
        {
            key: 'snapshot',
            iconProps: {
                iconName: 'Camera'
            },
            title: strings.buttonCreateSnapshot,
            onClick: props.onSnapshotClick,
            disabled: !props.loaded
        },
        {
            key: 'next-snapshot',
            iconProps: {
                iconName: 'Next'
            },
            title: strings.buttonNextSnapshot,
            onClick: props.onSnapshotNextClick,
            disabled: props.snapshots.length < 2
        },
        {
            key: 'view',
            iconProps: {
                iconName: props.view === '2d' ? 'CubeShape' : 'Page'
            },
            title: props.view === '2d' ? strings.labelViewType3d : strings.labelViewType2d,
            onClick: props.onViewClick,
            disabled: !props.loaded
        },
        {
            key: 'home',
            iconProps: {
                iconName: 'PicturePosition'
            },
            title: strings.buttonCameraHome,
            onClick: props.onHomeClick,
            disabled: !props.loaded
        }
    ];

    return (
        <div className="sanddance-explorer-topbar">
            <div className="logo">
                <Logo />
                <a href={props.logoClickUrl || '/'} target={props.logoClickTarget || '_blank'}>{strings.appName}</a>
            </div>
            <div className="sanddance-explorer-commandbar">
                <base.fluentUI.Customizer
                    scopedSettings={{
                        CommandBarButton: {
                            styles: (buttonProps: FluentUITypes.IButtonProps) => {
                                buttonProps.theme.palette = props.themePalette as FluentUITypes.IPalette;
                                return CommandBarButtonStyles(buttonProps);
                            }
                        }
                    }}
                >
                    <base.fluentUI.CommandBar
                        items={items}
                        farItems={farItems}
                        styles={{
                            root: {
                                backgroundColor: 'transparent',
                                height: 'unset',
                                paddingLeft: 0,
                                paddingRight: 0
                            }
                        }}
                    />
                </base.fluentUI.Customizer>
            </div>
        </div>
    );
}
