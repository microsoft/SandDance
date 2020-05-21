// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as compare from 'just-compare';

export const classList = (...args: Array<string | boolean>) => {
    return args.filter(Boolean).join(' ');
};

const deepCompare = (compare.default || compare) as <T>(a: T, b: T) => boolean;

export { deepCompare };
