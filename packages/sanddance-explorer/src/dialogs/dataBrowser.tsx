// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { DataExportHandler } from '../interfaces';
import { DataExportPicker, removeExtensions } from '../controls/dataExporter';
import { DataItem } from '../controls/dataItem';
import { DataScopeId } from '../controls/dataScope';
import { Dropdown } from '../controls/dropdown';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { Group } from '../controls/group';
import { IconButton } from '../controls/iconButton';
import { InputSearchExpressionGroup } from './search';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from '../language';

export interface Props {
    data: object[];
    index: number;
    onActivate: { (row: object, index: number): void };
    onSearch?: { (event: React.MouseEvent<{}>, search: InputSearchExpressionGroup[]): void };
    bingSearchDisabled: boolean;
    columns: SandDance.types.Column[];
    disabled?: boolean;
    nullMessage: string;
    zeroMessage: string;
    itemVisible: boolean;
    theme: string;
    themePalette: Partial<FluentUITypes.IPalette>;
    dataExportHandler: DataExportHandler;
    selectedDataScope: DataScopeId;
    onDataScopeClick: (dataScopeId: DataScopeId) => void;
    displayName: string;
}

export function DataBrowser(props: Props) {
    function activateRecord(newIndex: number) {
        props.onActivate(props.data[newIndex], newIndex);
    }
    const { index } = props;
    const length = props.data && props.data.length || 0;
    return (
        <Group label={strings.labelDataBrowser} className="sanddance-dataIndex">
            <Dropdown
                label={strings.labelDataScope}
                collapseLabel={true}
                options={[
                    {
                        key: DataScopeId.AllData,
                        text: strings.selectDataSpanAll,
                        isSelected: props.selectedDataScope === DataScopeId.AllData
                    },
                    {
                        key: DataScopeId.FilteredData,
                        text: strings.selectDataSpanFilter,
                        isSelected: props.selectedDataScope === DataScopeId.FilteredData
                    },
                    {
                        key: DataScopeId.SelectedData,
                        text: strings.selectDataSpanSelection,
                        isSelected: props.selectedDataScope === DataScopeId.SelectedData
                    }
                ]}
                onChange={(e, o) => {
                    props.onDataScopeClick(o.key as DataScopeId);
                }}
            />
            {!props.data && <div dangerouslySetInnerHTML={{ __html: props.nullMessage }}></div>}
            {props.data && !props.data.length && <div>{props.zeroMessage}</div>}
            {!!length && <div>
                <div className="index">
                    <IconButton
                        themePalette={props.themePalette}
                        iconName="ChevronLeftMed"
                        onClick={e => activateRecord(index <= 0 ? length - 1 : index - 1)}
                        disabled={props.disabled || length === 1}
                        title={strings.buttonPrevDataItem}
                    />
                    <span>{strings.record(index + 1, length)}</span>
                    <IconButton
                        themePalette={props.themePalette}
                        iconName="ChevronRightMed"
                        onClick={e => activateRecord(index >= length - 1 ? 0 : index + 1)}
                        disabled={props.disabled || length === 1}
                        title={strings.buttonNextDataItem}
                    />
                </div>
                {!props.itemVisible && <div className="item-filtered">{strings.labelDataItemIsFiltered}</div>}
                <DataItem
                    columns={props.columns}
                    item={props.data[index]}
                    disabled={props.disabled}
                    onSearch={props.onSearch}
                    bingSearchDisabled={props.bingSearchDisabled}
                />
            </div>}
            {props.dataExportHandler && props.data && (
                <DataExportPicker
                    theme={props.theme}
                    initializer={{
                        fileName: `${removeExtensions(props.displayName)} (${props.data.length})`
                    }}
                    data={props.data}
                    dataExportHandler={props.dataExportHandler}
                    disabled={props.disabled}
                />
            )}
        </Group>
    );
}
