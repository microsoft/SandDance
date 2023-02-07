import { base } from '../base';
import { Dialog } from './dialog';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from '../language';
import { IconButton } from './iconButton';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { TypeInference } from 'vega-typings';

export interface Props {
    theme: string;
    themePalette: Partial<FluentUITypes.IPalette>;
    columns: SandDance.types.Column[];
    quantitativeColumns: SandDance.types.Column[];
    categoricalColumns: SandDance.types.Column[];
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
            this.state = this.reset();
            this.openDialog = this.openDialog.bind(this);
            this.closeDialog = this.closeDialog.bind(this);
            this.openConfirmation = this.openConfirmation.bind(this);
            this.closeConfirmation = this.closeConfirmation.bind(this);
            this.confirm = this.confirm.bind(this);
        }

        private reset(): State {
            const { props } = this;
            return {
                dialogHidden: true,
                confirmationHidden: true,
                quantitativeColumns: props.quantitativeColumns.map(c => SandDance.VegaMorphCharts.util.clone(c)),
                categoricalColumns: props.categoricalColumns.map(c => SandDance.VegaMorphCharts.util.clone(c)),
                columnTypes: null
            };
        }

        private openDialog() {
            this.setState({ dialogHidden: false });
        }

        private closeDialog() {
            this.setState(this.reset());
        }

        private openConfirmation(columnTypes: SandDance.types.ColumnTypeMap) {
            this.setState({ columnTypes, confirmationHidden: false });
        }

        private closeConfirmation() {
            this.setState({ confirmationHidden: true });
        }

        private confirm() {
            this.setState({ confirmationHidden: true });
            this.closeDialog();
            this.props.onConfirmUpdate(this.state.columnTypes);
        }

        private hasChanges() {
            const { props, state } = this;
            return props.columns.some(c => {
                const newColumn =
                    state.quantitativeColumns.find(c2 => c2.name === c.name) ||
                    state.categoricalColumns.find(c2 => c2.name === c.name);
                return c.quantitative !== newColumn.quantitative;
            });
        }

        render() {
            const { props, state } = this;
            const hasChanges = this.hasChanges();
            return (
                <div>
                    <base.fluentUI.DefaultButton
                        text={strings.buttonChangeColumnType}
                        onClick={this.openDialog}
                    />
                    <Dialog
                        minWidth="80%"
                        hidden={state.dialogHidden}
                        onDismiss={this.closeDialog}
                        dialogContentProps={{
                            className: `sanddance-dialog ${props.theme}`,
                            type: base.fluentUI.DialogType.normal,
                            title: strings.labelColumnTypes,
                        }}
                        buttons={[
                            (
                                <base.fluentUI.DefaultButton
                                    key="revert"
                                    text="Revert to automatic" //TODO localize
                                    onClick={() => {
                                        this.openConfirmation(null);
                                    }}
                                    iconProps={{ iconName: 'Undo' }}
                                />
                            ),
                            (
                                <base.fluentUI.DefaultButton
                                    key="apply"
                                    text="Apply and reload" //TODO localize
                                    onClick={() => {
                                        const columnTypes: SandDance.types.ColumnTypeMap = {};
                                        state.quantitativeColumns.forEach(c => {
                                            columnTypes[c.name] = c.quantitative ? c.type : 'string';
                                        });
                                        state.categoricalColumns.forEach(c => {
                                            columnTypes[c.name] = 'string';
                                        });
                                        console.log('apply', columnTypes);
                                        this.openConfirmation(columnTypes);
                                    }}
                                    iconProps={{ iconName: 'Accept' }}
                                    disabled={!hasChanges}
                                />
                            )
                        ]}
                    >
                        <div className='sanddance-columnTypes'>
                            {props.quantitativeColumns.length && (
                                <div>
                                    <h3>{strings.selectNumeric}</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                {/* TODO: localise */}
                                                <th>Column name</th>
                                                <th>Min</th>
                                                <th>Max</th>
                                                <th>Mean</th>
                                                <th>Distinct values</th>
                                                <th>Change type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {state.quantitativeColumns.map((c, i) => (
                                                <tr
                                                    key={i}
                                                    className={c.quantitative ? '' : 'changed'}
                                                >
                                                    <td>{c.name}</td>
                                                    <td>{c.stats.min}</td>
                                                    <td>{c.stats.max}</td>
                                                    <td>{c.stats.mean}</td>
                                                    <td>{c.stats.distinctValueCount}</td>
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
                                                                        }
                                                                    };
                                                                })
                                                            }}
                                                            themePalette={props.themePalette}
                                                            title='Change type' //TODO localize
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {state.categoricalColumns.length && (
                                <div>
                                    <h3>{strings.selectNonNumeric}</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                {/* TODO: localise */}
                                                <th>Column name</th>
                                                <th>Distinct values</th>
                                                <th>Is color data</th>
                                                <th>Has color data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {state.categoricalColumns.map((c, i) => (
                                                <tr key={i}>
                                                    <td>{c.name}</td>
                                                    <td>{c.stats.distinctValueCount}</td>
                                                    <td>{(!!c.isColorData).toString()}</td>
                                                    <td>{(!!c.stats.hasColorData).toString()}</td>
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
                        onDismiss={this.closeConfirmation}
                        dialogContentProps={{
                            className: `sanddance-dialog ${props.theme}`,
                            type: base.fluentUI.DialogType.normal,
                            title: "Are you sure?", //TODO localize
                            subText: "This will erase your current history.",   //TODO localize
                        }}
                        // modalProps={{
                        //     isBlocking: true,
                        // }}
                        buttons={(
                            <base.fluentUI.PrimaryButton
                                text="Apply and reload" //TODO localize
                                onClick={this.confirm}
                            // TODO iconprops
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
