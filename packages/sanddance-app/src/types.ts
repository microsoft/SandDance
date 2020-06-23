// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { DataFile, SandDance } from '@msrvida/sanddance-explorer';

export type DataSourceType = 'sample' | 'local' | 'url';

export interface DataSource extends DataFile {
  dataSourceType: DataSourceType;
  id: string;
}

export interface InsightMap {
  [id: string]: SandDance.specs.Insight;
}

export interface DataSourceSnapshot extends SandDance.types.Snapshot {
  dataSource: DataSource;
}
