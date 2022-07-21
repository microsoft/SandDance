/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { SandDance } from '@msrvida/sanddance-react';
import { Explorer_Class } from '../explorer';
import { strings } from '../language';
import { IconButton } from './iconButton';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { Dialog } from './dialog';
import { Button } from './button';

export interface Props {
    explorer: Explorer_Class;
    themePalette: Partial<FluentUITypes.IPalette>;
    onHomeClick: () => void;
}

export interface State {
    viewer: SandDance.Viewer;
    showOptions: boolean;
    antialias: boolean;
    isSsaoEnabled: boolean;
    isShadowEnabled: boolean;
    isDofEnabled: boolean;
    dofFocusRange: number;
    isBloomEnabled: boolean;
    bloomIntensity: number;
    isFxaaEnabled: boolean;
}

interface SyncRenderer {
    advanced: boolean;
}

function _Renderer(_props: Props) {

    class __Renderer extends base.react.Component<Props, State> {
        private needsSync: SyncRenderer;

        constructor(props: Props) {
            super(props);
            this.state = this.getInitialState(props);
            if (!this.state.viewer?.presenter?.morphchartsref) {
                const t = setInterval(() => {
                    const newState = this.getInitialState(props);
                    if (newState.viewer?.presenter?.morphchartsref) {
                        clearInterval(t);
                        this.setState(newState);
                    }
                }, 10);
            }
        }

        getInitialState(props: Props): State {
            const { viewer } = props.explorer;
            return {
                showOptions: false,
                viewer,
                antialias: true,
                isSsaoEnabled: true,
                isShadowEnabled: true,
                isDofEnabled: false,
                dofFocusRange: 0.25,
                isBloomEnabled: false,
                bloomIntensity: 2,
                isFxaaEnabled: false,
            };
        }

        change(advanced: boolean) {
            this.sync(advanced);
            this.forceUpdate();
        }

        sync(advanced: boolean) {
            const { state } = this;
            const { antialias, bloomIntensity, dofFocusRange, isBloomEnabled, isDofEnabled, isFxaaEnabled, isShadowEnabled, isSsaoEnabled } = state;
            state.viewer.presenter.morphchartsref.setMorphChartsRendererOptions({
                advanced,
                advancedOptions: {
                    bloomIntensity,
                    isBloomEnabled,
                    isDofEnabled,
                    dofFocusRange,
                    isFxaaEnabled,
                    isShadowEnabled,
                    isSsaoEnabled,
                },
                basicOptions: {
                    antialias,
                },
            });
        }

        syncNext(advanced: boolean, newState: Partial<State>) {
            this.needsSync = {
                advanced,
            };
            this.setState(newState as State);
        }

        render() {
            const { props, state } = this;

            const iconButtonStyles: FluentUITypes.IButtonStyles = {
                menuIcon: {
                    display: 'none',
                },
            };

            if (!state.viewer?.presenter?.morphchartsref) {
                return (
                    <IconButton
                        styles={iconButtonStyles}
                        className='sanddance-advanced-renderer'
                        disabled={true}
                        iconName={'HourGlass'}
                        onClick={undefined}
                        themePalette={props.themePalette}
                        title={strings.labelRenderer}
                    />
                );
            } else {
                const { morphchartsref } = state.viewer.presenter;

                const choiceButtonStyle: FluentUITypes.IStyle = {
                    border: 'none',
                };

                if (this.needsSync) {
                    this.sync(this.needsSync.advanced);
                    this.needsSync = null;
                }

                const { advanced } = morphchartsref.lastMorphChartsRendererOptions;

                return (
                    <div>
                        <IconButton
                            iconName='PicturePosition'
                            title={strings.buttonCameraHome}
                            onClick={props.onHomeClick}
                            styles={iconButtonStyles}
                            themePalette={props.themePalette}
                        />
                        <IconButton
                            styles={iconButtonStyles}
                            className='sanddance-advanced-renderer'
                            iconName={advanced ? 'DiamondSolid' : 'Diamond'}
                            disabled={!morphchartsref.supportedRenders.advanced}
                            onClick={undefined}
                            themePalette={props.themePalette}
                            title={morphchartsref.supportedRenders.advanced ? strings.labelRenderer : strings.labelRendererAdvancedDisabled}
                            menuProps={{
                                items: [
                                    {
                                        key: 'basic',
                                        text: strings.labelRendererBasic,
                                        iconProps: {
                                            iconName: advanced ? null : 'RadioBullet',
                                        },
                                        onClick: () => advanced && this.change(false),
                                        //disabled: !advanced,
                                    },
                                    {
                                        key: 'advanced',
                                        text: strings.labelRendererAdvanced,
                                        iconProps: {
                                            iconName: advanced ? 'RadioBullet' : null,
                                        },
                                        onClick: () => !advanced && this.change(true),
                                        //disabled: advanced,
                                    },
                                    {
                                        key: 'options',
                                        text: strings.labelRendererOptions,
                                        onClick: (e) => this.setState({ showOptions: true }),
                                    },
                                ],
                            }}
                        />
                        <Dialog
                            hidden={!state.showOptions}
                            dialogContentProps={{
                                className: 'sanddance-renderer-dialog',
                                title: strings.labelRendererOptionsDialogTitle,
                            }}
                            onDismiss={() => this.setState({ showOptions: false })}
                        >
                            <div>
                                <Button
                                    iconName={advanced ? 'RadioBtnOff' : 'RadioBtnOn'}
                                    onClick={() => this.change(false)}
                                    text={strings.labelRendererBasic}
                                    themePalette={props.themePalette}
                                    rootStyle={choiceButtonStyle}
                                />
                                <ul>
                                    <li>
                                        <base.fluentUI.Toggle
                                            checked={state.antialias}
                                            label={strings.labelRendererOptionsAntialias}
                                            onChange={(e, antialias) => this.syncNext(false, { antialias })}
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <Button
                                    iconName={advanced ? 'RadioBtnOn' : 'RadioBtnOff'}
                                    onClick={() => this.change(true)}
                                    text={strings.labelRendererAdvanced}
                                    themePalette={props.themePalette}
                                    rootStyle={choiceButtonStyle}
                                />
                                <ul>
                                    <li>
                                        <base.fluentUI.Toggle
                                            checked={state.isShadowEnabled}
                                            label={strings.labelRendererOptionsShadow}
                                            onChange={(e, isShadowEnabled) => this.syncNext(true, { isShadowEnabled })}
                                        />
                                    </li>
                                    <li>
                                        <base.fluentUI.Toggle
                                            checked={state.isSsaoEnabled}
                                            label={strings.labelRendererOptionsSsao}
                                            onChange={(e, isSsaoEnabled) => this.syncNext(true, { isSsaoEnabled })}
                                        />
                                    </li>
                                    <li>
                                        <base.fluentUI.Toggle
                                            checked={state.isBloomEnabled}
                                            label={strings.labelRendererOptionsBloom}
                                            onChange={(e, isBloomEnabled) => this.syncNext(true, { isBloomEnabled })}
                                        />
                                        <ul>
                                            <li>
                                                <base.fluentUI.Slider
                                                    value={state.bloomIntensity}
                                                    min={0.1}
                                                    max={5}
                                                    step={0.01}
                                                    label={strings.labelRendererOptionsBloomIntensity}
                                                    onChange={bloomIntensity => this.syncNext(true, { bloomIntensity, isBloomEnabled: true })}
                                                />
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <base.fluentUI.Toggle
                                            checked={state.isDofEnabled}
                                            label={strings.labelRendererOptionsDof}
                                            onChange={(e, isDofEnabled) => this.syncNext(true, { isDofEnabled })}
                                        />
                                        <ul>
                                            <li>
                                                <base.fluentUI.Slider
                                                    value={state.dofFocusRange}
                                                    min={0}
                                                    max={2}
                                                    step={0.01}
                                                    label={strings.labelRendererOptionsDofRange}
                                                    onChange={dofFocusRange => this.syncNext(true, { dofFocusRange, isDofEnabled: true })}
                                                />
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <base.fluentUI.Toggle
                                            checked={state.isFxaaEnabled}
                                            label={strings.labelRendererOptionsFxaa}
                                            onChange={(e, isFxaaEnabled) => this.syncNext(true, { isFxaaEnabled })}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </Dialog>
                    </div>
                );
            }
        }
    }

    return new __Renderer(_props);
}

export const Renderer: typeof Renderer_Class = _Renderer as any;

export declare class Renderer_Class extends base.react.Component<Props, State> {
}
