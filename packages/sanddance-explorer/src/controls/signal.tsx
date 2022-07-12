/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import {
    BindCheckbox,
    Binding,
    BindRadioSelect,
    BindRange,
    NewSignal,
} from 'vega-typings';
import { Explorer_Class } from '../explorer';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';

export interface Props {
    initialValue: any;
    newViewStateTarget?: boolean;
    collapseLabel?: boolean;
    explorer: Explorer_Class;
    signal: NewSignal;
    prefix?: string;
    disabled?: boolean;
    onChange?: (value: any) => void;
    componentRef?: any;
}

export function getInitialSignalValue(explorer: Explorer_Class, signal: NewSignal) {
    let initialValue: any;
    try {
        initialValue = explorer.viewer.vegaViewGl.signal(signal.name);
    } catch (error) {
        // continue regardless of error
    }
    return initialValue;
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
                const control = fn(
                    prefix,
                    props.signal.bind,
                    props.initialValue,
                    (value) => {
                        props.onChange && props.onChange(value);
                        props.explorer.signal(props.signal.name, value, props.newViewStateTarget);
                    },
                    props.disabled,
                    props.collapseLabel,
                    props.componentRef,
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

const map: { [input: string]: (prefix: string, bind: Binding, initialValue: any, onChange: (value: any) => void, disabled: boolean, collapseLabel: boolean, ref: any) => JSX.Element } = {};

map['range'] = (prefix: string, bind: BindRange, initialValue: number, onChange: (value: number) => void, disabled: boolean, collapseLabel: boolean, ref: any) => {
    let debouncer: NodeJS.Timeout;
    return (
        <base.fluentUI.Slider
            label={prefix + bind.name}
            max={bind.max}
            min={bind.min}
            step={bind.step}
            defaultValue={initialValue}
            onChange={value => {
                if (debouncer) {
                    clearTimeout(debouncer);
                }
                debouncer = setTimeout(() => onChange(value), bind.debounce || 0);
            }}
            disabled={disabled}
        />
    );
};

map['select'] = (prefix: string, bind: BindRadioSelect, initialValue: any, onChange: (value: any) => void, disabled: boolean, collapseLabel: boolean, ref: any) => {
    const options = bind.options.map((o, i) => {
        const option: FluentUITypes.IDropdownOption = {
            key: o,
            text: o,
        };
        return option;
    });
    const label = prefix + bind.name;
    return (
        <base.fluentUI.Dropdown
            componentRef={ref}
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

map['checkbox'] = (prefix: string, bind: BindCheckbox, initialValue: boolean, onChange: (checked: boolean) => void, disabled: boolean, collapseLabel: boolean, ref: any) => {
    return (
        <base.fluentUI.Toggle
            componentRef={ref}
            defaultChecked={initialValue}
            label={prefix + bind.name}
            onChange={(e, checked?: boolean) => onChange(checked)}
            disabled={disabled}
        />
    );
};

//TODO other signal types
