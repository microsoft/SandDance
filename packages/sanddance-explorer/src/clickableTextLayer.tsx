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

export interface PositionedColumnMapProps extends ColumnMapProps, MousePosition { }

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
