// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SandDance } from '@msrvida/sanddance-react';
import { IconButtonProps } from './controls/iconButton';

export type DataFileType = 'json' | 'csv' | 'tsv' | 'topojson';

export interface DataFile {
  dataUrl?: string;
  rawText?: string;
  type: DataFileType;
}

export interface DataContent {
  data: object[];
  columns: SandDance.types.Column[];
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
