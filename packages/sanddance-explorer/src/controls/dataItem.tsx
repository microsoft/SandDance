// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { InputSearchExpression } from './searchTerm';
import { base } from '../base';
import { InputSearchExpressionGroup } from '../dialogs/search';
import { DateWithSource } from '../interfaces';
import { KeyCodes } from '../keycodes';
import { strings } from '../language';
import { SandDance } from '@msrvida/sanddance-react';

import SearchExpressionValue = SandDance.searchExpression.SearchExpressionValue;

export interface Props {
    item: object;
    showSystemFields?: boolean;
    onSearch?: { (event: React.MouseEvent<HTMLElement>, search: InputSearchExpressionGroup[]): void };
    bingSearchDisabled: boolean;
    disabled: boolean;
    columns: SandDance.types.Column[];
}

function isNumber(value: any) {
    if (typeof value === 'number') return true;
    if (!isNaN(value)) return true;
    return false;
}

function isBoolean(value: any) {
    if (typeof value === 'boolean') return true;
    if (typeof value === 'string') {
        switch (value.toLowerCase()) {
            case true + '':
            case false + '':
                return true;
        }
    }
    return false;
}

function bingSearchLink(column: SandDance.types.Column, value: any) {
    if (isNumber(value)) return null;
    if (isBoolean(value)) return null;
    if (column && column.stats.distinctValueCount === 2) return null;
    return (
        <div className='bing-search'>
            <a
                href={`https://www.bing.com/search?q=${encodeURIComponent(value)}`}
                target='_blank'
                title={strings.bingsearchDescription(value)}
                aria-label={strings.bingsearchDescription(value)}
            >{strings.bingsearch}</a>
        </div>
    );
}

interface NameValuePair {
    columnName: string;
    value: SearchExpressionValue;
    bingSearch?: JSX.Element;
}

interface DisplayValue {
    special: boolean;
    display: string | number;
}

function displayValue(value: SearchExpressionValue | object): DisplayValue {
    switch (value) {
        case '': {
            return { special: true, display: strings.labelBlank };
        }
        case null: {
            return { special: true, display: strings.labelNull };
        }
        case true: {
            return { special: true, display: strings.labelTrue };
        }
        case false: {
            return { special: true, display: strings.labelFalse };
        }
        default: {
            if (typeof value === 'object') {
                if (value instanceof Date) {
                    const d = value as DateWithSource;
                    return displayValue(d.input);
                }
                return { special: false, display: value.toLocaleString() };
            }
            return { special: false, display: value };
        }
    }
}

function displayValueElement(nvp: NameValuePair) {
    const d = displayValue(nvp.value);
    if (d.special) {
        return <i>{d.display}</i>;
    }
    return d.display;
}

export function DataItem(props: Props) {
    if (!props.item) {
        return null;
    }
    const nameValuePairs: NameValuePair[] = [];
    for (let columnName in props.item) {
        if (columnName === SandDance.constants.GL_ORDINAL && !props.showSystemFields) {
            continue;
        }
        if (SandDance.util.isInternalFieldName(columnName)) {
            continue;
        }
        let nameValuePair: NameValuePair = {
            columnName,
            value: props.item[columnName]
        };
        if (!props.bingSearchDisabled) {
            nameValuePair.bingSearch = bingSearchLink(props.columns.filter(c => c.name === columnName)[0], props.item[columnName]);
        }
        nameValuePairs.push(nameValuePair);
    }
    return (
        <div className="sanddance-dataItem">
            {nameValuePairs.map((nameValuePair, i) => {
                const ex: InputSearchExpression = {
                    key: 0,
                    name: nameValuePair.columnName,
                    operator: '==',
                    value: nameValuePair.value
                };
                if (nameValuePair.value === null || nameValuePair.value === '') {
                    ex.operator = 'isnullorEmpty';
                    delete ex.value;
                }
                const searchClick = (e: React.MouseEvent<HTMLTableDataCellElement>) => {
                    const search: InputSearchExpressionGroup = {
                        key: 0,
                        expressions: [ex]
                    };
                    props.onSearch(e, [search]);
                };
                const title = strings.tooltipSearch(nameValuePair.columnName, displayValue(nameValuePair.value).display);
                return (
                    <div
                        key={i}
                        onClick={!props.disabled ? searchClick : null}
                        title={title}
                        onKeyUp={e => {
                            if (e.keyCode === KeyCodes.ENTER) {
                                searchClick(e as any);
                            }
                        }}
                        tabIndex={0}
                        className="name-value"
                    >
                        <div className="column-name">{nameValuePair.columnName}</div>
                        <div className="column-value">{displayValueElement(nameValuePair)}</div>
                        {nameValuePair.bingSearch}
                    </div>
                );
            })}
        </div>
    );
}
