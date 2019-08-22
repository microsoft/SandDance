// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { ColumnMap, Props as ColumnMapProps } from './controls/columnMap';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { SandDance } from '@msrvida/sanddance-react';
import { TextLayerDatum } from '@deck.gl/layers/text-layer/text-layer';

interface TextWithSpecRole extends TextLayerDatum {
    specRole: SandDance.types.SpecRoleCapabilities;
}

export interface Position {
    top: number;
    left: number;
}

export function injectClickableTextLayer(
    stage: SandDance.VegaDeckGl.types.Stage,
    layerFn: SandDance.VegaDeckGl.types.LayerFn,
    specCapabilities: SandDance.types.SpecCapabilities,
    clickFn: (pos: Position, specRole: SandDance.types.SpecRoleCapabilities) => void) {
    const clickableTextData: TextWithSpecRole[] = [];
    const pristineAxes = SandDance.VegaDeckGl.util.clone(stage.axes);
    for (let axisName in stage.axes) {
        specCapabilities.roles.forEach(specRole => {
            if (specRole.role === axisName) {
                let axes = stage.axes[axisName] as SandDance.VegaDeckGl.types.Axis[];
                axes.forEach(axis => {
                    if (axis.title) {
                        const textItem = axis.title as TextWithSpecRole;
                        textItem.specRole = specRole;
                        clickableTextData.push(textItem);
                        delete axis.title;
                    }
                });
            }
        });
    }
    const layers = layerFn(stage);
    stage.axes = pristineAxes;
    if (clickableTextData.length > 0) {
        const onTextClick = (e: MouseEvent | PointerEvent | TouchEvent, text: TextWithSpecRole) => {
            clickFn(getPosition(e), text.specRole);
        };
        const clickableTextLayer = newClickableTextLayer('LAYER_CLICKABLE_TEXT', onTextClick, clickableTextData, [0, 0, 200, 255]);
        layers.splice(1, 0, clickableTextLayer);
    }
    return layers;
}

function getPosition(e: MouseEvent | PointerEvent | TouchEvent): Position {
    const emp = e as MouseEvent | PointerEvent;
    if (emp.clientX !== undefined) {
        return { top: emp.clientY, left: emp.clientX };
    }
    const et = e as TouchEvent;
    return { top: et.touches[0].clientY, left: et.touches[0].clientX };
}

function newClickableTextLayer(id: string, onTextClick: (e: MouseEvent | PointerEvent | TouchEvent, text: TextWithSpecRole) => void, data: TextWithSpecRole[], highlightColor: number[]) {
    return new SandDance.VegaDeckGl.base.layers.TextLayer({
        id,
        data,
        coordinateSystem: SandDance.VegaDeckGl.base.deck.COORDINATE_SYSTEM.IDENTITY,
        autoHighlight: true,
        highlightColor,
        pickable: true,
        onClick: (o, e) => onTextClick(e && e.srcEvent, o.object as TextWithSpecRole),
        getColor: [64, 64, 255, 255],
        getTextAnchor: o => o.textAnchor,
        getSize: o => o.size,
        getAngle: o => o.angle
    });
}

export interface ActiveDropdownProps extends ColumnMapProps, Position { }

export class ActiveDropdown extends React.Component<ActiveDropdownProps, {}> {
    private dropdownRef?: React.RefObject<FabricTypes.IDropdown>;

    constructor(props: ActiveDropdownProps) {
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
