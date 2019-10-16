// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export function convertToDelimited(data: object[], delimiter?: string) {
    var fields = Object.keys(data[0]);
    var file = data.map(row => {
        return fields.map(fieldName => {
            const value: any = row[fieldName];
            if (typeof value === 'number') {
                return value;
            }
            if (typeof value === 'string') {
                if (value.indexOf(delimiter) >= 0) {
                    return `"${value.replace(/"/g, '""')}"`;
                } else {
                    return value;
                }
            }
            return '';
        }).join(delimiter);
    });
    file.unshift(fields.join(delimiter));
    return (file.join('\n'));
}
