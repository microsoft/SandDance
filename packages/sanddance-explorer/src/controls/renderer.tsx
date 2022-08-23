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
    advanced: boolean;
    advancedOptions: SandDance.VegaMorphCharts.types.AdvancedRendererOptions;
    basicOptions: SandDance.VegaMorphCharts.types.BasicRendererOptions;
}

export interface State {
    viewer: SandDance.Viewer;
    showOptions: boolean;
}

function _Renderer(_props: Props) {

    class __Renderer extends base.react.Component<Props, State> {

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
            };
        }

        setOptions(newOptions: Partial<SandDance.VegaMorphCharts.types.MorphChartsRendererOptions>) {
            const { explorer } = this.props;
            explorer.setState({
                renderer:
                {
                    ...explorer.state.renderer,
                    ...newOptions,
                },
            });
        }

        setBasicOptions(newOptions: Partial<SandDance.VegaMorphCharts.types.BasicRendererOptions>) {
            this.setOptions({
                advanced: false,
                basicOptions: {
                    ...this.props.basicOptions,
                    ...newOptions,
                },
            });
        }

        setAdvancedOptions(newOptions: Partial<SandDance.VegaMorphCharts.types.AdvancedRendererOptions>) {
            this.setOptions({
                advanced: true,
                advancedOptions: {
                    ...this.props.advancedOptions,
                    ...newOptions,
                },
            });
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

                const { advanced, advancedOptions, basicOptions } = props;

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
                                        onClick: () => advanced && this.setOptions({ advanced: false }),
                                        //disabled: !advanced,
                                    },
                                    {
                                        key: 'advanced',
                                        text: strings.labelRendererAdvanced,
                                        iconProps: {
                                            iconName: advanced ? 'RadioBullet' : null,
                                        },
                                        onClick: () => !advanced && this.setOptions({ advanced: true }),
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
                                    onClick={() => this.setOptions({ advanced: false })}
                                    text={strings.labelRendererBasic}
                                    themePalette={props.themePalette}
                                    rootStyle={choiceButtonStyle}
                                />
                                <ul>
                                    <li>
                                        <base.fluentUI.Toggle
                                            checked={basicOptions.antialias}
                                            label={strings.labelRendererOptionsAntialias}
                                            onChange={(e, antialias) => this.setBasicOptions({ antialias })}
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <Button
                                    iconName={advanced ? 'RadioBtnOn' : 'RadioBtnOff'}
                                    onClick={() => this.setOptions({ advanced: true })}
                                    text={strings.labelRendererAdvanced}
                                    themePalette={props.themePalette}
                                    rootStyle={choiceButtonStyle}
                                />
                                <ul>
                                    <li>
                                        <base.fluentUI.Toggle
                                            checked={advancedOptions.isShadowEnabled}
                                            label={strings.labelRendererOptionsShadow}
                                            onChange={(e, isShadowEnabled) => this.setAdvancedOptions({ isShadowEnabled })}
                                        />
                                    </li>
                                    <li>
                                        <base.fluentUI.Toggle
                                            checked={advancedOptions.isSsaoEnabled}
                                            label={strings.labelRendererOptionsSsao}
                                            onChange={(e, isSsaoEnabled) => this.setAdvancedOptions({ isSsaoEnabled })}
                                        />
                                    </li>
                                    <li>
                                        <base.fluentUI.Toggle
                                            checked={advancedOptions.isBloomEnabled}
                                            label={strings.labelRendererOptionsBloom}
                                            onChange={(e, isBloomEnabled) => this.setAdvancedOptions({ isBloomEnabled })}
                                        />
                                        <ul>
                                            <li>
                                                <base.fluentUI.Slider
                                                    value={advancedOptions.bloomIntensity}
                                                    min={0.1}
                                                    max={5}
                                                    step={0.01}
                                                    label={strings.labelRendererOptionsBloomIntensity}
                                                    onChange={bloomIntensity => this.setAdvancedOptions({ bloomIntensity, isBloomEnabled: true })}
                                                />
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <base.fluentUI.Toggle
                                            checked={advancedOptions.isDofEnabled}
                                            label={strings.labelRendererOptionsDof}
                                            onChange={(e, isDofEnabled) => this.setAdvancedOptions({ isDofEnabled })}
                                        />
                                        <ul>
                                            <li>
                                                <base.fluentUI.Slider
                                                    value={advancedOptions.dofFocusRange}
                                                    min={0}
                                                    max={2}
                                                    step={0.01}
                                                    label={strings.labelRendererOptionsDofRange}
                                                    onChange={dofFocusRange => this.setAdvancedOptions({ dofFocusRange, isDofEnabled: true })}
                                                />
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <base.fluentUI.Toggle
                                            checked={advancedOptions.isFxaaEnabled}
                                            label={strings.labelRendererOptionsFxaa}
                                            onChange={(e, isFxaaEnabled) => this.setAdvancedOptions({ isFxaaEnabled })}
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
