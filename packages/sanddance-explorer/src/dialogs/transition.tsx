/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { Group } from '../controls/group';
import { strings } from '../language';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { Explorer_Class } from '../explorer';
import { ColumnMap, ColumnMapBaseProps } from '../controls/columnMap';
import { SandDance } from '@msrvida/sanddance-react';

export interface Props extends ColumnMapBaseProps {
    compactUI: boolean;
    disabled?: boolean;
    themePalette: Partial<FluentUITypes.IPalette>;
    explorer: Explorer_Class;
    transitionColumn: string;
}

export interface State {
    transitionType: SandDance.types.TransitionType;
    positionDimension: SandDance.types.Dimension3D;
    column: string;
}

function _Transition(_props: Props) {
    class __Transition extends base.react.Component<Props, State>{
        constructor(props: Props) {
            super(props);
            this.state = {
                transitionType: 'ordinal',
                positionDimension: 'y',
                column: props.transitionColumn,
            };
        }

        render() {
            const { props, state } = this;
            const dropdownRef = base.react.createRef<FluentUITypes.IDropdown>();
            props.explorer.dialogFocusHandler.focus = () => dropdownRef.current?.focus();
            return (
                <div>
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
                                key: 'layout',
                                text: 'Layout TODO',
                            },
                        ]}
                        onChange={(e, o) => {
                            //this.setState({ transitionType: o.key as SandDance.types.TransitionType });
                        }}
                    />
                    <Group label={strings.labelTransition}>
                        <ColumnMap
                            {...props}
                            componentRef={dropdownRef}
                            collapseLabel={props.compactUI}
                            selectedColumnName={props.transitionColumn}
                            specRole={props.specCapabilities && props.specCapabilities.roles.filter(r => r.role === 'color')[0]}
                            key={0}
                        />
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
