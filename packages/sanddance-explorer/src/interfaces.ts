// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Color } from '@deck.gl/core/utils/color';
import { IconButtonProps } from './controls/iconButton';
import { SandDance } from '@msrvida/sanddance-react';

export type DataFileType = 'json' | 'csv' | 'tsv' | 'topojson';

export interface DataFile {
  displayName?: string;
  dataUrl?: string;
  rawText?: string;
  type: DataFileType;
}

export interface DataContent {
  data: object[];
  columns: SandDance.types.Column[];
}

export type DataExportType = DataFileType | 'html';

export interface DataExportHandler {
  (data: any, datatype: DataExportType, displayName: string): void;
}

export interface Snapshot {
  description: string;
  insight: SandDance.types.Insight;
  image: string;
  bgColor: string;
}

export interface SnapshotAction {
  element?: JSX.Element;
  iconButtonProps?: IconButtonProps;
}

export interface ColorSettings extends SandDance.types.ColorSettings {
  clickableText?: Color;
  clickableTextHighlight?: Color;
}

export interface ViewerOptions extends SandDance.types.ViewerOptions {
  colors: ColorSettings;
}

export interface DateWithSource extends Date {
  input?: string;
}
