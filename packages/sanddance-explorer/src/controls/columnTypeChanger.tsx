import { base } from '../base';
import { Dialog } from './dialog';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from '../language';

export interface Props {
    theme: string;
    columns: SandDance.types.Column[];
    onConfirmUpdate: (columnTypes: SandDance.types.ColumnTypeMap) => void;
}

export interface State {
    dialogHidden: boolean;
    confirmationHidden: boolean;
    columns: SandDance.types.Column[];
}

function _ColumnTypeChanger(_props: Props) {
    class __ColumnTypeChanger extends base.react.Component<Props, State> {
        constructor(props: Props) {
            super(props);
            this.state = {
                dialogHidden: true,
                confirmationHidden: true,
                columns: props.columns.slice(),
            };
            this.openDialog = this.openDialog.bind(this);
            this.closeDialog = this.closeDialog.bind(this);
            this.openConfirmation = this.openConfirmation.bind(this);
            this.closeConfirmation = this.closeConfirmation.bind(this);
            this.confirm = this.confirm.bind(this);
        }

        private openDialog() {
            this.setState({dialogHidden: false});
        }
        
        private closeDialog() {
            this.setState({dialogHidden: true});
        }

        private openConfirmation() {
            this.setState({confirmationHidden: false});
        }

        private closeConfirmation() {
            this.setState({confirmationHidden: true});
        }

        private confirm() {
            this.setState({dialogHidden: true, confirmationHidden: true});
            const columnTypes: SandDance.types.ColumnTypeMap = {};
            this.state.columns.forEach(c => {
                columnTypes[c.name] = c.type;
            });
            this.props.onConfirmUpdate(columnTypes);
        }

        private getChangeableColumns(): SandDance.types.Column[] {
            return this.props.columns.filter(c => c.type == 'integer' || c.type == 'number');
        }

        render() {
            return (
                <div className="sanddance-columnTypeChanger">
                    <base.fluentUI.DefaultButton
                        text={strings.buttonChangeColumnType}
                        onClick={this.openDialog}
                    />
                    <Dialog
                        hidden={this.state.dialogHidden}
                        onDismiss={this.closeDialog}
                        dialogContentProps={{
                            className: `sanddance-dialog ${this.props.theme}`,
                            type: base.fluentUI.DialogType.normal,
                            title: strings.labelChangeColumnType,
                            subText: strings.labelChangeColumnTypeSubtext,
                        }}
                        buttons={
                            <base.fluentUI.DefaultButton
                                text="Apply and reload"
                                onClick={this.openConfirmation}
                                iconProps={{iconName: 'Undo'}}//TODO change
                            />
                        }
                    >
                        {this.getChangeableColumns().map(c => (
                            <base.fluentUI.Dropdown
                                key={c.name}
                                options={[
                                    {key: 'c', text: strings.labelCategorical},
                                    {key: 'q', text: strings.labelQuantitative},
                                ]}
                                label={c.name}
                                defaultSelectedKey={c.quantitative ? 'q' : 'c'}
                                onChange={(e, opt) => this.setState((state) => {
                                    state.columns
                                        .filter(column => column.name == c.name)
                                        .forEach(column => {
                                            column.quantitative = opt.key == 'q'
                                        })
                                })}
                            />
                        ))}
                    </Dialog>
                    <Dialog
                        hidden={this.state.confirmationHidden}
                        onDismiss={this.closeConfirmation}
                        dialogContentProps={{
                            className: `sanddance-dialog ${this.props.theme}`,
                            type: base.fluentUI.DialogType.normal,
                            title: "Are you sure?",
                            subText: "This will erase your current history.",
                        }}
                        // modalProps={{
                        //     isBlocking: true,
                        // }}
                        buttons={(
                            <base.fluentUI.PrimaryButton
                                text="Apply and reload"
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
