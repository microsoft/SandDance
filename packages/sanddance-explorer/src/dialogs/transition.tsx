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

export interface Props extends ColumnMapBaseProps {
    compactUI: boolean;
    themePalette: Partial<FluentUITypes.IPalette>;
    explorer: Explorer_Class;
    transitionCluster: boolean
    transitionColumn: SandDance.types.Column;
    transitionDimension: SandDance.types.Dimension2D;
}

export interface State {
    transitionType: SandDance.types.TransitionType;
    positionDimension: SandDance.types.Dimension3D;
}

function _Transition(_props: Props) {
    class __Transition extends base.react.Component<Props, State>{
        constructor(props: Props) {
            super(props);
            this.state = {
                transitionType: 'ordinal',
                positionDimension: 'y',
            };
        }

        render() {
            const { props, state } = this;
            const dropdownRef = base.react.createRef<FluentUITypes.IDropdown>();
            props.explorer.dialogFocusHandler.focus = () => dropdownRef.current?.focus();
            return (
                <div>
                    <Group label={strings.labelTransition}>
                        <base.fluentUI.Slider
                            label='Transition scrubber TODO'
                            min={0}
                            max={1}
                            step={0.01}
                            defaultValue={1}
                            onChange={value => {
                                props.explorer.viewer.presenter.morphchartsref.core.renderer.transitionTime = value;
                                //TODO - swap axes at 0
                            }}
                        />
                        <base.fluentUI.ChoiceGroup
                            label={'Transition type TODO'}
                            selectedKey={state.transitionType}
                            options={[
                                {
                                    key: 'ordinal',
                                    text: 'Ordinal TODO',
                                },
                                {
                                    key: 'column',
                                    text: 'Column TODO',
                                },
                                {
                                    key: 'position',
                                    text: 'Layout TODO',
                                },
                            ]}
                            onChange={(e, o) => {
                                const transitionType = o.key as SandDance.types.TransitionType;
                                this.setState({ transitionType });
                                let transition: SandDance.types.Transition;
                                switch (transitionType) {
                                    case 'ordinal': {
                                        //do nothing
                                        break;
                                    }
                                    case 'column': {
                                        transition = {
                                            type: transitionType,
                                            column: props.transitionColumn,
                                        };
                                        break;
                                    }
                                    case 'position': {
                                        transition = {
                                            type: transitionType,
                                            dimension: props.transitionDimension,
                                        };
                                        break;
                                    }
                                }
                                props.explorer.setState({ transition, calculating: () => props.explorer.setStagger() });
                            }}
                        />
                        {(() => {
                            switch (state.transitionType) {
                                case 'column': {
                                    return (
                                        <Dropdown
                                            collapseLabel={props.compactUI}
                                            label={'column TODO'}
                                            options={getColumnOptions(props, props.transitionColumn.name)}
                                            onChange={(e, o) => {
                                                props.explorer.setState({ transitionColumn: o.data, calculating: () => props.explorer.setStagger() });
                                            }}
                                        />
                                    );
                                }
                                case 'position': {
                                    return (
                                        <Dropdown
                                            collapseLabel={props.compactUI}
                                            label={'position TODO'}
                                            options={[
                                                {
                                                    key: 'x',
                                                    text: 'X TODO',
                                                    selected: props.transitionDimension === 'x',
                                                },
                                                {
                                                    key: 'y',
                                                    text: 'Y TODO',
                                                    selected: props.transitionDimension === 'y',
                                                },
                                            ]}
                                            onChange={(e, o) => {
                                                props.explorer.setState({ transitionDimension: o.key as SandDance.types.Dimension2D, calculating: () => props.explorer.setStagger() });
                                            }}
                                        />
                                    );
                                }
                            }
                        })()}
                        {(state.transitionType !== 'ordinal') && (
                            <base.fluentUI.Toggle
                                label='Cluster TODO'
                                checked={props.transitionCluster}
                                onChange={(e, transitionCluster) => props.explorer.setState({ transitionCluster, calculating: () => props.explorer.setStagger() })}
                            />
                        )}
                    </Group>
                    <Group label={strings.labelTransitionDurations}>
                        <base.fluentUI.Slider
                            label={strings.labelTransitionPosition}
                            onChange={value => {
                                props.explorer.state.transitionDurations.position = value;
                            }}
                            min={0}
                            max={10000}
                            defaultValue={props.explorer.state.transitionDurations.position}
                        />
                        <base.fluentUI.Slider
                            label={strings.labelTransitionStagger}
                            onChange={value => {
                                props.explorer.state.transitionDurations.stagger = value;
                            }}
                            min={0}
                            max={10000}
                            defaultValue={props.explorer.state.transitionDurations.stagger}
                        />
                        <base.fluentUI.Slider
                            label={strings.labelTransitionCamera}
                            onChange={value => {
                                props.explorer.state.transitionDurations.view = value;
                            }}
                            min={0}
                            max={10000}
                            defaultValue={props.explorer.state.transitionDurations.view}
                        />
                    </Group>
                </div>
            );
        }

        // changeTransitionType(transitionType: SandDance.types.TransitionType) {
        //     this.setState({ transitionType });
        // }
    }
    return new __Transition(_props);
}

export const Transition: typeof Transition_Class = _Transition as any;

export declare class Transition_Class extends base.react.Component<Props, State> {
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
