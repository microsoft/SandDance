// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { Dropdown, dropdownWidth } from './dropdown';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from '../language';

export const maxAutocomplete = 100;

export interface AutoCompleteDistinctValues {
    [columnName: string]: any[];
}

export interface InputSearchExpression extends SandDance.types.SearchExpression {
    key: number;
    unlocked?: boolean;
    errorMessage?: string;
}

export function getValidOperators(column: SandDance.types.Column): [SandDance.types.SearchExpressionOperators, string][] {
    const type = column && column.type;
    switch (type) {
        case 'boolean':
            return [
                ['==', strings.searchEQ],
                ['!=', strings.searchNEQ],
                ['isnullorEmpty', strings.searchNULL]
            ];
        case 'date':
        case 'integer':
        case 'number':
            return [
                ['==', strings.searchEQ],
                ['!=', strings.searchNEQ],
                ['>', strings.searchGT],
                ['>=', strings.searchGTE],
                ['<', strings.searchLT],
                ['<=', strings.searchLTE],
                ['isnullorEmpty', strings.searchNULL]
            ];
        case 'string':
        default:
            return [
                ['==', strings.searchEQ],
                ['!=', strings.searchNEQ],
                ['>', strings.searchGT],
                ['>=', strings.searchGTE],
                ['<', strings.searchLT],
                ['<=', strings.searchLTE],
                ['contains', strings.searchIN],
                ['starts', strings.searchSW],
                ['isnullorEmpty', strings.searchNULL]
            ];
    }
}

export interface Props {
    index: number;
    columns: SandDance.types.Column[];
    data: object[];
    searchExpression: InputSearchExpression;
    disableOR: boolean;
    autoCompleteDistinctValues: AutoCompleteDistinctValues;
    onUpdateExpression: { (ex: Partial<InputSearchExpression>, index: number): void };
    column: SandDance.types.Column;
}

function getExpressionClauses(currClause: SandDance.types.SearchExpressionClause, disableOR: boolean) {
    const keys: [SandDance.types.SearchExpressionClause, string][] = [
        ['&&', strings.searchAND]
    ];
    if (!disableOR) {
        keys.push(['||', strings.searchOR]);
    }
    return keys.map((key: [SandDance.types.SearchExpressionClause, string], i: number) => {
        const [clause, text] = key;
        const selected = currClause == clause; //deliberate double equal 
        const option: FabricTypes.IDropdownOption = {
            key: i,
            text,
            data: clause,
            selected
        };
        return option;
    });
}

function getOperators(ex: InputSearchExpression, column: SandDance.types.Column) {
    let anySelected = false;
    const validOperators = getValidOperators(column);
    const options = validOperators.map(validoperator => {
        const [op, text] = validoperator;
        const selected = ex.operator === op;
        anySelected = anySelected || selected;
        const option: FabricTypes.IDropdownOption = {
            key: op,
            text,
            data: op,
            selected
        };
        return option;
    });
    if (!anySelected) {
        options[0].selected = true;
    }
    return options;
}

function getDistinctValues(data: object[], columnName: string) {
    const distinctMap = {};
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        let value = row[columnName];
        distinctMap[value] = true;
    }
    return Object.keys(distinctMap).sort();
}

function getValues(ex: InputSearchExpression, column: SandDance.types.Column, data: object[], autoCompleteDistinctValues: { [columnName: string]: any[] }): FabricTypes.IComboBoxOption[] {
    const stats = column && column.stats;
    if (stats && stats.distinctValueCount < maxAutocomplete) {
        if (!autoCompleteDistinctValues[column.name]) {
            autoCompleteDistinctValues[column.name] = getDistinctValues(data, column.name);
        }
        return autoCompleteDistinctValues[column.name].map((v, i) => ({
            key: i,
            text: v
        } as FabricTypes.IComboBoxOption));
    }
    return [];
}

export function getText(ex: InputSearchExpression) {
    if (ex.operator === 'isnullorEmpty') return '';
    return (typeof ex.value === 'string') ? ex.value : ex.value == null ? '' : ex.value.toString();
}

export function SearchTerm(props: Props) {
    const ex = props.searchExpression;
    const possibleValues = getValues(ex, props.column, props.data, props.autoCompleteDistinctValues);

    //TODO better date handling with calendar picker

    return (
        <div>
            {props.index > 0 && (
                <Dropdown
                    className="search-field"
                    //label={strings.labelSearchClause}
                    dropdownWidth={120}
                    disabled={!ex.unlocked || props.disableOR}
                    options={getExpressionClauses(ex.clause, props.disableOR)}
                    onChange={(e, o) => props.onUpdateExpression({ clause: (o.data as SandDance.types.SearchExpressionClause) }, props.index)}
                />
            )}
            <Dropdown
                className="search-field"
                //label={strings.labelSearchColumn}
                options={[
                    {
                        key: '',
                        text: strings.selectAny,
                        data: null,
                        selected: ex.name === null
                    }
                ].concat(props.columns.map((c, i) => ({
                    key: c.name,
                    text: c.name,
                    data: c,
                    selected: c.name === ex.name
                })))}
                onChange={(e, o) => props.onUpdateExpression({ name: (o.data && (o.data as SandDance.types.Column).name) || null }, props.index)}
            />
            <Dropdown
                className="search-field"
                //label={strings.labelSearchOperator}
                dropdownWidth={120}
                options={getOperators(ex, props.column)}
                onChange={(e, o) => props.onUpdateExpression({ operator: (o.data) as SandDance.types.SearchExpressionOperators }, props.index)}
            />
            {possibleValues.length > 0 && (
                <base.fabric.ComboBox
                    className="search-field"
                    //label={strings.labelSearchValue}
                    disabled={ex.operator === 'isnullorEmpty'}
                    dropdownWidth={dropdownWidth}
                    allowFreeform={true}
                    autoComplete="on"
                    errorMessage={ex.errorMessage}
                    text={getText(ex)}
                    options={getValues(ex, props.column, props.data, props.autoCompleteDistinctValues)}
                    onChange={
                        (
                            e: React.FormEvent<FabricTypes.IComboBox>,
                            o?: FabricTypes.IComboBoxOption,
                            i?: number,
                            value?: string
                        ) => {
                            if (o) {
                                value = o.text;
                            }
                            props.onUpdateExpression({ value }, props.index);
                        }
                    }
                />
            )}
            {possibleValues.length === 0 && (
                <base.fabric.TextField
                    className="search-field"
                    //label={strings.labelSearchValue}
                    disabled={ex.operator === 'isnullorEmpty'}
                    errorMessage={ex.errorMessage}
                    value={getText(ex)}
                    onChange={(e, v) => props.onUpdateExpression({ value: v }, props.index)}
                />
            )}
        </div>
    );
}
