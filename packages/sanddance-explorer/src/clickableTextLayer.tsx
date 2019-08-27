// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { ColorSettings } from './interfaces';
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
    specCapabilities: SandDance.types.SpecCapabilities,
    textClick: (pos: Position, specRole: SandDance.types.SpecRoleCapabilities) => void,
    getColors: () => ColorSettings
) {
    //const clickableTextData: TextWithSpecRole[] = [];
    //const originalAxes = SandDance.VegaDeckGl.util.clone(stage.axes);
    for (let axisName in stage.axes) {
        specCapabilities.roles.forEach(specRole => {
            if (specRole.role === axisName) {
                let axes = stage.axes[axisName] as SandDance.VegaDeckGl.types.Axis[];
                axes.forEach(axis => {
                    if (axis.title) {
                        const textItem = axis.title as TextWithSpecRole;
                        textItem.specRole = specRole;
                        //clickableTextData.push(textItem);
                        //delete axis.title;
                    }
                });
            }
        });
    }
    const layers = stageToLayers(stage);
    //stage.axes = originalAxes;
    // const onTextClick = (e: MouseEvent | PointerEvent | TouchEvent, text: TextWithSpecRole) => {
    //     if (e && text) {
    //         textClick(getPosition(e), text.specRole);
    //     }
    // };
    //const clickableTextLayer = newClickableTextLayer('LAYER_CLICKABLE_TEXT', onTextClick, clickableTextData, getColors());
    //layers.splice(2, 0, clickableTextLayer);
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

function newClickableTextLayer(
    id: string,
    onTextHover: (e: MouseEvent | PointerEvent | TouchEvent, text: TextWithSpecRole) => void,
    data: TextWithSpecRole[],
    colors: ColorSettings
) {
    return new SandDance.VegaDeckGl.TextLayer({
        id,
        data,
        coordinateSystem: SandDance.VegaDeckGl.base.deck.COORDINATE_SYSTEM.IDENTITY,
        pickable: true,
        onClick: (o, e) => onTextHover(e && e.srcEvent, o && o.object as TextWithSpecRole),
        autoHighlight: true,
        highlightColor: colors.clickableTextHighlight,
        getColor: colors.clickableText,
        getTextAnchor: o => o.textAnchor,
        getSize: o => o.size,
        getAngle: o => o.angle
    });
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
