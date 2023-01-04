/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { strings } from '../language';
import { schemeHeader, schemeOption, schemesJSX } from './scheme';

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
    schemesJSX['cividis'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-cividis">
                    <stop offset="0%" stop-color="#002051"></stop>
                    <stop offset="10%" stop-color="#0a326a"></stop>
                    <stop offset="20%" stop-color="#2b446e"></stop>
                    <stop offset="30%" stop-color="#4d566d"></stop>
                    <stop offset="40%" stop-color="#696970"></stop>
                    <stop offset="50%" stop-color="#7f7c75"></stop>
                    <stop offset="60%" stop-color="#948f78"></stop>
                    <stop offset="70%" stop-color="#ada476"></stop>
                    <stop offset="80%" stop-color="#caba6a"></stop>
                    <stop offset="90%" stop-color="#ead156"></stop>
                    <stop offset="100%" stop-color="#fdea45"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-cividis)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['turbo'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-turbo">
                    <stop offset="0%" stop-color="#23171b"></stop>
                    <stop offset="10%" stop-color="#4a58dd"></stop>
                    <stop offset="20%" stop-color="#2f9df5"></stop>
                    <stop offset="30%" stop-color="#27d7c4"></stop>
                    <stop offset="40%" stop-color="#4df884"></stop>
                    <stop offset="50%" stop-color="#95fb51"></stop>
                    <stop offset="60%" stop-color="#dedd32"></stop>
                    <stop offset="70%" stop-color="#ffa423"></stop>
                    <stop offset="80%" stop-color="#f65f18"></stop>
                    <stop offset="90%" stop-color="#ba2208"></stop>
                    <stop offset="100%" stop-color="#900c00"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-turbo)" x="0" y="0" width="1" height="1"></rect>
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
    schemesJSX['goldgreen'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-goldgreen">
                    <stop offset="0%" stop-color="#f4d166"></stop>
                    <stop offset="10%" stop-color="#d5ca60"></stop>
                    <stop offset="20%" stop-color="#b6c35c"></stop>
                    <stop offset="30%" stop-color="#98bb59"></stop>
                    <stop offset="40%" stop-color="#7cb257"></stop>
                    <stop offset="50%" stop-color="#60a656"></stop>
                    <stop offset="60%" stop-color="#4b9c53"></stop>
                    <stop offset="70%" stop-color="#3f8f4f"></stop>
                    <stop offset="80%" stop-color="#33834a"></stop>
                    <stop offset="90%" stop-color="#257740"></stop>
                    <stop offset="100%" stop-color="#146c36"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-goldgreen)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['goldorange'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-goldorange">
                    <stop offset="0%" stop-color="#f4d166"></stop>
                    <stop offset="10%" stop-color="#f8be5c"></stop>
                    <stop offset="20%" stop-color="#f8aa4c"></stop>
                    <stop offset="30%" stop-color="#f5983b"></stop>
                    <stop offset="40%" stop-color="#f3852a"></stop>
                    <stop offset="50%" stop-color="#ef701b"></stop>
                    <stop offset="60%" stop-color="#e2621f"></stop>
                    <stop offset="70%" stop-color="#d65322"></stop>
                    <stop offset="80%" stop-color="#c54923"></stop>
                    <stop offset="90%" stop-color="#b14223"></stop>
                    <stop offset="100%" stop-color="#9e3a26"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-goldorange)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['goldred'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-goldred">
                    <stop offset="0%" stop-color="#f4d166"></stop>
                    <stop offset="10%" stop-color="#f6be59"></stop>
                    <stop offset="20%" stop-color="#f9aa51"></stop>
                    <stop offset="30%" stop-color="#fc964e"></stop>
                    <stop offset="40%" stop-color="#f6834b"></stop>
                    <stop offset="50%" stop-color="#ee734a"></stop>
                    <stop offset="60%" stop-color="#e56249"></stop>
                    <stop offset="70%" stop-color="#db5247"></stop>
                    <stop offset="80%" stop-color="#cf4244"></stop>
                    <stop offset="90%" stop-color="#c43141"></stop>
                    <stop offset="100%" stop-color="#b71d3e"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-goldred)" x="0" y="0" width="1" height="1"></rect>
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
    schemesJSX['darkblue'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-darkblue">
                    <stop offset="0%" stop-color="#323232"></stop>
                    <stop offset="10%" stop-color="#2e4463"></stop>
                    <stop offset="20%" stop-color="#1e588a"></stop>
                    <stop offset="30%" stop-color="#086da7"></stop>
                    <stop offset="40%" stop-color="#0082b9"></stop>
                    <stop offset="50%" stop-color="#039ac7"></stop>
                    <stop offset="60%" stop-color="#12b1d4"></stop>
                    <stop offset="70%" stop-color="#2bc8e2"></stop>
                    <stop offset="80%" stop-color="#3ddff0"></stop>
                    <stop offset="90%" stop-color="#61f4fb"></stop>
                    <stop offset="100%" stop-color="#ffffff"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-darkblue)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['darkgold'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-darkgold">
                    <stop offset="0%" stop-color="#3c3c3c"></stop>
                    <stop offset="10%" stop-color="#554a38"></stop>
                    <stop offset="20%" stop-color="#6d5a35"></stop>
                    <stop offset="30%" stop-color="#846f32"></stop>
                    <stop offset="40%" stop-color="#a0832d"></stop>
                    <stop offset="50%" stop-color="#bf9828"></stop>
                    <stop offset="60%" stop-color="#dbb022"></stop>
                    <stop offset="70%" stop-color="#f0cb23"></stop>
                    <stop offset="80%" stop-color="#fae241"></stop>
                    <stop offset="90%" stop-color="#fff290"></stop>
                    <stop offset="100%" stop-color="#ffffff"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-darkgold)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['darkgreen'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-darkgreen">
                    <stop offset="0%" stop-color="#3a3a3a"></stop>
                    <stop offset="10%" stop-color="#245447"></stop>
                    <stop offset="20%" stop-color="#076a4c"></stop>
                    <stop offset="30%" stop-color="#038145"></stop>
                    <stop offset="40%" stop-color="#2d9642"></stop>
                    <stop offset="50%" stop-color="#5fa941"></stop>
                    <stop offset="60%" stop-color="#89bb3f"></stop>
                    <stop offset="70%" stop-color="#b3cb3b"></stop>
                    <stop offset="80%" stop-color="#dbdc34"></stop>
                    <stop offset="90%" stop-color="#ffed39"></stop>
                    <stop offset="100%" stop-color="#ffffaa"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-darkgreen)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['darkmulti'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-darkmulti">
                    <stop offset="0%" stop-color="#373737"></stop>
                    <stop offset="10%" stop-color="#294767"></stop>
                    <stop offset="20%" stop-color="#1e5b88"></stop>
                    <stop offset="30%" stop-color="#1a748b"></stop>
                    <stop offset="40%" stop-color="#1f8e7e"></stop>
                    <stop offset="50%" stop-color="#29a869"></stop>
                    <stop offset="60%" stop-color="#6abf50"></stop>
                    <stop offset="70%" stop-color="#aad332"></stop>
                    <stop offset="80%" stop-color="#eae30d"></stop>
                    <stop offset="90%" stop-color="#fff166"></stop>
                    <stop offset="100%" stop-color="#ffffff"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-darkmulti)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['darkred'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-darkred">
                    <stop offset="0%" stop-color="#343434"></stop>
                    <stop offset="10%" stop-color="#643633"></stop>
                    <stop offset="20%" stop-color="#8c3a36"></stop>
                    <stop offset="30%" stop-color="#b03e38"></stop>
                    <stop offset="40%" stop-color="#d14632"></stop>
                    <stop offset="50%" stop-color="#e75d1e"></stop>
                    <stop offset="60%" stop-color="#eb7e20"></stop>
                    <stop offset="70%" stop-color="#ed9c25"></stop>
                    <stop offset="80%" stop-color="#efb92d"></stop>
                    <stop offset="90%" stop-color="#f3d431"></stop>
                    <stop offset="100%" stop-color="#ffeb2c"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-darkred)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['lightgreyred'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-lightgreyred">
                    <stop offset="0%" stop-color="#efe9e6"></stop>
                    <stop offset="10%" stop-color="#e2dcd9"></stop>
                    <stop offset="20%" stop-color="#d7cecb"></stop>
                    <stop offset="30%" stop-color="#ccc1be"></stop>
                    <stop offset="40%" stop-color="#c0b4af"></stop>
                    <stop offset="50%" stop-color="#c4a293"></stop>
                    <stop offset="60%" stop-color="#d38b66"></stop>
                    <stop offset="70%" stop-color="#de7336"></stop>
                    <stop offset="80%" stop-color="#e15917"></stop>
                    <stop offset="90%" stop-color="#df3a10"></stop>
                    <stop offset="100%" stop-color="#dc000b"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-lightgreyred)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['lightgreyteal'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-lightgreyteal">
                    <stop offset="0%" stop-color="#e4eaea"></stop>
                    <stop offset="10%" stop-color="#d7ddde"></stop>
                    <stop offset="20%" stop-color="#cbd1d4"></stop>
                    <stop offset="30%" stop-color="#bcc6ca"></stop>
                    <stop offset="40%" stop-color="#adbac0"></stop>
                    <stop offset="50%" stop-color="#85b2be"></stop>
                    <stop offset="60%" stop-color="#4aacc1"></stop>
                    <stop offset="70%" stop-color="#22a1c2"></stop>
                    <stop offset="80%" stop-color="#2192c0"></stop>
                    <stop offset="90%" stop-color="#1e84be"></stop>
                    <stop offset="100%" stop-color="#1876bc"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-lightgreyteal)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['lightmulti'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-lightmulti">
                    <stop offset="0%" stop-color="#e0f1f2"></stop>
                    <stop offset="10%" stop-color="#caebd7"></stop>
                    <stop offset="20%" stop-color="#b8e2b3"></stop>
                    <stop offset="30%" stop-color="#bddf93"></stop>
                    <stop offset="40%" stop-color="#d8e17e"></stop>
                    <stop offset="50%" stop-color="#f6e072"></stop>
                    <stop offset="60%" stop-color="#f6c659"></stop>
                    <stop offset="70%" stop-color="#f4a946"></stop>
                    <stop offset="80%" stop-color="#f58a3f"></stop>
                    <stop offset="90%" stop-color="#f56c3f"></stop>
                    <stop offset="100%" stop-color="#ef4a3c"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-lightmulti)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['lightorange'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-lightorange">
                    <stop offset="0%" stop-color="#f2e7da"></stop>
                    <stop offset="10%" stop-color="#f7d7bd"></stop>
                    <stop offset="20%" stop-color="#f9c7a0"></stop>
                    <stop offset="30%" stop-color="#fab78a"></stop>
                    <stop offset="40%" stop-color="#faa47a"></stop>
                    <stop offset="50%" stop-color="#f8936d"></stop>
                    <stop offset="60%" stop-color="#f38264"></stop>
                    <stop offset="70%" stop-color="#ed725f"></stop>
                    <stop offset="80%" stop-color="#e6605b"></stop>
                    <stop offset="90%" stop-color="#dd4f5b"></stop>
                    <stop offset="100%" stop-color="#d43d5b"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-lightorange)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['lighttealblue'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-lighttealblue">
                    <stop offset="0%" stop-color="#e3e9e0"></stop>
                    <stop offset="10%" stop-color="#c4ddd1"></stop>
                    <stop offset="20%" stop-color="#a2d1cb"></stop>
                    <stop offset="30%" stop-color="#84c4c9"></stop>
                    <stop offset="40%" stop-color="#66b5c3"></stop>
                    <stop offset="50%" stop-color="#49a7bd"></stop>
                    <stop offset="60%" stop-color="#3698b4"></stop>
                    <stop offset="70%" stop-color="#3188a9"></stop>
                    <stop offset="80%" stop-color="#2d799e"></stop>
                    <stop offset="90%" stop-color="#276994"></stop>
                    <stop offset="100%" stop-color="#255988"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-lighttealblue)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    loaded = true;
}

