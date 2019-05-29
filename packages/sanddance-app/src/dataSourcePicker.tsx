// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from './base';
import { DataFileType } from '@msrvida/sanddance-explorer';
import { DataSource, DataSourceType } from './types';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { strings } from './language';

export interface Props {
  dataSource: DataSource;
  dataSources: DataSource[];
  changeDataSource: (dataSource: DataSource) => Promise<void>;
  disabled?: boolean;
}

export interface State {
  uploadFormatError?: string;
  url?: string;
  urlType?: DataFileType;
  urlError?: string;
  working: boolean;
  dialogMode?: DataSourceType;
}

export class DataSourcePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      url: "",
      urlType: DataSourcePicker.urlTypes[0],
      working: false
    };
  }

  static urlTypes: DataFileType[] = ["json", "csv", "tsv", "topojson"];

  changeDataSource(dataSource: DataSource) {
    this.setState({ working: true });
    return new Promise<void>((resolve, reject) => {
      const uploadFormatError = "";
      const urlError = "";
      this.setState({ uploadFormatError, urlError });
      this.props
        .changeDataSource(dataSource)
        .then(() => {
          this.setState({
            working: false,
            uploadFormatError: "",
            urlError: "",
            dialogMode: null
          });
          resolve();
        })
        .catch(reason => {
          this.setState({ working: false });
          reject(reason);
        });
    });
  }

  upload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const split = file.name.split(".");
      const type = split[split.length - 1] as DataFileType;
      if (DataSourcePicker.urlTypes.indexOf(type) >= 0) {
        const reader = new FileReader();
        reader.onload = () => {
          const id = file.name;
          const displayName = file.name;
          const rawText = reader.result as string;
          const ds: DataSource = {
            dataSourceType: 'local',
            displayName,
            id,
            rawText,
            type
          };
          this.changeDataSource(ds);
        };
        reader.readAsText(file);
      } else {
        const uploadFormatError = strings.errorInvalidFileFormat;
        this.setState({ uploadFormatError });
      }
    }
  }

  loadUrl() {
    if (!this.state.url) {
      return this.setState({ urlError: strings.errorNoUrl });
    }
    if (this.state.url.toLocaleLowerCase().substr(0, 4) !== "http") {
      return this.setState({ urlError: strings.errorUrlHttp });
    }
    //TODO: check url
    const { url } = this.state;
    const ds: DataSource = {
      dataSourceType: 'url',
      displayName: url,
      id: url,
      dataUrl: url,
      type: this.state.urlType
    };
    this.changeDataSource(ds).catch((e: Error) => {
      this.setState({ urlError: e.message });
    });
  }

  render() {
    const closeDialog = () => {
      this.setState({ dialogMode: null });
    };

    const menuProps: FabricTypes.IContextualMenuProps = {
      items: [
        {
          key: "sample-section",
          itemType: base.fabric.ContextualMenuItemType.Section,
          sectionProps: {
            title: strings.sampleDataPrefix,
            items: this.props.dataSources.map((ds, i) => {
              const item: FabricTypes.IContextualMenuItem = {
                key: ds.id,
                text: ds.displayName,
                onClick: e => {
                  this.changeDataSource(ds);
                }
              };
              return item;
            })
          }
        },
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
          className="sanddance-datasource-picker"
          text={dataSourcePrefix(this.props.dataSource.dataSourceType, this.props.dataSource.displayName)}
          menuProps={menuProps}
          disabled={this.props.disabled}
        />
        <base.fabric.Dialog
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
        </base.fabric.Dialog>
        <base.fabric.Dialog
          hidden={!(this.state.dialogMode === 'url')}
          onDismiss={closeDialog}
          dialogContentProps={{
            className: "sanddance-dialog",
            type: base.fabric.DialogType.normal,
            title: strings.dialogTitleUrl
          }}
        >
          <base.fabric.TextField
            label={strings.labelUrl}
            placeholder={strings.urlInputPlaceholder}
            onKeyUp={e => e.keyCode === 13 && this.loadUrl()}
            onChange={(e, url) =>
              this.setState({ url, urlError: "" })
            }
            value={this.state.url}
            disabled={this.state.working}
          />
          {this.state.urlError && (
            <div className="error">{this.state.urlError}</div>
          )}
          <base.fabric.ChoiceGroup
            options={
              DataSourcePicker.urlTypes.map((urlType, i) => {
                return {
                  key: `${i}`,
                  text: urlType,
                  disabled: this.state.working,
                  checked: i === 0
                } as FabricTypes.IChoiceGroupOption;
              })
            }
            onChange={(ev: React.FormEvent<HTMLInputElement>, option: FabricTypes.IChoiceGroupOption) =>
              this.setState({ urlType: option.text as DataFileType, urlError: "" })
            }
            label={strings.labelDataFormat}
          />
          <base.fabric.DialogFooter>
            <base.fabric.PrimaryButton onClick={e => this.loadUrl()} text={strings.dialogLoadButton} disabled={this.state.working} />
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
