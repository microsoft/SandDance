/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { Dialog } from './dialog';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from '../language';
import { IconButton } from './iconButton';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';

export interface Props {
    theme: string;
    themePalette: Partial<FluentUITypes.IPalette>;
    initialQuantitativeColumns: SandDance.types.Column[];
    initialCategoricalColumns: SandDance.types.Column[];
    onConfirmUpdate: (columnTypes?: SandDance.types.ColumnTypeMap) => void;
}

export interface State {
    dialogHidden: boolean;
    confirmationHidden: boolean;
    quantitativeColumns: SandDance.types.Column[];
    categoricalColumns: SandDance.types.Column[];
    columnTypes: SandDance.types.ColumnTypeMap;
}

function _ColumnTypeChanger(_props: Props) {
    class __ColumnTypeChanger extends base.react.Component<Props, State> {

        constructor(props: Props) {
            super(props);
            this.state = this.getInitialState();
        }

        private getInitialState(): State {
            const { props } = this;
            return {
                dialogHidden: true,
                confirmationHidden: true,
                quantitativeColumns: props.initialQuantitativeColumns.map(c => SandDance.VegaMorphCharts.util.clone(c)),
                categoricalColumns: props.initialCategoricalColumns.map(c => SandDance.VegaMorphCharts.util.clone(c)),
                columnTypes: null,
            };
        }

        private closeDialog() {
            this.setState(this.getInitialState());
        }

        private openConfirmation(columnTypes: SandDance.types.ColumnTypeMap) {
            this.setState({ columnTypes, confirmationHidden: false });
        }

        render() {
            const { props, state } = this;
            const hasChanges = props.initialQuantitativeColumns.some((c, i) => {
                return c.quantitative !== state.quantitativeColumns[i].quantitative;
            });
            return (
                <div>
                    <base.fluentUI.DefaultButton
                        text={strings.buttonColumnTypes}
                        onClick={() => this.setState({ dialogHidden: false })}
                    />
                    <Dialog
                        minWidth="80%"
                        hidden={state.dialogHidden}
                        onDismiss={() => this.closeDialog()}
                        dialogContentProps={{
                            className: `sanddance-dialog ${props.theme}`,
                            type: base.fluentUI.DialogType.normal,
                            title: strings.labelColumnTypes,
                        }}
                        buttons={[
                            (
                                <base.fluentUI.DefaultButton
                                    key="revert"
                                    text={strings.buttonResetToDefault}
                                    onClick={() => this.openConfirmation(null)}
                                    iconProps={{ iconName: 'Undo' }}
                                />
                            ),
                            (
                                <base.fluentUI.DefaultButton
                                    key="apply"
                                    text={strings.buttonApply}
                                    onClick={() => {
                                        const columnTypes: SandDance.types.ColumnTypeMap = {};
                                        state.quantitativeColumns.forEach(c => {
                                            columnTypes[c.name] = c.quantitative ? c.type : 'string';
                                        });
                                        state.categoricalColumns.forEach(c => {
                                            columnTypes[c.name] = 'string';
                                        });
                                        this.openConfirmation(columnTypes);
                                    }}
                                    iconProps={{ iconName: 'Accept' }}
                                    disabled={!hasChanges}
                                />
                            ),
                        ]}
                    >
                        <div className='sanddance-columnTypes'>
                            {state.quantitativeColumns.length > 0 && (
                                <div>
                                    <h3>{strings.selectNumeric}</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>{strings.labelEditColumn}</th>
                                                <th>{strings.labelColumnName}</th>
                                                <th>{strings.labelColumnQuantitativeMin}</th>
                                                <th>{strings.labelColumnQuantitativeMax}</th>
                                                <th>{strings.labelColumnQuantitativeMean}</th>
                                                <th>{strings.labelColumnDistinct}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {state.quantitativeColumns.map((c, i) => (
                                                <tr
                                                    key={i}
                                                    className={c.quantitative ? '' : 'changed'}
                                                >
                                                    <td>
                                                        <IconButton
                                                            iconName='Edit'
                                                            onClick={undefined}
                                                            menuProps={{
                                                                items: [strings.selectNumeric, strings.selectNonNumeric].map(t => {
                                                                    return {
                                                                        key: t,
                                                                        text: t,
                                                                        onClick: () => {
                                                                            c.quantitative = t === strings.selectNumeric;
                                                                            this.setState({ quantitativeColumns: [...state.quantitativeColumns] });
                                                                        },
                                                                    };
                                                                }),
                                                            }}
                                                            themePalette={props.themePalette}
                                                            title={strings.labelChangeColumnType}
                                                        />
                                                    </td>
                                                    <td>{c.name}</td>
                                                    <td>{c.stats.min}</td>
                                                    <td>{c.stats.max}</td>
                                                    <td>{c.stats.mean}</td>
                                                    <td>{c.stats.distinctValueCount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {state.categoricalColumns.length > 0 && (
                                <div>
                                    <h3>{strings.selectNonNumeric}</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>{strings.labelColumnName}</th>
                                                <th>{strings.labelColumnDistinct}</th>
                                                <th>{strings.labelColumnIsColorData}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {state.categoricalColumns.map((c, i) => (
                                                <tr key={i}>
                                                    <td>{c.name}</td>
                                                    <td>{c.stats.distinctValueCount}</td>
                                                    <td>{(!!c.isColorData).toString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </Dialog>
                    <Dialog
                        hidden={state.confirmationHidden}
                        onDismiss={() => this.setState({ confirmationHidden: true })}
                        dialogContentProps={{
                            className: `sanddance-dialog ${props.theme}`,
                            type: base.fluentUI.DialogType.normal,
                            title: strings.labelConfirmation,
                            subText: strings.labelHistoryWarning,
                        }}
                        buttons={(
                            <base.fluentUI.PrimaryButton
                                text={strings.buttonApply}
                                onClick={() => {
                                    this.closeDialog();
                                    this.props.onConfirmUpdate(this.state.columnTypes);
                                }}
                                iconProps={{ iconName: 'Accept' }}
                            />
                        )}
                    >
                    </Dialog>
                </div>
            );
        }
    }

    return new __ColumnTypeChanger(_props);
}

export const ColumnTypeChanger: typeof ColumnTypeChanger_Class = _ColumnTypeChanger as any;

export declare class ColumnTypeChanger_Class extends base.react.Component<Props, State> {
}