export function sequentialMultiHue(selected: string) {
    if (!loaded) load();
    return [
        schemeOption(selected, 'viridis'),
        schemeOption(selected, 'magma'),
        schemeOption(selected, 'inferno'),
        schemeOption(selected, 'plasma'),
        schemeOption(selected, 'cividis'),
        schemeOption(selected, 'turbo'),
        schemeOption(selected, 'bluegreen'),
        schemeOption(selected, 'bluepurple'),
        schemeOption(selected, 'goldgreen'),
        schemeOption(selected, 'goldorange'),
        schemeOption(selected, 'goldred'),
        schemeOption(selected, 'greenblue'),
        schemeOption(selected, 'orangered'),
        schemeOption(selected, 'purplebluegreen'),
        schemeOption(selected, 'purpleblue'),
        schemeOption(selected, 'purplered'),
        schemeOption(selected, 'redpurple'),
        schemeOption(selected, 'yellowgreenblue'),
        schemeOption(selected, 'yellowgreen'),
        schemeOption(selected, 'yelloworangebrown'),
        schemeOption(selected, 'yelloworangered'),
        schemeHeader('schemeSequentialMultiHueDark', strings.schemeSequentialMultiHueDark),
        schemeOption(selected, 'darkblue'),
        schemeOption(selected, 'darkgold'),
        schemeOption(selected, 'darkgreen'),
        schemeOption(selected, 'darkmulti'),
        schemeOption(selected, 'darkred'),
        schemeHeader('schemeSequentialMultiHueLight', strings.schemeSequentialMultiHueLight),
        schemeOption(selected, 'lightgreyred'),
        schemeOption(selected, 'lightgreyteal'),
        schemeOption(selected, 'lightmulti'),
        schemeOption(selected, 'lightorange'),
        schemeOption(selected, 'lighttealblue'),
    ];
}
