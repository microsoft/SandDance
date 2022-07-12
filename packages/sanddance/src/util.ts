/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { FieldNames, GL_ORDINAL } from './constants';

export { getColumnsFromData, getStats, inferAll } from '@msrvida/sanddance-specs';
export { getPresenterStyle } from './defaults';

export function isInternalFieldName(columnName: string, includeVegaMorphChartsFields = false) {
    if (includeVegaMorphChartsFields) {
        if (columnName === GL_ORDINAL) return true;
    }
    for (const f in FieldNames) {
        if (columnName === FieldNames[f]) return true;
    }
    return false;
}
