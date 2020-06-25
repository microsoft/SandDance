(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.VegaDeckGl = {}));
}(this, (function (exports) { 'use strict';

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    const layerNames = {
        cubes: 'LAYER_CUBES',
        lines: 'LAYER_LINES',
        text: 'LAYER_TEXT'
    };

    var constants = /*#__PURE__*/Object.freeze({
        __proto__: null,
        layerNames: layerNames
    });

    var htmlTags = [
    	"a",
    	"abbr",
    	"address",
    	"area",
    	"article",
    	"aside",
    	"audio",
    	"b",
    	"base",
    	"bdi",
    	"bdo",
    	"blockquote",
    	"body",
    	"br",
    	"button",
    	"canvas",
    	"caption",
    	"cite",
    	"code",
    	"col",
    	"colgroup",
    	"data",
    	"datalist",
    	"dd",
    	"del",
    	"details",
    	"dfn",
    	"dialog",
    	"div",
    	"dl",
    	"dt",
    	"em",
    	"embed",
    	"fieldset",
    	"figcaption",
    	"figure",
    	"footer",
    	"form",
    	"h1",
    	"h2",
    	"h3",
    	"h4",
    	"h5",
    	"h6",
    	"head",
    	"header",
    	"hgroup",
    	"hr",
    	"html",
    	"i",
    	"iframe",
    	"img",
    	"input",
    	"ins",
    	"kbd",
    	"keygen",
    	"label",
    	"legend",
    	"li",
    	"link",
    	"main",
    	"map",
    	"mark",
    	"math",
    	"menu",
    	"menuitem",
    	"meta",
    	"meter",
    	"nav",
    	"noscript",
    	"object",
    	"ol",
    	"optgroup",
    	"option",
    	"output",
    	"p",
    	"param",
    	"picture",
    	"pre",
    	"progress",
    	"q",
    	"rb",
    	"rp",
    	"rt",
    	"rtc",
    	"ruby",
    	"s",
    	"samp",
    	"script",
    	"section",
    	"select",
    	"slot",
    	"small",
    	"source",
    	"span",
    	"strong",
    	"style",
    	"sub",
    	"summary",
    	"sup",
    	"svg",
    	"table",
    	"tbody",
    	"td",
    	"template",
    	"textarea",
    	"tfoot",
    	"th",
    	"thead",
    	"time",
    	"title",
    	"tr",
    	"track",
    	"u",
    	"ul",
    	"var",
    	"video",
    	"wbr"
    ];

    var htmlTags$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': htmlTags
    });

    function getCjsExportFromNamespace (n) {
    	return n && n['default'] || n;
    }

    var require$$0 = getCjsExportFromNamespace(htmlTags$1);

    var htmlTags$2 = require$$0;

    var svgTags = [
    	"a",
    	"altGlyph",
    	"altGlyphDef",
    	"altGlyphItem",
    	"animate",
    	"animateColor",
    	"animateMotion",
    	"animateTransform",
    	"circle",
    	"clipPath",
    	"color-profile",
    	"cursor",
    	"defs",
    	"desc",
    	"ellipse",
    	"feBlend",
    	"feColorMatrix",
    	"feComponentTransfer",
    	"feComposite",
    	"feConvolveMatrix",
    	"feDiffuseLighting",
    	"feDisplacementMap",
    	"feDistantLight",
    	"feFlood",
    	"feFuncA",
    	"feFuncB",
    	"feFuncG",
    	"feFuncR",
    	"feGaussianBlur",
    	"feImage",
    	"feMerge",
    	"feMergeNode",
    	"feMorphology",
    	"feOffset",
    	"fePointLight",
    	"feSpecularLighting",
    	"feSpotLight",
    	"feTile",
    	"feTurbulence",
    	"filter",
    	"font",
    	"font-face",
    	"font-face-format",
    	"font-face-name",
    	"font-face-src",
    	"font-face-uri",
    	"foreignObject",
    	"g",
    	"glyph",
    	"glyphRef",
    	"hkern",
    	"image",
    	"line",
    	"linearGradient",
    	"marker",
    	"mask",
    	"metadata",
    	"missing-glyph",
    	"mpath",
    	"path",
    	"pattern",
    	"polygon",
    	"polyline",
    	"radialGradient",
    	"rect",
    	"script",
    	"set",
    	"stop",
    	"style",
    	"svg",
    	"switch",
    	"symbol",
    	"text",
    	"textPath",
    	"title",
    	"tref",
    	"tspan",
    	"use",
    	"view",
    	"vkern"
    ];

    var svgTags$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': svgTags
    });

    var require$$0$1 = getCjsExportFromNamespace(svgTags$1);

    var lib = require$$0$1;

    /**
     * Decamelizes a string with/without a custom separator (hyphen by default).
     * from: https://ourcodeworld.com/articles/read/608/how-to-camelize-and-decamelize-strings-in-javascript
     *
     * @param str String in camelcase
     * @param separator Separator for the new decamelized string.
     */
    function decamelize(str, separator = '-') {
        return str
            .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
            .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
            .toLowerCase();
    }
    function createElement(tag, attrs, ...children) {
        if (typeof tag === 'function') {
            const fn = tag;
            const props = attrs;
            props.children = children;
            return fn(props);
        }
        else {
            const ns = tagNamespace(tag);
            const el = ns ? document.createElementNS(ns, tag) : document.createElement(tag);
            const map = attrs;
            let ref;
            for (let name in map) {
                if (name && map.hasOwnProperty(name)) {
                    let value = map[name];
                    if (name === 'className' && value !== void 0) {
                        setAttribute(el, ns, 'class', value.toString());
                    }
                    else if (name === 'disabled' && !value) ;
                    else if (value === null || value === undefined) {
                        continue;
                    }
                    else if (value === true) {
                        setAttribute(el, ns, name, name);
                    }
                    else if (typeof value === 'function') {
                        if (name === 'ref') {
                            ref = value;
                        }
                        else {
                            el[name.toLowerCase()] = value;
                        }
                    }
                    else if (typeof value === 'object') {
                        setAttribute(el, ns, name, flatten(value));
                    }
                    else {
                        setAttribute(el, ns, name, value.toString());
                    }
                }
            }
            if (children && children.length > 0) {
                appendChildren(el, children);
            }
            if (ref) {
                ref(el);
            }
            return el;
        }
    }
    function setAttribute(el, ns, name, value) {
        if (ns) {
            el.setAttributeNS(null, name, value);
        }
        else {
            el.setAttribute(name, value);
        }
    }
    function flatten(o) {
        const arr = [];
        for (let prop in o)
            arr.push(`${decamelize(prop, '-')}:${o[prop]}`);
        return arr.join(';');
    }
    function addChild(parentElement, child) {
        if (child === null || child === undefined || typeof child === "boolean") {
            return;
        }
        else if (Array.isArray(child)) {
            appendChildren(parentElement, child);
        }
        else if (isElement(child)) {
            parentElement.appendChild(child);
        }
        else {
            parentElement.appendChild(document.createTextNode(child.toString()));
        }
    }
    function appendChildren(parentElement, children) {
        children.forEach(child => addChild(parentElement, child));
    }
    function isElement(el) {
        //nodeType cannot be zero https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        return !!el.nodeType;
    }
    function mount(element, container) {
        container.innerHTML = '';
        if (element) {
            addChild(container, element);
        }
    }
    function findElementByChildPositions(childPositions, container) {
        let element = container || document.body;
        let childPosition;
        while (element && childPositions.length) {
            childPosition = childPositions.shift();
            element = element.children.item(childPosition);
        }
        if (element) {
            return element;
        }
    }
    function focusActiveElement(element, activeElementInfo) {
        element.focus();
        element.scrollTop = activeElementInfo.scrollTop;
        const input = element;
        if (input.setSelectionRange && activeElementInfo && activeElementInfo.selectionStart != null && activeElementInfo.selectionEnd != null) {
            input.setSelectionRange(activeElementInfo.selectionStart, activeElementInfo.selectionEnd, activeElementInfo.selectionDirection);
        }
    }
    function setActiveElement(activeElementInfo, container) {
        if (activeElementInfo) {
            const element = findElementByChildPositions(activeElementInfo.childPositions, container);
            if (element) {
                focusActiveElement(element, activeElementInfo);
            }
        }
    }
    function getActiveElementInfo(container) {
        let element = document.activeElement;
        const { scrollTop, selectionDirection, selectionEnd, selectionStart } = element;
        const activeElementInfo = {
            childPositions: [],
            scrollTop,
            selectionDirection,
            selectionEnd,
            selectionStart
        };
        while (element && element !== document.body && element !== container) {
            activeElementInfo.childPositions.unshift(getChildPosition(element));
            element = element.parentElement;
        }
        if ((element === document.body || element === container) && activeElementInfo.childPositions.length)
            return activeElementInfo;
    }
    function getChildPosition(element) {
        let childPosition = 0;
        while (element = element.previousElementSibling)
            childPosition++;
        return childPosition;
    }
    function tagNamespace(tag) {
        //issue: this won't disambiguate certain tags which exist in both svg and html: <a>, <title> ...
        if (tag === 'svg' || (lib.indexOf(tag) >= 0 && !(htmlTags$2.indexOf(tag) >= 0))) {
            return "http://www.w3.org/2000/svg";
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const KeyCodes = {
        ENTER: 13
    };
    const Table = (props) => {
        return (createElement("table", { className: props.className },
            props.children,
            props.rows.map((row, i) => (createElement("tr", { className: props.rowClassName || '', onClick: e => props.onRowClick && props.onRowClick(e, i), tabIndex: props.onRowClick ? 0 : -1, onKeyUp: e => {
                    if (e.keyCode === KeyCodes.ENTER && props.onRowClick) {
                        props.onRowClick(e, i);
                    }
                } }, row.cells.map((cell, i) => (createElement("td", { className: cell.className || '', title: cell.title || '' }, cell.content))))))));
    };

    // Copyright (c) Microsoft Corporation. All rights reserved.

    var controls = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Table: Table
    });

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.

    var types = /*#__PURE__*/Object.freeze({
        __proto__: null
    });

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    function concat(...args) {
        return args.reduce((p, c) => c ? p.concat(c) : p, []);
    }
    /**
     * Returns array with items which are truthy.
     * @param args array or arrays to concat into a single array.
     */
    function allTruthy(...args) {
        return args.reduce((p, c) => c ? p.concat(c) : p, []).filter(Boolean);
    }
    /**
     * Add an array to an existing array in place.
     * @param arr Array to append to.
     * @param items Arrof of items to append.
     */
    function push(arr, items) {
        arr.push.apply(arr, items);
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    /**
     * Create a new element as a child of another element.
     * @param tagName Tag name of the new tag to create.
     * @param parentElement Reference of the element to append to.
     * @returns new HTMLElement.
     */
    function addEl(tagName, parentElement) {
        const el = document.createElement(tagName);
        parentElement.appendChild(el);
        return el;
    }
    /**
     * Create a new div HTMLElement as a child of another element.
     * @param parentElement Reference of the element to append to.
     * @param className Optional css class name to apply to the div.
     */
    function addDiv(parentElement, className) {
        const div = addEl('div', parentElement);
        if (className) {
            div.className = className;
        }
        return div;
    }
    /**
     * Measure the outer height and width of an HTMLElement, including margin, padding and border.
     * @param el HTML Element to measure.
     */
    function outerSize(el) {
        const cs = getComputedStyle(el);
        const height = parseFloat(cs.marginTop) + parseFloat(cs.paddingTop) + parseFloat(cs.borderTopWidth) + el.offsetHeight + parseFloat(cs.borderBottomWidth) + parseFloat(cs.paddingBottom) + parseFloat(cs.marginBottom);
        const width = parseFloat(cs.marginLeft) + parseFloat(cs.paddingLeft) + parseFloat(cs.borderLeftWidth) + el.offsetWidth + parseFloat(cs.borderRightWidth) + parseFloat(cs.paddingRight) + parseFloat(cs.marginRight);
        return { height, width };
    }

    var isMergeableObject = function isMergeableObject(value) {
    	return isNonNullObject(value)
    		&& !isSpecial(value)
    };

    function isNonNullObject(value) {
    	return !!value && typeof value === 'object'
    }

    function isSpecial(value) {
    	var stringValue = Object.prototype.toString.call(value);

    	return stringValue === '[object RegExp]'
    		|| stringValue === '[object Date]'
    		|| isReactElement(value)
    }

    // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
    var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

    function isReactElement(value) {
    	return value.$$typeof === REACT_ELEMENT_TYPE
    }

    function emptyTarget(val) {
    	return Array.isArray(val) ? [] : {}
    }

    function cloneUnlessOtherwiseSpecified(value, options) {
    	return (options.clone !== false && options.isMergeableObject(value))
    		? deepmerge(emptyTarget(value), value, options)
    		: value
    }

    function defaultArrayMerge(target, source, options) {
    	return target.concat(source).map(function(element) {
    		return cloneUnlessOtherwiseSpecified(element, options)
    	})
    }

    function mergeObject(target, source, options) {
    	var destination = {};
    	if (options.isMergeableObject(target)) {
    		Object.keys(target).forEach(function(key) {
    			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    		});
    	}
    	Object.keys(source).forEach(function(key) {
    		if (!options.isMergeableObject(source[key]) || !target[key]) {
    			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    		} else {
    			destination[key] = deepmerge(target[key], source[key], options);
    		}
    	});
    	return destination
    }

    function deepmerge(target, source, options) {
    	options = options || {};
    	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
    	options.isMergeableObject = options.isMergeableObject || isMergeableObject;

    	var sourceIsArray = Array.isArray(source);
    	var targetIsArray = Array.isArray(target);
    	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    	if (!sourceAndTargetTypesMatch) {
    		return cloneUnlessOtherwiseSpecified(source, options)
    	} else if (sourceIsArray) {
    		return options.arrayMerge(target, source, options)
    	} else {
    		return mergeObject(target, source, options)
    	}
    }

    deepmerge.all = function deepmergeAll(array, options) {
    	if (!Array.isArray(array)) {
    		throw new Error('first argument should be an array')
    	}

    	return array.reduce(function(prev, next) {
    		return deepmerge(prev, next, options)
    	}, {})
    };

    var deepmerge_1 = deepmerge;

    var _deepmerge = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': deepmerge_1
    });

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const deepmerge$1 = (deepmerge_1 || _deepmerge);
    function clone(objectToClone) {
        if (!objectToClone)
            return objectToClone;
        return deepmerge$1.all([objectToClone]);
    }
    const dontMerge = (destination, source) => source;
    function deepMerge(...objectsToMerge) {
        const objects = objectsToMerge.filter(Boolean);
        return deepmerge$1.all(objects, { arrayMerge: dontMerge });
    }

    function define(constructor, factory, prototype) {
      constructor.prototype = factory.prototype = prototype;
      prototype.constructor = constructor;
    }

    function extend(parent, definition) {
      var prototype = Object.create(parent.prototype);
      for (var key in definition) prototype[key] = definition[key];
      return prototype;
    }

    function Color() {}

    var darker = 0.7;
    var brighter = 1 / darker;

    var reI = "\\s*([+-]?\\d+)\\s*",
        reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        reHex = /^#([0-9a-f]{3,8})$/,
        reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
        reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
        reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
        reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
        reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
        reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

    var named = {
      aliceblue: 0xf0f8ff,
      antiquewhite: 0xfaebd7,
      aqua: 0x00ffff,
      aquamarine: 0x7fffd4,
      azure: 0xf0ffff,
      beige: 0xf5f5dc,
      bisque: 0xffe4c4,
      black: 0x000000,
      blanchedalmond: 0xffebcd,
      blue: 0x0000ff,
      blueviolet: 0x8a2be2,
      brown: 0xa52a2a,
      burlywood: 0xdeb887,
      cadetblue: 0x5f9ea0,
      chartreuse: 0x7fff00,
      chocolate: 0xd2691e,
      coral: 0xff7f50,
      cornflowerblue: 0x6495ed,
      cornsilk: 0xfff8dc,
      crimson: 0xdc143c,
      cyan: 0x00ffff,
      darkblue: 0x00008b,
      darkcyan: 0x008b8b,
      darkgoldenrod: 0xb8860b,
      darkgray: 0xa9a9a9,
      darkgreen: 0x006400,
      darkgrey: 0xa9a9a9,
      darkkhaki: 0xbdb76b,
      darkmagenta: 0x8b008b,
      darkolivegreen: 0x556b2f,
      darkorange: 0xff8c00,
      darkorchid: 0x9932cc,
      darkred: 0x8b0000,
      darksalmon: 0xe9967a,
      darkseagreen: 0x8fbc8f,
      darkslateblue: 0x483d8b,
      darkslategray: 0x2f4f4f,
      darkslategrey: 0x2f4f4f,
      darkturquoise: 0x00ced1,
      darkviolet: 0x9400d3,
      deeppink: 0xff1493,
      deepskyblue: 0x00bfff,
      dimgray: 0x696969,
      dimgrey: 0x696969,
      dodgerblue: 0x1e90ff,
      firebrick: 0xb22222,
      floralwhite: 0xfffaf0,
      forestgreen: 0x228b22,
      fuchsia: 0xff00ff,
      gainsboro: 0xdcdcdc,
      ghostwhite: 0xf8f8ff,
      gold: 0xffd700,
      goldenrod: 0xdaa520,
      gray: 0x808080,
      green: 0x008000,
      greenyellow: 0xadff2f,
      grey: 0x808080,
      honeydew: 0xf0fff0,
      hotpink: 0xff69b4,
      indianred: 0xcd5c5c,
      indigo: 0x4b0082,
      ivory: 0xfffff0,
      khaki: 0xf0e68c,
      lavender: 0xe6e6fa,
      lavenderblush: 0xfff0f5,
      lawngreen: 0x7cfc00,
      lemonchiffon: 0xfffacd,
      lightblue: 0xadd8e6,
      lightcoral: 0xf08080,
      lightcyan: 0xe0ffff,
      lightgoldenrodyellow: 0xfafad2,
      lightgray: 0xd3d3d3,
      lightgreen: 0x90ee90,
      lightgrey: 0xd3d3d3,
      lightpink: 0xffb6c1,
      lightsalmon: 0xffa07a,
      lightseagreen: 0x20b2aa,
      lightskyblue: 0x87cefa,
      lightslategray: 0x778899,
      lightslategrey: 0x778899,
      lightsteelblue: 0xb0c4de,
      lightyellow: 0xffffe0,
      lime: 0x00ff00,
      limegreen: 0x32cd32,
      linen: 0xfaf0e6,
      magenta: 0xff00ff,
      maroon: 0x800000,
      mediumaquamarine: 0x66cdaa,
      mediumblue: 0x0000cd,
      mediumorchid: 0xba55d3,
      mediumpurple: 0x9370db,
      mediumseagreen: 0x3cb371,
      mediumslateblue: 0x7b68ee,
      mediumspringgreen: 0x00fa9a,
      mediumturquoise: 0x48d1cc,
      mediumvioletred: 0xc71585,
      midnightblue: 0x191970,
      mintcream: 0xf5fffa,
      mistyrose: 0xffe4e1,
      moccasin: 0xffe4b5,
      navajowhite: 0xffdead,
      navy: 0x000080,
      oldlace: 0xfdf5e6,
      olive: 0x808000,
      olivedrab: 0x6b8e23,
      orange: 0xffa500,
      orangered: 0xff4500,
      orchid: 0xda70d6,
      palegoldenrod: 0xeee8aa,
      palegreen: 0x98fb98,
      paleturquoise: 0xafeeee,
      palevioletred: 0xdb7093,
      papayawhip: 0xffefd5,
      peachpuff: 0xffdab9,
      peru: 0xcd853f,
      pink: 0xffc0cb,
      plum: 0xdda0dd,
      powderblue: 0xb0e0e6,
      purple: 0x800080,
      rebeccapurple: 0x663399,
      red: 0xff0000,
      rosybrown: 0xbc8f8f,
      royalblue: 0x4169e1,
      saddlebrown: 0x8b4513,
      salmon: 0xfa8072,
      sandybrown: 0xf4a460,
      seagreen: 0x2e8b57,
      seashell: 0xfff5ee,
      sienna: 0xa0522d,
      silver: 0xc0c0c0,
      skyblue: 0x87ceeb,
      slateblue: 0x6a5acd,
      slategray: 0x708090,
      slategrey: 0x708090,
      snow: 0xfffafa,
      springgreen: 0x00ff7f,
      steelblue: 0x4682b4,
      tan: 0xd2b48c,
      teal: 0x008080,
      thistle: 0xd8bfd8,
      tomato: 0xff6347,
      turquoise: 0x40e0d0,
      violet: 0xee82ee,
      wheat: 0xf5deb3,
      white: 0xffffff,
      whitesmoke: 0xf5f5f5,
      yellow: 0xffff00,
      yellowgreen: 0x9acd32
    };

    define(Color, color, {
      copy: function(channels) {
        return Object.assign(new this.constructor, this, channels);
      },
      displayable: function() {
        return this.rgb().displayable();
      },
      hex: color_formatHex, // Deprecated! Use color.formatHex.
      formatHex: color_formatHex,
      formatHsl: color_formatHsl,
      formatRgb: color_formatRgb,
      toString: color_formatRgb
    });

    function color_formatHex() {
      return this.rgb().formatHex();
    }

    function color_formatHsl() {
      return hslConvert(this).formatHsl();
    }

    function color_formatRgb() {
      return this.rgb().formatRgb();
    }

    function color(format) {
      var m, l;
      format = (format + "").trim().toLowerCase();
      return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
          : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
          : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
          : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
          : null) // invalid hex
          : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
          : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
          : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
          : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
          : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
          : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
          : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
          : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
          : null;
    }

    function rgbn(n) {
      return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
    }

    function rgba(r, g, b, a) {
      if (a <= 0) r = g = b = NaN;
      return new Rgb(r, g, b, a);
    }

    function rgbConvert(o) {
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Rgb;
      o = o.rgb();
      return new Rgb(o.r, o.g, o.b, o.opacity);
    }

    function rgb(r, g, b, opacity) {
      return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
    }

    function Rgb(r, g, b, opacity) {
      this.r = +r;
      this.g = +g;
      this.b = +b;
      this.opacity = +opacity;
    }

    define(Rgb, rgb, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      rgb: function() {
        return this;
      },
      displayable: function() {
        return (-0.5 <= this.r && this.r < 255.5)
            && (-0.5 <= this.g && this.g < 255.5)
            && (-0.5 <= this.b && this.b < 255.5)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      hex: rgb_formatHex, // Deprecated! Use color.formatHex.
      formatHex: rgb_formatHex,
      formatRgb: rgb_formatRgb,
      toString: rgb_formatRgb
    }));

    function rgb_formatHex() {
      return "#" + hex(this.r) + hex(this.g) + hex(this.b);
    }

    function rgb_formatRgb() {
      var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "rgb(" : "rgba(")
          + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
          + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
          + Math.max(0, Math.min(255, Math.round(this.b) || 0))
          + (a === 1 ? ")" : ", " + a + ")");
    }

    function hex(value) {
      value = Math.max(0, Math.min(255, Math.round(value) || 0));
      return (value < 16 ? "0" : "") + value.toString(16);
    }

    function hsla(h, s, l, a) {
      if (a <= 0) h = s = l = NaN;
      else if (l <= 0 || l >= 1) h = s = NaN;
      else if (s <= 0) h = NaN;
      return new Hsl(h, s, l, a);
    }

    function hslConvert(o) {
      if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Hsl;
      if (o instanceof Hsl) return o;
      o = o.rgb();
      var r = o.r / 255,
          g = o.g / 255,
          b = o.b / 255,
          min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          h = NaN,
          s = max - min,
          l = (max + min) / 2;
      if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
      } else {
        s = l > 0 && l < 1 ? 0 : h;
      }
      return new Hsl(h, s, l, o.opacity);
    }

    function hsl(h, s, l, opacity) {
      return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
    }

    function Hsl(h, s, l, opacity) {
      this.h = +h;
      this.s = +s;
      this.l = +l;
      this.opacity = +opacity;
    }

    define(Hsl, hsl, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360,
            s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
            l = this.l,
            m2 = l + (l < 0.5 ? l : 1 - l) * s,
            m1 = 2 * l - m2;
        return new Rgb(
          hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
          hsl2rgb(h, m1, m2),
          hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
          this.opacity
        );
      },
      displayable: function() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s))
            && (0 <= this.l && this.l <= 1)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      formatHsl: function() {
        var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (a === 1 ? "hsl(" : "hsla(")
            + (this.h || 0) + ", "
            + (this.s || 0) * 100 + "%, "
            + (this.l || 0) * 100 + "%"
            + (a === 1 ? ")" : ", " + a + ")");
      }
    }));

    /* From FvD 13.37, CSS Color Module Level 3 */
    function hsl2rgb(h, m1, m2) {
      return (h < 60 ? m1 + (m2 - m1) * h / 60
          : h < 180 ? m2
          : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
          : m1) * 255;
    }

    function rgbToDeckglColor(c) {
        return [c.r, c.g, c.b, c.opacity * 255];
    }
    /**
     * Compares 2 colors to see if they are equal.
     * @param a RGBAColor to compare
     * @param b RGBAColor to compare
     * @returns True if colors are equal.
     */
    function colorIsEqual(a, b) {
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    }
    /**
     * Convert a CSS color string to a Deck.gl RGBAColor array - (The rgba color of each object, in r, g, b, [a]. Each component is in the 0-255 range.).
     * @param cssColorSpecifier A CSS Color Module Level 3 specifier string.
     */
    function colorFromString(cssColorSpecifier) {
        if (cssColorSpecifier) {
            const dc = color(cssColorSpecifier);
            if (dc) {
                const c = dc.rgb();
                return rgbToDeckglColor(c);
            }
        }
    }
    /**
     * Convert a Deck.gl color to a CSS rgba() string.
     * @param color A Deck.gl RGBAColor array - (The rgba color of each object, in r, g, b, [a]. Each component is in the 0-255 range.)
     */
    function colorToString(color) {
        const c = [...color];
        if (c.length > 3) {
            c[3] /= 255;
        }
        return `rgba(${c.join(',')})`;
    }
    function desaturate(color, value) {
        const rgb$1 = rgb(color[0], color[1], color[2], color[3] / 255);
        const hslColor = hsl(rgb$1);
        hslColor.s = value;
        const c = hslColor.rgb();
        return rgbToDeckglColor(c);
    }

    let vega = {
        CanvasHandler: null,
        inferType: null,
        inferTypes: null,
        loader: null,
        parse: null,
        read: null,
        renderModule: null,
        Renderer: null,
        sceneVisit: null,
        scheme: null,
        truncate: null,
        View: null
    };
    let deck = {
        _CameraLight: null,
        AmbientLight: null,
        CompositeLayer: null,
        COORDINATE_SYSTEM: null,
        Deck: null,
        DirectionalLight: null,
        Layer: null,
        LightingEffect: null,
        LinearInterpolator: null,
        OrbitView: null,
        OrbitController: null,
        gouraudLighting: null,
        picking: null,
        project32: null
    };
    let layers = {
        IconLayer: null,
        LineLayer: null,
        PathLayer: null,
        PolygonLayer: null,
        TextLayer: null
    };
    let luma = {
        CubeGeometry: null,
        Model: null,
        Texture2D: null
    };
    /**
     * References to dependency libraries.
     */
    const base = {
        deck,
        layers,
        luma,
        vega
    };
    /**
     * Specify the dependency libraries to use for rendering.
     * @param vega Vega library.
     * @param deck deck/core library.
     * @param layers deck/layers library.
     * @param luma luma.gl library.
     */
    function use(vega, deck, layers, luma) {
        base.deck = deck;
        base.layers = layers;
        base.luma = luma;
        base.vega = vega;
    }

    // Copyright (c) 2015 - 2017 Uber Technologies, Inc.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a copy
    // of this software and associated documentation files (the "Software"), to deal
    // in the Software without restriction, including without limitation the rights
    // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    // copies of the Software, and to permit persons to whom the Software is
    // furnished to do so, subject to the following conditions:
    //
    // The above copyright notice and this permission notice shall be included in
    // all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    // THE SOFTWARE.
    var fs = `\
#define SHADER_NAME cube-layer-fragment-shader

precision highp float;

varying vec4 vColor;

void main(void) {
  gl_FragColor = vColor;

  // use highlight color if this fragment belongs to the selected object.
  gl_FragColor = picking_filterHighlightColor(gl_FragColor);

  // use picking color if rendering to picking FBO.
  gl_FragColor = picking_filterPickingColor(gl_FragColor);
}
`;

    const minHeight = '100px';
    const minWidth = '100px';
    // const lightSettings: { [view in View]: LightSettings } = {
    //     '2d': {},
    //     '3d': {
    //         lightsPosition: [-122.45, 37.66, 8000, -122.0, 38.0, 8000],
    //         ambientRatio: 0.3,
    //         diffuseRatio: 0.6,
    //         specularRatio: 0.4,
    //         lightsStrength: [0.3, 0.0, 0.8, 0.0],
    //         numberOfLights: 2
    //     }
    // };
    const defaultPresenterStyle = {
        cssPrefix: 'vega-deckgl-',
        defaultCubeColor: [128, 128, 128, 255],
        highlightColor: [0, 0, 0, 255],
    };
    const defaultPresenterConfig = {
        onCubeClick: (e, cube) => { },
        onCubeHover: (e, cube) => { },
        transitionDurations: {
            color: 100,
            position: 600,
            size: 600,
            view: 600
        }
    };
    function createStage(view) {
        const stage = {
            view,
            cubeData: [],
            axes: {
                x: [],
                y: []
            },
            gridLines: [],
            textData: [],
            legend: {
                rows: {}
            },
            facets: []
        };
        return stage;
    }
    const groupStrokeWidth = 1;
    const lineZ = -1;
    const defaultView = '2d';
    const min3dDepth = 0.05;
    const minPixelSize = 0.5;

    var defaults = /*#__PURE__*/Object.freeze({
        __proto__: null,
        minHeight: minHeight,
        minWidth: minWidth,
        defaultPresenterStyle: defaultPresenterStyle,
        defaultPresenterConfig: defaultPresenterConfig,
        createStage: createStage,
        groupStrokeWidth: groupStrokeWidth,
        lineZ: lineZ,
        defaultView: defaultView,
        min3dDepth: min3dDepth,
        minPixelSize: minPixelSize
    });

    // Copyright (c) 2015 - 2017 Uber Technologies, Inc.
    var vs = `\
#define SHADER_NAME cube-layer-vertex-shader

attribute vec3 positions;
attribute vec3 normals;

attribute vec3 instancePositions;
attribute vec3 instancePositions64Low;
attribute vec3 instanceSizes;
attribute vec4 instanceColors;
attribute vec3 instancePickingColors;

// Custom uniforms
uniform float lightingMix;

// Result
varying vec4 vColor;

void main(void) {

  float x = instanceSizes.x > 0.0 ? max(instanceSizes.x, ${minPixelSize.toFixed(1)}) : 0.0;
  float y = instanceSizes.y > 0.0 ? max(instanceSizes.y, ${minPixelSize.toFixed(1)}) : 0.0;

  // if alpha == 0.0, do not render element
  float noRender = float(instanceColors.a == 0.0);
  float finalXScale = project_size(x) * mix(1.0, 0.0, noRender);
  float finalYScale = project_size(y) * mix(1.0, 0.0, noRender);
  float finalZScale = project_size(instanceSizes.z) * mix(1.0, 0.0, noRender);

  // cube geometry vertics are between -1 to 1, scale and transform it to between 0, 1
  vec3 offset = vec3(
    (positions.x + 1.0) / 2.0 * finalXScale,
    (positions.y + 1.0) / 2.0 * finalYScale,
    (positions.z + 1.0) / 2.0 * finalZScale);

  // extrude positions
  vec4 position_worldspace;
  gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset, position_worldspace);
  
  vec3 lightColor = lighting_getLightColor(instanceColors.rgb, project_uCameraPosition, position_worldspace.xyz, project_normal(normals));
  vec3 mixedLight = mix(instanceColors.rgb, lightColor, lightingMix);
  vec4 color = vec4(mixedLight, instanceColors.a) / 255.0;
  vColor = color;

  // Set color to be rendered to picking fbo (also used to check for selection highlight).
  picking_setPickingColor(instancePickingColors);
}
`;

    // Copyright (c) 2015 - 2017 Uber Technologies, Inc.
    //https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
    const UNSIGNED_BYTE = 0x1401;
    const DOUBLE = 0x140a;
    const DEFAULT_COLOR = [255, 0, 255, 255];
    const defaultProps = {
        lightingMix: 0.5,
        getSize: x => x.size,
        getPosition: x => x.position,
        getColor: x => x.color,
        material: { ambient: 0.5, diffuse: 1 }
    };
    function _CubeLayer(props) {
        //dynamic superclass, since we don't know have deck.Layer in the declaration phase
        class __CubeLayer extends base.deck.Layer {
            getShaders() {
                return { vs, fs, modules: [base.deck.project32, base.deck.gouraudLighting, base.deck.picking] };
            }
            initializeState() {
                const attributeManager = this.getAttributeManager();
                attributeManager.addInstanced({
                    instancePositions: {
                        size: 3,
                        type: DOUBLE,
                        transition: true,
                        accessor: 'getPosition'
                    },
                    instanceSizes: {
                        size: 3,
                        transition: true,
                        accessor: 'getSize'
                    },
                    instanceColors: {
                        size: 4,
                        type: UNSIGNED_BYTE,
                        transition: true,
                        accessor: 'getColor',
                        defaultValue: DEFAULT_COLOR
                    }
                });
            }
            updateState({ props, oldProps, changeFlags }) {
                super.updateState({ props, oldProps, changeFlags }); //TODO add parameter type to deck.gl-typings
                // Re-generate model if geometry changed
                //if (props.fp64 !== oldProps.fp64) {
                const { gl } = this.context;
                if (this.state.model) {
                    this.state.model.delete();
                }
                this.setState({ model: this._getModel(gl) });
                this.getAttributeManager().invalidateAll();
                //}
            }
            _getModel(gl) {
                return new base.luma.Model(gl, Object.assign({}, this.getShaders(), {
                    id: this.props.id,
                    geometry: new base.luma.CubeGeometry(),
                    isInstanced: true,
                }));
            }
            draw({ uniforms }) {
                let { lightingMix } = this.props;
                if (this.props.interpolator && this.props.interpolator.layerInterpolatedProps) {
                    lightingMix = this.props.interpolator.layerInterpolatedProps.lightingMix;
                }
                this.state.model.setUniforms(Object.assign({}, uniforms, {
                    lightingMix
                })).draw();
            }
        }
        __CubeLayer.layerName = 'CubeLayer';
        __CubeLayer.defaultProps = defaultProps;
        const instance = new __CubeLayer(props);
        return instance;
    }
    //signature to allow this function to be used with the 'new' keyword.
    //need to trick the compiler by casting to 'any'.
    /**
     * CubeLayer - a Deck.gl layer to render cuboids.
     * This is instantiatable by calling `new CubeLayer()`.
     */
    const CubeLayer = _CubeLayer;

    function expInOut(t) {
      return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getLayers(presenter, config, stage, lightSettings /*LightSettings*/, lightingMix, interpolator, guideLines) {
        const cubeLayer = newCubeLayer(presenter, config, stage.cubeData, presenter.style.highlightColor, lightSettings, lightingMix, interpolator);
        const { x, y } = stage.axes;
        const lines = concat(stage.gridLines, guideLines);
        const texts = [...stage.textData];
        [x, y].forEach(axes => {
            axes.forEach(axis => {
                if (axis.domain)
                    lines.push(axis.domain);
                if (axis.ticks)
                    lines.push.apply(lines, axis.ticks);
                if (axis.tickText)
                    texts.push.apply(texts, axis.tickText);
                if (axis.title)
                    texts.push(axis.title);
            });
        });
        if (stage.facets) {
            stage.facets.forEach(f => {
                if (f.lines)
                    lines.push.apply(lines, f.lines);
            });
        }
        const lineLayer = newLineLayer(layerNames.lines, lines);
        const textLayer = newTextLayer(presenter, layerNames.text, texts, config, presenter.style.fontFamily);
        return [textLayer, cubeLayer, lineLayer];
    }
    function newCubeLayer(presenter, config, cubeData, highlightColor, lightSettings /*LightSettings*/, lightingMix, interpolator) {
        const getPosition = getTiming(config.transitionDurations.position, expInOut);
        const getSize = getTiming(config.transitionDurations.size, expInOut);
        const getColor = getTiming(config.transitionDurations.color);
        const cubeLayerProps = {
            interpolator,
            lightingMix,
            id: layerNames.cubes,
            data: cubeData,
            coordinateSystem: base.deck.COORDINATE_SYSTEM.CARTESIAN,
            pickable: true,
            autoHighlight: true,
            highlightColor,
            onClick: (o, e) => {
                config.onCubeClick(e && e.srcEvent, o.object);
            },
            onHover: (o, e) => {
                if (o.index === -1) {
                    presenter.deckgl.interactiveState.onCube = false;
                    config.onCubeHover(e && e.srcEvent, null);
                }
                else {
                    presenter.deckgl.interactiveState.onCube = true;
                    config.onCubeHover(e && e.srcEvent, o.object);
                }
            },
            //lightSettings,
            transitions: {
                getPosition,
                getColor,
                getSize
            }
        };
        return new CubeLayer(cubeLayerProps);
    }
    function newLineLayer(id, data) {
        return new base.layers.LineLayer({
            id,
            data,
            widthUnits: 'pixels',
            coordinateSystem: base.deck.COORDINATE_SYSTEM.CARTESIAN,
            getColor: (o) => o.color,
            getWidth: (o) => o.strokeWidth
        });
    }
    function newTextLayer(presenter, id, data, config, fontFamily) {
        const props = {
            id,
            data,
            coordinateSystem: base.deck.COORDINATE_SYSTEM.CARTESIAN,
            sizeUnits: 'pixels',
            autoHighlight: true,
            pickable: true,
            highlightColor: p => {
                if (config.getTextHighlightColor) {
                    return config.getTextHighlightColor(p.object);
                }
                else {
                    return [0, 0, 0, 0];
                }
            },
            onClick: (o, e) => {
                let pe = e && e.srcEvent;
                config.onTextClick && config.onTextClick(pe, o.object);
            },
            onHover: (o, e) => {
                if (o.index === -1) {
                    presenter.deckgl.interactiveState.onText = false;
                }
                else {
                    presenter.deckgl.interactiveState.onText = config.onTextHover ? config.onTextHover(e && e.srcEvent, o.object) : true;
                }
            },
            getColor: config.getTextColor || (o => o.color),
            getTextAnchor: o => o.textAnchor,
            getSize: o => o.size,
            getAngle: o => o.angle,
            fontSettings: {
                sdf: true,
                fontSize: 128,
                buffer: 3
            }
        };
        if (fontFamily) {
            props.fontFamily = fontFamily;
        }
        return new base.layers.TextLayer(props);
    }
    function getTiming(duration, easing) {
        let timing;
        if (duration) {
            timing = {
                duration,
                type: 'interpolation'
            };
            if (easing) {
                timing.easing = easing;
            }
        }
        return timing;
    }
    function getCubeLayer(deckProps) {
        return deckProps.layers.filter(layer => layer && layer.id === layerNames.cubes)[0];
    }
    function getCubes(deckProps) {
        const cubeLayer = getCubeLayer(deckProps);
        if (!cubeLayer)
            return;
        const cubeLayerProps = cubeLayer.props;
        return cubeLayerProps.data;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.

    var util = /*#__PURE__*/Object.freeze({
        __proto__: null,
        addDiv: addDiv,
        addEl: addEl,
        allTruthy: allTruthy,
        clone: clone,
        colorFromString: colorFromString,
        colorIsEqual: colorIsEqual,
        colorToString: colorToString,
        concat: concat,
        createElement: createElement,
        deepMerge: deepMerge,
        desaturate: desaturate,
        getActiveElementInfo: getActiveElementInfo,
        getCubeLayer: getCubeLayer,
        getCubes: getCubes,
        mount: mount,
        outerSize: outerSize,
        push: push,
        setActiveElement: setActiveElement
    });

    function createOrbitControllerClass(factoryOptions) {
        function wrapper(props) {
            class OrbitControllerInternal extends base.deck.OrbitController {
                constructor(props) {
                    super(props);
                    this.invertPan = true;
                }
                handleEvent(event) {
                    if (event.type === 'doubletap') {
                        if (factoryOptions && factoryOptions.doubleClickHandler) {
                            return factoryOptions.doubleClickHandler(event, this);
                        }
                    }
                    return super.handleEvent(event);
                }
            }
            const instance = new OrbitControllerInternal(props);
            return instance;
        }
        return wrapper;
    }

    //adapted from https://github.com/uber/deck.gl/blob/5.3-release/modules/lite/src/deckgl.js
    const CANVAS_STYLE = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
    };
    // Create canvas elements for map and deck
    function createCanvas(props) {
        let { container = document.body } = props;
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        if (!container) {
            throw Error('Deck: container not found');
        }
        // Add DOM elements
        const containerStyle = window.getComputedStyle(container);
        if (containerStyle.position === 'static') {
            container.style.position = 'relative';
        }
        const deckCanvas = document.createElement('canvas');
        container.appendChild(deckCanvas);
        Object.assign(deckCanvas.style, CANVAS_STYLE);
        return { container, deckCanvas };
    }
    /**
     * Creates Deck.gl classes for rendering WebGL.
     * DEck.gl is instantiatable by calling `new createDeckGLClassesForPresenter(controlleroptions)(deckProps)`.
     */
    function createDeckGLClassesForPresenter(factoryOptions) {
        const OrbitControllerClass = createOrbitControllerClass(factoryOptions);
        //dynamic superclass lets us create a subclass at execution phase instead of declaration phase.
        //This allows us to retrieve Deck from either UMD or ES6 consumers of this class.
        function wrapper(props) {
            /**
             * @params container (Element) - DOM element to add deck.gl canvas to
             * @params controller (Object) - Controller class. Leave empty for auto detection
             */
            class DeckGLInternal extends base.deck.Deck {
                constructor(props) {
                    if (typeof document === 'undefined') {
                        // Not browser
                        throw Error('Deck can only be used in the browser');
                    }
                    const { deckCanvas } = createCanvas(props);
                    const viewState = props.initialViewState || props.viewState || {};
                    super(Object.assign({}, props, {
                        width: '100%',
                        height: '100%',
                        canvas: deckCanvas,
                        controller: OrbitControllerClass,
                        initialViewState: viewState
                    }));
                    // Callback for the controller
                    this._updateViewState = params => {
                        if (this.onViewStateChange) {
                            this.onViewStateChange(params);
                        }
                    };
                }
                setProps(props) {
                    // this._updateViewState must be bound to `this`
                    // but we don't have access to the current instance before calling super().
                    if ('onViewStateChange' in props && this._updateViewState) {
                        // This is called at least once at _onRendererInitialized
                        this.onViewStateChange = props.onViewStateChange;
                        props.onViewStateChange = this._updateViewState;
                    }
                    super.setProps(props);
                }
            }
            const instance = new DeckGLInternal(props);
            return instance;
        }
        return {
            OrbitControllerClass,
            DeckGL_Class: wrapper
        };
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function wrapper(props) {
        class LinearInterpolatorInternal extends base.deck.LinearInterpolator {
            constructor(transitionProps) {
                super(transitionProps);
            }
            interpolateProps(viewStateStartProps, viewStateEndProps, t) {
                if (this.layerStartProps && this.layerEndProps) {
                    this.layerInterpolatedProps = super.interpolateProps(this.layerStartProps, this.layerEndProps, t);
                }
                return super.interpolateProps(viewStateStartProps, viewStateEndProps, t);
            }
        }
        const instance = new LinearInterpolatorInternal(props);
        return instance;
    }
    const LinearInterpolator = wrapper;

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function lightingEffects() {
        const ambientLight = new base.deck.AmbientLight({
            color: [255, 255, 255],
            intensity: 0.3
        });
        const cameraLight = new base.deck._CameraLight({
            color: [255, 255, 255],
            intensity: 1
        });
        // const directionalLight = new base.deck.DirectionalLight({
        //     color: [255, 255, 255],
        //     direction: [0, 0, -1],
        //     intensity: 0.2
        //   });
        return [new base.deck.LightingEffect({ ambientLight, cameraLight })];
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    (function (PresenterElement) {
        PresenterElement[PresenterElement["root"] = 0] = "root";
        PresenterElement[PresenterElement["gl"] = 1] = "gl";
        PresenterElement[PresenterElement["panel"] = 2] = "panel";
        PresenterElement[PresenterElement["legend"] = 3] = "legend";
        PresenterElement[PresenterElement["vegaControls"] = 4] = "vegaControls";
    })(exports.PresenterElement || (exports.PresenterElement = {}));

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const LegendView = (props) => {
        const rows = [];
        const addRow = (row, i) => {
            const fn = symbolMap[row.symbol.shape];
            let jsx;
            if (fn) {
                jsx = fn(row.symbol);
            }
            else {
                jsx = createElement("span", null, "x");
                //console.log(`need to render ${row.symbol.shape} symbol shape`);
            }
            rows.push({
                cells: [
                    { className: 'symbol', content: jsx },
                    { className: 'label', content: row.label, title: row.label }
                ]
            });
        };
        var sorted = Object.keys(props.legend.rows).sort((a, b) => +a - +b);
        sorted.forEach(i => addRow(props.legend.rows[i]));
        if (sorted.length) {
            return (createElement(Table, { rows: rows, rowClassName: "legend-row", onRowClick: (e, i) => props.onClick(e, props.legend, i) }, props.legend.title !== void 0 && createElement("tr", { onClick: e => props.onClick(e, props.legend, null) },
                createElement("th", { colSpan: 2 }, props.legend.title))));
        }
    };
    const symbolMap = {
        square: function (symbol) {
            return (createElement("div", { style: {
                    height: `${symbol.bounds.y2 - symbol.bounds.y1}px`,
                    width: `${symbol.bounds.x2 - symbol.bounds.x1}px`,
                    backgroundColor: symbol.fill,
                    borderColor: symbol.fill
                } }));
        }
    };

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const markStager = (options, stage, scene, x, y, groupType) => {
        base.vega.sceneVisit(scene, function (item) {
            var x1, y1, x2, y2;
            x1 = item.x || 0;
            y1 = item.y || 0;
            x2 = item.x2 != null ? item.x2 : x1;
            y2 = item.y2 != null ? item.y2 : y1;
            const lineItem = styledLine(x1 + x, y1 + y, x2 + x, y2 + y, item.stroke, item.strokeWidth);
            if (item.mark.role === 'axis-tick') {
                options.currAxis.ticks.push(lineItem);
            }
            else if (item.mark.role === 'axis-domain') {
                options.currAxis.domain = lineItem;
            }
            else {
                stage.gridLines.push(lineItem);
            }
        });
    };
    function styledLine(x1, y1, x2, y2, stroke, strokeWidth) {
        const line = {
            sourcePosition: [x1, -y1, lineZ],
            targetPosition: [x2, -y2, lineZ],
            color: colorFromString(stroke),
            strokeWidth: strokeWidth
        };
        return line;
    }
    function box(gx, gy, height, width, stroke, strokeWidth, diagonals = false) {
        const lines = [
            styledLine(gx, gy, gx + width, gy, stroke, strokeWidth),
            styledLine(gx + width, gy, gx + width, gy + height, stroke, strokeWidth),
            styledLine(gx + width, gy + height, gx, gy + height, stroke, strokeWidth),
            styledLine(gx, gy + height, gx, gy, stroke, strokeWidth)
        ];
        if (diagonals) {
            lines.push(styledLine(gx, gy, gx + width, gy + height, stroke, strokeWidth));
            lines.push(styledLine(gx, gy + height, gx + width, gy, stroke, strokeWidth));
        }
        return lines;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function initializePanel(presenter) {
        const rootDiv = (createElement("div", { className: className(exports.PresenterElement.root, presenter) },
            createElement("div", { className: className(exports.PresenterElement.gl, presenter), style: { minHeight, minWidth } }),
            createElement("div", { className: className(exports.PresenterElement.panel, presenter) },
                createElement("div", { className: className(exports.PresenterElement.vegaControls, presenter) }),
                createElement("div", { className: className(exports.PresenterElement.legend, presenter) }))));
        mount(rootDiv, presenter.el);
    }
    function className(type, presenter) {
        return `${presenter.style.cssPrefix}${exports.PresenterElement[type]}`;
    }

    function patchCubeArray(allocatedSize, empty, cubes) {
        const patched = new Array(allocatedSize);
        patched.fill(empty);
        cubes.forEach(cube => patched[cube.ordinal] = cube);
        return patched;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const legendMap = {
        'legend-title': function (legend, textItem) {
            legend.title = textItem.text;
        },
        'legend-symbol': function (legend, symbol) {
            const { bounds, fill, shape } = symbol;
            //this object is safe for serialization
            const legendRowSymbol = { bounds, fill, shape };
            const i = symbol.datum.index;
            legend.rows[i] = legend.rows[i] || {};
            legend.rows[i].symbol = legendRowSymbol;
        },
        'legend-label': function (legend, label) {
            const i = label.datum.index;
            legend.rows[i] = legend.rows[i] || {};
            const row = legend.rows[i];
            row.label = label.text;
            row.value = label.datum.value;
        }
    };
    const markStager$1 = (options, stage, scene, x, y, groupType) => {
        base.vega.sceneVisit(scene, function (item) {
            const fn = legendMap[item.mark.role];
            if (fn) {
                fn(stage.legend, item);
            }
        });
    };

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const markStager$2 = (options, stage, scene, x, y, groupType) => {
        base.vega.sceneVisit(scene, function (item) {
            //for orthographic (2d) - always use 0 or else Deck will not show them
            const z = stage.view === '2d' ? 0 : (item.z || 0);
            const depth = (stage.view === '2d' ? 0 : (item.depth || 0)) + min3dDepth;
            //change direction of y from SVG to GL
            const ty = -1;
            let ordinal = options.assignCubeOrdinal(item.datum);
            if (ordinal > options.maxOrdinal) {
                options.maxOrdinal = ordinal;
            }
            if (ordinal === undefined) ;
            else {
                const cube = {
                    ordinal,
                    size: [item.width, item.height, depth],
                    position: [x + (item.x || 0), ty * (y + (item.y || 0)) - item.height, z],
                    color: colorFromString(item.fill) || options.defaultCubeColor || [128, 128, 128, 128]
                };
                cube.color[3] = item.opacity === undefined ? 255 : 255 * item.opacity;
                stage.cubeData.push(cube);
            }
        });
    };

    const markStager$3 = (options, stage, scene, x, y, groupType) => {
        //scale Deck.Gl text to Vega size
        const fontScale = 1;
        //change direction of y from SVG to GL
        const ty = -1;
        base.vega.sceneVisit(scene, function (item) {
            if (!item.text)
                return;
            const size = item.fontSize * fontScale;
            const alignmentBaseline = convertBaseline(item.baseline);
            const yOffset = alignmentBaseline === 'top' ? item.fontSize / 2 : 0; //fixup to get tick text correct
            const textItem = {
                color: colorFromString(item.fill),
                text: base.vega.truncate(item.text, item.limit, 'right', item.ellipsis || '...'),
                position: [x + (item.x || 0), ty * (y + (item.y || 0) + yOffset), 0],
                size,
                angle: convertAngle(item.angle),
                textAnchor: convertAlignment(item.align),
                alignmentBaseline,
                metaData: item.metaData
            };
            if (item.mark.role === 'axis-label') {
                const tickText = textItem;
                tickText.value = item.datum.value;
                options.currAxis.tickText.push(tickText);
            }
            else if (item.mark.role === 'axis-title') {
                options.currAxis.title = textItem;
            }
            else {
                stage.textData.push(textItem);
            }
        });
    };
    function convertAngle(vegaTextAngle) {
        if (vegaTextAngle && !isNaN(vegaTextAngle)) {
            return 360 - vegaTextAngle;
        }
        return 0;
    }
    function convertAlignment(textAlign) {
        switch (textAlign) {
            case 'center': return 'middle';
            case 'left': return 'start';
            case 'right': return 'end';
        }
        return 'start';
    }
    function convertBaseline(baseline) {
        switch (baseline) {
            case 'middle': return 'center';
        }
        return baseline || 'bottom';
    }

    var GroupType;
    (function (GroupType) {
        GroupType[GroupType["none"] = 0] = "none";
        GroupType[GroupType["legend"] = 1] = "legend";
        GroupType[GroupType["xAxis"] = 2] = "xAxis";
        GroupType[GroupType["yAxis"] = 3] = "yAxis";
    })(GroupType || (GroupType = {}));

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getOrientItem(group) {
        if (group.orient) {
            return group;
        }
        return group.datum;
    }
    function convertGroupRole(group) {
        if (group.mark.role === 'legend')
            return GroupType.legend;
        if (group.mark.role === 'axis') {
            const orientItem = getOrientItem(group);
            if (orientItem) {
                switch (orientItem.orient) {
                    case 'bottom':
                    case 'top':
                        return GroupType.xAxis;
                    case 'left':
                    case 'right':
                        return GroupType.yAxis;
                }
            }
        }
    }
    const group = (options, stage, scene, x, y, groupType) => {
        base.vega.sceneVisit(scene, function (g) {
            const gx = g.x || 0, gy = g.y || 0;
            if (g.context && g.context.background && !stage.backgroundColor) {
                stage.backgroundColor = colorFromString(g.context.background);
            }
            if (g.stroke) {
                const facetRect = {
                    datum: g.datum,
                    lines: box(gx + x, gy + y, g.height, g.width, g.stroke, groupStrokeWidth)
                };
                stage.facets.push(facetRect);
            }
            groupType = convertGroupRole(g) || groupType;
            setCurrentAxis(options, stage, groupType);
            // draw group contents
            base.vega.sceneVisit(g, function (item) {
                mainStager(options, stage, item, gx + x, gy + y, groupType);
            });
        });
    };
    function setCurrentAxis(options, stage, groupType) {
        let axes;
        switch (groupType) {
            case GroupType.xAxis:
                axes = stage.axes.x;
                break;
            case GroupType.yAxis:
                axes = stage.axes.y;
                break;
            default:
                return;
        }
        options.currAxis = {
            domain: null,
            tickText: [],
            ticks: []
        };
        axes.push(options.currAxis);
    }
    const markStagers = {
        group,
        legend: markStager$1,
        rect: markStager$2,
        rule: markStager,
        text: markStager$3
    };
    var mainStager = (options, stage, scene, x, y, groupType) => {
        if (scene.marktype !== 'group' && groupType === GroupType.legend) {
            markStager$1(options, stage, scene);
        }
        else {
            var markStager = markStagers[scene.marktype];
            if (markStager) {
                markStager(options, stage, scene, x, y, groupType);
            }
        }
    };
    function sceneToStage(options, stage, scene) {
        mainStager(options, stage, scene, 0, 0, null);
        sortAxis(stage.axes.x, 0);
        sortAxis(stage.axes.y, 1);
    }
    function sortAxis(axes, dim) {
        axes.forEach(axis => {
            if (axis.domain)
                orderDomain(axis.domain, dim);
            axis.ticks.sort((a, b) => a.sourcePosition[dim] - b.sourcePosition[dim]);
            axis.tickText.sort((a, b) => a.position[dim] - b.position[dim]);
        });
    }
    function orderDomain(domain, dim) {
        if (domain.sourcePosition[dim] > domain.targetPosition[dim]) {
            const temp = domain.targetPosition;
            domain.targetPosition = domain.sourcePosition;
            domain.sourcePosition = temp;
        }
    }

    const viewStateProps = ['target', 'rotationOrbit', 'rotationX', 'zoom'];
    function targetViewState(height, width, view) {
        const target = [width / 2, -height / 2, 0];
        if (view === '2d') {
            return {
                target,
                rotationOrbit: 0,
                rotationX: 90,
                zoom: -0.2
            };
        }
        else {
            return {
                target,
                rotationOrbit: 25,
                rotationX: 30,
                zoom: -0.4
            };
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    /**
     * Class which presents a Stage of chart data using Deck.gl to render.
     */
    class Presenter {
        /**
         * Instantiate a new Presenter.
         * @param el Parent HTMLElement to present within.
         * @param style Optional PresenterStyle styling options.
         */
        constructor(el, style) {
            this.el = el;
            this.style = deepMerge(defaultPresenterStyle, style);
            initializePanel(this);
            this._last = { view: null, height: null, width: null, cubeCount: null, stage: null };
        }
        /**
         * Get the previously rendered Stage object.
         */
        get stage() {
            return this._last.stage;
        }
        /**
         * Get the current View camera type.
         */
        get view() {
            return this._last.view;
        }
        /**
         * Cancels any pending animation, calling animationCanceled() on original queue.
         */
        animationCancel() {
            if (this.animationTimer) {
                clearTimeout(this.animationTimer);
                this.animationTimer = null;
                if (this.logger) {
                    this.logger(`canceling animation ${(this.queuedAnimationOptions && this.queuedAnimationOptions.handlerLabel) || 'handler'}`);
                }
                if (this.queuedAnimationOptions && this.queuedAnimationOptions.animationCanceled) {
                    this.queuedAnimationOptions.animationCanceled.call(null);
                }
            }
        }
        /**
         * Stops the current animation and queues a new animation.
         * @param handler Function to invoke when timeout is complete.
         * @param timeout Length of time to wait before invoking the handler.
         * @param options Optional QueuedAnimationOptions object.
         */
        animationQueue(handler, timeout, options) {
            if (this.logger) {
                this.logger(`queueing animation ${(options && options.waitingLabel) || 'waiting'}...`);
            }
            this.animationCancel();
            this.animationTimer = setTimeout(() => {
                if (this.logger) {
                    this.logger(`queueing animation ${(options && options.handlerLabel) || 'handler'}...`);
                }
                handler();
            }, timeout);
        }
        /**
         * Retrieve a sub-element of the rendered output.
         * @param type PresenterElement type of the HTMLElement to retrieve.
         */
        getElement(type) {
            const elements = this.el.getElementsByClassName(className(type, this));
            if (elements && elements.length) {
                return elements[0];
            }
        }
        /**
         * Present the Vega Scene, or Stage object using Deck.gl.
         * @param sceneOrStage Vega Scene object, or Stage object containing chart layout info.
         * @param height Height of the rendering area.
         * @param width Width of the rendering area.
         * @param config Optional presentation configuration object.
         */
        present(sceneOrStage, height, width, config) {
            this.animationCancel();
            let scene = sceneOrStage;
            let stage;
            let options = {
                maxOrdinal: 0,
                currAxis: null,
                defaultCubeColor: this.style.defaultCubeColor,
                assignCubeOrdinal: (config && config.onSceneRectAssignCubeOrdinal) || (() => options.maxOrdinal++)
            };
            //determine if this is a vega scene
            if (scene.marktype) {
                stage = createStage(scene.view);
                sceneToStage(options, stage, scene);
            }
            else {
                stage = sceneOrStage;
            }
            if (!this.deckgl) {
                const classes = createDeckGLClassesForPresenter({
                    doubleClickHandler: () => {
                        this.homeCamera();
                    }
                });
                this.OrbitControllerClass = classes.OrbitControllerClass;
                const initialViewState = targetViewState(height, width, stage.view);
                let glOptions;
                if (config && config.preserveDrawingBuffer) {
                    glOptions = { preserveDrawingBuffer: true };
                }
                const deckProps = {
                    glOptions,
                    height: null,
                    width: null,
                    effects: lightingEffects(),
                    layers: [],
                    onClick: config && config.onLayerClick,
                    views: [new base.deck.OrbitView({ controller: base.deck.OrbitController })],
                    initialViewState,
                    container: this.getElement(exports.PresenterElement.gl),
                    getCursor: (interactiveState) => {
                        if (interactiveState.onText || interactiveState.onAxisSelection) {
                            return 'pointer';
                        }
                        else if (interactiveState.onCube) {
                            return 'default';
                        }
                        else {
                            return 'grab';
                        }
                    }
                };
                if (stage.backgroundColor) {
                    deckProps.style = { 'background-color': colorToString(stage.backgroundColor) };
                }
                this.deckgl = new classes.DeckGL_Class(deckProps);
            }
            let cubeCount = Math.max(this._last.cubeCount, stage.cubeData.length);
            if (options.maxOrdinal) {
                cubeCount = Math.max(cubeCount, options.maxOrdinal);
                const empty = {
                    isEmpty: true,
                    color: [0, 0, 0, 0] // possibly a bug in Deck.gl? set color to invisible.
                };
                stage.cubeData = patchCubeArray(cubeCount, empty, stage.cubeData);
            }
            this.setDeckProps(stage, height, width, cubeCount, config);
            const a = getActiveElementInfo();
            mount(LegendView({ legend: stage.legend, onClick: config && config.onLegendClick }), this.getElement(exports.PresenterElement.legend));
            setActiveElement(a);
            if (config && config.onPresent) {
                config.onPresent();
            }
        }
        /**
         * Present the same recently rendered Stage with only slight modifications such as a color change,
         * using the previous Stage values as a basis.
         * @param stage Partially populated Stage object containing changes.
         * @param modifyConfig Optional presentation configuration object.
         */
        rePresent(stage, modifyConfig) {
            const newStage = Object.assign(Object.assign({}, this._last.stage), stage);
            this.setDeckProps(newStage, this._last.height, this._last.width, this._last.cubeCount, modifyConfig);
        }
        isNewBounds(view, height, width, cubeCount) {
            const lastBounds = this.lastBounds();
            for (let prop in lastBounds) {
                if (lastBounds[prop] === null)
                    return true;
            }
            const newBounds = { cubeCount, height, view, width };
            for (let prop in lastBounds) {
                if (lastBounds[prop] !== newBounds[prop])
                    return true;
            }
        }
        lastBounds() {
            const { cubeCount, height, view, width } = this._last;
            return { cubeCount, height, view, width };
        }
        setDeckProps(stage, height, width, cubeCount, modifyConfig) {
            const config = deepMerge(defaultPresenterConfig, modifyConfig);
            const newBounds = this.isNewBounds(stage.view, height, width, cubeCount);
            //let lightSettings = this.style.lightSettings[stage.view];
            let lightingMix = stage.view === '3d' ? 1.0 : 0.0;
            let linearInterpolator;
            //choose the current OrbitView viewstate if possible
            let viewState = (this.deckgl.viewState && Object.keys(this.deckgl.viewState).length && this.deckgl.viewState.OrbitView)
                //otherwise use the initial viewstate if any
                || this.deckgl.props.viewState;
            if (!viewState || newBounds || config.shouldViewstateTransition && config.shouldViewstateTransition()) {
                let newViewStateTarget = true;
                if (config && config.onTargetViewState) {
                    const result = config.onTargetViewState(height, width);
                    height = result.height;
                    width = result.width;
                    if (result.newViewStateTarget !== undefined) {
                        newViewStateTarget = result.newViewStateTarget;
                    }
                }
                if (!viewState || newViewStateTarget) {
                    viewState = targetViewState(height, width, stage.view);
                }
                const oldCubeLayer = getCubeLayer(this.deckgl.props);
                if (oldCubeLayer) {
                    linearInterpolator = new LinearInterpolator(viewStateProps);
                    linearInterpolator.layerStartProps = { lightingMix: oldCubeLayer.props.lightingMix };
                    linearInterpolator.layerEndProps = { lightingMix };
                    viewState.transitionDuration = config.transitionDurations.view;
                    viewState.transitionEasing = expInOut;
                    viewState.transitionInterpolator = linearInterpolator;
                }
                if (stage.view === '2d') ;
            }
            const guideLines = this._showGuides && box(0, 0, height, width, '#0f0', 1, true);
            config.preLayer && config.preLayer(stage);
            const layers = getLayers(this, config, stage, /*lightSettings*/ null, lightingMix, linearInterpolator, guideLines);
            const deckProps = {
                effects: lightingEffects(),
                views: [new base.deck.OrbitView({ controller: base.deck.OrbitController })],
                initialViewState: viewState,
                layers
            };
            if (config && config.preStage) {
                config.preStage(stage, deckProps);
            }
            requestAnimationFrame(() => this.deckgl.setProps(Object.assign(Object.assign({}, deckProps), { onAfterRender: () => {
                    if (this._afterRenderHandler) {
                        this._afterRenderHandler();
                    }
                } })));
            delete stage.cubeData;
            this._last = {
                cubeCount,
                height,
                width,
                stage: stage,
                view: stage.view
            };
        }
        canvasToDataURL() {
            return new Promise((resolve, reject) => {
                this._afterRenderHandler = () => {
                    this._afterRenderHandler = null;
                    const png = this.deckgl.canvas.toDataURL('image/png');
                    resolve(png);
                };
            });
        }
        /**
         * Home the camera to the last initial position.
         */
        homeCamera() {
            const viewState = targetViewState(this._last.height, this._last.width, this._last.view);
            viewState.transitionDuration = defaultPresenterConfig.transitionDurations.view;
            viewState.transitionEasing = expInOut;
            viewState.transitionInterpolator = new LinearInterpolator(viewStateProps);
            const deckProps = {
                effects: lightingEffects(),
                views: this.deckgl.props.views,
                initialViewState: viewState,
                layers: this.deckgl.props.layers
            };
            this.deckgl.setProps(deckProps);
        }
        /**
         * Get cube data array from the cubes layer.
         */
        getCubeData() {
            return getCubes(this.deckgl.props);
        }
        /**
         * Show guidelines of rendering height/width and center of OrbitView.
         */
        showGuides() {
            this._showGuides = true;
            this.getElement(exports.PresenterElement.gl).classList.add('show-center');
            this.rePresent(Object.assign(Object.assign({}, this._last.stage), { cubeData: this.getCubeData() }));
        }
        finalize() {
            this.animationCancel();
            if (this.deckgl)
                this.deckgl.finalize();
            if (this.el)
                this.el.innerHTML = '';
            this._last = null;
            this.deckgl = null;
            this.el = null;
            this.logger = null;
            this.queuedAnimationOptions = null;
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    //pass in the SuperClass, which should be a vega.View
    function _RendererGl(loader) {
        //dynamic superclass, since we don't know have vega.View in the declaration phase
        class RendererGlInternal extends base.vega.Renderer {
            initialize(el, width, height, origin) {
                this.height = height;
                this.width = width;
                // this method will invoke resize to size the canvas appropriately
                return super.initialize(el, width, height, origin);
            }
            resize(width, height, origin) {
                super.resize(width, height, origin);
                this.origin = origin;
                this.height = height;
                this.width = width;
                //rteturn this for vega
                return this;
            }
            _render(scene, items) {
                const scene3d = scene;
                scene3d.view = this.getView();
                this.presenter.present(scene3d, this.height, this.width, this.presenterConfig);
                //return this for vega
                return this;
            }
        }
        const instance = new RendererGlInternal(loader);
        return instance;
    }
    //signature to allow this function to be used with the 'new' keyword.
    //need to trick the compiler by casting to 'any'.
    /**
     * Subclass of Vega.Renderer, with added properties for accessing a Presenter.
     * This is instantiated by ViewGl.
     */
    const RendererGl = _RendererGl;

    // Copyright (c) Microsoft Corporation. All rights reserved.
    let registered = false;
    //dynamic superclass lets us create a subclass at execution phase instead of declaration phase.
    //This allows us to retrieve vega.View from either UMD or ES6 consumers of this class.
    //pass in the SuperClass, which should be a vega.View
    function _ViewGl(runtime, config) {
        //dynamic superclass, since we don't know have vega.View in the declaration phase
        class ViewGlInternal extends base.vega.View {
            constructor(runtime, config = {}) {
                super(runtime, config);
                this.config = config;
                this.presenter = config.presenter;
                config.presenterConfig = config.presenterConfig || {};
                config.presenterConfig.redraw = () => {
                    this._redraw = true; //use Vega View private member _redraw
                    this.run();
                };
            }
            renderer(renderer) {
                if (renderer === 'deck.gl' && !registered) {
                    base.vega.renderModule('deck.gl', { handler: base.vega.CanvasHandler, renderer: RendererGl });
                    registered = true;
                }
                return super.renderer(renderer);
            }
            initialize(el) {
                if (!this.presenter) {
                    this.presenter = new Presenter(el);
                }
                super.initialize(this.presenter.getElement(exports.PresenterElement.vegaControls));
                const renderer = this._renderer;
                renderer.presenterConfig = this.config.presenterConfig;
                renderer.presenter = this.presenter;
                renderer.getView = this.config && this.config.getView || (() => this.presenter.view || defaultView);
                return this;
            }
            error(e) {
                if (this.presenter.logger) {
                    this.presenter.logger(e);
                }
            }
        }
        const instance = new ViewGlInternal(runtime, config);
        return instance;
    }
    //signature to allow this function to be used with the 'new' keyword.
    //need to trick the compiler by casting to 'any'.
    /**
     * Subclass of Vega.View, with added properties for accessing a Presenter.
     * This is instantiatable by calling `new ViewGl()`. See https://vega.github.io/vega/docs/api/view/
     */
    const ViewGl = _ViewGl;

    exports.Presenter = Presenter;
    exports.ViewGl = ViewGl;
    exports.base = base;
    exports.constants = constants;
    exports.controls = controls;
    exports.defaults = defaults;
    exports.types = types;
    exports.use = use;
    exports.util = util;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
