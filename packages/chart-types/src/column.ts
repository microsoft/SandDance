/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { TypeInference } from 'vega-typings';

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

/**
 * Metadata about a column.
 */
export interface ColumnStats {

    /***
     * Number of non-null values in this column.
     */
    nonNull: number;

    /**
     * Number of unique values in this column.
     */
    distinctValueCount: number;

    /**
     * Maximum value of data in this column, if column is numeric.
     */
    max?: number;

    /**
     * Mean value of data in this column, if column is numeric.
     */
    mean?: number;

    /**
     * Minimum value of data in this column, if column is numeric.
     */
    min?: number;

    /**
     * Optional flag to specify if the column data is sequential.
     */
    isSequential?: boolean;

    /**
     * Optional flag to specify if the column data contains negative numbers.
     */
    hasNegative?: boolean;

    /**
     * Optional flag to specify if the column data contains color data.
     */
    hasColorData?: boolean;

}

export interface ColumnTypeMap {
    [columnName: string]: TypeInference
}
