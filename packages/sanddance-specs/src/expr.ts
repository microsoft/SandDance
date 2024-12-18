/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

/**
 * Make sure that the field name is accessible via Vega's Field type
 * https://vega.github.io/vega/docs/types/#Field 
 * examples: "source.x", "target['x']", "[my.field]"
 */
export function safeFieldName(field: string) {
    return field
        .replace(/\\/g, '\\\\') //escape backslashes
        .replace(/'/g, '\\\'')  //escape single quotes
        .replace(/"/g, '\\"')   //escape double quotes
        .replace(/\./g, '\\.')  //escape periods
        .replace(/\[/g, '\\[')  //escape left square brackets
        .replace(/\]/g, '\\]')  //escape right square brackets
    ;
}

/**
 * Make sure the field name is usable in a Vega expression
 */
export function exprSafeFieldName(field: string) {
    //remove whitespace, period, accessors and logical modifiers
    return field.replace(/[.,:;+=\-/<>{}|~!@#$%^*[\]`'"()?\s\\]/g, '');
}
