// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { DataFile, SandDance, Snapshot } from "@msrvida/sanddance-explorer";

import types = SandDance.types;

export type DataSourceType = 'sample' | 'local' | 'url';

export interface DataSource extends DataFile {
  dataSourceType: DataSourceType;
  displayName: string;
  id: string;
}

export interface InsightMap {
  [id: string]: types.Insight;
}

export interface DataSourceSnapshot extends Snapshot {
  dataSource: DataSource;
}
