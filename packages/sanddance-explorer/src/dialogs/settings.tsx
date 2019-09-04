// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import * as SandDanceReact from '@msrvida/sanddance-react';
import { base } from '../base';
import { capabilities } from '../canvas';
import { DataFile } from '../interfaces';
import { Dialog } from '../controls/dialog';
import { Dropdown } from '../controls/dropdown';
import { Explorer } from '../explorer';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { Group } from '../controls/group';
import {
    LinearScale,
    NewSignal,
    OrdinalScale,
    QuantileScale,
    QuantizeScale,
    SequentialScale,
    Signal as VegaSignal,
    Spec,
    UrlData,
    ValuesData
} from 'vega-typings/types';
import { Signal } from '../controls/signal';
import { strings } from '../language';
import { version } from '../version';

import SandDance = SandDanceReact.SandDance;

type ScalesWithRange = QuantileScale | QuantizeScale | OrdinalScale | LinearScale | SequentialScale;

export interface Props {
    explorer: Explorer;
    dataFile: DataFile;
    scheme: string;
    hideLegend: boolean;
    onToggleLegend: (checked: boolean) => void;
    hideAxes: boolean;
    onToggleAxes: (checked: boolean) => void;
}

export interface State {
    showSystemDialog: boolean;
    showVegaDialog: boolean;
    dataRefType: DataRefType;
    spec: Spec;
}

enum DataRefType {
    none, inline, url
}

function filterSignals(signal: NewSignal) {
    switch (signal.name) {
        case SandDance.constants.SignalNames.XBins:
        case SandDance.constants.SignalNames.YBins:
        case SandDance.constants.SignalNames.ColorBinCount:
        case SandDance.constants.SignalNames.ColorReverse:
        case SandDance.constants.SignalNames.PointSize:
        case SandDance.constants.SignalNames.TreeMapMethod:
            return false;
        default:
            return !!signal.bind;
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
        showSystemDialog: false,
        showVegaDialog: false,
        dataRefType: defaultDataRefType(props.dataFile),
        spec: null
    };
}

function signalGroupKey(key: string) {
    for (let i = 0; i < strings.signalGroups.length; i++) {
        if (strings.signalGroups[i].prefix === key) {
            return key;
        }
    }
    return '*';
}

function vegaSignalGroups(vegaSignals: VegaSignal[]) {
    const signalGroupMap: { [key: string]: VegaSignal[] } = {};
    vegaSignals.forEach(vs => {
        const split = vs.name.split('_');
        const key = signalGroupKey(split[0]);
        signalGroupMap[key] = signalGroupMap[key] || [];
        signalGroupMap[key].push(vs);
    });
    return signalGroupMap;
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
        const signalGroupMap = vegaSignalGroups(props.explorer.viewer.vegaSpec.signals);
        return (
            <div>
                {strings.signalGroups.map((sg: { prefix: string, label: string }) => {
                    const vegaSignals = signalGroupMap[sg.prefix];
                    if (vegaSignals) {
                        const filteredVegaSignals = vegaSignals.filter(filterSignals);
                        if (filteredVegaSignals.length > 0) {
                            return (
                                <Group
                                    key={sg.prefix}
                                    label={sg.label}
                                >
                                    {filteredVegaSignals.map((signal, i) => (
                                        <Signal
                                            key={i}
                                            signal={signal}
                                            explorer={props.explorer}
                                        />
                                    ))}
                                </Group>
                            );
                        }
                    }
                })}
                <Group
                    label={strings.labelChartCanvas}
                >
                    <base.fabric.Toggle
                        label={strings.labelShowAxes}
                        defaultChecked={!props.hideAxes}
                        onChange={(e, checked?) => props.onToggleAxes(!checked)}
                    />
                    <base.fabric.Toggle
                        label={strings.labelShowLegend}
                        defaultChecked={!props.hideLegend}
                        onChange={(e, checked?) => props.onToggleLegend(!checked)}
                    />
                </Group>
                <Group
                    label={strings.labelTools}
                >
                    <base.fabric.DefaultButton
                        text={strings.buttonShowVegaSpec}
                        onClick={() => this.setState({
                            showVegaDialog: true,
                            spec: serializeSpec(props.explorer.viewer.vegaSpec, props.dataFile, this.state.dataRefType, this.props.scheme)
                        })}
                    />
                </Group>
                <Group
                    label={strings.labelTransitionDurations}
                >
                    <base.fabric.Slider
                        label={strings.labelTransitionColor}
                        onChange={value => {
                            this.props.explorer.viewerOptions.transitionDurations.color = value;
                        }}
                        min={0}
                        max={10000}
                        defaultValue={this.props.explorer.viewerOptions.transitionDurations.color}
                    />
                    <base.fabric.Slider
                        label={strings.labelTransitionPosition}
                        onChange={value => {
                            this.props.explorer.viewerOptions.transitionDurations.position = value;
                        }}
                        min={0}
                        max={10000}
                        defaultValue={this.props.explorer.viewerOptions.transitionDurations.position}
                    />
                    <base.fabric.Slider
                        label={strings.labelTransitionSize}
                        onChange={value => {
                            this.props.explorer.viewerOptions.transitionDurations.size = value;
                        }}
                        min={0}
                        max={10000}
                        defaultValue={this.props.explorer.viewerOptions.transitionDurations.size}
                    />
                    <base.fabric.Slider
                        label={strings.labelTransitionCamera}
                        onChange={value => {
                            this.props.explorer.viewerOptions.transitionDurations.view = value;
                        }}
                        min={0}
                        max={10000}
                        defaultValue={this.props.explorer.viewerOptions.transitionDurations.view}
                    />
                </Group>
                <Group label={strings.labelSystem}>
                    <base.fabric.DefaultButton
                        text={strings.labelSystemInfo}
                        onClick={() => this.setState({ showSystemDialog: true })}
                    />
                </Group>
                <Dialog
                    hidden={!state.showVegaDialog}
                    onDismiss={() => this.setState(initState(this.props))}
                    minWidth="80%"
                    title={strings.labelVegaSpec}
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
                <Dialog
                    hidden={!state.showSystemDialog}
                    onDismiss={() => this.setState(initState(this.props))}
                    title={strings.labelSystemInfo}
                >
                    <ul>
                        <li>
                            SandDanceExplorer version: {version}
                        </li>
                        <li>
                            SandDanceReact version: {SandDanceReact.version}
                        </li>
                        <li>
                            SandDance version: {SandDance.version}
                        </li>
                        <li>
                            WebGL enabled: {capabilities.webgl ? strings.labelYes : strings.labelNo}
                        </li>
                        <li>
                            WebGL2 enabled: {capabilities.webgl2 ? strings.labelYes : strings.labelNo}
                        </li>
                    </ul>
                </Dialog>
            </div>
        );
    }
}