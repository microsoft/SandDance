// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    AutoCompleteDistinctValues,
    getValidOperators,
    InputSearchExpression,
    SearchTerm,
    getText
} from '../controls/searchTerm';
import { base } from '../base';
import { Button } from '../controls/button';
import { Dropdown } from '../controls/dropdown';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { Group } from '../controls/group';
import { SandDance, util } from '@msrvida/sanddance-react';
import { strings } from '../language';

import SearchExpressionClause = SandDance.searchExpression.SearchExpressionClause;

const maxClauses = 5;

export interface InputSearchExpressionGroup extends SandDance.searchExpression.SearchExpressionGroup<InputSearchExpression> {
    key: number;
}

export interface IInitializer {
    search?: InputSearchExpressionGroup[];
    columns: SandDance.types.Column[];
}

export interface Props {
    collapseLabels: boolean;
    data: object[];
    initializer: IInitializer;
    onSelect: { (search: SandDance.searchExpression.Search): void };
    autoCompleteDistinctValues: AutoCompleteDistinctValues;
    disableExpressionOR: boolean;
    disableGroupOR: boolean;
    disabled: boolean;
    themePalette: Partial<FluentUITypes.IPalette>;
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
    const s = getText(ex);
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
    const s = getText(ex);
    if (s.length !== 0) {
        ex.errorMessage = null;
    }
}

function getGroupClauses(currClause: SearchExpressionClause, index: number, disableGroupOR: boolean) {
    let keys: [SearchExpressionClause, string][];
    if (index === 0) {
        keys = [
            [null, strings.searchWHERE]
        ];
    } else {
        keys = [
            ['&&', strings.searchAND]
        ];
        if (!disableGroupOR) {
            keys.push(['||', strings.searchOR]);
        }
    }
    return keys.map((key: [SearchExpressionClause, string], i: number) => {
        const [clause, text] = key;
        const selected = currClause == clause; //deliberate double equal 
        const option: FluentUITypes.IDropdownOption = {
            key: i,
            text,
            data: clause,
            selected
        };
        return option;
    });
}

function _Search(props: Props) {
    class __Search extends base.react.Component<Props, State> {

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

        newGroup(key: number, clause: SearchExpressionClause) {
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

        newExpression(key: number, clause: SearchExpressionClause) {
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
                    label={strings.labelSearch}
                >
                    <div>
                        {this.state.groups.map((group, groupIndex) => (
                            <div
                                className="sanddance-search-group"
                                key={group.key}
                            >
                                <Dropdown
                                    collapseLabel={this.props.collapseLabels}
                                    className="search-group-clause"
                                    label={strings.labelSearchClause}
                                    disabled={groupIndex === 0 || this.props.disableGroupOR}
                                    dropdownWidth={120}
                                    options={getGroupClauses(group.clause, groupIndex, this.props.disableGroupOR)}
                                    onChange={(e, o) => this.updateGroup({ clause: (o.data as SearchExpressionClause) }, groupIndex)}
                                />
                                <div>
                                    {group.expressions.map((ex, i) => (
                                        <div
                                            className="sanddance-search-expression"
                                            key={ex.key}
                                        >
                                            <SearchTerm
                                                collapseLabels={this.props.collapseLabels}
                                                onUpdateExpression={(ex, i) => this.updateExpression(ex, groupIndex, i)}
                                                autoCompleteDistinctValues={this.props.autoCompleteDistinctValues}
                                                index={i}
                                                columns={this.state.sortedColumns}
                                                data={this.props.data}
                                                searchExpression={ex}
                                                disableOR={this.props.disableExpressionOR}
                                                column={getColumnWithName(ex.name, this.state.sortedColumns)}
                                            />
                                            {group.expressions.length > 1 && (
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
                                {this.state.groups.length > 1 && (
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
                    <base.fluentUI.PrimaryButton
                        className="search-action search-bottom-action"
                        text={strings.buttonSelect}
                        onClick={() => this.validateAndSearch()}
                    />
                </Group>
            );
        }
    }
    return new __Search(props);
}

export const Search: typeof Search_Class = _Search as any;

export declare class Search_Class extends base.react.Component<Props, State> {
}
