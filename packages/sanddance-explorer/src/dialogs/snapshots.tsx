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
    getActions?: (snapshot: Snapshot, snapshotIndex: number) => SnapshotAction[];
    modifySnapShot?: (snapshot: Snapshot) => void;
    getTitle?: (insight: SandDance.types.Insight) => string;
    getDescription?: (insight: SandDance.types.Insight) => string;
}

export interface Props extends SnapshotProps {
    explorer: Explorer;
    snapshots: Snapshot[];
    onCreateSnapshot: (snapshot: Snapshot, editIndex: number) => void;
    onRemoveSnapshot: (i: number) => void;
    onSnapshotClick?: (snapshot: Snapshot) => void;
    themePalette: Partial<FabricTypes.IPalette>;
}

interface State {
    title: string;
    description: string;
    formHidden: boolean;
    image: string;
    bgColor: string;
    insight: SandDance.types.Insight;
    editIndex: number;
}

const thumbWidth = 300;

export class Snapshots extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            formHidden: true,
            title: '',
            description: '',
            image: null,
            bgColor: null,
            insight: null,
            editIndex: -1
        };
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
        this.setState({ formHidden: true, title: '', description: '', image: null });
    }

    resize(src: string) {
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
        return (
            <Group className="sanddance-snapshots" label={strings.labelSnapshots}>
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
                            this.setState({ formHidden: false, bgColor, title, description, insight, image: null, editIndex: -1 });

                            //allow deselection to render
                            setTimeout(() => {
                                this.resize(canvas && canvas.toDataURL('image/png'));
                            }, 500);
                        });
                    }}
                />
                <Dialog
                    modalProps={{ className: util.classList('sanddance-snapshot-dialog', this.props.explorer.props.theme) }}
                    minWidth={`${thumbWidth + 64}px`}
                    hidden={this.state.formHidden}
                    onDismiss={() => this.setState({ formHidden: true })}
                    title={strings.buttonCreateSnapshot}
                    buttons={[
                        <base.fabric.PrimaryButton disabled={!this.state.image || !this.state.title} key={0} onClick={e => this.saveSnapshot()} text={strings.buttonCreateSnapshot} />
                    ]}
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
                        actions.push({
                            iconButtonProps: {
                                themePalette: this.props.themePalette,
                                title: strings.buttonEditSnapshot,
                                onClick: e => {
                                    this.setState({ formHidden: false, ...snapshot, editIndex: i });
                                },
                                iconName: 'Edit'
                            }
                        },
                            {
                                iconButtonProps: {
                                    themePalette: this.props.themePalette,
                                    title: strings.buttonDeleteSnapshot,
                                    onClick: e => this.props.onRemoveSnapshot(i),
                                    iconName: 'Delete'
                                }
                            });
                        return (
                            <div key={i} className="snapshot">
                                <div
                                    onClick={e => this.props.onSnapshotClick(snapshot)}
                                >
                                    <div className="title">
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
