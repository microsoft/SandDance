// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { schemeOption, schemesJSX } from './scheme';

let loaded = false;

function load() {
    schemesJSX['viridis'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-viridis">
                    <stop offset="0%" stopColor="#440154"></stop>
                    <stop offset="10%" stopColor="#482475"></stop>
                    <stop offset="20%" stopColor="#414487"></stop>
                    <stop offset="30%" stopColor="#355f8d"></stop>
                    <stop offset="40%" stopColor="#2a788e"></stop>
                    <stop offset="50%" stopColor="#21918c"></stop>
                    <stop offset="60%" stopColor="#22a884"></stop>
                    <stop offset="70%" stopColor="#44bf70"></stop>
                    <stop offset="80%" stopColor="#7ad151"></stop>
                    <stop offset="90%" stopColor="#bddf26"></stop>
                    <stop offset="100%" stopColor="#fde725"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-viridis)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['inferno'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-inferno">
                    <stop offset="0%" stopColor="#000004"></stop>
                    <stop offset="10%" stopColor="#160b39"></stop>
                    <stop offset="20%" stopColor="#420a68"></stop>
                    <stop offset="30%" stopColor="#6a176e"></stop>
                    <stop offset="40%" stopColor="#932667"></stop>
                    <stop offset="50%" stopColor="#bc3754"></stop>
                    <stop offset="60%" stopColor="#dd513a"></stop>
                    <stop offset="70%" stopColor="#f37819"></stop>
                    <stop offset="80%" stopColor="#fca50a"></stop>
                    <stop offset="90%" stopColor="#f6d746"></stop>
                    <stop offset="100%" stopColor="#fcffa4"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-inferno)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['magma'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-magma">
                    <stop offset="0%" stopColor="#000004"></stop>
                    <stop offset="10%" stopColor="#140e36"></stop>
                    <stop offset="20%" stopColor="#3b0f70"></stop>
                    <stop offset="30%" stopColor="#641a80"></stop>
                    <stop offset="40%" stopColor="#8c2981"></stop>
                    <stop offset="50%" stopColor="#b73779"></stop>
                    <stop offset="60%" stopColor="#de4968"></stop>
                    <stop offset="70%" stopColor="#f7705c"></stop>
                    <stop offset="80%" stopColor="#fe9f6d"></stop>
                    <stop offset="90%" stopColor="#fecf92"></stop>
                    <stop offset="100%" stopColor="#fcfdbf"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-magma)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['plasma'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-plasma">
                    <stop offset="0%" stopColor="#0d0887"></stop>
                    <stop offset="10%" stopColor="#41049d"></stop>
                    <stop offset="20%" stopColor="#6a00a8"></stop>
                    <stop offset="30%" stopColor="#8f0da4"></stop>
                    <stop offset="40%" stopColor="#b12a90"></stop>
                    <stop offset="50%" stopColor="#cc4778"></stop>
                    <stop offset="60%" stopColor="#e16462"></stop>
                    <stop offset="70%" stopColor="#f2844b"></stop>
                    <stop offset="80%" stopColor="#fca636"></stop>
                    <stop offset="90%" stopColor="#fcce25"></stop>
                    <stop offset="100%" stopColor="#f0f921"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-plasma)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['bluegreen'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-bluegreen">
                    <stop offset="0%" stopColor="rgb(247, 252, 253)"></stop>
                    <stop offset="10%" stopColor="rgb(232, 246, 249)"></stop>
                    <stop offset="20%" stopColor="rgb(213, 239, 237)"></stop>
                    <stop offset="30%" stopColor="rgb(183, 228, 218)"></stop>
                    <stop offset="40%" stopColor="rgb(143, 211, 193)"></stop>
                    <stop offset="50%" stopColor="rgb(104, 194, 163)"></stop>
                    <stop offset="60%" stopColor="rgb(73, 177, 127)"></stop>
                    <stop offset="70%" stopColor="rgb(47, 153, 89)"></stop>
                    <stop offset="80%" stopColor="rgb(21, 127, 60)"></stop>
                    <stop offset="90%" stopColor="rgb(3, 100, 41)"></stop>
                    <stop offset="100%" stopColor="rgb(0, 68, 27)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-bluegreen)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['bluepurple'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-bluepurple">
                    <stop offset="0%" stopColor="rgb(247, 252, 253)"></stop>
                    <stop offset="10%" stopColor="rgb(228, 238, 245)"></stop>
                    <stop offset="20%" stopColor="rgb(204, 221, 236)"></stop>
                    <stop offset="30%" stopColor="rgb(178, 202, 225)"></stop>
                    <stop offset="40%" stopColor="rgb(156, 179, 213)"></stop>
                    <stop offset="50%" stopColor="rgb(143, 149, 198)"></stop>
                    <stop offset="60%" stopColor="rgb(140, 116, 181)"></stop>
                    <stop offset="70%" stopColor="rgb(137, 82, 165)"></stop>
                    <stop offset="80%" stopColor="rgb(133, 45, 143)"></stop>
                    <stop offset="90%" stopColor="rgb(115, 15, 113)"></stop>
                    <stop offset="100%" stopColor="rgb(77, 0, 75)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-bluepurple)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['greenblue'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-greenblue">
                    <stop offset="0%" stopColor="rgb(247, 252, 240)"></stop>
                    <stop offset="10%" stopColor="rgb(229, 245, 223)"></stop>
                    <stop offset="20%" stopColor="rgb(211, 238, 206)"></stop>
                    <stop offset="30%" stopColor="rgb(189, 229, 191)"></stop>
                    <stop offset="40%" stopColor="rgb(158, 217, 187)"></stop>
                    <stop offset="50%" stopColor="rgb(123, 203, 196)"></stop>
                    <stop offset="60%" stopColor="rgb(88, 183, 205)"></stop>
                    <stop offset="70%" stopColor="rgb(57, 156, 198)"></stop>
                    <stop offset="80%" stopColor="rgb(29, 126, 183)"></stop>
                    <stop offset="90%" stopColor="rgb(11, 96, 161)"></stop>
                    <stop offset="100%" stopColor="rgb(8, 64, 129)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-greenblue)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['orangered'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-orangered">
                    <stop offset="0%" stopColor="rgb(255, 247, 236)"></stop>
                    <stop offset="10%" stopColor="rgb(254, 235, 207)"></stop>
                    <stop offset="20%" stopColor="rgb(253, 220, 175)"></stop>
                    <stop offset="30%" stopColor="rgb(253, 202, 148)"></stop>
                    <stop offset="40%" stopColor="rgb(253, 176, 122)"></stop>
                    <stop offset="50%" stopColor="rgb(250, 142, 93)"></stop>
                    <stop offset="60%" stopColor="rgb(241, 108, 73)"></stop>
                    <stop offset="70%" stopColor="rgb(224, 69, 48)"></stop>
                    <stop offset="80%" stopColor="rgb(200, 29, 19)"></stop>
                    <stop offset="90%" stopColor="rgb(167, 4, 3)"></stop>
                    <stop offset="100%" stopColor="rgb(127, 0, 0)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-orangered)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['purplebluegreen'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-purplebluegreen">
                    <stop offset="0%" stopColor="rgb(255, 247, 251)"></stop>
                    <stop offset="10%" stopColor="rgb(239, 231, 242)"></stop>
                    <stop offset="20%" stopColor="rgb(219, 216, 234)"></stop>
                    <stop offset="30%" stopColor="rgb(190, 201, 226)"></stop>
                    <stop offset="40%" stopColor="rgb(152, 185, 217)"></stop>
                    <stop offset="50%" stopColor="rgb(105, 168, 207)"></stop>
                    <stop offset="60%" stopColor="rgb(64, 150, 192)"></stop>
                    <stop offset="70%" stopColor="rgb(25, 135, 159)"></stop>
                    <stop offset="80%" stopColor="rgb(3, 120, 119)"></stop>
                    <stop offset="90%" stopColor="rgb(1, 99, 83)"></stop>
                    <stop offset="100%" stopColor="rgb(1, 70, 54)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-purplebluegreen)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['purpleblue'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-purpleblue">
                    <stop offset="0%" stopColor="rgb(255, 247, 251)"></stop>
                    <stop offset="10%" stopColor="rgb(239, 234, 244)"></stop>
                    <stop offset="20%" stopColor="rgb(219, 218, 235)"></stop>
                    <stop offset="30%" stopColor="rgb(191, 201, 226)"></stop>
                    <stop offset="40%" stopColor="rgb(155, 185, 217)"></stop>
                    <stop offset="50%" stopColor="rgb(114, 168, 207)"></stop>
                    <stop offset="60%" stopColor="rgb(67, 148, 195)"></stop>
                    <stop offset="70%" stopColor="rgb(26, 125, 182)"></stop>
                    <stop offset="80%" stopColor="rgb(6, 103, 161)"></stop>
                    <stop offset="90%" stopColor="rgb(4, 82, 129)"></stop>
                    <stop offset="100%" stopColor="rgb(2, 56, 88)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-purpleblue)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['purplered'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-purplered">
                    <stop offset="0%" stopColor="rgb(247, 244, 249)"></stop>
                    <stop offset="10%" stopColor="rgb(234, 227, 240)"></stop>
                    <stop offset="20%" stopColor="rgb(220, 201, 226)"></stop>
                    <stop offset="30%" stopColor="rgb(208, 170, 210)"></stop>
                    <stop offset="40%" stopColor="rgb(208, 138, 194)"></stop>
                    <stop offset="50%" stopColor="rgb(221, 99, 174)"></stop>
                    <stop offset="60%" stopColor="rgb(227, 56, 144)"></stop>
                    <stop offset="70%" stopColor="rgb(215, 28, 108)"></stop>
                    <stop offset="80%" stopColor="rgb(183, 11, 79)"></stop>
                    <stop offset="90%" stopColor="rgb(143, 2, 58)"></stop>
                    <stop offset="100%" stopColor="rgb(103, 0, 31)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-purplered)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['redpurple'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-redpurple">
                    <stop offset="0%" stopColor="rgb(255, 247, 243)"></stop>
                    <stop offset="10%" stopColor="rgb(253, 228, 225)"></stop>
                    <stop offset="20%" stopColor="rgb(252, 207, 204)"></stop>
                    <stop offset="30%" stopColor="rgb(251, 181, 188)"></stop>
                    <stop offset="40%" stopColor="rgb(249, 147, 176)"></stop>
                    <stop offset="50%" stopColor="rgb(243, 105, 163)"></stop>
                    <stop offset="60%" stopColor="rgb(224, 62, 152)"></stop>
                    <stop offset="70%" stopColor="rgb(192, 23, 136)"></stop>
                    <stop offset="80%" stopColor="rgb(153, 3, 124)"></stop>
                    <stop offset="90%" stopColor="rgb(112, 1, 116)"></stop>
                    <stop offset="100%" stopColor="rgb(73, 0, 106)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-redpurple)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['yellowgreenblue'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-yellowgreenblue">
                    <stop offset="0%" stopColor="rgb(255, 255, 217)"></stop>
                    <stop offset="10%" stopColor="rgb(239, 249, 189)"></stop>
                    <stop offset="20%" stopColor="rgb(213, 238, 179)"></stop>
                    <stop offset="30%" stopColor="rgb(169, 221, 183)"></stop>
                    <stop offset="40%" stopColor="rgb(115, 201, 189)"></stop>
                    <stop offset="50%" stopColor="rgb(69, 180, 194)"></stop>
                    <stop offset="60%" stopColor="rgb(40, 151, 191)"></stop>
                    <stop offset="70%" stopColor="rgb(32, 115, 178)"></stop>
                    <stop offset="80%" stopColor="rgb(35, 78, 160)"></stop>
                    <stop offset="90%" stopColor="rgb(28, 49, 133)"></stop>
                    <stop offset="100%" stopColor="rgb(8, 29, 88)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-yellowgreenblue)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['yellowgreen'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-yellowgreen">
                    <stop offset="0%" stopColor="rgb(255, 255, 229)"></stop>
                    <stop offset="10%" stopColor="rgb(247, 252, 196)"></stop>
                    <stop offset="20%" stopColor="rgb(228, 244, 172)"></stop>
                    <stop offset="30%" stopColor="rgb(199, 232, 155)"></stop>
                    <stop offset="40%" stopColor="rgb(162, 216, 138)"></stop>
                    <stop offset="50%" stopColor="rgb(120, 197, 120)"></stop>
                    <stop offset="60%" stopColor="rgb(78, 175, 99)"></stop>
                    <stop offset="70%" stopColor="rgb(47, 148, 78)"></stop>
                    <stop offset="80%" stopColor="rgb(21, 121, 63)"></stop>
                    <stop offset="90%" stopColor="rgb(3, 96, 52)"></stop>
                    <stop offset="100%" stopColor="rgb(0, 69, 41)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-yellowgreen)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['yelloworangebrown'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-yelloworangebrown">
                    <stop offset="0%" stopColor="rgb(255, 255, 229)"></stop>
                    <stop offset="10%" stopColor="rgb(255, 248, 196)"></stop>
                    <stop offset="20%" stopColor="rgb(254, 234, 161)"></stop>
                    <stop offset="30%" stopColor="rgb(254, 214, 118)"></stop>
                    <stop offset="40%" stopColor="rgb(254, 186, 74)"></stop>
                    <stop offset="50%" stopColor="rgb(251, 153, 44)"></stop>
                    <stop offset="60%" stopColor="rgb(238, 121, 24)"></stop>
                    <stop offset="70%" stopColor="rgb(216, 91, 10)"></stop>
                    <stop offset="80%" stopColor="rgb(183, 67, 4)"></stop>
                    <stop offset="90%" stopColor="rgb(143, 50, 4)"></stop>
                    <stop offset="100%" stopColor="rgb(102, 37, 6)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-yelloworangebrown)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['yelloworangered'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-yelloworangered">
                    <stop offset="0%" stopColor="rgb(255, 255, 204)"></stop>
                    <stop offset="10%" stopColor="rgb(255, 240, 169)"></stop>
                    <stop offset="20%" stopColor="rgb(254, 224, 135)"></stop>
                    <stop offset="30%" stopColor="rgb(254, 201, 101)"></stop>
                    <stop offset="40%" stopColor="rgb(254, 171, 75)"></stop>
                    <stop offset="50%" stopColor="rgb(253, 137, 60)"></stop>
                    <stop offset="60%" stopColor="rgb(250, 92, 46)"></stop>
                    <stop offset="70%" stopColor="rgb(236, 48, 35)"></stop>
                    <stop offset="80%" stopColor="rgb(211, 17, 33)"></stop>
                    <stop offset="90%" stopColor="rgb(175, 2, 37)"></stop>
                    <stop offset="100%" stopColor="rgb(128, 0, 38)"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-yelloworangered)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    loaded = true;
}

export function sequentialMultiHue(selected: string) {
    if (!loaded) load();
    return [
        schemeOption(selected, 'viridis'),
        schemeOption(selected, 'inferno'),
        schemeOption(selected, 'magma'),
        schemeOption(selected, 'plasma'),
        schemeOption(selected, 'bluegreen'),
        schemeOption(selected, 'bluepurple'),
        schemeOption(selected, 'greenblue'),
        schemeOption(selected, 'orangered'),
        schemeOption(selected, 'purplebluegreen'),
        schemeOption(selected, 'purpleblue'),
        schemeOption(selected, 'purplered'),
        schemeOption(selected, 'redpurple'),
        schemeOption(selected, 'yellowgreenblue'),
        schemeOption(selected, 'yellowgreen'),
        schemeOption(selected, 'yelloworangebrown'),
        schemeOption(selected, 'yelloworangered')
    ];
}
