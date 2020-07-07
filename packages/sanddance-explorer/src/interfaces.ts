// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
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
  ChartType, Data, Search, Color, Snapshots, History, Settings, Pin, Collapse
}

export interface ChangeColumnMappingOptions {
  scheme?: string;
  facetStyle?: SandDance.specs.FacetStyle;
  totalStyle?: SandDance.specs.TotalStyle;
}
