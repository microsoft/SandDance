import { base } from '../base';
import { Dialog } from './dialog';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from '../language';

export interface Props {
    theme: string;
    columns: SandDance.types.Column[];
    onUpdateColumn: (column: SandDance.types.Column) => void;
}

export interface State {
    dialogHidden: boolean;
}

function _ColumnTypeChanger(_props: Props) {
    class __ColumnTypeChanger extends base.react.Component<Props, State> {
        constructor(props: Props) {
            super(props);
            this.state = {dialogHidden: true};
            this.openDialog = this.openDialog.bind(this);
            this.closeDialog = this.closeDialog.bind(this);
            this.revert = this.revert.bind(this);
        }

        private openDialog() {
            this.setState({dialogHidden: false});
        }
        
        private closeDialog() {
            this.setState({dialogHidden: true});
        }

        private getChangeableColumns(): SandDance.types.Column[] {
            return this.props.columns.filter(c => c.type == 'integer' || c.type == 'number');
        }

        private revert() {
            this.getChangeableColumns()
                .filter(c => !c.quantitative)
                .forEach(c => this.props.onUpdateColumn({
                    name: c.name,
                    type: c.type,
                    quantitative: true,
                }));
            this.closeDialog();
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
                                text={strings.buttonRevert}
                                onClick={this.revert}
                                iconProps={{iconName: 'Undo'}}
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
                                onChange={(e, opt) => this.props.onUpdateColumn({
                                    name: c.name,
                                    type: c.type,
                                    quantitative: opt.key == 'q',
                                })}
                            />
                        ))}
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
