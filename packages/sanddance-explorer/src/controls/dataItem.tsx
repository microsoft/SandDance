// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { InputSearchExpression } from './searchTerm';
import { InputSearchExpressionGroup } from '../dialogs/search';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from '../language';

export interface Props {
    item: object;
    showSystemFields?: boolean;
    onSearch?: { (event: React.MouseEvent<HTMLElement>, search: InputSearchExpressionGroup[]): void };
    disabled: boolean;
    columns: SandDance.types.Column[];
}

function isNumber(value: any) {
    if (typeof value === "number") return true;
    if (!isNaN(value)) return true;
    return false;
}

function isBoolean(value: any) {
    if (typeof value === "boolean") return true;
    if (typeof value === "string") {
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
        <div className="bing-search">
            <a href={`https://www.bing.com/search?q=${encodeURIComponent(value)}`} target="_blank">{strings.bingsearch}</a>
        </div>
    );
}

interface NameValuePair {
    columnName: string;
    value: any;
    bingSearch?: JSX.Element;
}

function displayValue(value: any) {
    switch (value) {
        case '':
            return <i>{strings.labelBlank}</i>;
        case null:
            return <i>{strings.labelNull}</i>;
        case true:
            return <i>{strings.labelTrue}</i>;
        case false:
            return <i>{strings.labelFalse}</i>;
        default:
            return value;
    }
}

export function DataItem(props: Props) {
    if (!props.item) {
        return null;
    }
    const nameValuePairs: NameValuePair[] = [];
    for (let columnName in props.item) {
        if (columnName === SandDance.VegaDeckGl.constants.GL_ORDINAL && !props.showSystemFields) {
            continue;
        }
        if (SandDance.util.isInternalFieldName(columnName)) {
            continue;
        }
        let nameValuePair: NameValuePair = {
            columnName,
            value: props.item[columnName]
        };
        nameValuePair.bingSearch = bingSearchLink(props.columns.filter(c => c.name === columnName)[0], props.item[columnName]);
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
                const searchClick = (e: React.MouseEvent<HTMLTableDataCellElement>) => {
                    const search: InputSearchExpressionGroup = {
                        key: 0,
                        expressions: [ex]
                    }
                    props.onSearch(e, [search]);
                }
                const title = strings.tooltipSearch(nameValuePair.columnName, nameValuePair.value);
                return (
                    <div
                        key={i}
                        onClick={!props.disabled ? searchClick : null}
                        title={title}
                        className="name-value"
                    >
                        <div className="column-name">{nameValuePair.columnName}</div>
                        <div className="column-value">{displayValue(nameValuePair.value)}</div>
                        {nameValuePair.bingSearch}
                    </div>
                );
            })}
        </div>
    );
}
