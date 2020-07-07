// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { Dialog } from '../controls/dialog';
import { Explorer_Class } from '../explorer';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { Group } from '../controls/group';
import { IconButton } from '../controls/iconButton';
import { SandDance, util } from '@msrvida/sanddance-react';
import { SnapshotAction } from '../interfaces';
import { strings } from '../language';
import { SnapshotEditor_Class } from './snapshotEditor';

import Snapshot = SandDance.types.Snapshot;

export interface SnapshotListProps {
    getTopActions?: (snapshots: Snapshot[]) => FluentUITypes.IContextualMenuItem[];
    getActions?: (snapshot: Snapshot, snapshotIndex: number) => SnapshotAction[];
    getChildren?: (snapshots: Snapshot[]) => React.ReactNode;
}

export interface Props extends SnapshotListProps {
    explorer: Explorer_Class;
    editor: SnapshotEditor_Class;
    snapshots: Snapshot[];
    selectedSnapshotIndex: number;
    onClearSnapshots: () => void;
    onWriteSnapshot: (snapshot: Snapshot, editIndex: number) => void;
    onRemoveSnapshot: (i: number) => void;
    onMoveUp: (i: number) => void;
    onMoveDown: (i: number) => void;
    onSnapshotClick?: (snapshot: Snapshot, index: number) => void;
    themePalette: Partial<FluentUITypes.IPalette>;
}

export interface Confirmation {
    buttonText: string;
    handler: () => void;
}

export interface State extends Snapshot {
    confirmation: Confirmation;
}
function _Snapshots(props: Props) {
    class __Snapshots extends base.react.Component<Props, State>{
        constructor(props: Props) {
            super(props);
            this.state = {
                confirmation: null,
                title: '',
                description: '',
                image: null,
                bgColor: null,
                insight: null
            };
        }

        render() {
            const items: FluentUITypes.IContextualMenuItem[] = [
                {
                    key: 'clear',
                    text: strings.buttonClearSnapshots,
                    onClick: () => this.setState({
                        confirmation: {
                            buttonText: strings.buttonClearSnapshots,
                            handler: () => this.props.onClearSnapshots()
                        }
                    }),
                    disabled: this.props.snapshots.length === 0
                }
            ];
            if (this.props.getTopActions) {
                items.push.apply(items, this.props.getTopActions(this.props.snapshots));
            }
            return (
                <Group className="sanddance-snapshots" label={strings.labelSnapshots}>
                    <div>
                        <base.fluentUI.PrimaryButton
                            text={strings.buttonCreateSnapshot}
                            onClick={e => this.props.editor.editSnapshot()}
                            split
                            menuProps={{
                                items
                            }}
                        />
                        {this.props.getChildren && this.props.getChildren(this.props.snapshots)}
                        {this.state.confirmation && (
                            <Dialog
                                hidden={false}
                                buttons={(
                                    <base.fluentUI.PrimaryButton
                                        key={0}
                                        onClick={e => {
                                            this.setState({ confirmation: null });
                                            this.state.confirmation.handler();
                                        }}
                                        iconProps={{ iconName: 'Delete' }}
                                        text={this.state.confirmation.buttonText}
                                    />
                                )}
                                onDismiss={() => this.setState({ confirmation: null })}
                            >
                                {strings.labelConfirmation}
                            </Dialog>
                        )}
                        <div>
                            {this.props.snapshots.map((snapshot, i) => {
                                const actions: SnapshotAction[] = this.props.getActions && this.props.getActions(snapshot, i) || [];
                                actions.push(
                                    {
                                        iconButtonProps: {
                                            themePalette: this.props.themePalette,
                                            title: strings.buttonEditSnapshot,
                                            onClick: e => this.props.editor.editSnapshot(snapshot, i),
                                            iconName: 'Edit'
                                        }
                                    }
                                );
                                if (this.props.snapshots.length > 1) {
                                    actions.push(
                                        {
                                            iconButtonProps: {
                                                disabled: i === 0,
                                                themePalette: this.props.themePalette,
                                                title: strings.buttonMoveUp,
                                                onClick: e => this.props.onMoveUp(i),
                                                iconName: 'SortUp'
                                            }
                                        },
                                        {
                                            iconButtonProps: {
                                                disabled: i > this.props.snapshots.length - 2,
                                                themePalette: this.props.themePalette,
                                                title: strings.buttonMoveDown,
                                                onClick: e => this.props.onMoveDown(i),
                                                iconName: 'SortDown'
                                            }
                                        }
                                    );
                                }
                                actions.push(
                                    {
                                        iconButtonProps: {
                                            themePalette: this.props.themePalette,
                                            title: strings.buttonDeleteSnapshot,
                                            onClick: () =>
                                                this.setState({
                                                    confirmation: {
                                                        buttonText: strings.buttonDeleteSnapshot,
                                                        handler: () => this.props.onRemoveSnapshot(i)
                                                    }
                                                }),
                                            iconName: 'Delete'
                                        }
                                    }
                                );
                                return (
                                    <div key={i} className={util.classList('snapshot', i === this.props.selectedSnapshotIndex && 'selected')}>
                                        <div
                                            onClick={e => this.props.onSnapshotClick(snapshot, i)}
                                        >
                                            <div className='title'>
                                                {snapshot.title}
                                            </div>
                                            <div className='thumbnail'>
                                                <img title={snapshot.description} src={snapshot.image} style={{ backgroundColor: snapshot.bgColor }} />
                                            </div>
                                        </div>
                                        <Actions
                                            actions={actions}
                                            snapshot={snapshot}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Group>
            );
        }
    }
    return new __Snapshots(props);
}

export const Snapshots: typeof Snapshots_Class = _Snapshots as any;

export declare class Snapshots_Class extends base.react.Component<Props, State> {
}

interface ActionsProps {
    actions: SnapshotAction[];
    snapshot: Snapshot;
}

function Actions(props: ActionsProps) {
    return (
        <div className="actions">
            {props.actions.map((action, i) => {
                if (action.iconButtonProps) {
                    return (
                        <IconButton key={i} {...action.iconButtonProps} />
                    );
                }
                if (action.element) {
                    return action.element;
                }
            })}
        </div>
    );
}
