// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Color } from '@deck.gl/core/utils/color';
import { IconButtonProps } from './controls/iconButton';
import { SandDance } from '@msrvida/sanddance-react';
import { SnapshotEditorProps } from './dialogs/snapshotEditor';
import { SnapshotListProps } from './dialogs/snapshots';

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

export interface Snapshot {
  title?: string;
  description?: string;
  insight?: SandDance.specs.Insight;
  image?: string;
  bgColor?: string;
}

export interface SnapshotAction {
  element?: JSX.Element;
  iconButtonProps?: IconButtonProps;
}

export interface SnapshotProps extends SnapshotEditorProps, SnapshotListProps {
}

export interface ColorSettings extends SandDance.types.ColorSettings {
  clickableText?: Color;
  clickableTextHighlight?: Color;
  searchText?: Color;
  searchTextHighlight?: Color;
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
  ChartType, Data, Search, Color, Snapshots, Settings, Pin, Collapse
}

export interface ChangeColumnMappingOptions {
  scheme?: string;
  facetStyle?: SandDance.specs.FacetStyle;
  totalStyle?: SandDance.specs.TotalStyle;
}
