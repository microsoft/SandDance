// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { categorical } from './categorical';
import { diverging } from './diverging';
import { Dropdown } from '../controls/dropdown';
import { dual } from './dual';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { ISchemeOption, schemesJSX } from './scheme';
import { SandDance, util } from '@msrvida/sanddance-react';
import { sequentialMultiHue } from './sequentialMultiHue';
import { sequentialSingleHue } from './sequentialSingleHue';
import { strings } from '../language';

const maxDistinctColors = 20;

export interface Props {
    collapseLabel: boolean;
    scheme: string;
    colorColumn: SandDance.types.Column;
    changeColorScheme: (scheme: string) => void;
    disabled: boolean;
}

export function Palette(props: Props) {
    const { distinctValueCount } = props.colorColumn.stats;
    let isDual = distinctValueCount === 2;
    const categoricalNumeric = distinctValueCount > 0 && distinctValueCount < maxDistinctColors;
    let isQualitative = false;
    let isQuantitative = false;

    switch (props.colorColumn.type) {
        case 'boolean':
        case 'string':
            isQualitative = true;
            break;

        case 'number':
            isQuantitative = true;
            break;

        case 'date':
        case 'integer':
            isQuantitative = true;
            isQualitative = categoricalNumeric;
    }

    const selected = props.scheme;

    const options: FluentUITypes.IDropdownOption[] = [];

    function menu(name: string, opts: ISchemeOption[]) {
        options.push({
            key: name,
            text: name,
            itemType: base.fluentUI.DropdownMenuItemType.Header
        });
        options.push.apply(options, opts);
    }

    isQualitative && menu(strings.schemeCategorical, categorical(selected));
    isQuantitative && menu(strings.schemeSequentialSingleHue, sequentialSingleHue(selected));
    isQuantitative && menu(strings.schemeSequentialMultiHue, sequentialMultiHue(selected));
    isQuantitative && menu(strings.schemeDiverging, diverging(selected));
    isDual && menu(strings.schemeDual, dual(selected));

    return (
        <div className="sanddance-palette">
            <div
                className="sanddance-explanation"
                dangerouslySetInnerHTML={{
                    __html: strings.labelColorFieldInfo(
                        props.colorColumn.name,
                        props.colorColumn.type,
                        categoricalNumeric,
                        distinctValueCount
                    )
                }}
            />
            <Dropdown
                collapseLabel={props.collapseLabel}
                disabled={props.disabled}
                dropdownWidth={400}
                label={strings.labelColorScheme}
                onRenderOption={(option: ISchemeOption): JSX.Element => {
                    if (option.itemType === base.fluentUI.DropdownMenuItemType.Header) {
                        return <span>{option.text}</span>;
                    } else {
                        return (
                            <div className="sanddance-scheme option">
                                <span className="name">{option.scheme}</span>
                                {option.children}
                            </div>
                        );
                    }
                }}
                options={options}
                onChange={(e, o: ISchemeOption) => {
                    props.changeColorScheme(o.scheme);
                }}
            />
            <div className={util.classList('sanddance-scheme', props.disabled && 'disabled')}>
                {props.scheme && schemesJSX[props.scheme]}
            </div>
        </div>
    );
}
