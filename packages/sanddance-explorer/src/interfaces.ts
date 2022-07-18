/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { IIconButtonProps } from './controls/iconButton';
import { SandDance } from '@msrvida/sanddance-react';
import { SnapshotEditorProps } from './dialogs/snapshotEditor';
import { SnapshotListProps } from './dialogs/snapshots';

import Snapshot = SandDance.types.Snapshot;

export type DataFileType = 'json' | 'csv' | 'tsv' | 'topojson';

export interface DataFile {
  displayName?: string;
  dataUrl?: string;
  snapshotsUrl?: string;
  rawText?: string;
  snapshots?: Snapshot[];
  type: DataFileType;
}

export interface DataContent {
  data: object[];
  columns: SandDance.types.Column[];
  snapshots?: Snapshot[];
}

export type DataExportType = DataFileType | 'html';

export interface DataExportHandler {
  (data: any, datatype: DataExportType, displayName: string): void;
}

export interface SnapshotAction {
  element?: JSX.Element;
  iconButtonProps?: IIconButtonProps;
}

export interface SnapshotProps extends SnapshotEditorProps, SnapshotListProps {
  hidden?: boolean;
}

export interface ColorSettings extends SandDance.types.ColorSettings {
  clickableText?: string;
  clickableTextHighlight?: string;
  searchText?: string;
  searchTextHighlight?: string;
}

export interface ViewerOptions extends SandDance.types.ViewerOptions {
  colors: ColorSettings;
}

export interface DateWithSource extends Date {
  input?: string;
}

export interface SettingsGroup {
  groupLabel: string;
  children: React.ReactNode;
}

export enum SideTabId {
  ChartType, Data, Search, Color, Snapshots, History, Settings, Pin, Collapse,
}

export interface ChangeColumnMappingOptions {
  scheme?: string;
  facetStyle?: SandDance.specs.FacetStyle;
  totalStyle?: SandDance.specs.TotalStyle;
}

export type DataExtent = 'max' | 'min';
export type BackgroundImageDimension = 'x' | 'y';

export interface BackgroundImageColumnBound {
  columnName: string;
  dimension: BackgroundImageDimension;
  dataExtent: DataExtent;
  stringValue: string;
  numericValue: number;
  valid: boolean;
}

export interface ImageHolder {
  img: {
    src: string;
    height: number;
    width: number;
  };
  backgroundImageColumnBounds: BackgroundImageColumnBound[];
  showBackgroundImage: boolean;
}
