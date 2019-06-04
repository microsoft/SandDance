// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { DataScope, Props as DataScopeProps } from './dataScope';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { IconButton } from './iconButton';
import { Scrollable } from './scrollable';
import { strings } from '../language';
import { util } from '@msrvida/sanddance-react';

export enum SideTabId {
    ChartType, Data, Search, Color, Snapshots, Settings, Pin, Collapse
}

export interface Props {
    calculating: boolean;
    children: JSX.Element | JSX.Element[];
    hideSidebarControls: boolean;
    onSideTabClick: (sideTabId: SideTabId) => void;
    selectedSideTab: SideTabId;
    disabled: boolean;
    dataScopeProps: DataScopeProps;
    closed: boolean;
    pinned: boolean;
    themePalette: Partial<FabricTypes.IPalette>;
}

export function Sidebar(props: Props) {
    const sidebuttons: SidebuttonProps[] = [
        {
            sideTabId: SideTabId.ChartType,
            iconName: "BIDashboard",
            title: strings.labelChart
        },
        {
            sideTabId: SideTabId.Color,
            iconName: "Color",
            title: strings.labelColor
        },
        {
            sideTabId: SideTabId.Data,
            iconName: "Table",
            title: strings.labelDataBrowser
        },
        {
            sideTabId: SideTabId.Search,
            iconName: "Search",
            title: strings.labelSearch
        },
        {
            sideTabId: SideTabId.Snapshots,
            iconName: "Camera",
            title: strings.labelSnapshots
        },
        {
            sideTabId: SideTabId.Settings,
            iconName: "Settings",
            title: strings.labelChartSettings
        }
    ];
    return (
        <div className={util.classList("sanddance-sidebar", "calculator", props.pinned && "pinned", props.closed && "closed")}>
            <DataScope
                {...props.dataScopeProps}
            />
            <div className="vbuttons">
                <div>
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
                    <div>
                        <Sidebutton
                            {...props}
                            sideTabId={SideTabId.Pin}
                            iconName={props.pinned ? "Pinned" : "Pin"}
                            title={props.pinned ? strings.buttonToolbarFloat : strings.buttonToolbarDock}
                        />
                        <Sidebutton
                            {...props}
                            sideTabId={SideTabId.Collapse}
                            iconName={props.closed ? "DoubleChevronRight12" : "DoubleChevronLeft12"}
                            title={props.closed ? strings.buttonToolbarShow : strings.buttonToolbarHide}
                        />
                    </div>
                )}
            </div>
            <Scrollable>
                <div className="sidetab">
                    {props.children}
                </div>
            </Scrollable>
            {props.calculating && (
                <div className="calculating">
                    <base.fabric.Spinner
                        size={base.fabric.SpinnerSize.large}
                    />
                </div>
            )}
        </div>
    );
}

export interface SidebuttonProps {
    iconName: string;
    title: string;
    sideTabId: SideTabId;
    badgeText?: string;
    themePalette?: Partial<FabricTypes.IPalette>;
}

export function Sidebutton(props: SidebuttonProps & Props) {
    return (
        <div className={util.classList("vbutton", !props.closed && props.selectedSideTab === props.sideTabId && "selected")}>
            {props.badgeText && <div className="count">{props.badgeText}</div>}
            <IconButton
                themePalette={props.themePalette}
                className="vbutton"
                iconName={props.iconName}
                title={props.title}
                onClick={() => { props.onSideTabClick(props.sideTabId) }}
            />
        </div>
    );
}
