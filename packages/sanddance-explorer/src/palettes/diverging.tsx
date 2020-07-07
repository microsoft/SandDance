// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { schemeOption, schemesJSX } from './scheme';

let loaded = false;

function load() {
    schemesJSX['blueorange'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-blueorange">
                    <stop offset="0%" stopColor="rgb(5, 48, 97)"></stop>
                    <stop offset="10%" stopColor="rgb(34, 101, 163)"></stop>
                    <stop offset="20%" stopColor="rgb(75, 148, 196)"></stop>
                    <stop offset="30%" stopColor="rgb(143, 194, 221)"></stop>
                    <stop offset="40%" stopColor="rgb(205, 227, 238)"></stop>
                    <stop offset="50%" stopColor="rgb(242, 240, 235)"></stop>
                    <stop offset="60%" stopColor="rgb(253, 221, 179)"></stop>
                    <stop offset="70%" stopColor="rgb(248, 182, 100)"></stop>
                    <stop offset="80%" stopColor="rgb(221, 132, 31)"></stop>
                    <stop offset="90%" stopColor="rgb(178, 90, 9)"></stop>
                    <stop offset="100%" stopColor="rgb(127, 59, 8)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-blueorange)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['brownbluegreen'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-brownbluegreen">
                    <stop offset="0%" stopColor="rgb(84, 48, 5)"></stop>
                    <stop offset="10%" stopColor="rgb(139, 84, 15)"></stop>
                    <stop offset="20%" stopColor="rgb(188, 132, 53)"></stop>
                    <stop offset="30%" stopColor="rgb(222, 190, 123)"></stop>
                    <stop offset="40%" stopColor="rgb(242, 228, 192)"></stop>
                    <stop offset="50%" stopColor="rgb(238, 241, 234)"></stop>
                    <stop offset="60%" stopColor="rgb(195, 231, 226)"></stop>
                    <stop offset="70%" stopColor="rgb(127, 201, 191)"></stop>
                    <stop offset="80%" stopColor="rgb(57, 152, 143)"></stop>
                    <stop offset="90%" stopColor="rgb(10, 103, 95)"></stop>
                    <stop offset="100%" stopColor="rgb(0, 60, 48)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-brownbluegreen)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['purplegreen'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-purplegreen">
                    <stop offset="0%" stopColor="rgb(64, 0, 75)"></stop>
                    <stop offset="10%" stopColor="rgb(115, 47, 128)"></stop>
                    <stop offset="20%" stopColor="rgb(154, 109, 170)"></stop>
                    <stop offset="30%" stopColor="rgb(193, 164, 205)"></stop>
                    <stop offset="40%" stopColor="rgb(228, 210, 230)"></stop>
                    <stop offset="50%" stopColor="rgb(239, 240, 239)"></stop>
                    <stop offset="60%" stopColor="rgb(214, 238, 209)"></stop>
                    <stop offset="70%" stopColor="rgb(162, 215, 158)"></stop>
                    <stop offset="80%" stopColor="rgb(92, 173, 101)"></stop>
                    <stop offset="90%" stopColor="rgb(33, 120, 57)"></stop>
                    <stop offset="100%" stopColor="rgb(0, 68, 27)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-purplegreen)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['pinkyellowgreen'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-pinkyellowgreen">
                    <stop offset="0%" stopColor="rgb(142, 1, 82)"></stop>
                    <stop offset="10%" stopColor="rgb(192, 38, 126)"></stop>
                    <stop offset="20%" stopColor="rgb(221, 114, 173)"></stop>
                    <stop offset="30%" stopColor="rgb(240, 179, 214)"></stop>
                    <stop offset="40%" stopColor="rgb(250, 221, 237)"></stop>
                    <stop offset="50%" stopColor="rgb(245, 243, 239)"></stop>
                    <stop offset="60%" stopColor="rgb(225, 242, 202)"></stop>
                    <stop offset="70%" stopColor="rgb(182, 222, 135)"></stop>
                    <stop offset="80%" stopColor="rgb(128, 187, 71)"></stop>
                    <stop offset="90%" stopColor="rgb(79, 145, 37)"></stop>
                    <stop offset="100%" stopColor="rgb(39, 100, 25)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-pinkyellowgreen)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['purpleorange'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-purpleorange">
                    <stop offset="0%" stopColor="rgb(45, 0, 75)"></stop>
                    <stop offset="10%" stopColor="rgb(85, 45, 132)"></stop>
                    <stop offset="20%" stopColor="rgb(129, 112, 172)"></stop>
                    <stop offset="30%" stopColor="rgb(176, 170, 208)"></stop>
                    <stop offset="40%" stopColor="rgb(215, 215, 233)"></stop>
                    <stop offset="50%" stopColor="rgb(243, 238, 234)"></stop>
                    <stop offset="60%" stopColor="rgb(253, 221, 179)"></stop>
                    <stop offset="70%" stopColor="rgb(248, 182, 100)"></stop>
                    <stop offset="80%" stopColor="rgb(221, 132, 31)"></stop>
                    <stop offset="90%" stopColor="rgb(178, 90, 9)"></stop>
                    <stop offset="100%" stopColor="rgb(127, 59, 8)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-purpleorange)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['redblue'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-redblue">
                    <stop offset="0%" stopColor="rgb(103, 0, 31)"></stop>
                    <stop offset="10%" stopColor="rgb(172, 32, 47)"></stop>
                    <stop offset="20%" stopColor="rgb(213, 96, 80)"></stop>
                    <stop offset="30%" stopColor="rgb(241, 163, 133)"></stop>
                    <stop offset="40%" stopColor="rgb(251, 215, 196)"></stop>
                    <stop offset="50%" stopColor="rgb(242, 239, 238)"></stop>
                    <stop offset="60%" stopColor="rgb(205, 227, 238)"></stop>
                    <stop offset="70%" stopColor="rgb(143, 194, 221)"></stop>
                    <stop offset="80%" stopColor="rgb(75, 148, 196)"></stop>
                    <stop offset="90%" stopColor="rgb(34, 101, 163)"></stop>
                    <stop offset="100%" stopColor="rgb(5, 48, 97)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-redblue)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['redgrey'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-redgrey">
                    <stop offset="0%" stopColor="rgb(103, 0, 31)"></stop>
                    <stop offset="10%" stopColor="rgb(172, 32, 47)"></stop>
                    <stop offset="20%" stopColor="rgb(213, 96, 80)"></stop>
                    <stop offset="30%" stopColor="rgb(241, 163, 133)"></stop>
                    <stop offset="40%" stopColor="rgb(252, 216, 197)"></stop>
                    <stop offset="50%" stopColor="rgb(250, 244, 241)"></stop>
                    <stop offset="60%" stopColor="rgb(223, 223, 223)"></stop>
                    <stop offset="70%" stopColor="rgb(184, 184, 184)"></stop>
                    <stop offset="80%" stopColor="rgb(134, 134, 134)"></stop>
                    <stop offset="90%" stopColor="rgb(78, 78, 78)"></stop>
                    <stop offset="100%" stopColor="rgb(26, 26, 26)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-redgrey)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['redyellowblue'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-redyellowblue">
                    <stop offset="0%" stopColor="rgb(165, 0, 38)"></stop>
                    <stop offset="10%" stopColor="rgb(212, 50, 44)"></stop>
                    <stop offset="20%" stopColor="rgb(241, 110, 67)"></stop>
                    <stop offset="30%" stopColor="rgb(252, 172, 100)"></stop>
                    <stop offset="40%" stopColor="rgb(254, 221, 144)"></stop>
                    <stop offset="50%" stopColor="rgb(250, 248, 193)"></stop>
                    <stop offset="60%" stopColor="rgb(220, 241, 236)"></stop>
                    <stop offset="70%" stopColor="rgb(171, 214, 232)"></stop>
                    <stop offset="80%" stopColor="rgb(117, 171, 208)"></stop>
                    <stop offset="90%" stopColor="rgb(74, 116, 180)"></stop>
                    <stop offset="100%" stopColor="rgb(49, 54, 149)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-redyellowblue)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['redyellowgreen'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-redyellowgreen">
                    <stop offset="0%" stopColor="rgb(165, 0, 38)"></stop>
                    <stop offset="10%" stopColor="rgb(212, 50, 44)"></stop>
                    <stop offset="20%" stopColor="rgb(241, 110, 67)"></stop>
                    <stop offset="30%" stopColor="rgb(252, 172, 99)"></stop>
                    <stop offset="40%" stopColor="rgb(254, 221, 141)"></stop>
                    <stop offset="50%" stopColor="rgb(249, 247, 174)"></stop>
                    <stop offset="60%" stopColor="rgb(215, 238, 142)"></stop>
                    <stop offset="70%" stopColor="rgb(164, 216, 110)"></stop>
                    <stop offset="80%" stopColor="rgb(100, 188, 97)"></stop>
                    <stop offset="90%" stopColor="rgb(34, 150, 79)"></stop>
                    <stop offset="100%" stopColor="rgb(0, 104, 55)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-redyellowgreen)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['spectral'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-spectral">
                    <stop offset="0%" stopColor="rgb(158, 1, 66)"></stop>
                    <stop offset="10%" stopColor="rgb(209, 60, 75)"></stop>
                    <stop offset="20%" stopColor="rgb(240, 112, 74)"></stop>
                    <stop offset="30%" stopColor="rgb(252, 172, 99)"></stop>
                    <stop offset="40%" stopColor="rgb(254, 221, 141)"></stop>
                    <stop offset="50%" stopColor="rgb(251, 248, 176)"></stop>
                    <stop offset="60%" stopColor="rgb(224, 243, 161)"></stop>
                    <stop offset="70%" stopColor="rgb(169, 221, 162)"></stop>
                    <stop offset="80%" stopColor="rgb(105, 189, 169)"></stop>
                    <stop offset="90%" stopColor="rgb(66, 136, 181)"></stop>
                    <stop offset="100%" stopColor="rgb(94, 79, 162)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-spectral)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    loaded = true;
}

export function diverging(selected: string) {
    if (!loaded) load();
    return [
        schemeOption(selected, 'blueorange'),
        schemeOption(selected, 'brownbluegreen'),
        schemeOption(selected, 'purplegreen'),
        schemeOption(selected, 'pinkyellowgreen'),
        schemeOption(selected, 'purpleorange'),
        schemeOption(selected, 'redblue'),
        schemeOption(selected, 'redgrey'),
        schemeOption(selected, 'redyellowblue'),
        schemeOption(selected, 'redyellowgreen'),
        schemeOption(selected, 'spectral')
    ];
}
