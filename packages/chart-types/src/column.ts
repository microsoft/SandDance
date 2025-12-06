/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { TypeInference } from 'vega-typings';
import { ColumnStats } from './stats';

/**
 * Column information.
 */
export interface Column {

    /**
     * Name of the column.
     */
    name: string;

    /**
     * Type of data in the column.
     */
    type: TypeInference;

    /**
     * Optional flag to specify if the column data is quantitative.
     */
    quantitative?: boolean;

    /**
    * Optional flag to specify if the column data is CSS colors.
    */
    isColorData?: boolean;

    /**
     * Optional stats object with metadata of column data content.
     */
    stats?: ColumnStats;
}

export interface ColumnTypeMap {
    [columnName: string]: TypeInference
}
