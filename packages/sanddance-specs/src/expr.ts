// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

/**
 * Make sure that the field name is accessible via Vega's Field type
 * https://vega.github.io/vega/docs/types/#Field 
 * examples: "source.x", "target['x']", "[my.field]"
 */
export function safeFieldName(field: string) {
    return field.replace('.', '\\.').replace('[', '\\[').replace(']', '\\]');
}

/**
 * Make sure the field name is usable in a Vega expression
 */
export function exprSafeFieldName(field: string) {
    //remove whitespace, period, accessors and logical modifiers
    return field.replace(/[.,:;+=\-/<>{}|~!@#$%^*[\]`'"()?\s\\]/g, '');
}
