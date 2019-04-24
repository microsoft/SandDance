// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import {
    BindCheckbox,
    Binding,
    BindRadioSelect,
    BindRange,
    NewSignal
} from 'vega-typings';
import { Explorer } from '../explorer';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { SandDance } from '@msrvida/sanddance-react';

export interface Props {
    explorer: Explorer;
    signal: NewSignal;
    prefix?: string;
    disabled?: boolean;
    onChange?: (value: any) => void;
}

export function Signal(props: Props) {
    if (!props.explorer.viewer || !props.signal) {
        return null;
    }
    const onChange = (name: string, value: any) => {
        if (name === SandDance.constants.SignalNames.ColorBinCount) {
            props.explorer.discardColorContextUpdates = false;
        }
        props.explorer.viewer.vegaViewGl.signal(name, value);
        props.explorer.viewer.vegaViewGl.run();
        props.explorer.discardColorContextUpdates = true;
    };
    if (props.signal.bind) {
        const input = (props.signal.bind as BindCheckbox | BindRadioSelect | BindRange).input;
        if (input) {
            const fn = map[input];
            if (fn) {
                const prefix = props.prefix ? `${props.prefix} ` : '';
                let initialValue: any;
                try {
                    initialValue = props.explorer.viewer.vegaViewGl.signal(props.signal.name);
                } catch (error) {

                }
                const control = fn(
                    prefix,
                    props.signal.bind,
                    initialValue,
                    (value) => {
                        props.onChange && props.onChange(value);
                        onChange(props.signal.name, value);
                    },
                    props.disabled
                );
                return (
                    <div className="sanddance-signal">
                        {control}
                    </div>
                );
            }
        }
    }
    return null;
}

const map: { [input: string]: (prefix: string, bind: Binding, initialValue: any, onChange: (value: any) => void, disabled: boolean) => JSX.Element } = {};

map['range'] = (prefix: string, bind: BindRange, initialValue: number, onChange: (value: number) => void, disabled: boolean) => {
    return (
        <base.fabric.Slider
            label={prefix + bind.name}
            max={bind.max}
            min={bind.min}
            step={bind.step}
            value={initialValue}
            onChange={onChange}
            disabled={disabled}
        />
    );
}

map['select'] = (prefix: string, bind: BindRadioSelect, initialValue: any, onChange: (value: any) => void, disabled: boolean) => {
    const options = bind.options.map((o, i) => {
        const option: FabricTypes.IDropdownOption = {
            key: o,
            text: o
        };
        return option;
    });
    return (
        <base.fabric.Dropdown
            defaultSelectedKey={initialValue}
            label={prefix + bind.name}
            options={options}
            onChange={(e, o) => onChange(o.text)}
            disabled={disabled}
        />
    );
}

map['checkbox'] = (prefix: string, bind: BindCheckbox, initialValue: any, onChange: (value: any) => void, disabled: boolean) => {    
    return (
        <base.fabric.Toggle            
            label={prefix + bind.name}            
            onChange={(e, o) => {                
                return(onChange(o));
            }}
            disabled={disabled}
        />
    );
}
//TODO other signal types
