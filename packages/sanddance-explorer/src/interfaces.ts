/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { IIconButtonProps } from './controls/iconButton';
import { SandDance } from '@msrvida/sanddance-react';
import { SnapshotEditorProps } from './dialogs/snapshotEditor';
import { SnapshotListProps } from './dialogs/snapshots';

export type DataFileType = SandDance.types.DataFileType;
export type DataFile = SandDance.types.DataFile;
export type DataContent = SandDance.types.DataContent;
export type DataExportType = SandDance.types.DataFileType | 'html';

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

export type DateWithSource = SandDance.types.DateWithSource;

export interface SettingsGroup {
  groupLabel: string;
  children: React.ReactNode;
}

export enum SideTabId {
  ChartType, Data, Search, Color, Snapshots, History, Transition, Settings, Pin, Collapse,
}

export interface ChangeColumnMappingOptions {
  scheme?: string;
  facetStyle?: SandDance.specs.FacetStyle;
  totalStyle?: SandDance.specs.TotalStyle;
}

export type DataExtent = 'max' | 'min';

export interface BackgroundImageColumnBound {
  columnName: string;
  dimension: SandDance.types.Dimension2D;
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
