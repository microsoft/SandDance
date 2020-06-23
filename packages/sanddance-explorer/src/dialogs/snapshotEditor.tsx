// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { Dialog } from '../controls/dialog';
import { Explorer_Class } from '../explorer';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { getCanvas } from '../canvas';
import { SandDance, util } from '@msrvida/sanddance-react';
import { strings } from '../language';

import Snapshot = SandDance.types.Snapshot;

export interface SnapshotEditorProps {
    modifySnapShot?: (snapshot: Snapshot) => void;
    getTitle?: (insight: SandDance.specs.Insight) => string;
    getDescription?: (insight: SandDance.specs.Insight) => string;
}

export interface Props extends SnapshotEditorProps {
    explorer: Explorer_Class;
    theme: string;
    onWriteSnapshot: (snapshot: Snapshot, editIndex: number) => void;
    themePalette: Partial<FluentUITypes.IPalette>;
}

export interface Confirmation {
    buttonText: string;
    handler: () => void;
}

export interface State extends Snapshot {
    showEditFormDialog: boolean;
    editIndex: number;
}

function _SnapshotEditor(props: Props) {
    class __SnapshotEditor extends base.react.Component<Props, State>{
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

        private resize(src: string, thumbWidth: number) {
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

        public editSnapshot(snapshot?: Snapshot, editIndex = -1) {
            if (snapshot) {
                this.setState({ showEditFormDialog: true, ...snapshot, editIndex });
            } else {
                const signalValues = this.props.explorer.viewer.getSignalValues();
                this.props.explorer.viewer.deselect().then(() => {
                    const canvas = getCanvas(this.props.explorer.viewer);
                    const bgColor = canvas && window.getComputedStyle(canvas).backgroundColor;
                    const insight = SandDance.VegaDeckGl.util.clone(this.props.explorer.viewer.getInsight());
                    delete insight.size;
                    insight.signalValues = signalValues;
                    const title = this.props.getTitle && this.props.getTitle(insight) || '';
                    const description = this.props.getDescription && this.props.getDescription(insight) || '';
                    this.setState({ showEditFormDialog: true, bgColor, title, description, insight, image: null, editIndex });

                    //allow deselection to render
                    setTimeout(() => {
                        this.props.explorer.viewer.presenter.canvasToDataURL().then(dataUrl => {
                            this.resize(dataUrl, this.props.explorer.snapshotThumbWidth);
                        });
                    }, 500);
                });
            }
        }

        render() {
            return (
                <Dialog
                    modalProps={{ className: util.classList('sanddance-snapshot-dialog', this.props.theme) }}
                    minWidth={`${this.props.explorer.snapshotThumbWidth + 64}px`}
                    hidden={!this.state.showEditFormDialog}
                    onDismiss={() => this.setState({ showEditFormDialog: false })}
                    title={this.state.editIndex >= 0 ? strings.buttonEditSnapshot : strings.buttonCreateSnapshot}
                    buttons={(
                        <base.fluentUI.PrimaryButton
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
                            iconProps={{ iconName: 'Camera' }}
                            text={this.state.editIndex >= 0 ? strings.buttonUpdateSnapshot : strings.buttonCreateSnapshot}
                        />
                    )}
                >
                    <base.fluentUI.TextField
                        label={strings.labelSnapshotTitle}
                        onChange={(e, title) => this.setState({ title })}
                        value={this.state.title}
                    />
                    <base.fluentUI.TextField
                        label={strings.labelSnapshotDescription}
                        onChange={(e, description) => this.setState({ description })}
                        value={this.state.description}
                        multiline={true}
                    />
                    <div className='thumbnail'>
                        {!this.state.image && <base.fluentUI.Spinner />}
                        {this.state.image && <img src={this.state.image} style={{ backgroundColor: this.state.bgColor }} />}
                    </div>
                    {this.props.explorer.viewer && this.props.explorer.viewer.colorContexts && this.props.explorer.viewer.colorContexts.length > 1 && <div>{strings.labelColorFilter}</div>}
                </Dialog>
            );
        }
    }
    return new __SnapshotEditor(props);
}

export const SnapshotEditor: typeof SnapshotEditor_Class = _SnapshotEditor as any;

export declare class SnapshotEditor_Class extends base.react.Component<Props, State> {
    public editSnapshot(snapshot?: Snapshot, editIndex?: number)
}
