// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { DataFile } from '../interfaces';
import { Dialog } from '../controls/dialog';
import { Dropdown } from '../controls/dropdown';
import { Explorer } from '../explorer';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { Group } from '../controls/group';
import {
    LinearScale,
    OrdinalScale,
    QuantileScale,
    QuantizeScale,
    SequentialScale,
    Signal as VegaSignal,
    Spec,
    UrlData,
    ValuesData
} from 'vega-typings/types';
import { SandDance } from '@msrvida/sanddance-react';
import { Signal } from '../controls/signal';
import { strings } from '../language';

type ScalesWithRange = QuantileScale | QuantizeScale | OrdinalScale | LinearScale | SequentialScale;

export interface Props {
    explorer: Explorer;
    dataFile: DataFile;
    scheme: string;
}

export interface State {
    showVegaDialog: boolean;
    dataRefType: DataRefType;
    spec: Spec;
}

enum DataRefType {
    none, inline, url
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

function cloneData(vegaSpec: Spec) {
    const data0 = vegaSpec.data[0];
    const valuesData = data0 as ValuesData;
    const values = valuesData.values;
    delete valuesData.values;
    const data = SandDance.VegaDeckGl.util.clone(vegaSpec.data);
    valuesData.values = values;
    return data;
}

function cloneScales(vegaSpec: Spec) {
    return SandDance.VegaDeckGl.util.clone(vegaSpec.scales);
}

function serializeSpec(vegaSpec: Spec, datafile: DataFile, dataRefType: DataRefType, scheme: string) {
    const scales = cloneScales(vegaSpec);
    const colorScale = scales.filter(scale => scale.name === SandDance.constants.ScaleNames.Color)[0];
    if (scheme.indexOf('dual_') >= 0) {
        (colorScale as ScalesWithRange).range = SandDance.colorSchemes.filter(cs => cs.scheme === scheme)[0].colors;
    }
    if (dataRefType === DataRefType.inline) {
        return { ...vegaSpec, scales };
    }
    const data = cloneData(vegaSpec);
    const data0 = data[0];
    if (dataRefType === DataRefType.none) {
        const valuesData = data0 as ValuesData;
        valuesData.values = [];
    } else if (dataRefType === DataRefType.url) {
        const urlData = data0 as UrlData;
        urlData.url = datafile.dataUrl;
        urlData.format = { parse: 'auto', type: datafile.type };
    }
    return { ...vegaSpec, data, scales };
}

function defaultDataRefType(datafile: DataFile) {
    if (datafile.dataUrl) {
        return DataRefType.url;
    }
    return DataRefType.none;
}

function initState(props: Props): State {
    return {
        showVegaDialog: false,
        dataRefType: defaultDataRefType(props.dataFile),
        spec: null
    };
}

export class Settings extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = initState(props);
    }

    render() {
        const { props, state } = this;
        if (!props.explorer.viewer || !props.explorer.viewer.vegaSpec) return null;
        const options: FabricTypes.IDropdownOption[] = [
            {
                key: DataRefType.none,
                text: strings.selectVegaSpecDataNone,
                selected: this.state.dataRefType === DataRefType.none,
                data: DataRefType.none
            },
            !props.dataFile.rawText && {
                key: DataRefType.url,
                text: strings.selectVegaSpecDataUrl,
                selected: this.state.dataRefType === DataRefType.url,
                data: DataRefType.url
            },
            {
                key: DataRefType.inline,
                text: strings.selectVegaSpecDataInline,
                selected: this.state.dataRefType === DataRefType.inline,
                data: DataRefType.inline
            }
        ].filter(Boolean);
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
                        onClick={() => this.setState({
                            showVegaDialog: true,
                            spec: serializeSpec(props.explorer.viewer.vegaSpec, props.dataFile, this.state.dataRefType, this.props.scheme)
                        })}
                    />
                </Group>
                <Dialog
                    hidden={!state.showVegaDialog}
                    onDismiss={() => this.setState(initState(this.props))}
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
                    <Dropdown
                        label={strings.labelVegaSpecData}
                        options={options}
                        onChange={(e, o) => this.setState({
                            dataRefType: o.data,
                            spec: serializeSpec(props.explorer.viewer.vegaSpec, props.dataFile, o.data, this.props.scheme)
                        })}
                    />
                    <pre id="sanddance-vega-spec">
                        {JSON.stringify(this.state.spec, null, 2)}
                    </pre>
                    <div>
                        {strings.labelVegaSpecNotes}
                    </div>
                </Dialog>
            </div>
        );
    }
}