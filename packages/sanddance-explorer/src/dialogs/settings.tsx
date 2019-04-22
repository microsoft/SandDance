// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { Dialog } from '../controls/dialog';
import { Explorer } from '../explorer';
import { Group } from '../controls/group';
import { SandDance } from '@msrvida/sanddance-react';
import { Signal } from '../controls/signal';
import { Signal as VegaSignal } from 'vega-typings/types';
import { strings } from '../language';

export interface Props {
    explorer: Explorer;
}

export interface State {
    showVegaDialog: boolean;
}

function filterSignals(signal: VegaSignal) {
    switch (signal.name) {
        case SandDance.constants.BinXSignal:
        case SandDance.constants.BinYSignal:
        case SandDance.constants.ColorBinCountSignal:
        case SandDance.constants.PointSizeSignal:
        case SandDance.constants.TreeMapMethod:
            return false;
        default:
            return true;
    }
}

export class Settings extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showVegaDialog: false
        };
    }

    render() {
        const { props, state } = this;
        if (!props.explorer.viewer || !props.explorer.viewer.vegaSpec) return null;
        return (
            <div>
                <Group
                    label={strings.dialogTitleChartSettings}
                >
                    {props.explorer.viewer.vegaSpec.signals.filter(filterSignals).map((signal, i) => {
                        return (
                            <Signal
                                key={i}
                                signal={signal}
                                explorer={props.explorer}
                            />
                        );
                    })}
                </Group>
                <Group
                    label={strings.dialogTitleTools}
                >
                    <base.fabric.DefaultButton
                        text={strings.buttonShowVegaSpec}
                        onClick={() => this.setState({ showVegaDialog: true })}
                    />
                </Group>
                <Dialog
                    hidden={!state.showVegaDialog}
                    onDismiss={() => this.setState({ showVegaDialog: false })}
                    minWidth="80%"
                    title={strings.dialogTitleVegaSpec}
                    buttons={[
                        (
                            <base.fabric.PrimaryButton
                                key="copy"
                                iconProps={{ iconName: 'Copy' }}
                                text={strings.buttonCopyToClipboard}
                                onClick={() => {
                                    var pre = document.getElementById("sanddance-vega-spec") as HTMLPreElement;
                                    var range = document.createRange();
                                    range.selectNode(pre);
                                    const selection = window.getSelection();
                                    selection.removeAllRanges();
                                    selection.addRange(range);
                                    document.execCommand("copy");
                                }}
                            />
                        ),
                        (
                            <base.fabric.DefaultButton
                                key="edit"
                                iconProps={{ iconName: 'OpenInNewWindow' }}
                                text={strings.buttonLaunchVegaEditor}
                                onClick={() => {
                                    window.open('https://vega.github.io/editor/', '_blank');
                                }}
                            />
                        )
                    ]}
                >
                    <pre
                        id="sanddance-vega-spec"
                        style={{
                            height: `${document.body.offsetHeight * 0.5}px`
                        }}>
                        {JSON.stringify(props.explorer.viewer.vegaSpec, null, 2)}
                    </pre>
                    <div>
                        {strings.labelVegaSpecNotes}
                    </div>
                </Dialog>
            </div>
        );
    }
}