// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Group } from '../controls/group';
import { HistoryItem } from '../explorer';
import { strings } from '../language';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { util } from '@msrvida/sanddance-react';
import * as React from 'react';

export interface Props {
    disabled?: boolean;
    theme: string;
    themePalette: Partial<FluentUITypes.IPalette>;
    historyIndex: number;
    historyItems: HistoryItem[];
    redo: (historyIndex: number) => void;
}

export function History(props: Props) {
    return (
        <Group label={strings.labelHistory} className="sanddance-history">
            <ul>
                {props.historyItems.map((hi, i) => (
                    <li
                        key={i}
                        className={util.classList(i === props.historyIndex && 'selected')}
                        onClick={() => props.redo(i)}
                    >{hi.label}</li>
                ))}
            </ul>
        </Group>
    );
}
