// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { Dialog } from '../controls/dialog';
import { Explorer } from '../explorer';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { getCanvas } from '../canvas';
import { Group } from '../controls/group';
import { IconButton } from '../controls/iconButton';
import { SandDance, util } from '@msrvida/sanddance-react';
import { Snapshot, SnapshotAction } from '../interfaces';
import { strings } from '../language';

export interface SnapshotProps {
    getTopActions?: (snapshots: Snapshot[]) => FabricTypes.IContextualMenuItem[];
    getActions?: (snapshot: Snapshot, snapshotIndex: number) => SnapshotAction[];
    getChildren?: (snapshots: Snapshot[]) => React.ReactNode;
    modifySnapShot?: (snapshot: Snapshot) => void;
    getTitle?: (insight: SandDance.types.Insight) => string;
    getDescription?: (insight: SandDance.types.Insight) => string;
}

export interface Props extends SnapshotProps {
    explorer: Explorer;
    snapshots: Snapshot[];
    selectedSnapshotIndex: number;
    onClearSnapshots: () => void;
    onCreateSnapshot: (snapshot: Snapshot, editIndex: number) => void;
    onRemoveSnapshot: (i: number) => void;
    onMoveUp: (i: number) => void;
    onMoveDown: (i: number) => void;
    onSnapshotClick?: (snapshot: Snapshot, index: number) => void;
    themePalette: Partial<FabricTypes.IPalette>;
}

export interface Confirmation {
    buttonText: string;
    handler: () => void;
}

export interface State extends Snapshot {
    showEditFormDialog: boolean;
    editIndex: number;
    confirmation: Confirmation;
}

export class Snapshots extends React.Component<Props, State>{
    private buttonRef?: React.RefObject<FabricTypes.IContextualMenuRenderItem>;

    constructor(props: Props) {
        super(props);
        this.state = {
            confirmation: null,
            showEditFormDialog: false,
            title: '',
            description: '',
            image: null,
            bgColor: null,
            insight: null,
            editIndex: -1
        };
        this.buttonRef = React.createRef<FabricTypes.IContextualMenuRenderItem>();
    }

    saveSnapshot() {
        const snapshot: Snapshot = {
            title: this.state.title,
            description: this.state.description,
            insight: this.state.insight,
            image: this.state.image,
            bgColor: this.state.bgColor
        };
        this.props.modifySnapShot && this.props.modifySnapShot(snapshot);
        this.props.onCreateSnapshot(snapshot, this.state.editIndex);
        this.setState({ showEditFormDialog: false, title: '', description: '', image: null });
    }

    resize(src: string, thumbWidth: number) {
        if (!src) return;
        var img = new Image();
        img.onload = () => {
            var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
            const ratio = img.width / thumbWidth;
            canvas.height = img.height / ratio;
            canvas.width = thumbWidth;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const image = canvas.toDataURL();
            this.setState({ image });
        };
        img.src = src;
    }

    render() {
        const items: FabricTypes.IContextualMenuItem[] = [
            {
                key: 'clear',
                componentRef: this.buttonRef,
                text: strings.buttonClearSnapshots,
                onClick: () => this.setState({
                    confirmation: {
                        buttonText: strings.buttonClearSnapshots,
                        handler: () => this.props.onClearSnapshots()
                    }
                })
            }
        ];
        if (this.props.getTopActions) {
            items.push.apply(items, this.props.getTopActions(this.props.snapshots));
        }
        return (
            <Group className="sanddance-snapshots" label={strings.labelSnapshots}>
                <div>
                    <base.fabric.PrimaryButton
                        text={strings.buttonCreateSnapshot}
                        onClick={e => {
                            this.props.explorer.viewer.deselect().then(() => {
                                const canvas = getCanvas(this.props.explorer.viewer);
                                const bgColor = canvas && window.getComputedStyle(canvas).backgroundColor;
                                const insight = SandDance.VegaDeckGl.util.clone(this.props.explorer.viewer.getInsight());
                                delete insight.size;
                                const title = this.props.getTitle && this.props.getTitle(insight) || '';
                                const description = this.props.getDescription && this.props.getDescription(insight) || '';
                                this.setState({ showEditFormDialog: true, bgColor, title, description, insight, image: null, editIndex: -1 });

                                //allow deselection to render
                                setTimeout(() => {
                                    this.resize(canvas && canvas.toDataURL('image/png'), this.props.explorer.snapshotThumbWidth);
                                }, 500);
                            });
                        }}
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
                                <base.fabric.PrimaryButton
                                    key={0}
                                    onClick={e => {
                                        this.setState({ confirmation: null });
                                        this.state.confirmation.handler();
                                    }}
                                    text={this.state.confirmation.buttonText}
                                />
                            )}
                            onDismiss={() => this.setState({ confirmation: null })}
                        >
                            {strings.labelConfirmation}
                        </Dialog>
                    )}
                    <Dialog
                        modalProps={{ className: util.classList('sanddance-snapshot-dialog', this.props.explorer.props.theme) }}
                        minWidth={`${this.props.explorer.snapshotThumbWidth + 64}px`}
                        hidden={!this.state.showEditFormDialog}
                        onDismiss={() => this.setState({ showEditFormDialog: false })}
                        title={strings.buttonCreateSnapshot}
                        buttons={(
                            <base.fabric.PrimaryButton
                                disabled={!this.state.image || !this.state.title}
                                key={0}
                                onClick={e => this.saveSnapshot()}
                                text={this.state.editIndex >= 0 ? strings.buttonUpdateSnapshot : strings.buttonCreateSnapshot}
                            />
                        )}
                    >
                        <base.fabric.TextField
                            label={strings.labelSnapshotTitle}
                            onChange={(e, title) => this.setState({ title })}
                            value={this.state.title}
                        />
                        <base.fabric.TextField
                            label={strings.labelSnapshotDescription}
                            onChange={(e, description) => this.setState({ description })}
                            value={this.state.description}
                            multiline={true}
                        />
                        <div className='thumbnail'>
                            {!this.state.image && <base.fabric.Spinner />}
                            {this.state.image && <img src={this.state.image} style={{ backgroundColor: this.state.bgColor }} />}
                        </div>
                        {this.props.explorer.viewer.colorContexts.length > 1 && <div>{strings.labelColorFilter}</div>}
                    </Dialog>
                    <div>
                        {this.props.snapshots.map((snapshot, i) => {
                            const actions: SnapshotAction[] = this.props.getActions && this.props.getActions(snapshot, i) || [];
                            actions.push(
                                {
                                    iconButtonProps: {
                                        themePalette: this.props.themePalette,
                                        title: strings.buttonEditSnapshot,
                                        onClick: e => this.setState({ showEditFormDialog: true, ...snapshot, editIndex: i }),
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
                                        <div className='description'>
                                            {snapshot.description}
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
