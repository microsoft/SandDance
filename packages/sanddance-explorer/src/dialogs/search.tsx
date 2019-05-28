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
import { Dropdown } from '../controls/dropdown';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { Group } from '../controls/group';
import { SandDance, util } from '@msrvida/sanddance-react';
import { strings } from '../language';

const maxClauses = 5;

export interface InputSearchExpressionGroup extends SandDance.types.SearchExpressionGroup<InputSearchExpression> {
    key: number;
}

export interface IInitializer {
    search?: InputSearchExpressionGroup[];
    columns: SandDance.types.Column[];
}

export interface Props {
    data: object[];
    initializer: IInitializer;
    onSelect: { (search: SandDance.types.Search): void };
    autoCompleteDistinctValues: AutoCompleteDistinctValues;
    disabled: boolean;
    themePalette: Partial<FabricTypes.IPalette>;
}

export interface State {
    initializer: IInitializer;
    groups: InputSearchExpressionGroup[];
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
        ex.errorMessage = strings.validateRequired;
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

function getGroupClauses(currClause: SandDance.types.SearchExpressionClause, index: number) {
    let keys: [SandDance.types.SearchExpressionClause, string][];
    if (index === 0) {
        keys = [
            [null, strings.searchWHERE]
        ];
    } else {
        keys = [
            ['&&', strings.searchAND],
            ['||', strings.searchOR]
        ];
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

export class Search extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = this.getInitialState(this.props);
    }

    getInitialState(props: Props) {
        const initialState: State = {
            groups: props.initializer.search || [this.newGroup(0, null)],
            sortedColumns: [...props.initializer.columns].sort((a, b) => a.name.localeCompare(b.name)),
            initializer: props.initializer
        };
        initialState.groups.forEach(group => {
            group.expressions.forEach(ex => ex.unlocked = group.expressions.length <= 2);
        });
        return initialState;
    }

    componentDidUpdate() {
        if (!util.deepCompare(this.props.initializer, this.state.initializer)) {
            this.setState(this.getInitialState(this.props));
        }
    }

    validateAndSearch() {
        const groups: InputSearchExpressionGroup[] = [...this.state.groups];
        groups.forEach(group => {
            group.expressions.forEach(validateExpression);
            const errors = group.expressions.reduce((p, c) => p || c.errorMessage, '');
            if (errors) {
                this.setState({ groups });
            } else {
                this.props.onSelect(this.state.groups);
            }
        });
    }

    newGroup(key: number, clause: SandDance.types.SearchExpressionClause) {
        const group: InputSearchExpressionGroup = {
            key,
            clause,
            expressions: [this.newExpression(0, null)]
        };
        return group;
    }

    updateGroup(partialGroup: Partial<InputSearchExpressionGroup>, groupIndex: number) {
        const groups: InputSearchExpressionGroup[] = [...this.state.groups];
        const group = {
            ...groups[groupIndex],
            ...partialGroup
        };
        groups[groupIndex] = group;
        this.setState({ groups });
    }

    addGroup() {
        const groups: InputSearchExpressionGroup[] = [...this.state.groups];
        const maxKey = groups.reduce((max, p) => p.key > max ? p.key : max, groups[0].key);
        const newGroup = this.newGroup(maxKey + 1, '&&');
        groups.push(newGroup);
        this.setState({ groups });
    }

    deleteGroup(groupIndex: number) {
        const groups: InputSearchExpressionGroup[] = [...this.state.groups];
        groups.splice(groupIndex, 1);
        this.setState({ groups });
    }

    newExpression(key: number, clause: SandDance.types.SearchExpressionClause) {
        const ex: InputSearchExpression = { key, clause, name: null, operator: 'contains', value: '' };
        return ex;
    }

    addExpression(groupIndex: number) {
        const groups: InputSearchExpressionGroup[] = [...this.state.groups];
        const group = groups[groupIndex];
        const maxKey = group.expressions.reduce((max, p) => p.key > max ? p.key : max, group.expressions[0].key);
        const newEx = this.newExpression(maxKey + 1, '&&');
        group.expressions.push(newEx);
        if (group.expressions.length === 2) {
            newEx.unlocked = true;
        } else {
            group.expressions.forEach(ex => ex.unlocked = false);
            newEx.clause = group.expressions[1].clause;
        }
        this.setState({ groups });
    }

    updateExpression(partialEx: Partial<InputSearchExpression>, groupIndex: number, index: number) {
        const groups: InputSearchExpressionGroup[] = [...this.state.groups];
        const group = groups[groupIndex];
        const ex = SandDance.VegaDeckGl.util.clone(group.expressions[index]);
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
        group.expressions[index] = ex;
        this.setState({ groups });
    }

    deleteExpression(groupIndex: number, index: number) {
        const groups: InputSearchExpressionGroup[] = [...this.state.groups];
        const group = groups[groupIndex];
        const expressions: InputSearchExpression[] = [...group.expressions];
        expressions.splice(index, 1);
        if (expressions.length === 2) {
            expressions[1].unlocked = true;
        }
        group.expressions = expressions;
        this.setState({ groups });
    }

    render() {
        return (
            <Group
                className="sanddance-search"
                label={strings.dialogTitleSearch}
            >
                <div>
                    {this.state.groups.map((group, groupIndex) => (
                        <div
                            className="sanddance-search-group"
                            key={group.key}
                        >
                            <Dropdown
                                className="search-group-clause"
                                //label={strings.labelSearchClause}
                                disabled={groupIndex === 0}
                                dropdownWidth={120}
                                options={getGroupClauses(group.clause, groupIndex)}
                                onChange={(e, o) => this.updateGroup({ clause: (o.data as SandDance.types.SearchExpressionClause) }, groupIndex)}
                            />
                            <div>
                                {group.expressions.map((ex, i) => (
                                    <div
                                        className="sanddance-search-expression"
                                        key={ex.key}
                                    >
                                        <SearchTerm
                                            onUpdateExpression={(ex, i) => this.updateExpression(ex, groupIndex, i)}
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
                                                onClick={() => this.deleteExpression(groupIndex, i)}
                                                text={strings.buttonDeleteExpression}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            {group.expressions.length < maxClauses && (
                                <div>
                                    <Button
                                        themePalette={this.props.themePalette}
                                        className="search-action"
                                        iconName="Add"
                                        onClick={() => this.addExpression(groupIndex)}
                                        text={strings.buttonAddExpression}
                                    />
                                </div>
                            )}
                            {groupIndex > 0 && (
                                <Button
                                    themePalette={this.props.themePalette}
                                    className="search-action"
                                    iconName="Cancel"
                                    onClick={() => this.deleteGroup(groupIndex)}
                                    text={strings.buttonDeleteExpressionGroup}
                                />
                            )}
                        </div>
                    ))}
                    {this.state.groups.length < maxClauses && (
                        <div>
                            <Button
                                themePalette={this.props.themePalette}
                                className="search-action search-bottom-action"
                                iconName="Add"
                                onClick={() => this.addGroup()}
                                text={strings.buttonAddExpressionGroup}
                            />
                        </div>
                    )}
                </div>
                <base.fabric.PrimaryButton
                    className="search-action search-bottom-action"
                    text={strings.buttonSelect}
                    onClick={() => this.validateAndSearch()}
                />
            </Group>
        );
    }
}
