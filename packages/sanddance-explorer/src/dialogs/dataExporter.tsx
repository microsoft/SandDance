// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../../../sanddance-app/src/base';
import { DataFileType } from '../../../sanddance-explorer'
//@msrvida/sanddance-explorer';
import { DataSource, DataSourceType } from '../../../sanddance-app/src/types';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { strings } from '../language';
import { Dialog } from 'c:/Projects/SandDance/packages/sanddance-explorer/src/controls/dialog';
import { Group } from 'c:/Projects/SandDance/packages/sanddance-explorer/src/controls/group';


export interface Props {
  //dataSource: DataSource;
  data: object[];
  datasetExportHandler: (data: any) => void;
  // changeDataExport: (dataExportType: DataFileType) => Promise<void>;
  //disabled?: boolean;
}

export interface State {
  exportType?: DataFileType;
  working: boolean;
  dialogMode?: DataSourceType;
  // csv, json, or tsv
  exportData?: any;
  error: string;
  formHidden: boolean
}

const thumbWidth = 300;

export class DataExportPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      exportType: DataExportPicker.urlTypes[0],
      working: false,
      error: "",
      formHidden: true
    };
  }

  static urlTypes: DataFileType[] = ["json", "csv", "tsv"];


  // Converts to dataExport type and calls dataExportHandler to deal with data
   changeDataExport(dataExport: DataFileType) {
       console.log("ChangeDataExport Called");
//     this.setState({ working: true });
//     return new Promise<void>((resolve, reject) => {
//       const uploadFormatError = "";
//       const urlError = "";
//       this.setState({ exportType: dataExport });
//       if (dataExport == "json") {
//         this.setState({ exportData: this.convertToJson(this.props.data) })
//       } else if (dataExport == "csv") {
//         this.setState({ exportData: this.convertToCsv(this.props.data) })
//       } else if (dataExport == "tsv") {
//         this.setState({ exportData: this.convertToTsv(this.props.data) })
//       };
//     //   this.props
//     //     .datasetExportHandler(this.exportData)

//     });
   }

   exportData() {
    console.log("ExportData Called");

//     if (!this.state.exportType) {
//       return this.setState({ error: strings.labelError });
//     }

//     this.changeDataExport(this.state.exportType).catch((e: Error) => {
//       this.setState({ error: e.message });
//    });
   }

  // TODO: convert to json
  convertToJson(data: object[]) {
    console.log(data);

  }
  // TODO: convert to csv
  convertToCsv(data: object[]) {
    console.log(data);

    /*
    let rows = data.resultSubset.rows;
    let columns = args.columnInfo;

    // Create csv 
    let csv = "";

    // Add column names to csv
    for (let i = 0; i < columns.length - 1; i++) {
        csv = csv + columns[i].columnName + ",";
    }
    csv = csv + columns[columns.length - 1].columnName + "\n";

    // Add row information, adding if displayValue is not null
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];

        for (let j = 0; j < row.length - 1; j++) {
            if (!row[j].isNull) {
                csv = csv + row[j].displayValue + ",";
            } else {
                csv = csv + " ,";
            }
        }

        if (!row[row.length - 1].isNull) {
            csv = csv + row[row.length - 1].displayValue + "\n";
        } else {
            csv = csv + " \n";
        }
    }
     */
  }

  // TODO: convert to tsx
  convertToTsv(data: object[]) {
    console.log(data);

  }


  render() {
    const closeDialog = () => {
      this.setState({ dialogMode: null });
    };

    return (
        <Group className="sanddance-snapshots" label={strings.buttonExport}>
            <base.fabric.PrimaryButton
                text={strings.buttonExport}
                onClick={e => {
                    this.setState({ formHidden: false });
                }}
            />
            <Dialog
                // minWidth={`${thumbWidth + 64}px`}
                // hidden={this.state.formHidden}
                // onDismiss={() => this.setState({ formHidden: true })}
                // title={strings.buttonCreateSnapshot}
                // buttons={[
                //     <base.fabric.PrimaryButton key={0} onClick={e => this.exportData} text={strings.buttonExport} />
                // ]}
            >
                {/* <base.fabric.TextField
                    label={strings.labelSnapshotDescription}
                    onKeyUp={e => e.keyCode === 13 && this.exportData()}
                    onChange={(e, description) =>
                        this.setState({ description })
                    }
                    value={this.state.description}
                /> */}
                {/* <img src={this.state.image} style={{ backgroundColor: this.state.bgColor, width: `${thumbWidth}px` }} />
                {this.props.explorer.viewer.colorContexts.length > 1 && <div>{strings.labelColorFilter}</div>} */}
            </Dialog>
           
        </Group>
    );
  }
}

// function dataSourcePrefix(dt: DataSourceType, displayName: string) {
//   switch (dt) {
//     case 'sample':
//       return `${strings.sampleDataPrefix}: ${displayName}`;
//     case 'local':
//       return strings.localFilePrefix;
//     case 'url':
//       return strings.urlPrefix;
//   }
//   return "";
// }
