// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { FieldNames } from './constants';
import { GL_ORDINAL } from './vega-deck.gl/constants';

export { getColumnsFromData, inferAll } from './specs/inference';
export { ensureSearchExpressionGroupArray } from './searchExpression/group';
export { getPresenterStyle } from './defaults';

export function isInternalFieldName(columnName: string, includeVegaDeckGLFields = false) {
    if (includeVegaDeckGLFields) {
        if (columnName === GL_ORDINAL) return true;
    }
    for (let f in FieldNames) {
        if (columnName === FieldNames[f]) return true;
    }
    return false;
}
