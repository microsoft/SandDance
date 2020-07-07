// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { DataScope, Props as DataScopeProps } from './dataScope';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { IconButton } from './iconButton';
import { Scrollable } from './scrollable';
import { SideTabId } from '../interfaces';
import { strings } from '../language';
import { util } from '@msrvida/sanddance-react';

export interface Props {
    calculating: boolean;
    children: React.ReactNode;
    hideSidebarControls: boolean;
    onSideTabClick: (sideTabId: SideTabId) => void;
    selectedSideTab: SideTabId;
    disabled: boolean;
    dataScopeProps: DataScopeProps;
    closed: boolean;
    pinned: boolean;
    themePalette: Partial<FluentUITypes.IPalette>;
}

export function Sidebar(props: Props) {
    const sidebuttons: SidebuttonProps[] = [
        {
            sideTabId: SideTabId.ChartType,
            iconName: 'BIDashboard',
            title: strings.labelChart
        },
        {
            sideTabId: SideTabId.Color,
            iconName: 'Color',
            title: strings.labelColor
        },
        {
            sideTabId: SideTabId.Data,
            iconName: 'Table',
            title: strings.labelDataBrowser
        },
        {
            sideTabId: SideTabId.Search,
            iconName: 'Search',
            title: strings.labelSearch
        },
        {
            sideTabId: SideTabId.Snapshots,
            iconName: 'Camera',
            title: strings.labelSnapshots
        },
        {
            sideTabId: SideTabId.History,
            iconName: 'History',
            title: strings.labelHistory
        },
        {
            sideTabId: SideTabId.Settings,
            iconName: 'Settings',
            title: strings.labelChartSettings
        }
    ];
    return (
        <div className={util.classList('sanddance-sidebar', 'calculator', props.pinned && 'pinned', props.closed && 'closed')}>
            <div className="sidebar-content">
                <DataScope
                    {...props.dataScopeProps}
                />
                <div className="vbuttons" role='tablist'>
                    <div className="sidebar-dialogs">
                        {sidebuttons.map((sidebutton, i) => (
                            <Sidebutton
                                key={i}
                                {...props}
                                {...sidebutton}
                                themePalette={props.themePalette}
                            />
                        ))}
                    </div>
                    {!props.hideSidebarControls && (
                        <div className="sidebar-controls">
                            <Sidebutton
                                {...props}
                                sideTabId={SideTabId.Pin}
                                iconName={props.pinned ? 'Pinned' : 'Pin'}
                                title={props.pinned ? strings.buttonToolbarFloat : strings.buttonToolbarDock}
                            />
                            <Sidebutton
                                {...props}
                                sideTabId={SideTabId.Collapse}
                                iconName={props.closed ? 'DoubleChevronRight12' : 'DoubleChevronLeft12'}
                                title={props.closed ? strings.buttonToolbarShow : strings.buttonToolbarHide}
                            />
                        </div>
                    )}
                </div>
                <Scrollable role='tabpanel'>
                    <div className="sidetab">
                        {props.children}
                    </div>
                </Scrollable>
                {props.calculating && (
                    <div className="calculating">
                        <base.fluentUI.Spinner
                            size={base.fluentUI.SpinnerSize.large}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export interface SidebuttonProps {
    iconName: string;
    title: string;
    sideTabId: SideTabId;
    badgeText?: string;
    themePalette?: Partial<FluentUITypes.IPalette>;
}

export function Sidebutton(props: SidebuttonProps & Props) {
    const selected = !props.closed && props.selectedSideTab === props.sideTabId;
    return (
        <div className={util.classList('vbutton', selected && 'selected')} role='tab' aria-selected={selected}>
            {props.badgeText && <div className="count">{props.badgeText}</div>}
            <IconButton
                themePalette={props.themePalette}
                className="vbutton"
                iconName={props.iconName}
                title={props.title}
                onClick={() => { props.onSideTabClick(props.sideTabId); }}
            />
        </div>
    );
}
