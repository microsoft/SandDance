// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { Dialog } from '../controls/dialog';
import { Explorer } from '../explorer';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { getCanvas } from '../canvas';
import { SandDance, util } from '@msrvida/sanddance-react';
import { Snapshot } from '../interfaces';
import { strings } from '../language';

export interface SnapshotEditorProps {
    modifySnapShot?: (snapshot: Snapshot) => void;
    getTitle?: (insight: SandDance.types.Insight) => string;
    getDescription?: (insight: SandDance.types.Insight) => string;
}

export interface Props extends SnapshotEditorProps {
    explorer: Explorer;
    onWriteSnapshot: (snapshot: Snapshot, editIndex: number) => void;
    themePalette: Partial<FabricTypes.IPalette>;
}

export interface Confirmation {
    buttonText: string;
    handler: () => void;
}

export interface State extends Snapshot {
    showEditFormDialog: boolean;
    editIndex: number;
}

export class SnapshotEditor extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            showEditFormDialog: false,
            title: '',
            description: '',
            image: null,
            bgColor: null,
            insight: null,
            editIndex: -1
        };
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

    editSnapshot(snapshot?: Snapshot, editIndex = -1) {
        if (snapshot) {
            this.setState({ showEditFormDialog: true, ...snapshot, editIndex });
        } else {
            this.props.explorer.viewer.deselect().then(() => {
                const canvas = getCanvas(this.props.explorer.viewer);
                const bgColor = canvas && window.getComputedStyle(canvas).backgroundColor;
                const insight = SandDance.VegaDeckGl.util.clone(this.props.explorer.viewer.getInsight());
                delete insight.size;
                const title = this.props.getTitle && this.props.getTitle(insight) || '';
                const description = this.props.getDescription && this.props.getDescription(insight) || '';
                this.setState({ showEditFormDialog: true, bgColor, title, description, insight, image: null, editIndex });

                //allow deselection to render
                setTimeout(() => {
                    this.resize(canvas && canvas.toDataURL('image/png'), this.props.explorer.snapshotThumbWidth);
                }, 500);
            });
        }
    }

    render() {
        return (
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
                        onClick={e => {
                            const snapshot: Snapshot = {
                                title: this.state.title,
                                description: this.state.description,
                                insight: this.state.insight,
                                image: this.state.image,
                                bgColor: this.state.bgColor
                            };
                            this.props.modifySnapShot && this.props.modifySnapShot(snapshot);
                            this.props.onWriteSnapshot(snapshot, this.state.editIndex);
                            this.setState({ showEditFormDialog: false, title: '', description: '', image: null });
                        }}
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
                {this.props.explorer.viewer && this.props.explorer.viewer.colorContexts && this.props.explorer.viewer.colorContexts.length > 1 && <div>{strings.labelColorFilter}</div>}
            </Dialog>
        );
    }
}
