/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { Dialog } from '../controls/dialog';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from '../language';
import { IconButton } from '../controls/iconButton';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { ColumnMapBaseProps } from '../controls/columnMap';
import { IDropdownOption } from '@msrvida/fluentui-react-cdn-typings/types';
import { BackgroundImageColumnBound, BackgroundImageDimension, DataExtent } from '../interfaces';

export interface Props extends ColumnMapBaseProps {
    themePalette: Partial<FluentUITypes.IPalette>;
    chart: SandDance.specs.Chart;
}

export interface State {
    backgroundImageColumnBounds: BackgroundImageColumnBound[];
    backgroundImageFileFormatError?: string;
    readyToApply: boolean;
    hidden: boolean;
    xCol?: SandDance.types.Column;
    yCol?: SandDance.types.Column;
}

function _BackgroundImageEditor(_props: Props) {
    class __BackgroundImageEditor extends base.react.Component<Props, State>{

        constructor(props: Props) {
            super(props);
            this.state = {
                backgroundImageColumnBounds: [],
                readyToApply: false,
                hidden: true,
            };
        }

        show(insightColumns: SandDance.specs.InsightColumns) {
            const { explorer, quantitativeColumns } = this.props;
            if (!quantitativeColumns.length) {
                //TODO show error
                return;
            }
            const xCol = quantitativeColumns.filter(c => c.name === insightColumns.x)[0];
            const yCol = quantitativeColumns.filter(c => c.name === insightColumns.y)[0];
            const newState: Partial<State> = { hidden: false, xCol, yCol, backgroundImageColumnBounds: SandDance.VegaMorphCharts.util.clone(explorer.imageHolder.backgroundImageColumnBounds) };
            if (!xCol || !yCol) {
                //TODO error
            }
            this.setState(newState as State);
            this.checkReady();
        }

        render() {
            const { props, state } = this;
            const { explorer } = props;
            return (
                <Dialog
                    hidden={state.hidden}
                    onDismiss={() => this.setState({ hidden: true, backgroundImageFileFormatError: null })}
                    modalProps={{
                        containerClassName: 'sanddance-background-image-dialog',
                    }}
                    dialogContentProps={{
                        type: base.fluentUI.DialogType.normal,
                        title: strings.labelBackgroundImageDialogTitle,
                        subText: strings.labelBackgroundImageSubtext,
                    }}
                    buttons={[
                        <base.fluentUI.PrimaryButton
                            key='apply'
                            iconProps={{ iconName: 'Photo2Add' }}
                            text={strings.labelBackgroundApply}
                            onClick={() => this.applyImage(true)}
                            disabled={!state.readyToApply}
                        />,
                    ]}
                >
                    {explorer.imageHolder.img ? (
                        <div className='thumbnail'>
                            <img src={explorer.imageHolder.img.src} />
                            <base.fluentUI.DefaultButton
                                key='remove'
                                iconProps={{ iconName: 'Photo2Remove' }}
                                text={strings.labelBackgroundRemove}
                                onClick={() => {
                                    explorer.imageHolder.img = null;
                                    this.applyImage(false);
                                    this.setState({ readyToApply: false });
                                }}
                            />
                        </div>
                    ) : (
                        <div className='thumbnail'>
                            <input
                                type="file"
                                onChange={e => this.readBackgroundImage(e)}
                            //disabled={this.state.working} //TODO
                            />
                            {state.backgroundImageFileFormatError && (
                                <div className="error">{state.backgroundImageFileFormatError}</div>
                            )}
                        </div>
                    )}
                    {this.inputForColumn(state.xCol, 'X axis', 'x', strings.labelBackgroundLeft, strings.labelBackgroundRight)}
                    {this.inputForColumn(state.yCol, 'Y axis', 'y', strings.labelBackgroundBottom, strings.labelBackgroundTop)}
                </Dialog>
            );
        }

        private inputForColumn(column: SandDance.types.Column, label: string, dimension: BackgroundImageDimension, minLabel: string, maxLabel: string) {
            const { props, state } = this;
            const fieldInput = (label: string, dataExtent: DataExtent, getDefault: () => number) => {
                const bounds = state.backgroundImageColumnBounds.filter(b => b.columnName === column?.name && b.dimension === dimension && b.dataExtent === dataExtent)[0];
                if (!bounds) {
                    return null;
                }
                return (
                    <div className='axis-bound-field'>
                        <base.fluentUI.TextField
                            label={label}
                            onChange={(e, value) => {
                                const numericValue = +value;
                                bounds.stringValue = value;
                                bounds.valid = !(!value || isNaN(numericValue));
                                if (bounds.valid) {
                                    bounds.numericValue = numericValue;
                                }
                                this.setState({ backgroundImageColumnBounds: [...state.backgroundImageColumnBounds] });
                                this.checkReady();
                            }}
                            value={bounds.stringValue}
                            errorMessage={bounds.valid ? null : strings.errorNumericValue}
                            onRenderSuffix={(a) => {
                                return (
                                    <IconButton
                                        iconName='ScaleVolume'
                                        themePalette={props.themePalette}
                                        title='Use data extent' //TODO
                                        onClick={() => {
                                            bounds.numericValue = getDefault();
                                            bounds.stringValue = bounds.numericValue.toString();
                                            bounds.valid = true;
                                            this.setState({ backgroundImageColumnBounds: [...state.backgroundImageColumnBounds] });
                                            this.checkReady();
                                        }}
                                    />
                                );
                            }}
                        />
                    </div>
                );
            };
            return (
                <div className='axis-bounds'>
                    <base.fluentUI.Dropdown
                        label={label}
                        options={props.quantitativeColumns.map(c => {
                            const option: IDropdownOption = {
                                key: c.name,
                                text: c.name,
                            };
                            return option;
                        })}
                        onChange={(e, o) => {
                            const newState: Partial<State> = { readyToApply: false };
                            const newColumn = props.quantitativeColumns.filter(c => c.name === o.key)[0];
                            switch (dimension) {
                                case 'x': {
                                    newState.xCol = newColumn;
                                    break;
                                }
                                case 'y': {
                                    newState.yCol = newColumn;
                                    break;
                                }
                            }
                            this.setState(newState as State);
                            this.checkReady();
                        }}
                        selectedKey={column?.name}
                    />
                    <div className='axis-bound-fields'>
                        {fieldInput(minLabel, 'min', () => column.stats.min)}
                        {fieldInput(maxLabel, 'max', () => column.stats.max)}
                    </div>
                </div>

            );
        }

        readBackgroundImage(e: React.ChangeEvent<HTMLInputElement>) {
            if (e.target.files) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    const img = new Image();
                    img.onerror = () => {
                        this.setState({ backgroundImageFileFormatError: strings.errorImageFormat });
                    };
                    img.onload = () => {
                        //success
                        const { src, height, width } = img;
                        this.props.explorer.imageHolder.img = { src, height, width };
                        this.checkReady();
                    };
                    try {
                        img.src = reader.result as string;
                    }
                    catch (e) {
                        this.setState({ backgroundImageFileFormatError: strings.errorImageFormat });
                    }
                };
                reader.readAsDataURL(file);
            }
        }

        checkReady() {
            //allow state to resolve
            setTimeout(() => {
                const { state, props } = this;
                const { explorer } = props;
                const { backgroundImageColumnBounds } = state;
                let valid = true;
                const dimensions: BackgroundImageDimension[] = ['x', 'y'];
                const dataExtents: DataExtent[] = ['max', 'min'];
                [state.xCol, state.yCol].forEach(c => dimensions.forEach(dimension => dataExtents.forEach(dataExtent => {
                    const bounds = backgroundImageColumnBounds.filter(b => b.columnName === c.name && b.dataExtent === dataExtent && b.dimension === dimension)[0];
                    if (!bounds.valid) {
                        valid = false;
                    }
                })));
                const readyToApply = explorer.imageHolder.img && valid;    //TODO if not already applied
                this.setState({ readyToApply });
            }, 0);
        }

        applyImage(showBackgroundImage: boolean) {
            const { props, state } = this;
            const { explorer } = props;
            explorer.imageHolder.showBackgroundImage = showBackgroundImage;
            explorer.imageHolder.backgroundImageColumnBounds = SandDance.VegaMorphCharts.util.clone(state.backgroundImageColumnBounds);
            if (showBackgroundImage) {
                switch (props.chart) {
                    case 'density':
                    case 'scatterplot':
                    case 'stacks': {
                        break;
                    }
                    default: {
                        //TODO use xcol & ycol
                        //make sure x & y are numeric
                        explorer.changeChartType('scatterplot');
                        return;
                    }
                }
            }
            explorer.forceUpdate();
        }
    }
    return new __BackgroundImageEditor(_props);
}

export const BackgroundImageEditor: typeof BackgroundImageEditor_Class = _BackgroundImageEditor as any;

export declare class BackgroundImageEditor_Class extends base.react.Component<Props, State> {
    show(insightColumns: SandDance.specs.InsightColumns): void;
}
