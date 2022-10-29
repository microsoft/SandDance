// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { controls } from '@msrvida/sanddance-explorer';
import { language } from './language';
import { DefaultButton } from '@fluentui/react';

export interface Props {
    log: string[];
    clearLog: () => void;
}

export interface State {
    showDialog: boolean;
}

export class LogView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            showDialog: false,
        };
    }

    render() {
        const { props, state } = this;
        return (
            <span>
                <a
                    href='#'
                    onClick={e => {
                        e.preventDefault();
                        this.setState({ showDialog: true });
                    }}
                >{language.powerBiCustomVisualLog}</a>
                <controls.Dialog
                    title={language.powerBiCustomVisualLog}
                    buttons={[
                        <DefaultButton
                            key='clear'
                            iconProps={{ iconName: 'Clear' }}
                            text={language.buttonClear}
                            onClick={props.clearLog}
                        />
                    ]}
                    hidden={!state.showDialog}
                    onDismiss={() => this.setState({ showDialog: false })}
                    minWidth={'40em'}
                >
                    <textarea cols={80} rows={10} value={props.log.map((s, i) => `${i}: ${s}`).join('\n\n')} />
                </controls.Dialog>
            </span>
        );
    }
}
