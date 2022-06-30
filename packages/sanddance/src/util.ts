// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { FieldNames, GL_ORDINAL } from './constants';

export { getColumnsFromData, getStats, inferAll } from '@msrvida/sanddance-specs';
export { getPresenterStyle } from './defaults';

export function isInternalFieldName(columnName: string, includeVegaDeckGLFields = false) {
    if (includeVegaDeckGLFields) {
        if (columnName === GL_ORDINAL) return true;
    }
    for (const f in FieldNames) {
        if (columnName === FieldNames[f]) return true;
    }
    return false;
}
