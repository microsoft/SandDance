/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { IconButton } from './iconButton';
import { SideTabId } from '../interfaces';
import { util } from '@msrvida/sanddance-react';
import { IButtonProps } from '@msrvida/fluentui-react-cdn-typings/types';

export interface BaseProps {
    onSideTabClick: (sideTabId: SideTabId) => void;
    selectedSideTab: SideTabId;
    closed: boolean;
    themePalette: Partial<FluentUITypes.IPalette>;
}

export interface SidebuttonProps {
    iconName: string;
    title: string;
    sideTabId: SideTabId;
    badgeText?: string;
    themePalette?: Partial<FluentUITypes.IPalette>;
    role?: string;
    omitAriaSelected?: boolean;
}

export function Sidebutton(props: SidebuttonProps & BaseProps) {
    const selected = !props.closed && props.selectedSideTab === props.sideTabId;
    const buttonProps: IButtonProps = props.omitAriaSelected ? {} : {
        'aria-selected': selected,
    };
    return (
        <div className={util.classList('vbutton', selected && 'selected')}>
            {props.badgeText && <div className="count">{props.badgeText}</div>}
            {<IconButton
                {...buttonProps}
                role={props.role || 'tab'}
                themePalette={props.themePalette}
                className="vbutton"
                iconName={props.iconName}
                title={props.title}
                onClick={() => { props.onSideTabClick(props.sideTabId); }}
            />}
        </div>
    );
}
