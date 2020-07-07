// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { Group } from '../controls/group';
import { HistoryItem } from '../explorer';
import { KeyCodes } from '../keycodes';
import { strings } from '../language';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { util } from '@msrvida/sanddance-react';

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
            <ol>
                {props.historyItems.map((hi, i) => (
                    <li
                        key={i}
                        className={util.classList(i === props.historyIndex && 'selected')}
                        onKeyUp={e => {
                            if (e.keyCode === KeyCodes.ENTER) {
                                props.redo(i);
                            }
                        }}
                        onClick={() => props.redo(i)}
                        tabIndex={0}
                    >{hi.label}</li>
                ))}
            </ol>
        </Group>
    );
}
