// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../../sanddance-app/src/base';
import { DataFileType } from '../../sanddance-explorer';
import { DataSource, DataSourceType } from '../../sanddance-app/src/types';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { strings } from '../../sanddance-app/src/language';
//import { DataFileType } from './interfaces';

export interface Props {
  //dataSource: DataSource;
  data: object[];
  datasetExportHandler: (data: any) => void;
  // changeDataExport: (dataExportType: DataFileType) => Promise<void>;
  disabled?: boolean;
}

export interface State {
  exportType?: DataFileType;
  working: boolean;
  dialogMode?: DataSourceType;
  // csv, json, or tsv
  exportData?: any;
  error: string
}

export class DataExportPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      exportType: DataExportPicker.urlTypes[0],
      working: false,
      error: ""
    };
  }

  static urlTypes: DataFileType[] = ["json", "csv", "tsv"];

  // Converts to dataExport type and calls dataExportHandler to deal with data
  changeDataExport(dataExport: DataFileType) {
    this.setState({ working: true });
    return new Promise<void>((resolve, reject) => {
      const uploadFormatError = "";
      const urlError = "";
      this.setState({ exportType: dataExport });
      if (dataExport == "json") {
        this.setState({ exportData: this.convertToJson(this.props.data) })
      } else if (dataExport == "csv") {
        this.setState({ exportData: this.convertToCsv(this.props.data) })
      } else if (dataExport == "tsv") {
        this.setState({ exportData: this.convertToTsv(this.props.data) })
      };
      this.props
        .datasetExportHandler(this.exportData)

    });
  }

  exportData() {
    if (!this.state.exportType) {
      return this.setState({ error: strings.errorNoUrl });
    }

    this.changeDataExport(this.state.exportType).catch((e: Error) => {
      this.setState({ error: e.message });
    });
  }

  // TODO: convert to json
  convertToJson(data: object[]) {
    console.log(data);

  }
  // TODO: convert to csv
  convertToCsv(data: object[]) {
    console.log(data);

  }

  // TODO: convert to tsx
  convertToTsv(data: object[]) {
    console.log(data);

  }




  render() {
    const closeDialog = () => {
      this.setState({ dialogMode: null });
    };
    

    const menuProps: FabricTypes.IContextualMenuProps = {
      items: [
        // {
        //   key: "sample-section",
        //   itemType: base.fabric.ContextualMenuItemType.Section,
        //   sectionProps: {
        //     title: strings.sampleDataPrefix,
        //     items: this.props.dataSources.map((ds, i) => {
        //       const item: FabricTypes.IContextualMenuItem = {
        //         key: ds.id,
        //         text: ds.displayName,
        //         onClick: e => {
        //           this.changeDataExport(ds);
        //         }
        //       };
        //       return item;
        //     })
        //   }
        // },
        {
          key: "user-section",
          itemType: base.fabric.ContextualMenuItemType.Section,
          sectionProps: {
            topDivider: true,
            title: strings.menuUserData,
            items: [
              {
                key: "local",
                text: strings.menuLocal,
                onClick: e => {
                  this.setState({ dialogMode: 'local' });
                }
              },
              {
                key: "url",
                text: strings.menuUrl,
                onClick: e => {
                  this.setState({ dialogMode: 'url' });
                }
              }
            ]
          }
        }
      ]
    };

    return (
      <div>
        <base.fabric.PrimaryButton
          className="search-action search-bottom-action"
          text={this.state.exportType}
          menuProps={menuProps}
          disabled={this.props.disabled}
        /> 
        {/* <base.fabric.Dialog
          hidden={!(this.state.dialogMode === 'local')}
          onDismiss={closeDialog}
          dialogContentProps={{
            className: "sanddance-dialog",
            type: base.fabric.DialogType.normal,
            title: strings.dialogTitleLocal,
            subText: strings.dialogSubtextLocal
          }}
        >
          <input
            type="file"
            onChange={e => this.upload(e)}
            disabled={this.state.working}
          />
          {this.state.uploadFormatError && (
            <div className="error">{this.state.uploadFormatError}</div>
          )}
        </base.fabric.Dialog> */}
        <base.fabric.Dialog
          hidden={!(this.state.dialogMode === 'url')}
          onDismiss={closeDialog}
          dialogContentProps={{
            className: "sanddance-dialog",
            type: base.fabric.DialogType.normal,
            title: strings.dialogExportTitle
          }}
        >
          <base.fabric.ChoiceGroup
            options={
                DataExportPicker.urlTypes.map((urlType, i) => {
                return {
                  key: `${i}`,
                  text: urlType,
                  disabled: this.state.working,
                  checked: i === 0
                } as FabricTypes.IChoiceGroupOption;
              })
            }
            onChange={(ev: React.FormEvent<HTMLInputElement>, option: FabricTypes.IChoiceGroupOption) =>
              this.setState({ exportType: option.text as DataFileType, error: "" })
            }
            label={strings.labelDataFormat}
          />
          <base.fabric.DialogFooter>
            <base.fabric.PrimaryButton onClick={e => this.exportData()} text={strings.dialogExportButton} disabled={this.state.working} />
            <base.fabric.DefaultButton onClick={closeDialog} text={strings.dialogCloseButton} />
          </base.fabric.DialogFooter>
        </base.fabric.Dialog>
      </div>
    );
  }
}

function dataSourcePrefix(dt: DataSourceType, displayName: string) {
  switch (dt) {
    case 'sample':
      return `${strings.sampleDataPrefix}: ${displayName}`;
    case 'local':
      return strings.localFilePrefix;
    case 'url':
      return strings.urlPrefix;
  }
  return "";
}
