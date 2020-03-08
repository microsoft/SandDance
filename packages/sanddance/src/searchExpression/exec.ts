// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from '@msrvida/vega-deck.gl';
import { Column } from '../specs/types';
import { ensureSearchExpressionGroupArray } from './group';
import { Search, SearchExpression, SearchExpressionGroup } from './types';

function valueToBoolean(value: any) {
    if (typeof value === 'string') {
        switch (value.toLowerCase()) {
            case 'true':
                return true;
            case 'false':
                return false;
        }
    }
    return !!value;
}

function valueToString(value: any) {
    if (value == null) {
        return '';
    }
    switch (typeof value) {
        case 'string':
            return value;
        case 'boolean':
        case 'number':
            return value.toString();
    }
    return '';
}

function isStringOperation(ex: SearchExpression) {
    switch (ex.operator) {
        case 'contains':
        case '!contains':
        case 'starts':
        case '!starts':
            return true;
    }
    return false;
}

function isnullorEmpty(value: any) {
    if (value == null) return true; //double equal sign to also catch undefined
    if (typeof value === 'string' && value.length === 0) return true;
    return false;
}

interface SearchExpressionLowercase extends SearchExpression {
    column: Column;
    valueLow: string;
    valueBool: boolean;
    stringOperation: boolean;
}

export class Exec {
    private groups: SearchExpressionGroup<SearchExpressionLowercase>[];

    constructor(search: Search, private columns: Column[]) {
        this.groups = VegaDeckGl.util.clone(ensureSearchExpressionGroupArray(search)) as SearchExpressionGroup<SearchExpressionLowercase>[];
        this.groups.forEach(group => {
            group.expressions = group.expressions.filter(Boolean);
            group.expressions.forEach(ex => {
                ex.column = this.getColumn(ex.name);
                ex.valueBool = valueToBoolean(ex.value);
                ex.valueLow = valueToString(ex.value).toLocaleLowerCase();
                ex.stringOperation = isStringOperation(ex);
            });
        });
    }

    private getColumn(name: string) {
        for (let i = 0; i < this.columns.length; i++) {
            if (this.columns[i].name == name) {
                return this.columns[i];
            }
        }
    }

    private runExpressionOnColumn(datum: object, ex: SearchExpressionLowercase) {
        const actualDataValue = datum[ex.name];
        if (ex.operator === 'isnullorEmpty') {
            return isnullorEmpty(actualDataValue);
        } else if (ex.operator === '!isnullorEmpty') {
            return !isnullorEmpty(actualDataValue);
        }
        let dataValue = actualDataValue;
        let expressionValue = ex.value;
        if (ex.column) {
            if (ex.column.type === 'string' || ex.stringOperation) {
                dataValue = valueToString(actualDataValue).toLocaleLowerCase();
                expressionValue = ex.valueLow;
            } else if (ex.column.type === 'boolean') {
                dataValue = valueToBoolean(actualDataValue);
                expressionValue = ex.valueBool;
            } else if (ex.column.quantitative) {
                dataValue = +actualDataValue;
                expressionValue = +ex.value;
            }
        }
        switch (ex.operator) {
            case '!=':
                return dataValue != expressionValue;
            case '<':
                return dataValue < expressionValue;
            case '<=':
                return dataValue <= expressionValue;
            case '==':
                return dataValue == expressionValue;
            case '>':
                return dataValue > expressionValue;
            case '>=':
                return dataValue >= expressionValue;
            case 'contains':
                return dataValue.indexOf(expressionValue) >= 0;
            case '!contains':
                return dataValue.indexOf(expressionValue) < 0;
            case 'starts':
                return dataValue.indexOf(expressionValue) == 0;
            case '!starts':
                return dataValue.indexOf(expressionValue) !== 0;
        }
    }

    private runExpression(datum: object, ex: SearchExpressionLowercase) {
        if (ex.name == null) {
            //run on all columns
            const group: SearchExpressionGroup<SearchExpressionLowercase> = {
                expressions: this.columns.map((column, i) => {
                    const ex2: SearchExpressionLowercase = {
                        ...ex,
                        column,
                        name: column.name
                    };
                    if (i) {
                        ex2.clause = '||';
                    }
                    return ex2;
                })
            };
            return this.runGroup(datum, group);
        } else {
            return this.runExpressionOnColumn(datum, ex);
        }
    }

    private runGroup(datum: object, group: SearchExpressionGroup<SearchExpressionLowercase>): boolean {
        let accumulator: boolean = this.runExpression(datum, group.expressions[0]);
        for (let i = 1; i < group.expressions.length; i++) {
            let ex = group.expressions[i];
            switch (ex.clause) {
                case '&&':
                    accumulator = accumulator && this.runExpression(datum, ex);
                    break;
                case '||':
                    accumulator = accumulator || this.runExpression(datum, ex);
                    break;
            }
        }
        return accumulator;
    }

    run(datum: object) {
        let accumulator = this.runGroup(datum, this.groups[0]);
        for (let i = 1; i < this.groups.length; i++) {
            let group = this.groups[i];
            switch (group.clause) {
                case '&&':
                    accumulator = accumulator && this.runGroup(datum, group);
                    break;
                case '||':
                    accumulator = accumulator || this.runGroup(datum, group);
                    break;
            }
        }
        return accumulator;
    }
}
