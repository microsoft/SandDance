// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as SandDanceReact from '@msrvida/sanddance-react';
import { base } from '../base';
import { capabilities } from '../canvas';
import { DataFile, SettingsGroup } from '../interfaces';
import { Dialog } from '../controls/dialog';
import { Dropdown } from '../controls/dropdown';
import { Explorer_Class } from '../explorer';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
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
    Transforms,
    UrlData,
    ValuesData
} from 'vega-typings/types';
import { Signal } from '../controls/signal';
import { strings } from '../language';
import { version } from '../version';

import SandDance = SandDanceReact.SandDance;

type ScalesWithRange = QuantileScale | QuantizeScale | OrdinalScale | LinearScale | SequentialScale;

export interface Props {
    additionalSettings: SettingsGroup[];
    explorer: Explorer_Class;
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
        case SandDance.constants.SignalNames.FacetBins:
        case SandDance.constants.SignalNames.FacetVBins:
        case SandDance.constants.SignalNames.ColorBinCount:
        case SandDance.constants.SignalNames.ColorReverse:
        case SandDance.constants.SignalNames.PointScale:
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
    return { data, values };
}

function cloneScales(vegaSpec: Spec) {
    return SandDance.VegaDeckGl.util.clone(vegaSpec.scales);
}

function serializeSpec(vegaSpec: Spec, datafile: DataFile, dataRefType: DataRefType, transform: Transforms[], scheme: string) {
    const scales = cloneScales(vegaSpec);
    const colorScale = scales.filter(scale => scale.name === SandDance.constants.ScaleNames.Color)[0];
    if (scheme.indexOf('dual_') >= 0) {
        (colorScale as ScalesWithRange).range = SandDance.colorSchemes.filter(cs => cs.scheme === scheme)[0].colors;
    }
    const clone = cloneData(vegaSpec);
    const data0 = clone.data[0];
    if (dataRefType === DataRefType.inline) {
        const valuesData = data0 as ValuesData;
        valuesData.format = { parse: 'auto', type: 'json' };
        valuesData.values = clone.values;
    } else if (dataRefType === DataRefType.none) {
        const valuesData = data0 as ValuesData;
        valuesData.values = [];
        if (transform) {
            if (valuesData.transform) {
                valuesData.transform.push.apply(valuesData.transform, transform);
            } else {
                valuesData.transform = transform;
            }
        }
    } else if (dataRefType === DataRefType.url) {
        const urlData = data0 as UrlData;
        urlData.url = datafile.dataUrl;
        urlData.format = { parse: 'auto', type: datafile.type };
        if (transform) {
            if (urlData.transform) {
                urlData.transform.push.apply(urlData.transform, transform);
            } else {
                urlData.transform = transform;
            }
        }
    }
    return { ...vegaSpec, data: clone.data, scales };
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

function _Settings(props: Props) {
    class __Settings extends base.react.Component<Props, State> {
        constructor(props: Props) {
            super(props);
            this.state = initState(props);
        }

        render() {
            const { props, state } = this;
            if (!props.explorer.viewer || !props.explorer.viewer.vegaSpec) return null;
            const options: FluentUITypes.IDropdownOption[] = [
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
                                                newViewStateTarget={false}
                                            />
                                        ))}
                                    </Group>
                                );
                            }
                        }
                    })}
                    <Group label={strings.labelChartCanvas}>
                        <base.fluentUI.Toggle
                            label={strings.labelShowAxes}
                            defaultChecked={!props.hideAxes}
                            onChange={(e, checked?) => props.onToggleAxes(!checked)}
                        />
                        <base.fluentUI.Toggle
                            label={strings.labelShowLegend}
                            defaultChecked={!props.hideLegend}
                            onChange={(e, checked?) => props.onToggleLegend(!checked)}
                        />
                    </Group>
                    <Group label={strings.labelTools}>
                        <base.fluentUI.DefaultButton
                            text={strings.buttonShowVegaSpec}
                            onClick={() => this.setState({
                                showVegaDialog: true,
                                spec: serializeSpec(props.explorer.viewer.vegaSpec, props.dataFile, this.state.dataRefType, props.explorer.viewer.getInsight().transform, this.props.scheme)
                            })}
                        />
                    </Group>
                    <Group label={strings.labelSnapshots}>
                        <base.fluentUI.Slider
                            label={strings.labelSnapshotSettingThumbnailWidth}
                            onChange={value => {
                                this.props.explorer.snapshotThumbWidth = value;
                            }}
                            min={100}
                            max={800}
                            defaultValue={this.props.explorer.snapshotThumbWidth}
                        />
                    </Group>
                    <Group label={strings.labelTransitionDurations}>
                        <base.fluentUI.Slider
                            label={strings.labelTransitionColor}
                            onChange={value => {
                                this.props.explorer.viewerOptions.transitionDurations.color = value;
                            }}
                            min={0}
                            max={10000}
                            defaultValue={this.props.explorer.viewerOptions.transitionDurations.color}
                        />
                        <base.fluentUI.Slider
                            label={strings.labelTransitionPosition}
                            onChange={value => {
                                this.props.explorer.viewerOptions.transitionDurations.position = value;
                            }}
                            min={0}
                            max={10000}
                            defaultValue={this.props.explorer.viewerOptions.transitionDurations.position}
                        />
                        <base.fluentUI.Slider
                            label={strings.labelTransitionSize}
                            onChange={value => {
                                this.props.explorer.viewerOptions.transitionDurations.size = value;
                            }}
                            min={0}
                            max={10000}
                            defaultValue={this.props.explorer.viewerOptions.transitionDurations.size}
                        />
                        <base.fluentUI.Slider
                            label={strings.labelTransitionCamera}
                            onChange={value => {
                                this.props.explorer.viewerOptions.transitionDurations.view = value;
                            }}
                            min={0}
                            max={10000}
                            defaultValue={this.props.explorer.viewerOptions.transitionDurations.view}
                        />
                    </Group>
                    {props.additionalSettings && props.additionalSettings.map((g, i) => (
                        <Group key={i} label={g.groupLabel}>
                            {g.children}
                        </Group>
                    ))}
                    <Group label={strings.labelSystem}>
                        <base.fluentUI.DefaultButton
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
                                <base.fluentUI.PrimaryButton
                                    key="copy"
                                    iconProps={{ iconName: 'Copy' }}
                                    text={strings.buttonCopyToClipboard}
                                    onClick={() => {
                                        var pre = document.getElementById('sanddance-vega-spec') as HTMLPreElement;
                                        var range = document.createRange();
                                        range.selectNode(pre);
                                        const selection = window.getSelection();
                                        selection.removeAllRanges();
                                        selection.addRange(range);
                                        document.execCommand('copy');
                                    }}
                                />
                            ),
                            (
                                <base.fluentUI.DefaultButton
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
                                spec: serializeSpec(props.explorer.viewer.vegaSpec, props.dataFile, o.data, props.explorer.viewer.getInsight().transform, this.props.scheme)
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
                            {this.props.children}
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
    return new __Settings(props);
}

export const Settings: typeof Settings_Class = _Settings as any;

export declare class Settings_Class extends base.react.Component<Props, State> {
}
