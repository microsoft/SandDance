/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { Group } from '../controls/group';
import { HistoryItem } from '../explorer';
import { KeyCodes } from '../keycodes';
import { strings } from '../language';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { util } from '@msrvida/sanddance-react';
import { Explorer_Class } from '../explorer';

export interface Props {
    disabled?: boolean;
    theme: string;
    themePalette: Partial<FluentUITypes.IPalette>;
    historyIndex: number;
    historyItems: HistoryItem[];
    redo: (historyIndex: number) => void;
    explorer: Explorer_Class;
}

export function History(props: Props) {
    return (
        <Group label={strings.labelHistory} className="sanddance-history">
            <ol>
                {props.historyItems.map((hi, i) => {
                    let ref: React.RefObject<FluentUITypes.IButton>;
                    if (i === props.historyIndex) {
                        ref = base.react.createRef<FluentUITypes.IButton>();
                        props.explorer.dialogFocusHandler.focus = () => {
                            ref.current?.focus();
                        };
                    }
                    return (
                        <li
                            key={i}
                            className={util.classList(i === props.historyIndex && 'selected')}
                            onKeyUp={e => {
                                if (e.keyCode === KeyCodes.ENTER) {
                                    props.redo(i);
                                }
                            }}
                        >
                            <base.fluentUI.DefaultButton
                                className='sanddance-history-button'
                                componentRef={ref}
                                text={hi.label}
                                onClick={() => props.redo(i)}
                            />
                        </li>
                    );
                })}
            </ol>
        </Group>
    );
}
