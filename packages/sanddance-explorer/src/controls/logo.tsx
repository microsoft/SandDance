/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';

const s = `
 ......
.......
...
......
 ......
    ...
.......
......
`;

const d = s.split('\n').map((row, irow) =>
    row.length
        ? row.split('').map((char, icol) =>
            char.trim()
                ? `M${2 * icol + 1} ${2 * (irow - 1) + 1} v1 h1 v-1 Z`
                : '',
        ).join(' ')
        : '',
).join('\n');

export function Logo() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d={d} />
        </svg>
    );
}
