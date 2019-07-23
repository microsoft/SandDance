// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { DataFileType } from '../interfaces';
import { strings } from '../language';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { base } from '../base';

export interface Props {
  //dataSource: DataSource;
  data: object[];
  datasetExportHandler: (data: any, datatype: string) => void;
  disabled?: boolean;
}

export interface State {
  dialogHidden: boolean;
  exportType?: DataFileType;
  working: boolean;
  exportData?: any;
  error: string
}

export class DataExportPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dialogHidden: true,
      exportType: DataExportPicker.urlTypes[0],
      working: true,
      error: ""
    };
  }

  static urlTypes: DataFileType[] = ["json", "csv", "tsv"];

  // Converts to dataExport type and calls dataExportHandler to deal with data
  changeDataExport(dataExport: DataFileType) {
    this.setState({ working: false });
    return new Promise<void>((resolve, reject) => {
      const uploadFormatError = "";
      const urlError = "";
      var convertedData : any;
      this.setState({ exportType: dataExport });
      if (dataExport == "json") {
        convertedData = this.convertToJson(this.props.data);
        this.props
        .datasetExportHandler(convertedData, "json")
      } else if (dataExport == "csv") {
        convertedData = this.convertToCsv(this.props.data);
        this.props
        .datasetExportHandler(convertedData, "csv")
      } else if (dataExport == "tsv") {
        convertedData = this.convertToTsv(this.props.data);
        this.props
        .datasetExportHandler(convertedData, "tsv")
      };
    });
  }

  export() {
    if (!this.state.exportType) {
      return this.setState({ error: "Error" });
    }

    this.changeDataExport(this.state.exportType).catch((e: Error) => {
      this.setState({ error: e.message });
    });
  }

  // Convert to json and store in dataExport state
  convertToJson(data: object[]) {
    console.log(JSON.stringify(data));
    return JSON.stringify(data);

  }
  // Convert to csv
  convertToCsv(data: object[]) {
    // From: https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable
    var json = data;
    var fields = Object.keys(json[0]);
    var replacer = function(key, value) { return value === null ? '' : value };
    var csv = json.map(function(row){
    return fields.map(function(fieldName){
    return JSON.stringify(row[fieldName], replacer)
      }).join(',')
    })
    csv.unshift(fields.join(','));
    return (csv.join('\r\n'));

  }

  convertToTsv(data: object[]) {
    // Adapted from: https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable
    var json = data;
    var fields = Object.keys(json[0]);
    var replacer = function(key, value) { return value === null ? '' : value };
    var tsv = json.map(function(row){
    return fields.map(function(fieldName){
    return JSON.stringify(row[fieldName], replacer)
      }).join('\t')
    })
    tsv.unshift(fields.join('\t'));
    console.log(tsv.join('\r\n'));
    return (tsv.join('\r\n'));
  }


  render() {
    const closeDialog = () => {
      this.setState({ dialogHidden: true, working: true});
    };

    return (
      <div>
        <base.fabric.PrimaryButton
          className="search-action search-bottom-action"
          text={strings.buttonExport}
          onClick={() => this.setState({ dialogHidden: false, exportType: "json"})}
          disabled={this.props.disabled}
        />
       
        <base.fabric.Dialog
          hidden={this.state.dialogHidden}
          onDismiss={closeDialog}
          dialogContentProps={{
            className: "sanddance-dialog",
            type: base.fabric.DialogType.normal,
            title: strings.labelExport
          }}
        >
          <base.fabric.ChoiceGroup
            options={
              DataExportPicker.urlTypes.map((urlType, i) => {
                return {
                  key: `${i}`,
                  text: urlType,
                  disabled: !this.state.working,
                  checked: i === 0
                } as FabricTypes.IChoiceGroupOption;
              })
            }
            onChange={(ev: React.FormEvent<HTMLInputElement>, option: FabricTypes.IChoiceGroupOption) =>
              this.setState({ exportType: option.text as DataFileType, error: "" })
            }
            label={strings.labelExportFormat}
          />
          <base.fabric.DialogFooter>
            <base.fabric.PrimaryButton onClick={e => this.export()} text={strings.buttonExport} disabled={!this.state.working} />
            <base.fabric.DefaultButton onClick={closeDialog} text={strings.buttonClose} />
          </base.fabric.DialogFooter>
        </base.fabric.Dialog>
      </div>
    );
  }
}
