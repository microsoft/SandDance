// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { ColumnMap, Props as ColumnMapProps } from './controls/columnMap';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { SandDance } from '@msrvida/sanddance-react';
import { TextLayerDatum } from '@deck.gl/layers/text-layer/text-layer';
import { MousePosition } from './mouseEvent';

export interface TextWithSpecRole extends TextLayerDatum {
    specRole: SandDance.types.SpecRoleCapabilities;
}

export function onBeforeCreateLayers(
    stage: SandDance.VegaDeckGl.types.Stage,
    specCapabilities: SandDance.types.SpecCapabilities
) {
    for (let axisName in stage.axes) {
        specCapabilities.roles.forEach(specRole => {
            if (specRole.role === axisName) {
                let axes = stage.axes[axisName] as SandDance.VegaDeckGl.types.Axis[];
                axes.forEach(axis => {
                    if (axis.title) {
                        const textItem = axis.title as TextWithSpecRole;
                        textItem.specRole = specRole;
                    }
                });
            }
        });
    }
}

function px(n: number) {
    return n + 'px';
}

export interface PositionedColumnMapProps extends ColumnMapProps, MousePosition {
    container: HTMLElement;
}

export interface PositionedColumnMapState extends MousePosition { }

export class PositionedColumnMap extends React.Component<PositionedColumnMapProps, PositionedColumnMapState> {
    private dropdownRef?: React.RefObject<FabricTypes.IDropdown>;
    private focused: boolean;
    private div: HTMLDivElement;

    constructor(props: PositionedColumnMapProps) {
        super(props);
        const { left, top } = props;
        this.state = { left, top };
        this.dropdownRef = React.createRef<FabricTypes.IDropdown>();
    }

    focus() {
        if (!this.focused) {
            this.focused = true;
            this.dropdownRef.current!.focus(true);
        }
    }

    componentDidMount() {
        const size = SandDance.VegaDeckGl.util.outerSize(this.div);
        const over: MousePosition = {
            left: Math.max(0, this.state.left + size.width - this.props.container.offsetWidth),
            top: Math.max(0, this.state.top + size.height - this.props.container.offsetHeight)
        };
        if (over.left || over.top) {
            let { left, top } = this.state;
            left -= over.left;
            top -= over.top;
            this.setState({ left, top });
        } else {
            this.focus();
        }
    }

    componentDidUpdate() {
        this.focus();
    }

    render() {
        return (
            <div
                ref={div => { if (div) this.div = div; }}
                className="sanddance-columnMap-absolute"
                style={{ position: 'absolute', left: px(this.state.left), top: px(this.state.top) }}
            >
                <ColumnMap
                    {...this.props}
                    componentRef={this.dropdownRef}
                    hideSignals={true}
                />
            </div>
        );
    }
}
