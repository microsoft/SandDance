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
                    <stop offset="0%" stopColor="#6e40aa"></stop>
                    <stop offset="10%" stopColor="#bf3caf"></stop>
                    <stop offset="20%" stopColor="#fe4b83"></stop>
                    <stop offset="30%" stopColor="#ff7847"></stop>
                    <stop offset="40%" stopColor="#e2b72f"></stop>
                    <stop offset="50%" stopColor="#aff05b"></stop>
                    <stop offset="60%" stopColor="#52f667"></stop>
                    <stop offset="70%" stopColor="#1ddfa3"></stop>
                    <stop offset="80%" stopColor="#23abd8"></stop>
                    <stop offset="90%" stopColor="#4c6edb"></stop>
                    <stop offset="100%" stopColor="#6e40aa"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-rainbow)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['sinebow'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-sinebow">
                    <stop offset="0%" stopColor="#ff4040"></stop>
                    <stop offset="10%" stopColor="#e78d0b"></stop>
                    <stop offset="20%" stopColor="#a7d503"></stop>
                    <stop offset="30%" stopColor="#58fc2a"></stop>
                    <stop offset="40%" stopColor="#18f472"></stop>
                    <stop offset="50%" stopColor="#00bfbf"></stop>
                    <stop offset="60%" stopColor="#1872f4"></stop>
                    <stop offset="70%" stopColor="#582afc"></stop>
                    <stop offset="80%" stopColor="#a703d5"></stop>
                    <stop offset="90%" stopColor="#e70b8d"></stop>
                    <stop offset="100%" stopColor="#ff4040"></stop>
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
