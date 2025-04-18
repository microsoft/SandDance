(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VegaMorphCharts = {}));
})(this, (function (exports) { 'use strict';

	function _mergeNamespaces(n, m) {
		m.forEach(function (e) {
			e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
				if (k !== 'default' && !(k in n)) {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: function () { return e[k]; }
					});
				}
			});
		});
		return Object.freeze(n);
	}

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var require$$0$1 = [
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

	var htmlTags$1;
	var hasRequiredHtmlTags;

	function requireHtmlTags () {
		if (hasRequiredHtmlTags) return htmlTags$1;
		hasRequiredHtmlTags = 1;
		htmlTags$1 = require$$0$1;
		return htmlTags$1;
	}

	var htmlTagsExports = requireHtmlTags();
	var index$1 = /*@__PURE__*/getDefaultExportFromCjs(htmlTagsExports);

	var htmlTags = /*#__PURE__*/_mergeNamespaces({
		__proto__: null,
		default: index$1
	}, [htmlTagsExports]);

	var require$$0 = [
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

	var lib;
	var hasRequiredLib;

	function requireLib () {
		if (hasRequiredLib) return lib;
		hasRequiredLib = 1;
		lib = require$$0;
		return lib;
	}

	var libExports = requireLib();
	var index = /*@__PURE__*/getDefaultExportFromCjs(libExports);

	var svgTags = /*#__PURE__*/_mergeNamespaces({
		__proto__: null,
		default: index
	}, [libExports]);

	const htmlTagArray = index$1 || htmlTags;
	const svgTagArray = index || svgTags;
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
	    if (tag === 'svg' || (svgTagArray.indexOf(tag) >= 0 && !(htmlTagArray.indexOf(tag) >= 0))) {
	        return "http://www.w3.org/2000/svg";
	    }
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	const KeyCodes = {
	    ENTER: 'Enter',
	};
	const Table = (props) => {
	    return (createElement("table", { className: props.className },
	        props.children,
	        props.rows.map((row, i) => (createElement("tr", { className: props.rowClassName || '', onClick: e => props.onRowClick && props.onRowClick(e, i), tabIndex: props.onRowClick ? 0 : -1, onKeyUp: e => {
	                if (e.key === KeyCodes.ENTER && props.onRowClick) {
	                    props.onRowClick(e, i);
	                }
	            } }, row.cells.map((cell, i) => (createElement("td", { className: cell.className || '', title: cell.title || '' }, cell.content))))))));
	};

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	/**
	 * This file is for external facing export only, do not use this for internal references,
	 * as it may cause circular dependencies in Rollup.
	 */

	var controls = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Table: Table
	});

	/**
	 * Common utilities
	 * @module glMatrix
	 */
	// Configuration Constants
	var EPSILON = 0.000001;
	var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
	/**
	 * Sets the type of array used when creating new vectors and matrices
	 *
	 * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array
	 */

	function setMatrixArrayType(type) {
	  ARRAY_TYPE = type;
	}
	if (!Math.hypot) Math.hypot = function () {
	  var y = 0,
	      i = arguments.length;

	  while (i--) {
	    y += arguments[i] * arguments[i];
	  }

	  return Math.sqrt(y);
	};

	/**
	 * 3x3 Matrix
	 * @module mat3
	 */

	/**
	 * Creates a new identity mat3
	 *
	 * @returns {mat3} a new 3x3 matrix
	 */

	function create$5() {
	  var out = new ARRAY_TYPE(9);

	  if (ARRAY_TYPE != Float32Array) {
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[5] = 0;
	    out[6] = 0;
	    out[7] = 0;
	  }

	  out[0] = 1;
	  out[4] = 1;
	  out[8] = 1;
	  return out;
	}
	/**
	 * Copies the upper-left 3x3 values into the given mat3.
	 *
	 * @param {mat3} out the receiving 3x3 matrix
	 * @param {ReadonlyMat4} a   the source 4x4 matrix
	 * @returns {mat3} out
	 */

	function fromMat4(out, a) {
	  out[0] = a[0];
	  out[1] = a[1];
	  out[2] = a[2];
	  out[3] = a[4];
	  out[4] = a[5];
	  out[5] = a[6];
	  out[6] = a[8];
	  out[7] = a[9];
	  out[8] = a[10];
	  return out;
	}
	/**
	 * Create a new mat3 with the given values
	 *
	 * @param {Number} m00 Component in column 0, row 0 position (index 0)
	 * @param {Number} m01 Component in column 0, row 1 position (index 1)
	 * @param {Number} m02 Component in column 0, row 2 position (index 2)
	 * @param {Number} m10 Component in column 1, row 0 position (index 3)
	 * @param {Number} m11 Component in column 1, row 1 position (index 4)
	 * @param {Number} m12 Component in column 1, row 2 position (index 5)
	 * @param {Number} m20 Component in column 2, row 0 position (index 6)
	 * @param {Number} m21 Component in column 2, row 1 position (index 7)
	 * @param {Number} m22 Component in column 2, row 2 position (index 8)
	 * @returns {mat3} A new mat3
	 */

	function fromValues$5(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
	  var out = new ARRAY_TYPE(9);
	  out[0] = m00;
	  out[1] = m01;
	  out[2] = m02;
	  out[3] = m10;
	  out[4] = m11;
	  out[5] = m12;
	  out[6] = m20;
	  out[7] = m21;
	  out[8] = m22;
	  return out;
	}
	/**
	 * Calculates a 3x3 matrix from the given quaternion
	 *
	 * @param {mat3} out mat3 receiving operation result
	 * @param {ReadonlyQuat} q Quaternion to create matrix from
	 *
	 * @returns {mat3} out
	 */

	function fromQuat$1(out, q) {
	  var x = q[0],
	      y = q[1],
	      z = q[2],
	      w = q[3];
	  var x2 = x + x;
	  var y2 = y + y;
	  var z2 = z + z;
	  var xx = x * x2;
	  var yx = y * x2;
	  var yy = y * y2;
	  var zx = z * x2;
	  var zy = z * y2;
	  var zz = z * z2;
	  var wx = w * x2;
	  var wy = w * y2;
	  var wz = w * z2;
	  out[0] = 1 - yy - zz;
	  out[3] = yx - wz;
	  out[6] = zx + wy;
	  out[1] = yx + wz;
	  out[4] = 1 - xx - zz;
	  out[7] = zy - wx;
	  out[2] = zx - wy;
	  out[5] = zy + wx;
	  out[8] = 1 - xx - yy;
	  return out;
	}

	/**
	 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
	 * @module mat4
	 */

	/**
	 * Creates a new identity mat4
	 *
	 * @returns {mat4} a new 4x4 matrix
	 */

	function create$4() {
	  var out = new ARRAY_TYPE(16);

	  if (ARRAY_TYPE != Float32Array) {
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	  }

	  out[0] = 1;
	  out[5] = 1;
	  out[10] = 1;
	  out[15] = 1;
	  return out;
	}
	/**
	 * Copy the values from one mat4 to another
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the source matrix
	 * @returns {mat4} out
	 */

	function copy$4(out, a) {
	  out[0] = a[0];
	  out[1] = a[1];
	  out[2] = a[2];
	  out[3] = a[3];
	  out[4] = a[4];
	  out[5] = a[5];
	  out[6] = a[6];
	  out[7] = a[7];
	  out[8] = a[8];
	  out[9] = a[9];
	  out[10] = a[10];
	  out[11] = a[11];
	  out[12] = a[12];
	  out[13] = a[13];
	  out[14] = a[14];
	  out[15] = a[15];
	  return out;
	}
	/**
	 * Create a new mat4 with the given values
	 *
	 * @param {Number} m00 Component in column 0, row 0 position (index 0)
	 * @param {Number} m01 Component in column 0, row 1 position (index 1)
	 * @param {Number} m02 Component in column 0, row 2 position (index 2)
	 * @param {Number} m03 Component in column 0, row 3 position (index 3)
	 * @param {Number} m10 Component in column 1, row 0 position (index 4)
	 * @param {Number} m11 Component in column 1, row 1 position (index 5)
	 * @param {Number} m12 Component in column 1, row 2 position (index 6)
	 * @param {Number} m13 Component in column 1, row 3 position (index 7)
	 * @param {Number} m20 Component in column 2, row 0 position (index 8)
	 * @param {Number} m21 Component in column 2, row 1 position (index 9)
	 * @param {Number} m22 Component in column 2, row 2 position (index 10)
	 * @param {Number} m23 Component in column 2, row 3 position (index 11)
	 * @param {Number} m30 Component in column 3, row 0 position (index 12)
	 * @param {Number} m31 Component in column 3, row 1 position (index 13)
	 * @param {Number} m32 Component in column 3, row 2 position (index 14)
	 * @param {Number} m33 Component in column 3, row 3 position (index 15)
	 * @returns {mat4} A new mat4
	 */

	function fromValues$4(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
	  var out = new ARRAY_TYPE(16);
	  out[0] = m00;
	  out[1] = m01;
	  out[2] = m02;
	  out[3] = m03;
	  out[4] = m10;
	  out[5] = m11;
	  out[6] = m12;
	  out[7] = m13;
	  out[8] = m20;
	  out[9] = m21;
	  out[10] = m22;
	  out[11] = m23;
	  out[12] = m30;
	  out[13] = m31;
	  out[14] = m32;
	  out[15] = m33;
	  return out;
	}
	/**
	 * Set a mat4 to the identity matrix
	 *
	 * @param {mat4} out the receiving matrix
	 * @returns {mat4} out
	 */

	function identity(out) {
	  out[0] = 1;
	  out[1] = 0;
	  out[2] = 0;
	  out[3] = 0;
	  out[4] = 0;
	  out[5] = 1;
	  out[6] = 0;
	  out[7] = 0;
	  out[8] = 0;
	  out[9] = 0;
	  out[10] = 1;
	  out[11] = 0;
	  out[12] = 0;
	  out[13] = 0;
	  out[14] = 0;
	  out[15] = 1;
	  return out;
	}
	/**
	 * Inverts a mat4
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the source matrix
	 * @returns {mat4} out
	 */

	function invert(out, a) {
	  var a00 = a[0],
	      a01 = a[1],
	      a02 = a[2],
	      a03 = a[3];
	  var a10 = a[4],
	      a11 = a[5],
	      a12 = a[6],
	      a13 = a[7];
	  var a20 = a[8],
	      a21 = a[9],
	      a22 = a[10],
	      a23 = a[11];
	  var a30 = a[12],
	      a31 = a[13],
	      a32 = a[14],
	      a33 = a[15];
	  var b00 = a00 * a11 - a01 * a10;
	  var b01 = a00 * a12 - a02 * a10;
	  var b02 = a00 * a13 - a03 * a10;
	  var b03 = a01 * a12 - a02 * a11;
	  var b04 = a01 * a13 - a03 * a11;
	  var b05 = a02 * a13 - a03 * a12;
	  var b06 = a20 * a31 - a21 * a30;
	  var b07 = a20 * a32 - a22 * a30;
	  var b08 = a20 * a33 - a23 * a30;
	  var b09 = a21 * a32 - a22 * a31;
	  var b10 = a21 * a33 - a23 * a31;
	  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

	  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	  if (!det) {
	    return null;
	  }

	  det = 1.0 / det;
	  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
	  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
	  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
	  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
	  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
	  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
	  return out;
	}
	/**
	 * Multiplies two mat4s
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the first operand
	 * @param {ReadonlyMat4} b the second operand
	 * @returns {mat4} out
	 */

	function multiply$2(out, a, b) {
	  var a00 = a[0],
	      a01 = a[1],
	      a02 = a[2],
	      a03 = a[3];
	  var a10 = a[4],
	      a11 = a[5],
	      a12 = a[6],
	      a13 = a[7];
	  var a20 = a[8],
	      a21 = a[9],
	      a22 = a[10],
	      a23 = a[11];
	  var a30 = a[12],
	      a31 = a[13],
	      a32 = a[14],
	      a33 = a[15]; // Cache only the current line of the second matrix

	  var b0 = b[0],
	      b1 = b[1],
	      b2 = b[2],
	      b3 = b[3];
	  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	  b0 = b[4];
	  b1 = b[5];
	  b2 = b[6];
	  b3 = b[7];
	  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	  b0 = b[8];
	  b1 = b[9];
	  b2 = b[10];
	  b3 = b[11];
	  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	  b0 = b[12];
	  b1 = b[13];
	  b2 = b[14];
	  b3 = b[15];
	  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	  return out;
	}
	/**
	 * Translate a mat4 by the given vector
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the matrix to translate
	 * @param {ReadonlyVec3} v vector to translate by
	 * @returns {mat4} out
	 */

	function translate(out, a, v) {
	  var x = v[0],
	      y = v[1],
	      z = v[2];
	  var a00, a01, a02, a03;
	  var a10, a11, a12, a13;
	  var a20, a21, a22, a23;

	  if (a === out) {
	    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
	    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
	    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
	    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
	  } else {
	    a00 = a[0];
	    a01 = a[1];
	    a02 = a[2];
	    a03 = a[3];
	    a10 = a[4];
	    a11 = a[5];
	    a12 = a[6];
	    a13 = a[7];
	    a20 = a[8];
	    a21 = a[9];
	    a22 = a[10];
	    a23 = a[11];
	    out[0] = a00;
	    out[1] = a01;
	    out[2] = a02;
	    out[3] = a03;
	    out[4] = a10;
	    out[5] = a11;
	    out[6] = a12;
	    out[7] = a13;
	    out[8] = a20;
	    out[9] = a21;
	    out[10] = a22;
	    out[11] = a23;
	    out[12] = a00 * x + a10 * y + a20 * z + a[12];
	    out[13] = a01 * x + a11 * y + a21 * z + a[13];
	    out[14] = a02 * x + a12 * y + a22 * z + a[14];
	    out[15] = a03 * x + a13 * y + a23 * z + a[15];
	  }

	  return out;
	}
	/**
	 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the matrix to scale
	 * @param {ReadonlyVec3} v the vec3 to scale the matrix by
	 * @returns {mat4} out
	 **/

	function scale$1(out, a, v) {
	  var x = v[0],
	      y = v[1],
	      z = v[2];
	  out[0] = a[0] * x;
	  out[1] = a[1] * x;
	  out[2] = a[2] * x;
	  out[3] = a[3] * x;
	  out[4] = a[4] * y;
	  out[5] = a[5] * y;
	  out[6] = a[6] * y;
	  out[7] = a[7] * y;
	  out[8] = a[8] * z;
	  out[9] = a[9] * z;
	  out[10] = a[10] * z;
	  out[11] = a[11] * z;
	  out[12] = a[12];
	  out[13] = a[13];
	  out[14] = a[14];
	  out[15] = a[15];
	  return out;
	}
	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.scale(dest, dest, vec);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {ReadonlyVec3} v Scaling vector
	 * @returns {mat4} out
	 */

	function fromScaling(out, v) {
	  out[0] = v[0];
	  out[1] = 0;
	  out[2] = 0;
	  out[3] = 0;
	  out[4] = 0;
	  out[5] = v[1];
	  out[6] = 0;
	  out[7] = 0;
	  out[8] = 0;
	  out[9] = 0;
	  out[10] = v[2];
	  out[11] = 0;
	  out[12] = 0;
	  out[13] = 0;
	  out[14] = 0;
	  out[15] = 1;
	  return out;
	}
	/**
	 * Creates a matrix from a quaternion rotation, vector translation and vector scale
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     let quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *     mat4.scale(dest, scale)
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {ReadonlyVec3} v Translation vector
	 * @param {ReadonlyVec3} s Scaling vector
	 * @returns {mat4} out
	 */

	function fromRotationTranslationScale(out, q, v, s) {
	  // Quaternion math
	  var x = q[0],
	      y = q[1],
	      z = q[2],
	      w = q[3];
	  var x2 = x + x;
	  var y2 = y + y;
	  var z2 = z + z;
	  var xx = x * x2;
	  var xy = x * y2;
	  var xz = x * z2;
	  var yy = y * y2;
	  var yz = y * z2;
	  var zz = z * z2;
	  var wx = w * x2;
	  var wy = w * y2;
	  var wz = w * z2;
	  var sx = s[0];
	  var sy = s[1];
	  var sz = s[2];
	  out[0] = (1 - (yy + zz)) * sx;
	  out[1] = (xy + wz) * sx;
	  out[2] = (xz - wy) * sx;
	  out[3] = 0;
	  out[4] = (xy - wz) * sy;
	  out[5] = (1 - (xx + zz)) * sy;
	  out[6] = (yz + wx) * sy;
	  out[7] = 0;
	  out[8] = (xz + wy) * sz;
	  out[9] = (yz - wx) * sz;
	  out[10] = (1 - (xx + yy)) * sz;
	  out[11] = 0;
	  out[12] = v[0];
	  out[13] = v[1];
	  out[14] = v[2];
	  out[15] = 1;
	  return out;
	}
	/**
	 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     mat4.translate(dest, origin);
	 *     let quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *     mat4.scale(dest, scale)
	 *     mat4.translate(dest, negativeOrigin);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {ReadonlyVec3} v Translation vector
	 * @param {ReadonlyVec3} s Scaling vector
	 * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
	 * @returns {mat4} out
	 */

	function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
	  // Quaternion math
	  var x = q[0],
	      y = q[1],
	      z = q[2],
	      w = q[3];
	  var x2 = x + x;
	  var y2 = y + y;
	  var z2 = z + z;
	  var xx = x * x2;
	  var xy = x * y2;
	  var xz = x * z2;
	  var yy = y * y2;
	  var yz = y * z2;
	  var zz = z * z2;
	  var wx = w * x2;
	  var wy = w * y2;
	  var wz = w * z2;
	  var sx = s[0];
	  var sy = s[1];
	  var sz = s[2];
	  var ox = o[0];
	  var oy = o[1];
	  var oz = o[2];
	  var out0 = (1 - (yy + zz)) * sx;
	  var out1 = (xy + wz) * sx;
	  var out2 = (xz - wy) * sx;
	  var out4 = (xy - wz) * sy;
	  var out5 = (1 - (xx + zz)) * sy;
	  var out6 = (yz + wx) * sy;
	  var out8 = (xz + wy) * sz;
	  var out9 = (yz - wx) * sz;
	  var out10 = (1 - (xx + yy)) * sz;
	  out[0] = out0;
	  out[1] = out1;
	  out[2] = out2;
	  out[3] = 0;
	  out[4] = out4;
	  out[5] = out5;
	  out[6] = out6;
	  out[7] = 0;
	  out[8] = out8;
	  out[9] = out9;
	  out[10] = out10;
	  out[11] = 0;
	  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
	  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
	  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
	  out[15] = 1;
	  return out;
	}
	/**
	 * Calculates a 4x4 matrix from the given quaternion
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {ReadonlyQuat} q Quaternion to create matrix from
	 *
	 * @returns {mat4} out
	 */

	function fromQuat(out, q) {
	  var x = q[0],
	      y = q[1],
	      z = q[2],
	      w = q[3];
	  var x2 = x + x;
	  var y2 = y + y;
	  var z2 = z + z;
	  var xx = x * x2;
	  var yx = y * x2;
	  var yy = y * y2;
	  var zx = z * x2;
	  var zy = z * y2;
	  var zz = z * z2;
	  var wx = w * x2;
	  var wy = w * y2;
	  var wz = w * z2;
	  out[0] = 1 - yy - zz;
	  out[1] = yx + wz;
	  out[2] = zx - wy;
	  out[3] = 0;
	  out[4] = yx - wz;
	  out[5] = 1 - xx - zz;
	  out[6] = zy + wx;
	  out[7] = 0;
	  out[8] = zx + wy;
	  out[9] = zy - wx;
	  out[10] = 1 - xx - yy;
	  out[11] = 0;
	  out[12] = 0;
	  out[13] = 0;
	  out[14] = 0;
	  out[15] = 1;
	  return out;
	}
	/**
	 * Generates a frustum matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {Number} left Left bound of the frustum
	 * @param {Number} right Right bound of the frustum
	 * @param {Number} bottom Bottom bound of the frustum
	 * @param {Number} top Top bound of the frustum
	 * @param {Number} near Near bound of the frustum
	 * @param {Number} far Far bound of the frustum
	 * @returns {mat4} out
	 */

	function frustum(out, left, right, bottom, top, near, far) {
	  var rl = 1 / (right - left);
	  var tb = 1 / (top - bottom);
	  var nf = 1 / (near - far);
	  out[0] = near * 2 * rl;
	  out[1] = 0;
	  out[2] = 0;
	  out[3] = 0;
	  out[4] = 0;
	  out[5] = near * 2 * tb;
	  out[6] = 0;
	  out[7] = 0;
	  out[8] = (right + left) * rl;
	  out[9] = (top + bottom) * tb;
	  out[10] = (far + near) * nf;
	  out[11] = -1;
	  out[12] = 0;
	  out[13] = 0;
	  out[14] = far * near * 2 * nf;
	  out[15] = 0;
	  return out;
	}
	/**
	 * Generates a perspective projection matrix with the given bounds.
	 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
	 * which matches WebGL/OpenGL's clip volume.
	 * Passing null/undefined/no value for far will generate infinite projection matrix.
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {number} fovy Vertical field of view in radians
	 * @param {number} aspect Aspect ratio. typically viewport width/height
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum, can be null or Infinity
	 * @returns {mat4} out
	 */

	function perspectiveNO(out, fovy, aspect, near, far) {
	  var f = 1.0 / Math.tan(fovy / 2),
	      nf;
	  out[0] = f / aspect;
	  out[1] = 0;
	  out[2] = 0;
	  out[3] = 0;
	  out[4] = 0;
	  out[5] = f;
	  out[6] = 0;
	  out[7] = 0;
	  out[8] = 0;
	  out[9] = 0;
	  out[11] = -1;
	  out[12] = 0;
	  out[13] = 0;
	  out[15] = 0;

	  if (far != null && far !== Infinity) {
	    nf = 1 / (near - far);
	    out[10] = (far + near) * nf;
	    out[14] = 2 * far * near * nf;
	  } else {
	    out[10] = -1;
	    out[14] = -2 * near;
	  }

	  return out;
	}
	/**
	 * Alias for {@link mat4.perspectiveNO}
	 * @function
	 */

	var perspective = perspectiveNO;
	/**
	 * Generates a look-at matrix with the given eye position, focal point, and up axis.
	 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {ReadonlyVec3} eye Position of the viewer
	 * @param {ReadonlyVec3} center Point the viewer is looking at
	 * @param {ReadonlyVec3} up vec3 pointing up
	 * @returns {mat4} out
	 */

	function lookAt(out, eye, center, up) {
	  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
	  var eyex = eye[0];
	  var eyey = eye[1];
	  var eyez = eye[2];
	  var upx = up[0];
	  var upy = up[1];
	  var upz = up[2];
	  var centerx = center[0];
	  var centery = center[1];
	  var centerz = center[2];

	  if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
	    return identity(out);
	  }

	  z0 = eyex - centerx;
	  z1 = eyey - centery;
	  z2 = eyez - centerz;
	  len = 1 / Math.hypot(z0, z1, z2);
	  z0 *= len;
	  z1 *= len;
	  z2 *= len;
	  x0 = upy * z2 - upz * z1;
	  x1 = upz * z0 - upx * z2;
	  x2 = upx * z1 - upy * z0;
	  len = Math.hypot(x0, x1, x2);

	  if (!len) {
	    x0 = 0;
	    x1 = 0;
	    x2 = 0;
	  } else {
	    len = 1 / len;
	    x0 *= len;
	    x1 *= len;
	    x2 *= len;
	  }

	  y0 = z1 * x2 - z2 * x1;
	  y1 = z2 * x0 - z0 * x2;
	  y2 = z0 * x1 - z1 * x0;
	  len = Math.hypot(y0, y1, y2);

	  if (!len) {
	    y0 = 0;
	    y1 = 0;
	    y2 = 0;
	  } else {
	    len = 1 / len;
	    y0 *= len;
	    y1 *= len;
	    y2 *= len;
	  }

	  out[0] = x0;
	  out[1] = y0;
	  out[2] = z0;
	  out[3] = 0;
	  out[4] = x1;
	  out[5] = y1;
	  out[6] = z1;
	  out[7] = 0;
	  out[8] = x2;
	  out[9] = y2;
	  out[10] = z2;
	  out[11] = 0;
	  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
	  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
	  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
	  out[15] = 1;
	  return out;
	}
	/**
	 * Alias for {@link mat4.multiply}
	 * @function
	 */

	var mul = multiply$2;

	/**
	 * 3 Dimensional Vector
	 * @module vec3
	 */

	/**
	 * Creates a new, empty vec3
	 *
	 * @returns {vec3} a new 3D vector
	 */

	function create$3() {
	  var out = new ARRAY_TYPE(3);

	  if (ARRAY_TYPE != Float32Array) {
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	  }

	  return out;
	}
	/**
	 * Creates a new vec3 initialized with values from an existing vector
	 *
	 * @param {ReadonlyVec3} a vector to clone
	 * @returns {vec3} a new 3D vector
	 */

	function clone$4(a) {
	  var out = new ARRAY_TYPE(3);
	  out[0] = a[0];
	  out[1] = a[1];
	  out[2] = a[2];
	  return out;
	}
	/**
	 * Calculates the length of a vec3
	 *
	 * @param {ReadonlyVec3} a vector to calculate length of
	 * @returns {Number} length of a
	 */

	function length(a) {
	  var x = a[0];
	  var y = a[1];
	  var z = a[2];
	  return Math.hypot(x, y, z);
	}
	/**
	 * Creates a new vec3 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @returns {vec3} a new 3D vector
	 */

	function fromValues$3(x, y, z) {
	  var out = new ARRAY_TYPE(3);
	  out[0] = x;
	  out[1] = y;
	  out[2] = z;
	  return out;
	}
	/**
	 * Copy the values from one vec3 to another
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a the source vector
	 * @returns {vec3} out
	 */

	function copy$3(out, a) {
	  out[0] = a[0];
	  out[1] = a[1];
	  out[2] = a[2];
	  return out;
	}
	/**
	 * Set the components of a vec3 to the given values
	 *
	 * @param {vec3} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @returns {vec3} out
	 */

	function set$3(out, x, y, z) {
	  out[0] = x;
	  out[1] = y;
	  out[2] = z;
	  return out;
	}
	/**
	 * Adds two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a the first operand
	 * @param {ReadonlyVec3} b the second operand
	 * @returns {vec3} out
	 */

	function add(out, a, b) {
	  out[0] = a[0] + b[0];
	  out[1] = a[1] + b[1];
	  out[2] = a[2] + b[2];
	  return out;
	}
	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a the first operand
	 * @param {ReadonlyVec3} b the second operand
	 * @returns {vec3} out
	 */

	function subtract(out, a, b) {
	  out[0] = a[0] - b[0];
	  out[1] = a[1] - b[1];
	  out[2] = a[2] - b[2];
	  return out;
	}
	/**
	 * Multiplies two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a the first operand
	 * @param {ReadonlyVec3} b the second operand
	 * @returns {vec3} out
	 */

	function multiply$1(out, a, b) {
	  out[0] = a[0] * b[0];
	  out[1] = a[1] * b[1];
	  out[2] = a[2] * b[2];
	  return out;
	}
	/**
	 * Returns the minimum of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a the first operand
	 * @param {ReadonlyVec3} b the second operand
	 * @returns {vec3} out
	 */

	function min(out, a, b) {
	  out[0] = Math.min(a[0], b[0]);
	  out[1] = Math.min(a[1], b[1]);
	  out[2] = Math.min(a[2], b[2]);
	  return out;
	}
	/**
	 * Returns the maximum of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a the first operand
	 * @param {ReadonlyVec3} b the second operand
	 * @returns {vec3} out
	 */

	function max(out, a, b) {
	  out[0] = Math.max(a[0], b[0]);
	  out[1] = Math.max(a[1], b[1]);
	  out[2] = Math.max(a[2], b[2]);
	  return out;
	}
	/**
	 * Scales a vec3 by a scalar number
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec3} out
	 */

	function scale(out, a, b) {
	  out[0] = a[0] * b;
	  out[1] = a[1] * b;
	  out[2] = a[2] * b;
	  return out;
	}
	/**
	 * Adds two vec3's after scaling the second operand by a scalar value
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a the first operand
	 * @param {ReadonlyVec3} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec3} out
	 */

	function scaleAndAdd(out, a, b, scale) {
	  out[0] = a[0] + b[0] * scale;
	  out[1] = a[1] + b[1] * scale;
	  out[2] = a[2] + b[2] * scale;
	  return out;
	}
	/**
	 * Calculates the euclidian distance between two vec3's
	 *
	 * @param {ReadonlyVec3} a the first operand
	 * @param {ReadonlyVec3} b the second operand
	 * @returns {Number} distance between a and b
	 */

	function distance(a, b) {
	  var x = b[0] - a[0];
	  var y = b[1] - a[1];
	  var z = b[2] - a[2];
	  return Math.hypot(x, y, z);
	}
	/**
	 * Calculates the squared euclidian distance between two vec3's
	 *
	 * @param {ReadonlyVec3} a the first operand
	 * @param {ReadonlyVec3} b the second operand
	 * @returns {Number} squared distance between a and b
	 */

	function squaredDistance(a, b) {
	  var x = b[0] - a[0];
	  var y = b[1] - a[1];
	  var z = b[2] - a[2];
	  return x * x + y * y + z * z;
	}
	/**
	 * Calculates the squared length of a vec3
	 *
	 * @param {ReadonlyVec3} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */

	function squaredLength(a) {
	  var x = a[0];
	  var y = a[1];
	  var z = a[2];
	  return x * x + y * y + z * z;
	}
	/**
	 * Negates the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a vector to negate
	 * @returns {vec3} out
	 */

	function negate(out, a) {
	  out[0] = -a[0];
	  out[1] = -a[1];
	  out[2] = -a[2];
	  return out;
	}
	/**
	 * Normalize a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a vector to normalize
	 * @returns {vec3} out
	 */

	function normalize$2(out, a) {
	  var x = a[0];
	  var y = a[1];
	  var z = a[2];
	  var len = x * x + y * y + z * z;

	  if (len > 0) {
	    //TODO: evaluate use of glm_invsqrt here?
	    len = 1 / Math.sqrt(len);
	  }

	  out[0] = a[0] * len;
	  out[1] = a[1] * len;
	  out[2] = a[2] * len;
	  return out;
	}
	/**
	 * Calculates the dot product of two vec3's
	 *
	 * @param {ReadonlyVec3} a the first operand
	 * @param {ReadonlyVec3} b the second operand
	 * @returns {Number} dot product of a and b
	 */

	function dot(a, b) {
	  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	}
	/**
	 * Computes the cross product of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a the first operand
	 * @param {ReadonlyVec3} b the second operand
	 * @returns {vec3} out
	 */

	function cross(out, a, b) {
	  var ax = a[0],
	      ay = a[1],
	      az = a[2];
	  var bx = b[0],
	      by = b[1],
	      bz = b[2];
	  out[0] = ay * bz - az * by;
	  out[1] = az * bx - ax * bz;
	  out[2] = ax * by - ay * bx;
	  return out;
	}
	/**
	 * Performs a linear interpolation between two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a the first operand
	 * @param {ReadonlyVec3} b the second operand
	 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
	 * @returns {vec3} out
	 */

	function lerp(out, a, b, t) {
	  var ax = a[0];
	  var ay = a[1];
	  var az = a[2];
	  out[0] = ax + t * (b[0] - ax);
	  out[1] = ay + t * (b[1] - ay);
	  out[2] = az + t * (b[2] - az);
	  return out;
	}
	/**
	 * Transforms the vec3 with a mat4.
	 * 4th vector component is implicitly '1'
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a the vector to transform
	 * @param {ReadonlyMat4} m matrix to transform with
	 * @returns {vec3} out
	 */

	function transformMat4$2(out, a, m) {
	  var x = a[0],
	      y = a[1],
	      z = a[2];
	  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
	  w = w || 1.0;
	  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
	  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
	  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
	  return out;
	}
	/**
	 * Transforms the vec3 with a mat3.
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a the vector to transform
	 * @param {ReadonlyMat3} m the 3x3 matrix to transform with
	 * @returns {vec3} out
	 */

	function transformMat3(out, a, m) {
	  var x = a[0],
	      y = a[1],
	      z = a[2];
	  out[0] = x * m[0] + y * m[3] + z * m[6];
	  out[1] = x * m[1] + y * m[4] + z * m[7];
	  out[2] = x * m[2] + y * m[5] + z * m[8];
	  return out;
	}
	/**
	 * Transforms the vec3 with a quat
	 * Can also be used for dual quaternions. (Multiply it with the real part)
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a the vector to transform
	 * @param {ReadonlyQuat} q quaternion to transform with
	 * @returns {vec3} out
	 */

	function transformQuat(out, a, q) {
	  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
	  var qx = q[0],
	      qy = q[1],
	      qz = q[2],
	      qw = q[3];
	  var x = a[0],
	      y = a[1],
	      z = a[2]; // var qvec = [qx, qy, qz];
	  // var uv = vec3.cross([], qvec, a);

	  var uvx = qy * z - qz * y,
	      uvy = qz * x - qx * z,
	      uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

	  var uuvx = qy * uvz - qz * uvy,
	      uuvy = qz * uvx - qx * uvz,
	      uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

	  var w2 = qw * 2;
	  uvx *= w2;
	  uvy *= w2;
	  uvz *= w2; // vec3.scale(uuv, uuv, 2);

	  uuvx *= 2;
	  uuvy *= 2;
	  uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

	  out[0] = x + uvx + uuvx;
	  out[1] = y + uvy + uuvy;
	  out[2] = z + uvz + uuvz;
	  return out;
	}
	/**
	 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
	 *
	 * @param {ReadonlyVec3} a The first vector.
	 * @param {ReadonlyVec3} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */

	function exactEquals$1(a, b) {
	  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
	}
	/**
	 * Returns whether or not the vectors have approximately the same elements in the same position.
	 *
	 * @param {ReadonlyVec3} a The first vector.
	 * @param {ReadonlyVec3} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */

	function equals$3(a, b) {
	  var a0 = a[0],
	      a1 = a[1],
	      a2 = a[2];
	  var b0 = b[0],
	      b1 = b[1],
	      b2 = b[2];
	  return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
	}
	/**
	 * Alias for {@link vec3.length}
	 * @function
	 */

	var len = length;
	/**
	 * Perform some operation over an array of vec3s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */

	(function () {
	  var vec = create$3();
	  return function (a, stride, offset, count, fn, arg) {
	    var i, l;

	    if (!stride) {
	      stride = 3;
	    }

	    if (!offset) {
	      offset = 0;
	    }

	    if (count) {
	      l = Math.min(count * stride + offset, a.length);
	    } else {
	      l = a.length;
	    }

	    for (i = offset; i < l; i += stride) {
	      vec[0] = a[i];
	      vec[1] = a[i + 1];
	      vec[2] = a[i + 2];
	      fn(vec, vec, arg);
	      a[i] = vec[0];
	      a[i + 1] = vec[1];
	      a[i + 2] = vec[2];
	    }

	    return a;
	  };
	})();

	/**
	 * 4 Dimensional Vector
	 * @module vec4
	 */

	/**
	 * Creates a new, empty vec4
	 *
	 * @returns {vec4} a new 4D vector
	 */

	function create$2() {
	  var out = new ARRAY_TYPE(4);

	  if (ARRAY_TYPE != Float32Array) {
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	  }

	  return out;
	}
	/**
	 * Creates a new vec4 initialized with values from an existing vector
	 *
	 * @param {ReadonlyVec4} a vector to clone
	 * @returns {vec4} a new 4D vector
	 */

	function clone$3(a) {
	  var out = new ARRAY_TYPE(4);
	  out[0] = a[0];
	  out[1] = a[1];
	  out[2] = a[2];
	  out[3] = a[3];
	  return out;
	}
	/**
	 * Creates a new vec4 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {vec4} a new 4D vector
	 */

	function fromValues$2(x, y, z, w) {
	  var out = new ARRAY_TYPE(4);
	  out[0] = x;
	  out[1] = y;
	  out[2] = z;
	  out[3] = w;
	  return out;
	}
	/**
	 * Copy the values from one vec4 to another
	 *
	 * @param {vec4} out the receiving vector
	 * @param {ReadonlyVec4} a the source vector
	 * @returns {vec4} out
	 */

	function copy$2(out, a) {
	  out[0] = a[0];
	  out[1] = a[1];
	  out[2] = a[2];
	  out[3] = a[3];
	  return out;
	}
	/**
	 * Set the components of a vec4 to the given values
	 *
	 * @param {vec4} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {vec4} out
	 */

	function set$2(out, x, y, z, w) {
	  out[0] = x;
	  out[1] = y;
	  out[2] = z;
	  out[3] = w;
	  return out;
	}
	/**
	 * Normalize a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {ReadonlyVec4} a vector to normalize
	 * @returns {vec4} out
	 */

	function normalize$1(out, a) {
	  var x = a[0];
	  var y = a[1];
	  var z = a[2];
	  var w = a[3];
	  var len = x * x + y * y + z * z + w * w;

	  if (len > 0) {
	    len = 1 / Math.sqrt(len);
	  }

	  out[0] = x * len;
	  out[1] = y * len;
	  out[2] = z * len;
	  out[3] = w * len;
	  return out;
	}
	/**
	 * Transforms the vec4 with a mat4.
	 *
	 * @param {vec4} out the receiving vector
	 * @param {ReadonlyVec4} a the vector to transform
	 * @param {ReadonlyMat4} m matrix to transform with
	 * @returns {vec4} out
	 */

	function transformMat4$1(out, a, m) {
	  var x = a[0],
	      y = a[1],
	      z = a[2],
	      w = a[3];
	  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
	  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
	  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
	  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
	  return out;
	}
	/**
	 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
	 *
	 * @param {ReadonlyVec4} a The first vector.
	 * @param {ReadonlyVec4} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */

	function exactEquals(a, b) {
	  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
	}
	/**
	 * Returns whether or not the vectors have approximately the same elements in the same position.
	 *
	 * @param {ReadonlyVec4} a The first vector.
	 * @param {ReadonlyVec4} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */

	function equals$2(a, b) {
	  var a0 = a[0],
	      a1 = a[1],
	      a2 = a[2],
	      a3 = a[3];
	  var b0 = b[0],
	      b1 = b[1],
	      b2 = b[2],
	      b3 = b[3];
	  return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
	}
	/**
	 * Perform some operation over an array of vec4s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */

	(function () {
	  var vec = create$2();
	  return function (a, stride, offset, count, fn, arg) {
	    var i, l;

	    if (!stride) {
	      stride = 4;
	    }

	    if (!offset) {
	      offset = 0;
	    }

	    if (count) {
	      l = Math.min(count * stride + offset, a.length);
	    } else {
	      l = a.length;
	    }

	    for (i = offset; i < l; i += stride) {
	      vec[0] = a[i];
	      vec[1] = a[i + 1];
	      vec[2] = a[i + 2];
	      vec[3] = a[i + 3];
	      fn(vec, vec, arg);
	      a[i] = vec[0];
	      a[i + 1] = vec[1];
	      a[i + 2] = vec[2];
	      a[i + 3] = vec[3];
	    }

	    return a;
	  };
	})();

	/**
	 * Quaternion
	 * @module quat
	 */

	/**
	 * Creates a new identity quat
	 *
	 * @returns {quat} a new quaternion
	 */

	function create$1() {
	  var out = new ARRAY_TYPE(4);

	  if (ARRAY_TYPE != Float32Array) {
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	  }

	  out[3] = 1;
	  return out;
	}
	/**
	 * Sets a quat from the given angle and rotation axis,
	 * then returns it.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {ReadonlyVec3} axis the axis around which to rotate
	 * @param {Number} rad the angle in radians
	 * @returns {quat} out
	 **/

	function setAxisAngle(out, axis, rad) {
	  rad = rad * 0.5;
	  var s = Math.sin(rad);
	  out[0] = s * axis[0];
	  out[1] = s * axis[1];
	  out[2] = s * axis[2];
	  out[3] = Math.cos(rad);
	  return out;
	}
	/**
	 * Multiplies two quat's
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {ReadonlyQuat} a the first operand
	 * @param {ReadonlyQuat} b the second operand
	 * @returns {quat} out
	 */

	function multiply(out, a, b) {
	  var ax = a[0],
	      ay = a[1],
	      az = a[2],
	      aw = a[3];
	  var bx = b[0],
	      by = b[1],
	      bz = b[2],
	      bw = b[3];
	  out[0] = ax * bw + aw * bx + ay * bz - az * by;
	  out[1] = ay * bw + aw * by + az * bx - ax * bz;
	  out[2] = az * bw + aw * bz + ax * by - ay * bx;
	  out[3] = aw * bw - ax * bx - ay * by - az * bz;
	  return out;
	}
	/**
	 * Rotates a quaternion by the given angle about the X axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {ReadonlyQuat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */

	function rotateX(out, a, rad) {
	  rad *= 0.5;
	  var ax = a[0],
	      ay = a[1],
	      az = a[2],
	      aw = a[3];
	  var bx = Math.sin(rad),
	      bw = Math.cos(rad);
	  out[0] = ax * bw + aw * bx;
	  out[1] = ay * bw + az * bx;
	  out[2] = az * bw - ay * bx;
	  out[3] = aw * bw - ax * bx;
	  return out;
	}
	/**
	 * Rotates a quaternion by the given angle about the Y axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {ReadonlyQuat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */

	function rotateY(out, a, rad) {
	  rad *= 0.5;
	  var ax = a[0],
	      ay = a[1],
	      az = a[2],
	      aw = a[3];
	  var by = Math.sin(rad),
	      bw = Math.cos(rad);
	  out[0] = ax * bw - az * by;
	  out[1] = ay * bw + aw * by;
	  out[2] = az * bw + ax * by;
	  out[3] = aw * bw - ay * by;
	  return out;
	}
	/**
	 * Performs a spherical linear interpolation between two quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {ReadonlyQuat} a the first operand
	 * @param {ReadonlyQuat} b the second operand
	 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
	 * @returns {quat} out
	 */

	function slerp(out, a, b, t) {
	  // benchmarks:
	  //    http://jsperf.com/quaternion-slerp-implementations
	  var ax = a[0],
	      ay = a[1],
	      az = a[2],
	      aw = a[3];
	  var bx = b[0],
	      by = b[1],
	      bz = b[2],
	      bw = b[3];
	  var omega, cosom, sinom, scale0, scale1; // calc cosine

	  cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

	  if (cosom < 0.0) {
	    cosom = -cosom;
	    bx = -bx;
	    by = -by;
	    bz = -bz;
	    bw = -bw;
	  } // calculate coefficients


	  if (1.0 - cosom > EPSILON) {
	    // standard case (slerp)
	    omega = Math.acos(cosom);
	    sinom = Math.sin(omega);
	    scale0 = Math.sin((1.0 - t) * omega) / sinom;
	    scale1 = Math.sin(t * omega) / sinom;
	  } else {
	    // "from" and "to" quaternions are very close
	    //  ... so we can do a linear interpolation
	    scale0 = 1.0 - t;
	    scale1 = t;
	  } // calculate final values


	  out[0] = scale0 * ax + scale1 * bx;
	  out[1] = scale0 * ay + scale1 * by;
	  out[2] = scale0 * az + scale1 * bz;
	  out[3] = scale0 * aw + scale1 * bw;
	  return out;
	}
	/**
	 * Calculates the conjugate of a quat
	 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {ReadonlyQuat} a quat to calculate conjugate of
	 * @returns {quat} out
	 */

	function conjugate(out, a) {
	  out[0] = -a[0];
	  out[1] = -a[1];
	  out[2] = -a[2];
	  out[3] = a[3];
	  return out;
	}
	/**
	 * Creates a quaternion from the given 3x3 rotation matrix.
	 *
	 * NOTE: The resultant quaternion is not normalized, so you should be sure
	 * to renormalize the quaternion yourself where necessary.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {ReadonlyMat3} m rotation matrix
	 * @returns {quat} out
	 * @function
	 */

	function fromMat3(out, m) {
	  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
	  // article "Quaternion Calculus and Fast Animation".
	  var fTrace = m[0] + m[4] + m[8];
	  var fRoot;

	  if (fTrace > 0.0) {
	    // |w| > 1/2, may as well choose w > 1/2
	    fRoot = Math.sqrt(fTrace + 1.0); // 2w

	    out[3] = 0.5 * fRoot;
	    fRoot = 0.5 / fRoot; // 1/(4w)

	    out[0] = (m[5] - m[7]) * fRoot;
	    out[1] = (m[6] - m[2]) * fRoot;
	    out[2] = (m[1] - m[3]) * fRoot;
	  } else {
	    // |w| <= 1/2
	    var i = 0;
	    if (m[4] > m[0]) i = 1;
	    if (m[8] > m[i * 3 + i]) i = 2;
	    var j = (i + 1) % 3;
	    var k = (i + 2) % 3;
	    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
	    out[i] = 0.5 * fRoot;
	    fRoot = 0.5 / fRoot;
	    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
	    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
	    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
	  }

	  return out;
	}
	/**
	 * Creates a new quat initialized with values from an existing quaternion
	 *
	 * @param {ReadonlyQuat} a quaternion to clone
	 * @returns {quat} a new quaternion
	 * @function
	 */

	var clone$2 = clone$3;
	/**
	 * Creates a new quat initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {quat} a new quaternion
	 * @function
	 */

	var fromValues$1 = fromValues$2;
	/**
	 * Copy the values from one quat to another
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {ReadonlyQuat} a the source quaternion
	 * @returns {quat} out
	 * @function
	 */

	var copy$1 = copy$2;
	/**
	 * Set the components of a quat to the given values
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {quat} out
	 * @function
	 */

	var set$1 = set$2;
	/**
	 * Normalize a quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {ReadonlyQuat} a quaternion to normalize
	 * @returns {quat} out
	 * @function
	 */

	var normalize = normalize$1;
	/**
	 * Returns whether or not the quaternions have approximately the same elements in the same position.
	 *
	 * @param {ReadonlyQuat} a The first vector.
	 * @param {ReadonlyQuat} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */

	var equals$1 = equals$2;
	/**
	 * Sets a quaternion to represent the shortest rotation from one
	 * vector to another.
	 *
	 * Both vectors are assumed to be unit length.
	 *
	 * @param {quat} out the receiving quaternion.
	 * @param {ReadonlyVec3} a the initial vector
	 * @param {ReadonlyVec3} b the destination vector
	 * @returns {quat} out
	 */

	var rotationTo = function () {
	  var tmpvec3 = create$3();
	  var xUnitVec3 = fromValues$3(1, 0, 0);
	  var yUnitVec3 = fromValues$3(0, 1, 0);
	  return function (out, a, b) {
	    var dot$1 = dot(a, b);

	    if (dot$1 < -0.999999) {
	      cross(tmpvec3, xUnitVec3, a);
	      if (len(tmpvec3) < 0.000001) cross(tmpvec3, yUnitVec3, a);
	      normalize$2(tmpvec3, tmpvec3);
	      setAxisAngle(out, tmpvec3, Math.PI);
	      return out;
	    } else if (dot$1 > 0.999999) {
	      out[0] = 0;
	      out[1] = 0;
	      out[2] = 0;
	      out[3] = 1;
	      return out;
	    } else {
	      cross(tmpvec3, a, b);
	      out[0] = tmpvec3[0];
	      out[1] = tmpvec3[1];
	      out[2] = tmpvec3[2];
	      out[3] = 1 + dot$1;
	      return normalize(out, out);
	    }
	  };
	}();
	/**
	 * Performs a spherical linear interpolation with two control points
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {ReadonlyQuat} a the first operand
	 * @param {ReadonlyQuat} b the second operand
	 * @param {ReadonlyQuat} c the third operand
	 * @param {ReadonlyQuat} d the fourth operand
	 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
	 * @returns {quat} out
	 */

	(function () {
	  var temp1 = create$1();
	  var temp2 = create$1();
	  return function (out, a, b, c, d, t) {
	    slerp(temp1, a, d, t);
	    slerp(temp2, b, c, t);
	    slerp(out, temp1, temp2, 2 * t * (1 - t));
	    return out;
	  };
	})();
	/**
	 * Sets the specified quaternion with values corresponding to the given
	 * axes. Each axis is a vec3 and is expected to be unit length and
	 * perpendicular to all other specified axes.
	 *
	 * @param {ReadonlyVec3} view  the vector representing the viewing direction
	 * @param {ReadonlyVec3} right the vector representing the local "right" direction
	 * @param {ReadonlyVec3} up    the vector representing the local "up" direction
	 * @returns {quat} out
	 */

	(function () {
	  var matr = create$5();
	  return function (out, view, right, up) {
	    matr[0] = right[0];
	    matr[3] = right[1];
	    matr[6] = right[2];
	    matr[1] = up[0];
	    matr[4] = up[1];
	    matr[7] = up[2];
	    matr[2] = -view[0];
	    matr[5] = -view[1];
	    matr[8] = -view[2];
	    return normalize(out, fromMat3(out, matr));
	  };
	})();

	/**
	 * 2 Dimensional Vector
	 * @module vec2
	 */

	/**
	 * Creates a new, empty vec2
	 *
	 * @returns {vec2} a new 2D vector
	 */

	function create() {
	  var out = new ARRAY_TYPE(2);

	  if (ARRAY_TYPE != Float32Array) {
	    out[0] = 0;
	    out[1] = 0;
	  }

	  return out;
	}
	/**
	 * Creates a new vec2 initialized with values from an existing vector
	 *
	 * @param {ReadonlyVec2} a vector to clone
	 * @returns {vec2} a new 2D vector
	 */

	function clone$1(a) {
	  var out = new ARRAY_TYPE(2);
	  out[0] = a[0];
	  out[1] = a[1];
	  return out;
	}
	/**
	 * Creates a new vec2 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {vec2} a new 2D vector
	 */

	function fromValues(x, y) {
	  var out = new ARRAY_TYPE(2);
	  out[0] = x;
	  out[1] = y;
	  return out;
	}
	/**
	 * Copy the values from one vec2 to another
	 *
	 * @param {vec2} out the receiving vector
	 * @param {ReadonlyVec2} a the source vector
	 * @returns {vec2} out
	 */

	function copy(out, a) {
	  out[0] = a[0];
	  out[1] = a[1];
	  return out;
	}
	/**
	 * Set the components of a vec2 to the given values
	 *
	 * @param {vec2} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {vec2} out
	 */

	function set(out, x, y) {
	  out[0] = x;
	  out[1] = y;
	  return out;
	}
	/**
	 * Transforms the vec2 with a mat4
	 * 3rd vector component is implicitly '0'
	 * 4th vector component is implicitly '1'
	 *
	 * @param {vec2} out the receiving vector
	 * @param {ReadonlyVec2} a the vector to transform
	 * @param {ReadonlyMat4} m matrix to transform with
	 * @returns {vec2} out
	 */

	function transformMat4(out, a, m) {
	  var x = a[0];
	  var y = a[1];
	  out[0] = m[0] * x + m[4] * y + m[12];
	  out[1] = m[1] * x + m[5] * y + m[13];
	  return out;
	}
	/**
	 * Returns whether or not the vectors have approximately the same elements in the same position.
	 *
	 * @param {ReadonlyVec2} a The first vector.
	 * @param {ReadonlyVec2} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */

	function equals(a, b) {
	  var a0 = a[0],
	      a1 = a[1];
	  var b0 = b[0],
	      b1 = b[1];
	  return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1));
	}
	/**
	 * Perform some operation over an array of vec2s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */

	(function () {
	  var vec = create();
	  return function (a, stride, offset, count, fn, arg) {
	    var i, l;

	    if (!stride) {
	      stride = 2;
	    }

	    if (!offset) {
	      offset = 0;
	    }

	    if (count) {
	      l = Math.min(count * stride + offset, a.length);
	    } else {
	      l = a.length;
	    }

	    for (i = offset; i < l; i += stride) {
	      vec[0] = a[i];
	      vec[1] = a[i + 1];
	      fn(vec, vec, arg);
	      a[i] = vec[0];
	      a[i + 1] = vec[1];
	    }

	    return a;
	  };
	})();

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Constants {
	}
	Constants.TWO_PI = 6.283185307179586;
	Constants.PI = 3.141592653589793;
	Constants.PI_OVER_TWO = 1.5707963267948966;
	Constants.PI_OVER_THREE = 1.0471975511965976;
	Constants.PI_OVER_FOUR = 0.7853981633974483;
	Constants.PI_OVER_SIX = 0.5235987755982988;
	Constants.LOG_2 = 0.6931471805599453;
	Constants.RADIANS_PER_DEGREE = 0.017453292519943295;
	Constants.DEGREES_PER_RADIAN = 57.29577951308232;
	Constants.ROOT_TWO = 1.4142135623730951;
	Constants.ROOT_TWO_OVER_TWO = 0.7071067811865476;
	Constants.ROOT_THREE = 1.7320508075688772;
	Constants.ROOT_THREE_OVER_TWO = 0.8660254037844386;
	Constants.ROOT_THREE_OVER_THREE = 0.5773502691896257;
	Constants.VECTOR2_ZERO = fromValues(0, 0);
	Constants.VECTOR2_ONE = fromValues(1, 1);
	Constants.VECTOR2_UNITX = fromValues(1, 0);
	Constants.VECTOR2_UNITY = fromValues(0, 1);
	Constants.VECTOR3_ZERO = fromValues$3(0, 0, 0);
	Constants.VECTOR3_ONE = fromValues$3(1, 1, 1);
	Constants.VECTOR3_UNITX = fromValues$3(1, 0, 0);
	Constants.VECTOR3_UNITY = fromValues$3(0, 1, 0);
	Constants.VECTOR3_UNITZ = fromValues$3(0, 0, 1);
	Constants.VECTOR3_REFLECTX = fromValues$3(1, -1, -1);
	Constants.VECTOR3_REFLECTY = fromValues$3(-1, 1, -1);
	Constants.VECTOR3_REFLECTZ = fromValues$3(-1, -1, 1);
	Constants.VECTOR4_ZERO = fromValues$2(0, 0, 0, 0);
	Constants.VECTOR4_ONE = fromValues$2(1, 1, 1, 1);
	Constants.VECTOR4_UNITX = fromValues$2(1, 0, 0, 0);
	Constants.VECTOR4_UNITY = fromValues$2(0, 1, 0, 0);
	Constants.VECTOR4_UNITZ = fromValues$2(0, 0, 1, 0);
	Constants.VECTOR4_UNITW = fromValues$2(0, 0, 0, 1);
	Constants.MAT3_IDENTITY = create$5();
	Constants.MAT4_IDENTITY = create$4();
	Constants.MAT4_ROTATION_MINUS_90 = fromValues$4(0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
	Constants.QUAT_IDENTITY = create$1();
	Constants.QUAT_ROTATEX_PLUS_90 = fromValues$1(Constants.ROOT_TWO_OVER_TWO, 0, 0, Constants.ROOT_TWO_OVER_TWO);
	Constants.QUAT_ROTATEX_MINUS_90 = fromValues$1(-Constants.ROOT_TWO_OVER_TWO, 0, 0, Constants.ROOT_TWO_OVER_TWO);
	Constants.QUAT_ROTATEY_PLUS_90 = fromValues$1(0, Constants.ROOT_TWO_OVER_TWO, 0, Constants.ROOT_TWO_OVER_TWO);
	Constants.QUAT_ROTATEY_MINUS_90 = fromValues$1(0, -Constants.ROOT_TWO_OVER_TWO, 0, Constants.ROOT_TWO_OVER_TWO);
	Constants.QUAT_ROTATEZ_PLUS_90 = fromValues$1(0, 0, Constants.ROOT_TWO_OVER_TWO, Constants.ROOT_TWO_OVER_TWO);
	Constants.QUAT_ROTATEZ_MINUS_90 = fromValues$1(0, 0, -Constants.ROOT_TWO_OVER_TWO, Constants.ROOT_TWO_OVER_TWO);
	Constants.MILLISECONDS_PER_DAY = 86400000;

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class MathHelper {
	    static simpleLinearRegression(points) {
	        const n = points.length;
	        let sumX = 0;
	        let sumY = 0;
	        let sumXY = 0;
	        let sumXX = 0;
	        for (let i = 0; i < n; i++) {
	            sumX += points[i].x;
	            sumY += points[i].y;
	            sumXY += points[i].x * points[i].y;
	            sumXX += points[i].x * points[i].x;
	        }
	        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
	        const yIntercept = (sumY - slope * sumX) / n;
	        return { slope, yIntercept };
	    }
	    static clamp(value, min, max) {
	        return Math.max(Math.min(value, max), min);
	    }
	    static lerp(value1, value2, amount) {
	        return value1 + (value2 - value1) * amount;
	    }
	    static normalize(value, min, max, from = 0, to = 1) {
	        return max - min == 0 ? 0 : Math.max(Math.min((to - from) * (value - min) / (max - min) + from, to), from);
	    }
	    static splitExponent(value, result) {
	        let exponent = Math.round(Math.log10(Math.abs(value)));
	        let coefficient = value / Math.pow(10, exponent);
	        if (coefficient < 1) {
	            coefficient *= 10;
	            exponent--;
	        }
	        result[0] = coefficient;
	        result[1] = exponent;
	    }
	    static combineExponent(mantissa, exponent) {
	        return mantissa * Math.pow(10, exponent);
	    }
	    static isPowerOf2(value) {
	        return (value & (value - 1)) == 0;
	    }
	}
	class PseudoRandom {
	    constructor(seed) {
	        this._seed = seed % 2147483647;
	        if (this._seed <= 0)
	            this._seed += 2147483646;
	    }
	    next() {
	        return this._seed = this._seed * 16807 % 2147483647;
	    }
	    ;
	    nextFloat() {
	        return (this.next() - 1) / 2147483646;
	    }
	    ;
	    nextInteger(min, max) {
	        return Math.floor(this.nextFloat() * (max - min + 1) + min);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class AngleHelper {
	    static degreesToRadians(degrees) {
	        return degrees * Constants.RADIANS_PER_DEGREE;
	    }
	    static radiansToDegrees(radians) {
	        return radians * Constants.DEGREES_PER_RADIAN;
	    }
	    static wrapAngle(angle) {
	        if (angle > Constants.PI)
	            angle = angle - Constants.TWO_PI;
	        else if (angle < -Constants.PI)
	            angle += Constants.TWO_PI;
	        return angle;
	    }
	    static sphericalToCartesian(altitude, longitude, latitude, result) {
	        latitude = AngleHelper.degreesToRadians(latitude);
	        longitude = AngleHelper.degreesToRadians(longitude);
	        const scale = Math.cos(latitude);
	        result[0] = altitude * scale * Math.sin(longitude);
	        result[1] = altitude * Math.sin(latitude);
	        result[2] = altitude * scale * Math.cos(longitude);
	    }
	    static cartesianToSpherical(x, y, z, result) {
	        result[0] = Math.atan2(x, z);
	        result[1] = Math.asin(y);
	    }
	    static angleBetweenVectors(from, to) {
	        if (exactEquals$1(from, to)) {
	            return 0;
	        }
	        else {
	            const dot$1 = MathHelper.clamp(dot(from, to), -1, 1);
	            return Math.acos(dot$1);
	        }
	    }
	    static signedAngleBetweenVectors(from, to, up) {
	        if (exactEquals$1(from, to)) {
	            return 0;
	        }
	        else {
	            const dot$1 = MathHelper.clamp(dot(from, to), -1, 1);
	            let angle = Math.acos(dot$1);
	            cross(AngleHelper._vec3, from, to);
	            if (dot(AngleHelper._vec3, up) < 0) {
	                angle = -angle;
	            }
	            return angle;
	        }
	    }
	}
	AngleHelper._vec3 = create$3();

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class CameraBase {
	    getView(view) {
	        this.getPosition(view.position);
	    }
	    setView(view, isSmooth) {
	        this.setPosition(view.position, isSmooth);
	    }
	    lerpView(from, to, time) {
	        lerp(this._vec3, from.position, to.position, time);
	        this.setPosition(this._vec3, false);
	    }
	    get vMatrices() { return this._vMatrices; }
	    get inverseVMatrices() { return this._inverseVMatrices; }
	    get mvMatrices() { return this._mvMatrices; }
	    get pMatrices() { return this._pMatrices; }
	    get inversePMatrices() { return this._inversePMatrices; }
	    get pickVMatrix() { return this._pickVMatrix; }
	    get rMatrix() { return this._mat3; }
	    getOrbit(value) { copy$1(value, this._orbitRotation); }
	    setOrbit(value, isSmooth) {
	        copy$1(this._orbitRotation, value);
	        if (!isSmooth) {
	            copy$1(this._smoothedOrbitRotation, value);
	        }
	    }
	    ;
	    getPosition(value) { copy$3(value, this._cameraPosition); }
	    setPosition(value, isSmooth) {
	        copy$3(this._cameraPosition, value);
	        if (!isSmooth) {
	            copy$3(this._smoothedCameraPosition, value);
	        }
	    }
	    ;
	    constructor(core) {
	        this._core = core;
	        this._vec3 = create$3();
	        this._quat = create$1();
	        this._mat3 = create$5();
	        this._right = create$3();
	        this._up = create$3();
	        this._forward = create$3();
	        this._modelManipulationOrigin = create$3();
	        this.modelPosition = create$3();
	        this.modelScale = create$3();
	        this.modelRotation = create$1();
	        this._orbitRotation = create$1();
	        this._orbitDirection = create$1();
	        this._smoothedOrbitRotation = create$1();
	        this._smoothedCameraPosition = create$3();
	        this._smoothedCameraRotation = create$1();
	        this._cameraPosition = create$3();
	        this._cameraRotation = create$1();
	        this._combinedPosition = create$3();
	        this._combinedRotation = create$1();
	        this._leftToRightEye = create$3();
	        this._pickVMatrix = create$4();
	        this._eyePositions = [create$3(), create$3()];
	        this._vMatrices = [create$4(), create$4()];
	        this._mvMatrices = [create$4(), create$4()];
	        this._pMatrices = [create$4(), create$4()];
	        this._inverseVMatrices = [create$4(), create$4()];
	        this._inversePMatrices = [create$4(), create$4()];
	    }
	    reset(isSmooth) {
	        copy$3(this._cameraPosition, Constants.VECTOR3_ZERO);
	        copy$1(this._cameraRotation, Constants.QUAT_IDENTITY);
	        copy$1(this._orbitRotation, Constants.QUAT_IDENTITY);
	        if (!isSmooth) {
	            this.syncSmooth();
	        }
	    }
	    update(elapsedTime) {
	        let amount = Math.min(elapsedTime * this._core.config.positionSmoothing, 1);
	        lerp(this._smoothedCameraPosition, this._smoothedCameraPosition, this._cameraPosition, amount);
	        amount = Math.min(elapsedTime * this._core.config.rotationSmoothing, 1);
	        slerp(this._smoothedCameraRotation, this._smoothedCameraRotation, this._cameraRotation, amount);
	        slerp(this._smoothedOrbitRotation, this._smoothedOrbitRotation, this._orbitRotation, amount);
	        const epsilon = 0.000001;
	        let x;
	        let y;
	        let z;
	        let w;
	        x = this._smoothedCameraPosition[0] - this._cameraPosition[0];
	        y = this._smoothedCameraPosition[1] - this._cameraPosition[1];
	        z = this._smoothedCameraPosition[2] - this._cameraPosition[2];
	        if (Math.abs(x) < epsilon && Math.abs(y) < epsilon && Math.abs(z) < epsilon) {
	            copy$3(this._smoothedCameraPosition, this._cameraPosition);
	        }
	        x = this._smoothedCameraRotation[0] - this._cameraRotation[0];
	        y = this._smoothedCameraRotation[1] - this._cameraRotation[1];
	        z = this._smoothedCameraRotation[2] - this._cameraRotation[2];
	        w = this._smoothedCameraRotation[3] - this._cameraRotation[3];
	        if (Math.abs(x) < epsilon && Math.abs(y) < epsilon && Math.abs(z) < epsilon && Math.abs(w) < epsilon) {
	            copy$1(this._smoothedCameraRotation, this._cameraRotation);
	        }
	        x = this._smoothedOrbitRotation[0] - this._orbitRotation[0];
	        y = this._smoothedOrbitRotation[1] - this._orbitRotation[1];
	        z = this._smoothedOrbitRotation[2] - this._orbitRotation[2];
	        w = this._smoothedOrbitRotation[3] - this._orbitRotation[3];
	        if (Math.abs(x) < epsilon && Math.abs(y) < epsilon && Math.abs(z) < epsilon && Math.abs(w) < epsilon) {
	            copy$1(this._smoothedOrbitRotation, this._orbitRotation);
	        }
	        normalize(this._smoothedCameraRotation, this._smoothedCameraRotation);
	        normalize(this._smoothedOrbitRotation, this._smoothedOrbitRotation);
	        conjugate(this._orbitDirection, this._smoothedOrbitRotation);
	        transformMat4$2(this._modelManipulationOrigin, this.modelManipulationOrigin, this.modelMMatrix);
	        subtract(this._vec3, this._smoothedCameraPosition, this._modelManipulationOrigin);
	        transformQuat(this._combinedPosition, this._vec3, this._orbitDirection);
	        add(this._combinedPosition, this._combinedPosition, this._modelManipulationOrigin);
	        multiply(this._combinedRotation, this._orbitDirection, this._smoothedCameraRotation);
	        fromQuat$1(this._mat3, this._combinedRotation);
	        this._right[0] = this._mat3[0];
	        this._right[1] = this._mat3[1];
	        this._right[2] = this._mat3[2];
	        this._up[0] = this._mat3[3];
	        this._up[1] = this._mat3[4];
	        this._up[2] = this._mat3[5];
	        this._forward[0] = this._mat3[6];
	        this._forward[1] = this._mat3[7];
	        this._forward[2] = this._mat3[8];
	        const view = this._vMatrices[0];
	        view[0] = this._right[0];
	        view[1] = this._up[0];
	        view[2] = this._forward[0];
	        view[4] = this._right[1];
	        view[5] = this._up[1];
	        view[6] = this._forward[1];
	        view[8] = this._right[2];
	        view[9] = this._up[2];
	        view[10] = this._forward[2];
	        view[12] = -dot(this._right, this._combinedPosition);
	        view[13] = -dot(this._up, this._combinedPosition);
	        view[14] = -dot(this._forward, this._combinedPosition);
	        const aspectRatio = this.width / this.height;
	        if (this._core.config.stereoMode == StereoMode.none) {
	            if (this._core.config.tilesX != 1 || this._core.config.tilesY != 1) {
	                const top = Math.tan(this._core.config.fov * 0.5) * this._core.config.nearPlane;
	                const bottom = -top;
	                const left = -aspectRatio * top;
	                const right = aspectRatio * top;
	                const width = right - left;
	                const height = top - bottom;
	                const tileWidth = width / this._core.config.tilesX;
	                const tileHeight = height / this._core.config.tilesY;
	                frustum(this._pMatrices[0], left + this._core.config.tileOffsetX * tileWidth, left + (this._core.config.tileOffsetX + 1) * tileWidth, bottom + (this._core.config.tilesY - this._core.config.tileOffsetY - 1) * tileHeight, bottom + (this._core.config.tilesY - this._core.config.tileOffsetY) * tileHeight, this._core.config.nearPlane, this._core.config.farPlane);
	            }
	            else {
	                perspective(this.pMatrices[0], this._core.config.fov, aspectRatio, this._core.config.nearPlane, this._core.config.farPlane);
	            }
	            multiply$2(this._mvMatrices[0], this._vMatrices[0], this.modelMMatrix);
	            invert(this._inverseVMatrices[0], this.vMatrices[0]);
	            invert(this._inversePMatrices[0], this.pMatrices[0]);
	        }
	        else {
	            cross(this._leftToRightEye, this._forward, this._up);
	            normalize$2(this._leftToRightEye, this._leftToRightEye);
	            scaleAndAdd(this._eyePositions[0], this._combinedPosition, this._leftToRightEye, -this._core.config.ipd);
	            scaleAndAdd(this._eyePositions[1], this._combinedPosition, this._leftToRightEye, this._core.config.ipd);
	            this._vMatrices[0][12] += this._core.config.ipd * 0.5;
	            copy$4(this._vMatrices[1], this._vMatrices[0]);
	            this._vMatrices[1][12] -= this._core.config.ipd;
	            const frustumShift = this._core.config.ipd * 0.5 * this._core.config.nearPlane / this._core.config.screenDistance;
	            const top = Math.tan(this._core.config.fov * 0.5) * this._core.config.nearPlane;
	            const bottom = -top;
	            let left = -aspectRatio * top + frustumShift;
	            let right = aspectRatio * top + frustumShift;
	            frustum(this._pMatrices[0], left, right, bottom, top, this._core.config.nearPlane, this._core.config.farPlane);
	            left = -aspectRatio * top - frustumShift;
	            right = aspectRatio * top - frustumShift;
	            frustum(this._pMatrices[1], left, right, bottom, top, this._core.config.nearPlane, this._core.config.farPlane);
	            multiply$2(this._mvMatrices[0], this._vMatrices[0], this.modelMMatrix);
	            multiply$2(this._mvMatrices[1], this._vMatrices[1], this.modelMMatrix);
	            invert(this._inverseVMatrices[0], this._vMatrices[0]);
	            invert(this._inversePMatrices[0], this._pMatrices[0]);
	            copy$4(this._inverseVMatrices[1], this._inverseVMatrices[0]);
	            this._inverseVMatrices[1][12] += this._core.config.ipd;
	            invert(this._inversePMatrices[1], this._pMatrices[1]);
	        }
	        if (this._core.config.isDebugVisible) {
	            this._core.debugText.addLine(`cam off ${this._cameraPosition[0] < 0 ? "" : " "}${this._cameraPosition[0].toFixed(3)},${this._cameraPosition[1] < 0 ? "" : " "}${this._cameraPosition[1].toFixed(3)},${this._cameraPosition[2] < 0 ? "" : " "}${this._cameraPosition[2].toFixed(3)}`);
	            this._core.debugText.addLine(`cam pos ${this._combinedPosition[0] < 0 ? "" : " "}${this._combinedPosition[0].toFixed(3)},${this._combinedPosition[1] < 0 ? "" : " "}${this._combinedPosition[1].toFixed(3)},${this._combinedPosition[2] < 0 ? "" : " "}${this._combinedPosition[2].toFixed(3)}`);
	            this._core.debugText.addLine(`cam rot ${this._combinedRotation[0] < 0 ? "" : " "}${this._combinedRotation[0].toFixed(3)},${this._combinedRotation[1] < 0 ? "" : " "}${this._combinedRotation[1].toFixed(3)},${this._combinedRotation[2] < 0 ? "" : " "}${this._combinedRotation[2].toFixed(3)},${this._combinedRotation[3] < 0 ? "" : " "}${this._combinedRotation[3].toFixed(3)}`);
	        }
	    }
	    _zoom(direction, distance) {
	        scaleAndAdd(this._cameraPosition, this._cameraPosition, direction, distance);
	    }
	    rotate(translationDelta) { }
	    zoom(zoomDelta, x, y) {
	        this.unproject(this._vec3, x, y, 1);
	        normalize$2(this._vec3, this._vec3);
	        const distance$1 = zoomDelta * distance(this._combinedPosition, this.modelPosition);
	        transformQuat(this._vec3, this._vec3, this._orbitRotation);
	        this._zoom(this._vec3, distance$1);
	    }
	    _twist(axis, angle) { }
	    twist(angle, x, y) { }
	    updatePickVMatrix(x, y) {
	        this.unproject(this._vec3, x, y, 1);
	        lookAt(this._pickVMatrix, this._combinedPosition, this._vec3, this._up);
	    }
	    syncSmooth() {
	        copy$3(this._smoothedCameraPosition, this._cameraPosition);
	        copy$1(this._smoothedCameraRotation, this._cameraRotation);
	        copy$1(this._smoothedOrbitRotation, this._orbitRotation);
	    }
	    updateModelManipulationOrigin(from, to) {
	        const a = create$3();
	        const b = create$3();
	        const c = create$3();
	        const d = create$3();
	        transformMat4$2(a, from, this.modelMMatrix);
	        transformMat4$2(b, to, this.modelMMatrix);
	        subtract(a, this._cameraPosition, a);
	        subtract(b, this._cameraPosition, b);
	        transformQuat(c, a, this._orbitDirection);
	        transformQuat(d, b, this._orbitDirection);
	        subtract(c, c, a);
	        subtract(d, d, b);
	        subtract(this._vec3, c, d);
	        transformQuat(this._vec3, this._vec3, this._orbitRotation);
	        add(this._cameraPosition, this._cameraPosition, this._vec3);
	        add(this._smoothedCameraPosition, this._smoothedCameraPosition, this._vec3);
	    }
	    unproject(position, x, y, z) {
	        set$3(position, 2 * x / this.width - 1, 1 - 2 * y / this.height, z);
	        transformMat4$2(position, position, this._inversePMatrices[0]);
	        transformMat4$2(position, position, this._inverseVMatrices[0]);
	    }
	    translate(translationDelta) {
	        const distance$1 = distance(this.modelPosition, this._combinedPosition);
	        const height = 2 * Math.tan(this._core.config.fov / 2) * distance$1 / this.height;
	        set$3(this._vec3, height * translationDelta[0], -height * translationDelta[1], 0);
	        transformQuat(this._vec3, this._vec3, this._combinedRotation);
	        transformQuat(this._vec3, this._vec3, this._orbitRotation);
	        subtract(this._cameraPosition, this._cameraPosition, this._vec3);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class AltAzimuthCamera extends CameraBase {
	    getView(view) {
	        super.getView(view);
	        view.altitude = this.altitude;
	        view.azimuth = this.azimuth;
	        view.fov = this._core.config.fov;
	    }
	    setView(view, isSmooth) {
	        super.setView(view, isSmooth);
	        this.setAltAzimuth(view.altitude, view.azimuth, isSmooth);
	        this._core.config.fov = view.fov;
	    }
	    lerpView(from, to, time) {
	        super.lerpView(from, to, time);
	        this.setAltAzimuth(MathHelper.lerp(from.altitude, to.altitude, time), MathHelper.lerp(from.azimuth, to.azimuth, time), false);
	        this._core.config.fov = MathHelper.lerp(from.fov, to.fov, time);
	    }
	    update(elapsedTime) {
	        super.update(elapsedTime);
	        if (this._core.config.isDebugVisible) {
	            const altitude = AngleHelper.radiansToDegrees(this.altitude);
	            const azimuth = AngleHelper.radiansToDegrees(this.azimuth);
	            this._core.debugText.addLine(`cam alt ${altitude < 0 ? "" : " "}${altitude.toFixed(1)}`);
	            this._core.debugText.addLine(`cam azi ${azimuth < 0 ? "" : " "}${azimuth.toFixed(1)}`);
	        }
	    }
	    get altitude() {
	        transformQuat(this._up, Constants.VECTOR3_UNITY, this._combinedRotation);
	        transformQuat(this._right, Constants.VECTOR3_UNITX, this._combinedRotation);
	        return -AngleHelper.signedAngleBetweenVectors(Constants.VECTOR3_UNITY, this._up, this._right);
	    }
	    get azimuth() {
	        transformQuat(this._up, Constants.VECTOR3_UNITY, this._combinedRotation);
	        transformQuat(this._right, Constants.VECTOR3_UNITX, this._combinedRotation);
	        return -AngleHelper.signedAngleBetweenVectors(Constants.VECTOR3_UNITX, this._right, this._up);
	    }
	    setAltAzimuth(altitude, azimuth, isSmooth) {
	        setAxisAngle(this._quat, Constants.VECTOR3_UNITX, altitude);
	        multiply(this._orbitRotation, this._quat, Constants.QUAT_IDENTITY);
	        setAxisAngle(this._quat, Constants.VECTOR3_UNITY, azimuth);
	        multiply(this._orbitRotation, this._orbitRotation, this._quat);
	        if (!isSmooth) {
	            this.syncSmooth();
	        }
	    }
	    rotate(translationDelta) {
	        const length = Math.min(this.width, this.height);
	        let angle = translationDelta[1] * Constants.PI / length;
	        setAxisAngle(this._quat, Constants.VECTOR3_UNITX, angle);
	        multiply(this._orbitRotation, this._quat, this._orbitRotation);
	        angle = translationDelta[0] * Constants.PI / length;
	        setAxisAngle(this._quat, Constants.VECTOR3_UNITY, angle);
	        multiply(this._orbitRotation, this._orbitRotation, this._quat);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let Config$2 = class Config {
	    constructor(core) {
	        this.reset();
	    }
	    reset() {
	        this.isDebugVisible = false;
	        this.logLevel = LogLevel.warn;
	        this.shaderPath = "shaders";
	        this.fontPath = "fonts";
	        this.modelDistance = 0.5;
	        this.modelSize = 0.25;
	        this.stereoMode = StereoMode.none;
	        this.ipd = 0.06;
	        this.screenDistance = 0.5;
	        this.fov = AngleHelper.degreesToRadians(30);
	        this.nearPlane = 0.01;
	        this.farPlane = 100;
	        this.pickWidth = 512;
	        this.pickHeight = 512;
	        this.pickHoldDelay = 1000;
	        this.pickSelectDelay = 100;
	        this.resizeMinimumDelay = 250;
	        this.rotationSmoothing = 0.02;
	        this.positionSmoothing = 0.02;
	        this.focusSmoothing = 0.01;
	        this.scaleSmoothing = 0.02;
	        this.mouseWheelZoomScale = -0.002;
	        this.mouseWheelRotationScale = -0.002;
	        this.dragToleranceSquared = 100;
	        this.manipulatorMinRelativeDistanceSquared = 100;
	        this.isMultiTouchEnabled = true;
	        this.isMultiTouchZoomEnabled = true;
	        this.isMultiTouchTwistEnabled = true;
	        this.isMultiTouchRotateEnabled = true;
	        this.isMultiTouchTranslateEnabled = true;
	        this.multiTouchZoomScale = 1;
	        this.cameraMinDistance = 0.1;
	        this.cameraMaxDistance = 10;
	        this.xrControllerRayColor = fromValues$3(0.5, 0.5, 0.5);
	        this.xrControllerProfile = "windows-mixed-reality";
	        this.xrControllerHandedness = "right";
	        this.paletteColor = new Uint8Array([0x80, 0x80, 0x80, 0]);
	        this.textColor = create$3();
	        this.textHoverColor = create$3();
	        this.textBorderColor = create$3();
	        this.textBorderWidth = 0x18 / 0xff;
	        this.identityRotation = Constants.VECTOR3_UNITY;
	        this.axesTextLabelMaxGlyphs = 32;
	        this.axesTextColor = create$3();
	        this.axesTextBorderColor = create$3();
	        this.axesTextHoverColor = create$3();
	        this.axesTextLabelMajorSize = 0.03;
	        this.axesTextLabelMinorSize = 0.02;
	        this.axesTextTitleMaxGlyphs = 127;
	        this.axesTextTitleSize = 0.05;
	        this.axesTextHeadingMaxGlyphs = 128;
	        this.axesTextHeadingSize = 0.075;
	        this.axesTextTitleLineHeight = 1.5;
	        this.axesTextHeadingLineHeight = 1.5;
	        this.axesTextLabelLineHeight = 1.5;
	        this.axesGridMajorThickness = 0.0002;
	        this.axesGridMinorThickness = 0.0001;
	        this.axesGridZeroThickness = 0.002;
	        this.axesGridPickDivisionHeight = 0.025;
	        this.axesGridBackgroundColor = create$3();
	        this.axesGridHighlightColor = create$3();
	        this.axesGridMinorColor = create$3();
	        this.axesGridMajorColor = create$3();
	        this.axesGridZeroColor = create$3();
	        this.axesGridDefaultDivisions = 10;
	        this.keyTitleMaxGlyphs = 64;
	        this.keyLabelMaxGlyphs = 64;
	        this.selectionColor = create$3();
	        this.hoverColor = create$3();
	        this.activeColor = create$3();
	        this.highlightMode = HighlightMode.color;
	        this.lassoThickness = 4;
	        this.lassoDashWidth = 2;
	        this.lassoColor = create$3();
	        this.minCubifiedTreeMapSlice = 0.01;
	        this.sdfBuffer = 0xc0;
	        this.sdfBorder = 0x0;
	        this.forceDirectIsEnabled = false;
	        this.forceDirectAttraction = 1;
	        this.forceDirectRepulsion = 1;
	        this.forceDirectGravity = 1;
	        this.forceDirectInterval = 0.1;
	        this.forceDirectMaxDistance = 0.1;
	        this.forceDirectTheta = 1;
	        this.forceDirectIterationsPerLayout = 1;
	        this.forceDirectEdgeWeightPower = 1;
	        this.forceDirectLockX = false;
	        this.forceDirectLockY = false;
	        this.forceDirectLockZ = false;
	        this.transitionDuration = 400;
	        this.transitionStaggering = 100;
	        this.transitionView = true;
	        this.isTransitionPickingEnabled = false;
	        this.backgroundColor = create$2();
	        this.theme = Theme.light;
	        this.renderMode = RenderMode.color;
	        this.tilesX = 1;
	        this.tilesY = 1;
	        this.tileOffsetX = 0;
	        this.tileOffsetY = 0;
	    }
	    get theme() { return this._theme; }
	    set theme(value) {
	        if (this._theme != value) {
	            this._theme = value;
	            switch (value) {
	                case Theme.dark:
	                    set$2(this.backgroundColor, 0, 0, 0, 1);
	                    set$3(this.textColor, 0.9, 0.9, 0.9);
	                    set$3(this.textHoverColor, 1, 1, 1);
	                    set$3(this.textBorderColor, 0, 0, 0);
	                    set$3(this.axesTextColor, 0.9, 0.9, 0.9);
	                    set$3(this.axesTextBorderColor, 0, 0, 0);
	                    set$3(this.axesTextHoverColor, 1, 1, 1);
	                    set$3(this.axesGridBackgroundColor, 0.02, 0.02, 0.02);
	                    set$3(this.axesGridHighlightColor, 0.04, 0.04, 0.04);
	                    set$3(this.axesGridMinorColor, 0.05, 0.05, 0.05);
	                    set$3(this.axesGridMajorColor, 0.1, 0.1, 0.1);
	                    set$3(this.axesGridZeroColor, 0.05, 0.1, 0.1);
	                    set$3(this.selectionColor, 1, 1, 0);
	                    set$3(this.hoverColor, 1, 0, 1);
	                    set$3(this.activeColor, 0, 1, 1);
	                    set$3(this.lassoColor, 0.9, 0.9, 0.9);
	                    break;
	                case Theme.light:
	                    set$2(this.backgroundColor, 1, 1, 1, 1);
	                    set$3(this.textColor, 0, 0, 0);
	                    set$3(this.textHoverColor, 0.1, 0.1, 0.1);
	                    set$3(this.textBorderColor, 1, 1, 1);
	                    set$3(this.axesTextColor, 0, 0, 0);
	                    set$3(this.axesTextBorderColor, 1, 1, 1);
	                    set$3(this.axesTextHoverColor, 0.1, 0.1, 0.1);
	                    set$3(this.axesGridBackgroundColor, 1, 1, 1);
	                    set$3(this.axesGridHighlightColor, 0.925, 0.925, 0.925);
	                    set$3(this.axesGridMinorColor, 0.9, 0.9, 0.9);
	                    set$3(this.axesGridMajorColor, 0.8, 0.8, 0.8);
	                    set$3(this.axesGridZeroColor, 0.7, 0.9, 0.9);
	                    set$3(this.selectionColor, 1, 1, 0);
	                    set$3(this.hoverColor, 1, 0, 1);
	                    set$3(this.activeColor, 0, 1, 1);
	                    set$3(this.lassoColor, 0.1, 0.1, 0.1);
	                    break;
	            }
	            if (this.themeChangedCallback) {
	                this.themeChangedCallback(this._theme);
	            }
	        }
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class DebugText {
	    get text() { return this._text; }
	    constructor() {
	        this.clear();
	    }
	    clear() {
	        this._text = "";
	    }
	    addLine(value) {
	        this._text += value + "\n";
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Fps {
	    get frameCounter() { return this._frameCounter; }
	    get totalFrames() { return this._totalFrames; }
	    constructor(core) {
	        this._core = core;
	        this._totalFrames = 0;
	        this.reset();
	    }
	    update(elapsedTime) {
	        this._elapsedTime += elapsedTime;
	        if (this._elapsedTime > 1000) {
	            this._elapsedTime -= 1000;
	            this._fps = this._frameCounter;
	            this._frameCounter = 0;
	        }
	        if (this._core.config.isDebugVisible) {
	            this._core.debugText.addLine(`fps      ${this._fps}`);
	        }
	    }
	    render() {
	        this._frameCounter++;
	        this._totalFrames++;
	    }
	    reset() {
	        this._fps = 0;
	        this._frameCounter = 0;
	        this._elapsedTime = 0;
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	const PaletteType = {
	    sequentialsinglehue: "sequentialsinglehue",
	    sequentialmultihue: "sequentialmultihue",
	    diverging: "diverging",
	    qualitative: "qualitative",
	};
	class PaletteResources {
	    constructor() {
	        this.palettes = {
	            "blues": { type: PaletteType.sequentialsinglehue, colors: new Uint8Array([247, 251, 255, 222, 235, 247, 198, 219, 239, 158, 202, 225, 107, 174, 214, 66, 146, 198, 33, 113, 181, 8, 81, 156, 8, 48, 107]) },
	            "greens": { type: PaletteType.sequentialsinglehue, colors: new Uint8Array([247, 252, 245, 229, 245, 224, 199, 233, 192, 161, 217, 155, 116, 196, 118, 65, 171, 93, 35, 139, 69, 0, 109, 44, 0, 68, 27]) },
	            "greys": { type: PaletteType.sequentialsinglehue, colors: new Uint8Array([255, 255, 255, 240, 240, 240, 217, 217, 217, 189, 189, 189, 150, 150, 150, 115, 115, 115, 82, 82, 82, 37, 37, 37, 0, 0, 0]) },
	            "oranges": { type: PaletteType.sequentialsinglehue, colors: new Uint8Array([255, 245, 235, 254, 230, 206, 253, 208, 162, 253, 174, 107, 253, 141, 60, 241, 105, 19, 217, 72, 1, 166, 54, 3, 127, 39, 4]) },
	            "purples": { type: PaletteType.sequentialsinglehue, colors: new Uint8Array([252, 251, 253, 239, 237, 245, 218, 218, 235, 188, 189, 220, 158, 154, 200, 128, 125, 186, 106, 81, 163, 84, 39, 143, 63, 0, 125]) },
	            "reds": { type: PaletteType.sequentialsinglehue, colors: new Uint8Array([255, 245, 240, 254, 224, 210, 252, 187, 161, 252, 146, 114, 251, 106, 74, 239, 59, 44, 203, 24, 29, 165, 15, 21, 103, 0, 13]) },
	            "viridis": { type: PaletteType.sequentialmultihue, colors: new Uint8Array([0x48, 0x25, 0x75, 0x41, 0x44, 0x87, 0x35, 0x60, 0x8d, 0x2a, 0x78, 0x8e, 0x21, 0x91, 0x8d, 0x22, 0xa8, 0x84, 0x43, 0xbf, 0x71, 0x7a, 0xd1, 0x51, 0xbc, 0xdf, 0x27]) },
	            "inferno": { type: PaletteType.sequentialmultihue, colors: new Uint8Array([0x17, 0x0c, 0x3b, 0x42, 0x0a, 0x68, 0x6b, 0x17, 0x6e, 0x93, 0x26, 0x67, 0xbb, 0x37, 0x55, 0xdd, 0x51, 0x3a, 0xf3, 0x77, 0x1a, 0xfc, 0xa5, 0x0a, 0xf6, 0xd6, 0x45]) },
	            "magma": { type: PaletteType.sequentialmultihue, colors: new Uint8Array([0x15, 0x0e, 0x37, 0x3b, 0x0f, 0x70, 0x65, 0x1a, 0x80, 0x8c, 0x29, 0x81, 0xb6, 0x37, 0x7a, 0xde, 0x49, 0x68, 0xf7, 0x6f, 0x5c, 0xfe, 0x9f, 0x6d, 0xfe, 0xce, 0x91]) },
	            "plasma": { type: PaletteType.sequentialmultihue, colors: new Uint8Array([0x42, 0x03, 0x9d, 0x6a, 0x00, 0xa8, 0x90, 0x0d, 0xa4, 0xb1, 0x2a, 0x90, 0xcb, 0x47, 0x79, 0xe1, 0x64, 0x62, 0xf2, 0x83, 0x4c, 0xfc, 0xa6, 0x36, 0xfc, 0xce, 0x25]) },
	            "bluegreen": { type: PaletteType.sequentialmultihue, colors: new Uint8Array([247, 252, 253, 229, 245, 249, 204, 236, 230, 153, 216, 201, 102, 194, 164, 65, 174, 118, 35, 139, 69, 0, 109, 44, 0, 68, 27]) },
	            "bluepurple": { type: PaletteType.sequentialmultihue, colors: new Uint8Array([247, 252, 253, 224, 236, 244, 191, 211, 230, 158, 188, 218, 140, 150, 198, 140, 107, 177, 136, 65, 157, 129, 15, 124, 77, 0, 75]) },
	            "greenblue": { type: PaletteType.sequentialmultihue, colors: new Uint8Array([247, 252, 240, 224, 243, 219, 204, 235, 197, 168, 221, 181, 123, 204, 196, 78, 179, 211, 43, 140, 190, 8, 104, 172, 8, 64, 129]) },
	            "orangered": { type: PaletteType.sequentialmultihue, colors: new Uint8Array([255, 247, 236, 254, 232, 200, 253, 212, 158, 253, 187, 132, 252, 141, 89, 239, 101, 72, 215, 48, 31, 179, 0, 0, 127, 0, 0]) },
	            "purpleblue": { type: PaletteType.sequentialmultihue, colors: new Uint8Array([255, 247, 251, 236, 231, 242, 208, 209, 230, 166, 189, 219, 116, 169, 207, 54, 144, 192, 5, 112, 176, 4, 90, 141, 2, 56, 88]) },
	            "purplebluegreen": { type: PaletteType.sequentialmultihue, colors: new Uint8Array([255, 247, 251, 236, 226, 240, 208, 209, 230, 166, 189, 219, 103, 169, 207, 54, 144, 192, 2, 129, 138, 1, 108, 89, 1, 70, 54]) },
	            "purplered": { type: PaletteType.sequentialmultihue, colors: new Uint8Array([247, 244, 249, 231, 225, 239, 212, 185, 218, 201, 148, 199, 223, 101, 176, 231, 41, 138, 206, 18, 86, 152, 0, 67, 103, 0, 31]) },
	            "redpurple": { type: PaletteType.sequentialmultihue, colors: new Uint8Array([255, 247, 243, 253, 224, 221, 252, 197, 192, 250, 159, 181, 247, 104, 161, 221, 52, 151, 174, 1, 126, 122, 1, 119, 73, 0, 106]) },
	            "yellowgreen": { type: PaletteType.sequentialmultihue, colors: new Uint8Array([255, 255, 229, 247, 252, 185, 217, 240, 163, 173, 221, 142, 120, 198, 121, 65, 171, 93, 35, 132, 67, 0, 104, 55, 0, 69, 41]) },
	            "yellowgreenblue": { type: PaletteType.sequentialmultihue, colors: new Uint8Array([255, 255, 217, 237, 248, 177, 199, 233, 180, 127, 205, 187, 65, 182, 196, 29, 145, 192, 34, 94, 168, 37, 52, 148, 8, 29, 88]) },
	            "yelloworangebrown": { type: PaletteType.sequentialmultihue, colors: new Uint8Array([255, 255, 229, 255, 247, 188, 254, 227, 145, 254, 196, 79, 254, 153, 41, 236, 112, 20, 204, 76, 2, 153, 52, 4, 102, 37, 6]) },
	            "yelloworangered": { type: PaletteType.sequentialmultihue, colors: new Uint8Array([255, 255, 204, 255, 237, 160, 254, 217, 118, 254, 178, 76, 253, 141, 60, 252, 78, 42, 227, 26, 28, 189, 0, 38, 128, 0, 38]) },
	            "brownbluegreen": { type: PaletteType.diverging, colors: new Uint8Array([84, 48, 5, 140, 81, 10, 191, 129, 45, 223, 194, 125, 246, 232, 195, 245, 245, 245, 199, 234, 229, 128, 205, 193, 53, 151, 143, 1, 102, 94, 0, 60, 48]) },
	            "pinkyellowgreen": { type: PaletteType.diverging, colors: new Uint8Array([142, 1, 82, 197, 27, 125, 222, 119, 174, 241, 182, 218, 253, 224, 239, 247, 247, 247, 230, 245, 208, 184, 225, 134, 127, 188, 65, 77, 146, 33, 39, 100, 25]) },
	            "purplegreen": { type: PaletteType.diverging, colors: new Uint8Array([64, 0, 75, 118, 42, 131, 153, 112, 171, 194, 165, 207, 231, 212, 232, 247, 247, 247, 217, 240, 211, 166, 219, 160, 90, 174, 97, 27, 120, 55, 0, 68, 27]) },
	            "purpleorange": { type: PaletteType.diverging, colors: new Uint8Array([127, 59, 8, 179, 88, 6, 224, 130, 20, 253, 184, 99, 254, 224, 182, 247, 247, 247, 216, 218, 235, 178, 171, 210, 128, 115, 172, 84, 39, 136, 45, 0, 75]) },
	            "redblue": { type: PaletteType.diverging, colors: new Uint8Array([103, 0, 31, 178, 24, 43, 214, 96, 77, 244, 165, 130, 253, 219, 199, 247, 247, 247, 209, 229, 240, 146, 197, 222, 67, 147, 195, 33, 102, 172, 5, 48, 97]) },
	            "redgrey": { type: PaletteType.diverging, colors: new Uint8Array([103, 0, 31, 178, 24, 43, 214, 96, 77, 244, 165, 130, 253, 219, 199, 255, 255, 255, 224, 224, 224, 186, 186, 186, 135, 135, 135, 77, 77, 77, 26, 26, 26]) },
	            "redyellowblue": { type: PaletteType.diverging, colors: new Uint8Array([165, 0, 38, 215, 48, 39, 244, 109, 67, 253, 174, 97, 254, 224, 144, 255, 255, 191, 224, 243, 248, 171, 217, 233, 116, 173, 209, 69, 117, 180, 49, 54, 149]) },
	            "redyellowgreen": { type: PaletteType.diverging, colors: new Uint8Array([165, 0, 38, 215, 48, 39, 244, 109, 67, 253, 174, 97, 254, 224, 139, 255, 255, 191, 217, 239, 139, 166, 217, 106, 102, 189, 99, 26, 152, 80, 0, 104, 55]) },
	            "spectral": { type: PaletteType.diverging, colors: new Uint8Array([158, 1, 66, 213, 62, 79, 244, 109, 67, 253, 174, 97, 254, 224, 139, 255, 255, 191, 230, 245, 152, 171, 221, 164, 102, 194, 165, 50, 136, 189, 94, 79, 162]) },
	            "accent": { type: PaletteType.qualitative, colors: new Uint8Array([127, 201, 127, 190, 174, 212, 253, 192, 134, 255, 255, 153, 56, 108, 176, 240, 2, 127, 191, 91, 23, 102, 102, 102]) },
	            "dark2": { type: PaletteType.qualitative, colors: new Uint8Array([27, 158, 119, 217, 95, 2, 117, 112, 179, 231, 41, 138, 102, 166, 30, 230, 171, 2, 166, 118, 29, 102, 102, 102]) },
	            "paired": { type: PaletteType.qualitative, colors: new Uint8Array([166, 206, 227, 31, 120, 180, 178, 223, 138, 51, 160, 44, 251, 154, 153, 227, 26, 28, 253, 191, 111, 255, 127, 0, 202, 178, 214, 106, 61, 154, 255, 255, 153, 177, 89, 40]) },
	            "pastel1": { type: PaletteType.qualitative, colors: new Uint8Array([251, 180, 174, 179, 205, 227, 204, 235, 197, 222, 203, 228, 254, 217, 166, 255, 255, 204, 229, 216, 189, 253, 218, 236, 242, 242, 242]) },
	            "pastel2": { type: PaletteType.qualitative, colors: new Uint8Array([179, 226, 205, 253, 205, 172, 203, 213, 232, 244, 202, 228, 230, 245, 201, 255, 242, 174, 241, 226, 204, 204, 204, 204]) },
	            "set1": { type: PaletteType.qualitative, colors: new Uint8Array([228, 26, 28, 55, 126, 184, 77, 175, 74, 152, 78, 163, 255, 127, 0, 255, 255, 51, 166, 86, 40, 247, 129, 191, 153, 153, 153]) },
	            "set2": { type: PaletteType.qualitative, colors: new Uint8Array([102, 194, 165, 252, 141, 98, 141, 160, 203, 231, 138, 195, 166, 216, 84, 255, 217, 47, 229, 196, 148, 179, 179, 179]) },
	            "set3": { type: PaletteType.qualitative, colors: new Uint8Array([141, 211, 199, 255, 255, 179, 190, 186, 218, 251, 128, 114, 128, 177, 211, 253, 180, 98, 179, 222, 105, 252, 205, 229, 217, 217, 217, 188, 128, 189, 204, 235, 197, 255, 237, 111]) },
	        };
	    }
	}
	class PaletteBase {
	    get colors() { return this._colors; }
	    set colors(value) {
	        if (this._colors != value) {
	            this._colors = value;
	            this._changed = true;
	        }
	    }
	    constructor() {
	        this._colors = null;
	    }
	    copyFrom(palette) {
	        if (palette.colors) {
	            this.colors = new Uint8Array(palette.colors);
	        }
	        else {
	            this.colors = null;
	        }
	    }
	    update() { }
	}
	let Palette$2 = class Palette extends PaletteBase {
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class PositionVertex {
	    static getPosition(buffer, index, value) {
	        const offset = index * PositionVertex.SIZE;
	        set$3(value, buffer[offset], buffer[offset + 1], buffer[offset + 2]);
	    }
	    static setPosition(buffer, index, value) {
	        const offset = index * PositionVertex.SIZE;
	        buffer[offset] = value[0];
	        buffer[offset + 1] = value[1];
	        buffer[offset + 2] = value[2];
	    }
	}
	PositionVertex.SIZE = 3;
	PositionVertex.SIZE_BYTES = 12;
	class PositionColorVertex {
	    static getPosition(bufferView, index, value) {
	        const offset = PositionColorVertex.SIZE_BYTES * index + this.POSITION_OFFSET_BYTES;
	        set$3(value, bufferView.getFloat32(offset, true), bufferView.getFloat32(offset + 4, true), bufferView.getFloat32(offset + 8, true));
	    }
	    static setPosition(bufferView, index, value) {
	        const offset = PositionColorVertex.SIZE_BYTES * index + this.POSITION_OFFSET_BYTES;
	        bufferView.setFloat32(offset, value[0], true);
	        bufferView.setFloat32(offset + 4, value[1], true);
	        bufferView.setFloat32(offset + 8, value[2], true);
	    }
	    static getColor(bufferView, index, value) {
	        const offset = PositionColorVertex.SIZE_BYTES * index + this.COLOR_OFFSET_BYTES;
	        set$3(value, bufferView.getUint8(offset) / 0xFF, bufferView.getUint8(offset + 1) / 0xFF, bufferView.getUint8(offset + 2) / 0xFF);
	    }
	    static setColor(bufferView, index, value) {
	        const offset = PositionColorVertex.SIZE_BYTES * index + this.COLOR_OFFSET_BYTES;
	        bufferView.setUint8(offset, value[0] * 0xFF);
	        bufferView.setUint8(offset + 1, value[1] * 0xFF);
	        bufferView.setUint8(offset + 2, value[2] * 0xFF);
	    }
	}
	PositionColorVertex.SIZE_BYTES = 16;
	PositionColorVertex.POSITION_OFFSET_BYTES = 0;
	PositionColorVertex.COLOR_OFFSET_BYTES = 12;
	class PositionTextureVertex {
	    static getPosition(bufferView, index, value) {
	        const offset = PositionColorVertex.SIZE_BYTES * index + this.POSITION_OFFSET_BYTES;
	        set$3(value, bufferView.getFloat32(offset, true), bufferView.getFloat32(offset + 4, true), bufferView.getFloat32(offset + 8, true));
	    }
	    static setPosition(bufferView, index, value) {
	        const offset = PositionColorVertex.SIZE_BYTES * index + this.POSITION_OFFSET_BYTES;
	        bufferView.setFloat32(offset, value[0], true);
	        bufferView.setFloat32(offset + 4, value[1], true);
	        bufferView.setFloat32(offset + 8, value[2], true);
	    }
	    static getTexCoord(bufferView, index, value) {
	        const offset = PositionColorVertex.SIZE_BYTES * index + this.TEX_COORD_OFFSET_BYTES;
	        set(value, bufferView.getUint16(offset, true) / 0xFFFF, bufferView.getUint16(offset + 2, true) / 0xFFFF);
	    }
	    static setTexCoord(bufferView, index, value) {
	        const offset = PositionColorVertex.SIZE_BYTES * index + this.TEX_COORD_OFFSET_BYTES;
	        bufferView.setUint16(offset, value[0] * 0xFFFF, true);
	        bufferView.setUint16(offset + 2, value[1] * 0xFFFF, true);
	    }
	}
	PositionTextureVertex.SIZE_BYTES = 16;
	PositionTextureVertex.POSITION_OFFSET_BYTES = 0;
	PositionTextureVertex.TEX_COORD_OFFSET_BYTES = 12;
	class PositionTexturePickVertex {
	    static getPosition(bufferView, index, value) {
	        const offset = PositionTexturePickVertex.SIZE_BYTES * index + this.POSITION_OFFSET_BYTES;
	        set$3(value, bufferView.getFloat32(offset, true), bufferView.getFloat32(offset + 4, true), bufferView.getFloat32(offset + 8, true));
	    }
	    static setPosition(bufferView, index, value) {
	        const offset = PositionTexturePickVertex.SIZE_BYTES * index + this.POSITION_OFFSET_BYTES;
	        bufferView.setFloat32(offset, value[0], true);
	        bufferView.setFloat32(offset + 4, value[1], true);
	        bufferView.setFloat32(offset + 8, value[2], true);
	    }
	    static getTexCoord(bufferView, index, value) {
	        const offset = PositionTexturePickVertex.SIZE_BYTES * index + this.TEX_COORD_OFFSET_BYTES;
	        set(value, bufferView.getUint16(offset, true) / 0xFFFF, bufferView.getUint16(offset + 2, true) / 0xFFFF);
	    }
	    static setTexCoord(bufferView, index, value) {
	        const offset = PositionTexturePickVertex.SIZE_BYTES * index + this.TEX_COORD_OFFSET_BYTES;
	        bufferView.setUint16(offset, value[0] * 0xFFFF, true);
	        bufferView.setUint16(offset + 2, value[1] * 0xFFFF, true);
	    }
	    static getIdColor(bufferView, index, value) {
	        const offset = PositionTexturePickVertex.SIZE_BYTES * index + this.ID_COLOR_OFFSET_BYTES;
	        set$2(value, bufferView.getUint8(offset) / 0xFF, bufferView.getUint8(offset + 1) / 0xFF, bufferView.getUint8(offset + 2) / 0xFF, bufferView.getUint8(offset + 3) / 0xFF);
	    }
	    static setIdColor(bufferView, index, value) {
	        const offset = PositionTexturePickVertex.SIZE_BYTES * index + this.ID_COLOR_OFFSET_BYTES;
	        bufferView.setUint8(offset, value[0] * 0xFF);
	        bufferView.setUint8(offset + 1, value[1] * 0xFF);
	        bufferView.setUint8(offset + 2, value[2] * 0xFF);
	        bufferView.setUint8(offset + 3, value[3] * 0xFF);
	    }
	}
	PositionTexturePickVertex.SIZE_BYTES = 20;
	PositionTexturePickVertex.ID_COLOR_OFFSET_BYTES = 0;
	PositionTexturePickVertex.POSITION_OFFSET_BYTES = 4;
	PositionTexturePickVertex.TEX_COORD_OFFSET_BYTES = 16;
	class PositionNormalTextureVertex {
	    static getPosition(bufferView, index, value) {
	        const offset = PositionNormalTextureVertex.SIZE_BYTES * index + this.POSITION_OFFSET_BYTES;
	        set$3(value, bufferView.getFloat32(offset, true), bufferView.getFloat32(offset + 4, true), bufferView.getFloat32(offset + 8, true));
	    }
	    static setPosition(bufferView, index, value) {
	        const offset = PositionNormalTextureVertex.SIZE_BYTES * index + this.POSITION_OFFSET_BYTES;
	        bufferView.setFloat32(offset, value[0], true);
	        bufferView.setFloat32(offset + 4, value[1], true);
	        bufferView.setFloat32(offset + 8, value[2], true);
	    }
	    static getNormal(bufferView, index, value) {
	        const offset = PositionNormalTextureVertex.SIZE_BYTES * index + this.NORMAL_OFFSET_BYTES;
	        set$3(value, bufferView.getInt8(offset) / 0x7F, bufferView.getInt8(offset + 1) / 0x7F, bufferView.getInt8(offset + 2) / 0x7F);
	    }
	    static setNormal(bufferView, index, value) {
	        const offset = PositionNormalTextureVertex.SIZE_BYTES * index + this.NORMAL_OFFSET_BYTES;
	        bufferView.setInt8(offset, value[0] * 0x7F);
	        bufferView.setInt8(offset + 1, value[1] * 0x7F);
	        bufferView.setInt8(offset + 2, value[2] * 0x7F);
	    }
	    static getTexCoord(bufferView, index, value) {
	        const offset = PositionNormalTextureVertex.SIZE_BYTES * index + this.TEX_COORD_OFFSET_BYTES;
	        set(value, bufferView.getUint16(offset, true) / 0xFFFF, bufferView.getUint16(offset + 2, true) / 0xFFFF);
	    }
	    static setTexCoord(bufferView, index, value) {
	        const offset = PositionNormalTextureVertex.SIZE_BYTES * index + this.TEX_COORD_OFFSET_BYTES;
	        bufferView.setUint16(offset, value[0] * 0xFFFF, true);
	        bufferView.setUint16(offset + 2, value[1] * 0xFFFF, true);
	    }
	}
	PositionNormalTextureVertex.SIZE_BYTES = 20;
	PositionNormalTextureVertex.POSITION_OFFSET_BYTES = 0;
	PositionNormalTextureVertex.NORMAL_OFFSET_BYTES = 12;
	PositionNormalTextureVertex.TEX_COORD_OFFSET_BYTES = 16;
	class PickGridVertex {
	    static getTranslation(bufferView, index, value) {
	        const offset = PickGridVertex.SIZE_BYTES * index + this.TRANSLATION_OFFSET_BYTES;
	        set$3(value, bufferView.getFloat32(offset, true), bufferView.getFloat32(offset + 4, true), bufferView.getFloat32(offset + 8, true));
	    }
	    static setTranslation(bufferView, index, value) {
	        const offset = PickGridVertex.SIZE_BYTES * index + this.TRANSLATION_OFFSET_BYTES;
	        bufferView.setFloat32(offset, value[0], true);
	        bufferView.setFloat32(offset + 4, value[1], true);
	        bufferView.setFloat32(offset + 8, value[2], true);
	    }
	    static getNormal(bufferView, index, value) {
	        const offset = PickGridVertex.SIZE_BYTES * index + this.NORMAL_OFFSET_BYTES;
	        set$3(value, bufferView.getInt8(offset) / 0x7F, bufferView.getInt8(offset + 1) / 0x7F, bufferView.getInt8(offset + 2) / 0x7F);
	    }
	    static setNormal(bufferView, index, value) {
	        const offset = PickGridVertex.SIZE_BYTES * index + this.NORMAL_OFFSET_BYTES;
	        bufferView.setInt8(offset, value[0] * 0x7F);
	        bufferView.setInt8(offset + 1, value[1] * 0x7F);
	        bufferView.setInt8(offset + 2, value[2] * 0x7F);
	    }
	    static getIdColor(bufferView, index, value) {
	        const offset = PickGridVertex.SIZE_BYTES * index + this.ID_COLOR_OFFSET_BYTES;
	        set$2(value, bufferView.getUint8(offset) / 0xFF, bufferView.getUint8(offset + 1) / 0xFF, bufferView.getUint8(offset + 2) / 0xFF, bufferView.getUint8(offset + 3) / 0xFF);
	    }
	    static setIdColor(bufferView, index, value) {
	        const offset = PickGridVertex.SIZE_BYTES * index + this.ID_COLOR_OFFSET_BYTES;
	        bufferView.setUint8(offset, value[0] * 0xFF);
	        bufferView.setUint8(offset + 1, value[1] * 0xFF);
	        bufferView.setUint8(offset + 2, value[2] * 0xFF);
	        bufferView.setUint8(offset + 3, value[3] * 0xFF);
	    }
	    static getTexCoord(bufferView, index, value) {
	        const offset = PickGridVertex.SIZE_BYTES * index + this.TEX_COORD_OFFSET_BYTES;
	        set(value, bufferView.getUint16(offset, true) / 0xFFFF, bufferView.getUint16(offset + 2, true) / 0xFFFF);
	    }
	    static setTexCoord(bufferView, index, value) {
	        const offset = PickGridVertex.SIZE_BYTES * index + this.TEX_COORD_OFFSET_BYTES;
	        bufferView.setUint16(offset, value[0] * 0xFFFF, true);
	        bufferView.setUint16(offset + 2, value[1] * 0xFFFF, true);
	    }
	    static getBounds(bufferView, index, value) {
	        const offset = PickGridVertex.SIZE_BYTES * index + this.BOUNDS_OFFSET_BYTES;
	        set$2(value, bufferView.getUint16(offset, true) / 0xFFFF, bufferView.getUint16(offset + 2, true) / 0xFFFF, bufferView.getUint16(offset + 4, true) / 0xFFFF, bufferView.getUint16(offset + 6, true) / 0xFFFF);
	    }
	    static setBounds(bufferView, index, value) {
	        const offset = PickGridVertex.SIZE_BYTES * index + this.BOUNDS_OFFSET_BYTES;
	        bufferView.setUint16(offset, value[0] * 0xFFFF, true);
	        bufferView.setUint16(offset + 2, value[1] * 0xFFFF, true);
	        bufferView.setUint16(offset + 4, value[2] * 0xFFFF, true);
	        bufferView.setUint16(offset + 6, value[3] * 0xFFFF, true);
	    }
	}
	PickGridVertex.SIZE_BYTES = 32;
	PickGridVertex.TRANSLATION_OFFSET_BYTES = 0;
	PickGridVertex.NORMAL_OFFSET_BYTES = 12;
	PickGridVertex.ID_COLOR_OFFSET_BYTES = 16;
	PickGridVertex.TEX_COORD_OFFSET_BYTES = 20;
	PickGridVertex.BOUNDS_OFFSET_BYTES = 24;
	class UnitVertex {
	    static getIdHover(bufferView, index) {
	        return bufferView.getFloat32(UnitVertex.SIZE_BYTES * index + this.ID_HOVER_OFFSET_BYTES, true);
	    }
	    static setIdHover(bufferView, index, value) {
	        bufferView.setFloat32(UnitVertex.SIZE_BYTES * index + this.ID_HOVER_OFFSET_BYTES, value, true);
	    }
	    static copyIdHover(fromBufferView, fromIndex, toBufferView, toIndex) {
	        toBufferView.setFloat32(UnitVertex.SIZE_BYTES * toIndex + this.ID_HOVER_OFFSET_BYTES, fromBufferView.getFloat32(UnitVertex.SIZE_BYTES * fromIndex + this.ID_HOVER_OFFSET_BYTES, true), true);
	    }
	    static getTranslation(bufferView, index, value) {
	        const offset = UnitVertex.SIZE_BYTES * index + this.TRANSLATION_OFFSET_BYTES;
	        set$3(value, bufferView.getFloat32(offset, true), bufferView.getFloat32(offset + 4, true), bufferView.getFloat32(offset + 8, true));
	    }
	    static setTranslation(bufferView, index, value) {
	        const offset = UnitVertex.SIZE_BYTES * index + this.TRANSLATION_OFFSET_BYTES;
	        bufferView.setFloat32(offset, value[0], true);
	        bufferView.setFloat32(offset + 4, value[1], true);
	        bufferView.setFloat32(offset + 8, value[2], true);
	    }
	    static copyTranslation(fromBufferView, fromIndex, toBufferView, toIndex) {
	        const fromOffset = UnitVertex.SIZE_BYTES * fromIndex + this.TRANSLATION_OFFSET_BYTES;
	        const toOffset = UnitVertex.SIZE_BYTES * toIndex + this.TRANSLATION_OFFSET_BYTES;
	        toBufferView.setFloat32(toOffset, fromBufferView.getFloat32(fromOffset, true), true);
	        toBufferView.setFloat32(toOffset + 4, fromBufferView.getFloat32(fromOffset + 4, true), true);
	        toBufferView.setFloat32(toOffset + 8, fromBufferView.getFloat32(fromOffset + 8, true), true);
	    }
	    static getColor(bufferView, index, value) {
	        const offset = UnitVertex.SIZE_BYTES * index + this.COLOR_OFFSET_BYTES;
	        set(value, bufferView.getUint8(offset) / 0xFF, bufferView.getUint8(offset + 1) / 0xFF);
	    }
	    static setColor(bufferView, index, value) {
	        const offset = UnitVertex.SIZE_BYTES * index + this.COLOR_OFFSET_BYTES;
	        bufferView.setUint8(offset, value[0] * 0xFF);
	        bufferView.setUint8(offset + 1, value[1] * 0xFF);
	    }
	    static copyColor(fromBufferView, fromIndex, toBufferView, toIndex) {
	        const fromOffset = UnitVertex.SIZE_BYTES * fromIndex + this.COLOR_OFFSET_BYTES;
	        const toOffset = UnitVertex.SIZE_BYTES * toIndex + this.COLOR_OFFSET_BYTES;
	        toBufferView.setUint8(toOffset, fromBufferView.getUint8(fromOffset));
	        toBufferView.setUint8(toOffset + 1, fromBufferView.getUint8(fromOffset + 1));
	    }
	    static getOrder(bufferView, index, value) {
	        const offset = UnitVertex.SIZE_BYTES * index + this.ORDER_OFFSET_BYTES;
	        set(value, bufferView.getFloat32(offset, true), bufferView.getFloat32(offset + 4, true));
	    }
	    static setOrder(bufferView, index, value) {
	        const offset = UnitVertex.SIZE_BYTES * index + this.ORDER_OFFSET_BYTES;
	        bufferView.setFloat32(offset, value[0], true);
	        bufferView.setFloat32(offset + 4, value[1], true);
	    }
	    static copyOrder(fromBufferView, fromIndex, toBufferView, toIndex) {
	        const fromOffset = UnitVertex.SIZE_BYTES * fromIndex + this.ORDER_OFFSET_BYTES;
	        const toOffset = UnitVertex.SIZE_BYTES * toIndex + this.ORDER_OFFSET_BYTES;
	        toBufferView.setFloat32(toOffset, fromBufferView.getFloat32(fromOffset, true), true);
	        toBufferView.setFloat32(toOffset + 4, fromBufferView.getFloat32(fromOffset + 4, true), true);
	    }
	    static getScale(bufferView, index, value) {
	        const offset = UnitVertex.SIZE_BYTES * index + this.SCALE_OFFSET_BYTES;
	        set$3(value, bufferView.getFloat32(offset, true), bufferView.getFloat32(offset + 4, true), bufferView.getFloat32(offset + 8, true));
	    }
	    static setScale(bufferView, index, value) {
	        const offset = UnitVertex.SIZE_BYTES * index + this.SCALE_OFFSET_BYTES;
	        bufferView.setFloat32(offset, value[0], true);
	        bufferView.setFloat32(offset + 4, value[1], true);
	        bufferView.setFloat32(offset + 8, value[2], true);
	    }
	    static copyScale(fromBufferView, fromIndex, toBufferView, toIndex) {
	        const fromOffset = UnitVertex.SIZE_BYTES * fromIndex + this.SCALE_OFFSET_BYTES;
	        const toOffset = UnitVertex.SIZE_BYTES * toIndex + this.SCALE_OFFSET_BYTES;
	        toBufferView.setFloat32(toOffset, fromBufferView.getFloat32(fromOffset, true), true);
	        toBufferView.setFloat32(toOffset + 4, fromBufferView.getFloat32(fromOffset + 4, true), true);
	        toBufferView.setFloat32(toOffset + 8, fromBufferView.getFloat32(fromOffset + 8, true), true);
	    }
	    static getRotation(bufferView, index, value) {
	        const offset = UnitVertex.SIZE_BYTES * index + this.ROTATION_OFFSET_BYTES;
	        set$1(value, bufferView.getFloat32(offset, true), bufferView.getFloat32(offset + 4, true), bufferView.getFloat32(offset + 8, true), bufferView.getFloat32(offset + 12, true));
	    }
	    static setRotation(bufferView, index, value) {
	        const offset = UnitVertex.SIZE_BYTES * index + this.ROTATION_OFFSET_BYTES;
	        bufferView.setFloat32(offset, value[0], true);
	        bufferView.setFloat32(offset + 4, value[1], true);
	        bufferView.setFloat32(offset + 8, value[2], true);
	        bufferView.setFloat32(offset + 12, value[3], true);
	    }
	    static copyRotation(fromBufferView, fromIndex, toBufferView, toIndex) {
	        const fromOffset = UnitVertex.SIZE_BYTES * fromIndex + this.ROTATION_OFFSET_BYTES;
	        const toOffset = UnitVertex.SIZE_BYTES * toIndex + this.ROTATION_OFFSET_BYTES;
	        toBufferView.setFloat32(toOffset, fromBufferView.getFloat32(fromOffset, true), true);
	        toBufferView.setFloat32(toOffset + 4, fromBufferView.getFloat32(fromOffset + 4, true), true);
	        toBufferView.setFloat32(toOffset + 8, fromBufferView.getFloat32(fromOffset + 8, true), true);
	        toBufferView.setFloat32(toOffset + 12, fromBufferView.getFloat32(fromOffset + 12, true), true);
	    }
	    static getTexCoord(bufferView, index, value) {
	        const offset = UnitVertex.SIZE_BYTES * index + this.TEXCOORD_OFFSET_BYTES;
	        set$1(value, bufferView.getFloat32(offset, true), bufferView.getFloat32(offset + 4, true), bufferView.getFloat32(offset + 8, true), bufferView.getFloat32(offset + 12, true));
	    }
	    static setTexCoord(bufferView, index, value) {
	        const offset = UnitVertex.SIZE_BYTES * index + this.TEXCOORD_OFFSET_BYTES;
	        bufferView.setFloat32(offset, value[0], true);
	        bufferView.setFloat32(offset + 4, value[1], true);
	        bufferView.setFloat32(offset + 8, value[2], true);
	        bufferView.setFloat32(offset + 12, value[3], true);
	    }
	    static copyTexCoord(fromBufferView, fromIndex, toBufferView, toIndex) {
	        const fromOffset = UnitVertex.SIZE_BYTES * fromIndex + this.TEXCOORD_OFFSET_BYTES;
	        const toOffset = UnitVertex.SIZE_BYTES * toIndex + this.TEXCOORD_OFFSET_BYTES;
	        toBufferView.setFloat32(toOffset, fromBufferView.getFloat32(fromOffset, true), true);
	        toBufferView.setFloat32(toOffset + 4, fromBufferView.getFloat32(fromOffset + 4, true), true);
	        toBufferView.setFloat32(toOffset + 8, fromBufferView.getFloat32(fromOffset + 8, true), true);
	        toBufferView.setFloat32(toOffset + 12, fromBufferView.getFloat32(fromOffset + 12, true), true);
	    }
	    static getIdColor(bufferView, index, value) {
	        const offset = UnitVertex.SIZE_BYTES * index + this.ID_COLOR_OFFSET_BYTES;
	        set$2(value, bufferView.getUint8(offset) / 0xFF, bufferView.getUint8(offset + 1) / 0xFF, bufferView.getUint8(offset + 2) / 0xFF, bufferView.getUint8(offset + 3) / 0xFF);
	    }
	    static setIdColor(bufferView, index, value) {
	        const offset = UnitVertex.SIZE_BYTES * index + this.ID_COLOR_OFFSET_BYTES;
	        bufferView.setUint8(offset, value[0] * 0xFF);
	        bufferView.setUint8(offset + 1, value[1] * 0xFF);
	        bufferView.setUint8(offset + 2, value[2] * 0xFF);
	        bufferView.setUint8(offset + 3, value[3] * 0xFF);
	    }
	    static getSelected(bufferView, index) {
	        return bufferView.getInt8(UnitVertex.SIZE_BYTES * index + this.SELECTED_OFFSET_BYTES) / 0x7F;
	    }
	    static setSelected(bufferView, index, value) {
	        bufferView.setInt8(UnitVertex.SIZE_BYTES * index + this.SELECTED_OFFSET_BYTES, value * 0x7F);
	    }
	    static copySelected(fromBufferView, fromIndex, toBufferView, toIndex) {
	        toBufferView.setInt8(UnitVertex.SIZE_BYTES * toIndex + this.SELECTED_OFFSET_BYTES, fromBufferView.getInt8(UnitVertex.SIZE_BYTES * fromIndex + this.SELECTED_OFFSET_BYTES));
	    }
	    static getRounding(bufferView, index) {
	        return bufferView.getFloat32(UnitVertex.SIZE_BYTES * index + this.ROUNDING_OFFSET_BYTES, true);
	    }
	    static setRounding(bufferView, index, value) {
	        bufferView.setFloat32(UnitVertex.SIZE_BYTES * index + this.ROUNDING_OFFSET_BYTES, value, true);
	    }
	    static copyRounding(fromBufferView, fromIndex, toBufferView, toIndex) {
	        toBufferView.setFloat32(UnitVertex.SIZE_BYTES * toIndex + this.ROUNDING_OFFSET_BYTES, fromBufferView.getFloat32(UnitVertex.SIZE_BYTES * fromIndex + this.ROUNDING_OFFSET_BYTES, true), true);
	    }
	    static getParameter1(bufferView, index) {
	        return bufferView.getFloat32(UnitVertex.SIZE_BYTES * index + this.PARAMETER_1_OFFSET_BYTES, true);
	    }
	    static setParameter1(bufferView, index, value) {
	        bufferView.setFloat32(UnitVertex.SIZE_BYTES * index + this.PARAMETER_1_OFFSET_BYTES, value, true);
	    }
	    static copyParameter1(fromBufferView, fromIndex, toBufferView, toIndex) {
	        toBufferView.setFloat32(UnitVertex.SIZE_BYTES * toIndex + this.PARAMETER_1_OFFSET_BYTES, fromBufferView.getFloat32(UnitVertex.SIZE_BYTES * fromIndex + this.PARAMETER_1_OFFSET_BYTES, true), true);
	    }
	    static getParameter2(bufferView, index) {
	        return bufferView.getFloat32(UnitVertex.SIZE_BYTES * index + this.PARAMETER_2_OFFSET_BYTES, true);
	    }
	    static setParameter2(bufferView, index, value) {
	        bufferView.setFloat32(UnitVertex.SIZE_BYTES * index + this.PARAMETER_2_OFFSET_BYTES, value, true);
	    }
	    static copyParameter2(fromBufferView, fromIndex, toBufferView, toIndex) {
	        toBufferView.setFloat32(UnitVertex.SIZE_BYTES * toIndex + this.PARAMETER_2_OFFSET_BYTES, fromBufferView.getFloat32(UnitVertex.SIZE_BYTES * fromIndex + this.PARAMETER_2_OFFSET_BYTES, true), true);
	    }
	    static getMaterial(bufferView, index) {
	        return bufferView.getUint16(UnitVertex.SIZE_BYTES * index + this.MATERIAL_OFFSET_BYTES);
	    }
	    static setMaterial(bufferView, index, value) {
	        bufferView.setUint16(UnitVertex.SIZE_BYTES * index + this.MATERIAL_OFFSET_BYTES, value);
	    }
	    static copyMaterial(fromBufferView, fromIndex, toBufferView, toIndex) {
	        toBufferView.setUint16(UnitVertex.SIZE_BYTES * toIndex + this.MATERIAL_OFFSET_BYTES, fromBufferView.getUint16(UnitVertex.SIZE_BYTES * fromIndex + this.MATERIAL_OFFSET_BYTES, true), true);
	    }
	    static getTexture(bufferView, index) {
	        return bufferView.getUint8(UnitVertex.SIZE_BYTES * index + this.TEXTURE_OFFSET_BYTES);
	    }
	    static setTexture(bufferView, index, value) {
	        bufferView.setUint8(UnitVertex.SIZE_BYTES * index + this.TEXTURE_OFFSET_BYTES, value);
	    }
	    static copyTexture(fromBufferView, fromIndex, toBufferView, toIndex) {
	        toBufferView.setUint8(UnitVertex.SIZE_BYTES * toIndex + this.TEXTURE_OFFSET_BYTES, fromBufferView.getUint8(UnitVertex.SIZE_BYTES * fromIndex + this.TEXTURE_OFFSET_BYTES));
	    }
	    static getSdfBuffer(bufferView, index) {
	        return bufferView.getUint8(UnitVertex.SIZE_BYTES * index + this.SDF_BUFFER_OFFSET_BYTES);
	    }
	    static setSdfBuffer(bufferView, index, value) {
	        bufferView.setUint8(UnitVertex.SIZE_BYTES * index + this.SDF_BUFFER_OFFSET_BYTES, value);
	    }
	    static copySdfBuffer(fromBufferView, fromIndex, toBufferView, toIndex) {
	        toBufferView.setUint8(UnitVertex.SIZE_BYTES * toIndex + this.SDF_BUFFER_OFFSET_BYTES, fromBufferView.getUint8(UnitVertex.SIZE_BYTES * fromIndex + this.SDF_BUFFER_OFFSET_BYTES));
	    }
	    static getSdfBorder(bufferView, index) {
	        return bufferView.getUint8(UnitVertex.SIZE_BYTES * index + this.SDF_BORDER_OFFSET_BYTES);
	    }
	    static setSdfBorder(bufferView, index, value) {
	        bufferView.setUint8(UnitVertex.SIZE_BYTES * index + this.SDF_BORDER_OFFSET_BYTES, value);
	    }
	    static copySdfBorder(fromBufferView, fromIndex, toBufferView, toIndex) {
	        toBufferView.setUint8(UnitVertex.SIZE_BYTES * toIndex + this.SDF_BORDER_OFFSET_BYTES, fromBufferView.getUint8(UnitVertex.SIZE_BYTES * fromIndex + this.SDF_BORDER_OFFSET_BYTES));
	    }
	}
	UnitVertex.SIZE_BYTES = 92;
	UnitVertex.ID_HOVER_OFFSET_BYTES = 0;
	UnitVertex.ID_COLOR_OFFSET_BYTES = 4;
	UnitVertex.ORDER_OFFSET_BYTES = 8;
	UnitVertex.STAGGER_ORDER_OFFSET_BYTES = 12;
	UnitVertex.SELECTED_OFFSET_BYTES = 80;
	UnitVertex.TRANSLATION_OFFSET_BYTES = 16;
	UnitVertex.COLOR_OFFSET_BYTES = 28;
	UnitVertex.MATERIAL_OFFSET_BYTES = 30;
	UnitVertex.SCALE_OFFSET_BYTES = 32;
	UnitVertex.ROUNDING_OFFSET_BYTES = 44;
	UnitVertex.ROTATION_OFFSET_BYTES = 48;
	UnitVertex.TEXCOORD_OFFSET_BYTES = 64;
	UnitVertex.TEXTURE_OFFSET_BYTES = 81;
	UnitVertex.SDF_BUFFER_OFFSET_BYTES = 82;
	UnitVertex.SDF_BORDER_OFFSET_BYTES = 83;
	UnitVertex.PARAMETER_1_OFFSET_BYTES = 84;
	UnitVertex.PARAMETER_2_OFFSET_BYTES = 88;

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class ObjMesh {
	}
	class ObjHelper {
	    constructor(core) {
	        this._core = core;
	    }
	    read(data) {
	        const start = window.performance.now();
	        const indices = [];
	        const positions = [];
	        const normals = [];
	        const texCoords = [];
	        const meshes = [];
	        const indexOffsets = [];
	        const indexCounts = [];
	        const faceLookup = {};
	        const lines = data.split("\n");
	        let faceCount = 0;
	        for (let i = 0; i < lines.length; i++) {
	            const parts = lines[i].trim().split(" ");
	            if (parts.length > 0) {
	                switch (parts[0]) {
	                    case "o":
	                        meshes.push(parts[1]);
	                        indexOffsets.push(indices.length);
	                        break;
	                    case "v":
	                        positions.push(parseFloat(parts[1]));
	                        positions.push(parseFloat(parts[2]));
	                        positions.push(parseFloat(parts[3]));
	                        break;
	                    case "vt":
	                        texCoords.push(parseFloat(parts[1]));
	                        texCoords.push(parseFloat(parts[2]));
	                        break;
	                    case "vn":
	                        normals.push(parseFloat(parts[1]));
	                        normals.push(parseFloat(parts[2]));
	                        normals.push(parseFloat(parts[3]));
	                        break;
	                    case "f":
	                        for (let i = 0; i < parts.length - 1; i++) {
	                            const part = parts[i + 1];
	                            if (faceLookup[part] == undefined) {
	                                faceLookup[part] = faceCount++;
	                            }
	                            indices.push(faceLookup[part]);
	                        }
	                        break;
	                }
	            }
	        }
	        for (let i = 0; i < meshes.length - 1; i++) {
	            indexCounts.push(indexOffsets[i + 1] - indexOffsets[i]);
	        }
	        indexCounts.push(indices.length - indexOffsets[meshes.length - 1]);
	        const vertices = new ArrayBuffer(PositionNormalTextureVertex.SIZE_BYTES * Object.keys(faceLookup).length);
	        const dataView = new DataView(vertices);
	        let minX = Number.MAX_VALUE;
	        let minY = Number.MAX_VALUE;
	        let minZ = Number.MAX_VALUE;
	        let maxX = -Number.MAX_VALUE;
	        let maxY = -Number.MAX_VALUE;
	        let maxZ = -Number.MAX_VALUE;
	        const faces = Object.keys(faceLookup);
	        const _vec2 = create();
	        const _vec3 = create$3();
	        let hasTexCoords, hasNormals;
	        if (faces.length > 0) {
	            const faceParts = faces[0].split("/");
	            hasTexCoords = faceParts.length > 1 && !isNaN(parseInt(faceParts[1]));
	            hasNormals = faceParts.length > 2 && !isNaN(parseInt(faceParts[2]));
	        }
	        for (let i = 0; i < faces.length; i++) {
	            const faceParts = faces[i].split("/");
	            let index = (parseInt(faceParts[0]) - 1) * 3;
	            const x = positions[index];
	            const y = positions[index + 1];
	            const z = positions[index + 2];
	            set$3(_vec3, x, y, z);
	            PositionNormalTextureVertex.setPosition(dataView, i, _vec3);
	            minX = Math.min(x, minX);
	            minY = Math.min(y, minY);
	            minZ = Math.min(z, minZ);
	            maxX = Math.max(x, maxX);
	            maxY = Math.max(y, maxY);
	            maxZ = Math.max(z, maxZ);
	            if (hasNormals) {
	                index = (parseInt(faceParts[2]) - 1) * 3;
	                set$3(_vec3, normals[index], normals[index + 1], normals[index + 2]);
	                PositionNormalTextureVertex.setNormal(dataView, i, _vec3);
	            }
	            if (hasTexCoords) {
	                index = (parseInt(faceParts[1]) - 1) * 2;
	                set(_vec2, texCoords[index], texCoords[index + 1]);
	                PositionNormalTextureVertex.setTexCoord(dataView, i, _vec2);
	            }
	        }
	        const originX = (minX + maxX) / 2;
	        const originY = (minY + maxY) / 2;
	        const originZ = (minZ + maxZ) / 2;
	        const objMesh = new ObjMesh();
	        objMesh.vertices = vertices;
	        objMesh.indices = new Uint16Array(indices);
	        objMesh.meshes = meshes;
	        objMesh.indexOffsets = indexOffsets;
	        objMesh.indexCounts = indexCounts;
	        objMesh.indexCount = indices.length;
	        objMesh.minX = minX;
	        objMesh.minY = minY;
	        objMesh.minZ = minZ;
	        objMesh.maxX = maxX;
	        objMesh.maxY = maxY;
	        objMesh.maxZ = maxZ;
	        objMesh.originX = originX;
	        objMesh.originY = originY;
	        objMesh.originZ = originZ;
	        this._core.log.write(LogLevel.info, `obj loaded ${Math.round(window.performance.now() - start)}ms`);
	        return objMesh;
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Cube {
	}
	Cube.POSITIONS = new Float32Array([
	    -0.5, 0.5, 0.5,
	    0.5, 0.5, 0.5,
	    0.5, -0.5, 0.5,
	    -0.5, -0.5, 0.5,
	    -0.5, 0.5, -0.5,
	    0.5, 0.5, -0.5,
	    0.5, -0.5, -0.5,
	    -0.5, -0.5, -0.5
	]);
	Cube.INDICES = new Uint16Array([5, 4, 1, 0, 3, 4, 7, 5, 6, 1, 2, 3, 6, 7]);
	Cube.CUBE_MAP_INDICES = new Uint16Array([2, 3, 1, 0, 4, 3, 7, 2, 6, 1, 5, 4, 6, 7]);
	Cube.FACE_NORMALS = [
	    fromValues$3(0, 1, 0),
	    fromValues$3(1, 0, 0),
	    fromValues$3(0, -1, 0),
	    fromValues$3(-1, 0, 0),
	    fromValues$3(0, 0, 1),
	    fromValues$3(0, 0, -1)
	];
	Cube.FACE_POSITIONS = [
	    fromValues$3(0.0, 0.5, 0.0),
	    fromValues$3(0.5, 0.0, 0.0),
	    fromValues$3(0.0, -0.5, 0.0),
	    fromValues$3(-0.5, 0.0, 0.0),
	    fromValues$3(0.0, 0.0, 0.5),
	    fromValues$3(0.0, 0.0, -0.5)
	];
	Cube.FACE_ROTATIONS = [
	    fromValues$5(1, 0, 0, 0, 0, -1, 0, 1, 0),
	    fromValues$5(0, 0, -1, 0, 1, 0, 1, 0, 0),
	    fromValues$5(1, 0, 0, 0, 0, 1, 0, -1, 0),
	    fromValues$5(0, 0, 1, 0, 1, 0, -1, 0, 0),
	    fromValues$5(1, 0, 0, 0, 1, 0, 0, 0, 1),
	    fromValues$5(1, 0, 0, 0, -1, 0, 0, 0, -1)
	];
	Cube.EDGE_POSITIONS = [
	    fromValues$3(0, 0.5, 0.5),
	    fromValues$3(0.5, 0.5, 0),
	    fromValues$3(0, 0.5, -0.5),
	    fromValues$3(-0.5, 0.5, 0),
	    fromValues$3(0, -0.5, 0.5),
	    fromValues$3(0.5, -0.5, 0),
	    fromValues$3(0, -0.5, -0.5),
	    fromValues$3(-0.5, -0.5, 0),
	    fromValues$3(0.5, 0, 0.5),
	    fromValues$3(0.5, 0, -0.5),
	    fromValues$3(-0.5, 0, -0.5),
	    fromValues$3(-0.5, 0, 0.5)
	];
	Cube.EDGE_NORMALS = [
	    fromValues$3(0, Constants.ROOT_TWO_OVER_TWO, Constants.ROOT_TWO_OVER_TWO),
	    fromValues$3(Constants.ROOT_TWO_OVER_TWO, Constants.ROOT_TWO_OVER_TWO, 0),
	    fromValues$3(0, Constants.ROOT_TWO_OVER_TWO, -Constants.ROOT_TWO_OVER_TWO),
	    fromValues$3(-Constants.ROOT_TWO_OVER_TWO, Constants.ROOT_TWO_OVER_TWO, 0),
	    fromValues$3(0, -Constants.ROOT_TWO_OVER_TWO, Constants.ROOT_TWO_OVER_TWO),
	    fromValues$3(Constants.ROOT_TWO_OVER_TWO, -Constants.ROOT_TWO_OVER_TWO, 0),
	    fromValues$3(0, -Constants.ROOT_TWO_OVER_TWO, -Constants.ROOT_TWO_OVER_TWO),
	    fromValues$3(-Constants.ROOT_TWO_OVER_TWO, -Constants.ROOT_TWO_OVER_TWO, 0),
	    fromValues$3(Constants.ROOT_TWO_OVER_TWO, 0, Constants.ROOT_TWO_OVER_TWO),
	    fromValues$3(Constants.ROOT_TWO_OVER_TWO, 0, -Constants.ROOT_TWO_OVER_TWO),
	    fromValues$3(-Constants.ROOT_TWO_OVER_TWO, 0, -Constants.ROOT_TWO_OVER_TWO),
	    fromValues$3(-Constants.ROOT_TWO_OVER_TWO, 0, Constants.ROOT_TWO_OVER_TWO)
	];
	Cube.EDGE_CORNERS = [
	    [0, 1],
	    [1, 5],
	    [4, 5],
	    [0, 4],
	    [2, 3],
	    [2, 6],
	    [6, 7],
	    [3, 7],
	    [1, 2],
	    [5, 6],
	    [4, 7],
	    [0, 3]
	];
	Cube.EDGE_FACES = [
	    [0, 4],
	    [0, 1],
	    [0, 5],
	    [0, 3],
	    [2, 4],
	    [2, 1],
	    [2, 5],
	    [2, 3],
	    [1, 4],
	    [1, 5],
	    [3, 5],
	    [3, 4]
	];
	Cube.EDGE_AXIS = [
	    0,
	    2,
	    0,
	    2,
	    0,
	    2,
	    0,
	    2,
	    1,
	    1,
	    1,
	    1
	];
	Cube.AXIS_EDGES = [
	    [0, 2, 4, 6],
	    [8, 9, 10, 11],
	    [1, 3, 5, 7]
	];
	Cube.AXIS_FACES = [
	    [1, 3],
	    [0, 2],
	    [4, 5]
	];
	Cube.OPPOSITE_FACES = [
	    2,
	    3,
	    0,
	    1,
	    5,
	    4
	];
	Cube.EDGE_POSITIVES = [
	    fromValues$3(1, 0, 0),
	    fromValues$3(0, 0, 1),
	    fromValues$3(1, 0, 0),
	    fromValues$3(0, 0, 1),
	    fromValues$3(1, 0, 0),
	    fromValues$3(0, 0, 1),
	    fromValues$3(1, 0, 0),
	    fromValues$3(0, 0, 1),
	    fromValues$3(0, 1, 0),
	    fromValues$3(0, 1, 0),
	    fromValues$3(0, 1, 0),
	    fromValues$3(0, 1, 0)
	];
	Cube.EDGE_FORWARDS = [
	    fromValues$3(0, Constants.ROOT_TWO_OVER_TWO, -Constants.ROOT_TWO_OVER_TWO),
	    fromValues$3(Constants.ROOT_TWO_OVER_TWO, -Constants.ROOT_TWO_OVER_TWO, 0),
	    fromValues$3(0, -Constants.ROOT_TWO_OVER_TWO, -Constants.ROOT_TWO_OVER_TWO),
	    fromValues$3(Constants.ROOT_TWO_OVER_TWO, Constants.ROOT_TWO_OVER_TWO, 0),
	    fromValues$3(0, Constants.ROOT_TWO_OVER_TWO, Constants.ROOT_TWO_OVER_TWO),
	    fromValues$3(-Constants.ROOT_TWO_OVER_TWO, -Constants.ROOT_TWO_OVER_TWO, 0),
	    fromValues$3(0, -Constants.ROOT_TWO_OVER_TWO, Constants.ROOT_TWO_OVER_TWO),
	    fromValues$3(-Constants.ROOT_TWO_OVER_TWO, Constants.ROOT_TWO_OVER_TWO, 0),
	    fromValues$3(-Constants.ROOT_TWO_OVER_TWO, 0, Constants.ROOT_TWO_OVER_TWO),
	    fromValues$3(Constants.ROOT_TWO_OVER_TWO, 0, Constants.ROOT_TWO_OVER_TWO),
	    fromValues$3(Constants.ROOT_TWO_OVER_TWO, 0, -Constants.ROOT_TWO_OVER_TWO),
	    fromValues$3(-Constants.ROOT_TWO_OVER_TWO, 0, -Constants.ROOT_TWO_OVER_TWO)
	];

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let ControllerVisual$1 = class ControllerVisual {
	    render(elapsedTime, xrFrame) { }
	    update(elapsedTime) { }
	    constructor(controller) {
	        this.controller = controller;
	    }
	};
	class Controller {
	    get isInitialized() { return this._isInitialized; }
	    get mMatrix() { return this._mMatrix; }
	    get indexCount() { return this._indexCount; }
	    get vertices() { return this._vertices; }
	    get indices() { return this._indices; }
	    get texture() { return this._texture; }
	    get rayMMatrix() { return this._rayMMatrix; }
	    get rayIndexCount() { return this._rayIndexCount; }
	    get rayVertices() { return this._rayVertices; }
	    get rayIndices() { return this._rayIndices; }
	    constructor(core, options) {
	        this._cubeObj = `o Cube
v 1.000000 -1.000000 -1.000000
v 1.000000 -1.000000 1.000000
v -1.000000 -1.000000 1.000000
v -1.000000 -1.000000 -1.000000
v 1.000000 1.000000 -0.999999
v 0.999999 1.000000 1.000001
v -1.000000 1.000000 1.000000
v -1.000000 1.000000 -1.000000
vt 1.000000 0.333333
vt 1.000000 0.666667
vt 0.666667 0.666667
vt 0.666667 0.333333
vt 0.666667 0.000000
vt 0.000000 0.333333
vt 0.000000 0.000000
vt 0.333333 0.000000
vt 0.333333 1.000000
vt 0.000000 1.000000
vt 0.000000 0.666667
vt 0.333333 0.333333
vt 0.333333 0.666667
vt 1.000000 0.000000
vn 0.000000 -1.000000 0.000000
vn 0.000000 1.000000 0.000000
vn 1.000000 0.000000 0.000000
vn -0.000000 0.000000 1.000000
vn -1.000000 -0.000000 -0.000000
vn 0.000000 0.000000 -1.000000
s off
f 2/1/1 3/2/1 4/3/1
f 8/1/2 7/4/2 6/5/2
f 5/6/3 6/7/3 2/8/3
f 6/8/4 7/5/4 3/4/4
f 3/9/5 7/10/5 8/11/5
f 1/12/6 4/13/6 8/11/6
f 1/4/1 2/1/1 4/3/1
f 5/14/2 8/1/2 6/5/2
f 1/12/3 5/6/3 2/8/3
f 2/12/4 6/8/4 3/4/4
f 4/13/5 3/9/5 8/11/5
f 5/6/6 1/12/6 8/11/6`;
	        this._core = core;
	        this._obj = options.obj;
	        this._texture = options.texture || new ImageData(new Uint8ClampedArray([0, 0, 0, 255]), 1, 1);
	    }
	    initialize() {
	        const _vec3 = create$3();
	        this._mMatrix = create$4();
	        const objMesh = new ObjHelper(this._core).read(this._obj || this._cubeObj);
	        if (!this._obj) {
	            this.useRayPose = true;
	            const modelThickness = 0.02;
	            const modelLength = 0.1;
	            set$3(_vec3, modelThickness, modelThickness, modelLength);
	            fromScaling(this._mMatrix, _vec3);
	            set$3(_vec3, 0, 0, 1);
	            translate(this._mMatrix, this._mMatrix, _vec3);
	        }
	        this._vertices = objMesh.vertices;
	        this._indices = objMesh.indices;
	        this._indexCount = objMesh.indexCount;
	        this._rayMMatrix = create$4();
	        const rayVertices = Cube.POSITIONS;
	        this._rayVertices = new ArrayBuffer(PositionColorVertex.SIZE_BYTES * rayVertices.length / PositionVertex.SIZE);
	        const rayVerticesView = new DataView(this._rayVertices);
	        const rayIndices = Cube.INDICES;
	        this._rayIndices = new Uint16Array(rayIndices);
	        const rayVertexCount = rayVertices.length / PositionVertex.SIZE;
	        this._rayIndexCount = rayIndices.length;
	        for (let i = 0; i < rayVertexCount; i++) {
	            set$3(_vec3, rayVertices[i * PositionVertex.SIZE], rayVertices[i * PositionVertex.SIZE + 1], rayVertices[i * PositionVertex.SIZE + 2]);
	            PositionColorVertex.setPosition(rayVerticesView, i, _vec3);
	            PositionColorVertex.setColor(rayVerticesView, i, this._core.config.xrControllerRayColor);
	        }
	        const rayThickness = 0.0025;
	        const rayLength = 10;
	        set$3(_vec3, rayThickness, rayThickness, rayLength);
	        fromScaling(this._rayMMatrix, _vec3);
	        set$3(_vec3, 0, 0, -0.5);
	        translate(this._rayMMatrix, this._rayMMatrix, _vec3);
	        this._isInitialized = true;
	        this._core.log.write(LogLevel.info, "controller initialized");
	    }
	    update(elapsedTime) { }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class MatrixHelper {
	    static fieldOfViewFromProjectionMatrix(p) {
	        return 2 * Math.atan(1 / p[5]);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class AxesVisual {
	    render(elapsedTime, xrFrame) { }
	    update(elapsedTime) { }
	    constructor(axes) {
	        this.axes = axes;
	    }
	}
	class AxesBase {
	    get isInitialized() { return this._isInitialized; }
	    set vMatrix(value) { this._vMatrix = value; }
	    pickGrid(id) {
	        const offset = id * 3;
	        return {
	            divisionX: this._pickGrid[offset] - 1,
	            divisionY: this._pickGrid[offset + 1] - 1,
	            divisionZ: this._pickGrid[offset + 2] - 1,
	        };
	    }
	    pickTitle(id) {
	        return { axis: this._pickTitle[id], };
	    }
	    pickLabel(id) {
	        const offset = id * 2;
	        return {
	            axis: this._pickLabel[offset],
	            label: this._pickLabel[offset + 1],
	        };
	    }
	    pickHeading(id) {
	        return { axis: this._pickHeading[id], };
	    }
	    getFromValues(index) { return this._fromValues[index]; }
	    setFromValues(index, value) {
	        if (this._fromValues[index] != value) {
	            this._fromValues[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    getToValues(index) { return this._toValues[index]; }
	    setToValues(index, value) {
	        if (this._toValues[index] != value) {
	            this._toValues[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    get font() { return this._font; }
	    set font(value) {
	        if (this._font != value) {
	            this._font = value;
	            this._hasChanged = true;
	        }
	    }
	    get gridPickDivisionHeight() { return this._gridPickDivisionHeight; }
	    set gridPickDivisionHeight(value) {
	        if (this._gridPickDivisionHeight != value) {
	            this._gridPickDivisionHeight = value;
	            this._hasChanged = true;
	        }
	    }
	    constructor(core) {
	        this._core = core;
	        this._mMatrix = create$4();
	        this._mvMatrix = create$4();
	        this._textMetric = { maxTop: 0, width: 0, maxHeight: 0 };
	        this._gridPickDivisionHeight = core.config.axesGridPickDivisionHeight;
	        this.textBorderWidth = core.config.textBorderWidth;
	        this.gamma = 0;
	        this.gridMajorThickness = core.config.axesGridMajorThickness;
	        this.gridMinorThickness = core.config.axesGridMinorThickness;
	        this.gridZeroThickness = core.config.axesGridZeroThickness;
	        this._font = core.font;
	        this.isGridPickingEnabled = false;
	    }
	    update(elapsedTime) { }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let Quad$2 = class Quad {
	    static positions(transform) {
	        const positions = new Float32Array(12);
	        const position = create$3();
	        for (let i = 0; i < 4; i++) {
	            set$3(position, this.POSITIONS[i * 3], this.POSITIONS[i * 3 + 1], this.POSITIONS[i * 3 + 2]);
	            transformMat4$2(position, position, transform);
	            positions[i * 3] = position[0];
	            positions[i * 3 + 1] = position[1];
	            positions[i * 3 + 2] = position[2];
	        }
	        return positions;
	    }
	    static textured(transform, texTransform = Constants.MAT4_IDENTITY) {
	        const positions = this.positions(transform);
	        const texCoords = this.TEX_COORDS;
	        const vertices = new ArrayBuffer(PositionTextureVertex.SIZE_BYTES * positions.length / 3);
	        const verticesView = new DataView(vertices);
	        const position = create$3();
	        const texCoord = create();
	        for (let i = 0; i < positions.length / PositionVertex.SIZE; i++) {
	            set$3(position, positions[i * PositionVertex.SIZE], positions[i * PositionVertex.SIZE + 1], positions[i * PositionVertex.SIZE + 2]);
	            set(texCoord, texCoords[i * 2], texCoords[i * 2 + 1]);
	            transformMat4(texCoord, texCoord, texTransform);
	            PositionTextureVertex.setPosition(verticesView, i, position);
	            PositionTextureVertex.setTexCoord(verticesView, i, texCoord);
	        }
	        return verticesView;
	    }
	    static normalTextured(transform, texTransform = Constants.MAT4_IDENTITY) {
	        const positions = this.positions(transform);
	        const texCoords = this.TEX_COORDS;
	        const vertices = new ArrayBuffer(PositionNormalTextureVertex.SIZE_BYTES * positions.length / 3);
	        const verticesView = new DataView(vertices);
	        const position = create$3();
	        const texCoord = create();
	        const normal3 = create$3();
	        const normal4 = create$2();
	        for (let i = 0; i < positions.length / PositionVertex.SIZE; i++) {
	            set$3(position, positions[i * PositionVertex.SIZE], positions[i * PositionVertex.SIZE + 1], positions[i * PositionVertex.SIZE + 2]);
	            set(texCoord, texCoords[i * 2], texCoords[i * 2 + 1]);
	            transformMat4(texCoord, texCoord, texTransform);
	            PositionNormalTextureVertex.setPosition(verticesView, i, position);
	            set$2(normal4, 0.0, 0.0, 1.0, 0.0);
	            transformMat4$1(normal4, normal4, transform);
	            set$3(normal3, normal4[0], normal4[1], normal4[2]);
	            normalize$2(normal3, normal3);
	            PositionNormalTextureVertex.setNormal(verticesView, i, normal3);
	            PositionNormalTextureVertex.setTexCoord(verticesView, i, texCoord);
	        }
	        return verticesView;
	    }
	};
	Quad$2.FACE_NORMALS = [
	    fromValues$3(0, 0, 1),
	    fromValues$3(0, 0, -1)
	];
	Quad$2.FACE_ROTATIONS = [
	    fromValues$5(1, 0, 0, 0, 1, 0, 0, 0, 1),
	    fromValues$5(1, 0, 0, 0, -1, 0, 0, 0, -1)
	];
	Quad$2.EDGE_POSITIONS = [
	    fromValues$3(0, 0.5, 0),
	    fromValues$3(0.5, 0, 0),
	    fromValues$3(0, -0.5, 0),
	    fromValues$3(-0.5, 0, 0)
	];
	Quad$2.EDGE_NORMALS = [
	    fromValues$3(0, 1, 0),
	    fromValues$3(1, 0, 0),
	    fromValues$3(0, -1, 0),
	    fromValues$3(-1, 0, 0)
	];
	Quad$2.EDGE_POSITIVES = [
	    fromValues$3(1, 0, 0),
	    fromValues$3(0, 1, 0),
	    fromValues$3(1, 0, 0),
	    fromValues$3(0, 1, 0)
	];
	Quad$2.EDGE_FORWARDS = [
	    fromValues$3(0, 0, -1),
	    fromValues$3(0, 0, 1),
	    fromValues$3(0, 0, 1),
	    fromValues$3(0, 0, -1)
	];
	Quad$2.AXIS_EDGES = [
	    [0, 2],
	    [1, 3]
	];
	Quad$2.POSITIONS = new Float32Array([
	    -0.5, 0.5, 0,
	    0.5, 0.5, 0,
	    -0.5, -0.5, 0,
	    0.5, -0.5, 0
	]);
	Quad$2.INDICES = new Uint16Array([0, 2, 1, 1, 2, 3]);
	Quad$2.TEX_COORDS = new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]);

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class TextHelper {
	    static truncate(text, length) {
	        return text.length > length ? `${text.substr(0, length - 1)}…` : text;
	    }
	    static measure(font, text, size) {
	        size.width = 0;
	        let maxDescent = 0;
	        for (const char of text) {
	            let glyph = font.glyphs[char];
	            if (!glyph) {
	                font.addGlyph(char);
	                glyph = font.glyphs[char];
	            }
	            size.width += glyph.advance;
	            size.maxTop = Math.max(glyph.top, size.maxTop);
	            maxDescent = Math.max(glyph.height - glyph.top, maxDescent);
	        }
	        size.maxHeight = size.maxTop + maxDescent;
	    }
	    static wrap(font, text, maxWidth) {
	        const lines = [];
	        let width = 0;
	        let start = 0;
	        let lastBreakingChar = -1;
	        let widthAfterLastBreakingChar = 0;
	        for (let i = 0; i < text.length; i++) {
	            let char = text.charAt(i);
	            let glyph = font.glyphs[char];
	            if (!glyph) {
	                font.addGlyph(char);
	                glyph = font.glyphs[char];
	            }
	            width += glyph.advance;
	            if (char == " " || char == "-") {
	                widthAfterLastBreakingChar = width;
	                lastBreakingChar = i;
	            }
	            if (width > maxWidth) {
	                if (lastBreakingChar == -1) {
	                    lines.push(text.substring(start, i));
	                    start = i;
	                    width += glyph.advance;
	                }
	                else {
	                    lines.push(text.substring(start, lastBreakingChar));
	                    start = lastBreakingChar + 1;
	                    width -= widthAfterLastBreakingChar;
	                    widthAfterLastBreakingChar = 0;
	                    lastBreakingChar = -1;
	                }
	            }
	        }
	        lines.push(text.substring(start, text.length));
	        return lines;
	    }
	    static addString(font, text, vertices, indices, index, position, scale, offset, rotation, idColor) {
	        for (const char of text) {
	            this.addGlyph(font, char, vertices, indices, index++, position, scale, offset, rotation, idColor);
	        }
	    }
	    static addGlyph(font, char, vertices, indices, index, position, scale, offset, rotation, idColor) {
	        let glyph = font.glyphs[char];
	        if (!glyph) {
	            font.addGlyph(char);
	            glyph = font.glyphs[char];
	        }
	        const vertexOffset = index * 4;
	        const width = glyph.width * scale;
	        const height = glyph.height * scale;
	        const top = glyph.top * scale;
	        const border = font.border * scale;
	        const x0 = offset[0] - border;
	        const x1 = offset[0] + width + border;
	        const y0 = offset[1] + top + border;
	        const y1 = offset[1] + top - height - border;
	        const z0 = offset[2];
	        set$3(this._topLeft, x0, y0, z0);
	        set$3(this._topRight, x1, y0, z0);
	        set$3(this._bottomLeft, x0, y1, z0);
	        set$3(this._bottomRight, x1, y1, z0);
	        if (rotation) {
	            transformQuat(this._topLeft, this._topLeft, rotation);
	            transformQuat(this._topRight, this._topRight, rotation);
	            transformQuat(this._bottomLeft, this._bottomLeft, rotation);
	            transformQuat(this._bottomRight, this._bottomRight, rotation);
	        }
	        add(this._vec3, this._topLeft, position);
	        PositionTexturePickVertex.setPosition(vertices, vertexOffset, this._vec3);
	        add(this._vec3, this._topRight, position);
	        PositionTexturePickVertex.setPosition(vertices, vertexOffset + 1, this._vec3);
	        add(this._vec3, this._bottomLeft, position);
	        PositionTexturePickVertex.setPosition(vertices, vertexOffset + 2, this._vec3);
	        add(this._vec3, this._bottomRight, position);
	        PositionTexturePickVertex.setPosition(vertices, vertexOffset + 3, this._vec3);
	        set(this._vec2, glyph.u0, glyph.v0);
	        PositionTexturePickVertex.setTexCoord(vertices, vertexOffset, this._vec2);
	        set(this._vec2, glyph.u1, glyph.v0);
	        PositionTexturePickVertex.setTexCoord(vertices, vertexOffset + 1, this._vec2);
	        set(this._vec2, glyph.u0, glyph.v1);
	        PositionTexturePickVertex.setTexCoord(vertices, vertexOffset + 2, this._vec2);
	        set(this._vec2, glyph.u1, glyph.v1);
	        PositionTexturePickVertex.setTexCoord(vertices, vertexOffset + 3, this._vec2);
	        PositionTexturePickVertex.setIdColor(vertices, vertexOffset, idColor);
	        PositionTexturePickVertex.setIdColor(vertices, vertexOffset + 1, idColor);
	        PositionTexturePickVertex.setIdColor(vertices, vertexOffset + 2, idColor);
	        PositionTexturePickVertex.setIdColor(vertices, vertexOffset + 3, idColor);
	        offset[0] += glyph.advance * scale;
	        const indexTemplate = Quad$2.INDICES;
	        const indexOffset = index * 6;
	        for (let i = 0; i < 6; i++) {
	            indices[indexOffset + i] = indexTemplate[i] + vertexOffset;
	        }
	    }
	}
	TextHelper._vec2 = create();
	TextHelper._vec3 = create$3();
	TextHelper._topLeft = create$3();
	TextHelper._topRight = create$3();
	TextHelper._bottomLeft = create$3();
	TextHelper._bottomRight = create$3();

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class PickHelper {
	    static nextPickId() { return this._pickId++; }
	    static encodeNumber(number, type, color) {
	        const encoded = number | PickHelper.encodeType(type);
	        PickHelper.float32ToVec4(encoded, color);
	    }
	    static decodeNumber(color) {
	        return color[0] + (color[1] << 8) + (color[2] << 16);
	    }
	    static encodeVec3(vec3, type, color) {
	        const encoded = vec3[0] | (vec3[1] << 8) | (vec3[2] << 16) | PickHelper.encodeType(type);
	        PickHelper.float32ToVec4(encoded, color);
	    }
	    static decodeVec3(color, axes) {
	        axes[0] = color[0];
	        axes[1] = color[1];
	        axes[2] = color[2];
	    }
	    static encodeType(type) {
	        return type << 24;
	    }
	    static decodeType(color) {
	        return color[3];
	    }
	    static float32ToVec4(number, color) {
	        color[0] = ((number & 0xFF) >>> 0) / 0xFF;
	        color[1] = ((number & 0xFF00) >>> 8) / 0xFF;
	        color[2] = ((number & 0xFF0000) >>> 16) / 0xFF;
	        color[3] = ((number & 0xFF000000) >>> 24) / 0xFF;
	    }
	    static uint8ArrayToNumber(color) {
	        return color[0] + (color[1] << 8) + (color[2] << 16) + (color[3] << 24);
	    }
	}
	PickHelper._pickId = 1;

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Cartesian3dAxes extends AxesBase {
	    get size() { return this._size; }
	    get isDiscreteX() { return this._isDiscrete[0]; }
	    set isDiscreteX(value) {
	        if (value != this._isDiscrete[0]) {
	            this._isDiscrete[0] = value;
	            this._hasChanged = true;
	        }
	    }
	    get isDiscreteY() { return this._isDiscrete[1]; }
	    set isDiscreteY(value) {
	        if (value != this._isDiscrete[1]) {
	            this._isDiscrete[1] = value;
	            this._hasChanged = true;
	        }
	    }
	    get isDiscreteZ() { return this._isDiscrete[2]; }
	    set isDiscreteZ(value) {
	        if (value != this._isDiscrete[2]) {
	            this._isDiscrete[2] = value;
	            this._hasChanged = true;
	        }
	    }
	    get minBoundsX() { return this._minBoundsX; }
	    set minBoundsX(value) {
	        if (value != this._minBoundsX) {
	            this._minBoundsX = value;
	            this._hasChanged = true;
	        }
	    }
	    get maxBoundsX() { return this._maxBoundsX; }
	    set maxBoundsX(value) {
	        if (value != this._minBoundsX) {
	            this._maxBoundsX = value;
	            this._hasChanged = true;
	        }
	    }
	    get minBoundsY() { return this._minBoundsY; }
	    set minBoundsY(value) {
	        if (value != this._minBoundsY) {
	            this._minBoundsY = value;
	            this._hasChanged = true;
	        }
	    }
	    get maxBoundsY() { return this._maxBoundsY; }
	    set maxBoundsY(value) {
	        if (value != this._minBoundsY) {
	            this._maxBoundsY = value;
	            this._hasChanged = true;
	        }
	    }
	    get minBoundsZ() { return this._minBoundsZ; }
	    set minBoundsZ(value) {
	        if (value != this._minBoundsZ) {
	            this._minBoundsZ = value;
	            this._hasChanged = true;
	        }
	    }
	    get maxBoundsZ() { return this._maxBoundsZ; }
	    set maxBoundsZ(value) {
	        if (value != this._minBoundsZ) {
	            this._maxBoundsZ = value;
	            this._hasChanged = true;
	        }
	    }
	    getIsOutsideEdge(index) { return this._isOutsideEdge[index]; }
	    getIsForwardFace(index) { return this._isForwardFace[index]; }
	    get textVertices() { return this._textVertices; }
	    get textIndices() { return this._textIndices; }
	    getLabelMMatrix(index) { return this._labelMMatrices[index]; }
	    setLabelPositions(index, value) {
	        if (this._labelPositions[index] != value) {
	            this._labelPositions[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    setLabels(index, value) {
	        if (this._labels[index] != value) {
	            this._labels[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    setLabelSizes(index, value) {
	        if (this._labelSizes[index] != value) {
	            this._labelSizes[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    getLabelOrientation(index) { return this._orientations[index]; }
	    setLabelOrientation(index, orientation) {
	        if (this._orientations[index] != orientation) {
	            this._orientations[index] = orientation;
	            this._hasChanged = true;
	        }
	    }
	    getTitleIndexCount(index) { return this._titleIndexCounts[index]; }
	    getTitleIndexOffset(index) { return this._titleIndexOffsets[index]; }
	    getTitleMMatrix(index) { return this._titleMMatrices[index]; }
	    setTitle(index, value) {
	        if (this._titles[index] != value) {
	            this._titles[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    setTitleSize(index, value) {
	        if (this._titleSizes[index] != value) {
	            this._titleSizes[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    getHeadingIndexCount(index) { return this._headingIndexCounts[index]; }
	    getHeadingIndexOffset(index) { return this._headingIndexOffsets[index]; }
	    getHeadingMMatrix(index) { return this._headingMMatrices[index]; }
	    setHeading(index, value) {
	        if (this._headings[index] != value) {
	            this._headings[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    setHeadingSize(index, value) {
	        if (this._headingSizes[index] != value) {
	            this._headingSizes[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    getIsLeftToRightHorizontal(index) { return this._isLeftToRightHorizontal[index]; }
	    getIsLeftToRightVertical(index) { return this._isLeftToRightVertical[index]; }
	    getAxesLeftToRightIndexCount(index) { return this._axesLeftToRightIndexCounts[index]; }
	    getAxesRightToLeftIndexCount(index) { return this._axesRightToLeftIndexCounts[index]; }
	    getAxesLeftToRightIndexOffset(index) { return this._axesLeftToRightIndexOffsets[index]; }
	    getAxesRightToLeftIndexOffset(index) { return this._axesRightToLeftIndexOffsets[index]; }
	    get gridVertices() { return this._gridVertices; }
	    get gridIndices() { return this._gridIndices; }
	    getGridTicksIndexCount(index) { return this._gridTicksIndexCounts[index]; }
	    getGridTicksIndexOffset(index) { return this._gridTicksIndexOffsets[index]; }
	    getGridFaceIndexCount(index) { return this._gridFaceIndexCounts[index]; }
	    getGridFaceIndexOffset(index) { return this._gridFaceIndexOffsets[index]; }
	    getGridTicksMMatrix(index) { return this._gridTicksMMatrices[index]; }
	    getGridFaceMMatrix(index) { return this._gridFaceMMatrices[index]; }
	    getGridTicksScale(index) { return this._gridTicksScales[index]; }
	    getGridFaceZero(index) { return this._gridFaceZeros[index]; }
	    getGridTicksZero(index) { return this._gridTicksZeros[index]; }
	    getGridFaceMinorGridlines(index) { return this._gridFaceMinorGridlines[index]; }
	    getGridTicksMinorGridlines(index) { return this._gridTicksMinorGridlines[index]; }
	    setTickPositions(index, value) {
	        if (this._gridTicksPositions[index] != value) {
	            this._gridTicksPositions[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    get scalingX() { return this._scalingX; }
	    set scalingX(value) {
	        if (value != this._scalingX) {
	            this._scalingX = value;
	            this._hasChanged = true;
	        }
	    }
	    get scalingY() { return this._scalingY; }
	    set scalingY(value) {
	        if (value != this._scalingY) {
	            this._scalingY = value;
	            this._hasChanged = true;
	        }
	    }
	    get scalingZ() { return this._scalingZ; }
	    set scalingZ(value) {
	        if (value != this._scalingZ) {
	            this._scalingZ = value;
	            this._hasChanged = true;
	        }
	    }
	    get offsetX() { return this._offset[12]; }
	    set offsetX(value) {
	        if (value != this._offset[12]) {
	            this._offset[12] = value;
	        }
	    }
	    get offsetY() { return this._offset[13]; }
	    set offsetY(value) {
	        if (value != this._offset[13]) {
	            this._offset[13] = value;
	        }
	    }
	    get offsetZ() { return this._offset[14]; }
	    set offsetZ(value) {
	        if (value != this._offset[14]) {
	            this._offset[14] = value;
	        }
	    }
	    constructor(core) {
	        super(core);
	        this._size = create$3();
	        this._translation = create$3();
	        this._normal = create$3();
	        this._forward = create$3();
	        this._right = create$3();
	        this._up = create$3();
	        this._texCoord = create();
	        this._bounds = create$2();
	        this._vec3 = create$3();
	        this._vec4 = create$2();
	        this._mat3 = create$5();
	        this._isDiscrete = [false, false, false];
	        this._minBoundsX = 0;
	        this._minBoundsY = 0;
	        this._minBoundsZ = 0;
	        this._maxBoundsX = 0;
	        this._maxBoundsY = 0;
	        this._maxBoundsZ = 0;
	        this._isForwardFace = [];
	        this._isForwardEdge = [];
	        this._isOutsideEdge = [];
	        for (let i = 0; i < 6; i++) {
	            this._isForwardFace.push(false);
	        }
	        for (let i = 0; i < 12; i++) {
	            this._isForwardEdge.push(false);
	            this._isOutsideEdge.push(false);
	        }
	        this._textOffset = create$3();
	        this._textPosition = create$3();
	        this._distances = [];
	        for (let i = 0; i < 12; i++) {
	            this._distances.push(0);
	        }
	        this._labelPositions = [];
	        this._labels = [];
	        this._labelSizes = [];
	        this._maxLabelSize = [];
	        this._axesLeftToRightIndexCounts = [];
	        this._axesRightToLeftIndexCounts = [];
	        this._axesLeftToRightIndexOffsets = [];
	        this._axesRightToLeftIndexOffsets = [];
	        this._labelMMatrices = [];
	        this._orientations = [];
	        for (let i = 0; i < 3; i++) {
	            this._maxLabelSize.push(create());
	            this._orientations.push(AxesTextOrientation.parallel);
	            this._axesLeftToRightIndexCounts.push(0);
	            this._axesRightToLeftIndexCounts.push(0);
	            this._axesLeftToRightIndexOffsets.push(0);
	            this._axesRightToLeftIndexOffsets.push(0);
	        }
	        for (let i = 0; i < 12; i++) {
	            this._labelMMatrices.push(create$4());
	        }
	        this._titles = [];
	        this._titleSizes = [];
	        this._titleIndexCounts = [];
	        this._titleIndexOffsets = [];
	        this._titleMMatrices = [];
	        for (let i = 0; i < 3; i++) {
	            this._titles.push(null);
	            this._titleSizes.push(core.config.axesTextTitleSize);
	            this._titleIndexCounts.push(0);
	            this._titleIndexOffsets.push(0);
	        }
	        for (let i = 0; i < 12; i++) {
	            this._titleMMatrices.push(create$4());
	        }
	        this._headings = [];
	        this._headingSizes = [];
	        this._headingIndexCounts = [];
	        this._headingIndexOffsets = [];
	        this._headingMMatrices = [];
	        this.isHeadingVisible = [];
	        for (let i = 0; i < 3; i++) {
	            this._headings.push(null);
	            this._headingSizes.push(core.config.axesTextHeadingSize);
	            this._headingIndexCounts.push(0);
	            this._headingIndexOffsets.push(0);
	        }
	        for (let i = 0; i < 12; i++) {
	            this._headingMMatrices.push(create$4());
	            this.isHeadingVisible.push(true);
	        }
	        this.isEdgeVisible = [];
	        this._edgePosition = create$3();
	        this._edgePositive = create$3();
	        this._edgeNormal = create$3();
	        this._edgeNormalTemp = create$3();
	        this._edgePositiveTemp = create$3();
	        this._isLeftToRightHorizontal = [];
	        this._isLeftToRightVertical = [];
	        this._edgeHorizontalRight = [];
	        this._edgeHorizontalUp = [];
	        this._edgeHorizontalForward = [];
	        this._edgeVerticalRight = [];
	        this._edgeVerticalUp = [];
	        this._edgeVerticalForward = [];
	        for (let i = 0; i < 12; i++) {
	            this.isEdgeVisible.push(true);
	            this._isLeftToRightHorizontal.push(false);
	            this._isLeftToRightVertical.push(false);
	            this._edgeHorizontalRight.push(create$3());
	            this._edgeHorizontalUp.push(create$3());
	            this._edgeHorizontalForward.push(create$3());
	            this._edgeVerticalRight.push(create$3());
	            this._edgeVerticalUp.push(create$3());
	            this._edgeVerticalForward.push(create$3());
	        }
	        this.isFaceVisible = [];
	        for (let i = 0; i < 6; i++) {
	            this.isFaceVisible.push(true);
	        }
	        this.arePickDivisionsVisible = [];
	        this.areFacesVisible = [];
	        this._indexTemplate = Quad$2.INDICES;
	        this.zero = create$3();
	        this._gridTicksZeros = [];
	        this._gridFaceZeros = [];
	        this.minorGridlines = fromValues$3(1, 1, 1);
	        this._gridTicksMinorGridlines = [];
	        this._gridFaceMinorGridlines = [];
	        this._gridTicksPositions = [];
	        this._gridTicksScales = [];
	        this._gridTicksIndexCounts = [];
	        this._gridTicksIndexOffsets = [];
	        this._gridFaceScale = create$3();
	        this._gridFaceIndexCounts = [];
	        this._gridFaceIndexOffsets = [];
	        this._gridFaceMMatrices = [];
	        this._gridTicksMMatrices = [];
	        this._gridTicksRotations = [];
	        for (let i = 0; i < 3; i++) {
	            this.arePickDivisionsVisible.push(true);
	            this.areFacesVisible.push(true);
	            this._gridTicksZeros.push(create());
	            this._gridFaceZeros.push(create());
	            this._gridTicksMinorGridlines.push(create());
	            this._gridFaceMinorGridlines.push(create());
	            this._gridTicksScales.push(create$3());
	            this._gridTicksIndexCounts.push(0);
	            this._gridTicksIndexOffsets.push(0);
	        }
	        for (let i = 0; i < 6; i++) {
	            this._gridFaceIndexCounts.push(0);
	            this._gridFaceIndexOffsets.push(0);
	            this._gridFaceMMatrices.push(create$4());
	        }
	        for (let i = 0; i < 12; i++) {
	            this._gridTicksMMatrices.push(create$4());
	            this._gridTicksRotations.push(create$4());
	            const _mat4 = this._gridTicksRotations[i];
	            _mat4[0] = Cube.EDGE_POSITIVES[i][0];
	            _mat4[1] = Cube.EDGE_POSITIVES[i][1];
	            _mat4[2] = Cube.EDGE_POSITIVES[i][2];
	            _mat4[4] = Cube.EDGE_NORMALS[i][0];
	            _mat4[5] = Cube.EDGE_NORMALS[i][1];
	            _mat4[6] = Cube.EDGE_NORMALS[i][2];
	            cross(this._vec3, Cube.EDGE_POSITIVES[i], Cube.EDGE_NORMALS[i]);
	            _mat4[8] = this._vec3[0];
	            _mat4[9] = this._vec3[1];
	            _mat4[10] = this._vec3[2];
	        }
	        this._fromValues = [null, null, null];
	        this._toValues = [null, null, null];
	        this.isDivisionPickingEnabled = [false, false, false];
	        this.isLabelPickingEnabled = [false, false, false];
	        this.isTitlePickingEnabled = [false, false, false];
	        this.isHeadingPickingEnabled = [false, false, false];
	        this.isAxisReversed = [false, false, false];
	        this._scalingX = 1;
	        this._scalingY = 1;
	        this._scalingZ = 1;
	        this._offset = create$4();
	    }
	    initialize() {
	        this._isInitialized = true;
	    }
	    update(elapsedTime) {
	        if (this.isInitialized) {
	            if (this._hasChanged) {
	                const start = window.performance.now();
	                this._hasChanged = false;
	                set$3(this._size, this._maxBoundsX - this._minBoundsX, this._maxBoundsY - this._minBoundsY, this._maxBoundsZ - this._minBoundsZ);
	                const maxBounds = Math.max(this._size[0], Math.max(this._size[1], this._size[2]));
	                this._size[0] *= this._scalingX / maxBounds;
	                this._size[1] *= this._scalingY / maxBounds;
	                this._size[2] *= this._scalingZ / maxBounds;
	                this._updateGrids(this._size);
	                this._updateText(this._size);
	                if (this.hasChangedCallback) {
	                    this.hasChangedCallback();
	                }
	                this._core.log.write(LogLevel.info, `cartesian3d updated ${Math.round(window.performance.now() - start)}ms`);
	            }
	            multiply$2(this._mMatrix, this.mMatrix, this._offset);
	            this._mvMatrix = create$4();
	            multiply$2(this._mvMatrix, this._vMatrix, this._mMatrix);
	            fromMat4(this._mat3, this._mvMatrix);
	            for (let faceId = 0; faceId < 6; faceId++) {
	                multiply$1(this._vec3, Cube.FACE_POSITIONS[faceId], this._size);
	                transformMat4$2(this._forward, this._vec3, this._mvMatrix);
	                transformMat3(this._normal, Cube.FACE_NORMALS[faceId], this._mat3);
	                this._isForwardFace[faceId] = dot(this._normal, this._forward) > 0;
	            }
	            this._forward[0] = this._mat3[2];
	            this._forward[1] = this._mat3[5];
	            this._forward[2] = this._mat3[8];
	            for (let edgeId = 0; edgeId < 12; edgeId++) {
	                const faceIds = Cube.EDGE_FACES[edgeId];
	                const forward1 = this._isForwardFace[faceIds[0]];
	                const forward2 = this._isForwardFace[faceIds[1]];
	                const outsideEdge = forward1 != forward2;
	                this._isOutsideEdge[edgeId] = outsideEdge;
	                if (outsideEdge) {
	                    this._isForwardEdge[edgeId] = dot(Cube.EDGE_FORWARDS[edgeId], this._forward) < 0;
	                }
	                this._distances[edgeId] = 0;
	            }
	            for (let axisId = 0; axisId < 3; axisId++) {
	                if (this.arePickDivisionsVisible[axisId]) {
	                    set(this._gridTicksZeros[axisId], this.zero[axisId], -1);
	                    set(this._gridTicksMinorGridlines[axisId], this.minorGridlines[axisId], 1);
	                    const gridTicksScale = this._gridTicksScales[axisId];
	                    for (let edge = 0; edge < 4; edge++) {
	                        const edgeId = Cube.AXIS_EDGES[axisId][edge];
	                        if (this._isOutsideEdge[edgeId] && this.isEdgeVisible[edgeId]) {
	                            let distance = this._distances[edgeId];
	                            distance += this._gridPickDivisionHeight * 0.5;
	                            const gridTicksMMatrix = this._gridTicksMMatrices[edgeId];
	                            multiply$1(this._vec3, Cube.EDGE_POSITIONS[edgeId], this._size);
	                            scaleAndAdd(this._vec3, this._vec3, Cube.EDGE_NORMALS[edgeId], distance);
	                            translate(gridTicksMMatrix, this._mMatrix, this._vec3);
	                            multiply$2(gridTicksMMatrix, gridTicksMMatrix, this._gridTicksRotations[edgeId]);
	                            if (!this._isForwardEdge[edgeId]) {
	                                scale$1(gridTicksMMatrix, gridTicksMMatrix, Constants.VECTOR3_REFLECTX);
	                            }
	                            scale$1(gridTicksMMatrix, gridTicksMMatrix, gridTicksScale);
	                            distance += this._gridPickDivisionHeight * 0.5;
	                            this._distances[edgeId] = distance;
	                        }
	                    }
	                }
	            }
	            for (let axisId = 0; axisId < 3; axisId++) {
	                if (this.areFacesVisible[axisId]) {
	                    const axisId2 = axisId == 0 ? 1 : 0;
	                    const axisId3 = axisId == 2 ? 1 : 2;
	                    set(this._gridFaceZeros[axisId], this.zero[axisId2], this.zero[axisId3]);
	                    set(this._gridFaceMinorGridlines[axisId], this.minorGridlines[axisId2], this.minorGridlines[axisId3]);
	                    for (let face = 0; face < 2; face++) {
	                        const faceId = Cube.AXIS_FACES[axisId][face];
	                        if (this._isForwardFace[faceId]) {
	                            const gridFaceMMatrix = this._gridFaceMMatrices[faceId];
	                            scale$1(gridFaceMMatrix, this._mMatrix, this._gridFaceScale);
	                            if (this._size[axisId] > 0) {
	                                translate(gridFaceMMatrix, gridFaceMMatrix, Cube.FACE_POSITIONS[faceId]);
	                            }
	                        }
	                    }
	                }
	            }
	            for (let axisId = 0; axisId < 3; axisId++) {
	                for (let edge = 0; edge < 4; edge++) {
	                    const edgeId = Cube.AXIS_EDGES[axisId][edge];
	                    if (this._isOutsideEdge[edgeId]) {
	                        multiply$1(this._edgePosition, Cube.EDGE_POSITIONS[edgeId], this._size);
	                        transformMat4$2(this._edgePosition, this._edgePosition, this._mvMatrix);
	                        normalize$2(this._forward, this._edgePosition);
	                        negate(this._forward, this._forward);
	                        cross(this._right, Constants.VECTOR3_UNITY, this._forward);
	                        normalize$2(this._right, this._right);
	                        cross(this._up, this._forward, this._right);
	                        transformMat3(this._edgeNormal, Cube.EDGE_NORMALS[edgeId], this._mat3);
	                        transformMat3(this._edgePositive, Cube.EDGE_POSITIVES[edgeId], this._mat3);
	                        copy$3(this._edgeNormalTemp, this._edgeNormal);
	                        copy$3(this._edgePositiveTemp, this._edgePositive);
	                        const edgeHorizontalRight = this._edgeHorizontalRight[edgeId];
	                        const edgeHorizontalUp = this._edgeHorizontalUp[edgeId];
	                        const edgeHorizontalForward = this._edgeHorizontalForward[edgeId];
	                        if (dot(this._edgeNormalTemp, this._up) > 0) {
	                            copy$3(edgeHorizontalUp, Cube.EDGE_NORMALS[edgeId]);
	                        }
	                        else {
	                            negate(edgeHorizontalUp, Cube.EDGE_NORMALS[edgeId]);
	                            negate(this._edgeNormalTemp, this._edgeNormalTemp);
	                        }
	                        if (dot(this._edgePositiveTemp, this._right) > 0) {
	                            this._isLeftToRightHorizontal[edgeId] = true;
	                            copy$3(edgeHorizontalRight, Cube.EDGE_POSITIVES[edgeId]);
	                        }
	                        else {
	                            this._isLeftToRightHorizontal[edgeId] = false;
	                            negate(edgeHorizontalRight, Cube.EDGE_POSITIVES[edgeId]);
	                            negate(this._edgePositiveTemp, this._edgePositiveTemp);
	                        }
	                        cross(edgeHorizontalForward, this._edgePositiveTemp, this._edgeNormalTemp);
	                        if (dot(edgeHorizontalForward, this._forward) < 0) {
	                            this._isLeftToRightHorizontal[edgeId] = !this._isLeftToRightHorizontal[edgeId];
	                            negate(edgeHorizontalRight, edgeHorizontalRight);
	                        }
	                        cross(edgeHorizontalForward, edgeHorizontalRight, edgeHorizontalUp);
	                        const edgeVerticalRight = this._edgeVerticalRight[edgeId];
	                        const edgeVerticalUp = this._edgeVerticalUp[edgeId];
	                        const edgeVerticalForward = this._edgeVerticalForward[edgeId];
	                        if (dot(this._edgeNormal, this._right) < 0) {
	                            copy$3(edgeVerticalUp, Cube.EDGE_NORMALS[edgeId]);
	                        }
	                        else {
	                            negate(edgeVerticalUp, Cube.EDGE_NORMALS[edgeId]);
	                            negate(this._edgeNormal, this._edgeNormal);
	                        }
	                        if (dot(this._edgePositive, this._up) < 0) {
	                            this._isLeftToRightVertical[edgeId] = true;
	                            copy$3(edgeVerticalRight, Cube.EDGE_POSITIVES[edgeId]);
	                        }
	                        else {
	                            this._isLeftToRightVertical[edgeId] = false;
	                            negate(edgeVerticalRight, Cube.EDGE_POSITIVES[edgeId]);
	                            negate(this._edgePositive, this._edgePositive);
	                        }
	                        cross(edgeVerticalForward, this._edgePositive, this._edgeNormal);
	                        if (dot(edgeVerticalForward, this._forward) < 0) {
	                            this._isLeftToRightVertical[edgeId] = !this._isLeftToRightVertical[edgeId];
	                            negate(edgeVerticalRight, edgeVerticalRight);
	                        }
	                        cross(edgeVerticalForward, edgeVerticalRight, edgeVerticalUp);
	                        if (this.isEdgeVisible[edgeId]) {
	                            if (this._labels[axisId]) {
	                                this._updateLabels(axisId, edgeId);
	                            }
	                            if (this._titles[axisId]) {
	                                this._updateTitle(axisId, edgeId);
	                            }
	                        }
	                        if (this.isHeadingVisible[edgeId]) {
	                            this._updateHeading(axisId, edgeId);
	                        }
	                    }
	                }
	            }
	        }
	    }
	    _updateLabels(axisId, edgeId) {
	        const orientation = this._orientations[axisId];
	        let distance = this._distances[edgeId];
	        let maxLabelSize = this._maxLabelSize[axisId][1];
	        if (orientation == AxesTextOrientation.parallel)
	            maxLabelSize *= this._core.config.axesTextLabelLineHeight;
	        distance += maxLabelSize * 0.5;
	        multiply$1(this._vec3, Cube.EDGE_POSITIONS[edgeId], this._size);
	        scaleAndAdd(this._vec3, this._vec3, Cube.EDGE_NORMALS[edgeId], distance);
	        const labelMMatrix = this._labelMMatrices[edgeId];
	        labelMMatrix[12] = this._vec3[0];
	        labelMMatrix[13] = this._vec3[1];
	        labelMMatrix[14] = this._vec3[2];
	        if (orientation == AxesTextOrientation.parallel) {
	            const right = this._edgeHorizontalRight[edgeId];
	            const up = this._edgeHorizontalUp[edgeId];
	            const forward = this._edgeHorizontalForward[edgeId];
	            labelMMatrix[0] = right[0];
	            labelMMatrix[1] = right[1];
	            labelMMatrix[2] = right[2];
	            labelMMatrix[4] = up[0];
	            labelMMatrix[5] = up[1];
	            labelMMatrix[6] = up[2];
	            labelMMatrix[8] = forward[0];
	            labelMMatrix[9] = forward[1];
	            labelMMatrix[10] = forward[2];
	        }
	        else {
	            const right = this._edgeVerticalRight[edgeId];
	            const up = this._edgeVerticalUp[edgeId];
	            const forward = this._edgeVerticalForward[edgeId];
	            labelMMatrix[0] = right[0];
	            labelMMatrix[1] = right[1];
	            labelMMatrix[2] = right[2];
	            labelMMatrix[4] = up[0];
	            labelMMatrix[5] = up[1];
	            labelMMatrix[6] = up[2];
	            labelMMatrix[8] = forward[0];
	            labelMMatrix[9] = forward[1];
	            labelMMatrix[10] = forward[2];
	        }
	        multiply$2(labelMMatrix, this._mMatrix, labelMMatrix);
	        if (orientation == AxesTextOrientation.perpendicular) {
	            multiply$2(labelMMatrix, labelMMatrix, Constants.MAT4_ROTATION_MINUS_90);
	        }
	        distance += maxLabelSize * 0.5;
	        this._distances[edgeId] = distance;
	    }
	    _updateTitle(axisId, edgeId) {
	        let distance = this._distances[edgeId];
	        const titleTextSize = this._titleSizes[axisId] * this._core.config.axesTextTitleLineHeight;
	        distance += titleTextSize * 0.5;
	        multiply$1(this._vec3, Cube.EDGE_POSITIONS[edgeId], this._size);
	        scaleAndAdd(this._vec3, this._vec3, Cube.EDGE_NORMALS[edgeId], distance);
	        const titleMMatrix = this._titleMMatrices[edgeId];
	        titleMMatrix[12] = this._vec3[0];
	        titleMMatrix[13] = this._vec3[1];
	        titleMMatrix[14] = this._vec3[2];
	        const right = this._edgeHorizontalRight[edgeId];
	        const up = this._edgeHorizontalUp[edgeId];
	        const forward = this._edgeHorizontalForward[edgeId];
	        titleMMatrix[0] = right[0];
	        titleMMatrix[1] = right[1];
	        titleMMatrix[2] = right[2];
	        titleMMatrix[4] = up[0];
	        titleMMatrix[5] = up[1];
	        titleMMatrix[6] = up[2];
	        titleMMatrix[8] = forward[0];
	        titleMMatrix[9] = forward[1];
	        titleMMatrix[10] = forward[2];
	        multiply$2(titleMMatrix, this._mMatrix, titleMMatrix);
	        distance += titleTextSize * 0.5;
	        this._distances[edgeId] = distance;
	    }
	    _updateHeading(axisId, edgeId) {
	        let distance = this._distances[edgeId];
	        const headingTextSize = this._headingSizes[axisId] * this._core.config.axesTextHeadingLineHeight;
	        distance += headingTextSize * 0.5;
	        multiply$1(this._vec3, Cube.EDGE_POSITIONS[edgeId], this._size);
	        scaleAndAdd(this._vec3, this._vec3, Cube.EDGE_NORMALS[edgeId], distance);
	        const headingMMatrix = this._headingMMatrices[edgeId];
	        headingMMatrix[12] = this._vec3[0];
	        headingMMatrix[13] = this._vec3[1];
	        headingMMatrix[14] = this._vec3[2];
	        const right = this._edgeHorizontalRight[edgeId];
	        const up = this._edgeHorizontalUp[edgeId];
	        const forward = this._edgeHorizontalForward[edgeId];
	        headingMMatrix[0] = right[0];
	        headingMMatrix[1] = right[1];
	        headingMMatrix[2] = right[2];
	        headingMMatrix[4] = up[0];
	        headingMMatrix[5] = up[1];
	        headingMMatrix[6] = up[2];
	        headingMMatrix[8] = forward[0];
	        headingMMatrix[9] = forward[1];
	        headingMMatrix[10] = forward[2];
	        multiply$2(headingMMatrix, this._mMatrix, headingMMatrix);
	        distance += headingTextSize * 0.5;
	        this._distances[edgeId] = distance;
	    }
	    _updateGrids(size) {
	        let offset = 0;
	        this.pickGridLookup = {};
	        this._pickGrid = [];
	        const xDivisions = this._gridTicksPositions[0] ? this._gridTicksPositions[0].length - 1 : 0;
	        const yDivisions = this._gridTicksPositions[1] ? this._gridTicksPositions[1].length - 1 : 0;
	        const zDivisions = this._gridTicksPositions[2] ? this._gridTicksPositions[2].length - 1 : 0;
	        const count = 2 * (xDivisions * yDivisions) +
	            2 * (xDivisions * zDivisions) +
	            2 * (yDivisions * zDivisions) +
	            xDivisions +
	            yDivisions +
	            zDivisions;
	        const byteLength = PickGridVertex.SIZE_BYTES * count * 4;
	        if (!this._gridVertices || this._gridVertices.byteLength < byteLength) {
	            this._gridVertices = new ArrayBuffer(byteLength);
	            this._gridVerticesView = new DataView(this._gridVertices);
	            this._gridIndices = new Uint16Array(count * 6);
	        }
	        for (let axisId = 0; axisId < 3; axisId++) {
	            const width = size[axisId];
	            set$3(this._gridTicksScales[axisId], width, this._gridPickDivisionHeight, 1);
	            offset = this._updateGridTicks(axisId, this._gridVerticesView, this._gridIndices, offset);
	            for (let face = 0; face < 2; face++) {
	                const faceId = Cube.AXIS_FACES[axisId][face];
	                offset = this._updateGridFace(axisId, faceId, this._gridVerticesView, this._gridIndices, offset);
	            }
	            this._gridFaceScale[axisId] = size[axisId] == 0 ? 1 : size[axisId];
	        }
	    }
	    _updateText(size) {
	        let glyphOffset = 0;
	        let count = 0;
	        for (let axisId = 0; axisId < 3; axisId++) {
	            const labels = this._labels[axisId];
	            if (labels) {
	                for (let i = 0; i < labels.length; i++) {
	                    count += 2 * Math.min(labels[i].length, this._core.config.axesTextLabelMaxGlyphs);
	                }
	            }
	            const title = this._titles[axisId];
	            if (title) {
	                count += Math.min(title.length, this._core.config.axesTextTitleMaxGlyphs);
	            }
	            const heading = this._headings[axisId];
	            if (heading) {
	                count += Math.min(heading.length, this._core.config.axesTextHeadingMaxGlyphs);
	            }
	        }
	        const byteLength = PositionTexturePickVertex.SIZE_BYTES * count * 4;
	        if (!this._textVertices || this._textVertices.byteLength < byteLength) {
	            this._textVertices = new ArrayBuffer(byteLength);
	            this._textVerticesView = new DataView(this._textVertices);
	            this._textIndices = new Uint16Array(count * 6);
	        }
	        this.pickLabelLookup = {};
	        this._pickLabel = [];
	        for (let axisId = 0; axisId < 3; axisId++) {
	            if (this._labels[axisId]) {
	                const width = size[axisId];
	                const maxLabelSize = this._maxLabelSize[axisId];
	                const orientation = this._orientations[axisId];
	                set(maxLabelSize, 0, 0);
	                this._axesLeftToRightIndexOffsets[axisId] = glyphOffset * 6;
	                glyphOffset = this._updateLeftToRightAxisLabels(axisId, width, maxLabelSize, glyphOffset, orientation, this._labels[axisId], this._labelPositions[axisId], this._labelSizes[axisId]);
	                this._axesLeftToRightIndexCounts[axisId] = glyphOffset * 6 - this._axesLeftToRightIndexOffsets[axisId];
	                this._axesRightToLeftIndexOffsets[axisId] = glyphOffset * 6;
	                glyphOffset = this._updateRightToLeftAxisLabels(axisId, width, maxLabelSize, glyphOffset, orientation, this._labels[axisId], this._labelPositions[axisId], this._labelSizes[axisId]);
	                this._axesRightToLeftIndexCounts[axisId] = glyphOffset * 6 - this._axesRightToLeftIndexOffsets[axisId];
	            }
	            else {
	                this._axesLeftToRightIndexOffsets[axisId] = glyphOffset * 6;
	                this._axesRightToLeftIndexOffsets[axisId] = glyphOffset * 6;
	                this._axesLeftToRightIndexCounts[axisId] = 0;
	                this._axesRightToLeftIndexCounts[axisId] = 0;
	                this._maxLabelSize[axisId][0] = 0;
	                this._maxLabelSize[axisId][1] = 0;
	            }
	        }
	        this.pickTitleLookup = {};
	        this._pickTitle = [];
	        for (let axisId = 0; axisId < 3; axisId++) {
	            if (this._titles[axisId]) {
	                set$3(this._textPosition, 0, 0, 0);
	                set$3(this._textOffset, 0, 0, 0);
	                this._titleIndexOffsets[axisId] = glyphOffset * 6;
	                const text = TextHelper.truncate(this._titles[axisId], this._core.config.axesTextTitleMaxGlyphs);
	                const scale = this._titleSizes[axisId] / this._font.size;
	                TextHelper.measure(this._font, text, this._textMetric);
	                const width = this._textMetric.width * scale;
	                const maxGlyphTop = this._textMetric.maxTop * scale;
	                const lineHeight = this._font.size * scale;
	                this._textOffset[0] -= width / 2;
	                this._textOffset[1] -= (lineHeight - maxGlyphTop) / 2;
	                const pickId = PickHelper.nextPickId();
	                PickHelper.encodeNumber(pickId, PickType.axesTitle, this._vec4);
	                this.pickTitleLookup[pickId] = this._pickTitle.length;
	                this._pickTitle.push(axisId);
	                TextHelper.addString(this._font, text, this._textVerticesView, this._textIndices, glyphOffset, this._textPosition, scale, this._textOffset, null, this._vec4);
	                glyphOffset += text.length;
	                this._titleIndexCounts[axisId] = glyphOffset * 6 - this._titleIndexOffsets[axisId];
	            }
	            else {
	                this._titleIndexOffsets[axisId] = glyphOffset * 6;
	                this._titleIndexCounts[axisId] = 0;
	            }
	        }
	        this.pickHeadingLookup = {};
	        this._pickHeading = [];
	        for (let axisId = 0; axisId < 3; axisId++) {
	            if (this._headings[axisId]) {
	                set$3(this._textPosition, 0, 0, 0);
	                set$3(this._textOffset, 0, 0, 0);
	                this._headingIndexOffsets[axisId] = glyphOffset * 6;
	                const text = TextHelper.truncate(this._headings[axisId], this._core.config.axesTextHeadingMaxGlyphs);
	                const scale = this._headingSizes[axisId] / this._font.size;
	                TextHelper.measure(this._font, text, this._textMetric);
	                const width = this._textMetric.width * scale;
	                const maxGlyphTop = this._textMetric.maxTop * scale;
	                const lineHeight = this._font.size * scale;
	                this._textOffset[0] -= width / 2;
	                this._textOffset[1] -= (lineHeight - maxGlyphTop) / 2;
	                const pickId = PickHelper.nextPickId();
	                PickHelper.encodeNumber(pickId, PickType.axesHeading, this._vec4);
	                this.pickHeadingLookup[pickId] = this._pickHeading.length;
	                this._pickHeading.push(axisId);
	                TextHelper.addString(this._font, text, this._textVerticesView, this._textIndices, glyphOffset, this._textPosition, scale, this._textOffset, null, this._vec4);
	                glyphOffset += text.length;
	                this._headingIndexCounts[axisId] = glyphOffset * 6 - this._headingIndexOffsets[axisId];
	            }
	            else {
	                this._headingIndexOffsets[axisId] = glyphOffset * 6;
	                this._headingIndexCounts[axisId] = 0;
	            }
	        }
	    }
	    _updateLeftToRightAxisLabels(axisId, size, maxSize, glyphOffset, orientation, labels, positions, scales) {
	        const isAxisReversed = this.isAxisReversed[axisId];
	        for (let label = 0; label < labels.length; label++) {
	            const text = TextHelper.truncate(labels[label], this._core.config.axesTextLabelMaxGlyphs);
	            const lineHeight = scales[label];
	            const scale = lineHeight / this._font.size;
	            TextHelper.measure(this._font, text, this._textMetric);
	            const width = this._textMetric.width * scale;
	            const maxGlyphTop = this._textMetric.maxTop * scale;
	            const position = isAxisReversed ? 1 - positions[label] : positions[label];
	            switch (orientation) {
	                case AxesTextOrientation.parallel:
	                    set$3(this._textPosition, (position - 0.5) * size, 0, 0);
	                    if (this._isDiscrete[axisId]) {
	                        this._textOffset[0] = -width / 2;
	                    }
	                    else {
	                        this._textOffset[0] = position == 0 ? 0 : position == 1 ? -width : -width / 2;
	                    }
	                    this._textOffset[1] = (maxGlyphTop - lineHeight) / 2;
	                    maxSize[0] = Math.max(width, maxSize[0]);
	                    maxSize[1] = Math.max(lineHeight, maxSize[1]);
	                    break;
	                case AxesTextOrientation.perpendicular:
	                    set$3(this._textPosition, 0, (position - 0.5) * size, 0);
	                    this._textOffset[0] = -width / 2;
	                    if (this._isDiscrete[axisId]) {
	                        this._textOffset[1] = -maxGlyphTop / 2;
	                    }
	                    else {
	                        this._textOffset[1] = position == 0 ? 0 : position == 1 ? -maxGlyphTop : -maxGlyphTop / 2;
	                    }
	                    maxSize[0] = Math.max(lineHeight, maxSize[0]);
	                    maxSize[1] = Math.max(width, maxSize[1]);
	                    break;
	            }
	            const pickId = PickHelper.nextPickId();
	            PickHelper.encodeNumber(pickId, PickType.axesLabel, this._vec4);
	            this.pickLabelLookup[pickId] = this._pickLabel.length / 2;
	            this._pickLabel.push(axisId);
	            this._pickLabel.push(label);
	            TextHelper.addString(this._font, text, this._textVerticesView, this._textIndices, glyphOffset, this._textPosition, scale, this._textOffset, null, this._vec4);
	            glyphOffset += text.length;
	        }
	        return glyphOffset;
	    }
	    _updateRightToLeftAxisLabels(axisId, size, maxSize, glyphOffset, orientation, labels, positions, scales) {
	        const isAxisReversed = this.isAxisReversed[axisId];
	        for (let label = 0; label < labels.length; label++) {
	            const text = TextHelper.truncate(labels[label], this._core.config.axesTextLabelMaxGlyphs);
	            const lineHeight = scales[label];
	            const scale = lineHeight / this._font.size;
	            TextHelper.measure(this._font, text, this._textMetric);
	            const width = this._textMetric.width * scale;
	            const maxGlyphTop = this._textMetric.maxTop * scale;
	            const position = isAxisReversed ? 1 - positions[label] : positions[label];
	            switch (orientation) {
	                case AxesTextOrientation.parallel:
	                    set$3(this._textPosition, (0.5 - position) * size, 0, 0);
	                    if (this._isDiscrete[axisId]) {
	                        this._textOffset[0] = -width / 2;
	                    }
	                    else {
	                        this._textOffset[0] = label == 0 ? -width : label == labels.length - 1 ? 0 : -width / 2;
	                    }
	                    this._textOffset[1] = (maxGlyphTop - lineHeight) / 2;
	                    break;
	                case AxesTextOrientation.perpendicular:
	                    set$3(this._textPosition, 0, (0.5 - position) * size, 0);
	                    this._textOffset[0] = -width / 2;
	                    if (this._isDiscrete[axisId]) {
	                        this._textOffset[1] = -maxGlyphTop / 2;
	                    }
	                    else {
	                        this._textOffset[1] = label == 0 ? -maxGlyphTop : label == labels.length - 1 ? 0 : -maxGlyphTop / 2;
	                    }
	                    break;
	            }
	            const pickId = PickHelper.nextPickId();
	            PickHelper.encodeNumber(pickId, PickType.axesLabel, this._vec4);
	            this.pickLabelLookup[pickId] = this._pickLabel.length / 2;
	            this._pickLabel.push(axisId);
	            this._pickLabel.push(label);
	            TextHelper.addString(this._font, text, this._textVerticesView, this._textIndices, glyphOffset, this._textPosition, scale, this._textOffset, null, this._vec4);
	            glyphOffset += text.length;
	        }
	        return glyphOffset;
	    }
	    _updateGridTicks(axisId, dataView, indices, offset) {
	        this._gridTicksIndexOffsets[axisId] = offset * 6;
	        if (this._gridTicksPositions[axisId]) {
	            const axes = create$3();
	            const positions = this._gridTicksPositions[axisId];
	            const isAxisReversed = this.isAxisReversed[axisId];
	            let vertexOffset = offset * 4;
	            for (let position = 0; position < positions.length - 1; position++) {
	                const left = isAxisReversed ? 1 - positions[position + 1] - 0.5 : positions[position] - 0.5;
	                const right = isAxisReversed ? 1 - positions[position] - 0.5 : positions[position + 1] - 0.5;
	                axes[axisId] = position + 1;
	                const pickId = PickHelper.nextPickId();
	                PickHelper.encodeNumber(pickId, PickType.axesDivision, this._vec4);
	                this.pickGridLookup[pickId] = this._pickGrid.length / 3;
	                this._pickGrid.push(axes[0]);
	                this._pickGrid.push(axes[1]);
	                this._pickGrid.push(axes[2]);
	                let indexOffset = offset * 6;
	                for (let j = 0; j < this._indexTemplate.length; j++) {
	                    indices[indexOffset++] = this._indexTemplate[j] + vertexOffset;
	                }
	                set$2(this._bounds, left + 0.5, 0, right + 0.5, 1);
	                this._translation[0] = left;
	                this._translation[1] = 0.5;
	                this._translation[2] = 0;
	                this._texCoord[0] = left + 0.5;
	                this._texCoord[1] = 1;
	                PickGridVertex.setTranslation(dataView, vertexOffset, this._translation);
	                PickGridVertex.setNormal(dataView, vertexOffset, Constants.VECTOR3_UNITZ);
	                PickGridVertex.setIdColor(dataView, vertexOffset, this._vec4);
	                PickGridVertex.setTexCoord(dataView, vertexOffset, this._texCoord);
	                PickGridVertex.setBounds(dataView, vertexOffset, this._bounds);
	                vertexOffset++;
	                this._translation[0] = right;
	                this._texCoord[0] = right + 0.5;
	                PickGridVertex.setTranslation(dataView, vertexOffset, this._translation);
	                PickGridVertex.setNormal(dataView, vertexOffset, Constants.VECTOR3_UNITZ);
	                PickGridVertex.setIdColor(dataView, vertexOffset, this._vec4);
	                PickGridVertex.setTexCoord(dataView, vertexOffset, this._texCoord);
	                PickGridVertex.setBounds(dataView, vertexOffset, this._bounds);
	                vertexOffset++;
	                this._translation[0] = left;
	                this._translation[1] = -0.5;
	                this._texCoord[0] = left + 0.5;
	                this._texCoord[1] = 0;
	                PickGridVertex.setTranslation(dataView, vertexOffset, this._translation);
	                PickGridVertex.setNormal(dataView, vertexOffset, Constants.VECTOR3_UNITZ);
	                PickGridVertex.setIdColor(dataView, vertexOffset, this._vec4);
	                PickGridVertex.setTexCoord(dataView, vertexOffset, this._texCoord);
	                PickGridVertex.setBounds(dataView, vertexOffset, this._bounds);
	                vertexOffset++;
	                this._translation[0] = right;
	                this._texCoord[0] = right + 0.5;
	                PickGridVertex.setTranslation(dataView, vertexOffset, this._translation);
	                PickGridVertex.setNormal(dataView, vertexOffset, Constants.VECTOR3_UNITZ);
	                PickGridVertex.setIdColor(dataView, vertexOffset, this._vec4);
	                PickGridVertex.setTexCoord(dataView, vertexOffset, this._texCoord);
	                PickGridVertex.setBounds(dataView, vertexOffset, this._bounds);
	                vertexOffset++;
	                offset++;
	            }
	        }
	        this._gridTicksIndexCounts[axisId] = offset * 6 - this._gridTicksIndexOffsets[axisId];
	        return offset;
	    }
	    _updateGridFace(axisId, faceId, dataView, indices, offset) {
	        set$3(this._translation, 0, 0, 0);
	        this._gridFaceIndexOffsets[faceId] = offset * 6;
	        const axisId2 = axisId == 0 ? 1 : 0;
	        const axisId3 = axisId == 2 ? 1 : 2;
	        if (this._gridTicksPositions[axisId2] && this._gridTicksPositions[axisId3]) {
	            const axes = create$3();
	            negate(this._normal, Cube.FACE_NORMALS[faceId]);
	            const positions2 = this._gridTicksPositions[axisId2];
	            const positions3 = this._gridTicksPositions[axisId3];
	            const isAxisReversed2 = this.isAxisReversed[axisId2];
	            const isAxisReversed3 = this.isAxisReversed[axisId3];
	            for (let position2 = 0; position2 < positions2.length - 1; position2++) {
	                const min2 = isAxisReversed2 ? 1 - positions2[position2 + 1] - 0.5 : positions2[position2] - 0.5;
	                const max2 = isAxisReversed2 ? 1 - positions2[position2] - 0.5 : positions2[position2 + 1] - 0.5;
	                axes[axisId2] = position2 + 1;
	                let vertexOffset = offset * 4;
	                for (let position3 = 0; position3 < positions3.length - 1; position3++) {
	                    const min3 = isAxisReversed3 ? 1 - positions3[position3 + 1] - 0.5 : positions3[position3] - 0.5;
	                    const max3 = isAxisReversed3 ? 1 - positions3[position3] - 0.5 : positions3[position3 + 1] - 0.5;
	                    axes[axisId3] = position3 + 1;
	                    const pickId = PickHelper.nextPickId();
	                    PickHelper.encodeNumber(pickId, PickType.axesDivision, this._vec4);
	                    this.pickGridLookup[pickId] = this._pickGrid.length / 3;
	                    this._pickGrid.push(axes[0]);
	                    this._pickGrid.push(axes[1]);
	                    this._pickGrid.push(axes[2]);
	                    let indexOffset = offset * 6;
	                    for (let i = 0; i < this._indexTemplate.length; i++) {
	                        indices[indexOffset++] = this._indexTemplate[i] + vertexOffset;
	                    }
	                    set$2(this._bounds, min2 + 0.5, min3 + 0.5, max2 + 0.5, max3 + 0.5);
	                    this._translation[axisId2] = min2;
	                    this._translation[axisId3] = max3;
	                    this._texCoord[0] = min2 + 0.5;
	                    this._texCoord[1] = max3 + 0.5;
	                    PickGridVertex.setTranslation(dataView, vertexOffset, this._translation);
	                    PickGridVertex.setNormal(dataView, vertexOffset, this._normal);
	                    PickGridVertex.setIdColor(dataView, vertexOffset, this._vec4);
	                    PickGridVertex.setTexCoord(dataView, vertexOffset, this._texCoord);
	                    PickGridVertex.setBounds(dataView, vertexOffset, this._bounds);
	                    vertexOffset++;
	                    this._translation[axisId2] = max2;
	                    this._texCoord[0] = max2 + 0.5;
	                    PickGridVertex.setTranslation(dataView, vertexOffset, this._translation);
	                    PickGridVertex.setNormal(dataView, vertexOffset, this._normal);
	                    PickGridVertex.setIdColor(dataView, vertexOffset, this._vec4);
	                    PickGridVertex.setTexCoord(dataView, vertexOffset, this._texCoord);
	                    PickGridVertex.setBounds(dataView, vertexOffset, this._bounds);
	                    vertexOffset++;
	                    this._translation[axisId2] = min2;
	                    this._translation[axisId3] = min3;
	                    this._texCoord[0] = min2 + 0.5;
	                    this._texCoord[1] = min3 + 0.5;
	                    PickGridVertex.setTranslation(dataView, vertexOffset, this._translation);
	                    PickGridVertex.setNormal(dataView, vertexOffset, this._normal);
	                    PickGridVertex.setIdColor(dataView, vertexOffset, this._vec4);
	                    PickGridVertex.setTexCoord(dataView, vertexOffset, this._texCoord);
	                    PickGridVertex.setBounds(dataView, vertexOffset, this._bounds);
	                    vertexOffset++;
	                    this._translation[axisId2] = max2;
	                    this._texCoord[0] = max2 + 0.5;
	                    PickGridVertex.setTranslation(dataView, vertexOffset, this._translation);
	                    PickGridVertex.setNormal(dataView, vertexOffset, this._normal);
	                    PickGridVertex.setIdColor(dataView, vertexOffset, this._vec4);
	                    PickGridVertex.setTexCoord(dataView, vertexOffset, this._texCoord);
	                    PickGridVertex.setBounds(dataView, vertexOffset, this._bounds);
	                    vertexOffset++;
	                    offset++;
	                }
	            }
	        }
	        this._gridFaceIndexCounts[faceId] = offset * 6 - this._gridFaceIndexOffsets[faceId];
	        return offset;
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Cartesian2dAxes extends AxesBase {
	    get size() { return this._size; }
	    get isDiscreteX() { return this._isDiscrete[0]; }
	    set isDiscreteX(value) {
	        if (value != this._isDiscrete[0]) {
	            this._isDiscrete[0] = value;
	            this._hasChanged = true;
	        }
	    }
	    get isDiscreteY() { return this._isDiscrete[1]; }
	    set isDiscreteY(value) {
	        if (value != this._isDiscrete[1]) {
	            this._isDiscrete[1] = value;
	            this._hasChanged = true;
	        }
	    }
	    get minBoundsX() { return this._minBoundsX; }
	    set minBoundsX(value) {
	        if (value != this._minBoundsX) {
	            this._minBoundsX = value;
	            this._hasChanged = true;
	        }
	    }
	    get maxBoundsX() { return this._maxBoundsX; }
	    set maxBoundsX(value) {
	        if (value != this._minBoundsX) {
	            this._maxBoundsX = value;
	            this._hasChanged = true;
	        }
	    }
	    get minBoundsY() { return this._minBoundsY; }
	    set minBoundsY(value) {
	        if (value != this._minBoundsY) {
	            this._minBoundsY = value;
	            this._hasChanged = true;
	        }
	    }
	    get maxBoundsY() { return this._maxBoundsY; }
	    set maxBoundsY(value) {
	        if (value != this._minBoundsY) {
	            this._maxBoundsY = value;
	            this._hasChanged = true;
	        }
	    }
	    getIsOutsideEdge(index) { return this._isOutsideEdge[index]; }
	    getIsForwardFace(index) { return this._isForwardFace[index]; }
	    get textVertices() { return this._textVertices; }
	    get textIndices() { return this._textIndices; }
	    getLabelMMatrix(index) { return this._labelMMatrices[index]; }
	    setLabelPositions(index, value) {
	        if (this._labelPositions[index] != value) {
	            this._labelPositions[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    setLabels(index, value) {
	        if (this._labels[index] != value) {
	            this._labels[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    setLabelSizes(index, value) {
	        if (this._labelSizes[index] != value) {
	            this._labelSizes[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    getLabelOrientation(index) { return this._orientations[index]; }
	    setLabelOrientation(index, orientation) {
	        if (this._orientations[index] != orientation) {
	            this._orientations[index] = orientation;
	            this._hasChanged = true;
	        }
	    }
	    getTitleIndexCount(index) { return this._titleIndexCounts[index]; }
	    getTitleIndexOffset(index) { return this._titleIndexOffsets[index]; }
	    getTitleMMatrix(index) { return this._titleMMatrices[index]; }
	    setTitle(index, value) {
	        if (this._titles[index] != value) {
	            this._titles[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    setTitleSize(index, value) {
	        if (this._titleSizes[index] != value) {
	            this._titleSizes[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    getHeadingIndexCount(index) { return this._headingIndexCounts[index]; }
	    getHeadingIndexOffset(index) { return this._headingIndexOffsets[index]; }
	    getHeadingMMatrix(index) { return this._headingMMatrices[index]; }
	    setHeading(index, value) {
	        if (this._headings[index] != value) {
	            this._headings[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    setHeadingSize(index, value) {
	        if (this._headingSizes[index] != value) {
	            this._headingSizes[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    getIsLeftToRightHorizontal(index) { return this._isLeftToRightHorizontal[index]; }
	    getIsLeftToRightVertical(index) { return this._isLeftToRightVertical[index]; }
	    getAxesLeftToRightIndexCount(index) { return this._axesLeftToRightIndexCounts[index]; }
	    getAxesRightToLeftIndexCount(index) { return this._axesRightToLeftIndexCounts[index]; }
	    getAxesLeftToRightIndexOffset(index) { return this._axesLeftToRightIndexOffsets[index]; }
	    getAxesRightToLeftIndexOffset(index) { return this._axesRightToLeftIndexOffsets[index]; }
	    get gridVertices() { return this._gridVertices; }
	    get gridIndices() { return this._gridIndices; }
	    getGridTicksIndexCount(index) { return this._gridTicksIndexCounts[index]; }
	    getGridTicksIndexOffset(index) { return this._gridTicksIndexOffsets[index]; }
	    getGridFaceIndexCount(index) { return this._gridFaceIndexCounts[index]; }
	    getGridFaceIndexOffset(index) { return this._gridFaceIndexOffsets[index]; }
	    getGridTicksMMatrix(index) { return this._gridTicksMMatrices[index]; }
	    getGridFaceMMatrix(index) { return this._gridFaceMMatrices[index]; }
	    getGridTicksScale(index) { return this._gridTicksScales[index]; }
	    getGridTicksZero(index) { return this._gridTicksZeros[index]; }
	    get gridFaceZero() { return this._gridFaceZeros; }
	    get gridFaceMinorGridlines() { return this._gridFaceMinorGridlines; }
	    getGridTicksMinorGridlines(index) { return this._gridTicksMinorGridlines[index]; }
	    setTickPositions(index, value) {
	        if (this._gridTicksPositions[index] != value) {
	            this._gridTicksPositions[index] = value;
	            this._hasChanged = true;
	        }
	    }
	    get scalingX() { return this._scalingX; }
	    set scalingX(value) {
	        if (value != this._scalingX) {
	            this._scalingX = value;
	            this._hasChanged = true;
	        }
	    }
	    get scalingY() { return this._scalingY; }
	    set scalingY(value) {
	        if (value != this._scalingY) {
	            this._scalingY = value;
	            this._hasChanged = true;
	        }
	    }
	    get offsetX() { return this._offset[12]; }
	    set offsetX(value) {
	        if (value != this._offset[12]) {
	            this._offset[12] = value;
	        }
	    }
	    get offsetY() { return this._offset[13]; }
	    set offsetY(value) {
	        if (value != this._offset[13]) {
	            this._offset[13] = value;
	        }
	    }
	    set rotation(value) {
	        if (this._rotation != value) {
	            this._rotation = value;
	            this._rMatrix = create$4();
	            fromQuat(this._rMatrix, value);
	        }
	    }
	    constructor(core) {
	        super(core);
	        this._size = create$3();
	        this._translation = create$3();
	        this._normal = create$3();
	        this._forward = create$3();
	        this._right = create$3();
	        this._up = create$3();
	        this._texCoord = create();
	        this._bounds = create$2();
	        this._vec3 = create$3();
	        this._vec4 = create$2();
	        this._mat3 = create$5();
	        this._isDiscrete = [false, false];
	        this._minBoundsX = 0;
	        this._minBoundsY = 0;
	        this._maxBoundsX = 0;
	        this._maxBoundsY = 0;
	        this._isForwardFace = [];
	        this._isForwardEdge = [];
	        this._isOutsideEdge = [];
	        for (let i = 0; i < 2; i++) {
	            this._isForwardFace.push(false);
	        }
	        for (let i = 0; i < 4; i++) {
	            this._isForwardEdge.push(false);
	            this._isOutsideEdge.push(false);
	        }
	        this._textOffset = create$3();
	        this._textPosition = create$3();
	        this._distances = [];
	        for (let i = 0; i < 4; i++) {
	            this._distances.push(0);
	        }
	        this._labelPositions = [];
	        this._labels = [];
	        this._labelSizes = [];
	        this._maxLabelSize = [];
	        this._axesLeftToRightIndexCounts = [];
	        this._axesRightToLeftIndexCounts = [];
	        this._axesLeftToRightIndexOffsets = [];
	        this._axesRightToLeftIndexOffsets = [];
	        this._labelMMatrices = [];
	        this._orientations = [];
	        for (let i = 0; i < 2; i++) {
	            this._maxLabelSize.push(create());
	            this._orientations.push(AxesTextOrientation.parallel);
	            this._axesLeftToRightIndexCounts.push(0);
	            this._axesRightToLeftIndexCounts.push(0);
	            this._axesLeftToRightIndexOffsets.push(0);
	            this._axesRightToLeftIndexOffsets.push(0);
	        }
	        for (let i = 0; i < 4; i++) {
	            this._labelMMatrices.push(create$4());
	        }
	        this._titles = [];
	        this._titleSizes = [];
	        this._titleIndexCounts = [];
	        this._titleIndexOffsets = [];
	        this._titleMMatrices = [];
	        for (let i = 0; i < 2; i++) {
	            this._titles.push(null);
	            this._titleSizes.push(core.config.axesTextTitleSize);
	            this._titleIndexCounts.push(0);
	            this._titleIndexOffsets.push(0);
	        }
	        for (let i = 0; i < 4; i++) {
	            this._titleMMatrices.push(create$4());
	        }
	        this._headings = [];
	        this._headingSizes = [];
	        this._headingIndexCounts = [];
	        this._headingIndexOffsets = [];
	        this._headingMMatrices = [];
	        this.isHeadingVisible = [];
	        for (let i = 0; i < 2; i++) {
	            this._headings.push(null);
	            this._headingSizes.push(core.config.axesTextHeadingSize);
	            this._headingIndexCounts.push(0);
	            this._headingIndexOffsets.push(0);
	        }
	        for (let i = 0; i < 4; i++) {
	            this._headingMMatrices.push(create$4());
	            this.isHeadingVisible.push(true);
	        }
	        this.isEdgeVisible = [];
	        this._edgePosition = create$3();
	        this._edgePositive = create$3();
	        this._edgeNormal = create$3();
	        this._edgeNormalTemp = create$3();
	        this._edgePositiveTemp = create$3();
	        this._isLeftToRightHorizontal = [];
	        this._isLeftToRightVertical = [];
	        this._edgeHorizontalRight = [];
	        this._edgeHorizontalUp = [];
	        this._edgeHorizontalForward = [];
	        this._edgeVerticalRight = [];
	        this._edgeVerticalUp = [];
	        this._edgeVerticalForward = [];
	        for (let i = 0; i < 4; i++) {
	            this.isEdgeVisible.push(true);
	            this._isLeftToRightHorizontal.push(false);
	            this._isLeftToRightVertical.push(false);
	            this._edgeHorizontalRight.push(create$3());
	            this._edgeHorizontalUp.push(create$3());
	            this._edgeHorizontalForward.push(create$3());
	            this._edgeVerticalRight.push(create$3());
	            this._edgeVerticalUp.push(create$3());
	            this._edgeVerticalForward.push(create$3());
	        }
	        this.isFaceVisible = [];
	        for (let i = 0; i < 2; i++) {
	            this.isFaceVisible.push(true);
	        }
	        this.arePickDivisionsVisible = [];
	        this.areFacesVisible = [];
	        this._indexTemplate = Quad$2.INDICES;
	        this.zero = create$3();
	        this._gridTicksZeros = [];
	        this._gridFaceZeros = create();
	        this.minorGridlines = fromValues$3(1, 1, 1);
	        this._gridTicksMinorGridlines = [];
	        this._gridFaceMinorGridlines = create();
	        this._gridTicksPositions = [];
	        this._gridTicksScales = [];
	        this._gridTicksIndexCounts = [];
	        this._gridTicksIndexOffsets = [];
	        this._gridFaceScale = create$3();
	        this._gridFaceIndexCounts = [];
	        this._gridFaceIndexOffsets = [];
	        this._gridFaceMMatrices = [];
	        this._gridTicksMMatrices = [];
	        this._gridTicksRotations = [];
	        for (let i = 0; i < 2; i++) {
	            this.arePickDivisionsVisible.push(true);
	            this.areFacesVisible.push(true);
	            this._gridTicksZeros.push(create());
	            this._gridTicksMinorGridlines.push(create());
	            this._gridTicksScales.push(create$3());
	            this._gridTicksIndexCounts.push(0);
	            this._gridTicksIndexOffsets.push(0);
	            this._gridFaceIndexCounts.push(0);
	            this._gridFaceIndexOffsets.push(0);
	            this._gridFaceMMatrices.push(create$4());
	        }
	        for (let i = 0; i < 4; i++) {
	            this._gridTicksMMatrices.push(create$4());
	            this._gridTicksRotations.push(create$4());
	            const _mat4 = this._gridTicksRotations[i];
	            _mat4[0] = Quad$2.EDGE_POSITIVES[i][0];
	            _mat4[1] = Quad$2.EDGE_POSITIVES[i][1];
	            _mat4[2] = Quad$2.EDGE_POSITIVES[i][2];
	            _mat4[4] = Quad$2.EDGE_NORMALS[i][0];
	            _mat4[5] = Quad$2.EDGE_NORMALS[i][1];
	            _mat4[6] = Quad$2.EDGE_NORMALS[i][2];
	            cross(this._vec3, Quad$2.EDGE_POSITIVES[i], Quad$2.EDGE_NORMALS[i]);
	            _mat4[8] = this._vec3[0];
	            _mat4[9] = this._vec3[1];
	            _mat4[10] = this._vec3[2];
	        }
	        this._fromValues = [null, null];
	        this._toValues = [null, null];
	        this.isDivisionPickingEnabled = [false, false];
	        this.isLabelPickingEnabled = [false, false];
	        this.isTitlePickingEnabled = [false, false];
	        this.isHeadingPickingEnabled = [false, false];
	        this.isAxisReversed = [false, false];
	        this._scalingX = 1;
	        this._scalingY = 1;
	        this._offset = create$4();
	    }
	    initialize() {
	        this._isInitialized = true;
	    }
	    update(elapsedTime) {
	        if (this.isInitialized) {
	            if (this._hasChanged) {
	                const start = window.performance.now();
	                this._hasChanged = false;
	                set$3(this._size, this._maxBoundsX - this._minBoundsX, this._maxBoundsY - this._minBoundsY, 0);
	                const maxBounds = Math.max(this._size[0], this._size[1]);
	                this._size[0] *= this._scalingX / maxBounds;
	                this._size[1] *= this._scalingY / maxBounds;
	                this._updateGrids(this._size);
	                this._updateText(this._size);
	                if (this.hasChangedCallback) {
	                    this.hasChangedCallback();
	                }
	                this._core.log.write(LogLevel.info, `cartesian2d updated ${Math.round(window.performance.now() - start)}ms`);
	            }
	            if (this._rMatrix) {
	                mul(this._mMatrix, this.mMatrix, this._rMatrix);
	                mul(this._mMatrix, this._mMatrix, this._offset);
	            }
	            else {
	                multiply$2(this._mMatrix, this.mMatrix, this._offset);
	            }
	            this._mvMatrix = create$4();
	            multiply$2(this._mvMatrix, this._vMatrix, this._mMatrix);
	            fromMat4(this._mat3, this._mvMatrix);
	            for (let faceId = 0; faceId < 2; faceId++) {
	                transformMat4$2(this._forward, Constants.VECTOR3_ZERO, this._mvMatrix);
	                transformMat3(this._normal, Quad$2.FACE_NORMALS[faceId], this._mat3);
	                this._isForwardFace[faceId] = dot(this._normal, this._forward) > 0;
	            }
	            this._forward[0] = this._mat3[2];
	            this._forward[1] = this._mat3[5];
	            this._forward[2] = this._mat3[8];
	            for (let edgeId = 0; edgeId < 4; edgeId++) {
	                this._isForwardEdge[edgeId] = dot(Quad$2.EDGE_FORWARDS[edgeId], this._forward) < 0;
	                this._distances[edgeId] = 0;
	            }
	            for (let axisId = 0; axisId < 2; axisId++) {
	                if (this.arePickDivisionsVisible[axisId]) {
	                    set(this._gridTicksZeros[axisId], this.zero[axisId], -1);
	                    set(this._gridTicksMinorGridlines[axisId], this.minorGridlines[axisId], 1);
	                    const gridTicksScale = this._gridTicksScales[axisId];
	                    for (let edge = 0; edge < 2; edge++) {
	                        const edgeId = Quad$2.AXIS_EDGES[axisId][edge];
	                        if (this.isEdgeVisible[edgeId]) {
	                            let distance = this._distances[edgeId];
	                            distance += this._gridPickDivisionHeight * 0.5;
	                            const gridTicksMMatrix = this._gridTicksMMatrices[edgeId];
	                            multiply$1(this._vec3, Quad$2.EDGE_POSITIONS[edgeId], this._size);
	                            scaleAndAdd(this._vec3, this._vec3, Quad$2.EDGE_NORMALS[edgeId], distance);
	                            translate(gridTicksMMatrix, this._mMatrix, this._vec3);
	                            multiply$2(gridTicksMMatrix, gridTicksMMatrix, this._gridTicksRotations[edgeId]);
	                            if (!this._isForwardEdge[edgeId]) {
	                                scale$1(gridTicksMMatrix, gridTicksMMatrix, Constants.VECTOR3_REFLECTX);
	                            }
	                            scale$1(gridTicksMMatrix, gridTicksMMatrix, gridTicksScale);
	                            distance += this._gridPickDivisionHeight * 0.5;
	                            this._distances[edgeId] = distance;
	                        }
	                    }
	                }
	            }
	            set(this._gridFaceZeros, this.zero[0], this.zero[1]);
	            set(this._gridFaceMinorGridlines, this.minorGridlines[0], this.minorGridlines[1]);
	            for (let faceId = 0; faceId < 2; faceId++) {
	                if (this._isForwardFace[faceId]) {
	                    const gridFaceMMatrix = this._gridFaceMMatrices[faceId];
	                    scale$1(gridFaceMMatrix, this._mMatrix, this._gridFaceScale);
	                }
	            }
	            for (let axisId = 0; axisId < 2; axisId++) {
	                for (let edge = 0; edge < 2; edge++) {
	                    const edgeId = Quad$2.AXIS_EDGES[axisId][edge];
	                    multiply$1(this._edgePosition, Quad$2.EDGE_POSITIONS[edgeId], this._size);
	                    transformMat4$2(this._edgePosition, this._edgePosition, this._mvMatrix);
	                    normalize$2(this._forward, this._edgePosition);
	                    negate(this._forward, this._forward);
	                    cross(this._right, Constants.VECTOR3_UNITY, this._forward);
	                    normalize$2(this._right, this._right);
	                    cross(this._up, this._forward, this._right);
	                    transformMat3(this._edgeNormal, Quad$2.EDGE_NORMALS[edgeId], this._mat3);
	                    transformMat3(this._edgePositive, Quad$2.EDGE_POSITIVES[edgeId], this._mat3);
	                    copy$3(this._edgeNormalTemp, this._edgeNormal);
	                    copy$3(this._edgePositiveTemp, this._edgePositive);
	                    const edgeHorizontalRight = this._edgeHorizontalRight[edgeId];
	                    const edgeHorizontalUp = this._edgeHorizontalUp[edgeId];
	                    const edgeHorizontalForward = this._edgeHorizontalForward[edgeId];
	                    if (dot(this._edgeNormalTemp, this._up) > 0) {
	                        copy$3(edgeHorizontalUp, Quad$2.EDGE_NORMALS[edgeId]);
	                    }
	                    else {
	                        negate(edgeHorizontalUp, Quad$2.EDGE_NORMALS[edgeId]);
	                        negate(this._edgeNormalTemp, this._edgeNormalTemp);
	                    }
	                    if (dot(this._edgePositiveTemp, this._right) > 0) {
	                        this._isLeftToRightHorizontal[edgeId] = true;
	                        copy$3(edgeHorizontalRight, Quad$2.EDGE_POSITIVES[edgeId]);
	                    }
	                    else {
	                        this._isLeftToRightHorizontal[edgeId] = false;
	                        negate(edgeHorizontalRight, Quad$2.EDGE_POSITIVES[edgeId]);
	                        negate(this._edgePositiveTemp, this._edgePositiveTemp);
	                    }
	                    cross(edgeHorizontalForward, this._edgePositiveTemp, this._edgeNormalTemp);
	                    if (dot(edgeHorizontalForward, this._forward) < 0) {
	                        this._isLeftToRightHorizontal[edgeId] = !this._isLeftToRightHorizontal[edgeId];
	                        negate(edgeHorizontalRight, edgeHorizontalRight);
	                    }
	                    cross(edgeHorizontalForward, edgeHorizontalRight, edgeHorizontalUp);
	                    const edgeVerticalRight = this._edgeVerticalRight[edgeId];
	                    const edgeVerticalUp = this._edgeVerticalUp[edgeId];
	                    const edgeVerticalForward = this._edgeVerticalForward[edgeId];
	                    if (dot(this._edgeNormal, this._right) < 0) {
	                        copy$3(edgeVerticalUp, Quad$2.EDGE_NORMALS[edgeId]);
	                    }
	                    else {
	                        negate(edgeVerticalUp, Quad$2.EDGE_NORMALS[edgeId]);
	                        negate(this._edgeNormal, this._edgeNormal);
	                    }
	                    if (dot(this._edgePositive, this._up) < 0) {
	                        this._isLeftToRightVertical[edgeId] = true;
	                        copy$3(edgeVerticalRight, Quad$2.EDGE_POSITIVES[edgeId]);
	                    }
	                    else {
	                        this._isLeftToRightVertical[edgeId] = false;
	                        negate(edgeVerticalRight, Quad$2.EDGE_POSITIVES[edgeId]);
	                        negate(this._edgePositive, this._edgePositive);
	                    }
	                    cross(edgeVerticalForward, this._edgePositive, this._edgeNormal);
	                    if (dot(edgeVerticalForward, this._forward) < 0) {
	                        this._isLeftToRightVertical[edgeId] = !this._isLeftToRightVertical[edgeId];
	                        negate(edgeVerticalRight, edgeVerticalRight);
	                    }
	                    cross(edgeVerticalForward, edgeVerticalRight, edgeVerticalUp);
	                    if (this.isEdgeVisible[edgeId]) {
	                        if (this._labels[axisId]) {
	                            this._updateLabels(axisId, edgeId);
	                        }
	                        if (this._titles[axisId]) {
	                            this._updateTitle(axisId, edgeId);
	                        }
	                    }
	                    if (this.isHeadingVisible[edgeId]) {
	                        this._updateHeading(axisId, edgeId);
	                    }
	                }
	            }
	        }
	    }
	    _updateLabels(axisId, edgeId) {
	        const orientation = this._orientations[axisId];
	        let distance = this._distances[edgeId];
	        let maxLabelSize = this._maxLabelSize[axisId][1];
	        if (orientation == AxesTextOrientation.parallel)
	            maxLabelSize *= this._core.config.axesTextLabelLineHeight;
	        distance += maxLabelSize * 0.5;
	        multiply$1(this._vec3, Quad$2.EDGE_POSITIONS[edgeId], this._size);
	        scaleAndAdd(this._vec3, this._vec3, Quad$2.EDGE_NORMALS[edgeId], distance);
	        const labelMMatrix = this._labelMMatrices[edgeId];
	        labelMMatrix[12] = this._vec3[0];
	        labelMMatrix[13] = this._vec3[1];
	        labelMMatrix[14] = this._vec3[2];
	        if (orientation == AxesTextOrientation.parallel) {
	            const right = this._edgeHorizontalRight[edgeId];
	            const up = this._edgeHorizontalUp[edgeId];
	            const forward = this._edgeHorizontalForward[edgeId];
	            labelMMatrix[0] = right[0];
	            labelMMatrix[1] = right[1];
	            labelMMatrix[2] = right[2];
	            labelMMatrix[4] = up[0];
	            labelMMatrix[5] = up[1];
	            labelMMatrix[6] = up[2];
	            labelMMatrix[8] = forward[0];
	            labelMMatrix[9] = forward[1];
	            labelMMatrix[10] = forward[2];
	        }
	        else {
	            const right = this._edgeVerticalRight[edgeId];
	            const up = this._edgeVerticalUp[edgeId];
	            const forward = this._edgeVerticalForward[edgeId];
	            labelMMatrix[0] = right[0];
	            labelMMatrix[1] = right[1];
	            labelMMatrix[2] = right[2];
	            labelMMatrix[4] = up[0];
	            labelMMatrix[5] = up[1];
	            labelMMatrix[6] = up[2];
	            labelMMatrix[8] = forward[0];
	            labelMMatrix[9] = forward[1];
	            labelMMatrix[10] = forward[2];
	        }
	        multiply$2(labelMMatrix, this._mMatrix, labelMMatrix);
	        if (orientation == AxesTextOrientation.perpendicular) {
	            multiply$2(labelMMatrix, labelMMatrix, Constants.MAT4_ROTATION_MINUS_90);
	        }
	        distance += maxLabelSize * 0.5;
	        this._distances[edgeId] = distance;
	    }
	    _updateTitle(axisId, edgeId) {
	        let distance = this._distances[edgeId];
	        const titleTextSize = this._titleSizes[axisId] * this._core.config.axesTextTitleLineHeight;
	        distance += titleTextSize * 0.5;
	        multiply$1(this._vec3, Quad$2.EDGE_POSITIONS[edgeId], this._size);
	        scaleAndAdd(this._vec3, this._vec3, Quad$2.EDGE_NORMALS[edgeId], distance);
	        const titleMMatrix = this._titleMMatrices[edgeId];
	        titleMMatrix[12] = this._vec3[0];
	        titleMMatrix[13] = this._vec3[1];
	        titleMMatrix[14] = this._vec3[2];
	        const right = this._edgeHorizontalRight[edgeId];
	        const up = this._edgeHorizontalUp[edgeId];
	        const forward = this._edgeHorizontalForward[edgeId];
	        titleMMatrix[0] = right[0];
	        titleMMatrix[1] = right[1];
	        titleMMatrix[2] = right[2];
	        titleMMatrix[4] = up[0];
	        titleMMatrix[5] = up[1];
	        titleMMatrix[6] = up[2];
	        titleMMatrix[8] = forward[0];
	        titleMMatrix[9] = forward[1];
	        titleMMatrix[10] = forward[2];
	        multiply$2(titleMMatrix, this._mMatrix, titleMMatrix);
	        distance += titleTextSize * 0.5;
	        this._distances[edgeId] = distance;
	    }
	    _updateHeading(axisId, edgeId) {
	        let distance = this._distances[edgeId];
	        const headingTextSize = this._headingSizes[axisId] * this._core.config.axesTextHeadingLineHeight;
	        distance += headingTextSize * 0.5;
	        multiply$1(this._vec3, Quad$2.EDGE_POSITIONS[edgeId], this._size);
	        scaleAndAdd(this._vec3, this._vec3, Quad$2.EDGE_NORMALS[edgeId], distance);
	        const headingMMatrix = this._headingMMatrices[edgeId];
	        headingMMatrix[12] = this._vec3[0];
	        headingMMatrix[13] = this._vec3[1];
	        headingMMatrix[14] = this._vec3[2];
	        const right = this._edgeHorizontalRight[edgeId];
	        const up = this._edgeHorizontalUp[edgeId];
	        const forward = this._edgeHorizontalForward[edgeId];
	        headingMMatrix[0] = right[0];
	        headingMMatrix[1] = right[1];
	        headingMMatrix[2] = right[2];
	        headingMMatrix[4] = up[0];
	        headingMMatrix[5] = up[1];
	        headingMMatrix[6] = up[2];
	        headingMMatrix[8] = forward[0];
	        headingMMatrix[9] = forward[1];
	        headingMMatrix[10] = forward[2];
	        multiply$2(headingMMatrix, this._mMatrix, headingMMatrix);
	        distance += headingTextSize * 0.5;
	        this._distances[edgeId] = distance;
	    }
	    _updateGrids(size) {
	        let offset = 0;
	        this.pickGridLookup = {};
	        this._pickGrid = [];
	        const xDivisions = this._gridTicksPositions[0] ? this._gridTicksPositions[0].length - 1 : 0;
	        const yDivisions = this._gridTicksPositions[1] ? this._gridTicksPositions[1].length - 1 : 0;
	        const count = 2 * (xDivisions * yDivisions) +
	            xDivisions +
	            yDivisions;
	        const byteLength = PickGridVertex.SIZE_BYTES * count * 4;
	        if (!this._gridVertices || this._gridVertices.byteLength < byteLength) {
	            this._gridVertices = new ArrayBuffer(byteLength);
	            this._gridVerticesView = new DataView(this._gridVertices);
	            this._gridIndices = new Uint16Array(count * 6);
	        }
	        for (let axisId = 0; axisId < 2; axisId++) {
	            const width = size[axisId];
	            set$3(this._gridTicksScales[axisId], width, this._gridPickDivisionHeight, 1);
	            offset = this._updateGridTicks(axisId, this._gridVerticesView, this._gridIndices, offset);
	            this._gridFaceScale[axisId] = size[axisId] == 0 ? 1 : size[axisId];
	        }
	        const axisId = 2;
	        this._gridFaceScale[axisId] = 1;
	        for (let faceId = 0; faceId < 2; faceId++) {
	            offset = this._updateGridFace(axisId, faceId, this._gridVerticesView, this._gridIndices, offset);
	        }
	    }
	    _updateText(size) {
	        let glyphOffset = 0;
	        let count = 0;
	        for (let axisId = 0; axisId < 2; axisId++) {
	            const labels = this._labels[axisId];
	            if (labels) {
	                for (let i = 0; i < labels.length; i++) {
	                    count += 2 * Math.min(labels[i].length, this._core.config.axesTextLabelMaxGlyphs);
	                }
	            }
	            const title = this._titles[axisId];
	            if (title) {
	                count += Math.min(title.length, this._core.config.axesTextTitleMaxGlyphs);
	            }
	            const heading = this._headings[axisId];
	            if (heading) {
	                count += Math.min(heading.length, this._core.config.axesTextHeadingMaxGlyphs);
	            }
	        }
	        const byteLength = PositionTexturePickVertex.SIZE_BYTES * count * 4;
	        if (!this._textVertices || this._textVertices.byteLength < byteLength) {
	            this._textVertices = new ArrayBuffer(byteLength);
	            this._textVerticesView = new DataView(this._textVertices);
	            this._textIndices = new Uint16Array(count * 6);
	        }
	        this.pickLabelLookup = {};
	        this._pickLabel = [];
	        for (let axisId = 0; axisId < 2; axisId++) {
	            if (this._labels[axisId]) {
	                const width = size[axisId];
	                const maxLabelSize = this._maxLabelSize[axisId];
	                const orientation = this._orientations[axisId];
	                set(maxLabelSize, 0, 0);
	                this._axesLeftToRightIndexOffsets[axisId] = glyphOffset * 6;
	                glyphOffset = this._updateLeftToRightAxisLabels(axisId, width, maxLabelSize, glyphOffset, orientation, this._labels[axisId], this._labelPositions[axisId], this._labelSizes[axisId]);
	                this._axesLeftToRightIndexCounts[axisId] = glyphOffset * 6 - this._axesLeftToRightIndexOffsets[axisId];
	                this._axesRightToLeftIndexOffsets[axisId] = glyphOffset * 6;
	                glyphOffset = this._updateRightToLeftAxisLabels(axisId, width, maxLabelSize, glyphOffset, orientation, this._labels[axisId], this._labelPositions[axisId], this._labelSizes[axisId]);
	                this._axesRightToLeftIndexCounts[axisId] = glyphOffset * 6 - this._axesRightToLeftIndexOffsets[axisId];
	            }
	            else {
	                this._axesLeftToRightIndexOffsets[axisId] = glyphOffset * 6;
	                this._axesRightToLeftIndexOffsets[axisId] = glyphOffset * 6;
	                this._axesLeftToRightIndexCounts[axisId] = 0;
	                this._axesRightToLeftIndexCounts[axisId] = 0;
	                this._maxLabelSize[axisId][0] = 0;
	                this._maxLabelSize[axisId][1] = 0;
	            }
	        }
	        this.pickTitleLookup = {};
	        this._pickTitle = [];
	        for (let axisId = 0; axisId < 2; axisId++) {
	            if (this._titles[axisId]) {
	                set$3(this._textPosition, 0, 0, 0);
	                set$3(this._textOffset, 0, 0, 0);
	                this._titleIndexOffsets[axisId] = glyphOffset * 6;
	                const text = TextHelper.truncate(this._titles[axisId], this._core.config.axesTextTitleMaxGlyphs);
	                const scale = this._titleSizes[axisId] / this._font.size;
	                TextHelper.measure(this._font, text, this._textMetric);
	                const width = this._textMetric.width * scale;
	                const maxGlyphTop = this._textMetric.maxTop * scale;
	                const lineHeight = this._font.size * scale;
	                this._textOffset[0] -= width / 2;
	                this._textOffset[1] -= (lineHeight - maxGlyphTop) / 2;
	                const pickId = PickHelper.nextPickId();
	                PickHelper.encodeNumber(pickId, PickType.axesTitle, this._vec4);
	                this.pickTitleLookup[pickId] = this._pickTitle.length;
	                this._pickTitle.push(axisId);
	                TextHelper.addString(this._font, text, this._textVerticesView, this._textIndices, glyphOffset, this._textPosition, scale, this._textOffset, null, this._vec4);
	                glyphOffset += text.length;
	                this._titleIndexCounts[axisId] = glyphOffset * 6 - this._titleIndexOffsets[axisId];
	            }
	            else {
	                this._titleIndexOffsets[axisId] = glyphOffset * 6;
	                this._titleIndexCounts[axisId] = 0;
	            }
	        }
	        this.pickHeadingLookup = {};
	        this._pickHeading = [];
	        for (let axisId = 0; axisId < 2; axisId++) {
	            if (this._headings[axisId]) {
	                set$3(this._textPosition, 0, 0, 0);
	                set$3(this._textOffset, 0, 0, 0);
	                this._headingIndexOffsets[axisId] = glyphOffset * 6;
	                const text = TextHelper.truncate(this._headings[axisId], this._core.config.axesTextHeadingMaxGlyphs);
	                const scale = this._headingSizes[axisId] / this._font.size;
	                TextHelper.measure(this._font, text, this._textMetric);
	                const width = this._textMetric.width * scale;
	                const maxGlyphTop = this._textMetric.maxTop * scale;
	                const lineHeight = this._font.size * scale;
	                this._textOffset[0] -= width / 2;
	                this._textOffset[1] -= (lineHeight - maxGlyphTop) / 2;
	                const pickId = PickHelper.nextPickId();
	                PickHelper.encodeNumber(pickId, PickType.axesHeading, this._vec4);
	                this.pickHeadingLookup[pickId] = this._pickHeading.length;
	                this._pickHeading.push(axisId);
	                TextHelper.addString(this._font, text, this._textVerticesView, this._textIndices, glyphOffset, this._textPosition, scale, this._textOffset, null, this._vec4);
	                glyphOffset += text.length;
	                this._headingIndexCounts[axisId] = glyphOffset * 6 - this._headingIndexOffsets[axisId];
	            }
	            else {
	                this._headingIndexOffsets[axisId] = glyphOffset * 6;
	                this._headingIndexCounts[axisId] = 0;
	            }
	        }
	    }
	    _updateLeftToRightAxisLabels(axisId, size, maxSize, glyphOffset, orientation, labels, positions, scales) {
	        const isAxisReversed = this.isAxisReversed[axisId];
	        for (let label = 0; label < labels.length; label++) {
	            const text = TextHelper.truncate(labels[label], this._core.config.axesTextLabelMaxGlyphs);
	            const lineHeight = scales[label];
	            const scale = lineHeight / this._font.size;
	            TextHelper.measure(this._font, text, this._textMetric);
	            const width = this._textMetric.width * scale;
	            const maxGlyphTop = this._textMetric.maxTop * scale;
	            const position = isAxisReversed ? 1 - positions[label] : positions[label];
	            switch (orientation) {
	                case AxesTextOrientation.parallel:
	                    set$3(this._textPosition, (position - 0.5) * size, 0, 0);
	                    if (this._isDiscrete[axisId]) {
	                        this._textOffset[0] = -width / 2;
	                    }
	                    else {
	                        this._textOffset[0] = position == 0 ? 0 : position == 1 ? -width : -width / 2;
	                    }
	                    this._textOffset[1] = (maxGlyphTop - lineHeight) / 2;
	                    maxSize[0] = Math.max(width, maxSize[0]);
	                    maxSize[1] = Math.max(lineHeight, maxSize[1]);
	                    break;
	                case AxesTextOrientation.perpendicular:
	                    set$3(this._textPosition, 0, (position - 0.5) * size, 0);
	                    this._textOffset[0] = -width / 2;
	                    if (this._isDiscrete[axisId]) {
	                        this._textOffset[1] = -maxGlyphTop / 2;
	                    }
	                    else {
	                        this._textOffset[1] = position == 0 ? 0 : position == 1 ? -maxGlyphTop : -maxGlyphTop / 2;
	                    }
	                    maxSize[0] = Math.max(lineHeight, maxSize[0]);
	                    maxSize[1] = Math.max(width, maxSize[1]);
	                    break;
	            }
	            const pickId = PickHelper.nextPickId();
	            PickHelper.encodeNumber(pickId, PickType.axesLabel, this._vec4);
	            this.pickLabelLookup[pickId] = this._pickLabel.length / 2;
	            this._pickLabel.push(axisId);
	            this._pickLabel.push(label);
	            TextHelper.addString(this._font, text, this._textVerticesView, this._textIndices, glyphOffset, this._textPosition, scale, this._textOffset, null, this._vec4);
	            glyphOffset += text.length;
	        }
	        return glyphOffset;
	    }
	    _updateRightToLeftAxisLabels(axisId, size, maxSize, glyphOffset, orientation, labels, positions, scales) {
	        const isAxisReversed = this.isAxisReversed[axisId];
	        for (let label = 0; label < labels.length; label++) {
	            const text = TextHelper.truncate(labels[label], this._core.config.axesTextLabelMaxGlyphs);
	            const lineHeight = scales[label];
	            const scale = lineHeight / this._font.size;
	            TextHelper.measure(this._font, text, this._textMetric);
	            const width = this._textMetric.width * scale;
	            const maxGlyphTop = this._textMetric.maxTop * scale;
	            const position = isAxisReversed ? 1 - positions[label] : positions[label];
	            switch (orientation) {
	                case AxesTextOrientation.parallel:
	                    set$3(this._textPosition, (0.5 - position) * size, 0, 0);
	                    if (this._isDiscrete[axisId]) {
	                        this._textOffset[0] = -width / 2;
	                    }
	                    else {
	                        this._textOffset[0] = label == 0 ? -width : label == labels.length - 1 ? 0 : -width / 2;
	                    }
	                    this._textOffset[1] = (maxGlyphTop - lineHeight) / 2;
	                    break;
	                case AxesTextOrientation.perpendicular:
	                    set$3(this._textPosition, 0, (0.5 - position) * size, 0);
	                    this._textOffset[0] = -width / 2;
	                    if (this._isDiscrete[axisId]) {
	                        this._textOffset[1] = -maxGlyphTop / 2;
	                    }
	                    else {
	                        this._textOffset[1] = label == 0 ? -maxGlyphTop : label == labels.length - 1 ? 0 : -maxGlyphTop / 2;
	                    }
	                    break;
	            }
	            const pickId = PickHelper.nextPickId();
	            PickHelper.encodeNumber(pickId, PickType.axesLabel, this._vec4);
	            this.pickLabelLookup[pickId] = this._pickLabel.length / 2;
	            this._pickLabel.push(axisId);
	            this._pickLabel.push(label);
	            TextHelper.addString(this._font, text, this._textVerticesView, this._textIndices, glyphOffset, this._textPosition, scale, this._textOffset, null, this._vec4);
	            glyphOffset += text.length;
	        }
	        return glyphOffset;
	    }
	    _updateGridTicks(axisId, dataView, indices, offset) {
	        this._gridTicksIndexOffsets[axisId] = offset * 6;
	        if (this._gridTicksPositions[axisId]) {
	            const axes = create$3();
	            const positions = this._gridTicksPositions[axisId];
	            const isAxisReversed = this.isAxisReversed[axisId];
	            let vertexOffset = offset * 4;
	            for (let position = 0; position < positions.length - 1; position++) {
	                const left = isAxisReversed ? 1 - positions[position + 1] - 0.5 : positions[position] - 0.5;
	                const right = isAxisReversed ? 1 - positions[position] - 0.5 : positions[position + 1] - 0.5;
	                axes[axisId] = position + 1;
	                const pickId = PickHelper.nextPickId();
	                PickHelper.encodeNumber(pickId, PickType.axesDivision, this._vec4);
	                this.pickGridLookup[pickId] = this._pickGrid.length / 3;
	                this._pickGrid.push(axes[0]);
	                this._pickGrid.push(axes[1]);
	                this._pickGrid.push(axes[2]);
	                let indexOffset = offset * 6;
	                for (let j = 0; j < this._indexTemplate.length; j++) {
	                    indices[indexOffset++] = this._indexTemplate[j] + vertexOffset;
	                }
	                set$2(this._bounds, left + 0.5, 0, right + 0.5, 1);
	                this._translation[0] = left;
	                this._translation[1] = 0.5;
	                this._translation[2] = 0;
	                this._texCoord[0] = left + 0.5;
	                this._texCoord[1] = 1;
	                PickGridVertex.setTranslation(dataView, vertexOffset, this._translation);
	                PickGridVertex.setNormal(dataView, vertexOffset, Constants.VECTOR3_UNITZ);
	                PickGridVertex.setIdColor(dataView, vertexOffset, this._vec4);
	                PickGridVertex.setTexCoord(dataView, vertexOffset, this._texCoord);
	                PickGridVertex.setBounds(dataView, vertexOffset, this._bounds);
	                vertexOffset++;
	                this._translation[0] = right;
	                this._texCoord[0] = right + 0.5;
	                PickGridVertex.setTranslation(dataView, vertexOffset, this._translation);
	                PickGridVertex.setNormal(dataView, vertexOffset, Constants.VECTOR3_UNITZ);
	                PickGridVertex.setIdColor(dataView, vertexOffset, this._vec4);
	                PickGridVertex.setTexCoord(dataView, vertexOffset, this._texCoord);
	                PickGridVertex.setBounds(dataView, vertexOffset, this._bounds);
	                vertexOffset++;
	                this._translation[0] = left;
	                this._translation[1] = -0.5;
	                this._texCoord[0] = left + 0.5;
	                this._texCoord[1] = 0;
	                PickGridVertex.setTranslation(dataView, vertexOffset, this._translation);
	                PickGridVertex.setNormal(dataView, vertexOffset, Constants.VECTOR3_UNITZ);
	                PickGridVertex.setIdColor(dataView, vertexOffset, this._vec4);
	                PickGridVertex.setTexCoord(dataView, vertexOffset, this._texCoord);
	                PickGridVertex.setBounds(dataView, vertexOffset, this._bounds);
	                vertexOffset++;
	                this._translation[0] = right;
	                this._texCoord[0] = right + 0.5;
	                PickGridVertex.setTranslation(dataView, vertexOffset, this._translation);
	                PickGridVertex.setNormal(dataView, vertexOffset, Constants.VECTOR3_UNITZ);
	                PickGridVertex.setIdColor(dataView, vertexOffset, this._vec4);
	                PickGridVertex.setTexCoord(dataView, vertexOffset, this._texCoord);
	                PickGridVertex.setBounds(dataView, vertexOffset, this._bounds);
	                vertexOffset++;
	                offset++;
	            }
	        }
	        this._gridTicksIndexCounts[axisId] = offset * 6 - this._gridTicksIndexOffsets[axisId];
	        return offset;
	    }
	    _updateGridFace(axisId, faceId, dataView, indices, offset) {
	        set$3(this._translation, 0, 0, 0);
	        this._gridFaceIndexOffsets[faceId] = offset * 6;
	        const axisId2 = axisId == 0 ? 1 : 0;
	        const axisId3 = axisId == 2 ? 1 : 2;
	        if (this._gridTicksPositions[axisId2] && this._gridTicksPositions[axisId3]) {
	            const axes = create$3();
	            negate(this._normal, Quad$2.FACE_NORMALS[faceId]);
	            const positions2 = this._gridTicksPositions[axisId2];
	            const positions3 = this._gridTicksPositions[axisId3];
	            const isAxisReversed2 = this.isAxisReversed[axisId2];
	            const isAxisReversed3 = this.isAxisReversed[axisId3];
	            for (let position2 = 0; position2 < positions2.length - 1; position2++) {
	                const min2 = isAxisReversed2 ? 1 - positions2[position2 + 1] - 0.5 : positions2[position2] - 0.5;
	                const max2 = isAxisReversed2 ? 1 - positions2[position2] - 0.5 : positions2[position2 + 1] - 0.5;
	                axes[axisId2] = position2 + 1;
	                let vertexOffset = offset * 4;
	                for (let position3 = 0; position3 < positions3.length - 1; position3++) {
	                    const min3 = isAxisReversed3 ? 1 - positions3[position3 + 1] - 0.5 : positions3[position3] - 0.5;
	                    const max3 = isAxisReversed3 ? 1 - positions3[position3] - 0.5 : positions3[position3 + 1] - 0.5;
	                    axes[axisId3] = position3 + 1;
	                    const pickId = PickHelper.nextPickId();
	                    PickHelper.encodeNumber(pickId, PickType.axesDivision, this._vec4);
	                    this.pickGridLookup[pickId] = this._pickGrid.length / 3;
	                    this._pickGrid.push(axes[0]);
	                    this._pickGrid.push(axes[1]);
	                    this._pickGrid.push(axes[2]);
	                    let indexOffset = offset * 6;
	                    for (let i = 0; i < this._indexTemplate.length; i++) {
	                        indices[indexOffset++] = this._indexTemplate[i] + vertexOffset;
	                    }
	                    set$2(this._bounds, min2 + 0.5, min3 + 0.5, max2 + 0.5, max3 + 0.5);
	                    this._translation[axisId2] = min2;
	                    this._translation[axisId3] = max3;
	                    this._texCoord[0] = min2 + 0.5;
	                    this._texCoord[1] = max3 + 0.5;
	                    PickGridVertex.setTranslation(dataView, vertexOffset, this._translation);
	                    PickGridVertex.setNormal(dataView, vertexOffset, this._normal);
	                    PickGridVertex.setIdColor(dataView, vertexOffset, this._vec4);
	                    PickGridVertex.setTexCoord(dataView, vertexOffset, this._texCoord);
	                    PickGridVertex.setBounds(dataView, vertexOffset, this._bounds);
	                    vertexOffset++;
	                    this._translation[axisId2] = max2;
	                    this._texCoord[0] = max2 + 0.5;
	                    PickGridVertex.setTranslation(dataView, vertexOffset, this._translation);
	                    PickGridVertex.setNormal(dataView, vertexOffset, this._normal);
	                    PickGridVertex.setIdColor(dataView, vertexOffset, this._vec4);
	                    PickGridVertex.setTexCoord(dataView, vertexOffset, this._texCoord);
	                    PickGridVertex.setBounds(dataView, vertexOffset, this._bounds);
	                    vertexOffset++;
	                    this._translation[axisId2] = min2;
	                    this._translation[axisId3] = min3;
	                    this._texCoord[0] = min2 + 0.5;
	                    this._texCoord[1] = min3 + 0.5;
	                    PickGridVertex.setTranslation(dataView, vertexOffset, this._translation);
	                    PickGridVertex.setNormal(dataView, vertexOffset, this._normal);
	                    PickGridVertex.setIdColor(dataView, vertexOffset, this._vec4);
	                    PickGridVertex.setTexCoord(dataView, vertexOffset, this._texCoord);
	                    PickGridVertex.setBounds(dataView, vertexOffset, this._bounds);
	                    vertexOffset++;
	                    this._translation[axisId2] = max2;
	                    this._texCoord[0] = max2 + 0.5;
	                    PickGridVertex.setTranslation(dataView, vertexOffset, this._translation);
	                    PickGridVertex.setNormal(dataView, vertexOffset, this._normal);
	                    PickGridVertex.setIdColor(dataView, vertexOffset, this._vec4);
	                    PickGridVertex.setTexCoord(dataView, vertexOffset, this._texCoord);
	                    PickGridVertex.setBounds(dataView, vertexOffset, this._bounds);
	                    vertexOffset++;
	                    offset++;
	                }
	            }
	        }
	        this._gridFaceIndexCounts[faceId] = offset * 6 - this._gridFaceIndexOffsets[faceId];
	        return offset;
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Glyph {
	    toJSON() {
	        return {
	            key: this.key,
	            char: this.char,
	            width: this.width,
	            height: this.height,
	            top: this.top,
	            left: this.left,
	            advance: this.advance,
	            u0: this.u0,
	            v0: this.v0,
	            u1: this.u1,
	            v1: this.v1,
	        };
	    }
	}
	let FontVisual$2 = class FontVisual {
	    update() { }
	    constructor(font) {
	        this.font = font;
	    }
	};
	class Font {
	    get atlas() { return this._rasterizer.fontAtlas; }
	    get count() { return this._chars.size; }
	    constructor(core, rasterizer) {
	        this._core = core;
	        this._rasterizer = rasterizer;
	        this._chars = new Set();
	        this._previousSize = 0;
	        this.glyphs = {};
	    }
	    addGlyph(char) {
	        if (!this._chars.has(char)) {
	            this._chars.add(char);
	            this._rasterizer.draw(char);
	            this._hasChanged = true;
	        }
	    }
	    update() {
	        if (this._hasChanged) {
	            this._hasChanged = false;
	            this._core.log.write(LogLevel.info, `${this.name} added ${this._chars.size - this._previousSize} new glyphs`);
	            this._previousSize = this._chars.size;
	            if (this.hasChangedCallback) {
	                this.hasChangedCallback();
	            }
	        }
	    }
	    toJSON() {
	        const glyphs = [];
	        for (let key in this.glyphs) {
	            const glyph = this.glyphs[key];
	            glyphs.push(glyph.toJSON());
	        }
	        return {
	            name: this.name,
	            size: this.size,
	            border: this.border,
	            glyphs: glyphs,
	            edgeValue: this.edgeValue,
	        };
	    }
	}
	class FontAtlas {
	    constructor(width, height) {
	        const canvas = document.createElement("canvas");
	        canvas.width = width;
	        canvas.height = height;
	        const context = canvas.getContext("2d");
	        context.clearRect(0, 0, width, height);
	        this.imageData = context.getImageData(0, 0, width, height);
	        this.x = 0;
	        this.top = new Uint16Array(width);
	    }
	}
	class FontRasterizer {
	    get font() { return this._font; }
	    get fontAtlas() { return this._fontAtlas; }
	    constructor(core, options) {
	        let start = performance.now();
	        this._core = core;
	        this._fontAtlas = options.fontAtlas;
	        this._fontSize = options.fontSize;
	        this._border = options.border;
	        this._fontFamily = options.fontFamily;
	        this._fontWeight = options.fontWeight;
	        this._fontStyle = options.fontStyle;
	        this._baseline = options.baseline;
	        this._maxDistance = options.maxDistance;
	        this._edgeValue = options.edgeValue;
	        this._font = new Font(core, this);
	        this._font.name = `${this._fontFamily}${this._fontSize}${this._fontWeight == "normal" ? "" : this._fontWeight}${this._fontStyle == "normal" ? "" : this._fontStyle}`.replace(/[^a-z0-9,]/ig, "").toLowerCase();
	        this._font.size = this._fontSize;
	        this._font.border = this._border;
	        this._font.edgeValue = this._edgeValue;
	        const glyphRasterizerOptions = {
	            baseline: this._baseline,
	            border: this._border,
	            edgeValue: this._edgeValue,
	            fontFamily: this._fontFamily,
	            fontSize: this._fontSize,
	            fontStyle: this._fontStyle,
	            fontWeight: this._fontWeight,
	            maxDistance: this._maxDistance,
	        };
	        this._glyphRasterizer = new GlyphRasterizer(core, glyphRasterizerOptions);
	        this._core.log.write(LogLevel.info, `font rasterizer ${Math.round(window.performance.now() - start)}ms`);
	    }
	    draw(char) {
	        const glyph = this._glyphRasterizer.draw(char);
	        const texWidth = glyph.width + 2 * this._border;
	        const texHeight = glyph.height + 2 * this._border;
	        const width = this._fontAtlas.imageData.width;
	        const height = this._fontAtlas.imageData.height;
	        if (this._fontAtlas.x + texWidth > width) {
	            this._fontAtlas.x = 0;
	        }
	        let y = 0;
	        for (let x = this._fontAtlas.x; x < this._fontAtlas.x + texWidth; x++) {
	            y = Math.max(y, this._fontAtlas.top[x]);
	        }
	        if (y + texHeight > height) {
	            this._core.log.write(LogLevel.warn, `${this._font.name} height overflow`);
	        }
	        for (let x = this._fontAtlas.x; x < this._fontAtlas.x + texWidth; x++) {
	            this._fontAtlas.top[x] = y + texHeight;
	        }
	        glyph.u0 = this._fontAtlas.x / width;
	        glyph.v0 = y / height;
	        glyph.u1 = (this._fontAtlas.x + texWidth) / width;
	        glyph.v1 = (y + texHeight) / height;
	        this._font.glyphs[char] = glyph;
	        for (let i = 0; i < glyph.distances.length; i++) {
	            const distance = glyph.distances[i];
	            const dataX = i % texWidth;
	            const dataY = Math.floor(i / texWidth);
	            const offset = (this._fontAtlas.x + dataX + (y + dataY) * width) * 4;
	            this._fontAtlas.imageData.data[offset + 0] = distance;
	            this._fontAtlas.imageData.data[offset + 1] = distance;
	            this._fontAtlas.imageData.data[offset + 2] = distance;
	            this._fontAtlas.imageData.data[offset + 3] = 0xff;
	        }
	        this._fontAtlas.x += texWidth;
	    }
	}
	class GlyphRasterizer {
	    constructor(core, options) {
	        let start = performance.now();
	        this._core = core;
	        this._fontSize = options.fontSize;
	        this._border = options.border;
	        this._fontFamily = options.fontFamily;
	        this._fontWeight = options.fontWeight;
	        this._fontStyle = options.fontStyle;
	        this._baseline = options.baseline;
	        this._maxDistance = options.maxDistance;
	        this._edgeValue = options.edgeValue;
	        this._size = this._fontSize + this._border * 2;
	        this._size += this._border * 2;
	        this._gridOuter = new Float64Array(this._size * this._size);
	        this._gridInner = new Float64Array(this._size * this._size);
	        this._f = new Float64Array(this._size);
	        this._z = new Float64Array(this._size + 1);
	        this._v = new Uint16Array(this._size);
	        const canvas = document.createElement("canvas");
	        canvas.width = canvas.height = this._size;
	        this._context = canvas.getContext("2d", { willReadFrequently: true });
	        this._context.font = `${this._fontStyle} ${this._fontWeight} ${this._fontSize}px ${this._fontFamily} `;
	        this._context.textBaseline = this._baseline;
	        this._context.textAlign = "left";
	        this._context.fillStyle = "black";
	        this._core.log.write(LogLevel.info, `glyph rasterizer ${Math.round(window.performance.now() - start)}ms`);
	    }
	    draw(char) {
	        const textMetrics = this._context.measureText(char);
	        const glyphLeft = 0;
	        const glyphTop = Math.floor(textMetrics.actualBoundingBoxAscent);
	        let glyphWidth = Math.ceil(textMetrics.actualBoundingBoxRight);
	        let glyphHeight = Math.ceil(textMetrics.actualBoundingBoxAscent) + Math.ceil(textMetrics.actualBoundingBoxDescent);
	        glyphWidth = Math.min(this._size - this._border, glyphWidth);
	        glyphHeight = Math.min(this._size - this._border, glyphHeight);
	        const width = glyphWidth + 2 * this._border;
	        const height = glyphHeight + 2 * this._border;
	        const length = width * height;
	        const distances = new Uint8ClampedArray(length);
	        const gradientsX = new Uint8ClampedArray(length);
	        const gradientsY = new Uint8ClampedArray(length);
	        const pixels = new Uint8ClampedArray(length);
	        const glyph = new Glyph();
	        glyph.char = char;
	        glyph.key = char.codePointAt(0);
	        glyph.distances = distances;
	        glyph.gradientsX = gradientsX;
	        glyph.gradientsY = gradientsY;
	        glyph.pixels = pixels;
	        glyph.width = glyphWidth;
	        glyph.height = glyphHeight;
	        glyph.top = glyphTop;
	        glyph.left = glyphLeft;
	        glyph.advance = textMetrics.width;
	        if (glyphWidth == 0 || glyphHeight == 0) {
	            return glyph;
	        }
	        this._context.clearRect(this._border, this._border, glyphWidth, glyphHeight);
	        this._context.fillText(char, this._border, this._border + glyphTop);
	        const imgData = this._context.getImageData(this._border, this._border, glyphWidth, glyphHeight);
	        for (let i = 0; i < length; i++) {
	            this._gridOuter[i] = Number.MAX_VALUE;
	            this._gridInner[i] = 0;
	        }
	        for (let y = 0; y < glyphHeight; y++) {
	            for (let x = 0; x < glyphWidth; x++) {
	                const a = imgData.data[4 * (y * glyphWidth + x) + 3] / 0xff;
	                if (a > 0) {
	                    const j = (y + this._border) * width + x + this._border;
	                    if (a == 1) {
	                        this._gridOuter[j] = 0;
	                        this._gridInner[j] = Number.MAX_VALUE;
	                    }
	                    else {
	                        const d = 0.5 - a;
	                        this._gridOuter[j] = d > 0 ? d * d : 0;
	                        this._gridInner[j] = d < 0 ? d * d : 0;
	                        pixels[j] = 0xff;
	                    }
	                }
	            }
	        }
	        this._edt(this._gridOuter, 0, 0, width, height, width, this._f, this._v, this._z);
	        this._edt(this._gridInner, this._border, this._border, glyphWidth, glyphHeight, width, this._f, this._v, this._z);
	        const distances2 = new Float32Array(length);
	        for (let i = 0; i < length; i++) {
	            const distance = Math.sqrt(this._gridOuter[i]) - Math.sqrt(this._gridInner[i]);
	            distances[i] = Math.round(this._edgeValue - distance * 0xff / this._maxDistance);
	            distances2[i] = distance;
	        }
	        for (let i = 0; i < length; i++) {
	            const x = i % width;
	            const y = Math.floor(i / width);
	            const d = distances2[i];
	            const sign = d < 0 ? -1 : 1;
	            const x0 = x > 0 ? distances2[i - 1] : Number.MAX_VALUE;
	            const x1 = x < width - 1 ? distances2[i + 1] : Number.MAX_VALUE;
	            const y0 = y > 0 ? distances2[i - width] : Number.MAX_VALUE;
	            const y1 = y < height - 1 ? distances2[i + width] : Number.MAX_VALUE;
	            let gradientX = sign * x0 < sign * x1 ? d - x0 : x1 - d;
	            let gradientY = sign * y0 < sign * y1 ? y0 - d : d - y1;
	            gradientsX[i] = Math.round((gradientX * 0.5 + 0.5) * 0xff);
	            gradientsY[i] = Math.round((gradientY * 0.5 + 0.5) * 0xff);
	        }
	        return glyph;
	    }
	    _edt(data, x0, y0, width, height, gridSize, f, v, z) {
	        for (let x = x0; x < x0 + width; x++)
	            this._edt1d(data, y0 * gridSize + x, gridSize, height, f, v, z);
	        for (let y = y0; y < y0 + height; y++)
	            this._edt1d(data, y * gridSize + x0, 1, width, f, v, z);
	    }
	    _edt1d(grid, offset, stride, n, f, v, z) {
	        v[0] = 0;
	        z[0] = -Number.MAX_VALUE;
	        z[1] = Number.MAX_VALUE;
	        f[0] = grid[offset];
	        for (let q = 1, k = 0, s = 0; q < n; q++) {
	            f[q] = grid[offset + q * stride];
	            const q2 = q * q;
	            do {
	                const r = v[k];
	                s = (f[q] - f[r] + q2 - r * r) / (q - r) / 2;
	            } while (s <= z[k] && --k > -1);
	            k++;
	            v[k] = q;
	            z[k] = s;
	            z[k + 1] = Number.MAX_VALUE;
	        }
	        for (let q = 0, k = 0; q < n; q++) {
	            while (z[k + 1] < q) {
	                k++;
	            }
	            const r = v[k];
	            const qr = q - r;
	            grid[offset + q * stride] = f[r] + qr * qr;
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class ManipulationProcessor {
	    get manipulators() { return this._manipulators; }
	    get count() { return this._count; }
	    get isDragging() { return this._isDragging; }
	    constructor(core) {
	        this._core = core;
	        this._count = 0;
	        this._centroid = create$3();
	        this._previousCentroid = create$3();
	        this._relativePositionToCentroid = create$3();
	        this._directionToCentroid = create$3();
	        this._previousDirectionToCentroid = create$3();
	        this._manipulators = {};
	        this._removedManipulators = [];
	        this.cumulativeTranslation = create$3();
	        this.translationDelta = create$3();
	        this.centroid = create$3();
	        this.maxScale = Number.MAX_VALUE;
	        this.twistAxis = fromValues$3(0, 0, 1);
	        this.initialize();
	    }
	    update(elapsedTime, manipulators) {
	        for (const key in this._manipulators) {
	            const manipulator = this._manipulators[key];
	            if (!manipulators[manipulator.id]) {
	                if (this.removeManipulator) {
	                    this.removeManipulator(manipulator);
	                }
	                this._removedManipulators.push(manipulator.id);
	            }
	        }
	        if (this._removedManipulators.length > 0) {
	            for (let i = 0; i < this._removedManipulators.length; i++) {
	                delete this._manipulators[this._removedManipulators[i]];
	                this._count--;
	            }
	            this._removedManipulators = [];
	        }
	        for (const key in manipulators) {
	            const manipulator = manipulators[key];
	            if (!this._manipulators[manipulator.id]) {
	                if (!this.addManipulator || this.addManipulator(manipulator)) {
	                    copy$3(manipulator.initialPosition, manipulator.position);
	                    this._manipulators[manipulator.id] = manipulator;
	                    this._count++;
	                }
	            }
	        }
	        set$3(this.translationDelta, 0, 0, 0);
	        this.scaleDelta = 0;
	        this.twistDelta = 0;
	        if (this._count > 0) {
	            if (this._previousCount > 0) {
	                if (this.prepareManipulation) {
	                    this.prepareManipulation();
	                }
	                this._process();
	                if (this.processManipulation) {
	                    this.processManipulation(elapsedTime);
	                }
	            }
	            else {
	                this.initialize();
	                if (this.beginManipulation) {
	                    this.beginManipulation();
	                }
	            }
	        }
	        else {
	            if (this._previousCount > 0) {
	                if (this.endManipulation) {
	                    this.endManipulation();
	                }
	            }
	        }
	        this._isDragging = (this._count == 1 && squaredLength(this.cumulativeTranslation) > this._core.config.dragToleranceSquared) || this._count > 1;
	        this._previousCount = this._count;
	    }
	    initialize() {
	        set$3(this.centroid, 0, 0, 0);
	        set$3(this.cumulativeTranslation, 0, 0, 0);
	        this.cumulativeScale = 1;
	        this.cumulativeTwist = 0;
	    }
	    _process() {
	        if (this._previousCount > 0) {
	            let persisted = 0;
	            for (const key in this._manipulators) {
	                const manipulator = this._manipulators[key];
	                if (manipulator.isPersisted) {
	                    persisted++;
	                }
	            }
	            const removed = this._previousCount - persisted;
	            if (persisted > 0) {
	                if (removed > 0) {
	                    copy$3(this._centroid, this._previousCentroid);
	                }
	                else {
	                    set$3(this._centroid, 0, 0, 0);
	                    for (const key in this._manipulators) {
	                        const manipulator = this._manipulators[key];
	                        if (manipulator.isPersisted) {
	                            add(this._centroid, this._centroid, manipulator.position);
	                        }
	                    }
	                    scale(this._centroid, this._centroid, 1 / persisted);
	                }
	                for (const key in this._manipulators) {
	                    const manipulator = this._manipulators[key];
	                    if (manipulator.isPersisted) {
	                        manipulator.maxTranslationSquared = Math.max(manipulator.maxTranslationSquared, squaredDistance(manipulator.position, manipulator.initialPosition));
	                        add(this.translationDelta, this.translationDelta, manipulator.position);
	                        subtract(this.translationDelta, this.translationDelta, manipulator.previousPosition);
	                        subtract(this._relativePositionToCentroid, manipulator.position, this._centroid);
	                        const distanceToCentroidSquared = squaredLength(this._relativePositionToCentroid);
	                        if (distanceToCentroidSquared < this._core.config.manipulatorMinRelativeDistanceSquared) {
	                            this.scaleDelta += 1;
	                        }
	                        else {
	                            const distanceToCentroid = Math.sqrt(distanceToCentroidSquared);
	                            const previousDistanceToCentroidSquared = squaredLength(manipulator.previousPositionRelativeToCentroid);
	                            const previousDistanceToCentroid = Math.sqrt(previousDistanceToCentroidSquared);
	                            this.scaleDelta += distanceToCentroid / previousDistanceToCentroid;
	                            scale(this._directionToCentroid, this._relativePositionToCentroid, 1 / distanceToCentroid);
	                            scale(this._previousDirectionToCentroid, manipulator.previousPositionRelativeToCentroid, 1 / previousDistanceToCentroid);
	                            this.twistDelta += AngleHelper.signedAngleBetweenVectors(this._previousDirectionToCentroid, this._directionToCentroid, this.twistAxis);
	                        }
	                    }
	                }
	                scale(this.translationDelta, this.translationDelta, 1 / persisted);
	                add(this.cumulativeTranslation, this.cumulativeTranslation, this.translationDelta);
	                this.scaleDelta /= persisted;
	                this.cumulativeScale = MathHelper.clamp(this.cumulativeScale * this.scaleDelta, this.minScale, this.maxScale);
	                this.scaleDelta -= 1;
	                this.twistDelta /= persisted;
	                this.cumulativeTwist += this.twistDelta;
	            }
	        }
	        set$3(this.centroid, 0, 0, 0);
	        for (const key in this._manipulators) {
	            const manipulator = this._manipulators[key];
	            add(this.centroid, this.centroid, manipulator.position);
	        }
	        scale(this.centroid, this.centroid, 1 / this._count);
	        for (const key in this._manipulators) {
	            const manipulator = this._manipulators[key];
	            subtract(manipulator.positionRelativeToCentroid, manipulator.position, this.centroid);
	        }
	        copy$3(this._previousCentroid, this.centroid);
	        for (const key in this._manipulators) {
	            const manipulator = this._manipulators[key];
	            manipulator.isPersisted = true;
	            copy$3(manipulator.previousPosition, manipulator.position);
	            copy$3(manipulator.previousRotationAxis, manipulator.rotationAxis);
	            copy$3(manipulator.previousPositionRelativeToCentroid, manipulator.positionRelativeToCentroid);
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class MouseWheel {
	    constructor(core) {
	        this._core = core;
	        this._previousTotal = 0;
	        this.total = 0;
	    }
	    initialize(element) {
	        element.addEventListener("wheel", e => {
	            e.preventDefault();
	            const wheelEvent = e;
	            this.total += wheelEvent.deltaY;
	        }, { passive: false });
	    }
	    update(elapsedTime) {
	        const total = this.total;
	        this.delta = total - this._previousTotal;
	        this._previousTotal = total;
	        if (this._core.config.isDebugVisible) {
	            this._core.debugText.addLine(`mse whl ${this.total < 0 ? "" : " "}${Math.round(this.total)}`);
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Manipulator {
	    constructor() {
	        this.pickedIndex = 0;
	        this.maxTranslationSquared = 0;
	        this.initialPosition = create$3();
	        this.position = create$3();
	        this.previousPosition = create$3();
	        this.holdOrigin = create$3();
	        this.positionRelativeToCentroid = create$3();
	        this.previousPositionRelativeToCentroid = create$3();
	        this.rotationAxis = create$3();
	        this.previousRotationAxis = create$3();
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Pointers {
	    get hoverX() { return this._hoverX; }
	    ;
	    get hoverY() { return this._hoverY; }
	    ;
	    get hoverId() { return this._hoverId; }
	    ;
	    constructor(core, manipulators) {
	        this._core = core;
	        this._manipulators = manipulators;
	    }
	    initialize(element) {
	        this._element = element;
	        element.addEventListener("pointerdown", (e) => this._handlePointerDown(e), { passive: true });
	        element.addEventListener("pointermove", (e) => this._handlePointerMove(e), { passive: true });
	        element.addEventListener("pointerup", (e) => this._handlePointerUp(e), { passive: true });
	        element.addEventListener("pointercancel", (e) => this._handlePointerCancel(e), { passive: true });
	        element.addEventListener("pointerleave", (e) => this._handlePointerLeave(e), { passive: true });
	        element.addEventListener("pointerout", (e) => this._handlePointerOut(e), { passive: true });
	    }
	    update(elapsedTime) {
	        if (this._core.config.isDebugVisible) {
	            this._core.debugText.addLine(`pen rot  ${(this._tiltX | 0).toFixed(3)},${(this._tiltY | 0).toFixed(3)},${(this._twist | 0).toFixed(3)}`);
	            this._core.debugText.addLine(`hov pos  ${this.hoverX ? `${this.hoverX.toFixed(3)},${this.hoverY.toFixed(3)}px` : ""}`);
	        }
	    }
	    _handlePointerDown(e) {
	        this._element.focus();
	        const devicePixelRatio = this._core.renderer.devicePixelRatio;
	        const manipulator = new Manipulator();
	        const id = e.pointerId;
	        const x = e.offsetX * devicePixelRatio;
	        const y = e.offsetY * devicePixelRatio;
	        manipulator.id = id;
	        manipulator.position[0] = x;
	        manipulator.position[1] = y;
	        manipulator.type = e.pointerType;
	        manipulator.button = e.button;
	        manipulator.shiftKey = e.shiftKey;
	        manipulator.ctrlKey = e.ctrlKey;
	        manipulator.altKey = e.altKey;
	        manipulator.event = e;
	        this._manipulators[id] = manipulator;
	        this._hoverId = id;
	        this._hoverX = x;
	        this._hoverY = y;
	    }
	    _handlePointerMove(e) {
	        const devicePixelRatio = this._core.renderer.devicePixelRatio;
	        const x = e.offsetX * devicePixelRatio;
	        const y = e.offsetY * devicePixelRatio;
	        const id = e.pointerId;
	        const manipulator = this._manipulators[id];
	        if (manipulator) {
	            manipulator.position[0] = x;
	            manipulator.position[1] = y;
	            manipulator.event = e;
	        }
	        switch (e.pointerType) {
	            case "mouse":
	                this._hoverId = id;
	                this._hoverX = x;
	                this._hoverY = y;
	                break;
	            case "pen":
	                this._hoverId = id;
	                this._hoverX = x;
	                this._hoverY = y;
	                this._tiltX = e.tiltX;
	                this._tiltY = e.tiltY;
	                this._twist = e.twist;
	                break;
	        }
	    }
	    _handlePointerUp(e) {
	        const manipulator = this._manipulators[e.pointerId];
	        if (manipulator) {
	            manipulator.event = e;
	        }
	        this._remove(e.pointerId);
	    }
	    _handlePointerCancel(e) {
	        this._remove(e.pointerId);
	    }
	    _handlePointerLeave(e) {
	        this._resetHover();
	        this._remove(e.pointerId);
	    }
	    _handlePointerOut(e) {
	        this._resetHover();
	        this._remove(e.pointerId);
	    }
	    _resetHover() {
	        this._hoverId = null;
	        this._hoverX = null;
	        this._hoverY = null;
	    }
	    _remove(pointerId) {
	        const manipulator = this._manipulators[pointerId];
	        if (manipulator) {
	            delete this._manipulators[pointerId];
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class AnimationHelper {
	    static smoothStep(value) {
	        return value * value * (3 - 2 * value);
	    }
	    static damp(value, target, threshold, dampening) {
	        if (Math.abs(target) < threshold) {
	            return MathHelper.lerp(value, 0, dampening);
	        }
	        else {
	            return MathHelper.lerp(value, target, dampening);
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Keyboard {
	    constructor(core) {
	        this._core = core;
	        this._pressedKeys = new Set();
	        this._previousPressedKeys = new Set();
	    }
	    initialize(element) {
	        element.addEventListener("keydown", (e) => { this._handleKeyDown(e); }, false);
	        element.addEventListener("keyup", (e) => { this._handleKeyUp(e); }, false);
	    }
	    update(elapsedTime) {
	        if (this._core.config.isDebugVisible) {
	            this._core.debugText.addLine(`key tot  ${this._pressedKeys.size}`);
	        }
	    }
	    isKeyDown(key) {
	        return this._pressedKeys.has(key);
	    }
	    wasKeyReleased(key) {
	        if (this._pressedKeys.has(key)) {
	            if (!this._previousPressedKeys.has(key)) {
	                this._previousPressedKeys.add(key);
	                return true;
	            }
	        }
	        else {
	            this._previousPressedKeys.delete(key);
	        }
	        return false;
	    }
	    _handleKeyDown(e) {
	        const keyboardEvent = e;
	        const key = keyboardEvent.key;
	        if (!this._pressedKeys.has(key)) {
	            this._pressedKeys.add(key);
	        }
	    }
	    _handleKeyUp(e) {
	        const keyboardEvent = e;
	        const key = keyboardEvent.key;
	        if (this._pressedKeys.has(key)) {
	            this._pressedKeys.delete(key);
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Manager {
	    constructor(core) {
	        this._manipulators = {};
	        this._core = core;
	        this._vec3 = create$3();
	        this._manipulationProcessor = new ManipulationProcessor(core);
	        this._manipulators = {};
	        this._pointers = new Pointers(core, this._manipulators);
	        this._pointers.initialize(core.container);
	        this._mouseWheel = new MouseWheel(core);
	        this._mouseWheel.initialize(core.container);
	        this._keyboard = new Keyboard(core);
	        this._keyboard.initialize(core.container);
	        this.isPickingEnabled = true;
	        this.mouseWheelZoomScale = this._core.config.mouseWheelZoomScale;
	        this.mouseWheelRotationScale = this._core.config.mouseWheelRotationScale;
	        this.multiTouchZoomScale = this._core.config.multiTouchZoomScale;
	        this.pickHoldDelay = this._core.config.pickHoldDelay;
	        this.pickSelectDelay = this._core.config.pickSelectDelay;
	        const rightButton = 2;
	        this.singleTouchAction = (manipulator) => {
	            if ((manipulator.type == "mouse" && manipulator.button == rightButton) || manipulator.shiftKey || manipulator.ctrlKey) {
	                return SingleTouchAction.translate;
	            }
	            else if (manipulator.altKey || (manipulator.type == "pen" && manipulator.button == rightButton)) {
	                return SingleTouchAction.lasso;
	            }
	            else {
	                return SingleTouchAction.rotate;
	            }
	        };
	        this.mouseWheelAction = (keyboard) => {
	            if (this._keyboard.isKeyDown("Control")) {
	                return MouseWheelAction.rotateY;
	            }
	            else {
	                return MouseWheelAction.zoom;
	            }
	        };
	        this.lassoPickType = PickType.data;
	        this._thumbstickX = 0;
	        this._previousControllerButtonPressed = [false, false, false, false];
	        this._quat0 = create$1();
	        this._quat1 = create$1();
	    }
	    update(elapsedTime, xrFrame) {
	        if (xrFrame) {
	            const inputSources = this._core.webXRSession.inputSources;
	            if (inputSources.length > 0 && this._core.renderer.controllers.length > 0) {
	                const inputSource = inputSources[0];
	                const controllerVisual = this._core.renderer.controllers[0];
	                if (inputSource.gripSpace && inputSource.targetRayMode == "tracked-pointer") {
	                    const gripPose = xrFrame.getPose(inputSource.gripSpace, this._core.renderer.webXRReferenceSpace);
	                    if (gripPose) {
	                        controllerVisual.mMatrix = gripPose.transform.matrix;
	                    }
	                    const gamepad = inputSource.gamepad;
	                    this._core.renderer.isPickingEnabled = false;
	                    const rayPose = xrFrame.getPose(inputSource.targetRaySpace, this._core.renderer.webXRReferenceSpace);
	                    if (rayPose) {
	                        controllerVisual.rayMMatrix = rayPose.transform.matrix;
	                        if (gamepad.buttons[0].value > 0 && this.isPickingEnabled) {
	                            this._core.renderer.pickVMatrix = rayPose.transform.inverse.matrix;
	                            this._core.renderer.isPickingEnabled = true;
	                        }
	                    }
	                    const threshold = 0.2;
	                    const dampening = Math.min(0.015 * elapsedTime, 1);
	                    this._thumbstickX = AnimationHelper.damp(this._thumbstickX, gamepad.axes[2], threshold, dampening);
	                    if (this._thumbstickX != 0) {
	                        setAxisAngle(this._quat0, Constants.VECTOR3_UNITY, 0.01 * this._thumbstickX * elapsedTime);
	                        this._core.getModelRotation(this._quat1);
	                        multiply(this._quat1, this._quat0, this._quat1);
	                        this._core.setModelRotation(this._quat1, true);
	                    }
	                    if (gamepad.buttons[2].pressed) {
	                        if (!this._previousControllerButtonPressed[2]) {
	                            this._previousControllerButtonPressed[2] = true;
	                            if (this.controllerButtonPressedCallback) {
	                                this.controllerButtonPressedCallback(2);
	                            }
	                        }
	                    }
	                    else {
	                        this._previousControllerButtonPressed[2] = false;
	                    }
	                }
	            }
	        }
	        else {
	            const camera = this._core.camera;
	            this._manipulationProcessor.update(elapsedTime, this._manipulators);
	            this._pointers.update(elapsedTime);
	            this._mouseWheel.update(elapsedTime);
	            this._keyboard.update(elapsedTime);
	            if (this._mouseWheel.delta != 0) {
	                switch (this.mouseWheelAction(this._keyboard)) {
	                    case MouseWheelAction.zoom:
	                        if (this._pointers.hoverX, this._pointers.hoverY) {
	                            camera.zoom(this._mouseWheel.delta * this.mouseWheelZoomScale, this._pointers.hoverX, this._pointers.hoverY);
	                        }
	                        break;
	                    case MouseWheelAction.rotateY:
	                        setAxisAngle(this._quat0, Constants.VECTOR3_UNITY, this._mouseWheel.delta * this.mouseWheelRotationScale);
	                        camera.getOrbit(this._quat1);
	                        multiply(this._quat1, this._quat1, this._quat0);
	                        camera.setOrbit(this._quat1, true);
	                        break;
	                }
	            }
	            const count = this._manipulationProcessor.count;
	            if (count == 0) {
	                if (this._isLassoPicking) {
	                    this._isLassoPicking = false;
	                    this._core.renderer.isLassoPicking = false;
	                    const x0 = Math.min(this._lassoX0, this._lassoX1);
	                    const y0 = Math.min(this._lassoY0, this._lassoY1);
	                    const x1 = Math.max(this._lassoX0, this._lassoX1);
	                    const y1 = Math.max(this._lassoY0, this._lassoY1);
	                    if (x1 - x0 > 0 && y1 - y0 > 0) {
	                        const sets = this._core.pickLasso(x0, y0, x1, y1, this.lassoPickType);
	                        const result = {
	                            x0: x0,
	                            y0: y0,
	                            x1: x1,
	                            y1: y1,
	                            pickType: this.lassoPickType,
	                            ids: sets,
	                            manipulator: this._manipulator,
	                        };
	                        this.pickLassoCallback(result);
	                    }
	                }
	            }
	            else if (count == 1) {
	                const translationDelta = this._manipulationProcessor.translationDelta;
	                if (translationDelta[0] != 0 || translationDelta[1] != 0) {
	                    const manipulators = this._manipulationProcessor.manipulators;
	                    for (const key in manipulators) {
	                        const manipulator = manipulators[key];
	                        switch (this.singleTouchAction(manipulator)) {
	                            case SingleTouchAction.rotate:
	                                camera.rotate(translationDelta);
	                                break;
	                            case SingleTouchAction.translate:
	                                camera.translate(translationDelta);
	                                break;
	                            case SingleTouchAction.lasso:
	                                if (this.pickLassoCallback) {
	                                    if (!this._isLassoPicking) {
	                                        this._isLassoPicking = true;
	                                        this._core.renderer.isLassoPicking = true;
	                                        this._lassoX0 = manipulator.position[0];
	                                        this._lassoY0 = manipulator.position[1];
	                                    }
	                                    this._lassoX1 = manipulator.position[0];
	                                    this._lassoY1 = manipulator.position[1];
	                                    this._core.renderer.lassoX0 = Math.min(this._lassoX0, this._lassoX1);
	                                    this._core.renderer.lassoY0 = Math.min(this._lassoY0, this._lassoY1);
	                                    this._core.renderer.lassoX1 = Math.max(this._lassoX0, this._lassoX1);
	                                    this._core.renderer.lassoY1 = Math.max(this._lassoY0, this._lassoY1);
	                                }
	                                break;
	                        }
	                        break;
	                    }
	                }
	            }
	            else {
	                const translationDelta = this._manipulationProcessor.translationDelta;
	                const camera = this._core.camera;
	                if (translationDelta[0] != 0 || translationDelta[1] != 0) {
	                    camera.translate(translationDelta);
	                }
	                if (this._manipulationProcessor.scaleDelta != 0) {
	                    const distance = this._manipulationProcessor.scaleDelta * this.multiTouchZoomScale;
	                    camera.zoom(distance, this._manipulationProcessor.centroid[0], this._manipulationProcessor.centroid[1]);
	                }
	                if (this._manipulationProcessor.twistDelta != 0) {
	                    camera.twist(this._manipulationProcessor.twistDelta, this._manipulationProcessor.centroid[0], this._manipulationProcessor.centroid[1]);
	                }
	            }
	            if (this.isPickingEnabled && !this._manipulationProcessor.isDragging && !this._isLassoPicking) {
	                const camera = this._core.camera;
	                const renderer = this._core.renderer;
	                if (renderer.isCapturingPickImage) {
	                    camera.updatePickVMatrix(renderer.width / 2, renderer.height / 2);
	                    renderer.pickVMatrix = camera.pickVMatrix;
	                    renderer.isPickingEnabled = true;
	                    this._pickedTime = 0;
	                }
	                else if (this._pointers.hoverId > -1) {
	                    const pickingX = this._pointers.hoverX;
	                    const pickingY = this._pointers.hoverY;
	                    camera.updatePickVMatrix(pickingX, pickingY);
	                    renderer.pickVMatrix = camera.pickVMatrix;
	                    renderer.isPickingEnabled = true;
	                    if (this._pickedId != renderer.pickedId) {
	                        this._pickedId = renderer.pickedId;
	                        this._pickedTime = 0;
	                    }
	                    else {
	                        if (this._manipulationProcessor.count == 1) {
	                            this._pickedTime += elapsedTime;
	                            for (const key in this._manipulators) {
	                                this._manipulator = this._manipulators[key];
	                                break;
	                            }
	                        }
	                    }
	                    if (this._pickedTime > 0) {
	                        switch (renderer.pickedType) {
	                            case PickType.data:
	                                if (this._pickedTime > this.pickHoldDelay) {
	                                    renderer.getVertexPosition(this._vec3, this._pickedId);
	                                    this._core.setModelManipulationOrigin(this._vec3);
	                                    this._pickedTime = 0;
	                                }
	                                else if (this._manipulationProcessor.count == 0) {
	                                    if (this._pickedTime > this.pickSelectDelay) {
	                                        for (let i = 0; i < renderer.transitionBuffers.length; i++) {
	                                            const transitionBuffer = renderer.transitionBuffers[i];
	                                            const id = transitionBuffer.pickIdLookup[this._pickedId];
	                                            if (id > -1) {
	                                                const result = {
	                                                    transitionBuffer: i,
	                                                    id: id,
	                                                    manipulator: this._manipulator,
	                                                };
	                                                this._core.log.write(LogLevel.info, `picked id ${result.id}, transition buffer ${i}`);
	                                                if (this.pickItemCallback) {
	                                                    this.pickItemCallback(result);
	                                                }
	                                                break;
	                                            }
	                                        }
	                                    }
	                                    this._pickedTime = 0;
	                                }
	                                break;
	                            case PickType.label:
	                                if (this._manipulationProcessor.count == 0) {
	                                    if (this._pickedTime > this.pickSelectDelay) {
	                                        for (let i = 0; i < renderer.labelSets.length; i++) {
	                                            const labelSet = renderer.labelSets[i].label;
	                                            const id = labelSet.pickIdLookup[this._pickedId];
	                                            if (id > -1) {
	                                                const result = {
	                                                    label: id,
	                                                    set: i,
	                                                    manipulator: this._manipulator,
	                                                };
	                                                this._core.log.write(LogLevel.info, `picked label ${result.label}, set ${result.set}`);
	                                                if (this.pickLabelSetCallback) {
	                                                    this.pickLabelSetCallback(result);
	                                                }
	                                                break;
	                                            }
	                                        }
	                                    }
	                                    this._pickedTime = 0;
	                                }
	                                break;
	                            case PickType.axesDivision:
	                                if (this._manipulationProcessor.count == 0) {
	                                    if (this._pickedTime > this.pickSelectDelay) {
	                                        for (let i = 0; i < renderer.currentAxes.length; i++) {
	                                            const axes = renderer.currentAxes[i].axes;
	                                            const id = axes.pickGridLookup[this._pickedId];
	                                            if (id > -1) {
	                                                const result = axes.pickGrid(id);
	                                                result.axes = i;
	                                                result.manipulator = this._manipulator;
	                                                this._core.log.write(LogLevel.info, `picked division (${result.divisionX}, ${result.divisionY}, ${result.divisionZ}), axes ${result.axes}`);
	                                                if (this.pickAxesGridCallback) {
	                                                    this.pickAxesGridCallback(result);
	                                                }
	                                                break;
	                                            }
	                                        }
	                                    }
	                                    this._pickedTime = 0;
	                                }
	                                break;
	                            case PickType.axesTitle:
	                                if (this._manipulationProcessor.count == 0) {
	                                    if (this._pickedTime > this.pickSelectDelay) {
	                                        for (let i = 0; i < renderer.currentAxes.length; i++) {
	                                            const axes = renderer.currentAxes[i].axes;
	                                            const id = axes.pickTitleLookup[this._pickedId];
	                                            if (id > -1) {
	                                                const result = axes.pickTitle(id);
	                                                result.axes = i;
	                                                result.manipulator = this._manipulator;
	                                                this._core.log.write(LogLevel.info, `picked title ${result.axis}, axes ${result.axes}`);
	                                                if (this.pickAxesTitleCallback) {
	                                                    this.pickAxesTitleCallback(result);
	                                                }
	                                                break;
	                                            }
	                                        }
	                                    }
	                                    this._pickedTime = 0;
	                                }
	                                break;
	                            case PickType.axesLabel:
	                                if (this._manipulationProcessor.count == 0) {
	                                    if (this._pickedTime > this.pickSelectDelay) {
	                                        for (let i = 0; i < renderer.currentAxes.length; i++) {
	                                            const axes = renderer.currentAxes[i].axes;
	                                            const id = axes.pickLabelLookup[this._pickedId];
	                                            if (id > -1) {
	                                                const result = axes.pickLabel(id);
	                                                result.axes = i;
	                                                result.manipulator = this._manipulator;
	                                                this._core.log.write(LogLevel.info, `picked label ${result.label}, axis ${result.axis}, axes ${result.axes}`);
	                                                if (this.pickAxesLabelCallback) {
	                                                    this.pickAxesLabelCallback(result);
	                                                }
	                                                break;
	                                            }
	                                        }
	                                    }
	                                    this._pickedTime = 0;
	                                }
	                                break;
	                            case PickType.axesHeading:
	                                if (this._manipulationProcessor.count == 0) {
	                                    if (this._pickedTime > this.pickSelectDelay) {
	                                        for (let i = 0; i < renderer.currentAxes.length; i++) {
	                                            const axes = renderer.currentAxes[i].axes;
	                                            const id = axes.pickHeadingLookup[this._pickedId];
	                                            if (id > -1) {
	                                                const result = axes.pickHeading(id);
	                                                result.axes = i;
	                                                result.manipulator = this._manipulator;
	                                                this._core.log.write(LogLevel.info, `picked heading ${result.axis}, axes ${result.axes}`);
	                                                if (this.pickAxesHeadingCallback) {
	                                                    this.pickAxesHeadingCallback(result);
	                                                }
	                                                break;
	                                            }
	                                        }
	                                    }
	                                    this._pickedTime = 0;
	                                }
	                                break;
	                        }
	                    }
	                }
	                else {
	                    renderer.isPickingEnabled = false;
	                    this._pickedTime = 0;
	                }
	            }
	            else {
	                this._core.renderer.isPickingEnabled = false;
	                this._pickedTime = 0;
	            }
	        }
	        if (this._core.config.isDebugVisible) {
	            this._core.debugText.addLine(`man tot  ${this._manipulationProcessor.count}`);
	            this._core.debugText.addLine(`pck key  ${this._core.renderer.pickedId}`);
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Log {
	    constructor(core) {
	        this._core = core;
	    }
	    write(level, value) {
	        if (level >= this._core.config.logLevel) {
	            switch (level) {
	                case LogLevel.trace:
	                    console.trace(value);
	                    break;
	                case LogLevel.debug:
	                    console.debug(value);
	                    break;
	                case LogLevel.info:
	                    console.info(value);
	                    break;
	                case LogLevel.warn:
	                    console.warn(value);
	                    break;
	                case LogLevel.error:
	                    console.error(value);
	                    break;
	            }
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	class Core {
	    get container() { return this._container; }
	    get started() { return this._started; }
	    get debugText() { return this._debugText; }
	    get log() { return this._log; }
	    get totalFrames() { return this._fps.totalFrames; }
	    get camera() { return this._camera; }
	    set camera(value) { this._camera = value; }
	    getModelRotation(value) { copy$1(value, this._modelRotation); }
	    setModelRotation(value, isSmooth) {
	        copy$1(this._modelRotation, value);
	        if (!isSmooth) {
	            copy$1(this._smoothedModelRotation, this._modelRotation);
	        }
	    }
	    getModelScale() { return this._modelScale[0]; }
	    setModelScale(value, isSmooth) {
	        set$3(this._modelScale, value, value, value);
	        if (!isSmooth) {
	            copy$3(this._smoothedModelScale, this._modelScale);
	        }
	    }
	    getModelManipulationOrigin(value) { copy$3(value, this._modelManipulationOrigin); }
	    setModelManipulationOrigin(value) { this._updateManipulationOrigin(value); }
	    getModelPosition(value) { copy$3(value, this._modelPosition); }
	    setModelPosition(value, isSmooth) {
	        copy$3(this._modelPosition, value);
	        if (!isSmooth) {
	            copy$3(this._smoothedModelPosition, this._modelPosition);
	        }
	    }
	    get webXRSession() { return this._webXRSession; }
	    get renderer() { return this._renderer; }
	    set renderer(renderer) {
	        if (this._renderer == renderer) {
	            return;
	        }
	        if (this._renderer) {
	            this.stop();
	            this._renderer.remove();
	        }
	        if (!renderer.isInitialized) {
	            renderer.initialize(this);
	        }
	        if (this._renderer) {
	            renderer.transitionTime = this._renderer.transitionTime;
	            for (let i = 0; i < this._renderer.transitionBuffers.length; i++) {
	                const previousTransitionBuffer = this._renderer.transitionBuffers[i];
	                const transitionBuffer = renderer.createTransitionBuffer(previousTransitionBuffer.currentBuffer.ids);
	                transitionBuffer.copyFrom(previousTransitionBuffer);
	                renderer.transitionBuffers.push(transitionBuffer);
	            }
	            const currentAxes = this._renderer.currentAxes;
	            if (currentAxes) {
	                renderer.currentAxes = [];
	                for (let i = 0; i < currentAxes.length; i++) {
	                    const axesVisual = currentAxes[i];
	                    const axes = axesVisual.axes;
	                    if (axes instanceof Cartesian3dAxes) {
	                        const cartesian3dAxesVisual = renderer.createCartesian3dAxesVisual(axes);
	                        renderer.currentAxes.push(cartesian3dAxesVisual);
	                    }
	                    else if (axes instanceof Cartesian2dAxes) {
	                        renderer.currentAxes.push(renderer.createCartesian2dAxesVisual(axes));
	                    }
	                }
	            }
	            const labelSets = this._renderer.labelSets;
	            if (labelSets) {
	                renderer.labelSets = [];
	                for (let i = 0; i < labelSets.length; i++) {
	                    renderer.labelSets.push(renderer.createLabelSetVisual(labelSets[i].label));
	                }
	            }
	            const images = this._renderer.images;
	            if (images) {
	                renderer.images = [];
	                for (let i = 0; i < images.length; i++) {
	                    renderer.images.push(renderer.createImageVisual(images[i].image));
	                }
	            }
	            const fonts = this._renderer.fonts;
	            if (fonts) {
	                for (const key in fonts) {
	                    const font = fonts[key].font;
	                    renderer.fonts[font.name] = renderer.createFontVisual(font);
	                }
	            }
	        }
	        else {
	            renderer.fonts[this._font.name] = renderer.createFontVisual(this._font);
	        }
	        if (this._renderer) {
	            this._renderer.finalize();
	        }
	        this._renderer = renderer;
	        this._fps.reset();
	        this.start();
	    }
	    get font() { return this._font; }
	    get paletteResources() { return this._paletteResources; }
	    get config() { return this._config; }
	    get inputManager() { return this._inputManager; }
	    constructor(options) {
	        setMatrixArrayType(Array);
	        this._vec3 = create$3();
	        this._quat = create$1();
	        this._mat4 = create$4();
	        this._container = options && options.container ? options.container : document.body;
	        this._config = new Config$2(this);
	        this._log = new Log(this);
	        this._debugText = new DebugText();
	        this._inputManager = (options && options.useInputManager === false) ? null : new Manager(this);
	        const fontRasterizerOptions = options && options.fontRasterizerOptions ? options.fontRasterizerOptions : {
	            fontAtlas: new FontAtlas(256, 512),
	            fontSize: 24,
	            border: 3,
	            fontFamily: "\"segoe ui semibold\", sans-serif",
	            fontWeight: "normal",
	            fontStyle: "normal",
	            baseline: "alphabetic",
	            maxDistance: 8,
	            edgeValue: 0xc0,
	        };
	        const fontRasterizer = new FontRasterizer(this, fontRasterizerOptions);
	        this._font = fontRasterizer.font;
	        this._paletteResources = new PaletteResources();
	        this._previousTime = 0;
	        this._fps = new Fps(this);
	        this._modelMMatrix = create$4();
	        this._modelPosition = create$3();
	        this._modelRotation = create$1();
	        this._modelScale = create$3();
	        this._smoothedModelPosition = create$3();
	        this._smoothedModelRotation = create$1();
	        this._smoothedModelScale = create$3();
	        this._modelManipulationOrigin = create$3();
	        this._camera = new AltAzimuthCamera(this);
	        this.resetModel(false);
	    }
	    getView(view) {
	        this.getModelPosition(view.position);
	        this.getModelRotation(view.rotation);
	        view.scale = this.getModelScale();
	    }
	    setView(view, isSmooth) {
	        this.setModelPosition(view.position, isSmooth);
	        this.setModelRotation(view.rotation, isSmooth);
	        this.setModelScale(view.scale, isSmooth);
	    }
	    lerpView(from, to, time) {
	        lerp(this._vec3, from.position, to.position, time);
	        this.setModelPosition(this._vec3, false);
	        slerp(this._quat, from.rotation, to.rotation, time);
	        this.setModelRotation(this._quat, false);
	        this.setModelScale(MathHelper.lerp(from.scale, to.scale, time), false);
	    }
	    resetModel(isSmooth) {
	        set$3(this._modelPosition, 0, 0, -this._config.modelDistance);
	        set$3(this._modelScale, this._config.modelSize, this._config.modelSize, this._config.modelSize);
	        set$1(this._modelRotation, 0, 0, 0, 1);
	        if (!isSmooth) {
	            this._syncSmooth();
	        }
	    }
	    resetManipulationOrigin() {
	        if (!exactEquals$1(this._modelManipulationOrigin, Constants.VECTOR3_ZERO)) {
	            this._updateManipulationOrigin(Constants.VECTOR3_ZERO);
	        }
	    }
	    reset(isSmooth) {
	        this.resetModel(isSmooth);
	        this.resetManipulationOrigin();
	        this._camera.reset(isSmooth);
	    }
	    start() {
	        if (!this._started && this._renderer) {
	            this._windowAnimationFrame = window.requestAnimationFrame((currentTime) => this._tick(currentTime));
	            this._started = true;
	            this._log.write(LogLevel.info, "render loop started");
	            if (this.startCallback) {
	                this.startCallback();
	            }
	        }
	    }
	    stop() {
	        if (this._started) {
	            this._started = false;
	            if (this._windowAnimationFrame != null) {
	                window.cancelAnimationFrame(this._windowAnimationFrame);
	                this._windowAnimationFrame = null;
	                this._log.write(LogLevel.info, "render loop stopped");
	            }
	            if (this.stopCallback) {
	                this.stopCallback();
	            }
	        }
	    }
	    checkWebXRSupport() {
	        const xrSystem = navigator.xr;
	        if (xrSystem) {
	            xrSystem.isSessionSupported("immersive-vr").then((supported) => {
	                if (supported) {
	                    this._log.write(LogLevel.info, "WebXR supported");
	                    if (this.webXRSupportedCallback) {
	                        this.webXRSupportedCallback();
	                    }
	                }
	            });
	        }
	    }
	    requestWebXRSession() {
	        if (this._webXRSession) {
	            this._webXRSession.end();
	        }
	        else {
	            navigator.xr.requestSession("immersive-vr").then((session) => this._webXRSessionStarted(session));
	        }
	    }
	    _webXRSessionStarted(session) {
	        if (this.webXRSessionStartedCallback) {
	            this.webXRSessionStartedCallback();
	        }
	        this._webXRSession = session;
	        session.onend = () => this._webXRSessionEnded();
	        this._renderer.initializeWebXR(session).then(() => {
	            if (this._windowAnimationFrame) {
	                window.cancelAnimationFrame(this._windowAnimationFrame);
	                this._windowAnimationFrame = null;
	            }
	            session.requestAnimationFrame((currentTime, xrframe) => this._tick(currentTime, xrframe));
	        });
	        session.oninputsourceschange = (event) => this._webXRInputSourcesChanged(event);
	    }
	    _webXRSessionEnded() {
	        if (this.webXRSessionEndedCallback) {
	            this.webXRSessionEndedCallback();
	        }
	        this._webXRSession = null;
	        this._renderer.controllers.length = 0;
	        this.start();
	    }
	    _webXRInputSourcesChanged(event) {
	        if (event.added.length > 0) {
	            const added = event.added[0];
	            if (added.targetRayMode == "tracked-pointer") {
	                const profiles = added.profiles;
	                const handedness = added.handedness;
	                if (this.webXRInputSourceRequestCallback) {
	                    this.webXRInputSourceRequestCallback(profiles, handedness, (response) => {
	                        const options = {
	                            profiles: profiles,
	                            handedness: handedness,
	                            obj: response.obj,
	                            texture: response.texture,
	                        };
	                        const controller = new Controller(this, options);
	                        this.renderer.controllers.push(this.renderer.createControllerVisual(controller));
	                    }, (e) => {
	                        this._log.write(LogLevel.error, e);
	                    });
	                }
	                else {
	                    const options = {};
	                    const controller = new Controller(this, options);
	                    this.renderer.controllers.push(this.renderer.createControllerVisual(controller));
	                }
	            }
	        }
	        if (event.removed.length > 0) {
	            this.renderer.controllers.length = 0;
	        }
	    }
	    _tick(currentTime, xrFrame) {
	        return __awaiter$3(this, void 0, void 0, function* () {
	            let elapsedTime = currentTime - this._previousTime;
	            this._previousTime = currentTime;
	            if (elapsedTime > 0) {
	                this.update(elapsedTime, xrFrame);
	                yield this.render(elapsedTime, xrFrame);
	            }
	            if (xrFrame) {
	                xrFrame.session.requestAnimationFrame((currentTime, xrframe) => this._tick(currentTime, xrframe));
	            }
	            else if (this._started) {
	                this._windowAnimationFrame = window.requestAnimationFrame((currentTime) => this._tick(currentTime));
	            }
	        });
	    }
	    update(elapsedTime, xrFrame) {
	        this._renderer.setSize(elapsedTime);
	        if (this.updateCallback) {
	            this.updateCallback(elapsedTime, xrFrame);
	        }
	        if (this._config.isDebugVisible) {
	            this._debugText.clear();
	        }
	        this._fps.update(elapsedTime);
	        if (this._inputManager) {
	            this._inputManager.isPickingEnabled = this._config.isTransitionPickingEnabled || this._renderer.transitionTime == 1;
	            this._inputManager.update(elapsedTime, xrFrame);
	        }
	        let amount = Math.min(elapsedTime * this._config.positionSmoothing, 1);
	        lerp(this._smoothedModelPosition, this._smoothedModelPosition, this._modelPosition, amount);
	        amount = Math.min(elapsedTime * this._config.rotationSmoothing, 1);
	        slerp(this._smoothedModelRotation, this._smoothedModelRotation, this._modelRotation, amount);
	        amount = Math.min(elapsedTime * this._config.scaleSmoothing, 1);
	        lerp(this._smoothedModelScale, this._smoothedModelScale, this._modelScale, amount);
	        fromRotationTranslationScaleOrigin(this._modelMMatrix, this._smoothedModelRotation, this._smoothedModelPosition, this._smoothedModelScale, this._modelManipulationOrigin);
	        this._renderer.mMatrix = this._modelMMatrix;
	        if (this._config.isDebugVisible) {
	            this._debugText.addLine(`mod pos ${this._smoothedModelPosition[0] < 0 ? "" : " "}${this._smoothedModelPosition[0].toFixed(3)},${this._smoothedModelPosition[1] < 0 ? "" : " "}${this._smoothedModelPosition[1].toFixed(3)},${this._smoothedModelPosition[2] < 0 ? "" : " "}${this._smoothedModelPosition[2].toFixed(3)}`);
	            this._debugText.addLine(`mod rot ${this._smoothedModelRotation[0] < 0 ? "" : " "}${this._smoothedModelRotation[0].toFixed(3)},${this._smoothedModelRotation[1] < 0 ? "" : " "}${this._smoothedModelRotation[1].toFixed(3)},${this._smoothedModelRotation[2] < 0 ? "" : " "}${this._smoothedModelRotation[2].toFixed(3)},${this._smoothedModelRotation[3] < 0 ? "" : " "}${this._smoothedModelRotation[3].toFixed(3)}`);
	            this._debugText.addLine(`mod siz  ${this._smoothedModelScale[0].toFixed(3)}`);
	            this._debugText.addLine(`man ori ${this._modelManipulationOrigin[0] < 0 ? "" : " "}${this._modelManipulationOrigin[0].toFixed(3)},${this._modelManipulationOrigin[1] < 0 ? "" : " "}${this._modelManipulationOrigin[1].toFixed(3)},${this._modelManipulationOrigin[2] < 0 ? "" : " "}${this._modelManipulationOrigin[2].toFixed(3)}`);
	            this._debugText.addLine(`scr dst  ${this._config.screenDistance.toFixed(3)}`);
	            this._debugText.addLine(`cam fov  ${Math.round(AngleHelper.radiansToDegrees(this._config.fov))}`);
	            this._debugText.addLine(`tbf tot  ${this._renderer.transitionBuffers.length}`);
	        }
	        if (!xrFrame) {
	            this._camera.width = this._renderer.width;
	            this._camera.height = this._renderer.height;
	            this._camera.modelMMatrix = this._modelMMatrix;
	            this._camera.modelPosition = this._smoothedModelPosition;
	            this._camera.modelRotation = this._smoothedModelRotation;
	            this._camera.modelScale = this._smoothedModelScale;
	            this._camera.modelManipulationOrigin = this._modelManipulationOrigin;
	            this._camera.update(elapsedTime);
	            this._renderer.vMatrices = this._camera.vMatrices;
	            this._renderer.mvMatrices = this._camera.mvMatrices;
	            this._renderer.pMatrices = this._camera.pMatrices;
	            this._renderer.inverseVMatrices = this._camera.inverseVMatrices;
	            this._renderer.inversePMatrices = this._camera.inversePMatrices;
	        }
	        this._renderer.prepare(xrFrame);
	        if (!xrFrame && this._config.stereoMode == StereoMode.none) {
	            this._renderer.pickPMatrix = this._camera.pMatrices[0];
	        }
	        else {
	            const fov = MatrixHelper.fieldOfViewFromProjectionMatrix(this._renderer.pMatrices[0]);
	            perspective(this._mat4, fov, this._renderer.width / this._renderer.height, this._config.nearPlane, this._config.farPlane);
	            this._renderer.pickPMatrix = this._mat4;
	        }
	        if (this._renderer.isInitialized) {
	            this._renderer.update(elapsedTime);
	        }
	    }
	    render(elapsedTime, xrFrame) {
	        return __awaiter$3(this, void 0, void 0, function* () {
	            this._fps.render();
	            if (this._renderer.isInitialized) {
	                yield this._renderer.render(elapsedTime, xrFrame);
	                if (this.afterRenderCallback) {
	                    this.afterRenderCallback();
	                }
	            }
	        });
	    }
	    _syncSmooth() {
	        copy$3(this._smoothedModelPosition, this._modelPosition);
	        copy$3(this._smoothedModelScale, this._modelScale);
	        copy$1(this._smoothedModelRotation, this._modelRotation);
	    }
	    _updateManipulationOrigin(position) {
	        this._log.write(LogLevel.info, `manipulation origin ${position[0].toFixed(3)},${position[1].toFixed(3)},${position[2].toFixed(3)}`);
	        this._camera.updateModelManipulationOrigin(this._modelManipulationOrigin, position);
	        copy$3(this._modelManipulationOrigin, position);
	        transformMat4$2(this._vec3, this._modelManipulationOrigin, this._modelMMatrix);
	        subtract(this._modelPosition, this._vec3, this._modelManipulationOrigin);
	        copy$3(this._smoothedModelPosition, this._modelPosition);
	        if (this.manipulationOriginChangedCallback) {
	            const result = {
	                x: position[0],
	                y: position[1],
	                z: position[2],
	            };
	            this.manipulationOriginChangedCallback(result);
	        }
	    }
	    pickLasso(x0, y0, x1, y1, pickType) {
	        const inverseMMatrix = create$4();
	        invert(inverseMMatrix, this._modelMMatrix);
	        const sets = [];
	        const nearPositions = [create$3(), create$3(), create$3(), create$3()];
	        const farPositions = [create$3(), create$3(), create$3(), create$3()];
	        const directions = [create$3(), create$3(), create$3(), create$3()];
	        this._camera.unproject(nearPositions[0], x0, y1, -1);
	        this._camera.unproject(farPositions[0], x0, y1, 1);
	        this._camera.unproject(nearPositions[1], x1, y1, -1);
	        this._camera.unproject(farPositions[1], x1, y1, 1);
	        this._camera.unproject(nearPositions[2], x1, y0, -1);
	        this._camera.unproject(farPositions[2], x1, y0, 1);
	        this._camera.unproject(nearPositions[3], x0, y0, -1);
	        this._camera.unproject(farPositions[3], x0, y0, 1);
	        for (let i = 0; i < 4; i++) {
	            transformMat4$2(nearPositions[i], nearPositions[i], inverseMMatrix);
	            transformMat4$2(farPositions[i], farPositions[i], inverseMMatrix);
	            subtract(directions[i], farPositions[i], nearPositions[i]);
	            normalize$2(directions[i], directions[i]);
	        }
	        const normals = [create$3(), create$3(), create$3(), create$3()];
	        const d = [];
	        for (let i = 0; i < 4; i++) {
	            cross(normals[i], directions[(i + 1) % 4], directions[i]);
	            normalize$2(normals[i], normals[i]);
	            d.push(-dot(normals[i], nearPositions[i]));
	        }
	        if (pickType == PickType.data) {
	            const translation = create$3();
	            for (let i = 0; i < this._renderer.transitionBuffers.length; i++) {
	                const transitionBuffer = this._renderer.transitionBuffers[i];
	                const set = new Set();
	                if (transitionBuffer.isVisible) {
	                    const start = window.performance.now();
	                    const currentBuffer = transitionBuffer.currentBuffer;
	                    const lookup = currentBuffer.lookup;
	                    for (let j = 0; j < currentBuffer.length; j++) {
	                        const id = currentBuffer.ids[j];
	                        const index = lookup[id];
	                        if (index != null) {
	                            UnitVertex.getTranslation(currentBuffer.dataView, index, translation);
	                            let isInside = true;
	                            for (let k = 0; k < 4; k++) {
	                                let distance = dot(normals[k], translation);
	                                distance += d[k];
	                                if (distance < 0) {
	                                    isInside = false;
	                                    break;
	                                }
	                            }
	                            if (isInside) {
	                                set.add(id);
	                            }
	                        }
	                    }
	                    if (set.size > 0) {
	                        this._log.write(LogLevel.info, `lasso transition buffer ${i} picked ${set.size} ${Math.round(window.performance.now() - start)}ms`);
	                    }
	                }
	                sets.push(set);
	            }
	        }
	        return sets;
	    }
	}
	const StereoMode = {
	    none: "none",
	    split: "split",
	    anaglyph: "anaglyph",
	    left: "left",
	    right: "right",
	};
	const HorizontalAlignment = {
	    left: "left",
	    center: "center",
	    right: "right",
	};
	const VerticalAlignment = {
	    top: "top",
	    center: "center",
	    bottom: "bottom",
	};
	const AxesTextOrientation = {
	    parallel: "parallel",
	    perpendicular: "perpendicular",
	};
	const AxesVisibility = {
	    none: "none",
	    current: "current",
	    previous: "previous",
	};
	const PickType = {
	    none: 0,
	    data: 1,
	    label: 2,
	    axesDivision: 3,
	    axesTitle: 4,
	    axesLabel: 5,
	    axesHeading: 6,
	};
	const Theme = {
	    dark: "dark",
	    light: "light",
	};
	const HighlightMode = {
	    luminance: "luminance",
	    color: "color",
	};
	const UnitType = {
	    block: "block",
	    blockSdf: "blockSdf",
	    boxFrameSdf: "boxFrameSdf",
	    sphere: "sphere",
	    sphereSdf: "sphereSdf",
	    cylinder: "cylinder",
	    cylinderSdf: "cylinderSdf",
	    hexPrism: "hexPrism",
	    hexPrismSdf: "hexPrismSdf",
	    sdf: "sdf",
	    disk: "disk",
	    ringSdf: "ringSdf",
	};
	const SingleTouchAction = {
	    none: "none",
	    translate: "translate",
	    rotate: "rotate",
	    lasso: "lasso",
	};
	const MouseWheelAction = {
	    none: "none",
	    zoom: "zoom",
	    rotateY: "rotateY",
	};
	const LogLevel = {
	    trace: 0,
	    debug: 1,
	    info: 2,
	    warn: 3,
	    error: 4,
	};
	const Edge3D = {
	    topFront: 0,
	    topRight: 1,
	    topBack: 2,
	    topLeft: 3,
	    bottomFront: 4,
	    bottomRight: 5,
	    bottomBack: 6,
	    bottomLeft: 7,
	    frontRight: 8,
	    backRight: 9,
	    backLeft: 10,
	    frontLeft: 11,
	};
	const RenderMode = {
	    color: "color",
	    hdr: "hdr",
	    depth: "depth",
	    normal: "normal",
	    segment: "segment",
	    edge: "edge",
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	fromValues$3(0xc7, 0x15, 0x85);
	fromValues$3(0xff, 0x14, 0x93);
	fromValues$3(0xdb, 0x70, 0x93);
	fromValues$3(0xff, 0x69, 0xb4);
	fromValues$3(0xff, 0xb6, 0xc1);
	fromValues$3(0xff, 0xc0, 0xcb);
	fromValues$3(0x8b, 0x00, 0x00);
	fromValues$3(0xff, 0x00, 0x00);
	fromValues$3(0xb2, 0x22, 0x22);
	fromValues$3(0xdc, 0x14, 0x3c);
	fromValues$3(0xcd, 0x5c, 0x5c);
	fromValues$3(0xf0, 0x80, 0x80);
	fromValues$3(0xfa, 0x80, 0x72);
	fromValues$3(0xe9, 0x96, 0x7a);
	fromValues$3(0xff, 0xa0, 0x7a);
	fromValues$3(0xff, 0x45, 0x00);
	fromValues$3(0xff, 0x63, 0x47);
	fromValues$3(0xff, 0x8c, 0x00);
	fromValues$3(0xff, 0x7f, 0x50);
	fromValues$3(0xff, 0xa5, 0x00);
	fromValues$3(0xbd, 0xb7, 0x6b);
	fromValues$3(0xff, 0xd7, 0x00);
	fromValues$3(0xf0, 0xe6, 0x8c);
	fromValues$3(0xff, 0xda, 0xb9);
	fromValues$3(0xff, 0xff, 0x00);
	fromValues$3(0xee, 0xe8, 0xaa);
	fromValues$3(0xff, 0xe4, 0xb5);
	fromValues$3(0xff, 0xef, 0xd5);
	fromValues$3(0xfa, 0xfa, 0xd2);
	fromValues$3(0xff, 0xfa, 0xcd);
	fromValues$3(0xff, 0xff, 0xe0);
	fromValues$3(0x80, 0x00, 0x00);
	fromValues$3(0xa5, 0x2a, 0x2a);
	fromValues$3(0x8b, 0x45, 0x13);
	fromValues$3(0xa0, 0x52, 0x2d);
	fromValues$3(0xd2, 0x69, 0x1e);
	fromValues$3(0xb8, 0x86, 0x0b);
	fromValues$3(0xcd, 0x85, 0x3f);
	fromValues$3(0xbc, 0x8f, 0x8f);
	fromValues$3(0xda, 0xa5, 0x20);
	fromValues$3(0xf4, 0xa4, 0x60);
	fromValues$3(0xd2, 0xb4, 0x8c);
	fromValues$3(0xde, 0xb8, 0x87);
	fromValues$3(0xf5, 0xde, 0xb3);
	fromValues$3(0xff, 0xde, 0xad);
	fromValues$3(0xff, 0xe4, 0xc4);
	fromValues$3(0xff, 0xeb, 0xcd);
	fromValues$3(0xff, 0xf8, 0xdc);
	fromValues$3(0x00, 0x64, 0x00);
	fromValues$3(0x00, 0x80, 0x00);
	fromValues$3(0x55, 0x6b, 0x2f);
	fromValues$3(0x22, 0x8b, 0x22);
	fromValues$3(0x2e, 0x8b, 0x57);
	fromValues$3(0x80, 0x80, 0x00);
	fromValues$3(0x6b, 0x8e, 0x23);
	fromValues$3(0x3c, 0xb3, 0x71);
	fromValues$3(0x32, 0xcd, 0x32);
	fromValues$3(0x00, 0xff, 0x00);
	fromValues$3(0x00, 0xff, 0x7f);
	fromValues$3(0x00, 0xfa, 0x9a);
	fromValues$3(0x8f, 0xbc, 0x8f);
	fromValues$3(0x66, 0xcd, 0xaa);
	fromValues$3(0x9a, 0xcd, 0x32);
	fromValues$3(0x7c, 0xfc, 0x00);
	fromValues$3(0x7f, 0xff, 0x00);
	fromValues$3(0x90, 0xee, 0x90);
	fromValues$3(0xad, 0xff, 0x2f);
	fromValues$3(0x98, 0xfb, 0x98);
	fromValues$3(0x00, 0x80, 0x80);
	fromValues$3(0x00, 0x8b, 0x8b);
	fromValues$3(0x20, 0xb2, 0xaa);
	fromValues$3(0x5f, 0x9e, 0xa0);
	fromValues$3(0x00, 0xce, 0xd1);
	fromValues$3(0x48, 0xd1, 0xcc);
	fromValues$3(0x40, 0xe0, 0xd0);
	fromValues$3(0x00, 0xff, 0xff);
	fromValues$3(0x00, 0xff, 0xff);
	fromValues$3(0x7f, 0xff, 0xd4);
	fromValues$3(0xaf, 0xee, 0xee);
	fromValues$3(0xe0, 0xff, 0xff);
	fromValues$3(0x00, 0x00, 0x80);
	fromValues$3(0x00, 0x00, 0x8b);
	fromValues$3(0x00, 0x00, 0xcd);
	fromValues$3(0x00, 0x00, 0xff);
	fromValues$3(0x19, 0x19, 0x70);
	fromValues$3(0x41, 0x69, 0xe1);
	fromValues$3(0x46, 0x82, 0xb4);
	fromValues$3(0x1e, 0x90, 0xff);
	fromValues$3(0x00, 0xbf, 0xff);
	fromValues$3(0x64, 0x95, 0xed);
	fromValues$3(0x87, 0xce, 0xeb);
	fromValues$3(0x87, 0xce, 0xfa);
	fromValues$3(0xb0, 0xc4, 0xde);
	fromValues$3(0xad, 0xd8, 0xe6);
	fromValues$3(0xb0, 0xe0, 0xe6);
	fromValues$3(0x4b, 0x00, 0x82);
	fromValues$3(0x80, 0x00, 0x80);
	fromValues$3(0x8b, 0x00, 0x8b);
	fromValues$3(0x94, 0x00, 0xd3);
	fromValues$3(0x48, 0x3d, 0x8b);
	fromValues$3(0x8a, 0x2b, 0xe2);
	fromValues$3(0x99, 0x32, 0xcc);
	fromValues$3(0xff, 0x00, 0xff);
	fromValues$3(0xff, 0x00, 0xff);
	fromValues$3(0x6a, 0x5a, 0xcd);
	fromValues$3(0x7b, 0x68, 0xee);
	fromValues$3(0xba, 0x55, 0xd3);
	fromValues$3(0x93, 0x70, 0xdb);
	fromValues$3(0xda, 0x70, 0xd6);
	fromValues$3(0xee, 0x82, 0xee);
	fromValues$3(0xdd, 0xa0, 0xdd);
	fromValues$3(0xd8, 0xbf, 0xd8);
	fromValues$3(0xe6, 0xe6, 0xfa);
	fromValues$3(0xff, 0xe4, 0xe1);
	fromValues$3(0xfa, 0xeb, 0xd7);
	fromValues$3(0xfa, 0xf0, 0xe6);
	fromValues$3(0xf5, 0xf5, 0xdc);
	fromValues$3(0xf5, 0xf5, 0xf5);
	fromValues$3(0xff, 0xf0, 0xf5);
	fromValues$3(0xfd, 0xf5, 0xe6);
	fromValues$3(0xf0, 0xf8, 0xff);
	fromValues$3(0xff, 0xf5, 0xee);
	fromValues$3(0xf8, 0xf8, 0xff);
	fromValues$3(0xf0, 0xff, 0xf0);
	fromValues$3(0xff, 0xfa, 0xf0);
	fromValues$3(0xf0, 0xff, 0xff);
	fromValues$3(0xf5, 0xff, 0xfa);
	fromValues$3(0xff, 0xfa, 0xfa);
	fromValues$3(0xff, 0xff, 0xf0);
	fromValues$3(0xff, 0xff, 0xff);
	fromValues$3(0x00, 0x00, 0x00);
	fromValues$3(0x2f, 0x4f, 0x4f);
	fromValues$3(0x69, 0x69, 0x69);
	fromValues$3(0x70, 0x80, 0x90);
	fromValues$3(0x80, 0x80, 0x80);
	fromValues$3(0x77, 0x88, 0x99);
	fromValues$3(0xa9, 0xa9, 0xa9);
	fromValues$3(0xc0, 0xc0, 0xc0);
	fromValues$3(0xd3, 0xd3, 0xd3);
	fromValues$3(0xdc, 0xdc, 0xdc);
	fromValues$3(0xb8, 0x73, 0x33);
	fromValues$3(0xcd, 0x7f, 0x32);
	fromValues$3(0xce, 0xd2, 0xd7);
	fromValues$3(0xe5, 0xe4, 0xe2);
	fromValues$3(0x5c, 0x5d, 0x5b);
	fromValues$3(0x87, 0x86, 0x81);
	fromValues$3(0xcb, 0xa3, 0xb2);
	fromValues$3(0xd2, 0xe8, 0xdf);
	fromValues$3(0xc7, 0xe3, 0xe1);

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let LabelSetVisual$2 = class LabelSetVisual {
	    render(elapsedTime, xrFrame) { }
	    update(elapsedTime) { }
	    constructor(labelSet) {
	        this.label = labelSet;
	    }
	};
	class LabelBase {
	    get material() { return this._material; }
	    get vertices() { return this._vertices; }
	    get verticesView() { return this._verticesView; }
	    get indices() { return this._indices; }
	    get indexCount() { return this._indexCount; }
	    get isInitialized() { return this._isInitialized; }
	    get mMatrix() { return this._mMatrix; }
	    get scale() { return this._scale; }
	    set scale(value) {
	        if (this._scale != value) {
	            this._scale = value;
	            this._hasChanged = true;
	        }
	    }
	    get font() { return this._font; }
	    set font(value) {
	        if (this._font != value) {
	            this._font = value;
	            this._hasChanged = true;
	        }
	    }
	    get rotation() { return this._rotation; }
	    set rotation(value) {
	        if (this._rotation != value) {
	            this._rotation = value;
	            this._hasChanged = true;
	        }
	    }
	    set reverseX(value) {
	        if (this._reverseX != value) {
	            this._reverseX = value;
	            this._hasChanged = true;
	        }
	    }
	    set reverseY(value) {
	        if (this._reverseY != value) {
	            this._reverseY = value;
	            this._hasChanged = true;
	        }
	    }
	    set reverseZ(value) {
	        if (this._reverseZ != value) {
	            this._reverseZ = value;
	            this._hasChanged = true;
	        }
	    }
	    get horizontalAlignment() { return this._horizontalAlignment; }
	    set horizontalAlignment(value) {
	        if (this._horizontalAlignment != value) {
	            this._horizontalAlignment = value;
	            this._hasChanged = true;
	        }
	    }
	    get verticalAlignment() { return this._verticalAlignment; }
	    set verticalAlignment(value) {
	        if (this._verticalAlignment != value) {
	            this._verticalAlignment = value;
	            this._hasChanged = true;
	        }
	    }
	    get offsetX() { return this._offsetX; }
	    set offsetX(value) {
	        if (this._offsetX != value) {
	            this._offsetX = value;
	            this._hasChanged = true;
	        }
	    }
	    get offsetY() { return this._offsetY; }
	    set offsetY(value) {
	        if (this._offsetY != value) {
	            this._offsetY = value;
	            this._hasChanged = true;
	        }
	    }
	    get offsetZ() { return this._offsetZ; }
	    set offsetZ(value) {
	        if (this._offsetZ != value) {
	            this._offsetZ = value;
	            this._hasChanged = true;
	        }
	    }
	    get maxGlyphTop() { return this._maxGlyphTop; }
	    set maxGlyphTop(value) {
	        if (this._maxGlyphTop != value) {
	            this._maxGlyphTop = value;
	            this._hasChanged = true;
	        }
	    }
	    get maxGlyphHeight() { return this._maxGlyphHeight; }
	    set maxGlyphHeight(value) {
	        if (this._maxGlyphHeight != value) {
	            this._maxGlyphHeight = value;
	            this._hasChanged = true;
	        }
	    }
	    constructor(core, options) {
	        this._core = core;
	        this._offset = create$3();
	        this._vec3 = create$3();
	        this._vec4 = create$2();
	        this._mMatrix = create$4();
	        this._indexCount = 0;
	        this._maxGlyphs = options.maxGlyphs;
	        this._textMetric = { width: 0, maxHeight: 0, maxTop: 0 };
	        this.scale = options.scale ? options.scale : 1;
	        this.offsetX = options.offsetX ? options.offsetX : 0;
	        this.offsetY = options.offsetY ? options.offsetY : 0;
	        this.offsetZ = options.offsetZ ? options.offsetZ : 0;
	        this.reverseX = options.reverseX;
	        this.reverseY = options.reverseY;
	        this.reverseZ = options.reverseZ;
	        this.rotation = options.rotation;
	        this.maxGlyphTop = options.maxGlyphTop;
	        this.horizontalAlignment = options.horizontalAlignment === undefined ? HorizontalAlignment.center : options.horizontalAlignment;
	        this.verticalAlignment = options.verticalAlignment === undefined ? VerticalAlignment.center : options.verticalAlignment;
	        this._material = options.material;
	        this.borderWidth = core.config.textBorderWidth;
	        this.gamma = 0;
	    }
	    initialize() {
	        this._vertices = new ArrayBuffer(PositionTexturePickVertex.SIZE_BYTES * this._maxGlyphs * 4);
	        this._verticesView = new DataView(this._vertices);
	        this._indices = new Uint32Array(this._maxGlyphs * 6);
	        this._isInitialized = true;
	    }
	    update(elapsedTime) { }
	}
	class LabelSet extends LabelBase {
	    get materials() { return this._materials; }
	    get minBoundsX() { return this._minBoundsX; }
	    set minBoundsX(value) {
	        if (this._minBoundsX != value) {
	            this._minBoundsX = value;
	            this._hasChanged = true;
	        }
	    }
	    get minBoundsY() { return this._minBoundsY; }
	    set minBoundsY(value) {
	        if (this._minBoundsY != value) {
	            this._minBoundsY = value;
	            this._hasChanged = true;
	        }
	    }
	    get minBoundsZ() { return this._minBoundsZ; }
	    set minBoundsZ(value) {
	        if (this._minBoundsZ != value) {
	            this._minBoundsZ = value;
	            this._hasChanged = true;
	        }
	    }
	    get maxBoundsX() { return this._maxBoundsX; }
	    set maxBoundsX(value) {
	        if (this._maxBoundsX != value) {
	            this._maxBoundsX = value;
	            this._hasChanged = true;
	        }
	    }
	    get maxBoundsY() { return this._maxBoundsY; }
	    set maxBoundsY(value) {
	        if (this._maxBoundsY != value) {
	            this._maxBoundsY = value;
	            this._hasChanged = true;
	        }
	    }
	    get maxBoundsZ() { return this._maxBoundsZ; }
	    set maxBoundsZ(value) {
	        if (this._maxBoundsZ != value) {
	            this._maxBoundsZ = value;
	            this._hasChanged = true;
	        }
	    }
	    get positionsX() { return this._positionsX; }
	    set positionsX(value) {
	        if (this._positionsX != value) {
	            this._positionsX = value;
	            this._hasChanged = true;
	        }
	    }
	    get positionsY() { return this._positionsY; }
	    set positionsY(value) {
	        if (this._positionsY != value) {
	            this._positionsY = value;
	            this._hasChanged = true;
	        }
	    }
	    get positionsZ() { return this._positionsZ; }
	    set positionsZ(value) {
	        if (this._positionsZ != value) {
	            this._positionsZ = value;
	            this._hasChanged = true;
	        }
	    }
	    get positionScalingX() { return this._positionScalingX; }
	    set positionScalingX(value) {
	        if (this._positionScalingX != value) {
	            this._positionScalingX = value;
	            this._hasChanged = true;
	        }
	    }
	    get positionScalingY() { return this._positionScalingY; }
	    set positionScalingY(value) {
	        if (this._positionScalingY != value) {
	            this._positionScalingY = value;
	            this._hasChanged = true;
	        }
	    }
	    get positionScalingZ() { return this._positionScalingZ; }
	    set positionScalingZ(value) {
	        if (this._positionScalingZ != value) {
	            this._positionScalingZ = value;
	            this._hasChanged = true;
	        }
	    }
	    get rotations() { return this._rotations; }
	    set rotations(value) {
	        if (this._rotations != value) {
	            this._rotations = value;
	            this._hasChanged = true;
	        }
	    }
	    get offsetsX() { return this._offsetsX; }
	    set offsetsX(value) {
	        if (this._offsetsX != value) {
	            this._offsetsX = value;
	            this._hasChanged = true;
	        }
	    }
	    get offsetsY() { return this._offsetsY; }
	    set offsetsY(value) {
	        if (this._offsetsY != value) {
	            this._offsetsY = value;
	            this._hasChanged = true;
	        }
	    }
	    get offsetsZ() { return this._offsetsZ; }
	    set offsetsZ(value) {
	        if (this._offsetsZ != value) {
	            this._offsetsZ = value;
	            this._hasChanged = true;
	        }
	    }
	    get offsetScalingX() { return this._offsetScalingX; }
	    set offsetScalingX(value) {
	        if (this._offsetScalingX != value) {
	            this._offsetScalingX = value;
	            this._hasChanged = true;
	        }
	    }
	    get offsetScalingY() { return this._offsetScalingY; }
	    set offsetScalingY(value) {
	        if (this._offsetScalingY != value) {
	            this._offsetScalingY = value;
	            this._hasChanged = true;
	        }
	    }
	    get offsetScalingZ() { return this._offsetScalingZ; }
	    set offsetScalingZ(value) {
	        if (this._offsetScalingZ != value) {
	            this._offsetScalingZ = value;
	            this._hasChanged = true;
	        }
	    }
	    get text() { return this._text; }
	    set text(value) {
	        if (this._text != value) {
	            this._text = value;
	            this._hasChanged = true;
	        }
	    }
	    get horizontalAlignments() { return this._horizontalAlignments; }
	    set horizontalAlignments(value) {
	        if (this._horizontalAlignments != value) {
	            this._horizontalAlignments = value;
	            this._hasChanged = true;
	        }
	    }
	    get verticalAlignments() { return this._verticalAlignments; }
	    set verticalAlignments(value) {
	        if (this._verticalAlignments != value) {
	            this._verticalAlignments = value;
	            this._hasChanged = true;
	        }
	    }
	    get scales() { return this._scales; }
	    set scales(value) {
	        if (this._scales != value) {
	            this._scales = value;
	            this._hasChanged = true;
	        }
	    }
	    get scalesScaling() { return this._scalesScaling; }
	    set scalesScaling(value) {
	        if (this._scalesScaling != value) {
	            this._scalesScaling = value;
	            this._hasChanged = true;
	        }
	    }
	    constructor(core, options) {
	        super(core, options);
	        this._quat = create$1();
	        this._materials = options.materials;
	        this.minBoundsX = options.minBoundsX ? options.minBoundsX : 0;
	        this.minBoundsY = options.minBoundsY ? options.minBoundsY : 0;
	        this.minBoundsZ = options.minBoundsZ ? options.minBoundsZ : 0;
	        this.maxBoundsX = options.maxBoundsX ? options.maxBoundsX : 1;
	        this.maxBoundsY = options.maxBoundsY ? options.maxBoundsY : 1;
	        this.maxBoundsZ = options.maxBoundsZ ? options.maxBoundsZ : 1;
	        this._font = options.font || core.font;
	        this.text = options.text;
	        this.positionsX = options.positionsX;
	        this.positionsY = options.positionsY;
	        this.positionsZ = options.positionsZ;
	        this.positionScalingX = options.positionScalingX ? options.positionScalingX : 1;
	        this.positionScalingY = options.positionScalingY ? options.positionScalingY : 1;
	        this.positionScalingZ = options.positionScalingZ ? options.positionScalingZ : 1;
	        this.rotations = options.rotations;
	        this.offsetsX = options.offsetsX;
	        this.offsetsY = options.offsetsY;
	        this.offsetsZ = options.offsetsZ;
	        this.offsetScalingX = options.offsetScalingX ? options.offsetScalingX : 1;
	        this.offsetScalingY = options.offsetScalingY ? options.offsetScalingY : 1;
	        this.offsetScalingZ = options.offsetScalingZ ? options.offsetScalingZ : 1;
	        if (options.horizontalAlignments)
	            this.horizontalAlignments = options.horizontalAlignments;
	        if (options.verticalAlignments)
	            this.verticalAlignments = options.verticalAlignments;
	        if (options.scales)
	            this.scales = options.scales;
	        this.scalesScaling = options.scalesScaling ? options.scalesScaling : 1;
	    }
	    update(elapsedTime) {
	        if (this._hasChanged && this._isInitialized) {
	            this._hasChanged = false;
	            this.pickIdLookup = {};
	            if (!this._text) {
	                this._indexCount = 0;
	            }
	            else {
	                const start = window.performance.now();
	                const modelSizeX = this._maxBoundsX - this._minBoundsX;
	                const modelSizeY = this._maxBoundsY - this._minBoundsY;
	                const modelSizeZ = this._maxBoundsZ - this._minBoundsZ;
	                const maxBounds = Math.max(modelSizeX, Math.max(modelSizeY, modelSizeZ));
	                const boundsScaling = maxBounds == 0 ? 1 : 1 / maxBounds;
	                const modelOriginX = (this._minBoundsX + this._maxBoundsX) / 2;
	                const modelOriginY = (this._minBoundsY + this._maxBoundsY) / 2;
	                const modelOriginZ = (this._minBoundsZ + this._maxBoundsZ) / 2;
	                if (this._rotation) {
	                    set$1(this._quat, this._rotation[0], this._rotation[1], this._rotation[2], this._rotation[3]);
	                }
	                let glyphs = 0;
	                for (let i = 0; i < this._text.length; i++) {
	                    const offsetX = (this._offsetsX ? this._offsetsX[i] / 2 : this._offsetX) * boundsScaling * this._offsetScalingX;
	                    const offsetY = (this._offsetsY ? this._offsetsY[i] / 2 : this._offsetY) * boundsScaling * this._offsetScalingY;
	                    const offsetZ = (this._offsetsZ ? this._offsetsZ[i] / 2 : this._offsetZ) * boundsScaling * this._offsetScalingZ;
	                    const text = TextHelper.truncate(this._text[i], this._maxGlyphs - glyphs);
	                    const scale = (this._scales ? this._scales[i] * this._scalesScaling : this._scale) * boundsScaling / this._font.size;
	                    TextHelper.measure(this._font, text, this._textMetric);
	                    const width = this._textMetric.width * scale;
	                    const lineHeight = this._font.size * scale;
	                    const maxGlyphTop = (this._maxGlyphTop ? this._maxGlyphTop : this._textMetric.maxTop) * scale;
	                    const horizontalAlignment = this._horizontalAlignments ? this._horizontalAlignments[i] : this._horizontalAlignment;
	                    switch (horizontalAlignment) {
	                        case HorizontalAlignment.left:
	                            this._offset[0] = offsetX;
	                            break;
	                        case HorizontalAlignment.center:
	                            this._offset[0] = offsetX - width / 2;
	                            break;
	                        case HorizontalAlignment.right:
	                            this._offset[0] = offsetX - width;
	                            break;
	                    }
	                    const verticalAlignment = this._verticalAlignments ? this._verticalAlignments[i] : this._verticalAlignment;
	                    switch (verticalAlignment) {
	                        case VerticalAlignment.top:
	                            this._offset[1] = offsetY - lineHeight / 2;
	                            break;
	                        case VerticalAlignment.center:
	                            this._offset[1] = offsetY;
	                            break;
	                        case VerticalAlignment.bottom:
	                            this._offset[1] = offsetY + lineHeight / 2;
	                            break;
	                    }
	                    this._offset[1] -= maxGlyphTop / 2;
	                    this._offset[2] = offsetZ;
	                    let positionX = this.positionsX ? this.positionsX[i] * this.positionScalingX : 0;
	                    let positionY = this.positionsY ? this.positionsY[i] * this.positionScalingY : 0;
	                    let positionZ = this.positionsZ ? this.positionsZ[i] * this.positionScalingZ : 0;
	                    if (this._reverseX) {
	                        positionX = this.minBoundsX + this.maxBoundsX - positionX;
	                    }
	                    if (this._reverseY) {
	                        positionY = this.minBoundsY + this.maxBoundsY - positionY;
	                    }
	                    if (this._reverseZ) {
	                        positionZ = this.minBoundsZ + this.maxBoundsZ - positionZ;
	                    }
	                    set$3(this._vec3, (positionX - modelOriginX) * boundsScaling, (positionY - modelOriginY) * boundsScaling, (positionZ - modelOriginZ) * boundsScaling);
	                    if (this._rotations) {
	                        set$1(this._quat, this._rotations[i * 4], this._rotations[i * 4 + 1], this._rotations[i * 4 + 2], this._rotations[i * 4 + 3]);
	                    }
	                    const pickId = PickHelper.nextPickId();
	                    PickHelper.encodeNumber(pickId, PickType.label, this._vec4);
	                    this.pickIdLookup[pickId] = i;
	                    TextHelper.addString(this._font, text, this._verticesView, this._indices, glyphs, this._vec3, scale, this._offset, this._rotation || this._rotations ? this._quat : null, this._vec4);
	                    glyphs += text.length;
	                    if (glyphs >= this._maxGlyphs) {
	                        glyphs = this._maxGlyphs;
	                        break;
	                    }
	                }
	                this._indexCount = glyphs * 6;
	                this._core.log.write(LogLevel.info, `label set updated ${Math.round(window.performance.now() - start)}ms`);
	                if (this.hasChangedCallback) {
	                    this.hasChangedCallback();
	                }
	            }
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let ImageVisual$2 = class ImageVisual {
	    render(elapsedTime, xrFrame) { }
	    update(elapsedTime) { }
	    constructor(image) {
	        this.image = image;
	    }
	};
	class ImageBase {
	    get material() { return this._material; }
	    get vertices() { return this._vertices; }
	    get indices() { return this._indices; }
	    get indexCount() { return this._indexCount; }
	    get isInitialized() { return this._isInitialized; }
	    get mMatrix() { return this._mMatrix; }
	    get imageData() { return this._imageData; }
	    set imageData(value) {
	        if (this._imageData != value) {
	            this._imageData = value;
	            this._hasChanged = true;
	        }
	    }
	    get rotation() { return this._rotation; }
	    set rotation(value) {
	        if (!equals$1(this._rotation, value)) {
	            copy$1(this._rotation, value);
	            this._hasChanged = true;
	        }
	    }
	    get position() { return this._position; }
	    set position(value) {
	        if (!equals$3(this._position, value)) {
	            copy$3(this._position, value);
	            this._hasChanged = true;
	        }
	    }
	    get texCoord0() { return this._texCoord0; }
	    set texCoord0(value) {
	        if (!equals(this._texCoord0, value)) {
	            copy(this._texCoord0, value);
	            this._hasChanged = true;
	        }
	    }
	    get texCoord1() { return this._texCoord1; }
	    set texCoord1(value) {
	        if (!equals(this._texCoord1, value)) {
	            copy(this._texCoord1, value);
	            this._hasChanged = true;
	        }
	    }
	    get minBoundsX() { return this._minBoundsX; }
	    set minBoundsX(value) {
	        if (this._minBoundsX != value) {
	            this._minBoundsX = value;
	            this._hasChanged = true;
	        }
	    }
	    get minBoundsY() { return this._minBoundsY; }
	    set minBoundsY(value) {
	        if (this._minBoundsY != value) {
	            this._minBoundsY = value;
	            this._hasChanged = true;
	        }
	    }
	    get minBoundsZ() { return this._minBoundsZ; }
	    set minBoundsZ(value) {
	        if (this._minBoundsZ != value) {
	            this._minBoundsZ = value;
	            this._hasChanged = true;
	        }
	    }
	    get maxBoundsX() { return this._maxBoundsX; }
	    set maxBoundsX(value) {
	        if (this._maxBoundsX != value) {
	            this._maxBoundsX = value;
	            this._hasChanged = true;
	        }
	    }
	    get maxBoundsY() { return this._maxBoundsY; }
	    set maxBoundsY(value) {
	        if (this._maxBoundsY != value) {
	            this._maxBoundsY = value;
	            this._hasChanged = true;
	        }
	    }
	    get maxBoundsZ() { return this._maxBoundsZ; }
	    set maxBoundsZ(value) {
	        if (this._maxBoundsZ != value) {
	            this._maxBoundsZ = value;
	            this._hasChanged = true;
	        }
	    }
	    constructor(core, options) {
	        this._core = core;
	        this._mMatrix = create$4();
	        this._origin = create$3();
	        this._translation = create$3();
	        this._scale = create$3();
	        this._transform = create$4();
	        this._imageData = options.imageData;
	        this._minBoundsX = options.minBoundsX === undefined ? 0 : options.minBoundsX;
	        this._minBoundsY = options.minBoundsY === undefined ? 0 : options.minBoundsY;
	        this._minBoundsZ = options.minBoundsZ === undefined ? 0 : options.minBoundsZ;
	        this._maxBoundsX = options.maxBoundsX === undefined ? 1 : options.maxBoundsX;
	        this._maxBoundsY = options.maxBoundsY === undefined ? 1 : options.maxBoundsY;
	        this._maxBoundsZ = options.maxBoundsZ === undefined ? 1 : options.maxBoundsZ;
	        this._position = options.position ? clone$4(options.position) : create$3();
	        this._rotation = options.rotation ? clone$2(options.rotation) : create$1();
	        this._texCoord0 = options.texCoord0 ? clone$1(options.texCoord0) : fromValues(0, 0);
	        this._texCoord1 = options.texCoord1 ? clone$1(options.texCoord1) : fromValues(1, 1);
	        this._material = options.material === undefined ? -1 : options.material;
	        this._hasChanged = true;
	    }
	}
	class ImageQuad extends ImageBase {
	    get width() { return this._width; }
	    set width(value) {
	        if (this._width != value) {
	            this._width = value;
	            this._hasChanged = true;
	        }
	    }
	    get height() { return this._height; }
	    set height(value) {
	        if (this._height != value) {
	            this._height = value;
	            this._hasChanged = true;
	        }
	    }
	    constructor(core, options) {
	        super(core, options);
	        this._width = options.width === undefined ? 1 : options.width;
	        this._height = options.height === undefined ? 1 : options.height;
	        this._texTransform = create$4();
	        translate(this._texTransform, this._texTransform, fromValues$3(0, 1, 0));
	        scale$1(this._texTransform, this._texTransform, fromValues$3(1, -1, 1));
	    }
	    initialize() {
	        this._vertices = new ArrayBuffer(PositionNormalTextureVertex.SIZE_BYTES * 4);
	        this._indices = Quad$2.INDICES;
	        this._indexCount = this._indices.length;
	        this._isInitialized = true;
	    }
	    update(elapsedTime) {
	        if (this._hasChanged && this._isInitialized) {
	            this._hasChanged = false;
	            const modelSizeX = this._maxBoundsX - this._minBoundsX;
	            const modelSizeY = this._maxBoundsY - this._minBoundsY;
	            const modelSizeZ = this._maxBoundsZ - this._minBoundsZ;
	            const maxBounds = Math.max(modelSizeX, Math.max(modelSizeY, modelSizeZ));
	            const boundsScaling = maxBounds == 0 ? 1 : 1 / maxBounds;
	            set$3(this._origin, (this._minBoundsX + this._maxBoundsX) / 2, (this._minBoundsY + this._maxBoundsY) / 2, (this._minBoundsZ + this._maxBoundsZ) / 2);
	            subtract(this._translation, this._position, this._origin);
	            scale(this._translation, this._translation, boundsScaling);
	            set$3(this._scale, this._width, this._height, 1);
	            scale(this._scale, this._scale, boundsScaling);
	            fromRotationTranslationScale(this._transform, this._rotation, this._translation, this._scale);
	            this._verticesView = Quad$2.normalTextured(this._transform, this._texTransform);
	            this._vertices = this._verticesView.buffer;
	            if (this.hasChangedCallback) {
	                this.hasChangedCallback();
	            }
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class BoundsHelper {
	    static rotateBounds(minBounds, maxBounds, rotation, rotatedMinBounds, rotatedMaxBounds, offset) {
	        const sizeX = maxBounds[0] - minBounds[0];
	        const sizeY = maxBounds[1] - minBounds[1];
	        const sizeZ = maxBounds[2] - minBounds[2];
	        const min$1 = rotatedMinBounds;
	        const max$1 = rotatedMaxBounds;
	        set$3(min$1, Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
	        set$3(max$1, -Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
	        const vertices = Cube.POSITIONS;
	        const position = create$3();
	        for (let i = 0; i < 8; i++) {
	            set$3(position, vertices[i * 3] * sizeX, vertices[i * 3 + 1] * sizeY, vertices[i * 3 + 2] * sizeZ);
	            add(position, position, offset);
	            transformQuat(position, position, rotation);
	            subtract(position, position, offset);
	            min(min$1, min$1, position);
	            max(max$1, max$1, position);
	        }
	        add(position, minBounds, maxBounds);
	        scale(position, position, 0.5);
	        add(min$1, min$1, position);
	        add(max$1, max$1, position);
	    }
	    static cylinder(pa, pb, radius, minBounds, maxBounds) {
	        const a = create$3();
	        subtract(a, pb, pa);
	        const aa = dot(a, a);
	        const ex = radius * Math.sqrt(1 - a[0] * a[0] / aa);
	        const ey = radius * Math.sqrt(1 - a[1] * a[1] / aa);
	        const ez = radius * Math.sqrt(1 - a[2] * a[2] / aa);
	        minBounds[0] = Math.min(pa[0] - ex, pb[0] - ex);
	        minBounds[1] = Math.min(pa[1] - ey, pb[1] - ey);
	        minBounds[2] = Math.min(pa[2] - ez, pb[2] - ez);
	        maxBounds[0] = Math.max(pa[0] + ex, pb[0] + ex);
	        maxBounds[1] = Math.max(pa[1] + ey, pb[1] + ey);
	        maxBounds[2] = Math.max(pa[2] + ez, pb[2] + ez);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class LayoutBase {
	    get facetScaling() { return this._facetScaling; }
	    offsetX(facetCoordX) { return (((facetCoordX + 0.5) / this._facetsX) - 0.5) * (this.maxModelBoundsX - this.minModelBoundsX) / this._maxBounds; }
	    offsetY(facetCoordY) { return (((facetCoordY + 0.5) / this._facetsY) - 0.5) * (this.maxModelBoundsY - this.minModelBoundsY) / this._maxBounds; }
	    offsetZ(facetCoordZ) { return (((facetCoordZ + 0.5) / this._facetsZ) - 0.5) * (this.maxModelBoundsZ - this.minModelBoundsZ) / this._maxBounds; }
	    constructor(core) {
	        this._core = core;
	        this.modelOriginX = 0;
	        this.modelOriginY = 0;
	        this.modelOriginZ = 0;
	        this.minModelBoundsX = 0;
	        this.minModelBoundsY = 0;
	        this.minModelBoundsZ = 0;
	        this.maxModelBoundsX = 0;
	        this.maxModelBoundsY = 0;
	        this.maxModelBoundsZ = 0;
	        this.minLayoutBoundsX = 0;
	        this.minLayoutBoundsY = 0;
	        this.minLayoutBoundsZ = 0;
	        this.maxLayoutBoundsX = 0;
	        this.maxLayoutBoundsY = 0;
	        this.maxLayoutBoundsZ = 0;
	        this._facetSpacingX = 0;
	        this._facetSpacingY = 0;
	        this._facetSpacingZ = 0;
	        this._facetSizeX = 0;
	        this._facetSizeY = 0;
	        this._facetSizeZ = 0;
	        this._facetsX = 1;
	        this._facetsY = 1;
	        this._facetsZ = 1;
	    }
	    _updateModelBounds(options) {
	        this.minModelBoundsX = options.minBoundsX === undefined ? this.minLayoutBoundsX : options.minBoundsX;
	        this.minModelBoundsY = options.minBoundsY === undefined ? this.minLayoutBoundsY : options.minBoundsY;
	        this.minModelBoundsZ = options.minBoundsZ === undefined ? this.minLayoutBoundsZ : options.minBoundsZ;
	        this.maxModelBoundsX = options.maxBoundsX === undefined ? this.maxLayoutBoundsX : options.maxBoundsX;
	        this.maxModelBoundsY = options.maxBoundsY === undefined ? this.maxLayoutBoundsY : options.maxBoundsY;
	        this.maxModelBoundsZ = options.maxBoundsZ === undefined ? this.maxLayoutBoundsZ : options.maxBoundsZ;
	        this._isFacetted =
	            (options.facetsX !== undefined && options.facetsX > 1 && options.facetCoordsX != null) ||
	                (options.facetsY !== undefined && options.facetsY > 1 && options.facetCoordsY != null) ||
	                (options.facetsZ !== undefined && options.facetsZ > 1 && options.facetCoordsZ != null);
	        this._facetSpacingX = options.facetSpacingX === undefined ? 0 : options.facetSpacingX;
	        this._facetSpacingY = options.facetSpacingY === undefined ? 0 : options.facetSpacingY;
	        this._facetSpacingZ = options.facetSpacingZ === undefined ? 0 : options.facetSpacingZ;
	        let modelSizeX = this.maxModelBoundsX - this.minModelBoundsX;
	        let modelSizeY = this.maxModelBoundsY - this.minModelBoundsY;
	        let modelSizeZ = this.maxModelBoundsZ - this.minModelBoundsZ;
	        const maxBounds = Math.max(modelSizeX, Math.max(modelSizeY, modelSizeZ));
	        this._facetSizeX = modelSizeX;
	        this._facetSizeY = modelSizeY;
	        this._facetSizeZ = modelSizeZ;
	        this._facetsX = options.facetCoordsX ? options.facetsX : 1;
	        this._facetsY = options.facetCoordsY ? options.facetsY : 1;
	        this._facetsZ = options.facetCoordsZ ? options.facetsZ : 1;
	        this.minModelBoundsX -= this._facetSizeX * this._facetSpacingX / 2;
	        this.minModelBoundsY -= this._facetSizeY * this._facetSpacingY / 2;
	        this.minModelBoundsZ -= this._facetSizeZ * this._facetSpacingZ / 2;
	        this.maxModelBoundsX = this.minModelBoundsX + this._facetsX * this._facetSizeX * (1 + this._facetSpacingX);
	        this.maxModelBoundsY = this.minModelBoundsY + this._facetsY * this._facetSizeY * (1 + this._facetSpacingY);
	        this.maxModelBoundsZ = this.minModelBoundsZ + this._facetsZ * this._facetSizeZ * (1 + this._facetSpacingZ);
	        this.modelOriginX = (this.minModelBoundsX + this.maxModelBoundsX) / 2;
	        this.modelOriginY = (this.minModelBoundsY + this.maxModelBoundsY) / 2;
	        this.modelOriginZ = (this.minModelBoundsZ + this.maxModelBoundsZ) / 2;
	        modelSizeX = this.maxModelBoundsX - this.minModelBoundsX;
	        modelSizeY = this.maxModelBoundsY - this.minModelBoundsY;
	        modelSizeZ = this.maxModelBoundsZ - this.minModelBoundsZ;
	        this._maxBounds = Math.max(modelSizeX, Math.max(modelSizeY, modelSizeZ));
	        this._boundsScaling = this._maxBounds == 0 ? 1 : 1 / this._maxBounds;
	        this._facetScaling = maxBounds / this._maxBounds;
	    }
	    resetCumulativeLayoutBounds() {
	        this.minCumulativeLayoutBoundsX = undefined;
	        this.minCumulativeLayoutBoundsY = undefined;
	        this.minCumulativeLayoutBoundsZ = undefined;
	        this.maxCumulativeLayoutBoundsX = undefined;
	        this.maxCumulativeLayoutBoundsY = undefined;
	        this.maxCumulativeLayoutBoundsZ = undefined;
	    }
	    _updateCumulativeLayoutBounds() {
	        this.minCumulativeLayoutBoundsX = this.minCumulativeLayoutBoundsX === undefined ? this.minLayoutBoundsX : Math.min(this.minCumulativeLayoutBoundsX, this.minLayoutBoundsX);
	        this.minCumulativeLayoutBoundsY = this.minCumulativeLayoutBoundsY === undefined ? this.minLayoutBoundsY : Math.min(this.minCumulativeLayoutBoundsY, this.minLayoutBoundsY);
	        this.minCumulativeLayoutBoundsZ = this.minCumulativeLayoutBoundsZ === undefined ? this.minLayoutBoundsZ : Math.min(this.minCumulativeLayoutBoundsZ, this.minLayoutBoundsZ);
	        this.maxCumulativeLayoutBoundsX = this.maxCumulativeLayoutBoundsX === undefined ? this.maxLayoutBoundsX : Math.max(this.maxCumulativeLayoutBoundsX, this.maxLayoutBoundsX);
	        this.maxCumulativeLayoutBoundsY = this.maxCumulativeLayoutBoundsY === undefined ? this.maxLayoutBoundsY : Math.max(this.maxCumulativeLayoutBoundsY, this.maxLayoutBoundsY);
	        this.maxCumulativeLayoutBoundsZ = this.maxCumulativeLayoutBoundsZ === undefined ? this.maxLayoutBoundsZ : Math.max(this.maxCumulativeLayoutBoundsZ, this.maxLayoutBoundsZ);
	    }
	    unitToModelSize(unitSize) {
	        return unitSize / this._boundsScaling;
	    }
	    unitToModelPositionX(unitPositionX) {
	        return this.unitToModelSize(unitPositionX) + this.modelOriginX;
	    }
	    unitToModelPositionY(unitPositionY) {
	        return this.unitToModelSize(unitPositionY) + this.modelOriginY;
	    }
	    unitToModelPositionZ(unitPositionZ) {
	        return this.unitToModelSize(unitPositionZ) + this.modelOriginZ;
	    }
	    unitToModelPosition(unitPosition, modelPosition) {
	        modelPosition[0] = this.unitToModelPositionX(unitPosition[0]);
	        modelPosition[1] = this.unitToModelPositionY(unitPosition[1]);
	        modelPosition[2] = this.unitToModelPositionZ(unitPosition[2]);
	    }
	    modelToUnitSize(modelSize) {
	        return modelSize * this._boundsScaling;
	    }
	    modelToUnitPositionX(modelPositionX) {
	        return (modelPositionX - this.modelOriginX) * this._boundsScaling;
	    }
	    modelToUnitPositionY(modelPositionY) {
	        return (modelPositionY - this.modelOriginY) * this._boundsScaling;
	    }
	    modelToUnitPositionZ(modelPositionZ) {
	        return (modelPositionZ - this.modelOriginZ) * this._boundsScaling;
	    }
	    modelToUnitPosition(modelPosition, unitPosition) {
	        unitPosition[0] = this.modelToUnitPositionX(modelPosition[0]);
	        unitPosition[1] = this.modelToUnitPositionY(modelPosition[1]);
	        unitPosition[2] = this.modelToUnitPositionZ(modelPosition[2]);
	    }
	    inclusiveUnitBounds(buffer, ids, unitType, offset, count, minBounds, maxBounds) {
	        set$3(minBounds, Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
	        set$3(maxBounds, -Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
	        const unitScale = create$3();
	        const unitRotation = create$1();
	        const unitTranslation = create$3();
	        const lookup = buffer.lookup;
	        const dataView = buffer.dataView;
	        let minBounds0;
	        let maxBounds0;
	        let minBounds1;
	        let maxBounds1;
	        switch (unitType) {
	            case UnitType.sphere:
	            case UnitType.sphereSdf:
	                for (let i = 0; i < count; i++) {
	                    const id = ids[i + offset];
	                    const index = lookup[id];
	                    UnitVertex.getTranslation(dataView, index, unitTranslation);
	                    UnitVertex.getScale(dataView, index, unitScale);
	                    const radius = unitScale[0] / 2;
	                    minBounds[0] = Math.min(minBounds[0], unitTranslation[0] - radius);
	                    minBounds[1] = Math.min(minBounds[1], unitTranslation[1] - radius);
	                    minBounds[2] = Math.min(minBounds[2], unitTranslation[2] - radius);
	                    maxBounds[0] = Math.max(maxBounds[0], unitTranslation[0] + radius);
	                    maxBounds[1] = Math.max(maxBounds[1], unitTranslation[1] + radius);
	                    maxBounds[2] = Math.max(maxBounds[2], unitTranslation[2] + radius);
	                }
	                break;
	            case UnitType.hexPrism:
	            case UnitType.hexPrismSdf:
	            case UnitType.block:
	            case UnitType.blockSdf:
	                minBounds0 = create$3();
	                maxBounds0 = create$3();
	                minBounds1 = create$3();
	                maxBounds1 = create$3();
	                for (let i = 0; i < count; i++) {
	                    const id = ids[i + offset];
	                    const index = lookup[id];
	                    UnitVertex.getTranslation(dataView, index, unitTranslation);
	                    UnitVertex.getRotation(dataView, index, unitRotation);
	                    UnitVertex.getScale(dataView, index, unitScale);
	                    minBounds0[0] = unitTranslation[0] - unitScale[0] / 2;
	                    minBounds0[1] = unitTranslation[1] - unitScale[1] / 2;
	                    minBounds0[2] = unitTranslation[2] - unitScale[2] / 2;
	                    maxBounds0[0] = unitTranslation[0] + unitScale[0] / 2;
	                    maxBounds0[1] = unitTranslation[1] + unitScale[1] / 2;
	                    maxBounds0[2] = unitTranslation[2] + unitScale[2] / 2;
	                    BoundsHelper.rotateBounds(minBounds0, maxBounds0, unitRotation, minBounds1, maxBounds1, Constants.VECTOR3_ZERO);
	                    min(minBounds, minBounds, minBounds1);
	                    max(maxBounds, maxBounds, maxBounds1);
	                }
	                break;
	            case UnitType.cylinder:
	            case UnitType.cylinderSdf:
	                minBounds0 = create$3();
	                maxBounds0 = create$3();
	                const pa = create$3();
	                const pb = create$3();
	                const identityRotation = Constants.VECTOR3_UNITY;
	                let ca;
	                for (let i = 0; i < count; i++) {
	                    const id = ids[i + offset];
	                    const index = lookup[id];
	                    UnitVertex.getTranslation(dataView, index, unitTranslation);
	                    UnitVertex.getRotation(dataView, index, unitRotation);
	                    UnitVertex.getScale(dataView, index, unitScale);
	                    const length = unitScale[1];
	                    const radius = Math.max(unitScale[0], unitScale[2]);
	                    if (length != 0 && radius != 0) {
	                        if (equals$1(unitRotation, Constants.QUAT_IDENTITY)) {
	                            ca = identityRotation;
	                        }
	                        else {
	                            ca = create$3();
	                            transformQuat(ca, identityRotation, unitRotation);
	                        }
	                        scaleAndAdd(pa, unitTranslation, ca, -length * 0.5);
	                        scaleAndAdd(pb, unitTranslation, ca, length * 0.5);
	                        BoundsHelper.cylinder(pa, pb, radius, minBounds0, maxBounds0);
	                        min(minBounds, minBounds, minBounds0);
	                        max(maxBounds, maxBounds, maxBounds0);
	                    }
	                }
	                break;
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Scatter extends LayoutBase {
	    layout(buffer, ids, options) {
	        const start = window.performance.now();
	        const offset = options.offset === undefined ? 0 : options.offset;
	        const count = options.count === undefined ? ids.length : options.count;
	        const positionScalingX = options.positionScalingX === undefined ? 1 : options.positionScalingX;
	        const positionScalingY = options.positionScalingY === undefined ? 1 : options.positionScalingY;
	        const positionScalingZ = options.positionScalingZ === undefined ? 1 : options.positionScalingZ;
	        if (!this._positions || this._positions.length < buffer.length * 3) {
	            this._positions = new Float32Array(buffer.length * 3);
	        }
	        this.minLayoutBoundsX = Number.MAX_VALUE;
	        this.minLayoutBoundsY = Number.MAX_VALUE;
	        this.minLayoutBoundsZ = Number.MAX_VALUE;
	        this.maxLayoutBoundsX = -Number.MAX_VALUE;
	        this.maxLayoutBoundsY = -Number.MAX_VALUE;
	        this.maxLayoutBoundsZ = -Number.MAX_VALUE;
	        const lookup = buffer.lookup;
	        for (let i = 0; i < count; i++) {
	            const id = ids[i + offset];
	            const index = lookup[id];
	            let positionX = options.positionsX ? options.positionsX[id] * positionScalingX : 0;
	            let positionY = options.positionsY ? options.positionsY[id] * positionScalingY : 0;
	            let positionZ = options.positionsZ ? options.positionsZ[id] * positionScalingZ : 0;
	            this._positions[index * 3] = positionX;
	            this._positions[index * 3 + 1] = positionY;
	            this._positions[index * 3 + 2] = positionZ;
	            this.minLayoutBoundsX = Math.min(this.minLayoutBoundsX, positionX);
	            this.minLayoutBoundsY = Math.min(this.minLayoutBoundsY, positionY);
	            this.minLayoutBoundsZ = Math.min(this.minLayoutBoundsZ, positionZ);
	            this.maxLayoutBoundsX = Math.max(this.maxLayoutBoundsX, positionX);
	            this.maxLayoutBoundsY = Math.max(this.maxLayoutBoundsY, positionY);
	            this.maxLayoutBoundsZ = Math.max(this.maxLayoutBoundsZ, positionZ);
	        }
	        this._updateCumulativeLayoutBounds();
	        this._core.log.write(LogLevel.info, `${this.constructor.name.toLowerCase()} layout ${count} ${Math.round(window.performance.now() - start)}ms`);
	    }
	    update(buffer, ids, options) {
	        const start = window.performance.now();
	        const offset = options.offset === undefined ? 0 : options.offset;
	        const count = options.count === undefined ? ids.length : options.count;
	        const dataView = buffer.dataView;
	        const _vec2 = create();
	        const _vec3 = create$3();
	        const _vec4 = create$2();
	        const _quat = create$1();
	        const sizeScalingX = options.sizeScaling === undefined ? options.sizeScalingX === undefined ? 1 : options.sizeScalingX : options.sizeScaling;
	        const sizeScalingY = options.sizeScaling === undefined ? options.sizeScalingY === undefined ? 1 : options.sizeScalingY : options.sizeScaling;
	        const sizeScalingZ = options.sizeScaling === undefined ? options.sizeScalingZ === undefined ? 1 : options.sizeScalingZ : options.sizeScaling;
	        const sizesX = options.sizes ? options.sizes : options.sizesX;
	        const sizesY = options.sizes ? options.sizes : options.sizesY;
	        const sizesZ = options.sizes ? options.sizes : options.sizesZ;
	        const minSize = options.minSize === undefined ? 0 : options.minSize;
	        const minColor = options.minColor === undefined ? 0 : options.minColor;
	        const maxColor = options.maxColor === undefined ? 1 : options.maxColor;
	        const minOrder = options.minOrder === undefined ? 0 : options.minOrder;
	        const maxOrder = options.maxOrder === undefined ? 1 : options.maxOrder;
	        const orderReverse = options.orderReverse === undefined ? false : options.orderReverse;
	        const minStaggerOrder = options.minStaggerOrder === undefined ? 0 : options.minStaggerOrder;
	        const maxStaggerOrder = options.maxStaggerOrder === undefined ? 1 : options.maxStaggerOrder;
	        const staggerOrderReverse = options.staggerOrderReverse === undefined ? false : options.staggerOrderReverse;
	        const reverseX = options.reverseX === undefined ? false : options.reverseX;
	        const reverseY = options.reverseY === undefined ? false : options.reverseY;
	        const reverseZ = options.reverseZ === undefined ? false : options.reverseZ;
	        this._updateModelBounds(options);
	        if (options.rotation) {
	            _quat[0] = options.rotation[0];
	            _quat[1] = options.rotation[1];
	            _quat[2] = options.rotation[2];
	            _quat[3] = options.rotation[3];
	        }
	        else {
	            rotationTo(_quat, this._core.config.identityRotation, Constants.VECTOR3_UNITY);
	        }
	        if (options.texCoord) {
	            _vec4[0] = options.texCoord[0];
	            _vec4[1] = options.texCoord[1];
	            _vec4[2] = options.texCoord[2];
	            _vec4[3] = options.texCoord[3];
	        }
	        const lookup = buffer.lookup;
	        const selection = options.selected && options.selected.size > 0;
	        for (let i = 0; i < count; i++) {
	            const id = ids[i + offset];
	            const index = lookup[id];
	            let positionX = this._positions[index * 3];
	            let positionY = this._positions[index * 3 + 1];
	            let positionZ = this._positions[index * 3 + 2];
	            if (this._isFacetted) {
	                if (reverseX) {
	                    positionX = this.minModelBoundsX + this.minModelBoundsX + this._facetSizeX * (1 + this._facetSpacingX) - positionX;
	                }
	                if (reverseY) {
	                    positionY = this.minModelBoundsY + this.minModelBoundsY + this._facetSizeY * (1 + this._facetSpacingY) - positionY;
	                }
	                if (reverseZ) {
	                    positionZ = this.minModelBoundsZ + this.minModelBoundsZ + this._facetSizeZ * (1 + this._facetSpacingZ) - positionZ;
	                }
	                const facetX = options.facetCoordsX ? options.facetCoordsX[id] : 0;
	                const facetY = options.facetCoordsY ? options.facetCoordsY[id] : 0;
	                const facetZ = options.facetCoordsZ ? options.facetCoordsZ[id] : 0;
	                positionX += facetX * this._facetSizeX * (1 + this._facetSpacingX);
	                positionY += facetY * this._facetSizeY * (1 + this._facetSpacingY);
	                positionZ += facetZ * this._facetSizeZ * (1 + this._facetSpacingZ);
	            }
	            else {
	                if (reverseX) {
	                    positionX = this.minModelBoundsX + this.maxModelBoundsX - positionX;
	                }
	                if (reverseY) {
	                    positionY = this.minModelBoundsY + this.maxModelBoundsY - positionY;
	                }
	                if (reverseZ) {
	                    positionZ = this.minModelBoundsZ + this.maxModelBoundsZ - positionZ;
	                }
	            }
	            _vec3[0] = (positionX - this.modelOriginX) * this._boundsScaling;
	            _vec3[1] = (positionY - this.modelOriginY) * this._boundsScaling;
	            _vec3[2] = (positionZ - this.modelOriginZ) * this._boundsScaling;
	            UnitVertex.setTranslation(dataView, index, _vec3);
	            _vec3[0] = Math.max((sizesX ? Math.abs(sizesX[id]) : 1) * sizeScalingX, minSize) * this._boundsScaling;
	            _vec3[1] = Math.max((sizesY ? Math.abs(sizesY[id]) : 1) * sizeScalingY, minSize) * this._boundsScaling;
	            _vec3[2] = Math.max((sizesZ ? Math.abs(sizesZ[id]) : 1) * sizeScalingZ, minSize) * this._boundsScaling;
	            UnitVertex.setScale(dataView, index, _vec3);
	            if (options.rotations) {
	                _quat[0] = options.rotations[id * 4];
	                _quat[1] = options.rotations[id * 4 + 1];
	                _quat[2] = options.rotations[id * 4 + 2];
	                _quat[3] = options.rotations[id * 4 + 3];
	                UnitVertex.setRotation(dataView, index, _quat);
	            }
	            else {
	                UnitVertex.setRotation(dataView, index, _quat);
	            }
	            if (options.colors) {
	                const size = 1 / (maxColor - minColor + 1);
	                const color = MathHelper.normalize(options.colors[id], minColor, maxColor, size / 2, 1 - size / 2);
	                if (options.colors1) {
	                    const color1 = MathHelper.normalize(options.colors1[id], minColor, maxColor, size / 2, 1 - size / 2);
	                    set(_vec2, color, color1);
	                }
	                else {
	                    set(_vec2, color, color);
	                }
	                UnitVertex.setColor(dataView, index, _vec2);
	            }
	            else {
	                UnitVertex.setColor(dataView, index, Constants.VECTOR2_ONE);
	            }
	            UnitVertex.setIdHover(dataView, index, options.hover ? options.hover[id] : id);
	            UnitVertex.setSelected(dataView, index, selection ? options.selected.has(id) ? 1 : -1 : 0);
	            if (options.order !== undefined) {
	                const order = MathHelper.normalize(options.order[id], minOrder, maxOrder, 0, 1);
	                _vec2[0] = orderReverse ? 1 - order : order;
	            }
	            else {
	                _vec2[0] = count == 1 ? 0 : i / (count - 1);
	            }
	            if (options.staggerOrder !== undefined) {
	                _vec2[1] = options.staggerOrder;
	            }
	            else if (options.staggerOrders) {
	                const stagger = MathHelper.normalize(options.staggerOrders[id], minStaggerOrder, maxStaggerOrder, 0, 1);
	                _vec2[1] = staggerOrderReverse ? 1 - stagger : stagger;
	            }
	            else {
	                _vec2[1] = count == 1 ? 0 : i / (count - 1);
	            }
	            UnitVertex.setOrder(dataView, index, _vec2);
	            UnitVertex.setMaterial(dataView, index, options.material ? options.material : options.materials ? options.materials[id] : 0);
	            UnitVertex.setRounding(dataView, index, options.rounding ? options.rounding * this._boundsScaling : options.roundings ? options.roundings[id] * this._boundsScaling : 0);
	            UnitVertex.setParameter1(dataView, index, options.parameter1 ? options.parameter1 : options.parameters1 ? options.parameters1[id] : 0);
	            UnitVertex.setParameter2(dataView, index, options.parameter2 ? options.parameter2 : options.parameters2 ? options.parameters2[id] : 0);
	            UnitVertex.setSdfBuffer(dataView, index, options.sdfBuffer ? options.sdfBuffer : options.sdfBuffers ? options.sdfBuffers[id] : this._core.config.sdfBuffer);
	            UnitVertex.setSdfBorder(dataView, index, options.sdfBorder ? options.sdfBorder : options.sdfBorders ? options.sdfBorders[id] : this._core.config.sdfBorder);
	            if (options.texCoords) {
	                _vec4[0] = options.texCoords[id * 4];
	                _vec4[1] = options.texCoords[id * 4 + 1];
	                _vec4[2] = options.texCoords[id * 4 + 2];
	                _vec4[3] = options.texCoords[id * 4 + 3];
	                UnitVertex.setTexCoord(dataView, index, _vec4);
	            }
	            else {
	                UnitVertex.setTexCoord(dataView, index, _vec4);
	            }
	        }
	        buffer.update();
	        this._core.log.write(LogLevel.info, `${this.constructor.name.toLowerCase()} update ${count} ${Math.round(window.performance.now() - start)}ms`);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	fromValues$3(0.2126, 0.7152, 0.0722);

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	create$3();

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	create$3();

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class PathHelper {
	    static getFilenameWithoutExtension(path) {
	        const dot = path.lastIndexOf('.');
	        if (dot == -1) {
	            return path;
	        }
	        else {
	            const start = path.lastIndexOf('/') == -1 ? 0 : path.lastIndexOf('/') + 1;
	            return path.substring(start, dot);
	        }
	    }
	    static getExtension(path) {
	        const dot = path.lastIndexOf('.');
	        if (dot == -1 || dot == path.length - 1) {
	            return null;
	        }
	        else {
	            return path.substring(dot + 1, path.length);
	        }
	    }
	    static getFilename(path) {
	        if (path.lastIndexOf('/') == -1) {
	            return path;
	        }
	        else {
	            const start = path.lastIndexOf('/') + 1;
	            return path.substring(start, path.length);
	        }
	    }
	    static getPath(path) {
	        if (path.lastIndexOf('/') == -1) {
	            return "";
	        }
	        else {
	            return path.substring(0, path.lastIndexOf('/'));
	        }
	    }
	    static combine(first, second) {
	        const seperator = first.lastIndexOf('/') == first.length - 1;
	        if (second.indexOf('/') == 0) {
	            if (seperator) {
	                return first.substring(0, first.length - 1) + second;
	            }
	            else {
	                return first + second;
	            }
	        }
	        else {
	            if (seperator) {
	                return first + second;
	            }
	            else {
	                return first + '/' + second;
	            }
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class TextureHelper {
	    static create(gl, width, height, format, type, filter, bytes, internalFormat = format) {
	        const texture = gl.createTexture();
	        gl.bindTexture(gl.TEXTURE_2D, texture);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
	        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, bytes);
	        return texture;
	    }
	    static fromImage(gl, image, mipmaps, filter) {
	        const texture = gl.createTexture();
	        gl.bindTexture(gl.TEXTURE_2D, texture);
	        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	        if (mipmaps && MathHelper.isPowerOf2(image.width) && MathHelper.isPowerOf2(image.height))
	            gl.generateMipmap(gl.TEXTURE_2D);
	        else {
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
	        }
	        gl.bindTexture(gl.TEXTURE_2D, null);
	        return texture;
	    }
	    static cubemapFromImages(gl, images) {
	        const texture = gl.createTexture();
	        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
	        const targets = [
	            gl.TEXTURE_CUBE_MAP_POSITIVE_X,
	            gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
	            gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
	            gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
	            gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
	            gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
	        ];
	        for (let i = 0; i < 6; i++) {
	            gl.texImage2D(targets[i], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[i]);
	            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	        }
	        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
	        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	        return texture;
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Line extends LayoutBase {
	    layout(buffer, ids, fromIds, toIds, options) {
	        const start = window.performance.now();
	        const offset = options.offset === undefined ? 0 : options.offset;
	        const count = options.count === undefined ? ids.length : options.count;
	        const positionScalingX = options.positionScalingX === undefined ? 1 : options.positionScalingX;
	        const positionScalingY = options.positionScalingY === undefined ? 1 : options.positionScalingY;
	        const positionScalingZ = options.positionScalingZ === undefined ? 1 : options.positionScalingZ;
	        const sizeScalingX = options.sizeScaling === undefined ? options.sizeScalingX === undefined ? 1 : options.sizeScalingX : options.sizeScaling;
	        const sizeScalingY = options.sizeScaling === undefined ? options.sizeScalingY === undefined ? 1 : options.sizeScalingY : options.sizeScaling;
	        const sizeScalingZ = options.sizeScaling === undefined ? options.sizeScalingZ === undefined ? 1 : options.sizeScalingZ : options.sizeScaling;
	        const minSize = options.minSize === undefined ? 0 : options.minSize;
	        const offsetScaling = options.offsetScaling === undefined ? 1 : options.offsetScaling;
	        if (!this._positions || this._positions.length < buffer.length * 3) {
	            this._positions = new Float32Array(buffer.length * 3);
	            this._sizes = new Float32Array(buffer.length * 3);
	            this._rotations = new Float32Array(buffer.length * 4);
	        }
	        this.minLayoutBoundsX = Number.MAX_VALUE;
	        this.minLayoutBoundsY = Number.MAX_VALUE;
	        this.minLayoutBoundsZ = Number.MAX_VALUE;
	        this.maxLayoutBoundsX = -Number.MAX_VALUE;
	        this.maxLayoutBoundsY = -Number.MAX_VALUE;
	        this.maxLayoutBoundsZ = -Number.MAX_VALUE;
	        const _vec3 = create$3();
	        const _quat = create$1();
	        const direction = create$3();
	        const lookup = buffer.lookup;
	        for (let i = 0; i < count; i++) {
	            const id = ids[i + offset];
	            const fromId = fromIds[id];
	            const toId = toIds[id];
	            const index = lookup[id];
	            let toPositionX = options.positionsX ? options.positionsX[toId] * positionScalingX : 0;
	            let toPositionY = options.positionsY ? options.positionsY[toId] * positionScalingY : 0;
	            let toPositionZ = options.positionsZ ? options.positionsZ[toId] * positionScalingZ : 0;
	            let fromPositionX = options.positionsX ? options.positionsX[fromId] * positionScalingX : 0;
	            let fromPositionY = options.positionsY ? options.positionsY[fromId] * positionScalingY : 0;
	            let fromPositionZ = options.positionsZ ? options.positionsZ[fromId] * positionScalingZ : 0;
	            if (fromId == toId) {
	                this._sizes[index * 3] = 0;
	                this._sizes[index * 3 + 1] = 0;
	                this._sizes[index * 3 + 2] = 0;
	                this._rotations[index * 4] = 0;
	                this._rotations[index * 4 + 1] = 0;
	                this._rotations[index * 4 + 2] = 0;
	                this._rotations[index * 4 + 3] = 1;
	            }
	            else {
	                direction[0] = toPositionX - fromPositionX;
	                direction[1] = toPositionY - fromPositionY;
	                direction[2] = toPositionZ - fromPositionZ;
	                let length$1 = length(direction);
	                scale(direction, direction, 1 / length$1);
	                rotationTo(_quat, this._core.config.identityRotation, direction);
	                this._rotations[index * 4] = _quat[0];
	                this._rotations[index * 4 + 1] = _quat[1];
	                this._rotations[index * 4 + 2] = _quat[2];
	                this._rotations[index * 4 + 3] = _quat[3];
	                if (options.offsets) {
	                    const fromOffset = options.offsets[fromId] * offsetScaling / 2;
	                    const toOffset = options.offsets[toId] * offsetScaling / 2;
	                    toPositionX -= direction[0] * toOffset;
	                    toPositionY -= direction[1] * toOffset;
	                    toPositionZ -= direction[2] * toOffset;
	                    fromPositionX += direction[0] * fromOffset;
	                    fromPositionY += direction[1] * fromOffset;
	                    fromPositionZ += direction[2] * fromOffset;
	                    length$1 = Math.max(length$1 - toOffset - fromOffset, minSize);
	                }
	                this._sizes[index * 3 + 1] = Math.max(length$1 * sizeScalingY, minSize);
	                if (options.lineSizes) {
	                    this._sizes[index * 3] = Math.max(options.lineSizes[id] * sizeScalingX, minSize);
	                    this._sizes[index * 3 + 2] = Math.max(options.lineSizes[id] * sizeScalingZ, minSize);
	                }
	                else if (options.endSizes) {
	                    this._sizes[index * 3] = Math.max(options.endSizes[fromId] * sizeScalingX, minSize);
	                    this._sizes[index * 3 + 2] = Math.max(options.endSizes[toId] * sizeScalingZ, minSize);
	                }
	                else {
	                    this._sizes[index * 3] = sizeScalingX;
	                    this._sizes[index * 3 + 2] = sizeScalingZ;
	                }
	            }
	            _vec3[0] = (fromPositionX + toPositionX) / 2;
	            _vec3[1] = (fromPositionY + toPositionY) / 2;
	            _vec3[2] = (fromPositionZ + toPositionZ) / 2;
	            this._positions[index * 3] = _vec3[0];
	            this._positions[index * 3 + 1] = _vec3[1];
	            this._positions[index * 3 + 2] = _vec3[2];
	            this.minLayoutBoundsX = Math.min(this.minLayoutBoundsX, fromPositionX);
	            this.minLayoutBoundsY = Math.min(this.minLayoutBoundsY, fromPositionY);
	            this.minLayoutBoundsZ = Math.min(this.minLayoutBoundsZ, fromPositionZ);
	            this.minLayoutBoundsX = Math.min(this.minLayoutBoundsX, toPositionX);
	            this.minLayoutBoundsY = Math.min(this.minLayoutBoundsY, toPositionY);
	            this.minLayoutBoundsZ = Math.min(this.minLayoutBoundsZ, toPositionZ);
	            this.maxLayoutBoundsX = Math.max(this.maxLayoutBoundsX, fromPositionX);
	            this.maxLayoutBoundsY = Math.max(this.maxLayoutBoundsY, fromPositionY);
	            this.maxLayoutBoundsZ = Math.max(this.maxLayoutBoundsZ, fromPositionZ);
	            this.maxLayoutBoundsX = Math.max(this.maxLayoutBoundsX, toPositionX);
	            this.maxLayoutBoundsY = Math.max(this.maxLayoutBoundsY, toPositionY);
	            this.maxLayoutBoundsZ = Math.max(this.maxLayoutBoundsZ, toPositionZ);
	        }
	        this._updateCumulativeLayoutBounds();
	        this._core.log.write(LogLevel.info, `${this.constructor.name.toLowerCase()} layout ${count} ${Math.round(window.performance.now() - start)}ms`);
	    }
	    update(buffer, ids, fromIds, toIds, options) {
	        const start = window.performance.now();
	        const offset = options.offset === undefined ? 0 : options.offset;
	        const count = options.count === undefined ? ids.length : options.count;
	        const dataView = buffer.dataView;
	        const _vec2 = create();
	        const _vec3 = create$3();
	        const _quat = create$1();
	        const endMinColor = options.endMinColor === undefined ? 0 : options.endMinColor;
	        const endMaxColor = options.endMaxColor === undefined ? 1 : options.endMaxColor;
	        const lineMinColor = options.lineMinColor === undefined ? 0 : options.lineMinColor;
	        const lineMaxColor = options.lineMaxColor === undefined ? 1 : options.lineMaxColor;
	        const minOrder = options.minOrder === undefined ? 0 : options.minOrder;
	        const maxOrder = options.maxOrder === undefined ? 1 : options.maxOrder;
	        const orderReverse = options.orderReverse === undefined ? false : options.orderReverse;
	        const minStaggerOrder = options.minStaggerOrder === undefined ? 0 : options.minStaggerOrder;
	        const maxStaggerOrder = options.maxStaggerOrder === undefined ? 1 : options.maxStaggerOrder;
	        const staggerOrderReverse = options.staggerOrderReverse === undefined ? false : options.staggerOrderReverse;
	        const reverseX = options.reverseX === undefined ? false : options.reverseX;
	        const reverseY = options.reverseY === undefined ? false : options.reverseY;
	        const reverseZ = options.reverseZ === undefined ? false : options.reverseZ;
	        this._updateModelBounds(options);
	        const lookup = buffer.lookup;
	        const selection = options.selected && options.selected.size > 0;
	        for (let i = 0; i < count; i++) {
	            const id = ids[i + offset];
	            const fromId = fromIds[id];
	            const toId = toIds[id];
	            const index = lookup[id];
	            let positionX = this._positions[index * 3];
	            let positionY = this._positions[index * 3 + 1];
	            let positionZ = this._positions[index * 3 + 2];
	            if (this._isFacetted) {
	                if (reverseX) {
	                    positionX = this.minModelBoundsX + this.minModelBoundsX + this._facetSizeX * (1 + this._facetSpacingX) - positionX;
	                }
	                if (reverseY) {
	                    positionY = this.minModelBoundsY + this.minModelBoundsY + this._facetSizeY * (1 + this._facetSpacingY) - positionY;
	                }
	                if (reverseZ) {
	                    positionZ = this.minModelBoundsZ + this.minModelBoundsZ + this._facetSizeZ * (1 + this._facetSpacingZ) - positionZ;
	                }
	                const facetX = options.facetCoordsX ? options.facetCoordsX[id] : 0;
	                const facetY = options.facetCoordsY ? options.facetCoordsY[id] : 0;
	                const facetZ = options.facetCoordsZ ? options.facetCoordsZ[id] : 0;
	                positionX += facetX * this._facetSizeX * (1 + this._facetSpacingX);
	                positionY += facetY * this._facetSizeY * (1 + this._facetSpacingY);
	                positionZ += facetZ * this._facetSizeZ * (1 + this._facetSpacingZ);
	            }
	            else {
	                if (reverseX) {
	                    positionX = this.minModelBoundsX + this.maxModelBoundsX - positionX;
	                }
	                if (reverseY) {
	                    positionY = this.minModelBoundsY + this.maxModelBoundsY - positionY;
	                }
	                if (reverseZ) {
	                    positionZ = this.minModelBoundsZ + this.maxModelBoundsZ - positionZ;
	                }
	            }
	            _vec3[0] = (positionX - this.modelOriginX) * this._boundsScaling;
	            _vec3[1] = (positionY - this.modelOriginY) * this._boundsScaling;
	            _vec3[2] = (positionZ - this.modelOriginZ) * this._boundsScaling;
	            UnitVertex.setTranslation(dataView, index, _vec3);
	            _vec3[0] = this._sizes[index * 3] * this._boundsScaling;
	            _vec3[1] = this._sizes[index * 3 + 1] * this._boundsScaling;
	            _vec3[2] = this._sizes[index * 3 + 2] * this._boundsScaling;
	            UnitVertex.setScale(dataView, index, _vec3);
	            _quat[0] = this._rotations[index * 4];
	            _quat[1] = this._rotations[index * 4 + 1];
	            _quat[2] = this._rotations[index * 4 + 2];
	            _quat[3] = this._rotations[index * 4 + 3];
	            if (reverseX) {
	                _quat[1] = -_quat[1];
	                _quat[2] = -_quat[2];
	            }
	            if (reverseY) {
	                _quat[0] = -_quat[0];
	                _quat[2] = -_quat[2];
	            }
	            if (reverseZ) {
	                _quat[0] = -_quat[0];
	                _quat[1] = -_quat[1];
	            }
	            UnitVertex.setRotation(dataView, index, _quat);
	            let size;
	            if (options.endColors) {
	                size = 1 / (endMaxColor - endMinColor + 1);
	                const fromColor = MathHelper.normalize(options.endColors[fromId], endMinColor, endMaxColor, size / 2, 1 - size / 2);
	                const toColor = MathHelper.normalize(options.endColors[toId], endMinColor, endMaxColor, size / 2, 1 - size / 2);
	                set(_vec2, fromColor, toColor);
	                UnitVertex.setColor(dataView, index, _vec2);
	            }
	            else if (options.lineColors) {
	                size = 1 / (lineMaxColor - lineMinColor + 1);
	                const color = MathHelper.normalize(options.lineColors[id], lineMinColor, lineMaxColor, size / 2, 1 - size / 2);
	                set(_vec2, color, color);
	                UnitVertex.setColor(dataView, index, _vec2);
	            }
	            else {
	                UnitVertex.setColor(dataView, index, Constants.VECTOR2_ONE);
	            }
	            UnitVertex.setIdHover(dataView, index, options.hover ? options.hover[id] : id);
	            UnitVertex.setSelected(dataView, index, selection ? options.selected.has(id) ? 1 : -1 : 0);
	            if (options.order !== undefined) {
	                const order = MathHelper.normalize(options.order[id], minOrder, maxOrder, 0, 1);
	                _vec2[0] = orderReverse ? 1 - order : order;
	            }
	            else {
	                _vec2[0] = count == 1 ? 0 : i / (count - 1);
	            }
	            if (options.staggerOrder !== undefined) {
	                _vec2[1] = options.staggerOrder;
	            }
	            else if (options.staggerOrders) {
	                const stagger = MathHelper.normalize(options.staggerOrders[id], minStaggerOrder, maxStaggerOrder, 0, 1);
	                _vec2[1] = staggerOrderReverse ? 1 - stagger : stagger;
	            }
	            else {
	                _vec2[1] = count == 1 ? 0 : i / (count - 1);
	            }
	            UnitVertex.setOrder(dataView, index, _vec2);
	            UnitVertex.setMaterial(dataView, index, options.material ? options.material : options.materials ? options.materials[id] : 0);
	            UnitVertex.setRounding(dataView, index, options.rounding ? options.rounding * this._boundsScaling : options.roundings ? options.roundings[id] * this._boundsScaling : 0);
	            UnitVertex.setSdfBuffer(dataView, index, options.sdfBuffer ? options.sdfBuffer : options.sdfBuffers ? options.sdfBuffers[id] : this._core.config.sdfBuffer);
	            UnitVertex.setSdfBorder(dataView, index, options.sdfBorder ? options.sdfBorder : options.sdfBorders ? options.sdfBorders[id] : this._core.config.sdfBorder);
	        }
	        buffer.update();
	        this._core.log.write(LogLevel.info, `${this.constructor.name.toLowerCase()} update ${count} ${Math.round(window.performance.now() - start)}ms`);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class AtlasBase {
	    get imageData() { return this._imageData; }
	    set imageData(value) {
	        if (this._imageData != value) {
	            this._imageData = value;
	            this._changed = true;
	        }
	    }
	    constructor() {
	        this._imageData = null;
	    }
	    copyFrom(atlas) {
	        if (atlas.imageData) {
	            this._imageData = atlas.imageData;
	            this._changed = true;
	        }
	        else {
	            this.imageData = null;
	        }
	    }
	    update() { }
	}
	let Atlas$2 = class Atlas extends AtlasBase {
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class BufferBase {
	    get isInitialized() { return this._isInitialized; }
	    get ids() { return this._ids; }
	    get dataView() { return this._dataView; }
	    get vertices() { return this._vertices; }
	    get lookup() { return this._lookup; }
	    get length() { return this._length; }
	    get selected() { return this._selected; }
	    constructor(core, ids) {
	        this._core = core;
	        this._ids = ids;
	        this._length = ids.length;
	        this._vertices = new ArrayBuffer(this._length * UnitVertex.SIZE_BYTES);
	        this._dataView = new DataView(this._vertices);
	        this._selected = new Set();
	        this.from = 0;
	        this.to = 1;
	        this.unitType = UnitType.block;
	        this._lookup = {};
	        for (let i = 0; i < this._length; i++) {
	            const id = ids[i];
	            this._lookup[id] = i;
	            UnitVertex.setRotation(this._dataView, i, Constants.QUAT_IDENTITY);
	        }
	    }
	    createShared() {
	        const buffer = Object.create(this);
	        buffer._vertices = new ArrayBuffer(buffer._vertices.byteLength);
	        buffer._dataView = new DataView(buffer._vertices);
	        return buffer;
	    }
	    copyFrom(buffer) {
	        const start = window.performance.now();
	        const fromDataView = buffer.dataView;
	        const toDataView = this._dataView;
	        const lookup = buffer.lookup;
	        for (let i = 0; i < this._length; i++) {
	            const index = lookup[this._ids[i]];
	            if (index != null) {
	                UnitVertex.copyIdHover(fromDataView, index, toDataView, i);
	                UnitVertex.copyTranslation(fromDataView, index, toDataView, i);
	                UnitVertex.copyScale(fromDataView, index, toDataView, i);
	                UnitVertex.copyRotation(fromDataView, index, toDataView, i);
	                UnitVertex.copyColor(fromDataView, index, toDataView, i);
	                UnitVertex.copySelected(fromDataView, index, toDataView, i);
	                UnitVertex.copyMaterial(fromDataView, index, toDataView, i);
	                UnitVertex.copyRounding(fromDataView, index, toDataView, i);
	                UnitVertex.copyOrder(fromDataView, index, toDataView, i);
	                UnitVertex.copyTexCoord(fromDataView, index, toDataView, i);
	                UnitVertex.copyTexture(fromDataView, index, toDataView, i);
	                UnitVertex.copySdfBuffer(fromDataView, index, toDataView, i);
	                UnitVertex.copySdfBorder(fromDataView, index, toDataView, i);
	                UnitVertex.copyParameter1(fromDataView, index, toDataView, i);
	                UnitVertex.copyParameter2(fromDataView, index, toDataView, i);
	            }
	            else {
	                UnitVertex.setRotation(toDataView, i, Constants.QUAT_IDENTITY);
	            }
	        }
	        this.unitType = buffer.unitType;
	        this._selected = buffer.selected;
	        this._core.log.write(LogLevel.info, `buffer copied ${this._length} ${Math.round(window.performance.now() - start)}ms`);
	    }
	    update() { }
	    updateSelection(options) {
	        const start = window.performance.now();
	        const ids = options && options.ids ? options.ids : this._ids;
	        const offset = options && options.offset !== undefined ? options.offset : 0;
	        const count = options && options.count !== undefined ? options.count : ids.length;
	        const selection = this._selected.size > 0;
	        const dataView = this._dataView;
	        for (let i = 0; i < count; i++) {
	            const id = ids[i + offset];
	            const index = this._lookup[id];
	            UnitVertex.setSelected(dataView, index, selection ? this._selected.has(id) ? 1 : -1 : 0);
	        }
	        this.update();
	        this._core.log.write(LogLevel.info, `buffer update selection ${count} ${Math.round(window.performance.now() - start)}ms`);
	    }
	}
	class TransitionBufferBase {
	    get pickIdLookup() { return this._pickIdLookup; }
	    get currentBuffer() { return this._isBuffer1Current ? this._buffer1 : this._buffer2; }
	    get previousBuffer() { return this._isBuffer1Current ? this._buffer2 : this._buffer1; }
	    get currentPalette() { return this._isBuffer1Current ? this._palette1 : this._palette2; }
	    get previousPalette() { return this._isBuffer1Current ? this._palette2 : this._palette1; }
	    get currentAtlas() { return this._isBuffer1Current ? this._atlas1 : this._atlas2; }
	    get previousAtlas() { return this._isBuffer1Current ? this._atlas2 : this._atlas1; }
	    get isInitialized() { return this._isInitialized; }
	    get length() { return this._length; }
	    constructor(core, ids, bufferType, paletteType, atlasType) {
	        this.bufferType = bufferType;
	        this.paletteType = paletteType;
	        this.atlasType = atlasType;
	        this._core = core;
	        this._length = ids.length;
	        this.id = TransitionBufferBase._id++;
	        this.isVisible = true;
	        this.transitionTime = 1;
	        this.activeId = -1;
	        const start = window.performance.now();
	        this._buffer1 = new bufferType(core, ids);
	        this._buffer2 = this._buffer1.createShared();
	        this._palette1 = new paletteType();
	        this._palette2 = new paletteType();
	        this._atlas1 = new atlasType();
	        this._atlas2 = new atlasType();
	        this.isPickingEnabled = true;
	        this._pickIdLookup = {};
	        const dataView1 = this._buffer1.dataView;
	        const dataView2 = this._buffer2.dataView;
	        const _vec4 = create$2();
	        for (let i = 0; i < this._length; i++) {
	            const id = ids[i];
	            const pickId = PickHelper.nextPickId();
	            this._pickIdLookup[pickId] = id;
	            PickHelper.encodeNumber(pickId, PickType.data, _vec4);
	            UnitVertex.setIdColor(dataView1, i, _vec4);
	            UnitVertex.setIdColor(dataView2, i, _vec4);
	        }
	        this._core.log.write(LogLevel.info, `transition buffer created ${this._length} ${Math.round(window.performance.now() - start)}ms`);
	    }
	    swap() {
	        this._isBuffer1Current = !this._isBuffer1Current;
	    }
	    copyFrom(transitionBuffer) {
	        const start = window.performance.now();
	        this.key = transitionBuffer.key;
	        this.isVisible = transitionBuffer.isVisible;
	        this.transitionTime = transitionBuffer.transitionTime;
	        this.isPickingEnabled = transitionBuffer.isPickingEnabled;
	        this.unitType = transitionBuffer.unitType;
	        this.activeId = transitionBuffer.activeId;
	        this.currentBuffer.copyFrom(transitionBuffer.currentBuffer);
	        this.previousBuffer.copyFrom(transitionBuffer.previousBuffer);
	        this.currentBuffer.update();
	        this.previousBuffer.update();
	        this.currentPalette.copyFrom(transitionBuffer.currentPalette);
	        this.previousPalette.copyFrom(transitionBuffer.previousPalette);
	        this.currentAtlas.copyFrom(transitionBuffer.currentAtlas);
	        this.previousAtlas.copyFrom(transitionBuffer.previousAtlas);
	        this._core.log.write(LogLevel.info, `transition buffer copied ${this._length} ${Math.round(window.performance.now() - start)}ms`);
	    }
	}
	TransitionBufferBase._id = 1;
	let Buffer$2 = class Buffer extends BufferBase {
	    constructor(core, ids) {
	        super(core, ids);
	    }
	};
	let TransitionBuffer$2 = class TransitionBuffer extends TransitionBufferBase {
	    constructor(core, ids) {
	        super(core, ids, Buffer$2, Palette$2, Atlas$2);
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class DebugAxes {
	    get vertices() { return this._vertices; }
	    get indices() { return this._indices; }
	    get indexCount() { return this._indexCount; }
	    get isInitialized() { return this._isInitialized; }
	    initialize() {
	        let vertexOffset = 0;
	        let indexOffset = 0;
	        const axisVertices = Cube.POSITIONS;
	        const axisIndices = Cube.INDICES;
	        this._vertices = new ArrayBuffer(3 * PositionColorVertex.SIZE_BYTES * axisVertices.length / PositionVertex.SIZE);
	        const verticesView = new DataView(this._vertices);
	        this._indices = new Uint16Array(3 * axisIndices.length + 4);
	        const vertexCount = axisVertices.length / PositionVertex.SIZE;
	        const indexCount = axisIndices.length;
	        const transform = create$4();
	        const length = 1;
	        const width = 0.01;
	        transform[0] = length;
	        transform[5] = width;
	        transform[10] = width;
	        transform[12] = 0.5;
	        transform[13] = 0;
	        transform[14] = 0;
	        this._createAxis(axisVertices, axisIndices, verticesView, this._indices, Constants.VECTOR3_UNITX, transform, vertexOffset, indexOffset);
	        indexOffset += indexCount;
	        this._indices[indexOffset++] = axisIndices[indexCount - 1] + vertexOffset;
	        vertexOffset += vertexCount;
	        this._indices[indexOffset++] = axisIndices[0] + vertexOffset;
	        transform[0] = width;
	        transform[5] = length;
	        transform[10] = width;
	        transform[12] = 0;
	        transform[13] = 0.5;
	        transform[14] = 0;
	        this._createAxis(axisVertices, axisIndices, verticesView, this._indices, Constants.VECTOR3_UNITY, transform, vertexOffset, indexOffset);
	        indexOffset += indexCount;
	        this._indices[indexOffset++] = axisIndices[indexCount - 1] + vertexOffset;
	        vertexOffset += vertexCount;
	        this._indices[indexOffset++] = axisIndices[0] + vertexOffset;
	        transform[0] = width;
	        transform[5] = width;
	        transform[10] = length;
	        transform[12] = 0;
	        transform[13] = 0;
	        transform[14] = 0.5;
	        this._createAxis(axisVertices, axisIndices, verticesView, this._indices, Constants.VECTOR3_UNITZ, transform, vertexOffset, indexOffset);
	        this._indexCount = this._indices.length;
	        this._isInitialized = true;
	    }
	    update(elapsedTime) { }
	    _createAxis(axisVertices, axisIndices, verticesView, indices, color, transform, vertexOffset, indexOffset) {
	        const position = create$3();
	        const vertexCount = axisVertices.length / PositionVertex.SIZE;
	        const indexCount = axisIndices.length;
	        for (let i = 0; i < vertexCount; i++) {
	            set$3(position, axisVertices[i * PositionVertex.SIZE], axisVertices[i * PositionVertex.SIZE + 1], axisVertices[i * PositionVertex.SIZE + 2]);
	            transformMat4$2(position, position, transform);
	            PositionColorVertex.setPosition(verticesView, vertexOffset + i, position);
	            PositionColorVertex.setColor(verticesView, vertexOffset + i, color);
	        }
	        for (let i = 0; i < indexCount; i++) {
	            indices[indexOffset + i] = axisIndices[i] + vertexOffset;
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	class RendererConfig {
	    reset() { }
	}
	class RendererBase {
	    get isInitialized() { return this._isInitialized; }
	    get config() { return this._config; }
	    get devicePixelRatio() { return this._devicePixelRatio; }
	    get width() { return this._canvas.width; }
	    set width(value) { this._options.width = value; }
	    get height() { return this._canvas.height; }
	    set height(value) { this._options.height = value; }
	    get webXRReferenceSpace() { return this._webXRReferenceSpace; }
	    get pickedType() { return this._pickedType; }
	    get pickedId() { return this._pickedId; }
	    get isCapturingPickImage() { return this._isCapturingPickImage; }
	    capturePickImage() {
	        this._isCapturingPickImage = true;
	    }
	    get backgroundColor() { return this._backgroundColor; }
	    set backgroundColor(value) {
	        if (!exactEquals(value, this._backgroundColor)) {
	            this._backgroundColor = value;
	        }
	    }
	    get currentAxes() { return this._isAxes1Current ? this._axes1 : this._axes2; }
	    set currentAxes(value) { if (this._isAxes1Current) {
	        this._axes1 = value;
	    }
	    else {
	        this._axes2 = value;
	    } }
	    get previousAxes() { return this._isAxes1Current ? this._axes2 : this._axes1; }
	    set previousAxes(value) { if (this._isAxes1Current) {
	        this._axes2 = value;
	    }
	    else {
	        this._axes1 = value;
	    } }
	    swapAxes() { this._isAxes1Current = !this._isAxes1Current; }
	    createCartesian2dAxesVisual(axes) {
	        return new AxesVisual(axes);
	    }
	    createCartesian3dAxesVisual(axes) {
	        return new AxesVisual(axes);
	    }
	    _createDebugAxesVisual(debugAxes) { return null; }
	    createLabelSetVisual(labelSet) {
	        return new LabelSetVisual$2(labelSet);
	    }
	    createControllerVisual(controller) {
	        return new ControllerVisual$1(controller);
	    }
	    ;
	    createTransitionBuffer(ids) {
	        return new TransitionBuffer$2(this._core, ids);
	    }
	    createImageVisual(image) {
	        return new ImageVisual$2(image);
	    }
	    ;
	    createFontVisual(font) {
	        return new FontVisual$2(font);
	    }
	    constructor(options) {
	        this._options = options;
	        this.fonts = {};
	    }
	    get isWebXRSupported() { return false; }
	    initialize(core) {
	        this._core = core;
	        this._canvas = document.createElement("canvas");
	        const contextmenu = this._options && this._options.contextmenu;
	        if (!contextmenu) {
	            this._canvas.addEventListener("contextmenu", (e) => { e.preventDefault(); });
	        }
	        this._canvas.tabIndex = this._core.container.tabIndex;
	        this._canvas.style.display = "block";
	        this._canvas.style.touchAction = "none";
	        this._core.container.appendChild(this._canvas);
	        this._mvMatrices = [create$4(), create$4()];
	        this.pickPMatrix = create$4();
	        this.axesVisibility = AxesVisibility.current;
	        this._debugAxes = new DebugAxes();
	        this._debugAxesVisual = this._createDebugAxesVisual(this._debugAxes);
	        this.transitionTime = 1;
	        this.transitionBuffers = [];
	        this.areLabelsVisible = true;
	        this.labelSets = [];
	        this.controllers = [];
	        this.areImagesVisible = true;
	        this.images = [];
	        this._viewports = [new DOMRect(), new DOMRect()];
	        this.isPickingEnabled = false;
	        this._pickedType = PickType.none;
	        this._pickedId = 0;
	        this._lassoMMatrix = create$4();
	        this._lassoThickness = create();
	        this._resizeMinimumDelay = -1;
	        this._previousResizeWidth = -1;
	        this._previousResizeHeight = -1;
	    }
	    remove() {
	        this._core.container.removeChild(this._canvas);
	    }
	    finalize() {
	        this._isInitialized = false;
	    }
	    setSize(elapsedTime) {
	        if (this._options && this._options.width && this._options.height) {
	            this._devicePixelRatio = 1;
	            this._resizeWidth = this._options.width;
	            this._resizeHeight = this._options.height;
	        }
	        else {
	            this._devicePixelRatio = window.devicePixelRatio || 1;
	            this._resizeWidth = this._core.container.clientWidth * devicePixelRatio;
	            this._resizeHeight = this._core.container.clientHeight * devicePixelRatio;
	        }
	        if (this._resizeWidth != this._previousResizeWidth || this._resizeHeight != this._previousResizeHeight) {
	            this._previousResizeWidth = this._resizeWidth;
	            this._previousResizeHeight = this._resizeHeight;
	            this._isResizing = true;
	            this._resizeElapsedTime = elapsedTime;
	        }
	        if (this._isResizing) {
	            if (this._resizeElapsedTime > this._resizeMinimumDelay && this._isInitialized) {
	                this._isResizing = false;
	                this._resizeMinimumDelay = this._core.config.resizeMinimumDelay;
	                this._resize(this._resizeWidth, this._resizeHeight);
	            }
	            else {
	                this._resizeElapsedTime += elapsedTime;
	            }
	        }
	    }
	    _resize(width, height) {
	        this._canvas.style.width = `${Math.floor(width / this._devicePixelRatio)}px`;
	        this._canvas.style.height = `${Math.floor(height / this._devicePixelRatio)}px`;
	        width = Math.floor(width);
	        height = Math.floor(height);
	        this._canvas.width = width;
	        this._canvas.height = height;
	    }
	    update(elapsedTime) {
	        for (let i = 0; i < this.transitionBuffers.length; i++) {
	            const transitionBuffer = this.transitionBuffers[i];
	            if (transitionBuffer.isVisible) {
	                const previous = transitionBuffer.previousPalette;
	                const current = transitionBuffer.currentPalette;
	                if (previous) {
	                    previous.update();
	                }
	                if (current) {
	                    current.update();
	                }
	            }
	        }
	        for (let i = 0; i < this.transitionBuffers.length; i++) {
	            const transitionBuffer = this.transitionBuffers[i];
	            if (transitionBuffer.isVisible) {
	                const previous = transitionBuffer.previousAtlas;
	                const current = transitionBuffer.currentAtlas;
	                if (previous) {
	                    previous.update();
	                }
	                if (current) {
	                    current.update();
	                }
	            }
	        }
	        if (this._core.config.isDebugVisible) {
	            if (this._debugAxesVisual) {
	                this._debugAxesVisual.mMatrix = this.mMatrix;
	                this._debugAxesVisual.vMatrices = this.vMatrices;
	                this._debugAxesVisual.pMatrices = this.pMatrices;
	                this._debugAxesVisual.viewports = this._viewports;
	                this._debugAxesVisual.viewportOffset = this._viewportOffset;
	                this._debugAxesVisual.viewportCount = this._viewportCount;
	            }
	        }
	        if (this.areLabelsVisible) {
	            for (let i = 0; i < this.labelSets.length; i++) {
	                const labelSetVisual = this.labelSets[i];
	                if (labelSetVisual.isVisible) {
	                    this.labelSets[i].label.update(elapsedTime);
	                    labelSetVisual.mMatrix = this.mMatrix;
	                    labelSetVisual.vMatrices = this.vMatrices;
	                    labelSetVisual.pMatrices = this.pMatrices;
	                    labelSetVisual.isPickingEnabled = this.isPickingEnabled;
	                    labelSetVisual.pickPMatrix = this.pickPMatrix;
	                    labelSetVisual.pickVMatrix = this.pickVMatrix;
	                    labelSetVisual.viewports = this._viewports;
	                    labelSetVisual.viewportOffset = this._viewportOffset;
	                    labelSetVisual.viewportCount = this._viewportCount;
	                    labelSetVisual.update(elapsedTime);
	                }
	            }
	        }
	        if (this.areImagesVisible) {
	            for (let i = 0; i < this.images.length; i++) {
	                const imageVisual = this.images[i];
	                if (imageVisual && imageVisual.isVisible) {
	                    const image = this.images[i].image;
	                    image.update(elapsedTime);
	                    imageVisual.mMatrix = this.mMatrix;
	                    imageVisual.vMatrices = this.vMatrices;
	                    imageVisual.pMatrices = this.pMatrices;
	                    imageVisual.isPickingEnabled = this.isPickingEnabled;
	                    imageVisual.pickPMatrix = this.pickPMatrix;
	                    imageVisual.pickVMatrix = this.pickVMatrix;
	                    imageVisual.viewports = this._viewports;
	                    imageVisual.viewportOffset = this._viewportOffset;
	                    imageVisual.viewportCount = this._viewportCount;
	                    imageVisual.update(elapsedTime);
	                }
	            }
	        }
	        for (let i = 0; i < this.controllers.length; i++) {
	            const controllerVisual = this.controllers[i];
	            if (controllerVisual.isVisible) {
	                const controller = this.controllers[i].controller;
	                controller.update(elapsedTime);
	                controllerVisual.vMatrices = this.vMatrices;
	                controllerVisual.inverseVMatrices = this.vMatrices;
	                controllerVisual.pMatrices = this.pMatrices;
	                controllerVisual.viewports = this._viewports;
	                controllerVisual.viewportOffset = this._viewportOffset;
	                controllerVisual.viewportCount = this._viewportCount;
	                controllerVisual.update(elapsedTime);
	            }
	        }
	        const axesVisuals = this.axesVisibility == AxesVisibility.current ? this.currentAxes : this.axesVisibility == AxesVisibility.previous ? this.previousAxes : null;
	        if (axesVisuals) {
	            for (let i = 0; i < axesVisuals.length; i++) {
	                const axesVisual = axesVisuals[i];
	                if (axesVisual.isVisible) {
	                    const axes = axesVisual.axes;
	                    axes.mMatrix = this.mMatrix;
	                    axes.vMatrix = this.vMatrices[0];
	                    axes.update(elapsedTime);
	                    axesVisual.vMatrices = this.vMatrices;
	                    axesVisual.pMatrices = this.pMatrices;
	                    axesVisual.isPickingEnabled = this.isPickingEnabled;
	                    axesVisual.pickPMatrix = this.pickPMatrix;
	                    axesVisual.pickVMatrix = this.pickVMatrix;
	                    axesVisual.viewports = this._viewports;
	                    axesVisual.viewportOffset = this._viewportOffset;
	                    axesVisual.viewportCount = this._viewportCount;
	                    axesVisual.update(elapsedTime);
	                }
	            }
	        }
	        for (const key in this.fonts) {
	            const fontVisual = this.fonts[key];
	            const font = fontVisual.font;
	            font.update();
	            fontVisual.update();
	        }
	    }
	    getVertexPosition(position, pickedId) {
	        for (let i = 0; i < this.transitionBuffers.length; i++) {
	            const transitionBuffer = this.transitionBuffers[i];
	            const id = transitionBuffer.pickIdLookup[pickedId];
	            if (id > -1) {
	                const index = transitionBuffer.currentBuffer.lookup[id];
	                const dataView = transitionBuffer.currentBuffer.dataView;
	                UnitVertex.getTranslation(dataView, index, position);
	                break;
	            }
	        }
	    }
	    render(elapsedTime, xrFrame) {
	        return __awaiter$2(this, void 0, void 0, function* () { });
	    }
	    prepare(xrFrame) { }
	    initializeWebXR(session) {
	        return null;
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let Quad$1 = class Quad {
	    get isInitialized() { return this._isInitialized; }
	    get vertexBuffer() { return this._vertexBuffer; }
	    get indexBuffer() { return this._indexBuffer; }
	    get indexCount() { return this._indexCount; }
	    initializeContext(gl) {
	        const _vec3 = fromValues$3(2, 2, 2);
	        const _mat4 = create$4();
	        fromScaling(_mat4, _vec3);
	        const vertices = Quad$2.positions(_mat4);
	        this._vertexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	        const indices = Quad$2.INDICES;
	        this._indexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
	        this._indexCount = indices.length;
	        this._isInitialized = true;
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let Atlas$1 = class Atlas extends AtlasBase {
	    get texture() { return this._texture; }
	    get defaultTexture() { return this._defaultTexture; }
	    initializeContext(core, gl) {
	        this._gl = gl;
	        this._defaultTexture = TextureHelper.create(gl, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST, new Uint8Array([0xff, 0xff, 0xff, 0xff]));
	        this._updateTexture();
	    }
	    update() {
	        super.update();
	        if (this._changed) {
	            this._changed = false;
	            this._updateTexture();
	        }
	    }
	    _updateTexture() {
	        if (this._imageData) {
	            this._texture = TextureHelper.fromImage(this._gl, this._imageData, false, this._gl.LINEAR);
	        }
	        else {
	            this._texture = null;
	        }
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let Palette$1 = class Palette extends PaletteBase {
	    get texture() { return this._texture; }
	    get defaultTexture() { return this._defaultTexture; }
	    initializeContext(core, gl) {
	        this._gl = gl;
	        this._defaultTexture = TextureHelper.create(gl, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST, core.config.paletteColor);
	        this._updateTexture();
	    }
	    update() {
	        super.update();
	        if (this._changed) {
	            this._changed = false;
	            this._updateTexture();
	        }
	    }
	    _updateTexture() {
	        if (this._colors) {
	            const colors = new Uint8Array(this._colors);
	            for (let i = 0; i < colors.length; i++) {
	                colors[i] = Math.pow(colors[i] / 0xff, 2.2) * 0xff;
	            }
	            this._texture = TextureHelper.create(this._gl, this._colors.length / 4, 1, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._gl.NEAREST, colors);
	        }
	        else {
	            this._texture = null;
	        }
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let Buffer$1 = class Buffer extends BufferBase {
	    get vertexBuffer() { return this._vertexBuffer; }
	    initializeContext(gl) {
	        this._gl = gl;
	        this._vertexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, this._vertices, gl.STATIC_DRAW);
	        this._isInitialized = true;
	    }
	    update() {
	        if (this._isInitialized) {
	            const start = window.performance.now();
	            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	            this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, this._vertices);
	            this._core.log.write(LogLevel.info, `buffer updated ${this._length} ${Math.round(window.performance.now() - start)}ms`);
	        }
	    }
	};
	let TransitionBuffer$1 = class TransitionBuffer extends TransitionBufferBase {
	    constructor(core, ids) {
	        super(core, ids, Buffer$1, Palette$1, Atlas$1);
	    }
	    initializeContext(gl) {
	        this._buffer1.initializeContext(gl);
	        this._buffer2.initializeContext(gl);
	        this._palette1.initializeContext(this._core, gl);
	        this._palette2.initializeContext(this._core, gl);
	        this._atlas1.initializeContext(this._core, gl);
	        this._atlas2.initializeContext(this._core, gl);
	        this._isInitialized = true;
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let Config$1 = class Config extends RendererConfig {
	    constructor() {
	        super();
	        this.reset();
	    }
	    reset() {
	        this.specularIntensity = 0.15;
	        this.specularPower = 150;
	        this.lightPosition = fromValues$3(-0.5, 0.5, 0);
	        this.ambient = 0.01;
	        const _quat1 = create$1();
	        const _quat2 = create$1();
	        let angle = AngleHelper.degreesToRadians(15);
	        setAxisAngle(_quat1, Constants.VECTOR3_UNITX, angle);
	        multiply(_quat2, _quat1, _quat2);
	        angle = AngleHelper.degreesToRadians(-15);
	        setAxisAngle(_quat1, Constants.VECTOR3_UNITY, angle);
	        multiply(_quat2, _quat2, _quat1);
	        this.directionToLight = create$3();
	        transformQuat(this.directionToLight, Constants.VECTOR3_UNITZ, _quat2);
	        this.halfAngle = create$3();
	        add(this.halfAngle, Constants.VECTOR3_UNITZ, this.directionToLight);
	        normalize$2(this.halfAngle, this.halfAngle);
	        this.isFxaaEnabled = false;
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let Resources$1 = class Resources {
	    bindFramebuffer(framebuffer) {
	        if (this.framebuffer != framebuffer) {
	            this.framebuffer = framebuffer;
	            this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, framebuffer);
	        }
	    }
	    initializeContext(gl) {
	        this._gl = gl;
	        this.framebuffer = this._gl.createFramebuffer();
	        this.ANGLE_instanced_arrays = gl.getExtension("ANGLE_instanced_arrays");
	        this.OES_standard_derivatives = gl.getExtension("OES_standard_derivatives");
	        this.EXT_frag_depth = gl.getExtension("EXT_frag_depth");
	        this.OES_element_index_uint = gl.getExtension("OES_element_index_uint");
	        this.WEBGL_lose_context = gl.getExtension("WEBGL_lose_context");
	    }
	};
	Resources$1.glsl = {
	    "anaglyph.fragment.fx": "#version 100\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\nuniform vec4 uViewport;\nuniform sampler2D uSampler1;\nuniform sampler2D uSampler2;\nconst vec3 LEFT_MASK = vec3(1.0, 0.0, 0.0);\nconst vec3 RIGHT_MASK = vec3(0.0, 1.0, 1.0);\nvoid main() {\nvec2 texCoords = (gl_FragCoord.xy - uViewport.xy) / uViewport.zw;\nvec3 color = LEFT_MASK * dot(texture2D(uSampler1, texCoords).rgb, LUMINANCE);\ncolor += RIGHT_MASK * dot(texture2D(uSampler2, texCoords).rgb, LUMINANCE);\ngl_FragColor = vec4(color, 1.0);\n}\n",
	    "color.fragment.fx": "#version 100\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\nvarying lowp vec3 vColor;\nvoid main(void)\n{\ngl_FragColor = vec4(pow(vColor, GAMMA), 1.0);\n}\n",
	    "color.vertex.fx": "#version 100\nattribute vec3 aPosition;\nattribute lowp vec3 aColor;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nvarying lowp vec3 vColor;\nvoid main(void) {\ngl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);\nvColor = aColor;\n}\n",
	    "lasso.fragment.fx": "#version 100\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\nuniform vec3 uColor;\nuniform vec2 uThickness;\nuniform float uDashWidth;\nvarying mediump vec2 vTexCoord;\nvoid main(void)\n{\nvec2 distance = min(vTexCoord, 1.0 - vTexCoord);\nif (distance.x > uThickness.x && distance.y > uThickness.y) {\ndiscard;\n}\nvec2 texCoord = vec2(vTexCoord.x, 1.0 - vTexCoord.y);\nvec2 thickness = uThickness * uDashWidth;\nvec2 b = mod(floor(texCoord / thickness), 2.0);\nif (b.x > 0.0 && texCoord.x < 1.0 - thickness.x) {\ndiscard;\n}\nif (b.y > 0.0 && texCoord.y < 1.0 - thickness.y) {\ndiscard;\n}\ngl_FragColor = vec4(pow(uColor, GAMMA), 1.0);\n}\n",
	    "lasso.vertex.fx": "#version 100\nattribute vec3 aPosition;\nattribute mediump vec2 aTexCoord;\nuniform mat4 uMMatrix;\nvarying mediump vec2 vTexCoord;\nvoid main(void) {\ngl_Position = uMMatrix * vec4(aPosition, 1.0);\nvTexCoord = aTexCoord;\n}\n",
	    "model.fragment.fx": "#version 100\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\nuniform sampler2D uSampler;\nuniform vec3 uDirectionToLight;\nuniform vec3 uHalfAngle;\nuniform float uSpecularPower;\nuniform float uSpecularIntensity;\nvarying mediump vec3 vNormal;\nvarying mediump vec2 vTexCoord;\nvoid main(void)\n{\ngl_FragColor = vec4(pow(texture2D(uSampler, vTexCoord).xyz, GAMMA), 1.0);\nvec3 color = texture2D(uSampler, vTexCoord).xyz;\nfloat ambient = 0.01;\nvec3 normal = normalize(vNormal);\nfloat diffuse = 0.5 * max(dot(uDirectionToLight, normal), 0.0);\nfloat specular = pow(clamp(dot(normal, uHalfAngle), 0.0, 1.0), uSpecularPower) * uSpecularIntensity;\ncolor *= (ambient + diffuse);\ncolor += specular;\ncolor = pow(color, GAMMA);\ngl_FragColor = vec4(color, 1.0);\n}\n",
	    "model.vertex.fx": "#version 100\nattribute vec3 aPosition;\nattribute mediump vec3 aNormal;\nattribute mediump vec2 aTexCoord;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nvarying mediump vec3 vNormal;\nvarying mediump vec2 vTexCoord;\nvoid main(void) {\nvTexCoord = aTexCoord;\nmat4 mvMatrix = uVMatrix * uMMatrix;\nvNormal = vec3(mvMatrix * vec4(aNormal, 0.0));\ngl_Position = uPMatrix * mvMatrix * vec4(aPosition, 1.0);\n}\n",
	    "pickgrid.fragment.fx": "#version 100\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\n#define Derivatives\nuniform bool uPick;\nuniform vec2 uFaceSize;\nuniform vec3 uMajorColor;\nuniform vec3 uMinorColor;\nuniform vec3 uZeroColor;\nuniform float uMajorThickness;\nuniform float uMinorThickness;\nuniform float uZeroThickness;\nuniform vec2 uZero;\nuniform vec2 uMinorGridlines;\nuniform vec3 uDirectionToLight;\nvarying lowp vec4 vColor;\nvarying mediump vec2 vTexCoord;\nvarying mediump vec4 vBounds;\nvarying mediump vec3 vNormal;\n#ifdef Derivatives\n#extension GL_OES_standard_derivatives : enable\n#endif\nvoid main(void) {\nif (uPick)\n{\ngl_FragColor = vColor;\n}\nelse\n{\nvec2 buffer;\n#ifdef Derivatives\nbuffer = fwidth(vTexCoord);\n#else\nbuffer = vec2(0.002);\n#endif\nvec2 distance, thickness, step;\nvec4 color = vColor;\nvec2 width = vBounds.zw - vBounds.xy;\ndistance = (vTexCoord - vBounds.xy) / width;\ndistance = min(abs(distance - floor(uMinorGridlines * distance) / uMinorGridlines), abs(distance - ceil(uMinorGridlines * distance) / uMinorGridlines));\ndistance *= width;\nthickness = vec2(uMinorThickness) / uFaceSize;\nstep = smoothstep(thickness, thickness + buffer, distance);\ncolor.xyz = mix(uMinorColor, color.xyz, min(step.x, step.y));\nthickness = vec2(uMajorThickness) / uFaceSize;\ndistance = min(vTexCoord - vBounds.xy, vBounds.zw - vTexCoord);\nstep = smoothstep(thickness, thickness + buffer, distance);\ncolor.xyz = mix(uMajorColor, color.xyz, min(step.x, step.y));\ndistance = abs(vTexCoord - uZero);\nthickness = vec2(uZeroThickness) / uFaceSize;\nstep = smoothstep(thickness, thickness + buffer, distance);\ncolor.xyz = mix(uZeroColor, color.xyz, min(step.x, step.y));\nfloat diffuse = 0.2 * max(dot(uDirectionToLight, vNormal), 0.0);\nfloat ambient = 0.8;\ncolor.xyz *= (ambient + diffuse);\ncolor.xyz = pow(color.xyz, GAMMA);\ngl_FragColor = color;\n}\n}\n",
	    "pickgrid.vertex.fx": "#version 100\nattribute vec3 aPosition;\nattribute lowp vec4 aIdColor;\nattribute mediump vec2 aTexCoord;\nattribute mediump vec3 aNormal;\nattribute mediump vec4 aBounds;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nuniform bool uPick;\nuniform vec4 uPickedIdColor;\nuniform vec3 uBackground;\nuniform vec3 uHighlight;\nvarying lowp vec4 vColor;\nvarying mediump vec2 vTexCoord;\nvarying mediump vec4 vBounds;\nvarying mediump vec3 vNormal;\nvoid main(void) {\nmat4 mvMatrix = uVMatrix * uMMatrix;\nvNormal = normalize(vec3(mvMatrix * vec4(aNormal, 0.0)));\nvTexCoord = aTexCoord;\nvBounds = aBounds;\ngl_Position = uPMatrix * mvMatrix * vec4(aPosition, 1.0);\nif (uPick)\n{\nvColor = aIdColor;\n}\nelse\n{\nvColor = uPickedIdColor == aIdColor ? vec4(uHighlight, 1.0) : vColor = vec4(uBackground, 1.0);\n}\n}\n",
	    "sdftext.fragment.fx": "#version 100\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\n#define Derivatives\nuniform sampler2D uSampler;\nuniform bool uPick;\nuniform vec3 uColor;\nuniform vec3 uHoverColor;\nuniform float uGamma;\nuniform vec3 uBorderColor;\nuniform float uBuffer;\nuniform float uBorderWidth;\nvarying mediump vec2 vTexCoord;\nvarying lowp vec4 vIdColor;\nvarying lowp float vHover;\n#ifdef Derivatives\n#extension GL_OES_standard_derivatives : enable\n#endif\nvoid main(void) {\nif (uPick) {\ngl_FragColor = vIdColor;\n}\nelse {\nfloat distance = texture2D(uSampler, vTexCoord).r;\nif (distance < uBuffer - uBorderWidth) {\ndiscard;\n}\nfloat gamma;\n#ifdef Derivatives\ngamma = fwidth(distance);\n#else\ngamma = uGamma;\n#endif\nfloat value = smoothstep(uBuffer - gamma, uBuffer + gamma, distance);\ngl_FragColor = vec4(pow(mix(uBorderColor, mix(uColor, uHoverColor, vHover), value), GAMMA), 1.0);\n}\n}\n",
	    "sdftext.vertex.fx": "#version 100\nattribute lowp vec4 aIdColor;\nattribute vec3 aPosition;\nattribute mediump vec2 aTexCoord;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nuniform vec4 uPickedIdColor;\nvarying mediump vec2 vTexCoord;\nvarying lowp vec4 vIdColor;\nvarying lowp float vHover;\nvoid main(void) {\ngl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);\nvTexCoord = aTexCoord;\nvIdColor = aIdColor;\nvHover = uPickedIdColor == aIdColor ? 1.0 : 0.0;\n}\n",
	    "simple.vertex.fx": "#version 100\nattribute vec3 aPosition;\nvoid main(void) {\ngl_Position = vec4(aPosition, 1.0);\n}\n",
	    "texture.fragment.fx": "#version 100\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform sampler2D uSampler;\nuniform bool uPick;\nvarying mediump vec2 vTexCoord;\nvoid main(void)\n{\nif (uPick) {\ngl_FragColor = vec4(0.0);\n}\nelse {\ngl_FragColor = vec4(texture2D(uSampler, vTexCoord).xyz, 1.0);\n}\n}\n",
	    "texture.vertex.fx": "#version 100\nattribute vec3 aPosition;\nattribute mediump vec3 aNormal;\nattribute mediump vec2 aTexCoord;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nvarying mediump vec3 vNormal;\nvarying mediump vec2 vTexCoord;\nvoid main(void) {\nmat4 mvMatrix = uVMatrix * uMMatrix;\nvNormal = normalize((mvMatrix * vec4(aNormal, 0.0)).xyz);\ngl_Position = uPMatrix * mvMatrix * vec4(aPosition, 1.0);\nvTexCoord = aTexCoord;\n}\n",
	    "unitblock.fragment.fx": "#version 100\n#define Derivatives\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\nvarying lowp vec4 vIdColor;\nvarying lowp vec2 vVertexColor;\nvarying lowp float vVertexSelected;\nvarying float vAnimation;\nvarying lowp float vHover;\nvarying lowp float vActive;\n#ifdef Derivatives\nvarying vec3 vViewPosition;\n#endif\nuniform sampler2D uSampler;\nuniform sampler2D uPreviousSampler;\nuniform bool uPick;\nuniform vec3 uDirectionToLight;\nuniform vec3 uHalfAngle;\nuniform float uSpecularPower;\nuniform float uSpecularIntensity;\nuniform float uAmbient;\nuniform vec3 uHoverColor;\nuniform vec3 uActiveColor;\nuniform vec3 uSelectedColor;\nuniform float uHighlightMode;\n#ifdef Derivatives\n#extension GL_OES_standard_derivatives : enable\n#endif\nvoid main(void)\n{\nif (uPick)\n{\ngl_FragColor = vIdColor;\n}\nelse\n{\nfloat emissive = 0.0;\nvec3 previousColor = texture2D(uPreviousSampler, vec2(vVertexColor.y, 0.0)).xyz;\nvec3 color = texture2D(uSampler, vec2(vVertexColor.x, 0.0)).xyz;\nif (uHighlightMode < 0.5) {\nemissive = vVertexSelected * 0.5;\nemissive += 1.5 * max(vHover, vActive);\nemissive /= 4.0;\n}\nelse {\npreviousColor = mix(previousColor, vec3(dot(LUMINANCE, previousColor)), max(-vVertexSelected, 0.0));\ncolor = mix(color, vec3(dot(LUMINANCE, color)), max(-vVertexSelected, 0.0));\npreviousColor = mix(previousColor, uSelectedColor, max(vVertexSelected, 0.0));\ncolor = mix(color, uSelectedColor, max(vVertexSelected, 0.0));\npreviousColor = mix(previousColor, uActiveColor, vActive);\ncolor = mix(color, uActiveColor, vActive);\npreviousColor = mix(previousColor, uHoverColor, vHover);\ncolor = mix(color, uHoverColor, vHover);\n}\ncolor = mix(previousColor, color, vAnimation);\nfloat diffuse, specular;\n#ifdef Derivatives\nvec3 normal = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));\ndiffuse = clamp(dot(uDirectionToLight, normal), 0.0, 1.0);\nspecular = pow(clamp(dot(normal, uHalfAngle), 0.0, 1.0), uSpecularPower) * uSpecularIntensity;\n#else\ndiffuse = 1.0;\nspecular = 0.0;\n#endif\ncolor *= (uAmbient + diffuse + emissive);\ncolor += specular;\ncolor = clamp(color, 0.0, 1.0);\ncolor = pow(color, GAMMA);\ngl_FragColor = vec4(color, 1.0);\n}\n}\n",
	    "unitblock.vertex.fx": "#version 100\n#include \"quat.include.fx\"\nattribute mediump vec3 aPosition;\nattribute vec3 aTranslation;\nattribute vec3 aPreviousTranslation;\nattribute mediump vec4 aRotation;\nattribute mediump vec4 aPreviousRotation;\nattribute lowp vec2 aColor;\nattribute lowp vec2 aPreviousColor;\nattribute vec3 aScale;\nattribute vec3 aPreviousScale;\nattribute float aId;\nattribute vec2 aOrder;\nattribute lowp float aSelected;\nattribute lowp float aPreviousSelected;\nattribute lowp vec4 aIdColor;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nuniform float uTime;\nuniform float uDuration;\nuniform float uOrderFrom;\nuniform float uOrderTo;\nuniform float uHover;\nuniform float uActive;\n#define Derivatives\nvarying lowp vec4 vIdColor;\nvarying lowp vec2 vVertexColor;\nvarying lowp float vVertexSelected;\nvarying highp float vAnimation;\nvarying lowp float vHover;\nvarying lowp float vActive;\n#ifdef Derivatives\nvarying vec3 vViewPosition;\n#endif\nvoid main(void)\n{\nif (aOrder.x < uOrderFrom || aOrder.x > uOrderTo)\n{\nvIdColor = vec4(0.0);\nvVertexColor = vec2(0.0);\nvVertexSelected = 0.0;\nvAnimation = 0.0;\nvHover = 0.0;\nvActive = 0.0;\ngl_Position = vec4(0.0);\n#ifdef Derivatives\nvViewPosition = vec3(0.0);\n#endif\n}\nelse\n{\nvIdColor = aIdColor;\nfloat staggerOrder = aOrder.y;\nfloat startTime = staggerOrder * (1.0 - uDuration);\nfloat animation = clamp((uTime - startTime) / uDuration, 0.0, 1.0);\nanimation = smoothstep(0.0, 1.0, animation);\nvec3 scale = mix(aPreviousScale, aScale, animation);\nvec3 position = aPosition * scale;\nif (aRotation.w * aPreviousRotation.w != 1.0)\n{\nvec4 quat = slerp(aPreviousRotation, aRotation, animation);\nposition = rotate(position, quat);\n}\nposition += mix(aPreviousTranslation, aTranslation, animation);\nmat4 mvMatrix = uVMatrix * uMMatrix;\n#ifdef Derivatives\nvec4 viewPosition = mvMatrix * vec4(position, 1.0);\nvViewPosition = viewPosition.xyz;\ngl_Position = uPMatrix * viewPosition;\n#else\ngl_Position = uPMatrix * mvMatrix * vec4(position, 1.0);\n#endif\nvVertexColor = aPosition.y < 0.0 ? vec2(aColor.x, aPreviousColor.x) : vec2(aColor.y, aPreviousColor.y);\nvVertexSelected = mix(aPreviousSelected, aSelected, animation);\nvAnimation = animation;\nvHover = uHover == aId ? 1.0 : 0.0;\nvActive = uActive == aId ? 1.0 : 0.0;\n}\n}\n",
	    "unitcylinder.fragment.fx": "#version 100\n#define FragDepth\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\nvarying lowp vec4 vIdColor;\nvarying lowp vec2 vVertexColor;\nvarying lowp float vVertexSelected;\nvarying float vAnimation;\nvarying lowp float vHover;\nvarying lowp float vActive;\nvarying vec3 vViewPosition;\nvarying vec4 vCircle1;\nvarying vec4 vCircle2;\nuniform sampler2D uSampler;\nuniform sampler2D uPreviousSampler;\nuniform bool uPick;\nuniform vec3 uDirectionToLight;\nuniform vec3 uHalfAngle;\nuniform float uSpecularPower;\nuniform float uSpecularIntensity;\nuniform float uAmbient;\nuniform vec3 uHoverColor;\nuniform vec3 uActiveColor;\nuniform vec3 uSelectedColor;\nuniform float uHighlightMode;\n#ifdef FragDepth\n#extension GL_EXT_frag_depth : enable\n#endif\nfloat dot2(in vec2 v) { return dot(v, v); }\nfloat dot2(in vec3 v) { return dot(v, v); }\nvec4 iCappedCone(in vec3 ro, in vec3 rd,\nin vec3 pa, in vec3 pb,\nin float ra, in float rb)\n{\nvec3 ba = pb - pa;\nvec3 oa = ro - pa;\nvec3 ob = ro - pb;\nfloat m0 = dot(ba, ba);\nfloat m1 = dot(oa, ba);\nfloat m2 = dot(ob, ba);\nfloat m3 = dot(rd, ba);\nif (m1 < 0.0) { if (dot2(oa * m3 - rd * m1) < (ra * ra * m3 * m3)) return vec4(-m1 / m3, -ba * inversesqrt(m0)); }\nelse if (m2 > 0.0) { if (dot2(ob * m3 - rd * m2) < (rb * rb * m3 * m3)) return vec4(-m2 / m3, ba * inversesqrt(m0)); }\nfloat m4 = dot(rd, oa);\nfloat m5 = dot(oa, oa);\nfloat rr = ra - rb;\nfloat hy = m0 + rr * rr;\nfloat k2 = m0 * m0 - m3 * m3 * hy;\nfloat k1 = m0 * m0 * m4 - m1 * m3 * hy + m0 * ra * (rr * m3 * 1.0);\nfloat k0 = m0 * m0 * m5 - m1 * m1 * hy + m0 * ra * (rr * m1 * 2.0 - m0 * ra);\nfloat h = k1 * k1 - k2 * k0;\nif (h < 0.0) return vec4(-1.0);\nfloat t = (-k1 - sqrt(h)) / k2;\nfloat y = m1 + t * m3;\nif (y > 0.0 && y < m0)\n{\nreturn vec4(t, normalize(m0 * (m0 * (oa + t * rd) + rr * ba * ra) - ba * hy * y));\n}\nreturn vec4(-1.0);\n}\nvec4 iRoundedCone(in vec3 ro, in vec3 rd,\nin vec3 pa, in vec3 pb,\nin float ra, in float rb)\n{\nvec3 ba = pb - pa;\nvec3 oa = ro - pa;\nvec3 ob = ro - pb;\nfloat rr = ra - rb;\nfloat m0 = dot(ba, ba);\nfloat m1 = dot(ba, oa);\nfloat m2 = dot(ba, rd);\nfloat m3 = dot(rd, oa);\nfloat m5 = dot(oa, oa);\nfloat m6 = dot(ob, rd);\nfloat m7 = dot(ob, ob);\nfloat d2 = m0 - rr * rr;\nfloat k2 = d2 - m2 * m2;\nfloat k1 = d2 * m3 - m1 * m2 + m2 * rr * ra;\nfloat k0 = d2 * m5 - m1 * m1 + m1 * rr * ra * 2.0 - m0 * ra * ra;\nfloat h = k1 * k1 - k0 * k2;\nif (h < 0.0) return vec4(-1.0);\nfloat t = (-sqrt(h) - k1) / k2;\nfloat y = m1 - ra * rr + t * m2;\nif (y > 0.0 && y < d2)\n{\nreturn vec4(t, normalize(d2 * (oa + t * rd) - ba * y));\n}\nfloat h1 = m3 * m3 - m5 + ra * ra;\nfloat h2 = m6 * m6 - m7 + rb * rb;\nif (max(h1, h2) < 0.0) return vec4(-1.0);\nvec4 r = vec4(1e20);\nif (h1 > 0.0)\n{\nt = -m3 - sqrt(h1);\nr = vec4(t, (oa + t * rd) / ra);\n}\nif (h2 > 0.0)\n{\nt = -m6 - sqrt(h2);\nif (t < r.x)\nr = vec4(t, (ob + t * rd) / rb);\n}\nreturn r;\n}\nvoid main(void)\n{\nvec3 rd = normalize(vViewPosition);\nvec3 ro = vec3(0.0);\nvec4 tnor = iCappedCone(ro, rd, vCircle1.xyz, vCircle2.xyz, vCircle1.w, vCircle2.w);\nfloat t = tnor.x;\nif (t < 0.0)\n{\ndiscard;\n}\nelse\n{\nvec3 viewPosition = rd * t;\n#ifdef FragDepth\nfloat ndcDepth = DEPTH_A + DEPTH_B / viewPosition.z;\ngl_FragDepthEXT = ndcDepth * 0.5 + 0.5;\n#endif\nif (uPick)\n{\ngl_FragColor = vIdColor;\n}\nelse\n{\nfloat emissive = 0.0;\nvec3 previousColor = texture2D(uPreviousSampler, vec2(vVertexColor.y, 0.0)).xyz;\nvec3 color = texture2D(uSampler, vec2(vVertexColor.x, 0.0)).xyz;\nif (uHighlightMode < 0.5) {\nemissive = vVertexSelected * 0.5;\nemissive += 1.5 * max(vHover, vActive);\nemissive /= 4.0;\n}\nelse {\npreviousColor = mix(previousColor, vec3(dot(LUMINANCE, previousColor)), max(-vVertexSelected, 0.0));\ncolor = mix(color, vec3(dot(LUMINANCE, color)), max(-vVertexSelected, 0.0));\npreviousColor = mix(previousColor, uSelectedColor, max(vVertexSelected, 0.0));\ncolor = mix(color, uSelectedColor, max(vVertexSelected, 0.0));\npreviousColor = mix(previousColor, uActiveColor, vActive);\ncolor = mix(color, uActiveColor, vActive);\npreviousColor = mix(previousColor, uHoverColor, vHover);\ncolor = mix(color, uHoverColor, vHover);\n}\ncolor = mix(previousColor, color, vAnimation);\nvec3 normal = tnor.yzw;\nfloat diffuse = clamp(dot(uDirectionToLight, normal), 0.0, 1.0);\nfloat specular = pow(clamp(dot(normal, uHalfAngle), 0.0, 1.0), uSpecularPower) * uSpecularIntensity;\ncolor *= (uAmbient + diffuse + emissive);\ncolor += specular;\ncolor = clamp(color, 0.0, 1.0);\ncolor = pow(color, GAMMA);\ngl_FragColor = vec4(color, 1.0);\n}\n}\n}\n",
	    "unitcylinder.vertex.fx": "#version 100\n#include \"common.include.fx\"\n#include \"quat.include.fx\"\nattribute mediump vec3 aPosition;\nattribute vec3 aTranslation;\nattribute vec3 aPreviousTranslation;\nattribute mediump vec4 aRotation;\nattribute mediump vec4 aPreviousRotation;\nattribute lowp vec2 aColor;\nattribute lowp vec2 aPreviousColor;\nattribute vec3 aScale;\nattribute vec3 aPreviousScale;\nattribute float aId;\nattribute vec2 aOrder;\nattribute lowp float aSelected;\nattribute lowp float aPreviousSelected;\nattribute lowp vec4 aIdColor;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nuniform float uTime;\nuniform float uDuration;\nuniform float uOrderFrom;\nuniform float uOrderTo;\nuniform float uHover;\nuniform float uActive;\nuniform vec3 uIdentityRotation;\n#define Derivatives\nvarying lowp vec4 vIdColor;\nvarying lowp vec2 vVertexColor;\nvarying lowp float vVertexSelected;\nvarying highp float vAnimation;\nvarying lowp float vHover;\nvarying lowp float vActive;\nvarying vec3 vViewPosition;\nvarying vec4 vCircle1;\nvarying vec4 vCircle2;\nvoid main(void)\n{\nif (aOrder.x < uOrderFrom || aOrder.x > uOrderTo)\n{\nvIdColor = vec4(0.0);\nvVertexColor = vec2(0.0);\nvVertexSelected = 0.0;\nvAnimation = 0.0;\nvHover = 0.0;\nvActive = 0.0;\nvViewPosition = vec3(0.0);\nvCircle1 = vec4(0.0);\nvCircle2 = vec4(0.0);\ngl_Position = vec4(0.0);\n}\nelse\n{\nvIdColor = aIdColor;\nfloat staggerOrder = aOrder.y;\nfloat startTime = staggerOrder * (1.0 - uDuration);\nfloat animation = clamp((uTime - startTime) / uDuration, 0.0, 1.0);\nanimation = smoothstep(0.0, 1.0, animation);\nvec3 translation = mix(aPreviousTranslation, aTranslation, animation);\nmat4 mvMatrix = uVMatrix * uMMatrix;\nvec3 viewCenter = (mvMatrix * vec4(translation, 1.0)).xyz;\nvec3 scale = mix(aPreviousScale, aScale, animation);\nvec3 position = aPosition;\nposition.xz *= max(scale.x, scale.z);\nposition.y *= scale.y;\nvec3 direction = IDENTITY_ROTATION;\nif (aRotation.w * aPreviousRotation.w != 1.0)\n{\nvec4 quat = slerp(aPreviousRotation, aRotation, animation);\nposition = rotate(position, quat);\ndirection = rotate(direction, quat);\n}\nvec3 viewDirection = (mvMatrix * vec4(direction, 0.0)).xyz;\nvec3 h = viewDirection * scale.y * 0.5;\nfloat r1 = length(viewDirection) * 0.5;\nfloat r2 = r1 * scale.z;\nr1 *= scale.x;\nvCircle1 = vec4(viewCenter - h, r1);\nvCircle2 = vec4(viewCenter + h, r2);\nvec4 viewPosition = mvMatrix * vec4(position + translation, 1.0);\nvViewPosition = viewPosition.xyz;\ngl_Position = uPMatrix * viewPosition;\nvVertexColor = aPosition.y < 0.0 ? vec2(aColor.x, aPreviousColor.x) : vec2(aColor.y, aPreviousColor.y);\nvVertexSelected = mix(aPreviousSelected, aSelected, animation);\nvAnimation = animation;\nvHover = uHover == aId ? 1.0 : 0.0;\nvActive = uActive == aId ? 1.0 : 0.0;\n}\n}\n",
	    "unithexprism.fragment.fx": "#version 100\n#define FragDepth\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\nvarying lowp vec4 vIdColor;\nvarying lowp vec2 vVertexColor;\nvarying lowp float vVertexSelected;\nvarying float vAnimation;\nvarying lowp float vHover;\nvarying lowp float vActive;\nvarying vec3 vViewPosition;\nvarying vec3 vViewCenter;\nvarying float vRadius;\nvarying float vHeight;\nvarying float vScaling;\nuniform sampler2D uSampler;\nuniform sampler2D uPreviousSampler;\nuniform bool uPick;\nuniform vec3 uDirectionToLight;\nuniform vec3 uHalfAngle;\nuniform float uSpecularPower;\nuniform float uSpecularIntensity;\nuniform float uAmbient;\nuniform vec3 uHoverColor;\nuniform vec3 uActiveColor;\nuniform vec3 uSelectedColor;\nuniform float uHighlightMode;\nuniform mat4 uVMatrix;\n#ifdef FragDepth\n#extension GL_EXT_frag_depth : enable\n#endif\nvec4 iHexPrism( in vec3 ro, in vec3 rd, in float ra, in float he )\n{\nconst vec3 n1 = vec3( 1.0,0.0,0.0);\nconst vec3 n2 = vec3( 0.5,0.0,ROOT_THREE_OVER_TWO);\nconst vec3 n3 = vec3(-0.5,0.0,ROOT_THREE_OVER_TWO);\nconst vec3 n4 = vec3( 0.0,1.0,0.0);\nvec3 t1 = vec3((vec2(ra,-ra)-dot(ro,n1))/dot(rd,n1), 1.0);\nvec3 t2 = vec3((vec2(ra,-ra)-dot(ro,n2))/dot(rd,n2), 1.0);\nvec3 t3 = vec3((vec2(ra,-ra)-dot(ro,n3))/dot(rd,n3), 1.0);\nvec3 t4 = vec3((vec2(he,-he)-dot(ro,n4))/dot(rd,n4), 1.0);\nif( t1.y<t1.x ) t1=vec3(t1.yx,-1.0);\nif( t2.y<t2.x ) t2=vec3(t2.yx,-1.0);\nif( t3.y<t3.x ) t3=vec3(t3.yx,-1.0);\nif( t4.y<t4.x ) t4=vec3(t4.yx,-1.0);\nvec4 tN=vec4(t1.x,t1.z*n1);\nif( t2.x>tN.x ) tN=vec4(t2.x,t2.z*n2);\nif( t3.x>tN.x ) tN=vec4(t3.x,t3.z*n3);\nif( t4.x>tN.x ) tN=vec4(t4.x,t4.z*n4);\nfloat tF = min(min(t1.y,t2.y),min(t3.y,t4.y));\nif( tN.x>tF || tF<0.0) return vec4(-1.0);\nreturn tN;\n}\nvoid main(void)\n{\nvec3 rd = normalize(vViewPosition);\nvec3 ro = -vViewCenter;\nmat3 rot = mat3(uVMatrix);\nvec3 rdd = rd * rot;\nvec3 roo = ro * rot;\nvec4 tnor = iHexPrism(roo, rdd, vRadius * vScaling, vHeight * vScaling);\nfloat t = tnor.x;\nif (t < 0.0)\n{\ndiscard;\n}\nelse\n{\nvec3 viewPosition = rd * t;\n#ifdef FragDepth\nfloat ndcDepth = DEPTH_A + DEPTH_B / viewPosition.z;\ngl_FragDepthEXT = ndcDepth * 0.5 + 0.5;\n#endif\nif (uPick)\n{\ngl_FragColor = vIdColor;\n}\nelse\n{\nfloat emissive = 0.0;\nvec3 previousColor = texture2D(uPreviousSampler, vec2(vVertexColor.y, 0.0)).xyz;\nvec3 color = texture2D(uSampler, vec2(vVertexColor.x, 0.0)).xyz;\nif (uHighlightMode < 0.5) {\nemissive = vVertexSelected * 0.5;\nemissive += 1.5 * max(vHover, vActive);\nemissive /= 4.0;\n}\nelse {\npreviousColor = mix(previousColor, vec3(dot(LUMINANCE, previousColor)), max(-vVertexSelected, 0.0));\ncolor = mix(color, vec3(dot(LUMINANCE, color)), max(-vVertexSelected, 0.0));\npreviousColor = mix(previousColor, uSelectedColor, max(vVertexSelected, 0.0));\ncolor = mix(color, uSelectedColor, max(vVertexSelected, 0.0));\npreviousColor = mix(previousColor, uActiveColor, vActive);\ncolor = mix(color, uActiveColor, vActive);\npreviousColor = mix(previousColor, uHoverColor, vHover);\ncolor = mix(color, uHoverColor, vHover);\n}\ncolor = mix(previousColor, color, vAnimation);\nvec3 normal = rot * tnor.yzw;\nfloat diffuse = clamp(dot(uDirectionToLight, normal), 0.0, 1.0);\nfloat specular = pow(clamp(dot(normal, uHalfAngle), 0.0, 1.0), uSpecularPower) * uSpecularIntensity;\ncolor *= (uAmbient + diffuse + emissive);\ncolor += specular;\ncolor = clamp(color, 0.0, 1.0);\ncolor = pow(color, GAMMA);\ngl_FragColor = vec4(color, 1.0);\n}\n}\n}\n",
	    "unithexprism.vertex.fx": "#version 100\n#include \"common.include.fx\"\n#include \"quat.include.fx\"\nattribute mediump vec3 aPosition;\nattribute vec3 aTranslation;\nattribute vec3 aPreviousTranslation;\nattribute mediump vec4 aRotation;\nattribute mediump vec4 aPreviousRotation;\nattribute lowp vec2 aColor;\nattribute lowp vec2 aPreviousColor;\nattribute vec3 aScale;\nattribute vec3 aPreviousScale;\nattribute float aId;\nattribute vec2 aOrder;\nattribute lowp float aSelected;\nattribute lowp float aPreviousSelected;\nattribute lowp vec4 aIdColor;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nuniform float uTime;\nuniform float uDuration;\nuniform float uOrderFrom;\nuniform float uOrderTo;\nuniform float uHover;\nuniform float uActive;\nuniform vec3 uIdentityRotation;\n#define Derivatives\nvarying lowp vec4 vIdColor;\nvarying lowp vec2 vVertexColor;\nvarying lowp float vVertexSelected;\nvarying highp float vAnimation;\nvarying lowp float vHover;\nvarying lowp float vActive;\nvarying vec3 vViewPosition;\nvarying vec3 vViewCenter;\nvarying float vRadius;\nvarying float vHeight;\nvarying float vScaling;\nvoid main(void)\n{\nif (aOrder.x < uOrderFrom || aOrder.x > uOrderTo)\n{\nvIdColor = vec4(0.0);\nvVertexColor = vec2(0.0);\nvVertexSelected = 0.0;\nvAnimation = 0.0;\nvHover = 0.0;\nvActive = 0.0;\nvViewPosition = vec3(0.0);\nvRadius = 0.0;\nvHeight = 0.0;\ngl_Position = vec4(0.0);\n}\nelse\n{\nvIdColor = aIdColor;\nfloat staggerOrder = aOrder.y;\nfloat startTime = staggerOrder * (1.0 - uDuration);\nfloat animation = clamp((uTime - startTime) / uDuration, 0.0, 1.0);\nanimation = smoothstep(0.0, 1.0, animation);\nvec3 translation = mix(aPreviousTranslation, aTranslation, animation);\nmat4 mvMatrix = uVMatrix * uMMatrix;\nvViewCenter = (mvMatrix * vec4(translation, 1.0)).xyz;\nvec3 scale = mix(aPreviousScale, aScale, animation);\nvRadius = scale.x * ROOT_THREE_OVER_TWO;\nvHeight = scale.y;\nvec3 position = aPosition;\nposition.y *= scale.y;\nposition.z *= scale.x;\nposition.x *= scale.x * ROOT_THREE_OVER_TWO;\nvec3 direction = IDENTITY_ROTATION;\nif (aRotation.w * aPreviousRotation.w != 1.0)\n{\nvec4 quat = slerp(aPreviousRotation, aRotation, animation);\nposition = rotate(position, quat);\ndirection = rotate(direction, quat);\n}\nvec3 viewDirection = (mvMatrix * vec4(direction, 0.0)).xyz;\nvec4 viewPosition = mvMatrix * vec4(position + translation, 1.0);\nvViewPosition = viewPosition.xyz;\ngl_Position = uPMatrix * viewPosition;\nvVertexColor = aPosition.y < 0.0 ? vec2(aColor.x, aPreviousColor.x) : vec2(aColor.y, aPreviousColor.y);\nvVertexSelected = mix(aPreviousSelected, aSelected, animation);\nvAnimation = animation;\nvHover = uHover == aId ? 1.0 : 0.0;\nvActive = uActive == aId ? 1.0 : 0.0;\nvScaling = length(uMMatrix[0].xyz) / 2.0;\n}\n}\n",
	    "unitsdf.fragment.fx": "#version 100\n#define Derivatives\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\nvarying lowp vec4 vIdColor;\nvarying lowp vec2 vVertexColor;\nvarying lowp float vVertexSelected;\nvarying float vAnimation;\nvarying lowp float vHover;\nvarying lowp float vActive;\nvarying mediump vec2 vTexCoord;\nvarying mediump vec2 vPreviousTexCoord;\n#ifdef Derivatives\nvarying vec3 vViewPosition;\n#endif\nuniform sampler2D uSampler;\nuniform sampler2D uPreviousSampler;\nuniform sampler2D uSampler1;\nuniform sampler2D uPreviousSampler1;\nuniform bool uPick;\nuniform vec3 uDirectionToLight;\nuniform vec3 uHalfAngle;\nuniform float uSpecularPower;\nuniform float uSpecularIntensity;\nuniform float uAmbient;\nuniform vec3 uHoverColor;\nuniform vec3 uActiveColor;\nuniform vec3 uSelectedColor;\nuniform float uHighlightMode;\nuniform vec3	 uBackgroundColor;\nuniform float 	 uBuffer;\n#ifdef Derivatives\n#extension GL_OES_standard_derivatives : enable\n#endif\nvoid main(void) {\nfloat distance = mix(texture2D(uPreviousSampler1, vPreviousTexCoord).r, texture2D(uSampler1, vTexCoord).r, vAnimation);\nif (distance < uBuffer) {\ndiscard;\n}\nif (uPick) {\ngl_FragColor = vIdColor;\n}\nelse\n{\nfloat emissive = 0.0;\nvec3 previousColor = texture2D(uPreviousSampler, vec2(vVertexColor.y, 0.0)).xyz;\nvec3 color = texture2D(uSampler, vec2(vVertexColor.x, 0.0)).xyz;\nif (uHighlightMode < 0.5) {\nemissive = vVertexSelected * 0.5;\nemissive += 1.5 * max(vHover, vActive);\nemissive /= 4.0;\n}\nelse {\npreviousColor = mix(previousColor, vec3(dot(LUMINANCE, previousColor)), max(-vVertexSelected, 0.0));\ncolor = mix(color, vec3(dot(LUMINANCE, color)), max(-vVertexSelected, 0.0));\npreviousColor = mix(previousColor, uSelectedColor, max(vVertexSelected, 0.0));\ncolor = mix(color, uSelectedColor, max(vVertexSelected, 0.0));\npreviousColor = mix(previousColor, uActiveColor, vActive);\ncolor = mix(color, uActiveColor, vActive);\npreviousColor = mix(previousColor, uHoverColor, vHover);\ncolor = mix(color, uHoverColor, vHover);\n}\ncolor = mix(previousColor, color, vAnimation);\nfloat diffuse, specular;\n#ifdef Derivatives\nvec3 normal = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));\ndiffuse = clamp(dot(uDirectionToLight, normal), 0.0, 1.0);\nspecular = pow(clamp(dot(normal, uHalfAngle), 0.0, 1.0), uSpecularPower) * uSpecularIntensity;\n#else\ndiffuse = 1.0;\nspecular = 0.0;\n#endif\ncolor *= (uAmbient + diffuse + emissive);\ncolor += specular;\ncolor = clamp(color, 0.0, 1.0);\ncolor = pow(color, GAMMA);\nfloat uGamma = 0.0;\nfloat gamma;\n#ifdef Derivatives\ngamma = fwidth(distance);\n#else\ngamma = uGamma;\n#endif\nfloat value = smoothstep(uBuffer + gamma, uBuffer, distance);\ngl_FragColor = vec4(mix(color, uBackgroundColor, value), 1.0);\n}\n}\n",
	    "unitsdf.vertex.fx": "#version 100\n#include \"quat.include.fx\"\nattribute mediump vec3 aPosition;\nattribute vec3 aTranslation;\nattribute vec3 aPreviousTranslation;\nattribute mediump vec4 aRotation;\nattribute mediump vec4 aPreviousRotation;\nattribute mediump vec4 aTexCoord;\nattribute mediump vec4 aPreviousTexCoord;\nattribute lowp vec2 aColor;\nattribute lowp vec2 aPreviousColor;\nattribute vec3 aScale;\nattribute vec3 aPreviousScale;\nattribute float aId;\nattribute vec2 aOrder;\nattribute lowp float aSelected;\nattribute lowp float aPreviousSelected;\nattribute lowp vec4 aIdColor;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nuniform float uTime;\nuniform float uDuration;\nuniform float uOrderFrom;\nuniform float uOrderTo;\nuniform float uHover;\nuniform float uActive;\n#define Derivatives\nvarying lowp vec4 vIdColor;\nvarying lowp vec2 vVertexColor;\nvarying lowp float vVertexSelected;\nvarying highp float vAnimation;\nvarying lowp float vHover;\nvarying lowp float vActive;\nvarying mediump vec2 vTexCoord;\nvarying mediump vec2 vPreviousTexCoord;\n#ifdef Derivatives\nvarying vec3 vViewPosition;\n#endif\nvoid main(void)\n{\nif (aOrder.x < uOrderFrom || aOrder.x > uOrderTo)\n{\nvIdColor = vec4(0.0);\nvVertexColor = vec2(0.0);\nvVertexSelected = 0.0;\nvAnimation = 0.0;\nvHover = 0.0;\nvActive = 0.0;\ngl_Position = vec4(0.0);\n#ifdef Derivatives\nvViewPosition = vec3(0.0);\n#endif\n}\nelse\n{\nvIdColor = aIdColor;\nfloat staggerOrder = aOrder.y;\nfloat startTime = staggerOrder * (1.0 - uDuration);\nfloat animation = clamp((uTime - startTime) / uDuration, 0.0, 1.0);\nanimation = smoothstep(0.0, 1.0, animation);\nvec3 scale = mix(aPreviousScale, aScale, animation);\nvec3 position = aPosition * scale;\nif (aRotation.w * aPreviousRotation.w != 1.0)\n{\nvec4 quat = slerp(aPreviousRotation, aRotation, animation);\nposition = rotate(position, quat);\n}\nposition += mix(aPreviousTranslation, aTranslation, animation);\nmat4 mvMatrix = uVMatrix * uMMatrix;\n#ifdef Derivatives\nvec4 viewPosition = mvMatrix * vec4(position, 1.0);\nvViewPosition = viewPosition.xyz;\ngl_Position = uPMatrix * viewPosition;\n#else\ngl_Position = uPMatrix * mvMatrix * vec4(position, 1.0);\n#endif\nvVertexColor = aPosition.y < 0.0 ? vec2(aColor.x, aPreviousColor.x) : vec2(aColor.y, aPreviousColor.y);\nvVertexSelected = mix(aPreviousSelected, aSelected, animation);\nvAnimation = animation;\nvHover = uHover == aId ? 1.0 : 0.0;\nvActive = uActive == aId ? 1.0 : 0.0;\nvPreviousTexCoord.x = aPosition.x < 0.0 ? aPreviousTexCoord.x : aPreviousTexCoord.z;\nvPreviousTexCoord.y = aPosition.y > 0.0 ? aPreviousTexCoord.y : aPreviousTexCoord.w;\nvTexCoord.x = aPosition.x < 0.0 ? aTexCoord.x : aTexCoord.z;\nvTexCoord.y = aPosition.y > 0.0 ? aTexCoord.y : aTexCoord.w;\n}\n}\n",
	    "unitsphere.fragment.fx": "#version 100\n#define FragDepth\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\nvarying lowp vec4 vIdColor;\nvarying lowp vec2 vVertexColor;\nvarying lowp float vVertexSelected;\nvarying float vAnimation;\nvarying lowp float vHover;\nvarying lowp float vActive;\nvarying vec3 vViewPosition;\nvarying vec3 vViewCenter;\nvarying mediump float vRadius;\nuniform sampler2D uSampler;\nuniform sampler2D uPreviousSampler;\nuniform bool uPick;\nuniform vec3 uDirectionToLight;\nuniform vec3 uHalfAngle;\nuniform float uSpecularPower;\nuniform float uSpecularIntensity;\nuniform float uAmbient;\nuniform vec3 uHoverColor;\nuniform vec3 uActiveColor;\nuniform vec3 uSelectedColor;\nuniform float uHighlightMode;\n#ifdef FragDepth\n#extension GL_EXT_frag_depth : enable\n#endif\nfloat sphIntersect(in vec3 ro, in vec3 rd, in vec4 sph)\n{\nvec3 oc = ro - sph.xyz;\nfloat b = dot(oc, rd);\nfloat c = dot(oc, oc) - sph.w * sph.w;\nfloat h = b * b - c;\nif (h < 0.0) return -1.0;\nreturn -b - sqrt(h);\n}\nvoid main(void)\n{\nvec3 rd = normalize(vViewPosition);\nvec3 ro = vec3(0.0);\nvec4 s = vec4(vViewCenter, vRadius);\nfloat t = sphIntersect(ro, rd, s);\nif (t < 0.0)\n{\ndiscard;\n}\nelse\n{\nvec3 viewPosition = rd * t;\n#ifdef FragDepth\nfloat ndcDepth = DEPTH_A + DEPTH_B / viewPosition.z;\ngl_FragDepthEXT = ndcDepth * 0.5 + 0.5;\n#endif\nif (uPick)\n{\ngl_FragColor = vIdColor;\n}\nelse\n{\nfloat emissive = 0.0;\nvec3 previousColor = texture2D(uPreviousSampler, vec2(vVertexColor.y, 0.0)).xyz;\nvec3 color = texture2D(uSampler, vec2(vVertexColor.x, 0.0)).xyz;\nif (uHighlightMode < 0.5) {\nemissive = vVertexSelected * 0.5;\nemissive += 1.5 * max(vHover, vActive);\nemissive /= 4.0;\n}\nelse {\npreviousColor = mix(previousColor, vec3(dot(LUMINANCE, previousColor)), max(-vVertexSelected, 0.0));\ncolor = mix(color, vec3(dot(LUMINANCE, color)), max(-vVertexSelected, 0.0));\npreviousColor = mix(previousColor, uSelectedColor, max(vVertexSelected, 0.0));\ncolor = mix(color, uSelectedColor, max(vVertexSelected, 0.0));\npreviousColor = mix(previousColor, uActiveColor, vActive);\ncolor = mix(color, uActiveColor, vActive);\npreviousColor = mix(previousColor, uHoverColor, vHover);\ncolor = mix(color, uHoverColor, vHover);\n}\ncolor = mix(previousColor, color, vAnimation);\nvec3 normal = (viewPosition - vViewCenter) / s.w;\nfloat diffuse = clamp(dot(uDirectionToLight, normal), 0.0, 1.0);\nfloat specular = pow(clamp(dot(normal, uHalfAngle), 0.0, 1.0), uSpecularPower) * uSpecularIntensity;\ncolor *= (uAmbient + diffuse + emissive);\ncolor += specular;\ncolor = clamp(color, 0.0, 1.0);\ncolor = pow(color, GAMMA);\ngl_FragColor = vec4(color, 1.0);\n}\n}\n}\n",
	    "unitsphere.vertex.fx": "#version 100\n#include \"common.include.fx\"\nattribute mediump vec3 aPosition;\nattribute vec3 aTranslation;\nattribute vec3 aPreviousTranslation;\nattribute lowp float aColor;\nattribute lowp float aPreviousColor;\nattribute vec3 aScale;\nattribute vec3 aPreviousScale;\nattribute float aId;\nattribute vec2 aOrder;\nattribute lowp float aSelected;\nattribute lowp float aPreviousSelected;\nattribute lowp vec4 aIdColor;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nuniform float uTime;\nuniform float uDuration;\nuniform float uOrderFrom;\nuniform float uOrderTo;\nuniform float uHover;\nuniform float uActive;\nvarying lowp vec4 vIdColor;\nvarying lowp vec2 vVertexColor;\nvarying lowp float vVertexSelected;\nvarying highp float vAnimation;\nvarying lowp float vHover;\nvarying lowp float vActive;\nvarying mediump float vRadius;\nvarying vec3 vViewPosition;\nvarying vec3 vViewCenter;\nvoid main(void)\n{\nif (aOrder.x < uOrderFrom || aOrder.x > uOrderTo)\n{\nvIdColor = vec4(0.0);\nvVertexColor = vec2(0.0);\nvVertexSelected = 0.0;\nvAnimation = 0.0;\nvHover = 0.0;\nvActive = 0.0;\nvViewPosition = vec3(0.0);\nvViewCenter = vec3(0.0);\nvRadius = 0.0;\ngl_Position = vec4(0.0);\n}\nelse\n{\nvIdColor = aIdColor;\nfloat staggerOrder = aOrder.y;\nfloat startTime = staggerOrder * (1.0 - uDuration);\nfloat animation = clamp((uTime - startTime) / uDuration, 0.0, 1.0);\nanimation = smoothstep(0.0, 1.0, animation);\nfloat scale = mix(min(aPreviousScale.x, min(aPreviousScale.y, aPreviousScale.z)), min(aScale.x, min(aScale.y, aScale.z)), animation);\nvec4 translation = vec4(mix(aPreviousTranslation, aTranslation, animation), 1.0);\nmat4 mvMatrix = uVMatrix * uMMatrix;\nvViewCenter = (mvMatrix * translation).xyz;\ntranslation.xyz += aPosition * scale;\nvViewPosition = (mvMatrix * translation).xyz;\ngl_Position = uPMatrix * vec4(vViewPosition, 1.0);\nvVertexColor = vec2(aColor, aPreviousColor);\nvVertexSelected = mix(aPreviousSelected, aSelected, animation);\nvAnimation = animation;\nvHover = uHover == aId ? 1.0 : 0.0;\nvActive = uActive == aId ? 1.0 : 0.0;\nvRadius = distance(vViewPosition, vViewCenter) / ROOT_THREE;\n}\n}\n",
	    "common.include.fx": "const float NEAR_PLANE = 0.01;\nconst float FAR_PLANE = 100.0;\nconst float DEPTH_A = 1.0002000200020003;\nconst float DEPTH_B = 0.020002000200020003;\nconst vec3 GAMMA = vec3(0.45454545454545453);\nconst vec3 INV_GAMMA = vec3(2.2);\nconst vec3 LUMINANCE = vec3(0.2126, 0.7152, 0.0722);\nconst float PI = 3.1415926538;\nconst float ROOT_TWO = 1.4142135624;\nconst float ROOT_TWO_OVER_TWO = 0.7071067811865476;\nconst float ROOT_THREE = 1.7320508075688772;\nconst float ROOT_THREE_OVER_TWO = 0.8660254037844386;\nconst vec3 IDENTITY_ROTATION = vec3(0.0, 1.0, 0.0);\nmat3 transpose(in mat3 mat) {\nvec3 i0 = mat[0];\nvec3 i1 = mat[1];\nvec3 i2 = mat[2];\nreturn mat3\n(\nvec3(i0.x, i1.x, i2.x),\nvec3(i0.y, i1.y, i2.y),\nvec3(i0.z, i1.z, i2.z)\n);\n}\n",
	    "quat.include.fx": "const float EPSILON = 0.000001;\nmat3 fromQuat(in vec4 q) {\nfloat x = q.x;\nfloat y = q.y;\nfloat z = q.z;\nfloat w = q.w;\nfloat x2 = x + x;\nfloat y2 = y + y;\nfloat z2 = z + z;\nfloat xx = x * x2;\nfloat yx = y * x2;\nfloat yy = y * y2;\nfloat zx = z * x2;\nfloat zy = z * y2;\nfloat zz = z * z2;\nfloat wx = w * x2;\nfloat wy = w * y2;\nfloat wz = w * z2;\nmat3 m;\nm[0][0] = 1.0 - yy - zz;\nm[0][1] = yx - wz;\nm[0][2] = zx + wy;\nm[1][0] = yx + wz;\nm[1][1] = 1.0 - xx - zz;\nm[1][2] = zy - wx;\nm[2][0] = zx - wy;\nm[2][1] = zy + wx;\nm[2][2] = 1.0 - xx - yy;\nreturn m;\n}\nvec3 rotate(in vec3 p, in vec4 q) {\nreturn p + 2.0 * cross(q.xyz, cross(q.xyz, p) + q.w * p);\n}\nvec4 slerp(in vec4 a, in vec4 b, in float t) {\nfloat cosom = dot(a, b);\nif (cosom < 0.0) {\ncosom = -cosom;\nb = -b;\n}\nfloat scale0, scale1;\nif (1.0 - cosom > EPSILON) {\nfloat omega = acos(cosom);\nfloat sinom = sin(omega);\nscale0 = sin((1.0 - t) * omega) / sinom;\nscale1 = sin(t * omega) / sinom;\n}\nelse {\nscale0 = 1.0 - t;\nscale1 = t;\n}\nreturn vec4(scale0 * a + scale1 * b);\n}\n",
	};
	let ShaderBase$1 = class ShaderBase {
	    get isInitialized() { return this._isInitialized; }
	    get vertexBuffer() { return this._vertexBuffer; }
	    set vertexBuffer(value) {
	        if (this._vertexBuffer != value) {
	            this._vertexBuffer = value;
	            this._haveBuffersChanged = true;
	        }
	    }
	    get indexBuffer() { return this._indexBuffer; }
	    set indexBuffer(value) {
	        if (this._indexBuffer != value) {
	            this._indexBuffer = value;
	            this._haveBuffersChanged = true;
	        }
	    }
	    constructor(core, main) {
	        this._core = core;
	        this._main = main;
	    }
	    initializeContext(gl) {
	        this._gl = gl;
	    }
	    _createProgram(vs, fs) {
	        const program = this._gl.createProgram();
	        this._gl.attachShader(program, vs);
	        this._gl.attachShader(program, fs);
	        this._gl.linkProgram(program);
	        if (!this._gl.getProgramParameter(program, this._gl.LINK_STATUS)) {
	            this._core.log.write(LogLevel.error, this._gl.getProgramInfoLog(program));
	        }
	        return program;
	    }
	    _compileShader(source, type) {
	        const shader = this._gl.createShader(type);
	        this._gl.shaderSource(shader, source);
	        this._gl.compileShader(shader);
	        if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
	            this._core.log.write(LogLevel.error, this._gl.getShaderInfoLog(shader));
	        }
	        return shader;
	    }
	    _removeDirective(shaderSource, directive) {
	        const remove = `#define ${directive}`;
	        const index = shaderSource.indexOf(remove);
	        shaderSource = (index == -1) ? shaderSource : shaderSource.substring(0, index) + shaderSource.substring(index + remove.length);
	        return shaderSource;
	    }
	    prepare() {
	        if (this._program != this._main.shaderResources.currentProgram) {
	            if (this._main.shaderResources.currentShader) {
	                this._main.shaderResources.currentShader.disableProgram();
	            }
	            this.enableProgram(this._program);
	            this.updateBuffers();
	            this.updateTextures();
	        }
	        else {
	            if (this._haveBuffersChanged) {
	                this.updateBuffers();
	            }
	            if (this._haveTexturesChanged) {
	                this.updateTextures();
	            }
	        }
	    }
	    apply() { }
	    applyModel() { }
	    applyView() { }
	    enableProgram(program) {
	        this._gl.useProgram(program);
	        this._main.shaderResources.currentProgram = program;
	        this._main.shaderResources.currentShader = this;
	    }
	    updateBuffers() {
	        this._haveBuffersChanged = false;
	    }
	    updateTextures() {
	        this._haveTexturesChanged = false;
	    }
	    disableProgram() {
	        this._main.shaderResources.currentShader = null;
	        this._main.shaderResources.currentProgram = null;
	    }
	    _shaderFromFile(vsName, fsName, callback) {
	        callback(this._includesFromFile(Resources$1.glsl[vsName]), this._includesFromFile(Resources$1.glsl[fsName]));
	    }
	    _shaderFromUrl(vsName, fsName, callback) {
	        this._sourceFromUrl(vsName, (vsSource) => {
	            this._includesFromUrl(vsSource, 0, (vsIncSource) => {
	                this._sourceFromUrl(fsName, (fsSource) => {
	                    this._includesFromUrl(fsSource, 0, (fsIncSource) => {
	                        callback(vsIncSource, fsIncSource);
	                    });
	                });
	            });
	        });
	    }
	    _sourceFromUrl(url, callback) {
	        const request = new XMLHttpRequest();
	        request.open("GET", PathHelper.combine(this._core.config.shaderPath, url));
	        request.onreadystatechange = () => {
	            if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
	                callback(request.responseText);
	            }
	        };
	        request.send();
	    }
	    _includesFromFile(source) {
	        let index = 0;
	        do {
	            index = source.indexOf("#include", index);
	            if (index != -1) {
	                const start = source.indexOf("\"", index);
	                const end = source.indexOf("\"", start + 1);
	                const name = source.substring(start + 1, end);
	                const inc = Resources$1.glsl[name];
	                source = source.substring(0, index) + inc + source.substring(end + 1);
	            }
	        } while (index != -1);
	        return source;
	    }
	    _includesFromUrl(source, index, callback) {
	        index = source.indexOf("#include", index);
	        if (index != -1) {
	            const start = source.indexOf("\"", index);
	            const end = source.indexOf("\"", start + 1);
	            const name = source.substring(start + 1, end);
	            this._sourceFromUrl(PathHelper.combine("inc", name), (include) => {
	                source = source.substring(0, index) + include + source.substring(end + 1);
	                this._includesFromUrl(source, index, callback);
	            });
	        }
	        else {
	            callback(source);
	        }
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let Color$1 = class Color extends ShaderBase$1 {
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("color.vertex.fx", "color.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._colorAttribute = gl.getAttribLocation(this._program, "aColor");
	        this._mMatrixUniform = gl.getUniformLocation(this._program, "uMMatrix");
	        this._vMatrixUniform = gl.getUniformLocation(this._program, "uVMatrix");
	        this._pMatrixUniform = gl.getUniformLocation(this._program, "uPMatrix");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniformMatrix4fv(this._mMatrixUniform, false, this.mMatrix);
	    }
	    applyView() {
	        this._gl.uniformMatrix4fv(this._vMatrixUniform, false, this.vMatrix);
	        this._gl.uniformMatrix4fv(this._pMatrixUniform, false, this.pMatrix);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionColorVertex.SIZE_BYTES, PositionColorVertex.POSITION_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.vertexAttribPointer(this._colorAttribute, 3, this._gl.UNSIGNED_BYTE, true, PositionColorVertex.SIZE_BYTES, PositionColorVertex.COLOR_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._colorAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let Texture$1 = class Texture extends ShaderBase$1 {
	    get texture2D() { return this._texture2D; }
	    set texture2D(value) {
	        if (this._texture2D != value) {
	            this._texture2D = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("texture.vertex.fx", "texture.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._texCoordAttribute = gl.getAttribLocation(this._program, "aTexCoord");
	        this._normalAttribute = gl.getAttribLocation(this._program, "aNormal");
	        this._samplerUniform = gl.getUniformLocation(this._program, "uSampler");
	        this._pickUniform = gl.getUniformLocation(this._program, "uPick");
	        this._mMatrixUniform = gl.getUniformLocation(this._program, "uMMatrix");
	        this._vMatrixUniform = gl.getUniformLocation(this._program, "uVMatrix");
	        this._pMatrixUniform = gl.getUniformLocation(this._program, "uPMatrix");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniformMatrix4fv(this._mMatrixUniform, false, this.mMatrix);
	        this._gl.uniform1i(this._samplerUniform, 0);
	    }
	    applyView() {
	        this._gl.uniform1i(this._pickUniform, this.isPickShader ? 1 : 0);
	        this._gl.uniformMatrix4fv(this._vMatrixUniform, false, this.vMatrix);
	        this._gl.uniformMatrix4fv(this._pMatrixUniform, false, this.pMatrix);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionNormalTextureVertex.SIZE_BYTES, PositionNormalTextureVertex.POSITION_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.vertexAttribPointer(this._normalAttribute, 3, this._gl.BYTE, true, PositionNormalTextureVertex.SIZE_BYTES, PositionNormalTextureVertex.NORMAL_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._normalAttribute);
	        this._gl.vertexAttribPointer(this._texCoordAttribute, 2, this._gl.UNSIGNED_SHORT, true, PositionNormalTextureVertex.SIZE_BYTES, PositionNormalTextureVertex.TEX_COORD_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._texCoordAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D);
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let Lasso$3 = class Lasso extends ShaderBase$1 {
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("lasso.vertex.fx", "lasso.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._texCoordAttribute = gl.getAttribLocation(this._program, "aTexCoord");
	        this._mMatrixUniform = gl.getUniformLocation(this._program, "uMMatrix");
	        this._colorUniform = gl.getUniformLocation(this._program, "uColor");
	        this._thicknessUniform = gl.getUniformLocation(this._program, "uThickness");
	        this._dashWidthUniform = gl.getUniformLocation(this._program, "uDashWidth");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform3fv(this._colorUniform, this.color);
	        this._gl.uniform1f(this._dashWidthUniform, this.dashWidth);
	    }
	    applyView() {
	        this._gl.uniformMatrix4fv(this._mMatrixUniform, false, this.mMatrix);
	        this._gl.uniform2fv(this._thicknessUniform, this.thickness);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionTextureVertex.SIZE_BYTES, PositionTextureVertex.POSITION_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.vertexAttribPointer(this._texCoordAttribute, 2, this._gl.UNSIGNED_SHORT, true, PositionTextureVertex.SIZE_BYTES, PositionTextureVertex.TEX_COORD_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._texCoordAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Model extends ShaderBase$1 {
	    get texture2D() { return this._texture2D; }
	    set texture2D(value) {
	        if (this._texture2D != value) {
	            this._texture2D = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("model.vertex.fx", "model.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._texCoordAttribute = gl.getAttribLocation(this._program, "aTexCoord");
	        this._normalAttribute = gl.getAttribLocation(this._program, "aNormal");
	        this._samplerUniform = gl.getUniformLocation(this._program, "uSampler");
	        this._mMatrixUniform = gl.getUniformLocation(this._program, "uMMatrix");
	        this._vMatrixUniform = gl.getUniformLocation(this._program, "uVMatrix");
	        this._pMatrixUniform = gl.getUniformLocation(this._program, "uPMatrix");
	        this._directionToLightUniform = gl.getUniformLocation(this._program, "uDirectionToLight");
	        this._halfAngleUniform = gl.getUniformLocation(this._program, "uHalfAngle");
	        this._specularPowerUniform = gl.getUniformLocation(this._program, "uSpecularPower");
	        this._specularIntensityUniform = gl.getUniformLocation(this._program, "uSpecularIntensity");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniformMatrix4fv(this._mMatrixUniform, false, this.mMatrix);
	        this._gl.uniform1i(this._samplerUniform, 0);
	        this._gl.uniform1f(this._specularPowerUniform, this.specularPower);
	        this._gl.uniform1f(this._specularIntensityUniform, this.specularIntensity);
	    }
	    applyView() {
	        this._gl.uniform3fv(this._directionToLightUniform, this.directionToLight);
	        this._gl.uniform3fv(this._halfAngleUniform, this.halfAngle);
	        this._gl.uniformMatrix4fv(this._vMatrixUniform, false, this.vMatrix);
	        this._gl.uniformMatrix4fv(this._pMatrixUniform, false, this.pMatrix);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionNormalTextureVertex.SIZE_BYTES, PositionNormalTextureVertex.POSITION_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.vertexAttribPointer(this._normalAttribute, 3, this._gl.BYTE, true, PositionNormalTextureVertex.SIZE_BYTES, PositionNormalTextureVertex.NORMAL_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._normalAttribute);
	        this._gl.vertexAttribPointer(this._texCoordAttribute, 2, this._gl.UNSIGNED_SHORT, true, PositionNormalTextureVertex.SIZE_BYTES, PositionNormalTextureVertex.TEX_COORD_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._texCoordAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let SdfText$1 = class SdfText extends ShaderBase$1 {
	    get texture2D() { return this._texture2D; }
	    set texture2D(value) {
	        if (this._texture2D != value) {
	            this._texture2D = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("sdftext.vertex.fx", "sdftext.fragment.fx", (vsSource, fsSource) => {
	                if (this._main.shaderResources.OES_standard_derivatives == null) {
	                    fsSource = this._removeDirective(fsSource, "Derivatives");
	                }
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._idColorAttribute = gl.getAttribLocation(this._program, "aIdColor");
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._texCoordAttribute = gl.getAttribLocation(this._program, "aTexCoord");
	        this._samplerUniform = gl.getUniformLocation(this._program, "uSampler");
	        this._mMatrixUniform = gl.getUniformLocation(this._program, "uMMatrix");
	        this._vMatrixUniform = gl.getUniformLocation(this._program, "uVMatrix");
	        this._pMatrixUniform = gl.getUniformLocation(this._program, "uPMatrix");
	        this._colorUniform = gl.getUniformLocation(this._program, "uColor");
	        this._hoverColorUniform = gl.getUniformLocation(this._program, "uHoverColor");
	        this._pickUniform = gl.getUniformLocation(this._program, "uPick");
	        this._pickedIdColorUniform = gl.getUniformLocation(this._program, "uPickedIdColor");
	        this._borderColorUniform = gl.getUniformLocation(this._program, "uBorderColor");
	        this._bufferUniform = gl.getUniformLocation(this._program, "uBuffer");
	        this._borderWidthUniform = gl.getUniformLocation(this._program, "uBorderWidth");
	        this._gammaUniform = gl.getUniformLocation(this._program, "uGamma");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform1i(this._samplerUniform, 0);
	        this._gl.uniform3fv(this._colorUniform, this.color);
	        this._gl.uniform3fv(this._hoverColorUniform, this.hoverColor);
	        this._gl.uniform3fv(this._borderColorUniform, this.borderColor);
	        this._gl.uniform1f(this._gammaUniform, this.gamma);
	        this._gl.uniform1f(this._bufferUniform, this.buffer);
	        this._gl.uniform1f(this._borderWidthUniform, this.borderWidth);
	        this._gl.uniform4fv(this._pickedIdColorUniform, this.pickedIdColor);
	    }
	    applyModel() {
	        this._gl.uniformMatrix4fv(this._mMatrixUniform, false, this.mMatrix);
	    }
	    applyView() {
	        this._gl.uniform1i(this._pickUniform, this.isPickShader ? 1 : 0);
	        this._gl.uniformMatrix4fv(this._vMatrixUniform, false, this.vMatrix);
	        this._gl.uniformMatrix4fv(this._pMatrixUniform, false, this.pMatrix);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._idColorAttribute, 4, this._gl.UNSIGNED_BYTE, true, PositionTexturePickVertex.SIZE_BYTES, PositionTexturePickVertex.ID_COLOR_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._idColorAttribute);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionTexturePickVertex.SIZE_BYTES, PositionTexturePickVertex.POSITION_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.vertexAttribPointer(this._texCoordAttribute, 2, this._gl.UNSIGNED_SHORT, true, PositionTexturePickVertex.SIZE_BYTES, PositionTexturePickVertex.TEX_COORD_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._texCoordAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D);
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let PickGrid$1 = class PickGrid extends ShaderBase$1 {
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("pickgrid.vertex.fx", "pickgrid.fragment.fx", (vsSource, fsSource) => {
	                if (this._main.shaderResources.OES_standard_derivatives == null) {
	                    fsSource = this._removeDirective(fsSource, "Derivatives");
	                }
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = this._gl.getAttribLocation(this._program, "aPosition");
	        this._idColorAttribute = this._gl.getAttribLocation(this._program, "aIdColor");
	        this._texCoordAttribute = this._gl.getAttribLocation(this._program, "aTexCoord");
	        this._normalAttribute = this._gl.getAttribLocation(this._program, "aNormal");
	        this._boundsAttribute = this._gl.getAttribLocation(this._program, "aBounds");
	        this._pMatrixUniform = gl.getUniformLocation(this._program, "uPMatrix");
	        this._mMatrixUniform = gl.getUniformLocation(this._program, "uMMatrix");
	        this._vMatrixUniform = gl.getUniformLocation(this._program, "uVMatrix");
	        this._pickUniform = gl.getUniformLocation(this._program, "uPick");
	        this._majorColorUniform = gl.getUniformLocation(this._program, "uMajorColor");
	        this._minorColorUniform = gl.getUniformLocation(this._program, "uMinorColor");
	        this._zeroColorUniform = gl.getUniformLocation(this._program, "uZeroColor");
	        this._backgroundUniform = gl.getUniformLocation(this._program, "uBackground");
	        this._highlightUniform = gl.getUniformLocation(this._program, "uHighlight");
	        this._pickedIdColorUniform = gl.getUniformLocation(this._program, "uPickedIdColor");
	        this._faceSizeUniform = gl.getUniformLocation(this._program, "uFaceSize");
	        this._majorThicknessUniform = gl.getUniformLocation(this._program, "uMajorThickness");
	        this._minorThicknessUniform = gl.getUniformLocation(this._program, "uMinorThickness");
	        this._zeroThicknessUniform = gl.getUniformLocation(this._program, "uZeroThickness");
	        this._zeroUniform = gl.getUniformLocation(this._program, "uZero");
	        this._minorGridlinesUniform = gl.getUniformLocation(this._program, "uMinorGridlines");
	        this._directionToLightUniform = gl.getUniformLocation(this._program, "uDirectionToLight");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform1f(this._majorThicknessUniform, this.majorThickness);
	        this._gl.uniform1f(this._minorThicknessUniform, this.minorThickness);
	        this._gl.uniform1f(this._zeroThicknessUniform, this.zeroThickness);
	        this._gl.uniform3fv(this._backgroundUniform, this.backgroundColor);
	        this._gl.uniform3fv(this._highlightUniform, this.highlightColor);
	        this._gl.uniform3fv(this._majorColorUniform, this.majorColor);
	        this._gl.uniform3fv(this._minorColorUniform, this.minorColor);
	        this._gl.uniform3fv(this._zeroColorUniform, this.zeroColor);
	        this._gl.uniform3fv(this._directionToLightUniform, this.directionToLight);
	        this._gl.uniform4fv(this._pickedIdColorUniform, this.pickedIdColor);
	    }
	    applyView() {
	        this._gl.uniform1i(this._pickUniform, this.isPickShader ? 1 : 0);
	        this._gl.uniformMatrix4fv(this._vMatrixUniform, false, this.vMatrix);
	        this._gl.uniformMatrix4fv(this._pMatrixUniform, false, this.pMatrix);
	    }
	    ApplyFace() {
	        this._gl.uniformMatrix4fv(this._mMatrixUniform, false, this.mMatrix);
	        this._gl.uniform2f(this._faceSizeUniform, this.faceWidth, this.faceHeight);
	        this._gl.uniform2fv(this._zeroUniform, this.zero);
	        this._gl.uniform2fv(this._minorGridlinesUniform, this.minorGridlines);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PickGridVertex.SIZE_BYTES, PickGridVertex.TRANSLATION_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.vertexAttribPointer(this._normalAttribute, 3, this._gl.BYTE, true, PickGridVertex.SIZE_BYTES, PickGridVertex.NORMAL_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._normalAttribute);
	        this._gl.vertexAttribPointer(this._texCoordAttribute, 2, this._gl.UNSIGNED_SHORT, true, PickGridVertex.SIZE_BYTES, PickGridVertex.TEX_COORD_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._texCoordAttribute);
	        this._gl.vertexAttribPointer(this._idColorAttribute, 4, this._gl.UNSIGNED_BYTE, true, PickGridVertex.SIZE_BYTES, PickGridVertex.ID_COLOR_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._idColorAttribute);
	        this._gl.vertexAttribPointer(this._boundsAttribute, 4, this._gl.UNSIGNED_SHORT, true, PickGridVertex.SIZE_BYTES, PickGridVertex.BOUNDS_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._boundsAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let UnitShader$1 = class UnitShader extends ShaderBase$1 {
	    get paletteTexture() { return this._paletteTexture; }
	    set paletteTexture(value) {
	        if (this._paletteTexture != value) {
	            this._paletteTexture = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get previousPaletteTexture() { return this._previousPaletteTexture; }
	    set previousPaletteTexture(value) {
	        if (this._previousPaletteTexture != value) {
	            this._previousPaletteTexture = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get sdfTexture() { return this._sdfTexture; }
	    set sdfTexture(value) {
	        if (this._sdfTexture != value) {
	            this._sdfTexture = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get previousSdfTexture() { return this._previousSdfTexture; }
	    set previousSdfTexture(value) {
	        if (this._previousSdfTexture != value) {
	            this._previousSdfTexture = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    set instanceBuffer(value) {
	        if (this._instanceBuffer != value) {
	            this._instanceBuffer = value;
	            this._haveBuffersChanged = true;
	        }
	    }
	    set previousInstanceBuffer(value) {
	        if (this._previousInstanceBuffer != value) {
	            this._previousInstanceBuffer = value;
	            this._haveBuffersChanged = true;
	        }
	    }
	    initializeData() {
	        this._areBuffersInitialized = false;
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._translationAttribute = gl.getAttribLocation(this._program, "aTranslation");
	        this._previousTranslationAttribute = gl.getAttribLocation(this._program, "aPreviousTranslation");
	        this._scaleAttribute = gl.getAttribLocation(this._program, "aScale");
	        this._previousScaleAttribute = gl.getAttribLocation(this._program, "aPreviousScale");
	        this._colorAttribute = gl.getAttribLocation(this._program, "aColor");
	        this._previousColorAttribute = gl.getAttribLocation(this._program, "aPreviousColor");
	        this._selectedAttribute = gl.getAttribLocation(this._program, "aSelected");
	        this._previousSelectedAttribute = gl.getAttribLocation(this._program, "aPreviousSelected");
	        this._orderAttribute = gl.getAttribLocation(this._program, "aOrder");
	        this._idAttribute = gl.getAttribLocation(this._program, "aId");
	        this._idColorAttribute = gl.getAttribLocation(this._program, "aIdColor");
	        this._sampler0Uniform = gl.getUniformLocation(this._program, "uSampler");
	        this._previousSampler0Uniform = gl.getUniformLocation(this._program, "uPreviousSampler");
	        this._mMatrixUniform = gl.getUniformLocation(this._program, "uMMatrix");
	        this._vMatrixUniform = gl.getUniformLocation(this._program, "uVMatrix");
	        this._pMatrixUniform = gl.getUniformLocation(this._program, "uPMatrix");
	        this._timeUniform = gl.getUniformLocation(this._program, "uTime");
	        this._durationUniform = gl.getUniformLocation(this._program, "uDuration");
	        this._fromOrderUniform = gl.getUniformLocation(this._program, "uOrderFrom");
	        this._toOrderUniform = gl.getUniformLocation(this._program, "uOrderTo");
	        this._hoverUniform = gl.getUniformLocation(this._program, "uHover");
	        this._activeUniform = gl.getUniformLocation(this._program, "uActive");
	        this._pickUniform = gl.getUniformLocation(this._program, "uPick");
	        this._directionToLightUniform = gl.getUniformLocation(this._program, "uDirectionToLight");
	        this._halfAngleUniform = gl.getUniformLocation(this._program, "uHalfAngle");
	        this._specularPowerUniform = gl.getUniformLocation(this._program, "uSpecularPower");
	        this._specularIntensityUniform = gl.getUniformLocation(this._program, "uSpecularIntensity");
	        this._hoverColorUniform = gl.getUniformLocation(this._program, "uHoverColor");
	        this._ambientUniform = gl.getUniformLocation(this._program, "uAmbient");
	        this._activeColorUniform = gl.getUniformLocation(this._program, "uActiveColor");
	        this._selectedColorUniform = gl.getUniformLocation(this._program, "uSelectedColor");
	        this._highlightModeUniform = gl.getUniformLocation(this._program, "uHighlightMode");
	        const vertices = Cube.POSITIONS;
	        this._vertexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	        const indices = Cube.INDICES;
	        this._indexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
	        this.indexCount = indices.length;
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, 12, 0);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._updateCurrentBuffer();
	        this._updatePreviousBuffer();
	    }
	    _updateCurrentBuffer() {
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._instanceBuffer);
	        this._gl.vertexAttribPointer(this._idAttribute, 1, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ID_HOVER_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._idAttribute, 1);
	        this._gl.enableVertexAttribArray(this._idAttribute);
	        this._gl.vertexAttribPointer(this._idColorAttribute, 4, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.ID_COLOR_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._idColorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._idColorAttribute);
	        this._gl.vertexAttribPointer(this._translationAttribute, 3, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.TRANSLATION_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._translationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._translationAttribute);
	        this._gl.vertexAttribPointer(this._scaleAttribute, 3, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.SCALE_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._scaleAttribute, 1);
	        this._gl.enableVertexAttribArray(this._scaleAttribute);
	        this._gl.vertexAttribPointer(this._selectedAttribute, 1, this._gl.BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.SELECTED_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._selectedAttribute, 1);
	        this._gl.enableVertexAttribArray(this._selectedAttribute);
	        this._gl.vertexAttribPointer(this._orderAttribute, 2, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ORDER_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._orderAttribute, 1);
	        this._gl.enableVertexAttribArray(this._orderAttribute);
	    }
	    _updatePreviousBuffer() {
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        if (this._previousInstanceBuffer != this._instanceBuffer) {
	            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._previousInstanceBuffer);
	        }
	        this._gl.vertexAttribPointer(this._previousTranslationAttribute, 3, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.TRANSLATION_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousTranslationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousTranslationAttribute);
	        this._gl.vertexAttribPointer(this._previousScaleAttribute, 3, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.SCALE_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousScaleAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousScaleAttribute);
	        this._gl.vertexAttribPointer(this._previousSelectedAttribute, 1, this._gl.BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.SELECTED_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousSelectedAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousSelectedAttribute);
	    }
	    apply() {
	        this._gl.uniformMatrix4fv(this._mMatrixUniform, false, this.mMatrix);
	        this._gl.uniform1f(this._timeUniform, this.time);
	        this._gl.uniform1f(this._durationUniform, this.duration);
	        this._gl.uniform1f(this._fromOrderUniform, this.rangeMin);
	        this._gl.uniform1f(this._toOrderUniform, this.rangeMax);
	        this._gl.uniform1i(this._previousSampler0Uniform, 0);
	        this._gl.uniform1i(this._sampler0Uniform, 1);
	        this._gl.uniform1f(this._specularPowerUniform, this.specularPower);
	        this._gl.uniform1f(this._specularIntensityUniform, this.specularIntensity);
	        this._gl.uniform1f(this._ambientUniform, this.ambient);
	        this._gl.uniform3fv(this._hoverColorUniform, this.hoverColor);
	        this._gl.uniform3fv(this._activeColorUniform, this.activeColor);
	        this._gl.uniform3fv(this._selectedColorUniform, this.selectedColor);
	        this._gl.uniform1f(this._hoverUniform, this.hover);
	        this._gl.uniform1f(this._activeUniform, this.active);
	        this._gl.uniform1f(this._highlightModeUniform, this.highlightMode == HighlightMode.luminance ? 0.0 : 1.0);
	    }
	    applyView() {
	        this._gl.uniformMatrix4fv(this._vMatrixUniform, false, this.vMatrix);
	        this._gl.uniformMatrix4fv(this._pMatrixUniform, false, this.pMatrix);
	        this._gl.uniform3fv(this._directionToLightUniform, this.directionToLight);
	        this._gl.uniform3fv(this._halfAngleUniform, this.halfAngle);
	        this._gl.uniform1i(this._pickUniform, this.isPickShader ? 1 : 0);
	    }
	    updateTextures() {
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._previousPaletteTexture);
	        this._gl.activeTexture(this._gl.TEXTURE1);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._paletteTexture);
	    }
	    disableProgram() {
	        super.disableProgram();
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._translationAttribute, 0);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousTranslationAttribute, 0);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._scaleAttribute, 0);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousScaleAttribute, 0);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._colorAttribute, 0);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousColorAttribute, 0);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._selectedAttribute, 0);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousSelectedAttribute, 0);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._orderAttribute, 0);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._idAttribute, 0);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._idColorAttribute, 0);
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let UnitBlock$1 = class UnitBlock extends UnitShader$1 {
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("unitblock.vertex.fx", "unitblock.fragment.fx", (vsSource, fsSource) => {
	                if (this._main.shaderResources.OES_standard_derivatives == null) {
	                    vsSource = this._removeDirective(vsSource, "Derivatives");
	                    fsSource = this._removeDirective(fsSource, "Derivatives");
	                }
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        super._initializeShader(gl, vsSource, fsSource);
	        this._rotationAttribute = gl.getAttribLocation(this._program, "aRotation");
	        this._previousRotationAttribute = gl.getAttribLocation(this._program, "aPreviousRotation");
	        this._isInitialized = true;
	    }
	    _updateCurrentBuffer() {
	        super._updateCurrentBuffer();
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        this._gl.vertexAttribPointer(this._rotationAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ROTATION_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._rotationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._rotationAttribute);
	        this._gl.vertexAttribPointer(this._colorAttribute, 2, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._colorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._colorAttribute);
	    }
	    _updatePreviousBuffer() {
	        super._updatePreviousBuffer();
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        this._gl.vertexAttribPointer(this._previousRotationAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ROTATION_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousRotationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousRotationAttribute);
	        this._gl.vertexAttribPointer(this._previousColorAttribute, 2, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousColorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousColorAttribute);
	    }
	    disableProgram() {
	        super.disableProgram();
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._rotationAttribute, 0);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousRotationAttribute, 0);
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let UnitSphere$1 = class UnitSphere extends UnitShader$1 {
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("unitsphere.vertex.fx", "unitsphere.fragment.fx", (vsSource, fsSource) => {
	                if (this._main.shaderResources.EXT_frag_depth == null) {
	                    fsSource = this._removeDirective(fsSource, "FragDepth");
	                }
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        super._initializeShader(gl, vsSource, fsSource);
	        this._isInitialized = true;
	    }
	    _updateCurrentBuffer() {
	        super._updateCurrentBuffer();
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        this._gl.vertexAttribPointer(this._colorAttribute, 1, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._colorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._colorAttribute);
	    }
	    _updatePreviousBuffer() {
	        super._updatePreviousBuffer();
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        this._gl.vertexAttribPointer(this._previousColorAttribute, 1, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousColorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousColorAttribute);
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let UnitCylinder$1 = class UnitCylinder extends UnitShader$1 {
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("unitcylinder.vertex.fx", "unitcylinder.fragment.fx", (vsSource, fsSource) => {
	                if (this._main.shaderResources.EXT_frag_depth == null) {
	                    fsSource = this._removeDirective(fsSource, "FragDepth");
	                }
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        super._initializeShader(gl, vsSource, fsSource);
	        this._rotationAttribute = gl.getAttribLocation(this._program, "aRotation");
	        this._previousRotationAttribute = gl.getAttribLocation(this._program, "aPreviousRotation");
	        this._isInitialized = true;
	    }
	    _updateCurrentBuffer() {
	        super._updateCurrentBuffer();
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        this._gl.vertexAttribPointer(this._rotationAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ROTATION_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._rotationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._rotationAttribute);
	        this._gl.vertexAttribPointer(this._colorAttribute, 2, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._colorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._colorAttribute);
	    }
	    _updatePreviousBuffer() {
	        super._updatePreviousBuffer();
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        this._gl.vertexAttribPointer(this._previousRotationAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ROTATION_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousRotationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousRotationAttribute);
	        this._gl.vertexAttribPointer(this._previousColorAttribute, 2, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousColorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousColorAttribute);
	    }
	    disableProgram() {
	        super.disableProgram();
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._rotationAttribute, 0);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousRotationAttribute, 0);
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class UnitHexPrism extends UnitShader$1 {
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("unithexprism.vertex.fx", "unithexprism.fragment.fx", (vsSource, fsSource) => {
	                if (this._main.shaderResources.EXT_frag_depth == null) {
	                    fsSource = this._removeDirective(fsSource, "FragDepth");
	                }
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        super._initializeShader(gl, vsSource, fsSource);
	        this._rotationAttribute = gl.getAttribLocation(this._program, "aRotation");
	        this._previousRotationAttribute = gl.getAttribLocation(this._program, "aPreviousRotation");
	        this._isInitialized = true;
	    }
	    _updateCurrentBuffer() {
	        super._updateCurrentBuffer();
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        this._gl.vertexAttribPointer(this._rotationAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ROTATION_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._rotationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._rotationAttribute);
	        this._gl.vertexAttribPointer(this._colorAttribute, 2, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._colorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._colorAttribute);
	    }
	    _updatePreviousBuffer() {
	        super._updatePreviousBuffer();
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        this._gl.vertexAttribPointer(this._previousRotationAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ROTATION_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousRotationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousRotationAttribute);
	        this._gl.vertexAttribPointer(this._previousColorAttribute, 2, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousColorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousColorAttribute);
	    }
	    disableProgram() {
	        super.disableProgram();
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._rotationAttribute, 0);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousRotationAttribute, 0);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let UnitSdf$1 = class UnitSdf extends UnitShader$1 {
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("unitsdf.vertex.fx", "unitsdf.fragment.fx", (vsSource, fsSource) => {
	                if (this._main.shaderResources.OES_standard_derivatives == null) {
	                    vsSource = this._removeDirective(vsSource, "Derivatives");
	                    fsSource = this._removeDirective(fsSource, "Derivatives");
	                }
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        super._initializeShader(gl, vsSource, fsSource);
	        this._rotationAttribute = gl.getAttribLocation(this._program, "aRotation");
	        this._previousRotationAttribute = gl.getAttribLocation(this._program, "aPreviousRotation");
	        this._texCoordAttribute = gl.getAttribLocation(this._program, "aTexCoord");
	        this._previousTexCoordAttribute = gl.getAttribLocation(this._program, "aPreviousTexCoord");
	        this._sampler1Uniform = gl.getUniformLocation(this._program, "uSampler1");
	        this._previousSampler1Uniform = gl.getUniformLocation(this._program, "uPreviousSampler1");
	        this._sdfBufferUniform = gl.getUniformLocation(this._program, "uBuffer");
	        this._sdfBackgroundColorUniform = gl.getUniformLocation(this._program, "uBackgroundColor");
	        this._isInitialized = true;
	    }
	    _updateCurrentBuffer() {
	        super._updateCurrentBuffer();
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        this._gl.vertexAttribPointer(this._rotationAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ROTATION_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._rotationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._rotationAttribute);
	        this._gl.vertexAttribPointer(this._texCoordAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.TEXCOORD_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._texCoordAttribute, 1);
	        this._gl.enableVertexAttribArray(this._texCoordAttribute);
	        this._gl.vertexAttribPointer(this._colorAttribute, 2, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._colorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._colorAttribute);
	    }
	    _updatePreviousBuffer() {
	        super._updatePreviousBuffer();
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        this._gl.vertexAttribPointer(this._previousRotationAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ROTATION_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousRotationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousRotationAttribute);
	        this._gl.vertexAttribPointer(this._previousTexCoordAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.TEXCOORD_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousTexCoordAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousTexCoordAttribute);
	        this._gl.vertexAttribPointer(this._previousColorAttribute, 2, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousColorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousColorAttribute);
	    }
	    apply() {
	        super.apply();
	        this._gl.uniform1i(this._previousSampler1Uniform, 2);
	        this._gl.uniform1i(this._sampler1Uniform, 3);
	        this._gl.uniform1f(this._sdfBufferUniform, this.sdfBuffer);
	        this._gl.uniform3fv(this._sdfBackgroundColorUniform, this.sdfBackgroundColor);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE2);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._previousSdfTexture);
	        this._gl.activeTexture(this._gl.TEXTURE3);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._sdfTexture);
	    }
	    disableProgram() {
	        super.disableProgram();
	        const ANGLE_instanced_arrays = this._main.shaderResources.ANGLE_instanced_arrays;
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._rotationAttribute, 0);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousRotationAttribute, 0);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._texCoordAttribute, 0);
	        ANGLE_instanced_arrays.vertexAttribDivisorANGLE(this._previousTexCoordAttribute, 0);
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Anaglyph extends ShaderBase$1 {
	    get texture2D1() { return this._texture2D1; }
	    set texture2D1(value) {
	        if (this._texture2D1 != value) {
	            this._texture2D1 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get texture2D2() { return this._texture2D2; }
	    set texture2D2(value) {
	        if (this._texture2D2 != value) {
	            this._texture2D2 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("simple.vertex.fx", "anaglyph.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._viewportUniform = gl.getUniformLocation(this._program, "uViewport");
	        this._samplerUniform1 = gl.getUniformLocation(this._program, "uSampler1");
	        this._samplerUniform2 = gl.getUniformLocation(this._program, "uSampler2");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform4f(this._viewportUniform, this.viewport.x, this.viewport.y, this.viewport.width, this.viewport.height);
	        this._gl.uniform1i(this._samplerUniform1, 0);
	        this._gl.uniform1i(this._samplerUniform2, 1);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionVertex.SIZE_BYTES, 0);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D1);
	        this._gl.activeTexture(this._gl.TEXTURE1);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D2);
	        this._gl.activeTexture(this._gl.TEXTURE2);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class DebugAxesVisual {
	    get isInitialized() { return this._isInitialized && this._main.colorShader.isInitialized; }
	    constructor(core, main, debugAxes) {
	        this._main = main;
	        this._debugAxes = debugAxes;
	        this.isVisible = true;
	    }
	    initializeContext(gl) {
	        if (!this._debugAxes.isInitialized) {
	            this._debugAxes.initialize();
	        }
	        this._gl = gl;
	        this._vertexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, this._debugAxes.vertices, gl.STATIC_DRAW);
	        this._indexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._debugAxes.indices, gl.STATIC_DRAW);
	        this._isInitialized = true;
	    }
	    update(elapsedTime) { }
	    render(elapsedTime, xrFrame) {
	        if (this.isInitialized) {
	            const colorShader = this._main.colorShader;
	            const shaderResources = this._main.shaderResources;
	            colorShader.vertexBuffer = this._vertexBuffer;
	            colorShader.indexBuffer = this._indexBuffer;
	            colorShader.prepare();
	            colorShader.mMatrix = this.mMatrix;
	            colorShader.apply();
	            for (let i = 0; i < this.viewportCount; i++) {
	                const viewport = i + this.viewportOffset;
	                shaderResources.bindFramebuffer(this.framebuffers[viewport]);
	                this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                colorShader.vMatrix = this.vMatrices[viewport];
	                colorShader.pMatrix = this.pMatrices[viewport];
	                colorShader.applyView();
	                this._gl.drawElements(this._gl.TRIANGLE_STRIP, this._debugAxes.indexCount, this._gl.UNSIGNED_SHORT, 0);
	            }
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let AxesVisualBase$1 = class AxesVisualBase {
	    get isInitialized() { return this._isInitialized; }
	    get axes() { return this._axes; }
	    constructor(core) {
	        this._core = core;
	        this.isVisible = true;
	    }
	    initializeContext(gl) {
	        this._gl = gl;
	    }
	    update(elapsedTime) { }
	    render(elapsedTime, xrFrame) {
	        if (this.isInitialized) {
	            this._renderGrid();
	            this._renderText();
	        }
	    }
	    _renderGrid() { }
	    _renderText() { }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let Cartesian2dVisual$1 = class Cartesian2dVisual extends AxesVisualBase$1 {
	    get isInitialized() { return this._isInitialized && this._main.gridShader.isInitialized && this._main.sdfTextShader.isInitialized && this._main.fonts[this._axes.font.name].isInitialized; }
	    constructor(core, main, cartesian2dAxes) {
	        super(core);
	        this._main = main;
	        this._axes = cartesian2dAxes;
	        this._axes.hasChangedCallback = () => { this._hasChanged = true; };
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        const axes = this._axes;
	        if (!axes.isInitialized) {
	            axes.initialize();
	        }
	        if (axes.gridVertices) {
	            this._createGridBuffers();
	        }
	        if (axes.textVertices) {
	            this._createTextBuffers();
	        }
	        this._isInitialized = true;
	    }
	    _createGridBuffers() {
	        const axes = this._axes;
	        this._gridVertexBuffer = this._gl.createBuffer();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._gridVertexBuffer);
	        this._gl.bufferData(this._gl.ARRAY_BUFFER, axes.gridVertices, this._gl.STATIC_DRAW);
	        this._gridIndexBuffer = this._gl.createBuffer();
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._gridIndexBuffer);
	        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, axes.gridIndices, this._gl.STATIC_DRAW);
	        this._gridBufferSize = axes.gridVertices.byteLength;
	        this._core.log.write(LogLevel.info, `cartesian2d visual grid buffers created`);
	    }
	    _createTextBuffers() {
	        const axes = this._axes;
	        this._textVertexBuffer = this._gl.createBuffer();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textVertexBuffer);
	        this._gl.bufferData(this._gl.ARRAY_BUFFER, axes.textVertices, this._gl.STATIC_DRAW);
	        this._textIndexBuffer = this._gl.createBuffer();
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._textIndexBuffer);
	        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, axes.textIndices, this._gl.STATIC_DRAW);
	        this._textBufferSize = axes.textVertices.byteLength;
	        this._core.log.write(LogLevel.info, `cartesian2d visual text buffers created`);
	    }
	    update(elapsedTime) {
	        if (this._hasChanged) {
	            this._hasChanged = false;
	            const axes = this._axes;
	            if (!this._gridVertexBuffer || axes.gridVertices.byteLength > this._gridBufferSize) {
	                this._createGridBuffers();
	            }
	            else {
	                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._gridVertexBuffer);
	                this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, axes.gridVertices);
	                this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._gridIndexBuffer);
	                this._gl.bufferSubData(this._gl.ELEMENT_ARRAY_BUFFER, 0, axes.gridIndices);
	                this._core.log.write(LogLevel.info, `cartesian2d visual grid buffers updated`);
	            }
	            if (!this._textVertexBuffer || axes.textVertices.byteLength > this._textBufferSize) {
	                this._createTextBuffers();
	            }
	            else {
	                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textVertexBuffer);
	                this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, axes.textVertices);
	                this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._textIndexBuffer);
	                this._gl.bufferSubData(this._gl.ELEMENT_ARRAY_BUFFER, 0, axes.textIndices);
	                this._core.log.write(LogLevel.info, `cartesian2d visual text buffers updated`);
	            }
	            this._main.shaderResources.currentProgram = null;
	        }
	    }
	    _renderText() {
	        const axes = this._axes;
	        const shader = this._main.sdfTextShader;
	        const shaderResources = this._main.shaderResources;
	        const fontVisual = this._main.fonts[axes.font.name];
	        shader.vertexBuffer = this._textVertexBuffer;
	        shader.indexBuffer = this._textIndexBuffer;
	        shader.texture2D = fontVisual.texture;
	        shader.prepare();
	        shader.buffer = fontVisual.font.edgeValue / 0xff;
	        shader.gamma = axes.gamma;
	        shader.borderWidth = axes.textBorderWidth;
	        shader.color = axes.textColor || this._core.config.axesTextColor;
	        shader.hoverColor = axes.textHoverColor || this._core.config.axesTextHoverColor;
	        shader.borderColor = axes.textBorderColor || this._core.config.textBorderColor;
	        shader.pickedIdColor = this.pickedIdColor;
	        shader.apply();
	        let indexCount, indexOffset;
	        for (let axisId = 0; axisId < 2; axisId++) {
	            const orientation = axes.getLabelOrientation(axisId);
	            for (let edge = 0; edge < 2; edge++) {
	                const edgeId = Quad$2.AXIS_EDGES[axisId][edge];
	                if (axes.isEdgeVisible[edgeId]) {
	                    if ((orientation == AxesTextOrientation.parallel && axes.getIsLeftToRightHorizontal(edgeId)) || (orientation == AxesTextOrientation.perpendicular && axes.getIsLeftToRightVertical(edgeId))) {
	                        indexCount = axes.getAxesLeftToRightIndexCount(axisId);
	                        indexOffset = axes.getAxesLeftToRightIndexOffset(axisId);
	                    }
	                    else {
	                        indexCount = axes.getAxesRightToLeftIndexCount(axisId);
	                        indexOffset = axes.getAxesRightToLeftIndexOffset(axisId);
	                    }
	                    if (indexCount > 0) {
	                        shader.mMatrix = axes.getLabelMMatrix(edgeId);
	                        shader.applyModel();
	                        shader.isPickShader = false;
	                        for (let i = 0; i < this.viewportCount; i++) {
	                            const viewport = i + this.viewportOffset;
	                            shaderResources.bindFramebuffer(this.framebuffers[viewport]);
	                            this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                            shader.vMatrix = this.vMatrices[viewport];
	                            shader.pMatrix = this.pMatrices[viewport];
	                            shader.applyView();
	                            this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                        }
	                        if (this.isPickingEnabled && axes.isLabelPickingEnabled[axisId]) {
	                            shader.isPickShader = true;
	                            shader.pMatrix = this.pickPMatrix;
	                            shader.vMatrix = this.pickVMatrix;
	                            shader.applyView();
	                            shaderResources.bindFramebuffer(this.pickFramebuffer);
	                            this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                            this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                        }
	                    }
	                    indexCount = axes.getTitleIndexCount(axisId);
	                    if (indexCount > 0) {
	                        indexOffset = axes.getTitleIndexOffset(axisId);
	                        shader.mMatrix = axes.getTitleMMatrix(edgeId);
	                        shader.applyModel();
	                        shader.isPickShader = false;
	                        for (let i = 0; i < this.viewportCount; i++) {
	                            const viewport = i + this.viewportOffset;
	                            shaderResources.bindFramebuffer(this.framebuffers[viewport]);
	                            this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                            shader.vMatrix = this.vMatrices[viewport];
	                            shader.pMatrix = this.pMatrices[viewport];
	                            shader.applyView();
	                            this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                        }
	                        if (this.isPickingEnabled && axes.isTitlePickingEnabled[axisId]) {
	                            shader.isPickShader = true;
	                            shader.pMatrix = this.pickPMatrix;
	                            shader.vMatrix = this.pickVMatrix;
	                            shader.applyView();
	                            shaderResources.bindFramebuffer(this.pickFramebuffer);
	                            this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                            this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                        }
	                    }
	                }
	                indexCount = axes.getHeadingIndexCount(axisId);
	                if (indexCount > 0 && axes.isHeadingVisible[edgeId]) {
	                    indexOffset = axes.getHeadingIndexOffset(axisId);
	                    shader.mMatrix = axes.getHeadingMMatrix(edgeId);
	                    shader.applyModel();
	                    shader.isPickShader = false;
	                    for (let i = 0; i < this.viewportCount; i++) {
	                        const viewport = i + this.viewportOffset;
	                        shaderResources.bindFramebuffer(this.framebuffers[viewport]);
	                        this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                        shader.vMatrix = this.vMatrices[viewport];
	                        shader.pMatrix = this.pMatrices[viewport];
	                        shader.applyView();
	                        this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                    }
	                    if (this.isPickingEnabled && axes.isHeadingPickingEnabled[axisId]) {
	                        shader.isPickShader = true;
	                        shader.pMatrix = this.pickPMatrix;
	                        shader.vMatrix = this.pickVMatrix;
	                        shader.applyView();
	                        shaderResources.bindFramebuffer(this.pickFramebuffer);
	                        this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                        this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                    }
	                }
	            }
	        }
	    }
	    _renderGrid() {
	        const axes = this._axes;
	        const gridShader = this._main.gridShader;
	        gridShader.vertexBuffer = this._gridVertexBuffer;
	        gridShader.indexBuffer = this._gridIndexBuffer;
	        gridShader.prepare();
	        gridShader.majorThickness = axes.gridMajorThickness;
	        gridShader.minorThickness = axes.gridMinorThickness;
	        gridShader.zeroThickness = axes.gridZeroThickness;
	        gridShader.backgroundColor = axes.gridBackgroundColor || this._core.config.axesGridBackgroundColor;
	        gridShader.highlightColor = axes.gridHighlightColor || this._core.config.axesGridHighlightColor;
	        gridShader.majorColor = axes.gridMajorColor || this._core.config.axesGridMajorColor;
	        gridShader.minorColor = axes.gridMinorColor || this._core.config.axesGridMinorColor;
	        gridShader.zeroColor = axes.gridZeroColor || this._core.config.axesGridZeroColor;
	        gridShader.pickedIdColor = this.pickedIdColor;
	        gridShader.directionToLight = Constants.VECTOR3_UNITZ;
	        gridShader.apply();
	        for (let axisId = 0; axisId < 2; axisId++) {
	            if (axes.arePickDivisionsVisible[axisId]) {
	                const gridTicksScale = axes.getGridTicksScale(axisId);
	                const width = gridTicksScale[0];
	                const height = gridTicksScale[1];
	                gridShader.zero = axes.getGridTicksZero(axisId);
	                gridShader.minorGridlines = axes.getGridTicksMinorGridlines(axisId);
	                for (let edge = 0; edge < 2; edge++) {
	                    const edgeId = Quad$2.AXIS_EDGES[axisId][edge];
	                    if (axes.isEdgeVisible[edgeId]) {
	                        this._renderGridTicks(axisId, edgeId, width, height);
	                    }
	                }
	            }
	        }
	        this._gl.disable(this._gl.CULL_FACE);
	        const size = axes.size;
	        const axisId2 = 0;
	        const axisId3 = 1;
	        const width = size[axisId2];
	        const height = size[axisId3];
	        gridShader.zero = axes.gridFaceZero;
	        gridShader.minorGridlines = axes.gridFaceMinorGridlines;
	        for (let face = 0; face < 2; face++) {
	            const faceId = face;
	            if (axes.getIsForwardFace(faceId)) {
	                this._renderGridFace(faceId, width, height);
	            }
	        }
	        this._gl.enable(this._gl.CULL_FACE);
	    }
	    _renderGridTicks(axisId, edgeId, width, height) {
	        const axes = this._axes;
	        const gridShader = this._main.gridShader;
	        const shaderResources = this._main.shaderResources;
	        gridShader.mMatrix = axes.getGridTicksMMatrix(edgeId);
	        gridShader.faceWidth = width;
	        gridShader.faceHeight = height;
	        gridShader.ApplyFace();
	        gridShader.isPickShader = false;
	        for (let i = 0; i < this.viewportCount; i++) {
	            const viewport = i + this.viewportOffset;
	            shaderResources.bindFramebuffer(this.framebuffers[viewport]);
	            this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	            gridShader.vMatrix = this.vMatrices[viewport];
	            gridShader.pMatrix = this.pMatrices[viewport];
	            gridShader.applyView();
	            this._gl.drawElements(this._gl.TRIANGLES, axes.getGridTicksIndexCount(axisId), this._gl.UNSIGNED_SHORT, axes.getGridTicksIndexOffset(axisId) * 2);
	        }
	        if (this.isPickingEnabled && axes.isDivisionPickingEnabled[axisId]) {
	            gridShader.isPickShader = true;
	            gridShader.vMatrix = this.pickVMatrix;
	            gridShader.pMatrix = this.pickPMatrix;
	            gridShader.applyView();
	            shaderResources.bindFramebuffer(this.pickFramebuffer);
	            this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	            this._gl.drawElements(this._gl.TRIANGLES, this._axes.getGridTicksIndexCount(axisId), this._gl.UNSIGNED_SHORT, this._axes.getGridTicksIndexOffset(axisId) * 2);
	        }
	    }
	    _renderGridFace(faceId, width, height) {
	        const axes = this._axes;
	        const gridShader = this._main.gridShader;
	        const shaderResources = this._main.shaderResources;
	        gridShader.mMatrix = axes.getGridFaceMMatrix(faceId);
	        gridShader.faceWidth = width;
	        gridShader.faceHeight = height;
	        gridShader.ApplyFace();
	        gridShader.isPickShader = false;
	        for (let i = 0; i < this.viewportCount; i++) {
	            const viewport = i + this.viewportOffset;
	            shaderResources.bindFramebuffer(this.framebuffers[viewport]);
	            this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	            gridShader.vMatrix = this.vMatrices[viewport];
	            gridShader.pMatrix = this.pMatrices[viewport];
	            gridShader.applyView();
	            this._gl.drawElements(this._gl.TRIANGLES, axes.getGridFaceIndexCount(faceId), this._gl.UNSIGNED_SHORT, axes.getGridFaceIndexOffset(faceId) * 2);
	        }
	        if (this.isPickingEnabled && axes.isGridPickingEnabled) {
	            gridShader.isPickShader = true;
	            gridShader.vMatrix = this.pickVMatrix;
	            gridShader.pMatrix = this.pickPMatrix;
	            gridShader.applyView();
	            shaderResources.bindFramebuffer(this.pickFramebuffer);
	            this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	            this._gl.drawElements(this._gl.TRIANGLES, axes.getGridFaceIndexCount(faceId), this._gl.UNSIGNED_SHORT, axes.getGridFaceIndexOffset(faceId) * 2);
	        }
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let Cartesian3dVisual$1 = class Cartesian3dVisual extends AxesVisualBase$1 {
	    get isInitialized() { return this._isInitialized && this._main.gridShader.isInitialized && this._main.sdfTextShader.isInitialized && this._main.fonts[this._axes.font.name].isInitialized; }
	    constructor(core, main, cartesian3dAxes) {
	        super(core);
	        this._main = main;
	        this._axes = cartesian3dAxes;
	        this._axes.hasChangedCallback = () => { this._hasChanged = true; };
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        const axes = this._axes;
	        if (!axes.isInitialized) {
	            axes.initialize();
	        }
	        if (axes.gridVertices) {
	            this._createGridBuffers();
	        }
	        if (axes.textVertices) {
	            this._createTextBuffers();
	        }
	        this._isInitialized = true;
	    }
	    _createGridBuffers() {
	        const axes = this._axes;
	        this._gridVertexBuffer = this._gl.createBuffer();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._gridVertexBuffer);
	        this._gl.bufferData(this._gl.ARRAY_BUFFER, axes.gridVertices, this._gl.STATIC_DRAW);
	        this._gridIndexBuffer = this._gl.createBuffer();
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._gridIndexBuffer);
	        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, axes.gridIndices, this._gl.STATIC_DRAW);
	        this._gridBufferSize = axes.gridVertices.byteLength;
	        this._core.log.write(LogLevel.info, `cartesian3d visual grid buffers created`);
	    }
	    _createTextBuffers() {
	        const axes = this._axes;
	        this._textVertexBuffer = this._gl.createBuffer();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textVertexBuffer);
	        this._gl.bufferData(this._gl.ARRAY_BUFFER, axes.textVertices, this._gl.STATIC_DRAW);
	        this._textIndexBuffer = this._gl.createBuffer();
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._textIndexBuffer);
	        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, axes.textIndices, this._gl.STATIC_DRAW);
	        this._textBufferSize = axes.textVertices.byteLength;
	        this._core.log.write(LogLevel.info, `cartesian3d visual text buffers created`);
	    }
	    update(elapsedTime) {
	        if (this._hasChanged) {
	            this._hasChanged = false;
	            const axes = this._axes;
	            if (!this._gridVertexBuffer || axes.gridVertices.byteLength > this._gridBufferSize) {
	                this._createGridBuffers();
	            }
	            else {
	                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._gridVertexBuffer);
	                this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, axes.gridVertices);
	                this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._gridIndexBuffer);
	                this._gl.bufferSubData(this._gl.ELEMENT_ARRAY_BUFFER, 0, axes.gridIndices);
	                this._core.log.write(LogLevel.info, `cartesian3d visual grid buffers updated`);
	            }
	            if (!this._textVertexBuffer || axes.textVertices.byteLength > this._textBufferSize) {
	                this._createTextBuffers();
	            }
	            else {
	                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textVertexBuffer);
	                this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, axes.textVertices);
	                this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._textIndexBuffer);
	                this._gl.bufferSubData(this._gl.ELEMENT_ARRAY_BUFFER, 0, axes.textIndices);
	                this._core.log.write(LogLevel.info, `cartesian3d visual text buffers updated`);
	            }
	            this._main.shaderResources.currentProgram = null;
	        }
	    }
	    _renderText() {
	        const axes = this._axes;
	        const shader = this._main.sdfTextShader;
	        const shaderResources = this._main.shaderResources;
	        const fontVisual = this._main.fonts[axes.font.name];
	        shader.vertexBuffer = this._textVertexBuffer;
	        shader.indexBuffer = this._textIndexBuffer;
	        shader.texture2D = fontVisual.texture;
	        shader.prepare();
	        shader.buffer = fontVisual.font.edgeValue / 0xff;
	        shader.gamma = axes.gamma;
	        shader.borderWidth = axes.textBorderWidth;
	        shader.color = axes.textColor || this._core.config.axesTextColor;
	        shader.hoverColor = axes.textHoverColor || this._core.config.axesTextHoverColor;
	        shader.borderColor = axes.textBorderColor || this._core.config.textBorderColor;
	        shader.pickedIdColor = this.pickedIdColor;
	        shader.apply();
	        let indexCount, indexOffset;
	        for (let axisId = 0; axisId < 3; axisId++) {
	            const orientation = axes.getLabelOrientation(axisId);
	            for (let edge = 0; edge < 4; edge++) {
	                const edgeId = Cube.AXIS_EDGES[axisId][edge];
	                if (axes.getIsOutsideEdge(edgeId)) {
	                    if (axes.isEdgeVisible[edgeId]) {
	                        if ((orientation == AxesTextOrientation.parallel && axes.getIsLeftToRightHorizontal(edgeId)) || (orientation == AxesTextOrientation.perpendicular && axes.getIsLeftToRightVertical(edgeId))) {
	                            indexCount = axes.getAxesLeftToRightIndexCount(axisId);
	                            indexOffset = axes.getAxesLeftToRightIndexOffset(axisId);
	                        }
	                        else {
	                            indexCount = axes.getAxesRightToLeftIndexCount(axisId);
	                            indexOffset = axes.getAxesRightToLeftIndexOffset(axisId);
	                        }
	                        if (indexCount > 0) {
	                            shader.mMatrix = axes.getLabelMMatrix(edgeId);
	                            shader.applyModel();
	                            shader.isPickShader = false;
	                            for (let i = 0; i < this.viewportCount; i++) {
	                                const viewport = i + this.viewportOffset;
	                                shaderResources.bindFramebuffer(this.framebuffers[viewport]);
	                                this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                                shader.vMatrix = this.vMatrices[viewport];
	                                shader.pMatrix = this.pMatrices[viewport];
	                                shader.applyView();
	                                this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                            }
	                            if (this.isPickingEnabled && axes.isLabelPickingEnabled[axisId]) {
	                                shader.isPickShader = true;
	                                shader.pMatrix = this.pickPMatrix;
	                                shader.vMatrix = this.pickVMatrix;
	                                shader.applyView();
	                                shaderResources.bindFramebuffer(this.pickFramebuffer);
	                                this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                                this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                            }
	                        }
	                        indexCount = axes.getTitleIndexCount(axisId);
	                        if (indexCount > 0) {
	                            indexOffset = axes.getTitleIndexOffset(axisId);
	                            shader.mMatrix = axes.getTitleMMatrix(edgeId);
	                            shader.applyModel();
	                            shader.isPickShader = false;
	                            for (let i = 0; i < this.viewportCount; i++) {
	                                const viewport = i + this.viewportOffset;
	                                shaderResources.bindFramebuffer(this.framebuffers[viewport]);
	                                this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                                shader.vMatrix = this.vMatrices[viewport];
	                                shader.pMatrix = this.pMatrices[viewport];
	                                shader.applyView();
	                                this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                            }
	                            if (this.isPickingEnabled && axes.isTitlePickingEnabled[axisId]) {
	                                shader.isPickShader = true;
	                                shader.pMatrix = this.pickPMatrix;
	                                shader.vMatrix = this.pickVMatrix;
	                                shader.applyView();
	                                shaderResources.bindFramebuffer(this.pickFramebuffer);
	                                this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                                this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                            }
	                        }
	                    }
	                    indexCount = axes.getHeadingIndexCount(axisId);
	                    if (indexCount > 0 && axes.isHeadingVisible[edgeId]) {
	                        indexOffset = axes.getHeadingIndexOffset(axisId);
	                        shader.mMatrix = axes.getHeadingMMatrix(edgeId);
	                        shader.applyModel();
	                        shader.isPickShader = false;
	                        for (let i = 0; i < this.viewportCount; i++) {
	                            const viewport = i + this.viewportOffset;
	                            shaderResources.bindFramebuffer(this.framebuffers[viewport]);
	                            this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                            shader.vMatrix = this.vMatrices[viewport];
	                            shader.pMatrix = this.pMatrices[viewport];
	                            shader.applyView();
	                            this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                        }
	                        if (this.isPickingEnabled && axes.isHeadingPickingEnabled[axisId]) {
	                            shader.isPickShader = true;
	                            shader.pMatrix = this.pickPMatrix;
	                            shader.vMatrix = this.pickVMatrix;
	                            shader.applyView();
	                            shaderResources.bindFramebuffer(this.pickFramebuffer);
	                            this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                            this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                        }
	                    }
	                }
	            }
	        }
	    }
	    _renderGrid() {
	        const axes = this._axes;
	        const gridShader = this._main.gridShader;
	        gridShader.vertexBuffer = this._gridVertexBuffer;
	        gridShader.indexBuffer = this._gridIndexBuffer;
	        gridShader.prepare();
	        gridShader.majorThickness = axes.gridMajorThickness;
	        gridShader.minorThickness = axes.gridMinorThickness;
	        gridShader.zeroThickness = axes.gridZeroThickness;
	        gridShader.backgroundColor = axes.gridBackgroundColor || this._core.config.axesGridBackgroundColor;
	        gridShader.highlightColor = axes.gridHighlightColor || this._core.config.axesGridHighlightColor;
	        gridShader.majorColor = axes.gridMajorColor || this._core.config.axesGridMajorColor;
	        gridShader.minorColor = axes.gridMinorColor || this._core.config.axesGridMinorColor;
	        gridShader.zeroColor = axes.gridZeroColor || this._core.config.axesGridZeroColor;
	        gridShader.pickedIdColor = this.pickedIdColor;
	        gridShader.directionToLight = Constants.VECTOR3_UNITZ;
	        gridShader.apply();
	        for (let axisId = 0; axisId < 3; axisId++) {
	            if (axes.arePickDivisionsVisible[axisId]) {
	                const gridTicksScale = axes.getGridTicksScale(axisId);
	                const width = gridTicksScale[0];
	                const height = gridTicksScale[1];
	                gridShader.zero = axes.getGridTicksZero(axisId);
	                gridShader.minorGridlines = axes.getGridTicksMinorGridlines(axisId);
	                for (let edge = 0; edge < 4; edge++) {
	                    const edgeId = Cube.AXIS_EDGES[axisId][edge];
	                    if (axes.getIsOutsideEdge(edgeId) && axes.isEdgeVisible[edgeId]) {
	                        this._renderGridTicks(axisId, edgeId, width, height);
	                    }
	                }
	            }
	        }
	        this._gl.disable(this._gl.CULL_FACE);
	        const size = axes.size;
	        for (let axisId = 0; axisId < 3; axisId++) {
	            if (axes.areFacesVisible[axisId]) {
	                const axisId2 = axisId == 0 ? 1 : 0;
	                const axisId3 = axisId == 2 ? 1 : 2;
	                const width = size[axisId2];
	                const height = size[axisId3];
	                gridShader.zero = axes.getGridFaceZero(axisId);
	                gridShader.minorGridlines = axes.getGridFaceMinorGridlines(axisId);
	                for (let face = 0; face < 2; face++) {
	                    const faceId = Cube.AXIS_FACES[axisId][face];
	                    if (axes.getIsForwardFace(faceId) && axes.isFaceVisible[faceId]) {
	                        this._renderGridFace(faceId, width, height);
	                    }
	                }
	            }
	        }
	        this._gl.enable(this._gl.CULL_FACE);
	    }
	    _renderGridTicks(axisId, edgeId, width, height) {
	        const axes = this._axes;
	        const gridShader = this._main.gridShader;
	        const shaderResources = this._main.shaderResources;
	        gridShader.mMatrix = axes.getGridTicksMMatrix(edgeId);
	        gridShader.faceWidth = width;
	        gridShader.faceHeight = height;
	        gridShader.ApplyFace();
	        gridShader.isPickShader = false;
	        for (let i = 0; i < this.viewportCount; i++) {
	            const viewport = i + this.viewportOffset;
	            shaderResources.bindFramebuffer(this.framebuffers[viewport]);
	            this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	            gridShader.vMatrix = this.vMatrices[viewport];
	            gridShader.pMatrix = this.pMatrices[viewport];
	            gridShader.applyView();
	            this._gl.drawElements(this._gl.TRIANGLES, axes.getGridTicksIndexCount(axisId), this._gl.UNSIGNED_SHORT, axes.getGridTicksIndexOffset(axisId) * 2);
	        }
	        if (this.isPickingEnabled && axes.isDivisionPickingEnabled[axisId]) {
	            gridShader.isPickShader = true;
	            gridShader.vMatrix = this.pickVMatrix;
	            gridShader.pMatrix = this.pickPMatrix;
	            gridShader.applyView();
	            shaderResources.bindFramebuffer(this.pickFramebuffer);
	            this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	            this._gl.drawElements(this._gl.TRIANGLES, axes.getGridTicksIndexCount(axisId), this._gl.UNSIGNED_SHORT, axes.getGridTicksIndexOffset(axisId) * 2);
	        }
	    }
	    _renderGridFace(faceId, width, height) {
	        const axes = this._axes;
	        const gridShader = this._main.gridShader;
	        const shaderResources = this._main.shaderResources;
	        gridShader.mMatrix = axes.getGridFaceMMatrix(faceId);
	        gridShader.faceWidth = width;
	        gridShader.faceHeight = height;
	        gridShader.ApplyFace();
	        gridShader.isPickShader = false;
	        for (let i = 0; i < this.viewportCount; i++) {
	            const viewport = i + this.viewportOffset;
	            shaderResources.bindFramebuffer(this.framebuffers[viewport]);
	            this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	            gridShader.vMatrix = this.vMatrices[viewport];
	            gridShader.pMatrix = this.pMatrices[viewport];
	            gridShader.applyView();
	            this._gl.drawElements(this._gl.TRIANGLES, axes.getGridFaceIndexCount(faceId), this._gl.UNSIGNED_SHORT, axes.getGridFaceIndexOffset(faceId) * 2);
	        }
	        if (this.isPickingEnabled && axes.isGridPickingEnabled) {
	            gridShader.isPickShader = true;
	            gridShader.vMatrix = this.pickVMatrix;
	            gridShader.pMatrix = this.pickPMatrix;
	            gridShader.applyView();
	            shaderResources.bindFramebuffer(this.pickFramebuffer);
	            this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	            this._gl.drawElements(this._gl.TRIANGLES, axes.getGridFaceIndexCount(faceId), this._gl.UNSIGNED_SHORT, axes.getGridFaceIndexOffset(faceId) * 2);
	        }
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class ControllerVisual {
	    get isInitialized() { return this._isInitialized && this._modelShader.isInitialized && this._colorShader.isInitialized; }
	    get controller() { return this._controller; }
	    constructor(core, main, controller) {
	        this._core = core;
	        this._main = main;
	        this._mMatrix = create$4();
	        this._vec3 = create$3();
	        this._controller = controller;
	        this._modelShader = main.modelShader;
	        this._colorShader = main.colorShader;
	        this.mMatrix = create$4();
	        this.rayMMatrix = create$4();
	        this.isVisible = true;
	    }
	    initializeContext(gl) {
	        if (!this._controller.isInitialized) {
	            this._controller.initialize();
	        }
	        this._initialize(gl);
	    }
	    _initialize(gl) {
	        this._gl = gl;
	        this.modelTexture = TextureHelper.fromImage(gl, this._controller.texture, false, gl.LINEAR);
	        this._modelVertexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this._modelVertexBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, this._controller.vertices, gl.STATIC_DRAW);
	        this._modelIndexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._modelIndexBuffer);
	        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._controller.indices, gl.STATIC_DRAW);
	        this._rayVertexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this._rayVertexBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, this._controller.rayVertices, gl.STATIC_DRAW);
	        this._rayIndexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._rayIndexBuffer);
	        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._controller.rayIndices, gl.STATIC_DRAW);
	        this._isInitialized = true;
	    }
	    update(elapsedTime) { }
	    render(elapsedTime, xrFrame) {
	        if (this.isInitialized) {
	            this._modelShader.vertexBuffer = this._modelVertexBuffer;
	            this._modelShader.indexBuffer = this._modelIndexBuffer;
	            this._modelShader.texture2D = this.modelTexture;
	            this._modelShader.prepare();
	            multiply$2(this._mMatrix, this._controller.useRayPose ? this.rayMMatrix : this.mMatrix, this._controller.mMatrix);
	            this._modelShader.mMatrix = this._mMatrix;
	            this._modelShader.specularPower = 10;
	            this._modelShader.specularIntensity = 0.01;
	            this._modelShader.apply();
	            this._modelShader.applyModel();
	            for (let i = 0; i < this.viewportCount; i++) {
	                const viewport = i + this.viewportOffset;
	                this._main.shaderResources.bindFramebuffer(this.framebuffers[viewport]);
	                this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                this._modelShader.directionToLight = Constants.VECTOR3_UNITZ;
	                this._modelShader.halfAngle = Constants.VECTOR3_UNITZ;
	                this._modelShader.vMatrix = this.vMatrices[viewport];
	                this._modelShader.pMatrix = this.pMatrices[viewport];
	                this._modelShader.applyView();
	                this._gl.drawElements(this._gl.TRIANGLES, this._controller.indexCount, this._gl.UNSIGNED_SHORT, 0);
	            }
	            if (this.isRayVisible) {
	                this._colorShader.vertexBuffer = this._rayVertexBuffer;
	                this._colorShader.indexBuffer = this._rayIndexBuffer;
	                this._colorShader.prepare();
	                multiply$2(this._mMatrix, this.rayMMatrix, this._controller.rayMMatrix);
	                this._colorShader.mMatrix = this._mMatrix;
	                this._colorShader.apply();
	                this._colorShader.applyModel();
	                for (let i = 0; i < this.viewportCount; i++) {
	                    const viewport = i + this.viewportOffset;
	                    this._main.shaderResources.bindFramebuffer(this.framebuffers[viewport]);
	                    this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                    this._colorShader.vMatrix = this.vMatrices[viewport];
	                    this._colorShader.pMatrix = this.pMatrices[viewport];
	                    this._colorShader.applyView();
	                    this._gl.drawElements(this._gl.TRIANGLE_STRIP, this._controller.rayIndexCount, this._gl.UNSIGNED_SHORT, 0);
	                }
	            }
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let ImageVisual$1 = class ImageVisual {
	    get isInitialized() { return this._isInitialized && this._main.textureShader.isInitialized; }
	    get image() { return this._image; }
	    constructor(core, main, image) {
	        this._core = core;
	        this._main = main;
	        this._image = image;
	        this._image.hasChangedCallback = () => { this._hasChanged = true; };
	        this.mMatrix = create$4();
	        this.isVisible = true;
	    }
	    initializeContext(gl) {
	        if (!this._image.isInitialized) {
	            this._image.initialize();
	        }
	        this._gl = gl;
	        if (this._image.imageData) {
	            this.texture = TextureHelper.fromImage(gl, this._image.imageData, false, gl.LINEAR);
	        }
	        this._vertexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, this._image.vertices, gl.STATIC_DRAW);
	        this._indexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._image.indices, gl.STATIC_DRAW);
	        this._isInitialized = true;
	    }
	    update(elapsedTime) {
	        if (this._hasChanged) {
	            this._hasChanged = false;
	            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	            this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, this._image.vertices);
	            this._main.shaderResources.currentProgram = null;
	        }
	    }
	    render(elapsedTime, xrFrame) {
	        if (this.isInitialized) {
	            const textureShader = this._main.textureShader;
	            const shaderResources = this._main.shaderResources;
	            textureShader.vertexBuffer = this._vertexBuffer;
	            textureShader.indexBuffer = this._indexBuffer;
	            textureShader.texture2D = this.texture;
	            textureShader.prepare();
	            textureShader.mMatrix = this.mMatrix;
	            textureShader.isPickShader = false;
	            textureShader.apply();
	            for (let i = 0; i < this.viewportCount; i++) {
	                const viewport = i + this.viewportOffset;
	                shaderResources.bindFramebuffer(this.framebuffers[viewport]);
	                this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                textureShader.vMatrix = this.vMatrices[viewport];
	                textureShader.pMatrix = this.pMatrices[viewport];
	                textureShader.applyView();
	                this._gl.drawElements(this._gl.TRIANGLES, this._image.indexCount, this._gl.UNSIGNED_SHORT, 0);
	            }
	            if (this.isPickingEnabled) {
	                textureShader.isPickShader = true;
	                textureShader.vMatrix = this.pickVMatrix;
	                textureShader.pMatrix = this.pickPMatrix;
	                textureShader.applyView();
	                shaderResources.bindFramebuffer(this.pickFramebuffer);
	                this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                this._gl.drawElements(this._gl.TRIANGLES, this._image.indexCount, this._gl.UNSIGNED_SHORT, 0);
	            }
	        }
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let LabelVisualBase$1 = class LabelVisualBase {
	    get isInitialized() { return this._isInitialized && this._main.sdfTextShader.isInitialized && this._main.fonts[this._label.font.name].isInitialized; }
	    constructor(core, main, label) {
	        this._core = core;
	        this._main = main;
	        this._label = label;
	        this._label.hasChangedCallback = () => { this._hasChanged = true; };
	        this._mMatrix = create$4();
	        this.mMatrix = create$4();
	        this.isVisible = true;
	    }
	    initializeContext(gl) {
	        if (!this._label.isInitialized) {
	            this._label.initialize();
	        }
	        this._gl = gl;
	        this._vertexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, this._label.vertices, gl.STATIC_DRAW);
	        this._indexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._label.indices, gl.STATIC_DRAW);
	        this._isInitialized = true;
	    }
	    update(elapsedTime) {
	        if (this._hasChanged) {
	            this._hasChanged = false;
	            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	            this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, this._label.vertices);
	            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	            this._gl.bufferSubData(this._gl.ELEMENT_ARRAY_BUFFER, 0, this._label.indices);
	            this._main.shaderResources.currentProgram = null;
	        }
	    }
	    render(elapsedTime, xrFrame) {
	        if (this.isInitialized) {
	            const indexCount = this._label.indexCount;
	            if (indexCount > 0) {
	                const shader = this._main.sdfTextShader;
	                const fontVisual = this._main.fonts[this._label.font.name];
	                shader.vertexBuffer = this._vertexBuffer;
	                shader.indexBuffer = this._indexBuffer;
	                shader.texture2D = fontVisual.texture;
	                shader.prepare();
	                shader.gamma = this._label.gamma;
	                shader.buffer = fontVisual.font.edgeValue / 0xff;
	                shader.borderWidth = this._label.borderWidth;
	                shader.color = this._label.color || this._core.config.textColor;
	                shader.borderColor = this._label.borderColor || this._core.config.textBorderColor;
	                shader.hoverColor = this._label.hoverColor || this._core.config.textHoverColor;
	                shader.pickedIdColor = this.pickedIdColor;
	                shader.apply();
	                multiply$2(this._mMatrix, this.mMatrix, this._label.mMatrix);
	                shader.mMatrix = this._mMatrix;
	                shader.applyModel();
	                shader.isPickShader = false;
	                for (let i = 0; i < this.viewportCount; i++) {
	                    const viewport = i + this.viewportOffset;
	                    this._main.shaderResources.bindFramebuffer(this.framebuffers[viewport]);
	                    this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                    shader.vMatrix = this.vMatrices[viewport];
	                    shader.pMatrix = this.pMatrices[viewport];
	                    shader.applyView();
	                    this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_INT, 0);
	                }
	                if (this.isPickingEnabled) {
	                    shader.isPickShader = true;
	                    shader.pMatrix = this.pickPMatrix;
	                    shader.vMatrix = this.pickVMatrix;
	                    shader.applyView();
	                    this._main.shaderResources.bindFramebuffer(this.pickFramebuffer);
	                    this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                    this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_INT, 0);
	                }
	            }
	        }
	    }
	};
	let LabelVisual$1 = class LabelVisual extends LabelVisualBase$1 {
	    get label() { return this._label; }
	    set text(value) { this._label.text = value; }
	    get text() { return this._label.text; }
	    constructor(core, main, label) {
	        super(core, main, label);
	    }
	};
	let LabelSetVisual$1 = class LabelSetVisual extends LabelVisualBase$1 {
	    get label() { return this._label; }
	    constructor(core, main, label) {
	        super(core, main, label);
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let FontVisual$1 = class FontVisual {
	    get isInitialized() { return this._isInitialized; }
	    get font() { return this._font; }
	    constructor(core, font) {
	        this._core = core;
	        this._font = font;
	        font.hasChangedCallback = () => { this._hasChanged = true; };
	    }
	    initializeContext(gl) {
	        this._gl = gl;
	        this._isInitialized = true;
	        if (this._font.count > 0) {
	            this._hasChanged = true;
	        }
	    }
	    update() {
	        if (this._hasChanged && this._isInitialized) {
	            this._hasChanged = false;
	            this.texture = TextureHelper.fromImage(this._gl, this._font.atlas.imageData, false, this._gl.LINEAR);
	            this._core.log.write(LogLevel.info, `${this._font.name} texture updated`);
	        }
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let Lasso$2 = class Lasso {
	    get isInitialized() { return this._isInitialized; }
	    get vertexBuffer() { return this._vertexBuffer; }
	    get indexBuffer() { return this._indexBuffer; }
	    get indexCount() { return this._indexCount; }
	    initializeContext(gl) {
	        const vertices = Quad$2.textured(Constants.MAT4_IDENTITY);
	        this._vertexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	        const indices = Quad$2.INDICES;
	        this._indexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
	        this._indexCount = indices.length;
	        this._isInitialized = true;
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	let Main$1 = class Main extends RendererBase {
	    get shaderResources() { return this._shaderResources; }
	    get colorShader() { return this._colorShader; }
	    get textureShader() { return this._textureShader; }
	    get lassoShader() { return this._lassoShader; }
	    get modelShader() { return this._modelShader; }
	    get sdfTextShader() { return this._sdfTextShader; }
	    get gridShader() { return this._gridShader; }
	    get blockShader() { return this._blockShader; }
	    get sphereShader() { return this._sphereShader; }
	    get cyclinderShader() { return this._cylinderShader; }
	    get hexPrismShader() { return this._hexPrismShader; }
	    get sdfShader() { return this._sdfShader; }
	    get anaglyphShader() { return this._anaglyphShader; }
	    get currentAxes() { return this._isAxes1Current ? this._axes1 : this._axes2; }
	    set currentAxes(value) { if (this._isAxes1Current) {
	        this._axes1 = value;
	    }
	    else {
	        this._axes2 = value;
	    } }
	    get previousAxes() { return this._isAxes1Current ? this._axes2 : this._axes1; }
	    set previousAxes(value) { if (this._isAxes1Current) {
	        this._axes2 = value;
	    }
	    else {
	        this._axes1 = value;
	    } }
	    get config() { return this._config; }
	    constructor(options) {
	        super(options);
	        this._config = new Config$1();
	        this._quad = new Quad$1();
	        this._lasso = new Lasso$2();
	        this._pickedPixels = new Uint8Array(4);
	        this._pickedIdColor = create$2();
	        this._mat3 = create$5();
	        this._directionToCamera = create$3();
	        this._directionToLight = create$3();
	        this._halfAngle = create$3();
	        this._cameraPosition = create$3();
	        this._modelPosition = create$3();
	        this.depthEnabled = true;
	    }
	    get isSupported() {
	        return this._createContext(document.createElement("canvas")) !== null;
	    }
	    get isWebXRSupported() {
	        return true;
	    }
	    initialize(core) {
	        super.initialize(core);
	        this._shaderResources = new Resources$1();
	        this._colorShader = new Color$1(this._core, this);
	        this._textureShader = new Texture$1(this._core, this);
	        this._lassoShader = new Lasso$3(this._core, this);
	        this._modelShader = new Model(this._core, this);
	        this._sdfTextShader = new SdfText$1(this._core, this);
	        this._gridShader = new PickGrid$1(this._core, this);
	        this._anaglyphShader = new Anaglyph(this._core, this);
	        this._blockShader = new UnitBlock$1(this._core, this);
	        this._sphereShader = new UnitSphere$1(this._core, this);
	        this._cylinderShader = new UnitCylinder$1(this._core, this);
	        this._hexPrismShader = new UnitHexPrism(this._core, this);
	        this._sdfShader = new UnitSdf$1(this._core, this);
	        this._initializeContext(this._createContext(this._canvas));
	        this._canvas.addEventListener("webglcontextlost", (event) => {
	            this._core.log.write(LogLevel.warn, "WebGL context lost");
	            this._isInitialized = false;
	            event.preventDefault();
	        }, false);
	        this._canvas.addEventListener("webglcontextrestored", () => {
	            this._initializeContext(this._createContext(this._canvas));
	            this._isInitialized = true;
	            this._core.log.write(LogLevel.info, "WebGL context restored");
	        }, false);
	        this._isInitialized = true;
	    }
	    _initializeContext(gl) {
	        this._gl = gl;
	        for (const key in this.fonts) {
	            const fontVisual = this.fonts[key];
	            fontVisual.initializeContext(gl);
	        }
	        this._shaderResources.initializeContext(this._gl);
	        this._colorShader.initializeContext(this._gl);
	        this._textureShader.initializeContext(this._gl);
	        this._lassoShader.initializeContext(this._gl);
	        this._modelShader.initializeContext(this._gl);
	        this._sdfTextShader.initializeContext(this._gl);
	        this._gridShader.initializeContext(this._gl);
	        this._anaglyphShader.initializeContext(this._gl);
	        this._blockShader.initializeContext(this._gl);
	        this._sphereShader.initializeContext(this._gl);
	        this._cylinderShader.initializeContext(this._gl);
	        this._hexPrismShader.initializeContext(this._gl);
	        this._sdfShader.initializeContext(this._gl);
	        this._quad.initializeContext(this._gl);
	        this._lasso.initializeContext(this._gl);
	        this._debugAxesVisual.initializeContext(this._gl);
	        this._framebuffers = [null, null];
	        const texture = TextureHelper.create(this._gl, this._core.config.pickWidth, this._core.config.pickHeight, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._gl.LINEAR, null);
	        const renderBuffer = this._gl.createRenderbuffer();
	        this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, renderBuffer);
	        this._gl.renderbufferStorage(this._gl.RENDERBUFFER, this._gl.DEPTH_COMPONENT16, this._core.config.pickWidth, this._core.config.pickHeight);
	        const framebuffer = this._gl.createFramebuffer();
	        this._shaderResources.bindFramebuffer(framebuffer);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, texture, 0);
	        this._gl.framebufferRenderbuffer(this._gl.FRAMEBUFFER, this._gl.DEPTH_ATTACHMENT, this._gl.RENDERBUFFER, renderBuffer);
	        this._pickFrameBuffer = framebuffer;
	        this._anaglyphTextures = [null, null];
	        this.anaglyphFramebuffers = [null, null];
	        for (let i = 0; i < this.transitionBuffers.length; i++) {
	            this.transitionBuffers[i].initializeContext(this._gl);
	        }
	        if (this._axes1) {
	            for (let i = 0; i < this._axes1.length; i++) {
	                this._axes1[i].initializeContext(this._gl);
	            }
	        }
	        if (this._axes2) {
	            for (let i = 0; i < this._axes2.length; i++) {
	                this._axes2[i].initializeContext(this._gl);
	            }
	        }
	        for (let i = 0; i < this.labelSets.length; i++) {
	            this.labelSets[i].initializeContext(this._gl);
	        }
	        for (let i = 0; i < this.images.length; i++) {
	            this.images[i].initializeContext(this._gl);
	        }
	        for (let i = 0; i < this.controllers.length; i++) {
	            this.controllers[i].initializeContext(this._gl);
	        }
	    }
	    _resize(width, height) {
	        super._resize(width, height);
	        for (let i = 0; i < 2; i++) {
	            const texture = TextureHelper.create(this._gl, width, height, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._gl.LINEAR, null);
	            const renderBuffer = this._gl.createRenderbuffer();
	            this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, renderBuffer);
	            this._gl.renderbufferStorage(this._gl.RENDERBUFFER, this._gl.DEPTH_COMPONENT16, width, height);
	            const framebuffer = this._gl.createFramebuffer();
	            this._shaderResources.bindFramebuffer(framebuffer);
	            this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, texture, 0);
	            this._gl.framebufferRenderbuffer(this._gl.FRAMEBUFFER, this._gl.DEPTH_ATTACHMENT, this._gl.RENDERBUFFER, renderBuffer);
	            this._anaglyphTextures[i] = texture;
	            this.anaglyphFramebuffers[i] = framebuffer;
	        }
	        this._core.log.write(LogLevel.info, `buffers resized ${width},${height}`);
	    }
	    _createContext(canvas) {
	        const antialias = this._options ? this._options.antialias === undefined ? true : this._options.antialias : true;
	        const preserveDrawingBuffer = this._options ? this._options.preserveDrawingBuffer === undefined ? false : this._options.preserveDrawingBuffer : false;
	        return canvas.getContext("webgl", {
	            stencil: true,
	            alpha: true,
	            antialias: antialias,
	            preserveDrawingBuffer: preserveDrawingBuffer,
	        });
	    }
	    initializeWebXR(session) {
	        const promise = new Promise((resolve, reject) => {
	            this._gl.makeXRCompatible().then(() => {
	                session.updateRenderState({
	                    baseLayer: new XRWebGLLayer(session, this._gl),
	                    depthNear: this._core.config.nearPlane,
	                    depthFar: this._core.config.farPlane
	                });
	                session.requestReferenceSpace('local').then((refSpace) => {
	                    this._webXRReferenceSpace = refSpace;
	                    resolve();
	                });
	            });
	        });
	        return promise;
	    }
	    prepare(xrFrame) {
	        if (xrFrame) {
	            const pose = xrFrame.getViewerPose(this._webXRReferenceSpace);
	            if (pose) {
	                const glLayer = xrFrame.session.renderState.baseLayer;
	                for (let i = 0; i < pose.views.length; i++) {
	                    const view = pose.views[i];
	                    this.vMatrices[i] = view.transform.inverse.matrix;
	                    this.inverseVMatrices[i] = view.transform.matrix;
	                    multiply$2(this._mvMatrices[i], this.vMatrices[i], this.mMatrix);
	                    this.mvMatrices[i] = this._mvMatrices[i];
	                    this.pMatrices[i] = view.projectionMatrix;
	                    const viewport = glLayer.getViewport(view);
	                    this._viewports[i].x = viewport.x;
	                    this._viewports[i].y = viewport.y;
	                    this._viewports[i].width = viewport.width;
	                    this._viewports[i].height = viewport.height;
	                    this._framebuffers[i] = glLayer.framebuffer;
	                }
	            }
	            this._viewportOffset = 0;
	            this._viewportCount = 2;
	        }
	        else {
	            let viewport;
	            switch (this._core.config.stereoMode) {
	                case StereoMode.none:
	                    viewport = this._viewports[0];
	                    viewport.x = 0;
	                    viewport.y = 0;
	                    viewport.width = this._canvas.width;
	                    viewport.height = this._canvas.height;
	                    this._viewportOffset = 0;
	                    this._viewportCount = 1;
	                    this._framebuffers[0] = null;
	                    break;
	                case StereoMode.left:
	                    viewport = this._viewports[0];
	                    viewport.x = 0;
	                    viewport.y = 0;
	                    viewport.width = this._canvas.width;
	                    viewport.height = this._canvas.height;
	                    this._viewportOffset = 0;
	                    this._viewportCount = 1;
	                    this._framebuffers[0] = null;
	                    break;
	                case StereoMode.right:
	                    viewport = this._viewports[1];
	                    viewport.x = 0;
	                    viewport.y = 0;
	                    viewport.width = this._canvas.width;
	                    viewport.height = this._canvas.height;
	                    this._viewportOffset = 1;
	                    this._viewportCount = 1;
	                    this._framebuffers[1] = null;
	                    break;
	                case StereoMode.anaglyph:
	                    viewport = this._viewports[0];
	                    viewport.x = 0;
	                    viewport.y = 0;
	                    viewport.width = this._canvas.width;
	                    viewport.height = this._canvas.height;
	                    viewport = this._viewports[1];
	                    viewport.x = 0;
	                    viewport.y = 0;
	                    viewport.width = this._canvas.width;
	                    viewport.height = this._canvas.height;
	                    this._viewportOffset = 0;
	                    this._viewportCount = 2;
	                    this._framebuffers[0] = this.anaglyphFramebuffers[0];
	                    this._framebuffers[1] = this.anaglyphFramebuffers[1];
	                    break;
	                case StereoMode.split:
	                    viewport = this._viewports[0];
	                    viewport.x = 0;
	                    viewport.y = 0;
	                    viewport.width = this._canvas.width / 2;
	                    viewport.height = this._canvas.height;
	                    viewport = this._viewports[1];
	                    viewport.x = this._canvas.width / 2;
	                    viewport.y = 0;
	                    viewport.width = this._canvas.width / 2;
	                    viewport.height = this._canvas.height;
	                    this._viewportOffset = 0;
	                    this._viewportCount = 2;
	                    this._framebuffers[0] = null;
	                    this._framebuffers[1] = null;
	                    break;
	            }
	        }
	    }
	    createTransitionBuffer(ids) {
	        const buffer = new TransitionBuffer$1(this._core, ids);
	        buffer.initializeContext(this._gl);
	        return buffer;
	    }
	    createControllerVisual(controller) {
	        const visual = new ControllerVisual(this._core, this, controller);
	        visual.initializeContext(this._gl);
	        return visual;
	    }
	    createCartesian2dAxesVisual(axes) {
	        const visual = new Cartesian2dVisual$1(this._core, this, axes);
	        visual.initializeContext(this._gl);
	        return visual;
	    }
	    createCartesian3dAxesVisual(axes) {
	        const visual = new Cartesian3dVisual$1(this._core, this, axes);
	        visual.initializeContext(this._gl);
	        return visual;
	    }
	    _createDebugAxesVisual(debugAxes) {
	        return new DebugAxesVisual(this._core, this, debugAxes);
	    }
	    _createLabelVisual(label) {
	        return new LabelVisual$1(this._core, this, label);
	    }
	    createLabelSetVisual(labelSet) {
	        const visual = new LabelSetVisual$1(this._core, this, labelSet);
	        visual.initializeContext(this._gl);
	        return visual;
	    }
	    createImageVisual(image) {
	        const visual = new ImageVisual$1(this._core, this, image);
	        visual.initializeContext(this._gl);
	        return visual;
	    }
	    createFontVisual(font) {
	        const visual = new FontVisual$1(this._core, font);
	        visual.initializeContext(this._gl);
	        return visual;
	    }
	    getDataUrl(mimeType) {
	        return this._canvas.toDataURL(mimeType);
	    }
	    render(elapsedTime, xrFrame) {
	        return __awaiter$1(this, void 0, void 0, function* () {
	            if (this.depthEnabled) {
	                this._gl.enable(this._gl.DEPTH_TEST);
	            }
	            else {
	                this._gl.disable(this._gl.DEPTH_TEST);
	            }
	            this._gl.enable(this._gl.CULL_FACE);
	            this._gl.disable(this._gl.BLEND);
	            if (this.isPickingEnabled) {
	                this._shaderResources.bindFramebuffer(this._pickFrameBuffer);
	                this._gl.clearColor(0, 0, 0, 0);
	                this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
	            }
	            const backgroundColor = this._backgroundColor || this._core.config.backgroundColor;
	            this._gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]);
	            if (xrFrame) {
	                const glLayer = xrFrame.session.renderState.baseLayer;
	                this._shaderResources.bindFramebuffer(glLayer.framebuffer);
	                this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
	            }
	            else if (this._core.config.stereoMode == StereoMode.anaglyph) {
	                for (let i = 0; i < 2; i++) {
	                    this._shaderResources.bindFramebuffer(this.anaglyphFramebuffers[i]);
	                    this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
	                }
	                this._shaderResources.bindFramebuffer(null);
	                this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
	            }
	            else {
	                this._shaderResources.bindFramebuffer(null);
	                this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
	            }
	            if (this._core.config.isDebugVisible) {
	                this._debugAxesVisual.framebuffers = this._framebuffers;
	                this._debugAxesVisual.render(elapsedTime, xrFrame);
	            }
	            const axesVisuals = this.axesVisibility == AxesVisibility.current ? this.currentAxes : this.axesVisibility == AxesVisibility.previous ? this.previousAxes : null;
	            if (axesVisuals) {
	                for (let i = 0; i < axesVisuals.length; i++) {
	                    const axesVisual = axesVisuals[i];
	                    if (axesVisual.isVisible) {
	                        axesVisual.pickedIdColor = this._pickedIdColor;
	                        axesVisual.pickFramebuffer = this._pickFrameBuffer;
	                        axesVisual.framebuffers = this._framebuffers;
	                        axesVisual.render(elapsedTime, xrFrame);
	                    }
	                }
	            }
	            for (let i = 0; i < this.transitionBuffers.length; i++) {
	                const transitionBuffer = this.transitionBuffers[i];
	                if (transitionBuffer.isVisible) {
	                    this._renderTransitionBuffer(xrFrame, transitionBuffer);
	                }
	            }
	            if (this.areLabelsVisible) {
	                for (let i = 0; i < this.labelSets.length; i++) {
	                    const labelSetVisual = this.labelSets[i];
	                    if (labelSetVisual.isVisible) {
	                        labelSetVisual.pickedIdColor = this._pickedIdColor;
	                        labelSetVisual.pickFramebuffer = this._pickFrameBuffer;
	                        labelSetVisual.framebuffers = this._framebuffers;
	                        labelSetVisual.render(elapsedTime, xrFrame);
	                    }
	                }
	            }
	            if (this.areImagesVisible) {
	                for (let i = 0; i < this.images.length; i++) {
	                    const imageVisual = this.images[i];
	                    if (imageVisual.isVisible) {
	                        imageVisual.framebuffers = this._framebuffers;
	                        imageVisual.pickFramebuffer = this._pickFrameBuffer;
	                        imageVisual.isPickingEnabled = this.isPickingEnabled;
	                        imageVisual.render(elapsedTime, xrFrame);
	                    }
	                }
	            }
	            for (let i = 0; i < this.controllers.length; i++) {
	                const controllerVisual = this.controllers[i];
	                if (controllerVisual.isVisible) {
	                    controllerVisual.isRayVisible = this.isPickingEnabled;
	                    controllerVisual.framebuffers = this._framebuffers;
	                    controllerVisual.render(elapsedTime, xrFrame);
	                }
	            }
	            if (this.isPickingEnabled) {
	                this._shaderResources.bindFramebuffer(this._pickFrameBuffer);
	                this._gl.readPixels(this._core.config.pickWidth / 2, this._core.config.pickHeight / 2, 1, 1, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._pickedPixels);
	                this._pickedType = PickHelper.decodeType(this._pickedPixels);
	                set$2(this._pickedIdColor, this._pickedPixels[0] / 0xff, this._pickedPixels[1] / 0xff, this._pickedPixels[2] / 0xff, this._pickedPixels[3] / 0xff);
	                this._pickedId = PickHelper.decodeNumber(this._pickedPixels);
	                if (this._isCapturingPickImage && this.capturePickImageCallback) {
	                    this._isCapturingPickImage = false;
	                    const data = new Uint8ClampedArray(this._core.config.pickWidth * this._core.config.pickHeight * 4);
	                    this._gl.readPixels(0, 0, this._core.config.pickWidth, this._core.config.pickHeight, this._gl.RGBA, this._gl.UNSIGNED_BYTE, data);
	                    for (let i = 0; i < data.length / 4; i++) {
	                        if (data[i * 4 + 3] == PickType.data) {
	                            data[i * 4 + 3] = 255;
	                        }
	                        else {
	                            data[i * 4] = 0;
	                            data[i * 4 + 1] = 0;
	                            data[i * 4 + 2] = 0;
	                            data[i * 4 + 3] = 0;
	                        }
	                    }
	                    const length = this._core.config.pickWidth * this._core.config.pickHeight * 4;
	                    const row = this._core.config.pickWidth * 4;
	                    const end = (this._core.config.pickHeight - 1) * row;
	                    const flipped = new Uint8ClampedArray(length);
	                    for (let i = 0; i < length; i += row) {
	                        flipped.set(data.subarray(i, i + row), end - i);
	                    }
	                    this.capturePickImageCallback(flipped, this._core.config.pickWidth, this._core.config.pickHeight);
	                }
	            }
	            else {
	                set$2(this._pickedIdColor, 0, 0, 0, 0);
	                this._pickedId = 0;
	            }
	            if (this.isLassoPicking && this._lassoShader.isInitialized) {
	                this._lassoShader.vertexBuffer = this._lasso.vertexBuffer;
	                this._lassoShader.indexBuffer = this._lasso.indexBuffer;
	                const lassoWidth = this.lassoX1 - this.lassoX0;
	                const lassoHeight = this.lassoY1 - this.lassoY0;
	                this._lassoShader.prepare();
	                this._lassoShader.color = this.lassoColor ? this.lassoColor : this._core.config.lassoColor;
	                this._lassoShader.dashWidth = this.lassoDashWidth ? this.lassoDashWidth : this._core.config.lassoDashWidth;
	                this._lassoShader.apply();
	                const lassoThickness = this.lassoThickness ? this.lassoThickness : this._core.config.lassoThickness;
	                for (let i = 0; i < this._viewportCount; i++) {
	                    const viewportIndex = i + this._viewportOffset;
	                    this._shaderResources.bindFramebuffer(this._framebuffers[viewportIndex]);
	                    const viewport = this._viewports[viewportIndex];
	                    this._gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
	                    this._lassoMMatrix[0] = lassoWidth * 2 / viewport.width;
	                    this._lassoMMatrix[5] = lassoHeight * 2 / viewport.height;
	                    this._lassoMMatrix[10] = 1;
	                    this._lassoMMatrix[12] = ((this.lassoX0 + lassoWidth / 2) / viewport.width) * 2 - 1;
	                    this._lassoMMatrix[13] = 1 - ((this.lassoY0 + lassoHeight / 2) / viewport.height) * 2;
	                    this._lassoShader.mMatrix = this._lassoMMatrix;
	                    set(this._lassoThickness, lassoThickness / lassoWidth, lassoThickness / lassoHeight);
	                    this._lassoShader.thickness = this._lassoThickness;
	                    this._lassoShader.applyView();
	                    this._gl.drawElements(this._gl.TRIANGLES, this._lasso.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                }
	            }
	            if (this._core.config.stereoMode == StereoMode.anaglyph && this._anaglyphShader.isInitialized && this._quad.isInitialized) {
	                this._shaderResources.bindFramebuffer(null);
	                this._gl.viewport(this._viewports[0].x, this._viewports[0].y, this._viewports[0].width, this._viewports[0].height);
	                this._anaglyphShader.vertexBuffer = this._quad.vertexBuffer;
	                this._anaglyphShader.indexBuffer = this._quad.indexBuffer;
	                this._anaglyphShader.texture2D1 = this._anaglyphTextures[0];
	                this._anaglyphShader.texture2D2 = this._anaglyphTextures[1];
	                this._anaglyphShader.prepare();
	                this._anaglyphShader.viewport = this._viewports[0];
	                this._anaglyphShader.apply();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	            }
	        });
	    }
	    _renderTransitionBuffer(xrFrame, transitionBuffer) {
	        const currentBuffer = transitionBuffer.currentBuffer;
	        const previousBuffer = transitionBuffer.previousBuffer;
	        const currentPalette = transitionBuffer.currentPalette;
	        const previousPalette = transitionBuffer.previousPalette;
	        const currentAtlas = transitionBuffer.currentAtlas;
	        const previousAtlas = transitionBuffer.previousAtlas;
	        const unitType = transitionBuffer.unitType === undefined ? currentBuffer.unitType : transitionBuffer.unitType;
	        const id = currentBuffer.lookup[transitionBuffer.pickIdLookup[this._pickedId]];
	        const hoverId = id > -1 ? UnitVertex.getIdHover(currentBuffer.dataView, id) : -1;
	        const activeId = transitionBuffer.activeId;
	        if (this._blockShader.isInitialized && (unitType == UnitType.block || unitType == UnitType.blockSdf || unitType == UnitType.ringSdf)) {
	            this._blockShader.instanceBuffer = currentBuffer.vertexBuffer;
	            this._blockShader.previousInstanceBuffer = previousBuffer.vertexBuffer;
	            this._blockShader.paletteTexture = currentPalette.texture || currentPalette.defaultTexture;
	            this._blockShader.previousPaletteTexture = previousPalette.texture || previousPalette.defaultTexture;
	            this._blockShader.prepare();
	            this._blockShader.mMatrix = this.mMatrix;
	            this._blockShader.time = this.transitionTime;
	            this._blockShader.duration = this._core.config.transitionDuration / (this._core.config.transitionDuration + this._core.config.transitionStaggering);
	            this._blockShader.rangeMin = 0;
	            this._blockShader.rangeMax = transitionBuffer.length - 1;
	            this._blockShader.hover = hoverId;
	            this._blockShader.active = activeId;
	            this._blockShader.selectedColor = this._core.config.selectionColor;
	            this._blockShader.hoverColor = this._core.config.hoverColor;
	            this._blockShader.activeColor = this._core.config.activeColor;
	            this._blockShader.highlightMode = this._core.config.highlightMode;
	            this._blockShader.specularPower = this._config.specularPower;
	            this._blockShader.specularIntensity = this._config.specularIntensity;
	            this._blockShader.ambient = this._config.ambient;
	            this._blockShader.apply();
	            this._blockShader.isPickShader = false;
	            for (let i = 0; i < this._viewportCount; i++) {
	                const viewport = i + this._viewportOffset;
	                this._shaderResources.bindFramebuffer(this._framebuffers[viewport]);
	                this._gl.viewport(this._viewports[viewport].x, this._viewports[viewport].y, this._viewports[viewport].width, this._viewports[viewport].height);
	                const vMatrix = this.vMatrices[viewport];
	                if (xrFrame) {
	                    set$3(this._modelPosition, this.mMatrix[12], this.mMatrix[13], this.mMatrix[14]);
	                    subtract(this._directionToLight, this._config.lightPosition, this._modelPosition);
	                    normalize$2(this._directionToLight, this._directionToLight);
	                    const inverseVMatrix = this.inverseVMatrices[viewport];
	                    set$3(this._cameraPosition, inverseVMatrix[12], inverseVMatrix[13], inverseVMatrix[14]);
	                    subtract(this._directionToCamera, this._cameraPosition, this._modelPosition);
	                    normalize$2(this._directionToCamera, this._directionToCamera);
	                    add(this._halfAngle, this._directionToLight, this._directionToCamera);
	                    normalize$2(this._halfAngle, this._halfAngle);
	                    fromMat4(this._mat3, vMatrix);
	                    transformMat3(this._directionToLight, this._directionToLight, this._mat3);
	                    transformMat3(this._halfAngle, this._halfAngle, this._mat3);
	                    this._blockShader.directionToLight = this._directionToLight;
	                    this._blockShader.halfAngle = this._halfAngle;
	                }
	                else {
	                    this._blockShader.directionToLight = this._config.directionToLight;
	                    this._blockShader.halfAngle = this._config.halfAngle;
	                }
	                this._blockShader.vMatrix = vMatrix;
	                this._blockShader.pMatrix = this.pMatrices[viewport];
	                this._blockShader.applyView();
	                this._shaderResources.ANGLE_instanced_arrays.drawElementsInstancedANGLE(this._gl.TRIANGLE_STRIP, this._blockShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	            if (this.isPickingEnabled && transitionBuffer.isPickingEnabled) {
	                this._blockShader.isPickShader = true;
	                this._blockShader.pMatrix = this.pickPMatrix;
	                this._blockShader.vMatrix = this.pickVMatrix;
	                this._blockShader.applyView();
	                this._shaderResources.bindFramebuffer(this._pickFrameBuffer);
	                this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                this._shaderResources.ANGLE_instanced_arrays.drawElementsInstancedANGLE(this._gl.TRIANGLE_STRIP, this._blockShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	        }
	        else if (this._sphereShader.isInitialized && (unitType == UnitType.sphere || unitType == UnitType.sphereSdf || unitType == UnitType.disk)) {
	            this._sphereShader.instanceBuffer = currentBuffer.vertexBuffer;
	            this._sphereShader.previousInstanceBuffer = previousBuffer.vertexBuffer;
	            this._sphereShader.paletteTexture = currentPalette.texture || currentPalette.defaultTexture;
	            this._sphereShader.previousPaletteTexture = previousPalette.texture || previousPalette.defaultTexture;
	            this._sphereShader.prepare();
	            this._sphereShader.mMatrix = this.mMatrix;
	            this._sphereShader.time = this.transitionTime;
	            this._sphereShader.duration = this._core.config.transitionDuration / (this._core.config.transitionDuration + this._core.config.transitionStaggering);
	            this._sphereShader.rangeMin = 0;
	            this._sphereShader.rangeMax = transitionBuffer.length - 1;
	            this._sphereShader.hover = hoverId;
	            this._sphereShader.active = activeId;
	            this._sphereShader.selectedColor = this._core.config.selectionColor;
	            this._sphereShader.hoverColor = this._core.config.hoverColor;
	            this._sphereShader.activeColor = this._core.config.activeColor;
	            this._sphereShader.highlightMode = this._core.config.highlightMode;
	            this._sphereShader.specularPower = this._config.specularPower;
	            this._sphereShader.specularIntensity = this._config.specularIntensity;
	            this._sphereShader.ambient = this._config.ambient;
	            this._sphereShader.apply();
	            this._sphereShader.isPickShader = false;
	            for (let i = 0; i < this._viewportCount; i++) {
	                const viewport = i + this._viewportOffset;
	                this._shaderResources.bindFramebuffer(this._framebuffers[viewport]);
	                this._gl.viewport(this._viewports[viewport].x, this._viewports[viewport].y, this._viewports[viewport].width, this._viewports[viewport].height);
	                const vMatrix = this.vMatrices[viewport];
	                if (xrFrame) {
	                    set$3(this._modelPosition, this.mMatrix[12], this.mMatrix[13], this.mMatrix[14]);
	                    subtract(this._directionToLight, this._config.lightPosition, this._modelPosition);
	                    normalize$2(this._directionToLight, this._directionToLight);
	                    const inverseVMatrix = this.inverseVMatrices[viewport];
	                    set$3(this._cameraPosition, inverseVMatrix[12], inverseVMatrix[13], inverseVMatrix[14]);
	                    subtract(this._directionToCamera, this._cameraPosition, this._modelPosition);
	                    normalize$2(this._directionToCamera, this._directionToCamera);
	                    add(this._halfAngle, this._directionToLight, this._directionToCamera);
	                    normalize$2(this._halfAngle, this._halfAngle);
	                    fromMat4(this._mat3, vMatrix);
	                    transformMat3(this._directionToLight, this._directionToLight, this._mat3);
	                    transformMat3(this._halfAngle, this._halfAngle, this._mat3);
	                    this._sphereShader.directionToLight = this._directionToLight;
	                    this._sphereShader.halfAngle = this._halfAngle;
	                }
	                else {
	                    this._sphereShader.directionToLight = this._config.directionToLight;
	                    this._sphereShader.halfAngle = this._config.halfAngle;
	                }
	                this._sphereShader.vMatrix = vMatrix;
	                this._sphereShader.pMatrix = this.pMatrices[viewport];
	                this._sphereShader.applyView();
	                this._shaderResources.ANGLE_instanced_arrays.drawElementsInstancedANGLE(this._gl.TRIANGLE_STRIP, this._sphereShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	            if (this.isPickingEnabled && transitionBuffer.isPickingEnabled) {
	                this._sphereShader.isPickShader = true;
	                this._sphereShader.pMatrix = this.pickPMatrix;
	                this._sphereShader.vMatrix = this.pickVMatrix;
	                this._sphereShader.applyView();
	                this._shaderResources.bindFramebuffer(this._pickFrameBuffer);
	                this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                this._shaderResources.ANGLE_instanced_arrays.drawElementsInstancedANGLE(this._gl.TRIANGLE_STRIP, this._sphereShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	        }
	        else if (this._cylinderShader.isInitialized && (unitType == UnitType.cylinder || unitType == UnitType.cylinderSdf)) {
	            this._cylinderShader.instanceBuffer = currentBuffer.vertexBuffer;
	            this._cylinderShader.previousInstanceBuffer = previousBuffer.vertexBuffer;
	            this._cylinderShader.paletteTexture = currentPalette.texture || currentPalette.defaultTexture;
	            this._cylinderShader.previousPaletteTexture = previousPalette.texture || previousPalette.defaultTexture;
	            this._cylinderShader.prepare();
	            this._cylinderShader.mMatrix = this.mMatrix;
	            this._cylinderShader.time = this.transitionTime;
	            this._cylinderShader.duration = this._core.config.transitionDuration / (this._core.config.transitionDuration + this._core.config.transitionStaggering);
	            this._cylinderShader.rangeMin = 0;
	            this._cylinderShader.rangeMax = transitionBuffer.length - 1;
	            this._cylinderShader.hover = hoverId;
	            this._cylinderShader.active = activeId;
	            this._cylinderShader.selectedColor = this._core.config.selectionColor;
	            this._cylinderShader.hoverColor = this._core.config.hoverColor;
	            this._cylinderShader.activeColor = this._core.config.activeColor;
	            this._cylinderShader.highlightMode = this._core.config.highlightMode;
	            this._cylinderShader.specularPower = this._config.specularPower;
	            this._cylinderShader.specularIntensity = this._config.specularIntensity;
	            this._cylinderShader.ambient = this._config.ambient;
	            this._cylinderShader.apply();
	            this._cylinderShader.isPickShader = false;
	            for (let i = 0; i < this._viewportCount; i++) {
	                const viewport = i + this._viewportOffset;
	                this._shaderResources.bindFramebuffer(this._framebuffers[viewport]);
	                this._gl.viewport(this._viewports[viewport].x, this._viewports[viewport].y, this._viewports[viewport].width, this._viewports[viewport].height);
	                const vMatrix = this.vMatrices[viewport];
	                if (xrFrame) {
	                    set$3(this._modelPosition, this.mMatrix[12], this.mMatrix[13], this.mMatrix[14]);
	                    subtract(this._directionToLight, this._config.lightPosition, this._modelPosition);
	                    normalize$2(this._directionToLight, this._directionToLight);
	                    const inverseVMatrix = this.inverseVMatrices[viewport];
	                    set$3(this._cameraPosition, inverseVMatrix[12], inverseVMatrix[13], inverseVMatrix[14]);
	                    subtract(this._directionToCamera, this._cameraPosition, this._modelPosition);
	                    normalize$2(this._directionToCamera, this._directionToCamera);
	                    add(this._halfAngle, this._directionToLight, this._directionToCamera);
	                    normalize$2(this._halfAngle, this._halfAngle);
	                    fromMat4(this._mat3, vMatrix);
	                    transformMat3(this._directionToLight, this._directionToLight, this._mat3);
	                    transformMat3(this._halfAngle, this._halfAngle, this._mat3);
	                    this._cylinderShader.directionToLight = this._directionToLight;
	                    this._cylinderShader.halfAngle = this._halfAngle;
	                }
	                else {
	                    this._cylinderShader.directionToLight = this._config.directionToLight;
	                    this._cylinderShader.halfAngle = this._config.halfAngle;
	                }
	                this._cylinderShader.vMatrix = vMatrix;
	                this._cylinderShader.pMatrix = this.pMatrices[viewport];
	                this._cylinderShader.applyView();
	                this._shaderResources.ANGLE_instanced_arrays.drawElementsInstancedANGLE(this._gl.TRIANGLE_STRIP, this._cylinderShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	            if (this.isPickingEnabled && transitionBuffer.isPickingEnabled) {
	                this._cylinderShader.isPickShader = true;
	                this._cylinderShader.pMatrix = this.pickPMatrix;
	                this._cylinderShader.vMatrix = this.pickVMatrix;
	                this._cylinderShader.applyView();
	                this._shaderResources.bindFramebuffer(this._pickFrameBuffer);
	                this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                this._shaderResources.ANGLE_instanced_arrays.drawElementsInstancedANGLE(this._gl.TRIANGLE_STRIP, this._cylinderShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	        }
	        else if (this._hexPrismShader.isInitialized && (unitType == UnitType.hexPrism || unitType == UnitType.hexPrismSdf)) {
	            this._hexPrismShader.instanceBuffer = currentBuffer.vertexBuffer;
	            this._hexPrismShader.previousInstanceBuffer = previousBuffer.vertexBuffer;
	            this._hexPrismShader.paletteTexture = currentPalette.texture || currentPalette.defaultTexture;
	            this._hexPrismShader.previousPaletteTexture = previousPalette.texture || previousPalette.defaultTexture;
	            this._hexPrismShader.prepare();
	            this._hexPrismShader.mMatrix = this.mMatrix;
	            this._hexPrismShader.time = this.transitionTime;
	            this._hexPrismShader.duration = this._core.config.transitionDuration / (this._core.config.transitionDuration + this._core.config.transitionStaggering);
	            this._hexPrismShader.rangeMin = 0;
	            this._hexPrismShader.rangeMax = transitionBuffer.length - 1;
	            this._hexPrismShader.hover = hoverId;
	            this._hexPrismShader.active = activeId;
	            this._hexPrismShader.selectedColor = this._core.config.selectionColor;
	            this._hexPrismShader.hoverColor = this._core.config.hoverColor;
	            this._hexPrismShader.activeColor = this._core.config.activeColor;
	            this._hexPrismShader.highlightMode = this._core.config.highlightMode;
	            this._hexPrismShader.specularPower = this._config.specularPower;
	            this._hexPrismShader.specularIntensity = this._config.specularIntensity;
	            this._hexPrismShader.ambient = this._config.ambient;
	            this._hexPrismShader.apply();
	            this._hexPrismShader.isPickShader = false;
	            for (let i = 0; i < this._viewportCount; i++) {
	                const viewport = i + this._viewportOffset;
	                this._shaderResources.bindFramebuffer(this._framebuffers[viewport]);
	                this._gl.viewport(this._viewports[viewport].x, this._viewports[viewport].y, this._viewports[viewport].width, this._viewports[viewport].height);
	                const vMatrix = this.vMatrices[viewport];
	                if (xrFrame) {
	                    set$3(this._modelPosition, this.mMatrix[12], this.mMatrix[13], this.mMatrix[14]);
	                    subtract(this._directionToLight, this._config.lightPosition, this._modelPosition);
	                    normalize$2(this._directionToLight, this._directionToLight);
	                    const inverseVMatrix = this.inverseVMatrices[viewport];
	                    set$3(this._cameraPosition, inverseVMatrix[12], inverseVMatrix[13], inverseVMatrix[14]);
	                    subtract(this._directionToCamera, this._cameraPosition, this._modelPosition);
	                    normalize$2(this._directionToCamera, this._directionToCamera);
	                    add(this._halfAngle, this._directionToLight, this._directionToCamera);
	                    normalize$2(this._halfAngle, this._halfAngle);
	                    fromMat4(this._mat3, vMatrix);
	                    transformMat3(this._directionToLight, this._directionToLight, this._mat3);
	                    transformMat3(this._halfAngle, this._halfAngle, this._mat3);
	                    this._hexPrismShader.directionToLight = this._directionToLight;
	                    this._hexPrismShader.halfAngle = this._halfAngle;
	                }
	                else {
	                    this._hexPrismShader.directionToLight = this._config.directionToLight;
	                    this._hexPrismShader.halfAngle = this._config.halfAngle;
	                }
	                this._hexPrismShader.vMatrix = vMatrix;
	                this._hexPrismShader.pMatrix = this.pMatrices[viewport];
	                this._hexPrismShader.applyView();
	                this._shaderResources.ANGLE_instanced_arrays.drawElementsInstancedANGLE(this._gl.TRIANGLE_STRIP, this._hexPrismShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	            if (this.isPickingEnabled && transitionBuffer.isPickingEnabled) {
	                this._hexPrismShader.isPickShader = true;
	                this._hexPrismShader.pMatrix = this.pickPMatrix;
	                this._hexPrismShader.vMatrix = this.pickVMatrix;
	                this._hexPrismShader.applyView();
	                this._shaderResources.bindFramebuffer(this._pickFrameBuffer);
	                this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                this._shaderResources.ANGLE_instanced_arrays.drawElementsInstancedANGLE(this._gl.TRIANGLE_STRIP, this._hexPrismShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	        }
	        else if (this._sdfShader.isInitialized && unitType == UnitType.sdf) {
	            this._sdfShader.instanceBuffer = currentBuffer.vertexBuffer;
	            this._sdfShader.previousInstanceBuffer = previousBuffer.vertexBuffer;
	            this._sdfShader.paletteTexture = currentPalette.texture || currentPalette.defaultTexture;
	            this._sdfShader.previousPaletteTexture = previousPalette.texture || previousPalette.defaultTexture;
	            this._sdfShader.sdfTexture = currentAtlas.texture || currentAtlas.defaultTexture;
	            this._sdfShader.previousSdfTexture = previousAtlas.texture || previousAtlas.defaultTexture;
	            this._sdfShader.prepare();
	            this._sdfShader.mMatrix = this.mMatrix;
	            this._sdfShader.time = this.transitionTime;
	            this._sdfShader.duration = this._core.config.transitionDuration / (this._core.config.transitionDuration + this._core.config.transitionStaggering);
	            this._sdfShader.rangeMin = 0;
	            this._sdfShader.rangeMax = transitionBuffer.length - 1;
	            this._sdfShader.hover = hoverId;
	            this._sdfShader.active = activeId;
	            this._sdfShader.selectedColor = this._core.config.selectionColor;
	            this._sdfShader.hoverColor = this._core.config.hoverColor;
	            this._sdfShader.activeColor = this._core.config.activeColor;
	            this._sdfShader.highlightMode = this._core.config.highlightMode;
	            this._sdfShader.sdfBuffer = (this.sdfBuffer || this._core.config.sdfBuffer) / 0xff;
	            this._sdfShader.sdfBackgroundColor = this.sdfBackgroundColor || fromValues$3(this._core.config.backgroundColor[0], this._core.config.backgroundColor[1], this._core.config.backgroundColor[2]);
	            this._sdfShader.specularPower = this._config.specularPower;
	            this._sdfShader.specularIntensity = this._config.specularIntensity;
	            this._sdfShader.ambient = this._config.ambient;
	            this._sdfShader.apply();
	            this._sdfShader.isPickShader = false;
	            for (let i = 0; i < this._viewportCount; i++) {
	                const viewport = i + this._viewportOffset;
	                this._shaderResources.bindFramebuffer(this._framebuffers[viewport]);
	                this._gl.viewport(this._viewports[viewport].x, this._viewports[viewport].y, this._viewports[viewport].width, this._viewports[viewport].height);
	                const vMatrix = this.vMatrices[viewport];
	                if (xrFrame) {
	                    set$3(this._modelPosition, this.mMatrix[12], this.mMatrix[13], this.mMatrix[14]);
	                    subtract(this._directionToLight, this._config.lightPosition, this._modelPosition);
	                    normalize$2(this._directionToLight, this._directionToLight);
	                    const inverseVMatrix = this.inverseVMatrices[viewport];
	                    set$3(this._cameraPosition, inverseVMatrix[12], inverseVMatrix[13], inverseVMatrix[14]);
	                    subtract(this._directionToCamera, this._cameraPosition, this._modelPosition);
	                    normalize$2(this._directionToCamera, this._directionToCamera);
	                    add(this._halfAngle, this._directionToLight, this._directionToCamera);
	                    normalize$2(this._halfAngle, this._halfAngle);
	                    fromMat4(this._mat3, vMatrix);
	                    transformMat3(this._directionToLight, this._directionToLight, this._mat3);
	                    transformMat3(this._halfAngle, this._halfAngle, this._mat3);
	                    this._sdfShader.directionToLight = this._directionToLight;
	                    this._sdfShader.halfAngle = this._halfAngle;
	                }
	                else {
	                    this._sdfShader.directionToLight = this._config.directionToLight;
	                    this._sdfShader.halfAngle = this._config.halfAngle;
	                }
	                this._sdfShader.vMatrix = vMatrix;
	                this._sdfShader.pMatrix = this.pMatrices[viewport];
	                this._sdfShader.applyView();
	                this._shaderResources.ANGLE_instanced_arrays.drawElementsInstancedANGLE(this._gl.TRIANGLE_STRIP, this._sdfShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	            if (this.isPickingEnabled && transitionBuffer.isPickingEnabled) {
	                this._sdfShader.isPickShader = true;
	                this._sdfShader.pMatrix = this.pickPMatrix;
	                this._sdfShader.vMatrix = this.pickVMatrix;
	                this._sdfShader.applyView();
	                this._shaderResources.bindFramebuffer(this._pickFrameBuffer);
	                this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                this._shaderResources.ANGLE_instanced_arrays.drawElementsInstancedANGLE(this._gl.TRIANGLE_STRIP, this._sdfShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	        }
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Quad {
	    get isInitialized() { return this._isInitialized; }
	    get vertexBuffer() { return this._vertexBuffer; }
	    get indexBuffer() { return this._indexBuffer; }
	    get indexCount() { return this._indexCount; }
	    initializeContext(gl) {
	        const _vec3 = fromValues$3(2, 2, 2);
	        const _mat4 = create$4();
	        fromScaling(_mat4, _vec3);
	        const vertices = Quad$2.positions(_mat4);
	        this._vertexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	        const indices = Quad$2.INDICES;
	        this._indexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
	        this._indexCount = indices.length;
	        this._isInitialized = true;
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Atlas extends AtlasBase {
	    get texture() { return this._texture; }
	    get defaultTexture() { return this._defaultTexture; }
	    initializeContext(core, gl) {
	        this._gl = gl;
	        this._defaultTexture = TextureHelper.create(gl, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST, new Uint8Array([0xff, 0xff, 0xff, 0xff]));
	        this._updateTexture();
	    }
	    update() {
	        super.update();
	        if (this._changed) {
	            this._changed = false;
	            this._updateTexture();
	        }
	    }
	    _updateTexture() {
	        if (this._imageData) {
	            this._texture = TextureHelper.fromImage(this._gl, this._imageData, false, this._gl.LINEAR);
	        }
	        else {
	            this._texture = null;
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Palette extends PaletteBase {
	    get texture() { return this._texture; }
	    get defaultTexture() { return this._defaultTexture; }
	    initializeContext(core, gl) {
	        this._gl = gl;
	        this._defaultTexture = TextureHelper.create(gl, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST, core.config.paletteColor);
	        this._updateTexture();
	    }
	    update() {
	        super.update();
	        if (this._changed) {
	            this._changed = false;
	            this._updateTexture();
	        }
	    }
	    _updateTexture() {
	        if (this._colors) {
	            const colors = new Uint8Array(this._colors);
	            for (let i = 0; i < colors.length; i++) {
	                colors[i] = Math.pow(colors[i] / 0xff, 2.2) * 0xff;
	            }
	            this._texture = TextureHelper.create(this._gl, this._colors.length / 4, 1, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._gl.NEAREST, colors);
	        }
	        else {
	            this._texture = null;
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Buffer extends BufferBase {
	    get vertexBuffer() { return this._vertexBuffer; }
	    constructor(core, ids) {
	        super(core, ids);
	    }
	    initializeContext(gl) {
	        this._gl = gl;
	        this._vertexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, this._vertices, gl.STATIC_DRAW);
	        this._isInitialized = true;
	    }
	    update() {
	        if (this._isInitialized) {
	            const start = window.performance.now();
	            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	            this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, this._vertices);
	            this._core.log.write(LogLevel.info, `buffer updated ${this._length} ${Math.round(window.performance.now() - start)}ms`);
	        }
	    }
	}
	class TransitionBuffer extends TransitionBufferBase {
	    constructor(core, ids) {
	        super(core, ids, Buffer, Palette, Atlas);
	    }
	    initializeContext(gl) {
	        this._buffer1.initializeContext(gl);
	        this._buffer2.initializeContext(gl);
	        this._palette1.initializeContext(this._core, gl);
	        this._palette2.initializeContext(this._core, gl);
	        this._atlas1.initializeContext(this._core, gl);
	        this._atlas2.initializeContext(this._core, gl);
	        this._isInitialized = true;
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Config extends RendererConfig {
	    get keyLightAltitude() { return this._keyLightAltitude; }
	    set keyLightAltitude(value) {
	        this._keyLightAltitude = value;
	        this._updateLights();
	    }
	    get keyLightAzimuth() { return this._keyLightAzimuth; }
	    set keyLightAzimuth(value) {
	        this._keyLightAzimuth = value;
	        this._updateLights();
	    }
	    get keyLightDistance() { return this._keyLightDistance; }
	    set keyLightDistance(value) {
	        this._keyLightDistance = value;
	        this._updateLights();
	    }
	    get fillLight1Altitude() { return this._fillLight1Altitude; }
	    set fillLight1Altitude(value) {
	        this._fillLight1Altitude = value;
	        this._updateLights();
	    }
	    get fillLight1Azimuth() { return this._fillLight1Azimuth; }
	    set fillLight1Azimuth(value) {
	        this._fillLight1Azimuth = value;
	        this._updateLights();
	    }
	    get fillLight2Altitude() { return this._fillLight2Altitude; }
	    set fillLight2Altitude(value) {
	        this._fillLight2Altitude = value;
	        this._updateLights();
	    }
	    get fillLight2Azimuth() { return this._fillLight2Azimuth; }
	    set fillLight2Azimuth(value) {
	        this._fillLight2Azimuth = value;
	        this._updateLights();
	    }
	    constructor() {
	        super();
	        this._rotation = create$1();
	        this.keyLightPosition = create$3();
	        this.fillLight1Position = create$3();
	        this.fillLight2Position = create$3();
	        this.reset();
	    }
	    _updateLights() {
	        this._updateLight(this._keyLightAltitude, this._keyLightAzimuth, this._keyLightDistance, this.keyLightPosition);
	        this._updateLight(this._fillLight1Altitude, this._fillLight1Azimuth, 1, this.fillLight1Position);
	        this._updateLight(this._fillLight2Altitude, this._fillLight2Azimuth, 1, this.fillLight2Position);
	    }
	    _updateLight(altitude, azimuth, distance, position) {
	        rotateY(this._rotation, Constants.QUAT_IDENTITY, AngleHelper.degreesToRadians(azimuth));
	        rotateX(this._rotation, this._rotation, AngleHelper.degreesToRadians(-altitude));
	        transformQuat(position, Constants.VECTOR3_UNITZ, this._rotation);
	        scale(position, position, distance);
	    }
	    reset() {
	        this.isSsaoEnabled = true;
	        this.ssaoWidth = 1024;
	        this.ssaoHeight = 1024;
	        this.ssaoBlurEnabled = true;
	        this.ssaoKernelSize = 8;
	        this.ssaoNoiseSize = 4;
	        this.ssaoRadius = 0.02;
	        this.ssaoPower = 1;
	        this.isShadowEnabled = true;
	        this.shadowWidth = 1024;
	        this.shadowHeight = 1024;
	        this.isDofEnabled = false;
	        this.dofAutoFocus = true;
	        this.dofFocusDistance = 0.5;
	        this.dofFocusRange = 0.5;
	        this.dofMaxBackgroundBlur = 0.75;
	        this.isBloomEnabled = false;
	        this.bloomIntensity = 2;
	        this.specularIntensity = 0.15;
	        this.specularPower = 150;
	        this.ambientIntensity = 0.1;
	        this.materialIntensity = 0.5;
	        this.keyLightIntensity = 1.5;
	        this.fillLight1Intensity = 0.25;
	        this.fillLight2Intensity = 0.25;
	        this._keyLightAltitude = 30;
	        this._keyLightAzimuth = -45;
	        this._keyLightDistance = 1;
	        this._fillLight1Altitude = 30;
	        this._fillLight1Azimuth = 45;
	        this._fillLight2Altitude = 30;
	        this._fillLight2Azimuth = -135;
	        this._updateLights();
	        this.isFxaaEnabled = false;
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Resources {
	    bindFramebuffer(framebuffer) {
	        if (this.framebuffer != framebuffer) {
	            this.framebuffer = framebuffer;
	            this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, framebuffer);
	        }
	    }
	    initializeContext(gl) {
	        this._gl = gl;
	        this.framebuffer = this._gl.createFramebuffer();
	        this.OES_texture_float = gl.getExtension("OES_texture_float");
	        this.OES_texture_float_linear = gl.getExtension("OES_texture_float_linear");
	        this.WEBGL_lose_context = gl.getExtension("WEBGL_lose_context");
	    }
	}
	Resources.glsl = {
	    "background.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\nuniform vec3 uColor;\nlayout(location = 0) out vec4 myPosition;\nlayout(location = 1) out vec4 myColor;\nlayout(location = 2) out vec4 myNormal;\nvoid main(void)\n{\ngl_FragDepth = 0.99999;\nmyPosition = vec4(0.0, 0.0, -FAR_PLANE, 0.0);\nmyColor = vec4(uColor, 1.0);\nmyNormal = vec4(0.0, 0.0, 1.0, 0.0);\n}\n",
	    "box.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform vec4 uViewport;\nuniform sampler2D uSampler;\nout vec4 myOutputColor;\nvoid main(void)\n{\nvec2 texCoords = (gl_FragCoord.xy - uViewport.xy) / uViewport.zw;\nvec2 texelSize = vec2(1.0) / uViewport.zw;\nfloat result = 0.0;\nfor (int x = -2; x < 2; x++)\n{\nfor (int y = -2; y < 2; y++)\n{\nvec2 offset = vec2(float(x) + 0.5, float(y) + 0.5) * texelSize;\nresult += texture(uSampler, texCoords + offset).r;\n}\n}\nresult /= 16.0;\nmyOutputColor = vec4(vec3(result), 1.0);\n}\n",
	    "bright.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform sampler2D uSampler;\nuniform vec2 uResolution;\nout vec4 myOutputColor;\nvoid main(void)\n{\nvec2 texCoords = gl_FragCoord.xy / uResolution;\nvec4 color = texture(uSampler, texCoords);\nmyOutputColor = vec4(color.rgb * color.a, 1.0);\n}\n",
	    "combine.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform sampler2D uSampler1;\nuniform sampler2D uSampler2;\nuniform sampler2D uSampler3;\nuniform sampler2D uSampler4;\nuniform sampler2D uSampler5;\nuniform vec4 uViewport;\nuniform float uIntensity;\nout vec4 myOutputColor;\nvoid main() {\nvec2 texCoords = (gl_FragCoord.xy - uViewport.xy) / uViewport.zw;\nvec3 bloom =\ntexture(uSampler2, texCoords).rgb +\ntexture(uSampler3, texCoords).rgb +\ntexture(uSampler4, texCoords).rgb +\ntexture(uSampler5, texCoords).rgb;\nbloom *= uIntensity;\nvec3 color = texture(uSampler1, texCoords).rgb;\ncolor += bloom;\nmyOutputColor = vec4(color, 1.0);\n}\n",
	    "deferred.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\nuniform mat4 uInverseVMatrix;\nuniform mat4 uShadowVMatrix;\nuniform mat4 uShadowPMatrix;\nuniform bool uShadow;\nuniform bool uSsao;\nuniform sampler2D uSampler1;\nuniform sampler2D uSampler2;\nuniform sampler2D uSampler3;\nuniform sampler2D uSampler4;\nuniform sampler2D uSampler5;\nuniform vec4 uViewport;\nuniform vec3 uKeyLightHalfAngle;\nuniform vec3 uDirectionToKeyLight;\nuniform vec3 uDirectionToFillLight1;\nuniform vec3 uDirectionToFillLight2;\nuniform vec2 uShadowMapSize;\nuniform float uKeyLightIntensity;\nuniform float uFillLight1Intensity;\nuniform float uFillLight2Intensity;\nuniform float uSpecularPower;\nuniform float uSpecularIntensity;\nuniform float uAmbientIntensity;\nuniform float uMaterialIntensity;\nout vec4 myOutputColor;\nvoid main(void)\n{\nvec2 texCoords = (gl_FragCoord.xy - uViewport.xy) / uViewport.zw;\nvec4 position = texture(uSampler1, texCoords);\nvec4 color = texture(uSampler2, texCoords);\nvec4 normal = texture(uSampler3, texCoords);\nfloat shadow;\nif (uShadow)\n{\nvec4 positionWorld = uInverseVMatrix * vec4(position.xyz, 1.0);\nvec4 positionShadowView = uShadowVMatrix * positionWorld;\nvec4 positionShadowViewProjection = uShadowPMatrix * positionShadowView;\nvec3 projCoords = positionShadowViewProjection.xyz / positionShadowViewProjection.w;\nprojCoords = projCoords * 0.5 + 0.5;\nfloat minProjCoords = min(projCoords.x, projCoords.y);\nfloat maxProjCoords = max(projCoords.x, projCoords.y);\nif (minProjCoords < 0.0 || maxProjCoords > 1.0)\n{\nshadow = 1.0;\n}\nelse\n{\nfloat currentDepth = projCoords.z;\nfloat bias = 0.0;\nvec2 texelSize = 1.0 / uShadowMapSize;\nfor(int x = -1; x <= 1; ++x)\n{\nfor(int y = -1; y <= 1; ++y)\n{\nfloat pcfDepth = texture(uSampler5, projCoords.xy + vec2(x, y) * texelSize).r;\nshadow += currentDepth - bias > pcfDepth ? 1.0 : 0.0;\n}\n}\nshadow /= 9.0;\nshadow = clamp(1.0 - shadow, 0.0, 1.0);\n}\n}\nelse\n{\nshadow = 1.0;\n}\nfloat ssao = uSsao ? texture(uSampler4, texCoords).r : 1.0;\nfloat diffuseIntensity = clamp(dot(normal.rgb, uDirectionToKeyLight), 0.0, 1.0) * uKeyLightIntensity * shadow;\ndiffuseIntensity += clamp(dot(normal.rgb, uDirectionToFillLight1), 0.0, 1.0) * uFillLight1Intensity * ssao;\ndiffuseIntensity += clamp(dot(normal.rgb, uDirectionToFillLight2), 0.0, 1.0) * uFillLight2Intensity * ssao;\nvec3 diffuse = color.rgb * diffuseIntensity * uMaterialIntensity;\nvec3 ambient = uAmbientIntensity * color.rgb * ssao;\nvec3 emissive = color.w * color.rgb;\nfloat specular = normal.w * clamp(pow(clamp(dot(normal.rgb, uKeyLightHalfAngle), 0.0, 1.0), uSpecularPower) * uSpecularIntensity * uKeyLightIntensity * shadow, 0.0, 1.0);\nvec3 result = min(ambient + diffuse + specular + emissive, 1.0);\nresult = pow(result, GAMMA);\nmyOutputColor = vec4(result, position.w);\n}\n",
	    "dofblur.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform sampler2D uSampler1;\nuniform sampler2D uSampler2;\nuniform vec4 uViewport;\nuniform float uFocusDepth;\nuniform float uNearFocusDepth;\nuniform float uFarFocusDepth;\nuniform float uMaxBackgroundBlur;\nout vec4 myOutputColor;\nfloat circleOfConfusion(in float depth )\n{\nfloat f;\nif (depth < uFocusDepth)\n{\nf = (depth - uFocusDepth) / (uFocusDepth - uNearFocusDepth);\nf = clamp(f, -1.0, 0.0);\n}\nelse\n{\nf = (depth - uFocusDepth) / (uFarFocusDepth - uFocusDepth);\nf = clamp(f, 0.0, uMaxBackgroundBlur);\n}\nreturn f * 0.5 + 0.5;\n}\nvoid main(void)\n{\nvec2 texCoords = gl_FragCoord.xy / uViewport.zw;\nvec4 color = texture(uSampler1, texCoords);\nfloat depth = -texture(uSampler2, texCoords).z;\nfloat coc = circleOfConfusion(depth);\nmyOutputColor = vec4(coc);\n}\n",
	    "dofcombine.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform vec4 uViewport;\nuniform float uFocusDepth;\nuniform float uAperture;\nuniform sampler2D uSampler1;\nuniform sampler2D uSampler2;\nout vec4 myOutputColor;\nconst float MAX_CIRCLE_OF_CONFUSION = 3.0;\nvoid main(void)\n{\nvec2 texCoords = (gl_FragCoord.xy - uViewport.xy) / uViewport.zw;\nvec2 texelSize = vec2(1.0) / uViewport.zw;\nvec2 texelSizeLow = texelSize * 4.0;\nconst int NUM_TAPS = 13;\nvec2 samples[NUM_TAPS];\nsamples[0] = vec2(-0.326212,-0.405810);\nsamples[1] = vec2(-0.840144,-0.073580);\nsamples[2] = vec2(-0.695914, 0.457137);\nsamples[3] = vec2(-0.203345, 0.620716);\nsamples[4] = vec2( 0.962340,-0.194983);\nsamples[5] = vec2( 0.473434,-0.480026);\nsamples[6] = vec2( 0.519456, 0.767022);\nsamples[7] = vec2( 0.185461,-0.893124);\nsamples[8] = vec2( 0.507431, 0.064425);\nsamples[9] = vec2( 0.896420, 0.412458);\nsamples[10] = vec2(-0.321940,-0.932615);\nsamples[11] = vec2(-0.791559,-0.597710);\nsamples[12] = vec2( 0.000000, 0.000000);\nconst float maxCoC = 5.0;\nconst float radiusScale = 0.5;\nvec4 cOut = texture(uSampler1, texCoords);\nfloat coc = texture(uSampler2, texCoords).r;\nfloat centerDepth = coc;\nfloat discRadius = abs(coc * 2.0 - 1.0) * maxCoC;\nfloat discRadiusLow = discRadius * radiusScale;\ncOut = vec4(0.0);\nfloat acc = 0.0;\nfor (int t = 0; t < NUM_TAPS; t++)\n{\nvec2 coordLow = texCoords + (texelSizeLow * samples[t] * discRadiusLow);\nvec2 coordHigh = texCoords + (texelSize * samples[t] * discRadius);\nvec4 tapLow = texture(uSampler1, coordLow);\nvec4 tapHigh = texture(uSampler1, coordHigh);\nfloat cocLow = texture(uSampler2, coordLow).r;\nfloat cocHigh = texture(uSampler2, coordHigh).r;\nfloat tapBlur = abs(cocHigh * 2.0 - 1.0);\nvec4 tap = mix(tapHigh, tapLow, tapBlur);\nfloat cocBlur = mix(cocHigh, cocLow, tapBlur);\ncocBlur = (cocBlur >= centerDepth) ? 1.0 : abs(cocBlur * 2.0 - 1.0);\ncOut += tap * cocBlur;\nacc += cocBlur;\n}\nvec4 result = cOut / acc;\nmyOutputColor = result;\n}\n",
	    "downsample.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform sampler2D uSampler;\nuniform vec4 uViewport;\nout vec4 myOutputColor;\nvoid main(void)\n{\nvec2 texCoords = gl_FragCoord.xy / uViewport.zw;\nmyOutputColor = texture(uSampler, texCoords);\n}\n",
	    "fxaa.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\nconst float FXAA_SPAN_MAX = 8.0;\nconst float FXAA_REDUCE_MUL = 1.0 / 8.0;\nconst float FXAA_REDUCE_MIN = 1.0 / 128.0;\nuniform sampler2D uSampler;\nuniform vec4 uViewport;\nout vec4 myOutputColor;\nvoid main(void)\n{\nvec2 texCoords = (gl_FragCoord.xy - uViewport.xy) / uViewport.zw;\nvec2 texelSize = vec2(1.0) / uViewport.zw;\nvec3 color = texture(uSampler, texCoords).rgb;\nvec3 colorNW = texture(uSampler, vec2(texCoords.x - texelSize.x, texCoords.y - texelSize.y)).rgb;\nvec3 colorNE = texture(uSampler, vec2(texCoords.x + texelSize.x, texCoords.y - texelSize.y)).rgb;\nvec3 colorSW = texture(uSampler, vec2(texCoords.x - texelSize.x, texCoords.y + texelSize.y)).rgb;\nvec3 colorSE = texture(uSampler, vec2(texCoords.x + texelSize.x, texCoords.y + texelSize.y)).rgb;\nfloat luminance = dot(color, LUMINANCE);\nfloat luminanceNW = dot(colorNW, LUMINANCE);\nfloat luminanceNE = dot(colorNE, LUMINANCE);\nfloat luminanceSW = dot(colorSW, LUMINANCE);\nfloat luminanceSE = dot(colorSE, LUMINANCE);\nfloat luminanceMin = min(luminance, min(min(luminanceNW, luminanceNE), min(luminanceSW, luminanceSE)));\nfloat luminanceMax = max(luminance, max(max(luminanceNW, luminanceNE), max(luminanceSW, luminanceSE)));\nvec2 dir = vec2(luminanceSW + luminanceSE - luminanceNW - luminanceNE, luminanceNW + luminanceSW - luminanceNE - luminanceSE);\nfloat dirReduce = max((luminanceNW + luminanceNE + luminanceSW + luminanceSE) * (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\nfloat rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\ndir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX), max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX), dir * rcpDirMin)) * texelSize;\nvec3 colorA = 0.5 * (\ntexture(uSampler, texCoords.xy + dir * (1.0/3.0 - 0.5)).rgb +\ntexture(uSampler, texCoords.xy + dir * (2.0/3.0 - 0.5)).rgb);\nvec3 colorB = colorA * 0.5 + 0.25 * (\ntexture(uSampler, texCoords.xy - dir * 0.5).rgb +\ntexture(uSampler, texCoords.xy + dir * 0.5).rgb);\nluminance = dot(colorB, LUMINANCE);\nif (luminance < luminanceMin || luminance > luminanceMax)\n{\nmyOutputColor = vec4(colorA, 1.0);\n}\nelse\n{\nmyOutputColor = vec4(colorB, 1.0);\n}\n}\n",
	    "gaussian.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform sampler2D uSampler;\nuniform vec2 uResolution;\nuniform bool uHorizontal;\nout vec4 myOutputColor;\nvoid main(void)\n{\nvec2 texCoords = gl_FragCoord.xy / uResolution;\nvec2 texelSize = vec2(1.0) / uResolution;\nconst int NUM_WEIGHTS = 3;\nfloat weights[NUM_WEIGHTS];\nweights[0] = 0.2270270270;\nweights[1] = 0.3162162162;\nweights[2] = 0.0702702703;\nfloat offsets[NUM_WEIGHTS];\noffsets[0] = 0.0;\noffsets[1] = 1.3846153846;\noffsets[2] = 3.2307692308;\nvec3 color = texture(uSampler, texCoords).rgb * weights[0];\nif (uHorizontal)\n{\nfor (int i = 1; i < NUM_WEIGHTS; i++) {\ncolor += texture(uSampler, texCoords + vec2(texelSize.x * offsets[i], 0.0)).rgb * weights[i];\ncolor += texture(uSampler, texCoords - vec2(texelSize.x * offsets[i], 0.0)).rgb * weights[i];\n}\n}\nelse\n{\nfor (int i = 1; i < NUM_WEIGHTS; i++) {\ncolor += texture(uSampler, texCoords + vec2(0.0, texelSize.y * offsets[i])).rgb * weights[i];\ncolor += texture(uSampler, texCoords - vec2(0.0, texelSize.y * offsets[i])).rgb * weights[i];\n}\n}\nmyOutputColor = vec4(color, 1.0);\n}\n",
	    "lasso.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\nuniform vec3 uColor;\nuniform vec2 uThickness;\nuniform float uDashWidth;\nin mediump vec2 vTexCoord;\nout vec4 myOutputColor;\nvoid main(void)\n{\nvec2 distance = min(vTexCoord, 1.0 - vTexCoord);\nif (distance.x > uThickness.x && distance.y > uThickness.y) {\ndiscard;\n}\nvec2 texCoord = vec2(vTexCoord.x, 1.0 - vTexCoord.y);\nvec2 thickness = uThickness * uDashWidth;\nvec2 b = mod(floor(texCoord / thickness), 2.0);\nif (b.x > 0.0 && texCoord.x < 1.0 - thickness.x) {\ndiscard;\n}\nif (b.y > 0.0 && texCoord.y < 1.0 - thickness.y) {\ndiscard;\n}\nmyOutputColor = vec4(pow(uColor, GAMMA), 1.0);\n}\n",
	    "lasso.vertex.fx": "#version 300 es\nin vec3 aPosition;\nin mediump vec2 aTexCoord;\nuniform mat4 uMMatrix;\nout mediump vec2 vTexCoord;\nvoid main(void) {\ngl_Position = uMMatrix * vec4(aPosition, 1.0);\nvTexCoord = aTexCoord;\n}\n",
	    "pickgrid.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\nuniform bool uPick;\nuniform vec2 uFaceSize;\nuniform vec3 uMajorColor;\nuniform vec3 uMinorColor;\nuniform vec3 uZeroColor;\nuniform float uMajorThickness;\nuniform float uMinorThickness;\nuniform float uZeroThickness;\nuniform vec2 uZero;\nuniform vec2 uMinorGridlines;\nin lowp vec4 vColor;\nin mediump vec2 vTexCoord;\nin mediump vec4 vBounds;\nin mediump vec3 vNormal;\nin vec3 vViewPosition;\nlayout(location = 0) out vec4 myPosition;\nlayout(location = 1) out vec4 myColor;\nlayout(location = 2) out vec4 myNormal;\nvoid main(void) {\nif (uPick)\n{\nmyPosition = vColor;\n}\nelse\n{\nmyPosition.xyz = vViewPosition;\nvec2 buffer = fwidth(vTexCoord);\nvec2 distance, thickness, step;\nvec4 color = vColor;\nvec2 width = vBounds.zw - vBounds.xy;\ndistance = (vTexCoord - vBounds.xy) / width;\ndistance = min(abs(distance - floor(uMinorGridlines * distance) / uMinorGridlines), abs(distance - ceil(uMinorGridlines * distance) / uMinorGridlines));\ndistance *= width;\nthickness = vec2(uMinorThickness) / uFaceSize;\nstep = smoothstep(thickness, thickness + buffer, distance);\ncolor.xyz = mix(uMinorColor, color.xyz, min(step.x, step.y));\nthickness = vec2(uMajorThickness) / uFaceSize;\ndistance = min(vTexCoord - vBounds.xy, vBounds.zw - vTexCoord);\nstep = smoothstep(thickness, thickness + buffer, distance);\ncolor.xyz = mix(uMajorColor, color.xyz, min(step.x, step.y));\ndistance = abs(vTexCoord - uZero);\nthickness = vec2(uZeroThickness) / uFaceSize;\nstep = smoothstep(thickness, thickness + buffer, distance);\ncolor.xyz = mix(uZeroColor, color.xyz, min(step.x, step.y));\nmyColor.w = 0.0;\nmyNormal.xyz = vNormal;\nmyNormal.w = 0.0;\nmyColor.xyz = color.xyz;\n}\n}\n",
	    "pickgrid.vertex.fx": "#version 300 es\nin vec3 aPosition;\nin lowp vec4 aIdColor;\nin mediump vec2 aTexCoord;\nin mediump vec3 aNormal;\nin mediump vec4 aBounds;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nuniform bool uPick;\nuniform vec4 uPickedIdColor;\nuniform vec3 uBackground;\nuniform vec3 uHighlight;\nout lowp vec4 vColor;\nout mediump vec2 vTexCoord;\nout mediump vec4 vBounds;\nout mediump vec3 vNormal;\nout vec3 vViewPosition;\nvoid main(void) {\nmat4 mvMatrix = uVMatrix * uMMatrix;\nvNormal = normalize(vec3(mvMatrix * vec4(aNormal, 0.0)));\nvTexCoord = aTexCoord;\nvBounds = aBounds;\nvec4 viewPosition = mvMatrix * vec4(aPosition, 1.0);\nvViewPosition = viewPosition.xyz;\ngl_Position = uPMatrix * viewPosition;\nif (uPick)\n{\nvColor = aIdColor;\n}\nelse\n{\nvColor = uPickedIdColor == aIdColor ? vec4(uHighlight, 1.0) : vColor = vec4(uBackground, 1.0);\n}\n}\n",
	    "sdftext.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform sampler2D uSampler;\nuniform bool uPick;\nuniform vec3 uColor;\nuniform vec3 uHoverColor;\nuniform float uGamma;\nuniform vec3 uBorderColor;\nuniform float uBuffer;\nuniform float uBorderWidth;\nin mediump vec2 vTexCoord;\nin vec3 vViewPosition;\nin vec3 vNormal;\nin lowp vec4 vIdColor;\nin lowp float vHover;\nlayout(location = 0) out vec4 myPosition;\nlayout(location = 1) out vec4 myColor;\nlayout(location = 2) out vec4 myNormal;\nvoid main(void)\n{\nif (uPick) {\nmyPosition = vIdColor;\n}\nelse\n{\nfloat distance = texture(uSampler, vTexCoord).r;\nif (distance < uBuffer - uBorderWidth)\n{\ndiscard;\n}\nfloat gamma = fwidth(distance);\nfloat value = smoothstep(uBuffer - gamma, uBuffer + gamma, distance);\nmyColor.xyz = mix(uBorderColor, mix(uColor, uHoverColor, vHover), value);\nmyPosition.xyz = vViewPosition;\nmyNormal.xyz = vNormal;\nmyColor.w = 1.0;\nmyPosition.w = 0.0;\nmyNormal.w = 0.0;\n}\n}\n",
	    "sdftext.vertex.fx": "#version 300 es\nin lowp vec4 aIdColor;\nin vec3 aPosition;\nin mediump vec2 aTexCoord;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nuniform vec4 uPickedIdColor;\nout vec3 vViewPosition;\nout vec3 vNormal;\nout mediump vec2 vTexCoord;\nout lowp vec4 vIdColor;\nout lowp float vHover;\nvoid main(void)\n{\nmat4 mvMatrix = uVMatrix * uMMatrix;\nvNormal = vec3(mvMatrix * vec4(0.0, 0.0, 1.0, 0.0));\nvec4 viewPosition = mvMatrix* vec4(aPosition, 1.0);\nvViewPosition = viewPosition.xyz;\ngl_Position = uPMatrix * viewPosition;\nvTexCoord = aTexCoord;\nvIdColor = aIdColor;\nvHover = uPickedIdColor == aIdColor ? 1.0 : 0.0;\n}\n",
	    "simple.vertex.fx": "#version 300 es\nin vec3 aPosition;\nvoid main(void) {\ngl_Position = vec4(aPosition, 1.0);\n}\n",
	    "ssao.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nconst int SSAO_KERNEL_SIZE = 8;\nuniform sampler2D uSampler1;\nuniform sampler2D uSampler2;\nuniform sampler2D uSampler3;\nuniform mat4 uPMatrix;\nuniform vec4 uViewport;\nuniform float uSsaoNoiseSize;\nuniform float uSsaoRadius;\nuniform float uSsaoPower;\nuniform vec3 uSsaoKernel[SSAO_KERNEL_SIZE];\nout vec4 myOutputColor;\nvoid main(void)\n{\nvec2 texCoords = (gl_FragCoord.xy - uViewport.xy) / uViewport.zw;\nvec3 position = texture(uSampler1, texCoords).rgb;\nvec3 normal = texture(uSampler2, texCoords).rgb;\nfloat occlusion = 0.0;\nvec2 noiseScale = uViewport.zw / uSsaoNoiseSize;\nvec3 randomVec = texture(uSampler3, texCoords * noiseScale).rgb;\nvec3 tangent = normalize(randomVec - normal * dot(randomVec, normal));\nvec3 bitangent = cross(normal, tangent);\nmat3 tbn = mat3(tangent, bitangent, normal);\nfor(int i = 0; i < SSAO_KERNEL_SIZE; i++)\n{\nvec3 mySample = tbn * uSsaoKernel[i];\nmySample = position + mySample * uSsaoRadius;\nvec4 offset = vec4(mySample, 1.0);\noffset = uPMatrix * offset;\noffset.xy /= offset.w;\noffset.xy = offset.xy * 0.5 + 0.5;\nfloat sampleDepth = texture(uSampler1, offset.xy).z;\nfloat rangeCheck = abs(position.z - sampleDepth) > uSsaoRadius ? 0.0 : 1.0;\nocclusion += (sampleDepth < mySample.z ? 0.0 : 1.0) * rangeCheck;\n}\nocclusion /= float(SSAO_KERNEL_SIZE);\nocclusion = pow(1.0 - occlusion, uSsaoPower);\nmyOutputColor = vec4(occlusion, 0.0, 0.0, 1.0);\n}\n",
	    "texture.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\nuniform sampler2D uSampler;\nin mediump vec2 vTexCoord;\nin vec3 vViewPosition;\nin vec3 vNormal;\nlayout(location = 0) out vec4 myPosition;\nlayout(location = 1) out vec4 myColor;\nlayout(location = 2) out vec4 myNormal;\nvoid main(void)\n{\nmyPosition.xyz = vViewPosition;\nmyColor.xyz = pow(texture(uSampler, vTexCoord).xyz, INV_GAMMA);\nmyColor.w = 0.0;\nmyNormal.xyz = vNormal;\nmyNormal.w = 0.0;\n}\n",
	    "texture.vertex.fx": "#version 300 es\nin vec3 aPosition;\nin mediump vec3 aNormal;\nin mediump vec2 aTexCoord;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nout vec3 vViewPosition;\nout mediump vec3 vNormal;\nout mediump vec2 vTexCoord;\nvoid main(void)\n{\nmat4 mvMatrix = uVMatrix * uMMatrix;\nvNormal = normalize((mvMatrix * vec4(aNormal, 0.0)).xyz);\nvec4 viewPosition = mvMatrix * vec4(aPosition, 1.0);\nvViewPosition = viewPosition.xyz;\ngl_Position = uPMatrix * viewPosition;\nvTexCoord = aTexCoord;\n}\n",
	    "unitblock.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\n#include \"intersect.include.fx\"\nin lowp vec4 vIdColor;\nin lowp vec2 vVertexColor;\nin lowp float vVertexSelected;\nin float vAnimation;\nin lowp float vHover;\nin lowp float vActive;\nin mediump vec3 vModelPosition;\nin vec3 vViewPosition;\nuniform sampler2D uSampler;\nuniform sampler2D uPreviousSampler;\nuniform bool uPick;\nlayout(location = 0) out vec4 myPosition;\nlayout(location = 1) out vec4 myColor;\nlayout(location = 2) out vec4 myNormal;\nvoid main(void)\n{\nif (uPick)\n{\nmyPosition = vIdColor;\n}\nelse\n{\nmyPosition.xyz = vViewPosition;\nvec3 previousColor = texture(uPreviousSampler, vec2(vVertexColor.y, 0.0)).xyz;\nvec3 color = texture(uSampler, vec2(vVertexColor.x, 0.0)).xyz;\ncolor = mix(previousColor, color, vAnimation);\nfloat distanceSquared = (0.75 - dot2(vModelPosition)) * 2.0;\nfloat emissive = max(vVertexSelected, 0.0);\nemissive += max(vHover, vActive);\nemissive *= distanceSquared;\nmyColor.w = emissive;\nmyPosition.w = emissive;\nvec3 normal = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));\nmyNormal.xyz = normal;\nfloat specular = 1.0;\nmyNormal.w = specular;\nmyColor.xyz = color;\n}\n}\n",
	    "unitblock.vertex.fx": "#version 300 es\n#include \"quat.include.fx\"\nin mediump vec3 aPosition;\nin vec3 aTranslation;\nin vec3 aPreviousTranslation;\nin mediump vec4 aRotation;\nin mediump vec4 aPreviousRotation;\nin lowp vec2 aColor;\nin lowp vec2 aPreviousColor;\nin vec3 aScale;\nin vec3 aPreviousScale;\nin vec2 aOrder;\nin float aId;\nin lowp float aSelected;\nin lowp float aPreviousSelected;\nin lowp vec4 aIdColor;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nuniform float uTime;\nuniform float uDuration;\nuniform float uOrderFrom;\nuniform float uOrderTo;\nuniform float uHover;\nuniform float uActive;\nout lowp vec4 vIdColor;\nout lowp vec2 vVertexColor;\nout lowp float vVertexSelected;\nout highp float vAnimation;\nout lowp float vHover;\nout lowp float vActive;\nout mediump vec3 vModelPosition;\nout vec3 vViewPosition;\nvoid main(void)\n{\nif (aOrder.x < uOrderFrom || aOrder.x > uOrderTo)\n{\nvIdColor = vec4(0.0);\nvVertexColor = vec2(0.0);\nvVertexSelected = 0.0;\nvAnimation = 0.0;\nvHover = 0.0;\nvActive = 0.0;\nvModelPosition = vec3(0.0);\ngl_Position = vec4(0.0);\nvViewPosition = vec3(0.0);\n}\nelse\n{\nvIdColor = aIdColor;\nvModelPosition = aPosition;\nfloat staggerOrder = aOrder.y;\nfloat startTime = staggerOrder * (1.0 - uDuration);\nfloat animation = clamp((uTime - startTime) / uDuration, 0.0, 1.0);\nanimation = smoothstep(0.0, 1.0, animation);\nvec3 scale = mix(aPreviousScale, aScale, animation);\nvec3 position = aPosition * scale;\nif (aRotation.w * aPreviousRotation.w != 1.0)\n{\nvec4 quat = slerp(aPreviousRotation, aRotation, animation);\nposition = rotate(position, quat);\n}\nposition += mix(aPreviousTranslation, aTranslation, animation);\nmat4 mvMatrix = uVMatrix * uMMatrix;\nvec4 viewPosition = mvMatrix * vec4(position, 1.0);\nvViewPosition = viewPosition.xyz;\ngl_Position = uPMatrix * viewPosition;\nvVertexColor = aPosition.y < 0.0 ? vec2(aColor.x, aPreviousColor.x) : vec2(aColor.y, aPreviousColor.y);\nvVertexSelected = mix(aPreviousSelected, aSelected, animation);\nvAnimation = animation;\nvHover = uHover == aId ? 1.0 : 0.0;\nvActive = uActive == aId ? 1.0 : 0.0;\n}\n}\n",
	    "unitcylinder.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\n#include \"intersect.include.fx\"\nin lowp vec4 vIdColor;\nin lowp vec2 vVertexColor;\nin lowp float vVertexSelected;\nin float vAnimation;\nin lowp float vHover;\nin lowp float vActive;\nin vec3 vViewPosition;\nin vec4 vCircle1;\nin vec4 vCircle2;\nuniform sampler2D uSampler;\nuniform sampler2D uPreviousSampler;\nuniform bool uPick;\nuniform bool uShadow;\nlayout(location = 0) out vec4 myPosition;\nlayout(location = 1) out vec4 myColor;\nlayout(location = 2) out vec4 myNormal;\nvoid main(void)\n{\nvec3 rd = normalize(vViewPosition);\nvec3 ro = vec3(0.0);\nvec4 tnor = iCappedCone(ro, rd, vCircle1.xyz, vCircle2.xyz, vCircle1.w, vCircle2.w, uShadow ? -1.0 : 1.0);\nfloat t = tnor.x;\nif (t < 0.0)\n{\ndiscard;\n}\nvec3 viewPosition = rd * t;\nfloat ndcDepth = DEPTH_A + DEPTH_B / viewPosition.z;\ngl_FragDepth = ndcDepth * 0.5 + 0.5;\nif (uPick)\n{\nmyPosition = vIdColor;\n}\nelse\n{\nmyPosition.xyz = viewPosition;\nvec3 previousColor = texture(uPreviousSampler, vec2(vVertexColor.y, 0.0)).xyz;\nvec3 color = texture(uSampler, vec2(vVertexColor.x, 0.0)).xyz;\ncolor = mix(previousColor, color, vAnimation);\nvec3 normal = tnor.yzw;\nmyNormal.xyz = normal;\nfloat distanceSquared = dot(normal, rd);\ndistanceSquared *= distanceSquared;\nfloat emissive = max(vVertexSelected, 0.0);\nemissive += max(vHover, vActive);\nemissive *= distanceSquared;\nmyColor.w = emissive;\nmyPosition.w = emissive;\nfloat specular = 1.0;\nmyNormal.w = specular;\nmyColor.xyz = color;\n}\n}\n",
	    "unitcylinder.vertex.fx": "#version 300 es\n#include \"common.include.fx\"\n#include \"quat.include.fx\"\nin mediump vec3 aPosition;\nin vec3 aTranslation;\nin vec3 aPreviousTranslation;\nin mediump vec4 aRotation;\nin mediump vec4 aPreviousRotation;\nin lowp vec2 aColor;\nin lowp vec2 aPreviousColor;\nin vec3 aScale;\nin vec3 aPreviousScale;\nin float aId;\nin vec2 aOrder;\nin lowp float aSelected;\nin lowp float aPreviousSelected;\nin lowp vec4 aIdColor;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nuniform float uTime;\nuniform float uDuration;\nuniform float uOrderFrom;\nuniform float uOrderTo;\nuniform float uHover;\nuniform float uActive;\nuniform vec3 uIdentityRotation;\nout lowp vec4 vIdColor;\nout lowp vec2 vVertexColor;\nout lowp float vVertexSelected;\nout highp float vAnimation;\nout lowp float vHover;\nout lowp float vActive;\nout vec3 vViewPosition;\nout vec4 vCircle1;\nout vec4 vCircle2;\nvoid main(void)\n{\nif (aOrder.x < uOrderFrom || aOrder.x > uOrderTo)\n{\nvIdColor = vec4(0.0);\nvVertexColor = vec2(0.0);\nvVertexSelected = 0.0;\nvAnimation = 0.0;\nvHover = 0.0;\nvActive = 0.0;\nvViewPosition = vec3(0.0);\nvCircle1 = vec4(0.0);\nvCircle2 = vec4(0.0);\ngl_Position = vec4(0.0);\n}\nelse\n{\nvIdColor = aIdColor;\nfloat staggerOrder = aOrder.y;\nfloat startTime = staggerOrder * (1.0 - uDuration);\nfloat animation = clamp((uTime - startTime) / uDuration, 0.0, 1.0);\nanimation = smoothstep(0.0, 1.0, animation);\nvec3 translation = mix(aPreviousTranslation, aTranslation, animation);\nmat4 mvMatrix = uVMatrix * uMMatrix;\nvec3 viewCenter = (mvMatrix * vec4(translation, 1.0)).xyz;\nvec3 scale = mix(aPreviousScale, aScale, animation);\nvec3 position = aPosition;\nposition.xz *= max(scale.x, scale.z);\nposition.y *= scale.y;\nvec3 direction = IDENTITY_ROTATION;\nif (aRotation.w * aPreviousRotation.w != 1.0)\n{\nvec4 quat = slerp(aPreviousRotation, aRotation, animation);\nposition = rotate(position, quat);\ndirection = rotate(direction, quat);\n}\nvec3 viewDirection = (mvMatrix * vec4(direction, 0.0)).xyz;\nvec3 h = viewDirection * scale.y * 0.5;\nfloat r1 = length(viewDirection) * 0.5;\nfloat r2 = r1 * scale.z;\nr1 *= scale.x;\nvCircle1 = vec4(viewCenter - h, r1);\nvCircle2 = vec4(viewCenter + h, r2);\nvec4 viewPosition = mvMatrix * vec4(position + translation, 1.0);\nvViewPosition = viewPosition.xyz;\ngl_Position = uPMatrix * viewPosition;\nvVertexColor = aPosition.y < 0.0 ? vec2(aColor.x, aPreviousColor.x) : vec2(aColor.y, aPreviousColor.y);\nvVertexSelected = mix(aPreviousSelected, aSelected, animation);\nvAnimation = animation;\nvHover = uHover == aId ? 1.0 : 0.0;\nvActive = uActive == aId ? 1.0 : 0.0;\n}\n}\n",
	    "unitsdf.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\n#include \"intersect.include.fx\"\nin lowp vec4 vIdColor;\nin lowp vec2 vVertexColor;\nin lowp float vVertexSelected;\nin float vAnimation;\nin lowp float vHover;\nin lowp float vActive;\nin mediump vec2 vTexCoord;\nin mediump vec2 vPreviousTexCoord;\nin mediump vec3 vModelPosition;\nin vec3 vViewPosition;\nuniform sampler2D uSampler;\nuniform sampler2D uPreviousSampler;\nuniform sampler2D uSampler1;\nuniform sampler2D uPreviousSampler1;\nuniform bool uPick;\nlayout(location = 0) out vec4 myPosition;\nlayout(location = 1) out vec4 myColor;\nlayout(location = 2) out vec4 myNormal;\nvoid main(void)\n{\nfloat uBorderWidth = 0.0 / 255.0;\nfloat uBuffer = 192.0 / 255.0;\nvec3 uBorderColor = vec3(1.0, 1.0, 1.0);\nfloat distance = mix(texture(uPreviousSampler1, vPreviousTexCoord).r, texture(uSampler1, vTexCoord).r, vAnimation);\nif (distance < uBuffer - uBorderWidth) {\ndiscard;\n}\nif (uPick)\n{\nmyPosition = vIdColor;\n}\nelse\n{\nmyPosition.xyz = vViewPosition;\nvec3 previousColor = texture(uPreviousSampler, vec2(vVertexColor.y, 0.0)).xyz;\nvec3 color = texture(uSampler, vec2(vVertexColor.x, 0.0)).xyz;\ncolor = mix(previousColor, color, vAnimation);\nfloat distanceSquared = (0.75 - dot2(vModelPosition)) * 2.0;\nfloat emissive = max(vVertexSelected, 0.0);\nemissive += max(vHover, vActive);\nemissive *= distanceSquared;\nmyColor.w = emissive;\nmyPosition.w = emissive;\nvec3 normal = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));\nmyNormal.xyz = normal;\nfloat specular = 1.0;\nmyNormal.w = specular;\nvec3 uBorderColor = vec3(1.0, 1.0, 1.0);\nfloat uGamma = 0.0;\nfloat gamma = fwidth(distance);\nfloat value = smoothstep(uBuffer - gamma, uBuffer + gamma, distance);\nmyColor.xyz = mix(uBorderColor, color, value);\n}\n}\n",
	    "unitsdf.vertex.fx": "#version 300 es\n#include \"quat.include.fx\"\nin mediump vec3 aPosition;\nin vec3 aTranslation;\nin vec3 aPreviousTranslation;\nin mediump vec4 aRotation;\nin mediump vec4 aPreviousRotation;\nin mediump vec4 aTexCoord;\nin mediump vec4 aPreviousTexCoord;\nin lowp vec2 aColor;\nin lowp vec2 aPreviousColor;\nin vec3 aScale;\nin vec3 aPreviousScale;\nin vec2 aOrder;\nin float aId;\nin lowp float aSelected;\nin lowp float aPreviousSelected;\nin lowp vec4 aIdColor;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nuniform float uTime;\nuniform float uDuration;\nuniform float uOrderFrom;\nuniform float uOrderTo;\nuniform float uHover;\nuniform float uActive;\nout lowp vec4 vIdColor;\nout lowp vec2 vVertexColor;\nout lowp float vVertexSelected;\nout highp float vAnimation;\nout lowp float vHover;\nout lowp float vActive;\nout mediump vec3 vModelPosition;\nout mediump vec2 vTexCoord;\nout mediump vec2 vPreviousTexCoord;\nout vec3 vViewPosition;\nvoid main(void)\n{\nif (aOrder.x < uOrderFrom || aOrder.x > uOrderTo)\n{\nvIdColor = vec4(0.0);\nvVertexColor = vec2(0.0);\nvVertexSelected = 0.0;\nvAnimation = 0.0;\nvHover = 0.0;\nvActive = 0.0;\nvModelPosition = vec3(0.0);\ngl_Position = vec4(0.0);\nvViewPosition = vec3(0.0);\n}\nelse\n{\nvIdColor = aIdColor;\nvModelPosition = aPosition;\nfloat staggerOrder = aOrder.y;\nfloat startTime = staggerOrder * (1.0 - uDuration);\nfloat animation = clamp((uTime - startTime) / uDuration, 0.0, 1.0);\nanimation = smoothstep(0.0, 1.0, animation);\nvec3 scale = mix(aPreviousScale, aScale, animation);\nvec3 position = aPosition * scale;\nif (aRotation.w * aPreviousRotation.w != 1.0)\n{\nvec4 quat = slerp(aPreviousRotation, aRotation, animation);\nposition = rotate(position, quat);\n}\nposition += mix(aPreviousTranslation, aTranslation, animation);\nmat4 mvMatrix = uVMatrix * uMMatrix;\nvec4 viewPosition = mvMatrix * vec4(position, 1.0);\nvViewPosition = viewPosition.xyz;\ngl_Position = uPMatrix * viewPosition;\nvVertexColor = aPosition.y < 0.0 ? vec2(aColor.x, aPreviousColor.x) : vec2(aColor.y, aPreviousColor.y);\nvVertexSelected = mix(aPreviousSelected, aSelected, animation);\nvAnimation = animation;\nvHover = uHover == aId ? 1.0 : 0.0;\nvActive = uActive == aId ? 1.0 : 0.0;\nvPreviousTexCoord.x = aPosition.x < 0.0 ? aPreviousTexCoord.x : aPreviousTexCoord.z;\nvPreviousTexCoord.y = aPosition.y > 0.0 ? aPreviousTexCoord.y : aPreviousTexCoord.w;\nvTexCoord.x = aPosition.x < 0.0 ? aTexCoord.x : aTexCoord.z;\nvTexCoord.y = aPosition.y > 0.0 ? aTexCoord.y : aTexCoord.w;\n}\n}\n",
	    "unitsphere.fragment.fx": "#version 300 es\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include \"common.include.fx\"\n#include \"intersect.include.fx\"\nin lowp vec4 vIdColor;\nin lowp vec2 vVertexColor;\nin lowp float vVertexSelected;\nin float vAnimation;\nin lowp float vHover;\nin lowp float vActive;\nin vec3 vViewPosition;\nin vec3 vViewCenter;\nin mediump float vRadius;\nuniform sampler2D uSampler;\nuniform sampler2D uPreviousSampler;\nuniform bool uPick;\nuniform bool uShadow;\nlayout(location = 0) out vec4 myPosition;\nlayout(location = 1) out vec4 myColor;\nlayout(location = 2) out vec4 myNormal;\nvoid main(void)\n{\nvec3 rd = normalize(vViewPosition);\nvec3 ro = vec3(0.0);\nvec4 s = vec4(vViewCenter, vRadius);\nfloat t = sphIntersect(ro, rd, s, uShadow ? -1.0 : 1.0);\nif (t < 0.0)\n{\ndiscard;\n}\nvec3 viewPosition = rd * t;\nfloat ndcDepth = DEPTH_A + DEPTH_B / viewPosition.z;\ngl_FragDepth = ndcDepth * 0.5 + 0.5;\nif (uPick)\n{\nmyPosition = vIdColor;\n}\nelse\n{\nmyPosition.xyz = viewPosition;\nvec3 previousColor = texture(uPreviousSampler, vec2(vVertexColor.y, 0.0)).xyz;\nvec3 color = texture(uSampler, vec2(vVertexColor.x, 0.0)).xyz;\ncolor = mix(previousColor, color, vAnimation);\nvec3 normal = (viewPosition - vViewCenter) / s.w;\nmyNormal.xyz = normal;\nfloat distanceSquared = dot(normal, rd);\ndistanceSquared *= distanceSquared;\nfloat emissive = max(vVertexSelected, 0.0);\nemissive += max(vHover, vActive);\nemissive *= distanceSquared;\nmyColor.w = emissive;\nmyPosition.w = emissive;\nfloat specular = 1.0;\nmyNormal.w = specular;\nmyColor.xyz = color;\n}\n}\n",
	    "unitsphere.vertex.fx": "#version 300 es\n#include \"common.include.fx\"\nin mediump vec3 aPosition;\nin vec3 aTranslation;\nin vec3 aPreviousTranslation;\nin lowp float aColor;\nin lowp float aPreviousColor;\nin vec3 aScale;\nin vec3 aPreviousScale;\nin float aId;\nin vec2 aOrder;\nin lowp float aSelected;\nin lowp float aPreviousSelected;\nin lowp vec4 aIdColor;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nuniform float uTime;\nuniform float uDuration;\nuniform float uOrderFrom;\nuniform float uOrderTo;\nuniform float uHover;\nuniform float uActive;\nout lowp vec4 vIdColor;\nout lowp vec2 vVertexColor;\nout lowp float vVertexSelected;\nout highp float vAnimation;\nout lowp float vHover;\nout lowp float vActive;\nout mediump float vRadius;\nout vec3 vViewPosition;\nout vec3 vViewCenter;\nvoid main(void)\n{\nif (aOrder.x < uOrderFrom || aOrder.x > uOrderTo)\n{\nvIdColor = vec4(0.0);\nvVertexColor = vec2(0.0);\nvVertexSelected = 0.0;\nvAnimation = 0.0;\nvHover = 0.0;\nvActive = 0.0;\nvViewPosition = vec3(0.0);\nvViewCenter = vec3(0.0);\nvRadius = 0.0;\ngl_Position = vec4(0.0);\n}\nelse\n{\nvIdColor = aIdColor;\nfloat staggerOrder = aOrder.y;\nfloat startTime = staggerOrder * (1.0 - uDuration);\nfloat animation = clamp((uTime - startTime) / uDuration, 0.0, 1.0);\nanimation = smoothstep(0.0, 1.0, animation);\nfloat scale = mix(min(aPreviousScale.x, min(aPreviousScale.y, aPreviousScale.z)), min(aScale.x, min(aScale.y, aScale.z)), animation);\nvec3 translation = mix(aPreviousTranslation, aTranslation, animation);\nmat4 mvMatrix = uVMatrix * uMMatrix;\nvViewCenter = (mvMatrix * vec4(translation, 1.0)).xyz;\ntranslation.xyz += aPosition * scale;\nvec4 viewPosition = mvMatrix * vec4(translation, 1.0);\nvViewPosition = viewPosition.xyz;\ngl_Position = uPMatrix * viewPosition;\nvVertexColor = vec2(aColor, aPreviousColor);\nvVertexSelected = mix(aPreviousSelected, aSelected, animation);\nvAnimation = animation;\nvHover = uHover == aId ? 1.0 : 0.0;\nvActive = uActive == aId ? 1.0 : 0.0;\nvRadius = distance(vViewPosition, vViewCenter) / ROOT_THREE;\n}\n}\n",
	    "common.include.fx": "const float NEAR_PLANE = 0.01;\nconst float FAR_PLANE = 100.0;\nconst float DEPTH_A = 1.0002000200020003;\nconst float DEPTH_B = 0.020002000200020003;\nconst vec3 GAMMA = vec3(0.45454545454545453);\nconst vec3 INV_GAMMA = vec3(2.2);\nconst vec3 LUMINANCE = vec3(0.2126, 0.7152, 0.0722);\nconst float PI = 3.1415926538;\nconst float ROOT_TWO = 1.4142135624;\nconst float ROOT_TWO_OVER_TWO = 0.7071067811865476;\nconst float ROOT_THREE = 1.7320508075688772;\nconst float ROOT_THREE_OVER_TWO = 0.8660254037844386;\nconst vec3 IDENTITY_ROTATION = vec3(0.0, 1.0, 0.0);\nfloat dot2(in vec2 v) { return dot(v, v); }\nfloat dot2(in vec3 v) { return dot(v, v); }\n",
	    "intersect.include.fx": "float sphIntersect( in vec3 ro, in vec3 rd, in vec4 sph, in float shadow)\n{\nvec3 oc = ro - sph.xyz;\nfloat b = dot( oc, rd );\nfloat c = dot( oc, oc ) - sph.w*sph.w;\nfloat h = b*b - c;\nif( h<0.0 ) return -1.0;\nreturn -b - shadow * sqrt( h );\n}\nfloat roundedboxIntersect( in vec3 ro, in vec3 rd, in vec3 size, in float rad )\n{\nvec3 m = 1.0/rd;\nvec3 n = m*ro;\nvec3 k = abs(m)*(size+rad);\nvec3 t1 = -n - k;\nvec3 t2 = -n + k;\nfloat tN = max( max( t1.x, t1.y ), t1.z );\nfloat tF = min( min( t2.x, t2.y ), t2.z );\nif( tN > tF || tF < 0.0) return -1.0;\nfloat t = tN;\nvec3 pos = ro+t*rd;\nvec3 s = sign(pos);\nro *= s;\nrd *= s;\npos *= s;\npos -= size;\npos = max( pos.xyz, pos.yzx );\nif( min(min(pos.x,pos.y),pos.z)<0.0 ) return t;\nvec3 oc = ro - size;\nvec3 dd = rd*rd;\nvec3 oo = oc*oc;\nvec3 od = oc*rd;\nfloat ra2 = rad*rad;\nt = 1e20;\n{\nfloat b = od.x + od.y + od.z;\nfloat c = oo.x + oo.y + oo.z - ra2;\nfloat h = b*b - c;\nif( h>0.0 ) t = -b-sqrt(h);\n}\n{\nfloat a = dd.y + dd.z;\nfloat b = od.y + od.z;\nfloat c = oo.y + oo.z - ra2;\nfloat h = b*b - a*c;\nif( h>0.0 )\n{\nh = (-b-sqrt(h))/a;\nif( h>0.0 && h<t && abs(ro.x+rd.x*h)<size.x ) t = h;\n}\n}\n{\nfloat a = dd.z + dd.x;\nfloat b = od.z + od.x;\nfloat c = oo.z + oo.x - ra2;\nfloat h = b*b - a*c;\nif( h>0.0 )\n{\nh = (-b-sqrt(h))/a;\nif( h>0.0 && h<t && abs(ro.y+rd.y*h)<size.y ) t = h;\n}\n}\n{\nfloat a = dd.x + dd.y;\nfloat b = od.x + od.y;\nfloat c = oo.x + oo.y - ra2;\nfloat h = b*b - a*c;\nif( h>0.0 )\n{\nh = (-b-sqrt(h))/a;\nif( h>0.0 && h<t && abs(ro.z+rd.z*h)<size.z ) t = h;\n}\n}\nif( t>1e19 ) t=-1.0;\nreturn t;\n}\nvec3 roundedboxNormal( in vec3 pos, in vec3 siz, in float rad )\n{\nreturn sign(pos)*normalize(max(abs(pos)-siz,0.0));\n}\nvec4 iCappedCone(in vec3 ro, in vec3 rd,\nin vec3 pa, in vec3 pb,\nin float ra, in float rb, in float shadow)\n{\nvec3 ba = pb - pa;\nvec3 oa = ro - pa;\nvec3 ob = ro - pb;\nfloat m0 = dot(ba, ba);\nfloat m1 = dot(oa, ba);\nfloat m2 = dot(ob, ba);\nfloat m3 = dot(rd, ba);\nif (m1 < 0.0) { if (dot2(oa * m3 - rd * m1) < (ra * ra * m3 * m3)) return vec4(-m1 / m3, -ba * inversesqrt(m0)); }\nelse if (m2 > 0.0) { if (dot2(ob * m3 - rd * m2) < (rb * rb * m3 * m3)) return vec4(-m2 / m3, ba * inversesqrt(m0)); }\nfloat m4 = dot(rd, oa);\nfloat m5 = dot(oa, oa);\nfloat rr = ra - rb;\nfloat hy = m0 + rr * rr;\nfloat k2 = m0 * m0 - m3 * m3 * hy;\nfloat k1 = m0 * m0 * m4 - m1 * m3 * hy + m0 * ra * (rr * m3 * 1.0);\nfloat k0 = m0 * m0 * m5 - m1 * m1 * hy + m0 * ra * (rr * m1 * 2.0 - m0 * ra);\nfloat h = k1 * k1 - k2 * k0;\nif (h < 0.0) return vec4(-1.0);\nfloat t = (-k1 - shadow * sqrt(h)) / k2;\nfloat y = m1 + t * m3;\nif (y > 0.0 && y < m0)\n{\nreturn vec4(t, normalize(m0 * (m0 * (oa + t * rd) + rr * ba * ra) - ba * hy * y));\n}\nreturn vec4(-1.0);\n}\nvec4 iRoundedCone(in vec3 ro, in vec3 rd,\nin vec3 pa, in vec3 pb,\nin float ra, in float rb, in float shadow)\n{\nvec3 ba = pb - pa;\nvec3 oa = ro - pa;\nvec3 ob = ro - pb;\nfloat rr = ra - rb;\nfloat m0 = dot(ba, ba);\nfloat m1 = dot(ba, oa);\nfloat m2 = dot(ba, rd);\nfloat m3 = dot(rd, oa);\nfloat m5 = dot(oa, oa);\nfloat m6 = dot(ob, rd);\nfloat m7 = dot(ob, ob);\nfloat d2 = m0 - rr * rr;\nfloat k2 = d2 - m2 * m2;\nfloat k1 = d2 * m3 - m1 * m2 + m2 * rr * ra;\nfloat k0 = d2 * m5 - m1 * m1 + m1 * rr * ra * 2.0 - m0 * ra * ra;\nfloat h = k1 * k1 - k0 * k2;\nif (h < 0.0) return vec4(-1.0);\nfloat t = (-shadow * sqrt(h) - k1) / k2;\nfloat y = m1 - ra * rr + t * m2;\nif (y > 0.0 && y < d2)\n{\nreturn vec4(t, normalize(d2 * (oa + t * rd) - ba * y));\n}\nfloat h1 = m3 * m3 - m5 + ra * ra;\nfloat h2 = m6 * m6 - m7 + rb * rb;\nif (max(h1, h2) < 0.0) return vec4(-1.0);\nvec4 r = vec4(1e20);\nif (h1 > 0.0)\n{\nt = -m3 - shadow * sqrt( h1 );\nr = vec4(t, (oa + t * rd) / ra);\n}\nif (h2 > 0.0)\n{\nt = -m6 - shadow * sqrt( h2 );\nif (t < r.x)\nr = vec4(t, (ob + t * rd) / rb);\n}\nreturn r;\n}\n",
	    "quat.include.fx": "const float EPSILON = 0.000001;\nmat3 fromQuat(in vec4 q) {\nfloat x = q.x;\nfloat y = q.y;\nfloat z = q.z;\nfloat w = q.w;\nfloat x2 = x + x;\nfloat y2 = y + y;\nfloat z2 = z + z;\nfloat xx = x * x2;\nfloat yx = y * x2;\nfloat yy = y * y2;\nfloat zx = z * x2;\nfloat zy = z * y2;\nfloat zz = z * z2;\nfloat wx = w * x2;\nfloat wy = w * y2;\nfloat wz = w * z2;\nmat3 m;\nm[0][0] = 1.0 - yy - zz;\nm[0][1] = yx - wz;\nm[0][2] = zx + wy;\nm[1][0] = yx + wz;\nm[1][1] = 1.0 - xx - zz;\nm[1][2] = zy - wx;\nm[2][0] = zx - wy;\nm[2][1] = zy + wx;\nm[2][2] = 1.0 - xx - yy;\nreturn m;\n}\nvec3 rotate(in vec3 p, in vec4 q) {\nreturn p + 2.0 * cross(q.xyz, cross(q.xyz, p) + q.w * p);\n}\nvec4 slerp(in vec4 a, in vec4 b, in float t) {\nfloat cosom = dot(a, b);\nif (cosom < 0.0) {\ncosom = -cosom;\nb = -b;\n}\nfloat scale0, scale1;\nif (1.0 - cosom > EPSILON) {\nfloat omega = acos(cosom);\nfloat sinom = sin(omega);\nscale0 = sin((1.0 - t) * omega) / sinom;\nscale1 = sin(t * omega) / sinom;\n}\nelse {\nscale0 = 1.0 - t;\nscale1 = t;\n}\nreturn vec4(scale0 * a + scale1 * b);\n}\n",
	};
	class ShaderBase {
	    get isInitialized() { return this._isInitialized; }
	    get vertexBuffer() { return this._vertexBuffer; }
	    set vertexBuffer(value) {
	        if (this._vertexBuffer != value) {
	            this._vertexBuffer = value;
	            this._haveBuffersChanged = true;
	        }
	    }
	    get indexBuffer() { return this._indexBuffer; }
	    set indexBuffer(value) {
	        if (this._indexBuffer != value) {
	            this._indexBuffer = value;
	            this._haveBuffersChanged = true;
	        }
	    }
	    constructor(core, main) {
	        this._core = core;
	        this._main = main;
	    }
	    initializeContext(gl) {
	        this._gl = gl;
	    }
	    _createProgram(vs, fs) {
	        const program = this._gl.createProgram();
	        this._gl.attachShader(program, vs);
	        this._gl.attachShader(program, fs);
	        this._gl.linkProgram(program);
	        if (!this._gl.getProgramParameter(program, this._gl.LINK_STATUS)) {
	            this._core.log.write(LogLevel.error, this._gl.getProgramInfoLog(program));
	        }
	        return program;
	    }
	    _compileShader(source, type) {
	        const shader = this._gl.createShader(type);
	        this._gl.shaderSource(shader, source);
	        this._gl.compileShader(shader);
	        if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
	            this._core.log.write(LogLevel.error, this._gl.getShaderInfoLog(shader));
	        }
	        return shader;
	    }
	    _removeDirective(shaderSource, directive) {
	        const remove = `#define ${directive}`;
	        const index = shaderSource.indexOf(remove);
	        shaderSource = (index == -1) ? shaderSource : shaderSource.substring(0, index) + shaderSource.substring(index + remove.length);
	        return shaderSource;
	    }
	    prepare() {
	        if (this._program != this._main.shaderResources.currentProgram) {
	            if (this._main.shaderResources.currentShader) {
	                this._main.shaderResources.currentShader.disableProgram();
	            }
	            this.enableProgram(this._program);
	            this.updateBuffers();
	            this.updateTextures();
	        }
	        else {
	            if (this._haveBuffersChanged) {
	                this.updateBuffers();
	            }
	            if (this._haveTexturesChanged) {
	                this.updateTextures();
	            }
	        }
	    }
	    apply() { }
	    applyModel() { }
	    applyView() { }
	    enableProgram(program) {
	        this._gl.useProgram(program);
	        this._main.shaderResources.currentProgram = program;
	        this._main.shaderResources.currentShader = this;
	    }
	    updateBuffers() {
	        this._haveBuffersChanged = false;
	    }
	    updateTextures() {
	        this._haveTexturesChanged = false;
	    }
	    disableProgram() {
	        this._main.shaderResources.currentShader = null;
	        this._main.shaderResources.currentProgram = null;
	    }
	    _shaderFromFile(vsName, fsName, callback) {
	        callback(this._includesFromFile(Resources.glsl[vsName]), this._includesFromFile(Resources.glsl[fsName]));
	    }
	    _shaderFromUrl(vsName, fsName, callback) {
	        this._sourceFromUrl(vsName, (vsSource) => {
	            this._includesFromUrl(vsSource, 0, (vsIncSource) => {
	                this._sourceFromUrl(fsName, (fsSource) => {
	                    this._includesFromUrl(fsSource, 0, (fsIncSource) => {
	                        callback(vsIncSource, fsIncSource);
	                    });
	                });
	            });
	        });
	    }
	    _sourceFromUrl(url, callback) {
	        const request = new XMLHttpRequest();
	        request.open("GET", PathHelper.combine(this._core.config.shaderPath, url));
	        request.onreadystatechange = () => {
	            if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
	                callback(request.responseText);
	            }
	        };
	        request.send();
	    }
	    _includesFromFile(source) {
	        let index = 0;
	        do {
	            index = source.indexOf("#include", index);
	            if (index != -1) {
	                const start = source.indexOf("\"", index);
	                const end = source.indexOf("\"", start + 1);
	                const name = source.substring(start + 1, end);
	                const inc = Resources.glsl[name];
	                source = source.substring(0, index) + inc + source.substring(end + 1);
	            }
	        } while (index != -1);
	        return source;
	    }
	    _includesFromUrl(source, index, callback) {
	        index = source.indexOf("#include", index);
	        if (index != -1) {
	            const start = source.indexOf("\"", index);
	            const end = source.indexOf("\"", start + 1);
	            const name = source.substring(start + 1, end);
	            this._sourceFromUrl(PathHelper.combine("inc", name), (include) => {
	                source = source.substring(0, index) + include + source.substring(end + 1);
	                this._includesFromUrl(source, index, callback);
	            });
	        }
	        else {
	            callback(source);
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Texture extends ShaderBase {
	    get texture2D() { return this._texture2D; }
	    set texture2D(value) {
	        if (this._texture2D != value) {
	            this._texture2D = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("texture.vertex.fx", "texture.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._texCoordAttribute = gl.getAttribLocation(this._program, "aTexCoord");
	        this._normalAttribute = gl.getAttribLocation(this._program, "aNormal");
	        this._samplerUniform = gl.getUniformLocation(this._program, "uSampler");
	        this._mMatrixUniform = gl.getUniformLocation(this._program, "uMMatrix");
	        this._vMatrixUniform = gl.getUniformLocation(this._program, "uVMatrix");
	        this._pMatrixUniform = gl.getUniformLocation(this._program, "uPMatrix");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniformMatrix4fv(this._mMatrixUniform, false, this.mMatrix);
	        this._gl.uniform1i(this._samplerUniform, 0);
	    }
	    applyView() {
	        this._gl.uniformMatrix4fv(this._vMatrixUniform, false, this.vMatrix);
	        this._gl.uniformMatrix4fv(this._pMatrixUniform, false, this.pMatrix);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionNormalTextureVertex.SIZE_BYTES, PositionNormalTextureVertex.POSITION_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.vertexAttribPointer(this._normalAttribute, 3, this._gl.BYTE, true, PositionNormalTextureVertex.SIZE_BYTES, PositionNormalTextureVertex.NORMAL_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._normalAttribute);
	        this._gl.vertexAttribPointer(this._texCoordAttribute, 2, this._gl.UNSIGNED_SHORT, true, PositionNormalTextureVertex.SIZE_BYTES, PositionNormalTextureVertex.TEX_COORD_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._texCoordAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	let Lasso$1 = class Lasso extends ShaderBase {
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("lasso.vertex.fx", "lasso.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._texCoordAttribute = gl.getAttribLocation(this._program, "aTexCoord");
	        this._mMatrixUniform = gl.getUniformLocation(this._program, "uMMatrix");
	        this._colorUniform = gl.getUniformLocation(this._program, "uColor");
	        this._thicknessUniform = gl.getUniformLocation(this._program, "uThickness");
	        this._dashWidthUniform = gl.getUniformLocation(this._program, "uDashWidth");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform3fv(this._colorUniform, this.color);
	        this._gl.uniform1f(this._dashWidthUniform, this.dashWidth);
	    }
	    applyView() {
	        this._gl.uniformMatrix4fv(this._mMatrixUniform, false, this.mMatrix);
	        this._gl.uniform2fv(this._thicknessUniform, this.thickness);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionTextureVertex.SIZE_BYTES, PositionTextureVertex.POSITION_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.vertexAttribPointer(this._texCoordAttribute, 2, this._gl.UNSIGNED_SHORT, true, PositionTextureVertex.SIZE_BYTES, PositionTextureVertex.TEX_COORD_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._texCoordAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	};

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class SdfText extends ShaderBase {
	    get texture2D() { return this._texture2D; }
	    set texture2D(value) {
	        if (this._texture2D != value) {
	            this._texture2D = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("sdftext.vertex.fx", "sdftext.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._idColorAttribute = gl.getAttribLocation(this._program, "aIdColor");
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._texCoordAttribute = gl.getAttribLocation(this._program, "aTexCoord");
	        this._samplerUniform = gl.getUniformLocation(this._program, "uSampler");
	        this._mMatrixUniform = gl.getUniformLocation(this._program, "uMMatrix");
	        this._vMatrixUniform = gl.getUniformLocation(this._program, "uVMatrix");
	        this._pMatrixUniform = gl.getUniformLocation(this._program, "uPMatrix");
	        this._colorUniform = gl.getUniformLocation(this._program, "uColor");
	        this._hoverColorUniform = gl.getUniformLocation(this._program, "uHoverColor");
	        this._pickUniform = gl.getUniformLocation(this._program, "uPick");
	        this._pickedIdColorUniform = gl.getUniformLocation(this._program, "uPickedIdColor");
	        this._borderColorUniform = gl.getUniformLocation(this._program, "uBorderColor");
	        this._bufferUniform = gl.getUniformLocation(this._program, "uBuffer");
	        this._borderWidthUniform = gl.getUniformLocation(this._program, "uBorderWidth");
	        this._gammaUniform = gl.getUniformLocation(this._program, "uGamma");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform1i(this._samplerUniform, 0);
	        this._gl.uniform3fv(this._colorUniform, this.color);
	        this._gl.uniform3fv(this._hoverColorUniform, this.hoverColor);
	        this._gl.uniform3fv(this._borderColorUniform, this.borderColor);
	        this._gl.uniform1f(this._gammaUniform, this.gamma);
	        this._gl.uniform1f(this._bufferUniform, this.buffer);
	        this._gl.uniform1f(this._borderWidthUniform, this.borderWidth);
	        this._gl.uniform4fv(this._pickedIdColorUniform, this.pickedIdColor);
	    }
	    applyModel() {
	        this._gl.uniformMatrix4fv(this._mMatrixUniform, false, this.mMatrix);
	    }
	    applyView() {
	        this._gl.uniform1i(this._pickUniform, this.isPickShader ? 1 : 0);
	        this._gl.uniformMatrix4fv(this._vMatrixUniform, false, this.vMatrix);
	        this._gl.uniformMatrix4fv(this._pMatrixUniform, false, this.pMatrix);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._idColorAttribute, 4, this._gl.UNSIGNED_BYTE, true, PositionTexturePickVertex.SIZE_BYTES, PositionTexturePickVertex.ID_COLOR_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._idColorAttribute);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionTexturePickVertex.SIZE_BYTES, PositionTexturePickVertex.POSITION_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.vertexAttribPointer(this._texCoordAttribute, 2, this._gl.UNSIGNED_SHORT, true, PositionTexturePickVertex.SIZE_BYTES, PositionTexturePickVertex.TEX_COORD_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._texCoordAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class PickGrid extends ShaderBase {
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("pickgrid.vertex.fx", "pickgrid.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = this._gl.getAttribLocation(this._program, "aPosition");
	        this._idColorAttribute = this._gl.getAttribLocation(this._program, "aIdColor");
	        this._texCoordAttribute = this._gl.getAttribLocation(this._program, "aTexCoord");
	        this._normalAttribute = this._gl.getAttribLocation(this._program, "aNormal");
	        this._boundsAttribute = this._gl.getAttribLocation(this._program, "aBounds");
	        this._pMatrixUniform = gl.getUniformLocation(this._program, "uPMatrix");
	        this._mMatrixUniform = gl.getUniformLocation(this._program, "uMMatrix");
	        this._vMatrixUniform = gl.getUniformLocation(this._program, "uVMatrix");
	        this._pickUniform = gl.getUniformLocation(this._program, "uPick");
	        this._majorColorUniform = gl.getUniformLocation(this._program, "uMajorColor");
	        this._minorColorUniform = gl.getUniformLocation(this._program, "uMinorColor");
	        this._zeroColorUniform = gl.getUniformLocation(this._program, "uZeroColor");
	        this._backgroundUniform = gl.getUniformLocation(this._program, "uBackground");
	        this._highlightUniform = gl.getUniformLocation(this._program, "uHighlight");
	        this._pickedIdColorUniform = gl.getUniformLocation(this._program, "uPickedIdColor");
	        this._faceSizeUniform = gl.getUniformLocation(this._program, "uFaceSize");
	        this._majorThicknessUniform = gl.getUniformLocation(this._program, "uMajorThickness");
	        this._minorThicknessUniform = gl.getUniformLocation(this._program, "uMinorThickness");
	        this._zeroThicknessUniform = gl.getUniformLocation(this._program, "uZeroThickness");
	        this._zeroUniform = gl.getUniformLocation(this._program, "uZero");
	        this._minorGridlinesUniform = gl.getUniformLocation(this._program, "uMinorGridlines");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform1f(this._majorThicknessUniform, this.majorThickness);
	        this._gl.uniform1f(this._minorThicknessUniform, this.minorThickness);
	        this._gl.uniform1f(this._zeroThicknessUniform, this.zeroThickness);
	        this._gl.uniform3fv(this._backgroundUniform, this.backgroundColor);
	        this._gl.uniform3fv(this._highlightUniform, this.highlightColor);
	        this._gl.uniform3fv(this._majorColorUniform, this.majorColor);
	        this._gl.uniform3fv(this._minorColorUniform, this.minorColor);
	        this._gl.uniform3fv(this._zeroColorUniform, this.zeroColor);
	        this._gl.uniform4fv(this._pickedIdColorUniform, this.pickedIdColor);
	    }
	    applyView() {
	        this._gl.uniform1i(this._pickUniform, this.isPickShader ? 1 : 0);
	        this._gl.uniformMatrix4fv(this._vMatrixUniform, false, this.vMatrix);
	        this._gl.uniformMatrix4fv(this._pMatrixUniform, false, this.pMatrix);
	    }
	    ApplyFace() {
	        this._gl.uniformMatrix4fv(this._mMatrixUniform, false, this.mMatrix);
	        this._gl.uniform2f(this._faceSizeUniform, this.faceWidth, this.faceHeight);
	        this._gl.uniform2fv(this._zeroUniform, this.zero);
	        this._gl.uniform2fv(this._minorGridlinesUniform, this.minorGridlines);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PickGridVertex.SIZE_BYTES, PickGridVertex.TRANSLATION_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.vertexAttribPointer(this._normalAttribute, 3, this._gl.BYTE, true, PickGridVertex.SIZE_BYTES, PickGridVertex.NORMAL_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._normalAttribute);
	        this._gl.vertexAttribPointer(this._texCoordAttribute, 2, this._gl.UNSIGNED_SHORT, true, PickGridVertex.SIZE_BYTES, PickGridVertex.TEX_COORD_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._texCoordAttribute);
	        this._gl.vertexAttribPointer(this._idColorAttribute, 4, this._gl.UNSIGNED_BYTE, true, PickGridVertex.SIZE_BYTES, PickGridVertex.ID_COLOR_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._idColorAttribute);
	        this._gl.vertexAttribPointer(this._boundsAttribute, 4, this._gl.UNSIGNED_SHORT, true, PickGridVertex.SIZE_BYTES, PickGridVertex.BOUNDS_OFFSET_BYTES);
	        this._gl.enableVertexAttribArray(this._boundsAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class UnitShader extends ShaderBase {
	    get paletteTexture() { return this._paletteTexture; }
	    set paletteTexture(value) {
	        if (this._paletteTexture != value) {
	            this._paletteTexture = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get previousPaletteTexture() { return this._previousPaletteTexture; }
	    set previousPaletteTexture(value) {
	        if (this._previousPaletteTexture != value) {
	            this._previousPaletteTexture = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get sdfTexture() { return this._sdfTexture; }
	    set sdfTexture(value) {
	        if (this._sdfTexture != value) {
	            this._sdfTexture = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get previousSdfTexture() { return this._previousSdfTexture; }
	    set previousSdfTexture(value) {
	        if (this._previousSdfTexture != value) {
	            this._previousSdfTexture = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    set instanceBuffer(value) {
	        if (this._instanceBuffer != value) {
	            this._instanceBuffer = value;
	            this._haveBuffersChanged = true;
	        }
	    }
	    set previousInstanceBuffer(value) {
	        if (this._previousInstanceBuffer != value) {
	            this._previousInstanceBuffer = value;
	            this._haveBuffersChanged = true;
	        }
	    }
	    initializeData() {
	        this._areBuffersInitialized = false;
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._translationAttribute = gl.getAttribLocation(this._program, "aTranslation");
	        this._previousTranslationAttribute = gl.getAttribLocation(this._program, "aPreviousTranslation");
	        this._scaleAttribute = gl.getAttribLocation(this._program, "aScale");
	        this._previousScaleAttribute = gl.getAttribLocation(this._program, "aPreviousScale");
	        this._colorAttribute = gl.getAttribLocation(this._program, "aColor");
	        this._previousColorAttribute = gl.getAttribLocation(this._program, "aPreviousColor");
	        this._selectedAttribute = gl.getAttribLocation(this._program, "aSelected");
	        this._previousSelectedAttribute = gl.getAttribLocation(this._program, "aPreviousSelected");
	        this._orderAttribute = gl.getAttribLocation(this._program, "aOrder");
	        this._idAttribute = gl.getAttribLocation(this._program, "aId");
	        this._idColorAttribute = gl.getAttribLocation(this._program, "aIdColor");
	        this._sampler0Uniform = gl.getUniformLocation(this._program, "uSampler");
	        this._previousSampler0Uniform = gl.getUniformLocation(this._program, "uPreviousSampler");
	        this._mMatrixUniform = gl.getUniformLocation(this._program, "uMMatrix");
	        this._vMatrixUniform = gl.getUniformLocation(this._program, "uVMatrix");
	        this._pMatrixUniform = gl.getUniformLocation(this._program, "uPMatrix");
	        this._timeUniform = gl.getUniformLocation(this._program, "uTime");
	        this._durationUniform = gl.getUniformLocation(this._program, "uDuration");
	        this._fromOrderUniform = gl.getUniformLocation(this._program, "uOrderFrom");
	        this._toOrderUniform = gl.getUniformLocation(this._program, "uOrderTo");
	        this._hoverUniform = gl.getUniformLocation(this._program, "uHover");
	        this._activeUniform = gl.getUniformLocation(this._program, "uActive");
	        this._pickUniform = gl.getUniformLocation(this._program, "uPick");
	        this._shadowUniform = gl.getUniformLocation(this._program, "uShadow");
	        const vertices = Cube.POSITIONS;
	        this._vertexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	        const indices = Cube.INDICES;
	        this._indexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
	        this.indexCount = indices.length;
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, 12, 0);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._updateCurrentBuffer();
	        this._updatePreviousBuffer();
	    }
	    _updateCurrentBuffer() {
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._instanceBuffer);
	        this._gl.vertexAttribPointer(this._idAttribute, 1, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ID_HOVER_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._idAttribute, 1);
	        this._gl.enableVertexAttribArray(this._idAttribute);
	        this._gl.vertexAttribPointer(this._idColorAttribute, 4, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.ID_COLOR_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._idColorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._idColorAttribute);
	        this._gl.vertexAttribPointer(this._translationAttribute, 3, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.TRANSLATION_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._translationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._translationAttribute);
	        this._gl.vertexAttribPointer(this._scaleAttribute, 3, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.SCALE_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._scaleAttribute, 1);
	        this._gl.enableVertexAttribArray(this._scaleAttribute);
	        this._gl.vertexAttribPointer(this._selectedAttribute, 1, this._gl.BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.SELECTED_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._selectedAttribute, 1);
	        this._gl.enableVertexAttribArray(this._selectedAttribute);
	        this._gl.vertexAttribPointer(this._orderAttribute, 2, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ORDER_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._orderAttribute, 1);
	        this._gl.enableVertexAttribArray(this._orderAttribute);
	    }
	    _updatePreviousBuffer() {
	        if (this._previousInstanceBuffer != this._instanceBuffer) {
	            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._previousInstanceBuffer);
	        }
	        this._gl.vertexAttribPointer(this._previousTranslationAttribute, 3, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.TRANSLATION_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._previousTranslationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousTranslationAttribute);
	        this._gl.vertexAttribPointer(this._previousScaleAttribute, 3, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.SCALE_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._previousScaleAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousScaleAttribute);
	        this._gl.vertexAttribPointer(this._previousSelectedAttribute, 1, this._gl.BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.SELECTED_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._previousSelectedAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousSelectedAttribute);
	    }
	    apply() {
	        this._gl.uniformMatrix4fv(this._mMatrixUniform, false, this.mMatrix);
	        this._gl.uniform1f(this._timeUniform, this.time);
	        this._gl.uniform1f(this._durationUniform, this.duration);
	        this._gl.uniform1f(this._fromOrderUniform, this.rangeMin);
	        this._gl.uniform1f(this._toOrderUniform, this.rangeMax);
	        this._gl.uniform1i(this._previousSampler0Uniform, 0);
	        this._gl.uniform1i(this._sampler0Uniform, 1);
	        this._gl.uniform1f(this._hoverUniform, this.hover);
	        this._gl.uniform1f(this._activeUniform, this.active);
	    }
	    applyView() {
	        this._gl.uniformMatrix4fv(this._vMatrixUniform, false, this.vMatrix);
	        this._gl.uniformMatrix4fv(this._pMatrixUniform, false, this.pMatrix);
	        this._gl.uniform1i(this._pickUniform, this.isPickShader ? 1 : 0);
	        this._gl.uniform1i(this._shadowUniform, this.isShadowMap ? 1 : 0);
	    }
	    updateTextures() {
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._previousPaletteTexture);
	        this._gl.activeTexture(this._gl.TEXTURE1);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._paletteTexture);
	    }
	    disableProgram() {
	        super.disableProgram();
	        this._gl.vertexAttribDivisor(this._translationAttribute, 0);
	        this._gl.vertexAttribDivisor(this._previousTranslationAttribute, 0);
	        this._gl.vertexAttribDivisor(this._scaleAttribute, 0);
	        this._gl.vertexAttribDivisor(this._previousScaleAttribute, 0);
	        this._gl.vertexAttribDivisor(this._colorAttribute, 0);
	        this._gl.vertexAttribDivisor(this._previousColorAttribute, 0);
	        this._gl.vertexAttribDivisor(this._selectedAttribute, 0);
	        this._gl.vertexAttribDivisor(this._previousSelectedAttribute, 0);
	        this._gl.vertexAttribDivisor(this._orderAttribute, 0);
	        this._gl.vertexAttribDivisor(this._idAttribute, 0);
	        this._gl.vertexAttribDivisor(this._idColorAttribute, 0);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class UnitBlock extends UnitShader {
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("unitblock.vertex.fx", "unitblock.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        super._initializeShader(gl, vsSource, fsSource);
	        this._rotationAttribute = gl.getAttribLocation(this._program, "aRotation");
	        this._previousRotationAttribute = gl.getAttribLocation(this._program, "aPreviousRotation");
	        this._isInitialized = true;
	    }
	    _updateCurrentBuffer() {
	        super._updateCurrentBuffer();
	        this._gl.vertexAttribPointer(this._rotationAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ROTATION_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._rotationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._rotationAttribute);
	        this._gl.vertexAttribPointer(this._colorAttribute, 2, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._colorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._colorAttribute);
	    }
	    _updatePreviousBuffer() {
	        super._updatePreviousBuffer();
	        this._gl.vertexAttribPointer(this._previousRotationAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ROTATION_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._previousRotationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousRotationAttribute);
	        this._gl.vertexAttribPointer(this._previousColorAttribute, 2, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._previousColorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousColorAttribute);
	    }
	    disableProgram() {
	        super.disableProgram();
	        this._gl.vertexAttribDivisor(this._rotationAttribute, 0);
	        this._gl.vertexAttribDivisor(this._previousRotationAttribute, 0);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class UnitSphere extends UnitShader {
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("unitsphere.vertex.fx", "unitsphere.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        super._initializeShader(gl, vsSource, fsSource);
	        this._isInitialized = true;
	    }
	    _updateCurrentBuffer() {
	        super._updateCurrentBuffer();
	        this._gl.vertexAttribPointer(this._colorAttribute, 1, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._colorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._colorAttribute);
	    }
	    _updatePreviousBuffer() {
	        super._updatePreviousBuffer();
	        this._gl.vertexAttribPointer(this._previousColorAttribute, 1, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._previousColorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousColorAttribute);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class UnitCylinder extends UnitShader {
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("unitcylinder.vertex.fx", "unitcylinder.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        super._initializeShader(gl, vsSource, fsSource);
	        this._rotationAttribute = gl.getAttribLocation(this._program, "aRotation");
	        this._previousRotationAttribute = gl.getAttribLocation(this._program, "aPreviousRotation");
	        this._isInitialized = true;
	    }
	    _updateCurrentBuffer() {
	        super._updateCurrentBuffer();
	        this._gl.vertexAttribPointer(this._rotationAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ROTATION_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._rotationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._rotationAttribute);
	        this._gl.vertexAttribPointer(this._colorAttribute, 2, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._colorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._colorAttribute);
	    }
	    _updatePreviousBuffer() {
	        super._updatePreviousBuffer();
	        this._gl.vertexAttribPointer(this._previousRotationAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ROTATION_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._previousRotationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousRotationAttribute);
	        this._gl.vertexAttribPointer(this._previousColorAttribute, 2, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._previousColorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousColorAttribute);
	    }
	    disableProgram() {
	        super.disableProgram();
	        this._gl.vertexAttribDivisor(this._rotationAttribute, 0);
	        this._gl.vertexAttribDivisor(this._previousRotationAttribute, 0);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class UnitSdf extends UnitShader {
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("unitsdf.vertex.fx", "unitsdf.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        super._initializeShader(gl, vsSource, fsSource);
	        this._rotationAttribute = gl.getAttribLocation(this._program, "aRotation");
	        this._previousRotationAttribute = gl.getAttribLocation(this._program, "aPreviousRotation");
	        this._texCoordAttribute = gl.getAttribLocation(this._program, "aTexCoord");
	        this._previousTexCoordAttribute = gl.getAttribLocation(this._program, "aPreviousTexCoord");
	        this._sampler1Uniform = gl.getUniformLocation(this._program, "uSampler1");
	        this._previousSampler1Uniform = gl.getUniformLocation(this._program, "uPreviousSampler1");
	        this._isInitialized = true;
	    }
	    _updateCurrentBuffer() {
	        super._updateCurrentBuffer();
	        this._gl.vertexAttribPointer(this._rotationAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ROTATION_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._rotationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._rotationAttribute);
	        this._gl.vertexAttribPointer(this._texCoordAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.TEXCOORD_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._texCoordAttribute, 1);
	        this._gl.enableVertexAttribArray(this._texCoordAttribute);
	        this._gl.vertexAttribPointer(this._colorAttribute, 2, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._colorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._colorAttribute);
	    }
	    _updatePreviousBuffer() {
	        super._updatePreviousBuffer();
	        this._gl.vertexAttribPointer(this._previousRotationAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.ROTATION_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._previousRotationAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousRotationAttribute);
	        this._gl.vertexAttribPointer(this._previousTexCoordAttribute, 4, this._gl.FLOAT, false, UnitVertex.SIZE_BYTES, UnitVertex.TEXCOORD_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._previousTexCoordAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousTexCoordAttribute);
	        this._gl.vertexAttribPointer(this._previousColorAttribute, 2, this._gl.UNSIGNED_BYTE, true, UnitVertex.SIZE_BYTES, UnitVertex.COLOR_OFFSET_BYTES);
	        this._gl.vertexAttribDivisor(this._previousColorAttribute, 1);
	        this._gl.enableVertexAttribArray(this._previousColorAttribute);
	    }
	    apply() {
	        super.apply();
	        this._gl.uniform1i(this._previousSampler1Uniform, 2);
	        this._gl.uniform1i(this._sampler1Uniform, 3);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE2);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._previousSdfTexture);
	        this._gl.activeTexture(this._gl.TEXTURE3);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._sdfTexture);
	    }
	    disableProgram() {
	        super.disableProgram();
	        this._gl.vertexAttribDivisor(this._rotationAttribute, 0);
	        this._gl.vertexAttribDivisor(this._previousRotationAttribute, 0);
	        this._gl.vertexAttribDivisor(this._texCoordAttribute, 0);
	        this._gl.vertexAttribDivisor(this._previousTexCoordAttribute, 0);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Background extends ShaderBase {
	    constructor(core, main) {
	        super(core, main);
	        this._quad = new Quad();
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        this._quad.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("simple.vertex.fx", "background.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._colorUniform = gl.getUniformLocation(this._program, "uColor");
	        this._isInitialized = true;
	        this._vao = gl.createVertexArray();
	        gl.bindVertexArray(this._vao);
	        gl.bindBuffer(gl.ARRAY_BUFFER, this._quad.vertexBuffer);
	        gl.vertexAttribPointer(this._positionAttribute, 3, gl.FLOAT, false, PositionVertex.SIZE_BYTES, 0);
	        gl.enableVertexAttribArray(this._positionAttribute);
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._quad.indexBuffer);
	        gl.bindVertexArray(null);
	    }
	    apply() {
	        this._gl.uniform3fv(this._colorUniform, this.color);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindVertexArray(this._vao);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Ssao extends ShaderBase {
	    get texture2D1() { return this._texture2D1; }
	    set texture2D1(value) {
	        if (this._texture2D1 != value) {
	            this._texture2D1 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get texture2D2() { return this._texture2D2; }
	    set texture2D2(value) {
	        if (this._texture2D2 != value) {
	            this._texture2D2 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get texture2D3() { return this._texture2D3; }
	    set texture2D3(value) {
	        if (this._texture2D3 != value) {
	            this._texture2D3 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("simple.vertex.fx", "ssao.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._samplerUniform1 = gl.getUniformLocation(this._program, "uSampler1");
	        this._samplerUniform2 = gl.getUniformLocation(this._program, "uSampler2");
	        this._samplerUniform3 = gl.getUniformLocation(this._program, "uSampler3");
	        this._pMatrixUniform = gl.getUniformLocation(this._program, "uPMatrix");
	        this._viewportUniform = gl.getUniformLocation(this._program, "uViewport");
	        this._ssaoNoiseSizeUniform = gl.getUniformLocation(this._program, "uSsaoNoiseSize");
	        this._ssaoRadiusUniform = gl.getUniformLocation(this._program, "uSsaoRadius");
	        this._ssaoPowerUniform = gl.getUniformLocation(this._program, "uSsaoPower");
	        this._ssaoKernelUniform = gl.getUniformLocation(this._program, "uSsaoKernel");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform1i(this._samplerUniform1, 0);
	        this._gl.uniform1i(this._samplerUniform2, 1);
	        this._gl.uniform1i(this._samplerUniform3, 2);
	        this._gl.uniform4f(this._viewportUniform, this.left, this.top, this.width, this.height);
	        this._gl.uniform1f(this._ssaoNoiseSizeUniform, this.ssaoNoiseSize);
	        this._gl.uniform1f(this._ssaoRadiusUniform, this.ssaoRadius);
	        this._gl.uniform1f(this._ssaoPowerUniform, this.ssaoPower);
	        this._gl.uniform3fv(this._ssaoKernelUniform, this.ssaoKernel);
	    }
	    applyView() {
	        this._gl.uniformMatrix4fv(this._pMatrixUniform, false, this.pMatrix);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionVertex.SIZE_BYTES, 0);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D1);
	        this._gl.activeTexture(this._gl.TEXTURE1);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D2);
	        this._gl.activeTexture(this._gl.TEXTURE2);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D3);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Box extends ShaderBase {
	    get texture2D() { return this._texture2D; }
	    set texture2D(value) {
	        if (this._texture2D != value) {
	            this._texture2D = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("simple.vertex.fx", "box.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._samplerUniform = gl.getUniformLocation(this._program, "uSampler");
	        this._viewportUniform = gl.getUniformLocation(this._program, "uViewport");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform1i(this._samplerUniform, 0);
	        this._gl.uniform4f(this._viewportUniform, this.left, this.top, this.width, this.height);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionVertex.SIZE_BYTES, 0);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Deferred extends ShaderBase {
	    get texture2D1() { return this._texture2D1; }
	    set texture2D1(value) {
	        if (this._texture2D1 != value) {
	            this._texture2D1 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get texture2D2() { return this._texture2D2; }
	    set texture2D2(value) {
	        if (this._texture2D2 != value) {
	            this._texture2D2 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get texture2D3() { return this._texture2D3; }
	    set texture2D3(value) {
	        if (this._texture2D3 != value) {
	            this._texture2D3 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get texture2D4() { return this._texture2D4; }
	    set texture2D4(value) {
	        if (this._texture2D4 != value) {
	            this._texture2D4 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get texture2D5() { return this._texture2D5; }
	    set texture2D5(value) {
	        if (this._texture2D5 != value) {
	            this._texture2D5 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    constructor(core, main) {
	        super(core, main);
	        this.directionToKeyLight = create$3();
	        this.directionToFillLight1 = create$3();
	        this.directionToFillLight2 = create$3();
	        this.keyLightHalfAngle = create$3();
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("simple.vertex.fx", "deferred.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._shadowUniform = gl.getUniformLocation(this._program, "uShadow");
	        this._ssaoUniform = gl.getUniformLocation(this._program, "uSsao");
	        this._inverseVMatrixUniform = gl.getUniformLocation(this._program, "uInverseVMatrix");
	        this._shadowVMatrixUniform = gl.getUniformLocation(this._program, "uShadowVMatrix");
	        this._shadowPMatrixUniform = gl.getUniformLocation(this._program, "uShadowPMatrix");
	        this._samplerUniform1 = gl.getUniformLocation(this._program, "uSampler1");
	        this._samplerUniform2 = gl.getUniformLocation(this._program, "uSampler2");
	        this._samplerUniform3 = gl.getUniformLocation(this._program, "uSampler3");
	        this._samplerUniform4 = gl.getUniformLocation(this._program, "uSampler4");
	        this._samplerUniform5 = gl.getUniformLocation(this._program, "uSampler5");
	        this._viewportUniform = gl.getUniformLocation(this._program, "uViewport");
	        this._shadowMapSizeUniform = gl.getUniformLocation(this._program, "uShadowMapSize");
	        this._keyLightHalfAngleUniform = gl.getUniformLocation(this._program, "uKeyLightHalfAngle");
	        this._directionToKeyLightUniform = gl.getUniformLocation(this._program, "uDirectionToKeyLight");
	        this._directionToFillLight1Uniform = gl.getUniformLocation(this._program, "uDirectionToFillLight1");
	        this._directionToFillLight2Uniform = gl.getUniformLocation(this._program, "uDirectionToFillLight2");
	        this._keyLightIntensityUniform = gl.getUniformLocation(this._program, "uKeyLightIntensity");
	        this._fillLight1IntensityUniform = gl.getUniformLocation(this._program, "uFillLight1Intensity");
	        this._fillLight2IntensityUniform = gl.getUniformLocation(this._program, "uFillLight2Intensity");
	        this._ambientIntensityUniform = gl.getUniformLocation(this._program, "uAmbientIntensity");
	        this._materialIntensityUniform = gl.getUniformLocation(this._program, "uMaterialIntensity");
	        this._specularPowerUniform = gl.getUniformLocation(this._program, "uSpecularPower");
	        this._specularIntensityUniform = gl.getUniformLocation(this._program, "uSpecularIntensity");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform1i(this._shadowUniform, this.isShadowEnabled ? 1 : 0);
	        this._gl.uniform1i(this._ssaoUniform, this.isSsaoEnabled ? 1 : 0);
	        this._gl.uniformMatrix4fv(this._inverseVMatrixUniform, false, this.inverseVMatrix);
	        this._gl.uniformMatrix4fv(this._shadowVMatrixUniform, false, this.shadowVMatrix);
	        this._gl.uniformMatrix4fv(this._shadowPMatrixUniform, false, this.shadowPMatrix);
	        this._gl.uniform1i(this._samplerUniform1, 0);
	        this._gl.uniform1i(this._samplerUniform2, 1);
	        this._gl.uniform1i(this._samplerUniform3, 2);
	        this._gl.uniform1i(this._samplerUniform4, 3);
	        this._gl.uniform1i(this._samplerUniform5, 4);
	        this._gl.uniform4f(this._viewportUniform, this.left, this.top, this.width, this.height);
	        this._gl.uniform2f(this._shadowMapSizeUniform, this.shadowMapWidth, this.shadowMapHeight);
	        this._gl.uniform1f(this._keyLightIntensityUniform, this.keyLightIntensity);
	        this._gl.uniform1f(this._fillLight1IntensityUniform, this.fillLight1Intensity);
	        this._gl.uniform1f(this._fillLight2IntensityUniform, this.fillLight2Intensity);
	        this._gl.uniform1f(this._ambientIntensityUniform, this.ambientIntensity);
	        this._gl.uniform1f(this._materialIntensityUniform, this.materialIntensity);
	        this._gl.uniform1f(this._specularPowerUniform, this.specularPower);
	        this._gl.uniform1f(this._specularIntensityUniform, this.specularIntensity);
	        this._gl.uniform3fv(this._directionToKeyLightUniform, this.directionToKeyLight);
	        this._gl.uniform3fv(this._directionToFillLight1Uniform, this.directionToFillLight1);
	        this._gl.uniform3fv(this._directionToFillLight2Uniform, this.directionToFillLight2);
	        this._gl.uniform3fv(this._keyLightHalfAngleUniform, this.keyLightHalfAngle);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionVertex.SIZE_BYTES, 0);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D1);
	        this._gl.activeTexture(this._gl.TEXTURE1);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D2);
	        this._gl.activeTexture(this._gl.TEXTURE2);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D3);
	        this._gl.activeTexture(this._gl.TEXTURE3);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D4);
	        this._gl.activeTexture(this._gl.TEXTURE4);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D5);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Combine extends ShaderBase {
	    get texture2D1() { return this._texture2D1; }
	    set texture2D1(value) {
	        if (this._texture2D1 != value) {
	            this._texture2D1 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get texture2D2() { return this._texture2D2; }
	    set texture2D2(value) {
	        if (this._texture2D2 != value) {
	            this._texture2D2 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get texture2D3() { return this._texture2D3; }
	    set texture2D3(value) {
	        if (this._texture2D3 != value) {
	            this._texture2D3 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get texture2D4() { return this._texture2D4; }
	    set texture2D4(value) {
	        if (this._texture2D4 != value) {
	            this._texture2D4 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get texture2D5() { return this._texture2D5; }
	    set texture2D5(value) {
	        if (this._texture2D5 != value) {
	            this._texture2D5 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("simple.vertex.fx", "combine.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._viewportUniform = gl.getUniformLocation(this._program, "uViewport");
	        this._intensityUniform = gl.getUniformLocation(this._program, "uIntensity");
	        this._samplerUniform1 = gl.getUniformLocation(this._program, "uSampler1");
	        this._samplerUniform2 = gl.getUniformLocation(this._program, "uSampler2");
	        this._samplerUniform3 = gl.getUniformLocation(this._program, "uSampler3");
	        this._samplerUniform4 = gl.getUniformLocation(this._program, "uSampler4");
	        this._samplerUniform5 = gl.getUniformLocation(this._program, "uSampler5");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform4f(this._viewportUniform, this.viewport.x, this.viewport.y, this.viewport.width, this.viewport.height);
	        this._gl.uniform1f(this._intensityUniform, this.intensity);
	        this._gl.uniform1i(this._samplerUniform1, 0);
	        this._gl.uniform1i(this._samplerUniform2, 1);
	        this._gl.uniform1i(this._samplerUniform3, 2);
	        this._gl.uniform1i(this._samplerUniform4, 3);
	        this._gl.uniform1i(this._samplerUniform5, 4);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionVertex.SIZE_BYTES, 0);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D1);
	        this._gl.activeTexture(this._gl.TEXTURE1);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D2);
	        this._gl.activeTexture(this._gl.TEXTURE2);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D3);
	        this._gl.activeTexture(this._gl.TEXTURE3);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D4);
	        this._gl.activeTexture(this._gl.TEXTURE4);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D5);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class DofBlur extends ShaderBase {
	    get texture2D1() { return this._texture2D1; }
	    set texture2D1(value) {
	        if (this._texture2D1 != value) {
	            this._texture2D1 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get texture2D2() { return this._texture2D2; }
	    set texture2D2(value) {
	        if (this._texture2D2 != value) {
	            this._texture2D2 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("simple.vertex.fx", "dofblur.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._viewportUniform = gl.getUniformLocation(this._program, "uViewport");
	        this._focusDepthUniform = gl.getUniformLocation(this._program, "uFocusDepth");
	        this._nearFocusDepthUniform = gl.getUniformLocation(this._program, "uNearFocusDepth");
	        this._farFocusDepthUniform = gl.getUniformLocation(this._program, "uFarFocusDepth");
	        this._maxBackgroundBlurUniform = gl.getUniformLocation(this._program, "uMaxBackgroundBlur");
	        this._samplerUniform1 = gl.getUniformLocation(this._program, "uSampler1");
	        this._samplerUniform2 = gl.getUniformLocation(this._program, "uSampler2");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform4f(this._viewportUniform, this.left, this.top, this.width, this.height);
	        this._gl.uniform1f(this._focusDepthUniform, this.focusDepth);
	        this._gl.uniform1f(this._nearFocusDepthUniform, this.nearFocusDepth);
	        this._gl.uniform1f(this._farFocusDepthUniform, this.farFocusDepth);
	        this._gl.uniform1f(this._maxBackgroundBlurUniform, this.maxBackgroundBlur);
	        this._gl.uniform1i(this._samplerUniform1, 0);
	        this._gl.uniform1i(this._samplerUniform2, 1);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionVertex.SIZE_BYTES, 0);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D1);
	        this._gl.activeTexture(this._gl.TEXTURE1);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D2);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Downsample extends ShaderBase {
	    get texture2D() { return this._texture2D; }
	    set texture2D(value) {
	        if (this._texture2D != value) {
	            this._texture2D = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("simple.vertex.fx", "downsample.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._viewportUniform = gl.getUniformLocation(this._program, "uViewport");
	        this._samplerUniform = gl.getUniformLocation(this._program, "uSampler");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform4f(this._viewportUniform, this.left, this.top, this.width, this.height);
	        this._gl.uniform1i(this._samplerUniform, 0);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionVertex.SIZE_BYTES, 0);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Gaussian extends ShaderBase {
	    get texture2D() { return this._texture2D; }
	    set texture2D(value) {
	        if (this._texture2D != value) {
	            this._texture2D = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("simple.vertex.fx", "gaussian.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._samplerUniform = gl.getUniformLocation(this._program, "uSampler");
	        this._resolutionUniform = gl.getUniformLocation(this._program, "uResolution");
	        this._horizontalUniform = gl.getUniformLocation(this._program, "uHorizontal");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform1i(this._samplerUniform, 0);
	        this._gl.uniform2f(this._resolutionUniform, this.width, this.height);
	        this._gl.uniform1i(this._horizontalUniform, this.horizontal ? 1 : 0);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionVertex.SIZE_BYTES, 0);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class DofCombine extends ShaderBase {
	    get texture2D1() { return this._texture2D1; }
	    set texture2D1(value) {
	        if (this._texture2D1 != value) {
	            this._texture2D1 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get texture2D2() { return this._texture2D2; }
	    set texture2D2(value) {
	        if (this._texture2D2 != value) {
	            this._texture2D2 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    get texture2D3() { return this._texture2D3; }
	    set texture2D3(value) {
	        if (this._texture2D3 != value) {
	            this._texture2D3 = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("simple.vertex.fx", "dofcombine.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._viewportUniform = gl.getUniformLocation(this._program, "uViewport");
	        this._focusDepthUniform = gl.getUniformLocation(this._program, "uFocusDepth");
	        this._apertureUniform = gl.getUniformLocation(this._program, "uAperture");
	        this._samplerUniform1 = gl.getUniformLocation(this._program, "uSampler1");
	        this._samplerUniform2 = gl.getUniformLocation(this._program, "uSampler2");
	        this._samplerUniform3 = gl.getUniformLocation(this._program, "uSampler3");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform4f(this._viewportUniform, this.left, this.top, this.width, this.height);
	        this._gl.uniform1f(this._focusDepthUniform, this.focusDepth);
	        this._gl.uniform1f(this._apertureUniform, this.aperture);
	        this._gl.uniform1i(this._samplerUniform1, 0);
	        this._gl.uniform1i(this._samplerUniform2, 1);
	        this._gl.uniform1i(this._samplerUniform3, 2);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionVertex.SIZE_BYTES, 0);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D1);
	        this._gl.activeTexture(this._gl.TEXTURE1);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D2);
	        this._gl.activeTexture(this._gl.TEXTURE2);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D3);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Fxaa extends ShaderBase {
	    get texture2D() { return this._texture2D; }
	    set texture2D(value) {
	        if (this._texture2D != value) {
	            this._texture2D = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("simple.vertex.fx", "fxaa.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._viewportUniform = gl.getUniformLocation(this._program, "uViewport");
	        this._samplerUniform = gl.getUniformLocation(this._program, "uSampler");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform4f(this._viewportUniform, this.left, this.top, this.width, this.height);
	        this._gl.uniform1i(this._samplerUniform, 0);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionVertex.SIZE_BYTES, 0);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Bright extends ShaderBase {
	    get texture2D() { return this._texture2D; }
	    set texture2D(value) {
	        if (this._texture2D != value) {
	            this._texture2D = value;
	            this._haveTexturesChanged = true;
	        }
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        if (this._isLoaded) {
	            this._initializeShader(gl, this._vsSource, this._fsSource);
	        }
	        else {
	            this._shaderFromFile("simple.vertex.fx", "bright.fragment.fx", (vsSource, fsSource) => {
	                this._vsSource = vsSource;
	                this._fsSource = fsSource;
	                this._isLoaded = true;
	                this._initializeShader(gl, vsSource, fsSource);
	            });
	        }
	    }
	    _initializeShader(gl, vsSource, fsSource) {
	        const vs = this._compileShader(vsSource, gl.VERTEX_SHADER);
	        const fs = this._compileShader(fsSource, gl.FRAGMENT_SHADER);
	        this._program = this._createProgram(vs, fs);
	        this._positionAttribute = gl.getAttribLocation(this._program, "aPosition");
	        this._samplerUniform = gl.getUniformLocation(this._program, "uSampler");
	        this._resolutionUniform = gl.getUniformLocation(this._program, "uResolution");
	        this._isInitialized = true;
	    }
	    apply() {
	        this._gl.uniform1i(this._samplerUniform, 0);
	        this._gl.uniform2f(this._resolutionUniform, this.width, this.height);
	    }
	    updateBuffers() {
	        super.updateBuffers();
	        super.updateBuffers();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	        this._gl.vertexAttribPointer(this._positionAttribute, 3, this._gl.FLOAT, false, PositionVertex.SIZE_BYTES, 0);
	        this._gl.enableVertexAttribArray(this._positionAttribute);
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	    }
	    updateTextures() {
	        super.updateTextures();
	        this._gl.activeTexture(this._gl.TEXTURE0);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture2D);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class AxesVisualBase {
	    get isInitialized() { return this._isInitialized; }
	    get axes() { return this._axes; }
	    constructor(core) {
	        this._core = core;
	        this.isVisible = true;
	    }
	    initializeContext(gl) {
	        this._gl = gl;
	    }
	    update(elapsedTime) { }
	    render(elapsedTime, xrFrame) {
	        if (this.isInitialized) {
	            this._renderGrid();
	            this._renderText();
	        }
	    }
	    _renderGrid() { }
	    _renderText() { }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Cartesian2dVisual extends AxesVisualBase {
	    get isInitialized() { return this._isInitialized && this._main.gridShader.isInitialized && this._main.sdfTextShader.isInitialized && this._main.fonts[this._axes.font.name].isInitialized; }
	    constructor(core, main, cartesian2dAxes) {
	        super(core);
	        this._main = main;
	        this._axes = cartesian2dAxes;
	        this._axes.hasChangedCallback = () => { this._hasChanged = true; };
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        const axes = this._axes;
	        if (!axes.isInitialized) {
	            axes.initialize();
	        }
	        if (axes.gridVertices) {
	            this._createGridBuffers();
	        }
	        if (axes.textVertices) {
	            this._createTextBuffers();
	        }
	        this._isInitialized = true;
	    }
	    _createGridBuffers() {
	        const axes = this._axes;
	        this._gridVertexBuffer = this._gl.createBuffer();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._gridVertexBuffer);
	        this._gl.bufferData(this._gl.ARRAY_BUFFER, axes.gridVertices, this._gl.STATIC_DRAW);
	        this._gridIndexBuffer = this._gl.createBuffer();
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._gridIndexBuffer);
	        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, axes.gridIndices, this._gl.STATIC_DRAW);
	        this._gridBufferSize = axes.gridVertices.byteLength;
	        this._core.log.write(LogLevel.info, `cartesian2d visual grid buffers created`);
	    }
	    _createTextBuffers() {
	        const axes = this._axes;
	        this._textVertexBuffer = this._gl.createBuffer();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textVertexBuffer);
	        this._gl.bufferData(this._gl.ARRAY_BUFFER, axes.textVertices, this._gl.STATIC_DRAW);
	        this._textIndexBuffer = this._gl.createBuffer();
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._textIndexBuffer);
	        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, axes.textIndices, this._gl.STATIC_DRAW);
	        this._textBufferSize = axes.textVertices.byteLength;
	        this._core.log.write(LogLevel.info, `cartesian2d visual text buffers created`);
	    }
	    update(elapsedTime) {
	        if (this._hasChanged) {
	            this._hasChanged = false;
	            const axes = this._axes;
	            if (!this._gridVertexBuffer || axes.gridVertices.byteLength > this._gridBufferSize) {
	                this._createGridBuffers();
	            }
	            else {
	                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._gridVertexBuffer);
	                this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, axes.gridVertices);
	                this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._gridIndexBuffer);
	                this._gl.bufferSubData(this._gl.ELEMENT_ARRAY_BUFFER, 0, axes.gridIndices);
	                this._core.log.write(LogLevel.info, `cartesian2d visual grid buffers updated`);
	            }
	            if (!this._textVertexBuffer || axes.textVertices.byteLength > this._textBufferSize) {
	                this._createTextBuffers();
	            }
	            else {
	                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textVertexBuffer);
	                this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, axes.textVertices);
	                this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._textIndexBuffer);
	                this._gl.bufferSubData(this._gl.ELEMENT_ARRAY_BUFFER, 0, axes.textIndices);
	                this._core.log.write(LogLevel.info, `cartesian2d visual text buffers updated`);
	            }
	            this._main.shaderResources.currentProgram = null;
	        }
	    }
	    _renderText() {
	        const shader = this._main.sdfTextShader;
	        const shaderResources = this._main.shaderResources;
	        const axes = this._axes;
	        const fontVisual = this._main.fonts[axes.font.name];
	        shader.vertexBuffer = this._textVertexBuffer;
	        shader.indexBuffer = this._textIndexBuffer;
	        shader.texture2D = fontVisual.texture;
	        shader.prepare();
	        shader.buffer = fontVisual.font.edgeValue / 0xff;
	        shader.gamma = axes.gamma;
	        shader.borderWidth = axes.textBorderWidth;
	        shader.color = axes.textColor || this._core.config.axesTextColor;
	        shader.hoverColor = axes.textHoverColor || this._core.config.axesTextHoverColor;
	        shader.borderColor = axes.textBorderColor || this._core.config.textBorderColor;
	        shader.pickedIdColor = this.pickedIdColor;
	        shader.apply();
	        let indexCount, indexOffset;
	        for (let axisId = 0; axisId < 2; axisId++) {
	            const orientation = axes.getLabelOrientation(axisId);
	            for (let edge = 0; edge < 2; edge++) {
	                const edgeId = Quad$2.AXIS_EDGES[axisId][edge];
	                if (axes.isEdgeVisible[edgeId]) {
	                    if ((orientation == AxesTextOrientation.parallel && axes.getIsLeftToRightHorizontal(edgeId)) || (orientation == AxesTextOrientation.perpendicular && axes.getIsLeftToRightVertical(edgeId))) {
	                        indexCount = axes.getAxesLeftToRightIndexCount(axisId);
	                        indexOffset = axes.getAxesLeftToRightIndexOffset(axisId);
	                    }
	                    else {
	                        indexCount = axes.getAxesRightToLeftIndexCount(axisId);
	                        indexOffset = axes.getAxesRightToLeftIndexOffset(axisId);
	                    }
	                    if (indexCount > 0) {
	                        shader.mMatrix = axes.getLabelMMatrix(edgeId);
	                        shader.applyModel();
	                        shader.isPickShader = false;
	                        shaderResources.bindFramebuffer(this.geometryFramebuffer);
	                        for (let i = 0; i < this.viewportCount; i++) {
	                            const viewport = i + this.viewportOffset;
	                            this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                            shader.vMatrix = this.vMatrices[viewport];
	                            shader.pMatrix = this.pMatrices[viewport];
	                            shader.applyView();
	                            this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                        }
	                        if (this.isPickingEnabled && axes.isLabelPickingEnabled[axisId]) {
	                            shader.isPickShader = true;
	                            shader.pMatrix = this.pickPMatrix;
	                            shader.vMatrix = this.pickVMatrix;
	                            shader.applyView();
	                            shaderResources.bindFramebuffer(this.pickFramebuffer);
	                            this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                            this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                        }
	                    }
	                    indexCount = axes.getTitleIndexCount(axisId);
	                    if (indexCount > 0) {
	                        indexOffset = axes.getTitleIndexOffset(axisId);
	                        shader.mMatrix = axes.getTitleMMatrix(edgeId);
	                        shader.applyModel();
	                        shader.isPickShader = false;
	                        shaderResources.bindFramebuffer(this.geometryFramebuffer);
	                        for (let i = 0; i < this.viewportCount; i++) {
	                            const viewport = i + this.viewportOffset;
	                            this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                            shader.vMatrix = this.vMatrices[viewport];
	                            shader.pMatrix = this.pMatrices[viewport];
	                            shader.applyView();
	                            this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                        }
	                        if (this.isPickingEnabled && axes.isTitlePickingEnabled[axisId]) {
	                            shader.isPickShader = true;
	                            shader.pMatrix = this.pickPMatrix;
	                            shader.vMatrix = this.pickVMatrix;
	                            shader.applyView();
	                            shaderResources.bindFramebuffer(this.pickFramebuffer);
	                            this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                            this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                        }
	                    }
	                }
	                indexCount = axes.getHeadingIndexCount(axisId);
	                if (indexCount > 0 && axes.isHeadingVisible[edgeId]) {
	                    indexOffset = axes.getHeadingIndexOffset(axisId);
	                    shader.mMatrix = axes.getHeadingMMatrix(edgeId);
	                    shader.applyModel();
	                    shader.isPickShader = false;
	                    shaderResources.bindFramebuffer(this.geometryFramebuffer);
	                    for (let i = 0; i < this.viewportCount; i++) {
	                        const viewport = i + this.viewportOffset;
	                        this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                        shader.vMatrix = this.vMatrices[viewport];
	                        shader.pMatrix = this.pMatrices[viewport];
	                        shader.applyView();
	                        this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                    }
	                    if (this.isPickingEnabled && axes.isHeadingPickingEnabled[axisId]) {
	                        shader.isPickShader = true;
	                        shader.pMatrix = this.pickPMatrix;
	                        shader.vMatrix = this.pickVMatrix;
	                        shader.applyView();
	                        shaderResources.bindFramebuffer(this.pickFramebuffer);
	                        this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                        this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                    }
	                }
	            }
	        }
	    }
	    _renderGrid() {
	        const gridShader = this._main.gridShader;
	        const axes = this._axes;
	        gridShader.vertexBuffer = this._gridVertexBuffer;
	        gridShader.indexBuffer = this._gridIndexBuffer;
	        gridShader.prepare();
	        gridShader.majorThickness = axes.gridMajorThickness;
	        gridShader.minorThickness = axes.gridMinorThickness;
	        gridShader.zeroThickness = axes.gridZeroThickness;
	        gridShader.backgroundColor = axes.gridBackgroundColor || this._core.config.axesGridBackgroundColor;
	        gridShader.highlightColor = axes.gridHighlightColor || this._core.config.axesGridHighlightColor;
	        gridShader.majorColor = axes.gridMajorColor || this._core.config.axesGridMajorColor;
	        gridShader.minorColor = axes.gridMinorColor || this._core.config.axesGridMinorColor;
	        gridShader.zeroColor = axes.gridZeroColor || this._core.config.axesGridZeroColor;
	        gridShader.pickedIdColor = this.pickedIdColor;
	        gridShader.apply();
	        for (let axisId = 0; axisId < 2; axisId++) {
	            if (axes.arePickDivisionsVisible[axisId]) {
	                const gridTicksScale = axes.getGridTicksScale(axisId);
	                const width = gridTicksScale[0];
	                const height = gridTicksScale[1];
	                gridShader.zero = axes.getGridTicksZero(axisId);
	                gridShader.minorGridlines = axes.getGridTicksMinorGridlines(axisId);
	                for (let edge = 0; edge < 2; edge++) {
	                    const edgeId = Quad$2.AXIS_EDGES[axisId][edge];
	                    if (axes.isEdgeVisible[edgeId]) {
	                        this._renderGridTicks(axisId, edgeId, width, height);
	                    }
	                }
	            }
	        }
	        this._gl.disable(this._gl.CULL_FACE);
	        const size = axes.size;
	        const axisId2 = 0;
	        const axisId3 = 1;
	        const width = size[axisId2];
	        const height = size[axisId3];
	        gridShader.zero = axes.gridFaceZero;
	        gridShader.minorGridlines = axes.gridFaceMinorGridlines;
	        for (let face = 0; face < 2; face++) {
	            const faceId = face;
	            if (axes.getIsForwardFace(faceId)) {
	                this._renderGridFace(faceId, width, height);
	            }
	        }
	        this._gl.enable(this._gl.CULL_FACE);
	    }
	    _renderGridTicks(axisId, edgeId, width, height) {
	        const gridShader = this._main.gridShader;
	        const shaderResources = this._main.shaderResources;
	        const axes = this._axes;
	        gridShader.mMatrix = axes.getGridTicksMMatrix(edgeId);
	        gridShader.faceWidth = width;
	        gridShader.faceHeight = height;
	        gridShader.ApplyFace();
	        gridShader.isPickShader = false;
	        shaderResources.bindFramebuffer(this.geometryFramebuffer);
	        for (let i = 0; i < this.viewportCount; i++) {
	            const viewport = i + this.viewportOffset;
	            this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	            gridShader.vMatrix = this.vMatrices[viewport];
	            gridShader.pMatrix = this.pMatrices[viewport];
	            gridShader.applyView();
	            this._gl.drawElements(this._gl.TRIANGLES, axes.getGridTicksIndexCount(axisId), this._gl.UNSIGNED_SHORT, axes.getGridTicksIndexOffset(axisId) * 2);
	        }
	        if (this.isPickingEnabled && axes.isDivisionPickingEnabled[axisId]) {
	            gridShader.isPickShader = true;
	            gridShader.vMatrix = this.pickVMatrix;
	            gridShader.pMatrix = this.pickPMatrix;
	            gridShader.applyView();
	            shaderResources.bindFramebuffer(this.pickFramebuffer);
	            this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	            this._gl.drawElements(this._gl.TRIANGLES, axes.getGridTicksIndexCount(axisId), this._gl.UNSIGNED_SHORT, axes.getGridTicksIndexOffset(axisId) * 2);
	        }
	    }
	    _renderGridFace(faceId, width, height) {
	        const gridShader = this._main.gridShader;
	        const shaderResources = this._main.shaderResources;
	        const axes = this._axes;
	        gridShader.mMatrix = axes.getGridFaceMMatrix(faceId);
	        gridShader.faceWidth = width;
	        gridShader.faceHeight = height;
	        gridShader.ApplyFace();
	        gridShader.isPickShader = false;
	        shaderResources.bindFramebuffer(this.geometryFramebuffer);
	        for (let i = 0; i < this.viewportCount; i++) {
	            const viewport = i + this.viewportOffset;
	            this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	            gridShader.vMatrix = this.vMatrices[viewport];
	            gridShader.pMatrix = this.pMatrices[viewport];
	            gridShader.applyView();
	            this._gl.drawElements(this._gl.TRIANGLES, axes.getGridFaceIndexCount(faceId), this._gl.UNSIGNED_SHORT, axes.getGridFaceIndexOffset(faceId) * 2);
	        }
	        if (this.isPickingEnabled && axes.isGridPickingEnabled) {
	            gridShader.isPickShader = true;
	            gridShader.vMatrix = this.pickVMatrix;
	            gridShader.pMatrix = this.pickPMatrix;
	            gridShader.applyView();
	            shaderResources.bindFramebuffer(this.pickFramebuffer);
	            this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	            this._gl.drawElements(this._gl.TRIANGLES, axes.getGridFaceIndexCount(faceId), this._gl.UNSIGNED_SHORT, axes.getGridFaceIndexOffset(faceId) * 2);
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Cartesian3dVisual extends AxesVisualBase {
	    get isInitialized() { return this._isInitialized && this._main.gridShader.isInitialized && this._main.sdfTextShader.isInitialized && this._main.fonts[this._axes.font.name].isInitialized; }
	    constructor(core, main, cartesian3dAxes) {
	        super(core);
	        this._main = main;
	        this._axes = cartesian3dAxes;
	        this._axes.hasChangedCallback = () => { this._hasChanged = true; };
	    }
	    initializeContext(gl) {
	        super.initializeContext(gl);
	        const axes = this._axes;
	        if (!axes.isInitialized) {
	            axes.initialize();
	        }
	        if (axes.gridVertices) {
	            this._createGridBuffers();
	        }
	        if (axes.textVertices) {
	            this._createTextBuffers();
	        }
	        this._isInitialized = true;
	    }
	    _createGridBuffers() {
	        const axes = this._axes;
	        this._gridVertexBuffer = this._gl.createBuffer();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._gridVertexBuffer);
	        this._gl.bufferData(this._gl.ARRAY_BUFFER, axes.gridVertices, this._gl.STATIC_DRAW);
	        this._gridIndexBuffer = this._gl.createBuffer();
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._gridIndexBuffer);
	        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, axes.gridIndices, this._gl.STATIC_DRAW);
	        this._gridBufferSize = axes.gridVertices.byteLength;
	        this._core.log.write(LogLevel.info, `cartesian3d visual grid buffers created`);
	    }
	    _createTextBuffers() {
	        const axes = this._axes;
	        this._textVertexBuffer = this._gl.createBuffer();
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textVertexBuffer);
	        this._gl.bufferData(this._gl.ARRAY_BUFFER, axes.textVertices, this._gl.STATIC_DRAW);
	        this._textIndexBuffer = this._gl.createBuffer();
	        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._textIndexBuffer);
	        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, axes.textIndices, this._gl.STATIC_DRAW);
	        this._textBufferSize = axes.textVertices.byteLength;
	        this._core.log.write(LogLevel.info, `cartesian3d visual text buffers created`);
	    }
	    update(elapsedTime) {
	        if (this._hasChanged) {
	            this._hasChanged = false;
	            const axes = this._axes;
	            if (!this._gridVertexBuffer || axes.gridVertices.byteLength > this._gridBufferSize) {
	                this._createGridBuffers();
	            }
	            else {
	                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._gridVertexBuffer);
	                this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, axes.gridVertices);
	                this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._gridIndexBuffer);
	                this._gl.bufferSubData(this._gl.ELEMENT_ARRAY_BUFFER, 0, axes.gridIndices);
	                this._core.log.write(LogLevel.info, `cartesian3d visual grid buffers updated`);
	            }
	            if (!this._textVertexBuffer || axes.textVertices.byteLength > this._textBufferSize) {
	                this._createTextBuffers();
	            }
	            else {
	                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textVertexBuffer);
	                this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, axes.textVertices);
	                this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._textIndexBuffer);
	                this._gl.bufferSubData(this._gl.ELEMENT_ARRAY_BUFFER, 0, axes.textIndices);
	                this._core.log.write(LogLevel.info, `cartesian3d visual text buffers updated`);
	            }
	            this._main.shaderResources.currentProgram = null;
	        }
	    }
	    _renderText() {
	        const axes = this._axes;
	        const shader = this._main.sdfTextShader;
	        const shaderResources = this._main.shaderResources;
	        const fontVisual = this._main.fonts[axes.font.name];
	        shader.vertexBuffer = this._textVertexBuffer;
	        shader.indexBuffer = this._textIndexBuffer;
	        shader.texture2D = fontVisual.texture;
	        shader.prepare();
	        shader.buffer = fontVisual.font.edgeValue / 0xff;
	        shader.gamma = axes.gamma;
	        shader.borderWidth = axes.textBorderWidth;
	        shader.color = axes.textColor || this._core.config.axesTextColor;
	        shader.hoverColor = axes.textHoverColor || this._core.config.axesTextHoverColor;
	        shader.borderColor = axes.textBorderColor || this._core.config.textBorderColor;
	        shader.pickedIdColor = this.pickedIdColor;
	        shader.apply();
	        let indexCount, indexOffset;
	        for (let axisId = 0; axisId < 3; axisId++) {
	            const orientation = axes.getLabelOrientation(axisId);
	            for (let edge = 0; edge < 4; edge++) {
	                const edgeId = Cube.AXIS_EDGES[axisId][edge];
	                if (axes.getIsOutsideEdge(edgeId)) {
	                    if (axes.isEdgeVisible[edgeId]) {
	                        if ((orientation == AxesTextOrientation.parallel && axes.getIsLeftToRightHorizontal(edgeId)) || (orientation == AxesTextOrientation.perpendicular && axes.getIsLeftToRightVertical(edgeId))) {
	                            indexCount = axes.getAxesLeftToRightIndexCount(axisId);
	                            indexOffset = axes.getAxesLeftToRightIndexOffset(axisId);
	                        }
	                        else {
	                            indexCount = axes.getAxesRightToLeftIndexCount(axisId);
	                            indexOffset = axes.getAxesRightToLeftIndexOffset(axisId);
	                        }
	                        if (indexCount > 0) {
	                            shader.mMatrix = axes.getLabelMMatrix(edgeId);
	                            shader.applyModel();
	                            shader.isPickShader = false;
	                            shaderResources.bindFramebuffer(this.geometryFramebuffer);
	                            for (let i = 0; i < this.viewportCount; i++) {
	                                const viewport = i + this.viewportOffset;
	                                this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                                shader.vMatrix = this.vMatrices[viewport];
	                                shader.pMatrix = this.pMatrices[viewport];
	                                shader.applyView();
	                                this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                            }
	                            if (this.isPickingEnabled && axes.isLabelPickingEnabled[axisId]) {
	                                shader.isPickShader = true;
	                                shader.pMatrix = this.pickPMatrix;
	                                shader.vMatrix = this.pickVMatrix;
	                                shader.applyView();
	                                shaderResources.bindFramebuffer(this.pickFramebuffer);
	                                this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                                this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                            }
	                        }
	                        indexCount = axes.getTitleIndexCount(axisId);
	                        if (indexCount > 0) {
	                            indexOffset = axes.getTitleIndexOffset(axisId);
	                            shader.mMatrix = axes.getTitleMMatrix(edgeId);
	                            shader.applyModel();
	                            shader.isPickShader = false;
	                            shaderResources.bindFramebuffer(this.geometryFramebuffer);
	                            for (let i = 0; i < this.viewportCount; i++) {
	                                const viewport = i + this.viewportOffset;
	                                this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                                shader.vMatrix = this.vMatrices[viewport];
	                                shader.pMatrix = this.pMatrices[viewport];
	                                shader.applyView();
	                                this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                            }
	                            if (this.isPickingEnabled && axes.isTitlePickingEnabled[axisId]) {
	                                shader.isPickShader = true;
	                                shader.pMatrix = this.pickPMatrix;
	                                shader.vMatrix = this.pickVMatrix;
	                                shader.applyView();
	                                shaderResources.bindFramebuffer(this.pickFramebuffer);
	                                this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                                this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                            }
	                        }
	                    }
	                    indexCount = axes.getHeadingIndexCount(axisId);
	                    if (indexCount > 0 && axes.isHeadingVisible[edgeId]) {
	                        indexOffset = axes.getHeadingIndexOffset(axisId);
	                        shader.mMatrix = axes.getHeadingMMatrix(edgeId);
	                        shader.applyModel();
	                        shader.isPickShader = false;
	                        shaderResources.bindFramebuffer(this.geometryFramebuffer);
	                        for (let i = 0; i < this.viewportCount; i++) {
	                            const viewport = i + this.viewportOffset;
	                            this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                            shader.vMatrix = this.vMatrices[viewport];
	                            shader.pMatrix = this.pMatrices[viewport];
	                            shader.applyView();
	                            this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                        }
	                        if (this.isPickingEnabled && axes.isHeadingPickingEnabled[axisId]) {
	                            shader.isPickShader = true;
	                            shader.pMatrix = this.pickPMatrix;
	                            shader.vMatrix = this.pickVMatrix;
	                            shader.applyView();
	                            shaderResources.bindFramebuffer(this.pickFramebuffer);
	                            this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                            this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, indexOffset * 2);
	                        }
	                    }
	                }
	            }
	        }
	    }
	    _renderGrid() {
	        const axes = this._axes;
	        const gridShader = this._main.gridShader;
	        gridShader.vertexBuffer = this._gridVertexBuffer;
	        gridShader.indexBuffer = this._gridIndexBuffer;
	        gridShader.prepare();
	        gridShader.majorThickness = axes.gridMajorThickness;
	        gridShader.minorThickness = axes.gridMinorThickness;
	        gridShader.zeroThickness = axes.gridZeroThickness;
	        gridShader.backgroundColor = axes.gridBackgroundColor || this._core.config.axesGridBackgroundColor;
	        gridShader.highlightColor = axes.gridHighlightColor || this._core.config.axesGridHighlightColor;
	        gridShader.majorColor = axes.gridMajorColor || this._core.config.axesGridMajorColor;
	        gridShader.minorColor = axes.gridMinorColor || this._core.config.axesGridMinorColor;
	        gridShader.zeroColor = axes.gridZeroColor || this._core.config.axesGridZeroColor;
	        gridShader.pickedIdColor = this.pickedIdColor;
	        gridShader.apply();
	        for (let axisId = 0; axisId < 3; axisId++) {
	            if (axes.arePickDivisionsVisible[axisId]) {
	                const gridTicksScale = axes.getGridTicksScale(axisId);
	                const width = gridTicksScale[0];
	                const height = gridTicksScale[1];
	                gridShader.zero = axes.getGridTicksZero(axisId);
	                gridShader.minorGridlines = axes.getGridTicksMinorGridlines(axisId);
	                for (let edge = 0; edge < 4; edge++) {
	                    const edgeId = Cube.AXIS_EDGES[axisId][edge];
	                    if (axes.getIsOutsideEdge(edgeId) && axes.isEdgeVisible[edgeId]) {
	                        this._renderGridTicks(axisId, edgeId, width, height);
	                    }
	                }
	            }
	        }
	        this._gl.disable(this._gl.CULL_FACE);
	        const size = axes.size;
	        for (let axisId = 0; axisId < 3; axisId++) {
	            if (axes.areFacesVisible[axisId]) {
	                const axisId2 = axisId == 0 ? 1 : 0;
	                const axisId3 = axisId == 2 ? 1 : 2;
	                const width = size[axisId2];
	                const height = size[axisId3];
	                gridShader.zero = axes.getGridFaceZero(axisId);
	                gridShader.minorGridlines = axes.getGridFaceMinorGridlines(axisId);
	                for (let face = 0; face < 2; face++) {
	                    const faceId = Cube.AXIS_FACES[axisId][face];
	                    if (axes.getIsForwardFace(faceId) && axes.isFaceVisible[faceId]) {
	                        this._renderGridFace(faceId, width, height);
	                    }
	                }
	            }
	        }
	        this._gl.enable(this._gl.CULL_FACE);
	    }
	    _renderGridTicks(axisId, edgeId, width, height) {
	        const axes = this._axes;
	        const gridShader = this._main.gridShader;
	        const shaderResources = this._main.shaderResources;
	        gridShader.mMatrix = axes.getGridTicksMMatrix(edgeId);
	        gridShader.faceWidth = width;
	        gridShader.faceHeight = height;
	        gridShader.ApplyFace();
	        gridShader.isPickShader = false;
	        shaderResources.bindFramebuffer(this.geometryFramebuffer);
	        for (let i = 0; i < this.viewportCount; i++) {
	            const viewport = i + this.viewportOffset;
	            this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	            gridShader.vMatrix = this.vMatrices[viewport];
	            gridShader.pMatrix = this.pMatrices[viewport];
	            gridShader.applyView();
	            this._gl.drawElements(this._gl.TRIANGLES, axes.getGridTicksIndexCount(axisId), this._gl.UNSIGNED_SHORT, axes.getGridTicksIndexOffset(axisId) * 2);
	        }
	        if (this.isPickingEnabled && axes.isDivisionPickingEnabled[axisId]) {
	            gridShader.isPickShader = true;
	            gridShader.vMatrix = this.pickVMatrix;
	            gridShader.pMatrix = this.pickPMatrix;
	            gridShader.applyView();
	            shaderResources.bindFramebuffer(this.pickFramebuffer);
	            this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	            this._gl.drawElements(this._gl.TRIANGLES, axes.getGridTicksIndexCount(axisId), this._gl.UNSIGNED_SHORT, axes.getGridTicksIndexOffset(axisId) * 2);
	        }
	    }
	    _renderGridFace(faceId, width, height) {
	        const axes = this._axes;
	        const gridShader = this._main.gridShader;
	        const shaderResources = this._main.shaderResources;
	        gridShader.mMatrix = axes.getGridFaceMMatrix(faceId);
	        gridShader.faceWidth = width;
	        gridShader.faceHeight = height;
	        gridShader.ApplyFace();
	        gridShader.isPickShader = false;
	        shaderResources.bindFramebuffer(this.geometryFramebuffer);
	        for (let i = 0; i < this.viewportCount; i++) {
	            const viewport = i + this.viewportOffset;
	            this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	            gridShader.vMatrix = this.vMatrices[viewport];
	            gridShader.pMatrix = this.pMatrices[viewport];
	            gridShader.applyView();
	            this._gl.drawElements(this._gl.TRIANGLES, axes.getGridFaceIndexCount(faceId), this._gl.UNSIGNED_SHORT, axes.getGridFaceIndexOffset(faceId) * 2);
	        }
	        if (this.isPickingEnabled && axes.isGridPickingEnabled) {
	            gridShader.isPickShader = true;
	            gridShader.vMatrix = this.pickVMatrix;
	            gridShader.pMatrix = this.pickPMatrix;
	            gridShader.applyView();
	            shaderResources.bindFramebuffer(this.pickFramebuffer);
	            this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	            this._gl.drawElements(this._gl.TRIANGLES, axes.getGridFaceIndexCount(faceId), this._gl.UNSIGNED_SHORT, axes.getGridFaceIndexOffset(faceId) * 2);
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class FontVisual {
	    get isInitialized() { return this._isInitialized; }
	    get font() { return this._font; }
	    constructor(core, font) {
	        this._core = core;
	        this._font = font;
	        font.hasChangedCallback = () => { this._hasChanged = true; };
	    }
	    initializeContext(gl) {
	        this._gl = gl;
	        this._isInitialized = true;
	        if (this._font.count > 0) {
	            this._hasChanged = true;
	        }
	    }
	    update() {
	        if (this._hasChanged && this._isInitialized) {
	            this._hasChanged = false;
	            this.texture = TextureHelper.fromImage(this._gl, this._font.atlas.imageData, false, this._gl.LINEAR);
	            this._core.log.write(LogLevel.info, `${this._font.name} texture updated`);
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class LabelVisualBase {
	    get isInitialized() { return this._isInitialized && this._main.sdfTextShader.isInitialized && this._main.fonts[this._label.font.name].isInitialized; }
	    constructor(core, main, label) {
	        this._core = core;
	        this._main = main;
	        this._label = label;
	        this._label.hasChangedCallback = () => { this._hasChanged = true; };
	        this._mMatrix = create$4();
	        this.mMatrix = create$4();
	        this.isVisible = true;
	    }
	    initializeContext(gl) {
	        if (!this._label.isInitialized) {
	            this._label.initialize();
	        }
	        this._gl = gl;
	        this._vertexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, this._label.vertices, gl.STATIC_DRAW);
	        this._indexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._label.indices, gl.STATIC_DRAW);
	        this._isInitialized = true;
	    }
	    update(elapsedTime) {
	        if (this._hasChanged) {
	            this._hasChanged = false;
	            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	            this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, this._label.vertices);
	            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	            this._gl.bufferSubData(this._gl.ELEMENT_ARRAY_BUFFER, 0, this._label.indices);
	        }
	    }
	    render(elapsedTime, xrFrame) {
	        if (this.isInitialized) {
	            const indexCount = this._label.indexCount;
	            if (indexCount > 0) {
	                const shader = this._main.sdfTextShader;
	                const fontVisual = this._main.fonts[this._label.font.name];
	                shader.vertexBuffer = this._vertexBuffer;
	                shader.indexBuffer = this._indexBuffer;
	                shader.texture2D = fontVisual.texture;
	                shader.prepare();
	                shader.gamma = this._label.gamma;
	                shader.buffer = fontVisual.font.edgeValue / 0xff;
	                shader.borderWidth = this._label.borderWidth;
	                shader.color = this._label.color || this._core.config.textColor;
	                shader.borderColor = this._label.borderColor || this._core.config.textBorderColor;
	                shader.hoverColor = this._label.hoverColor || this._core.config.textHoverColor;
	                shader.pickedIdColor = this.pickedIdColor;
	                shader.apply();
	                multiply$2(this._mMatrix, this.mMatrix, this._label.mMatrix);
	                shader.mMatrix = this._mMatrix;
	                shader.applyModel();
	                shader.isPickShader = false;
	                this._main.shaderResources.bindFramebuffer(this.geometryFramebuffer);
	                for (let i = 0; i < this.viewportCount; i++) {
	                    const viewport = i + this.viewportOffset;
	                    this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                    shader.vMatrix = this.vMatrices[viewport];
	                    shader.pMatrix = this.pMatrices[viewport];
	                    shader.applyView();
	                    this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, 0);
	                }
	                if (this.isPickingEnabled) {
	                    shader.isPickShader = true;
	                    shader.pMatrix = this.pickPMatrix;
	                    shader.vMatrix = this.pickVMatrix;
	                    shader.applyView();
	                    this._main.shaderResources.bindFramebuffer(this.pickFramebuffer);
	                    this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                    this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, 0);
	                }
	            }
	        }
	    }
	}
	class LabelVisual extends LabelVisualBase {
	    get label() { return this._label; }
	    set text(value) { this._label.text = value; }
	    get text() { return this._label.text; }
	    constructor(core, main, label) {
	        super(core, main, label);
	    }
	}
	class LabelSetVisual extends LabelVisualBase {
	    get label() { return this._label; }
	    constructor(core, main, label) {
	        super(core, main, label);
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class ImageVisual {
	    get isInitialized() { return this._isInitialized && this._main.textureShader.isInitialized; }
	    get image() { return this._image; }
	    constructor(core, main, image) {
	        this._core = core;
	        this._main = main;
	        this._image = image;
	        this._image.hasChangedCallback = () => { this._hasChanged = true; };
	        this.mMatrix = create$4();
	        this.isVisible = true;
	    }
	    initializeContext(gl) {
	        if (!this._image.isInitialized) {
	            this._image.initialize();
	        }
	        this._gl = gl;
	        if (this._image.imageData) {
	            this.texture = TextureHelper.fromImage(gl, this._image.imageData, false, gl.LINEAR);
	        }
	        this._vertexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, this._image.vertices, gl.STATIC_DRAW);
	        this._indexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._image.indices, gl.STATIC_DRAW);
	        this._isInitialized = true;
	    }
	    update(elapsedTime) {
	        if (this._hasChanged) {
	            this._hasChanged = false;
	            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	            this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, this._image.vertices);
	            this._main.shaderResources.currentProgram = null;
	        }
	    }
	    render(elapsedTime, xrFrame) {
	        if (this.isInitialized) {
	            const textureShader = this._main.textureShader;
	            textureShader.vertexBuffer = this._vertexBuffer;
	            textureShader.indexBuffer = this._indexBuffer;
	            textureShader.texture2D = this.texture;
	            textureShader.prepare();
	            textureShader.mMatrix = this.mMatrix;
	            textureShader.apply();
	            this._main.shaderResources.bindFramebuffer(this.geometryFramebuffer);
	            for (let i = 0; i < this.viewportCount; i++) {
	                const viewport = i + this.viewportOffset;
	                this._gl.viewport(this.viewports[viewport].x, this.viewports[viewport].y, this.viewports[viewport].width, this.viewports[viewport].height);
	                textureShader.vMatrix = this.vMatrices[viewport];
	                textureShader.pMatrix = this.pMatrices[viewport];
	                textureShader.applyView();
	                this._gl.drawElements(this._gl.TRIANGLES, this._image.indexCount, this._gl.UNSIGNED_SHORT, 0);
	            }
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class Lasso {
	    get isInitialized() { return this._isInitialized; }
	    get vertexBuffer() { return this._vertexBuffer; }
	    get indexBuffer() { return this._indexBuffer; }
	    get indexCount() { return this._indexCount; }
	    initializeContext(gl) {
	        const vertices = Quad$2.textured(Constants.MAT4_IDENTITY);
	        this._vertexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	        const indices = Quad$2.INDICES;
	        this._indexBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
	        this._indexCount = indices.length;
	        this._isInitialized = true;
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	class Main extends RendererBase {
	    get shaderResources() { return this._shaderResources; }
	    get textureShader() { return this._textureShader; }
	    get lassoShader() { return this._lassoShader; }
	    get sdfTextShader() { return this._sdfTextShader; }
	    get gridShader() { return this._gridShader; }
	    get blockShader() { return this._blockShader; }
	    get sphereShader() { return this._sphereShader; }
	    get cyclinderShader() { return this._cylinderShader; }
	    get sdfShader() { return this._sdfShader; }
	    get currentAxes() { return this._isAxes1Current ? this._axes1 : this._axes2; }
	    set currentAxes(value) { if (this._isAxes1Current) {
	        this._axes1 = value;
	    }
	    else {
	        this._axes2 = value;
	    } }
	    get previousAxes() { return this._isAxes1Current ? this._axes2 : this._axes1; }
	    set previousAxes(value) { if (this._isAxes1Current) {
	        this._axes2 = value;
	    }
	    else {
	        this._axes1 = value;
	    } }
	    get config() { return this._config; }
	    constructor(options) {
	        super(options);
	        this._config = new Config();
	        this._quad = new Quad();
	        this._lasso = new Lasso();
	        this._pickedPixels = new Uint8Array(4);
	        this._pickedIdColor = create$2();
	        this._position = create$3();
	        this._direction = create$3();
	        this._cameraRotation = create$5();
	        this._cameraPosition = create$3();
	        this._modelPosition = create$3();
	        this._modelManipulationOrigin = create$3();
	        this._shadowVMatrix = create$4();
	        this._shadowPMatrix = create$4();
	    }
	    get isSupported() {
	        return this._createContext(document.createElement("canvas")) !== null;
	    }
	    initialize(core) {
	        super.initialize(core);
	        this._shaderResources = new Resources();
	        this._textureShader = new Texture(core, this);
	        this._lassoShader = new Lasso$1(core, this);
	        this._sdfTextShader = new SdfText(core, this);
	        this._gridShader = new PickGrid(core, this);
	        this._blockShader = new UnitBlock(core, this);
	        this._sphereShader = new UnitSphere(core, this);
	        this._cylinderShader = new UnitCylinder(core, this);
	        this._sdfShader = new UnitSdf(core, this);
	        this._backgroundShader = new Background(core, this);
	        this._ssaoShader = new Ssao(core, this);
	        this._boxShader = new Box(core, this);
	        this._deferredShader = new Deferred(core, this);
	        this._combineShader = new Combine(core, this);
	        this._dofBlurShader = new DofBlur(core, this);
	        this._downsampleShader = new Downsample(core, this);
	        this._gaussianShader = new Gaussian(core, this);
	        this._dofCombineShader = new DofCombine(core, this);
	        this._fxaaShader = new Fxaa(core, this);
	        this._brightPassShader = new Bright(core, this);
	        this._initializeContext(this._createContext(this._canvas));
	        this._canvas.addEventListener("webglcontextlost", (event) => {
	            this._core.log.write(LogLevel.warn, "WebGL context lost");
	            event.preventDefault();
	        }, false);
	        this._canvas.addEventListener("webglcontextrestored", () => {
	            this._initializeContext(this._createContext(this._canvas));
	            this._core.log.write(LogLevel.info, "WebGL context restored");
	        }, false);
	        this._isInitialized = true;
	    }
	    _initializeContext(gl) {
	        this._gl = gl;
	        for (const key in this.fonts) {
	            const fontVisual = this.fonts[key];
	            fontVisual.initializeContext(gl);
	        }
	        this._ssaoSampleKernel = new Float32Array(this._config.ssaoKernelSize * 3);
	        const random = new PseudoRandom(0);
	        const _vec3 = create$3();
	        for (let i = 0; i < this._config.ssaoKernelSize; i++) {
	            _vec3[0] = random.nextFloat() * 2 - 1;
	            _vec3[1] = random.nextFloat() * 2 - 1;
	            _vec3[2] = random.nextFloat();
	            normalize$2(_vec3, _vec3);
	            scale(_vec3, _vec3, random.nextFloat());
	            let scale$1 = i / this._config.ssaoKernelSize;
	            scale$1 = MathHelper.lerp(0.1, 1, scale$1 * scale$1);
	            scale(_vec3, _vec3, scale$1);
	            this._ssaoSampleKernel[i * 3] = _vec3[0];
	            this._ssaoSampleKernel[i * 3 + 1] = _vec3[1];
	            this._ssaoSampleKernel[i * 3 + 2] = _vec3[2];
	        }
	        const noise = new Float32Array(this._config.ssaoNoiseSize * this._config.ssaoNoiseSize * 4);
	        _vec3[2] = 0;
	        for (let i = 0; i < this._config.ssaoNoiseSize * this._config.ssaoNoiseSize; i++) {
	            _vec3[0] = random.nextFloat() * 2 - 1;
	            _vec3[1] = random.nextFloat() * 2 - 1;
	            normalize$2(_vec3, _vec3);
	            noise[i * 4] = _vec3[0];
	            noise[i * 4 + 1] = _vec3[1];
	        }
	        this._ssaoNoiseTexture = this._gl.createTexture();
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._ssaoNoiseTexture);
	        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.REPEAT);
	        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.REPEAT);
	        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
	        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
	        this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA32F, this._config.ssaoNoiseSize, this._config.ssaoNoiseSize, 0, this._gl.RGBA, this._gl.FLOAT, noise);
	        this._ssaoWidth = -1;
	        this._ssaoHeight = -1;
	        this._shadowWidth = -1;
	        this._shadowHeight = -1;
	        this._shaderResources.initializeContext(this._gl);
	        this._textureShader.initializeContext(this._gl);
	        this._lassoShader.initializeContext(this._gl);
	        this._sdfTextShader.initializeContext(this._gl);
	        this._gridShader.initializeContext(this._gl);
	        this._blockShader.initializeContext(this._gl);
	        this._sphereShader.initializeContext(this._gl);
	        this._cylinderShader.initializeContext(this._gl);
	        this._sdfShader.initializeContext(this._gl);
	        this._backgroundShader.initializeContext(this._gl);
	        this._ssaoShader.initializeContext(this._gl);
	        this._boxShader.initializeContext(this._gl);
	        this._deferredShader.initializeContext(this._gl);
	        this._combineShader.initializeContext(this._gl);
	        this._dofBlurShader.initializeContext(this._gl);
	        this._downsampleShader.initializeContext(this._gl);
	        this._gaussianShader.initializeContext(this._gl);
	        this._dofCombineShader.initializeContext(this._gl);
	        this._fxaaShader.initializeContext(this._gl);
	        this._brightPassShader.initializeContext(this._gl);
	        this._quad.initializeContext(this._gl);
	        this._lasso.initializeContext(this._gl);
	        this._framebuffers = [null, null];
	        const texture = TextureHelper.create(this._gl, this._core.config.pickWidth, this._core.config.pickHeight, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._gl.LINEAR, null);
	        const renderBuffer = this._gl.createRenderbuffer();
	        this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, renderBuffer);
	        this._gl.renderbufferStorage(this._gl.RENDERBUFFER, this._gl.DEPTH_COMPONENT24, this._core.config.pickWidth, this._core.config.pickHeight);
	        const framebuffer = this._gl.createFramebuffer();
	        this._shaderResources.bindFramebuffer(framebuffer);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, texture, 0);
	        this._gl.framebufferRenderbuffer(this._gl.FRAMEBUFFER, this._gl.DEPTH_ATTACHMENT, this._gl.RENDERBUFFER, renderBuffer);
	        this._pickFrameBuffer = framebuffer;
	        for (let i = 0; i < this.transitionBuffers.length; i++) {
	            this.transitionBuffers[i].initializeContext(this._gl);
	        }
	        if (this._axes1) {
	            for (let i = 0; i < this._axes1.length; i++) {
	                this._axes1[i].initializeContext(this._gl);
	            }
	        }
	        if (this._axes2) {
	            for (let i = 0; i < this._axes2.length; i++) {
	                this._axes2[i].initializeContext(this._gl);
	            }
	        }
	        for (let i = 0; i < this.labelSets.length; i++) {
	            this.labelSets[i].initializeContext(this._gl);
	        }
	        for (let i = 0; i < this.images.length; i++) {
	            this.images[i].initializeContext(this._gl);
	        }
	    }
	    _resize(width, height) {
	        super._resize(width, height);
	        this._positionTexture = TextureHelper.create(this._gl, width, height, this._gl.RGBA, this._gl.FLOAT, this._gl.NEAREST, null, this._gl.RGBA32F);
	        this._colorTexture = TextureHelper.create(this._gl, width, height, this._gl.RGBA, this._gl.FLOAT, this._gl.LINEAR, null, this._gl.RGBA32F);
	        this._normalTexture = TextureHelper.create(this._gl, width, height, this._gl.RGBA, this._gl.FLOAT, this._gl.LINEAR, null, this._gl.RGBA32F);
	        this._geometryFrameBuffer = this._gl.createFramebuffer();
	        this._shaderResources.bindFramebuffer(this._geometryFrameBuffer);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, this._positionTexture, 0);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT1, this._gl.TEXTURE_2D, this._colorTexture, 0);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT2, this._gl.TEXTURE_2D, this._normalTexture, 0);
	        const renderBuffer = this._gl.createRenderbuffer();
	        this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, renderBuffer);
	        this._gl.renderbufferStorage(this._gl.RENDERBUFFER, this._gl.DEPTH_COMPONENT24, width, height);
	        this._gl.framebufferRenderbuffer(this._gl.FRAMEBUFFER, this._gl.DEPTH_ATTACHMENT, this._gl.RENDERBUFFER, renderBuffer);
	        this._gl.drawBuffers([this._gl.COLOR_ATTACHMENT0, this._gl.COLOR_ATTACHMENT1, this._gl.COLOR_ATTACHMENT2]);
	        this._postProcessTexture1 = TextureHelper.create(this._gl, width, height, this._gl.RGBA, this._gl.FLOAT, this._gl.LINEAR, null, this._gl.RGBA32F);
	        this._postProcessDepthTexture = TextureHelper.create(this._gl, width, height, this._gl.DEPTH_COMPONENT, this._gl.UNSIGNED_INT, this._gl.NEAREST, null, this._gl.DEPTH_COMPONENT24);
	        this._postProcessFrameBuffer1 = this._gl.createFramebuffer();
	        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessFrameBuffer1);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, this._postProcessTexture1, 0);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.DEPTH_ATTACHMENT, this._gl.TEXTURE_2D, this._postProcessDepthTexture, 0);
	        this._postProcessTexture2 = TextureHelper.create(this._gl, width, height, this._gl.RGBA, this._gl.FLOAT, this._gl.LINEAR, null, this._gl.RGBA32F);
	        this._postProcessFrameBuffer2 = this._gl.createFramebuffer();
	        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessFrameBuffer2);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, this._postProcessTexture2, 0);
	        this._postProcessDofTexture = TextureHelper.create(this._gl, width, height, this._gl.RED, this._gl.FLOAT, this._gl.LINEAR, null, this._gl.R32F);
	        this._postProcessDofFrameBuffer = this._gl.createFramebuffer();
	        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessDofFrameBuffer);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, this._postProcessDofTexture, 0);
	        const widthHalf = Math.round(width / 2);
	        const heightHalf = Math.round(height / 2);
	        this._postProcessHalfTexture1 = TextureHelper.create(this._gl, widthHalf, heightHalf, this._gl.RGBA, this._gl.FLOAT, this._gl.LINEAR, null, this._gl.RGBA32F);
	        this._postProcessHalfFrameBuffer1 = this._gl.createFramebuffer();
	        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessHalfFrameBuffer1);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, this._postProcessHalfTexture1, 0);
	        this._postProcessHalfTexture2 = TextureHelper.create(this._gl, widthHalf, heightHalf, this._gl.RGBA, this._gl.FLOAT, this._gl.LINEAR, null, this._gl.RGBA32F);
	        this._postProcessHalfFrameBuffer2 = this._gl.createFramebuffer();
	        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessHalfFrameBuffer2);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, this._postProcessHalfTexture2, 0);
	        const widthQuarter = Math.round(widthHalf / 2);
	        const heightQuarter = Math.round(heightHalf / 2);
	        this._postProcessQuarterTexture1 = TextureHelper.create(this._gl, widthQuarter, heightQuarter, this._gl.RGBA, this._gl.FLOAT, this._gl.LINEAR, null, this._gl.RGBA32F);
	        this._postProcessQuarterFrameBuffer1 = this._gl.createFramebuffer();
	        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessQuarterFrameBuffer1);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, this._postProcessQuarterTexture1, 0);
	        this._postProcessQuarterTexture2 = TextureHelper.create(this._gl, widthQuarter, heightQuarter, this._gl.RGBA, this._gl.FLOAT, this._gl.LINEAR, null, this._gl.RGBA32F);
	        this._postProcessQuarterFrameBuffer2 = this._gl.createFramebuffer();
	        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessQuarterFrameBuffer2);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, this._postProcessQuarterTexture2, 0);
	        const widthEighth = Math.round(widthQuarter / 2);
	        const heightEighth = Math.round(heightQuarter / 2);
	        this._postProcessEighthTexture1 = TextureHelper.create(this._gl, widthEighth, heightEighth, this._gl.RGBA, this._gl.FLOAT, this._gl.LINEAR, null, this._gl.RGBA32F);
	        this._postProcessEighthFrameBuffer1 = this._gl.createFramebuffer();
	        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessEighthFrameBuffer1);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, this._postProcessEighthTexture1, 0);
	        this._postProcessEighthTexture2 = TextureHelper.create(this._gl, widthEighth, heightEighth, this._gl.RGBA, this._gl.FLOAT, this._gl.LINEAR, null, this._gl.RGBA32F);
	        this._postProcessEighthFrameBuffer2 = this._gl.createFramebuffer();
	        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessEighthFrameBuffer2);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, this._postProcessEighthTexture2, 0);
	        const widthSixteenth = Math.round(widthEighth / 2);
	        const hgeightSixteenth = Math.round(heightEighth / 2);
	        this._postProcessSixteenthTexture1 = TextureHelper.create(this._gl, widthSixteenth, hgeightSixteenth, this._gl.RGBA, this._gl.FLOAT, this._gl.LINEAR, null, this._gl.RGBA32F);
	        this._postProcessSixteenthFrameBuffer1 = this._gl.createFramebuffer();
	        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessSixteenthFrameBuffer1);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, this._postProcessSixteenthTexture1, 0);
	        this._postProcessSixteenthTexture2 = TextureHelper.create(this._gl, widthSixteenth, hgeightSixteenth, this._gl.RGBA, this._gl.FLOAT, this._gl.LINEAR, null, this._gl.RGBA32F);
	        this._postProcessSixteenthFrameBuffer2 = this._gl.createFramebuffer();
	        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessSixteenthFrameBuffer2);
	        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, this._postProcessSixteenthTexture2, 0);
	        this._core.log.write(LogLevel.info, `buffers resized ${width},${height}`);
	    }
	    _createContext(canvas) {
	        let supported = false;
	        const preserveDrawingBuffer = this._options ? this._options.preserveDrawingBuffer === undefined ? false : this._options.preserveDrawingBuffer : false;
	        const options = {
	            stencil: true,
	            alpha: false,
	            antialias: false,
	            preserveDrawingBuffer: preserveDrawingBuffer,
	        };
	        const gl = canvas.getContext("webgl2", options);
	        if (gl) {
	            const OES_texture_float_linear = gl.getExtension("OES_texture_float_linear");
	            const EXT_color_buffer_float = gl.getExtension("EXT_color_buffer_float");
	            if (OES_texture_float_linear && EXT_color_buffer_float && gl.MAX_DRAW_BUFFERS > 3) {
	                const texture = TextureHelper.create(gl, 1, 1, gl.RGBA, gl.FLOAT, gl.LINEAR, null, gl.RGBA32F);
	                const framebuffer = gl.createFramebuffer();
	                gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
	                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
	                const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
	                if (status == gl.FRAMEBUFFER_COMPLETE) {
	                    supported = true;
	                }
	                gl.bindTexture(gl.TEXTURE_2D, null);
	            }
	        }
	        return supported ? gl : null;
	    }
	    prepare() {
	        let viewport;
	        switch (this._core.config.stereoMode) {
	            case StereoMode.none:
	                viewport = this._viewports[0];
	                viewport.x = 0;
	                viewport.y = 0;
	                viewport.width = this._canvas.width;
	                viewport.height = this._canvas.height;
	                this._viewportOffset = 0;
	                this._viewportCount = 1;
	                break;
	            case StereoMode.left:
	                viewport = this._viewports[0];
	                viewport.x = 0;
	                viewport.y = 0;
	                viewport.width = this._canvas.width;
	                viewport.height = this._canvas.height;
	                this._viewportOffset = 0;
	                this._viewportCount = 1;
	                break;
	            case StereoMode.right:
	                viewport = this._viewports[1];
	                viewport.x = 0;
	                viewport.y = 0;
	                viewport.width = this._canvas.width;
	                viewport.height = this._canvas.height;
	                this._viewportOffset = 1;
	                this._viewportCount = 1;
	                break;
	        }
	    }
	    createTransitionBuffer(ids) {
	        const buffer = new TransitionBuffer(this._core, ids);
	        buffer.initializeContext(this._gl);
	        return buffer;
	    }
	    createCartesian2dAxesVisual(axes) {
	        const visual = new Cartesian2dVisual(this._core, this, axes);
	        visual.initializeContext(this._gl);
	        return visual;
	    }
	    createCartesian3dAxesVisual(axes) {
	        const visual = new Cartesian3dVisual(this._core, this, axes);
	        visual.initializeContext(this._gl);
	        return visual;
	    }
	    _createLabelVisual(label) {
	        return new LabelVisual(this._core, this, label);
	    }
	    createLabelSetVisual(labelSet) {
	        const visual = new LabelSetVisual(this._core, this, labelSet);
	        visual.initializeContext(this._gl);
	        return visual;
	    }
	    createImageVisual(image) {
	        const visual = new ImageVisual(this._core, this, image);
	        visual.initializeContext(this._gl);
	        return visual;
	    }
	    createFontVisual(font) {
	        const visual = new FontVisual(this._core, font);
	        visual.initializeContext(this._gl);
	        return visual;
	    }
	    getDataUrl(mimeType) {
	        return this._canvas.toDataURL(mimeType);
	    }
	    update(elapsedTime) {
	        super.update(elapsedTime);
	        if (this._shadowWidth != this._config.shadowWidth || this._shadowHeight != this._config.shadowHeight) {
	            this._shadowWidth = this._config.shadowWidth;
	            this._shadowHeight = this._config.shadowHeight;
	            this._shadowColorTexture = TextureHelper.create(this._gl, this._config.shadowWidth, this._config.shadowHeight, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._gl.LINEAR, null);
	            this._shadowDepthTexture = TextureHelper.create(this._gl, this._config.shadowWidth, this._config.shadowHeight, this._gl.DEPTH_COMPONENT, this._gl.UNSIGNED_INT, this._gl.NEAREST, null, this._gl.DEPTH_COMPONENT24);
	            this._shadowFrameBuffer = this._gl.createFramebuffer();
	            this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._shadowFrameBuffer);
	            this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, this._shadowColorTexture, 0);
	            this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.DEPTH_ATTACHMENT, this._gl.TEXTURE_2D, this._shadowDepthTexture, 0);
	            this._core.log.write(LogLevel.info, `shadow map resized ${this._shadowWidth},${this._shadowHeight}`);
	        }
	        if (this._ssaoWidth != this._config.ssaoWidth || this._ssaoHeight != this._config.ssaoHeight) {
	            this._ssaoWidth = this._config.ssaoWidth;
	            this._ssaoHeight = this._config.ssaoHeight;
	            this._ssaoTexture1 = TextureHelper.create(this._gl, this._config.ssaoWidth, this._config.ssaoHeight, this._gl.RED, this._gl.UNSIGNED_BYTE, this._gl.LINEAR, null, this._gl.R8);
	            this._ssaoFrameBuffer1 = this._gl.createFramebuffer();
	            this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._ssaoFrameBuffer1);
	            this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, this._ssaoTexture1, 0);
	            this._ssaoTexture2 = TextureHelper.create(this._gl, this._config.ssaoWidth, this._config.ssaoHeight, this._gl.RED, this._gl.UNSIGNED_BYTE, this._gl.LINEAR, null, this._gl.R8);
	            this._ssaoFrameBuffer2 = this._gl.createFramebuffer();
	            this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._ssaoFrameBuffer2);
	            this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, this._ssaoTexture2, 0);
	            this._core.log.write(LogLevel.info, `ssao map resized ${this._ssaoWidth},${this._ssaoHeight}`);
	        }
	        if (this._config.isDofEnabled && this._config.dofAutoFocus) {
	            this._core.getModelManipulationOrigin(this._modelManipulationOrigin);
	            this._core.getModelPosition(this._modelPosition);
	            add(this._position, this._modelManipulationOrigin, this._modelPosition);
	            this._core.camera.getPosition(this._cameraPosition);
	            subtract(this._position, this._position, this._cameraPosition);
	            const distance = -this._position[2];
	            const amount = Math.min(elapsedTime * this._core.config.focusSmoothing, 1);
	            this._config.dofFocusDistance = MathHelper.lerp(this._config.dofFocusDistance, distance, amount);
	        }
	    }
	    render(elapsedTime) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this._gl.enable(this._gl.DEPTH_TEST);
	            this._gl.enable(this._gl.CULL_FACE);
	            this._gl.cullFace(this._gl.BACK);
	            this._gl.disable(this._gl.BLEND);
	            if (this.isPickingEnabled) {
	                this._shaderResources.bindFramebuffer(this._pickFrameBuffer);
	                this._gl.clearColor(0, 0, 0, 0);
	                this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
	            }
	            this._shaderResources.bindFramebuffer(this._geometryFrameBuffer);
	            const backgroundColor = this._backgroundColor || this._core.config.backgroundColor;
	            this._gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], 1);
	            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT | this._gl.STENCIL_BUFFER_BIT);
	            if (this.config.isShadowEnabled) {
	                this._shaderResources.bindFramebuffer(this._shadowFrameBuffer);
	                this._gl.clear(this._gl.DEPTH_BUFFER_BIT);
	                perspective(this._shadowPMatrix, AngleHelper.degreesToRadians(30), this._config.shadowWidth / this._config.shadowHeight, this._core.config.nearPlane, this._core.config.farPlane);
	                set$3(this._modelPosition, this.mMatrix[12], this.mMatrix[13], this.mMatrix[14]);
	                fromMat4(this._cameraRotation, this.inverseVMatrices[0]);
	                transformMat3(this._position, this._config.keyLightPosition, this._cameraRotation);
	                add(this._position, this._position, this._modelPosition);
	                lookAt(this._shadowVMatrix, this._position, this._modelPosition, Constants.VECTOR3_UNITY);
	            }
	            for (let i = 0; i < this.transitionBuffers.length; i++) {
	                const transitionBuffer = this.transitionBuffers[i];
	                if (transitionBuffer.isVisible) {
	                    this._renderTransitionBuffer(transitionBuffer);
	                }
	            }
	            const axesVisuals = this.axesVisibility == AxesVisibility.current ? this.currentAxes : this.axesVisibility == AxesVisibility.previous ? this.previousAxes : null;
	            if (axesVisuals) {
	                for (let i = 0; i < axesVisuals.length; i++) {
	                    const axesVisual = axesVisuals[i];
	                    if (axesVisual.isVisible) {
	                        axesVisual.pickedIdColor = this._pickedIdColor;
	                        axesVisual.pickFramebuffer = this._pickFrameBuffer;
	                        axesVisual.geometryFramebuffer = this._geometryFrameBuffer;
	                        axesVisual.render(elapsedTime);
	                    }
	                }
	            }
	            if (this.areLabelsVisible) {
	                for (let i = 0; i < this.labelSets.length; i++) {
	                    const labelSetVisual = this.labelSets[i];
	                    if (labelSetVisual.isVisible) {
	                        labelSetVisual.pickedIdColor = this._pickedIdColor;
	                        labelSetVisual.pickFramebuffer = this._pickFrameBuffer;
	                        labelSetVisual.geometryFramebuffer = this._geometryFrameBuffer;
	                        labelSetVisual.render(elapsedTime);
	                    }
	                }
	            }
	            if (this.areImagesVisible) {
	                for (let i = 0; i < this.images.length; i++) {
	                    const imageVisual = this.images[i];
	                    if (imageVisual.isVisible) {
	                        imageVisual.geometryFramebuffer = this._geometryFrameBuffer;
	                        imageVisual.render(elapsedTime);
	                    }
	                }
	            }
	            if (this._backgroundShader.isInitialized) {
	                this._backgroundShader.prepare();
	                this._backgroundShader.color = fromValues$3(this._core.config.backgroundColor[0], this._core.config.backgroundColor[1], this._core.config.backgroundColor[2]);
	                this._backgroundShader.apply();
	                this._shaderResources.bindFramebuffer(this._geometryFrameBuffer);
	                for (let i = 0; i < this._viewportCount; i++) {
	                    const viewport = i + this._viewportOffset;
	                    this._gl.viewport(this._viewports[viewport].x, this._viewports[viewport].y, this._viewports[viewport].width, this._viewports[viewport].height);
	                    this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                }
	                this._gl.bindVertexArray(null);
	            }
	            if (this.isPickingEnabled) {
	                this._shaderResources.bindFramebuffer(this._pickFrameBuffer);
	                this._gl.readPixels(this._core.config.pickWidth / 2, this._core.config.pickHeight / 2, 1, 1, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._pickedPixels);
	                this._pickedType = PickHelper.decodeType(this._pickedPixels);
	                set$2(this._pickedIdColor, this._pickedPixels[0] / 0xff, this._pickedPixels[1] / 0xff, this._pickedPixels[2] / 0xff, this._pickedPixels[3] / 0xff);
	                this._pickedId = PickHelper.decodeNumber(this._pickedPixels);
	            }
	            else {
	                set$2(this._pickedIdColor, 0, 0, 0, 0);
	                this._pickedId = 0;
	            }
	            if (this.transitionBuffers.length > 0 && this._quad.isInitialized) {
	                const viewport = this._viewportOffset;
	                this._postProcess(this.vMatrices[viewport], this.inverseVMatrices[viewport], this.pMatrices[viewport], this._viewports[viewport]);
	            }
	            if (this.isLassoPicking && this._lassoShader.isInitialized) {
	                this._lassoShader.vertexBuffer = this._lasso.vertexBuffer;
	                this._lassoShader.indexBuffer = this._lasso.indexBuffer;
	                const lassoWidth = this.lassoX1 - this.lassoX0;
	                const lassoHeight = this.lassoY1 - this.lassoY0;
	                this._lassoShader.prepare();
	                this._lassoShader.color = this.lassoColor ? this.lassoColor : this._core.config.lassoColor;
	                this._lassoShader.dashWidth = this.lassoDashWidth ? this.lassoDashWidth : this._core.config.lassoDashWidth;
	                this._lassoShader.apply();
	                const lassoThickness = this.lassoThickness ? this.lassoThickness : this._core.config.lassoThickness;
	                for (let i = 0; i < this._viewportCount; i++) {
	                    const viewportIndex = i + this._viewportOffset;
	                    this._shaderResources.bindFramebuffer(this._framebuffers[viewportIndex]);
	                    const viewport = this._viewports[viewportIndex];
	                    this._gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
	                    this._lassoMMatrix[0] = lassoWidth * 2 / viewport.width;
	                    this._lassoMMatrix[5] = lassoHeight * 2 / viewport.height;
	                    this._lassoMMatrix[10] = 1;
	                    this._lassoMMatrix[12] = ((this.lassoX0 + lassoWidth / 2) / viewport.width) * 2 - 1;
	                    this._lassoMMatrix[13] = 1 - ((this.lassoY0 + lassoHeight / 2) / viewport.height) * 2;
	                    this._lassoShader.mMatrix = this._lassoMMatrix;
	                    set(this._lassoThickness, lassoThickness / lassoWidth, lassoThickness / lassoHeight);
	                    this._lassoShader.thickness = this._lassoThickness;
	                    this._lassoShader.applyView();
	                    this._gl.drawElements(this._gl.TRIANGLES, this._lasso.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                }
	            }
	        });
	    }
	    _renderTransitionBuffer(transitionBuffer) {
	        const currentBuffer = transitionBuffer.currentBuffer;
	        const previousBuffer = transitionBuffer.previousBuffer;
	        const currentPalette = transitionBuffer.currentPalette;
	        const previousPalette = transitionBuffer.previousPalette;
	        const currentAtlas = transitionBuffer.currentAtlas;
	        const previousAtlas = transitionBuffer.previousAtlas;
	        const unitType = transitionBuffer.unitType === undefined ? currentBuffer.unitType : transitionBuffer.unitType;
	        const id = currentBuffer.lookup[transitionBuffer.pickIdLookup[this._pickedId]];
	        const hoverId = id > -1 ? UnitVertex.getIdHover(currentBuffer.dataView, id) : -1;
	        const activeId = transitionBuffer.activeId;
	        if (this._blockShader.isInitialized && (unitType == UnitType.block || unitType == UnitType.blockSdf)) {
	            this._blockShader.instanceBuffer = currentBuffer.vertexBuffer;
	            this._blockShader.previousInstanceBuffer = previousBuffer.vertexBuffer;
	            this._blockShader.paletteTexture = currentPalette.texture || currentPalette.defaultTexture;
	            this._blockShader.previousPaletteTexture = previousPalette.texture || previousPalette.defaultTexture;
	            this._blockShader.prepare();
	            this._blockShader.mMatrix = this.mMatrix;
	            this._blockShader.time = this.transitionTime;
	            this._blockShader.duration = this._core.config.transitionDuration / (this._core.config.transitionDuration + this._core.config.transitionStaggering);
	            this._blockShader.rangeMin = currentBuffer.from;
	            this._blockShader.rangeMax = currentBuffer.to;
	            this._blockShader.hover = hoverId;
	            this._blockShader.active = activeId;
	            this._blockShader.specularPower = this._config.specularPower;
	            this._blockShader.specularIntensity = this._config.specularIntensity;
	            this._blockShader.apply();
	            this._blockShader.isPickShader = false;
	            this._blockShader.isShadowMap = false;
	            this._shaderResources.bindFramebuffer(this._geometryFrameBuffer);
	            for (let i = 0; i < this._viewportCount; i++) {
	                const viewport = i + this._viewportOffset;
	                this._gl.viewport(this._viewports[viewport].x, this._viewports[viewport].y, this._viewports[viewport].width, this._viewports[viewport].height);
	                this._blockShader.vMatrix = this.vMatrices[viewport];
	                this._blockShader.pMatrix = this.pMatrices[viewport];
	                this._blockShader.applyView();
	                this._gl.drawElementsInstanced(this._gl.TRIANGLE_STRIP, this._blockShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	            if (this._config.isShadowEnabled) {
	                this._shaderResources.bindFramebuffer(this._shadowFrameBuffer);
	                this._gl.viewport(0, 0, this._config.shadowWidth, this._config.shadowHeight);
	                this._gl.cullFace(this._gl.FRONT);
	                this._blockShader.isPickShader = false;
	                this._blockShader.isShadowMap = true;
	                this._blockShader.vMatrix = this._shadowVMatrix;
	                this._blockShader.pMatrix = this._shadowPMatrix;
	                this._blockShader.applyView();
	                this._gl.drawElementsInstanced(this._gl.TRIANGLE_STRIP, this._blockShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	                this._gl.colorMask(true, true, true, true);
	                this._gl.cullFace(this._gl.BACK);
	            }
	            if (this.isPickingEnabled) {
	                this._blockShader.isPickShader = true;
	                this._blockShader.isShadowMap = false;
	                this._blockShader.pMatrix = this.pickPMatrix;
	                this._blockShader.vMatrix = this.pickVMatrix;
	                this._blockShader.applyView();
	                this._shaderResources.bindFramebuffer(this._pickFrameBuffer);
	                this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                this._gl.drawElementsInstanced(this._gl.TRIANGLE_STRIP, this._blockShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	        }
	        else if (this._sphereShader.isInitialized && (unitType == UnitType.sphere || unitType == UnitType.sphereSdf)) {
	            this._sphereShader.instanceBuffer = currentBuffer.vertexBuffer;
	            this._sphereShader.previousInstanceBuffer = previousBuffer.vertexBuffer;
	            this._sphereShader.paletteTexture = currentPalette.texture || currentPalette.defaultTexture;
	            this._sphereShader.previousPaletteTexture = previousPalette.texture || previousPalette.defaultTexture;
	            this._sphereShader.prepare();
	            this._sphereShader.mMatrix = this.mMatrix;
	            this._sphereShader.time = this.transitionTime;
	            this._sphereShader.duration = this._core.config.transitionDuration / (this._core.config.transitionDuration + this._core.config.transitionStaggering);
	            this._sphereShader.rangeMin = currentBuffer.from;
	            this._sphereShader.rangeMax = currentBuffer.to;
	            this._sphereShader.hover = hoverId;
	            this._sphereShader.active = activeId;
	            this._sphereShader.specularPower = this._config.specularPower;
	            this._sphereShader.specularIntensity = this._config.specularIntensity;
	            this._sphereShader.apply();
	            this._sphereShader.isPickShader = false;
	            this._sphereShader.isShadowMap = false;
	            this._shaderResources.bindFramebuffer(this._geometryFrameBuffer);
	            for (let i = 0; i < this._viewportCount; i++) {
	                const viewport = i + this._viewportOffset;
	                this._gl.viewport(this._viewports[viewport].x, this._viewports[viewport].y, this._viewports[viewport].width, this._viewports[viewport].height);
	                this._sphereShader.vMatrix = this.vMatrices[viewport];
	                this._sphereShader.pMatrix = this.pMatrices[viewport];
	                this._sphereShader.applyView();
	                this._gl.drawElementsInstanced(this._gl.TRIANGLE_STRIP, this._sphereShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	            if (this._config.isShadowEnabled) {
	                this._shaderResources.bindFramebuffer(this._shadowFrameBuffer);
	                this._gl.viewport(0, 0, this._config.shadowWidth, this._config.shadowHeight);
	                this._sphereShader.isPickShader = false;
	                this._sphereShader.isShadowMap = true;
	                this._sphereShader.vMatrix = this._shadowVMatrix;
	                this._sphereShader.pMatrix = this._shadowPMatrix;
	                this._sphereShader.applyView();
	                this._gl.drawElementsInstanced(this._gl.TRIANGLE_STRIP, this._sphereShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	                this._gl.colorMask(true, true, true, true);
	            }
	            if (this.isPickingEnabled) {
	                this._sphereShader.isPickShader = true;
	                this._sphereShader.isShadowMap = false;
	                this._sphereShader.pMatrix = this.pickPMatrix;
	                this._sphereShader.vMatrix = this.pickVMatrix;
	                this._sphereShader.applyView();
	                this._shaderResources.bindFramebuffer(this._pickFrameBuffer);
	                this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                this._gl.drawElementsInstanced(this._gl.TRIANGLE_STRIP, this._sphereShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	        }
	        else if (this._cylinderShader.isInitialized && (unitType == UnitType.cylinder || unitType == UnitType.cylinderSdf)) {
	            this._cylinderShader.instanceBuffer = currentBuffer.vertexBuffer;
	            this._cylinderShader.previousInstanceBuffer = previousBuffer.vertexBuffer;
	            this._cylinderShader.paletteTexture = currentPalette.texture || currentPalette.defaultTexture;
	            this._cylinderShader.previousPaletteTexture = previousPalette.texture || previousPalette.defaultTexture;
	            this._cylinderShader.prepare();
	            this._cylinderShader.mMatrix = this.mMatrix;
	            this._cylinderShader.time = this.transitionTime;
	            this._cylinderShader.duration = this._core.config.transitionDuration / (this._core.config.transitionDuration + this._core.config.transitionStaggering);
	            this._cylinderShader.rangeMin = currentBuffer.from;
	            this._cylinderShader.rangeMax = currentBuffer.to;
	            this._cylinderShader.hover = hoverId;
	            this._cylinderShader.active = activeId;
	            this._cylinderShader.specularPower = this._config.specularPower;
	            this._cylinderShader.specularIntensity = this._config.specularIntensity;
	            this._cylinderShader.apply();
	            this._cylinderShader.isPickShader = false;
	            this._cylinderShader.isShadowMap = false;
	            this._shaderResources.bindFramebuffer(this._geometryFrameBuffer);
	            for (let i = 0; i < this._viewportCount; i++) {
	                const viewport = i + this._viewportOffset;
	                this._gl.viewport(this._viewports[viewport].x, this._viewports[viewport].y, this._viewports[viewport].width, this._viewports[viewport].height);
	                this._cylinderShader.vMatrix = this.vMatrices[viewport];
	                this._cylinderShader.pMatrix = this.pMatrices[viewport];
	                this._cylinderShader.applyView();
	                this._gl.drawElementsInstanced(this._gl.TRIANGLE_STRIP, this._cylinderShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	            if (this._config.isShadowEnabled) {
	                this._shaderResources.bindFramebuffer(this._shadowFrameBuffer);
	                this._gl.viewport(0, 0, this._config.shadowWidth, this._config.shadowHeight);
	                this._cylinderShader.isPickShader = false;
	                this._cylinderShader.isShadowMap = true;
	                this._cylinderShader.vMatrix = this._shadowVMatrix;
	                this._cylinderShader.pMatrix = this._shadowPMatrix;
	                this._cylinderShader.applyView();
	                this._gl.drawElementsInstanced(this._gl.TRIANGLE_STRIP, this._cylinderShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	                this._gl.colorMask(true, true, true, true);
	            }
	            if (this.isPickingEnabled) {
	                this._cylinderShader.isPickShader = true;
	                this._cylinderShader.isShadowMap = false;
	                this._cylinderShader.pMatrix = this.pickPMatrix;
	                this._cylinderShader.vMatrix = this.pickVMatrix;
	                this._cylinderShader.applyView();
	                this._shaderResources.bindFramebuffer(this._pickFrameBuffer);
	                this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                this._gl.drawElementsInstanced(this._gl.TRIANGLE_STRIP, this._cylinderShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	        }
	        else if (this._sdfShader.isInitialized && unitType == UnitType.sdf) {
	            this._sdfShader.instanceBuffer = currentBuffer.vertexBuffer;
	            this._sdfShader.previousInstanceBuffer = previousBuffer.vertexBuffer;
	            this._sdfShader.paletteTexture = currentPalette.texture || currentPalette.defaultTexture;
	            this._sdfShader.previousPaletteTexture = previousPalette.texture || previousPalette.defaultTexture;
	            this._sdfShader.sdfTexture = currentAtlas.texture || currentAtlas.defaultTexture;
	            this._sdfShader.previousSdfTexture = previousAtlas.texture || previousAtlas.defaultTexture;
	            this._sdfShader.prepare();
	            this._sdfShader.mMatrix = this.mMatrix;
	            this._sdfShader.time = this.transitionTime;
	            this._sdfShader.duration = this._core.config.transitionDuration / (this._core.config.transitionDuration + this._core.config.transitionStaggering);
	            this._sdfShader.rangeMin = currentBuffer.from;
	            this._sdfShader.rangeMax = currentBuffer.to;
	            this._sdfShader.hover = hoverId;
	            this._sdfShader.active = activeId;
	            this._sdfShader.specularPower = this._config.specularPower;
	            this._sdfShader.specularIntensity = this._config.specularIntensity;
	            this._sdfShader.apply();
	            this._sdfShader.isPickShader = false;
	            this._sdfShader.isShadowMap = false;
	            this._shaderResources.bindFramebuffer(this._geometryFrameBuffer);
	            for (let i = 0; i < this._viewportCount; i++) {
	                const viewport = i + this._viewportOffset;
	                this._gl.viewport(this._viewports[viewport].x, this._viewports[viewport].y, this._viewports[viewport].width, this._viewports[viewport].height);
	                this._sdfShader.vMatrix = this.vMatrices[viewport];
	                this._sdfShader.pMatrix = this.pMatrices[viewport];
	                this._sdfShader.applyView();
	                this._gl.drawElementsInstanced(this._gl.TRIANGLE_STRIP, this._sdfShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	            if (this._config.isShadowEnabled) {
	                this._shaderResources.bindFramebuffer(this._shadowFrameBuffer);
	                this._gl.viewport(0, 0, this._config.shadowWidth, this._config.shadowHeight);
	                this._gl.cullFace(this._gl.FRONT);
	                this._sdfShader.isPickShader = false;
	                this._sdfShader.isShadowMap = true;
	                this._sdfShader.vMatrix = this._shadowVMatrix;
	                this._sdfShader.pMatrix = this._shadowPMatrix;
	                this._sdfShader.applyView();
	                this._gl.drawElementsInstanced(this._gl.TRIANGLE_STRIP, this._sdfShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	                this._gl.colorMask(true, true, true, true);
	                this._gl.cullFace(this._gl.BACK);
	            }
	            if (this.isPickingEnabled) {
	                this._sdfShader.isPickShader = true;
	                this._sdfShader.isShadowMap = false;
	                this._sdfShader.pMatrix = this.pickPMatrix;
	                this._sdfShader.vMatrix = this.pickVMatrix;
	                this._sdfShader.applyView();
	                this._shaderResources.bindFramebuffer(this._pickFrameBuffer);
	                this._gl.viewport(0, 0, this._core.config.pickWidth, this._core.config.pickHeight);
	                this._gl.drawElementsInstanced(this._gl.TRIANGLE_STRIP, this._sdfShader.indexCount, this._gl.UNSIGNED_SHORT, 0, transitionBuffer.length);
	            }
	        }
	    }
	    _postProcess(vMatrix, inverseVMatrix, pMatrix, viewport) {
	        if (this._deferredShader.isInitialized) {
	            this._gl.disable(this._gl.DEPTH_TEST);
	            let ssaoTexture;
	            if (this._config.isSsaoEnabled && this._ssaoShader.isInitialized) {
	                this._gl.viewport(0, 0, this._config.ssaoWidth, this._config.ssaoHeight);
	                ssaoTexture = this._ssaoTexture1;
	                this._shaderResources.bindFramebuffer(this._ssaoFrameBuffer1);
	                this._ssaoShader.vertexBuffer = this._quad.vertexBuffer;
	                this._ssaoShader.indexBuffer = this._quad.indexBuffer;
	                this._ssaoShader.texture2D1 = this._positionTexture;
	                this._ssaoShader.texture2D2 = this._normalTexture;
	                this._ssaoShader.texture2D3 = this._ssaoNoiseTexture;
	                this._ssaoShader.prepare();
	                this._ssaoShader.pMatrix = pMatrix;
	                this._ssaoShader.ssaoNoiseSize = this._config.ssaoNoiseSize;
	                this._ssaoShader.ssaoRadius = this._config.ssaoRadius;
	                this._ssaoShader.ssaoPower = this._config.ssaoPower;
	                this._ssaoShader.ssaoKernel = this._ssaoSampleKernel;
	                this._ssaoShader.left = 0;
	                this._ssaoShader.top = 0;
	                this._ssaoShader.width = this._config.ssaoWidth;
	                this._ssaoShader.height = this._config.ssaoHeight;
	                this._ssaoShader.apply();
	                this._ssaoShader.applyView();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                if (this._config.ssaoBlurEnabled && this._boxShader.isInitialized) {
	                    ssaoTexture = this._ssaoTexture2;
	                    this._shaderResources.bindFramebuffer(this._ssaoFrameBuffer2);
	                    this._boxShader.vertexBuffer = this._quad.vertexBuffer;
	                    this._boxShader.indexBuffer = this._quad.indexBuffer;
	                    this._boxShader.texture2D = this._ssaoTexture1;
	                    this._boxShader.prepare();
	                    this._boxShader.left = 0;
	                    this._boxShader.top = 0;
	                    this._boxShader.width = this._config.ssaoWidth;
	                    this._boxShader.height = this._config.ssaoHeight;
	                    this._boxShader.apply();
	                    this._boxShader.applyView();
	                    this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                }
	            }
	            this._gl.viewport(viewport.left, viewport.top, viewport.width, viewport.height);
	            let postProcessFrameBuffer = this._postProcessFrameBuffer1;
	            this._shaderResources.bindFramebuffer(postProcessFrameBuffer);
	            this._deferredShader.vertexBuffer = this._quad.vertexBuffer;
	            this._deferredShader.indexBuffer = this._quad.indexBuffer;
	            this._deferredShader.texture2D1 = this._positionTexture;
	            this._deferredShader.texture2D2 = this._colorTexture;
	            this._deferredShader.texture2D3 = this._normalTexture;
	            this._deferredShader.texture2D4 = this._config.isSsaoEnabled ? ssaoTexture : null;
	            this._deferredShader.texture2D5 = this._shadowDepthTexture;
	            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
	            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
	            this._deferredShader.prepare();
	            this._deferredShader.isShadowEnabled = this._config.isShadowEnabled;
	            this._deferredShader.isSsaoEnabled = this._config.isSsaoEnabled;
	            this._deferredShader.inverseVMatrix = inverseVMatrix;
	            this._deferredShader.shadowVMatrix = this._shadowVMatrix;
	            this._deferredShader.shadowPMatrix = this._shadowPMatrix;
	            this._deferredShader.vMatrix = vMatrix;
	            this._deferredShader.keyLightIntensity = this._config.keyLightIntensity;
	            this._deferredShader.fillLight1Intensity = this._config.fillLight1Intensity;
	            this._deferredShader.fillLight2Intensity = this._config.fillLight2Intensity;
	            this._core.camera.getPosition(this._cameraPosition);
	            fromMat4(this._cameraRotation, vMatrix);
	            set$3(this._position, this.mMatrix[12], this.mMatrix[13], this.mMatrix[14]);
	            normalize$2(this._deferredShader.directionToKeyLight, this._config.keyLightPosition);
	            subtract(this._direction, this._cameraPosition, this._position);
	            normalize$2(this._direction, this._direction);
	            add(this._deferredShader.keyLightHalfAngle, this._direction, this._deferredShader.directionToKeyLight);
	            normalize$2(this._deferredShader.keyLightHalfAngle, this._deferredShader.keyLightHalfAngle);
	            copy$3(this._deferredShader.directionToFillLight1, this._config.fillLight1Position);
	            copy$3(this._deferredShader.directionToFillLight2, this._config.fillLight2Position);
	            this._deferredShader.left = viewport.left;
	            this._deferredShader.top = viewport.top;
	            this._deferredShader.width = viewport.width;
	            this._deferredShader.height = viewport.height;
	            this._deferredShader.shadowMapWidth = this._config.shadowWidth;
	            this._deferredShader.shadowMapHeight = this._config.shadowHeight;
	            this._deferredShader.ambientIntensity = this._config.ambientIntensity;
	            this._deferredShader.materialIntensity = this._config.materialIntensity;
	            this._deferredShader.specularPower = this._config.specularPower;
	            this._deferredShader.specularIntensity = this._config.specularIntensity;
	            this._deferredShader.apply();
	            this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	            const widthHalf = Math.round(viewport.width / 2);
	            const heightHalf = Math.round(viewport.height / 2);
	            const widthQuarter = Math.round(widthHalf / 2);
	            const heightQuarter = Math.round(heightHalf / 2);
	            const widthEighth = Math.round(widthQuarter / 2);
	            const heightEighth = Math.round(heightQuarter / 2);
	            const widthSixteenth = Math.round(widthEighth / 2);
	            const heightSixteenth = Math.round(heightEighth / 2);
	            if (this._config.isDofEnabled && this._dofBlurShader.isInitialized && this._dofCombineShader.isInitialized) {
	                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessDofFrameBuffer);
	                this._dofBlurShader.vertexBuffer = this._quad.vertexBuffer;
	                this._dofBlurShader.indexBuffer = this._quad.indexBuffer;
	                this._dofBlurShader.texture2D1 = postProcessFrameBuffer == this._postProcessFrameBuffer1 ? this._postProcessTexture2 : this._postProcessTexture1;
	                this._dofBlurShader.texture2D2 = this._positionTexture;
	                this._dofBlurShader.prepare();
	                this._dofBlurShader.focusDepth = this._config.dofFocusDistance;
	                this._dofBlurShader.nearFocusDepth = this._config.dofFocusDistance - this._config.dofFocusRange / 2;
	                this._dofBlurShader.farFocusDepth = this._config.dofFocusDistance + this._config.dofFocusRange / 2;
	                this._dofBlurShader.maxBackgroundBlur = this._config.dofMaxBackgroundBlur;
	                this._dofBlurShader.left = viewport.left;
	                this._dofBlurShader.top = viewport.top;
	                this._dofBlurShader.width = viewport.width;
	                this._dofBlurShader.height = viewport.height;
	                this._dofBlurShader.apply();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                postProcessFrameBuffer = postProcessFrameBuffer == this._postProcessFrameBuffer1 ? this._postProcessFrameBuffer2 : this._postProcessFrameBuffer1;
	                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, postProcessFrameBuffer);
	                this._dofCombineShader.vertexBuffer = this._quad.vertexBuffer;
	                this._dofCombineShader.indexBuffer = this._quad.indexBuffer;
	                this._dofCombineShader.texture2D1 = postProcessFrameBuffer == this._postProcessFrameBuffer1 ? this._postProcessTexture2 : this._postProcessTexture1;
	                this._dofCombineShader.texture2D2 = this._postProcessDofTexture;
	                this._dofCombineShader.prepare();
	                this._dofCombineShader.focusDepth = this._config.dofFocusDistance;
	                this._dofCombineShader.left = viewport.left;
	                this._dofCombineShader.top = viewport.top;
	                this._dofCombineShader.width = viewport.width;
	                this._dofCombineShader.height = viewport.height;
	                this._dofCombineShader.apply();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	            }
	            if (this._config.isBloomEnabled && this._brightPassShader.isInitialized && this._gaussianShader.isInitialized) {
	                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessHalfFrameBuffer1);
	                this._brightPassShader.vertexBuffer = this._quad.vertexBuffer;
	                this._brightPassShader.indexBuffer = this._quad.indexBuffer;
	                this._brightPassShader.texture2D = postProcessFrameBuffer == this._postProcessFrameBuffer1 ? this._postProcessTexture1 : this._postProcessTexture2;
	                this._brightPassShader.prepare();
	                this._brightPassShader.width = widthHalf;
	                this._brightPassShader.height = heightHalf;
	                this._brightPassShader.apply();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessQuarterFrameBuffer1);
	                this._brightPassShader.vertexBuffer = this._quad.vertexBuffer;
	                this._brightPassShader.indexBuffer = this._quad.indexBuffer;
	                this._brightPassShader.texture2D = this._postProcessHalfTexture1;
	                this._brightPassShader.prepare();
	                this._brightPassShader.width = widthQuarter;
	                this._brightPassShader.height = heightQuarter;
	                this._brightPassShader.apply();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessEighthFrameBuffer1);
	                this._brightPassShader.vertexBuffer = this._quad.vertexBuffer;
	                this._brightPassShader.indexBuffer = this._quad.indexBuffer;
	                this._brightPassShader.texture2D = this._postProcessQuarterTexture1;
	                this._brightPassShader.prepare();
	                this._brightPassShader.width = widthEighth;
	                this._brightPassShader.height = heightEighth;
	                this._brightPassShader.apply();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessSixteenthFrameBuffer1);
	                this._brightPassShader.vertexBuffer = this._quad.vertexBuffer;
	                this._brightPassShader.indexBuffer = this._quad.indexBuffer;
	                this._brightPassShader.texture2D = this._postProcessEighthTexture1;
	                this._brightPassShader.prepare();
	                this._brightPassShader.width = widthSixteenth;
	                this._brightPassShader.height = heightSixteenth;
	                this._brightPassShader.apply();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessHalfFrameBuffer2);
	                this._gaussianShader.vertexBuffer = this._quad.vertexBuffer;
	                this._gaussianShader.indexBuffer = this._quad.indexBuffer;
	                this._gaussianShader.texture2D = this._postProcessHalfTexture1;
	                this._gaussianShader.prepare();
	                this._gaussianShader.width = widthHalf;
	                this._gaussianShader.height = heightHalf;
	                this._gaussianShader.horizontal = true;
	                this._gaussianShader.apply();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessHalfFrameBuffer1);
	                this._gaussianShader.texture2D = this._postProcessHalfTexture2;
	                this._gaussianShader.prepare();
	                this._gaussianShader.horizontal = false;
	                this._gaussianShader.apply();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessQuarterFrameBuffer2);
	                this._gaussianShader.vertexBuffer = this._quad.vertexBuffer;
	                this._gaussianShader.indexBuffer = this._quad.indexBuffer;
	                this._gaussianShader.texture2D = this._postProcessQuarterTexture1;
	                this._gaussianShader.prepare();
	                this._gaussianShader.width = widthQuarter;
	                this._gaussianShader.height = heightQuarter;
	                this._gaussianShader.horizontal = true;
	                this._gaussianShader.apply();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessQuarterFrameBuffer1);
	                this._gaussianShader.texture2D = this._postProcessQuarterTexture2;
	                this._gaussianShader.prepare();
	                this._gaussianShader.horizontal = false;
	                this._gaussianShader.apply();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessEighthFrameBuffer2);
	                this._gaussianShader.vertexBuffer = this._quad.vertexBuffer;
	                this._gaussianShader.indexBuffer = this._quad.indexBuffer;
	                this._gaussianShader.texture2D = this._postProcessEighthTexture1;
	                this._gaussianShader.prepare();
	                this._gaussianShader.width = widthEighth;
	                this._gaussianShader.height = heightEighth;
	                this._gaussianShader.horizontal = true;
	                this._gaussianShader.apply();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessEighthFrameBuffer1);
	                this._gaussianShader.texture2D = this._postProcessEighthTexture2;
	                this._gaussianShader.prepare();
	                this._gaussianShader.horizontal = false;
	                this._gaussianShader.apply();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessSixteenthFrameBuffer2);
	                this._gaussianShader.vertexBuffer = this._quad.vertexBuffer;
	                this._gaussianShader.indexBuffer = this._quad.indexBuffer;
	                this._gaussianShader.texture2D = this._postProcessSixteenthTexture1;
	                this._gaussianShader.prepare();
	                this._gaussianShader.width = widthSixteenth;
	                this._gaussianShader.height = heightSixteenth;
	                this._gaussianShader.horizontal = true;
	                this._gaussianShader.apply();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._postProcessSixteenthFrameBuffer1);
	                this._gaussianShader.texture2D = this._postProcessSixteenthTexture2;
	                this._gaussianShader.prepare();
	                this._gaussianShader.horizontal = false;
	                this._gaussianShader.apply();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	            }
	            if (this._config.isFxaaEnabled && this._fxaaShader.isInitialized) {
	                postProcessFrameBuffer = postProcessFrameBuffer == this._postProcessFrameBuffer1 ? this._postProcessFrameBuffer2 : this._postProcessFrameBuffer1;
	                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, postProcessFrameBuffer);
	                this._fxaaShader.vertexBuffer = this._quad.vertexBuffer;
	                this._fxaaShader.indexBuffer = this._quad.indexBuffer;
	                this._fxaaShader.texture2D = postProcessFrameBuffer == this._postProcessFrameBuffer1 ? this._postProcessTexture2 : this._postProcessTexture1;
	                this._fxaaShader.prepare();
	                this._fxaaShader.left = viewport.left;
	                this._fxaaShader.top = viewport.top;
	                this._fxaaShader.width = viewport.width;
	                this._fxaaShader.height = viewport.height;
	                this._fxaaShader.apply();
	                this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	            }
	            this._shaderResources.bindFramebuffer(null);
	            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
	            this._gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
	            this._combineShader.vertexBuffer = this._quad.vertexBuffer;
	            this._combineShader.indexBuffer = this._quad.indexBuffer;
	            this._combineShader.texture2D1 = postProcessFrameBuffer == this._postProcessFrameBuffer1 ? this._postProcessTexture1 : this._postProcessTexture2;
	            if (this._config.isBloomEnabled) {
	                this._combineShader.texture2D2 = this._postProcessHalfTexture1;
	                this._combineShader.texture2D3 = this._postProcessQuarterTexture1;
	                this._combineShader.texture2D4 = this._postProcessEighthTexture1;
	                this._combineShader.texture2D5 = this._postProcessSixteenthTexture1;
	            }
	            else {
	                this._combineShader.texture2D2 = null;
	                this._combineShader.texture2D3 = null;
	                this._combineShader.texture2D4 = null;
	                this._combineShader.texture2D5 = null;
	            }
	            this._combineShader.prepare();
	            this._combineShader.viewport = viewport;
	            this._combineShader.intensity = this._config.bloomIntensity;
	            this._combineShader.apply();
	            this._gl.drawElements(this._gl.TRIANGLES, this._quad.indexCount, this._gl.UNSIGNED_SHORT, 0);
	        }
	    }
	}

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class MaterialBufferData extends Float32Array {
	    constructor(count) {
	        super(count * MaterialBufferData.SIZE);
	        this.TYPE_OFFSET = 0 / 4;
	        this.FUZZ_OFFSET = 4 / 4;
	        this.REFRACTIVE_INDEX_OFFSET = 8 / 4;
	        this.TEXTURE_ID_OFFSET = 12 / 4;
	        this.COLOR_OFFSET = 16 / 4;
	        this.GLOSSINESS_OFFSET = 28 / 4;
	        this.ID_COLOR_OFFSET = 32 / 4;
	        this.DENSITY_OFFSET = 48 / 4;
	    }
	    getType(index) {
	        return this[MaterialBufferData.SIZE * index + this.TYPE_OFFSET];
	    }
	    setType(index, value) {
	        this[MaterialBufferData.SIZE * index + this.TYPE_OFFSET] = value;
	    }
	    getFuzz(index) {
	        return this[MaterialBufferData.SIZE * index + this.FUZZ_OFFSET];
	    }
	    setFuzz(index, value) {
	        this[MaterialBufferData.SIZE * index + this.FUZZ_OFFSET] = value;
	    }
	    getRefractiveIndex(index) {
	        return this[MaterialBufferData.SIZE * index + this.REFRACTIVE_INDEX_OFFSET];
	    }
	    setRefractiveIndex(index, value) {
	        this[MaterialBufferData.SIZE * index + this.REFRACTIVE_INDEX_OFFSET] = value;
	    }
	    getTextureId(index) {
	        return this[MaterialBufferData.SIZE * index + this.TEXTURE_ID_OFFSET];
	    }
	    setTextureId(index, value) {
	        this[MaterialBufferData.SIZE * index + this.TEXTURE_ID_OFFSET] = value;
	    }
	    getColor(index, value) {
	        const offset = MaterialBufferData.SIZE * index + this.COLOR_OFFSET;
	        set$3(value, this[offset], this[offset + 1], this[offset + 2]);
	    }
	    setColor(index, value) {
	        const offset = MaterialBufferData.SIZE * index + this.COLOR_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	    }
	    getGlossiness(index) {
	        return this[MaterialBufferData.SIZE * index + this.GLOSSINESS_OFFSET];
	    }
	    setGlossiness(index, value) {
	        this[MaterialBufferData.SIZE * index + this.GLOSSINESS_OFFSET] = value;
	    }
	    getDensity(index) {
	        return this[MaterialBufferData.SIZE * index + this.DENSITY_OFFSET];
	    }
	    setDensity(index, value) {
	        this[MaterialBufferData.SIZE * index + this.DENSITY_OFFSET] = value;
	    }
	    getIdColor(index, value) {
	        const offset = MaterialBufferData.SIZE * index + this.ID_COLOR_OFFSET;
	        set$2(value, this[offset], this[offset + 1], this[offset + 2], this[offset + 3]);
	    }
	    setIdColor(index, value) {
	        const offset = MaterialBufferData.SIZE * index + this.ID_COLOR_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	        this[offset + 3] = value[3];
	    }
	}
	MaterialBufferData.SIZE = 64 / 4;

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class TextureBufferData extends Float32Array {
	    constructor(count) {
	        super(count * TextureBufferData.SIZE);
	        this.COLOR0_OFFSET = 0 / 4;
	        this.TYPE_OFFSET = 12 / 4;
	        this.COLOR1_OFFSET = 16 / 4;
	        this.SIZE0_OFFSET = 32 / 4;
	        this.SIZE1_OFFSET = 48 / 4;
	        this.CLIP_OFFSET = 64 / 4;
	        this.OFFSET_OFFSET = 80 / 4;
	    }
	    getType(index) {
	        return this[TextureBufferData.SIZE * index + this.TYPE_OFFSET];
	    }
	    setType(index, value) {
	        this[TextureBufferData.SIZE * index + this.TYPE_OFFSET] = value;
	    }
	    getColor0(index, value) {
	        const offset = TextureBufferData.SIZE * index + this.COLOR0_OFFSET;
	        set$3(value, this[offset], this[offset + 1], this[offset + 2]);
	    }
	    setColor0(index, value) {
	        const offset = TextureBufferData.SIZE * index + this.COLOR0_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	    }
	    getColor1(index, value) {
	        const offset = TextureBufferData.SIZE * index + this.COLOR1_OFFSET;
	        set$3(value, this[offset], this[offset + 1], this[offset + 2]);
	    }
	    setColor1(index, value) {
	        const offset = TextureBufferData.SIZE * index + this.COLOR1_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	    }
	    getSize0(index, value) {
	        const offset = TextureBufferData.SIZE * index + this.SIZE0_OFFSET;
	        set$2(value, this[offset], this[offset + 1], this[offset + 2], this[offset + 3]);
	    }
	    setSize0(index, value) {
	        const offset = TextureBufferData.SIZE * index + this.SIZE0_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	        this[offset + 3] = value[3];
	    }
	    getSize1(index, value) {
	        const offset = TextureBufferData.SIZE * index + this.SIZE1_OFFSET;
	        set$2(value, this[offset], this[offset + 1], this[offset + 2], this[offset + 3]);
	    }
	    setSize1(index, value) {
	        const offset = TextureBufferData.SIZE * index + this.SIZE1_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	        this[offset + 3] = value[3];
	    }
	    getClip(index, value) {
	        const offset = TextureBufferData.SIZE * index + this.CLIP_OFFSET;
	        set$2(value, this[offset], this[offset + 1], this[offset + 2], this[offset + 3]);
	    }
	    setClip(index, value) {
	        const offset = TextureBufferData.SIZE * index + this.CLIP_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	        this[offset + 3] = value[3];
	    }
	    getOffset(index, value) {
	        const offset = TextureBufferData.SIZE * index + this.OFFSET_OFFSET;
	        set(value, this[offset], this[offset + 1]);
	    }
	    setOffset(index, value) {
	        const offset = TextureBufferData.SIZE * index + this.OFFSET_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	    }
	}
	TextureBufferData.SIZE = 96 / 4;

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class HittableBufferData extends Float32Array {
	    constructor(count) {
	        super(count * HittableBufferData.SIZE);
	        this.CENTER0_OFFSET = 0 / 4;
	        this.TYPE_OFFSET = 12 / 4;
	        this.SIZE0_OFFSET = 16 / 4;
	        this.MATERIAL_ID_OFFSET = 28 / 4;
	        this.ROTATION0_OFFSET = 32 / 4;
	        this.ROTATION1_OFFSET = 48 / 4;
	        this.TEXCOORD0_OFFSET = 64 / 4;
	        this.TEXCOORD1_OFFSET = 72 / 4;
	        this.CENTER1_OFFSET = 80 / 4;
	        this.ROUNDING_OFFSET = 92 / 4;
	        this.SIZE1_OFFSET = 96 / 4;
	        this.BOUNDARY_TYPE_OFFSET = 108 / 4;
	        this.TIME0_OFFSET = 112 / 4;
	        this.TIME1_OFFSET = 116 / 4;
	        this.TEX_ID_OFFSET = 120 / 4;
	        this.SDF_BUFFER_OFFSET = 124 / 4;
	        this.SDF_BORDER_OFFSET = 128 / 4;
	        this.PARAMETER_1_OFFSET = 132 / 4;
	        this.PARAMETER_2_OFFSET = 136 / 4;
	    }
	    getType(index) {
	        return this[HittableBufferData.SIZE * index + this.TYPE_OFFSET];
	    }
	    setType(index, value) {
	        this[HittableBufferData.SIZE * index + this.TYPE_OFFSET] = value;
	    }
	    getCenter0(index, value) {
	        const offset = HittableBufferData.SIZE * index + this.CENTER0_OFFSET;
	        set$3(value, this[offset], this[offset + 1], this[offset + 2]);
	    }
	    setCenter0(index, value) {
	        const offset = HittableBufferData.SIZE * index + this.CENTER0_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	    }
	    getCenter1(index, value) {
	        const offset = HittableBufferData.SIZE * index + this.CENTER1_OFFSET;
	        set$3(value, this[offset], this[offset + 1], this[offset + 2]);
	    }
	    setCenter1(index, value) {
	        const offset = HittableBufferData.SIZE * index + this.CENTER1_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	    }
	    getTime0(index) {
	        return this[HittableBufferData.SIZE * index + this.TIME0_OFFSET];
	    }
	    setTime0(index, value) {
	        this[HittableBufferData.SIZE * index + this.TIME0_OFFSET] = value;
	    }
	    getTime1(index) {
	        return this[HittableBufferData.SIZE * index + this.TIME1_OFFSET];
	    }
	    setTime1(index, value) {
	        this[HittableBufferData.SIZE * index + this.TIME1_OFFSET] = value;
	    }
	    getSize0(index, value) {
	        const offset = HittableBufferData.SIZE * index + this.SIZE0_OFFSET;
	        set$3(value, this[offset], this[offset + 1], this[offset + 2]);
	    }
	    setSize0(index, value) {
	        const offset = HittableBufferData.SIZE * index + this.SIZE0_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	    }
	    getSize1(index, value) {
	        const offset = HittableBufferData.SIZE * index + this.SIZE1_OFFSET;
	        set$3(value, this[offset], this[offset + 1], this[offset + 2]);
	    }
	    setSize1(index, value) {
	        const offset = HittableBufferData.SIZE * index + this.SIZE1_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	    }
	    getMaterialId(index) {
	        return this[HittableBufferData.SIZE * index + this.MATERIAL_ID_OFFSET];
	    }
	    setMaterialId(index, value) {
	        this[HittableBufferData.SIZE * index + this.MATERIAL_ID_OFFSET] = value;
	    }
	    getRotation0(index, value) {
	        const offset = HittableBufferData.SIZE * index + this.ROTATION0_OFFSET;
	        set$1(value, this[offset], this[offset + 1], this[offset + 2], this[offset + 3]);
	    }
	    setRotation0(index, value) {
	        const offset = HittableBufferData.SIZE * index + this.ROTATION0_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	        this[offset + 3] = value[3];
	    }
	    getRotation1(index, value) {
	        const offset = HittableBufferData.SIZE * index + this.ROTATION1_OFFSET;
	        set$1(value, this[offset], this[offset + 1], this[offset + 2], this[offset + 3]);
	    }
	    setRotation1(index, value) {
	        const offset = HittableBufferData.SIZE * index + this.ROTATION1_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	        this[offset + 3] = value[3];
	    }
	    getTexCoord0(index, value) {
	        const offset = HittableBufferData.SIZE * index + this.TEXCOORD0_OFFSET;
	        set(value, this[offset], this[offset + 1]);
	    }
	    setTexCoord0(index, value) {
	        const offset = HittableBufferData.SIZE * index + this.TEXCOORD0_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	    }
	    getTexCoord1(index, value) {
	        const offset = HittableBufferData.SIZE * index + this.TEXCOORD1_OFFSET;
	        set(value, this[offset], this[offset + 1]);
	    }
	    setTexCoord1(index, value) {
	        const offset = HittableBufferData.SIZE * index + this.TEXCOORD1_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	    }
	    getRounding(index) {
	        return this[HittableBufferData.SIZE * index + this.ROUNDING_OFFSET];
	    }
	    setRounding(index, value) {
	        this[HittableBufferData.SIZE * index + this.ROUNDING_OFFSET] = value;
	    }
	    getParameter1(index) {
	        return this[HittableBufferData.SIZE * index + this.PARAMETER_1_OFFSET];
	    }
	    setParameter1(index, value) {
	        this[HittableBufferData.SIZE * index + this.PARAMETER_1_OFFSET] = value;
	    }
	    getParameter2(index) {
	        return this[HittableBufferData.SIZE * index + this.PARAMETER_2_OFFSET];
	    }
	    setParameter2(index, value) {
	        this[HittableBufferData.SIZE * index + this.PARAMETER_2_OFFSET] = value;
	    }
	    getBoundaryType(index) {
	        return this[HittableBufferData.SIZE * index + this.BOUNDARY_TYPE_OFFSET];
	    }
	    setBoundaryType(index, value) {
	        this[HittableBufferData.SIZE * index + this.BOUNDARY_TYPE_OFFSET] = value;
	    }
	    getTexId(index) {
	        return this[HittableBufferData.SIZE * index + this.TEX_ID_OFFSET];
	    }
	    setTexId(index, value) {
	        this[HittableBufferData.SIZE * index + this.TEX_ID_OFFSET] = value;
	    }
	    getSdfBuffer(index) {
	        return this[HittableBufferData.SIZE * index + this.SDF_BUFFER_OFFSET];
	    }
	    setSdfBuffer(index, value) {
	        this[HittableBufferData.SIZE * index + this.SDF_BUFFER_OFFSET] = value;
	    }
	    getSdfBorder(index) {
	        return this[HittableBufferData.SIZE * index + this.SDF_BORDER_OFFSET];
	    }
	    setSdfBorder(index, value) {
	        this[HittableBufferData.SIZE * index + this.SDF_BORDER_OFFSET] = value;
	    }
	}
	HittableBufferData.SIZE = 144 / 4;

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class ComputeUniformBufferData extends Float32Array {
	    constructor() {
	        super(ComputeUniformBufferData.SIZE);
	        this.POSITION_OFFSET = 0 / 4;
	        this.WIDTH_OFFSET = 12 / 4;
	        this.RIGHT_OFFSET = 16 / 4;
	        this.HEIGHT_OFFSET = 28 / 4;
	        this.UP_OFFSET = 32 / 4;
	        this.SEED_OFFSET = 44 / 4;
	        this.FORWARD_OFFSET = 48 / 4;
	        this.FOV_OFFSET = 60 / 4;
	        this.LOOKAT_OFFSET = 64 / 4;
	        this.APERTURE_OFFSET = 76 / 4;
	        this.BACKGROUND_COLOR_OFFSET = 80 / 4;
	        this.TIME0_OFFSET = 92 / 4;
	        this.TIME1_OFFSET = 96 / 4;
	        this.TILES_X = 100 / 4;
	        this.TILES_Y = 104 / 4;
	        this.TILE_OFFSET_X = 108 / 4;
	        this.TILE_OFFSET_Y = 112 / 4;
	        this.RAYS_PER_FRAME_OFFSET = 116 / 4;
	    }
	    getWidth() {
	        return this[this.WIDTH_OFFSET];
	    }
	    setWidth(value) {
	        this[this.WIDTH_OFFSET] = value;
	    }
	    getHeight() {
	        return this[this.HEIGHT_OFFSET];
	    }
	    setHeight(value) {
	        this[this.HEIGHT_OFFSET] = value;
	    }
	    getSeed() {
	        return this[this.SEED_OFFSET];
	    }
	    setSeed(value) {
	        this[this.SEED_OFFSET] = value;
	    }
	    getRaysPerFrame() {
	        return this[this.RAYS_PER_FRAME_OFFSET];
	    }
	    setRaysPerFrame(value) {
	        this[this.RAYS_PER_FRAME_OFFSET] = value;
	    }
	    getFieldOfView() {
	        return this[this.FOV_OFFSET];
	    }
	    setFieldOfView(value) {
	        this[this.FOV_OFFSET] = value;
	    }
	    getAperture() {
	        return this[this.APERTURE_OFFSET];
	    }
	    setAperture(value) {
	        this[this.APERTURE_OFFSET] = value;
	    }
	    getPosition(value) {
	        set$3(value, this[this.POSITION_OFFSET], this[this.POSITION_OFFSET + 1], this[this.POSITION_OFFSET + 2]);
	    }
	    setPosition(value) {
	        this[this.POSITION_OFFSET] = value[0];
	        this[this.POSITION_OFFSET + 1] = value[1];
	        this[this.POSITION_OFFSET + 2] = value[2];
	    }
	    getRight(value) {
	        set$3(value, this[this.RIGHT_OFFSET], this[this.RIGHT_OFFSET + 1], this[this.RIGHT_OFFSET + 2]);
	    }
	    setRight(value) {
	        this[this.RIGHT_OFFSET] = value[0];
	        this[this.RIGHT_OFFSET + 1] = value[1];
	        this[this.RIGHT_OFFSET + 2] = value[2];
	    }
	    getUp(value) {
	        set$3(value, this[this.UP_OFFSET], this[this.UP_OFFSET + 1], this[this.UP_OFFSET + 2]);
	    }
	    setUp(value) {
	        this[this.UP_OFFSET] = value[0];
	        this[this.UP_OFFSET + 1] = value[1];
	        this[this.UP_OFFSET + 2] = value[2];
	    }
	    getForward(value) {
	        set$3(value, this[this.FORWARD_OFFSET], this[this.FORWARD_OFFSET + 1], this[this.FORWARD_OFFSET + 2]);
	    }
	    setForward(value) {
	        this[this.FORWARD_OFFSET] = value[0];
	        this[this.FORWARD_OFFSET + 1] = value[1];
	        this[this.FORWARD_OFFSET + 2] = value[2];
	    }
	    getLookAt(value) {
	        set$3(value, this[this.LOOKAT_OFFSET], this[this.LOOKAT_OFFSET + 1], this[this.LOOKAT_OFFSET + 2]);
	    }
	    setLookAt(value) {
	        this[this.LOOKAT_OFFSET] = value[0];
	        this[this.LOOKAT_OFFSET + 1] = value[1];
	        this[this.LOOKAT_OFFSET + 2] = value[2];
	    }
	    getBackgroundColor(value) {
	        set$2(value, this[this.BACKGROUND_COLOR_OFFSET], this[this.BACKGROUND_COLOR_OFFSET + 1], this[this.BACKGROUND_COLOR_OFFSET + 2], 1);
	    }
	    setBackgroundColor(value) {
	        this[this.BACKGROUND_COLOR_OFFSET] = value[0];
	        this[this.BACKGROUND_COLOR_OFFSET + 1] = value[1];
	        this[this.BACKGROUND_COLOR_OFFSET + 2] = value[2];
	    }
	    getTime0() {
	        return this[this.TIME0_OFFSET];
	    }
	    setTime0(value) {
	        this[this.TIME0_OFFSET] = value;
	    }
	    getTime1() {
	        return this[this.TIME1_OFFSET];
	    }
	    setTime1(value) {
	        this[this.TIME1_OFFSET] = value;
	    }
	    getTilesX() {
	        return this[this.TILES_X];
	    }
	    setTilesX(value) {
	        this[this.TILES_X] = value;
	    }
	    getTilesY() {
	        return this[this.TILES_Y];
	    }
	    setTilesY(value) {
	        this[this.TILES_Y] = value;
	    }
	    getTileOffsetX() {
	        return this[this.TILE_OFFSET_X];
	    }
	    setTileOffsetX(value) {
	        this[this.TILE_OFFSET_X] = value;
	    }
	    getTileOffsetY() {
	        return this[this.TILE_OFFSET_Y];
	    }
	    setTileOffsetY(value) {
	        this[this.TILE_OFFSET_Y] = value;
	    }
	}
	ComputeUniformBufferData.SIZE = 128 / 4;

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class FullscreenQuadUniformBufferData extends Float32Array {
	    constructor() {
	        super(FullscreenQuadUniformBufferData.SIZE);
	        this.WIDTH_OFFSET = 0 / 4;
	        this.HEIGHT_OFFSET = 4 / 4;
	        this.SPP_OFFSET = 8 / 4;
	        this.EXPOSURE_OFFSET = 12 / 4;
	        this.MIN_DEPTH_OFFSET = 16 / 4;
	        this.MAX_DEPTH_OFFSET = 20 / 4;
	        this.EDGE_NORMAL_OFFSET = 24 / 4;
	        this.EDGE_DEPTH_OFFSET = 28 / 4;
	    }
	    getWidth() {
	        return this[this.WIDTH_OFFSET];
	    }
	    setWidth(value) {
	        this[this.WIDTH_OFFSET] = value;
	    }
	    getHeight() {
	        return this[this.HEIGHT_OFFSET];
	    }
	    setHeight(value) {
	        this[this.HEIGHT_OFFSET] = value;
	    }
	    getSamplesPerPixel() {
	        return this[this.SPP_OFFSET];
	    }
	    setSamplesPerPixel(value) {
	        this[this.SPP_OFFSET] = value;
	    }
	    getExposure() {
	        return this[this.EXPOSURE_OFFSET];
	    }
	    setExposure(value) {
	        this[this.EXPOSURE_OFFSET] = value;
	    }
	    getMinDepth() {
	        return this[this.MIN_DEPTH_OFFSET];
	    }
	    setMinDepth(value) {
	        this[this.MIN_DEPTH_OFFSET] = value;
	    }
	    getMaxDepth() {
	        return this[this.MAX_DEPTH_OFFSET];
	    }
	    setMaxDepth(value) {
	        this[this.MAX_DEPTH_OFFSET] = value;
	    }
	    getEdgeDepth() {
	        return this[this.EDGE_DEPTH_OFFSET];
	    }
	    setEdgeDepth(value) {
	        this[this.EDGE_DEPTH_OFFSET] = value;
	    }
	    getEdgeNormal() {
	        return this[this.EDGE_NORMAL_OFFSET];
	    }
	    setEdgeNormal(value) {
	        this[this.EDGE_NORMAL_OFFSET] = value;
	    }
	}
	FullscreenQuadUniformBufferData.SIZE = 32 / 4;

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class LinearBVHNodeBufferData extends Float32Array {
	    constructor(count) {
	        super(count * LinearBVHNodeBufferData.SIZE);
	        this.CENTER_OFFSET = 0 / 4;
	        this.SIZE_OFFSET = 16 / 4;
	        this.PRIMITIVES_OFFSET_OFFSET = 12 / 4;
	        this.SECOND_CHILD_OFFSET_OFFSET = 28 / 4;
	        this.N_PRIMITIVES_OFFSET = 32 / 4;
	        this.AXIS_OFFSET = 36 / 4;
	    }
	    getCenter(index, value) {
	        const offset = LinearBVHNodeBufferData.SIZE * index + this.CENTER_OFFSET;
	        set$3(value, this[offset], this[offset + 1], this[offset + 2]);
	    }
	    setCenter(index, value) {
	        const offset = LinearBVHNodeBufferData.SIZE * index + this.CENTER_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	    }
	    getSize(index, value) {
	        const offset = LinearBVHNodeBufferData.SIZE * index + this.SIZE_OFFSET;
	        set$3(value, this[offset], this[offset + 1], this[offset + 2]);
	    }
	    setSize(index, value) {
	        const offset = LinearBVHNodeBufferData.SIZE * index + this.SIZE_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	    }
	    getPrimitivesOffset(index) {
	        return this[LinearBVHNodeBufferData.SIZE * index + this.PRIMITIVES_OFFSET_OFFSET];
	    }
	    setPrimitivesOffset(index, value) {
	        this[LinearBVHNodeBufferData.SIZE * index + this.PRIMITIVES_OFFSET_OFFSET] = value;
	    }
	    getSecondChildOffset(index) {
	        return this[LinearBVHNodeBufferData.SIZE * index + this.SECOND_CHILD_OFFSET_OFFSET];
	    }
	    setSecondChildOffset(index, value) {
	        this[LinearBVHNodeBufferData.SIZE * index + this.SECOND_CHILD_OFFSET_OFFSET] = value;
	    }
	    getNPrimitives(index) {
	        return this[LinearBVHNodeBufferData.SIZE * index + this.N_PRIMITIVES_OFFSET];
	    }
	    setNPrimitives(index, value) {
	        this[LinearBVHNodeBufferData.SIZE * index + this.N_PRIMITIVES_OFFSET] = value;
	    }
	    getAxis(index) {
	        return this[LinearBVHNodeBufferData.SIZE * index + this.AXIS_OFFSET];
	    }
	    setAxis(index, value) {
	        this[LinearBVHNodeBufferData.SIZE * index + this.AXIS_OFFSET] = value;
	    }
	}
	LinearBVHNodeBufferData.SIZE = 48 / 4;

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	class LightBufferData extends Float32Array {
	    constructor(count) {
	        super(count * LightBufferData.SIZE);
	        this.ROTATION_OFFSET = 0 / 4;
	        this.CENTER_OFFSET = 16 / 4;
	        this.TYPE_OFFSET = 28 / 4;
	        this.SIZE_OFFSET = 32 / 4;
	        this.COLOR_OFFSET = 48 / 4;
	    }
	    getType(index) {
	        return this[LightBufferData.SIZE * index + this.TYPE_OFFSET];
	    }
	    setType(index, value) {
	        this[LightBufferData.SIZE * index + this.TYPE_OFFSET] = value;
	    }
	    getCenter(index, value) {
	        const offset = LightBufferData.SIZE * index + this.CENTER_OFFSET;
	        set$3(value, this[offset], this[offset + 1], this[offset + 2]);
	    }
	    setCenter(index, value) {
	        const offset = LightBufferData.SIZE * index + this.CENTER_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	    }
	    getSize(index, value) {
	        const offset = LightBufferData.SIZE * index + this.SIZE_OFFSET;
	        set$3(value, this[offset], this[offset + 1], this[offset + 2]);
	    }
	    setSize(index, value) {
	        const offset = LightBufferData.SIZE * index + this.SIZE_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	    }
	    getColor(index, value) {
	        const offset = LightBufferData.SIZE * index + this.COLOR_OFFSET;
	        set$3(value, this[offset], this[offset + 1], this[offset + 2]);
	    }
	    setColor(index, value) {
	        const offset = LightBufferData.SIZE * index + this.COLOR_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	    }
	    getRotation(index, value) {
	        const offset = LightBufferData.SIZE * index + this.ROTATION_OFFSET;
	        set$1(value, this[offset], this[offset + 1], this[offset + 2], this[offset + 3]);
	    }
	    setRotation(index, value) {
	        const offset = LightBufferData.SIZE * index + this.ROTATION_OFFSET;
	        this[offset] = value[0];
	        this[offset + 1] = value[1];
	        this[offset + 2] = value[2];
	        this[offset + 3] = value[3];
	    }
	}
	LightBufferData.SIZE = 64 / 4;

	/*!
	 * Copyright (c) Microsoft Corporation.
	 * Licensed under the MIT License.
	 */
	(undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	/**
	 * This file is for external facing export only, do not use this for internal references,
	 * as it may cause circular dependencies in Rollup.
	 */

	var types = /*#__PURE__*/Object.freeze({
		__proto__: null,
		MorphChartsCore: Core
	});

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
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

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
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
			? deepmerge$1(emptyTarget(value), value, options)
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
				destination[key] = deepmerge$1(target[key], source[key], options);
			}
		});
		return destination
	}

	function deepmerge$1(target, source, options) {
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

	deepmerge$1.all = function deepmergeAll(array, options) {
		if (!Array.isArray(array)) {
			throw new Error('first argument should be an array')
		}

		return array.reduce(function(prev, next) {
			return deepmerge$1(prev, next, options)
		}, {})
	};

	var deepmerge_1 = deepmerge$1;

	var _deepmerge = /*#__PURE__*/Object.freeze({
		__proto__: null,
		default: deepmerge_1
	});

	/*!
	 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
	 *
	 * Copyright (c) 2014-2017, Jon Schlinkert.
	 * Released under the MIT License.
	 */

	function isObject(o) {
	  return Object.prototype.toString.call(o) === '[object Object]';
	}

	function isPlainObject(o) {
	  var ctor,prot;

	  if (isObject(o) === false) return false;

	  // If has modified constructor
	  ctor = o.constructor;
	  if (ctor === undefined) return true;

	  // If has modified prototype
	  prot = ctor.prototype;
	  if (isObject(prot) === false) return false;

	  // If constructor does not have an Object-specific method
	  if (prot.hasOwnProperty('isPrototypeOf') === false) {
	    return false;
	  }

	  // Most likely a plain Object
	  return true;
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	const deepmerge = (deepmerge_1 || _deepmerge);
	function clone(objectToClone) {
	    if (!objectToClone)
	        return objectToClone;
	    return deepmerge.all([objectToClone]);
	}
	const dontMerge = (destination, source) => source;
	function deepMerge(...objectsToMerge) {
	    const objects = objectsToMerge.filter(Boolean);
	    return deepmerge.all(objects, { arrayMerge: dontMerge, isMergeableObject: isPlainObject });
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
	    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
	    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
	    reHex = /^#([0-9a-f]{3,8})$/,
	    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
	    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
	    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
	    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
	    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
	    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

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
	  copy(channels) {
	    return Object.assign(new this.constructor, this, channels);
	  },
	  displayable() {
	    return this.rgb().displayable();
	  },
	  hex: color_formatHex, // Deprecated! Use color.formatHex.
	  formatHex: color_formatHex,
	  formatHex8: color_formatHex8,
	  formatHsl: color_formatHsl,
	  formatRgb: color_formatRgb,
	  toString: color_formatRgb
	});

	function color_formatHex() {
	  return this.rgb().formatHex();
	}

	function color_formatHex8() {
	  return this.rgb().formatHex8();
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
	  brighter(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  darker(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  rgb() {
	    return this;
	  },
	  clamp() {
	    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
	  },
	  displayable() {
	    return (-0.5 <= this.r && this.r < 255.5)
	        && (-0.5 <= this.g && this.g < 255.5)
	        && (-0.5 <= this.b && this.b < 255.5)
	        && (0 <= this.opacity && this.opacity <= 1);
	  },
	  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
	  formatHex: rgb_formatHex,
	  formatHex8: rgb_formatHex8,
	  formatRgb: rgb_formatRgb,
	  toString: rgb_formatRgb
	}));

	function rgb_formatHex() {
	  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
	}

	function rgb_formatHex8() {
	  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
	}

	function rgb_formatRgb() {
	  const a = clampa(this.opacity);
	  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
	}

	function clampa(opacity) {
	  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
	}

	function clampi(value) {
	  return Math.max(0, Math.min(255, Math.round(value) || 0));
	}

	function hex(value) {
	  value = clampi(value);
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
	  brighter(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb() {
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
	  clamp() {
	    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
	  },
	  displayable() {
	    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
	        && (0 <= this.l && this.l <= 1)
	        && (0 <= this.opacity && this.opacity <= 1);
	  },
	  formatHsl() {
	    const a = clampa(this.opacity);
	    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
	  }
	}));

	function clamph(value) {
	  value = (value || 0) % 360;
	  return value < 0 ? value + 360 : value;
	}

	function clampt(value) {
	  return Math.max(0, Math.min(1, value || 0));
	}

	/* From FvD 13.37, CSS Color Module Level 3 */
	function hsl2rgb(h, m1, m2) {
	  return (h < 60 ? m1 + (m2 - m1) * h / 60
	      : h < 180 ? m2
	      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
	      : m1) * 255;
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
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

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	/**
	 * This file is for external facing export only, do not use this for internal references,
	 * as it may cause circular dependencies in Rollup.
	 */

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
		mount: mount,
		outerSize: outerSize,
		push: push,
		setActiveElement: setActiveElement
	});

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	const minHeight = '100px';
	const minWidth = '100px';
	const defaultPresenterStyle = {
	    cssPrefix: 'vega-morphcharts-',
	    defaultCubeColor: [128, 128, 128, 255],
	    highlightColor: [0, 0, 0, 255],
	};
	const defaultPresenterConfig = {
	    onCubeClick: (e, cube) => { },
	    onCubeHover: (e, cube) => { },
	    transitionDurations: {
	        position: 600,
	        stagger: 600,
	        view: 600,
	    },
	    renderer: {
	        advanced: false,
	        advancedOptions: {},
	        basicOptions: {
	            antialias: true,
	        },
	    },
	};
	function createStage(view) {
	    const stage = {
	        view,
	        cubeData: [],
	        pathData: [],
	        axes: {
	            x: [],
	            y: [],
	            z: [],
	        },
	        gridLines: [],
	        textData: [],
	        legend: {
	            rows: {},
	        },
	        facets: [],
	    };
	    return stage;
	}
	const groupStrokeWidth = 1;
	const lineZ = 0;
	const defaultView = '2d';
	const minZ = 0.5;
	const min3dDepth = 0.05;
	const minPixelSize = 0.5;
	const zAxisEncodeColor = [7, 7, 7, 255];
	const zAxisOutColor = [0, 0, 0, 255];
	function defaultOnAxisItem(vegaItem, stageItem, stage, currAxis) {
	    if (colorIsEqual(stageItem.color, zAxisEncodeColor)) {
	        stageItem.color = zAxisOutColor;
	        if (currAxis.axisRole !== 'z') {
	            const previousAxisRole = removeCurrentAxes(stage, currAxis);
	            if (previousAxisRole) {
	                currAxis.axisRole = 'z';
	                stage.axes.z.push(currAxis);
	            }
	        }
	    }
	}
	function removeCurrentAxes(stage, currAxis) {
	    //find the current axis, remove it from parent
	    for (const axisRole in stage.axes) {
	        const axes = stage.axes[axisRole];
	        for (let i = 0; i < axes.length; i++) {
	            if (axes[i] === currAxis) {
	                axes.splice(i, 1);
	                return axisRole;
	            }
	        }
	    }
	}

	var defaults = /*#__PURE__*/Object.freeze({
		__proto__: null,
		createStage: createStage,
		defaultOnAxisItem: defaultOnAxisItem,
		defaultPresenterConfig: defaultPresenterConfig,
		defaultPresenterStyle: defaultPresenterStyle,
		defaultView: defaultView,
		groupStrokeWidth: groupStrokeWidth,
		lineZ: lineZ,
		min3dDepth: min3dDepth,
		minHeight: minHeight,
		minPixelSize: minPixelSize,
		minWidth: minWidth,
		minZ: minZ
	});

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	const vega = {
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
	    View: null,
	};
	/**
	 * References to dependency libraries.
	 */
	const base = {
	    vega,
	};
	/**
	 * Specify the dependency libraries to use for rendering.
	 * @param vega Vega library.
	 */
	function use(vega) {
	    base.vega = vega;
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	/**
	 * HTML elements outputted by the presenter.
	 */
	exports.PresenterElement = void 0;
	(function (PresenterElement) {
	    PresenterElement[PresenterElement["root"] = 0] = "root";
	    PresenterElement[PresenterElement["gl"] = 1] = "gl";
	    PresenterElement[PresenterElement["panel"] = 2] = "panel";
	    PresenterElement[PresenterElement["legend"] = 3] = "legend";
	    PresenterElement[PresenterElement["vegaControls"] = 4] = "vegaControls";
	})(exports.PresenterElement || (exports.PresenterElement = {}));

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
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
	                { className: 'label', content: row.label, title: row.label },
	            ],
	        });
	    };
	    const sorted = Object.keys(props.legend.rows).sort((a, b) => +a - +b);
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
	                borderColor: symbol.fill,
	            } }));
	    },
	};

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
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

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	function patchCubeArray(allocatedSize, empty, cubes) {
	    const patched = new Array(allocatedSize);
	    patched.fill(empty);
	    cubes.forEach(cube => patched[cube.ordinal] = cube);
	    return patched;
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
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
	    },
	};
	const markStager$5 = (options, stage, scene, x, y, groupType) => {
	    base.vega.sceneVisit(scene, function (item) {
	        const fn = legendMap[item.mark.role];
	        if (fn) {
	            fn(stage.legend, item);
	        }
	    });
	};

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	const markStager$4 = (options, stage, scene, x, y, groupType) => {
	    base.vega.sceneVisit(scene, function (item) {
	        const { bounds, height, url, width } = item;
	        let { x1, x2, y1, y2 } = bounds;
	        x1 += x;
	        x2 += x;
	        y1 += y;
	        y2 += y;
	        if (!stage.backgroundImages) {
	            stage.backgroundImages = [];
	        }
	        stage.backgroundImages.push({ bounds: { x1, x2, y1, y2 }, height, url, width });
	    });
	};

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	const markStager$3 = (options, stage, scene, x, y, groupType) => {
	    base.vega.sceneVisit(scene, function (item) {
	        const noZ = item.z === undefined;
	        const z = noZ ? 0 : (item.z || 0) + minZ;
	        const depth = (noZ ? 0 : (item.depth || 0)) + min3dDepth;
	        //change direction of y from SVG to GL
	        const ty = -1;
	        const ordinal = options.assignCubeOrdinal(item.datum);
	        if (ordinal > options.maxOrdinal) {
	            options.maxOrdinal = ordinal;
	        }
	        if (ordinal === undefined) ;
	        else {
	            const cube = {
	                ordinal,
	                size: [item.width, item.height, depth],
	                position: [x + ((+item.x) || 0), ty * (y + ((+item.y) || 0)) - (+item.height), z],
	                color: colorFromString(item.fill) || options.defaultCubeColor || [128, 128, 128, 128],
	            };
	            cube.color[3] = item.opacity === undefined ? 255 : 255 * item.opacity;
	            stage.cubeData.push(cube);
	        }
	    });
	};

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	const markStager$2 = (options, stage, scene, x, y, groupType) => {
	    base.vega.sceneVisit(scene, function (item) {
	        const x1 = item.x || 0;
	        const y1 = item.y || 0;
	        const x2 = item.x2 != null ? item.x2 : x1;
	        const y2 = item.y2 != null ? item.y2 : y1;
	        const lineItem = styledLine(x1 + x, y1 + y, x2 + x, y2 + y, item.stroke, item.strokeWidth);
	        const { currAxis } = options;
	        if (options.modifyAxis) {
	            options.modifyAxis(item, lineItem, stage, currAxis);
	        }
	        if (item.mark.role === 'axis-tick') {
	            currAxis.ticks.push(lineItem);
	        }
	        else if (item.mark.role === 'axis-domain') {
	            currAxis.domain = lineItem;
	        }
	        else {
	            stage.gridLines.push(lineItem);
	        }
	    });
	};
	function styledLine(x1, y1, x2, y2, stroke, strokeWidth) {
	    const line = {
	        sourcePosition: [x1, -y1, lineZ], //-1 = change direction of y from SVG to GL
	        targetPosition: [x2, -y2, lineZ],
	        color: colorFromString(stroke),
	        strokeWidth: strokeWidth,
	    };
	    return line;
	}
	function box(gx, gy, height, width, stroke, strokeWidth, diagonals = false) {
	    const lines = [
	        styledLine(gx, gy, gx + width, gy, stroke, strokeWidth),
	        styledLine(gx + width, gy, gx + width, gy + height, stroke, strokeWidth),
	        styledLine(gx + width, gy + height, gx, gy + height, stroke, strokeWidth),
	        styledLine(gx, gy + height, gx, gy, stroke, strokeWidth),
	    ];
	    if (diagonals) {
	        lines.push(styledLine(gx, gy, gx + width, gy + height, stroke, strokeWidth));
	        lines.push(styledLine(gx, gy + height, gx + width, gy, stroke, strokeWidth));
	    }
	    return lines;
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	//change direction of y from SVG to GL
	const ty = -1;
	const markStager$1 = (options, stage, scene, x, y, groupType) => {
	    const g = Object.assign({ opacity: 1, strokeOpacity: 1, strokeWidth: 1 }, scene.items[0]);
	    const path = {
	        strokeWidth: g.strokeWidth,
	        strokeColor: colorFromString(g.stroke),
	        positions: scene.items.map((it) => [
	            it.x,
	            ty * it.y,
	            it.z || 0,
	        ]),
	    };
	    path.strokeColor[3] *= g.strokeOpacity;
	    path.strokeColor[3] *= g.opacity;
	    stage.pathData.push(path);
	};

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	// import { AlignmentBaseline, TextAnchor } from '@deck.gl/layers/text-layer/text-layer';
	const markStager = (options, stage, scene, x, y, groupType) => {
	    //change direction of y from SVG to GL
	    const ty = -1;
	    base.vega.sceneVisit(scene, function (item) {
	        if (!item.text)
	            return;
	        const size = item.fontSize;
	        //const alignmentBaseline = convertBaseline(item.baseline);
	        //const yOffset = alignmentBaseline === 'top' ? item.fontSize / 2 : 0;    //fixup to get tick text correct
	        const yOffset = 0;
	        const textItem = {
	            color: colorFromString(item.fill),
	            text: item.limit === undefined ? item.text : base.vega.truncate(item.text, item.limit, 'right', item.ellipsis || '...'), //use dots instead of unicode ellipsis for
	            position: [x + (item.x || 0), ty * (y + (item.y || 0) + yOffset), 0],
	            size,
	            angle: convertAngle(item.angle),
	            //textAnchor: convertAlignment(item.align),
	            //alignmentBaseline,
	            metaData: item.metaData,
	        };
	        const { currAxis } = options;
	        if (options.modifyAxis) {
	            options.modifyAxis(item, textItem, stage, currAxis);
	        }
	        if (item.mark.role === 'axis-label') {
	            const tickText = textItem;
	            tickText.value = item.datum.value;
	            currAxis.tickText.push(tickText);
	        }
	        else if (item.mark.role === 'axis-title') {
	            currAxis.title = textItem;
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

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	var GroupType;
	(function (GroupType) {
	    GroupType[GroupType["none"] = 0] = "none";
	    GroupType[GroupType["legend"] = 1] = "legend";
	    GroupType[GroupType["xAxis"] = 2] = "xAxis";
	    GroupType[GroupType["yAxis"] = 3] = "yAxis";
	    GroupType[GroupType["zAxis"] = 4] = "zAxis";
	})(GroupType || (GroupType = {}));

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	function getAxisGroupType(item, options) {
	    const axisItem = item;
	    const axisMark = axisItem === null || axisItem === void 0 ? void 0 : axisItem.mark;
	    if ((axisMark === null || axisMark === void 0 ? void 0 : axisMark.zindex) === options.zAxisZindex && options.zAxisZindex !== undefined) {
	        return GroupType.zAxis;
	    }
	    switch (axisItem.orient) {
	        case 'bottom':
	        case 'top':
	            return GroupType.xAxis;
	        case 'left':
	        case 'right':
	            return GroupType.yAxis;
	    }
	}
	function convertGroupRole(item, options) {
	    if (item.mark.role === 'legend')
	        return GroupType.legend;
	    if (item.mark.role === 'axis') {
	        const groupType = getAxisGroupType(item, options);
	        if (groupType !== undefined) {
	            return groupType;
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
	                lines: box(gx + x, gy + y, g.height, g.width, g.stroke, groupStrokeWidth),
	            };
	            stage.facets.push(facetRect);
	        }
	        groupType = convertGroupRole(g, options) || groupType;
	        setCurrentAxis(options, stage, groupType);
	        // draw group contents
	        base.vega.sceneVisit(g, function (item) {
	            mainStager(options, stage, item, gx + x, gy + y, groupType);
	        });
	    });
	};
	function setCurrentAxis(options, stage, groupType) {
	    let axisRole;
	    switch (groupType) {
	        case GroupType.xAxis:
	            axisRole = 'x';
	            break;
	        case GroupType.yAxis:
	            axisRole = 'y';
	            break;
	        case GroupType.zAxis:
	            axisRole = 'z';
	            break;
	        default:
	            return;
	    }
	    options.currAxis = {
	        axisRole,
	        domain: null,
	        tickText: [],
	        ticks: [],
	    };
	    stage.axes[axisRole].push(options.currAxis);
	}
	const markStagers = {
	    group,
	    legend: markStager$5,
	    image: markStager$4,
	    rect: markStager$3,
	    rule: markStager$2,
	    line: markStager$1,
	    text: markStager,
	};
	const mainStager = (options, stage, scene, x, y, groupType) => {
	    if (scene.marktype !== 'group' && groupType === GroupType.legend) {
	        markStager$5(options, stage, scene);
	    }
	    else {
	        const markStager = markStagers[scene.marktype];
	        if (markStager) {
	            markStager(options, stage, scene, x, y, groupType);
	        }
	    }
	};
	function sceneToStage(options, stage, scene) {
	    mainStager(options, stage, scene, 0, 0, null);
	    sortAxis(stage.axes.x, 0);
	    sortAxis(stage.axes.y, 1);
	    sortAxis(stage.axes.z, 1);
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

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	function outerBounds(b1, b2) {
	    if (!b1 && !b2)
	        return;
	    if (!b1)
	        return b2;
	    if (!b2)
	        return b1;
	    const minProps = [
	        'minBoundsX',
	        'minBoundsY',
	        'minBoundsZ',
	    ];
	    const maxProps = [
	        'maxBoundsX',
	        'maxBoundsY',
	        'maxBoundsZ',
	    ];
	    const result = {};
	    minProps.forEach(p => result[p] = notNull(Math.min, b1[p], b2[p]));
	    maxProps.forEach(p => result[p] = notNull(Math.max, b1[p], b2[p]));
	    return result;
	}
	function notNull(fn, v1, v2) {
	    if (v1 == null && v2 == null)
	        return null;
	    if (v1 == null)
	        return v2;
	    if (v2 == null)
	        return v1;
	    return fn(v1, v2);
	}
	function increment(b, minBoundsX, minBoundsY, minBoundsZ, maxBoundsX, maxBoundsY, maxBoundsZ) {
	    return outerBounds(b, {
	        minBoundsX,
	        minBoundsY,
	        minBoundsZ,
	        maxBoundsX,
	        maxBoundsY,
	        maxBoundsZ,
	    });
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	const createAxesLayer = (props) => {
	    const { config, height, ref, stage } = props;
	    const { core } = ref;
	    const { renderer } = core;
	    const { x, y, z } = stage.axes;
	    const xyz = [...x, ...y, ...z];
	    renderer.currentAxes = [];
	    if (!xyz.length) {
	        renderer.axesVisibility = AxesVisibility.none;
	        return;
	    }
	    renderer.axesVisibility = AxesVisibility.current;
	    const correlation = new AxesCorrelation(stage, 3);
	    const { axesSets, labels } = correlation;
	    const grid = correlation.getGrid();
	    if (grid.byColumn[0]) {
	        grid.byColumn[0].forEach(row => { row.axesSet.showFacetTitleY = true; });
	        grid.byRow[0].forEach(col => { col.axesSet.showFacetTitleX = true; });
	    }
	    if (grid.rows > 1) {
	        const { byRow } = grid;
	        byRow[0].forEach(({ axesSet }, col) => {
	            if (!axesSet.y) {
	                if (byRow[1][col].axesSet) {
	                    //move x up
	                    byRow[1][col].axesSet.x.tickText = axesSet.x.tickText;
	                    byRow[1][col].axesSet.showFacetTitleX = axesSet.showFacetTitleX;
	                    delete axesSet.x;
	                }
	            }
	        });
	    }
	    let bounds;
	    const allAxesSetBounds = [];
	    let anyZ = false;
	    for (let i = 0; i < axesSets.length; i++) {
	        if (axesSets[i].z) {
	            anyZ = true;
	            break;
	        }
	    }
	    const is3d = stage.view === '3d' && anyZ;
	    axesSets.forEach(axesSet => {
	        if (!axesSet.x && !axesSet.y)
	            return;
	        const axesSetBounds = {
	            axesSet,
	            maxBoundsX: null,
	            maxBoundsY: null,
	            maxBoundsZ: null,
	            minBoundsX: null,
	            minBoundsY: null,
	            minBoundsZ: null,
	        };
	        if (is3d) {
	            const zBounds = getDomainBounds(1, axesSet.z);
	            axesSetBounds.minBoundsZ = -zBounds.maxBounds;
	            axesSetBounds.maxBoundsZ = -zBounds.minBounds;
	        }
	        const yBounds = getDomainBounds(1, axesSet.y);
	        axesSetBounds.minBoundsY = yBounds.minBounds;
	        axesSetBounds.maxBoundsY = yBounds.maxBounds;
	        axesSetBounds.y = yBounds.minBounds;
	        axesSetBounds.h = yBounds.maxBounds - yBounds.minBounds;
	        const xBounds = getDomainBounds(0, axesSet.x);
	        axesSetBounds.minBoundsX = xBounds.minBounds;
	        axesSetBounds.maxBoundsX = xBounds.maxBounds;
	        axesSetBounds.x = xBounds.minBounds;
	        axesSetBounds.w = xBounds.maxBounds - xBounds.minBounds;
	        allAxesSetBounds.push(axesSetBounds);
	        bounds = outerBounds(bounds, axesSetBounds);
	    });
	    const facetLabelX = labels.filter(label => label.axisRole === 'x')[0];
	    const facetLabelY = labels.filter(label => label.axisRole === 'y')[0];
	    core.inputManager.pickAxesTitleCallback = ({ axis, axes, manipulator }) => {
	        const axesSet = axesSets[axes];
	        let a;
	        let f;
	        switch (axis) {
	            case 0: {
	                a = axesSet.x;
	                f = facetLabelX;
	                break;
	            }
	            case 1: {
	                a = axesSet.y;
	                f = facetLabelY;
	                break;
	            }
	            case 2: {
	                a = axesSet.z;
	                break;
	            }
	        }
	        if (a) {
	            config.onTextClick(manipulator.event, a.title || f.title);
	        }
	    };
	    allAxesSetBounds.forEach(axesSetBounds => {
	        const { axesSet } = axesSetBounds;
	        if (!axesSet.x && !axesSet.y)
	            return;
	        const cartesian = new (is3d ? Cartesian3dAxes : Cartesian2dAxes)(core);
	        cartesian.isDivisionPickingEnabled = [false, false, false];
	        cartesian.arePickDivisionsVisible = [false, false, false];
	        cartesian.isLabelPickingEnabled = [false, false, false];
	        cartesian.isTitlePickingEnabled = [false, false, false];
	        cartesian.isGridPickingEnabled = false;
	        cartesian.isHeadingPickingEnabled = [false, false, false];
	        createAxes(cartesian, 0, 0, axesSet.x, AxesTextOrientation.perpendicular, height, props, axesSet.showFacetTitleX && facetLabelX);
	        createAxes(cartesian, 1, 1, axesSet.y, AxesTextOrientation.perpendicular, height, props, axesSet.showFacetTitleY && facetLabelY);
	        if (is3d) {
	            createAxes(cartesian, 1, 2, axesSet.z, AxesTextOrientation.perpendicular, height, props);
	        }
	        configCartesianAxes(is3d, bounds, cartesian);
	        const { maxBoundsX, maxBoundsY, minBoundsX, minBoundsY, } = bounds;
	        const w = maxBoundsX - minBoundsX;
	        const h = maxBoundsY - minBoundsY;
	        cartesian.scalingX = axesSetBounds.w / w;
	        cartesian.scalingY = axesSetBounds.h / h;
	        cartesian.offsetX = ((axesSetBounds.x - minBoundsX + axesSetBounds.w / 2) / w) - 0.5;
	        cartesian.offsetY = ((axesSetBounds.y - minBoundsY + axesSetBounds.h / 2) / h) - 0.5;
	        const aspect = (h / w);
	        if (aspect > 1) {
	            cartesian.offsetX /= aspect;
	        }
	        else {
	            cartesian.offsetY *= aspect;
	        }
	        const axes = is3d ? renderer.createCartesian3dAxesVisual(cartesian) : renderer.createCartesian2dAxesVisual(cartesian);
	        renderer.currentAxes.push(axes);
	        props.config.onAxesComplete && props.config.onAxesComplete(cartesian);
	    });
	    return { bounds };
	};
	const nullDomain = {
	    sourcePosition: [0, 0, 0],
	    targetPosition: [0, 0, 0],
	};
	class AxesCorrelation {
	    constructor(stage, dimensions) {
	        this.dimensions = dimensions;
	        const { x, y, z } = stage.axes;
	        this.axesSets = [];
	        this.labels = [];
	        [x, y, z].forEach(axes => {
	            axes.forEach(axis => {
	                if (this.axesSets.length === 0) {
	                    this.initialize(axis);
	                }
	                else {
	                    this.correlate(axis);
	                }
	            });
	        });
	    }
	    getGrid() {
	        const mapCols = {};
	        const mapRows = {};
	        this.axesSets.forEach(axesSet => {
	            var _a;
	            const domain = (_a = axesSet === null || axesSet === void 0 ? void 0 : axesSet.x) === null || _a === void 0 ? void 0 : _a.domain;
	            if (!domain)
	                return;
	            const col = domain.sourcePosition[0].toString();
	            const row = domain.sourcePosition[1].toString();
	            if (!mapCols[col]) {
	                mapCols[col] = {};
	            }
	            mapCols[col][row] = axesSet;
	            mapRows[row] = null;
	        });
	        const colKeys = Object.keys(mapCols).sort((a, b) => +a - +b);
	        const rowKeys = Object.keys(mapRows).sort((a, b) => +a - +b);
	        return {
	            cols: colKeys.length,
	            rows: rowKeys.length,
	            byColumn: colKeys.map(colKey => rowKeys.map(rowKey => { return { colKey, rowKey, axesSet: mapCols[colKey][rowKey] }; })),
	            byRow: rowKeys.map(rowKey => colKeys.map(colKey => { return { colKey, rowKey, axesSet: mapCols[colKey][rowKey] }; })),
	        };
	    }
	    initialize(axis) {
	        if (!axis.domain) {
	            this.labels.push(axis);
	            return;
	        }
	        const axesSet = {};
	        axesSet[axis.axisRole] = axis;
	        this.axesSets.push(axesSet);
	    }
	    correlate(axis) {
	        if (!axis.domain) {
	            this.labels.push(axis);
	            return;
	        }
	        for (let i = 0; i < this.axesSets.length; i++) {
	            const axesSet = this.axesSets[i];
	            for (const axisRole in axesSet) {
	                const test = axesSet[axisRole];
	                if (this.matchDomains(axis.domain, test.domain)) {
	                    //prefer the axes with titles
	                    if (!axesSet[axis.axisRole] || (!axesSet[axis.axisRole].tickText.length && axis.tickText.length)) {
	                        axesSet[axis.axisRole] = axis;
	                    }
	                    return;
	                }
	            }
	        }
	        this.initialize(axis);
	    }
	    matchDomains(a, b) {
	        if (this.matchPoint(a.sourcePosition, b.sourcePosition))
	            return true;
	        if (this.matchPoint(a.sourcePosition, b.targetPosition))
	            return true;
	        if (this.matchPoint(a.targetPosition, b.targetPosition))
	            return true;
	        if (this.matchPoint(a.targetPosition, b.sourcePosition))
	            return true;
	        return false;
	    }
	    matchPoint(a, b) {
	        for (let i = 0; i < this.dimensions; i++) {
	            if (a[i] !== b[i])
	                return false;
	        }
	        return true;
	    }
	}
	function createAxes(cartesian, dim2d, dim3d, axis, orientation, height, props, facetLabel) {
	    const domain = (axis === null || axis === void 0 ? void 0 : axis.domain) || nullDomain;
	    const { tickPositions, tickText, textPos, textSize } = convertAxis(axis, domain, dim2d, height);
	    if (axis.axisRole === 'z') {
	        tickPositions.forEach((t, i) => tickPositions[i] = 1 - t);
	        textPos.forEach((t, i) => textPos[i] = 1 - t);
	        tickText.reverse();
	        tickPositions.reverse();
	        textPos.reverse();
	    }
	    cartesian.setTickPositions(dim3d, tickPositions);
	    cartesian.zero[dim3d] = 0; //TODO get any "zero" gridline position from vega
	    cartesian.setLabelPositions(dim3d, textPos);
	    cartesian.setLabels(dim3d, tickText);
	    cartesian.setLabelSizes(dim3d, textSize);
	    const title = (axis === null || axis === void 0 ? void 0 : axis.title) || (facetLabel === null || facetLabel === void 0 ? void 0 : facetLabel.title);
	    if (title === null || title === void 0 ? void 0 : title.text) {
	        cartesian.setTitle(dim3d, title.text);
	        cartesian.setTitleSize(dim3d, title.size / height);
	    }
	    cartesian.setLabelOrientation(dim3d, orientation);
	    props.config.onAxisConfig && props.config.onAxisConfig(cartesian, dim3d, axis);
	    return {
	        tickText,
	    };
	}
	function configCartesianAxes(is3d, bounds, cartesian) {
	    if (is3d) {
	        cartesian.isEdgeVisible[Edge3D.topBack] = false;
	    }
	    cartesian.isEdgeVisible[Edge3D.backRight] = false;
	    cartesian.isEdgeVisible[Edge3D.bottomRight] = false;
	    cartesian.isEdgeVisible[Edge3D.frontRight] = false;
	    cartesian.isEdgeVisible[Edge3D.topFront] = false;
	    cartesian.isEdgeVisible[Edge3D.topRight] = false;
	    const { maxBoundsX, maxBoundsY, maxBoundsZ, minBoundsX, minBoundsY, minBoundsZ, } = bounds;
	    cartesian.minBoundsX = minBoundsX;
	    cartesian.maxBoundsX = maxBoundsX;
	    cartesian.minBoundsY = minBoundsY;
	    cartesian.maxBoundsY = maxBoundsY;
	    if (is3d) {
	        cartesian.minBoundsZ = minBoundsZ;
	        cartesian.maxBoundsZ = maxBoundsZ;
	    }
	}
	function getDomainBounds(dim2d, axis) {
	    const domain = (axis === null || axis === void 0 ? void 0 : axis.domain) || nullDomain;
	    const minBounds = domain.sourcePosition[dim2d];
	    const maxBounds = domain.targetPosition[dim2d];
	    return {
	        maxBounds,
	        minBounds,
	    };
	}
	function convertAxis(axis, domain, dim, height) {
	    const start = domain.sourcePosition[dim];
	    const span = domain.targetPosition[dim] - start;
	    const tickPositions = axis
	        ?
	            axis.ticks.map(t => (t.sourcePosition[dim] - start) / span)
	        :
	            [];
	    const tickText = axis ?
	        axis.tickText.map(t => t.text)
	        :
	            [];
	    const textPos = axis ?
	        axis.tickText.map(t => (t.position[dim] - start) / span)
	        :
	            [];
	    const textSize = axis ?
	        axis.tickText.map(t => t.size / height)
	        :
	            [];
	    if (tickPositions.length) {
	        if (tickPositions[0] !== 0) {
	            tickPositions[0] = 0;
	        }
	        if (tickPositions[tickPositions.length - 1] !== 1) {
	            tickPositions[tickPositions.length - 1] = 1;
	        }
	    }
	    return {
	        tickPositions,
	        tickText,
	        textPos,
	        textSize,
	    };
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	class ColorMap {
	    constructor(quant = 5) {
	        this.quant = quant;
	        this.colorMap = {};
	        this.colorArray = [];
	    }
	    getColorKey(rgbaColor) {
	        const color = rgbaColor.slice(0, 3).map(e => Math.floor(e / this.quant) * this.quant);
	        color[3] = rgbaColor[3]; //retain alpha
	        return JSON.stringify(color);
	    }
	    registerColor(rgbaColor) {
	        const colorKey = this.getColorKey(rgbaColor);
	        if (!this.colorMap[colorKey]) {
	            this.colorMap[colorKey] = {
	                index: this.colorArray.length,
	                rgbaColor,
	            };
	            this.colorArray.push(rgbaColor);
	        }
	        return this.colorMap[colorKey].index;
	    }
	    getPalette() {
	        return {
	            palette: new Uint8Array(this.colorArray.flat()),
	            maxColor: this.colorArray.length - 1,
	        };
	    }
	}
	function convert$3(newColor) {
	    const c = colorFromString(newColor).slice(0, 3);
	    return c.map(v => v / 255);
	}
	function colorConfig(ref, colors) {
	    if (!colors)
	        return;
	    const { config } = ref.core;
	    config.activeColor = convert$3(colors.activeItemColor);
	    config.backgroundColor = new Float32Array(convert$3(colors.backgroundColor));
	    config.textColor = convert$3(colors.textColor);
	    config.textBorderColor = convert$3(colors.textBorderColor);
	    config.axesTextColor = convert$3(colors.axesTextLabelColor);
	    config.axesGridBackgroundColor = convert$3(colors.axesGridBackgroundColor);
	    config.axesGridHighlightColor = convert$3(colors.axesGridHighlightColor);
	    config.axesGridMinorColor = convert$3(colors.axesGridMinorColor);
	    config.axesGridMajorColor = convert$3(colors.axesGridMajorColor);
	    config.axesGridZeroColor = convert$3(colors.axesGridZeroColor);
	    //TODO fix this - hack to reset the background color
	    ref.core.renderer['_theme'] = null;
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	const key$1 = 'cube';
	const createCubeLayer = (props) => {
	    const { ref, stage } = props;
	    const { core } = ref;
	    const scatter = new Scatter(core);
	    const { ids, colors, positionsX, positionsY, positionsZ, sizesX, sizesY, sizesZ, bounds, maxColor, palette, } = convert$2(stage);
	    if (!ids.length)
	        return;
	    const { renderer } = core;
	    let cubeTransitionBuffer = renderer.transitionBuffers.find(t => t.key === key$1);
	    if (!cubeTransitionBuffer) {
	        cubeTransitionBuffer = renderer.createTransitionBuffer(ids);
	        cubeTransitionBuffer.key = key$1;
	        renderer.transitionBuffers.push(cubeTransitionBuffer);
	    }
	    else {
	        cubeTransitionBuffer.swap();
	    }
	    scatter.layout(cubeTransitionBuffer.currentBuffer, ids, {
	        positionsX,
	        positionsY,
	        positionsZ,
	    });
	    const layer = {
	        positionsX,
	        positionsY,
	        positionsZ,
	        update: (newBounds, selected, stagger) => {
	            const { colors, maxColor, minColor, palette } = layer.unitColorMap;
	            // reference off of core.renderer to get the actual buffer
	            const currCubeTransitionBuffer = core.renderer.transitionBuffers.find(t => t.key === key$1);
	            currCubeTransitionBuffer.currentBuffer.unitType = UnitType.block;
	            currCubeTransitionBuffer.currentPalette.colors = palette;
	            let options = Object.assign({ selected,
	                colors,
	                minColor,
	                maxColor,
	                sizesX,
	                sizesY,
	                sizesZ }, newBounds);
	            if (stagger === null || stagger === void 0 ? void 0 : stagger.staggerOrders) {
	                const { maxStaggerOrder, minStaggerOrder, staggerOrders } = stagger;
	                options = Object.assign(Object.assign({}, options), { maxStaggerOrder,
	                    minStaggerOrder,
	                    staggerOrders });
	            }
	            scatter.update(currCubeTransitionBuffer.currentBuffer, ids, options);
	        },
	        bounds,
	        unitColorMap: {
	            colors,
	            ids,
	            minColor: 0,
	            maxColor,
	            palette,
	        },
	    };
	    return layer;
	};
	function convert$2(stage) {
	    const { cubeData } = stage;
	    const { length } = cubeData;
	    const ids = [];
	    const colors = new Float64Array(length);
	    const positionsX = new Float64Array(length);
	    const positionsY = new Float64Array(length);
	    const positionsZ = new Float64Array(length);
	    const sizesX = new Float64Array(length);
	    const sizesY = new Float64Array(length);
	    const sizesZ = new Float64Array(length);
	    let bounds;
	    const colorMap = new ColorMap();
	    cubeData.forEach((cube, i) => {
	        ids.push(i);
	        if (cube.isEmpty) {
	            positionsX[i] = 0;
	            positionsY[i] = 0;
	            positionsZ[i] = 0;
	            sizesX[i] = 0;
	            sizesY[i] = 0;
	            sizesZ[i] = 0;
	            colors[i] = 0;
	        }
	        else {
	            //ids.push(cube.ordinal);
	            positionsX[i] = cube.position[0] + cube.size[0] * 0.5;
	            positionsY[i] = cube.position[1] + cube.size[1] * 0.5;
	            positionsZ[i] = cube.position[2] + cube.size[2] * 0.5;
	            sizesX[i] = cube.size[0];
	            sizesY[i] = cube.size[1];
	            sizesZ[i] = cube.size[2];
	            bounds = increment(bounds, cube.position[0], cube.position[1], cube.position[2], cube.position[0] + cube.size[0], cube.position[1] + cube.size[1], cube.position[2] + cube.size[2]);
	            colors[i] = colorMap.registerColor(cube.color);
	        }
	    });
	    const { palette, maxColor } = colorMap.getPalette();
	    return {
	        ids: new Uint32Array(ids),
	        colors,
	        positionsX,
	        positionsY,
	        positionsZ,
	        sizesX,
	        sizesY,
	        sizesZ,
	        bounds,
	        maxColor,
	        palette,
	    };
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	const key = 'line';
	const createLineLayer = (props) => {
	    const { height, ref, stage, width } = props;
	    const { core } = ref;
	    const lines = new Line(core);
	    const { ids, fromIds, toIds, lineColors, lineSizes, bounds, positionsX, positionsY, positionsZ, lineMaxColor, palette, } = convert$1(stage, height);
	    if (!ids.length)
	        return;
	    const { renderer } = core;
	    let lineTransitionBuffer = renderer.transitionBuffers.find(t => t.key === key);
	    if (!lineTransitionBuffer) {
	        lineTransitionBuffer = renderer.createTransitionBuffer(ids);
	        lineTransitionBuffer.key = key;
	        renderer.transitionBuffers.push(lineTransitionBuffer);
	    }
	    else {
	        lineTransitionBuffer.swap();
	    }
	    lines.layout(lineTransitionBuffer.currentBuffer, ids, fromIds, toIds, {
	        positionsX,
	        positionsY,
	        positionsZ,
	        lineSizes,
	        sizeScaling: 1,
	    });
	    let options = {
	        lineColors,
	        lineMinColor: 0,
	        lineMaxColor,
	    };
	    // Unit type
	    lineTransitionBuffer.currentBuffer.unitType = UnitType.cylinder;
	    lineTransitionBuffer.currentPalette.colors = palette;
	    return {
	        update: newBounds => {
	            options = Object.assign(Object.assign({}, options), newBounds);
	            // reference off of core.renderer to get the actual buffer
	            const currLineTransitionBuffer = core.renderer.transitionBuffers.find(t => t.key === key);
	            lines.update(currLineTransitionBuffer.currentBuffer, ids, fromIds, toIds, options);
	        },
	        bounds,
	        unitColorMap: {
	            ids,
	            colors: lineColors,
	            minColor: 0,
	            maxColor: lineMaxColor,
	            palette,
	        },
	    };
	};
	function convert$1(stage, height, width) {
	    const { pathData } = stage;
	    const positions = [];
	    const lines = [];
	    const colorMap = new ColorMap();
	    pathData.forEach(path => {
	        const color = colorMap.registerColor(path.strokeColor);
	        let from = positions.length;
	        positions.push(path.positions[0]);
	        for (let i = 1; i < path.positions.length; i++) {
	            const to = positions.length;
	            positions.push(path.positions[i]);
	            lines.push({
	                id: lines.length,
	                from,
	                to,
	                color,
	                size: path.strokeWidth,
	            });
	            from = to;
	        }
	    });
	    const ids = new Uint32Array(lines.length);
	    const fromIds = new Uint32Array(lines.length);
	    const toIds = new Uint32Array(lines.length);
	    const lineColors = new Float64Array(lines.length);
	    const lineSizes = new Float64Array(lines.length);
	    lines.forEach((line, i) => {
	        ids[i] = i;
	        fromIds[i] = line.from;
	        toIds[i] = line.to;
	        lineColors[i] = line.color;
	        lineSizes[i] = line.size;
	    });
	    const positionsX = new Float64Array(positions.length);
	    const positionsY = new Float64Array(positions.length);
	    const positionsZ = new Float64Array(positions.length);
	    let bounds;
	    positions.forEach((p, i) => {
	        positionsX[i] = p[0];
	        positionsY[i] = p[1] + height;
	        positionsZ[i] = p[2];
	        bounds = increment(bounds, positionsX[i], positionsY[i], positionsZ[i], positionsX[i], positionsY[i], positionsZ[i]);
	    });
	    const { palette, maxColor: lineMaxColor } = colorMap.getPalette();
	    return {
	        ids,
	        fromIds,
	        toIds,
	        lineColors,
	        lineSizes,
	        bounds,
	        positionsX,
	        positionsY,
	        positionsZ,
	        lineMaxColor,
	        palette,
	    };
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	const createTextLayer = (props) => {
	    const { ref, stage } = props;
	    const { core } = ref;
	    const { positionsX, positionsY, positionsZ, sizes, bounds, maxGlyphs, text, } = convert(stage);
	    if (text.length === 0) {
	        core.renderer.labelSets = [];
	        return;
	    }
	    const options = {
	        text,
	        maxGlyphs,
	        scales: sizes,
	    };
	    const labelSet = new LabelSet(core, options);
	    labelSet.positionsX = positionsX;
	    labelSet.positionsY = positionsY;
	    labelSet.positionsZ = positionsZ;
	    labelSet.horizontalAlignment = HorizontalAlignment.center;
	    labelSet.verticalAlignment = VerticalAlignment.center;
	    const layer = {
	        update: bounds => {
	            const { maxBoundsX, maxBoundsY, maxBoundsZ, minBoundsX, minBoundsY, minBoundsZ, } = bounds;
	            labelSet.minBoundsX = minBoundsX;
	            labelSet.minBoundsY = minBoundsY;
	            labelSet.minBoundsZ = minBoundsZ;
	            labelSet.maxBoundsX = maxBoundsX;
	            labelSet.maxBoundsY = maxBoundsY;
	            labelSet.maxBoundsZ = maxBoundsZ;
	        },
	        bounds,
	    };
	    const labelSetVisual = core.renderer.createLabelSetVisual(labelSet);
	    core.renderer.labelSets = [labelSetVisual];
	    return layer;
	};
	function convert(stage) {
	    const { textData } = stage;
	    const { length } = textData;
	    const ids = [];
	    const text = [];
	    const colors = new Float64Array(length);
	    const positionsX = new Float64Array(length);
	    const positionsY = new Float64Array(length);
	    const positionsZ = new Float64Array(length);
	    const sizes = new Float64Array(length);
	    let bounds;
	    let maxGlyphs = 0;
	    const colorMap = new ColorMap();
	    textData.forEach((t, i) => {
	        ids.push(i);
	        text.push(t.text);
	        maxGlyphs += t.text.length;
	        positionsX[i] = t.position[0];
	        positionsY[i] = t.position[1];
	        positionsZ[i] = t.position[2];
	        sizes[i] = 1.5 * t.size; //scale similar to axes
	        bounds = increment(bounds, t.position[0], t.position[1], t.position[2], t.position[0], t.position[1], t.position[2]);
	        colors[i] = colorMap.registerColor(t.color);
	    });
	    const { palette, maxColor } = colorMap.getPalette();
	    return {
	        ids: new Uint32Array(ids),
	        colors,
	        positionsX,
	        positionsY,
	        positionsZ,
	        sizes,
	        bounds,
	        maxColor,
	        maxGlyphs,
	        palette,
	        text,
	    };
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	function getImageData(url) {
	    return new Promise((resolve, reject) => {
	        const imageElement = document.createElement('img');
	        imageElement.onload = () => {
	            const canvas = document.createElement('canvas');
	            const ctx = canvas.getContext('2d');
	            const { height, width } = imageElement;
	            canvas.width = width;
	            canvas.height = height;
	            ctx.drawImage(imageElement, 0, 0);
	            resolve(ctx.getImageData(0, 0, width, height));
	        };
	        imageElement.src = url;
	    });
	}
	function createImageQuad(core, imageData, bounds, position, width, height) {
	    const { maxBoundsX, maxBoundsY, maxBoundsZ, minBoundsX, minBoundsY, minBoundsZ } = bounds;
	    const imageOptions = {
	        imageData,
	        position,
	        height,
	        width,
	        minBoundsX,
	        maxBoundsX,
	        minBoundsZ,
	        maxBoundsZ,
	        minBoundsY,
	        maxBoundsY,
	    };
	    return new ImageQuad(core, imageOptions);
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	function createCameraDefaults() {
	    const qModelRotation2d = create$1();
	    const qModelRotation3d = Constants.QUAT_ROTATEX_MINUS_90;
	    const qCameraRotation2d = create$1();
	    const qCameraRotation3d = create$1();
	    const qAngle = create$1();
	    const vCameraPosition = create$3();
	    // Altitude (pitch around local right axis)
	    setAxisAngle(qCameraRotation3d, Constants.VECTOR3_UNITX, AngleHelper.degreesToRadians(30));
	    // Azimuth (yaw around global up axis)
	    setAxisAngle(qAngle, Constants.VECTOR3_UNITY, AngleHelper.degreesToRadians(-25));
	    multiply(qCameraRotation3d, qCameraRotation3d, qAngle);
	    return {
	        qModelRotation2d,
	        qModelRotation3d,
	        qCameraRotation2d,
	        qCameraRotation3d,
	        vCameraPosition,
	    };
	}
	const cameraDefaults = createCameraDefaults();

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	const { qCameraRotation2d, qCameraRotation3d, qModelRotation2d, qModelRotation3d, vCameraPosition } = cameraDefaults;
	function applyCameraCallbacks(ref, lastPresenterConfig, lastView, transistion2dOnly) {
	    const { cameraTransitioner, core, modelTransitioner, positionTransitioner } = ref;
	    ref.reset = () => {
	        core.reset(true);
	        if (lastView === '3d') {
	            modelTransitioner.qRotation.to = qModelRotation3d;
	            cameraTransitioner.qRotation.to = qCameraRotation3d;
	            cameraTransitioner.vPosition.to = vCameraPosition;
	        }
	        else {
	            modelTransitioner.qRotation.to = qModelRotation2d;
	            cameraTransitioner.qRotation.to = qCameraRotation2d;
	            cameraTransitioner.vPosition.to = vCameraPosition;
	        }
	        slerp(modelTransitioner.qRotation.current, modelTransitioner.qRotation.to, modelTransitioner.qRotation.to, 0);
	        core.setModelRotation(modelTransitioner.qRotation.current, true);
	        core.camera.setOrbit(cameraTransitioner.qRotation.to, true);
	        core.camera.setPosition(cameraTransitioner.vPosition.to, true);
	    };
	    const cam = (t) => {
	        slerp(cameraTransitioner.qRotation.current, cameraTransitioner.qRotation.from, cameraTransitioner.qRotation.to, t);
	        lerp(cameraTransitioner.vPosition.current, cameraTransitioner.vPosition.from, cameraTransitioner.vPosition.to, t);
	        core.camera.setOrbit(cameraTransitioner.qRotation.current, false);
	        core.camera.setPosition(cameraTransitioner.vPosition.current, false);
	        // disable picking during transitions, as the performance degradation could reduce the framerate
	        core.inputManager.isPickingEnabled = false;
	    };
	    core.updateCallback = (elapsedTime) => {
	        const { transitionDurations } = lastPresenterConfig;
	        if (positionTransitioner.isTransitioning) {
	            const t = positionTransitioner.elapse(elapsedTime, transitionDurations.position + transitionDurations.stagger);
	            core.renderer.transitionTime = t;
	            setTransitionTimeAxesVisibility(transistion2dOnly, core);
	        }
	        else {
	            core.inputManager.isPickingEnabled = true;
	        }
	        if (modelTransitioner.isTransitioning) {
	            const tm = modelTransitioner.elapse(elapsedTime, transitionDurations.view, true);
	            if (modelTransitioner.shouldTransition) {
	                slerp(modelTransitioner.qRotation.current, modelTransitioner.qRotation.from, modelTransitioner.qRotation.to, tm);
	                core.setModelRotation(modelTransitioner.qRotation.current, false);
	            }
	            cam(tm);
	        }
	        if (cameraTransitioner.isTransitioning) {
	            const t = cameraTransitioner.elapse(elapsedTime, transitionDurations.view, true);
	            cam(t);
	        }
	    };
	}
	function setTransitionTimeAxesVisibility(transistion2dOnly, core) {
	    const t = core.renderer.transitionTime;
	    if (transistion2dOnly) {
	        if (t < 0.5) {
	            core.renderer.axesVisibility = AxesVisibility.previous;
	        }
	        else {
	            core.renderer.axesVisibility = AxesVisibility.current;
	        }
	    }
	    else {
	        if (t <= 0.01) {
	            core.renderer.axesVisibility = AxesVisibility.previous;
	        }
	        else if (t >= 0.99) {
	            core.renderer.axesVisibility = AxesVisibility.current;
	        }
	        else {
	            core.renderer.axesVisibility = AxesVisibility.none;
	        }
	    }
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	function morphChartsRender(ref, prevStage, stage, height, width, preStage, colors, config) {
	    const { qCameraRotation2d, qCameraRotation3d, qModelRotation2d, qModelRotation3d, vCameraPosition } = cameraDefaults;
	    const { core, cameraTransitioner, modelTransitioner, positionTransitioner } = ref;
	    let transistion2dOnly = false;
	    let cameraTo;
	    let holdCamera;
	    if (config.camera === 'hold') {
	        holdCamera = true;
	    }
	    else {
	        cameraTo = config.camera;
	    }
	    if (prevStage && (prevStage.view !== stage.view)) {
	        modelTransitioner.shouldTransition = !holdCamera;
	        if (stage.view === '2d') {
	            modelTransitioner.qRotation.from = qModelRotation3d;
	            modelTransitioner.qRotation.to = qModelRotation2d;
	            cameraTransitioner.qRotation.to = (cameraTo === null || cameraTo === void 0 ? void 0 : cameraTo.rotation) || qCameraRotation2d;
	            cameraTransitioner.vPosition.to = (cameraTo === null || cameraTo === void 0 ? void 0 : cameraTo.position) || vCameraPosition;
	        }
	        else {
	            modelTransitioner.qRotation.from = qModelRotation2d;
	            modelTransitioner.qRotation.to = qModelRotation3d;
	            cameraTransitioner.qRotation.to = (cameraTo === null || cameraTo === void 0 ? void 0 : cameraTo.rotation) || qCameraRotation3d;
	            cameraTransitioner.vPosition.to = (cameraTo === null || cameraTo === void 0 ? void 0 : cameraTo.position) || vCameraPosition;
	        }
	    }
	    else {
	        modelTransitioner.shouldTransition = false;
	        if (stage.view === '2d') {
	            transistion2dOnly = true;
	            modelTransitioner.qRotation.to = qModelRotation2d;
	            cameraTransitioner.qRotation.to = (cameraTo === null || cameraTo === void 0 ? void 0 : cameraTo.rotation) || qCameraRotation2d;
	            cameraTransitioner.vPosition.to = (cameraTo === null || cameraTo === void 0 ? void 0 : cameraTo.position) || vCameraPosition;
	        }
	        else {
	            modelTransitioner.qRotation.to = qModelRotation3d;
	            cameraTransitioner.qRotation.to = (cameraTo === null || cameraTo === void 0 ? void 0 : cameraTo.rotation) || qCameraRotation3d;
	            cameraTransitioner.vPosition.to = (cameraTo === null || cameraTo === void 0 ? void 0 : cameraTo.position) || vCameraPosition;
	        }
	    }
	    core.camera.getOrbit(cameraTransitioner.qRotation.from);
	    core.camera.getPosition(cameraTransitioner.vPosition.from);
	    if (!prevStage) {
	        core.setModelRotation(modelTransitioner.qRotation.to, false);
	        core.camera.setOrbit(cameraTransitioner.qRotation.to, false);
	        core.camera.setPosition(cameraTransitioner.vPosition.to, false);
	    }
	    else if (!holdCamera) {
	        cameraTransitioner.begin();
	    }
	    positionTransitioner.begin();
	    if (modelTransitioner.shouldTransition) {
	        modelTransitioner.begin();
	    }
	    const props = { ref, stage, height, width, config };
	    const cubeLayer = createCubeLayer(props);
	    const lineLayer = createLineLayer(props);
	    const textLayer = createTextLayer(props);
	    const { backgroundImages } = stage;
	    let contentBounds = outerBounds(outerBounds(cubeLayer === null || cubeLayer === void 0 ? void 0 : cubeLayer.bounds, lineLayer === null || lineLayer === void 0 ? void 0 : lineLayer.bounds), outerBounds(textLayer === null || textLayer === void 0 ? void 0 : textLayer.bounds, null));
	    backgroundImages === null || backgroundImages === void 0 ? void 0 : backgroundImages.forEach(backgroundImage => {
	        contentBounds = outerBounds(contentBounds, convertBounds(backgroundImage.bounds));
	    });
	    props.bounds = contentBounds;
	    core.renderer.previousAxes = core.renderer.currentAxes;
	    const axesLayer = createAxesLayer(props);
	    core.config.transitionStaggering = config.transitionDurations.stagger;
	    core.config.transitionDuration = config.transitionDurations.position;
	    let bounds;
	    if (axesLayer && axesLayer.bounds) {
	        bounds = axesLayer.bounds;
	    }
	    else {
	        bounds = contentBounds;
	    }
	    ref.setMorphChartsRendererOptions(config.renderer);
	    if (preStage) {
	        preStage(stage, cubeLayer);
	    }
	    //add images
	    core.renderer.images = [];
	    if (backgroundImages) {
	        const addImage = (imageBounds, imageData) => {
	            const imageWidth = imageBounds.maxBoundsX - imageBounds.minBoundsX;
	            const imageHeight = imageBounds.maxBoundsY - imageBounds.minBoundsY;
	            const position = [imageBounds.minBoundsX + imageWidth / 2, imageBounds.minBoundsY + imageHeight / 2, 0];
	            const imageQuad = createImageQuad(core, imageData, contentBounds, position, imageWidth, imageHeight);
	            const imageVisual = core.renderer.createImageVisual(imageQuad);
	            core.renderer.images.push(imageVisual);
	        };
	        const imageDataCache = {};
	        backgroundImages.forEach(backgroundImage => {
	            const imageBounds = convertBounds(backgroundImage.bounds);
	            const imageData = imageDataCache[backgroundImage.url];
	            if (imageData) {
	                addImage(imageBounds, imageData);
	            }
	            else {
	                getImageData(backgroundImage.url).then(imageData => {
	                    imageDataCache[backgroundImage.url] = imageData;
	                    addImage(imageBounds, imageData);
	                });
	            }
	        });
	    }
	    //Now call update on each layout
	    layersWithSelection(cubeLayer, lineLayer, textLayer, config.layerSelection, bounds, ref.layerStagger);
	    applyCameraCallbacks(ref, config, stage.view, transistion2dOnly);
	    core.renderer.transitionTime = 0; // Set renderer transition time for this render pass to prevent rendering target buffer for single frame
	    colorConfig(ref, colors);
	    return {
	        bounds,
	        getCubeLayer: () => cubeLayer,
	        update: layerSelection => layersWithSelection(cubeLayer, lineLayer, textLayer, layerSelection, bounds, ref.layerStagger),
	        activate: id => core.renderer.transitionBuffers[0].activeId = id,
	        moveCamera: (camera) => {
	            if (!(positionTransitioner.isTransitioning || modelTransitioner.isTransitioning)) {
	                core.camera.getOrbit(cameraTransitioner.qRotation.from);
	                core.camera.getPosition(cameraTransitioner.vPosition.from);
	                cameraTransitioner.move(camera.position, camera.rotation);
	            }
	        },
	        setTransitionTimeAxesVisibility: () => {
	            setTransitionTimeAxesVisibility(transistion2dOnly, core);
	        },
	    };
	}
	function layersWithSelection(cubeLayer, lineLayer, textLayer, layerSelection, bounds, layerStagger) {
	    const layerItems = [
	        {
	            layer: cubeLayer,
	            selection: layerSelection === null || layerSelection === void 0 ? void 0 : layerSelection.cubes,
	            stagger: layerStagger === null || layerStagger === void 0 ? void 0 : layerStagger.cubes,
	        },
	        {
	            layer: lineLayer,
	            selection: layerSelection === null || layerSelection === void 0 ? void 0 : layerSelection.lines,
	            stagger: layerStagger === null || layerStagger === void 0 ? void 0 : layerStagger.lines,
	        },
	        {
	            layer: textLayer,
	            selection: layerSelection === null || layerSelection === void 0 ? void 0 : layerSelection.texts,
	            stagger: layerStagger === null || layerStagger === void 0 ? void 0 : layerStagger.texts,
	        },
	    ];
	    layerItems.forEach(layerItem => { var _a; return (_a = layerItem.layer) === null || _a === void 0 ? void 0 : _a.update(bounds, layerItem.selection, layerItem.stagger); });
	}
	function convertBounds(bounds) {
	    if (!bounds)
	        return;
	    return {
	        minBoundsX: bounds.x1,
	        maxBoundsX: bounds.x2,
	        minBoundsY: -bounds.y2,
	        maxBoundsY: -bounds.y1,
	        minBoundsZ: minZ,
	        maxBoundsZ: minZ,
	    };
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	function shouldChangeRenderer(prev, next) {
	    var _a, _b;
	    if (!prev || !next)
	        return true;
	    if (prev.advanced !== next.advanced)
	        return true;
	    if (!prev.advanced) {
	        return ((_a = prev.basicOptions) === null || _a === void 0 ? void 0 : _a.antialias) != ((_b = next.basicOptions) === null || _b === void 0 ? void 0 : _b.antialias);
	    }
	}
	function getRenderer(mcRendererOptions, core) {
	    const advanced = mcRendererOptions === null || mcRendererOptions === void 0 ? void 0 : mcRendererOptions.advanced;
	    const r = advanced ?
	        new Main()
	        :
	            new Main$1(mcRendererOptions === null || mcRendererOptions === void 0 ? void 0 : mcRendererOptions.basicOptions);
	    core.renderer = r;
	    setRendererOptions(r, mcRendererOptions);
	    return r;
	}
	function setRendererOptions(renderer, mcRendererOptions) {
	    const o = mcRendererOptions === null || mcRendererOptions === void 0 ? void 0 : mcRendererOptions.advancedOptions;
	    if ((mcRendererOptions === null || mcRendererOptions === void 0 ? void 0 : mcRendererOptions.advanced) && o) {
	        for (const key in o) {
	            renderer.config[key] = o[key];
	        }
	    }
	}
	function rendererEnabled(advanced) {
	    const r = advanced ?
	        new Main()
	        :
	            new Main$1();
	    return r.isSupported;
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	const rightButton = 2;
	function listenCanvasEvents(core, options) {
	    const { container, pickGridCallback } = options;
	    const { inputManager } = core;
	    if (options.onLasso) {
	        inputManager.pickLassoCallback = result => {
	            options.onLasso(result.ids[0], result.manipulator.event);
	        };
	    }
	    inputManager.singleTouchAction = manipulator => {
	        if (manipulator.button == rightButton || manipulator.shiftKey || manipulator.ctrlKey) {
	            return SingleTouchAction.rotate;
	        }
	        else if (manipulator.altKey) {
	            return SingleTouchAction.lasso;
	        }
	        else {
	            return SingleTouchAction.translate;
	        }
	    };
	    inputManager.pickAxesGridCallback = ({ divisionX, divisionY, divisionZ, manipulator }) => {
	        clearClickTimeout();
	        const { altKey, button, shiftKey } = manipulator;
	        const me = { altKey, shiftKey, button };
	        const e = me;
	        pickGridCallback([divisionX, divisionY, divisionZ], e);
	    };
	    const canvas = container.getElementsByTagName('canvas')[0];
	    let pickedId;
	    const hover = (e) => {
	        if (core.renderer.pickedId !== pickedId) {
	            pickedId = core.renderer.pickedId;
	            const ordinal = core.renderer.transitionBuffers[0].pickIdLookup[pickedId];
	            options.onCubeHover(e, ordinal);
	        }
	    };
	    canvas.addEventListener('mousemove', (e) => {
	        clearClickTimeout();
	        if (mousedown) {
	            options.onCubeHover(e, null);
	        }
	        hover(e);
	    });
	    canvas.addEventListener('mouseout', hover);
	    canvas.addEventListener('mouseover', hover);
	    let mousedown;
	    canvas.addEventListener('mousedown', () => {
	        mousedown = true;
	    });
	    canvas.addEventListener('mouseup', (e) => {
	        mousedown = false;
	    });
	    let canvasClickTimeout;
	    const clearClickTimeout = () => {
	        clearTimeout(canvasClickTimeout);
	        canvasClickTimeout = null;
	    };
	    canvas.addEventListener('click', (e) => {
	        canvasClickTimeout = setTimeout(() => {
	            options.onCanvasClick(e);
	        }, 50);
	    });
	    inputManager.pickItemCallback = ({ manipulator }) => {
	        clearClickTimeout();
	        const ordinal = core.renderer.transitionBuffers[0].pickIdLookup[pickedId];
	        options.onCubeClick(manipulator.event, ordinal);
	    };
	}

	function cubicInOut(t) {
	  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	function easing(t) {
	    if (t === 0 || t === 1)
	        return t;
	    return cubicInOut(t);
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	class Transitioner {
	    constructor() {
	        this.isTransitioning = false;
	    }
	    begin() {
	        this.isTransitioning = true;
	        this.time = 0;
	    }
	    elapse(elapsedTime, totalTime, ease = false) {
	        this.time += elapsedTime;
	        if (this.time >= totalTime) {
	            this.isTransitioning = false;
	            this.time = totalTime;
	            this.ended && this.ended();
	        }
	        const t = this.time / totalTime;
	        return ease ? easing(t) : t;
	    }
	}
	class CameraTransitioner extends Transitioner {
	    constructor() {
	        super();
	        this.qRotation = {
	            from: create$1(),
	            to: null,
	            current: create$1(),
	        };
	        this.vPosition = {
	            from: create$3(),
	            to: null,
	            current: create$3(),
	        };
	    }
	    move(position, rotation) {
	        this.begin();
	        this.qRotation.to = rotation;
	        this.vPosition.to = position;
	    }
	}
	class ModelTransitioner extends Transitioner {
	    constructor() {
	        super();
	        this.shouldTransition = false;
	        this.qRotation = {
	            from: null,
	            to: null,
	            current: create$1(),
	        };
	    }
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	function init(options, mcRendererOptions) {
	    const { container } = options;
	    const core = new Core({ container });
	    getRenderer(mcRendererOptions, core);
	    listenCanvasEvents(core, options);
	    core.config.pickSelectDelay = 50;
	    const cameraTransitioner = new CameraTransitioner();
	    const modelTransitioner = new ModelTransitioner();
	    const positionTransitioner = new Transitioner();
	    positionTransitioner.ended = () => {
	        core.renderer.axesVisibility = AxesVisibility.current;
	    };
	    const ref = {
	        supportedRenders: {
	            advanced: rendererEnabled(true),
	            basic: rendererEnabled(false),
	        },
	        reset: null,
	        cameraTransitioner,
	        modelTransitioner,
	        positionTransitioner,
	        core,
	        setMorphChartsRendererOptions(mcRendererOptions) {
	            if (shouldChangeRenderer(ref.lastMorphChartsRendererOptions, mcRendererOptions)) {
	                getRenderer(mcRendererOptions, core);
	                listenCanvasEvents(core, options);
	            }
	            else {
	                if (mcRendererOptions.advanced) {
	                    //same renderer, poke the config
	                    setRendererOptions(core.renderer, mcRendererOptions);
	                }
	            }
	            ref.lastMorphChartsRendererOptions = mcRendererOptions;
	        },
	        lastMorphChartsRendererOptions: mcRendererOptions,
	        layerStagger: {},
	    };
	    return ref;
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	/**
	 * Class which presents a Stage of chart data using MorphCharts to render.
	 */
	class Presenter {
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
	            this.logger(`queueing animation ${(options && options.waitingLabel) || 'waiting'}...(${timeout})`);
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
	     * Present the Vega Scene, or Stage object using Morphcharts.
	     * @param sceneOrStage Vega Scene object, or Stage object containing chart layout info.
	     * @param height Height of the rendering area.
	     * @param width Width of the rendering area.
	     * @param config Optional presentation configuration object.
	     */
	    present(sceneOrStage, height, width, config) {
	        this.animationCancel();
	        const scene = sceneOrStage;
	        let stage;
	        const options = {
	            maxOrdinal: 0,
	            currAxis: null,
	            defaultCubeColor: this.style.defaultCubeColor,
	            assignCubeOrdinal: (config && config.onSceneRectAssignCubeOrdinal) || (() => options.maxOrdinal++),
	            modifyAxis: (config === null || config === void 0 ? void 0 : config.onAxisItem) ? config.onAxisItem : defaultOnAxisItem,
	            zAxisZindex: config === null || config === void 0 ? void 0 : config.zAxisZindex,
	        };
	        //determine if this is a vega scene
	        if (scene.marktype) {
	            stage = createStage(scene.view);
	            sceneToStage(options, stage, scene);
	        }
	        else {
	            stage = sceneOrStage;
	        }
	        const c = deepMerge(defaultPresenterConfig, config);
	        if (!this.morphchartsref) {
	            this._morphChartsOptions = {
	                container: this.getElement(exports.PresenterElement.gl),
	                pickGridCallback: c.axisPickGridCallback,
	                onCubeHover: (e, ordinal) => {
	                    c.onCubeHover(e, { ordinal, color: null, position: null, size: null });
	                },
	                onCubeClick: (e, ordinal) => {
	                    c.onCubeClick(e, { ordinal, color: null, position: null, size: null });
	                },
	                onCanvasClick: config === null || config === void 0 ? void 0 : config.onLayerClick,
	                onLasso: config === null || config === void 0 ? void 0 : config.onLasso,
	            };
	            this.morphchartsref = init(this._morphChartsOptions, c.renderer || defaultPresenterConfig.renderer);
	        }
	        let cubeCount = Math.max(this._last.cubeCount, stage.cubeData.length);
	        if (options.maxOrdinal) {
	            cubeCount = Math.max(cubeCount, options.maxOrdinal);
	            const empty = {
	                isEmpty: true,
	            };
	            stage.cubeData = patchCubeArray(cubeCount, empty, stage.cubeData);
	        }
	        config.preLayer && config.preLayer(stage);
	        this.morphChartsRenderResult = morphChartsRender(this.morphchartsref, this._last.stage, stage, height, width, config && config.preStage, config && config.morphChartsColors, c);
	        delete stage.cubeData;
	        delete stage.redraw;
	        this._last = {
	            cubeCount,
	            height,
	            width,
	            stage,
	            view: stage.view,
	        };
	        const a = getActiveElementInfo();
	        mount(LegendView({ legend: stage.legend, onClick: config && config.onLegendClick }), this.getElement(exports.PresenterElement.legend));
	        setActiveElement(a);
	        if (config && config.onPresent) {
	            config.onPresent();
	        }
	    }
	    canvasToDataURL() {
	        return new Promise((resolve, reject) => {
	            this.morphchartsref.core.afterRenderCallback = () => {
	                this.morphchartsref.core.afterRenderCallback = null;
	                const canvas = this.getElement(exports.PresenterElement.gl).getElementsByTagName('canvas')[0];
	                const png = canvas.toDataURL('image/png');
	                resolve(png);
	            };
	        });
	    }
	    configColors(mcColors) {
	        colorConfig(this.morphchartsref, mcColors);
	    }
	    /**
	     * Home the camera to the last initial position.
	     */
	    homeCamera() {
	        var _a;
	        (_a = this.morphchartsref) === null || _a === void 0 ? void 0 : _a.reset();
	    }
	    /**
	     * Show guidelines of rendering height/width and center of OrbitView.
	     */
	    showGuides() {
	        this.getElement(exports.PresenterElement.gl).classList.add('show-center');
	        //TODO Morphcharts gridlines
	    }
	    finalize() {
	        this.animationCancel();
	        if (this.morphchartsref)
	            this.morphchartsref.core.stop();
	        if (this.el)
	            this.el.innerHTML = '';
	        this._last = null;
	        this.morphchartsref = null;
	        this.el = null;
	        this.logger = null;
	        this.queuedAnimationOptions = null;
	    }
	}

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
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

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
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
	        renderer(...args) {
	            if (args && args.length) {
	                const renderer = args[0];
	                if (renderer === 'morphcharts' && !registered) {
	                    base.vega.renderModule('morphcharts', { handler: base.vega.CanvasHandler, renderer: RendererGl });
	                    registered = true;
	                }
	                return super.renderer(renderer);
	            }
	            else {
	                return super.renderer();
	            }
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

	/*!
	* Copyright (c) Microsoft Corporation.
	* Licensed under the MIT License.
	*/
	const version = '1.0.6';

	exports.Presenter = Presenter;
	exports.ViewGl = ViewGl;
	exports.base = base;
	exports.controls = controls;
	exports.defaults = defaults;
	exports.types = types;
	exports.use = use;
	exports.util = util;
	exports.version = version;

}));
