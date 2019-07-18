// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { DataItem } from '../controls/dataItem';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { Group } from '../controls/group';
import { IconButton } from '../controls/iconButton';
import { InputSearchExpressionGroup } from './search';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from '../language';
import { DataExportPicker } from '../dataExporter';

import { base } from '../base';


export interface Props {
    title: string;
    data: object[];
    index: number;
    onActivate: { (row: object, index: number): void };
    onSearch?: { (event: React.MouseEvent<{}>, search: InputSearchExpressionGroup[]): void };
    columns: SandDance.types.Column[];
    disabled?: boolean;
    nullMessage: string;
    zeroMessage: string;
    itemVisible: boolean;
    themePalette: Partial<FabricTypes.IPalette>;
    datasetExportHandler: (data: any) => void;
    

}

//From: https://codeburst.io/export-objects-array-as-csv-using-typescript-643bf4f794d9
// To create and save csv file
// export class CsvDataService {

//     static exportToCsv(filename: string, rows: object[]) {
  
//       if (!rows || !rows.length) {
  
//         return;
  
//       }
  
//       const separator = ',';
  
//       const keys = Object.keys(rows[0]);
  
//       const csvContent =
  
//         keys.join(separator) +
  
//         '\n' +
  
//         rows.map(row => {
  
//           return keys.map(k => {
  
//             let cell = row[k] === null || row[k] === undefined ? '' : row[k];
  
//             cell = cell instanceof Date
  
//               ? cell.toLocaleString()
  
//               : cell.toString().replace(/"/g, '""');
  
//             if (cell.search(/("|,|\n)/g) >= 0) {
  
//               cell = `"${cell}"`;
  
//             }
  
//             return cell;
  
//           }).join(separator);
  
//         }).join('\n');
  
  
  
//       const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
//       if (navigator.msSaveBlob) { // IE 10+
  
//         navigator.msSaveBlob(blob, filename);
  
//       } else {
  
//         const link = document.createElement('a');
  
//         if (link.download !== undefined) {
  
//           // Browsers that support HTML5 download attribute
  
//           const url = URL.createObjectURL(blob);
  
//           link.setAttribute('href', url);
  
//           link.setAttribute('download', filename);
  
//           link.style.visibility = 'hidden';
  
//           document.body.appendChild(link);
  
//           link.click();
  
//           document.body.removeChild(link);
  
//         }
  
//       }
  
//     }
  
//   }

//   export function saveCsv() {
//     const groups: InputSearchExpressionGroup[] = [...this.state.groups];
//     groups.forEach(group => {
//         group.expressions.forEach(validateExpression);
//         const errors = group.expressions.reduce((p, c) => p || c.errorMessage, '');
//         if (errors) {
//             this.setState({ groups });
//         } else {
//             this.props.onSelect(this.state.groups);
//         }
//     });
//     exportToCsv("csv",groups);
//   }


export function DataBrowser(props: Props) {
    function activateRecord(newIndex: number) {
        props.onActivate(props.data[newIndex], newIndex);
    }
    const { index } = props;
    const length = props.data && props.data.length || 0;
    return (
        <Group label={props.title} className="sanddance-dataIndex">
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
                />
            </div>}
            <div>
              <DataExportPicker 
                data={props.data}
                datasetExportHandler = {this.props.datasetExportHandler}
              />
            </div>
            <div>
              <DataExportPicker 
                data={props.data}
                datasetExportHandler = {this.props.datasetExportHandler}
              />
            </div>
              
        </Group>
    );
}
