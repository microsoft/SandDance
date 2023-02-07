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
    quantitativeColumns: SandDance.types.Column[];
    categoricalColumns: SandDance.types.Column[];
    onConfirmUpdate: (columnTypes?: SandDance.types.ColumnTypeMap) => void;
}

export interface State {
    dialogHidden: boolean;
    confirmationHidden: boolean;
    quantitativeColumns: SandDance.types.Column[];
    categoricalColumns: SandDance.types.Column[];
}

const changeQuantitativeTypes: TypeInference[] = ['boolean', 'number', 'string'];

function _ColumnTypeChanger(_props: Props) {
    class __ColumnTypeChanger extends base.react.Component<Props, State> {

        private columnTypes: SandDance.types.ColumnTypeMap;

        constructor(props: Props) {
            super(props);
            this.state = {
                dialogHidden: true,
                confirmationHidden: true,
                quantitativeColumns: props.quantitativeColumns.map(c => SandDance.VegaMorphCharts.util.clone(c)),
                categoricalColumns: props.categoricalColumns.map(c => SandDance.VegaMorphCharts.util.clone(c)),
            };
            this.openDialog = this.openDialog.bind(this);
            this.closeDialog = this.closeDialog.bind(this);
            this.openConfirmation = this.openConfirmation.bind(this);
            this.closeConfirmation = this.closeConfirmation.bind(this);
            this.confirm = this.confirm.bind(this);
        }

        private openDialog() {
            this.setState({ dialogHidden: false });
        }

        private closeDialog() {
            this.setState({ dialogHidden: true });
        }

        private openConfirmation() {
            this.setState({ confirmationHidden: false });
        }

        private closeConfirmation() {
            this.setState({ confirmationHidden: true });
        }

        private confirm() {
            this.setState({ dialogHidden: true, confirmationHidden: true });
            this.props.onConfirmUpdate(this.columnTypes);
        }

        render() {
            const { props, state } = this;
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
                                        this.columnTypes = null;
                                        this.openConfirmation();
                                    }}
                                    iconProps={{ iconName: 'Undo' }}//TODO change
                                />
                            ),
                            (
                                <base.fluentUI.DefaultButton
                                    key="apply"
                                    text="Apply and reload" //TODO localize
                                    onClick={() => {
                                        const columnTypes: SandDance.types.ColumnTypeMap = {};
                                        state.quantitativeColumns.forEach(c => {
                                            columnTypes[c.name] = c.type;   //TODO: fix
                                        });
                                        this.columnTypes = columnTypes;
                                        this.openConfirmation();
                                    }}
                                    iconProps={{ iconName: 'Undo' }}//TODO change
                                />
                            )
                        ]}
                    >
                        <div className='sanddance-columnTypes'>
                            {props.quantitativeColumns.length && (
                                <div>
                                    <h3>{strings.labelQuantitative}</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                {/* TODO: localise */}
                                                <th>Column name</th>
                                                <th>Type</th>
                                                <th></th>
                                                <th>Min</th>
                                                <th>Max</th>
                                                <th>Mean</th>
                                                <th>Distinct values</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.quantitativeColumns.filter(c => c.quantitative).map((c, i) => (
                                                <tr key={i}>
                                                    <td>{c.name}</td>
                                                    <td>{c.type}</td>
                                                    <td>
                                                        <IconButton
                                                            iconName='Edit'
                                                            onClick={undefined}
                                                            menuProps={{
                                                                items: changeQuantitativeTypes.map(t => {
                                                                    return {
                                                                        key: t,
                                                                        text: t,
                                                                        onClick: () => {
                                                                            c.type = t;
                                                                            this.setState({ quantitativeColumns: [...state.quantitativeColumns] });
                                                                        }
                                                                    };
                                                                })
                                                            }}
                                                            themePalette={props.themePalette}
                                                            title='Change type' //TODO localize
                                                        />
                                                    </td>
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
                            {props.categoricalColumns.length && (
                                <div>
                                    <h3>{strings.labelCategorical}</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                {/* TODO: localise */}
                                                <th>Column name</th>
                                                <th>Type</th>
                                                <th>Distinct values</th>
                                                <th>Is color data</th>
                                                <th>Has color data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.categoricalColumns.filter(c => !c.quantitative).map((c, i) => (
                                                <tr key={i}>
                                                    <td>{c.name}</td>
                                                    <td>{c.type}</td>
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
