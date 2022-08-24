/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { Group } from '../controls/group';
import { strings } from '../language';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { Explorer_Class } from '../explorer';
import { ColumnMapBaseProps } from '../controls/columnMap';
import { SandDance } from '@msrvida/sanddance-react';
import { Dropdown } from '../controls/dropdown';

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
}

export interface State {
}

const positions: [SandDance.types.Dimension3D, string][] = [
    ['x', strings.labelAliasX],
    ['y', strings.labelAliasY],
    ['z', strings.labelAliasZ],
];

function _TransitionEditor(_props: Props) {
    class __TransitionEditor extends base.react.Component<Props, State>{
        constructor(props: Props) {
            super(props);
            this.state = {
            };
        }

        render() {
            const { props } = this;
            const { explorer } = props;
            const dropdownRef = base.react.createRef<FluentUITypes.IDropdown>();
            explorer.dialogFocusHandler.focus = () => dropdownRef.current?.focus();
            return (
                <div>
                    <Group label={strings.labelTransition}>
                        <base.fluentUI.Toggle
                            label={strings.labelHoldCamera}
                            checked={explorer.state.holdCamera}
                            onChange={(e, holdCamera) => {
                                explorer.setState({ holdCamera });
                            }}
                        />
                        <base.fluentUI.Slider
                            label={strings.labelTransitionScrubber}
                            min={0}
                            max={1}
                            step={0.01}
                            defaultValue={1}
                            onChange={value => {
                                explorer.viewer.presenter.morphchartsref.core.renderer.transitionTime = value;
                                //TODO - swap axes at 0
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
                                this.setState({ transitionType });
                                explorer.setState({ transitionType, calculating: () => explorer.setStagger() });
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
                                                explorer.setState({ transitionColumn: o.data, calculating: () => explorer.setStagger() });
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
                                                explorer.setState({ transitionDimension: o.key as SandDance.types.Dimension2D, calculating: () => explorer.setStagger() });
                                            }}
                                        />
                                    );
                                }
                            }
                        })()}
                        <base.fluentUI.Toggle
                            label={strings.labelTransitionStaggerReverse}
                            checked={props.transitionReverse}
                            onChange={(e, transitionReverse) => explorer.setState({ transitionReverse, calculating: () => explorer.setStagger() })}
                        />
                    </Group>
                    <Group label={strings.labelTransitionDurations}>
                        <base.fluentUI.Slider
                            label={strings.labelTransitionPosition}
                            onChange={value => {
                                props.transitionDurations.position = value;
                                explorer.viewer.presenter.morphchartsref.core.config.transitionDuration = value;
                            }}
                            min={0}
                            max={10000}
                            defaultValue={props.transitionDurations.position}
                        />
                        <base.fluentUI.Slider
                            label={strings.labelTransitionStagger}
                            onChange={value => {
                                props.transitionDurations.stagger = value;
                                explorer.viewer.presenter.morphchartsref.core.config.transitionStaggering = value;
                            }}
                            min={0}
                            max={10000}
                            defaultValue={props.transitionDurations.stagger}
                        />
                        <base.fluentUI.Slider
                            label={strings.labelTransitionCamera}
                            onChange={value => {
                                props.transitionDurations.view = value;
                            }}
                            min={0}
                            max={10000}
                            defaultValue={props.transitionDurations.view}
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