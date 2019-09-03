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
import { SandDance } from '@msrvida/sanddance-react';
import { Snapshot, SnapshotAction } from '../interfaces';
import { strings } from '../language';

export interface SnapshotProps {
    getActions?: (snapshot: Snapshot, snapshotIndex: number) => SnapshotAction[];
    modifySnapShot?: (snapshot: Snapshot) => void;
    getDescription?: (insight: SandDance.types.Insight) => string;
}

export interface Props extends SnapshotProps {
    explorer: Explorer;
    snapshots: Snapshot[];
    onCreateSnapshot: (snapshot: Snapshot) => void;
    onRemoveSnapshot: (i: number) => void;
    onSnapshotClick?: (snapshot: Snapshot) => void;
    themePalette: Partial<FabricTypes.IPalette>;
}

interface State {
    description: string;
    formHidden: boolean;
    image: string;
    bgColor: string;
    insight: SandDance.types.Insight;
}

const thumbWidth = 300;

export class Snapshots extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            formHidden: true,
            description: '',
            image: null,
            bgColor: null,
            insight: null
        };
    }

    saveSnapshot() {
        const snapshot: Snapshot = {
            description: this.state.description,
            insight: this.state.insight,
            image: this.state.image,
            bgColor: this.state.bgColor
        };
        this.props.modifySnapShot && this.props.modifySnapShot(snapshot);
        this.props.onCreateSnapshot(snapshot);
        this.setState({ formHidden: true, description: '' });
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
        }
        img.src = src;
    }

    render() {
        return (
            <Group className="sanddance-snapshots" label={strings.labelSnapshots}>
                <base.fabric.PrimaryButton
                    text={strings.buttonCreateSnapshot}
                    onClick={e => {
                        const canvas = getCanvas(this.props.explorer.viewer);
                        this.resize(canvas && canvas.toDataURL("image/png"));
                        const bgColor = canvas && window.getComputedStyle(canvas).backgroundColor;
                        const insight = this.props.explorer.viewer.getInsight();
                        const description = this.props.getDescription && this.props.getDescription(insight) || '';
                        this.setState({ formHidden: false, bgColor, description, insight });
                    }}
                />
                <Dialog
                    minWidth={`${thumbWidth + 64}px`}
                    hidden={this.state.formHidden}
                    onDismiss={() => this.setState({ formHidden: true })}
                    title={strings.buttonCreateSnapshot}
                    buttons={[
                        <base.fabric.PrimaryButton key={0} onClick={e => this.saveSnapshot()} text={strings.buttonCreateSnapshot} />
                    ]}
                >
                    <base.fabric.TextField
                        label={strings.labelSnapshotDescription}
                        onKeyUp={e => e.keyCode === 13 && this.saveSnapshot()}
                        onChange={(e, description) =>
                            this.setState({ description })
                        }
                        value={this.state.description}
                    />
                    <img src={this.state.image} style={{ backgroundColor: this.state.bgColor, width: `${thumbWidth}px` }} />
                    {this.props.explorer.viewer.colorContexts.length > 1 && <div>{strings.labelColorFilter}</div>}
                </Dialog>
                <div>
                    {this.props.snapshots.map((snapshot, i) => {
                        const actions: SnapshotAction[] = this.props.getActions && this.props.getActions(snapshot, i) || [];
                        actions.push({
                            iconButtonProps: {
                                themePalette: this.props.themePalette,
                                title: strings.buttonDeleteSnapshot,
                                onClick: e => this.props.onRemoveSnapshot(i),
                                iconName: "Delete"
                            }
                        });
                        return (
                            <div key={i} className="snapshot">
                                <div
                                    onClick={e => this.props.onSnapshotClick(snapshot)}
                                >
                                    <div className="title">
                                        {snapshot.description}
                                    </div>
                                    <img src={snapshot.image} style={{ backgroundColor: snapshot.bgColor }} />
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
