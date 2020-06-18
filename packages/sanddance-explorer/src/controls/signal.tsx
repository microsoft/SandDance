// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import {
    BindCheckbox,
    Binding,
    BindRadioSelect,
    BindRange,
    NewSignal
} from 'vega-typings';
import { Explorer_Class } from '../explorer';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';

export interface Props {
    newViewStateTarget?: boolean;
    collapseLabel?: boolean;
    explorer: Explorer_Class;
    signal: NewSignal;
    prefix?: string;
    disabled?: boolean;
    onChange?: (value: any) => void;
}

export function Signal(props: Props) {
    if (!props.explorer.viewer || !props.signal) {
        return null;
    }
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
                    // continue regardless of error
                }
                const control = fn(
                    prefix,
                    props.signal.bind,
                    initialValue,
                    (value) => {
                        props.onChange && props.onChange(value);
                        props.explorer.signal(props.signal.name, value, props.newViewStateTarget);
                    },
                    props.disabled,
                    props.collapseLabel
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

const map: { [input: string]: (prefix: string, bind: Binding, initialValue: any, onChange: (value: any) => void, disabled: boolean, collapseLabel: boolean) => JSX.Element } = {};

map['range'] = (prefix: string, bind: BindRange, initialValue: number, onChange: (value: number) => void, disabled: boolean, collapseLabel: boolean) => {
    return (
        <base.fluentUI.Slider
            label={prefix + bind.name}
            max={bind.max}
            min={bind.min}
            step={bind.step}
            defaultValue={initialValue}
            onChange={onChange}
            disabled={disabled}
        />
    );
};

map['select'] = (prefix: string, bind: BindRadioSelect, initialValue: any, onChange: (value: any) => void, disabled: boolean, collapseLabel: boolean) => {
    const options = bind.options.map((o, i) => {
        const option: FluentUITypes.IDropdownOption = {
            key: o,
            text: o
        };
        return option;
    });
    const label = prefix + bind.name;
    return (
        <base.fluentUI.Dropdown
            onRenderTitle={collapseLabel ?
                ((a, b) => (
                    <span>
                        {label}: {(a[0] as FluentUITypes.IDropdownOption).text}
                    </span>
                ))
                :
                undefined}
            defaultSelectedKey={initialValue}
            label={collapseLabel ? undefined : label}
            options={options}
            onChange={(e, o) => onChange(o.text)}
            disabled={disabled}
        />
    );
};

map['checkbox'] = (prefix: string, bind: BindCheckbox, initialValue: boolean, onChange: (checked: boolean) => void, disabled: boolean, collapseLabel: boolean) => {
    return (
        <base.fluentUI.Toggle
            defaultChecked={initialValue}
            label={prefix + bind.name}
            onChange={(e, checked?: boolean) => onChange(checked)}
            disabled={disabled}
        />
    );
};

//TODO other signal types
