/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { Group } from '../controls/group';
import { strings } from '../language';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { Explorer_Class, State as ExplorerState } from '../explorer';
import { ColumnMapBaseProps } from '../controls/columnMap';
import { SandDance } from '@msrvida/sanddance-react';
import { Dropdown } from '../controls/dropdown';
import { IconButton } from '../controls/iconButton';
import { Button } from '../controls/button';

export interface TransitionEdits {
    transitionType: SandDance.types.TransitionType;
    transitionReverse?: boolean;
    transitionColumn?: SandDance.types.Column;
    transitionDimension: SandDance.types.Dimension3D;
    transitionDurations: SandDance.VegaMorphCharts.types.TransitionDurations;
}

export interface Props extends ColumnMapBaseProps, TransitionEdits {
    compactUI: boolean;
    themePalette: Partial<FluentUITypes.IPalette>;
    explorer: Explorer_Class;
    changeSetup: (newState: Partial<ExplorerState>, affectsStagger: boolean) => void;
}

export interface State {
    scrub: number;
    staggerPercent: number;
    totalTransition: number;
    viewTransition: number;
    pauseDisabled: boolean;
}

const positions: [SandDance.types.Dimension3D, string][] = [
    ['x', strings.labelAliasX],
    ['y', strings.labelAliasY],
    ['z', strings.labelAliasZ],
];

const autoScrubInterval = 50;   //tune to get the smoothest animation while able to do an update pass through React

