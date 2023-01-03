/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { schemeOption, schemesJSX } from './scheme';

let loaded = false;

function load() {
    schemesJSX['rainbow'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-rainbow">
                    <stop offset="0%" stop-color="#6e40aa"></stop>
                    <stop offset="10%" stop-color="#bf3caf"></stop>
                    <stop offset="20%" stop-color="#fe4b83"></stop>
                    <stop offset="30%" stop-color="#ff7847"></stop>
                    <stop offset="40%" stop-color="#e2b72f"></stop>
                    <stop offset="50%" stop-color="#aff05b"></stop>
                    <stop offset="60%" stop-color="#52f667"></stop>
                    <stop offset="70%" stop-color="#1ddfa3"></stop>
                    <stop offset="80%" stop-color="#23abd8"></stop>
                    <stop offset="90%" stop-color="#4c6edb"></stop>
                    <stop offset="100%" stop-color="#6e40aa"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-rainbow)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['sinebow'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-sinebow">
                    <stop offset="0%" stop-color="#ff4040"></stop>
                    <stop offset="10%" stop-color="#e78d0b"></stop>
                    <stop offset="20%" stop-color="#a7d503"></stop>
                    <stop offset="30%" stop-color="#58fc2a"></stop>
                    <stop offset="40%" stop-color="#18f472"></stop>
                    <stop offset="50%" stop-color="#00bfbf"></stop>
                    <stop offset="60%" stop-color="#1872f4"></stop>
                    <stop offset="70%" stop-color="#582afc"></stop>
                    <stop offset="80%" stop-color="#a703d5"></stop>
                    <stop offset="90%" stop-color="#e70b8d"></stop>
                    <stop offset="100%" stop-color="#ff4040"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-sinebow)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    loaded = true;
}

export function cyclical(selected: string) {
    if (!loaded) load();
    return [
        schemeOption(selected, 'rainbow'),
        schemeOption(selected, 'sinebow'),
    ];
}
