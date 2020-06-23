// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { schemeOption, schemesJSX } from './scheme';

const p8 = `${100 / 8}%`;
const p9 = `${100 / 9}%`;
const p10 = `${100 / 10}%`;
const p12 = `${100 / 12}%`;
const p20 = `${100 / 20}%`;

let loaded = false;

function load() {
    schemesJSX['accent'] = (
        <div className="swatch">
            <div title="#7fc97f" style={{ width: p8, background: 'rgb(127, 201, 127)' }}></div>
            <div title="#beaed4" style={{ width: p8, background: 'rgb(190, 174, 212)' }}></div>
            <div title="#fdc086" style={{ width: p8, background: 'rgb(253, 192, 134)' }}></div>
            <div title="#ffff99" style={{ width: p8, background: 'rgb(255, 255, 153)' }}></div>
            <div title="#386cb0" style={{ width: p8, background: 'rgb(56, 108, 176)' }}></div>
            <div title="#f0027f" style={{ width: p8, background: 'rgb(240, 2, 127)' }}></div>
            <div title="#bf5b17" style={{ width: p8, background: 'rgb(191, 91, 23)' }}></div>
            <div title="#666666" style={{ width: p8, background: 'rgb(102, 102, 102)' }}></div>
        </div>
    );
    schemesJSX['category10'] = (
        <div className="swatch">
            <div title="#1f77b4" style={{ width: p10, background: 'rgb(31, 119, 180)' }}></div>
            <div title="#ff7f0e" style={{ width: p10, background: 'rgb(255, 127, 14)' }}></div>
            <div title="#2ca02c" style={{ width: p10, background: 'rgb(44, 160, 44)' }}></div>
            <div title="#d62728" style={{ width: p10, background: 'rgb(214, 39, 40)' }}></div>
            <div title="#9467bd" style={{ width: p10, background: 'rgb(148, 103, 189)' }}></div>
            <div title="#8c564b" style={{ width: p10, background: 'rgb(140, 86, 75)' }}></div>
            <div title="#e377c2" style={{ width: p10, background: 'rgb(227, 119, 194)' }}></div>
            <div title="#7f7f7f" style={{ width: p10, background: 'rgb(127, 127, 127)' }}></div>
            <div title="#bcbd22" style={{ width: p10, background: 'rgb(188, 189, 34)' }}></div>
            <div title="#17becf" style={{ width: p10, background: 'rgb(23, 190, 207)' }}></div>
        </div>
    );
    schemesJSX['category20'] = (
        <div className="swatch">
            <div title="#1f77b4" style={{ width: p20, background: 'rgb(31, 119, 180)' }}></div>
            <div title="#aec7e8" style={{ width: p20, background: 'rgb(174, 199, 232)' }}></div>
            <div title="#ff7f0e" style={{ width: p20, background: 'rgb(255, 127, 14)' }}></div>
            <div title="#ffbb78" style={{ width: p20, background: 'rgb(255, 187, 120)' }}></div>
            <div title="#2ca02c" style={{ width: p20, background: 'rgb(44, 160, 44)' }}></div>
            <div title="#98df8a" style={{ width: p20, background: 'rgb(152, 223, 138)' }}></div>
            <div title="#d62728" style={{ width: p20, background: 'rgb(214, 39, 40)' }}></div>
            <div title="#ff9896" style={{ width: p20, background: 'rgb(255, 152, 150)' }}></div>
            <div title="#9467bd" style={{ width: p20, background: 'rgb(148, 103, 189)' }}></div>
            <div title="#c5b0d5" style={{ width: p20, background: 'rgb(197, 176, 213)' }}></div>
            <div title="#8c564b" style={{ width: p20, background: 'rgb(140, 86, 75)' }}></div>
            <div title="#c49c94" style={{ width: p20, background: 'rgb(196, 156, 148)' }}></div>
            <div title="#e377c2" style={{ width: p20, background: 'rgb(227, 119, 194)' }}></div>
            <div title="#f7b6d2" style={{ width: p20, background: 'rgb(247, 182, 210)' }}></div>
            <div title="#7f7f7f" style={{ width: p20, background: 'rgb(127, 127, 127)' }}></div>
            <div title="#c7c7c7" style={{ width: p20, background: 'rgb(199, 199, 199)' }}></div>
            <div title="#bcbd22" style={{ width: p20, background: 'rgb(188, 189, 34)' }}></div>
            <div title="#dbdb8d" style={{ width: p20, background: 'rgb(219, 219, 141)' }}></div>
            <div title="#17becf" style={{ width: p20, background: 'rgb(23, 190, 207)' }}></div>
            <div title="#9edae5" style={{ width: p20, background: 'rgb(158, 218, 229)' }}></div>
        </div>
    );
    schemesJSX['category20b'] = (
        <div className="swatch">
            <div title="#393b79" style={{ width: p20, background: 'rgb(57, 59, 121)' }}></div>
            <div title="#5254a3" style={{ width: p20, background: 'rgb(82, 84, 163)' }}></div>
            <div title="#6b6ecf" style={{ width: p20, background: 'rgb(107, 110, 207)' }}></div>
            <div title="#9c9ede" style={{ width: p20, background: 'rgb(156, 158, 222)' }}></div>
            <div title="#637939" style={{ width: p20, background: 'rgb(99, 121, 57)' }}></div>
            <div title="#8ca252" style={{ width: p20, background: 'rgb(140, 162, 82)' }}></div>
            <div title="#b5cf6b" style={{ width: p20, background: 'rgb(181, 207, 107)' }}></div>
            <div title="#cedb9c" style={{ width: p20, background: 'rgb(206, 219, 156)' }}></div>
            <div title="#8c6d31" style={{ width: p20, background: 'rgb(140, 109, 49)' }}></div>
            <div title="#bd9e39" style={{ width: p20, background: 'rgb(189, 158, 57)' }}></div>
            <div title="#e7ba52" style={{ width: p20, background: 'rgb(231, 186, 82)' }}></div>
            <div title="#e7cb94" style={{ width: p20, background: 'rgb(231, 203, 148)' }}></div>
            <div title="#843c39" style={{ width: p20, background: 'rgb(132, 60, 57)' }}></div>
            <div title="#ad494a" style={{ width: p20, background: 'rgb(173, 73, 74)' }}></div>
            <div title="#d6616b" style={{ width: p20, background: 'rgb(214, 97, 107)' }}></div>
            <div title="#e7969c" style={{ width: p20, background: 'rgb(231, 150, 156)' }}></div>
            <div title="#7b4173" style={{ width: p20, background: 'rgb(123, 65, 115)' }}></div>
            <div title="#a55194" style={{ width: p20, background: 'rgb(165, 81, 148)' }}></div>
            <div title="#ce6dbd" style={{ width: p20, background: 'rgb(206, 109, 189)' }}></div>
            <div title="#de9ed6" style={{ width: p20, background: 'rgb(222, 158, 214)' }}></div>
        </div>
    );
    schemesJSX['category20c'] = (
        <div className="swatch">
            <div title="#3182bd" style={{ width: p20, background: 'rgb(49, 130, 189)' }}></div>
            <div title="#6baed6" style={{ width: p20, background: 'rgb(107, 174, 214)' }}></div>
            <div title="#9ecae1" style={{ width: p20, background: 'rgb(158, 202, 225)' }}></div>
            <div title="#c6dbef" style={{ width: p20, background: 'rgb(198, 219, 239)' }}></div>
            <div title="#e6550d" style={{ width: p20, background: 'rgb(230, 85, 13)' }}></div>
            <div title="#fd8d3c" style={{ width: p20, background: 'rgb(253, 141, 60)' }}></div>
            <div title="#fdae6b" style={{ width: p20, background: 'rgb(253, 174, 107)' }}></div>
            <div title="#fdd0a2" style={{ width: p20, background: 'rgb(253, 208, 162)' }}></div>
            <div title="#31a354" style={{ width: p20, background: 'rgb(49, 163, 84)' }}></div>
            <div title="#74c476" style={{ width: p20, background: 'rgb(116, 196, 118)' }}></div>
            <div title="#a1d99b" style={{ width: p20, background: 'rgb(161, 217, 155)' }}></div>
            <div title="#c7e9c0" style={{ width: p20, background: 'rgb(199, 233, 192)' }}></div>
            <div title="#756bb1" style={{ width: p20, background: 'rgb(117, 107, 177)' }}></div>
            <div title="#9e9ac8" style={{ width: p20, background: 'rgb(158, 154, 200)' }}></div>
            <div title="#bcbddc" style={{ width: p20, background: 'rgb(188, 189, 220)' }}></div>
            <div title="#dadaeb" style={{ width: p20, background: 'rgb(218, 218, 235)' }}></div>
            <div title="#636363" style={{ width: p20, background: 'rgb(99, 99, 99)' }}></div>
            <div title="#969696" style={{ width: p20, background: 'rgb(150, 150, 150)' }}></div>
            <div title="#bdbdbd" style={{ width: p20, background: 'rgb(189, 189, 189)' }}></div>
            <div title="#d9d9d9" style={{ width: p20, background: 'rgb(217, 217, 217)' }}></div>
        </div>
    );
    schemesJSX['dark2'] = (
        <div className="swatch">
            <div title="#1b9e77" style={{ width: p8, background: 'rgb(27, 158, 119)' }}></div>
            <div title="#d95f02" style={{ width: p8, background: 'rgb(217, 95, 2)' }}></div>
            <div title="#7570b3" style={{ width: p8, background: 'rgb(117, 112, 179)' }}></div>
            <div title="#e7298a" style={{ width: p8, background: 'rgb(231, 41, 138)' }}></div>
            <div title="#66a61e" style={{ width: p8, background: 'rgb(102, 166, 30)' }}></div>
            <div title="#e6ab02" style={{ width: p8, background: 'rgb(230, 171, 2)' }}></div>
            <div title="#a6761d" style={{ width: p8, background: 'rgb(166, 118, 29)' }}></div>
            <div title="#666666" style={{ width: p8, background: 'rgb(102, 102, 102)' }}></div>
        </div>
    );
    schemesJSX['paired'] = (
        <div className="swatch">
            <div title="#a6cee3" style={{ width: p12, background: 'rgb(166, 206, 227)' }}></div>
            <div title="#1f78b4" style={{ width: p12, background: 'rgb(31, 120, 180)' }}></div>
            <div title="#b2df8a" style={{ width: p12, background: 'rgb(178, 223, 138)' }}></div>
            <div title="#33a02c" style={{ width: p12, background: 'rgb(51, 160, 44)' }}></div>
            <div title="#fb9a99" style={{ width: p12, background: 'rgb(251, 154, 153)' }}></div>
            <div title="#e31a1c" style={{ width: p12, background: 'rgb(227, 26, 28)' }}></div>
            <div title="#fdbf6f" style={{ width: p12, background: 'rgb(253, 191, 111)' }}></div>
            <div title="#ff7f00" style={{ width: p12, background: 'rgb(255, 127, 0)' }}></div>
            <div title="#cab2d6" style={{ width: p12, background: 'rgb(202, 178, 214)' }}></div>
            <div title="#6a3d9a" style={{ width: p12, background: 'rgb(106, 61, 154)' }}></div>
            <div title="#ffff99" style={{ width: p12, background: 'rgb(255, 255, 153)' }}></div>
            <div title="#b15928" style={{ width: p12, background: 'rgb(177, 89, 40)' }}></div>
        </div>
    );
    schemesJSX['pastel1'] = (
        <div className="swatch">
            <div title="#fbb4ae" style={{ width: p9, background: 'rgb(251, 180, 174)' }}></div>
            <div title="#b3cde3" style={{ width: p9, background: 'rgb(179, 205, 227)' }}></div>
            <div title="#ccebc5" style={{ width: p9, background: 'rgb(204, 235, 197)' }}></div>
            <div title="#decbe4" style={{ width: p9, background: 'rgb(222, 203, 228)' }}></div>
            <div title="#fed9a6" style={{ width: p9, background: 'rgb(254, 217, 166)' }}></div>
            <div title="#ffffcc" style={{ width: p9, background: 'rgb(255, 255, 204)' }}></div>
            <div title="#e5d8bd" style={{ width: p9, background: 'rgb(229, 216, 189)' }}></div>
            <div title="#fddaec" style={{ width: p9, background: 'rgb(253, 218, 236)' }}></div>
            <div title="#f2f2f2" style={{ width: p9, background: 'rgb(242, 242, 242)' }}></div>
        </div>
    );
    schemesJSX['pastel2'] = (
        <div className="swatch">
            <div title="#b3e2cd" style={{ width: p8, background: 'rgb(179, 226, 205)' }}></div>
            <div title="#fdcdac" style={{ width: p8, background: 'rgb(253, 205, 172)' }}></div>
            <div title="#cbd5e8" style={{ width: p8, background: 'rgb(203, 213, 232)' }}></div>
            <div title="#f4cae4" style={{ width: p8, background: 'rgb(244, 202, 228)' }}></div>
            <div title="#e6f5c9" style={{ width: p8, background: 'rgb(230, 245, 201)' }}></div>
            <div title="#fff2ae" style={{ width: p8, background: 'rgb(255, 242, 174)' }}></div>
            <div title="#f1e2cc" style={{ width: p8, background: 'rgb(241, 226, 204)' }}></div>
            <div title="#cccccc" style={{ width: p8, background: 'rgb(204, 204, 204)' }}></div>
        </div>
    );
    schemesJSX['set1'] = (
        <div className="swatch">
            <div title="#e41a1c" style={{ width: p9, background: 'rgb(228, 26, 28)' }}></div>
            <div title="#377eb8" style={{ width: p9, background: 'rgb(55, 126, 184)' }}></div>
            <div title="#4daf4a" style={{ width: p9, background: 'rgb(77, 175, 74)' }}></div>
            <div title="#984ea3" style={{ width: p9, background: 'rgb(152, 78, 163)' }}></div>
            <div title="#ff7f00" style={{ width: p9, background: 'rgb(255, 127, 0)' }}></div>
            <div title="#ffff33" style={{ width: p9, background: 'rgb(255, 255, 51)' }}></div>
            <div title="#a65628" style={{ width: p9, background: 'rgb(166, 86, 40)' }}></div>
            <div title="#f781bf" style={{ width: p9, background: 'rgb(247, 129, 191)' }}></div>
            <div title="#999999" style={{ width: p9, background: 'rgb(153, 153, 153)' }}></div>
        </div>
    );
    schemesJSX['set2'] = (
        <div className="swatch">
            <div title="#66c2a5" style={{ width: p8, background: 'rgb(102, 194, 165)' }}></div>
            <div title="#fc8d62" style={{ width: p8, background: 'rgb(252, 141, 98)' }}></div>
            <div title="#8da0cb" style={{ width: p8, background: 'rgb(141, 160, 203)' }}></div>
            <div title="#e78ac3" style={{ width: p8, background: 'rgb(231, 138, 195)' }}></div>
            <div title="#a6d854" style={{ width: p8, background: 'rgb(166, 216, 84)' }}></div>
            <div title="#ffd92f" style={{ width: p8, background: 'rgb(255, 217, 47)' }}></div>
            <div title="#e5c494" style={{ width: p8, background: 'rgb(229, 196, 148)' }}></div>
            <div title="#b3b3b3" style={{ width: p8, background: 'rgb(179, 179, 179)' }}></div>
        </div>
    );
    schemesJSX['set3'] = (
        <div className="swatch">
            <div title="#8dd3c7" style={{ width: p12, background: 'rgb(141, 211, 199)' }}></div>
            <div title="#ffffb3" style={{ width: p12, background: 'rgb(255, 255, 179)' }}></div>
            <div title="#bebada" style={{ width: p12, background: 'rgb(190, 186, 218)' }}></div>
            <div title="#fb8072" style={{ width: p12, background: 'rgb(251, 128, 114)' }}></div>
            <div title="#80b1d3" style={{ width: p12, background: 'rgb(128, 177, 211)' }}></div>
            <div title="#fdb462" style={{ width: p12, background: 'rgb(253, 180, 98)' }}></div>
            <div title="#b3de69" style={{ width: p12, background: 'rgb(179, 222, 105)' }}></div>
            <div title="#fccde5" style={{ width: p12, background: 'rgb(252, 205, 229)' }}></div>
            <div title="#d9d9d9" style={{ width: p12, background: 'rgb(217, 217, 217)' }}></div>
            <div title="#bc80bd" style={{ width: p12, background: 'rgb(188, 128, 189)' }}></div>
            <div title="#ccebc5" style={{ width: p12, background: 'rgb(204, 235, 197)' }}></div>
            <div title="#ffed6f" style={{ width: p12, background: 'rgb(255, 237, 111)' }}></div>
        </div>
    );
    schemesJSX['tableau10'] = (
        <div className="swatch">
            <div title="#4c78a8" style={{ width: p10, background: 'rgb(76, 120, 168)' }}></div>
            <div title="#f58518" style={{ width: p10, background: 'rgb(245, 133, 24)' }}></div>
            <div title="#e45756" style={{ width: p10, background: 'rgb(228, 87, 86)' }}></div>
            <div title="#72b7b2" style={{ width: p10, background: 'rgb(114, 183, 178)' }}></div>
            <div title="#54a24b" style={{ width: p10, background: 'rgb(84, 162, 75)' }}></div>
            <div title="#eeca3b" style={{ width: p10, background: 'rgb(238, 202, 59)' }}></div>
            <div title="#b279a2" style={{ width: p10, background: 'rgb(178, 121, 162)' }}></div>
            <div title="#ff9da6" style={{ width: p10, background: 'rgb(255, 157, 166)' }}></div>
            <div title="#9d755d" style={{ width: p10, background: 'rgb(157, 117, 93)' }}></div>
            <div title="#bab0ac" style={{ width: p10, background: 'rgb(186, 176, 172)' }}></div>
        </div>
    );
    schemesJSX['tableau20'] = (
        <div className="swatch">
            <div title="#4c78a8" style={{ width: p20, background: 'rgb(76, 120, 168)' }}></div>
            <div title="#9ecae9" style={{ width: p20, background: 'rgb(158, 202, 233)' }}></div>
            <div title="#f58518" style={{ width: p20, background: 'rgb(245, 133, 24)' }}></div>
            <div title="#ffbf79" style={{ width: p20, background: 'rgb(255, 191, 121)' }}></div>
            <div title="#54a24b" style={{ width: p20, background: 'rgb(84, 162, 75)' }}></div>
            <div title="#88d27a" style={{ width: p20, background: 'rgb(136, 210, 122)' }}></div>
            <div title="#b79a20" style={{ width: p20, background: 'rgb(183, 154, 32)' }}></div>
            <div title="#f2cf5b" style={{ width: p20, background: 'rgb(242, 207, 91)' }}></div>
            <div title="#439894" style={{ width: p20, background: 'rgb(67, 152, 148)' }}></div>
            <div title="#83bcb6" style={{ width: p20, background: 'rgb(131, 188, 182)' }}></div>
            <div title="#e45756" style={{ width: p20, background: 'rgb(228, 87, 86)' }}></div>
            <div title="#ff9d98" style={{ width: p20, background: 'rgb(255, 157, 152)' }}></div>
            <div title="#79706e" style={{ width: p20, background: 'rgb(121, 112, 110)' }}></div>
            <div title="#bab0ac" style={{ width: p20, background: 'rgb(186, 176, 172)' }}></div>
            <div title="#d67195" style={{ width: p20, background: 'rgb(214, 113, 149)' }}></div>
            <div title="#fcbfd2" style={{ width: p20, background: 'rgb(252, 191, 210)' }}></div>
            <div title="#b279a2" style={{ width: p20, background: 'rgb(178, 121, 162)' }}></div>
            <div title="#d6a5c9" style={{ width: p20, background: 'rgb(214, 165, 201)' }}></div>
            <div title="#9e765f" style={{ width: p20, background: 'rgb(158, 118, 95)' }}></div>
            <div title="#d8b5a5" style={{ width: p20, background: 'rgb(216, 181, 165)' }}></div>
        </div>
    );
    loaded = true;
}

export function categorical(selected: string) {
    if (!loaded) load();
    return [
        schemeOption(selected, 'accent'),
        schemeOption(selected, 'category10'),
        schemeOption(selected, 'category20'),
        schemeOption(selected, 'category20b'),
        schemeOption(selected, 'category20c'),
        schemeOption(selected, 'dark2'),
        schemeOption(selected, 'paired'),
        schemeOption(selected, 'pastel1'),
        schemeOption(selected, 'pastel2'),
        schemeOption(selected, 'set1'),
        schemeOption(selected, 'set2'),
        schemeOption(selected, 'set3'),
        schemeOption(selected, 'tableau10'),
        schemeOption(selected, 'tableau20')
    ];
}