function _TransitionEditor(_props: Props) {
    class __TransitionEditor extends base.react.Component<Props, State>{
        private autoScrubber: AutoScrubber;

        constructor(props: Props) {
            super(props);
            this.state = {
                scrub: 100,
                pauseDisabled: true,
                ...this.initialCalc(props.transitionDurations),
            };
            this.autoScrubber = new AutoScrubber(
                autoScrubInterval,
                (direction, interval) => {
                    const totalMs = this.state.totalTransition * 1000;
                    const currentMs = (this.state.scrub / 100) * totalMs;
                    const scrubMs = currentMs + direction * interval;
                    let scrub = scrubMs / totalMs * 100;
                    if (direction < 0 && scrub <= 0) {
                        scrub = 0;
                        this.autoScrubber.stop();
                    }
                    if (direction > 0 && scrub >= 100) {
                        scrub = 100;
                        this.autoScrubber.stop();
                    }
                    this.setScrubState(scrub);
                },
            );
        }

        initialCalc(transitionDurations: SandDance.VegaMorphCharts.types.TransitionDurations) {
            const totalTransition = (transitionDurations.position + transitionDurations.stagger) / 1000;
            const staggerPercent = transitionDurations.stagger === 0 ? 1 : (transitionDurations.stagger / (totalTransition * 1000)) * 100;
            const viewTransition = transitionDurations.view / 1000;
            return { totalTransition, staggerPercent, viewTransition };
        }

        setScrubState(scrub: number) {
            const { morphChartsRenderResult, morphchartsref } = this.props.explorer.viewer.presenter;
            morphchartsref.core.renderer.transitionTime = scrub / 100;
            morphChartsRenderResult.setTransitionTimeAxesVisibility();
            scrub = Math.round(scrub);
            this.setState({ scrub, pauseDisabled: this.autoScrubber.isStopped() });
        }

        setDurations() {
            setTimeout(() => {  //allow full state to update
                const { props, state } = this;
                const { totalTransition, staggerPercent, viewTransition } = state;
                const stagger = totalTransition * staggerPercent / 100;
                const { transitionDurations } = props;
                transitionDurations.position = (totalTransition - stagger) * 1000;
                transitionDurations.stagger = stagger * 1000;
                transitionDurations.view = viewTransition * 1000;
                syncTansitionDurations(props.explorer.viewer, transitionDurations);
                props.changeSetup(null, false);
            });
        }

        render() {
            const { props, state } = this;
            const { explorer, transitionDurations, changeSetup } = props;
            const sliderRef = base.react.createRef<FluentUITypes.ISlider>();
            explorer.dialogFocusHandler.focus = () => sliderRef.current?.focus();
            return (
                <div>
                    <Group label={strings.labelTransition}>
                        <base.fluentUI.Slider
                            componentRef={sliderRef}
                            label={strings.labelTransitionScrubber}
                            min={0}
                            max={100}
                            valueFormat={strings.percentValueFormat}
                            value={state.scrub}
                            onChange={scrub => {
                                this.autoScrubber.stop();
                                this.setScrubState(scrub);
                            }}
                        />
                        <IconButton
                            themePalette={props.themePalette}
                            title={strings.buttonTransitionReverse}
                            iconName='PlayReverseResume'
                            onClick={() => {
                                this.autoScrubber.toggleScrubbing(-1);
                                if (state.scrub === 0) {
                                    this.setState({ scrub: 100 });
                                }
                            }}
                        />
                        <IconButton
                            themePalette={props.themePalette}
                            title={strings.buttonTransitionPause}
                            iconName='Pause'
                            onClick={() => {
                                this.autoScrubber.togglePause();
                            }}
                            disabled={state.pauseDisabled}
                        />
                        <IconButton
                            themePalette={props.themePalette}
                            title={strings.buttonTransitionPlay}
                            iconName='PlayResume'
                            onClick={() => {
                                this.autoScrubber.toggleScrubbing(1);
                                if (state.scrub === 100) {
                                    this.setState({ scrub: 0 });
                                }
                            }}
                        />
                    </Group>
                    <Group label={strings.labelTransitionOptions}>
                        <base.fluentUI.Toggle
                            label={strings.labelHoldCamera}
                            checked={explorer.state.holdCamera}
                            onChange={(e, holdCamera) => {
                                changeSetup({ holdCamera }, false);
                            }}
                        />
                        <base.fluentUI.ChoiceGroup
                            label={strings.labelTransitionStaggerBy}
                            selectedKey={props.transitionType}
                            options={[
                                {
                                    key: 'ordinal',
                                    text: strings.labelTransitionStaggerByOrdinal,
                                },
                                {
                                    key: 'column',
                                    text: strings.labelTransitionStaggerByColumn,
                                },
                                {
                                    key: 'position',
                                    text: strings.labelTransitionStaggerByPosition,
                                },
                            ]}
                            onChange={(e, o) => {
                                const transitionType = o.key as SandDance.types.TransitionType;
                                changeSetup({ transitionType }, true);
                            }}
                        />
                    </Group>
                    <Group label={strings.labelTransitionStaggerOptions}>
                        {(() => {
                            switch (props.transitionType) {
                                case 'column': {
                                    return (
                                        <Dropdown
                                            collapseLabel={props.compactUI}
                                            label={strings.labelTransitionStaggerByColumn}
                                            options={getColumnOptions(props, props.transitionColumn.name)}
                                            onChange={(e, o) => {
                                                changeSetup({ transitionColumn: o.data }, true);
                                            }}
                                        />
                                    );
                                }
                                case 'position': {
                                    return (
                                        <Dropdown
                                            collapseLabel={props.compactUI}
                                            label={strings.labelTransitionStaggerByPosition}
                                            options={positions.map(([key, text]) => {
                                                return { key, text, selected: props.transitionDimension === key };
                                            })}
                                            onChange={(e, o) => {
                                                changeSetup({ transitionDimension: o.key as SandDance.types.Dimension2D }, true);
                                            }}
                                        />
                                    );
                                }
                            }
                        })()}
                        <base.fluentUI.Toggle
                            label={strings.labelTransitionStaggerReverse}
                            checked={props.transitionReverse}
                            onChange={(e, transitionReverse) => changeSetup({ transitionReverse }, true)}
                        />
                    </Group>
                    <Group label={strings.labelTransitionDurations}>
                        <base.fluentUI.Slider
                            label={strings.labelTransitionDuration}
                            onChange={totalTransition => {
                                this.setState({ totalTransition });
                                this.setDurations();
                            }}
                            min={0}
                            max={5}
                            step={0.1}
                            value={state.totalTransition}
                        />
                        <base.fluentUI.Slider
                            label={strings.labelTransitionStagger}
                            onChange={staggerPercent => {
                                this.setState({ staggerPercent });
                                this.setDurations();
                            }}
                            min={0}
                            max={100}
                            valueFormat={strings.percentValueFormat}
                            value={state.staggerPercent}
                        />
                        <base.fluentUI.Slider
                            label={strings.labelTransitionCamera}
                            onChange={viewTransition => {
                                this.setState({ viewTransition });
                                this.setDurations();
                            }}
                            min={0}
                            max={5}
                            step={0.1}
                            value={state.viewTransition}
                        />
                        <Button
                            themePalette={props.themePalette}
                            onClick={() => {
                                const defaults = SandDance.VegaMorphCharts.defaults.defaultPresenterConfig.transitionDurations;
                                const { position, stagger, view } = defaults;
                                transitionDurations.position = position;
                                transitionDurations.stagger = stagger;
                                transitionDurations.view = view;
                                this.setState({ ...this.initialCalc(transitionDurations) });
                                this.setDurations();
                            }}
                            text={strings.buttonResetToDefault}
                        />
                    </Group>
                </div>
            );
        }
    }
    return new __TransitionEditor(_props);
}

