/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var SandDanceEmbed;
(function (SandDanceEmbed) {
    function defaultDependencies() {
        return [
            {
                type: 'stylesheet',
                url: 'https://unpkg.com/@msrvida/sanddance-embed@4/dist/css/sanddance-embed.css'
            },
            {
                type: 'stylesheet',
                url: 'https://unpkg.com/@msrvida/sanddance-explorer@4/dist/css/sanddance-explorer.css'
            },
            {
                type: 'script',
                url: 'https://unpkg.com/react@17/umd/react.production.min.js'
            },
            {
                type: 'script',
                url: 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js'
            },
            {
                type: 'script',
                url: 'https://unpkg.com/vega@5.22/build/vega.min.js'
            },
            {
                type: 'script',
                url: 'https://unpkg.com/@fluentui/react@8/dist/fluentui-react.js'
            },
            {
                type: 'script',
                url: 'https://unpkg.com/@msrvida/sanddance-explorer@4/dist/umd/sanddance-explorer.js'
            }
        ];
    }
    SandDanceEmbed.defaultDependencies = defaultDependencies;
    function getDependencies() {
        var qs = decodeURIComponent(document.location.search.substring(1));
        if (qs[0] === '[') {
            try {
                return JSON.parse(qs);
            }
            catch (e) { }
        }
        return defaultDependencies();
    }
    SandDanceEmbed.getDependencies = getDependencies;
    ;
    function loadDeps(depType, tagType, tagAttr, create) {
        var promises = [];
        var depsToLoad = SandDanceEmbed.deps.filter(function (dep) { return dep.type === depType; });
        var elements = __spreadArray(__spreadArray([], Array.from(document.head.querySelectorAll(tagType)), true), Array.from(document.body.querySelectorAll(tagType)), true);
        depsToLoad.forEach(function (dep) {
            var element = elements.find(function (element) {
                try {
                    return element.attributes[tagAttr].nodeValue === dep.url;
                }
                catch (e) {
                    return false;
                }
            });
            if (!element) {
                //load style
                var el_1 = create(dep);
                promises.push(new Promise(function (resolve, reject) {
                    el_1.onload = function () {
                        dep.loaded = true;
                        resolve();
                    };
                }));
                document.head.appendChild(el_1);
            }
            else {
                dep.existed = true;
                dep.loaded = true;
            }
        });
        return promises;
    }
    function getUnloadedDeps(depType, tagType, tagAttr) {
        var depsToLoad = SandDanceEmbed.deps.filter(function (dep) { return dep.type === depType; });
        var elements = __spreadArray(__spreadArray([], Array.from(document.head.querySelectorAll(tagType)), true), Array.from(document.body.querySelectorAll(tagType)), true);
        depsToLoad.forEach(function (dep) {
            var element = elements.find(function (element) { return element.attributes[tagAttr].nodeValue === dep.url; });
            if (element) {
                dep.existed = true;
                dep.loaded = true;
            }
        });
        return depsToLoad.filter(function (dep) { return !dep.loaded; });
    }
    function loadStyleSheets() {
        var promises = [];
        var deps = getUnloadedDeps('stylesheet', 'link', 'href');
        deps.forEach(function (dep) {
            promises.push(new Promise(function (resolve, reject) {
                var el = document.createElement('link');
                el.rel = 'stylesheet';
                el.type = 'text/css';
                el.href = dep.url;
                el.onload = function () {
                    dep.loaded = true;
                    resolve();
                };
                document.head.appendChild(el);
            }));
        });
        return promises;
    }
    function loadScripts() {
        var deps = getUnloadedDeps('script', 'script', 'src');
        var promise = new Promise(function (resolve, reject) {
            var next = function (index) {
                if (index >= deps.length) {
                    resolve();
                }
                else {
                    var dep_1 = deps[index];
                    var el = document.createElement('script');
                    el.src = dep_1.url;
                    el.onload = function () {
                        dep_1.loaded = true;
                        next(++index);
                    };
                    document.head.appendChild(el);
                }
            };
            next(0);
        });
        return [promise];
    }
    var prepare = new Promise(function (resolve, reject) {
        SandDanceEmbed.deps = getDependencies();
        Promise.all(__spreadArray(__spreadArray([], loadStyleSheets(), true), loadScripts(), true)).then(function () { return resolve(); });
    });
    SandDanceEmbed.requests = [];
    function load(data, insight) {
        return new Promise(function (resolve) {
            var innerLoad = function () {
                var getPartialInsight;
                if (insight) {
                    //TODO make sure that insight columns exist in dataset
                    getPartialInsight = function (columns) { return insight; };
                }
                SandDanceEmbed.sandDanceExplorer.load(data, getPartialInsight).then(resolve);
            };
            var create = function () {
                prepare.then(function () {
                    SandDanceExplorer.use(FluentUIReact, React, ReactDOM, vega);
                    var explorerProps = {
                        logoClickUrl: 'https://microsoft.github.io/SandDance/',
                        mounted: function (explorer) {
                            SandDanceEmbed.sandDanceExplorer = explorer;
                            innerLoad();
                        }
                    };
                    ReactDOM.render(React.createElement(SandDanceExplorer.Explorer, explorerProps), document.getElementById('app'));
                });
            };
            if (SandDanceEmbed.sandDanceExplorer) {
                innerLoad();
            }
            else {
                create();
            }
        });
    }
    SandDanceEmbed.load = load;
    function respondToRequest(requestWithSource) {
        SandDanceEmbed.requests.push(requestWithSource);
        var copy = __assign({}, requestWithSource);
        delete copy.source;
        var request = __assign({}, copy);
        var response;
        switch (request.action) {
            case 'init': {
                response = {
                    request: request
                };
                break;
            }
            case 'load': {
                var request_load = request;
                load(request_load.data, request_load.insight).then(function () {
                    response = {
                        request: request
                    };
                    requestWithSource.source.postMessage(response, '*');
                });
                //don't keep a copy of the array
                delete request_load.data;
                break;
            }
            case 'getData': {
                response = {
                    request: request,
                    data: SandDanceEmbed.sandDanceExplorer.state.dataContent.data
                };
                break;
            }
            case 'getInsight': {
                response = {
                    request: request,
                    insight: SandDanceEmbed.sandDanceExplorer.viewer.getInsight()
                };
                break;
            }
        }
        prepare.then(function () {
            if (response) {
                requestWithSource.source.postMessage(response, '*');
            }
        });
    }
    SandDanceEmbed.respondToRequest = respondToRequest;
    window.addEventListener('message', function (e) {
        var payload = e.data;
        if (!payload)
            return;
        if (Array.isArray(payload)) {
            var data = payload;
            var requestLoadFromArray = {
                action: 'load',
                data: data,
                insight: null
            };
            payload = requestLoadFromArray;
        }
        else {
            var dataWithInsight = payload;
            if (Array.isArray(dataWithInsight.data)) {
                var requestLoadFromDataWithInsight = __assign({ action: 'load' }, dataWithInsight);
                payload = requestLoadFromDataWithInsight;
            }
        }
        var request = payload;
        if (!request)
            return;
        var requestWithSource = __assign(__assign({}, request), { source: e.source });
        respondToRequest(requestWithSource);
    });
    if (window.opener) {
        var request = {
            action: 'init',
            ts: new Date()
        };
        respondToRequest(__assign(__assign({}, request), { source: window.opener }));
    }
})(SandDanceEmbed || (SandDanceEmbed = {}));
