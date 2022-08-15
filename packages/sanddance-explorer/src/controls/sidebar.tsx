/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { DataScope, Props as DataScopeProps } from './dataScope';
import { Scrollable } from './scrollable';
import { SideTabId } from '../interfaces';
import { strings } from '../language';
import { util } from '@msrvida/sanddance-react';
import { BaseProps, Sidebutton, SidebuttonProps } from './sideButton';

export interface Props extends BaseProps {
    calculating: boolean;
    children: React.ReactNode;
    hideSidebarControls: boolean;
    snapshotsHidden: boolean;
    disabled: boolean;
    dataScopeProps: DataScopeProps;
    pinned: boolean;
}

export function Sidebar(props: Props) {
    const sidebuttons: SidebuttonProps[] = [
        {
            sideTabId: SideTabId.ChartType,
            iconName: 'BIDashboard',
            title: strings.labelChart,
        },
        {
            sideTabId: SideTabId.Color,
            iconName: 'Color',
            title: strings.labelColor,
        },
        {
            sideTabId: SideTabId.Data,
            iconName: 'Table',
            title: strings.labelDataBrowser,
        },
        {
            sideTabId: SideTabId.Search,
            iconName: 'Search',
            title: strings.labelSearch,
        },
        !props.snapshotsHidden && {
            sideTabId: SideTabId.Snapshots,
            iconName: 'Camera',
            title: strings.labelSnapshots,
        },
        {
            sideTabId: SideTabId.History,
            iconName: 'History',
            title: strings.labelHistory,
        },
        {
            sideTabId: SideTabId.Settings,
            iconName: 'Settings',
            title: strings.labelChartSettings,
        },
    ].filter(Boolean);
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
                                role='button'
                                sideTabId={SideTabId.Pin}
                                iconName={props.pinned ? 'Pinned' : 'Pin'}
                                title={props.pinned ? strings.buttonToolbarFloat : strings.buttonToolbarDock}
                            />
                            <Sidebutton
                                {...props}
                                role='button'
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