export const TransitionEditor: typeof TransitionEditor_Class = _TransitionEditor as any;

export declare class TransitionEditor_Class extends base.react.Component<Props, State> {
}

function groupOptions(sectionName: string, columns: SandDance.types.Column[], selectedKey: string) {
    const options = columns.map(column => {
        const option: FluentUITypes.IDropdownOption = {
            key: `column:${column.name}`,
            text: column.name,
            data: column,
            selected: column.name === selectedKey,
        };
        return option;
    });
    if (options.length) {
        const option: FluentUITypes.IDropdownOption = {
            key: sectionName,
            text: sectionName,
            itemType: base.fluentUI.DropdownMenuItemType.Header,
        };
        options.unshift(option);
    }
    return options;
}

function getColumnOptions(props: ColumnMapBaseProps, selectedKey: string) {
    const quantitativeGroup = groupOptions(strings.selectNumeric, props.quantitativeColumns, selectedKey);
    const categoricGroup = groupOptions(strings.selectNonNumeric, props.categoricalColumns, selectedKey);
    return quantitativeGroup.concat(categoricGroup);
}

export function getTransition(state: TransitionEdits): SandDance.types.Transition {
    const reverse = state.transitionReverse;
    switch (state.transitionType) {
        case 'ordinal': {
            return {
                type: 'ordinal',
                reverse,
            };
        }
        case 'column': {
            return {
                type: 'column',
                column: state.transitionColumn,
                reverse,
            };
        }
        case 'position': {
            return {
                type: 'position',
                dimension: state.transitionDimension,
                reverse,
            };
        }
    }
}

export function syncTansitionDurations(viewer: SandDance.Viewer, transitionDurations: SandDance.VegaMorphCharts.types.TransitionDurations) {
    const config = viewer?.presenter?.morphchartsref?.core.config;
    if (config) {
        const { position, stagger } = transitionDurations;
        config.transitionDuration = position;
        config.transitionStaggering = stagger;
    }
}

type AutoScrubberDirection = -1 | 1;

class AutoScrubber {
    private autoScrubTimer: NodeJS.Timer;
    public direction: AutoScrubberDirection;

    constructor(
        public interval: number,
        public onInterval: (
            direction: AutoScrubberDirection,
            interval: number,
        ) => void,
    ) { }

    getSignedInterval() {
        return this.interval * this.direction;
    }

    toggleScrubbing(direction: AutoScrubberDirection) {
        if (this.isScrubbing() && direction === this.direction) {
            this.pause();
        } else {
            this.start(direction);
        }
    }

    isPaused() {
        return !this.isScrubbing() && this.direction !== undefined;
    }

    isStopped() {
        return !this.isScrubbing() && this.direction === undefined;
    }

    isScrubbing() {
        return this.autoScrubTimer !== undefined;
    }

    togglePause() {
        if (this.isScrubbing()) {
            this.pause();
        } else if (this.direction) {
            this.start(this.direction);
        }
    }

    start(direction: AutoScrubberDirection) {
        this.direction = direction;
        if (!this.isScrubbing()) {
            this.autoScrubTimer = setInterval(
                () => this.onInterval(
                    this.direction,
                    this.interval,
                ),
                this.interval,
            );
        }
    }

    pause() {
        clearInterval(this.autoScrubTimer);
        this.autoScrubTimer = undefined;
    }

    stop() {
        this.pause();
        this.direction = undefined;
    }
}
