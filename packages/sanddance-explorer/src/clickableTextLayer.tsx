// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { ColumnMap, Props as ColumnMapProps } from './controls/columnMap';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { SandDance } from '@msrvida/sanddance-react';
import { TextLayerDatum } from '@deck.gl/layers/text-layer/text-layer';

export interface TextWithSpecRole extends TextLayerDatum {
    specRole: SandDance.types.SpecRoleCapabilities;
}

export interface Position {
    top: number;
    left: number;
}

export function injectClickableTextLayer(
    stage: SandDance.VegaDeckGl.types.Stage,
    stageToLayers: SandDance.VegaDeckGl.types.StageToLayers,
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
    const layers = stageToLayers(stage);
    return layers;
}

function hasClientXY(e: MouseEvent | PointerEvent | Touch) {
    if (e && e.clientX !== undefined && e.clientX !== undefined) {
        return { top: e.clientY, left: e.clientX };
    }
}

export function getPosition(e: MouseEvent | PointerEvent | TouchEvent): Position {
    let xy = hasClientXY(e as MouseEvent | PointerEvent);
    if (xy) {
        return xy;
    }
    const te = e as TouchEvent;
    if (te) {
        for (let i = 0; i < te.touches.length; i++) {
            let xy = hasClientXY(te.touches[i]);
            if (xy) {
                return xy;
            }
        }
    }
}

export interface PositionedColumnMapProps extends ColumnMapProps, Position { }

export class ActiveDropdown extends React.Component<PositionedColumnMapProps, {}> {
    private dropdownRef?: React.RefObject<FabricTypes.IDropdown>;

    constructor(props: PositionedColumnMapProps) {
        super(props);
        this.dropdownRef = React.createRef<FabricTypes.IDropdown>();
    }

    componentDidMount() {
        this.dropdownRef.current!.focus(true);
    }

    render() {
        return (
            <div
                className="sanddance-columnMap-absolute"
                style={{ position: 'absolute', left: this.props.left + 'px', top: this.props.top + 'px' }}
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
