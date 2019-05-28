// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import {
    AutoCompleteDistinctValues,
    getValidOperators,
    InputSearchExpression,
    SearchTerm
} from '../controls/searchTerm';
import { base } from '../base';
import { Button } from '../controls/button';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { Group } from '../controls/group';
import { SandDance, util } from '@msrvida/sanddance-react';
import { strings } from '../language';

const maxClauses = 5;

export interface Iinitializer {
    search?: SandDance.types.SearchExpressionGroup<InputSearchExpression>[];
    columns: SandDance.types.Column[];
}

export interface Props {
    data: object[];
    initializer: Iinitializer;
    onSelect: { (search: SandDance.types.Search): void };
    autoCompleteDistinctValues: AutoCompleteDistinctValues;
    disabled: boolean;
    themePalette: Partial<FabricTypes.IPalette>;
}

export interface State {
    initializer: Iinitializer;
    expressions: InputSearchExpression[];
    sortedColumns: SandDance.types.Column[];
}

function getColumnWithName(columnName: string, columns: SandDance.types.Column[]) {
    for (var i = 0; i < columns.length; i++) {
        if (columns[i].name === columnName) return columns[i];
    }
}

function validateExpression(ex: InputSearchExpression) {
    if (ex.operator === 'isnullorEmpty') {
        ex.errorMessage = null;
        return;
    }
    const s = (typeof ex.value === 'string') ? ex.value : ex.value.toString();
    if (s.length === 0) {
        ex.errorMessage = strings.labelRequired;
    } else {
        ex.errorMessage = null;
    }
}

function clearExpressionValidation(ex: InputSearchExpression) {
    if (ex.operator === 'isnullorEmpty') {
        ex.errorMessage = null;
        return;
    }
    const s = (typeof ex.value === 'string') ? ex.value : ex.value.toString()
    if (s.length !== 0) {
        ex.errorMessage = null;
    }
}

export class Search extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = this.getInitialState(this.props);
    }

    getInitialState(props: Props) {
        const initialState: State = {
            expressions: props.initializer.search ? props.initializer.search[0].expressions : [this.newExpression(0, null)],
            sortedColumns: [...props.initializer.columns].sort((a, b) => a.name.localeCompare(b.name)),
            initializer: props.initializer
        };
        return initialState;
    }

    componentDidUpdate() {
        if (!util.deepCompare(this.props.initializer, this.state.initializer)) {
            this.setState(this.getInitialState(this.props));
        }
    }

    validateAndSearch() {
        const expressions: InputSearchExpression[] = [...this.state.expressions];
        expressions.forEach(validateExpression);
        const errors = expressions.reduce((p, c) => p || c.errorMessage, '');
        if (errors) {
            this.setState({ expressions });
        } else {
            this.props.onSelect({ expressions: this.state.expressions });
        }
    }

    newExpression(key: number, clause: SandDance.types.SearchExpressionClause) {
        const ex: InputSearchExpression = { key, clause, name: null, operator: 'contains', value: '' };
        return ex;
    }

    addExpression() {
        const expressions: InputSearchExpression[] = [...this.state.expressions];
        const maxKey = expressions.reduce((max, p) => p.key > max ? p.key : max, expressions[0].key);
        const newEx = this.newExpression(maxKey + 1, '&&');
        expressions.push(newEx);
        if (expressions.length === 2) {
            newEx.unlocked = true;
        } else {
            expressions.forEach(ex => ex.unlocked = false);
            newEx.clause = expressions[1].clause;
        }
        this.setState({ expressions });
    }

    updateExpression(partialEx: Partial<InputSearchExpression>, index: number) {
        const expressions: InputSearchExpression[] = [...this.state.expressions];
        const ex = SandDance.VegaDeckGl.util.clone(expressions[index]);
        if (ex.name !== partialEx.name) {
            //choose an appropriate operator when switching data type
            const oldColumn = getColumnWithName(ex.name, this.state.sortedColumns);
            const newColumn = getColumnWithName(partialEx.name, this.state.sortedColumns);
            const oldType = oldColumn && oldColumn.type;
            const newType = newColumn && newColumn.type;
            if (oldType !== newType) {
                const newOperators = getValidOperators(newColumn).map(validOperator => validOperator[0]);
                //see if old operator is compatible
                if (newOperators.indexOf(ex.operator) < 0) {
                    //not compatible, so choose "equal"
                    partialEx.operator = '==';
                }
            }
        }
        Object.assign(ex, partialEx);
        clearExpressionValidation(ex);
        expressions[index] = ex;
        this.setState({ expressions });
    }

    deleteExpression(index: number) {
        const expressions: InputSearchExpression[] = [...this.state.expressions];
        expressions.splice(index, 1);
        if (expressions.length === 2) {
            expressions[1].unlocked = true;
        }
        this.setState({ expressions });
    }

    render() {
        return (
            <Group
                className="sanddance-search"
                label={strings.labelSearch}
            >
                <div>
                    {this.state.expressions.map((ex, i) => (
                        <div
                            className="sanddance-search-expression"
                            key={ex.key}
                        >
                            <SearchTerm
                                onUpdateExpression={(ex, i) => this.updateExpression(ex, i)}
                                autoCompleteDistinctValues={this.props.autoCompleteDistinctValues}
                                index={i}
                                columns={this.state.sortedColumns}
                                data={this.props.data}
                                searchExpression={ex}
                                column={getColumnWithName(ex.name, this.state.sortedColumns)}
                            />
                            {i > 0 && (
                                <Button
                                    themePalette={this.props.themePalette}
                                    className="search-action"
                                    iconName="Cancel"
                                    onClick={() => this.deleteExpression(i)}
                                    text={strings.buttonDeleteExpression}
                                />
                            )}
                        </div>
                    ))}
                </div>
                {this.state.expressions.length < maxClauses && (
                    <div>
                        <Button
                            themePalette={this.props.themePalette}
                            className="search-action"
                            iconName="Add"
                            onClick={() => this.addExpression()}
                            text={strings.buttonAddExpression}
                        />
                    </div>
                )}
                <base.fabric.PrimaryButton
                    className="search-action"
                    text={strings.buttonSelect}
                    onClick={() => this.validateAndSearch()}
                />
            </Group>
        );
    }
}
