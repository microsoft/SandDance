// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { strings } from './language';

export function invalidUrlError(url: string) {
    if (!url) {
        return strings.errorNoUrl;
    }
    if (url.toLocaleLowerCase().substr(0, 4) !== 'http') {
        return strings.errorUrlHttp;
    }
}
