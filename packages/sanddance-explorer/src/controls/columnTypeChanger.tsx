import { base } from '../base';
import { Dialog } from './dialog';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from '../language';

export interface Props {
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
        }

        render() {
            // TODO Give it its own class
            // TODO Add revert button
            return (
                <div className="sanddance-dataExporter">
                    <base.fluentUI.DefaultButton
                        className="search-action search-bottom-action"
                        text={strings.buttonChangeColumnType}
                        onClick={() => this.setState({dialogHidden: false})}
                    />
                    <Dialog
                        hidden={this.state.dialogHidden}
                        onDismiss={() => this.setState({dialogHidden: true})}
                        dialogContentProps={{
                            title: strings.labelChangeColumnType,
                            subText: strings.labelChangeColumnTypeSubtext
                        }}
                    >
                        {this.props.columns
                            .filter(c => c.type == 'integer' || c.type == 'number')
                            .map(c => (
                                <div key={c.name}>
                                    <base.fluentUI.Dropdown
                                        options={[
                                            {key: "c", text: strings.labelCategorical},
                                            {key: "q", text: strings.labelQuantitative},
                                        ]}
                                        label={c.name}
                                        defaultSelectedKey={c.quantitative ? "q" : "c"}
                                        onChange={(e, opt) => this.props.onUpdateColumn({
                                            name: c.name,
                                            type: c.type,
                                            quantitative: opt.key == "q",
                                        })}
                                    />
                                </div>
                            ))
                        }
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