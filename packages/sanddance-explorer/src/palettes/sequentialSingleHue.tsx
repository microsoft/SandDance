/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { schemeOption, schemesJSX } from './scheme';

let loaded = false;

function load() {
    schemesJSX['blues'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-blues">
                    <stop offset="0%" stopColor="rgb(247, 251, 255)"></stop>
                    <stop offset="10%" stopColor="rgb(227, 238, 249)"></stop>
                    <stop offset="20%" stopColor="rgb(207, 225, 242)"></stop>
                    <stop offset="30%" stopColor="rgb(181, 212, 233)"></stop>
                    <stop offset="40%" stopColor="rgb(147, 195, 223)"></stop>
                    <stop offset="50%" stopColor="rgb(109, 174, 213)"></stop>
                    <stop offset="60%" stopColor="rgb(75, 151, 201)"></stop>
                    <stop offset="70%" stopColor="rgb(47, 126, 188)"></stop>
                    <stop offset="80%" stopColor="rgb(24, 100, 170)"></stop>
                    <stop offset="90%" stopColor="rgb(10, 74, 144)"></stop>
                    <stop offset="100%" stopColor="rgb(8, 48, 107)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-blues)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['tealblues'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-tealblues">
                    <stop offset="0%" stop-color="#bce4d8"></stop>
                    <stop offset="10%" stop-color="#a3d6d2"></stop>
                    <stop offset="20%" stop-color="#8cc9cd"></stop>
                    <stop offset="30%" stop-color="#76bdc7"></stop>
                    <stop offset="40%" stop-color="#5fb0c0"></stop>
                    <stop offset="50%" stop-color="#45a2b9"></stop>
                    <stop offset="60%" stop-color="#3993b0"></stop>
                    <stop offset="70%" stop-color="#3584a6"></stop>
                    <stop offset="80%" stop-color="#32759b"></stop>
                    <stop offset="90%" stop-color="#2f6790"></stop>
                    <stop offset="100%" stop-color="#2c5985"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-tealblues)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['teals'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-teals">
                    <stop offset="0%" stop-color="#bbdfdf"></stop>
                    <stop offset="10%" stop-color="#a2d4d5"></stop>
                    <stop offset="20%" stop-color="#8ac9c9"></stop>
                    <stop offset="30%" stop-color="#75bcbb"></stop>
                    <stop offset="40%" stop-color="#61b0af"></stop>
                    <stop offset="50%" stop-color="#4da5a4"></stop>
                    <stop offset="60%" stop-color="#379998"></stop>
                    <stop offset="70%" stop-color="#2b8b8c"></stop>
                    <stop offset="80%" stop-color="#1e7f7f"></stop>
                    <stop offset="90%" stop-color="#127273"></stop>
                    <stop offset="100%" stop-color="#006667"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-teals)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['greens'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-greens">
                    <stop offset="0%" stopColor="rgb(247, 252, 245)"></stop>
                    <stop offset="10%" stopColor="rgb(232, 246, 227)"></stop>
                    <stop offset="20%" stopColor="rgb(211, 238, 205)"></stop>
                    <stop offset="30%" stopColor="rgb(183, 226, 177)"></stop>
                    <stop offset="40%" stopColor="rgb(151, 212, 148)"></stop>
                    <stop offset="50%" stopColor="rgb(115, 195, 120)"></stop>
                    <stop offset="60%" stopColor="rgb(77, 175, 98)"></stop>
                    <stop offset="70%" stopColor="rgb(47, 152, 79)"></stop>
                    <stop offset="80%" stopColor="rgb(21, 127, 59)"></stop>
                    <stop offset="90%" stopColor="rgb(3, 100, 41)"></stop>
                    <stop offset="100%" stopColor="rgb(0, 68, 27)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-greens)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['greys'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-greys">
                    <stop offset="0%" stopColor="rgb(255, 255, 255)"></stop>
                    <stop offset="10%" stopColor="rgb(242, 242, 242)"></stop>
                    <stop offset="20%" stopColor="rgb(226, 226, 226)"></stop>
                    <stop offset="30%" stopColor="rgb(206, 206, 206)"></stop>
                    <stop offset="40%" stopColor="rgb(180, 180, 180)"></stop>
                    <stop offset="50%" stopColor="rgb(151, 151, 151)"></stop>
                    <stop offset="60%" stopColor="rgb(122, 122, 122)"></stop>
                    <stop offset="70%" stopColor="rgb(95, 95, 95)"></stop>
                    <stop offset="80%" stopColor="rgb(64, 64, 64)"></stop>
                    <stop offset="90%" stopColor="rgb(30, 30, 30)"></stop>
                    <stop offset="100%" stopColor="rgb(0, 0, 0)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-greys)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['purples'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-purples">
                    <stop offset="0%" stopColor="rgb(252, 251, 253)"></stop>
                    <stop offset="10%" stopColor="rgb(241, 239, 246)"></stop>
                    <stop offset="20%" stopColor="rgb(226, 225, 239)"></stop>
                    <stop offset="30%" stopColor="rgb(206, 206, 229)"></stop>
                    <stop offset="40%" stopColor="rgb(182, 181, 216)"></stop>
                    <stop offset="50%" stopColor="rgb(158, 155, 201)"></stop>
                    <stop offset="60%" stopColor="rgb(135, 130, 188)"></stop>
                    <stop offset="70%" stopColor="rgb(115, 99, 172)"></stop>
                    <stop offset="80%" stopColor="rgb(97, 64, 155)"></stop>
                    <stop offset="90%" stopColor="rgb(80, 31, 140)"></stop>
                    <stop offset="100%" stopColor="rgb(63, 0, 125)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-purples)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['browns'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-browns">
                    <stop offset="0%" stop-color="#eedbbd"></stop>
                    <stop offset="10%" stop-color="#ecca96"></stop>
                    <stop offset="20%" stop-color="#e9b97a"></stop>
                    <stop offset="30%" stop-color="#e4a865"></stop>
                    <stop offset="40%" stop-color="#dc9856"></stop>
                    <stop offset="50%" stop-color="#d18954"></stop>
                    <stop offset="60%" stop-color="#c7784c"></stop>
                    <stop offset="70%" stop-color="#c0673f"></stop>
                    <stop offset="80%" stop-color="#b85536"></stop>
                    <stop offset="90%" stop-color="#ad4433"></stop>
                    <stop offset="100%" stop-color="#9f3632"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-browns)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['reds'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-reds">
                    <stop offset="0%" stopColor="rgb(255, 245, 240)"></stop>
                    <stop offset="10%" stopColor="rgb(254, 227, 214)"></stop>
                    <stop offset="20%" stopColor="rgb(253, 201, 180)"></stop>
                    <stop offset="30%" stopColor="rgb(252, 170, 142)"></stop>
                    <stop offset="40%" stopColor="rgb(252, 138, 107)"></stop>
                    <stop offset="50%" stopColor="rgb(249, 105, 76)"></stop>
                    <stop offset="60%" stopColor="rgb(239, 69, 51)"></stop>
                    <stop offset="70%" stopColor="rgb(217, 39, 35)"></stop>
                    <stop offset="80%" stopColor="rgb(187, 21, 26)"></stop>
                    <stop offset="90%" stopColor="rgb(151, 11, 19)"></stop>
                    <stop offset="100%" stopColor="rgb(103, 0, 13)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-reds)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['oranges'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-oranges">
                    <stop offset="0%" stopColor="rgb(255, 245, 235)"></stop>
                    <stop offset="10%" stopColor="rgb(254, 232, 211)"></stop>
                    <stop offset="20%" stopColor="rgb(253, 216, 179)"></stop>
                    <stop offset="30%" stopColor="rgb(253, 194, 140)"></stop>
                    <stop offset="40%" stopColor="rgb(253, 167, 98)"></stop>
                    <stop offset="50%" stopColor="rgb(251, 141, 61)"></stop>
                    <stop offset="60%" stopColor="rgb(242, 112, 29)"></stop>
                    <stop offset="70%" stopColor="rgb(226, 86, 9)"></stop>
                    <stop offset="80%" stopColor="rgb(196, 65, 3)"></stop>
                    <stop offset="90%" stopColor="rgb(159, 51, 3)"></stop>
                    <stop offset="100%" stopColor="rgb(127, 39, 4)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-oranges)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['warmgreys'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-warmgreys">
                    <stop offset="0%" stop-color="#dcd4d0"></stop>
                    <stop offset="10%" stop-color="#cec5c1"></stop>
                    <stop offset="20%" stop-color="#c0b8b4"></stop>
                    <stop offset="30%" stop-color="#b3aaa7"></stop>
                    <stop offset="40%" stop-color="#a59c99"></stop>
                    <stop offset="50%" stop-color="#98908c"></stop>
                    <stop offset="60%" stop-color="#8b827f"></stop>
                    <stop offset="70%" stop-color="#7e7673"></stop>
                    <stop offset="80%" stop-color="#726866"></stop>
                    <stop offset="90%" stop-color="#665c5a"></stop>
                    <stop offset="100%" stop-color="#59504e"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-warmgreys)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    loaded = true;
}
export function sequentialSingleHue(selected: string) {
    if (!loaded) load();
    return [
        schemeOption(selected, 'blues'),
        schemeOption(selected, 'tealblues'),
        schemeOption(selected, 'teals'),
        schemeOption(selected, 'greens'),
        schemeOption(selected, 'browns'),
        schemeOption(selected, 'oranges'),
        schemeOption(selected, 'reds'),
        schemeOption(selected, 'purples'),
        schemeOption(selected, 'warmgreys'),
        schemeOption(selected, 'greys'),
    ];
}
