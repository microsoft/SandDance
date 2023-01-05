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
                    <stop offset="0%" stopColor="#002051"></stop>
                    <stop offset="10%" stopColor="#0a326a"></stop>
                    <stop offset="20%" stopColor="#2b446e"></stop>
                    <stop offset="30%" stopColor="#4d566d"></stop>
                    <stop offset="40%" stopColor="#696970"></stop>
                    <stop offset="50%" stopColor="#7f7c75"></stop>
                    <stop offset="60%" stopColor="#948f78"></stop>
                    <stop offset="70%" stopColor="#ada476"></stop>
                    <stop offset="80%" stopColor="#caba6a"></stop>
                    <stop offset="90%" stopColor="#ead156"></stop>
                    <stop offset="100%" stopColor="#fdea45"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-cividis)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['turbo'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-turbo">
                    <stop offset="0%" stopColor="#23171b"></stop>
                    <stop offset="10%" stopColor="#4a58dd"></stop>
                    <stop offset="20%" stopColor="#2f9df5"></stop>
                    <stop offset="30%" stopColor="#27d7c4"></stop>
                    <stop offset="40%" stopColor="#4df884"></stop>
                    <stop offset="50%" stopColor="#95fb51"></stop>
                    <stop offset="60%" stopColor="#dedd32"></stop>
                    <stop offset="70%" stopColor="#ffa423"></stop>
                    <stop offset="80%" stopColor="#f65f18"></stop>
                    <stop offset="90%" stopColor="#ba2208"></stop>
                    <stop offset="100%" stopColor="#900c00"></stop>
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
                    <stop offset="0%" stopColor="#f4d166"></stop>
                    <stop offset="10%" stopColor="#d5ca60"></stop>
                    <stop offset="20%" stopColor="#b6c35c"></stop>
                    <stop offset="30%" stopColor="#98bb59"></stop>
                    <stop offset="40%" stopColor="#7cb257"></stop>
                    <stop offset="50%" stopColor="#60a656"></stop>
                    <stop offset="60%" stopColor="#4b9c53"></stop>
                    <stop offset="70%" stopColor="#3f8f4f"></stop>
                    <stop offset="80%" stopColor="#33834a"></stop>
                    <stop offset="90%" stopColor="#257740"></stop>
                    <stop offset="100%" stopColor="#146c36"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-goldgreen)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['goldorange'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-goldorange">
                    <stop offset="0%" stopColor="#f4d166"></stop>
                    <stop offset="10%" stopColor="#f8be5c"></stop>
                    <stop offset="20%" stopColor="#f8aa4c"></stop>
                    <stop offset="30%" stopColor="#f5983b"></stop>
                    <stop offset="40%" stopColor="#f3852a"></stop>
                    <stop offset="50%" stopColor="#ef701b"></stop>
                    <stop offset="60%" stopColor="#e2621f"></stop>
                    <stop offset="70%" stopColor="#d65322"></stop>
                    <stop offset="80%" stopColor="#c54923"></stop>
                    <stop offset="90%" stopColor="#b14223"></stop>
                    <stop offset="100%" stopColor="#9e3a26"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-goldorange)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['goldred'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-goldred">
                    <stop offset="0%" stopColor="#f4d166"></stop>
                    <stop offset="10%" stopColor="#f6be59"></stop>
                    <stop offset="20%" stopColor="#f9aa51"></stop>
                    <stop offset="30%" stopColor="#fc964e"></stop>
                    <stop offset="40%" stopColor="#f6834b"></stop>
                    <stop offset="50%" stopColor="#ee734a"></stop>
                    <stop offset="60%" stopColor="#e56249"></stop>
                    <stop offset="70%" stopColor="#db5247"></stop>
                    <stop offset="80%" stopColor="#cf4244"></stop>
                    <stop offset="90%" stopColor="#c43141"></stop>
                    <stop offset="100%" stopColor="#b71d3e"></stop>
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
                    <stop offset="0%" stopColor="#323232"></stop>
                    <stop offset="10%" stopColor="#2e4463"></stop>
                    <stop offset="20%" stopColor="#1e588a"></stop>
                    <stop offset="30%" stopColor="#086da7"></stop>
                    <stop offset="40%" stopColor="#0082b9"></stop>
                    <stop offset="50%" stopColor="#039ac7"></stop>
                    <stop offset="60%" stopColor="#12b1d4"></stop>
                    <stop offset="70%" stopColor="#2bc8e2"></stop>
                    <stop offset="80%" stopColor="#3ddff0"></stop>
                    <stop offset="90%" stopColor="#61f4fb"></stop>
                    <stop offset="100%" stopColor="#ffffff"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-darkblue)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['darkgold'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-darkgold">
                    <stop offset="0%" stopColor="#3c3c3c"></stop>
                    <stop offset="10%" stopColor="#554a38"></stop>
                    <stop offset="20%" stopColor="#6d5a35"></stop>
                    <stop offset="30%" stopColor="#846f32"></stop>
                    <stop offset="40%" stopColor="#a0832d"></stop>
                    <stop offset="50%" stopColor="#bf9828"></stop>
                    <stop offset="60%" stopColor="#dbb022"></stop>
                    <stop offset="70%" stopColor="#f0cb23"></stop>
                    <stop offset="80%" stopColor="#fae241"></stop>
                    <stop offset="90%" stopColor="#fff290"></stop>
                    <stop offset="100%" stopColor="#ffffff"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-darkgold)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['darkgreen'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-darkgreen">
                    <stop offset="0%" stopColor="#3a3a3a"></stop>
                    <stop offset="10%" stopColor="#245447"></stop>
                    <stop offset="20%" stopColor="#076a4c"></stop>
                    <stop offset="30%" stopColor="#038145"></stop>
                    <stop offset="40%" stopColor="#2d9642"></stop>
                    <stop offset="50%" stopColor="#5fa941"></stop>
                    <stop offset="60%" stopColor="#89bb3f"></stop>
                    <stop offset="70%" stopColor="#b3cb3b"></stop>
                    <stop offset="80%" stopColor="#dbdc34"></stop>
                    <stop offset="90%" stopColor="#ffed39"></stop>
                    <stop offset="100%" stopColor="#ffffaa"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-darkgreen)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['darkmulti'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-darkmulti">
                    <stop offset="0%" stopColor="#373737"></stop>
                    <stop offset="10%" stopColor="#294767"></stop>
                    <stop offset="20%" stopColor="#1e5b88"></stop>
                    <stop offset="30%" stopColor="#1a748b"></stop>
                    <stop offset="40%" stopColor="#1f8e7e"></stop>
                    <stop offset="50%" stopColor="#29a869"></stop>
                    <stop offset="60%" stopColor="#6abf50"></stop>
                    <stop offset="70%" stopColor="#aad332"></stop>
                    <stop offset="80%" stopColor="#eae30d"></stop>
                    <stop offset="90%" stopColor="#fff166"></stop>
                    <stop offset="100%" stopColor="#ffffff"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-darkmulti)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['darkred'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-darkred">
                    <stop offset="0%" stopColor="#343434"></stop>
                    <stop offset="10%" stopColor="#643633"></stop>
                    <stop offset="20%" stopColor="#8c3a36"></stop>
                    <stop offset="30%" stopColor="#b03e38"></stop>
                    <stop offset="40%" stopColor="#d14632"></stop>
                    <stop offset="50%" stopColor="#e75d1e"></stop>
                    <stop offset="60%" stopColor="#eb7e20"></stop>
                    <stop offset="70%" stopColor="#ed9c25"></stop>
                    <stop offset="80%" stopColor="#efb92d"></stop>
                    <stop offset="90%" stopColor="#f3d431"></stop>
                    <stop offset="100%" stopColor="#ffeb2c"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-darkred)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['lightgreyred'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-lightgreyred">
                    <stop offset="0%" stopColor="#efe9e6"></stop>
                    <stop offset="10%" stopColor="#e2dcd9"></stop>
                    <stop offset="20%" stopColor="#d7cecb"></stop>
                    <stop offset="30%" stopColor="#ccc1be"></stop>
                    <stop offset="40%" stopColor="#c0b4af"></stop>
                    <stop offset="50%" stopColor="#c4a293"></stop>
                    <stop offset="60%" stopColor="#d38b66"></stop>
                    <stop offset="70%" stopColor="#de7336"></stop>
                    <stop offset="80%" stopColor="#e15917"></stop>
                    <stop offset="90%" stopColor="#df3a10"></stop>
                    <stop offset="100%" stopColor="#dc000b"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-lightgreyred)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['lightgreyteal'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-lightgreyteal">
                    <stop offset="0%" stopColor="#e4eaea"></stop>
                    <stop offset="10%" stopColor="#d7ddde"></stop>
                    <stop offset="20%" stopColor="#cbd1d4"></stop>
                    <stop offset="30%" stopColor="#bcc6ca"></stop>
                    <stop offset="40%" stopColor="#adbac0"></stop>
                    <stop offset="50%" stopColor="#85b2be"></stop>
                    <stop offset="60%" stopColor="#4aacc1"></stop>
                    <stop offset="70%" stopColor="#22a1c2"></stop>
                    <stop offset="80%" stopColor="#2192c0"></stop>
                    <stop offset="90%" stopColor="#1e84be"></stop>
                    <stop offset="100%" stopColor="#1876bc"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-lightgreyteal)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['lightmulti'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-lightmulti">
                    <stop offset="0%" stopColor="#e0f1f2"></stop>
                    <stop offset="10%" stopColor="#caebd7"></stop>
                    <stop offset="20%" stopColor="#b8e2b3"></stop>
                    <stop offset="30%" stopColor="#bddf93"></stop>
                    <stop offset="40%" stopColor="#d8e17e"></stop>
                    <stop offset="50%" stopColor="#f6e072"></stop>
                    <stop offset="60%" stopColor="#f6c659"></stop>
                    <stop offset="70%" stopColor="#f4a946"></stop>
                    <stop offset="80%" stopColor="#f58a3f"></stop>
                    <stop offset="90%" stopColor="#f56c3f"></stop>
                    <stop offset="100%" stopColor="#ef4a3c"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-lightmulti)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['lightorange'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-lightorange">
                    <stop offset="0%" stopColor="#f2e7da"></stop>
                    <stop offset="10%" stopColor="#f7d7bd"></stop>
                    <stop offset="20%" stopColor="#f9c7a0"></stop>
                    <stop offset="30%" stopColor="#fab78a"></stop>
                    <stop offset="40%" stopColor="#faa47a"></stop>
                    <stop offset="50%" stopColor="#f8936d"></stop>
                    <stop offset="60%" stopColor="#f38264"></stop>
                    <stop offset="70%" stopColor="#ed725f"></stop>
                    <stop offset="80%" stopColor="#e6605b"></stop>
                    <stop offset="90%" stopColor="#dd4f5b"></stop>
                    <stop offset="100%" stopColor="#d43d5b"></stop>
                </linearGradient>
            </defs>
            <rect fill="url(#gradient-lightorange)" x="0" y="0" width="1" height="1"></rect>
        </svg>
    );
    schemesJSX['lighttealblue'] = (
        <svg viewBox="0,0,1,1" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-lighttealblue">
                    <stop offset="0%" stopColor="#e3e9e0"></stop>
                    <stop offset="10%" stopColor="#c4ddd1"></stop>
                    <stop offset="20%" stopColor="#a2d1cb"></stop>
                    <stop offset="30%" stopColor="#84c4c9"></stop>
                    <stop offset="40%" stopColor="#66b5c3"></stop>
                    <stop offset="50%" stopColor="#49a7bd"></stop>
                    <stop offset="60%" stopColor="#3698b4"></stop>
                    <stop offset="70%" stopColor="#3188a9"></stop>
                    <stop offset="80%" stopColor="#2d799e"></stop>
                    <stop offset="90%" stopColor="#276994"></stop>
                    <stop offset="100%" stopColor="#255988"></stop>
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
