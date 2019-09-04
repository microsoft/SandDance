(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.SandDance = {})));
}(this, (function (exports) { 'use strict';

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    const FieldNames = {
        Active: "__SandDance__Active",
        Collapsed: "__SandDance__Collapsed",
        Selected: "__SandDance__Selected",
        Top: "__SandDance__Top",
        TopIndex: "__SandDance__TopIndex",
        Index: "__SandDance__Index",
        PowerBISelectionId: "__SandDance__PowerBISelectionId",
        BarChartBin0: "__SandDance__BarChartBin0",
        BarChartBin1: "__SandDance__BarChartBin1",
        BarChartStackY0: "__SandDance__BarChartStackY0",
        BarChartStackY1: "__SandDance__BarChartStackY1",
        DensityCount: "__SandDance__DensityCount",
        DensityRow: "__SandDance__DensityRow",
        DensityXBin0: "__SandDance__DensityXBin0",
        DensityXBin1: "__SandDance__DensityXBin1",
        DensityYBin0: "__SandDance__DensityYBin0",
        DensityYBin1: "__SandDance__DensityYBin1",
        FacetBin0: "__SandDance__FacetBin0",
        FacetBin1: "__SandDance__FacetBin1",
        GridIndex: "__SandDance__GridIndex",
        StacksLatBin0: "__SandDance__StacksLatBin0",
        StacksLatBin1: "__SandDance__StacksLatBin1",
        StacksLongBin0: "__SandDance__StacksLongBin0",
        StacksLongBin1: "__SandDance__StacksLongBin1",
        StacksStart: "__SandDance__StacksStart",
        StacksEnd: "__SandDance__StacksEnd",
        TreemapStackChildren: "__SandDance__TreemapStackChildren",
        TreemapStackDepth: "__SandDance__TreemapStackDepth",
        TreemapStackX0: "__SandDance__TreemapStackX0",
        TreemapStackX1: "__SandDance__TreemapStackX1",
        TreemapStackY0: "__SandDance__TreemapStackY0",
        TreemapStackY1: "__SandDance__TreemapStackY1",
    };
    const DataNames = {
        Pre: "PreData",
        Main: "MainData",
        EmptyBin: "EmptyBinsData",
        TopLookup: "TopData",
        Legend: "LegendData",
        FacetGroupCell: "FacetGroupCellData",
        FacetCellTitles: "FacetCellTitlesData"
    };
    const ScaleNames = {
        Color: "ColorScale",
        X: "MainXScale",
        Y: "MainYScale",
        Z: "MainZScale"
    };
    //Signal names
    const SignalNames = {
        ColorBinCount: "RoleColor_BinCountSignal",
        ColorReverse: "RoleColor_ReverseSignal",
        FacetColumns: "RoleFacet_ColumnsSignal",
        FacetRows: "RoleFacet_RowsSignal",
        InnerPadding: "Chart_InnerPadding",
        OuterPadding: "Chart_OuterPadding",
        PointSize: "Chart_PointSizeSignal",
        TextAngleX: "Text_AngleXSignal",
        TextAngleY: "Text_AngleYSignal",
        TextScale: "Text_ScaleSignal",
        TextSize: "Text_SizeSignal",
        TextTitleSize: "Text_TitleSizeSignal",
        TreeMapMethod: "Chart_TreeMapMethodSignal",
        XBins: "RoleX_BinsSignal",
        XGridSize: "Chart_XGridSize",
        YBins: "RoleY_BinsSignal",
        YDomain: "RoleY_DomainSignal",
        YGridSize: "Chart_YGridSize",
        ZHeight: "RoleZ_HeightSignal",
        ZProportion: "RoleZ_ProportionSignal"
    };
    //These are special formulaic data values
    const Other = "__Other";
    //name of the "no-color" palette
    const ColorScaleNone = "none";

    // Copyright (c) Microsoft Corporation. All rights reserved.

    var constants = /*#__PURE__*/Object.freeze({
        ColorScaleNone: ColorScaleNone,
        FieldNames: FieldNames,
        ScaleNames: ScaleNames,
        SignalNames: SignalNames
    });

    function isSearchExpressionGroup(search) {
        if (!search) {
            return false;
        }
        return !!search.expressions;
    }
    function createGroupFromExpression(input) {
        const output = {
            expressions: [input]
        };
        return output;
    }
    function ensureSearchExpressionGroupArray(search) {
        if (Array.isArray(search)) {
            return [...search];
        }
        else if (isSearchExpressionGroup(search)) {
            return [search];
        }
        else {
            return [createGroupFromExpression(search)];
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const expressionKeys = Object.keys({
        clause: null,
        name: null,
        operator: null,
        value: null
    });
    function compareExpression(a, b) {
        for (let k = 0; k < expressionKeys.length; k++) {
            let key = expressionKeys[k];
            if (a[key] != b[key])
                return false;
        }
        return true;
    }
    const groupKeys = Object.keys({
        clause: null
    });
    function compareGroup(a, b) {
        for (let k = 0; k < groupKeys.length; k++) {
            let key = groupKeys[k];
            if (a[key] != b[key])
                return false;
        }
        if (a.expressions.length != b.expressions.length)
            return false;
        for (let i = 0; i < a.expressions.length; i++) {
            if (!compareExpression(a.expressions[i], b.expressions[i]))
                return false;
        }
        return true;
    }
    function compare(a, b) {
        if (a == b)
            return true;
        if (!a || !b)
            return false;
        let arrs = [a, b].map(ensureSearchExpressionGroupArray);
        let [arrA, arrB] = arrs;
        if (arrA.length != arrB.length)
            return false;
        for (let i = 0; i < arrA.length; i++) {
            if (!compareGroup(arrA[i], arrB[i]))
                return false;
        }
        return true;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function invertSearchExpressionGroup(input) {
        //this only works if all expressions in this group have the same clause
        const output = {
            expressions: input.expressions.map(invertSearchExpression)
        };
        if (input.clause) {
            output.clause = invertedClauses[input.clause];
        }
        return output;
    }
    const invertedOperators = {
        '!=': '==',
        '==': '!=',
        '<': '>=',
        '>=': '<',
        '<=': '>',
        '>': '<=',
        '!contains': 'contains',
        'contains': '!contains',
        '!isnullorEmpty': 'isnullorEmpty',
        'isnullorEmpty': '!isnullorEmpty',
        '!starts': 'starts',
        'starts': '!starts'
    };
    const invertedClauses = {
        '&&': '||',
        '||': '&&'
    };
    function invertSearchExpression(input) {
        const operator = invertedOperators[input.operator];
        const output = Object.assign({}, input, { operator });
        if (input.clause) {
            output.clause = invertedClauses[input.clause];
        }
        return output;
    }
    function invert(search) {
        if (Array.isArray(search)) {
            return search.map(invertSearchExpressionGroup);
        }
        else if (isSearchExpressionGroup(search)) {
            return invertSearchExpressionGroup(search);
        }
        else {
            return invertSearchExpression(search);
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function narrow(a, b) {
        if (!a) {
            return b;
        }
        let arrs = [a, b].map(ensureSearchExpressionGroupArray);
        let [arrA, arrB] = arrs;
        arrB[0].clause = '&&';
        return arrA.concat(arrB);
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.

    var index = /*#__PURE__*/Object.freeze({
        compareExpression: compareExpression,
        compareGroup: compareGroup,
        compare: compare,
        invert: invert,
        narrow: narrow
    });



    var types = /*#__PURE__*/Object.freeze({

    });

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    const GL_ORDINAL = "GL_ORDINAL";
    const layerNames = {
        cubes: "LAYER_CUBES",
        lines: "LAYER_LINES",
        text: "LAYER_TEXT"
    };

    var constants$1 = /*#__PURE__*/Object.freeze({
        GL_ORDINAL: GL_ORDINAL,
        layerNames: layerNames
    });

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var xregexp = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /*!
     * XRegExp 4.0.0
     * <xregexp.com>
     * Steven Levithan (c) 2007-2017 MIT License
     */

    /**
     * XRegExp provides augmented, extensible regular expressions. You get additional regex syntax and
     * flags, beyond what browsers support natively. XRegExp is also a regex utility belt with tools to
     * make your client-side grepping simpler and more powerful, while freeing you from related
     * cross-browser inconsistencies.
     */

    // ==--------------------------==
    // Private stuff
    // ==--------------------------==

    // Property name used for extended regex instance data
    var REGEX_DATA = 'xregexp';
    // Optional features that can be installed and uninstalled
    var features = {
        astral: false
    };
    // Native methods to use and restore ('native' is an ES3 reserved keyword)
    var nativ = {
        exec: RegExp.prototype.exec,
        test: RegExp.prototype.test,
        match: String.prototype.match,
        replace: String.prototype.replace,
        split: String.prototype.split
    };
    // Storage for fixed/extended native methods
    var fixed = {};
    // Storage for regexes cached by `XRegExp.cache`
    var regexCache = {};
    // Storage for pattern details cached by the `XRegExp` constructor
    var patternCache = {};
    // Storage for regex syntax tokens added internally or by `XRegExp.addToken`
    var tokens = [];
    // Token scopes
    var defaultScope = 'default';
    var classScope = 'class';
    // Regexes that match native regex syntax, including octals
    var nativeTokens = {
        // Any native multicharacter token in default scope, or any single character
        'default': /\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|\(\?(?:[:=!]|<[=!])|[?*+]\?|{\d+(?:,\d*)?}\??|[\s\S]/,
        // Any native multicharacter token in character class scope, or any single character
        'class': /\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|[\s\S]/
    };
    // Any backreference or dollar-prefixed character in replacement strings
    var replacementToken = /\$(?:{([\w$]+)}|<([\w$]+)>|(\d\d?|[\s\S]))/g;
    // Check for correct `exec` handling of nonparticipating capturing groups
    var correctExecNpcg = nativ.exec.call(/()??/, '')[1] === undefined;
    // Check for ES6 `flags` prop support
    var hasFlagsProp = /x/.flags !== undefined;
    // Shortcut to `Object.prototype.toString`
    var toString = {}.toString;

    function hasNativeFlag(flag) {
        // Can't check based on the presence of properties/getters since browsers might support such
        // properties even when they don't support the corresponding flag in regex construction (tested
        // in Chrome 48, where `'unicode' in /x/` is true but trying to construct a regex with flag `u`
        // throws an error)
        var isSupported = true;
        try {
        } catch (exception) {
            isSupported = false;
        }
        return isSupported;
    }
    // Check for ES6 `u` flag support
    var hasNativeU = hasNativeFlag('u');
    // Check for ES6 `y` flag support
    var hasNativeY = hasNativeFlag('y');
    // Tracker for known flags, including addon flags
    var registeredFlags = {
        g: true,
        i: true,
        m: true,
        u: hasNativeU,
        y: hasNativeY
    };

    /**
     * Attaches extended data and `XRegExp.prototype` properties to a regex object.
     *
     * @private
     * @param {RegExp} regex Regex to augment.
     * @param {Array} captureNames Array with capture names, or `null`.
     * @param {String} xSource XRegExp pattern used to generate `regex`, or `null` if N/A.
     * @param {String} xFlags XRegExp flags used to generate `regex`, or `null` if N/A.
     * @param {Boolean} [isInternalOnly=false] Whether the regex will be used only for internal
     *   operations, and never exposed to users. For internal-only regexes, we can improve perf by
     *   skipping some operations like attaching `XRegExp.prototype` properties.
     * @returns {RegExp} Augmented regex.
     */
    function augment(regex, captureNames, xSource, xFlags, isInternalOnly) {
        var p = void 0;

        regex[REGEX_DATA] = {
            captureNames: captureNames
        };

        if (isInternalOnly) {
            return regex;
        }

        // Can't auto-inherit these since the XRegExp constructor returns a nonprimitive value
        if (regex.__proto__) {
            regex.__proto__ = XRegExp.prototype;
        } else {
            for (p in XRegExp.prototype) {
                // An `XRegExp.prototype.hasOwnProperty(p)` check wouldn't be worth it here, since this
                // is performance sensitive, and enumerable `Object.prototype` or `RegExp.prototype`
                // extensions exist on `regex.prototype` anyway
                regex[p] = XRegExp.prototype[p];
            }
        }

        regex[REGEX_DATA].source = xSource;
        // Emulate the ES6 `flags` prop by ensuring flags are in alphabetical order
        regex[REGEX_DATA].flags = xFlags ? xFlags.split('').sort().join('') : xFlags;

        return regex;
    }

    /**
     * Removes any duplicate characters from the provided string.
     *
     * @private
     * @param {String} str String to remove duplicate characters from.
     * @returns {String} String with any duplicate characters removed.
     */
    function clipDuplicates(str) {
        return nativ.replace.call(str, /([\s\S])(?=[\s\S]*\1)/g, '');
    }

    /**
     * Copies a regex object while preserving extended data and augmenting with `XRegExp.prototype`
     * properties. The copy has a fresh `lastIndex` property (set to zero). Allows adding and removing
     * flags g and y while copying the regex.
     *
     * @private
     * @param {RegExp} regex Regex to copy.
     * @param {Object} [options] Options object with optional properties:
     *   - `addG` {Boolean} Add flag g while copying the regex.
     *   - `addY` {Boolean} Add flag y while copying the regex.
     *   - `removeG` {Boolean} Remove flag g while copying the regex.
     *   - `removeY` {Boolean} Remove flag y while copying the regex.
     *   - `isInternalOnly` {Boolean} Whether the copied regex will be used only for internal
     *     operations, and never exposed to users. For internal-only regexes, we can improve perf by
     *     skipping some operations like attaching `XRegExp.prototype` properties.
     *   - `source` {String} Overrides `<regex>.source`, for special cases.
     * @returns {RegExp} Copy of the provided regex, possibly with modified flags.
     */
    function copyRegex(regex, options) {
        if (!XRegExp.isRegExp(regex)) {
            throw new TypeError('Type RegExp expected');
        }

        var xData = regex[REGEX_DATA] || {};
        var flags = getNativeFlags(regex);
        var flagsToAdd = '';
        var flagsToRemove = '';
        var xregexpSource = null;
        var xregexpFlags = null;

        options = options || {};

        if (options.removeG) {
            flagsToRemove += 'g';
        }
        if (options.removeY) {
            flagsToRemove += 'y';
        }
        if (flagsToRemove) {
            flags = nativ.replace.call(flags, new RegExp('[' + flagsToRemove + ']+', 'g'), '');
        }

        if (options.addG) {
            flagsToAdd += 'g';
        }
        if (options.addY) {
            flagsToAdd += 'y';
        }
        if (flagsToAdd) {
            flags = clipDuplicates(flags + flagsToAdd);
        }

        if (!options.isInternalOnly) {
            if (xData.source !== undefined) {
                xregexpSource = xData.source;
            }
            // null or undefined; don't want to add to `flags` if the previous value was null, since
            // that indicates we're not tracking original precompilation flags
            if (xData.flags != null) {
                // Flags are only added for non-internal regexes by `XRegExp.globalize`. Flags are never
                // removed for non-internal regexes, so don't need to handle it
                xregexpFlags = flagsToAdd ? clipDuplicates(xData.flags + flagsToAdd) : xData.flags;
            }
        }

        // Augment with `XRegExp.prototype` properties, but use the native `RegExp` constructor to avoid
        // searching for special tokens. That would be wrong for regexes constructed by `RegExp`, and
        // unnecessary for regexes constructed by `XRegExp` because the regex has already undergone the
        // translation to native regex syntax
        regex = augment(new RegExp(options.source || regex.source, flags), hasNamedCapture(regex) ? xData.captureNames.slice(0) : null, xregexpSource, xregexpFlags, options.isInternalOnly);

        return regex;
    }

    /**
     * Converts hexadecimal to decimal.
     *
     * @private
     * @param {String} hex
     * @returns {Number}
     */
    function dec(hex) {
        return parseInt(hex, 16);
    }

    /**
     * Returns a pattern that can be used in a native RegExp in place of an ignorable token such as an
     * inline comment or whitespace with flag x. This is used directly as a token handler function
     * passed to `XRegExp.addToken`.
     *
     * @private
     * @param {String} match Match arg of `XRegExp.addToken` handler
     * @param {String} scope Scope arg of `XRegExp.addToken` handler
     * @param {String} flags Flags arg of `XRegExp.addToken` handler
     * @returns {String} Either '' or '(?:)', depending on which is needed in the context of the match.
     */
    function getContextualTokenSeparator(match, scope, flags) {
        if (
        // No need to separate tokens if at the beginning or end of a group
        match.input[match.index - 1] === '(' || match.input[match.index + match[0].length] === ')' ||
        // Avoid separating tokens when the following token is a quantifier
        isQuantifierNext(match.input, match.index + match[0].length, flags)) {
            return '';
        }
        // Keep tokens separated. This avoids e.g. inadvertedly changing `\1 1` or `\1(?#)1` to `\11`.
        // This also ensures all tokens remain as discrete atoms, e.g. it avoids converting the syntax
        // error `(? :` into `(?:`.
        return '(?:)';
    }

    /**
     * Returns native `RegExp` flags used by a regex object.
     *
     * @private
     * @param {RegExp} regex Regex to check.
     * @returns {String} Native flags in use.
     */
    function getNativeFlags(regex) {
        return hasFlagsProp ? regex.flags :
        // Explicitly using `RegExp.prototype.toString` (rather than e.g. `String` or concatenation
        // with an empty string) allows this to continue working predictably when
        // `XRegExp.proptotype.toString` is overridden
        nativ.exec.call(/\/([a-z]*)$/i, RegExp.prototype.toString.call(regex))[1];
    }

    /**
     * Determines whether a regex has extended instance data used to track capture names.
     *
     * @private
     * @param {RegExp} regex Regex to check.
     * @returns {Boolean} Whether the regex uses named capture.
     */
    function hasNamedCapture(regex) {
        return !!(regex[REGEX_DATA] && regex[REGEX_DATA].captureNames);
    }

    /**
     * Converts decimal to hexadecimal.
     *
     * @private
     * @param {Number|String} dec
     * @returns {String}
     */
    function hex(dec) {
        return parseInt(dec, 10).toString(16);
    }

    /**
     * Checks whether the next nonignorable token after the specified position is a quantifier.
     *
     * @private
     * @param {String} pattern Pattern to search within.
     * @param {Number} pos Index in `pattern` to search at.
     * @param {String} flags Flags used by the pattern.
     * @returns {Boolean} Whether the next nonignorable token is a quantifier.
     */
    function isQuantifierNext(pattern, pos, flags) {
        return nativ.test.call(flags.indexOf('x') !== -1 ?
        // Ignore any leading whitespace, line comments, and inline comments
        /^(?:\s|#[^#\n]*|\(\?#[^)]*\))*(?:[?*+]|{\d+(?:,\d*)?})/ :
        // Ignore any leading inline comments
        /^(?:\(\?#[^)]*\))*(?:[?*+]|{\d+(?:,\d*)?})/, pattern.slice(pos));
    }

    /**
     * Determines whether a value is of the specified type, by resolving its internal [[Class]].
     *
     * @private
     * @param {*} value Object to check.
     * @param {String} type Type to check for, in TitleCase.
     * @returns {Boolean} Whether the object matches the type.
     */
    function isType(value, type) {
        return toString.call(value) === '[object ' + type + ']';
    }

    /**
     * Adds leading zeros if shorter than four characters. Used for fixed-length hexadecimal values.
     *
     * @private
     * @param {String} str
     * @returns {String}
     */
    function pad4(str) {
        while (str.length < 4) {
            str = '0' + str;
        }
        return str;
    }

    /**
     * Checks for flag-related errors, and strips/applies flags in a leading mode modifier. Offloads
     * the flag preparation logic from the `XRegExp` constructor.
     *
     * @private
     * @param {String} pattern Regex pattern, possibly with a leading mode modifier.
     * @param {String} flags Any combination of flags.
     * @returns {Object} Object with properties `pattern` and `flags`.
     */
    function prepareFlags(pattern, flags) {
        var i = void 0;

        // Recent browsers throw on duplicate flags, so copy this behavior for nonnative flags
        if (clipDuplicates(flags) !== flags) {
            throw new SyntaxError('Invalid duplicate regex flag ' + flags);
        }

        // Strip and apply a leading mode modifier with any combination of flags except g or y
        pattern = nativ.replace.call(pattern, /^\(\?([\w$]+)\)/, function ($0, $1) {
            if (nativ.test.call(/[gy]/, $1)) {
                throw new SyntaxError('Cannot use flag g or y in mode modifier ' + $0);
            }
            // Allow duplicate flags within the mode modifier
            flags = clipDuplicates(flags + $1);
            return '';
        });

        // Throw on unknown native or nonnative flags
        for (i = 0; i < flags.length; ++i) {
            if (!registeredFlags[flags[i]]) {
                throw new SyntaxError('Unknown regex flag ' + flags[i]);
            }
        }

        return {
            pattern: pattern,
            flags: flags
        };
    }

    /**
     * Prepares an options object from the given value.
     *
     * @private
     * @param {String|Object} value Value to convert to an options object.
     * @returns {Object} Options object.
     */
    function prepareOptions(value) {
        var options = {};

        if (isType(value, 'String')) {
            XRegExp.forEach(value, /[^\s,]+/, function (match) {
                options[match] = true;
            });

            return options;
        }

        return value;
    }

    /**
     * Registers a flag so it doesn't throw an 'unknown flag' error.
     *
     * @private
     * @param {String} flag Single-character flag to register.
     */
    function registerFlag(flag) {
        if (!/^[\w$]$/.test(flag)) {
            throw new Error('Flag must be a single character A-Za-z0-9_$');
        }

        registeredFlags[flag] = true;
    }

    /**
     * Runs built-in and custom regex syntax tokens in reverse insertion order at the specified
     * position, until a match is found.
     *
     * @private
     * @param {String} pattern Original pattern from which an XRegExp object is being built.
     * @param {String} flags Flags being used to construct the regex.
     * @param {Number} pos Position to search for tokens within `pattern`.
     * @param {Number} scope Regex scope to apply: 'default' or 'class'.
     * @param {Object} context Context object to use for token handler functions.
     * @returns {Object} Object with properties `matchLength`, `output`, and `reparse`; or `null`.
     */
    function runTokens(pattern, flags, pos, scope, context) {
        var i = tokens.length;
        var leadChar = pattern[pos];
        var result = null;
        var match = void 0;
        var t = void 0;

        // Run in reverse insertion order
        while (i--) {
            t = tokens[i];
            if (t.leadChar && t.leadChar !== leadChar || t.scope !== scope && t.scope !== 'all' || t.flag && !(flags.indexOf(t.flag) !== -1)) {
                continue;
            }

            match = XRegExp.exec(pattern, t.regex, pos, 'sticky');
            if (match) {
                result = {
                    matchLength: match[0].length,
                    output: t.handler.call(context, match, scope, flags),
                    reparse: t.reparse
                };
                // Finished with token tests
                break;
            }
        }

        return result;
    }

    /**
     * Enables or disables implicit astral mode opt-in. When enabled, flag A is automatically added to
     * all new regexes created by XRegExp. This causes an error to be thrown when creating regexes if
     * the Unicode Base addon is not available, since flag A is registered by that addon.
     *
     * @private
     * @param {Boolean} on `true` to enable; `false` to disable.
     */
    function setAstral(on) {
        features.astral = on;
    }

    /**
     * Returns the object, or throws an error if it is `null` or `undefined`. This is used to follow
     * the ES5 abstract operation `ToObject`.
     *
     * @private
     * @param {*} value Object to check and return.
     * @returns {*} The provided object.
     */
    function toObject(value) {
        // null or undefined
        if (value == null) {
            throw new TypeError('Cannot convert null or undefined to object');
        }

        return value;
    }

    // ==--------------------------==
    // Constructor
    // ==--------------------------==

    /**
     * Creates an extended regular expression object for matching text with a pattern. Differs from a
     * native regular expression in that additional syntax and flags are supported. The returned object
     * is in fact a native `RegExp` and works with all native methods.
     *
     * @class XRegExp
     * @constructor
     * @param {String|RegExp} pattern Regex pattern string, or an existing regex object to copy.
     * @param {String} [flags] Any combination of flags.
     *   Native flags:
     *     - `g` - global
     *     - `i` - ignore case
     *     - `m` - multiline anchors
     *     - `u` - unicode (ES6)
     *     - `y` - sticky (Firefox 3+, ES6)
     *   Additional XRegExp flags:
     *     - `n` - explicit capture
     *     - `s` - dot matches all (aka singleline)
     *     - `x` - free-spacing and line comments (aka extended)
     *     - `A` - astral (requires the Unicode Base addon)
     *   Flags cannot be provided when constructing one `RegExp` from another.
     * @returns {RegExp} Extended regular expression object.
     * @example
     *
     * // With named capture and flag x
     * XRegExp(`(?<year>  [0-9]{4} ) -?  # year
     *          (?<month> [0-9]{2} ) -?  # month
     *          (?<day>   [0-9]{2} )     # day`, 'x');
     *
     * // Providing a regex object copies it. Native regexes are recompiled using native (not XRegExp)
     * // syntax. Copies maintain extended data, are augmented with `XRegExp.prototype` properties, and
     * // have fresh `lastIndex` properties (set to zero).
     * XRegExp(/regex/);
     */
    function XRegExp(pattern, flags) {
        if (XRegExp.isRegExp(pattern)) {
            if (flags !== undefined) {
                throw new TypeError('Cannot supply flags when copying a RegExp');
            }
            return copyRegex(pattern);
        }

        // Copy the argument behavior of `RegExp`
        pattern = pattern === undefined ? '' : String(pattern);
        flags = flags === undefined ? '' : String(flags);

        if (XRegExp.isInstalled('astral') && !(flags.indexOf('A') !== -1)) {
            // This causes an error to be thrown if the Unicode Base addon is not available
            flags += 'A';
        }

        if (!patternCache[pattern]) {
            patternCache[pattern] = {};
        }

        if (!patternCache[pattern][flags]) {
            var context = {
                hasNamedCapture: false,
                captureNames: []
            };
            var scope = defaultScope;
            var output = '';
            var pos = 0;
            var result = void 0;

            // Check for flag-related errors, and strip/apply flags in a leading mode modifier
            var applied = prepareFlags(pattern, flags);
            var appliedPattern = applied.pattern;
            var appliedFlags = applied.flags;

            // Use XRegExp's tokens to translate the pattern to a native regex pattern.
            // `appliedPattern.length` may change on each iteration if tokens use `reparse`
            while (pos < appliedPattern.length) {
                do {
                    // Check for custom tokens at the current position
                    result = runTokens(appliedPattern, appliedFlags, pos, scope, context);
                    // If the matched token used the `reparse` option, splice its output into the
                    // pattern before running tokens again at the same position
                    if (result && result.reparse) {
                        appliedPattern = appliedPattern.slice(0, pos) + result.output + appliedPattern.slice(pos + result.matchLength);
                    }
                } while (result && result.reparse);

                if (result) {
                    output += result.output;
                    pos += result.matchLength || 1;
                } else {
                    // Get the native token at the current position
                    var token = XRegExp.exec(appliedPattern, nativeTokens[scope], pos, 'sticky')[0];
                    output += token;
                    pos += token.length;
                    if (token === '[' && scope === defaultScope) {
                        scope = classScope;
                    } else if (token === ']' && scope === classScope) {
                        scope = defaultScope;
                    }
                }
            }

            patternCache[pattern][flags] = {
                // Use basic cleanup to collapse repeated empty groups like `(?:)(?:)` to `(?:)`. Empty
                // groups are sometimes inserted during regex transpilation in order to keep tokens
                // separated. However, more than one empty group in a row is never needed.
                pattern: nativ.replace.call(output, /(?:\(\?:\))+/g, '(?:)'),
                // Strip all but native flags
                flags: nativ.replace.call(appliedFlags, /[^gimuy]+/g, ''),
                // `context.captureNames` has an item for each capturing group, even if unnamed
                captures: context.hasNamedCapture ? context.captureNames : null
            };
        }

        var generated = patternCache[pattern][flags];
        return augment(new RegExp(generated.pattern, generated.flags), generated.captures, pattern, flags);
    }

    // Add `RegExp.prototype` to the prototype chain
    XRegExp.prototype = /(?:)/;

    // ==--------------------------==
    // Public properties
    // ==--------------------------==

    /**
     * The XRegExp version number as a string containing three dot-separated parts. For example,
     * '2.0.0-beta-3'.
     *
     * @static
     * @memberOf XRegExp
     * @type String
     */
    XRegExp.version = '4.0.0';

    // ==--------------------------==
    // Public methods
    // ==--------------------------==

    // Intentionally undocumented; used in tests and addons
    XRegExp._clipDuplicates = clipDuplicates;
    XRegExp._hasNativeFlag = hasNativeFlag;
    XRegExp._dec = dec;
    XRegExp._hex = hex;
    XRegExp._pad4 = pad4;

    /**
     * Extends XRegExp syntax and allows custom flags. This is used internally and can be used to
     * create XRegExp addons. If more than one token can match the same string, the last added wins.
     *
     * @memberOf XRegExp
     * @param {RegExp} regex Regex object that matches the new token.
     * @param {Function} handler Function that returns a new pattern string (using native regex syntax)
     *   to replace the matched token within all future XRegExp regexes. Has access to persistent
     *   properties of the regex being built, through `this`. Invoked with three arguments:
     *   - The match array, with named backreference properties.
     *   - The regex scope where the match was found: 'default' or 'class'.
     *   - The flags used by the regex, including any flags in a leading mode modifier.
     *   The handler function becomes part of the XRegExp construction process, so be careful not to
     *   construct XRegExps within the function or you will trigger infinite recursion.
     * @param {Object} [options] Options object with optional properties:
     *   - `scope` {String} Scope where the token applies: 'default', 'class', or 'all'.
     *   - `flag` {String} Single-character flag that triggers the token. This also registers the
     *     flag, which prevents XRegExp from throwing an 'unknown flag' error when the flag is used.
     *   - `optionalFlags` {String} Any custom flags checked for within the token `handler` that are
     *     not required to trigger the token. This registers the flags, to prevent XRegExp from
     *     throwing an 'unknown flag' error when any of the flags are used.
     *   - `reparse` {Boolean} Whether the `handler` function's output should not be treated as
     *     final, and instead be reparseable by other tokens (including the current token). Allows
     *     token chaining or deferring.
     *   - `leadChar` {String} Single character that occurs at the beginning of any successful match
     *     of the token (not always applicable). This doesn't change the behavior of the token unless
     *     you provide an erroneous value. However, providing it can increase the token's performance
     *     since the token can be skipped at any positions where this character doesn't appear.
     * @example
     *
     * // Basic usage: Add \a for the ALERT control code
     * XRegExp.addToken(
     *   /\\a/,
     *   () => '\\x07',
     *   {scope: 'all'}
     * );
     * XRegExp('\\a[\\a-\\n]+').test('\x07\n\x07'); // -> true
     *
     * // Add the U (ungreedy) flag from PCRE and RE2, which reverses greedy and lazy quantifiers.
     * // Since `scope` is not specified, it uses 'default' (i.e., transformations apply outside of
     * // character classes only)
     * XRegExp.addToken(
     *   /([?*+]|{\d+(?:,\d*)?})(\??)/,
     *   (match) => `${match[1]}${match[2] ? '' : '?'}`,
     *   {flag: 'U'}
     * );
     * XRegExp('a+', 'U').exec('aaa')[0]; // -> 'a'
     * XRegExp('a+?', 'U').exec('aaa')[0]; // -> 'aaa'
     */
    XRegExp.addToken = function (regex, handler, options) {
        options = options || {};
        var optionalFlags = options.optionalFlags;
        var i = void 0;

        if (options.flag) {
            registerFlag(options.flag);
        }

        if (optionalFlags) {
            optionalFlags = nativ.split.call(optionalFlags, '');
            for (i = 0; i < optionalFlags.length; ++i) {
                registerFlag(optionalFlags[i]);
            }
        }

        // Add to the private list of syntax tokens
        tokens.push({
            regex: copyRegex(regex, {
                addG: true,
                addY: hasNativeY,
                isInternalOnly: true
            }),
            handler: handler,
            scope: options.scope || defaultScope,
            flag: options.flag,
            reparse: options.reparse,
            leadChar: options.leadChar
        });

        // Reset the pattern cache used by the `XRegExp` constructor, since the same pattern and flags
        // might now produce different results
        XRegExp.cache.flush('patterns');
    };

    /**
     * Caches and returns the result of calling `XRegExp(pattern, flags)`. On any subsequent call with
     * the same pattern and flag combination, the cached copy of the regex is returned.
     *
     * @memberOf XRegExp
     * @param {String} pattern Regex pattern string.
     * @param {String} [flags] Any combination of XRegExp flags.
     * @returns {RegExp} Cached XRegExp object.
     * @example
     *
     * while (match = XRegExp.cache('.', 'gs').exec(str)) {
     *   // The regex is compiled once only
     * }
     */
    XRegExp.cache = function (pattern, flags) {
        if (!regexCache[pattern]) {
            regexCache[pattern] = {};
        }
        return regexCache[pattern][flags] || (regexCache[pattern][flags] = XRegExp(pattern, flags));
    };

    // Intentionally undocumented; used in tests
    XRegExp.cache.flush = function (cacheName) {
        if (cacheName === 'patterns') {
            // Flush the pattern cache used by the `XRegExp` constructor
            patternCache = {};
        } else {
            // Flush the regex cache populated by `XRegExp.cache`
            regexCache = {};
        }
    };

    /**
     * Escapes any regular expression metacharacters, for use when matching literal strings. The result
     * can safely be used at any point within a regex that uses any flags.
     *
     * @memberOf XRegExp
     * @param {String} str String to escape.
     * @returns {String} String with regex metacharacters escaped.
     * @example
     *
     * XRegExp.escape('Escaped? <.>');
     * // -> 'Escaped\?\ <\.>'
     */
    XRegExp.escape = function (str) {
        return nativ.replace.call(toObject(str), /[-\[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };

    /**
     * Executes a regex search in a specified string. Returns a match array or `null`. If the provided
     * regex uses named capture, named backreference properties are included on the match array.
     * Optional `pos` and `sticky` arguments specify the search start position, and whether the match
     * must start at the specified position only. The `lastIndex` property of the provided regex is not
     * used, but is updated for compatibility. Also fixes browser bugs compared to the native
     * `RegExp.prototype.exec` and can be used reliably cross-browser.
     *
     * @memberOf XRegExp
     * @param {String} str String to search.
     * @param {RegExp} regex Regex to search with.
     * @param {Number} [pos=0] Zero-based index at which to start the search.
     * @param {Boolean|String} [sticky=false] Whether the match must start at the specified position
     *   only. The string `'sticky'` is accepted as an alternative to `true`.
     * @returns {Array} Match array with named backreference properties, or `null`.
     * @example
     *
     * // Basic use, with named backreference
     * let match = XRegExp.exec('U+2620', XRegExp('U\\+(?<hex>[0-9A-F]{4})'));
     * match.hex; // -> '2620'
     *
     * // With pos and sticky, in a loop
     * let pos = 2, result = [], match;
     * while (match = XRegExp.exec('<1><2><3><4>5<6>', /<(\d)>/, pos, 'sticky')) {
     *   result.push(match[1]);
     *   pos = match.index + match[0].length;
     * }
     * // result -> ['2', '3', '4']
     */
    XRegExp.exec = function (str, regex, pos, sticky) {
        var cacheKey = 'g';
        var addY = false;
        var fakeY = false;
        var match = void 0;

        addY = hasNativeY && !!(sticky || regex.sticky && sticky !== false);
        if (addY) {
            cacheKey += 'y';
        } else if (sticky) {
            // Simulate sticky matching by appending an empty capture to the original regex. The
            // resulting regex will succeed no matter what at the current index (set with `lastIndex`),
            // and will not search the rest of the subject string. We'll know that the original regex
            // has failed if that last capture is `''` rather than `undefined` (i.e., if that last
            // capture participated in the match).
            fakeY = true;
            cacheKey += 'FakeY';
        }

        regex[REGEX_DATA] = regex[REGEX_DATA] || {};

        // Shares cached copies with `XRegExp.match`/`replace`
        var r2 = regex[REGEX_DATA][cacheKey] || (regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
            addG: true,
            addY: addY,
            source: fakeY ? regex.source + '|()' : undefined,
            removeY: sticky === false,
            isInternalOnly: true
        }));

        pos = pos || 0;
        r2.lastIndex = pos;

        // Fixed `exec` required for `lastIndex` fix, named backreferences, etc.
        match = fixed.exec.call(r2, str);

        // Get rid of the capture added by the pseudo-sticky matcher if needed. An empty string means
        // the original regexp failed (see above).
        if (fakeY && match && match.pop() === '') {
            match = null;
        }

        if (regex.global) {
            regex.lastIndex = match ? r2.lastIndex : 0;
        }

        return match;
    };

    /**
     * Executes a provided function once per regex match. Searches always start at the beginning of the
     * string and continue until the end, regardless of the state of the regex's `global` property and
     * initial `lastIndex`.
     *
     * @memberOf XRegExp
     * @param {String} str String to search.
     * @param {RegExp} regex Regex to search with.
     * @param {Function} callback Function to execute for each match. Invoked with four arguments:
     *   - The match array, with named backreference properties.
     *   - The zero-based match index.
     *   - The string being traversed.
     *   - The regex object being used to traverse the string.
     * @example
     *
     * // Extracts every other digit from a string
     * const evens = [];
     * XRegExp.forEach('1a2345', /\d/, (match, i) => {
     *   if (i % 2) evens.push(+match[0]);
     * });
     * // evens -> [2, 4]
     */
    XRegExp.forEach = function (str, regex, callback) {
        var pos = 0;
        var i = -1;
        var match = void 0;

        while (match = XRegExp.exec(str, regex, pos)) {
            // Because `regex` is provided to `callback`, the function could use the deprecated/
            // nonstandard `RegExp.prototype.compile` to mutate the regex. However, since `XRegExp.exec`
            // doesn't use `lastIndex` to set the search position, this can't lead to an infinite loop,
            // at least. Actually, because of the way `XRegExp.exec` caches globalized versions of
            // regexes, mutating the regex will not have any effect on the iteration or matched strings,
            // which is a nice side effect that brings extra safety.
            callback(match, ++i, str, regex);

            pos = match.index + (match[0].length || 1);
        }
    };

    /**
     * Copies a regex object and adds flag `g`. The copy maintains extended data, is augmented with
     * `XRegExp.prototype` properties, and has a fresh `lastIndex` property (set to zero). Native
     * regexes are not recompiled using XRegExp syntax.
     *
     * @memberOf XRegExp
     * @param {RegExp} regex Regex to globalize.
     * @returns {RegExp} Copy of the provided regex with flag `g` added.
     * @example
     *
     * const globalCopy = XRegExp.globalize(/regex/);
     * globalCopy.global; // -> true
     */
    XRegExp.globalize = function (regex) {
        return copyRegex(regex, { addG: true });
    };

    /**
     * Installs optional features according to the specified options. Can be undone using
     * `XRegExp.uninstall`.
     *
     * @memberOf XRegExp
     * @param {Object|String} options Options object or string.
     * @example
     *
     * // With an options object
     * XRegExp.install({
     *   // Enables support for astral code points in Unicode addons (implicitly sets flag A)
     *   astral: true
     * });
     *
     * // With an options string
     * XRegExp.install('astral');
     */
    XRegExp.install = function (options) {
        options = prepareOptions(options);

        if (!features.astral && options.astral) {
            setAstral(true);
        }
    };

    /**
     * Checks whether an individual optional feature is installed.
     *
     * @memberOf XRegExp
     * @param {String} feature Name of the feature to check. One of:
     *   - `astral`
     * @returns {Boolean} Whether the feature is installed.
     * @example
     *
     * XRegExp.isInstalled('astral');
     */
    XRegExp.isInstalled = function (feature) {
        return !!features[feature];
    };

    /**
     * Returns `true` if an object is a regex; `false` if it isn't. This works correctly for regexes
     * created in another frame, when `instanceof` and `constructor` checks would fail.
     *
     * @memberOf XRegExp
     * @param {*} value Object to check.
     * @returns {Boolean} Whether the object is a `RegExp` object.
     * @example
     *
     * XRegExp.isRegExp('string'); // -> false
     * XRegExp.isRegExp(/regex/i); // -> true
     * XRegExp.isRegExp(RegExp('^', 'm')); // -> true
     * XRegExp.isRegExp(XRegExp('(?s).')); // -> true
     */
    XRegExp.isRegExp = function (value) {
        return toString.call(value) === '[object RegExp]';
    }; // isType(value, 'RegExp');

    /**
     * Returns the first matched string, or in global mode, an array containing all matched strings.
     * This is essentially a more convenient re-implementation of `String.prototype.match` that gives
     * the result types you actually want (string instead of `exec`-style array in match-first mode,
     * and an empty array instead of `null` when no matches are found in match-all mode). It also lets
     * you override flag g and ignore `lastIndex`, and fixes browser bugs.
     *
     * @memberOf XRegExp
     * @param {String} str String to search.
     * @param {RegExp} regex Regex to search with.
     * @param {String} [scope='one'] Use 'one' to return the first match as a string. Use 'all' to
     *   return an array of all matched strings. If not explicitly specified and `regex` uses flag g,
     *   `scope` is 'all'.
     * @returns {String|Array} In match-first mode: First match as a string, or `null`. In match-all
     *   mode: Array of all matched strings, or an empty array.
     * @example
     *
     * // Match first
     * XRegExp.match('abc', /\w/); // -> 'a'
     * XRegExp.match('abc', /\w/g, 'one'); // -> 'a'
     * XRegExp.match('abc', /x/g, 'one'); // -> null
     *
     * // Match all
     * XRegExp.match('abc', /\w/g); // -> ['a', 'b', 'c']
     * XRegExp.match('abc', /\w/, 'all'); // -> ['a', 'b', 'c']
     * XRegExp.match('abc', /x/, 'all'); // -> []
     */
    XRegExp.match = function (str, regex, scope) {
        var global = regex.global && scope !== 'one' || scope === 'all';
        var cacheKey = (global ? 'g' : '') + (regex.sticky ? 'y' : '') || 'noGY';

        regex[REGEX_DATA] = regex[REGEX_DATA] || {};

        // Shares cached copies with `XRegExp.exec`/`replace`
        var r2 = regex[REGEX_DATA][cacheKey] || (regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
            addG: !!global,
            removeG: scope === 'one',
            isInternalOnly: true
        }));

        var result = nativ.match.call(toObject(str), r2);

        if (regex.global) {
            regex.lastIndex = scope === 'one' && result ?
            // Can't use `r2.lastIndex` since `r2` is nonglobal in this case
            result.index + result[0].length : 0;
        }

        return global ? result || [] : result && result[0];
    };

    /**
     * Retrieves the matches from searching a string using a chain of regexes that successively search
     * within previous matches. The provided `chain` array can contain regexes and or objects with
     * `regex` and `backref` properties. When a backreference is specified, the named or numbered
     * backreference is passed forward to the next regex or returned.
     *
     * @memberOf XRegExp
     * @param {String} str String to search.
     * @param {Array} chain Regexes that each search for matches within preceding results.
     * @returns {Array} Matches by the last regex in the chain, or an empty array.
     * @example
     *
     * // Basic usage; matches numbers within <b> tags
     * XRegExp.matchChain('1 <b>2</b> 3 <b>4 a 56</b>', [
     *   XRegExp('(?is)<b>.*?</b>'),
     *   /\d+/
     * ]);
     * // -> ['2', '4', '56']
     *
     * // Passing forward and returning specific backreferences
     * html = '<a href="http://xregexp.com/api/">XRegExp</a>\
     *         <a href="http://www.google.com/">Google</a>';
     * XRegExp.matchChain(html, [
     *   {regex: /<a href="([^"]+)">/i, backref: 1},
     *   {regex: XRegExp('(?i)^https?://(?<domain>[^/?#]+)'), backref: 'domain'}
     * ]);
     * // -> ['xregexp.com', 'www.google.com']
     */
    XRegExp.matchChain = function (str, chain) {
        return function recurseChain(values, level) {
            var item = chain[level].regex ? chain[level] : { regex: chain[level] };
            var matches = [];

            function addMatch(match) {
                if (item.backref) {
                    // Safari 4.0.5 (but not 5.0.5+) inappropriately uses sparse arrays to hold the
                    // `undefined`s for backreferences to nonparticipating capturing groups. In such
                    // cases, a `hasOwnProperty` or `in` check on its own would inappropriately throw
                    // the exception, so also check if the backreference is a number that is within the
                    // bounds of the array.
                    if (!(match.hasOwnProperty(item.backref) || +item.backref < match.length)) {
                        throw new ReferenceError('Backreference to undefined group: ' + item.backref);
                    }

                    matches.push(match[item.backref] || '');
                } else {
                    matches.push(match[0]);
                }
            }

            for (var i = 0; i < values.length; ++i) {
                XRegExp.forEach(values[i], item.regex, addMatch);
            }

            return level === chain.length - 1 || !matches.length ? matches : recurseChain(matches, level + 1);
        }([str], 0);
    };

    /**
     * Returns a new string with one or all matches of a pattern replaced. The pattern can be a string
     * or regex, and the replacement can be a string or a function to be called for each match. To
     * perform a global search and replace, use the optional `scope` argument or include flag g if using
     * a regex. Replacement strings can use `${n}` or `$<n>` for named and numbered backreferences.
     * Replacement functions can use named backreferences via `arguments[0].name`. Also fixes browser
     * bugs compared to the native `String.prototype.replace` and can be used reliably cross-browser.
     *
     * @memberOf XRegExp
     * @param {String} str String to search.
     * @param {RegExp|String} search Search pattern to be replaced.
     * @param {String|Function} replacement Replacement string or a function invoked to create it.
     *   Replacement strings can include special replacement syntax:
     *     - $$ - Inserts a literal $ character.
     *     - $&, $0 - Inserts the matched substring.
     *     - $` - Inserts the string that precedes the matched substring (left context).
     *     - $' - Inserts the string that follows the matched substring (right context).
     *     - $n, $nn - Where n/nn are digits referencing an existent capturing group, inserts
     *       backreference n/nn.
     *     - ${n}, $<n> - Where n is a name or any number of digits that reference an existent capturing
     *       group, inserts backreference n.
     *   Replacement functions are invoked with three or more arguments:
     *     - The matched substring (corresponds to $& above). Named backreferences are accessible as
     *       properties of this first argument.
     *     - 0..n arguments, one for each backreference (corresponding to $1, $2, etc. above).
     *     - The zero-based index of the match within the total search string.
     *     - The total string being searched.
     * @param {String} [scope='one'] Use 'one' to replace the first match only, or 'all'. If not
     *   explicitly specified and using a regex with flag g, `scope` is 'all'.
     * @returns {String} New string with one or all matches replaced.
     * @example
     *
     * // Regex search, using named backreferences in replacement string
     * const name = XRegExp('(?<first>\\w+) (?<last>\\w+)');
     * XRegExp.replace('John Smith', name, '$<last>, $<first>');
     * // -> 'Smith, John'
     *
     * // Regex search, using named backreferences in replacement function
     * XRegExp.replace('John Smith', name, (match) => `${match.last}, ${match.first}`);
     * // -> 'Smith, John'
     *
     * // String search, with replace-all
     * XRegExp.replace('RegExp builds RegExps', 'RegExp', 'XRegExp', 'all');
     * // -> 'XRegExp builds XRegExps'
     */
    XRegExp.replace = function (str, search, replacement, scope) {
        var isRegex = XRegExp.isRegExp(search);
        var global = search.global && scope !== 'one' || scope === 'all';
        var cacheKey = (global ? 'g' : '') + (search.sticky ? 'y' : '') || 'noGY';
        var s2 = search;

        if (isRegex) {
            search[REGEX_DATA] = search[REGEX_DATA] || {};

            // Shares cached copies with `XRegExp.exec`/`match`. Since a copy is used, `search`'s
            // `lastIndex` isn't updated *during* replacement iterations
            s2 = search[REGEX_DATA][cacheKey] || (search[REGEX_DATA][cacheKey] = copyRegex(search, {
                addG: !!global,
                removeG: scope === 'one',
                isInternalOnly: true
            }));
        } else if (global) {
            s2 = new RegExp(XRegExp.escape(String(search)), 'g');
        }

        // Fixed `replace` required for named backreferences, etc.
        var result = fixed.replace.call(toObject(str), s2, replacement);

        if (isRegex && search.global) {
            // Fixes IE, Safari bug (last tested IE 9, Safari 5.1)
            search.lastIndex = 0;
        }

        return result;
    };

    /**
     * Performs batch processing of string replacements. Used like `XRegExp.replace`, but accepts an
     * array of replacement details. Later replacements operate on the output of earlier replacements.
     * Replacement details are accepted as an array with a regex or string to search for, the
     * replacement string or function, and an optional scope of 'one' or 'all'. Uses the XRegExp
     * replacement text syntax, which supports named backreference properties via `${name}` or
     * `$<name>`.
     *
     * @memberOf XRegExp
     * @param {String} str String to search.
     * @param {Array} replacements Array of replacement detail arrays.
     * @returns {String} New string with all replacements.
     * @example
     *
     * str = XRegExp.replaceEach(str, [
     *   [XRegExp('(?<name>a)'), 'z${name}'],
     *   [/b/gi, 'y'],
     *   [/c/g, 'x', 'one'], // scope 'one' overrides /g
     *   [/d/, 'w', 'all'],  // scope 'all' overrides lack of /g
     *   ['e', 'v', 'all'],  // scope 'all' allows replace-all for strings
     *   [/f/g, ($0) => $0.toUpperCase()]
     * ]);
     */
    XRegExp.replaceEach = function (str, replacements) {
        var i = void 0;
        var r = void 0;

        for (i = 0; i < replacements.length; ++i) {
            r = replacements[i];
            str = XRegExp.replace(str, r[0], r[1], r[2]);
        }

        return str;
    };

    /**
     * Splits a string into an array of strings using a regex or string separator. Matches of the
     * separator are not included in the result array. However, if `separator` is a regex that contains
     * capturing groups, backreferences are spliced into the result each time `separator` is matched.
     * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
     * cross-browser.
     *
     * @memberOf XRegExp
     * @param {String} str String to split.
     * @param {RegExp|String} separator Regex or string to use for separating the string.
     * @param {Number} [limit] Maximum number of items to include in the result array.
     * @returns {Array} Array of substrings.
     * @example
     *
     * // Basic use
     * XRegExp.split('a b c', ' ');
     * // -> ['a', 'b', 'c']
     *
     * // With limit
     * XRegExp.split('a b c', ' ', 2);
     * // -> ['a', 'b']
     *
     * // Backreferences in result array
     * XRegExp.split('..word1..', /([a-z]+)(\d+)/i);
     * // -> ['..', 'word', '1', '..']
     */
    XRegExp.split = function (str, separator, limit) {
        return fixed.split.call(toObject(str), separator, limit);
    };

    /**
     * Executes a regex search in a specified string. Returns `true` or `false`. Optional `pos` and
     * `sticky` arguments specify the search start position, and whether the match must start at the
     * specified position only. The `lastIndex` property of the provided regex is not used, but is
     * updated for compatibility. Also fixes browser bugs compared to the native
     * `RegExp.prototype.test` and can be used reliably cross-browser.
     *
     * @memberOf XRegExp
     * @param {String} str String to search.
     * @param {RegExp} regex Regex to search with.
     * @param {Number} [pos=0] Zero-based index at which to start the search.
     * @param {Boolean|String} [sticky=false] Whether the match must start at the specified position
     *   only. The string `'sticky'` is accepted as an alternative to `true`.
     * @returns {Boolean} Whether the regex matched the provided value.
     * @example
     *
     * // Basic use
     * XRegExp.test('abc', /c/); // -> true
     *
     * // With pos and sticky
     * XRegExp.test('abc', /c/, 0, 'sticky'); // -> false
     * XRegExp.test('abc', /c/, 2, 'sticky'); // -> true
     */
    // Do this the easy way :-)
    XRegExp.test = function (str, regex, pos, sticky) {
        return !!XRegExp.exec(str, regex, pos, sticky);
    };

    /**
     * Uninstalls optional features according to the specified options. All optional features start out
     * uninstalled, so this is used to undo the actions of `XRegExp.install`.
     *
     * @memberOf XRegExp
     * @param {Object|String} options Options object or string.
     * @example
     *
     * // With an options object
     * XRegExp.uninstall({
     *   // Disables support for astral code points in Unicode addons
     *   astral: true
     * });
     *
     * // With an options string
     * XRegExp.uninstall('astral');
     */
    XRegExp.uninstall = function (options) {
        options = prepareOptions(options);

        if (features.astral && options.astral) {
            setAstral(false);
        }
    };

    /**
     * Returns an XRegExp object that is the union of the given patterns. Patterns can be provided as
     * regex objects or strings. Metacharacters are escaped in patterns provided as strings.
     * Backreferences in provided regex objects are automatically renumbered to work correctly within
     * the larger combined pattern. Native flags used by provided regexes are ignored in favor of the
     * `flags` argument.
     *
     * @memberOf XRegExp
     * @param {Array} patterns Regexes and strings to combine.
     * @param {String} [flags] Any combination of XRegExp flags.
     * @param {Object} [options] Options object with optional properties:
     *   - `conjunction` {String} Type of conjunction to use: 'or' (default) or 'none'.
     * @returns {RegExp} Union of the provided regexes and strings.
     * @example
     *
     * XRegExp.union(['a+b*c', /(dogs)\1/, /(cats)\1/], 'i');
     * // -> /a\+b\*c|(dogs)\1|(cats)\2/i
     *
     * XRegExp.union([/man/, /bear/, /pig/], 'i', {conjunction: 'none'});
     * // -> /manbearpig/i
     */
    XRegExp.union = function (patterns, flags, options) {
        options = options || {};
        var conjunction = options.conjunction || 'or';
        var numCaptures = 0;
        var numPriorCaptures = void 0;
        var captureNames = void 0;

        function rewrite(match, paren, backref) {
            var name = captureNames[numCaptures - numPriorCaptures];

            // Capturing group
            if (paren) {
                ++numCaptures;
                // If the current capture has a name, preserve the name
                if (name) {
                    return '(?<' + name + '>';
                }
                // Backreference
            } else if (backref) {
                // Rewrite the backreference
                return '\\' + (+backref + numPriorCaptures);
            }

            return match;
        }

        if (!(isType(patterns, 'Array') && patterns.length)) {
            throw new TypeError('Must provide a nonempty array of patterns to merge');
        }

        var parts = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*\]/g;
        var output = [];
        var pattern = void 0;
        for (var i = 0; i < patterns.length; ++i) {
            pattern = patterns[i];

            if (XRegExp.isRegExp(pattern)) {
                numPriorCaptures = numCaptures;
                captureNames = pattern[REGEX_DATA] && pattern[REGEX_DATA].captureNames || [];

                // Rewrite backreferences. Passing to XRegExp dies on octals and ensures patterns are
                // independently valid; helps keep this simple. Named captures are put back
                output.push(nativ.replace.call(XRegExp(pattern.source).source, parts, rewrite));
            } else {
                output.push(XRegExp.escape(pattern));
            }
        }

        var separator = conjunction === 'none' ? '' : '|';
        return XRegExp(output.join(separator), flags);
    };

    // ==--------------------------==
    // Fixed/extended native methods
    // ==--------------------------==

    /**
     * Adds named capture support (with backreferences returned as `result.name`), and fixes browser
     * bugs in the native `RegExp.prototype.exec`. Use via `XRegExp.exec`.
     *
     * @memberOf RegExp
     * @param {String} str String to search.
     * @returns {Array} Match array with named backreference properties, or `null`.
     */
    fixed.exec = function (str) {
        var origLastIndex = this.lastIndex;
        var match = nativ.exec.apply(this, arguments);

        if (match) {
            // Fix browsers whose `exec` methods don't return `undefined` for nonparticipating capturing
            // groups. This fixes IE 5.5-8, but not IE 9's quirks mode or emulation of older IEs. IE 9
            // in standards mode follows the spec.
            if (!correctExecNpcg && match.length > 1 && match.indexOf('') !== -1) {
                var r2 = copyRegex(this, {
                    removeG: true,
                    isInternalOnly: true
                });
                // Using `str.slice(match.index)` rather than `match[0]` in case lookahead allowed
                // matching due to characters outside the match
                nativ.replace.call(String(str).slice(match.index), r2, function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    var len = args.length;
                    // Skip index 0 and the last 2
                    for (var i = 1; i < len - 2; ++i) {
                        if (args[i] === undefined) {
                            match[i] = undefined;
                        }
                    }
                });
            }

            // Attach named capture properties
            if (this[REGEX_DATA] && this[REGEX_DATA].captureNames) {
                // Skip index 0
                for (var i = 1; i < match.length; ++i) {
                    var name = this[REGEX_DATA].captureNames[i - 1];
                    if (name) {
                        match[name] = match[i];
                    }
                }
            }

            // Fix browsers that increment `lastIndex` after zero-length matches
            if (this.global && !match[0].length && this.lastIndex > match.index) {
                this.lastIndex = match.index;
            }
        }

        if (!this.global) {
            // Fixes IE, Opera bug (last tested IE 9, Opera 11.6)
            this.lastIndex = origLastIndex;
        }

        return match;
    };

    /**
     * Fixes browser bugs in the native `RegExp.prototype.test`.
     *
     * @memberOf RegExp
     * @param {String} str String to search.
     * @returns {Boolean} Whether the regex matched the provided value.
     */
    fixed.test = function (str) {
        // Do this the easy way :-)
        return !!fixed.exec.call(this, str);
    };

    /**
     * Adds named capture support (with backreferences returned as `result.name`), and fixes browser
     * bugs in the native `String.prototype.match`.
     *
     * @memberOf String
     * @param {RegExp|*} regex Regex to search with. If not a regex object, it is passed to `RegExp`.
     * @returns {Array} If `regex` uses flag g, an array of match strings or `null`. Without flag g,
     *   the result of calling `regex.exec(this)`.
     */
    fixed.match = function (regex) {
        if (!XRegExp.isRegExp(regex)) {
            // Use the native `RegExp` rather than `XRegExp`
            regex = new RegExp(regex);
        } else if (regex.global) {
            var result = nativ.match.apply(this, arguments);
            // Fixes IE bug
            regex.lastIndex = 0;

            return result;
        }

        return fixed.exec.call(regex, toObject(this));
    };

    /**
     * Adds support for `${n}` (or `$<n>`) tokens for named and numbered backreferences in replacement
     * text, and provides named backreferences to replacement functions as `arguments[0].name`. Also
     * fixes browser bugs in replacement text syntax when performing a replacement using a nonregex
     * search value, and the value of a replacement regex's `lastIndex` property during replacement
     * iterations and upon completion. Note that this doesn't support SpiderMonkey's proprietary third
     * (`flags`) argument. Use via `XRegExp.replace`.
     *
     * @memberOf String
     * @param {RegExp|String} search Search pattern to be replaced.
     * @param {String|Function} replacement Replacement string or a function invoked to create it.
     * @returns {String} New string with one or all matches replaced.
     */
    fixed.replace = function (search, replacement) {
        var isRegex = XRegExp.isRegExp(search);
        var origLastIndex = void 0;
        var captureNames = void 0;
        var result = void 0;

        if (isRegex) {
            if (search[REGEX_DATA]) {
                captureNames = search[REGEX_DATA].captureNames;
            }
            // Only needed if `search` is nonglobal
            origLastIndex = search.lastIndex;
        } else {
            search += ''; // Type-convert
        }

        // Don't use `typeof`; some older browsers return 'function' for regex objects
        if (isType(replacement, 'Function')) {
            // Stringifying `this` fixes a bug in IE < 9 where the last argument in replacement
            // functions isn't type-converted to a string
            result = nativ.replace.call(String(this), search, function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                if (captureNames) {
                    // Change the `args[0]` string primitive to a `String` object that can store
                    // properties. This really does need to use `String` as a constructor
                    args[0] = new String(args[0]);
                    // Store named backreferences on the first argument
                    for (var i = 0; i < captureNames.length; ++i) {
                        if (captureNames[i]) {
                            args[0][captureNames[i]] = args[i + 1];
                        }
                    }
                }
                // Update `lastIndex` before calling `replacement`. Fixes IE, Chrome, Firefox, Safari
                // bug (last tested IE 9, Chrome 17, Firefox 11, Safari 5.1)
                if (isRegex && search.global) {
                    search.lastIndex = args[args.length - 2] + args[0].length;
                }
                // ES6 specs the context for replacement functions as `undefined`
                return replacement.apply(undefined, args);
            });
        } else {
            // Ensure that the last value of `args` will be a string when given nonstring `this`,
            // while still throwing on null or undefined context
            result = nativ.replace.call(this == null ? this : String(this), search, function () {
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
                }

                return nativ.replace.call(String(replacement), replacementToken, replacer);

                function replacer($0, bracketed, angled, dollarToken) {
                    bracketed = bracketed || angled;
                    // Named or numbered backreference with curly or angled braces
                    if (bracketed) {
                        // XRegExp behavior for `${n}` or `$<n>`:
                        // 1. Backreference to numbered capture, if `n` is an integer. Use `0` for the
                        //    entire match. Any number of leading zeros may be used.
                        // 2. Backreference to named capture `n`, if it exists and is not an integer
                        //    overridden by numbered capture. In practice, this does not overlap with
                        //    numbered capture since XRegExp does not allow named capture to use a bare
                        //    integer as the name.
                        // 3. If the name or number does not refer to an existing capturing group, it's
                        //    an error.
                        var n = +bracketed; // Type-convert; drop leading zeros
                        if (n <= args.length - 3) {
                            return args[n] || '';
                        }
                        // Groups with the same name is an error, else would need `lastIndexOf`
                        n = captureNames ? captureNames.indexOf(bracketed) : -1;
                        if (n < 0) {
                            throw new SyntaxError('Backreference to undefined group ' + $0);
                        }
                        return args[n + 1] || '';
                    }
                    // Else, special variable or numbered backreference without curly braces
                    if (dollarToken === '$') {
                        // $$
                        return '$';
                    }
                    if (dollarToken === '&' || +dollarToken === 0) {
                        // $&, $0 (not followed by 1-9), $00
                        return args[0];
                    }
                    if (dollarToken === '`') {
                        // $` (left context)
                        return args[args.length - 1].slice(0, args[args.length - 2]);
                    }
                    if (dollarToken === "'") {
                        // $' (right context)
                        return args[args.length - 1].slice(args[args.length - 2] + args[0].length);
                    }
                    // Else, numbered backreference without braces
                    dollarToken = +dollarToken; // Type-convert; drop leading zero
                    // XRegExp behavior for `$n` and `$nn`:
                    // - Backrefs end after 1 or 2 digits. Use `${..}` or `$<..>` for more digits.
                    // - `$1` is an error if no capturing groups.
                    // - `$10` is an error if less than 10 capturing groups. Use `${1}0` or `$<1>0`
                    //   instead.
                    // - `$01` is `$1` if at least one capturing group, else it's an error.
                    // - `$0` (not followed by 1-9) and `$00` are the entire match.
                    // Native behavior, for comparison:
                    // - Backrefs end after 1 or 2 digits. Cannot reference capturing group 100+.
                    // - `$1` is a literal `$1` if no capturing groups.
                    // - `$10` is `$1` followed by a literal `0` if less than 10 capturing groups.
                    // - `$01` is `$1` if at least one capturing group, else it's a literal `$01`.
                    // - `$0` is a literal `$0`.
                    if (!isNaN(dollarToken)) {
                        if (dollarToken > args.length - 3) {
                            throw new SyntaxError('Backreference to undefined group ' + $0);
                        }
                        return args[dollarToken] || '';
                    }
                    // `$` followed by an unsupported char is an error, unlike native JS
                    throw new SyntaxError('Invalid token ' + $0);
                }
            });
        }

        if (isRegex) {
            if (search.global) {
                // Fixes IE, Safari bug (last tested IE 9, Safari 5.1)
                search.lastIndex = 0;
            } else {
                // Fixes IE, Opera bug (last tested IE 9, Opera 11.6)
                search.lastIndex = origLastIndex;
            }
        }

        return result;
    };

    /**
     * Fixes browser bugs in the native `String.prototype.split`. Use via `XRegExp.split`.
     *
     * @memberOf String
     * @param {RegExp|String} separator Regex or string to use for separating the string.
     * @param {Number} [limit] Maximum number of items to include in the result array.
     * @returns {Array} Array of substrings.
     */
    fixed.split = function (separator, limit) {
        if (!XRegExp.isRegExp(separator)) {
            // Browsers handle nonregex split correctly, so use the faster native method
            return nativ.split.apply(this, arguments);
        }

        var str = String(this);
        var output = [];
        var origLastIndex = separator.lastIndex;
        var lastLastIndex = 0;
        var lastLength = void 0;

        // Values for `limit`, per the spec:
        // If undefined: pow(2,32) - 1
        // If 0, Infinity, or NaN: 0
        // If positive number: limit = floor(limit); if (limit >= pow(2,32)) limit -= pow(2,32);
        // If negative number: pow(2,32) - floor(abs(limit))
        // If other: Type-convert, then use the above rules
        // This line fails in very strange ways for some values of `limit` in Opera 10.5-10.63, unless
        // Opera Dragonfly is open (go figure). It works in at least Opera 9.5-10.1 and 11+
        limit = (limit === undefined ? -1 : limit) >>> 0;

        XRegExp.forEach(str, separator, function (match) {
            // This condition is not the same as `if (match[0].length)`
            if (match.index + match[0].length > lastLastIndex) {
                output.push(str.slice(lastLastIndex, match.index));
                if (match.length > 1 && match.index < str.length) {
                    Array.prototype.push.apply(output, match.slice(1));
                }
                lastLength = match[0].length;
                lastLastIndex = match.index + lastLength;
            }
        });

        if (lastLastIndex === str.length) {
            if (!nativ.test.call(separator, '') || lastLength) {
                output.push('');
            }
        } else {
            output.push(str.slice(lastLastIndex));
        }

        separator.lastIndex = origLastIndex;
        return output.length > limit ? output.slice(0, limit) : output;
    };

    // ==--------------------------==
    // Built-in syntax/flag tokens
    // ==--------------------------==

    /*
     * Letter escapes that natively match literal characters: `\a`, `\A`, etc. These should be
     * SyntaxErrors but are allowed in web reality. XRegExp makes them errors for cross-browser
     * consistency and to reserve their syntax, but lets them be superseded by addons.
     */
    XRegExp.addToken(/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4}|{[\dA-Fa-f]+})|x(?![\dA-Fa-f]{2}))/, function (match, scope) {
        // \B is allowed in default scope only
        if (match[1] === 'B' && scope === defaultScope) {
            return match[0];
        }
        throw new SyntaxError('Invalid escape ' + match[0]);
    }, {
        scope: 'all',
        leadChar: '\\'
    });

    /*
     * Unicode code point escape with curly braces: `\u{N..}`. `N..` is any one or more digit
     * hexadecimal number from 0-10FFFF, and can include leading zeros. Requires the native ES6 `u` flag
     * to support code points greater than U+FFFF. Avoids converting code points above U+FFFF to
     * surrogate pairs (which could be done without flag `u`), since that could lead to broken behavior
     * if you follow a `\u{N..}` token that references a code point above U+FFFF with a quantifier, or
     * if you use the same in a character class.
     */
    XRegExp.addToken(/\\u{([\dA-Fa-f]+)}/, function (match, scope, flags) {
        var code = dec(match[1]);
        if (code > 0x10FFFF) {
            throw new SyntaxError('Invalid Unicode code point ' + match[0]);
        }
        if (code <= 0xFFFF) {
            // Converting to \uNNNN avoids needing to escape the literal character and keep it
            // separate from preceding tokens
            return '\\u' + pad4(hex(code));
        }
        // If `code` is between 0xFFFF and 0x10FFFF, require and defer to native handling
        if (hasNativeU && flags.indexOf('u') !== -1) {
            return match[0];
        }
        throw new SyntaxError('Cannot use Unicode code point above \\u{FFFF} without flag u');
    }, {
        scope: 'all',
        leadChar: '\\'
    });

    /*
     * Empty character class: `[]` or `[^]`. This fixes a critical cross-browser syntax inconsistency.
     * Unless this is standardized (per the ES spec), regex syntax can't be accurately parsed because
     * character class endings can't be determined.
     */
    XRegExp.addToken(/\[(\^?)\]/,
    // For cross-browser compatibility with ES3, convert [] to \b\B and [^] to [\s\S].
    // (?!) should work like \b\B, but is unreliable in some versions of Firefox
    /* eslint-disable no-confusing-arrow */
    function (match) {
        return match[1] ? '[\\s\\S]' : '\\b\\B';
    },
    /* eslint-enable no-confusing-arrow */
    { leadChar: '[' });

    /*
     * Comment pattern: `(?# )`. Inline comments are an alternative to the line comments allowed in
     * free-spacing mode (flag x).
     */
    XRegExp.addToken(/\(\?#[^)]*\)/, getContextualTokenSeparator, { leadChar: '(' });

    /*
     * Whitespace and line comments, in free-spacing mode (aka extended mode, flag x) only.
     */
    XRegExp.addToken(/\s+|#[^\n]*\n?/, getContextualTokenSeparator, { flag: 'x' });

    /*
     * Dot, in dotall mode (aka singleline mode, flag s) only.
     */
    XRegExp.addToken(/\./, function () {
        return '[\\s\\S]';
    }, {
        flag: 's',
        leadChar: '.'
    });

    /*
     * Named backreference: `\k<name>`. Backreference names can use the characters A-Z, a-z, 0-9, _,
     * and $ only. Also allows numbered backreferences as `\k<n>`.
     */
    XRegExp.addToken(/\\k<([\w$]+)>/, function (match) {
        // Groups with the same name is an error, else would need `lastIndexOf`
        var index = isNaN(match[1]) ? this.captureNames.indexOf(match[1]) + 1 : +match[1];
        var endIndex = match.index + match[0].length;
        if (!index || index > this.captureNames.length) {
            throw new SyntaxError('Backreference to undefined group ' + match[0]);
        }
        // Keep backreferences separate from subsequent literal numbers. This avoids e.g.
        // inadvertedly changing `(?<n>)\k<n>1` to `()\11`.
        return '\\' + index + (endIndex === match.input.length || isNaN(match.input[endIndex]) ? '' : '(?:)');
    }, { leadChar: '\\' });

    /*
     * Numbered backreference or octal, plus any following digits: `\0`, `\11`, etc. Octals except `\0`
     * not followed by 0-9 and backreferences to unopened capture groups throw an error. Other matches
     * are returned unaltered. IE < 9 doesn't support backreferences above `\99` in regex syntax.
     */
    XRegExp.addToken(/\\(\d+)/, function (match, scope) {
        if (!(scope === defaultScope && /^[1-9]/.test(match[1]) && +match[1] <= this.captureNames.length) && match[1] !== '0') {
            throw new SyntaxError('Cannot use octal escape or backreference to undefined group ' + match[0]);
        }
        return match[0];
    }, {
        scope: 'all',
        leadChar: '\\'
    });

    /*
     * Named capturing group; match the opening delimiter only: `(?<name>`. Capture names can use the
     * characters A-Z, a-z, 0-9, _, and $ only. Names can't be integers. Supports Python-style
     * `(?P<name>` as an alternate syntax to avoid issues in some older versions of Opera which natively
     * supported the Python-style syntax. Otherwise, XRegExp might treat numbered backreferences to
     * Python-style named capture as octals.
     */
    XRegExp.addToken(/\(\?P?<([\w$]+)>/, function (match) {
        // Disallow bare integers as names because named backreferences are added to match arrays
        // and therefore numeric properties may lead to incorrect lookups
        if (!isNaN(match[1])) {
            throw new SyntaxError('Cannot use integer as capture name ' + match[0]);
        }
        if (match[1] === 'length' || match[1] === '__proto__') {
            throw new SyntaxError('Cannot use reserved word as capture name ' + match[0]);
        }
        if (this.captureNames.indexOf(match[1]) !== -1) {
            throw new SyntaxError('Cannot use same name for multiple groups ' + match[0]);
        }
        this.captureNames.push(match[1]);
        this.hasNamedCapture = true;
        return '(';
    }, { leadChar: '(' });

    /*
     * Capturing group; match the opening parenthesis only. Required for support of named capturing
     * groups. Also adds explicit capture mode (flag n).
     */
    XRegExp.addToken(/\((?!\?)/, function (match, scope, flags) {
        if (flags.indexOf('n') !== -1) {
            return '(?:';
        }
        this.captureNames.push(null);
        return '(';
    }, {
        optionalFlags: 'n',
        leadChar: '('
    });

    exports.default = XRegExp;
    module.exports = exports['default'];
    });

    unwrapExports(xregexp);

    var build = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    /*!
     * XRegExp.build 4.0.0
     * <xregexp.com>
     * Steven Levithan (c) 2012-2017 MIT License
     */

    exports.default = function (XRegExp) {
        var REGEX_DATA = 'xregexp';
        var subParts = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*\]/g;
        var parts = XRegExp.union([/\({{([\w$]+)}}\)|{{([\w$]+)}}/, subParts], 'g', {
            conjunction: 'or'
        });

        /**
         * Strips a leading `^` and trailing unescaped `$`, if both are present.
         *
         * @private
         * @param {String} pattern Pattern to process.
         * @returns {String} Pattern with edge anchors removed.
         */
        function deanchor(pattern) {
            // Allow any number of empty noncapturing groups before/after anchors, because regexes
            // built/generated by XRegExp sometimes include them
            var leadingAnchor = /^(?:\(\?:\))*\^/;
            var trailingAnchor = /\$(?:\(\?:\))*$/;

            if (leadingAnchor.test(pattern) && trailingAnchor.test(pattern) &&
            // Ensure that the trailing `$` isn't escaped
            trailingAnchor.test(pattern.replace(/\\[\s\S]/g, ''))) {
                return pattern.replace(leadingAnchor, '').replace(trailingAnchor, '');
            }

            return pattern;
        }

        /**
         * Converts the provided value to an XRegExp. Native RegExp flags are not preserved.
         *
         * @private
         * @param {String|RegExp} value Value to convert.
         * @param {Boolean} [addFlagX] Whether to apply the `x` flag in cases when `value` is not
         *   already a regex generated by XRegExp
         * @returns {RegExp} XRegExp object with XRegExp syntax applied.
         */
        function asXRegExp(value, addFlagX) {
            var flags = addFlagX ? 'x' : '';
            return XRegExp.isRegExp(value) ? value[REGEX_DATA] && value[REGEX_DATA].captureNames ?
            // Don't recompile, to preserve capture names
            value :
            // Recompile as XRegExp
            XRegExp(value.source, flags) :
            // Compile string as XRegExp
            XRegExp(value, flags);
        }

        function interpolate(substitution) {
            return substitution instanceof RegExp ? substitution : XRegExp.escape(substitution);
        }

        function reduceToSubpatternsObject(subpatterns, interpolated, subpatternIndex) {
            subpatterns['subpattern' + subpatternIndex] = interpolated;
            return subpatterns;
        }

        function embedSubpatternAfter(raw, subpatternIndex, rawLiterals) {
            var hasSubpattern = subpatternIndex < rawLiterals.length - 1;
            return raw + (hasSubpattern ? '{{subpattern' + subpatternIndex + '}}' : '');
        }

        /**
         * Provides tagged template literals that create regexes with XRegExp syntax and flags. The
         * provided pattern is handled as a raw string, so backslashes don't need to be escaped.
         *
         * Interpolation of strings and regexes shares the features of `XRegExp.build`. Interpolated
         * patterns are treated as atomic units when quantified, interpolated strings have their special
         * characters escaped, a leading `^` and trailing unescaped `$` are stripped from interpolated
         * regexes if both are present, and any backreferences within an interpolated regex are
         * rewritten to work within the overall pattern.
         *
         * @memberOf XRegExp
         * @param {String} [flags] Any combination of XRegExp flags.
         * @returns {Function} Handler for template literals that construct regexes with XRegExp syntax.
         * @example
         *
         * const h12 = /1[0-2]|0?[1-9]/;
         * const h24 = /2[0-3]|[01][0-9]/;
         * const hours = XRegExp.tag('x')`${h12} : | ${h24}`;
         * const minutes = /^[0-5][0-9]$/;
         * // Note that explicitly naming the 'minutes' group is required for named backreferences
         * const time = XRegExp.tag('x')`^ ${hours} (?<minutes>${minutes}) $`;
         * time.test('10:59'); // -> true
         * XRegExp.exec('10:59', time).minutes; // -> '59'
         */
        XRegExp.tag = function (flags) {
            return function (literals) {
                for (var _len = arguments.length, substitutions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    substitutions[_key - 1] = arguments[_key];
                }

                var subpatterns = substitutions.map(interpolate).reduce(reduceToSubpatternsObject, {});
                var pattern = literals.raw.map(embedSubpatternAfter).join('');
                return XRegExp.build(pattern, subpatterns, flags);
            };
        };

        /**
         * Builds regexes using named subpatterns, for readability and pattern reuse. Backreferences in
         * the outer pattern and provided subpatterns are automatically renumbered to work correctly.
         * Native flags used by provided subpatterns are ignored in favor of the `flags` argument.
         *
         * @memberOf XRegExp
         * @param {String} pattern XRegExp pattern using `{{name}}` for embedded subpatterns. Allows
         *   `({{name}})` as shorthand for `(?<name>{{name}})`. Patterns cannot be embedded within
         *   character classes.
         * @param {Object} subs Lookup object for named subpatterns. Values can be strings or regexes. A
         *   leading `^` and trailing unescaped `$` are stripped from subpatterns, if both are present.
         * @param {String} [flags] Any combination of XRegExp flags.
         * @returns {RegExp} Regex with interpolated subpatterns.
         * @example
         *
         * const time = XRegExp.build('(?x)^ {{hours}} ({{minutes}}) $', {
         *   hours: XRegExp.build('{{h12}} : | {{h24}}', {
         *     h12: /1[0-2]|0?[1-9]/,
         *     h24: /2[0-3]|[01][0-9]/
         *   }, 'x'),
         *   minutes: /^[0-5][0-9]$/
         * });
         * time.test('10:59'); // -> true
         * XRegExp.exec('10:59', time).minutes; // -> '59'
         */
        XRegExp.build = function (pattern, subs, flags) {
            flags = flags || '';
            // Used with `asXRegExp` calls for `pattern` and subpatterns in `subs`, to work around how
            // some browsers convert `RegExp('\n')` to a regex that contains the literal characters `\`
            // and `n`. See more details at <https://github.com/slevithan/xregexp/pull/163>.
            var addFlagX = flags.indexOf('x') !== -1;
            var inlineFlags = /^\(\?([\w$]+)\)/.exec(pattern);
            // Add flags within a leading mode modifier to the overall pattern's flags
            if (inlineFlags) {
                flags = XRegExp._clipDuplicates(flags + inlineFlags[1]);
            }

            var data = {};
            for (var p in subs) {
                if (subs.hasOwnProperty(p)) {
                    // Passing to XRegExp enables extended syntax and ensures independent validity,
                    // lest an unescaped `(`, `)`, `[`, or trailing `\` breaks the `(?:)` wrapper. For
                    // subpatterns provided as native regexes, it dies on octals and adds the property
                    // used to hold extended regex instance data, for simplicity.
                    var sub = asXRegExp(subs[p], addFlagX);
                    data[p] = {
                        // Deanchoring allows embedding independently useful anchored regexes. If you
                        // really need to keep your anchors, double them (i.e., `^^...$$`).
                        pattern: deanchor(sub.source),
                        names: sub[REGEX_DATA].captureNames || []
                    };
                }
            }

            // Passing to XRegExp dies on octals and ensures the outer pattern is independently valid;
            // helps keep this simple. Named captures will be put back.
            var patternAsRegex = asXRegExp(pattern, addFlagX);

            // 'Caps' is short for 'captures'
            var numCaps = 0;
            var numPriorCaps = void 0;
            var numOuterCaps = 0;
            var outerCapsMap = [0];
            var outerCapNames = patternAsRegex[REGEX_DATA].captureNames || [];
            var output = patternAsRegex.source.replace(parts, function ($0, $1, $2, $3, $4) {
                var subName = $1 || $2;
                var capName = void 0;
                var intro = void 0;
                var localCapIndex = void 0;
                // Named subpattern
                if (subName) {
                    if (!data.hasOwnProperty(subName)) {
                        throw new ReferenceError('Undefined property ' + $0);
                    }
                    // Named subpattern was wrapped in a capturing group
                    if ($1) {
                        capName = outerCapNames[numOuterCaps];
                        outerCapsMap[++numOuterCaps] = ++numCaps;
                        // If it's a named group, preserve the name. Otherwise, use the subpattern name
                        // as the capture name
                        intro = '(?<' + (capName || subName) + '>';
                    } else {
                        intro = '(?:';
                    }
                    numPriorCaps = numCaps;
                    var rewrittenSubpattern = data[subName].pattern.replace(subParts, function (match, paren, backref) {
                        // Capturing group
                        if (paren) {
                            capName = data[subName].names[numCaps - numPriorCaps];
                            ++numCaps;
                            // If the current capture has a name, preserve the name
                            if (capName) {
                                return '(?<' + capName + '>';
                            }
                            // Backreference
                        } else if (backref) {
                            localCapIndex = +backref - 1;
                            // Rewrite the backreference
                            return data[subName].names[localCapIndex] ?
                            // Need to preserve the backreference name in case using flag `n`
                            '\\k<' + data[subName].names[localCapIndex] + '>' : '\\' + (+backref + numPriorCaps);
                        }
                        return match;
                    });
                    return '' + intro + rewrittenSubpattern + ')';
                }
                // Capturing group
                if ($3) {
                    capName = outerCapNames[numOuterCaps];
                    outerCapsMap[++numOuterCaps] = ++numCaps;
                    // If the current capture has a name, preserve the name
                    if (capName) {
                        return '(?<' + capName + '>';
                    }
                    // Backreference
                } else if ($4) {
                    localCapIndex = +$4 - 1;
                    // Rewrite the backreference
                    return outerCapNames[localCapIndex] ?
                    // Need to preserve the backreference name in case using flag `n`
                    '\\k<' + outerCapNames[localCapIndex] + '>' : '\\' + outerCapsMap[+$4];
                }
                return $0;
            });

            return XRegExp(output, flags);
        };
    };

    module.exports = exports['default'];
    });

    unwrapExports(build);

    var matchrecursive = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    /*!
     * XRegExp.matchRecursive 4.0.0
     * <xregexp.com>
     * Steven Levithan (c) 2009-2017 MIT License
     */

    exports.default = function (XRegExp) {

        /**
         * Returns a match detail object composed of the provided values.
         *
         * @private
         */
        function row(name, value, start, end) {
            return {
                name: name,
                value: value,
                start: start,
                end: end
            };
        }

        /**
         * Returns an array of match strings between outermost left and right delimiters, or an array of
         * objects with detailed match parts and position data. An error is thrown if delimiters are
         * unbalanced within the data.
         *
         * @memberOf XRegExp
         * @param {String} str String to search.
         * @param {String} left Left delimiter as an XRegExp pattern.
         * @param {String} right Right delimiter as an XRegExp pattern.
         * @param {String} [flags] Any native or XRegExp flags, used for the left and right delimiters.
         * @param {Object} [options] Lets you specify `valueNames` and `escapeChar` options.
         * @returns {Array} Array of matches, or an empty array.
         * @example
         *
         * // Basic usage
         * let str = '(t((e))s)t()(ing)';
         * XRegExp.matchRecursive(str, '\\(', '\\)', 'g');
         * // -> ['t((e))s', '', 'ing']
         *
         * // Extended information mode with valueNames
         * str = 'Here is <div> <div>an</div></div> example';
         * XRegExp.matchRecursive(str, '<div\\s*>', '</div>', 'gi', {
         *   valueNames: ['between', 'left', 'match', 'right']
         * });
         * // -> [
         * // {name: 'between', value: 'Here is ',       start: 0,  end: 8},
         * // {name: 'left',    value: '<div>',          start: 8,  end: 13},
         * // {name: 'match',   value: ' <div>an</div>', start: 13, end: 27},
         * // {name: 'right',   value: '</div>',         start: 27, end: 33},
         * // {name: 'between', value: ' example',       start: 33, end: 41}
         * // ]
         *
         * // Omitting unneeded parts with null valueNames, and using escapeChar
         * str = '...{1}.\\{{function(x,y){return {y:x}}}';
         * XRegExp.matchRecursive(str, '{', '}', 'g', {
         *   valueNames: ['literal', null, 'value', null],
         *   escapeChar: '\\'
         * });
         * // -> [
         * // {name: 'literal', value: '...',  start: 0, end: 3},
         * // {name: 'value',   value: '1',    start: 4, end: 5},
         * // {name: 'literal', value: '.\\{', start: 6, end: 9},
         * // {name: 'value',   value: 'function(x,y){return {y:x}}', start: 10, end: 37}
         * // ]
         *
         * // Sticky mode via flag y
         * str = '<1><<<2>>><3>4<5>';
         * XRegExp.matchRecursive(str, '<', '>', 'gy');
         * // -> ['1', '<<2>>', '3']
         */
        XRegExp.matchRecursive = function (str, left, right, flags, options) {
            flags = flags || '';
            options = options || {};
            var global = flags.indexOf('g') !== -1;
            var sticky = flags.indexOf('y') !== -1;
            // Flag `y` is controlled internally
            var basicFlags = flags.replace(/y/g, '');
            var escapeChar = options.escapeChar;
            var vN = options.valueNames;
            var output = [];
            var openTokens = 0;
            var delimStart = 0;
            var delimEnd = 0;
            var lastOuterEnd = 0;
            var outerStart = void 0;
            var innerStart = void 0;
            var leftMatch = void 0;
            var rightMatch = void 0;
            var esc = void 0;
            left = XRegExp(left, basicFlags);
            right = XRegExp(right, basicFlags);

            if (escapeChar) {
                if (escapeChar.length > 1) {
                    throw new Error('Cannot use more than one escape character');
                }
                escapeChar = XRegExp.escape(escapeChar);
                // Example of concatenated `esc` regex:
                // `escapeChar`: '%'
                // `left`: '<'
                // `right`: '>'
                // Regex is: /(?:%[\S\s]|(?:(?!<|>)[^%])+)+/
                esc = new RegExp('(?:' + escapeChar + '[\\S\\s]|(?:(?!' +
                // Using `XRegExp.union` safely rewrites backreferences in `left` and `right`.
                // Intentionally not passing `basicFlags` to `XRegExp.union` since any syntax
                // transformation resulting from those flags was already applied to `left` and
                // `right` when they were passed through the XRegExp constructor above.
                XRegExp.union([left, right], '', { conjunction: 'or' }).source + ')[^' + escapeChar + '])+)+',
                // Flags `gy` not needed here
                flags.replace(/[^imu]+/g, ''));
            }

            while (true) {
                // If using an escape character, advance to the delimiter's next starting position,
                // skipping any escaped characters in between
                if (escapeChar) {
                    delimEnd += (XRegExp.exec(str, esc, delimEnd, 'sticky') || [''])[0].length;
                }
                leftMatch = XRegExp.exec(str, left, delimEnd);
                rightMatch = XRegExp.exec(str, right, delimEnd);
                // Keep the leftmost match only
                if (leftMatch && rightMatch) {
                    if (leftMatch.index <= rightMatch.index) {
                        rightMatch = null;
                    } else {
                        leftMatch = null;
                    }
                }
                // Paths (LM: leftMatch, RM: rightMatch, OT: openTokens):
                // LM | RM | OT | Result
                // 1  | 0  | 1  | loop
                // 1  | 0  | 0  | loop
                // 0  | 1  | 1  | loop
                // 0  | 1  | 0  | throw
                // 0  | 0  | 1  | throw
                // 0  | 0  | 0  | break
                // The paths above don't include the sticky mode special case. The loop ends after the
                // first completed match if not `global`.
                if (leftMatch || rightMatch) {
                    delimStart = (leftMatch || rightMatch).index;
                    delimEnd = delimStart + (leftMatch || rightMatch)[0].length;
                } else if (!openTokens) {
                    break;
                }
                if (sticky && !openTokens && delimStart > lastOuterEnd) {
                    break;
                }
                if (leftMatch) {
                    if (!openTokens) {
                        outerStart = delimStart;
                        innerStart = delimEnd;
                    }
                    ++openTokens;
                } else if (rightMatch && openTokens) {
                    if (! --openTokens) {
                        if (vN) {
                            if (vN[0] && outerStart > lastOuterEnd) {
                                output.push(row(vN[0], str.slice(lastOuterEnd, outerStart), lastOuterEnd, outerStart));
                            }
                            if (vN[1]) {
                                output.push(row(vN[1], str.slice(outerStart, innerStart), outerStart, innerStart));
                            }
                            if (vN[2]) {
                                output.push(row(vN[2], str.slice(innerStart, delimStart), innerStart, delimStart));
                            }
                            if (vN[3]) {
                                output.push(row(vN[3], str.slice(delimStart, delimEnd), delimStart, delimEnd));
                            }
                        } else {
                            output.push(str.slice(innerStart, delimStart));
                        }
                        lastOuterEnd = delimEnd;
                        if (!global) {
                            break;
                        }
                    }
                } else {
                    throw new Error('Unbalanced delimiter found in string');
                }
                // If the delimiter matched an empty string, avoid an infinite loop
                if (delimStart === delimEnd) {
                    ++delimEnd;
                }
            }

            if (global && !sticky && vN && vN[0] && str.length > lastOuterEnd) {
                output.push(row(vN[0], str.slice(lastOuterEnd), lastOuterEnd, str.length));
            }

            return output;
        };
    };

    module.exports = exports['default'];
    });

    unwrapExports(matchrecursive);

    var unicodeBase = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    /*!
     * XRegExp Unicode Base 4.0.0
     * <xregexp.com>
     * Steven Levithan (c) 2008-2017 MIT License
     */

    exports.default = function (XRegExp) {

        /**
         * Adds base support for Unicode matching:
         * - Adds syntax `\p{..}` for matching Unicode tokens. Tokens can be inverted using `\P{..}` or
         *   `\p{^..}`. Token names ignore case, spaces, hyphens, and underscores. You can omit the
         *   braces for token names that are a single letter (e.g. `\pL` or `PL`).
         * - Adds flag A (astral), which enables 21-bit Unicode support.
         * - Adds the `XRegExp.addUnicodeData` method used by other addons to provide character data.
         *
         * Unicode Base relies on externally provided Unicode character data. Official addons are
         * available to provide data for Unicode categories, scripts, blocks, and properties.
         *
         * @requires XRegExp
         */

        // ==--------------------------==
        // Private stuff
        // ==--------------------------==

        // Storage for Unicode data
        var unicode = {};

        // Reuse utils
        var dec = XRegExp._dec;
        var hex = XRegExp._hex;
        var pad4 = XRegExp._pad4;

        // Generates a token lookup name: lowercase, with hyphens, spaces, and underscores removed
        function normalize(name) {
            return name.replace(/[- _]+/g, '').toLowerCase();
        }

        // Gets the decimal code of a literal code unit, \xHH, \uHHHH, or a backslash-escaped literal
        function charCode(chr) {
            var esc = /^\\[xu](.+)/.exec(chr);
            return esc ? dec(esc[1]) : chr.charCodeAt(chr[0] === '\\' ? 1 : 0);
        }

        // Inverts a list of ordered BMP characters and ranges
        function invertBmp(range) {
            var output = '';
            var lastEnd = -1;

            XRegExp.forEach(range, /(\\x..|\\u....|\\?[\s\S])(?:-(\\x..|\\u....|\\?[\s\S]))?/, function (m) {
                var start = charCode(m[1]);
                if (start > lastEnd + 1) {
                    output += '\\u' + pad4(hex(lastEnd + 1));
                    if (start > lastEnd + 2) {
                        output += '-\\u' + pad4(hex(start - 1));
                    }
                }
                lastEnd = charCode(m[2] || m[1]);
            });

            if (lastEnd < 0xFFFF) {
                output += '\\u' + pad4(hex(lastEnd + 1));
                if (lastEnd < 0xFFFE) {
                    output += '-\\uFFFF';
                }
            }

            return output;
        }

        // Generates an inverted BMP range on first use
        function cacheInvertedBmp(slug) {
            var prop = 'b!';
            return unicode[slug][prop] || (unicode[slug][prop] = invertBmp(unicode[slug].bmp));
        }

        // Combines and optionally negates BMP and astral data
        function buildAstral(slug, isNegated) {
            var item = unicode[slug];
            var combined = '';

            if (item.bmp && !item.isBmpLast) {
                combined = '[' + item.bmp + ']' + (item.astral ? '|' : '');
            }
            if (item.astral) {
                combined += item.astral;
            }
            if (item.isBmpLast && item.bmp) {
                combined += (item.astral ? '|' : '') + '[' + item.bmp + ']';
            }

            // Astral Unicode tokens always match a code point, never a code unit
            return isNegated ? '(?:(?!' + combined + ')(?:[\uD800-\uDBFF][\uDC00-\uDFFF]|[\0-\uFFFF]))' : '(?:' + combined + ')';
        }

        // Builds a complete astral pattern on first use
        function cacheAstral(slug, isNegated) {
            var prop = isNegated ? 'a!' : 'a=';
            return unicode[slug][prop] || (unicode[slug][prop] = buildAstral(slug, isNegated));
        }

        // ==--------------------------==
        // Core functionality
        // ==--------------------------==

        /*
         * Add astral mode (flag A) and Unicode token syntax: `\p{..}`, `\P{..}`, `\p{^..}`, `\pC`.
         */
        XRegExp.addToken(
        // Use `*` instead of `+` to avoid capturing `^` as the token name in `\p{^}`
        /\\([pP])(?:{(\^?)([^}]*)}|([A-Za-z]))/, function (match, scope, flags) {
            var ERR_DOUBLE_NEG = 'Invalid double negation ';
            var ERR_UNKNOWN_NAME = 'Unknown Unicode token ';
            var ERR_UNKNOWN_REF = 'Unicode token missing data ';
            var ERR_ASTRAL_ONLY = 'Astral mode required for Unicode token ';
            var ERR_ASTRAL_IN_CLASS = 'Astral mode does not support Unicode tokens within character classes';
            // Negated via \P{..} or \p{^..}
            var isNegated = match[1] === 'P' || !!match[2];
            // Switch from BMP (0-FFFF) to astral (0-10FFFF) mode via flag A
            var isAstralMode = flags.indexOf('A') !== -1;
            // Token lookup name. Check `[4]` first to avoid passing `undefined` via `\p{}`
            var slug = normalize(match[4] || match[3]);
            // Token data object
            var item = unicode[slug];

            if (match[1] === 'P' && match[2]) {
                throw new SyntaxError(ERR_DOUBLE_NEG + match[0]);
            }
            if (!unicode.hasOwnProperty(slug)) {
                throw new SyntaxError(ERR_UNKNOWN_NAME + match[0]);
            }

            // Switch to the negated form of the referenced Unicode token
            if (item.inverseOf) {
                slug = normalize(item.inverseOf);
                if (!unicode.hasOwnProperty(slug)) {
                    throw new ReferenceError(ERR_UNKNOWN_REF + match[0] + ' -> ' + item.inverseOf);
                }
                item = unicode[slug];
                isNegated = !isNegated;
            }

            if (!(item.bmp || isAstralMode)) {
                throw new SyntaxError(ERR_ASTRAL_ONLY + match[0]);
            }
            if (isAstralMode) {
                if (scope === 'class') {
                    throw new SyntaxError(ERR_ASTRAL_IN_CLASS);
                }

                return cacheAstral(slug, isNegated);
            }

            return scope === 'class' ? isNegated ? cacheInvertedBmp(slug) : item.bmp : (isNegated ? '[^' : '[') + item.bmp + ']';
        }, {
            scope: 'all',
            optionalFlags: 'A',
            leadChar: '\\'
        });

        /**
         * Adds to the list of Unicode tokens that XRegExp regexes can match via `\p` or `\P`.
         *
         * @memberOf XRegExp
         * @param {Array} data Objects with named character ranges. Each object may have properties
         *   `name`, `alias`, `isBmpLast`, `inverseOf`, `bmp`, and `astral`. All but `name` are
         *   optional, although one of `bmp` or `astral` is required (unless `inverseOf` is set). If
         *   `astral` is absent, the `bmp` data is used for BMP and astral modes. If `bmp` is absent,
         *   the name errors in BMP mode but works in astral mode. If both `bmp` and `astral` are
         *   provided, the `bmp` data only is used in BMP mode, and the combination of `bmp` and
         *   `astral` data is used in astral mode. `isBmpLast` is needed when a token matches orphan
         *   high surrogates *and* uses surrogate pairs to match astral code points. The `bmp` and
         *   `astral` data should be a combination of literal characters and `\xHH` or `\uHHHH` escape
         *   sequences, with hyphens to create ranges. Any regex metacharacters in the data should be
         *   escaped, apart from range-creating hyphens. The `astral` data can additionally use
         *   character classes and alternation, and should use surrogate pairs to represent astral code
         *   points. `inverseOf` can be used to avoid duplicating character data if a Unicode token is
         *   defined as the exact inverse of another token.
         * @example
         *
         * // Basic use
         * XRegExp.addUnicodeData([{
         *   name: 'XDigit',
         *   alias: 'Hexadecimal',
         *   bmp: '0-9A-Fa-f'
         * }]);
         * XRegExp('\\p{XDigit}:\\p{Hexadecimal}+').test('0:3D'); // -> true
         */
        XRegExp.addUnicodeData = function (data) {
            var ERR_NO_NAME = 'Unicode token requires name';
            var ERR_NO_DATA = 'Unicode token has no character data ';
            var item = void 0;

            for (var i = 0; i < data.length; ++i) {
                item = data[i];
                if (!item.name) {
                    throw new Error(ERR_NO_NAME);
                }
                if (!(item.inverseOf || item.bmp || item.astral)) {
                    throw new Error(ERR_NO_DATA + item.name);
                }
                unicode[normalize(item.name)] = item;
                if (item.alias) {
                    unicode[normalize(item.alias)] = item;
                }
            }

            // Reset the pattern cache used by the `XRegExp` constructor, since the same pattern and
            // flags might now produce different results
            XRegExp.cache.flush('patterns');
        };

        /**
         * @ignore
         *
         * Return a reference to the internal Unicode definition structure for the given Unicode
         * Property if the given name is a legal Unicode Property for use in XRegExp `\p` or `\P` regex
         * constructs.
         *
         * @memberOf XRegExp
         * @param {String} name Name by which the Unicode Property may be recognized (case-insensitive),
         *   e.g. `'N'` or `'Number'`. The given name is matched against all registered Unicode
         *   Properties and Property Aliases.
         * @returns {Object} Reference to definition structure when the name matches a Unicode Property.
         *
         * @note
         * For more info on Unicode Properties, see also http://unicode.org/reports/tr18/#Categories.
         *
         * @note
         * This method is *not* part of the officially documented API and may change or be removed in
         * the future. It is meant for userland code that wishes to reuse the (large) internal Unicode
         * structures set up by XRegExp.
         */
        XRegExp._getUnicodeProperty = function (name) {
            var slug = normalize(name);
            return unicode[slug];
        };
    };

    module.exports = exports['default'];
    });

    unwrapExports(unicodeBase);

    var unicodeBlocks = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    /*!
     * XRegExp Unicode Blocks 4.0.0
     * <xregexp.com>
     * Steven Levithan (c) 2010-2017 MIT License
     * Unicode data by Mathias Bynens <mathiasbynens.be>
     */

    exports.default = function (XRegExp) {

        /**
         * Adds support for all Unicode blocks. Block names use the prefix 'In'. E.g.,
         * `\p{InBasicLatin}`. Token names are case insensitive, and any spaces, hyphens, and
         * underscores are ignored.
         *
         * Uses Unicode 9.0.0.
         *
         * @requires XRegExp, Unicode Base
         */

        if (!XRegExp.addUnicodeData) {
            throw new ReferenceError('Unicode Base must be loaded before Unicode Blocks');
        }

        XRegExp.addUnicodeData([{
            name: 'InAdlam',
            astral: '\uD83A[\uDD00-\uDD5F]'
        }, {
            name: 'InAegean_Numbers',
            astral: '\uD800[\uDD00-\uDD3F]'
        }, {
            name: 'InAhom',
            astral: '\uD805[\uDF00-\uDF3F]'
        }, {
            name: 'InAlchemical_Symbols',
            astral: '\uD83D[\uDF00-\uDF7F]'
        }, {
            name: 'InAlphabetic_Presentation_Forms',
            bmp: '\uFB00-\uFB4F'
        }, {
            name: 'InAnatolian_Hieroglyphs',
            astral: '\uD811[\uDC00-\uDE7F]'
        }, {
            name: 'InAncient_Greek_Musical_Notation',
            astral: '\uD834[\uDE00-\uDE4F]'
        }, {
            name: 'InAncient_Greek_Numbers',
            astral: '\uD800[\uDD40-\uDD8F]'
        }, {
            name: 'InAncient_Symbols',
            astral: '\uD800[\uDD90-\uDDCF]'
        }, {
            name: 'InArabic',
            bmp: '\u0600-\u06FF'
        }, {
            name: 'InArabic_Extended_A',
            bmp: '\u08A0-\u08FF'
        }, {
            name: 'InArabic_Mathematical_Alphabetic_Symbols',
            astral: '\uD83B[\uDE00-\uDEFF]'
        }, {
            name: 'InArabic_Presentation_Forms_A',
            bmp: '\uFB50-\uFDFF'
        }, {
            name: 'InArabic_Presentation_Forms_B',
            bmp: '\uFE70-\uFEFF'
        }, {
            name: 'InArabic_Supplement',
            bmp: '\u0750-\u077F'
        }, {
            name: 'InArmenian',
            bmp: '\u0530-\u058F'
        }, {
            name: 'InArrows',
            bmp: '\u2190-\u21FF'
        }, {
            name: 'InAvestan',
            astral: '\uD802[\uDF00-\uDF3F]'
        }, {
            name: 'InBalinese',
            bmp: '\u1B00-\u1B7F'
        }, {
            name: 'InBamum',
            bmp: '\uA6A0-\uA6FF'
        }, {
            name: 'InBamum_Supplement',
            astral: '\uD81A[\uDC00-\uDE3F]'
        }, {
            name: 'InBasic_Latin',
            bmp: '\0-\x7F'
        }, {
            name: 'InBassa_Vah',
            astral: '\uD81A[\uDED0-\uDEFF]'
        }, {
            name: 'InBatak',
            bmp: '\u1BC0-\u1BFF'
        }, {
            name: 'InBengali',
            bmp: '\u0980-\u09FF'
        }, {
            name: 'InBhaiksuki',
            astral: '\uD807[\uDC00-\uDC6F]'
        }, {
            name: 'InBlock_Elements',
            bmp: '\u2580-\u259F'
        }, {
            name: 'InBopomofo',
            bmp: '\u3100-\u312F'
        }, {
            name: 'InBopomofo_Extended',
            bmp: '\u31A0-\u31BF'
        }, {
            name: 'InBox_Drawing',
            bmp: '\u2500-\u257F'
        }, {
            name: 'InBrahmi',
            astral: '\uD804[\uDC00-\uDC7F]'
        }, {
            name: 'InBraille_Patterns',
            bmp: '\u2800-\u28FF'
        }, {
            name: 'InBuginese',
            bmp: '\u1A00-\u1A1F'
        }, {
            name: 'InBuhid',
            bmp: '\u1740-\u175F'
        }, {
            name: 'InByzantine_Musical_Symbols',
            astral: '\uD834[\uDC00-\uDCFF]'
        }, {
            name: 'InCJK_Compatibility',
            bmp: '\u3300-\u33FF'
        }, {
            name: 'InCJK_Compatibility_Forms',
            bmp: '\uFE30-\uFE4F'
        }, {
            name: 'InCJK_Compatibility_Ideographs',
            bmp: '\uF900-\uFAFF'
        }, {
            name: 'InCJK_Compatibility_Ideographs_Supplement',
            astral: '\uD87E[\uDC00-\uDE1F]'
        }, {
            name: 'InCJK_Radicals_Supplement',
            bmp: '\u2E80-\u2EFF'
        }, {
            name: 'InCJK_Strokes',
            bmp: '\u31C0-\u31EF'
        }, {
            name: 'InCJK_Symbols_and_Punctuation',
            bmp: '\u3000-\u303F'
        }, {
            name: 'InCJK_Unified_Ideographs',
            bmp: '\u4E00-\u9FFF'
        }, {
            name: 'InCJK_Unified_Ideographs_Extension_A',
            bmp: '\u3400-\u4DBF'
        }, {
            name: 'InCJK_Unified_Ideographs_Extension_B',
            astral: '[\uD840-\uD868][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF]'
        }, {
            name: 'InCJK_Unified_Ideographs_Extension_C',
            astral: '\uD869[\uDF00-\uDFFF]|[\uD86A-\uD86C][\uDC00-\uDFFF]|\uD86D[\uDC00-\uDF3F]'
        }, {
            name: 'InCJK_Unified_Ideographs_Extension_D',
            astral: '\uD86D[\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1F]'
        }, {
            name: 'InCJK_Unified_Ideographs_Extension_E',
            astral: '\uD86E[\uDC20-\uDFFF]|[\uD86F-\uD872][\uDC00-\uDFFF]|\uD873[\uDC00-\uDEAF]'
        }, {
            name: 'InCarian',
            astral: '\uD800[\uDEA0-\uDEDF]'
        }, {
            name: 'InCaucasian_Albanian',
            astral: '\uD801[\uDD30-\uDD6F]'
        }, {
            name: 'InChakma',
            astral: '\uD804[\uDD00-\uDD4F]'
        }, {
            name: 'InCham',
            bmp: '\uAA00-\uAA5F'
        }, {
            name: 'InCherokee',
            bmp: '\u13A0-\u13FF'
        }, {
            name: 'InCherokee_Supplement',
            bmp: '\uAB70-\uABBF'
        }, {
            name: 'InCombining_Diacritical_Marks',
            bmp: '\u0300-\u036F'
        }, {
            name: 'InCombining_Diacritical_Marks_Extended',
            bmp: '\u1AB0-\u1AFF'
        }, {
            name: 'InCombining_Diacritical_Marks_Supplement',
            bmp: '\u1DC0-\u1DFF'
        }, {
            name: 'InCombining_Diacritical_Marks_for_Symbols',
            bmp: '\u20D0-\u20FF'
        }, {
            name: 'InCombining_Half_Marks',
            bmp: '\uFE20-\uFE2F'
        }, {
            name: 'InCommon_Indic_Number_Forms',
            bmp: '\uA830-\uA83F'
        }, {
            name: 'InControl_Pictures',
            bmp: '\u2400-\u243F'
        }, {
            name: 'InCoptic',
            bmp: '\u2C80-\u2CFF'
        }, {
            name: 'InCoptic_Epact_Numbers',
            astral: '\uD800[\uDEE0-\uDEFF]'
        }, {
            name: 'InCounting_Rod_Numerals',
            astral: '\uD834[\uDF60-\uDF7F]'
        }, {
            name: 'InCuneiform',
            astral: '\uD808[\uDC00-\uDFFF]'
        }, {
            name: 'InCuneiform_Numbers_and_Punctuation',
            astral: '\uD809[\uDC00-\uDC7F]'
        }, {
            name: 'InCurrency_Symbols',
            bmp: '\u20A0-\u20CF'
        }, {
            name: 'InCypriot_Syllabary',
            astral: '\uD802[\uDC00-\uDC3F]'
        }, {
            name: 'InCyrillic',
            bmp: '\u0400-\u04FF'
        }, {
            name: 'InCyrillic_Extended_A',
            bmp: '\u2DE0-\u2DFF'
        }, {
            name: 'InCyrillic_Extended_B',
            bmp: '\uA640-\uA69F'
        }, {
            name: 'InCyrillic_Extended_C',
            bmp: '\u1C80-\u1C8F'
        }, {
            name: 'InCyrillic_Supplement',
            bmp: '\u0500-\u052F'
        }, {
            name: 'InDeseret',
            astral: '\uD801[\uDC00-\uDC4F]'
        }, {
            name: 'InDevanagari',
            bmp: '\u0900-\u097F'
        }, {
            name: 'InDevanagari_Extended',
            bmp: '\uA8E0-\uA8FF'
        }, {
            name: 'InDingbats',
            bmp: '\u2700-\u27BF'
        }, {
            name: 'InDomino_Tiles',
            astral: '\uD83C[\uDC30-\uDC9F]'
        }, {
            name: 'InDuployan',
            astral: '\uD82F[\uDC00-\uDC9F]'
        }, {
            name: 'InEarly_Dynastic_Cuneiform',
            astral: '\uD809[\uDC80-\uDD4F]'
        }, {
            name: 'InEgyptian_Hieroglyphs',
            astral: '\uD80C[\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F]'
        }, {
            name: 'InElbasan',
            astral: '\uD801[\uDD00-\uDD2F]'
        }, {
            name: 'InEmoticons',
            astral: '\uD83D[\uDE00-\uDE4F]'
        }, {
            name: 'InEnclosed_Alphanumeric_Supplement',
            astral: '\uD83C[\uDD00-\uDDFF]'
        }, {
            name: 'InEnclosed_Alphanumerics',
            bmp: '\u2460-\u24FF'
        }, {
            name: 'InEnclosed_CJK_Letters_and_Months',
            bmp: '\u3200-\u32FF'
        }, {
            name: 'InEnclosed_Ideographic_Supplement',
            astral: '\uD83C[\uDE00-\uDEFF]'
        }, {
            name: 'InEthiopic',
            bmp: '\u1200-\u137F'
        }, {
            name: 'InEthiopic_Extended',
            bmp: '\u2D80-\u2DDF'
        }, {
            name: 'InEthiopic_Extended_A',
            bmp: '\uAB00-\uAB2F'
        }, {
            name: 'InEthiopic_Supplement',
            bmp: '\u1380-\u139F'
        }, {
            name: 'InGeneral_Punctuation',
            bmp: '\u2000-\u206F'
        }, {
            name: 'InGeometric_Shapes',
            bmp: '\u25A0-\u25FF'
        }, {
            name: 'InGeometric_Shapes_Extended',
            astral: '\uD83D[\uDF80-\uDFFF]'
        }, {
            name: 'InGeorgian',
            bmp: '\u10A0-\u10FF'
        }, {
            name: 'InGeorgian_Supplement',
            bmp: '\u2D00-\u2D2F'
        }, {
            name: 'InGlagolitic',
            bmp: '\u2C00-\u2C5F'
        }, {
            name: 'InGlagolitic_Supplement',
            astral: '\uD838[\uDC00-\uDC2F]'
        }, {
            name: 'InGothic',
            astral: '\uD800[\uDF30-\uDF4F]'
        }, {
            name: 'InGrantha',
            astral: '\uD804[\uDF00-\uDF7F]'
        }, {
            name: 'InGreek_Extended',
            bmp: '\u1F00-\u1FFF'
        }, {
            name: 'InGreek_and_Coptic',
            bmp: '\u0370-\u03FF'
        }, {
            name: 'InGujarati',
            bmp: '\u0A80-\u0AFF'
        }, {
            name: 'InGurmukhi',
            bmp: '\u0A00-\u0A7F'
        }, {
            name: 'InHalfwidth_and_Fullwidth_Forms',
            bmp: '\uFF00-\uFFEF'
        }, {
            name: 'InHangul_Compatibility_Jamo',
            bmp: '\u3130-\u318F'
        }, {
            name: 'InHangul_Jamo',
            bmp: '\u1100-\u11FF'
        }, {
            name: 'InHangul_Jamo_Extended_A',
            bmp: '\uA960-\uA97F'
        }, {
            name: 'InHangul_Jamo_Extended_B',
            bmp: '\uD7B0-\uD7FF'
        }, {
            name: 'InHangul_Syllables',
            bmp: '\uAC00-\uD7AF'
        }, {
            name: 'InHanunoo',
            bmp: '\u1720-\u173F'
        }, {
            name: 'InHatran',
            astral: '\uD802[\uDCE0-\uDCFF]'
        }, {
            name: 'InHebrew',
            bmp: '\u0590-\u05FF'
        }, {
            name: 'InHigh_Private_Use_Surrogates',
            bmp: '\uDB80-\uDBFF'
        }, {
            name: 'InHigh_Surrogates',
            bmp: '\uD800-\uDB7F'
        }, {
            name: 'InHiragana',
            bmp: '\u3040-\u309F'
        }, {
            name: 'InIPA_Extensions',
            bmp: '\u0250-\u02AF'
        }, {
            name: 'InIdeographic_Description_Characters',
            bmp: '\u2FF0-\u2FFF'
        }, {
            name: 'InIdeographic_Symbols_and_Punctuation',
            astral: '\uD81B[\uDFE0-\uDFFF]'
        }, {
            name: 'InImperial_Aramaic',
            astral: '\uD802[\uDC40-\uDC5F]'
        }, {
            name: 'InInscriptional_Pahlavi',
            astral: '\uD802[\uDF60-\uDF7F]'
        }, {
            name: 'InInscriptional_Parthian',
            astral: '\uD802[\uDF40-\uDF5F]'
        }, {
            name: 'InJavanese',
            bmp: '\uA980-\uA9DF'
        }, {
            name: 'InKaithi',
            astral: '\uD804[\uDC80-\uDCCF]'
        }, {
            name: 'InKana_Supplement',
            astral: '\uD82C[\uDC00-\uDCFF]'
        }, {
            name: 'InKanbun',
            bmp: '\u3190-\u319F'
        }, {
            name: 'InKangxi_Radicals',
            bmp: '\u2F00-\u2FDF'
        }, {
            name: 'InKannada',
            bmp: '\u0C80-\u0CFF'
        }, {
            name: 'InKatakana',
            bmp: '\u30A0-\u30FF'
        }, {
            name: 'InKatakana_Phonetic_Extensions',
            bmp: '\u31F0-\u31FF'
        }, {
            name: 'InKayah_Li',
            bmp: '\uA900-\uA92F'
        }, {
            name: 'InKharoshthi',
            astral: '\uD802[\uDE00-\uDE5F]'
        }, {
            name: 'InKhmer',
            bmp: '\u1780-\u17FF'
        }, {
            name: 'InKhmer_Symbols',
            bmp: '\u19E0-\u19FF'
        }, {
            name: 'InKhojki',
            astral: '\uD804[\uDE00-\uDE4F]'
        }, {
            name: 'InKhudawadi',
            astral: '\uD804[\uDEB0-\uDEFF]'
        }, {
            name: 'InLao',
            bmp: '\u0E80-\u0EFF'
        }, {
            name: 'InLatin_Extended_Additional',
            bmp: '\u1E00-\u1EFF'
        }, {
            name: 'InLatin_Extended_A',
            bmp: '\u0100-\u017F'
        }, {
            name: 'InLatin_Extended_B',
            bmp: '\u0180-\u024F'
        }, {
            name: 'InLatin_Extended_C',
            bmp: '\u2C60-\u2C7F'
        }, {
            name: 'InLatin_Extended_D',
            bmp: '\uA720-\uA7FF'
        }, {
            name: 'InLatin_Extended_E',
            bmp: '\uAB30-\uAB6F'
        }, {
            name: 'InLatin_1_Supplement',
            bmp: '\x80-\xFF'
        }, {
            name: 'InLepcha',
            bmp: '\u1C00-\u1C4F'
        }, {
            name: 'InLetterlike_Symbols',
            bmp: '\u2100-\u214F'
        }, {
            name: 'InLimbu',
            bmp: '\u1900-\u194F'
        }, {
            name: 'InLinear_A',
            astral: '\uD801[\uDE00-\uDF7F]'
        }, {
            name: 'InLinear_B_Ideograms',
            astral: '\uD800[\uDC80-\uDCFF]'
        }, {
            name: 'InLinear_B_Syllabary',
            astral: '\uD800[\uDC00-\uDC7F]'
        }, {
            name: 'InLisu',
            bmp: '\uA4D0-\uA4FF'
        }, {
            name: 'InLow_Surrogates',
            bmp: '\uDC00-\uDFFF'
        }, {
            name: 'InLycian',
            astral: '\uD800[\uDE80-\uDE9F]'
        }, {
            name: 'InLydian',
            astral: '\uD802[\uDD20-\uDD3F]'
        }, {
            name: 'InMahajani',
            astral: '\uD804[\uDD50-\uDD7F]'
        }, {
            name: 'InMahjong_Tiles',
            astral: '\uD83C[\uDC00-\uDC2F]'
        }, {
            name: 'InMalayalam',
            bmp: '\u0D00-\u0D7F'
        }, {
            name: 'InMandaic',
            bmp: '\u0840-\u085F'
        }, {
            name: 'InManichaean',
            astral: '\uD802[\uDEC0-\uDEFF]'
        }, {
            name: 'InMarchen',
            astral: '\uD807[\uDC70-\uDCBF]'
        }, {
            name: 'InMathematical_Alphanumeric_Symbols',
            astral: '\uD835[\uDC00-\uDFFF]'
        }, {
            name: 'InMathematical_Operators',
            bmp: '\u2200-\u22FF'
        }, {
            name: 'InMeetei_Mayek',
            bmp: '\uABC0-\uABFF'
        }, {
            name: 'InMeetei_Mayek_Extensions',
            bmp: '\uAAE0-\uAAFF'
        }, {
            name: 'InMende_Kikakui',
            astral: '\uD83A[\uDC00-\uDCDF]'
        }, {
            name: 'InMeroitic_Cursive',
            astral: '\uD802[\uDDA0-\uDDFF]'
        }, {
            name: 'InMeroitic_Hieroglyphs',
            astral: '\uD802[\uDD80-\uDD9F]'
        }, {
            name: 'InMiao',
            astral: '\uD81B[\uDF00-\uDF9F]'
        }, {
            name: 'InMiscellaneous_Mathematical_Symbols_A',
            bmp: '\u27C0-\u27EF'
        }, {
            name: 'InMiscellaneous_Mathematical_Symbols_B',
            bmp: '\u2980-\u29FF'
        }, {
            name: 'InMiscellaneous_Symbols',
            bmp: '\u2600-\u26FF'
        }, {
            name: 'InMiscellaneous_Symbols_and_Arrows',
            bmp: '\u2B00-\u2BFF'
        }, {
            name: 'InMiscellaneous_Symbols_and_Pictographs',
            astral: '\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]'
        }, {
            name: 'InMiscellaneous_Technical',
            bmp: '\u2300-\u23FF'
        }, {
            name: 'InModi',
            astral: '\uD805[\uDE00-\uDE5F]'
        }, {
            name: 'InModifier_Tone_Letters',
            bmp: '\uA700-\uA71F'
        }, {
            name: 'InMongolian',
            bmp: '\u1800-\u18AF'
        }, {
            name: 'InMongolian_Supplement',
            astral: '\uD805[\uDE60-\uDE7F]'
        }, {
            name: 'InMro',
            astral: '\uD81A[\uDE40-\uDE6F]'
        }, {
            name: 'InMultani',
            astral: '\uD804[\uDE80-\uDEAF]'
        }, {
            name: 'InMusical_Symbols',
            astral: '\uD834[\uDD00-\uDDFF]'
        }, {
            name: 'InMyanmar',
            bmp: '\u1000-\u109F'
        }, {
            name: 'InMyanmar_Extended_A',
            bmp: '\uAA60-\uAA7F'
        }, {
            name: 'InMyanmar_Extended_B',
            bmp: '\uA9E0-\uA9FF'
        }, {
            name: 'InNKo',
            bmp: '\u07C0-\u07FF'
        }, {
            name: 'InNabataean',
            astral: '\uD802[\uDC80-\uDCAF]'
        }, {
            name: 'InNew_Tai_Lue',
            bmp: '\u1980-\u19DF'
        }, {
            name: 'InNewa',
            astral: '\uD805[\uDC00-\uDC7F]'
        }, {
            name: 'InNumber_Forms',
            bmp: '\u2150-\u218F'
        }, {
            name: 'InOgham',
            bmp: '\u1680-\u169F'
        }, {
            name: 'InOl_Chiki',
            bmp: '\u1C50-\u1C7F'
        }, {
            name: 'InOld_Hungarian',
            astral: '\uD803[\uDC80-\uDCFF]'
        }, {
            name: 'InOld_Italic',
            astral: '\uD800[\uDF00-\uDF2F]'
        }, {
            name: 'InOld_North_Arabian',
            astral: '\uD802[\uDE80-\uDE9F]'
        }, {
            name: 'InOld_Permic',
            astral: '\uD800[\uDF50-\uDF7F]'
        }, {
            name: 'InOld_Persian',
            astral: '\uD800[\uDFA0-\uDFDF]'
        }, {
            name: 'InOld_South_Arabian',
            astral: '\uD802[\uDE60-\uDE7F]'
        }, {
            name: 'InOld_Turkic',
            astral: '\uD803[\uDC00-\uDC4F]'
        }, {
            name: 'InOptical_Character_Recognition',
            bmp: '\u2440-\u245F'
        }, {
            name: 'InOriya',
            bmp: '\u0B00-\u0B7F'
        }, {
            name: 'InOrnamental_Dingbats',
            astral: '\uD83D[\uDE50-\uDE7F]'
        }, {
            name: 'InOsage',
            astral: '\uD801[\uDCB0-\uDCFF]'
        }, {
            name: 'InOsmanya',
            astral: '\uD801[\uDC80-\uDCAF]'
        }, {
            name: 'InPahawh_Hmong',
            astral: '\uD81A[\uDF00-\uDF8F]'
        }, {
            name: 'InPalmyrene',
            astral: '\uD802[\uDC60-\uDC7F]'
        }, {
            name: 'InPau_Cin_Hau',
            astral: '\uD806[\uDEC0-\uDEFF]'
        }, {
            name: 'InPhags_pa',
            bmp: '\uA840-\uA87F'
        }, {
            name: 'InPhaistos_Disc',
            astral: '\uD800[\uDDD0-\uDDFF]'
        }, {
            name: 'InPhoenician',
            astral: '\uD802[\uDD00-\uDD1F]'
        }, {
            name: 'InPhonetic_Extensions',
            bmp: '\u1D00-\u1D7F'
        }, {
            name: 'InPhonetic_Extensions_Supplement',
            bmp: '\u1D80-\u1DBF'
        }, {
            name: 'InPlaying_Cards',
            astral: '\uD83C[\uDCA0-\uDCFF]'
        }, {
            name: 'InPrivate_Use_Area',
            bmp: '\uE000-\uF8FF'
        }, {
            name: 'InPsalter_Pahlavi',
            astral: '\uD802[\uDF80-\uDFAF]'
        }, {
            name: 'InRejang',
            bmp: '\uA930-\uA95F'
        }, {
            name: 'InRumi_Numeral_Symbols',
            astral: '\uD803[\uDE60-\uDE7F]'
        }, {
            name: 'InRunic',
            bmp: '\u16A0-\u16FF'
        }, {
            name: 'InSamaritan',
            bmp: '\u0800-\u083F'
        }, {
            name: 'InSaurashtra',
            bmp: '\uA880-\uA8DF'
        }, {
            name: 'InSharada',
            astral: '\uD804[\uDD80-\uDDDF]'
        }, {
            name: 'InShavian',
            astral: '\uD801[\uDC50-\uDC7F]'
        }, {
            name: 'InShorthand_Format_Controls',
            astral: '\uD82F[\uDCA0-\uDCAF]'
        }, {
            name: 'InSiddham',
            astral: '\uD805[\uDD80-\uDDFF]'
        }, {
            name: 'InSinhala',
            bmp: '\u0D80-\u0DFF'
        }, {
            name: 'InSinhala_Archaic_Numbers',
            astral: '\uD804[\uDDE0-\uDDFF]'
        }, {
            name: 'InSmall_Form_Variants',
            bmp: '\uFE50-\uFE6F'
        }, {
            name: 'InSora_Sompeng',
            astral: '\uD804[\uDCD0-\uDCFF]'
        }, {
            name: 'InSpacing_Modifier_Letters',
            bmp: '\u02B0-\u02FF'
        }, {
            name: 'InSpecials',
            bmp: '\uFFF0-\uFFFF'
        }, {
            name: 'InSundanese',
            bmp: '\u1B80-\u1BBF'
        }, {
            name: 'InSundanese_Supplement',
            bmp: '\u1CC0-\u1CCF'
        }, {
            name: 'InSuperscripts_and_Subscripts',
            bmp: '\u2070-\u209F'
        }, {
            name: 'InSupplemental_Arrows_A',
            bmp: '\u27F0-\u27FF'
        }, {
            name: 'InSupplemental_Arrows_B',
            bmp: '\u2900-\u297F'
        }, {
            name: 'InSupplemental_Arrows_C',
            astral: '\uD83E[\uDC00-\uDCFF]'
        }, {
            name: 'InSupplemental_Mathematical_Operators',
            bmp: '\u2A00-\u2AFF'
        }, {
            name: 'InSupplemental_Punctuation',
            bmp: '\u2E00-\u2E7F'
        }, {
            name: 'InSupplemental_Symbols_and_Pictographs',
            astral: '\uD83E[\uDD00-\uDDFF]'
        }, {
            name: 'InSupplementary_Private_Use_Area_A',
            astral: '[\uDB80-\uDBBF][\uDC00-\uDFFF]'
        }, {
            name: 'InSupplementary_Private_Use_Area_B',
            astral: '[\uDBC0-\uDBFF][\uDC00-\uDFFF]'
        }, {
            name: 'InSutton_SignWriting',
            astral: '\uD836[\uDC00-\uDEAF]'
        }, {
            name: 'InSyloti_Nagri',
            bmp: '\uA800-\uA82F'
        }, {
            name: 'InSyriac',
            bmp: '\u0700-\u074F'
        }, {
            name: 'InTagalog',
            bmp: '\u1700-\u171F'
        }, {
            name: 'InTagbanwa',
            bmp: '\u1760-\u177F'
        }, {
            name: 'InTags',
            astral: '\uDB40[\uDC00-\uDC7F]'
        }, {
            name: 'InTai_Le',
            bmp: '\u1950-\u197F'
        }, {
            name: 'InTai_Tham',
            bmp: '\u1A20-\u1AAF'
        }, {
            name: 'InTai_Viet',
            bmp: '\uAA80-\uAADF'
        }, {
            name: 'InTai_Xuan_Jing_Symbols',
            astral: '\uD834[\uDF00-\uDF5F]'
        }, {
            name: 'InTakri',
            astral: '\uD805[\uDE80-\uDECF]'
        }, {
            name: 'InTamil',
            bmp: '\u0B80-\u0BFF'
        }, {
            name: 'InTangut',
            astral: '[\uD81C-\uD821][\uDC00-\uDFFF]'
        }, {
            name: 'InTangut_Components',
            astral: '\uD822[\uDC00-\uDEFF]'
        }, {
            name: 'InTelugu',
            bmp: '\u0C00-\u0C7F'
        }, {
            name: 'InThaana',
            bmp: '\u0780-\u07BF'
        }, {
            name: 'InThai',
            bmp: '\u0E00-\u0E7F'
        }, {
            name: 'InTibetan',
            bmp: '\u0F00-\u0FFF'
        }, {
            name: 'InTifinagh',
            bmp: '\u2D30-\u2D7F'
        }, {
            name: 'InTirhuta',
            astral: '\uD805[\uDC80-\uDCDF]'
        }, {
            name: 'InTransport_and_Map_Symbols',
            astral: '\uD83D[\uDE80-\uDEFF]'
        }, {
            name: 'InUgaritic',
            astral: '\uD800[\uDF80-\uDF9F]'
        }, {
            name: 'InUnified_Canadian_Aboriginal_Syllabics',
            bmp: '\u1400-\u167F'
        }, {
            name: 'InUnified_Canadian_Aboriginal_Syllabics_Extended',
            bmp: '\u18B0-\u18FF'
        }, {
            name: 'InVai',
            bmp: '\uA500-\uA63F'
        }, {
            name: 'InVariation_Selectors',
            bmp: '\uFE00-\uFE0F'
        }, {
            name: 'InVariation_Selectors_Supplement',
            astral: '\uDB40[\uDD00-\uDDEF]'
        }, {
            name: 'InVedic_Extensions',
            bmp: '\u1CD0-\u1CFF'
        }, {
            name: 'InVertical_Forms',
            bmp: '\uFE10-\uFE1F'
        }, {
            name: 'InWarang_Citi',
            astral: '\uD806[\uDCA0-\uDCFF]'
        }, {
            name: 'InYi_Radicals',
            bmp: '\uA490-\uA4CF'
        }, {
            name: 'InYi_Syllables',
            bmp: '\uA000-\uA48F'
        }, {
            name: 'InYijing_Hexagram_Symbols',
            bmp: '\u4DC0-\u4DFF'
        }]);
    };

    module.exports = exports['default'];
    });

    unwrapExports(unicodeBlocks);

    var unicodeCategories = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    /*!
     * XRegExp Unicode Categories 4.0.0
     * <xregexp.com>
     * Steven Levithan (c) 2010-2017 MIT License
     * Unicode data by Mathias Bynens <mathiasbynens.be>
     */

    exports.default = function (XRegExp) {

        /**
         * Adds support for Unicode's general categories. E.g., `\p{Lu}` or `\p{Uppercase Letter}`. See
         * category descriptions in UAX #44 <http://unicode.org/reports/tr44/#GC_Values_Table>. Token
         * names are case insensitive, and any spaces, hyphens, and underscores are ignored.
         *
         * Uses Unicode 9.0.0.
         *
         * @requires XRegExp, Unicode Base
         */

        if (!XRegExp.addUnicodeData) {
            throw new ReferenceError('Unicode Base must be loaded before Unicode Categories');
        }

        XRegExp.addUnicodeData([{
            name: 'C',
            alias: 'Other',
            isBmpLast: true,
            bmp: '\0-\x1F\x7F-\x9F\xAD\u0378\u0379\u0380-\u0383\u038B\u038D\u03A2\u0530\u0557\u0558\u0560\u0588\u058B\u058C\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08B5\u08BE-\u08D3\u08E2\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0AF8\u0AFA-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0BFF\u0C04\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D00\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D50-\u0D53\u0D64\u0D65\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F6\u13F7\u13FE\u13FF\u169D-\u169F\u16F9-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180E\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE\u1AAF\u1ABF-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C89-\u1CBF\u1CC8-\u1CCF\u1CF7\u1CFA-\u1CFF\u1DF6-\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BF-\u20CF\u20F1-\u20FF\u218C-\u218F\u23FF\u2427-\u243F\u244B-\u245F\u2B74\u2B75\u2B96\u2B97\u2BBA-\u2BBC\u2BC9\u2BD2-\u2BEB\u2BF0-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E45-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FD6-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA6F8-\uA6FF\uA7AF\uA7B8-\uA7F6\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C6-\uA8CD\uA8DA-\uA8DF\uA8FE\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB66-\uAB6F\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF',
            astral: '\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDCFF\uDD03-\uDD06\uDD34-\uDD36\uDD8F\uDD9C-\uDD9F\uDDA1-\uDDCF\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEFC-\uDEFF\uDF24-\uDF2F\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDFC4-\uDFC7\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDD6E\uDD70-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56\uDC9F-\uDCA6\uDCB0-\uDCDF\uDCF3\uDCF6-\uDCFA\uDD1C-\uDD1E\uDD3A-\uDD3E\uDD40-\uDD7F\uDDB8-\uDDBB\uDDD0\uDDD1\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE34-\uDE37\uDE3B-\uDE3E\uDE48-\uDE4F\uDE59-\uDE5F\uDEA0-\uDEBF\uDEE7-\uDEEA\uDEF7-\uDEFF\uDF36-\uDF38\uDF56\uDF57\uDF73-\uDF77\uDF92-\uDF98\uDF9D-\uDFA8\uDFB0-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCF9\uDD00-\uDE5F\uDE7F-\uDFFF]|\uD804[\uDC4E-\uDC51\uDC70-\uDC7E\uDCBD\uDCC2-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD44-\uDD4F\uDD77-\uDD7F\uDDCE\uDDCF\uDDE0\uDDF5-\uDDFF\uDE12\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEAA-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF3B\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC5A\uDC5C\uDC5E-\uDC7F\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDDE-\uDDFF\uDE45-\uDE4F\uDE5A-\uDE5F\uDE6D-\uDE7F\uDEB8-\uDEBF\uDECA-\uDEFF\uDF1A-\uDF1C\uDF2C-\uDF2F\uDF40-\uDFFF]|\uD806[\uDC00-\uDC9F\uDCF3-\uDCFE\uDD00-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC46-\uDC4F\uDC6D-\uDC6F\uDC90\uDC91\uDCA8\uDCB7-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F\uDC75-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD823-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83F\uD874-\uD87D\uD87F-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDE6D\uDE70-\uDECF\uDEEE\uDEEF\uDEF6-\uDEFF\uDF46-\uDF4F\uDF5A\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDEFF\uDF45-\uDF4F\uDF7F-\uDF8E\uDFA0-\uDFDF\uDFE1-\uDFFF]|\uD821[\uDFED-\uDFFF]|\uD822[\uDEF3-\uDFFF]|\uD82C[\uDC02-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A\uDC9B\uDCA0-\uDFFF]|\uD834[\uDCF6-\uDCFF\uDD27\uDD28\uDD73-\uDD7A\uDDE9-\uDDFF\uDE46-\uDEFF\uDF57-\uDF5F\uDF72-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]|\uD836[\uDE8C-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDFFF]|\uD83A[\uDCC5\uDCC6\uDCD7-\uDCFF\uDD4B-\uDD4F\uDD5A-\uDD5D\uDD60-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDEEF\uDEF2-\uDFFF]|\uD83C[\uDC2C-\uDC2F\uDC94-\uDC9F\uDCAF\uDCB0\uDCC0\uDCD0\uDCF6-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD6F\uDDAD-\uDDE5\uDE03-\uDE0F\uDE3C-\uDE3F\uDE49-\uDE4F\uDE52-\uDEFF]|\uD83D[\uDED3-\uDEDF\uDEED-\uDEEF\uDEF7-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDD0F\uDD1F\uDD28-\uDD2F\uDD31\uDD32\uDD3F\uDD4C-\uDD4F\uDD5F-\uDD7F\uDD92-\uDDBF\uDDC1-\uDFFF]|\uD869[\uDED7-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]'
        }, {
            name: 'Cc',
            alias: 'Control',
            bmp: '\0-\x1F\x7F-\x9F'
        }, {
            name: 'Cf',
            alias: 'Format',
            bmp: '\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB',
            astral: '\uD804\uDCBD|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]'
        }, {
            name: 'Cn',
            alias: 'Unassigned',
            bmp: '\u0378\u0379\u0380-\u0383\u038B\u038D\u03A2\u0530\u0557\u0558\u0560\u0588\u058B\u058C\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u05FF\u061D\u070E\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08B5\u08BE-\u08D3\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0AF8\u0AFA-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0BFF\u0C04\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D00\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D50-\u0D53\u0D64\u0D65\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F6\u13F7\u13FE\u13FF\u169D-\u169F\u16F9-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE\u1AAF\u1ABF-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C89-\u1CBF\u1CC8-\u1CCF\u1CF7\u1CFA-\u1CFF\u1DF6-\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u2065\u2072\u2073\u208F\u209D-\u209F\u20BF-\u20CF\u20F1-\u20FF\u218C-\u218F\u23FF\u2427-\u243F\u244B-\u245F\u2B74\u2B75\u2B96\u2B97\u2BBA-\u2BBC\u2BC9\u2BD2-\u2BEB\u2BF0-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E45-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FD6-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA6F8-\uA6FF\uA7AF\uA7B8-\uA7F6\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C6-\uA8CD\uA8DA-\uA8DF\uA8FE\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB66-\uAB6F\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD\uFEFE\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFF8\uFFFE\uFFFF',
            astral: '\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDCFF\uDD03-\uDD06\uDD34-\uDD36\uDD8F\uDD9C-\uDD9F\uDDA1-\uDDCF\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEFC-\uDEFF\uDF24-\uDF2F\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDFC4-\uDFC7\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDD6E\uDD70-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56\uDC9F-\uDCA6\uDCB0-\uDCDF\uDCF3\uDCF6-\uDCFA\uDD1C-\uDD1E\uDD3A-\uDD3E\uDD40-\uDD7F\uDDB8-\uDDBB\uDDD0\uDDD1\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE34-\uDE37\uDE3B-\uDE3E\uDE48-\uDE4F\uDE59-\uDE5F\uDEA0-\uDEBF\uDEE7-\uDEEA\uDEF7-\uDEFF\uDF36-\uDF38\uDF56\uDF57\uDF73-\uDF77\uDF92-\uDF98\uDF9D-\uDFA8\uDFB0-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCF9\uDD00-\uDE5F\uDE7F-\uDFFF]|\uD804[\uDC4E-\uDC51\uDC70-\uDC7E\uDCC2-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD44-\uDD4F\uDD77-\uDD7F\uDDCE\uDDCF\uDDE0\uDDF5-\uDDFF\uDE12\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEAA-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF3B\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC5A\uDC5C\uDC5E-\uDC7F\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDDE-\uDDFF\uDE45-\uDE4F\uDE5A-\uDE5F\uDE6D-\uDE7F\uDEB8-\uDEBF\uDECA-\uDEFF\uDF1A-\uDF1C\uDF2C-\uDF2F\uDF40-\uDFFF]|\uD806[\uDC00-\uDC9F\uDCF3-\uDCFE\uDD00-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC46-\uDC4F\uDC6D-\uDC6F\uDC90\uDC91\uDCA8\uDCB7-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F\uDC75-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD823-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83F\uD874-\uD87D\uD87F-\uDB3F\uDB41-\uDB7F][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDE6D\uDE70-\uDECF\uDEEE\uDEEF\uDEF6-\uDEFF\uDF46-\uDF4F\uDF5A\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDEFF\uDF45-\uDF4F\uDF7F-\uDF8E\uDFA0-\uDFDF\uDFE1-\uDFFF]|\uD821[\uDFED-\uDFFF]|\uD822[\uDEF3-\uDFFF]|\uD82C[\uDC02-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A\uDC9B\uDCA4-\uDFFF]|\uD834[\uDCF6-\uDCFF\uDD27\uDD28\uDDE9-\uDDFF\uDE46-\uDEFF\uDF57-\uDF5F\uDF72-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]|\uD836[\uDE8C-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDFFF]|\uD83A[\uDCC5\uDCC6\uDCD7-\uDCFF\uDD4B-\uDD4F\uDD5A-\uDD5D\uDD60-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDEEF\uDEF2-\uDFFF]|\uD83C[\uDC2C-\uDC2F\uDC94-\uDC9F\uDCAF\uDCB0\uDCC0\uDCD0\uDCF6-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD6F\uDDAD-\uDDE5\uDE03-\uDE0F\uDE3C-\uDE3F\uDE49-\uDE4F\uDE52-\uDEFF]|\uD83D[\uDED3-\uDEDF\uDEED-\uDEEF\uDEF7-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDD0F\uDD1F\uDD28-\uDD2F\uDD31\uDD32\uDD3F\uDD4C-\uDD4F\uDD5F-\uDD7F\uDD92-\uDDBF\uDDC1-\uDFFF]|\uD869[\uDED7-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uDB40[\uDC00\uDC02-\uDC1F\uDC80-\uDCFF\uDDF0-\uDFFF]|[\uDBBF\uDBFF][\uDFFE\uDFFF]'
        }, {
            name: 'Co',
            alias: 'Private_Use',
            bmp: '\uE000-\uF8FF',
            astral: '[\uDB80-\uDBBE\uDBC0-\uDBFE][\uDC00-\uDFFF]|[\uDBBF\uDBFF][\uDC00-\uDFFD]'
        }, {
            name: 'Cs',
            alias: 'Surrogate',
            bmp: '\uD800-\uDFFF'
        }, {
            name: 'L',
            alias: 'Letter',
            bmp: 'A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC',
            astral: '\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]'
        }, {
            name: 'Ll',
            alias: 'Lowercase_Letter',
            bmp: 'a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A',
            astral: '\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD83A[\uDD22-\uDD43]'
        }, {
            name: 'Lm',
            alias: 'Modifier_Letter',
            bmp: '\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C\uA69D\uA717-\uA71F\uA770\uA788\uA7F8\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E\uFF9F',
            astral: '\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F\uDFE0]'
        }, {
            name: 'Lo',
            alias: 'Other_Letter',
            bmp: '\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC',
            astral: '\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]'
        }, {
            name: 'Lt',
            alias: 'Titlecase_Letter',
            bmp: '\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC'
        }, {
            name: 'Lu',
            alias: 'Uppercase_Letter',
            bmp: 'A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A',
            astral: '\uD801[\uDC00-\uDC27\uDCB0-\uDCD3]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]'
        }, {
            name: 'M',
            alias: 'Mark',
            bmp: '\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F',
            astral: '\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC00-\uDC02\uDC38-\uDC46\uDC7F-\uDC82\uDCB0-\uDCBA\uDD00-\uDD02\uDD27-\uDD34\uDD73\uDD80-\uDD82\uDDB3-\uDDC0\uDDCA-\uDDCC\uDE2C-\uDE37\uDE3E\uDEDF-\uDEEA\uDF00-\uDF03\uDF3C\uDF3E-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC35-\uDC46\uDCB0-\uDCC3\uDDAF-\uDDB5\uDDB8-\uDDC0\uDDDC\uDDDD\uDE30-\uDE40\uDEAB-\uDEB7\uDF1D-\uDF2B]|\uD807[\uDC2F-\uDC36\uDC38-\uDC3F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF51-\uDF7E\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uDB40[\uDD00-\uDDEF]'
        }, {
            name: 'Mc',
            alias: 'Spacing_Mark',
            bmp: '\u0903\u093B\u093E-\u0940\u0949-\u094C\u094E\u094F\u0982\u0983\u09BE-\u09C0\u09C7\u09C8\u09CB\u09CC\u09D7\u0A03\u0A3E-\u0A40\u0A83\u0ABE-\u0AC0\u0AC9\u0ACB\u0ACC\u0B02\u0B03\u0B3E\u0B40\u0B47\u0B48\u0B4B\u0B4C\u0B57\u0BBE\u0BBF\u0BC1\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD7\u0C01-\u0C03\u0C41-\u0C44\u0C82\u0C83\u0CBE\u0CC0-\u0CC4\u0CC7\u0CC8\u0CCA\u0CCB\u0CD5\u0CD6\u0D02\u0D03\u0D3E-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D57\u0D82\u0D83\u0DCF-\u0DD1\u0DD8-\u0DDF\u0DF2\u0DF3\u0F3E\u0F3F\u0F7F\u102B\u102C\u1031\u1038\u103B\u103C\u1056\u1057\u1062-\u1064\u1067-\u106D\u1083\u1084\u1087-\u108C\u108F\u109A-\u109C\u17B6\u17BE-\u17C5\u17C7\u17C8\u1923-\u1926\u1929-\u192B\u1930\u1931\u1933-\u1938\u1A19\u1A1A\u1A55\u1A57\u1A61\u1A63\u1A64\u1A6D-\u1A72\u1B04\u1B35\u1B3B\u1B3D-\u1B41\u1B43\u1B44\u1B82\u1BA1\u1BA6\u1BA7\u1BAA\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2\u1BF3\u1C24-\u1C2B\u1C34\u1C35\u1CE1\u1CF2\u1CF3\u302E\u302F\uA823\uA824\uA827\uA880\uA881\uA8B4-\uA8C3\uA952\uA953\uA983\uA9B4\uA9B5\uA9BA\uA9BB\uA9BD-\uA9C0\uAA2F\uAA30\uAA33\uAA34\uAA4D\uAA7B\uAA7D\uAAEB\uAAEE\uAAEF\uAAF5\uABE3\uABE4\uABE6\uABE7\uABE9\uABEA\uABEC',
            astral: '\uD804[\uDC00\uDC02\uDC82\uDCB0-\uDCB2\uDCB7\uDCB8\uDD2C\uDD82\uDDB3-\uDDB5\uDDBF\uDDC0\uDE2C-\uDE2E\uDE32\uDE33\uDE35\uDEE0-\uDEE2\uDF02\uDF03\uDF3E\uDF3F\uDF41-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63]|\uD805[\uDC35-\uDC37\uDC40\uDC41\uDC45\uDCB0-\uDCB2\uDCB9\uDCBB-\uDCBE\uDCC1\uDDAF-\uDDB1\uDDB8-\uDDBB\uDDBE\uDE30-\uDE32\uDE3B\uDE3C\uDE3E\uDEAC\uDEAE\uDEAF\uDEB6\uDF20\uDF21\uDF26]|\uD807[\uDC2F\uDC3E\uDCA9\uDCB1\uDCB4]|\uD81B[\uDF51-\uDF7E]|\uD834[\uDD65\uDD66\uDD6D-\uDD72]'
        }, {
            name: 'Me',
            alias: 'Enclosing_Mark',
            bmp: '\u0488\u0489\u1ABE\u20DD-\u20E0\u20E2-\u20E4\uA670-\uA672'
        }, {
            name: 'Mn',
            alias: 'Nonspacing_Mark',
            bmp: '\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D01\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABD\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F',
            astral: '\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC01\uDC38-\uDC46\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDCA-\uDDCC\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3C\uDF40\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDCB3-\uDCB8\uDCBA\uDCBF\uDCC0\uDCC2\uDCC3\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC3F\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uDB40[\uDD00-\uDDEF]'
        }, {
            name: 'N',
            alias: 'Number',
            bmp: '0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D58-\u0D5E\u0D66-\u0D78\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19',
            astral: '\uD800[\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23\uDF41\uDF4A\uDFD1-\uDFD5]|\uD801[\uDCA0-\uDCA9]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE47\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDCFA-\uDCFF\uDE60-\uDE7E]|\uD804[\uDC52-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDDE1-\uDDF4\uDEF0-\uDEF9]|\uD805[\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF3B]|\uD806[\uDCE0-\uDCF2]|\uD807[\uDC50-\uDC6C]|\uD809[\uDC00-\uDC6E]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59\uDF5B-\uDF61]|\uD834[\uDF60-\uDF71]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDCC7-\uDCCF\uDD50-\uDD59]|\uD83C[\uDD00-\uDD0C]'
        }, {
            name: 'Nd',
            alias: 'Decimal_Number',
            bmp: '0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19',
            astral: '\uD801[\uDCA0-\uDCA9]|\uD804[\uDC66-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDEF0-\uDEF9]|\uD805[\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF39]|\uD806[\uDCE0-\uDCE9]|\uD807[\uDC50-\uDC59]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDD50-\uDD59]'
        }, {
            name: 'Nl',
            alias: 'Letter_Number',
            bmp: '\u16EE-\u16F0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303A\uA6E6-\uA6EF',
            astral: '\uD800[\uDD40-\uDD74\uDF41\uDF4A\uDFD1-\uDFD5]|\uD809[\uDC00-\uDC6E]'
        }, {
            name: 'No',
            alias: 'Other_Number',
            bmp: '\xB2\xB3\xB9\xBC-\xBE\u09F4-\u09F9\u0B72-\u0B77\u0BF0-\u0BF2\u0C78-\u0C7E\u0D58-\u0D5E\u0D70-\u0D78\u0F2A-\u0F33\u1369-\u137C\u17F0-\u17F9\u19DA\u2070\u2074-\u2079\u2080-\u2089\u2150-\u215F\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA830-\uA835',
            astral: '\uD800[\uDD07-\uDD33\uDD75-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE47\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDCFA-\uDCFF\uDE60-\uDE7E]|\uD804[\uDC52-\uDC65\uDDE1-\uDDF4]|\uD805[\uDF3A\uDF3B]|\uD806[\uDCEA-\uDCF2]|\uD807[\uDC5A-\uDC6C]|\uD81A[\uDF5B-\uDF61]|\uD834[\uDF60-\uDF71]|\uD83A[\uDCC7-\uDCCF]|\uD83C[\uDD00-\uDD0C]'
        }, {
            name: 'P',
            alias: 'Punctuation',
            bmp: '\x21-\x23\x25-\\x2A\x2C-\x2F\x3A\x3B\\x3F\x40\\x5B-\\x5D\x5F\\x7B\x7D\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E44\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65',
            astral: '\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]'
        }, {
            name: 'Pc',
            alias: 'Connector_Punctuation',
            bmp: '\x5F\u203F\u2040\u2054\uFE33\uFE34\uFE4D-\uFE4F\uFF3F'
        }, {
            name: 'Pd',
            alias: 'Dash_Punctuation',
            bmp: '\\x2D\u058A\u05BE\u1400\u1806\u2010-\u2015\u2E17\u2E1A\u2E3A\u2E3B\u2E40\u301C\u3030\u30A0\uFE31\uFE32\uFE58\uFE63\uFF0D'
        }, {
            name: 'Pe',
            alias: 'Close_Punctuation',
            bmp: '\\x29\\x5D\x7D\u0F3B\u0F3D\u169C\u2046\u207E\u208E\u2309\u230B\u232A\u2769\u276B\u276D\u276F\u2771\u2773\u2775\u27C6\u27E7\u27E9\u27EB\u27ED\u27EF\u2984\u2986\u2988\u298A\u298C\u298E\u2990\u2992\u2994\u2996\u2998\u29D9\u29DB\u29FD\u2E23\u2E25\u2E27\u2E29\u3009\u300B\u300D\u300F\u3011\u3015\u3017\u3019\u301B\u301E\u301F\uFD3E\uFE18\uFE36\uFE38\uFE3A\uFE3C\uFE3E\uFE40\uFE42\uFE44\uFE48\uFE5A\uFE5C\uFE5E\uFF09\uFF3D\uFF5D\uFF60\uFF63'
        }, {
            name: 'Pf',
            alias: 'Final_Punctuation',
            bmp: '\xBB\u2019\u201D\u203A\u2E03\u2E05\u2E0A\u2E0D\u2E1D\u2E21'
        }, {
            name: 'Pi',
            alias: 'Initial_Punctuation',
            bmp: '\xAB\u2018\u201B\u201C\u201F\u2039\u2E02\u2E04\u2E09\u2E0C\u2E1C\u2E20'
        }, {
            name: 'Po',
            alias: 'Other_Punctuation',
            bmp: '\x21-\x23\x25-\x27\\x2A\x2C\\x2E\x2F\x3A\x3B\\x3F\x40\\x5C\xA1\xA7\xB6\xB7\xBF\u037E\u0387\u055A-\u055F\u0589\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u166D\u166E\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u1805\u1807-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2016\u2017\u2020-\u2027\u2030-\u2038\u203B-\u203E\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205E\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00\u2E01\u2E06-\u2E08\u2E0B\u2E0E-\u2E16\u2E18\u2E19\u2E1B\u2E1E\u2E1F\u2E2A-\u2E2E\u2E30-\u2E39\u2E3C-\u2E3F\u2E41\u2E43\u2E44\u3001-\u3003\u303D\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFE10-\uFE16\uFE19\uFE30\uFE45\uFE46\uFE49-\uFE4C\uFE50-\uFE52\uFE54-\uFE57\uFE5F-\uFE61\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF07\uFF0A\uFF0C\uFF0E\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3C\uFF61\uFF64\uFF65',
            astral: '\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]'
        }, {
            name: 'Ps',
            alias: 'Open_Punctuation',
            bmp: '\\x28\\x5B\\x7B\u0F3A\u0F3C\u169B\u201A\u201E\u2045\u207D\u208D\u2308\u230A\u2329\u2768\u276A\u276C\u276E\u2770\u2772\u2774\u27C5\u27E6\u27E8\u27EA\u27EC\u27EE\u2983\u2985\u2987\u2989\u298B\u298D\u298F\u2991\u2993\u2995\u2997\u29D8\u29DA\u29FC\u2E22\u2E24\u2E26\u2E28\u2E42\u3008\u300A\u300C\u300E\u3010\u3014\u3016\u3018\u301A\u301D\uFD3F\uFE17\uFE35\uFE37\uFE39\uFE3B\uFE3D\uFE3F\uFE41\uFE43\uFE47\uFE59\uFE5B\uFE5D\uFF08\uFF3B\uFF5B\uFF5F\uFF62'
        }, {
            name: 'S',
            alias: 'Symbol',
            bmp: '\\x24\\x2B\x3C-\x3E\\x5E\x60\\x7C\x7E\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BE\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u23FE\u2400-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B98-\u2BB9\u2BBD-\u2BC8\u2BCA-\u2BD1\u2BEC-\u2BEF\u2CE5-\u2CEA\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u32FE\u3300-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD',
            astral: '\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9B\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD83B[\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD10-\uDD2E\uDD30-\uDD6B\uDD70-\uDDAC\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED2\uDEE0-\uDEEC\uDEF0-\uDEF6\uDF00-\uDF73\uDF80-\uDFD4]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3E\uDD40-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0]'
        }, {
            name: 'Sc',
            alias: 'Currency_Symbol',
            bmp: '\\x24\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BE\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6'
        }, {
            name: 'Sk',
            alias: 'Modifier_Symbol',
            bmp: '\\x5E\x60\xA8\xAF\xB4\xB8\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u309B\u309C\uA700-\uA716\uA720\uA721\uA789\uA78A\uAB5B\uFBB2-\uFBC1\uFF3E\uFF40\uFFE3',
            astral: '\uD83C[\uDFFB-\uDFFF]'
        }, {
            name: 'Sm',
            alias: 'Math_Symbol',
            bmp: '\\x2B\x3C-\x3E\\x7C\x7E\xAC\xB1\xD7\xF7\u03F6\u0606-\u0608\u2044\u2052\u207A-\u207C\u208A-\u208C\u2118\u2140-\u2144\u214B\u2190-\u2194\u219A\u219B\u21A0\u21A3\u21A6\u21AE\u21CE\u21CF\u21D2\u21D4\u21F4-\u22FF\u2320\u2321\u237C\u239B-\u23B3\u23DC-\u23E1\u25B7\u25C1\u25F8-\u25FF\u266F\u27C0-\u27C4\u27C7-\u27E5\u27F0-\u27FF\u2900-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2AFF\u2B30-\u2B44\u2B47-\u2B4C\uFB29\uFE62\uFE64-\uFE66\uFF0B\uFF1C-\uFF1E\uFF5C\uFF5E\uFFE2\uFFE9-\uFFEC',
            astral: '\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD83B[\uDEF0\uDEF1]'
        }, {
            name: 'So',
            alias: 'Other_Symbol',
            bmp: '\xA6\xA9\xAE\xB0\u0482\u058D\u058E\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u09FA\u0B70\u0BF3-\u0BF8\u0BFA\u0C7F\u0D4F\u0D79\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116\u2117\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u214A\u214C\u214D\u214F\u218A\u218B\u2195-\u2199\u219C-\u219F\u21A1\u21A2\u21A4\u21A5\u21A7-\u21AD\u21AF-\u21CD\u21D0\u21D1\u21D3\u21D5-\u21F3\u2300-\u2307\u230C-\u231F\u2322-\u2328\u232B-\u237B\u237D-\u239A\u23B4-\u23DB\u23E2-\u23FE\u2400-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u25B6\u25B8-\u25C0\u25C2-\u25F7\u2600-\u266E\u2670-\u2767\u2794-\u27BF\u2800-\u28FF\u2B00-\u2B2F\u2B45\u2B46\u2B4D-\u2B73\u2B76-\u2B95\u2B98-\u2BB9\u2BBD-\u2BC8\u2BCA-\u2BD1\u2BEC-\u2BEF\u2CE5-\u2CEA\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u32FE\u3300-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA828-\uA82B\uA836\uA837\uA839\uAA77-\uAA79\uFDFD\uFFE4\uFFE8\uFFED\uFFEE\uFFFC\uFFFD',
            astral: '\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9B\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD10-\uDD2E\uDD30-\uDD6B\uDD70-\uDDAC\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDF00-\uDFFA]|\uD83D[\uDC00-\uDED2\uDEE0-\uDEEC\uDEF0-\uDEF6\uDF00-\uDF73\uDF80-\uDFD4]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3E\uDD40-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0]'
        }, {
            name: 'Z',
            alias: 'Separator',
            bmp: '\x20\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000'
        }, {
            name: 'Zl',
            alias: 'Line_Separator',
            bmp: '\u2028'
        }, {
            name: 'Zp',
            alias: 'Paragraph_Separator',
            bmp: '\u2029'
        }, {
            name: 'Zs',
            alias: 'Space_Separator',
            bmp: '\x20\xA0\u1680\u2000-\u200A\u202F\u205F\u3000'
        }]);
    };

    module.exports = exports['default'];
    });

    unwrapExports(unicodeCategories);

    var unicodeProperties = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    /*!
     * XRegExp Unicode Properties 4.0.0
     * <xregexp.com>
     * Steven Levithan (c) 2012-2017 MIT License
     * Unicode data by Mathias Bynens <mathiasbynens.be>
     */

    exports.default = function (XRegExp) {

        /**
         * Adds properties to meet the UTS #18 Level 1 RL1.2 requirements for Unicode regex support. See
         * <http://unicode.org/reports/tr18/#RL1.2>. Following are definitions of these properties from
         * UAX #44 <http://unicode.org/reports/tr44/>:
         *
         * - Alphabetic
         *   Characters with the Alphabetic property. Generated from: Lowercase + Uppercase + Lt + Lm +
         *   Lo + Nl + Other_Alphabetic.
         *
         * - Default_Ignorable_Code_Point
         *   For programmatic determination of default ignorable code points. New characters that should
         *   be ignored in rendering (unless explicitly supported) will be assigned in these ranges,
         *   permitting programs to correctly handle the default rendering of such characters when not
         *   otherwise supported.
         *
         * - Lowercase
         *   Characters with the Lowercase property. Generated from: Ll + Other_Lowercase.
         *
         * - Noncharacter_Code_Point
         *   Code points permanently reserved for internal use.
         *
         * - Uppercase
         *   Characters with the Uppercase property. Generated from: Lu + Other_Uppercase.
         *
         * - White_Space
         *   Spaces, separator characters and other control characters which should be treated by
         *   programming languages as "white space" for the purpose of parsing elements.
         *
         * The properties ASCII, Any, and Assigned are also included but are not defined in UAX #44. UTS
         * #18 RL1.2 additionally requires support for Unicode scripts and general categories. These are
         * included in XRegExp's Unicode Categories and Unicode Scripts addons.
         *
         * Token names are case insensitive, and any spaces, hyphens, and underscores are ignored.
         *
         * Uses Unicode 9.0.0.
         *
         * @requires XRegExp, Unicode Base
         */

        if (!XRegExp.addUnicodeData) {
            throw new ReferenceError('Unicode Base must be loaded before Unicode Properties');
        }

        var unicodeData = [{
            name: 'ASCII',
            bmp: '\0-\x7F'
        }, {
            name: 'Alphabetic',
            bmp: 'A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0345\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05B0-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0657\u0659-\u065F\u066E-\u06D3\u06D5-\u06DC\u06E1-\u06E8\u06ED-\u06EF\u06FA-\u06FC\u06FF\u0710-\u073F\u074D-\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0817\u081A-\u082C\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08DF\u08E3-\u08E9\u08F0-\u093B\u093D-\u094C\u094E-\u0950\u0955-\u0963\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD-\u09C4\u09C7\u09C8\u09CB\u09CC\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09F0\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3E-\u0A42\u0A47\u0A48\u0A4B\u0A4C\u0A51\u0A59-\u0A5C\u0A5E\u0A70-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD-\u0AC5\u0AC7-\u0AC9\u0ACB\u0ACC\u0AD0\u0AE0-\u0AE3\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D-\u0B44\u0B47\u0B48\u0B4B\u0B4C\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD0\u0BD7\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4C\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCC\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4C\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E46\u0E4D\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0ECD\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F71-\u0F81\u0F88-\u0F97\u0F99-\u0FBC\u1000-\u1036\u1038\u103B-\u103F\u1050-\u1062\u1065-\u1068\u106E-\u1086\u108E\u109C\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1713\u1720-\u1733\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17B3\u17B6-\u17C8\u17D7\u17DC\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u1938\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A1B\u1A20-\u1A5E\u1A61-\u1A74\u1AA7\u1B00-\u1B33\u1B35-\u1B43\u1B45-\u1B4B\u1B80-\u1BA9\u1BAC-\u1BAF\u1BBA-\u1BE5\u1BE7-\u1BF1\u1C00-\u1C35\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1D00-\u1DBF\u1DE7-\u1DF4\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u24B6-\u24E9\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA674-\uA67B\uA67F-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA827\uA840-\uA873\uA880-\uA8C3\uA8C5\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA92A\uA930-\uA952\uA960-\uA97C\uA980-\uA9B2\uA9B4-\uA9BF\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA60-\uAA76\uAA7A\uAA7E-\uAABE\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF5\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC',
            astral: '\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC45\uDC82-\uDCB8\uDCD0-\uDCE8\uDD00-\uDD32\uDD50-\uDD72\uDD76\uDD80-\uDDBF\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE34\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEE8\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D-\uDF44\uDF47\uDF48\uDF4B\uDF4C\uDF50\uDF57\uDF5D-\uDF63]|\uD805[\uDC00-\uDC41\uDC43-\uDC45\uDC47-\uDC4A\uDC80-\uDCC1\uDCC4\uDCC5\uDCC7\uDD80-\uDDB5\uDDB8-\uDDBE\uDDD8-\uDDDD\uDE00-\uDE3E\uDE40\uDE44\uDE80-\uDEB5\uDF00-\uDF19\uDF1D-\uDF2A]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC3E\uDC40\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF36\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9E]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD47]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD30-\uDD49\uDD50-\uDD69\uDD70-\uDD89]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]'
        }, {
            name: 'Any',
            isBmpLast: true,
            bmp: '\0-\uFFFF',
            astral: '[\uD800-\uDBFF][\uDC00-\uDFFF]'
        }, {
            name: 'Default_Ignorable_Code_Point',
            bmp: '\xAD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8',
            astral: '\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|[\uDB40-\uDB43][\uDC00-\uDFFF]'
        }, {
            name: 'Lowercase',
            bmp: 'a-z\xAA\xB5\xBA\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02B8\u02C0\u02C1\u02E0-\u02E4\u0345\u0371\u0373\u0377\u037A-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1DBF\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u2071\u207F\u2090-\u209C\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2170-\u217F\u2184\u24D0-\u24E9\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7D\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B-\uA69D\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7F8-\uA7FA\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A',
            astral: '\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD83A[\uDD22-\uDD43]'
        }, {
            name: 'Noncharacter_Code_Point',
            bmp: '\uFDD0-\uFDEF\uFFFE\uFFFF',
            astral: '[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]'
        }, {
            name: 'Uppercase',
            bmp: 'A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2160-\u216F\u2183\u24B6-\u24CF\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A',
            astral: '\uD801[\uDC00-\uDC27\uDCB0-\uDCD3]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]|\uD83C[\uDD30-\uDD49\uDD50-\uDD69\uDD70-\uDD89]'
        }, {
            name: 'White_Space',
            bmp: '\x09-\x0D\x20\x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000'
        }];

        // Add non-generated data
        unicodeData.push({
            name: 'Assigned',
            // Since this is defined as the inverse of Unicode category Cn (Unassigned), the Unicode
            // Categories addon is required to use this property
            inverseOf: 'Cn'
        });

        XRegExp.addUnicodeData(unicodeData);
    };

    module.exports = exports['default'];
    });

    unwrapExports(unicodeProperties);

    var unicodeScripts = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    /*!
     * XRegExp Unicode Scripts 4.0.0
     * <xregexp.com>
     * Steven Levithan (c) 2010-2017 MIT License
     * Unicode data by Mathias Bynens <mathiasbynens.be>
     */

    exports.default = function (XRegExp) {

        /**
         * Adds support for all Unicode scripts. E.g., `\p{Latin}`. Token names are case insensitive,
         * and any spaces, hyphens, and underscores are ignored.
         *
         * Uses Unicode 9.0.0.
         *
         * @requires XRegExp, Unicode Base
         */

        if (!XRegExp.addUnicodeData) {
            throw new ReferenceError('Unicode Base must be loaded before Unicode Scripts');
        }

        XRegExp.addUnicodeData([{
            name: 'Adlam',
            astral: '\uD83A[\uDD00-\uDD4A\uDD50-\uDD59\uDD5E\uDD5F]'
        }, {
            name: 'Ahom',
            astral: '\uD805[\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF3F]'
        }, {
            name: 'Anatolian_Hieroglyphs',
            astral: '\uD811[\uDC00-\uDE46]'
        }, {
            name: 'Arabic',
            bmp: '\u0600-\u0604\u0606-\u060B\u060D-\u061A\u061E\u0620-\u063F\u0641-\u064A\u0656-\u066F\u0671-\u06DC\u06DE-\u06FF\u0750-\u077F\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u08FF\uFB50-\uFBC1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFD\uFE70-\uFE74\uFE76-\uFEFC',
            astral: '\uD803[\uDE60-\uDE7E]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB\uDEF0\uDEF1]'
        }, {
            name: 'Armenian',
            bmp: '\u0531-\u0556\u0559-\u055F\u0561-\u0587\u058A\u058D-\u058F\uFB13-\uFB17'
        }, {
            name: 'Avestan',
            astral: '\uD802[\uDF00-\uDF35\uDF39-\uDF3F]'
        }, {
            name: 'Balinese',
            bmp: '\u1B00-\u1B4B\u1B50-\u1B7C'
        }, {
            name: 'Bamum',
            bmp: '\uA6A0-\uA6F7',
            astral: '\uD81A[\uDC00-\uDE38]'
        }, {
            name: 'Bassa_Vah',
            astral: '\uD81A[\uDED0-\uDEED\uDEF0-\uDEF5]'
        }, {
            name: 'Batak',
            bmp: '\u1BC0-\u1BF3\u1BFC-\u1BFF'
        }, {
            name: 'Bengali',
            bmp: '\u0980-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09FB'
        }, {
            name: 'Bhaiksuki',
            astral: '\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC45\uDC50-\uDC6C]'
        }, {
            name: 'Bopomofo',
            bmp: '\u02EA\u02EB\u3105-\u312D\u31A0-\u31BA'
        }, {
            name: 'Brahmi',
            astral: '\uD804[\uDC00-\uDC4D\uDC52-\uDC6F\uDC7F]'
        }, {
            name: 'Braille',
            bmp: '\u2800-\u28FF'
        }, {
            name: 'Buginese',
            bmp: '\u1A00-\u1A1B\u1A1E\u1A1F'
        }, {
            name: 'Buhid',
            bmp: '\u1740-\u1753'
        }, {
            name: 'Canadian_Aboriginal',
            bmp: '\u1400-\u167F\u18B0-\u18F5'
        }, {
            name: 'Carian',
            astral: '\uD800[\uDEA0-\uDED0]'
        }, {
            name: 'Caucasian_Albanian',
            astral: '\uD801[\uDD30-\uDD63\uDD6F]'
        }, {
            name: 'Chakma',
            astral: '\uD804[\uDD00-\uDD34\uDD36-\uDD43]'
        }, {
            name: 'Cham',
            bmp: '\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA5C-\uAA5F'
        }, {
            name: 'Cherokee',
            bmp: '\u13A0-\u13F5\u13F8-\u13FD\uAB70-\uABBF'
        }, {
            name: 'Common',
            bmp: '\0-\x40\\x5B-\x60\\x7B-\xA9\xAB-\xB9\xBB-\xBF\xD7\xF7\u02B9-\u02DF\u02E5-\u02E9\u02EC-\u02FF\u0374\u037E\u0385\u0387\u0589\u0605\u060C\u061B\u061C\u061F\u0640\u06DD\u08E2\u0964\u0965\u0E3F\u0FD5-\u0FD8\u10FB\u16EB-\u16ED\u1735\u1736\u1802\u1803\u1805\u1CD3\u1CE1\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u2000-\u200B\u200E-\u2064\u2066-\u2070\u2074-\u207E\u2080-\u208E\u20A0-\u20BE\u2100-\u2125\u2127-\u2129\u212C-\u2131\u2133-\u214D\u214F-\u215F\u2189-\u218B\u2190-\u23FE\u2400-\u2426\u2440-\u244A\u2460-\u27FF\u2900-\u2B73\u2B76-\u2B95\u2B98-\u2BB9\u2BBD-\u2BC8\u2BCA-\u2BD1\u2BEC-\u2BEF\u2E00-\u2E44\u2FF0-\u2FFB\u3000-\u3004\u3006\u3008-\u3020\u3030-\u3037\u303C-\u303F\u309B\u309C\u30A0\u30FB\u30FC\u3190-\u319F\u31C0-\u31E3\u3220-\u325F\u327F-\u32CF\u3358-\u33FF\u4DC0-\u4DFF\uA700-\uA721\uA788-\uA78A\uA830-\uA839\uA92E\uA9CF\uAB5B\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFEFF\uFF01-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFF70\uFF9E\uFF9F\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFF9-\uFFFD',
            astral: '\uD800[\uDD00-\uDD02\uDD07-\uDD33\uDD37-\uDD3F\uDD90-\uDD9B\uDDD0-\uDDFC\uDEE1-\uDEFB]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD66\uDD6A-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDF00-\uDF56\uDF60-\uDF71]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDFCB\uDFCE-\uDFFF]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD00-\uDD0C\uDD10-\uDD2E\uDD30-\uDD6B\uDD70-\uDDAC\uDDE6-\uDDFF\uDE01\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED2\uDEE0-\uDEEC\uDEF0-\uDEF6\uDF00-\uDF73\uDF80-\uDFD4]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3E\uDD40-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0]|\uDB40[\uDC01\uDC20-\uDC7F]'
        }, {
            name: 'Coptic',
            bmp: '\u03E2-\u03EF\u2C80-\u2CF3\u2CF9-\u2CFF'
        }, {
            name: 'Cuneiform',
            astral: '\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC70-\uDC74\uDC80-\uDD43]'
        }, {
            name: 'Cypriot',
            astral: '\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F]'
        }, {
            name: 'Cyrillic',
            bmp: '\u0400-\u0484\u0487-\u052F\u1C80-\u1C88\u1D2B\u1D78\u2DE0-\u2DFF\uA640-\uA69F\uFE2E\uFE2F'
        }, {
            name: 'Deseret',
            astral: '\uD801[\uDC00-\uDC4F]'
        }, {
            name: 'Devanagari',
            bmp: '\u0900-\u0950\u0953-\u0963\u0966-\u097F\uA8E0-\uA8FD'
        }, {
            name: 'Duployan',
            astral: '\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9C-\uDC9F]'
        }, {
            name: 'Egyptian_Hieroglyphs',
            astral: '\uD80C[\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]'
        }, {
            name: 'Elbasan',
            astral: '\uD801[\uDD00-\uDD27]'
        }, {
            name: 'Ethiopic',
            bmp: '\u1200-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u137C\u1380-\u1399\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E'
        }, {
            name: 'Georgian',
            bmp: '\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u10FF\u2D00-\u2D25\u2D27\u2D2D'
        }, {
            name: 'Glagolitic',
            bmp: '\u2C00-\u2C2E\u2C30-\u2C5E',
            astral: '\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]'
        }, {
            name: 'Gothic',
            astral: '\uD800[\uDF30-\uDF4A]'
        }, {
            name: 'Grantha',
            astral: '\uD804[\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]'
        }, {
            name: 'Greek',
            bmp: '\u0370-\u0373\u0375-\u0377\u037A-\u037D\u037F\u0384\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03E1\u03F0-\u03FF\u1D26-\u1D2A\u1D5D-\u1D61\u1D66-\u1D6A\u1DBF\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u2126\uAB65',
            astral: '\uD800[\uDD40-\uDD8E\uDDA0]|\uD834[\uDE00-\uDE45]'
        }, {
            name: 'Gujarati',
            bmp: '\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AF1\u0AF9'
        }, {
            name: 'Gurmukhi',
            bmp: '\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75'
        }, {
            name: 'Han',
            bmp: '\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FD5\uF900-\uFA6D\uFA70-\uFAD9',
            astral: '[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]'
        }, {
            name: 'Hangul',
            bmp: '\u1100-\u11FF\u302E\u302F\u3131-\u318E\u3200-\u321E\u3260-\u327E\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC'
        }, {
            name: 'Hanunoo',
            bmp: '\u1720-\u1734'
        }, {
            name: 'Hatran',
            astral: '\uD802[\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDCFF]'
        }, {
            name: 'Hebrew',
            bmp: '\u0591-\u05C7\u05D0-\u05EA\u05F0-\u05F4\uFB1D-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFB4F'
        }, {
            name: 'Hiragana',
            bmp: '\u3041-\u3096\u309D-\u309F',
            astral: '\uD82C\uDC01|\uD83C\uDE00'
        }, {
            name: 'Imperial_Aramaic',
            astral: '\uD802[\uDC40-\uDC55\uDC57-\uDC5F]'
        }, {
            name: 'Inherited',
            bmp: '\u0300-\u036F\u0485\u0486\u064B-\u0655\u0670\u0951\u0952\u1AB0-\u1ABE\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u200C\u200D\u20D0-\u20F0\u302A-\u302D\u3099\u309A\uFE00-\uFE0F\uFE20-\uFE2D',
            astral: '\uD800[\uDDFD\uDEE0]|\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD]|\uDB40[\uDD00-\uDDEF]'
        }, {
            name: 'Inscriptional_Pahlavi',
            astral: '\uD802[\uDF60-\uDF72\uDF78-\uDF7F]'
        }, {
            name: 'Inscriptional_Parthian',
            astral: '\uD802[\uDF40-\uDF55\uDF58-\uDF5F]'
        }, {
            name: 'Javanese',
            bmp: '\uA980-\uA9CD\uA9D0-\uA9D9\uA9DE\uA9DF'
        }, {
            name: 'Kaithi',
            astral: '\uD804[\uDC80-\uDCC1]'
        }, {
            name: 'Kannada',
            bmp: '\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2'
        }, {
            name: 'Katakana',
            bmp: '\u30A1-\u30FA\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF6F\uFF71-\uFF9D',
            astral: '\uD82C\uDC00'
        }, {
            name: 'Kayah_Li',
            bmp: '\uA900-\uA92D\uA92F'
        }, {
            name: 'Kharoshthi',
            astral: '\uD802[\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F-\uDE47\uDE50-\uDE58]'
        }, {
            name: 'Khmer',
            bmp: '\u1780-\u17DD\u17E0-\u17E9\u17F0-\u17F9\u19E0-\u19FF'
        }, {
            name: 'Khojki',
            astral: '\uD804[\uDE00-\uDE11\uDE13-\uDE3E]'
        }, {
            name: 'Khudawadi',
            astral: '\uD804[\uDEB0-\uDEEA\uDEF0-\uDEF9]'
        }, {
            name: 'Lao',
            bmp: '\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF'
        }, {
            name: 'Latin',
            bmp: 'A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A'
        }, {
            name: 'Lepcha',
            bmp: '\u1C00-\u1C37\u1C3B-\u1C49\u1C4D-\u1C4F'
        }, {
            name: 'Limbu',
            bmp: '\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1940\u1944-\u194F'
        }, {
            name: 'Linear_A',
            astral: '\uD801[\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]'
        }, {
            name: 'Linear_B',
            astral: '\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA]'
        }, {
            name: 'Lisu',
            bmp: '\uA4D0-\uA4FF'
        }, {
            name: 'Lycian',
            astral: '\uD800[\uDE80-\uDE9C]'
        }, {
            name: 'Lydian',
            astral: '\uD802[\uDD20-\uDD39\uDD3F]'
        }, {
            name: 'Mahajani',
            astral: '\uD804[\uDD50-\uDD76]'
        }, {
            name: 'Malayalam',
            bmp: '\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4F\u0D54-\u0D63\u0D66-\u0D7F'
        }, {
            name: 'Mandaic',
            bmp: '\u0840-\u085B\u085E'
        }, {
            name: 'Manichaean',
            astral: '\uD802[\uDEC0-\uDEE6\uDEEB-\uDEF6]'
        }, {
            name: 'Marchen',
            astral: '\uD807[\uDC70-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]'
        }, {
            name: 'Meetei_Mayek',
            bmp: '\uAAE0-\uAAF6\uABC0-\uABED\uABF0-\uABF9'
        }, {
            name: 'Mende_Kikakui',
            astral: '\uD83A[\uDC00-\uDCC4\uDCC7-\uDCD6]'
        }, {
            name: 'Meroitic_Cursive',
            astral: '\uD802[\uDDA0-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDDFF]'
        }, {
            name: 'Meroitic_Hieroglyphs',
            astral: '\uD802[\uDD80-\uDD9F]'
        }, {
            name: 'Miao',
            astral: '\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]'
        }, {
            name: 'Modi',
            astral: '\uD805[\uDE00-\uDE44\uDE50-\uDE59]'
        }, {
            name: 'Mongolian',
            bmp: '\u1800\u1801\u1804\u1806-\u180E\u1810-\u1819\u1820-\u1877\u1880-\u18AA',
            astral: '\uD805[\uDE60-\uDE6C]'
        }, {
            name: 'Mro',
            astral: '\uD81A[\uDE40-\uDE5E\uDE60-\uDE69\uDE6E\uDE6F]'
        }, {
            name: 'Multani',
            astral: '\uD804[\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA9]'
        }, {
            name: 'Myanmar',
            bmp: '\u1000-\u109F\uA9E0-\uA9FE\uAA60-\uAA7F'
        }, {
            name: 'Nabataean',
            astral: '\uD802[\uDC80-\uDC9E\uDCA7-\uDCAF]'
        }, {
            name: 'New_Tai_Lue',
            bmp: '\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u19DE\u19DF'
        }, {
            name: 'Newa',
            astral: '\uD805[\uDC00-\uDC59\uDC5B\uDC5D]'
        }, {
            name: 'Nko',
            bmp: '\u07C0-\u07FA'
        }, {
            name: 'Ogham',
            bmp: '\u1680-\u169C'
        }, {
            name: 'Ol_Chiki',
            bmp: '\u1C50-\u1C7F'
        }, {
            name: 'Old_Hungarian',
            astral: '\uD803[\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDCFF]'
        }, {
            name: 'Old_Italic',
            astral: '\uD800[\uDF00-\uDF23]'
        }, {
            name: 'Old_North_Arabian',
            astral: '\uD802[\uDE80-\uDE9F]'
        }, {
            name: 'Old_Permic',
            astral: '\uD800[\uDF50-\uDF7A]'
        }, {
            name: 'Old_Persian',
            astral: '\uD800[\uDFA0-\uDFC3\uDFC8-\uDFD5]'
        }, {
            name: 'Old_South_Arabian',
            astral: '\uD802[\uDE60-\uDE7F]'
        }, {
            name: 'Old_Turkic',
            astral: '\uD803[\uDC00-\uDC48]'
        }, {
            name: 'Oriya',
            bmp: '\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B77'
        }, {
            name: 'Osage',
            astral: '\uD801[\uDCB0-\uDCD3\uDCD8-\uDCFB]'
        }, {
            name: 'Osmanya',
            astral: '\uD801[\uDC80-\uDC9D\uDCA0-\uDCA9]'
        }, {
            name: 'Pahawh_Hmong',
            astral: '\uD81A[\uDF00-\uDF45\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]'
        }, {
            name: 'Palmyrene',
            astral: '\uD802[\uDC60-\uDC7F]'
        }, {
            name: 'Pau_Cin_Hau',
            astral: '\uD806[\uDEC0-\uDEF8]'
        }, {
            name: 'Phags_Pa',
            bmp: '\uA840-\uA877'
        }, {
            name: 'Phoenician',
            astral: '\uD802[\uDD00-\uDD1B\uDD1F]'
        }, {
            name: 'Psalter_Pahlavi',
            astral: '\uD802[\uDF80-\uDF91\uDF99-\uDF9C\uDFA9-\uDFAF]'
        }, {
            name: 'Rejang',
            bmp: '\uA930-\uA953\uA95F'
        }, {
            name: 'Runic',
            bmp: '\u16A0-\u16EA\u16EE-\u16F8'
        }, {
            name: 'Samaritan',
            bmp: '\u0800-\u082D\u0830-\u083E'
        }, {
            name: 'Saurashtra',
            bmp: '\uA880-\uA8C5\uA8CE-\uA8D9'
        }, {
            name: 'Sharada',
            astral: '\uD804[\uDD80-\uDDCD\uDDD0-\uDDDF]'
        }, {
            name: 'Shavian',
            astral: '\uD801[\uDC50-\uDC7F]'
        }, {
            name: 'Siddham',
            astral: '\uD805[\uDD80-\uDDB5\uDDB8-\uDDDD]'
        }, {
            name: 'SignWriting',
            astral: '\uD836[\uDC00-\uDE8B\uDE9B-\uDE9F\uDEA1-\uDEAF]'
        }, {
            name: 'Sinhala',
            bmp: '\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4',
            astral: '\uD804[\uDDE1-\uDDF4]'
        }, {
            name: 'Sora_Sompeng',
            astral: '\uD804[\uDCD0-\uDCE8\uDCF0-\uDCF9]'
        }, {
            name: 'Sundanese',
            bmp: '\u1B80-\u1BBF\u1CC0-\u1CC7'
        }, {
            name: 'Syloti_Nagri',
            bmp: '\uA800-\uA82B'
        }, {
            name: 'Syriac',
            bmp: '\u0700-\u070D\u070F-\u074A\u074D-\u074F'
        }, {
            name: 'Tagalog',
            bmp: '\u1700-\u170C\u170E-\u1714'
        }, {
            name: 'Tagbanwa',
            bmp: '\u1760-\u176C\u176E-\u1770\u1772\u1773'
        }, {
            name: 'Tai_Le',
            bmp: '\u1950-\u196D\u1970-\u1974'
        }, {
            name: 'Tai_Tham',
            bmp: '\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA0-\u1AAD'
        }, {
            name: 'Tai_Viet',
            bmp: '\uAA80-\uAAC2\uAADB-\uAADF'
        }, {
            name: 'Takri',
            astral: '\uD805[\uDE80-\uDEB7\uDEC0-\uDEC9]'
        }, {
            name: 'Tamil',
            bmp: '\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BFA'
        }, {
            name: 'Tangut',
            astral: '\uD81B\uDFE0|[\uD81C-\uD820][\uDC00-\uDFFF]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]'
        }, {
            name: 'Telugu',
            bmp: '\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7F'
        }, {
            name: 'Thaana',
            bmp: '\u0780-\u07B1'
        }, {
            name: 'Thai',
            bmp: '\u0E01-\u0E3A\u0E40-\u0E5B'
        }, {
            name: 'Tibetan',
            bmp: '\u0F00-\u0F47\u0F49-\u0F6C\u0F71-\u0F97\u0F99-\u0FBC\u0FBE-\u0FCC\u0FCE-\u0FD4\u0FD9\u0FDA'
        }, {
            name: 'Tifinagh',
            bmp: '\u2D30-\u2D67\u2D6F\u2D70\u2D7F'
        }, {
            name: 'Tirhuta',
            astral: '\uD805[\uDC80-\uDCC7\uDCD0-\uDCD9]'
        }, {
            name: 'Ugaritic',
            astral: '\uD800[\uDF80-\uDF9D\uDF9F]'
        }, {
            name: 'Vai',
            bmp: '\uA500-\uA62B'
        }, {
            name: 'Warang_Citi',
            astral: '\uD806[\uDCA0-\uDCF2\uDCFF]'
        }, {
            name: 'Yi',
            bmp: '\uA000-\uA48C\uA490-\uA4C6'
        }]);
    };

    module.exports = exports['default'];
    });

    unwrapExports(unicodeScripts);

    var lib = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });



    var _xregexp2 = _interopRequireDefault(xregexp);



    var _build2 = _interopRequireDefault(build);



    var _matchrecursive2 = _interopRequireDefault(matchrecursive);



    var _unicodeBase2 = _interopRequireDefault(unicodeBase);



    var _unicodeBlocks2 = _interopRequireDefault(unicodeBlocks);



    var _unicodeCategories2 = _interopRequireDefault(unicodeCategories);



    var _unicodeProperties2 = _interopRequireDefault(unicodeProperties);



    var _unicodeScripts2 = _interopRequireDefault(unicodeScripts);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    (0, _build2.default)(_xregexp2.default);
    (0, _matchrecursive2.default)(_xregexp2.default);
    (0, _unicodeBase2.default)(_xregexp2.default);
    (0, _unicodeBlocks2.default)(_xregexp2.default);
    (0, _unicodeCategories2.default)(_xregexp2.default);
    (0, _unicodeProperties2.default)(_xregexp2.default);
    (0, _unicodeScripts2.default)(_xregexp2.default);

    exports.default = _xregexp2.default;
    module.exports = exports['default'];
    });

    unwrapExports(lib);

    var decamelize = (text, separator) => {
    	if (typeof text !== 'string') {
    		throw new TypeError('Expected a string');
    	}

    	separator = typeof separator === 'undefined' ? '_' : separator;

    	const regex1 = lib('([\\p{Ll}\\d])(\\p{Lu})', 'g');
    	const regex2 = lib('(\\p{Lu}+)(\\p{Lu}[\\p{Ll}\\d]+)', 'g');

    	return text
    		// TODO: Use this instead of `xregexp` when targeting Node.js 10:
    		// .replace(/([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu, `$1${separator}$2`)
    		// .replace(/(\p{Lowercase_Letter}+)(\p{Uppercase_Letter}[\p{Lowercase_Letter}\d]+)/gu, `$1${separator}$2`)
    		.replace(regex1, `$1${separator}$2`)
    		.replace(regex2, `$1${separator}$2`)
    		.toLowerCase();
    };

    var _decamelize = /*#__PURE__*/Object.freeze({
        default: decamelize,
        __moduleExports: decamelize
    });

    //handle es6 / bundling
    const decamelize$1 = (decamelize || _decamelize);
    function createElement(tag, attrs, ...children) {
        if (typeof tag === 'function') {
            const fn = tag;
            const props = attrs;
            props.children = children;
            return fn(props);
        }
        else {
            const el = document.createElement(tag);
            const map = attrs;
            for (let name in map) {
                if (name && map.hasOwnProperty(name)) {
                    let value = map[name];
                    if (name === 'className' && value !== void 0) {
                        el.setAttribute('class', value.toString());
                    }
                    else if (value === false || value === null || value === undefined) {
                        continue;
                    }
                    else if (value === true) {
                        el.setAttribute(name, name);
                    }
                    else if (typeof value === 'function') {
                        el[name.toLowerCase()] = value;
                    }
                    else if (typeof value === 'object') {
                        el.setAttribute(name, flatten(value));
                    }
                    else {
                        el.setAttribute(name, value.toString());
                    }
                }
            }
            if (children && children.length > 0) {
                appendChildren(el, children);
            }
            return el;
        }
    }
    function flatten(o) {
        const arr = [];
        for (let prop in o)
            arr.push(`${decamelize$1(prop, '-')}:${o[prop]}`);
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
        const activeChildPositions = getActiveChildPositions(container);
        container.innerHTML = '';
        if (element) {
            addChild(container, element);
            if (activeChildPositions)
                focusChildAtPosition(container, activeChildPositions);
        }
    }
    function focusChildAtPosition(element, childPositions) {
        while (element && childPositions.length)
            element = element.children.item(childPositions.shift());
        if (element)
            element.focus();
    }
    function getActiveChildPositions(containerElement) {
        var active = document.activeElement;
        var childPositions = [];
        while (active !== document.body && active !== containerElement) {
            childPositions.unshift(childPosition(active));
            active = active.parentElement;
        }
        if (active === containerElement && childPositions.length)
            return childPositions;
    }
    function childPosition(element) {
        let i = 0;
        while (element = element.previousElementSibling)
            i++;
        return i;
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
        Table: Table
    });

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.

    var types$1 = /*#__PURE__*/Object.freeze({

    });

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
        default: deepmerge_1
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
        reHex3 = /^#([0-9a-f]{3})$/,
        reHex6 = /^#([0-9a-f]{6})$/,
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
      var m;
      format = (format + "").trim().toLowerCase();
      return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
          : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
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

    var deg2rad = Math.PI / 180;
    var rad2deg = 180 / Math.PI;

    // https://observablehq.com/@mbostock/lab-and-rgb
    var K = 18,
        Xn = 0.96422,
        Yn = 1,
        Zn = 0.82521,
        t0 = 4 / 29,
        t1 = 6 / 29,
        t2 = 3 * t1 * t1,
        t3 = t1 * t1 * t1;

    function labConvert(o) {
      if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
      if (o instanceof Hcl) return hcl2lab(o);
      if (!(o instanceof Rgb)) o = rgbConvert(o);
      var r = rgb2lrgb(o.r),
          g = rgb2lrgb(o.g),
          b = rgb2lrgb(o.b),
          y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
      if (r === g && g === b) x = z = y; else {
        x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
        z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
      }
      return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
    }

    function lab(l, a, b, opacity) {
      return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
    }

    function Lab(l, a, b, opacity) {
      this.l = +l;
      this.a = +a;
      this.b = +b;
      this.opacity = +opacity;
    }

    define(Lab, lab, extend(Color, {
      brighter: function(k) {
        return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
      },
      darker: function(k) {
        return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
      },
      rgb: function() {
        var y = (this.l + 16) / 116,
            x = isNaN(this.a) ? y : y + this.a / 500,
            z = isNaN(this.b) ? y : y - this.b / 200;
        x = Xn * lab2xyz(x);
        y = Yn * lab2xyz(y);
        z = Zn * lab2xyz(z);
        return new Rgb(
          lrgb2rgb( 3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
          lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
          lrgb2rgb( 0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
          this.opacity
        );
      }
    }));

    function xyz2lab(t) {
      return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
    }

    function lab2xyz(t) {
      return t > t1 ? t * t * t : t2 * (t - t0);
    }

    function lrgb2rgb(x) {
      return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
    }

    function rgb2lrgb(x) {
      return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    }

    function hclConvert(o) {
      if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
      if (!(o instanceof Lab)) o = labConvert(o);
      if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
      var h = Math.atan2(o.b, o.a) * rad2deg;
      return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
    }

    function hcl(h, c, l, opacity) {
      return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
    }

    function Hcl(h, c, l, opacity) {
      this.h = +h;
      this.c = +c;
      this.l = +l;
      this.opacity = +opacity;
    }

    function hcl2lab(o) {
      if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
      var h = o.h * deg2rad;
      return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
    }

    define(Hcl, hcl, extend(Color, {
      brighter: function(k) {
        return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
      },
      darker: function(k) {
        return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
      },
      rgb: function() {
        return hcl2lab(this).rgb();
      }
    }));

    var A = -0.14861,
        B = +1.78277,
        C = -0.29227,
        D = -0.90649,
        E = +1.97294,
        ED = E * D,
        EB = E * B,
        BC_DA = B * C - D * A;

    function cubehelixConvert(o) {
      if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
      if (!(o instanceof Rgb)) o = rgbConvert(o);
      var r = o.r / 255,
          g = o.g / 255,
          b = o.b / 255,
          l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
          bl = b - l,
          k = (E * (g - l) - C * bl) / D,
          s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
          h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
      return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
    }

    function cubehelix(h, s, l, opacity) {
      return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
    }

    function Cubehelix(h, s, l, opacity) {
      this.h = +h;
      this.s = +s;
      this.l = +l;
      this.opacity = +opacity;
    }

    define(Cubehelix, cubehelix, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
      },
      rgb: function() {
        var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
            l = +this.l,
            a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
            cosh = Math.cos(h),
            sinh = Math.sin(h);
        return new Rgb(
          255 * (l + a * (A * cosh + B * sinh)),
          255 * (l + a * (C * cosh + D * sinh)),
          255 * (l + a * (E * cosh)),
          this.opacity
        );
      }
    }));

    function rgbToDeckglColor(c) {
        return [c.r, c.g, c.b, c.opacity * 255];
    }
    /**
     * Compares 2 colors to see if they are equal.
     * @param a Color to compare
     * @param b Color to compare
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
     * Convert a CSS color string to a Deck.gl Color array - (The rgba color of each object, in r, g, b, [a]. Each component is in the 0-255 range.).
     * @param cssColorSpecifier A CSS Color Module Level 3 specifier string.
     */
    function colorFromString(cssColorSpecifier) {
        const c = color(cssColorSpecifier).rgb();
        return rgbToDeckglColor(c);
    }
    /**
     * Convert a Deck.gl color to a CSS rgba() string.
     * @param color A Deck.gl Color array - (The rgba color of each object, in r, g, b, [a]. Each component is in the 0-255 range.)
     */
    function colorToString(color$$1) {
        const c = [...color$$1];
        if (c.length > 3) {
            c[3] /= 255;
        }
        return `rgba(${c.join(',')})`;
    }
    function desaturate(color$$1, value) {
        const rgb$$1 = rgb(color$$1[0], color$$1[1], color$$1[2], color$$1[3] / 255);
        const hslColor = hsl(rgb$$1);
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
        View: null
    };
    let deck = {
        CompositeLayer: null,
        COORDINATE_SYSTEM: null,
        Deck: null,
        Layer: null,
        LinearInterpolator: null,
        OrbitView: null,
        _OrbitController: null
    };
    let layers = {
        IconLayer: null,
        LineLayer: null,
        PolygonLayer: null,
        TextLayer: null
    };
    let luma = {
        CubeGeometry: null,
        fp64: null,
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

    var tinySdf = TinySDF;
    var default_1 = TinySDF;

    var INF = 1e20;

    function TinySDF(fontSize, buffer, radius, cutoff, fontFamily, fontWeight) {
        this.fontSize = fontSize || 24;
        this.buffer = buffer === undefined ? 3 : buffer;
        this.cutoff = cutoff || 0.25;
        this.fontFamily = fontFamily || 'sans-serif';
        this.fontWeight = fontWeight || 'normal';
        this.radius = radius || 8;
        var size = this.size = this.fontSize + this.buffer * 2;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvas.height = size;

        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontFamily;
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = 'black';

        // temporary arrays for the distance transform
        this.gridOuter = new Float64Array(size * size);
        this.gridInner = new Float64Array(size * size);
        this.f = new Float64Array(size);
        this.d = new Float64Array(size);
        this.z = new Float64Array(size + 1);
        this.v = new Int16Array(size);

        // hack around https://bugzilla.mozilla.org/show_bug.cgi?id=737852
        this.middle = Math.round((size / 2) * (navigator.userAgent.indexOf('Gecko/') >= 0 ? 1.2 : 1));
    }

    TinySDF.prototype.draw = function (char) {
        this.ctx.clearRect(0, 0, this.size, this.size);
        this.ctx.fillText(char, this.buffer, this.middle);

        var imgData = this.ctx.getImageData(0, 0, this.size, this.size);
        var alphaChannel = new Uint8ClampedArray(this.size * this.size);

        for (var i = 0; i < this.size * this.size; i++) {
            var a = imgData.data[i * 4 + 3] / 255; // alpha value
            this.gridOuter[i] = a === 1 ? 0 : a === 0 ? INF : Math.pow(Math.max(0, 0.5 - a), 2);
            this.gridInner[i] = a === 1 ? INF : a === 0 ? 0 : Math.pow(Math.max(0, a - 0.5), 2);
        }

        edt(this.gridOuter, this.size, this.size, this.f, this.d, this.v, this.z);
        edt(this.gridInner, this.size, this.size, this.f, this.d, this.v, this.z);

        for (i = 0; i < this.size * this.size; i++) {
            var d = this.gridOuter[i] - this.gridInner[i];
            alphaChannel[i] = Math.max(0, Math.min(255, Math.round(255 - 255 * (d / this.radius + this.cutoff))));
        }

        return alphaChannel;
    };

    // 2D Euclidean distance transform by Felzenszwalb & Huttenlocher https://cs.brown.edu/~pff/papers/dt-final.pdf
    function edt(data, width, height, f, d, v, z) {
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                f[y] = data[y * width + x];
            }
            edt1d(f, d, v, z, height);
            for (y = 0; y < height; y++) {
                data[y * width + x] = d[y];
            }
        }
        for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
                f[x] = data[y * width + x];
            }
            edt1d(f, d, v, z, width);
            for (x = 0; x < width; x++) {
                data[y * width + x] = Math.sqrt(d[x]);
            }
        }
    }

    // 1D squared distance transform
    function edt1d(f, d, v, z, n) {
        v[0] = 0;
        z[0] = -INF;
        z[1] = +INF;

        for (var q = 1, k = 0; q < n; q++) {
            var s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
            while (s <= z[k]) {
                k--;
                s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
            }
            k++;
            v[k] = q;
            z[k] = s;
            z[k + 1] = +INF;
        }

        for (q = 0, k = 0; q < n; q++) {
            while (z[k + 1] < q) k++;
            d[q] = (q - v[k]) * (q - v[k]) + f[v[k]];
        }
    }
    tinySdf.default = default_1;

    //from https://github.com/uber/deck.gl/blob/6.4-release/modules/layers/src/text-layer/font-atlas.js
    const GL_TEXTURE_WRAP_S = 0x2802;
    const GL_TEXTURE_WRAP_T = 0x2803;
    const GL_CLAMP_TO_EDGE = 0x812f;
    const MAX_CANVAS_WIDTH = 1024;
    const BASELINE_SCALE = 0.9;
    const HEIGHT_SCALE = 1.2;
    function getDefaultCharacterSet() {
        const charSet = [];
        for (let i = 32; i < 128; i++) {
            charSet.push(String.fromCharCode(i));
        }
        return charSet;
    }
    const DEFAULT_CHAR_SET = getDefaultCharacterSet();
    const DEFAULT_FONT_FAMILY = 'Monaco, monospace';
    const DEFAULT_FONT_WEIGHT = 'normal';
    const DEFAULT_FONT_SETTINGS = {
        fontSize: 64,
        buffer: 2,
        sdf: false,
        cutoff: 0.25,
        radius: 3
    };
    function populateAlphaChannel(alphaChannel, imageData) {
        // populate distance value from tinySDF to image alpha channel	
        for (let i = 0; i < alphaChannel.length; i++) {
            imageData.data[4 * i + 3] = alphaChannel[i];
        }
    }
    function setTextStyle(ctx, fontFamily, fontSize, fontWeight) {
        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        ctx.fillStyle = '#000';
        ctx.textBaseline = 'alphabetic';
        ctx.textAlign = 'left';
    }
    function buildMapping({ ctx, fontHeight, buffer, characterSet, maxCanvasWidth }) {
        const mapping = {};
        let row = 0;
        let x = 0;
        Array.from(characterSet).forEach(char => {
            // measure texts
            // TODO - use Advanced text metrics when they are adopted:
            // https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics
            const { width } = ctx.measureText(char);
            if (x + width + buffer * 2 > maxCanvasWidth) {
                x = 0;
                row++;
            }
            mapping[char] = {
                x: x + buffer,
                y: row * (fontHeight + buffer * 2) + buffer,
                width,
                height: fontHeight,
                mask: true
            };
            x += width + buffer * 2;
        });
        const canvasHeight = (row + 1) * (fontHeight + buffer * 2);
        return { mapping, canvasHeight };
    }
    function makeFontAtlas(gl, fontSettings) {
        const mergedFontSettings = Object.assign({
            fontFamily: DEFAULT_FONT_FAMILY,
            fontWeight: DEFAULT_FONT_WEIGHT,
            characterSet: DEFAULT_CHAR_SET
        }, DEFAULT_FONT_SETTINGS, fontSettings);
        const { fontFamily, fontWeight, characterSet, fontSize, buffer, sdf, radius, cutoff } = mergedFontSettings;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // build mapping
        setTextStyle(ctx, fontFamily, fontSize, fontWeight);
        const fontHeight = fontSize * HEIGHT_SCALE;
        const { canvasHeight, mapping } = buildMapping({
            ctx,
            fontHeight,
            buffer,
            characterSet,
            maxCanvasWidth: MAX_CANVAS_WIDTH
        });
        canvas.width = MAX_CANVAS_WIDTH;
        canvas.height = canvasHeight;
        setTextStyle(ctx, fontFamily, fontSize, fontWeight);
        // layout characters
        if (sdf) {
            const tinySDF = new tinySdf(fontSize, buffer, radius, cutoff, fontFamily, fontWeight);
            // used to store distance values from tinySDF	
            const imageData = ctx.createImageData(tinySDF.size, tinySDF.size);
            for (const char of characterSet) {
                populateAlphaChannel(tinySDF.draw(char), imageData);
                ctx.putImageData(imageData, mapping[char].x - buffer, mapping[char].y - buffer);
            }
        }
        else {
            for (const char of characterSet) {
                ctx.fillText(char, mapping[char].x, mapping[char].y + fontSize * BASELINE_SCALE);
            }
        }
        return {
            scale: HEIGHT_SCALE,
            mapping,
            texture: new base.luma.Texture2D(gl, {
                pixels: canvas,
                // padding is added only between the characters but not for borders
                // enforce CLAMP_TO_EDGE to avoid any artifacts.
                parameters: {
                    [GL_TEXTURE_WRAP_S]: GL_CLAMP_TO_EDGE,
                    [GL_TEXTURE_WRAP_T]: GL_CLAMP_TO_EDGE
                }
            })
        };
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
    //adapted from https://github.com/uber/deck.gl/blob/6.4-release/modules/layers/src/text-layer/multi-icon-layer/multi-icon-layer-fragment.glsl.js
    var fs = `\
#define SHADER_NAME multi-icon-layer-fragment-shader

precision highp float;

uniform sampler2D iconsTexture;
uniform float buffer;
uniform bool sdf;

varying vec4 vColor;
varying vec2 vTextureCoords;
varying float vGamma;
varying vec4 vHighlightColor;

const float MIN_ALPHA = 0.05;

void main(void) {
  vec4 texColor = texture2D(iconsTexture, vTextureCoords);
  
  float alpha = texColor.a;

  // if enable sdf (signed distance fields)	
  if (sdf) {	
    float distance = texture2D(iconsTexture, vTextureCoords).a;	
    alpha = smoothstep(buffer - vGamma, buffer + vGamma, distance);	
  }

  // Take the global opacity and the alpha from vColor into account for the alpha component
  float a = alpha * vColor.a;

  if (picking_uActive) {

    // use picking color for entire rectangle
    gl_FragColor = vec4(picking_vRGBcolor_Aselected.rgb, 1.0);
  
  } else {

    if (a < MIN_ALPHA) {
      discard;
    } else {

      gl_FragColor = vec4(vColor.rgb, a);

      // use highlight color if this fragment belongs to the selected object.
      bool selected = bool(picking_vRGBcolor_Aselected.a);
      if (selected) {
        gl_FragColor = vec4(vHighlightColor.rgb, a);
      }
    }
  }
}
`;

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
    //adapted from https://github.com/uber/deck.gl/blob/6.4-release/modules/layers/src/text-layer/multi-icon-layer/multi-icon-layer-vertex.glsl.js
    var vs = `\
#define SHADER_NAME multi-icon-layer-vertex-shader

attribute vec2 positions;

attribute vec3 instancePositions;
attribute vec2 instancePositions64xyLow;
attribute float instanceSizes;
attribute float instanceAngles;
attribute vec4 instanceColors;
attribute vec3 instancePickingColors;
attribute vec4 instanceIconFrames;
attribute float instanceColorModes;
attribute vec2 instanceOffsets;

// the following three attributes are for the multi-icon layer
attribute vec2 instancePixelOffset;
attribute vec4 instanceHighlightColors;

uniform float sizeScale;
uniform vec2 iconsTextureDim;
uniform float gamma;
uniform float opacity;

varying float vColorMode;
varying vec4 vColor;
varying vec2 vTextureCoords;
varying float vGamma;
varying vec4 vHighlightColor;

vec2 rotate_by_angle(vec2 vertex, float angle) {
  float angle_radian = angle * PI / 180.0;
  float cos_angle = cos(angle_radian);
  float sin_angle = sin(angle_radian);
  mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
  return rotationMatrix * vertex;
}

void main(void) {
  vec2 iconSize = instanceIconFrames.zw;
  // scale icon height to match instanceSize
  float instanceScale = iconSize.y == 0.0 ? 0.0 : instanceSizes / iconSize.y;

  // scale and rotate vertex in "pixel" value and convert back to fraction in clipspace
  vec2 pixelOffset = positions / 2.0 * iconSize + instanceOffsets;

  pixelOffset = rotate_by_angle(pixelOffset, instanceAngles) * sizeScale * instanceScale;
  pixelOffset += instancePixelOffset;
  pixelOffset.y *= -1.0;

  gl_Position = project_position_to_clipspace(instancePositions, instancePositions64xyLow, vec3(0.0));
  gl_Position += project_pixel_to_clipspace(pixelOffset);

  vTextureCoords = mix(
    instanceIconFrames.xy,
    instanceIconFrames.xy + iconSize,
    (positions.xy + 1.0) / 2.0
  ) / iconsTextureDim;

  vTextureCoords.y = 1.0 - vTextureCoords.y;

  vColor = vec4(instanceColors.rgb, instanceColors.a * opacity) / 255.;
  vHighlightColor = vec4(instanceHighlightColors.rgb, instanceHighlightColors.a * opacity) / 255.;

  picking_setPickingColor(instancePickingColors);

  vGamma = gamma / (sizeScale * iconSize.y);
}
`;

    // Copyright (c) 2015 - 2017 Uber Technologies, Inc.
    // TODO expose as layer properties
    const DEFAULT_GAMMA = 0.2;
    const DEFAULT_BUFFER = 192.0 / 256;
    const defaultProps = {
        getShiftInQueue: { type: 'accessor', value: x => x.shift || 0 },
        getLengthOfQueue: { type: 'accessor', value: x => x.len || 1 },
        // 1: left, 0: middle, -1: right
        getAnchorX: { type: 'accessor', value: x => x.anchorX || 0 },
        // 1: top, 0: center, -1: bottom
        getAnchorY: { type: 'accessor', value: x => x.anchorY || 0 },
        getPixelOffset: { type: 'accessor', value: [0, 0] },
        // object with the same pickingIndex will be picked when any one of them is being picked
        getPickingIndex: { type: 'accessor', value: x => x.objectIndex }
    };
    //https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
    const UNSIGNED_BYTE = 0x1401;
    function _MultiIconLayer(...props) {
        class __MultiIconLayer extends base.layers.IconLayer {
            constructor(...props) {
                super(...arguments);
            }
            getShaders() {
                return Object.assign({}, super.getShaders(), {
                    vs,
                    fs
                });
            }
            initializeState() {
                super.initializeState();
                const attributeManager = this.getAttributeManager();
                attributeManager.addInstanced({
                    instancePixelOffset: {
                        size: 2,
                        transition: true,
                        accessor: 'getPixelOffset'
                    },
                    instanceHighlightColors: {
                        size: 4,
                        type: UNSIGNED_BYTE,
                        transition: true,
                        accessor: 'getHighlightColor',
                        defaultValue: [0, 255, 0, 255]
                    }
                });
            }
            updateState(updateParams) {
                super.updateState(updateParams);
                const { changeFlags } = updateParams;
                if (changeFlags.updateTriggersChanged &&
                    (changeFlags.updateTriggersChanged.getAnchorX || changeFlags.updateTriggersChanged.getAnchorY)) {
                    this.getAttributeManager().invalidate('instanceOffsets');
                }
            }
            draw({ uniforms }) {
                const { sdf } = this.props;
                super.draw({
                    uniforms: Object.assign({}, uniforms, {
                        // Refer the following doc about gamma and buffer
                        // https://blog.mapbox.com/drawing-text-with-signed-distance-fields-in-mapbox-gl-b0933af6f817
                        buffer: DEFAULT_BUFFER,
                        gamma: DEFAULT_GAMMA,
                        sdf: Boolean(sdf)
                    })
                });
            }
            calculateInstanceOffsets(attribute) {
                const { data, iconMapping, getIcon, getAnchorX, getAnchorY, getLengthOfQueue, getShiftInQueue } = this.props;
                const { value } = attribute;
                let i = 0;
                for (const object of data) {
                    const icon = getIcon(object);
                    const rect = iconMapping[icon] || {};
                    const len = getLengthOfQueue(object);
                    const shiftX = getShiftInQueue(object);
                    value[i++] = ((getAnchorX(object) - 1) * len) / 2 + rect.width / 2 + shiftX || 0;
                    value[i++] = (rect.height / 2) * getAnchorY(object) || 0;
                }
            }
            calculateInstancePickingColors(attribute) {
                const { data, getPickingIndex } = this.props;
                const { value } = attribute;
                let i = 0;
                const pickingColor = [];
                for (const point of data) {
                    const index = getPickingIndex(point);
                    this.encodePickingColor(index, pickingColor);
                    value[i++] = pickingColor[0];
                    value[i++] = pickingColor[1];
                    value[i++] = pickingColor[2];
                }
            }
        }
        __MultiIconLayer.layerName = 'MultiIconLayer';
        __MultiIconLayer.defaultProps = defaultProps;
        const instance = new __MultiIconLayer(...arguments);
        return instance;
    }
    //signature to allow this function to be used with the 'new' keyword.
    //need to trick the compiler by casting to 'any'.
    /**
     * CubeLayer - a Deck.gl layer to render cuboids.
     * This is instantiatable by calling `new MultiIconLayer()`.
     */
    const MultiIconLayer = _MultiIconLayer;

    // Copyright (c) 2015 - 2017 Uber Technologies, Inc.
    const TEXT_ANCHOR = {
        start: 1,
        middle: 0,
        end: -1
    };
    const ALIGNMENT_BASELINE = {
        top: 1,
        center: 0,
        bottom: -1
    };
    const DEFAULT_COLOR = [0, 0, 0, 255];
    const MISSING_CHAR_WIDTH = 32;
    const FONT_SETTINGS_PROPS = ['fontSize', 'buffer', 'sdf', 'radius', 'cutoff'];
    const defaultProps$1 = {
        fp64: false,
        sizeScale: 1,
        characterSet: DEFAULT_CHAR_SET,
        fontFamily: DEFAULT_FONT_FAMILY,
        fontWeight: DEFAULT_FONT_WEIGHT,
        fontSettings: {},
        getText: { type: 'accessor', value: x => x.text },
        getPosition: { type: 'accessor', value: x => x.position },
        getColor: { type: 'accessor', value: DEFAULT_COLOR },
        getSize: { type: 'accessor', value: 32 },
        getAngle: { type: 'accessor', value: 0 },
        getHighlightColor: { type: 'accessor', value: DEFAULT_COLOR },
        getTextAnchor: { type: 'accessor', value: 'middle' },
        getAlignmentBaseline: { type: 'accessor', value: 'center' },
        getPixelOffset: { type: 'accessor', value: [0, 0] }
    };
    function _ChromaticTextLayer(props) {
        class __ChromaticTextLayer extends base.deck.CompositeLayer {
            updateState({ props, oldProps, changeFlags }) {
                const fontChanged = this.fontChanged(oldProps, props);
                if (fontChanged) {
                    this.updateFontAtlas();
                }
                if (changeFlags.dataChanged ||
                    fontChanged ||
                    (changeFlags.updateTriggersChanged &&
                        (changeFlags.updateTriggersChanged.all || changeFlags.updateTriggersChanged.getText))) {
                    this.transformStringToLetters();
                }
            }
            updateFontAtlas() {
                const { gl } = this.context;
                const { fontSettings, fontFamily, fontWeight, characterSet } = this.props;
                const mergedFontSettings = Object.assign({}, DEFAULT_FONT_SETTINGS, fontSettings, {
                    fontFamily,
                    fontWeight,
                    characterSet
                });
                const { scale, mapping, texture } = makeFontAtlas(gl, mergedFontSettings);
                this.setState({
                    scale,
                    iconAtlas: texture,
                    iconMapping: mapping
                });
            }
            fontChanged(oldProps, props) {
                if (oldProps.fontFamily !== props.fontFamily ||
                    oldProps.characterSet !== props.characterSet ||
                    oldProps.fontWeight !== props.fontWeight) {
                    return true;
                }
                if (oldProps.fontSettings === props.fontSettings) {
                    return false;
                }
                const oldFontSettings = oldProps.fontSettings || {};
                const fontSettings = props.fontSettings || {};
                return FONT_SETTINGS_PROPS.some(prop => oldFontSettings[prop] !== fontSettings[prop]);
            }
            getPickingInfo({ info }) {
                // because `TextLayer` assign the same pickingInfoIndex for one text label,
                // here info.index refers the index of text label in props.data
                return Object.assign(info, {
                    // override object with original data
                    object: info.index >= 0 ? this.props.data[info.index] : null
                });
            }
            /* eslint-disable no-loop-func */
            transformStringToLetters() {
                const { data, getText } = this.props;
                const { iconMapping } = this.state;
                const transformedData = [];
                let objectIndex = 0;
                for (const val of data) {
                    const text = getText(val);
                    if (text) {
                        const letters = Array.from(text);
                        const offsets = [0];
                        let offsetLeft = 0;
                        letters.forEach((letter, i) => {
                            const datum = {
                                text: letter,
                                index: i,
                                offsets,
                                len: text.length,
                                // reference of original object and object index
                                object: val,
                                objectIndex
                            };
                            const frame = iconMapping[letter];
                            if (frame) {
                                offsetLeft += frame.width;
                            }
                            else {
                                //log.warn(`Missing character: ${letter}`)();
                                offsetLeft += MISSING_CHAR_WIDTH;
                            }
                            offsets.push(offsetLeft);
                            transformedData.push(datum);
                        });
                    }
                    objectIndex++;
                }
                this.setState({ data: transformedData });
            }
            /* eslint-enable no-loop-func */
            getLetterOffset(datum) {
                return datum.offsets[datum.index];
            }
            getTextLength(datum) {
                return datum.offsets[datum.offsets.length - 1];
            }
            _getAccessor(accessor) {
                if (typeof accessor === 'function') {
                    return x => accessor(x.object);
                }
                return accessor;
            }
            getAnchorXFromTextAnchor(getTextAnchor) {
                return x => {
                    const textAnchor = typeof getTextAnchor === 'function' ? getTextAnchor(x.object) : getTextAnchor;
                    if (!TEXT_ANCHOR.hasOwnProperty(textAnchor)) {
                        throw new Error(`Invalid text anchor parameter: ${textAnchor}`);
                    }
                    return TEXT_ANCHOR[textAnchor];
                };
            }
            getAnchorYFromAlignmentBaseline(getAlignmentBaseline) {
                return x => {
                    const alignmentBaseline = typeof getAlignmentBaseline === 'function'
                        ? getAlignmentBaseline(x.object)
                        : getAlignmentBaseline;
                    if (!ALIGNMENT_BASELINE.hasOwnProperty(alignmentBaseline)) {
                        throw new Error(`Invalid alignment baseline parameter: ${alignmentBaseline}`);
                    }
                    return ALIGNMENT_BASELINE[alignmentBaseline];
                };
            }
            renderLayers() {
                const { data, scale, iconAtlas, iconMapping } = this.state;
                const { getPosition, getColor, getSize, getAngle, getHighlightColor, getTextAnchor, getAlignmentBaseline, getPixelOffset, fp64, sdf, sizeScale, transitions, updateTriggers } = this.props;
                const SubLayerClass = this.getSubLayerClass('characters', MultiIconLayer);
                return new SubLayerClass({
                    sdf,
                    iconAtlas,
                    iconMapping,
                    getPosition: d => getPosition(d.object),
                    getColor: this._getAccessor(getColor),
                    getSize: this._getAccessor(getSize),
                    getAngle: this._getAccessor(getAngle),
                    getHighlightColor: this._getAccessor(getHighlightColor),
                    getAnchorX: this.getAnchorXFromTextAnchor(getTextAnchor),
                    getAnchorY: this.getAnchorYFromAlignmentBaseline(getAlignmentBaseline),
                    getPixelOffset: this._getAccessor(getPixelOffset),
                    fp64,
                    sizeScale: sizeScale * scale,
                    transitions: transitions && {
                        getPosition: transitions.getPosition,
                        getAngle: transitions.getAngle,
                        getHighlightColor: transitions.getHighlightColor,
                        getColor: transitions.getColor,
                        getSize: transitions.getSize,
                        getPixelOffset: updateTriggers.getPixelOffset
                    }
                }, this.getSubLayerProps({
                    id: 'characters',
                    updateTriggers: {
                        getPosition: updateTriggers.getPosition,
                        getAngle: updateTriggers.getAngle,
                        getHighlightColor: updateTriggers.getHighlightColor,
                        getColor: updateTriggers.getColor,
                        getSize: updateTriggers.getSize,
                        getPixelOffset: updateTriggers.getPixelOffset,
                        getAnchorX: updateTriggers.getTextAnchor,
                        getAnchorY: updateTriggers.getAlignmentBaseline
                    }
                }), {
                    data,
                    getIcon: d => d.text,
                    getShiftInQueue: d => this.getLetterOffset(d),
                    getLengthOfQueue: d => this.getTextLength(d)
                });
            }
        }
        __ChromaticTextLayer.layerName = 'TextLayer';
        __ChromaticTextLayer.defaultProps = defaultProps$1;
        const instance = new __ChromaticTextLayer(props);
        return instance;
    }
    //signature to allow this function to be used with the 'new' keyword.
    //need to trick the compiler by casting to 'any'.
    /**
     * TextLayer - a modification of deck.gl's TextLayer.
     * This is instantiatable by calling `new TextLayer()`.
     */
    const ChromaticTextLayer = _ChromaticTextLayer;

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    function concat(...args) {
        return args.reduce((p, c) => c ? p.concat(c) : p, []);
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
    var fs$1 = `\
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
    const lightSettings = {
        "2d": {},
        "3d": {
            lightsPosition: [-122.45, 37.66, 8000, -122.0, 38.0, 8000],
            ambientRatio: 0.3,
            diffuseRatio: 0.6,
            specularRatio: 0.4,
            lightsStrength: [0.3, 0.0, 0.8, 0.0],
            numberOfLights: 2
        }
    };
    const defaultPresenterStyle = {
        cssPrefix: 'vega-deckgl-',
        defaultCubeColor: [128, 128, 128, 171],
        highlightColor: [0, 0, 0, 255],
        lightSettings
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
    const defaultView = "2d";
    const min3dDepth = 0.05;

    // Copyright (c) 2015 - 2017 Uber Technologies, Inc.
    var vs$1 = `\
#define SHADER_NAME cube-layer-vertex-shader

attribute vec3 positions;
attribute vec3 normals;

attribute vec3 instancePositions;
attribute vec2 instancePositions64xyLow;
attribute vec3 instanceSizes;
attribute vec4 instanceColors;
attribute vec3 instancePickingColors;

// Custom uniforms
uniform float lightingMix;

// Result
varying vec4 vColor;

void main(void) {

  // if alpha == 0.0, do not render element
  float noRender = float(instanceColors.a == 0.0);
  float finalXScale = project_scale(instanceSizes.x) * mix(1.0, 0.0, noRender);
  float finalYScale = project_scale(instanceSizes.y) * mix(1.0, 0.0, noRender);
  float finalZScale = project_scale(instanceSizes.z) * mix(1.0, 0.0, noRender);

  // cube geometry vertics are between -1 to 1, scale and transform it to between 0, 1
  vec3 offset = vec3(
    (positions.x + 1.0) / 2.0 * finalXScale,
    (positions.y + 1.0) / 2.0 * finalYScale,
    (positions.z + 1.0) / 2.0 * finalZScale);

  // extrude positions
  vec4 position_worldspace;
  gl_Position = project_position_to_clipspace(instancePositions, instancePositions64xyLow, offset, position_worldspace);

  float lightWeight = 1.0;
  
  //allow for a small amount of error around the min3dDepth 
  if (instanceSizes.z >= ${min3dDepth} - 0.0001) {
    lightWeight = lighting_getLightWeight(
      position_worldspace.xyz, // the w component is always 1.0
      normals
    );
  }

  vec3 lightWeightedColor = lightWeight * instanceColors.rgb;
  vec3 mixedLight = mix(instanceColors.rgb, lightWeightedColor, lightingMix);
  vec4 color = vec4(mixedLight, instanceColors.a) / 255.0;
  vColor = color;

  // Set color to be rendered to picking fbo (also used to check for selection highlight).
  picking_setPickingColor(instancePickingColors);
}
`;

    // Copyright (c) 2015 - 2017 Uber Technologies, Inc.
    //https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
    const UNSIGNED_BYTE$1 = 0x1401;
    const DEFAULT_COLOR$1 = [255, 0, 255, 255];
    const defaultProps$2 = {
        lightingMix: 0.5,
        fp64: false,
        getSize: x => x.size,
        getPosition: x => x.position,
        getColor: x => x.color
    };
    function _CubeLayer(props) {
        //dynamic superclass, since we don't know have deck.Layer in the declaration phase
        class __CubeLayer extends base.deck.Layer {
            getShaders() {
                const projectModule = this.use64bitProjection() ? 'project64' : 'project32';
                return { vs: vs$1, fs: fs$1, modules: [projectModule, 'lighting', 'picking'] };
            }
            initializeState() {
                const attributeManager = this.getAttributeManager();
                attributeManager.addInstanced({
                    instancePositions: {
                        size: 3,
                        transition: true,
                        accessor: 'getPosition'
                    },
                    instancePositions64xyLow: {
                        size: 3,
                        accessor: 'getPosition',
                        update: this.calculateInstancePositions64xyLow
                    },
                    instanceSizes: {
                        size: 3,
                        transition: true,
                        accessor: 'getSize'
                    },
                    instanceColors: {
                        size: 4,
                        type: UNSIGNED_BYTE$1,
                        transition: true,
                        accessor: 'getColor',
                        defaultValue: DEFAULT_COLOR$1
                    }
                });
            }
            updateState({ props, oldProps, changeFlags }) {
                super.updateState({ props, oldProps, changeFlags }); //TODO add parameter type to deck.gl-typings
                // Re-generate model if geometry changed
                if (props.fp64 !== oldProps.fp64) {
                    const { gl } = this.context;
                    if (this.state.model) {
                        this.state.model.delete();
                    }
                    this.setState({ model: this._getModel(gl) });
                    this.getAttributeManager().invalidateAll();
                }
            }
            _getModel(gl) {
                return new base.luma.Model(gl, Object.assign({}, this.getShaders(), {
                    id: this.props.id,
                    geometry: new base.luma.CubeGeometry(),
                    isInstanced: true,
                    shaderCache: this.context.shaderCache
                }));
            }
            draw({ uniforms }) {
                let { lightingMix } = this.props;
                if (this.props.interpolator && this.props.interpolator.layerInterpolatedProps) {
                    lightingMix = this.props.interpolator.layerInterpolatedProps.lightingMix;
                }
                this.state.model.render(Object.assign({}, uniforms, {
                    lightingMix
                }));
            }
            calculateInstancePositions64xyLow(attribute) {
                const isFP64 = this.use64bitPositions();
                attribute.constant = !isFP64;
                if (!isFP64) {
                    attribute.value = new Float32Array(2);
                    return;
                }
                const { data, getPosition } = this.props;
                const { value } = attribute;
                let i = 0;
                for (const point of data) {
                    const position = getPosition(point);
                    value[i++] = base.luma.fp64.fp64LowPart(position[0]);
                    value[i++] = base.luma.fp64.fp64LowPart(position[1]);
                }
            }
        }
        __CubeLayer.layerName = 'CubeLayer';
        __CubeLayer.defaultProps = defaultProps$2;
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

    var pi = Math.PI;

    function expInOut(t) {
      return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
    }

    var tau = 2 * Math.PI;

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getLayers(presenter, config, stage, lightSettings, lightingMix, interpolator, guideLines) {
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
                if (f.facetTitle)
                    texts.push(f.facetTitle);
            });
        }
        const lineLayer = newLineLayer(layerNames.lines, lines);
        const textLayer = newTextLayer(presenter, layerNames.text, texts, config, presenter.style.fontFamily);
        return [textLayer, cubeLayer, lineLayer];
    }
    function newCubeLayer(presenter, config, cubeData, highlightColor, lightSettings, lightingMix, interpolator) {
        const getPosition = getTiming(config.transitionDurations.position, expInOut);
        const getSize = getTiming(config.transitionDurations.size, expInOut);
        const getColor = getTiming(config.transitionDurations.color);
        const cubeLayerProps = {
            interpolator,
            lightingMix,
            id: layerNames.cubes,
            data: cubeData,
            coordinateSystem: base.deck.COORDINATE_SYSTEM.IDENTITY,
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
            lightSettings,
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
            coordinateSystem: base.deck.COORDINATE_SYSTEM.IDENTITY,
            getColor: (o) => o.color,
            getStrokeWidth: (o) => o.strokeWidth
        });
    }
    function newTextLayer(presenter, id, data, config, fontFamily) {
        const props = {
            id,
            data,
            coordinateSystem: base.deck.COORDINATE_SYSTEM.IDENTITY,
            autoHighlight: true,
            pickable: true,
            getHighlightColor: config.getTextHighlightColor || (o => o.color),
            onClick: (o, e) => {
                config.onTextClick && config.onTextClick(e && e.srcEvent, o.object);
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
                fontSize: 128
            }
        };
        if (fontFamily) {
            props.fontFamily = fontFamily;
        }
        return new ChromaticTextLayer(props);
    }
    function getTiming(duration, easing) {
        let timing;
        if (duration) {
            timing = {
                duration
            };
            if (easing) {
                timing.easing = easing;
            }
        }
        return timing;
    }
    function getCubeLayer(deckProps) {
        return deckProps.layers.filter(layer => layer.id === layerNames.cubes)[0];
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
        addDiv: addDiv,
        addEl: addEl,
        clone: clone,
        colorFromString: colorFromString,
        colorIsEqual: colorIsEqual,
        colorToString: colorToString,
        deepMerge: deepMerge,
        getCubeLayer: getCubeLayer,
        getCubes: getCubes,
        outerSize: outerSize
    });

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const markStager = (options, stage, scene, x, y, groupType) => {
        base.vega.sceneVisit(scene, function (item) {
            var x1, y1, x2, y2;
            x1 = item.x || 0;
            y1 = item.y || 0;
            x2 = item.x2 != null ? item.x2 : x1;
            y2 = item.y2 != null ? item.y2 : y1;
            const lineItem = styledLine(x1 + x - options.offsetX, y1 + y - options.offsetY, x2 + x - options.offsetX, y2 + y - options.offsetY, item.stroke, item.strokeWidth);
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
            strokeWidth: strokeWidth * 10 //translate width to deck.gl
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
    // Licensed under the MIT license.
    /**
     * HTML elements outputted by the presenter.
     */
    var PresenterElement;
    (function (PresenterElement) {
        PresenterElement[PresenterElement["root"] = 0] = "root";
        PresenterElement[PresenterElement["gl"] = 1] = "gl";
        PresenterElement[PresenterElement["panel"] = 2] = "panel";
        PresenterElement[PresenterElement["legend"] = 3] = "legend";
        PresenterElement[PresenterElement["vegaControls"] = 4] = "vegaControls";
    })(PresenterElement || (PresenterElement = {}));

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function initializePanel(presenter) {
        const rootDiv = (createElement("div", { className: className(PresenterElement.root, presenter) },
            createElement("div", { className: className(PresenterElement.gl, presenter), style: { minHeight, minWidth } }),
            createElement("div", { className: className(PresenterElement.panel, presenter) },
                createElement("div", { className: className(PresenterElement.vegaControls, presenter) }),
                createElement("div", { className: className(PresenterElement.legend, presenter) }))));
        mount(rootDiv, presenter.el);
    }
    function className(type, presenter) {
        return `${presenter.style.cssPrefix}${PresenterElement[type]}`;
    }

    function createOrbitControllerClass(factoryOptions) {
        function wrapper(props) {
            class OrbitControllerInternal extends base.deck._OrbitController {
                constructor(props) {
                    super(props);
                    this.invertPan = true;
                }
                _onDoubleTap(event) {
                    if (factoryOptions && factoryOptions.doubleClickHandler) {
                        factoryOptions.doubleClickHandler(event, this);
                    }
                    else {
                        super._onDoubleTap(event);
                    }
                }
                _onPanRotate(event) {
                    if (!this.dragRotate) {
                        return false;
                    }
                    return this._onPanRotateStandard(event);
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
                constructor(props = {}) {
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
        sorted.forEach(i => addRow(props.legend.rows[i], +i));
        if (sorted.length) {
            return (createElement(Table, { rows: rows, rowClassName: "legend-row", onRowClick: (e, i) => props.onClick(e, props.legend, i) }, props.legend.title !== void 0 && createElement("tr", { onClick: e => props.onClick(e, props.legend, null) },
                createElement("th", { colSpan: 2 }, props.legend.title))));
        }
    };
    const symbolMap = {
        'square': function (symbol) {
            return (createElement("div", { style: {
                    height: `${symbol.bounds.y2 - symbol.bounds.y1}px`,
                    width: `${symbol.bounds.x2 - symbol.bounds.x1}px`,
                    backgroundColor: symbol.fill,
                    borderColor: symbol.fill
                } }));
        }
    };

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
            row.label = row.value = label.text;
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
        let i = 0;
        base.vega.sceneVisit(scene, function (item) {
            //for orthographic (2d) - always use 0 or else Deck will not show them
            const z = stage.view === "2d" ? 0 : (item.z || 0);
            const depth = (stage.view === "2d" ? 0 : (item.depth || 0)) + min3dDepth;
            //change direction of y from SVG to GL
            const ty = -1;
            let ordinal = i;
            if (item.datum.GL_ORDINAL !== void 0) {
                options.ordinalsSpecified = true;
                ordinal = item.datum.GL_ORDINAL;
                if (ordinal > options.maxOrdinal) {
                    options.maxOrdinal = ordinal;
                }
            }
            const cube = {
                ordinal,
                size: [item.width, item.height, depth],
                position: [x + (item.x || 0) - options.offsetX, ty * (y + (item.y || 0) - options.offsetY) - item.height, z],
                color: item.fill ? colorFromString(item.fill) : [128, 128, 128, 128]
            };
            stage.cubeData.push(cube);
            i++;
        });
    };

    const markStager$3 = (options, stage, scene, x, y, groupType) => {
        //scale Deck.Gl text to Vega size
        const fontScale = 6;
        //Deck.gl centers text on Y. TODO: is this correct on x axis?
        const offsetYCenter = 16;
        //change direction of y from SVG to GL
        const ty = -1;
        base.vega.sceneVisit(scene, function (item) {
            if (!item.text)
                return;
            const size = item.fontSize * fontScale;
            const textItem = {
                color: colorFromString(item.fill),
                text: item.text.toString(),
                position: [x + item.x - options.offsetX, ty * (y + item.y + offsetYCenter - options.offsetY), 0],
                size,
                angle: convertAngle(item.angle),
                textAnchor: convertAlignment(item.align),
                alignmentBaseline: convertBaseline(item.baseline)
            };
            if (item.mark.role === 'axis-label') {
                const tickText = textItem;
                tickText.value = item.datum['value'];
                options.currAxis.tickText.push(tickText);
            }
            else if (item.mark.role === 'axis-title') {
                options.currAxis.title = textItem;
            }
            else if (options.currFacetRect && !options.currFacetRect.facetTitle) {
                options.currFacetRect.facetTitle = textItem;
            }
            else {
                stage.textData.push(textItem);
            }
        });
    };
    function convertAngle(vegaTextAngle) {
        return 360 - vegaTextAngle;
    }
    function convertAlignment(textAlign) {
        switch (textAlign) {
            case 'center': return 'middle';
            case 'left': return 'start';
            case 'right': return 'end';
        }
    }
    function convertBaseline(baseline) {
        switch (baseline) {
            case 'middle': return 'center';
        }
        return baseline;
    }

    var GroupType;
    (function (GroupType) {
        GroupType[GroupType["none"] = 0] = "none";
        GroupType[GroupType["legend"] = 1] = "legend";
        GroupType[GroupType["xAxis"] = 2] = "xAxis";
        GroupType[GroupType["yAxis"] = 3] = "yAxis";
    })(GroupType || (GroupType = {}));

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function convertGroupRole(group) {
        if (group.mark.role === "legend")
            return GroupType.legend;
        if (group.mark.role === "axis") {
            var vegaAxisDatum = group.datum;
            if (vegaAxisDatum) {
                switch (vegaAxisDatum.orient) {
                    case "bottom":
                    case "top":
                        return GroupType.xAxis;
                    case "left":
                    case "right":
                        return GroupType.yAxis;
                }
            }
        }
    }
    const group = (options, stage, scene, x, y, groupType) => {
        base.vega.sceneVisit(scene, function (g) {
            if (g.bounds.x1 < options.offsetX) {
                options.offsetX = g.bounds.x1;
            }
            if (g.bounds.y1 < options.offsetY) {
                options.offsetY = g.bounds.y1;
            }
            const gx = g.x || 0, gy = g.y || 0;
            if (g.context && g.context.background && !stage.backgroundColor) {
                stage.backgroundColor = colorFromString(g.context.background);
            }
            if (g.stroke) {
                const facetRect = {
                    lines: box(gx + x - options.offsetX, gy + y - options.offsetY, g.height, g.width, g.stroke, groupStrokeWidth)
                };
                stage.facets.push(facetRect);
                options.currFacetRect = facetRect;
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
            markStager$1(options, stage, scene, x, y, groupType);
        }
        else {
            var markStager$$1 = markStagers[scene.marktype];
            if (markStager$$1) {
                markStager$$1(options, stage, scene, x, y, groupType);
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

    const viewStateProps = ['distance', 'fov', 'lookAt', 'rotationOrbit', 'rotationX', 'zoom'];
    function targetViewState(height, width, view) {
        const distance = 10;
        const fov = 60;
        const lookAt = [width / 2, -height / 2, 0];
        //add a 4th dimension to make transitions work
        lookAt.push(1);
        if (view === '2d') {
            return {
                distance,
                fov,
                lookAt,
                rotationOrbit: 0,
                rotationX: 0,
                zoom: 10 / height
            };
        }
        else {
            return {
                distance,
                fov,
                lookAt,
                rotationOrbit: -25,
                rotationX: 60,
                zoom: 9 / height
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
                offsetX: 0,
                offsetY: 0,
                maxOrdinal: -1,
                ordinalsSpecified: false,
                currAxis: null,
                currFacetRect: null
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
                const deckProps = {
                    onLayerClick: config && config.onLayerClick,
                    views: [new base.deck.OrbitView({ controller: this.OrbitControllerClass })],
                    container: this.getElement(PresenterElement.gl),
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
                    deckProps.style = { "background-color": colorToString(stage.backgroundColor) };
                }
                this.deckgl = new classes.DeckGL_Class(deckProps);
            }
            let cubeCount = Math.max(this._last.cubeCount, stage.cubeData.length);
            if (options.ordinalsSpecified) {
                cubeCount = Math.max(cubeCount, options.maxOrdinal + 1);
                const empty = {
                    isEmpty: true,
                    color: [0, 0, 0, 0] // possibly a bug in Deck.gl? set color to invisible.
                };
                stage.cubeData = patchCubeArray(cubeCount, empty, stage.cubeData);
            }
            this.setDeckProps(stage, height, width, cubeCount, config);
            mount(LegendView({ legend: stage.legend, onClick: config && config.onLegendClick }), this.getElement(PresenterElement.legend));
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
            const newStage = Object.assign({}, this._last.stage, stage);
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
            let lightSettings = this.style.lightSettings[stage.view];
            let lightingMix = stage.view === '3d' ? 1.0 : 0.0;
            let linearInterpolator;
            //choose the current OrbitView viewstate if possible
            let viewState = (this.deckgl.viewState && Object.keys(this.deckgl.viewState).length && this.deckgl.viewState.OrbitView)
                //otherwise use the initial viewstate if any
                || this.deckgl.props.viewState;
            if (!viewState || newBounds || config.shouldViewstateTransition && config.shouldViewstateTransition()) {
                viewState = targetViewState(height, width, stage.view);
                const oldCubeLayer = getCubeLayer(this.deckgl.props);
                if (oldCubeLayer) {
                    linearInterpolator = new LinearInterpolator(viewStateProps);
                    linearInterpolator.layerStartProps = { lightingMix: oldCubeLayer.props.lightingMix };
                    linearInterpolator.layerEndProps = { lightingMix };
                    viewState.transitionDuration = config.transitionDurations.view;
                    viewState.transitionEasing = expInOut;
                    viewState.transitionInterpolator = linearInterpolator;
                }
                if (stage.view === '2d') {
                    lightSettings = this.style.lightSettings['3d'];
                }
            }
            const guideLines = this._showGuides && box(0, 0, height, width, '#0f0', 1, true);
            config.preLayer && config.preLayer(stage);
            const layers = getLayers(this, config, stage, lightSettings, lightingMix, linearInterpolator, guideLines);
            const deckProps = {
                views: [new base.deck.OrbitView({ controller: this.OrbitControllerClass })],
                viewState,
                layers
            };
            if (config && config.preStage) {
                config.preStage(stage, deckProps);
            }
            this.deckgl.setProps(deckProps);
            delete stage.cubeData;
            this._last = {
                cubeCount,
                height,
                width,
                stage: stage,
                view: stage.view
            };
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
                views: this.deckgl.props.views,
                viewState,
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
            this.getElement(PresenterElement.gl).classList.add('show-center');
            this.rePresent(Object.assign({}, this._last.stage, { cubeData: this.getCubeData() }));
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
                super.initialize(this.presenter.getElement(PresenterElement.vegaControls));
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

    // Copyright (c) Microsoft Corporation. All rights reserved.

    var index$2 = /*#__PURE__*/Object.freeze({
        constants: constants$1,
        controls: controls,
        types: types$1,
        util: util,
        base: base,
        use: use,
        Presenter: Presenter,
        ViewGl: ViewGl,
        get PresenterElement () { return PresenterElement; }
    });

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function isQuantitative(column) {
        return column.type === 'number' || column.type === 'integer';
    }
    /**
     * Derive column metadata from the data array.
     * @param data Array of data objects.
     */
    function getColumnsFromData(data, columnTypes) {
        const sample = data[0];
        const fields = sample ? Object.keys(sample) : [];
        const inferences = Object.assign({}, base.vega.inferTypes(data, fields), columnTypes);
        const columns = fields.map(name => {
            const column = {
                name,
                type: inferences[name]
            };
            return column;
        });
        inferAll(columns, data);
        return columns;
    }
    /**
     * Populate columns with type inferences and stats.
     * @param columns Array of columns.
     * @param data Array of data objects.
     */
    function inferAll(columns, data) {
        columns.forEach(column => {
            if (column) {
                if (typeof column.quantitative !== 'boolean') {
                    column.quantitative = isQuantitative(column);
                }
                if (!column.stats) {
                    column.stats = getStats(data, column);
                }
            }
        });
    }
    function getStats(data, column) {
        const distinctMap = {};
        const stats = {
            distinctValueCount: null,
            max: null,
            mean: null,
            min: null
        };
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            let value = row[column.name];
            distinctMap[value] = true;
            if (stats.max === null || value > stats.max) {
                stats.max = value;
            }
            if (stats.min === null || value < stats.min) {
                stats.min = value;
            }
            let num = +value;
            if (!isNaN(num)) {
                sum += num;
            }
        }
        if (column.quantitative) {
            stats.mean = data.length > 0 && (sum / data.length);
            stats.hasNegative = detectNegative(column, data);
            if (column.type === 'integer') {
                stats.isSequential = detectSequentialColumn(column, data);
            }
        }
        stats.distinctValueCount = Object.keys(distinctMap).length;
        return stats;
    }
    function detectNegative(column, data) {
        for (let i = 1; i < data.length; i++) {
            if (data[i][column.name] < 0)
                return true;
        }
        return false;
    }
    function detectSequentialColumn(column, data) {
        if (data.length < 2)
            return false;
        let colname = column.name;
        for (let i = 1; i < data.length; i++) {
            if (data[i][colname] !== data[i - 1][colname] + 1)
                return false;
        }
        return true;
    }

    const defaultViewerOptions = {
        colors: {
            activeCube: [128, 0, 128, 255],
            defaultCube: defaultPresenterStyle.defaultCubeColor,
            hoveredCube: defaultPresenterStyle.highlightColor,
            selectedCube: [255, 255, 0, 255],
            axisSelectHighlight: [128, 128, 128, 128],
            axisLine: [0, 0, 0, 255],
            axisText: [0, 0, 0, 255],
            cellFillerLine: [128, 128, 128, 255],
            unselectedColorMethod: (color) => {
                const c = desaturate(color, 0.05);
                c[3] = 171;
                return c;
            }
        },
        language: {
            headers: {
                chart: 'Chart',
                details: 'Details',
                legend: 'Legend',
                selection: 'Select & Filter'
            },
            bing: 'bing',
            newColorMap: 'remap color to filtered items',
            oldColorMap: 'keep same colors',
            deselect: 'deselect',
            exclude: 'exclude',
            isolate: 'isolate',
            legendOther: 'other',
            nextDetail: '>',
            previousDetail: '<',
            reset: 'reset',
            colorBinCount: 'Color bin count',
            colorReverse: 'Color reverse',
            count: 'Count',
            scatterPointSize: 'Point size',
            XBinSize: 'X axis bin size',
            YBinSize: 'Y axis bin size',
            XGridSize: 'X grid size',
            YGridSize: 'Y grid size',
            InnerPaddingSize: 'Inner padding size',
            OuterPaddingSize: 'Outer padding size',
            treeMapMethod: 'Method',
            facetColumns: 'Facet columns',
            facetRows: 'Facet rows',
            textScaleSignal: "Text scale",
            xAxisTextAngleSignal: "X axis text angle",
            yAxisTextAngleSignal: "Y axis text angle",
            zScaleProportion: "Z scale proportion to Y",
            selectionCount: count => `${count} items selected`
        },
        maxLegends: 19,
        onError: (errors) => {
            //console.log(`UnitVisViewer errors: ${errors.join('\n')}`);
        },
        transitionDurations: Object.assign({}, defaultPresenterConfig.transitionDurations, { scope: 600 }),
        selectionPolygonZ: -1,
        tickSize: 10,
        facetMargins: {
            column: 40,
            row: 40,
            title: 40
        }
    };
    function getPresenterStyle(options) {
        var style = {
            cssPrefix,
            fontFamily: options.fontFamily,
            defaultCubeColor: options.colors.defaultCube
        };
        if (options.colors.hoveredCube) {
            style.highlightColor = options.colors.hoveredCube;
        }
        if (options.lightSettings) {
            style.lightSettings = options.lightSettings;
        }
        return style;
    }
    const cssPrefix = 'sanddance-';
    const dualColorSchemeColors = {
        black: '#212121',
        gray: '#D2D2D2',
        blue: '#0060F0',
        green: '#00C000',
        orange: '#FF9900',
        red: '#E00000'
    };

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function isInternalFieldName(columnName, includeVegaDeckGLFields = false) {
        if (includeVegaDeckGLFields) {
            if (columnName === GL_ORDINAL)
                return true;
        }
        for (let f in FieldNames) {
            if (columnName === FieldNames[f])
                return true;
        }
        return false;
    }

    var util$1 = /*#__PURE__*/Object.freeze({
        isInternalFieldName: isInternalFieldName,
        getColumnsFromData: getColumnsFromData,
        inferAll: inferAll,
        ensureSearchExpressionGroupArray: ensureSearchExpressionGroupArray,
        getPresenterStyle: getPresenterStyle
    });

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const dualPairs = [
        [dualColorSchemeColors.black, dualColorSchemeColors.gray],
        [dualColorSchemeColors.red, dualColorSchemeColors.green],
        [dualColorSchemeColors.red, dualColorSchemeColors.blue],
        [dualColorSchemeColors.black, dualColorSchemeColors.red],
        [dualColorSchemeColors.black, dualColorSchemeColors.orange],
        [dualColorSchemeColors.black, dualColorSchemeColors.green]
    ];
    /**
     * Array of color schemes.
     */
    const colorSchemes = [
        {
            scheme: ColorScaleNone,
            colors: [colorToString(defaultViewerOptions.colors.defaultCube)]
        }
    ];
    createDualColorSchemes();
    function registerColorSchemes(vega) {
        colorSchemes.forEach(cs => {
            if (cs.colors.length === 1) {
                vega.scheme(cs.scheme, x => cs.colors[0]);
            }
            else {
                vega.scheme(cs.scheme, cs.colors);
            }
        });
    }
    function createPair(names, colors) {
        const scheme = `dual_${names[0]}${names[1]}`;
        colorSchemes.push({ scheme, colors });
    }
    function createDualColorSchemes() {
        dualPairs.forEach(colors => {
            const names = colors.map(color => {
                for (let key in dualColorSchemeColors)
                    if (color === dualColorSchemeColors[key])
                        return key;
            });
            createPair(names, colors);
            createPair([...names].reverse(), [...colors].reverse());
        });
    }

    var DataLayoutChange;
    (function (DataLayoutChange) {
        DataLayoutChange[DataLayoutChange["same"] = 0] = "same";
        DataLayoutChange[DataLayoutChange["reset"] = 1] = "reset";
        DataLayoutChange[DataLayoutChange["refine"] = 2] = "refine";
    })(DataLayoutChange || (DataLayoutChange = {}));
    class Animator {
        constructor(dataScope, props) {
            this.dataScope = dataScope;
            this.props = props;
        }
        select(search) {
            return new Promise((resolve, reject) => {
                this.dataScope.select(search);
                this.props.onDataChanged(DataLayoutChange.same);
                resolve();
            });
        }
        deselect() {
            return new Promise((resolve, reject) => {
                this.dataScope.deselect();
                this.props.onDataChanged(DataLayoutChange.same);
                resolve();
            });
        }
        filter(search, keepData, collapseData) {
            this.dataScope.collapse(true, collapseData);
            return new Promise((resolve, reject) => {
                this.props.onAnimateDataChange(DataLayoutChange.refine, 'before refine', 'refine').then(() => {
                    this.dataScope.deselect();
                    this.dataScope.filteredData = keepData;
                    this.props.onDataChanged(DataLayoutChange.refine, search);
                    resolve();
                }).catch(reject);
            });
        }
        reset() {
            return new Promise((resolve, reject) => {
                this.dataScope.deselect();
                this.dataScope.filteredData = null;
                this.props.onAnimateDataChange(DataLayoutChange.reset, 'before reset', 'reset').then(() => {
                    this.dataScope.collapse(false);
                    this.props.onDataChanged(DataLayoutChange.reset);
                    resolve();
                }).catch(reject);
            });
        }
        activate(datum) {
            return new Promise((resolve, reject) => {
                this.dataScope.activate(datum);
                this.props.onDataChanged(DataLayoutChange.same);
                resolve();
            });
        }
        deactivate() {
            return new Promise((resolve, reject) => {
                this.dataScope.deactivate();
                this.props.onDataChanged(DataLayoutChange.same);
                resolve();
            });
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getSelectedColorMap(currentData, showSelectedData, showActive, viewerOptions) {
        function getSelectionColorItem(datum) {
            let item;
            if (showSelectedData) {
                item = datum[FieldNames.Selected] ?
                    { color: viewerOptions.colors.selectedCube }
                    :
                        { unSelected: true };
            }
            if (showActive && datum[FieldNames.Active]) {
                item = { color: viewerOptions.colors.activeCube };
            }
            return item;
        }
        const colorMap = {};
        currentData.forEach(datum => {
            const selectionColor = getSelectionColorItem(datum);
            if (selectionColor) {
                const ordinal = datum[GL_ORDINAL];
                colorMap[ordinal] = selectionColor;
            }
        });
        return colorMap;
    }
    function colorMapFromCubes(cubes) {
        const map = {};
        cubes.forEach(cube => {
            map[cube.ordinal] = { color: cube.color };
        });
        return map;
    }
    function populateColorContext(colorContext, presenter) {
        if (!colorContext.colorMap) {
            const cubes = presenter.getCubeData();
            colorContext.colorMap = colorMapFromCubes(cubes);
        }
        colorContext.legend = clone(presenter.stage.legend);
        colorContext.legendElement = presenter.getElement(PresenterElement.legend).children[0];
    }
    function applyColorMapToCubes(maps, cubes, unselectedColorMethod) {
        Object.keys(maps[0]).forEach(ordinal => {
            const cube = cubes[+ordinal];
            if (cube && !cube.isEmpty) {
                const actualColorMappedItem = maps[0][ordinal];
                if (maps.length > 1) {
                    const selectedColorMappedItem = maps[1][ordinal];
                    if (selectedColorMappedItem) {
                        if (selectedColorMappedItem.unSelected && unselectedColorMethod) {
                            cube.color = unselectedColorMethod(actualColorMappedItem.color);
                        }
                        else {
                            cube.color = selectedColorMappedItem.color;
                        }
                        return;
                    }
                }
                cube.color = actualColorMappedItem.color;
            }
        });
    }

    function applySignalValues(sv, b) {
        if (!sv || !b || !b.signals || !b.signals.length)
            return;
        for (let key in sv) {
            let value = sv[key];
            let signalB = b.signals.filter(signal => signal.name === key)[0];
            if (signalB && signalB.bind) {
                signalB.value = value;
            }
        }
    }
    function extractSignalValuesFromView(view, spec) {
        if (!view || !spec || !spec.signals || !spec.signals.length)
            return;
        const result = {};
        spec.signals.forEach((signalA) => {
            //bound to a UI control
            if (signalA.bind) {
                try {
                    result[signalA.name] = view.signal(signalA.name);
                }
                catch (e) { }
            }
        });
        return result;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function assignOrdinals(columns, data, ordinalMap) {
        const uCol = columns.uid && columns.uid.name;
        if (ordinalMap) {
            data.forEach((d, i) => {
                const key = uCol ? d[uCol] : i;
                d[GL_ORDINAL] = ordinalMap[key];
            });
        }
        else {
            ordinalMap = {};
            data.forEach((d, i) => {
                d[GL_ORDINAL] = i;
                const uColValue = uCol ? d[uCol] : i;
                ordinalMap[uColValue] = i;
            });
        }
        return ordinalMap;
    }
    function getSpecColumns(insight, columns) {
        function getColumnByName(name) {
            return columns.filter(c => c.name === name)[0];
        }
        return {
            color: getColumnByName(insight.columns && insight.columns.color),
            facet: getColumnByName(insight.columns && insight.columns.facet),
            group: getColumnByName(insight.columns && insight.columns.group),
            size: getColumnByName(insight.columns && insight.columns.size),
            sort: getColumnByName(insight.columns && insight.columns.sort),
            uid: getColumnByName(insight.columns && insight.columns.uid),
            x: getColumnByName(insight.columns && insight.columns.x),
            y: getColumnByName(insight.columns && insight.columns.y),
            z: getColumnByName(insight.columns && insight.columns.z)
        };
    }
    function getDataIndexOfCube(cube, data) {
        const len = data.length;
        for (let i = 0; i < len; i++) {
            if (data[i][GL_ORDINAL] === cube.ordinal) {
                return i;
            }
        }
    }

    const FacetColumnsSequence = "FacetColumnsSequence";
    const FacetRowsSequence = "FacetRowsSequence";
    const SequenceNumber = "SequenceNumber";
    const CellTitle = "CellTitle";
    const CellFiller = "CellFiller";
    const facetTitleSeparator = ' - ';
    function facetSignals(facets, specViewOptions) {
        const signals = [
            {
                "name": SignalNames.FacetColumns,
                "value": facets.columns,
            },
            {
                "name": SignalNames.FacetRows,
                "value": facets.rows,
            }
        ];
        return signals;
    }
    function checkForFacetErrors(facets, errors) {
        if (facets) {
            const gridCapacity = facets.columns * facets.rows;
            if (!gridCapacity) {
                errors.push('Must set facets columns & rows to non-zero.');
            }
            if (gridCapacity < 2) {
                errors.push('Not enough facets to facet.');
            }
            if (!facets.columns || facets.columns < 1) {
                errors.push('Facet column columns must be greater than 1.');
            }
            if (!facets.rows || facets.rows < 1) {
                errors.push('Facet column rows must be greater than 1.');
            }
        }
    }
    function facetSize(facets, size, specViewOptions) {
        return {
            height: (size.height - (facets.rows + 1) * (specViewOptions.tickSize + specViewOptions.facetMargins.column)) / facets.columns,
            width: (size.width - (facets.columns + 1) * (specViewOptions.tickSize + specViewOptions.facetMargins.row)) / facets.rows,
        };
    }
    function layout(specViewOptions) {
        const layout = {
            "columns": {
                "signal": SignalNames.FacetColumns
            },
            "bounds": "full",
            "padding": {
                "column": specViewOptions.facetMargins.column,
                "row": specViewOptions.facetMargins.row
            }
        };
        return layout;
    }
    function facetBinStep(facetColumn, facetCount) {
        const range = facetColumn.stats.max - facetColumn.stats.min;
        return range / facetCount;
    }
    function emptyBinsDataSource(name, facetColumn, facets) {
        const gridCapacity = facets.columns * facets.rows;
        const step = facetBinStep(facetColumn, gridCapacity);
        const steps = [];
        for (let i = 0; i < gridCapacity; i++) {
            steps[i] = facetColumn.stats.min + i * step + step / 2;
        }
        const values = steps.map(s => {
            const obj = {};
            obj[FieldNames.Collapsed] = true;
            obj[facetColumn.name] = s;
            return obj;
        });
        const data = { name, values };
        return data;
    }
    function facetSourceData(facetColumn, facets, name) {
        let data;
        if (facetColumn && facetColumn.quantitative) {
            data = [
                {
                    "name": DataNames.Pre
                },
                emptyBinsDataSource(DataNames.EmptyBin, facetColumn, facets),
                {
                    name,
                    "source": [DataNames.Pre, DataNames.EmptyBin]
                }
            ];
        }
        else {
            data = [{ name }];
        }
        return data;
    }
    function facetGroupData(source) {
        const data = [
            {
                "name": DataNames.FacetCellTitles,
                source,
                "transform": [
                    {
                        "type": "aggregate",
                        "groupby": [CellTitle]
                    }
                ]
            },
            {
                "name": CellFiller,
                "transform": [
                    {
                        "type": "sequence",
                        "start": 0,
                        "step": 1,
                        "stop": { "signal": `${SignalNames.FacetColumns} * ${SignalNames.FacetRows} - length(data('${DataNames.FacetCellTitles}'))` }
                    }
                ]
            },
            {
                "name": FacetColumnsSequence,
                "transform": [
                    {
                        "type": "sequence",
                        "start": 0,
                        "stop": {
                            "signal": SignalNames.FacetColumns
                        },
                        "as": SequenceNumber
                    }
                ]
            },
            {
                "name": FacetRowsSequence,
                "transform": [
                    {
                        "type": "sequence",
                        "start": 0,
                        "stop": {
                            "signal": SignalNames.FacetRows
                        },
                        "as": SequenceNumber
                    }
                ]
            }
        ];
        return data;
    }
    function facetTransforms(facetColumn, facets) {
        let transforms;
        if (facetColumn.quantitative) {
            const gridCapacity = facets.columns * facets.rows;
            const step = facetBinStep(facetColumn, gridCapacity);
            transforms = [
                {
                    "type": "bin",
                    "field": facetColumn.name,
                    step,
                    nice: false,
                    "extent": [facetColumn.stats.min, facetColumn.stats.max],
                    "as": [
                        FieldNames.FacetBin0,
                        FieldNames.FacetBin1
                    ]
                },
                {
                    "type": "collect",
                    "sort": {
                        "field": FieldNames.FacetBin0
                    }
                },
                {
                    "type": "formula",
                    "expr": `format(datum.${FieldNames.FacetBin0}, '~r') + '${facetTitleSeparator}' + format(datum.${FieldNames.FacetBin1}, '~r')`,
                    "as": CellTitle
                }
            ];
        }
        else {
            transforms = [
                {
                    "type": "formula",
                    "expr": `datum[${JSON.stringify(facetColumn.name)}]`,
                    "as": CellTitle
                }
            ];
        }
        return transforms;
    }
    function facetMarks(specViewOptions, sourceDataName, childMarks, childAxes, childData) {
        //TODO: create a style
        const cellFillerLineColor = colorToString(specViewOptions.colors.cellFillerLine);
        const style = "cell";
        const mark = {
            style,
            "type": "group",
            "from": {
                "facet": {
                    "name": DataNames.FacetGroupCell,
                    "data": sourceDataName,
                    "groupby": [CellTitle]
                }
            },
            "title": {
                "frame": "group",
                "offset": specViewOptions.facetMargins.title,
                "text": {
                    "signal": `parent['${CellTitle}']`
                },
                "limit": {
                    "signal": "width"
                },
                "color": colorToString(specViewOptions.colors.axisText),
                "fontSize": {
                    "signal": SignalNames.TextSize
                }
            },
            "encode": {
                "update": {
                    "width": {
                        "signal": "width"
                    },
                    "height": {
                        "signal": "height"
                    }
                }
            },
            "data": childData,
            "marks": childMarks.map(mark => {
                if (mark.from && mark.from.data && mark.from.data === sourceDataName) {
                    mark.from.data = DataNames.FacetGroupCell;
                }
                return mark;
            })
        };
        if (childAxes) {
            mark.axes = childAxes.map(axis => {
                const clone$$1 = clone(axis);
                //remove all labels and titles
                clone$$1.labels = false;
                delete clone$$1.title;
                delete clone$$1.titleAlign;
                delete clone$$1.titleAngle;
                delete clone$$1.titleFontSize;
                return clone$$1;
            });
        }
        const filler = {
            "style": "cell",
            "type": "group",
            "from": { "data": CellFiller },
            "title": {
                "frame": "group",
                "offset": specViewOptions.facetMargins.title,
                "text": "",
                "fontSize": {
                    "signal": SignalNames.TextSize
                }
            },
            "encode": {
                "update": {
                    "width": { "signal": "width" },
                    "height": { "signal": "height" }
                }
            }
        };
        if (childAxes) {
            filler.axes = childAxes.map(axis => {
                const clone$$1 = clone(axis);
                //remove all labels and titles
                clone$$1.labels = false;
                delete clone$$1.title;
                delete clone$$1.titleAlign;
                delete clone$$1.titleAngle;
                delete clone$$1.titleFontSize;
                //change tick & domain color
                clone$$1.tickColor = cellFillerLineColor;
                clone$$1.domainColor = cellFillerLineColor;
                return clone$$1;
            });
        }
        const rowHeader = {
            "type": "group",
            "role": "row-header",
            "from": {
                "facet": {
                    "name": "row-headers",
                    "data": FacetRowsSequence,
                    "groupby": [
                        SequenceNumber
                    ]
                }
            }
        };
        if (childAxes) {
            rowHeader.axes = [
                cloneAndOffsetAxis(childAxes.filter(axis => axis.orient === 'left')[0], specViewOptions.facetMargins.column)
            ];
        }
        const columnFooter = {
            "type": "group",
            "role": "column-footer",
            "from": {
                "facet": {
                    "name": "column-footers",
                    "data": FacetColumnsSequence,
                    "groupby": [
                        SequenceNumber
                    ]
                }
            }
        };
        if (childAxes) {
            columnFooter.axes = [
                cloneAndOffsetAxis(childAxes.filter(axis => axis.orient === 'bottom')[0], specViewOptions.facetMargins.row)
            ];
        }
        const marks = [
            mark,
            filler,
            rowHeader,
            columnFooter
        ];
        return marks;
    }
    function cloneAndOffsetAxis(axis, margin) {
        if (axis) {
            const clone$$1 = clone(axis);
            clone$$1.offset = margin;
            return clone$$1;
        }
    }

    function notNice(niceValue) {
        //convert "nice" numbers to numeric value
        return niceValue.replace(/,/g, '');
    }
    function tickValue(axis, i) {
        const tick = axis.tickText[i];
        let value;
        if (tick) {
            value = axis.tickText[i].value;
        }
        return { tick, value };
    }
    function selectNullOrEmpty(column) {
        const searchExpression = {
            name: column.name,
            operator: 'isnullorEmpty'
        };
        return searchExpression;
    }
    function selectExact(column, value) {
        const searchExpression = {
            name: column.name,
            operator: '==',
            value
        };
        return searchExpression;
    }
    function selectNone(column, values) {
        const expressions = values.map((value, i) => {
            const searchExpression = {
                name: column.name,
                operator: '!=',
                value
            };
            if (i) {
                searchExpression.clause = '&&';
            }
            return searchExpression;
        });
        const searchExpressionGroup = {
            expressions
        };
        return searchExpressionGroup;
    }
    function selectExactAxis(axis, column, i) {
        const result = tickValue(axis, i);
        if (result.tick) {
            return selectExact(column, result.value);
        }
    }
    function selectBetween(column, lowValue, highValue, lowOperator = '>=', highOperator = '<') {
        const expressions = [];
        if (lowValue !== undefined) {
            expressions.push({
                name: column.name,
                operator: lowOperator,
                value: lowValue
            });
        }
        if (highValue !== undefined) {
            expressions.push({
                name: column.name,
                operator: highOperator,
                value: highValue
            });
        }
        if (expressions.length > 1) {
            expressions[1].clause = '&&';
        }
        const searchExpressionGroup = {
            expressions
        };
        return searchExpressionGroup;
    }
    function selectBetweenAxis(axis, column, i) {
        const low = tickValue(axis, i);
        const high = tickValue(axis, i + 1);
        return selectBetween(column, low.value, high.value);
    }
    function selectBetweenFacet(column, title, isFirst, isLast) {
        const values = title.split(facetTitleSeparator);
        return selectBetween(column, isFirst ? undefined : values[0], isLast ? undefined : values[1]);
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function axisSelectionLayer(presenter, specCapabilities, columns, stage, clickHandler, highlightColor, polygonZ) {
        const polygons = [];
        const xRole = specCapabilities.roles.filter(r => r.role === 'x')[0];
        if (xRole && xRole.axisSelection) {
            stage.axes.x.filter(axis => axis.tickText.length).forEach(axis => {
                polygons.push.apply(polygons, axisSelectionPolygons(axis, false, xRole.axisSelection, columns.x));
            });
        }
        const yRole = specCapabilities.roles.filter(r => r.role === 'y')[0];
        if (yRole && yRole.axisSelection) {
            stage.axes.y.filter(axis => axis.tickText.length).forEach(axis => {
                polygons.push.apply(polygons, axisSelectionPolygons(axis, true, yRole.axisSelection, columns.y));
            });
        }
        if (stage.facets) {
            polygons.push.apply(polygons, facetSelectionPolygons(stage.facets, columns.facet));
        }
        //move polygons to Z
        polygons.forEach(datum => {
            datum.polygon.forEach(p => {
                p[2] = polygonZ;
            });
        });
        const onClick = (o, e) => clickHandler(e.srcEvent, o.object.search);
        const polygonLayer = new base.layers.PolygonLayer({
            autoHighlight: true,
            coordinateSystem: base.deck.COORDINATE_SYSTEM.IDENTITY,
            data: polygons,
            extruded: false,
            highlightColor,
            id: 'selections',
            onHover: (o, e) => {
                if (o.index === -1) {
                    presenter.deckgl.interactiveState.onAxisSelection = false;
                }
                else {
                    presenter.deckgl.interactiveState.onAxisSelection = true;
                }
            },
            onClick,
            getElevation: () => 0,
            getFillColor: () => [0, 0, 0, 0],
            pickable: true,
            stroked: false
        });
        return polygonLayer;
    }
    function axisSelectionPolygons(axis, vertical, axisSelectionType, column) {
        const polygons = [];
        const size = 50;
        const getSearch = axisSelectionType === 'exact' ?
            (a, c, i) => ({ expressions: [selectExactAxis(a, c, i)] })
            :
                selectBetweenAxis;
        const { domain, ticks } = axis;
        if (ticks.length > 0 && domain) {
            const dim = vertical ? 1 : 0;
            const between = Math.abs(ticks[0].sourcePosition[dim] - domain.sourcePosition[dim]) > 1;
            let divisions;
            if (between) {
                divisions = [];
                for (let i = 1; i < ticks.length; i++) {
                    divisions.push((ticks[i].sourcePosition[dim] + ticks[i - 1].sourcePosition[dim]) / 2);
                }
            }
            else {
                divisions = ticks.slice(1, -1).map(tick => tick.sourcePosition[dim]);
            }
            function add(p2, i) {
                var coords = [[p1, q1], [p2, q1], [p2, q2], [p1, q2]];
                polygons.push({
                    search: getSearch(axis, column, i),
                    polygon: vertical ? coords.map(xy => xy.reverse()) : coords
                });
                p1 = p2;
            }
            let p1 = domain.sourcePosition[dim];
            const q1 = domain.sourcePosition[vertical ? 0 : 1];
            const q2 = q1 - size;
            divisions.forEach(add);
            add(domain.targetPosition[dim], ticks.length - (between ? 1 : 2));
        }
        return polygons;
    }
    function facetSelectionPolygons(facetRects, facetColumn) {
        const polygons = [];
        facetRects.forEach((facetRect, i) => {
            //take any 2 lines to get a box dimension
            const [x, y] = minMaxPoints(facetRect.lines.slice(2));
            const search = facetRect.facetTitle ?
                facetColumn.quantitative ?
                    selectBetweenFacet(facetColumn, facetRect.facetTitle.text, i === 0, i === facetRects.length - 1)
                    :
                        { expressions: [selectExact(facetColumn, facetRect.facetTitle.text)] }
                :
                    { expressions: [selectNullOrEmpty(facetColumn)] };
            polygons.push({
                search,
                polygon: [[x.min, y.min], [x.max, y.min], [x.max, y.max], [x.min, y.max]]
            });
        });
        return polygons;
    }
    function minMaxPoints(lines) {
        const points = [];
        lines.forEach(line => {
            [line.sourcePosition, line.targetPosition].forEach(point => {
                points.push(point);
            });
        });
        return [0, 1].map(dim => {
            let minMax = { min: null, max: null };
            points.forEach(point => {
                if (minMax.max == null) {
                    minMax.max = point[dim];
                }
                else {
                    minMax.max = Math.max(minMax.max, point[dim]);
                }
                if (minMax.min == null) {
                    minMax.min = point[dim];
                }
                else {
                    minMax.min = Math.min(minMax.min, point[dim]);
                }
            });
            return minMax;
        });
    }

    function partialAxes(specViewOptions, xColumnQuantitative, yColumnQuantitative) {
        const lineColor = colorToString(specViewOptions.colors.axisLine);
        const axisColor = {
            "domainColor": lineColor,
            "tickColor": lineColor,
            "labelColor": colorToString(specViewOptions.colors.axisText)
        };
        const bottom = Object.assign({ "orient": "bottom", "labelAlign": "left", "labelAngle": {
                "signal": SignalNames.TextAngleX
            }, "labelFontSize": {
                "signal": SignalNames.TextSize
            }, "titleAngle": {
                "signal": SignalNames.TextAngleX
            }, "titleAlign": "left", "titleFontSize": {
                "signal": SignalNames.TextTitleSize
            }, "titleColor": colorToString(specViewOptions.colors.axisText), "tickSize": specViewOptions.tickSize }, axisColor);
        if (xColumnQuantitative) {
            bottom.format = "~r";
        }
        const left = Object.assign({ "orient": "left", "labelAlign": "right", "labelAngle": {
                "signal": SignalNames.TextAngleY
            }, "labelFontSize": {
                "signal": SignalNames.TextSize
            }, "titleAngle": {
                "signal": SignalNames.TextAngleY
            }, "titleAlign": "right", "titleFontSize": {
                "signal": SignalNames.TextTitleSize
            }, "titleColor": colorToString(specViewOptions.colors.axisText), "tickSize": specViewOptions.tickSize }, axisColor);
        if (yColumnQuantitative) {
            left.format = "~r";
        }
        return { left, bottom };
    }

    function getAxes (specViewOptions, columns) {
        const pa = partialAxes(specViewOptions, columns.x.quantitative, true);
        const axes = [
            Object.assign({ "scale": ScaleNames.X, "title": columns.x.name }, pa.bottom),
            Object.assign({ "scale": "yscalelabel", "title": specViewOptions.language.count, "encode": {
                    "labels": {
                        "update": {
                            "text": {
                                "signal": "shapesPerRow * datum.value"
                            }
                        }
                    }
                } }, pa.left)
        ];
        return axes;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getQualitative (columns) {
        const stackTransform = {
            "type": "stack",
            "groupby": [
                {
                    "field": columns.x.name
                }
            ],
            "as": [
                FieldNames.BarChartStackY0,
                FieldNames.BarChartStackY1
            ]
        };
        if (columns.sort) {
            stackTransform.sort = {
                "field": columns.sort.name
            };
        }
        const transforms = [
            stackTransform,
            {
                "type": "extent",
                "signal": "xtent",
                "field": FieldNames.BarChartStackY1
            }
        ];
        return transforms;
    }

    function getQuantitative (columns, groupBy) {
        const stackTransform = {
            "type": "stack",
            "groupby": [
                FieldNames.BarChartBin0
            ],
            "as": [
                FieldNames.BarChartStackY0,
                FieldNames.BarChartStackY1
            ]
        };
        if (groupBy) {
            stackTransform.groupby.push(groupBy.name);
        }
        if (columns.sort) {
            stackTransform.sort = {
                "field": columns.sort.name
            };
        }
        const transforms = [
            {
                "type": "extent",
                "field": columns.x.name,
                "signal": "var_extent"
            },
            {
                "type": "bin",
                "field": columns.x.name,
                "extent": {
                    "signal": "var_extent"
                },
                "maxbins": {
                    "signal": SignalNames.XBins
                },
                "as": [
                    FieldNames.BarChartBin0,
                    FieldNames.BarChartBin1
                ],
                "signal": "binSignal"
            },
            stackTransform,
            {
                "type": "extent",
                "signal": "xtent",
                "field": FieldNames.BarChartStackY1
            }
        ];
        return transforms;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    /**
     * Returns array with items which are truthy.
     * @param args array or arrays to concat into a single array.
     */
    function allTruthy(...args) {
        return args.reduce((p, c) => c ? p.concat(c) : p, []).filter(Boolean);
    }

    function topLookup(column, count) {
        const data = [
            {
                "name": DataNames.TopLookup,
                "source": DataNames.Main,
                "transform": [
                    { "type": "aggregate", "groupby": [column.name] },
                    {
                        "type": "window",
                        "ops": [
                            "count"
                        ],
                        "as": [
                            FieldNames.TopIndex
                        ]
                    },
                    { "type": "filter", "expr": `datum.${FieldNames.TopIndex} <= ${count}` }
                ]
            },
            {
                "name": DataNames.Legend,
                "source": DataNames.Main,
                "transform": [
                    {
                        "type": "lookup",
                        "from": DataNames.TopLookup,
                        "key": column.name,
                        "fields": [column.name],
                        "values": [column.name],
                        "as": [FieldNames.Top]
                    },
                    {
                        "type": "formula",
                        "expr": `datum.${FieldNames.Top} || '${Other}'`,
                        "as": FieldNames.Top
                    }
                ]
            }
        ];
        return data;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getData (namespace, insight, columns, specViewOptions) {
        const categoricalColor = columns.color && !columns.color.quantitative;
        const nestedDataName = columns.facet && columns.facet.quantitative ? DataNames.Pre : DataNames.Main;
        const data = allTruthy(facetSourceData(columns.facet, insight.facets, DataNames.Main), categoricalColor && topLookup(columns.color, specViewOptions.maxLegends), [
            nested(namespace, categoricalColor ? DataNames.Legend : nestedDataName, columns),
            stacked(namespace, namespace.nested, columns.facet && facetTransforms(columns.facet, insight.facets))
        ], columns.x.quantitative && [
            {
                "name": "xaxisdata",
                "transform": [
                    {
                        "type": "sequence",
                        "start": {
                            "signal": "binSignal.start"
                        },
                        "stop": {
                            "signal": "binSignal.stop"
                        },
                        "step": {
                            "signal": "binSignal.step"
                        }
                    }
                ]
            }
        ], columns.facet && facetGroupData(namespace.stacked));
        return data;
    }
    function nested(namespace, source, columns) {
        const data = {
            "name": namespace.nested,
            source,
            "transform": columns.x.quantitative ?
                getQuantitative(columns, columns.facet)
                :
                    getQualitative(columns)
        };
        return data;
    }
    function stacked(namespace, source, transforms) {
        const data = {
            "name": namespace.stacked,
            source,
            "transform": allTruthy(transforms, xy(namespace))
        };
        return data;
    }
    function xy(namespace) {
        const transforms = [
            {
                "type": "formula",
                "expr": `floor(datum.${FieldNames.BarChartStackY0} / shapesPerRow)`,
                "as": namespace.__row
            },
            {
                "type": "formula",
                "expr": `datum.${FieldNames.BarChartStackY0} % shapesPerRow`,
                "as": namespace.__column
            }
        ];
        return transforms;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function testForCollapseSelection() {
        return `datum.${FieldNames.Collapsed}`;
    }
    function zeroIfCollapsed(numericValueRef) {
        const rules = [
            {
                "test": testForCollapseSelection(),
                "value": 0
            },
            numericValueRef
        ];
        return rules;
    }
    function collapseY(numericValueRef) {
        const rules = [
            {
                "scale": ScaleNames.Y,
                "test": testForCollapseSelection(),
                "signal": `${SignalNames.YDomain}[0]`
            },
            numericValueRef
        ];
        return rules;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function fill(colorColumn, specViewOptions) {
        return colorColumn ?
            {
                "scale": ScaleNames.Color,
                "field": colorColumn.quantitative ? colorColumn.name : FieldNames.Top
            }
            :
                {
                    "value": colorToString(specViewOptions.colors.defaultCube)
                };
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getMarks (namespace, columns, specViewOptions) {
        const mark = {
            "type": "rect",
            "from": {
                "data": namespace.stacked
            },
            "encode": {
                "update": {
                    "x": {
                        "scale": ScaleNames.X,
                        "field": columns.x.quantitative ? FieldNames.BarChartBin0 : columns.x.name,
                        "offset": {
                            "scale": "xnewinternalscale",
                            "field": namespace.__column
                        }
                    },
                    "width": {
                        "scale": "xnewinternalscale",
                        "band": true
                    },
                    "y": collapseY({
                        "scale": ScaleNames.Y,
                        "field": namespace.__row,
                        "band": true,
                        "offset": {
                            "signal": `-bandwidth('${ScaleNames.Y}')-1`
                        }
                    }),
                    "height": zeroIfCollapsed({
                        "scale": ScaleNames.Y,
                        "band": true
                    }),
                    "fill": fill(columns.color, specViewOptions)
                }
            }
        };
        if (columns.z) {
            const update = mark.encode.update;
            update.z = {
                "value": 0
            };
            update.depth = zeroIfCollapsed({
                "scale": ScaleNames.Z,
                "field": columns.z.name
            });
        }
        return [mark];
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function qualitativeScales (namespace, columns) {
        const scales = [
            {
                "name": "xscaleavailable",
                "type": "band",
                "range": "width",
                "domain": {
                    "data": namespace.nested,
                    "field": columns.x.name,
                    "sort": true
                }
            },
            {
                "name": ScaleNames.X,
                "type": "band",
                "range": [
                    0,
                    {
                        "signal": "width"
                    }
                ],
                "padding": 0.01,
                "domain": {
                    "data": namespace.stacked,
                    "field": columns.x.name,
                    "sort": true
                }
            }
        ];
        return scales;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function quantitativeScales (namespace, columns) {
        const scales = [
            {
                "name": "xscaleavailable",
                "type": "band",
                "range": "width",
                "domain": {
                    "data": namespace.nested,
                    "field": FieldNames.BarChartBin0,
                    "sort": true
                }
            },
            {
                "name": ScaleNames.X,
                "type": "band",
                "range": [
                    0,
                    {
                        "signal": "width"
                    }
                ],
                "padding": 0.01,
                "domain": {
                    "data": "xaxisdata",
                    "field": "data",
                    "sort": true
                }
            }
        ];
        return scales;
    }

    function linearScale(name, data, field, range, reverse, zero) {
        const scale = {
            name,
            "type": "linear",
            range,
            "round": true,
            reverse,
            "domain": {
                data,
                field
            },
            zero,
            "nice": true
        };
        return scale;
    }
    function pointScale(name, data, range, field, reverse) {
        const scale = {
            name,
            "type": "point",
            range,
            "domain": {
                data,
                field,
                sort: true
            },
            "padding": 0.5
        };
        if (reverse !== undefined) {
            scale.reverse = reverse;
        }
        return scale;
    }
    function binnableColorScale(colorBin, data, field, scheme) {
        scheme = scheme || ColorScaleNone;
        const name = ScaleNames.Color;
        const domain = {
            data,
            field
        };
        const range = {
            scheme
        };
        const reverse = { "signal": SignalNames.ColorReverse };
        if (colorBin !== 'continuous') {
            range.count = { signal: SignalNames.ColorBinCount };
        }
        switch (colorBin) {
            case 'continuous':
                const sequentialScale = {
                    name,
                    "type": "sequential",
                    domain,
                    range,
                    reverse
                };
                return sequentialScale;
            case 'quantile':
                const quantileScale = {
                    name,
                    "type": "quantile",
                    domain,
                    range,
                    reverse
                };
                return quantileScale;
            default:
                const quantizeScale = {
                    name,
                    "type": "quantize",
                    domain,
                    range,
                    reverse
                };
                return quantizeScale;
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getScales (namespace, insight, columns) {
        const scales = [
            {
                "name": "xnewinternalscale",
                "type": "band",
                "range": [
                    0,
                    {
                        "signal": "xdesbandwidth"
                    }
                ],
                "padding": 0.1,
                "domain": {
                    "signal": "sequence(0, shapesPerRow+1, 1)"
                }
            },
            {
                "name": "yscalelabel",
                "range": [
                    {
                        "signal": "height"
                    },
                    {
                        "signal": "0"
                    }
                ],
                "round": true,
                "domain": {
                    "data": namespace.stacked,
                    "field": namespace.__row,
                    "sort": true
                },
                "zero": true,
                "nice": true
            },
            {
                "name": ScaleNames.Y,
                "type": "band",
                "range": [
                    {
                        "signal": "height"
                    },
                    {
                        "signal": "0"
                    }
                ],
                "padding": 0.1,
                "round": true,
                "reverse": false,
                "align": 1,
                "domain": {
                    "data": namespace.stacked,
                    "field": namespace.__row,
                    "sort": true
                }
            }
        ];
        if (columns.color) {
            if (columns.color.quantitative) {
                scales.push(binnableColorScale(insight.colorBin, namespace.nested, columns.color.name, insight.scheme));
            }
            else {
                scales.push({
                    "name": ScaleNames.Color,
                    "type": "ordinal",
                    "domain": {
                        "data": namespace.nested,
                        "field": FieldNames.Top,
                        "sort": true
                    },
                    "range": {
                        "scheme": insight.scheme || ColorScaleNone
                    },
                    "reverse": { "signal": SignalNames.ColorReverse }
                });
            }
        }
        if (columns.z) {
            const zRange = [0, { "signal": SignalNames.ZHeight }];
            scales.push(columns.z.quantitative ?
                linearScale(ScaleNames.Z, DataNames.Main, columns.z.name, zRange, false, true)
                :
                    pointScale(ScaleNames.Z, DataNames.Main, zRange, columns.z.name));
        }
        return scales.concat(columns.x.quantitative ? quantitativeScales(namespace, columns) : qualitativeScales(namespace, columns));
    }

    const defaultZProportion = 0.6;
    function textSignals(specViewOptions) {
        const signals = [
            {
                "name": SignalNames.ZProportion,
                "value": defaultZProportion,
                "bind": {
                    "name": specViewOptions.language.zScaleProportion,
                    "debounce": 50,
                    "input": "range",
                    "min": 0.2,
                    "max": 2,
                    "step": 0.1
                }
            },
            {
                "name": SignalNames.ZHeight,
                "update": `height * ${SignalNames.ZProportion}`
            },
            {
                "name": SignalNames.TextScale,
                "value": 2,
                "bind": {
                    "name": specViewOptions.language.textScaleSignal,
                    "debounce": 50,
                    "input": "range",
                    "min": 1,
                    "max": 5,
                    "step": 0.5
                }
            },
            {
                "name": SignalNames.TextSize,
                "update": `${SignalNames.TextScale} * 10`
            },
            {
                "name": SignalNames.TextTitleSize,
                "update": `${SignalNames.TextScale} * 15`
            },
            {
                "name": SignalNames.TextAngleX,
                "value": 30,
                "bind": {
                    "name": specViewOptions.language.xAxisTextAngleSignal,
                    "debounce": 50,
                    "input": "range",
                    "min": 0,
                    "max": 90,
                    "step": 1
                }
            },
            {
                "name": SignalNames.TextAngleY,
                "value": 0,
                "bind": {
                    "name": specViewOptions.language.yAxisTextAngleSignal,
                    "debounce": 50,
                    "input": "range",
                    "min": -90,
                    "max": 0,
                    "step": 1
                }
            }
        ];
        return signals;
    }
    function colorBinCountSignal(specViewOptions) {
        const signal = {
            "name": SignalNames.ColorBinCount,
            "value": 7,
            "bind": {
                "name": specViewOptions.language.colorBinCount,
                "input": "range",
                "min": 1,
                "max": specViewOptions.maxLegends + 1,
                "step": 1
            }
        };
        return signal;
    }
    function colorReverseSignal(specViewOptions) {
        const signal = {
            "name": SignalNames.ColorReverse,
            "value": false,
            "bind": {
                "name": specViewOptions.language.colorReverse,
                "input": "checkbox"
            }
        };
        return signal;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getSignals (insight, columns, specViewOptions) {
        const signals = allTruthy(textSignals(specViewOptions), [
            {
                "name": SignalNames.YDomain,
                "update": `domain('${ScaleNames.Y}')`
            },
            columns.x.quantitative && {
                "name": SignalNames.XBins,
                "value": 7,
                "bind": {
                    "name": specViewOptions.language.XBinSize,
                    "input": "range",
                    "min": 1,
                    "max": 20,
                    "step": 1
                }
            },
            {
                "name": "xdesbandwidth",
                "update": `bandwidth('${columns.x.quantitative ? ScaleNames.X : 'xscaleavailable'}')`
            },
            {
                "name": "binAspect",
                "update": "xdesbandwidth/height"
            },
            {
                "name": "shapesPerRow",
                "update": "ceil(sqrt(binAspect*xtent[1]))"
            },
            colorBinCountSignal(specViewOptions),
            colorReverseSignal(specViewOptions)
        ], columns.facet && facetSignals(insight.facets, specViewOptions));
        return signals;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function legend(column) {
        const legend = {
            "orient": "none",
            "title": column.name,
            "fill": ScaleNames.Color,
            "encode": {
                "symbols": {
                    "update": {
                        "shape": {
                            "value": "square"
                        }
                    }
                }
            }
        };
        if (column.quantitative) {
            legend.type = "symbol";
        }
        return legend;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    class NameSpace {
        constructor(nameSpace = '') {
            ['nested', 'stacked', '__column', '__row'].forEach(name => {
                this[name] = `${name}${nameSpace}`;
            });
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const barchart = (insight, columns, specViewOptions) => {
        const errors = [];
        if (!columns.x)
            errors.push(`Must set a field for x axis`);
        checkForFacetErrors(insight.facets, errors);
        const specCapabilities = {
            roles: [
                {
                    role: 'x',
                    binnable: true,
                    axisSelection: columns.x && columns.x.quantitative ? 'range' : 'exact',
                    signals: [SignalNames.XBins]
                },
                {
                    role: 'z',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'sort',
                    allowNone: true
                },
                {
                    role: 'facet',
                    allowNone: true
                }
            ]
        };
        if (errors.length) {
            return {
                errors,
                specCapabilities,
                vegaSpec: null,
            };
        }
        const rootNamespace = new NameSpace();
        let axes;
        if (!insight.hideAxes) {
            axes = getAxes(specViewOptions, columns);
        }
        let marks;
        if (columns.facet) {
            const cellNamespace = new NameSpace('Cell');
            const cellMarks = getMarks(cellNamespace, columns, specViewOptions);
            const cd = columns.x.quantitative ?
                [
                    stacked(cellNamespace, DataNames.FacetGroupCell)
                ]
                :
                    [
                        nested(cellNamespace, DataNames.FacetGroupCell, columns),
                        stacked(cellNamespace, cellNamespace.nested)
                    ];
            marks = facetMarks(specViewOptions, rootNamespace.stacked, cellMarks, axes, cd);
            axes = [];
        }
        else {
            marks = getMarks(rootNamespace, columns, specViewOptions);
        }
        const size = columns.facet ? facetSize(insight.facets, insight.size, specViewOptions) : insight.size;
        var vegaSpec = {
            "$schema": "https://vega.github.io/schema/vega/v3.json",
            "height": size.height,
            "width": size.width,
            signals: getSignals(insight, columns, specViewOptions),
            scales: getScales(rootNamespace, insight, columns),
            data: getData(rootNamespace, insight, columns, specViewOptions),
            marks
        };
        if (!insight.hideAxes && axes && axes.length) {
            vegaSpec.axes = axes;
        }
        if (columns.color && !insight.hideLegend) {
            vegaSpec.legends = [legend(columns.color)];
        }
        if (columns.facet) {
            vegaSpec.layout = layout(specViewOptions);
        }
        else {
            //use autosize only when not faceting
            vegaSpec.autosize = "fit";
        }
        return { vegaSpec, specCapabilities };
    };

    function getAxes$1 (specViewOptions, columns) {
        const pa = partialAxes(specViewOptions, columns.x.quantitative, columns.y.quantitative);
        const axes = [
            Object.assign({ "scale": "xscale", "title": columns.x.name, "bandPosition": 0.5, "grid": true, "labelFlush": true }, pa.bottom),
            Object.assign({ "scale": "yscale", "title": columns.y.name, "bandPosition": columns.y.quantitative ? 0 : 0.5, "grid": true, "labelFlush": true }, pa.left)
        ];
        return axes;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getData$1 (insight, columns, specViewOptions) {
        const categoricalColor = columns.color && !columns.color.quantitative;
        const data = allTruthy([
            {
                "name": DataNames.Main,
                "transform": allTruthy(columns.x.quantitative && [
                    {
                        "type": "extent",
                        "field": columns.x.name,
                        "signal": "var_Xextent"
                    },
                    {
                        "type": "bin",
                        "field": columns.x.name,
                        "extent": {
                            "signal": "var_Xextent"
                        },
                        "maxbins": {
                            "signal": SignalNames.XBins
                        },
                        "as": [
                            FieldNames.DensityXBin0,
                            FieldNames.DensityXBin1
                        ],
                        "signal": "binXSignal"
                    }
                ], columns.y.quantitative && [
                    {
                        "type": "extent",
                        "field": columns.y.name,
                        "signal": "var_Yextent"
                    },
                    {
                        "type": "bin",
                        "field": columns.y.name,
                        "extent": {
                            "signal": "var_Yextent"
                        },
                        "maxbins": {
                            "signal": SignalNames.YBins
                        },
                        "as": [
                            FieldNames.DensityYBin0,
                            FieldNames.DensityYBin1
                        ],
                        "signal": "binYSignal"
                    }
                ])
            }
        ], columns.x.quantitative && [
            {
                "name": "xaxisdata",
                "transform": [
                    {
                        "type": "sequence",
                        "start": {
                            "signal": "binXSignal.start"
                        },
                        "stop": {
                            "signal": "binXSignal.stop"
                        },
                        "step": {
                            "signal": "binXSignal.step"
                        }
                    }
                ]
            }
        ], columns.y.quantitative && [
            {
                "name": "yaxisdata",
                "transform": [
                    {
                        "type": "sequence",
                        "start": {
                            "signal": "binYSignal.start"
                        },
                        "stop": {
                            "signal": "binYSignal.stop"
                        },
                        "step": {
                            "signal": "binYSignal.step"
                        }
                    }
                ]
            }
        ], categoricalColor && topLookup(columns.color, specViewOptions.maxLegends), [
            {
                "name": "aggregated",
                "source": categoricalColor ? DataNames.Legend : DataNames.Main,
                "transform": [
                    {
                        "type": "joinaggregate",
                        "groupby": [
                            columns.x.quantitative ? FieldNames.DensityXBin0 : columns.x.name,
                            columns.y.quantitative ? FieldNames.DensityYBin0 : columns.y.name
                        ],
                        "ops": [
                            "count"
                        ],
                        "as": [
                            FieldNames.DensityCount
                        ]
                    },
                    windowTransform(columns),
                    {
                        "type": "extent",
                        "field": FieldNames.DensityRow,
                        "signal": "cextent"
                    }
                ]
            }
        ]);
        return data;
    }
    function windowTransform(columns) {
        const t = {
            "type": "window",
            "groupby": [
                columns.x.quantitative ? FieldNames.DensityXBin0 : columns.x.name,
                columns.y.quantitative ? FieldNames.DensityYBin0 : columns.y.name
            ],
            "ops": [
                "row_number"
            ],
            "as": [
                FieldNames.DensityRow
            ]
        };
        if (columns.sort) {
            t.sort = {
                "field": [columns.sort.name],
                "order": [
                    "descending"
                ]
            };
        }
        return t;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getMarks$1 (columns, specViewOptions) {
        const mark = {
            "type": "rect",
            "from": {
                "data": "aggregated"
            },
            "sort": {
                "field": [
                    columns.x.name,
                    columns.y.name
                ],
                "order": [
                    "ascending",
                    "ascending"
                ]
            },
            "encode": {
                "update": {
                    "xc": {
                        "scale": "xscale",
                        "field": columns.x.quantitative ? FieldNames.DensityXBin0 : columns.x.name,
                        "offset": {
                            "signal": `scale('sizescale', ((datum.${FieldNames.DensityRow}-1) % floor(sqrt(datum.${FieldNames.DensityCount}))))-scale('sizescale', sqrt(datum.${FieldNames.DensityCount})-2)/2`
                        }
                    },
                    "yc": {
                        "scale": "yscale",
                        "field": columns.y.quantitative ? FieldNames.DensityYBin0 : columns.y.name,
                        "offset": {
                            "signal": `scale('sizescale',height/width*floor(((datum.${FieldNames.DensityRow}-1) / floor(sqrt(datum.${FieldNames.DensityCount}))))) - scale('sizescale', height/width*sqrt(datum.${FieldNames.DensityCount})+2)/2`
                        }
                    },
                    "width": {
                        "signal": "unitsize"
                    },
                    "height": {
                        "signal": "height/width*unitsize"
                    },
                    "fill": fill(columns.color, specViewOptions)
                }
            }
        };
        if (columns.z) {
            const update = mark.encode.update;
            update.z = {
                "value": 0
            };
            update.depth = zeroIfCollapsed({
                "scale": ScaleNames.Z,
                "field": columns.z.name
            });
        }
        return [mark];
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getScales$1 (columns, insight) {
        const scales = [
            {
                "name": "xscale",
                "type": "point",
                "domain": columns.x.quantitative ?
                    {
                        "data": "xaxisdata",
                        "field": "data",
                        "sort": true
                    }
                    :
                        {
                            "data": DataNames.Main,
                            "field": columns.x.name,
                            "sort": true
                        },
                "range": "width",
                "padding": 0.5
            },
            {
                "name": "yscale",
                "type": "point",
                "domain": columns.y.quantitative ?
                    {
                        "data": "yaxisdata",
                        "field": "data",
                        "sort": true
                    }
                    :
                        {
                            "data": DataNames.Main,
                            "field": columns.y.name,
                            "sort": true
                        },
                "range": "height",
                "reverse": true,
                "padding": 0.5
            },
            {
                "name": "sizescale",
                "type": "linear",
                "domain": [
                    0,
                    {
                        "signal": "sqrt(cextent[1])"
                    }
                ],
                "range": [
                    0,
                    {
                        "signal": "width/max(xsize,ysize)"
                    }
                ]
            }
        ];
        if (columns.color) {
            if (columns.color.quantitative) {
                scales.push(binnableColorScale(insight.colorBin, DataNames.Main, columns.color.name, insight.scheme));
            }
            else {
                scales.push({
                    "name": ScaleNames.Color,
                    "type": "ordinal",
                    "domain": {
                        "data": DataNames.Legend,
                        "field": FieldNames.Top,
                        "sort": true
                    },
                    "range": {
                        "scheme": insight.scheme || ColorScaleNone
                    },
                    "reverse": { "signal": SignalNames.ColorReverse }
                });
            }
        }
        if (columns.z) {
            const zRange = [0, { "signal": SignalNames.ZHeight }];
            scales.push(columns.z.quantitative ?
                linearScale(ScaleNames.Z, DataNames.Main, columns.z.name, zRange, false, true)
                :
                    pointScale(ScaleNames.Z, DataNames.Main, zRange, columns.z.name));
        }
        return scales;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getSignals$1 (insight, columns, specViewOptions) {
        const signals = allTruthy(textSignals(specViewOptions), [
            colorBinCountSignal(specViewOptions),
            colorReverseSignal(specViewOptions),
            {
                "name": "unitpad",
                "value": 0.1,
                "bind": {
                    "name": SignalNames.InnerPadding,
                    "input": "range",
                    "min": 0.1,
                    "max": 1.0,
                    "step": 0.1
                }
            },
            {
                "name": "xsize",
                "update": "domain('xscale').length"
            },
            {
                "name": "ysize",
                "update": "domain('yscale').length"
            },
            {
                "name": "cellwidth",
                "update": "width/max(xsize,ysize)"
            },
            {
                "name": "maxnumbers",
                "update": "sqrt(cextent[1])"
            },
            {
                "name": "unitsize",
                "update": "cellwidth/((1 + unitpad)*maxnumbers)"
            },
            columns.x.quantitative && {
                "name": SignalNames.XBins,
                "value": 30,
                "bind": {
                    "name": specViewOptions.language.XBinSize,
                    "input": "range",
                    "min": 1,
                    "max": 60,
                    "step": 1
                }
            },
            columns.y.quantitative && {
                "name": SignalNames.YBins,
                "value": 30,
                "bind": {
                    "name": specViewOptions.language.YBinSize,
                    "input": "range",
                    "min": 1,
                    "max": 60,
                    "step": 1
                }
            }
        ], insight.columns.facet && facetSignals(insight.facets, specViewOptions));
        return signals;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const density = (insight, columns, specViewOptions) => {
        const errors = [];
        if (!columns.x)
            errors.push(`Must set a field for x axis`);
        if (!columns.y)
            errors.push(`Must set a field for y axis`);
        checkForFacetErrors(insight.facets, errors);
        const specCapabilities = {
            roles: [
                {
                    role: 'x',
                    binnable: true,
                    axisSelection: columns.x && columns.x.quantitative ? 'range' : 'exact',
                    signals: [SignalNames.XBins]
                },
                {
                    role: 'y',
                    binnable: true,
                    axisSelection: columns.y && columns.y.quantitative ? 'range' : 'exact',
                    signals: [SignalNames.YBins]
                },
                {
                    role: 'z',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'sort',
                    allowNone: true
                }
            ]
        };
        if (errors.length) {
            return {
                errors,
                specCapabilities,
                vegaSpec: null,
            };
        }
        const size = columns.facet ? facetSize(insight.facets, insight.size, specViewOptions) : insight.size;
        var vegaSpec = {
            "$schema": "https://vega.github.io/schema/vega/v3.json",
            "height": size.height,
            "width": size.width,
            signals: getSignals$1(insight, columns, specViewOptions),
            data: getData$1(insight, columns, specViewOptions),
            scales: getScales$1(columns, insight),
            marks: getMarks$1(columns, specViewOptions)
        };
        if (!insight.hideAxes) {
            vegaSpec.axes = getAxes$1(specViewOptions, columns);
        }
        if (columns.color && !insight.hideLegend) {
            vegaSpec.legends = [legend(columns.color)];
        }
        if (columns.facet) {
            vegaSpec.layout = layout(specViewOptions);
        }
        else {
            //use autosize only when not faceting
            vegaSpec.autosize = "fit";
        }
        return { vegaSpec, specCapabilities };
    };

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getData$2 (columns, specViewOptions) {
        const categoricalColor = columns.color && !columns.color.quantitative;
        const data = allTruthy([
            {
                "name": DataNames.Main,
                "transform": allTruthy([
                    columns.sort && {
                        "type": "collect",
                        "sort": { "field": columns.sort.name }
                    },
                    {
                        "type": "window",
                        "ops": [
                            "count"
                        ],
                        "as": [
                            FieldNames.GridIndex
                        ]
                    }
                ])
            }
        ], categoricalColor && topLookup(columns.color, specViewOptions.maxLegends));
        return data;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    const ColumnCount = "columncount";
    const RowCount = "rowcount";
    const Total = "total";

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getMarks$2 (data, columns, specViewOptions) {
        const marks = [
            {
                "type": "rect",
                "from": {
                    data
                },
                "encode": {
                    "update": {
                        "x": {
                            "signal": `(datum.${FieldNames.GridIndex}-1)%${ColumnCount}`,
                            "scale": ScaleNames.X
                        },
                        "width": {
                            "scale": ScaleNames.X,
                            "band": true
                        },
                        "y": {
                            "signal": `floor((datum.${FieldNames.GridIndex}-1)/${ColumnCount})`,
                            "scale": ScaleNames.Y
                        },
                        "height": {
                            "scale": ScaleNames.Y,
                            "band": true
                        },
                        "fill": fill(columns.color, specViewOptions)
                    }
                }
            }
        ];
        if (columns.z) {
            const update = marks[0].encode.update;
            update.z = {
                "value": 0
            };
            update.depth = zeroIfCollapsed({
                "scale": ScaleNames.Z,
                "field": columns.z.name
            });
        }
        return marks;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getScales$2 (columns, insight) {
        const scales = [
            {
                "name": ScaleNames.X,
                "type": "band",
                "domain": {
                    "signal": `sequence(0, ${ColumnCount}, 1)`
                },
                "range": "width",
                "paddingInner": 0.1,
                "paddingOuter": 0
            },
            {
                "name": ScaleNames.Y,
                "type": "band",
                "domain": {
                    "signal": `sequence(0, ${RowCount}, 1)`
                },
                "range": "height",
                "paddingInner": 0.1,
                "paddingOuter": 0
            }
        ];
        if (columns.color) {
            if (columns.color.quantitative) {
                scales.push(binnableColorScale(insight.colorBin, DataNames.Main, columns.color.name, insight.scheme));
            }
            else {
                scales.push({
                    "name": ScaleNames.Color,
                    "type": "ordinal",
                    "domain": {
                        "data": DataNames.Legend,
                        "field": FieldNames.Top,
                        "sort": true
                    },
                    "range": {
                        "scheme": insight.scheme || ColorScaleNone
                    },
                    "reverse": { "signal": SignalNames.ColorReverse }
                });
            }
        }
        if (columns.z) {
            const zRange = [0, { "signal": SignalNames.ZHeight }];
            scales.push(columns.z.quantitative ?
                linearScale(ScaleNames.Z, DataNames.Main, columns.z.name, zRange, false, false)
                :
                    pointScale(ScaleNames.Z, DataNames.Main, zRange, columns.z.name));
        }
        return scales;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getSignals$2 (insight, specViewOptions) {
        const signals = allTruthy(textSignals(specViewOptions), [
            colorBinCountSignal(specViewOptions),
            {
                "name": Total,
                "update": `data('${DataNames.Main}').length`
            },
            {
                "name": ColumnCount,
                "update": `ceil(sqrt((width/height)*${Total}))`
            },
            {
                "name": RowCount,
                "update": `${Total}/${ColumnCount}`
            },
            colorReverseSignal(specViewOptions)
        ], insight.columns && insight.columns.facet && facetSignals(insight.facets, specViewOptions));
        return signals;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const grid = (insight, columns, specViewOptions) => {
        const errors = [];
        const specCapabilities = {
            roles: [
                {
                    role: 'z',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'sort',
                    allowNone: true
                }
            ]
        };
        if (errors.length) {
            return {
                errors,
                specCapabilities,
                vegaSpec: null,
            };
        }
        const categoricalColor = columns.color && !columns.color.quantitative;
        const dataName = categoricalColor ? DataNames.Legend : DataNames.Main;
        const size = insight.size;
        var vegaSpec = {
            "$schema": "https://vega.github.io/schema/vega/v3.json",
            "height": size.height,
            "width": size.width,
            signals: getSignals$2(insight, specViewOptions),
            scales: getScales$2(columns, insight),
            data: getData$2(columns, specViewOptions),
            marks: getMarks$2(dataName, columns, specViewOptions)
        };
        if (columns.color && !insight.hideLegend) {
            vegaSpec.legends = [legend(columns.color)];
        }
        //use autosize only when not faceting
        vegaSpec.autosize = "fit";
        return { vegaSpec, specCapabilities };
    };

    function getAxes$2 (specViewOptions, columns) {
        const pa = partialAxes(specViewOptions, columns.x.quantitative, columns.y.quantitative);
        const axes = [
            Object.assign({ "scale": ScaleNames.X, "title": columns.x.name }, pa.bottom),
            Object.assign({ "scale": ScaleNames.Y, "title": columns.y.name }, pa.left)
        ];
        return axes;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getData$3 (insight, columns, specViewOptions) {
        const categoricalColor = columns.color && !columns.color.quantitative;
        const ScatterDataName = "SandDanceScatterPlotData";
        const data = allTruthy(facetSourceData(columns.facet, insight.facets, ScatterDataName), [
            {
                "name": DataNames.Main,
                "source": ScatterDataName,
                "transform": allTruthy(filterInvalidWhenNumeric(columns.x), filterInvalidWhenNumeric(columns.y), filterInvalidWhenNumeric(columns.z), columns.facet && facetTransforms(columns.facet, insight.facets))
            }
        ], categoricalColor && topLookup(columns.color, specViewOptions.maxLegends), columns.facet && facetGroupData(DataNames.Main));
        return data;
    }
    function filterInvalidWhenNumeric(column) {
        if (column && column.quantitative) {
            const transforms = [
                {
                    "type": "filter",
                    "expr": `datum[${JSON.stringify(column.name)}] != null`
                }
            ];
            return transforms;
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getMarks$3 (columns, specViewOptions) {
        const categoricalColor = columns.color && !columns.color.quantitative;
        const marks = [
            {
                "type": "rect",
                "from": {
                    "data": categoricalColor ? DataNames.Legend : DataNames.Main
                },
                "encode": {
                    "update": {
                        "x": {
                            "scale": ScaleNames.X,
                            "field": columns.x.name,
                            "offset": 1
                        },
                        "width": { "signal": SignalNames.PointSize },
                        "y": collapseY({
                            "scale": ScaleNames.Y,
                            "field": columns.y.name,
                            "offset": {
                                "signal": `-${SignalNames.PointSize}`
                            }
                        }),
                        "height": zeroIfCollapsed({ "signal": SignalNames.PointSize }),
                        "fill": fill(columns.color, specViewOptions)
                    }
                }
            }
        ];
        if (columns.z) {
            const update = marks[0].encode.update;
            update.z = zeroIfCollapsed({
                "scale": ScaleNames.Z,
                "field": columns.z.name
            });
            update.depth = { "signal": SignalNames.PointSize };
        }
        return marks;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getScales$3 (columns, insight) {
        const scales = [
            (columns.x.quantitative ?
                linearScale(ScaleNames.X, DataNames.Main, columns.x.name, "width", false, false)
                :
                    pointScale(ScaleNames.X, DataNames.Main, "width", columns.x.name)),
            (columns.y.quantitative ?
                linearScale(ScaleNames.Y, DataNames.Main, columns.y.name, "height", false, false)
                :
                    pointScale(ScaleNames.Y, DataNames.Main, "height", columns.y.name, true))
        ];
        if (columns.color) {
            if (columns.color.quantitative) {
                scales.push(binnableColorScale(insight.colorBin, DataNames.Main, columns.color.name, insight.scheme));
            }
            else {
                scales.push({
                    "name": ScaleNames.Color,
                    "type": "ordinal",
                    "domain": {
                        "data": DataNames.Legend,
                        "field": FieldNames.Top,
                        "sort": true
                    },
                    "range": {
                        "scheme": insight.scheme || ColorScaleNone
                    },
                    "reverse": { "signal": SignalNames.ColorReverse }
                });
            }
        }
        if (columns.z) {
            const zRange = [0, { "signal": SignalNames.ZHeight }];
            scales.push(columns.z.quantitative ?
                linearScale(ScaleNames.Z, DataNames.Main, columns.z.name, zRange, false, false)
                :
                    pointScale(ScaleNames.Z, DataNames.Main, zRange, columns.z.name));
        }
        return scales;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getSignals$3 (insight, specViewOptions) {
        const signals = allTruthy(textSignals(specViewOptions), [
            {
                "name": SignalNames.YDomain,
                "update": `domain('${ScaleNames.Y}')`
            },
            {
                "name": SignalNames.PointSize,
                "value": 5,
                "bind": {
                    "name": specViewOptions.language.scatterPointSize,
                    "debounce": 50,
                    "input": "range",
                    "min": 1,
                    "max": 25,
                    "step": 1
                }
            },
            colorBinCountSignal(specViewOptions),
            colorReverseSignal(specViewOptions)
        ], insight.columns.facet && facetSignals(insight.facets, specViewOptions));
        return signals;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const scatterplot = (insight, columns, specViewOptions) => {
        const errors = [];
        if (!columns.x)
            errors.push(`Must set a field for x axis`);
        if (!columns.y)
            errors.push(`Must set a field for y axis`);
        checkForFacetErrors(insight.facets, errors);
        const specCapabilities = {
            roles: [
                {
                    role: 'x',
                    axisSelection: columns.x && columns.x.quantitative ? 'range' : 'exact'
                },
                {
                    role: 'y',
                    axisSelection: columns.y && columns.y.quantitative ? 'range' : 'exact'
                },
                {
                    role: 'z',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'sort',
                    allowNone: true
                },
                {
                    role: 'facet',
                    allowNone: true
                }
            ],
            signals: [SignalNames.PointSize]
        };
        if (errors.length) {
            return {
                errors,
                specCapabilities,
                vegaSpec: null,
            };
        }
        let axes;
        if (!insight.hideAxes) {
            axes = getAxes$2(specViewOptions, columns);
        }
        let marks = getMarks$3(columns, specViewOptions);
        if (columns.facet) {
            marks = facetMarks(specViewOptions, marks[0].from.data, marks, axes);
            axes = [];
        }
        const size = columns.facet ? facetSize(insight.facets, insight.size, specViewOptions) : insight.size;
        var vegaSpec = {
            "$schema": "https://vega.github.io/schema/vega/v3.json",
            "height": size.height,
            "width": size.width,
            signals: getSignals$3(insight, specViewOptions),
            data: getData$3(insight, columns, specViewOptions),
            scales: getScales$3(columns, insight),
            marks
        };
        if (!insight.hideAxes && axes && axes.length) {
            vegaSpec.axes = axes;
        }
        if (columns.color && !insight.hideLegend) {
            vegaSpec.legends = [legend(columns.color)];
        }
        if (columns.facet) {
            vegaSpec.layout = layout(specViewOptions);
        }
        else {
            //use autosize only when not faceting
            vegaSpec.autosize = "fit";
        }
        return { vegaSpec, specCapabilities };
    };

    function getAxes$3 (specViewOptions, columns) {
        const pa = partialAxes(specViewOptions, columns.x.quantitative, columns.y.quantitative);
        const axes = [
            Object.assign({ "scale": "xband", "title": columns.x.name, "bandPosition": 0.5, "grid": true, "labelFlush": true }, pa.bottom),
            Object.assign({ "scale": "yband", "title": columns.y.name, "bandPosition": columns.y.quantitative ? 0 : 0.5, "grid": true, "labelFlush": true }, pa.left)
        ];
        return axes;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getData$4 (insight, columns, specViewOptions) {
        const categoricalColor = columns.color && !columns.color.quantitative;
        const data = allTruthy([
            {
                "name": DataNames.Main,
                "transform": allTruthy([
                    {
                        "type": "extent",
                        "field": columns.x.name,
                        "signal": "long_extent"
                    },
                    {
                        "type": "extent",
                        "field": columns.y.name,
                        "signal": "lat_extent"
                    },
                    columns.x.quantitative && {
                        "type": "bin",
                        "field": columns.x.name,
                        "extent": {
                            "signal": "long_extent"
                        },
                        "maxbins": {
                            "signal": SignalNames.XBins
                        },
                        "nice": false,
                        "as": [
                            FieldNames.StacksLongBin0,
                            FieldNames.StacksLongBin1
                        ],
                        "signal": "binXSignal"
                    },
                    columns.y.quantitative && {
                        "type": "bin",
                        "field": columns.y.name,
                        "extent": {
                            "signal": "lat_extent"
                        },
                        "nice": false,
                        "maxbins": {
                            "signal": SignalNames.YBins
                        },
                        "as": [
                            FieldNames.StacksLatBin0,
                            FieldNames.StacksLatBin1
                        ],
                        "signal": "binYSignal"
                    }
                ])
            }
        ], columns.x.quantitative && [
            {
                "name": "xaxisdata",
                "transform": [
                    {
                        "type": "sequence",
                        "start": {
                            "signal": "binXSignal.start"
                        },
                        "stop": {
                            "signal": "binXSignal.stop"
                        },
                        "step": {
                            "signal": "binXSignal.step"
                        }
                    }
                ]
            }
        ], columns.y.quantitative && [
            {
                "name": "yaxisdata",
                "transform": [
                    {
                        "type": "sequence",
                        "start": {
                            "signal": "binYSignal.start"
                        },
                        "stop": {
                            "signal": "binYSignal.stop"
                        },
                        "step": {
                            "signal": "binYSignal.step"
                        }
                    }
                ]
            }
        ], categoricalColor && topLookup(columns.color, specViewOptions.maxLegends), [
            {
                "name": "stackedgroup",
                "source": categoricalColor ? DataNames.Legend : DataNames.Main,
                "transform": [
                    stackTransform(columns.sort, columns.x, columns.y),
                    {
                        "type": "extent",
                        "signal": "xtent",
                        "field": FieldNames.StacksStart
                    },
                    {
                        "type": "formula",
                        "expr": `datum.${FieldNames.StacksEnd} % columns`,
                        "as": "_columns"
                    },
                    {
                        "type": "formula",
                        "expr": `floor(datum.${FieldNames.StacksStart} / columns)`,
                        "as": "row"
                    },
                    {
                        "type": "formula",
                        "expr": `datum.${FieldNames.StacksStart} % ${SignalNames.XGridSize}`,
                        "as": "column"
                    },
                    {
                        "type": "formula",
                        "expr": `floor((datum.${FieldNames.StacksStart} % columns)/ ${SignalNames.XGridSize})`,
                        "as": "depth"
                    },
                    {
                        "type": "extent",
                        "signal": "rowxtent",
                        "field": "row"
                    }
                ]
            }
        ]);
        return data;
    }
    function stackTransform(sortColumn, xColumn, yColumn) {
        const st = {
            "type": "stack",
            "groupby": [
                yColumn.quantitative ? FieldNames.StacksLatBin0 : yColumn.name,
                xColumn.quantitative ? FieldNames.StacksLongBin0 : xColumn.name
            ],
            "as": [
                FieldNames.StacksStart,
                FieldNames.StacksEnd
            ]
        };
        if (sortColumn) {
            st.sort = {
                "field": sortColumn.name
            };
        }
        return st;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getMarks$4 (columns, specViewOptions) {
        const marks = [
            {
                "name": "marks2",
                "type": "rect",
                "from": {
                    "data": "stackedgroup"
                },
                "encode": {
                    "update": {
                        "x": {
                            "scale": "xband",
                            "field": columns.x.quantitative ? FieldNames.StacksLongBin0 : columns.x.name,
                            "offset": {
                                "scale": "xinternalscale",
                                "field": "column"
                            }
                        },
                        "y": {
                            "scale": "yband",
                            "field": columns.y.quantitative ? FieldNames.StacksLatBin0 : columns.y.name,
                            "offset": {
                                "scale": "yinternalscale",
                                "field": "depth"
                            }
                        },
                        "z": {
                            "scale": "zband",
                            "field": "row"
                        },
                        "depth": {
                            "scale": "zband",
                            "band": true
                        },
                        "width": {
                            "signal": "actsize"
                        },
                        "height": {
                            "signal": "actsize"
                        },
                        "fill": fill(columns.color, specViewOptions)
                    }
                }
            }
        ];
        return marks;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getScales$4 (columns, insight) {
        const scales = [
            {
                "name": "xband",
                "type": "band",
                "domain": columns.x.quantitative ?
                    {
                        "data": "xaxisdata",
                        "field": "data",
                        "sort": true
                    }
                    :
                        {
                            "data": DataNames.Main,
                            "field": columns.x.quantitative ? FieldNames.StacksLongBin0 : columns.x.name,
                            "sort": true
                        },
                "range": [
                    0,
                    {
                        "signal": "width"
                    }
                ],
                "padding": { "signal": SignalNames.OuterPadding },
                "round": true
            },
            {
                "name": "yband",
                "type": "band",
                "reverse": true,
                "domain": columns.y.quantitative ?
                    {
                        "data": "yaxisdata",
                        "field": "data",
                        "sort": true
                    }
                    :
                        {
                            "data": DataNames.Main,
                            "field": columns.y.quantitative ? FieldNames.StacksLatBin0 : columns.y.name,
                            "sort": true
                        },
                "range": "height",
                "padding": { "signal": SignalNames.OuterPadding },
                "round": true
            },
            {
                "name": "zband",
                "type": "band",
                "reverse": false,
                "domain": {
                    "data": "stackedgroup",
                    "field": "row",
                    "sort": true
                },
                "align": 0.0,
                "range": [
                    0,
                    {
                        "signal": "countheight"
                    }
                ],
                "padding": { "signal": SignalNames.InnerPadding },
                "round": false
            },
            {
                "name": "xinternalscale",
                "type": "band",
                "range": [
                    0,
                    {
                        "signal": "xbandw"
                    }
                ],
                "padding": {
                    "signal": SignalNames.InnerPadding
                },
                "domain": {
                    "data": "stackedgroup",
                    "field": "column",
                    "sort": true
                }
            },
            {
                "name": "yinternalscale",
                "type": "band",
                "range": [
                    0,
                    {
                        "signal": "ybandw"
                    }
                ],
                "padding": {
                    "signal": SignalNames.InnerPadding
                },
                "domain": {
                    "data": "stackedgroup",
                    "field": "depth",
                    "sort": true
                }
            }
        ];
        if (columns.color) {
            if (columns.color.quantitative) {
                scales.push(binnableColorScale(insight.colorBin, DataNames.Main, columns.color.name, insight.scheme));
            }
            else {
                scales.push({
                    "name": ScaleNames.Color,
                    "type": "ordinal",
                    "domain": {
                        "data": DataNames.Legend,
                        "field": FieldNames.Top,
                        "sort": true
                    },
                    "range": {
                        "scheme": insight.scheme || ColorScaleNone
                    },
                    "reverse": { "signal": SignalNames.ColorReverse }
                });
            }
        }
        return scales;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getSignals$4 (insight, columns, specViewOptions) {
        const signals = allTruthy(textSignals(specViewOptions), [
            colorBinCountSignal(specViewOptions),
            colorReverseSignal(specViewOptions),
            {
                "name": SignalNames.XGridSize,
                "value": 3,
                "bind": {
                    "name": specViewOptions.language.XGridSize,
                    "input": "range",
                    "min": 1,
                    "max": 20,
                    "step": 1
                }
            },
            {
                "name": SignalNames.YGridSize,
                "value": 3,
                "bind": {
                    "name": specViewOptions.language.YGridSize,
                    "input": "range",
                    "min": 1,
                    "max": 20,
                    "step": 1
                }
            },
            columns.x.quantitative && {
                "name": SignalNames.XBins,
                "value": 30,
                "bind": {
                    "name": specViewOptions.language.XBinSize,
                    "input": "range",
                    "min": 1,
                    "max": 60,
                    "step": 1
                }
            },
            columns.y.quantitative && {
                "name": SignalNames.YBins,
                "value": 30,
                "bind": {
                    "name": specViewOptions.language.YBinSize,
                    "input": "range",
                    "min": 1,
                    "max": 60,
                    "step": 1
                }
            },
            {
                "name": SignalNames.InnerPadding,
                "value": 0.1,
                "bind": {
                    "name": specViewOptions.language.InnerPaddingSize,
                    "input": "range",
                    "min": 0.1,
                    "max": 0.6,
                    "step": 0.1
                }
            },
            {
                "name": SignalNames.OuterPadding,
                "value": 0.2,
                "bind": {
                    "name": specViewOptions.language.OuterPaddingSize,
                    "input": "range",
                    "min": 0.1,
                    "max": 0.6,
                    "step": 0.1
                }
            },
            {
                "name": "columns",
                "update": `${SignalNames.XGridSize}*${SignalNames.YGridSize}`
            },
            {
                "name": "xbandw",
                "update": `bandwidth('xband')`
            },
            {
                "name": "xbandsize",
                "update": `(xbandw / (${SignalNames.XGridSize} + ${SignalNames.InnerPadding}))*(1-${SignalNames.InnerPadding})`
            },
            {
                "name": "ybandw",
                "update": `height/((${columns.y.quantitative ? SignalNames.YBins : columns.y.stats.distinctValueCount}) * (1 + ${SignalNames.OuterPadding}))`
            },
            {
                "name": "ybandsize",
                "update": `(ybandw / (${SignalNames.YGridSize} + ${SignalNames.InnerPadding}))*(1-${SignalNames.InnerPadding})`
            },
            {
                "name": "actsize",
                "update": "min(xbandsize,ybandsize)"
            },
            {
                "name": "countheight",
                "update": `rowxtent[1]*actsize*${SignalNames.ZProportion}/${defaultZProportion}`
            }
        ], insight.columns.facet && facetSignals(insight.facets, specViewOptions));
        return signals;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const stacks = (insight, columns, specViewOptions) => {
        const errors = [];
        if (!columns.x)
            errors.push(`Must set a field for x axis`);
        if (!columns.y)
            errors.push(`Must set a field for y axis`);
        checkForFacetErrors(insight.facets, errors);
        const specCapabilities = {
            roles: [
                {
                    role: 'x',
                    binnable: true,
                    axisSelection: columns.x && columns.x.quantitative ? 'range' : 'exact',
                    signals: [SignalNames.XBins]
                },
                {
                    role: 'y',
                    binnable: true,
                    axisSelection: columns.y && columns.y.quantitative ? 'range' : 'exact',
                    signals: [SignalNames.YBins]
                },
                {
                    role: 'z',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'sort',
                    allowNone: true
                }
            ]
        };
        if (errors.length) {
            return {
                errors,
                specCapabilities,
                vegaSpec: null,
            };
        }
        const size = columns.facet ? facetSize(insight.facets, insight.size, specViewOptions) : insight.size;
        var vegaSpec = {
            "$schema": "https://vega.github.io/schema/vega/v3.json",
            "height": size.height,
            "width": size.width,
            signals: getSignals$4(insight, columns, specViewOptions),
            data: getData$4(insight, columns, specViewOptions),
            scales: getScales$4(columns, insight),
            marks: getMarks$4(columns, specViewOptions)
        };
        if (!insight.hideAxes) {
            vegaSpec.axes = getAxes$3(specViewOptions, columns);
        }
        if (columns.color && !insight.hideLegend) {
            vegaSpec.legends = [legend(columns.color)];
        }
        if (columns.facet) {
            vegaSpec.layout = layout(specViewOptions);
        }
        else {
            //use autosize only when not faceting
            vegaSpec.autosize = "fit";
        }
        return { vegaSpec, specCapabilities };
    };

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getData$5 (insight, columns, specViewOptions) {
        const categoricalColor = columns.color && !columns.color.quantitative;
        const TreeMapDataName = "SandDanceTreeMapData";
        const data = allTruthy(facetSourceData(columns.facet, insight.facets, TreeMapDataName), [
            {
                "name": DataNames.Main,
                "source": TreeMapDataName,
                "transform": allTruthy(columns.facet && facetTransforms(columns.facet, insight.facets), !columns.facet && treemapTransforms(insight))
            }
        ], categoricalColor && topLookup(columns.color, specViewOptions.maxLegends), columns.facet && facetGroupData(DataNames.Main));
        return data;
    }
    function treemapTransforms(insight) {
        const transforms = [
            {
                "type": "nest",
                "keys": [insight.columns.group || "__NONE__"]
            },
            {
                "type": "treemap",
                "field": insight.columns.size,
                "sort": { "field": "value", "order": "descending" },
                "round": true,
                "method": { "signal": SignalNames.TreeMapMethod },
                "padding": 1,
                "size": [{ "signal": "width" }, { "signal": "height" }],
                "as": [
                    FieldNames.TreemapStackX0,
                    FieldNames.TreemapStackY0,
                    FieldNames.TreemapStackX1,
                    FieldNames.TreemapStackY1,
                    FieldNames.TreemapStackDepth,
                    FieldNames.TreemapStackChildren
                ]
            }
        ];
        return transforms;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getMarks$5 (data, columns, specViewOptions) {
        const marks = [
            {
                "type": "rect",
                "from": {
                    data
                },
                "encode": {
                    "update": {
                        "x": { "field": FieldNames.TreemapStackX0 },
                        "y": { "field": FieldNames.TreemapStackY0 },
                        "x2": { "field": FieldNames.TreemapStackX1 },
                        "y2": { "field": FieldNames.TreemapStackY1 },
                        "fill": fill(columns.color, specViewOptions)
                    }
                }
            }
        ];
        if (columns.z) {
            const update = marks[0].encode.update;
            update.z = {
                "value": 0
            };
            update.depth = zeroIfCollapsed({
                "scale": ScaleNames.Z,
                "field": columns.z.name
            });
        }
        return marks;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getScales$5 (columns, insight) {
        const scales = [];
        if (columns.color) {
            if (columns.color.quantitative) {
                scales.push(binnableColorScale(insight.colorBin, DataNames.Main, columns.color.name, insight.scheme));
            }
            else {
                scales.push({
                    "name": ScaleNames.Color,
                    "type": "ordinal",
                    "domain": {
                        "data": DataNames.Legend,
                        "field": FieldNames.Top,
                        "sort": true
                    },
                    "range": {
                        "scheme": insight.scheme || ColorScaleNone
                    },
                    "reverse": { "signal": SignalNames.ColorReverse }
                });
            }
        }
        if (columns.z) {
            const zRange = [0, { "signal": SignalNames.ZHeight }];
            scales.push(columns.z.quantitative ?
                linearScale(ScaleNames.Z, DataNames.Main, columns.z.name, zRange, false, false)
                :
                    pointScale(ScaleNames.Z, DataNames.Main, zRange, columns.z.name));
        }
        return scales;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getSignals$5 (insight, specViewOptions) {
        const signals = allTruthy(textSignals(specViewOptions), [
            colorBinCountSignal(specViewOptions),
            {
                "name": SignalNames.TreeMapMethod,
                "value": "squarify",
                "bind": {
                    "name": specViewOptions.language.treeMapMethod,
                    "input": "select",
                    "options": [
                        "squarify", "binary"
                    ]
                }
            },
            colorReverseSignal(specViewOptions)
        ], insight.columns.facet && facetSignals(insight.facets, specViewOptions));
        return signals;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const treemap = (insight, columns, specViewOptions) => {
        const errors = [];
        if (!columns.size)
            errors.push(`Must set a field for size`);
        checkForFacetErrors(insight.facets, errors);
        const specCapabilities = {
            roles: [
                {
                    role: 'size',
                    excludeCategoric: true
                },
                {
                    role: 'group',
                    allowNone: true
                },
                {
                    role: 'z',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'facet',
                    allowNone: true
                }
            ],
            signals: [SignalNames.TreeMapMethod]
        };
        if (errors.length) {
            return {
                errors,
                specCapabilities,
                vegaSpec: null,
            };
        }
        const categoricalColor = columns.color && !columns.color.quantitative;
        const dataName = categoricalColor ? DataNames.Legend : DataNames.Main;
        const TreeMapName = "SandDanceTreeMapFaceted";
        const data = getData$5(insight, columns, specViewOptions);
        let marks = getMarks$5(columns.facet ? TreeMapName : dataName, columns, specViewOptions);
        if (columns.facet) {
            const childData = {
                "name": TreeMapName,
                "source": DataNames.FacetGroupCell,
                "transform": treemapTransforms(insight)
            };
            marks = facetMarks(specViewOptions, dataName, marks, null, [childData]);
            marks[0].marks;
        }
        const size = columns.facet ? facetSize(insight.facets, insight.size, specViewOptions) : insight.size;
        var vegaSpec = {
            "$schema": "https://vega.github.io/schema/vega/v3.json",
            "height": size.height,
            "width": size.width,
            signals: getSignals$5(insight, specViewOptions),
            data,
            scales: getScales$5(columns, insight),
            marks
        };
        if (columns.color && !insight.hideLegend) {
            vegaSpec.legends = [legend(columns.color)];
        }
        if (columns.facet) {
            vegaSpec.layout = layout(specViewOptions);
        }
        else {
            //use autosize only when not faceting
            vegaSpec.autosize = "fit";
        }
        return { vegaSpec, specCapabilities };
    };

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const creators = {
        barchart,
        density,
        grid,
        scatterplot,
        stacks,
        treemap
    };
    function create(insight, specColumns, specViewOptions) {
        const creator = creators[insight.chart];
        if (creator) {
            const specResult = creator(insight, specColumns, specViewOptions);
            //TODO: find why Vega is doing this. fixup for facets
            if (specResult.vegaSpec && insight.columns && insight.columns.facet && insight.facets.columns === 2 && insight.facets.rows === 1) {
                specResult.vegaSpec.width = insight.size.width / 3;
            }
            return specResult;
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function cloneVegaSpecWithData(insight, specColumns, specViewOptions, currData) {
        const columns = [
            specColumns.color,
            specColumns.facet,
            specColumns.group,
            specColumns.size,
            specColumns.sort,
            specColumns.x,
            specColumns.y,
            specColumns.z
        ];
        inferAll(columns, currData);
        const specResult = create(insight, specColumns, specViewOptions);
        if (!specResult.errors) {
            const data0 = specResult.vegaSpec.data[0];
            data0.values = currData;
        }
        return specResult;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function valueToString(value) {
        if (value == null) {
            return '';
        }
        switch (typeof value) {
            case 'string':
                return value;
            case 'boolean':
            case 'number':
                return value.toString();
        }
        return '';
    }
    function isStringOperation(ex) {
        switch (ex.operator) {
            case 'contains':
            case '!contains':
            case 'starts':
            case '!starts':
                return true;
        }
        return false;
    }
    function isnullorEmpty(value) {
        if (value == null)
            return true; //double equal sign to also catch undefined
        if (typeof value === 'string' && value.length === 0)
            return true;
        return false;
    }
    class Exec {
        constructor(search, columns) {
            this.columns = columns;
            this.groups = clone(ensureSearchExpressionGroupArray(search));
            this.groups.forEach(group => {
                group.expressions.forEach(ex => {
                    ex.column = this.getColumn(ex.name);
                    ex.valueLow = valueToString(ex.value).toLocaleLowerCase();
                    ex.stringOperation = isStringOperation(ex);
                });
            });
        }
        getColumn(name) {
            for (let i = 0; i < this.columns.length; i++) {
                if (this.columns[i].name == name) {
                    return this.columns[i];
                }
            }
        }
        runExpressionOnColumn(datum, ex) {
            const actualDataValue = datum[ex.name];
            if (ex.operator === 'isnullorEmpty') {
                return isnullorEmpty(actualDataValue);
            }
            else if (ex.operator === '!isnullorEmpty') {
                return !isnullorEmpty(actualDataValue);
            }
            let dataValue = actualDataValue;
            let expressionValue = ex.value;
            if (ex.column) {
                if (ex.column.type === 'string' || ex.stringOperation) {
                    dataValue = valueToString(actualDataValue).toLocaleLowerCase();
                    expressionValue = ex.valueLow;
                }
                else if (ex.column.quantitative) {
                    dataValue = +actualDataValue;
                    expressionValue = +ex.value;
                }
            }
            switch (ex.operator) {
                case '!=':
                    return dataValue != expressionValue;
                case '<':
                    return dataValue < expressionValue;
                case '<=':
                    return dataValue <= expressionValue;
                case '==':
                    return dataValue == expressionValue;
                case '>':
                    return dataValue > expressionValue;
                case '>=':
                    return dataValue >= expressionValue;
                case 'contains':
                    return dataValue.indexOf(expressionValue) >= 0;
                case '!contains':
                    return dataValue.indexOf(expressionValue) < 0;
                case 'starts':
                    return dataValue.indexOf(expressionValue) == 0;
                case '!starts':
                    return dataValue.indexOf(expressionValue) !== 0;
            }
        }
        runExpression(datum, ex) {
            if (ex.name == null) {
                //run on all columns
                const group = {
                    expressions: this.columns.map((column, i) => {
                        const ex2 = Object.assign({}, ex, { column, name: column.name });
                        if (i) {
                            ex2.clause = '||';
                        }
                        return ex2;
                    })
                };
                return this.runGroup(datum, group);
            }
            else {
                return this.runExpressionOnColumn(datum, ex);
            }
        }
        runGroup(datum, group) {
            let accumulator = this.runExpression(datum, group.expressions[0]);
            for (let i = 1; i < group.expressions.length; i++) {
                let ex = group.expressions[i];
                switch (ex.clause) {
                    case '&&':
                        accumulator = accumulator && this.runExpression(datum, ex);
                        break;
                    case '||':
                        accumulator = accumulator || this.runExpression(datum, ex);
                        break;
                }
            }
            return accumulator;
        }
        run(datum) {
            let accumulator = this.runGroup(datum, this.groups[0]);
            for (let i = 1; i < this.groups.length; i++) {
                let group = this.groups[i];
                switch (group.clause) {
                    case '&&':
                        accumulator = accumulator && this.runGroup(datum, group);
                        break;
                    case '||':
                        accumulator = accumulator || this.runGroup(datum, group);
                        break;
                }
            }
            return accumulator;
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    class DataScope {
        setData(data, columns) {
            const differentData = this.data !== data;
            if (differentData) {
                if (this.data) {
                    //clean up things we added to old data
                    this.deselect();
                }
                this.data = data;
                this.columns = columns;
                this.filteredData = null;
            }
            return differentData;
        }
        getColumns(columnTypes) {
            if (!this.columns) {
                this.columns = getColumnsFromData(this.data, columnTypes);
            }
            return this.columns;
        }
        currentData() {
            return this.filteredData || this.data;
        }
        select(search) {
            this.deselect();
            if (search) {
                this.selection = this.createUserSelection(search, true);
                if (this.selection.included.length) {
                    this.activate(this.selection.included[0]);
                }
            }
        }
        createUserSelection(search, assign) {
            const exec = new Exec(search, this.getColumns());
            const s = {
                search,
                included: [],
                excluded: []
            };
            this.currentData().forEach(datum => {
                if (exec.run(datum)) {
                    if (assign) {
                        datum[FieldNames.Selected] = true;
                    }
                    s.included.push(datum);
                }
                else {
                    s.excluded.push(datum);
                }
            });
            return s;
        }
        deselect() {
            this.deactivate();
            this.data.forEach(datum => {
                delete datum[FieldNames.Selected];
            });
            this.selection = null;
        }
        hasSelectedData() {
            return !!this.selection;
        }
        collapse(collapsed, data = this.data) {
            data.forEach(datum => {
                datum[FieldNames.Collapsed] = collapsed;
            });
            this.isCollapsed = collapsed;
        }
        activate(datum) {
            this.deactivate();
            datum[FieldNames.Active] = true;
            this.active = datum;
        }
        deactivate() {
            if (this.active) {
                delete this.active[FieldNames.Active];
            }
            this.active = null;
        }
        ordinalIndexWithinSelection(ordinal) {
            if (this.selection) {
                for (let i = 0; i < this.selection.included.length; i++) {
                    let datum = this.selection.included[i];
                    if (datum[GL_ORDINAL] === ordinal) {
                        return { datum, index: i };
                    }
                }
            }
            return { datum: null, index: -1 };
        }
        finalize() {
            this.data = null;
            this.filteredData = null;
            if (this.selection) {
                this.selection.excluded = null;
                this.selection.included = null;
                this.selection = null;
            }
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    var Action;
    (function (Action) {
        Action[Action["deselect"] = 0] = "deselect";
        Action[Action["isolate"] = 1] = "isolate";
        Action[Action["exclude"] = 2] = "exclude";
        Action[Action["reset"] = 3] = "reset";
        Action[Action["next"] = 4] = "next";
        Action[Action["previous"] = 5] = "previous";
    })(Action || (Action = {}));
    class Details {
        constructor(parentElement, language, animator, dataScope, colorMapHandler, hasColorMaps) {
            this.language = language;
            this.animator = animator;
            this.dataScope = dataScope;
            this.colorMapHandler = colorMapHandler;
            this.hasColorMaps = hasColorMaps;
            this.element = addDiv(parentElement, `${cssPrefix}unitControls`);
            this.clear();
        }
        finalize() {
            if (this.element)
                this.element.innerHTML = '';
            this.dataScope = null;
            this.element = null;
        }
        clear() {
            this.state = {
                userSelection: null,
                index: -1,
                remapColor: false
            };
            this.render();
        }
        clearSelection() {
            this.state.userSelection = null;
            this.state.index = -1;
            this.render();
        }
        populate(userSelection, index = 0) {
            this.state.userSelection = userSelection;
            this.state.index = index;
            this.render();
        }
        selectByNameValue(columnName, value) {
            const search = {
                name: columnName,
                operator: '==',
                value
            };
            this.clearSelection();
            this.animator.select(search);
            this.populate(this.dataScope.selection);
        }
        remapChanged(remap) {
            this.state.remapColor = remap;
            this.colorMapHandler(remap);
            this.render();
        }
        handleAction(action) {
            let p;
            const u = this.state.userSelection;
            switch (action) {
                case Action.deselect:
                    this.clearSelection();
                    p = this.animator.deselect();
                    break;
                case Action.exclude:
                    this.clearSelection();
                    p = this.animator.filter(invert(u.search), u.excluded, u.included);
                    this.state.remapColor = false;
                    break;
                case Action.isolate:
                    this.clearSelection();
                    p = this.animator.filter(u.search, u.included, u.excluded);
                    this.state.remapColor = false;
                    break;
                case Action.reset:
                    this.clear();
                    p = this.animator.reset();
                    break;
                default:
                    switch (action) {
                        case Action.previous:
                            this.state.index--;
                            if (this.state.index < 0) {
                                this.state.index = this.state.userSelection.included.length - 1;
                            }
                            break;
                        case Action.next:
                            this.state.index++;
                            if (this.state.index >= this.state.userSelection.included.length) {
                                this.state.index = 0;
                            }
                            break;
                    }
                    this.render();
                    p = this.animator.activate(this.state.userSelection.included[this.state.index]);
            }
            p.then(() => this.render());
        }
        render() {
            const hasRefinedData = !!this.dataScope.filteredData;
            const renderProps = {
                language: this.language,
                actionHandler: action => this.handleAction(action),
                selectionHandler: (columnName, value) => this.selectByNameValue(columnName, value),
                count: this.state.userSelection && this.state.userSelection.included.length,
                hasRefinedData,
                item: this.state.userSelection && this.state.userSelection.included[this.state.index],
                remapColorHandler: remap => this.remapChanged(remap),
                hasColorMaps: this.hasColorMaps() && hasRefinedData,
                remapColor: this.state.remapColor
            };
            mount(renderDetails(renderProps), this.element);
        }
    }
    const renderDetails = (props) => {
        const controlButtons = [
            createElement("button", { disabled: !props.item, onClick: e => props.actionHandler(Action.deselect) }, props.language.deselect),
            createElement("button", { disabled: !props.item, onClick: e => props.actionHandler(Action.isolate) }, props.language.isolate),
            createElement("button", { disabled: !props.item, onClick: e => props.actionHandler(Action.exclude) }, props.language.exclude)
        ];
        const colorMapping = (createElement("div", null,
            createElement("button", { disabled: props.remapColor, onClick: e => props.remapColorHandler(true) }, props.language.newColorMap),
            createElement("button", { disabled: !props.remapColor, onClick: e => props.remapColorHandler(false) }, props.language.oldColorMap)));
        const singleItem = props.count === 1;
        const scrollButtons = [
            createElement("button", { disabled: singleItem, onClick: e => props.actionHandler(Action.previous) }, props.language.previousDetail),
            createElement("button", { disabled: singleItem, onClick: e => props.actionHandler(Action.next) }, props.language.nextDetail),
            createElement("span", null,
                " ",
                props.language.selectionCount(props.count))
        ];
        const rows = [];
        for (let prop in props.item) {
            if (prop === GL_ORDINAL) {
                continue;
            }
            if (isInternalFieldName(prop)) {
                continue;
            }
            rows.push({
                cells: [
                    { content: prop }, { content: linkSelect(props.language, prop, props.item[prop], props.selectionHandler) }
                ]
            });
        }
        return (createElement("div", null,
            props.hasColorMaps && colorMapping,
            createElement("h4", null, props.language.headers.selection),
            createElement("div", { className: `${cssPrefix}selection` },
                controlButtons,
                createElement("button", { disabled: !props.hasRefinedData, onClick: e => props.actionHandler(Action.reset) }, "reset")),
            props.item && createElement("h4", null, props.language.headers.details),
            createElement("div", null,
                createElement("div", { className: `${cssPrefix}details-scroll` }, props.item && scrollButtons),
                createElement("div", { className: `${cssPrefix}details` }, props.item && createElement(Table, { rows: rows })))));
    };
    function linkSelect(language, columnName, value, selectionHandler) {
        return (createElement("span", null,
            createElement("a", { href: "#", onClick: e => selectionHandler(columnName, value) }, value),
            isNaN(value) ? [' ', createElement("a", { className: "bing-search", href: `https://www.bing.com/search?q=${encodeURIComponent(value)}`, target: "_blank" }, language.bing)] : ''));
    }

    function ensureHeaders(presenter, headers) {
        const vegaControls = presenter.getElement(PresenterElement.vegaControls);
        conditionalHeader(!!vegaControls.querySelectorAll('.vega-bindings > *').length, vegaControls, headers.chart);
        const legend = presenter.getElement(PresenterElement.legend);
        conditionalHeader(!!legend.children.length, legend, headers.legend);
    }
    function conditionalHeader(condition, element, header) {
        var existing = existingHeader(element, header);
        if (condition && !existing) {
            addHeader(element, header);
        }
        if (!condition && existing) {
            existing.remove();
        }
    }
    function addHeader(element, header) {
        const h = document.createElement('h4');
        h.innerHTML = header;
        element.insertAdjacentElement('beforebegin', h);
    }
    function existingHeader(element, header) {
        const { previousElementSibling } = element;
        if (previousElementSibling && previousElementSibling.innerHTML === header) {
            return previousElementSibling;
        }
    }

    function legendRange(colorBinType, column, legend, clickedIndex) {
        if (column.quantitative) {
            return selectQuantitative(colorBinType, column, legend, clickedIndex);
        }
        else {
            return selectCategorical(column, legend, clickedIndex);
        }
    }
    function selectCategorical(column, legend, clickedIndex) {
        const value = legend.rows[clickedIndex].value;
        if (value === Other) {
            const values = [];
            for (let i in legend.rows) {
                if (+i !== clickedIndex) {
                    values.push(legend.rows[i].value);
                }
            }
            return selectNone(column, values);
        }
        else {
            //select equal
            return { expressions: [selectExact(column, legend.rows[clickedIndex].value)] };
        }
    }
    function selectQuantitative(colorBinType, column, legend, clickedIndex) {
        const keys = Object.keys(legend.rows).map(key => +key).sort((a, b) => +a - +b);
        let lowValue;
        let lowOperator;
        let highValue;
        let highOperator;
        const rowText = legend.rows[clickedIndex].value;
        switch (colorBinType) {
            case 'continuous':
                lowValue = rowText;
                if (clickedIndex < keys.length - 1) {
                    highValue = legend.rows[clickedIndex + 1].value;
                }
                break;
            default:
                if (rowText.indexOf('null') > 0) {
                    const ex = {
                        expressions: [selectNullOrEmpty(column)]
                    };
                    return ex;
                }
                const dash = rowText.indexOf('–'); //this is not the common dash character!
                if (dash > 0) {
                    //bug in Vega for quantize?
                    //lowOperator = '>';
                    //highOperator = '<=';
                    lowValue = rowText.substr(0, dash);
                    highValue = rowText.substr(dash + 1);
                }
                else {
                    if (rowText.indexOf('<') >= 0) {
                        highValue = rowText.substring(2);
                    }
                    else {
                        if (rowText.indexOf('≥') >= 0) {
                            lowValue = rowText.substring(2);
                        }
                    }
                }
        }
        if (lowValue)
            lowValue = notNice(lowValue);
        if (highValue)
            highValue = notNice(highValue);
        return selectBetween(column, lowValue, highValue, lowOperator, highOperator);
    }
    function finalizeLegend(colorBinType, colorColumn, legend, language) {
        const rowTexts = [];
        for (let i in legend.rows) {
            let row = legend.rows[i];
            row.search = legendRange(colorBinType, colorColumn, legend, +i);
            if (row.value === Other) {
                row.label = language.legendOther;
            }
            else if (rowTexts.indexOf(row.value) >= 0) {
                delete legend.rows[i];
            }
            else {
                rowTexts.push(row.value);
            }
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function cloneAxis(axes, axisColor, axisTextColor) {
        return axes.map(axis => {
            const newAxis = deepMerge(axis);
            newAxis.domain.color = axisColor;
            newAxis.title.color = axisTextColor;
            newAxis.ticks.forEach(t => { t.color = axisColor; });
            newAxis.tickText.forEach(t => { t.color = axisTextColor; });
            return newAxis;
        });
    }
    function cloneTextData(textData, color) {
        return textData.map(t => {
            return Object.assign({}, t, { color });
        });
    }
    function colorEquals(a, b) {
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    }
    function recolorAxes(stage, oldColors, newColors) {
        const hasNewLineColor = newColors.axisLine && !colorEquals(newColors.axisLine, oldColors.axisLine);
        const hasNewTextColor = newColors.axisText && !colorEquals(newColors.axisText, oldColors.axisText);
        let axes;
        let textData;
        if (hasNewLineColor || hasNewTextColor) {
            const lineColor = newColors.axisLine || oldColors.axisLine;
            const textColor = newColors.axisText || oldColors.axisText;
            axes = {
                x: cloneAxis(stage.axes.x, lineColor, textColor),
                y: cloneAxis(stage.axes.y, lineColor, textColor)
            };
        }
        if (hasNewTextColor) {
            textData = cloneTextData(stage.textData, newColors.axisText);
        }
        return { axes, textData };
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    class Tooltip {
        constructor(props) {
            const renderProps = {
                cssPrefix: props.cssPrefix,
                rows: getRows(props.item, props.options)
            };
            this.element = renderTooltip(renderProps);
            if (this.element) {
                this.element.style.position = 'absolute';
                this.child = this.element.firstChild;
                document.body.appendChild(this.element);
                //measure and move as necessary
                let m = outerSize(this.child);
                while (m.height > document.documentElement.clientHeight) {
                    let tr = this.child.querySelector('tr:last-child');
                    if (tr) {
                        tr.parentElement.removeChild(tr);
                    }
                    else {
                        break;
                    }
                    m = outerSize(this.child);
                }
                if (props.position.clientX + m.width >= document.documentElement.clientWidth) {
                    this.child.style.right = '0';
                }
                let moveTop = true;
                if (props.position.clientY + m.height >= document.documentElement.clientHeight) {
                    if (props.position.clientY - m.height > 0) {
                        this.child.style.bottom = '0';
                    }
                    else {
                        moveTop = false;
                    }
                }
                if (moveTop) {
                    this.element.style.top = `${props.position.clientY}px`;
                }
                this.element.style.left = `${props.position.clientX}px`;
            }
        }
        finalize() {
            if (this.element) {
                document.body.removeChild(this.element);
            }
            this.element = null;
        }
    }
    function getRows(item, options) {
        const rows = [];
        for (let columnName in item) {
            if (columnName === GL_ORDINAL) {
                continue;
            }
            if (isInternalFieldName(columnName)) {
                continue;
            }
            if (options && options.exclude) {
                if (options.exclude(columnName)) {
                    continue;
                }
            }
            rows.push({
                cells: [
                    { content: columnName + ':' },
                    { content: item[columnName] }
                ]
            });
        }
        return rows;
    }
    const renderTooltip = (props) => {
        return props.rows.length === 0 ? null : (createElement("div", { className: `${props.cssPrefix}tooltip` }, Table({ rows: props.rows })));
    };

    // Copyright (c) Microsoft Corporation. All rights reserved.
    let didRegisterColorSchemes = false;
    /**
     * Component to view a SandDance data visualization.
     */
    class Viewer {
        /**
         * Instantiate a new Viewer.
         * @param element Parent HTMLElement to present within.
         * @param options Optional viewer options object.
         */
        constructor(element, options) {
            this.element = element;
            this.options = deepMerge(defaultViewerOptions, options);
            this.presenter = new Presenter(element, getPresenterStyle(this.options));
            this._dataScope = new DataScope();
            this._animator = new Animator(this._dataScope, {
                onDataChanged: this.onDataChanged.bind(this),
                onAnimateDataChange: this.onAnimateDataChange.bind(this)
            });
            this._details = new Details(this.presenter.getElement(PresenterElement.panel), this.options.language, this._animator, this._dataScope, remap => {
                this.currentColorContext = ~~remap;
                this.renderSameLayout();
            }, () => this.insight && this.insight.columns && !!this.insight.columns.color && this.colorContexts && this.colorContexts.length > 1);
            this.insight = {};
            this._signalValues = {};
        }
        changeColorContexts(colorContexts) {
            this.colorContexts = colorContexts;
            this.currentColorContext = 0;
            this.options.onColorContextChange && this.options.onColorContextChange();
        }
        applyLegendColorContext(colorContext) {
            mount(colorContext.legendElement, this.presenter.getElement(PresenterElement.legend));
            this.presenter.stage.legend = colorContext.legend;
        }
        onAnimateDataChange(dataChange, waitingLabel, handlerLabel) {
            if (dataChange === DataLayoutChange.refine) {
                const oldColorContext = this.colorContexts[this.currentColorContext];
                this.renderNewLayout({
                    preStage: (stage, deckProps) => {
                        finalizeLegend(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
                        applyColorMapToCubes([oldColorContext.colorMap], getCubes(deckProps));
                        if (this.options.onStage) {
                            this.options.onStage(stage, deckProps);
                        }
                    }
                });
                //apply old legend
                this.applyLegendColorContext(oldColorContext);
            }
            else {
                this.renderNewLayout({
                    preStage: (stage, deckProps) => {
                        finalizeLegend(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
                        if (this.options.onStage) {
                            this.options.onStage(stage, deckProps);
                        }
                    }
                });
            }
            return new Promise((resolve, reject) => {
                this.presenter.animationQueue(resolve, this.options.transitionDurations.position, { waitingLabel, handlerLabel, animationCanceled: reject });
            });
        }
        onDataChanged(dataLayout, filter) {
            switch (dataLayout) {
                case DataLayoutChange.same:
                    this.renderSameLayout();
                    break;
                case DataLayoutChange.refine:
                    //save cube colors
                    const oldColorContext = this.colorContexts[this.currentColorContext];
                    let colorMap;
                    this.renderNewLayout({
                        preStage: (stage, deckProps) => {
                            //save off the spec colors
                            colorMap = colorMapFromCubes(stage.cubeData);
                            applyColorMapToCubes([oldColorContext.colorMap], getCubes(deckProps));
                            this.preStage(stage, deckProps);
                        },
                        onPresent: () => {
                            //save new legend
                            const newColorContext = {
                                colorMap,
                                legend: clone(this.presenter.stage.legend),
                                legendElement: this.presenter.getElement(PresenterElement.legend).children[0]
                            };
                            //apply old legend
                            this.applyLegendColorContext(oldColorContext);
                            this.changeColorContexts([oldColorContext, newColorContext]);
                        }
                    });
                    this.insight.filter = narrow(this.insight.filter, filter);
                    if (this.options.onDataFilter) {
                        this.options.onDataFilter(this.insight.filter, this._dataScope.currentData());
                    }
                    break;
                case DataLayoutChange.reset:
                    const colorContext = {
                        colorMap: null,
                        legend: null,
                        legendElement: null
                    };
                    this.changeColorContexts([colorContext]);
                    this.renderNewLayout({
                        onPresent: () => {
                            populateColorContext(colorContext, this.presenter);
                        }
                    });
                    delete this.insight.filter;
                    if (this.options.onDataFilter) {
                        this.options.onDataFilter(null, null);
                    }
                    break;
            }
            if (this.options.onSelectionChanged) {
                const sel = this.getSelection();
                this.options.onSelectionChanged((sel && sel.search) || null);
            }
        }
        renderNewLayout(c, view) {
            const currData = this._dataScope.currentData();
            const specResult = cloneVegaSpecWithData(this.insight, this._specColumns, this.options, currData);
            if (!specResult.errors) {
                const uiValues = extractSignalValuesFromView(this.vegaViewGl, this.vegaSpec);
                this._signalValues = Object.assign({}, this._signalValues, uiValues, this.insight.signalValues);
                applySignalValues(this._signalValues, specResult.vegaSpec);
                this.vegaSpec = specResult.vegaSpec;
                this.options.onVegaSpec && this.options.onVegaSpec(this.vegaSpec);
                this.specCapabilities = specResult.specCapabilities;
                const config = this.createConfig(c);
                if (view) {
                    config.getView = () => view;
                }
                if (!didRegisterColorSchemes) {
                    registerColorSchemes(base.vega);
                    didRegisterColorSchemes = true;
                }
                try {
                    const runtime = base.vega.parse(this.vegaSpec);
                    this.vegaViewGl = new ViewGl(runtime, config)
                        .renderer('deck.gl')
                        .initialize(this.element)
                        .run();
                    //capture new color color contexts via signals
                    this.configForSignalCapture(config.presenterConfig);
                }
                catch (e) {
                    specResult.errors = [e.message];
                }
                if (!specResult.errors) {
                    ensureHeaders(this.presenter, this.options.language.headers);
                }
            }
            if (specResult.errors) {
                if (this.options.onError) {
                    this.options.onError(specResult.errors);
                }
                else if (this.presenter.logger) {
                    this.presenter.logger(`errors rendering Vega spec:${specResult.errors.join('\n')}`);
                }
            }
            return specResult;
        }
        /**
         * Render the same layout with new options.
         * @param newViewerOptions New options object.
         */
        renderSameLayout(newViewerOptions) {
            const colorContext = this.colorContexts[this.currentColorContext];
            const clonedCubes = this.presenter.getCubeData().map(cube => {
                return Object.assign({}, cube);
            });
            this.applyLegendColorContext(colorContext);
            let { axes, textData } = this.presenter.stage;
            let recoloredAxes;
            if (newViewerOptions) {
                if (newViewerOptions.colors) {
                    recoloredAxes = recolorAxes(this.presenter.stage, this._lastColorOptions, newViewerOptions.colors);
                    axes = recoloredAxes.axes || axes;
                    textData = recoloredAxes.textData || textData;
                }
                this.options = deepMerge(this.options, newViewerOptions);
            }
            let colorMaps = [colorContext.colorMap];
            let colorMethod;
            const hasSelectedData = this._dataScope.hasSelectedData();
            const hasActive = !!this._dataScope.active;
            if (hasSelectedData || hasActive) {
                const selectedColorMap = getSelectedColorMap(this._dataScope.currentData(), hasSelectedData, hasActive, this.options);
                colorMaps.push(selectedColorMap);
                colorMethod = this.options.colors.unselectedColorMethod;
            }
            applyColorMapToCubes(colorMaps, clonedCubes, colorMethod);
            const stage = { cubeData: clonedCubes, axes, textData };
            this.vegaViewGl.presenter.rePresent(stage, this.createConfig().presenterConfig);
        }
        getView(view) {
            if (view === undefined) {
                if (this.presenter.view === null) {
                    return defaultView;
                }
                else {
                    return this.presenter.view;
                }
            }
            else {
                return view;
            }
        }
        /**
         * Render data into a visualization.
         * @param insight Object to create a visualization specification.
         * @param data Array of data objects.
         * @param view Optional View to specify camera type.
         * @param ordinalMap Optional map of ordinals to assign to the data such that the same cubes can be re-used for new data.
         */
        render(insight, data, options = {}) {
            return new Promise((resolve, reject) => {
                let result;
                const layout = () => {
                    result = this._render(insight, data, options);
                };
                //see if refine expression has changed
                if (!compare(insight.filter, this.insight.filter)) {
                    if (insight.filter) {
                        //refining
                        layout();
                        this.presenter.animationQueue(() => {
                            this.filter(insight.filter);
                        }, this.options.transitionDurations.position, { waitingLabel: 'layout before refine', handlerLabel: 'refine after layout' });
                    }
                    else {
                        //not refining
                        this._dataScope.filteredData = null;
                        layout();
                        this.presenter.animationQueue(() => {
                            this.reset();
                        }, 0, { waitingLabel: 'layout before reset', handlerLabel: 'reset after layout' });
                    }
                }
                else {
                    layout();
                }
                resolve(result);
            });
        }
        shouldViewstateTransition(newInsight, oldInsight) {
            if (!oldInsight.columns)
                return false;
            if (oldInsight.chart !== newInsight.chart)
                return true;
            if (oldInsight.size.height !== newInsight.size.height)
                return true;
            if (oldInsight.size.width !== newInsight.size.width)
                return true;
            if (oldInsight.columns.facet !== newInsight.columns.facet)
                return true;
            return false;
        }
        configForSignalCapture(presenterConfig) {
            const colorContext = {
                colorMap: null,
                legend: null,
                legendElement: null
            };
            //now be ready to capture color changing signals 
            presenterConfig.preStage = (stage, deckProps) => {
                if (this._shouldSaveColorContext()) {
                    //save off the colors from Vega layout
                    colorContext.colorMap = colorMapFromCubes(stage.cubeData);
                }
                this.preStage(stage, deckProps);
            };
            presenterConfig.onPresent = () => {
                if (this._shouldSaveColorContext()) {
                    populateColorContext(colorContext, this.presenter);
                    this.changeColorContexts([colorContext]);
                    this._dataScope.deselect();
                }
            };
        }
        _render(insight, data, options) {
            if (this._tooltip) {
                this._tooltip.finalize();
                this._tooltip = null;
            }
            if (this._dataScope.setData(data, options.columns)) {
                //data is different, reset the signal value cache
                this._signalValues = {};
            }
            this._specColumns = getSpecColumns(insight, this._dataScope.getColumns(options.columnTypes));
            const ordinalMap = assignOrdinals(this._specColumns, data, options.ordinalMap);
            this.insight = clone(insight);
            this._lastColorOptions = clone(this.options.colors);
            this._shouldSaveColorContext = () => !options.initialColorContext;
            const colorContext = options.initialColorContext || {
                colorMap: null,
                legend: null,
                legendElement: null
            };
            const specResult = this.renderNewLayout({
                preStage: (stage, deckProps) => {
                    if (this._shouldSaveColorContext()) {
                        //save off the colors from Vega layout
                        colorContext.colorMap = colorMapFromCubes(stage.cubeData);
                    }
                    else {
                        //apply passed colorContext
                        applyColorMapToCubes([colorContext.colorMap], getCubes(deckProps));
                    }
                    //if items are selected, repaint
                    const hasSelectedData = !!this._dataScope.hasSelectedData();
                    const hasActive = !!this._dataScope.active;
                    if (this._dataScope.hasSelectedData() || this._dataScope.active) {
                        const selectedColorMap = getSelectedColorMap(this._dataScope.currentData(), hasSelectedData, hasActive, this.options);
                        applyColorMapToCubes([colorContext.colorMap, selectedColorMap], stage.cubeData, this.options.colors.unselectedColorMethod);
                    }
                    this.preStage(stage, deckProps);
                },
                onPresent: () => {
                    if (this._shouldSaveColorContext()) {
                        populateColorContext(colorContext, this.presenter);
                        this.changeColorContexts([colorContext]);
                    }
                    else {
                        //apply passed colorContext
                        this.applyLegendColorContext(colorContext);
                    }
                },
                shouldViewstateTransition: () => this.shouldViewstateTransition(insight, this.insight)
            }, this.getView(insight.view));
            //future signal changes should save the color context
            this._shouldSaveColorContext = () => !options.discardColorContextUpdates || !options.discardColorContextUpdates();
            this._details.render();
            const result = { ordinalMap, specResult };
            return result;
        }
        preStage(stage, deckProps) {
            const onClick = (e, search) => {
                if (this.options.onAxisClick) {
                    this.options.onAxisClick(e, search);
                }
                else {
                    this.select(search);
                }
            };
            const polygonLayer = axisSelectionLayer(this.presenter, this.specCapabilities, this._specColumns, stage, onClick, this.options.colors.axisSelectHighlight, this.options.selectionPolygonZ);
            const order = 1; //after textlayer but before others
            deckProps.layers.splice(order, 0, polygonLayer);
            finalizeLegend(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
            if (this.options.onStage) {
                this.options.onStage(stage, deckProps);
            }
        }
        onCubeClick(e, cube) {
            const hasSelectedData = this._dataScope.hasSelectedData();
            if (hasSelectedData && this._dataScope.selection.included.length > 1) {
                //if active is within selection, keep the selection and activate the one.
                const indexWithinSelection = this._dataScope.ordinalIndexWithinSelection(cube.ordinal);
                if (indexWithinSelection.index >= 0) {
                    this.activate(indexWithinSelection.datum);
                    this._details.populate(this._dataScope.selection, indexWithinSelection.index);
                    if (this.options.onSelectionChanged) {
                        const sel = this.getSelection();
                        this.options.onSelectionChanged(sel.search, indexWithinSelection.index);
                    }
                    return;
                }
            }
            if (hasSelectedData && this._dataScope.selection.included.length === 1 && this._dataScope.selection.included[0][GL_ORDINAL] === cube.ordinal) {
                this.deselect();
                return;
            }
            const search = {
                name: GL_ORDINAL,
                operator: '==',
                value: cube.ordinal
            };
            this.select(search);
        }
        onCubeHover(e, cube) {
            if (this._tooltip) {
                this._tooltip.finalize();
                this._tooltip = null;
            }
            if (!cube) {
                return;
            }
            const currentData = this._dataScope.currentData();
            const index = getDataIndexOfCube(cube, currentData);
            if (index >= 0) {
                this._tooltip = new Tooltip({
                    options: this.options.tooltipOptions,
                    item: currentData[index],
                    position: e,
                    cssPrefix: this.presenter.style.cssPrefix
                });
            }
        }
        onTextHover(e, t) {
            //return true if highlight color is different
            if (!t || !this.options.getTextColor || !this.options.getTextHighlightColor)
                return false;
            return !colorIsEqual(this.options.getTextColor(t), this.options.getTextHighlightColor(t));
        }
        createConfig(c) {
            const { getTextColor, getTextHighlightColor, onTextClick } = this.options;
            const defaultPresenterConfig$$1 = {
                getTextColor,
                getTextHighlightColor,
                onTextClick,
                onCubeClick: this.onCubeClick.bind(this),
                onCubeHover: this.onCubeHover.bind(this),
                onTextHover: this.onTextHover.bind(this),
                preStage: this.preStage.bind(this),
                onPresent: this.options.onPresent,
                onLayerClick: (info, pickedInfos, e) => {
                    if (!info) {
                        this.deselect();
                    }
                },
                onLegendClick: (e, legend, clickedIndex) => {
                    const legendRow = clickedIndex !== null && legend.rows[clickedIndex];
                    if (legendRow) {
                        if (this.options.onLegendRowClick) {
                            this.options.onLegendRowClick(e, legendRow);
                        }
                        else {
                            this.select(legendRow.search);
                        }
                    }
                    else if (this.options.onLegendHeaderClick) {
                        //header clicked
                        this.options.onLegendHeaderClick(e);
                    }
                }
            };
            if (this.options.onBeforeCreateLayers) {
                defaultPresenterConfig$$1.preLayer = stage => this.options.onBeforeCreateLayers(stage, this.specCapabilities);
            }
            const config = {
                presenter: this.presenter,
                presenterConfig: Object.assign(defaultPresenterConfig$$1, c)
            };
            if (this.options.transitionDurations) {
                config.presenterConfig.transitionDurations = this.options.transitionDurations;
            }
            return config;
        }
        /**
         * Filter the data and animate.
         * @param search Filter expression, see https://vega.github.io/vega/docs/expressions/
         */
        filter(search) {
            const u = this._dataScope.createUserSelection(search, false);
            return new Promise((resolve, reject) => {
                this._animator.filter(search, u.included, u.excluded).then(() => {
                    this._details.clear();
                    this._details.clearSelection();
                    this._details.populate(this._dataScope.selection);
                    resolve();
                });
            });
        }
        /**
         * Remove any filtration and animate.
         */
        reset() {
            return new Promise((resolve, reject) => {
                this._animator.reset().then(() => {
                    this._details.clear();
                    this._details.clearSelection();
                    resolve();
                });
            });
        }
        /**
         * Select cubes by a filter expression.
         * @param search Filter expression, see https://vega.github.io/vega/docs/expressions/
         */
        select(search) {
            return new Promise((resolve, reject) => {
                this._animator.select(search).then(() => {
                    this._details.populate(this._dataScope.selection);
                    resolve();
                });
            });
        }
        /**
         * Removes any selection.
         */
        deselect() {
            return new Promise((resolve, reject) => {
                this._animator.deselect().then(() => {
                    this._details.clearSelection();
                    resolve();
                });
            });
        }
        /**
         * Gets the current selection.
         */
        getSelection() {
            if (!this._dataScope)
                return null;
            const selectionState = {
                search: (this._dataScope.selection && this._dataScope.selection.search) || null,
                selectedData: (this._dataScope.selection && this._dataScope.selection.included) || null,
                active: this._dataScope.active
            };
            return selectionState;
        }
        /**
         * Set one data row to the active state.
         */
        activate(datum) {
            return new Promise((resolve, reject) => {
                this._animator.activate(datum).then(() => {
                    this._details.render();
                    resolve();
                });
            });
        }
        /**
         * Deactivate item.
         */
        deActivate() {
            return new Promise((resolve, reject) => {
                if (this._dataScope.active) {
                    this._animator.deactivate().then(() => {
                        this._details.render();
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            });
        }
        /**
         * Gets the current insight with signal values.
         */
        getInsight() {
            const insight = Object.assign({}, this.insight);
            insight.signalValues = this.getSignalValues();
            return insight;
        }
        /**
         * Gets current signal values.
         */
        getSignalValues() {
            return extractSignalValuesFromView(this.vegaViewGl, this.vegaSpec);
        }
        finalize() {
            if (this._dataScope)
                this._dataScope.finalize();
            if (this._details)
                this._details.finalize();
            if (this._tooltip)
                this._tooltip.finalize();
            if (this.vegaViewGl)
                this.vegaViewGl.finalize();
            if (this.presenter)
                this.presenter.finalize();
            if (this.element)
                this.element.innerHTML = '';
            this.colorContexts = null;
            this.element = null;
            this.options = null;
            this.presenter = null;
            this.vegaSpec = null;
            this.vegaViewGl = null;
            this._animator = null;
            this._dataScope = null;
            this._details = null;
            this._tooltip = null;
        }
    }
    /**
     * Default Viewer options.
     */
    Viewer.defaultViewerOptions = defaultViewerOptions;

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    const version = "1.4.0";

    // Copyright (c) Microsoft Corporation. All rights reserved.

    exports.colorSchemes = colorSchemes;
    exports.constants = constants;
    exports.searchExpression = index;
    exports.types = types;
    exports.use = use;
    exports.util = util$1;
    exports.VegaDeckGl = index$2;
    exports.Viewer = Viewer;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
