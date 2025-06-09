(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vega'), require('vega-lite')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vega', 'vega-lite'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MdVega = {}, global.vega, global.vegaLite));
})(this, (function (exports, vega, vegaLite) { 'use strict';

    const R=/[^\t\n\f />"'=]/,v=" ",E="=",k=".",$="#",p=(e,t,{left:i,right:n,allowed:r})=>{let s="",l="",o=!0,h=!1;const f=[];for(let a=t+i.length;a<e.length;a++){if(e.slice(a,a+n.length)===n){s!==""&&f.push([s,l]);break}const c=e.charAt(a);if(c===E&&o){o=!1;continue}if(c===k&&s===""){e.charAt(a+1)===k?(s="css-module",a++):s="class",o=!1;continue}if(c===$&&s===""){s="id",o=!1;continue}if(c==='"'&&l===""){h=!0;continue}if(c==='"'&&h){h=!1;continue}if(c===v&&!h){if(s==="")continue;f.push([s,l]),s="",l="",o=!0;continue}if(!(o&&c.search(R)===-1)){if(o){s+=c;continue}l+=c;}}return r.length?f.filter(([a])=>r.some(c=>c instanceof RegExp?c.test(a):c===a)):f},u=(e,t)=>{t&&e.forEach(i=>{const[n,r]=i;n==="class"?t.attrJoin("class",r):n==="css-module"?t.attrJoin("css-module",r):t.attrPush(i);});},w=(e,t)=>t>=0?e[t]:e[e.length+t],b=e=>e.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"),I=e=>Array.isArray(e)&&!!e.length&&e.every(t=>typeof t=="function"),S$1=e=>Array.isArray(e)&&!!e.length&&e.every(t=>typeof t=="object"),g=(e,t,i)=>n=>{const r=t.length,s=i.length,l=r+1+s;if(!n||typeof n!="string"||n.length<l)return !1;const o=d=>{const x=d.charAt(r)===".",O=d.charAt(r)==="#";return x||O?d.length>=l+1:d.length>=l};let h,f,a,c;const y=l-s;switch(e){case"start":a=n.slice(0,r),h=a===t?0:-1,f=h===-1?-1:n.indexOf(i,y),c=n.charAt(f+s),c&&i.includes(c)&&(f=-1);break;case"end":h=n.lastIndexOf(t),f=h===-1?-1:n.indexOf(i,h+y),f=f===n.length-s?f:-1;break;case"only":a=n.slice(0,r),h=a===t?0:-1,a=n.slice(n.length-s),f=a===i?n.length-s:-1;break}return h!==-1&&f!==-1&&o(n.substring(h,f+s))},j=(e,t,i)=>{const n=b(t),r=b(i),s=e.search(new RegExp(`[ \\n]?${n}[^${n}${r}]+${r}$`));return s!==-1?e.slice(0,s):e},m=(e,t)=>{if(e[t].type==="softbreak")return null;if(e[t].nesting===0)return e[t];const i=e[t].level,n=e[t].type.replace("_close","_open");for(;t>=0;--t)if(e[t].type===n&&e[t].level===i)return e[t];return null},D=e=>({name:"code-block",tests:[{shift:0,block:!0,info:g("end",e.left,e.right)}],transform:(t,i)=>{const n=t[i];let r="";const s=/{(?:[\d,-]+)}/.exec(n.info);s&&(n.info=n.info.replace(s[0],""),r=s[0]);const l=n.info.lastIndexOf(e.left),o=p(n.info,l,e);u(o,n),n.info=`${j(n.info,e.left,e.right)} ${r}`;}}),K=e=>[{name:"inline nesting 0",tests:[{shift:0,type:"inline",children:[{shift:-1,type:t=>t==="image"||t==="code_inline"},{shift:0,type:"text",content:g("start",e.left,e.right)}]}],transform:(t,i,n)=>{const r=t[i].children[n],s=r.content.indexOf(e.right),l=t[i].children[n-1],o=p(r.content,0,e);u(o,l),r.content.length===s+e.right.length?t[i].children.splice(n,1):r.content=r.content.slice(s+e.right.length);}},{name:"inline attributes",tests:[{shift:0,type:"inline",children:[{shift:-1,nesting:-1},{shift:0,type:"text",content:g("start",e.left,e.right)}]}],transform:(t,i,n)=>{const r=t[i].children[n],{content:s}=r,l=p(s,0,e),o=m(t[i].children,n-1);u(l,o),r.content=s.slice(s.indexOf(e.right)+e.right.length);}}],P=e=>({name:"table",tests:[{shift:0,type:"table_close"},{shift:1,type:"paragraph_open"},{shift:2,type:"inline",content:g("only",e.left,e.right)}],transform:(t,i)=>{const n=t[i+2],r=m(t,i),s=p(n.content,0,e);u(s,r),t.splice(i+1,3);}}),T=e=>[{name:"list softbreak",tests:[{shift:-2,type:"list_item_open"},{shift:0,type:"inline",children:[{position:-2,type:"softbreak"},{position:-1,type:"text",content:g("only",e.left,e.right)}]}],transform:(t,i,n)=>{const r=t[i].children[n],s=p(r.content,0,e);let l=i-2;for(;t[l-1]&&t[l-1].type!=="ordered_list_open"&&t[l-1].type!=="bullet_list_open";)l--;u(s,t[l-1]),t[i].children=t[i].children.slice(0,-2);}},{name:"list double softbreak",tests:[{shift:0,type:t=>t==="bullet_list_close"||t==="ordered_list_close"},{shift:1,type:"paragraph_open"},{shift:2,type:"inline",content:g("only",e.left,e.right),children:t=>t.length===1},{shift:3,type:"paragraph_close"}],transform:(t,i)=>{const n=t[i+2],r=p(n.content,0,e),s=m(t,i);u(r,s),t.splice(i+1,3);}},{name:"list item end",tests:[{shift:-2,type:"list_item_open"},{shift:0,type:"inline",children:[{position:-1,type:"text",content:g("end",e.left,e.right)}]}],transform:(t,i,n)=>{const r=t[i].children[n],{content:s}=r,l=p(s,s.lastIndexOf(e.left),e);u(l,t[i-2]);const o=s.slice(0,s.lastIndexOf(e.left));r.content=o[o.length-1]===" "?o.slice(0,-1):o;}}],L=e=>({name:`
{.a} softbreak then curly in start`,tests:[{shift:0,type:"inline",children:[{position:-2,type:"softbreak"},{position:-1,type:"text",content:g("only",e.left,e.right)}]}],transform:(t,i,n)=>{const r=t[i].children[n],s=p(r.content,0,e);let l=i+1;for(;t[l+1]&&t[l+1].nesting===-1;)l++;const o=m(t,l);u(s,o),t[i].children=t[i].children.slice(0,-2);}}),M=e=>({name:"horizontal rule",tests:[{shift:0,type:"paragraph_open"},{shift:1,type:"inline",children:t=>t.length===1,content:t=>new RegExp(`^ {0,3}[-*_]{3,} ?${b(e.left)}[^${b(e.right)}]`).test(t)},{shift:2,type:"paragraph_close"}],transform:(t,i)=>{const n=t[i];n.type="hr",n.tag="hr",n.nesting=0;const{content:r}=t[i+1],s=r.lastIndexOf(e.left),l=p(r,s,e);u(l,n),n.markup=r,t.splice(i+1,2);}}),C=e=>({name:"end of block",tests:[{shift:0,type:"inline",children:[{position:-1,content:g("end",e.left,e.right),type:t=>t!=="code_inline"&&t!=="math_inline"}]}],transform:(t,i,n)=>{const r=t[i].children[n],{content:s}=r,l=p(s,s.lastIndexOf(e.left),e);let o=i+1;for(;t[o+1]&&t[o+1].nesting===-1;)o++;const h=m(t,o);u(l,h);const f=s.slice(0,s.lastIndexOf(e.left));r.content=f[f.length-1]===" "?f.slice(0,-1):f;}}),A=["fence","inline","table","list","hr","softbreak","block"],J=e=>{const t=e.rule===!1?[]:Array.isArray(e.rule)?e.rule.filter(n=>A.includes(n)):A,i=[];return t.includes("fence")&&i.push(D(e)),t.includes("inline")&&i.push(...K(e)),t.includes("list")&&i.push(...T(e)),t.includes("table")&&i.push(P(e)),t.includes("softbreak")&&i.push(L(e)),t.includes("hr")&&i.push(M(e)),t.includes("block")&&i.push(C(e)),i},_=(e,t,i)=>{const n={match:!1,position:null},r=i.shift!==void 0?t+i.shift:i.position;if(i.shift!==void 0&&r<0)return n;const s=w(e,r);if(s===void 0)return n;for(const l of Object.keys(i)){if(l==="shift"||l==="position")continue;if(s[l]===void 0)return n;if(l==="children"&&S$1(i.children)){if(s.children?.length===0)return n;let h;const f=i.children,a=s.children;if(f?.every(c=>c.position!==void 0)){if(h=f.every(c=>_(a,c.position,c).match),h){const c=f[f.length-1]?.position??0;n.position=c>=0?c:a.length+c;}}else for(let c=0;c<a.length;c++)if(h=f.every(y=>_(a,c,y).match),h){n.position=c;break}if(h===!1)return n;continue}const o=i[l];switch(typeof o){case"boolean":case"number":case"string":if(s[l]!==o)return n;break;case"function":if(!o(s[l]))return n;break;case"object":if(I(o)){if(o.every(h=>h(s[l]))===!1)return n;break}continue;default:throw new Error(`Unknown type of pattern test (key: ${l}). Test should be of type boolean, number, string, function or array of functions.`)}}return n.match=!0,n},Y=(e,{left:t="{",right:i="}",allowed:n=[],rule:r="all"}={})=>{const s=J({left:t,right:i,allowed:n,rule:r}),l=({tokens:o})=>{for(let h=0;h<o.length;h++)for(let f=0;f<s.length;f++){const a=s[f];let c=null;a.tests.every(y=>{const d=_(o,h,y);return d.position!==null&&({position:c}=d),d.match})&&(a.transform(o,h,c),(a.name==="inline attributes"||a.name==="inline nesting 0")&&f--);}};e.core.ruler.before("linkify","attrs",l);};

    const S=(b,{name:c,marker:p=":",validate:m=a=>a.trim().split(" ",2)[0]===c,openRender:h=(a,o,l,e,s)=>(a[o].attrJoin("class",c),s.renderToken(a,o,l)),closeRender:T=(a,o,l,e,s)=>s.renderToken(a,o,l)}={name:""})=>{const a=p[0],o=p.length,l=(e,s,$,x)=>{let t=e.bMarks[s]+e.tShift[s],i=e.eMarks[s];if(a!==e.src[t])return !1;let n=t+1;for(;n<=i&&p[(n-t)%o]===e.src[n];)n++;const k=Math.floor((n-t)/o);if(k<3)return !1;n-=(n-t)%o;const d=e.src.slice(t,n),u=e.src.slice(n,i);if(!m(u,d))return !1;if(x)return !0;let r=s,M=!1;for(;r<$&&(r++,t=e.bMarks[r]+e.tShift[r],i=e.eMarks[r],!(t<i&&e.sCount[r]<e.blkIndent));)if(a===e.src[t]&&e.sCount[r]-e.blkIndent<4){for(n=t+1;n<=i&&p[(n-t)%o]===e.src[n];n++);if(Math.floor((n-t)/o)>=k&&(n-=(n-t)%o,n=e.skipSpaces(n),n>=i)){M=!0;break}}const y=e.parentType,v=e.lineMax;e.parentType="container",e.lineMax=r;const f=e.push(`container_${c}_open`,"div",1);f.markup=d,f.block=!0,f.info=u,f.map=[s,r],e.md.block.tokenize(e,s+1,r);const _=e.push(`container_${c}_close`,"div",-1);return _.markup=e.src.slice(t,n),_.block=!0,e.parentType=y,e.lineMax=v,e.line=r+(M?1:0),!0};b.block.ruler.before("fence",`container_${c}`,l,{alt:["paragraph","reference","blockquote","list"]}),b.renderer.rules[`container_${c}_open`]=h,b.renderer.rules[`container_${c}_close`]=T;};

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    const plugins = [];
    function registerMarkdownPlugin(plugin) {
        plugins.push(plugin);
        return 'register';
    }
    function create(options) {
        var _a;
        const md = new markdownit();
        for (const plugin of plugins) {
            plugin.initializePlugin(md);
        }
        md.use(Y);
        (_a = options === null || options === void 0 ? void 0 : options.classList) === null || _a === void 0 ? void 0 : _a.forEach(name => {
            const containerOptions = { name };
            md.use(S, containerOptions);
        });
        // Default handler to preserve existing functionality
        const originalFence = md.renderer.rules.fence;
        // Modified fence renderer to dynamically use handlers
        md.renderer.rules.fence = function (tokens, idx, options, env, slf) {
            const token = tokens[idx];
            const info = token.info.trim();
            // Check if a handler exists for the block type and use it
            const plugin = plugins.filter(p => p.name === info)[0];
            if (plugin && plugin.fence) {
                return plugin.fence(token, idx);
            }
            if (originalFence) {
                return originalFence(tokens, idx, options, env, slf);
            }
            else {
                return '';
            }
        };
        return md;
    }
    function definePlugin(md, pluginName) {
        md.block.ruler.before('fence', `${pluginName}_block`, function (state, startLine, endLine) {
            const start = state.bMarks[startLine] + state.tShift[startLine];
            const max = state.eMarks[startLine];
            if (state.src.slice(start, max).trim() !== '```' + pluginName) {
                return false;
            }
            let nextLine = startLine;
            while (nextLine < endLine) {
                nextLine++;
                if (state.src.slice(state.bMarks[nextLine] + state.tShift[nextLine], state.eMarks[nextLine]).trim() === '```') {
                    break;
                }
            }
            state.line = nextLine + 1;
            const token = state.push('fence', 'code', 0);
            token.info = pluginName;
            token.content = state.getLines(startLine + 1, nextLine, state.blkIndent, true);
            token.map = [startLine, state.line];
            return true;
        });
    }

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    var __awaiter$8 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["none"] = 0] = "none";
        LogLevel[LogLevel["some"] = 1] = "some";
        LogLevel[LogLevel["all"] = 2] = "all";
    })(LogLevel || (LogLevel = {}));
    // Signal Bus to manage shared signals
    class SignalBus {
        constructor(dataSignalPrefix) {
            this.dataSignalPrefix = dataSignalPrefix;
            this.logLevel = LogLevel.none;
            this.logWatchIds = [];
            this.reset();
        }
        log(id, message, ...optionalParams) {
            if (this.logLevel === LogLevel.none)
                return;
            if (this.logWatchIds.length > 0 && !this.logWatchIds.includes(id))
                return;
            console.log(`[Signal Bus][${id}] ${message}`, ...optionalParams);
        }
        broadcast(originId, batch) {
            return __awaiter$8(this, void 0, void 0, function* () {
                //TODO handle multiple broadcasts
                //TODO handle circular dependencies
                if (this.broadcastingStack.includes(originId)) {
                    this.log(originId, 'Additional broadcast from', originId, this.broadcastingStack.join(' -> '));
                    //return;
                }
                this.log(originId, 'Broadcasting batch from', originId, batch);
                this.broadcastingStack.push(originId);
                for (const peerId of this.peerDependencies[originId]) {
                    const peer = this.peers.find(p => p.id === peerId);
                    //create a new batch with the signals that the peer is interested in
                    const peerBatch = {};
                    let hasBatch = false;
                    for (const signalName in batch) {
                        if (peer.initialSignals.some(s => s.name === signalName)
                            && batch[signalName].value !== this.signalDeps[signalName].value) {
                            peerBatch[signalName] = batch[signalName];
                            hasBatch = true;
                        }
                    }
                    if (!hasBatch)
                        continue;
                    peer.recieveBatch && (yield peer.recieveBatch(peerBatch, originId));
                }
                this.broadcastingStack.pop();
                //set current values
                for (const signalName in batch) {
                    const signalDep = this.signalDeps[signalName];
                    signalDep.value = batch[signalName].value;
                }
                if (this.broadcastingStack.length === 0) {
                    //broadcast complete
                    for (const peer of this.peers) {
                        peer.broadcastComplete && (yield peer.broadcastComplete());
                    }
                }
            });
        }
        getPriorityPeer(signalName) {
            const signalDep = this.signalDeps[signalName];
            if (!signalDep)
                return null;
            return this.peers.find(p => p.id === signalDep.initialPriorityId);
        }
        registerPeer(peer) {
            this.peers.push(peer);
            for (const initialSignal of peer.initialSignals) {
                if (!(initialSignal.name in this.signalDeps)) {
                    //first encounter with this signal
                    this.signalDeps[initialSignal.name] = {
                        deps: [peer],
                        priority: initialSignal.priority,
                        initialPriorityId: peer.id,
                        value: initialSignal.value,
                        isData: initialSignal.isData,
                    };
                }
                else {
                    //signal exists, add the peer to the deps and check to override the priority
                    const signalDep = this.signalDeps[initialSignal.name];
                    if (!signalDep.deps.includes(peer)) {
                        signalDep.deps.push(peer);
                    }
                    if (initialSignal.priority > signalDep.priority) {
                        signalDep.priority = initialSignal.priority;
                        signalDep.initialPriorityId = peer.id;
                        signalDep.value = initialSignal.value;
                        signalDep.isData = initialSignal.isData;
                    }
                }
            }
        }
        beginListening() {
            //set the initial batch on each peer
            this.log('beginListening', 'begin initial batch', this.signalDeps);
            for (const peer of this.peers) {
                const batch = {};
                for (const signalName in this.signalDeps) {
                    const signalDep = this.signalDeps[signalName];
                    const { value, isData } = signalDep;
                    batch[signalName] = { value, isData };
                }
                peer.recieveBatch && peer.recieveBatch(batch, 'initial');
            }
            this.log('beginListening', 'end initial batch');
            //for all signalDeps, compile a list of signals for each peer depending on the signal
            const peerSignals = {};
            for (const signalName in this.signalDeps) {
                const signalDep = this.signalDeps[signalName];
                if (signalDep.deps.length === 1)
                    continue; // No need to share signals if only one peer depends on it
                for (const peer of signalDep.deps) {
                    if (!(peer.id in peerSignals)) {
                        peerSignals[peer.id] = [];
                        this.peerDependencies[peer.id] = [];
                    }
                    peerSignals[peer.id].push({ signalName, isData: signalDep.isData });
                    // Add other peers sharing this signal to the dependencies map
                    for (const otherPeer of signalDep.deps) {
                        if (otherPeer.id !== peer.id && !this.peerDependencies[peer.id].includes(otherPeer.id)) {
                            this.peerDependencies[peer.id].push(otherPeer.id);
                        }
                    }
                }
            }
            this.log('beginListening', '======= dependencies =========', peerSignals, this.peerDependencies);
            // Begin listening and logging the shared dependencies
            for (const peer of this.peers) {
                const sharedSignals = peerSignals[peer.id];
                if (sharedSignals) {
                    this.log(peer.id, 'Shared signals:', sharedSignals);
                    if (this.peerDependencies[peer.id]) {
                        this.log(peer.id, 'Shared dependencies:', this.peerDependencies[peer.id]);
                    }
                    peer.beginListening && peer.beginListening(sharedSignals);
                }
                else {
                    this.log(peer.id, 'No shared signals');
                }
            }
            this.active = true;
        }
        reset() {
            this.signalDeps = {};
            this.active = false;
            this.peers = [];
            this.broadcastingStack = [];
            this.peerDependencies = {};
        }
    }

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    var __awaiter$7 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    const defaultRendererOptions = {
        vegaRenderer: 'canvas',
        dataSignalPrefix: 'data-signal:',
        classList: ['markdown-block'],
    };
    class Renderer {
        constructor(element, options) {
            this.element = element;
            this.options = Object.assign(Object.assign({}, defaultRendererOptions), options);
            this.md = create({ classList: this.options.classList });
            this.signalBus = this.options.signalBus || new SignalBus(this.options.dataSignalPrefix);
            this.instances = {};
        }
        render(markdown, errorHandler) {
            return __awaiter$7(this, void 0, void 0, function* () {
                if (!errorHandler) {
                    errorHandler = (error, pluginName, instanceIndex, phase) => {
                        console.error(`Error in plugin ${pluginName} instance ${instanceIndex} phase ${phase}`, error);
                    };
                }
                //loop through all the destroy handlers and call them. have the key there to help us debug
                yield this.destroy();
                const parsedHTML = this.md.render(markdown);
                this.element.innerHTML = parsedHTML;
                //loop through all the plugins and render them
                this.signalBus.log('Renderer', 'rendering DOM');
                const hydrationPromises = [];
                for (let i = 0; i < plugins.length; i++) {
                    const plugin = plugins[i];
                    if (plugin.hydrateComponent) {
                        //make a new promise that returns IInstances but adds the plugin name
                        hydrationPromises.push(plugin.hydrateComponent(this, errorHandler).then(instances => {
                            return {
                                pluginName: plugin.name,
                                instances,
                            };
                        }));
                    }
                }
                try {
                    const pluginHydrations = yield Promise.all(hydrationPromises);
                    for (const hydration of pluginHydrations) {
                        if (hydration && hydration.instances) {
                            this.instances[hydration.pluginName] = hydration.instances;
                            //registration phase
                            for (const instance of hydration.instances) {
                                this.signalBus.registerPeer(instance);
                            }
                        }
                    }
                    this.signalBus.beginListening();
                }
                catch (error) {
                    console.error('Error in rendering plugins', error);
                }
            });
        }
        destroy() {
            return __awaiter$7(this, void 0, void 0, function* () {
                this.signalBus.reset();
                for (const pluginName of Object.keys(this.instances)) {
                    const instances = this.instances[pluginName];
                    for (const instance of instances) {
                        instance.destroy && (yield instance.destroy());
                    }
                }
                this.instances = {};
            });
        }
    }

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    function sanitizedHTML(tagName, attributes, content) {
        // Create a temp element with the specified tag name
        const element = document.createElement(tagName);
        // Iterate over the attribute list and set each attribute
        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        });
        // Set the textContent to automatically escape the content
        element.textContent = content;
        // Return the outer HTML of the element
        return element.outerHTML;
    }

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    var __awaiter$6 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    const dropdownPlugin = {
        name: 'dropdown',
        initializePlugin: (md) => definePlugin(md, 'dropdown'),
        fence: (token, idx) => {
            const DropdownId = `Dropdown-${idx}`;
            return sanitizedHTML('div', { id: DropdownId, class: 'dropdown' }, token.content.trim());
        },
        hydrateComponent: (renderer, errorHandler) => __awaiter$6(void 0, void 0, void 0, function* () {
            const dropdownInstances = [];
            const containers = renderer.element.querySelectorAll('.dropdown');
            for (const [index, container] of containers.entries()) {
                if (!container.textContent)
                    continue;
                try {
                    const spec = JSON.parse(container.textContent);
                    const html = `<form class="vega-bindings">
                    <div class="vega-bind">
                        <label>
                            <span class="vega-bind-name">${spec.label || spec.name}</span>
                            <select class="vega-bind-select" id="${spec.name}" name="${spec.name}" ${spec.multiple ? 'multiple' : ''} size="${spec.size || 1}">
${getOptions(spec.multiple, spec.options, spec.value)}
                            </select>
                        </label>
                    </div>
                </form>`;
                    container.innerHTML = html;
                    const element = container.querySelector('select');
                    const dropdownInstance = { id: container.id, spec, element };
                    dropdownInstances.push(dropdownInstance);
                }
                catch (e) {
                    container.innerHTML = `<div class="error">${e.toString()}</div>`;
                    errorHandler(e, 'Dropdown', index, 'parse', container);
                    continue;
                }
            }
            const instances = dropdownInstances.map((dropdownInstance, index) => {
                const { element, spec } = dropdownInstance;
                const initialSignals = [{
                        name: spec.name,
                        value: spec.value || null,
                        priority: 1,
                        isData: false,
                    }];
                if (spec.dynamicOptions) {
                    initialSignals.push({
                        name: spec.dynamicOptions.dataSignalName,
                        value: null,
                        priority: -1,
                        isData: true,
                    });
                }
                return Object.assign(Object.assign({}, dropdownInstance), { initialSignals, recieveBatch: (batch) => __awaiter$6(void 0, void 0, void 0, function* () {
                        var _a, _b;
                        const { dynamicOptions } = spec;
                        if (dynamicOptions === null || dynamicOptions === void 0 ? void 0 : dynamicOptions.dataSignalName) {
                            const newData = (_a = batch[dynamicOptions.dataSignalName]) === null || _a === void 0 ? void 0 : _a.value;
                            if (newData) {
                                //pluck the field from the data and add options to the select
                                let hasFieldName = false;
                                //remove duplicates from the options array
                                const uniqueOptions = new Set();
                                newData.forEach((d) => {
                                    //check if the field exists in the data
                                    if (d.hasOwnProperty(dynamicOptions.fieldName)) {
                                        hasFieldName = true;
                                        uniqueOptions.add(d[dynamicOptions.fieldName]);
                                    }
                                });
                                if (hasFieldName) {
                                    const options = Array.from(uniqueOptions);
                                    const existingSelection = spec.multiple ? Array.from(element.selectedOptions).map(option => option.value) : element.value;
                                    element.innerHTML = getOptions(spec.multiple, options, existingSelection);
                                    if (!spec.multiple) {
                                        element.value = ((_b = batch[spec.name]) === null || _b === void 0 ? void 0 : _b.value) || options[0];
                                    }
                                }
                                else {
                                    //if the field doesn't exist, set the select to the first option
                                    element.innerHTML = `<option value="">Field "${dynamicOptions.fieldName}" not found</option>`;
                                    element.value = '';
                                }
                            }
                        }
                        if (batch[spec.name]) {
                            const value = batch[spec.name].value;
                            if (spec.multiple) {
                                Array.from(element.options).forEach((option) => {
                                    option.selected = value && value.includes(option.value);
                                });
                            }
                            else {
                                element.value = value;
                            }
                        }
                    }), beginListening() {
                        //wire up handler to send the selected value to the signal bus
                        element.addEventListener('change', (e) => {
                            const value = spec.multiple
                                ? Array.from(e.target.selectedOptions).map(option => option.value)
                                : e.target.value;
                            const batch = {
                                [spec.name]: {
                                    value,
                                    isData: false,
                                },
                            };
                            renderer.signalBus.broadcast(dropdownInstance.id, batch);
                        });
                    }, getCurrentSignalValue: () => {
                        if (spec.multiple) {
                            return Array.from(element.selectedOptions).map(option => option.value);
                        }
                        return element.value;
                    }, destroy: () => __awaiter$6(void 0, void 0, void 0, function* () {
                        element.removeEventListener('change', dropdownInstance.element.onchange);
                    }) });
            });
            return instances;
        })
    };
    function getOptions(multiple, options, selected) {
        if (!options) {
            if (multiple) {
                if (Array.isArray(selected)) {
                    options = selected;
                }
                else {
                    if (selected) {
                        options = [selected];
                    }
                }
            }
            else {
                if (selected) {
                    options = [selected];
                }
            }
        }
        if (!options) {
            return '';
        }
        return options.map((option) => {
            let attr = '';
            if (multiple) {
                attr = (selected || []).includes(option) ? 'selected' : '';
            }
            else {
                attr = selected === option ? 'selected' : '';
            }
            return `<option value="${option}" ${attr}>${option}</option>`;
        }).join('\n');
    }

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    var __awaiter$5 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var ImageOpacity;
    (function (ImageOpacity) {
        ImageOpacity["full"] = "1";
        ImageOpacity["loading"] = "0.1";
        ImageOpacity["error"] = "0.5";
    })(ImageOpacity || (ImageOpacity = {}));
    const imagePlugin = {
        name: 'image',
        initializePlugin: (md) => definePlugin(md, 'image'),
        fence: (token, idx) => {
            const ImageId = `Image-${idx}`;
            return sanitizedHTML('div', { id: ImageId, class: 'image' }, token.content.trim());
        },
        hydrateComponent: (renderer, errorHandler) => __awaiter$5(void 0, void 0, void 0, function* () {
            const imageInstances = [];
            const containers = renderer.element.querySelectorAll('.image');
            for (const [index, container] of containers.entries()) {
                if (!container.textContent)
                    continue;
                try {
                    const spec = JSON.parse(container.textContent);
                    const element = document.createElement('img');
                    const spinner = document.createElement('div');
                    spinner.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="gray" stroke-width="2" fill="none" stroke-dasharray="31.4" stroke-dashoffset="0">
                            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                        </circle>
                    </svg>`;
                    if (spec.alt)
                        element.alt = spec.alt;
                    if (spec.width)
                        element.width = spec.width;
                    if (spec.height)
                        element.height = spec.height;
                    element.onload = () => {
                        spinner.style.display = 'none';
                        element.style.opacity = ImageOpacity.full;
                    };
                    element.onerror = () => {
                        spinner.style.display = 'none';
                        element.style.opacity = ImageOpacity.error;
                        errorHandler(new Error('Image failed to load'), 'image', index, 'load', container, element.src);
                    };
                    container.style.position = 'relative';
                    spinner.style.position = 'absolute';
                    container.innerHTML = '';
                    container.appendChild(spinner);
                    container.appendChild(element);
                    const imageInstance = { id: container.id, spec, element, spinner };
                    imageInstances.push(imageInstance);
                }
                catch (e) {
                    container.innerHTML = `<div class="error">${e.toString()}</div>`;
                    errorHandler(e, 'Image', index, 'parse', container);
                }
            }
            const instances = imageInstances.map((imageInstance, index) => {
                const { element, spinner, id, spec } = imageInstance;
                return {
                    id,
                    initialSignals: [
                        {
                            name: spec.srcSignalName,
                            value: null,
                            priority: -1,
                            isData: false,
                        }
                    ],
                    destroy: () => __awaiter$5(void 0, void 0, void 0, function* () {
                        if (element) {
                            element.remove();
                        }
                        if (spinner) {
                            spinner.remove();
                        }
                    }),
                    recieveBatch: (batch, from) => __awaiter$5(void 0, void 0, void 0, function* () {
                        if (spec.srcSignalName in batch) {
                            const src = batch[spec.srcSignalName].value;
                            if (src) {
                                spinner.style.display = '';
                                element.src = src.toString();
                                element.style.opacity = ImageOpacity.loading;
                            }
                            else {
                                element.src = ''; //TODO placeholder image
                                spinner.style.display = 'none';
                                element.style.opacity = ImageOpacity.full;
                            }
                        }
                    })
                };
            });
            return instances;
        })
    };

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    var __awaiter$4 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    function createTemplateFunction(template) {
        const parts = template.split(/(%7B%7B.*?%7D%7D)/g).map(part => {
            if (part.startsWith('%7B%7B') && part.endsWith('%7D%7D')) {
                const key = part.slice(6, -6); // Extract key from %7B%7Bkey%7D%7D
                return (batch) => { var _a, _b; return ((_b = (_a = batch[key]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.toString()) || ''; };
            }
            else {
                return () => part; // Static part of the template
            }
        });
        return (batch) => parts.map(fn => fn(batch)).join('');
    }
    function handleDynamicUrl(tokens, idx, attrName, elementType) {
        const token = tokens[idx];
        const attrValue = token.attrGet(attrName);
        if (attrValue && attrValue.includes('%7B%7B')) {
            // Ensure token.attrs is initialized
            if (!token.attrs) {
                token.attrs = [];
            }
            token.attrSet('data-template-url', attrValue); // Store original template
        }
        return token;
    }
    const placeholdersPlugin = {
        name: 'placeholders',
        initializePlugin: (md) => __awaiter$4(void 0, void 0, void 0, function* () {
            // Custom plugin to handle dynamic placeholders
            md.use(function (md) {
                // Add a custom rule to handle {{...}} placeholders
                md.inline.ruler.after('emphasis', 'dynamic_placeholder', function (state, silent) {
                    let token;
                    const max = state.posMax;
                    const start = state.pos;
                    // Look for double curly braces {{
                    if (state.src.charCodeAt(start) !== 0x7B /* { */ ||
                        state.src.charCodeAt(start + 1) !== 0x7B /* { */) {
                        return false;
                    }
                    for (let pos = start + 2; pos < max; pos++) {
                        if (state.src.charCodeAt(pos) === 0x7D /* } */ &&
                            state.src.charCodeAt(pos + 1) === 0x7D /* } */) {
                            if (!silent) {
                                state.pos = start + 2;
                                state.posMax = pos;
                                token = state.push('dynamic_placeholder', '', 0);
                                token.markup = state.src.slice(start, pos + 2);
                                token.content = state.src.slice(state.pos, state.posMax);
                                state.pos = pos + 2;
                                state.posMax = max;
                            }
                            return true;
                        }
                    }
                    return false;
                });
                // Renderer rule for dynamic placeholders
                md.renderer.rules['dynamic_placeholder'] = function (tokens, idx) {
                    const key = tokens[idx].content.trim();
                    return `<span class="dynamic-placeholder" data-key="${key}">{${key}}</span>`;
                };
            });
            md.renderer.rules['link_open'] = function (tokens, idx, options, env, slf) {
                handleDynamicUrl(tokens, idx, 'href');
                return slf.renderToken(tokens, idx, options);
            };
            md.renderer.rules['image'] = function (tokens, idx, options, env, slf) {
                handleDynamicUrl(tokens, idx, 'src');
                return slf.renderToken(tokens, idx, options);
            };
        }),
        hydrateComponent: (renderer) => __awaiter$4(void 0, void 0, void 0, function* () {
            const templateFunctionMap = new WeakMap();
            const placeholders = renderer.element.querySelectorAll('.dynamic-placeholder');
            const dynamicUrls = renderer.element.querySelectorAll('[data-template-url]');
            const elementsByKeys = new Map();
            // Collect placeholders
            for (const placeholder of placeholders) {
                const key = placeholder.getAttribute('data-key');
                if (elementsByKeys.has(key)) {
                    elementsByKeys.get(key).push(placeholder);
                }
                else {
                    elementsByKeys.set(key, [placeholder]);
                }
            }
            // Collect dynamic URLs
            for (const element of dynamicUrls) {
                const templateUrl = element.getAttribute('data-template-url');
                const keys = Array.from(templateUrl.matchAll(/%7B%7B(.*?)%7D%7D/g)).map(match => match[1]);
                const templateFunction = createTemplateFunction(templateUrl);
                templateFunctionMap.set(element, { templateFunction, batch: {} });
                for (const key of keys) {
                    if (elementsByKeys.has(key)) {
                        elementsByKeys.get(key).push(element);
                    }
                    else {
                        elementsByKeys.set(key, [element]);
                    }
                }
            }
            // Create initial signals
            const initialSignals = Array.from(elementsByKeys.keys()).map(name => {
                const prioritizedSignal = {
                    name,
                    value: null,
                    priority: -1,
                    isData: false,
                };
                return prioritizedSignal;
            });
            const instances = [
                {
                    id: 'placeholders',
                    initialSignals,
                    recieveBatch: (batch) => __awaiter$4(void 0, void 0, void 0, function* () {
                        var _a;
                        for (const key of Object.keys(batch)) {
                            const elements = elementsByKeys.get(key) || [];
                            for (const element of elements) {
                                if (element.classList.contains('dynamic-placeholder')) {
                                    // Update placeholder content
                                    const markdownContent = ((_a = batch[key].value) === null || _a === void 0 ? void 0 : _a.toString()) || '';
                                    const parsedMarkdown = isMarkdownInline(markdownContent)
                                        ? renderer.md.renderInline(markdownContent)
                                        : renderer.md.render(markdownContent);
                                    element.innerHTML = parsedMarkdown;
                                }
                                else if (element.hasAttribute('data-template-url')) {
                                    // Update dynamic URL
                                    const templateData = templateFunctionMap.get(element);
                                    if (templateData) {
                                        // Merge the new batch with the stored batch
                                        templateData.batch = Object.assign(Object.assign({}, templateData.batch), batch);
                                        const updatedUrl = templateData.templateFunction(templateData.batch);
                                        if (element.tagName === 'A') {
                                            element.setAttribute('href', updatedUrl);
                                        }
                                        else if (element.tagName === 'IMG') {
                                            element.setAttribute('src', updatedUrl);
                                        }
                                    }
                                }
                            }
                        }
                    }),
                },
            ];
            return instances;
        }),
    };
    function isMarkdownInline(markdown) {
        // Inline markdown typically does not contain newlines
        if (!markdown.includes('\n')) {
            return true;
        }
        // Block markdown typically contains newlines and block elements
        const blockElements = ['#', '-', '*', '>', '```', '~~~'];
        for (const element of blockElements) {
            if (markdown.trim().startsWith(element)) {
                return false;
            }
        }
        return true;
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
    const presetsPlugin = {
        name: 'presets',
        initializePlugin: (md) => definePlugin(md, 'presets'),
        fence: (token, idx) => {
            const spec = JSON.parse(token.content.trim());
            const pluginId = `preset-${idx}`;
            return sanitizedHTML('div', { id: pluginId, class: 'presets' }, JSON.stringify(spec));
        },
        hydrateComponent: (renderer, errorHandler) => __awaiter$3(void 0, void 0, void 0, function* () {
            const presetsInstances = [];
            const containers = renderer.element.querySelectorAll('.presets');
            for (const [index, container] of containers.entries()) {
                if (!container.textContent)
                    continue;
                const id = `presets${index}`;
                let presets;
                try {
                    presets = JSON.parse(container.textContent);
                }
                catch (e) {
                    container.innerHTML = `<div class="error">${e.toString()}</div>`;
                    errorHandler(e, 'presets', index, 'parse', container);
                    continue;
                }
                if (!Array.isArray(presets)) {
                    container.innerHTML = '<div class="error">Expected an array of presets</div>';
                    continue;
                }
                //clear the container
                container.innerHTML = '';
                const ul = document.createElement('ul');
                const presetsInstance = { id, presets, element: ul };
                container.appendChild(ul);
                for (const preset of presets) {
                    //make a button for each preset
                    const li = document.createElement('li');
                    if (!preset.name || !preset.state) {
                        const span = document.createElement('span');
                        span.className = 'error';
                        span.textContent = 'Each preset must have a name and state';
                        li.appendChild(span);
                    }
                    else {
                        const button = document.createElement('button');
                        button.textContent = preset.name;
                        button.onclick = () => {
                            const batch = {};
                            for (const [signalName, value] of Object.entries(preset.state)) {
                                batch[signalName] = { value, isData: false };
                            }
                            renderer.signalBus.broadcast(id, batch);
                        };
                        li.appendChild(button);
                        li.appendChild(document.createTextNode('\u00A0'));
                        if (preset.description) {
                            button.title = preset.description;
                        }
                    }
                    ul.appendChild(li);
                }
                presetsInstances.push(presetsInstance);
            }
            const instances = presetsInstances.map((presetsInstance, index) => {
                const initialSignals = presetsInstance.presets.flatMap(preset => {
                    return Object.keys(preset.state).map(signalName => {
                        return {
                            name: signalName,
                            value: null,
                            priority: -1,
                            isData: undefined, // we do not know if it is data or not
                        };
                    });
                });
                return Object.assign(Object.assign({}, presetsInstance), { initialSignals, broadcastComplete: () => __awaiter$3(void 0, void 0, void 0, function* () {
                        //populate state from the renderer.signalBus.signalDeps
                        const state = {};
                        for (const signalName of Object.keys(renderer.signalBus.signalDeps)) {
                            state[signalName] = renderer.signalBus.signalDeps[signalName].value;
                        }
                        // highlight any presets that have the same signals and values as the current state
                        setAllPresetsActiveState(presetsInstance, state);
                    }) });
            });
            return instances;
        }),
    };
    function isPresetActive(preset, state) {
        for (const [signalName, value] of Object.entries(preset.state)) {
            if (state[signalName] !== value) {
                return false;
            }
        }
        return true;
    }
    function setAllPresetsActiveState(presetsInstance, state) {
        for (const [presetIndex, preset] of presetsInstance.presets.entries()) {
            const { classList } = presetsInstance.element.children[presetIndex];
            if (isPresetActive(preset, state)) {
                classList.add('active');
            }
            else {
                classList.remove('active');
            }
        }
    }

    const dataNameSelectedSuffix = '-selected';

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
    const tabulatorPlugin = {
        name: 'tabulator',
        initializePlugin: (md) => definePlugin(md, 'tabulator'),
        fence: (token, idx) => {
            const tabulatorId = `tabulator-${idx}`;
            return sanitizedHTML('div', { id: tabulatorId, class: 'tabulator', style: 'box-sizing: border-box;' }, token.content.trim());
        },
        hydrateComponent: (renderer, errorHandler) => __awaiter$2(void 0, void 0, void 0, function* () {
            const tabulatorInstances = [];
            const containers = renderer.element.querySelectorAll('.tabulator');
            for (const [index, container] of containers.entries()) {
                if (!container.textContent)
                    continue;
                if (!window.Tabulator) {
                    errorHandler(new Error('Tabulator not found'), 'tabulator', index, 'init', container);
                    continue;
                }
                try {
                    const spec = JSON.parse(container.textContent);
                    let options = {
                        autoColumns: true,
                        layout: 'fitColumns',
                        maxHeight: '200px',
                    };
                    //see if default options is an object with no properties
                    if (spec.options && Object.keys(spec.options).length > 0) {
                        options = spec.options;
                    }
                    const table = new window.Tabulator(container, options);
                    const tabulatorInstance = { id: container.id, spec, table };
                    tabulatorInstances.push(tabulatorInstance);
                }
                catch (e) {
                    container.innerHTML = `<div class="error">${e.toString()}</div>`;
                    errorHandler(e, 'tabulator', index, 'parse', container);
                    continue;
                }
            }
            const instances = tabulatorInstances.map((tabulatorInstance, index) => {
                const initialSignals = [{
                        name: tabulatorInstance.spec.dataSignalName,
                        value: null,
                        priority: -1,
                        isData: true,
                    }];
                if (tabulatorInstance.spec.options.selectableRows) {
                    initialSignals.push({
                        name: `${tabulatorInstance.spec.dataSignalName}${dataNameSelectedSuffix}`,
                        value: [],
                        priority: -1,
                        isData: true,
                    });
                }
                return Object.assign(Object.assign({}, tabulatorInstance), { initialSignals, recieveBatch: (batch) => __awaiter$2(void 0, void 0, void 0, function* () {
                        const newData = batch[tabulatorInstance.spec.dataSignalName].value;
                        if (newData) {
                            tabulatorInstance.table.setData(newData);
                        }
                    }), beginListening(sharedSignals) {
                        if (tabulatorInstance.spec.options.selectableRows) {
                            for (const { isData, signalName } of sharedSignals) {
                                if (isData) {
                                    const matchData = signalName === `${tabulatorInstance.spec.dataSignalName}${dataNameSelectedSuffix}`;
                                    if (matchData) {
                                        tabulatorInstance.table.on('rowSelectionChanged', (e, rows) => {
                                            const selectedData = tabulatorInstance.table.getSelectedData();
                                            const batch = {
                                                [`${tabulatorInstance.spec.dataSignalName}${dataNameSelectedSuffix}`]: {
                                                    value: selectedData,
                                                    isData: true,
                                                },
                                            };
                                            renderer.signalBus.log(tabulatorInstance.id, 'sending batch', batch);
                                            renderer.signalBus.broadcast(tabulatorInstance.id, batch);
                                        });
                                    }
                                }
                            }
                        }
                    },
                    getCurrentSignalValue() {
                        return tabulatorInstance.table.getSelectedData();
                    }, destroy: () => __awaiter$2(void 0, void 0, void 0, function* () {
                        tabulatorInstance.table.destroy();
                    }) });
            });
            return instances;
        })
    };

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    const vegaLitePlugin = {
        name: 'vega-lite',
        initializePlugin: (md) => definePlugin(md, 'vega-lite'),
        fence: (token, idx) => {
            const vegaLiteId = `vega-lite-${idx}`;
            return sanitizedHTML('div', { id: vegaLiteId, class: 'vega-chart' }, token.content.trim());
        },
    };

    var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    function resolveSpec(textContent) {
        return __awaiter$1(this, void 0, void 0, function* () {
            try {
                const either = JSON.parse(textContent);
                if (typeof either === 'object') {
                    return resolveToVega(either);
                }
                else {
                    return { error: new Error(`Spec must be either a JSON object or a string url, found type ${typeof either}`) };
                }
            }
            catch (error) {
                //see if it is a url, then await to load the json for a spec
                if (textContent.startsWith('http://') || textContent.startsWith('https://') || textContent.startsWith('//')) {
                    try {
                        const response = yield fetch(textContent);
                        const either = yield response.json();
                        if (typeof either === 'object') {
                            return resolveToVega(either);
                        }
                        else {
                            return { error: new Error(`Expected a JSON object, found type ${typeof either}`) };
                        }
                    }
                    catch (error) {
                        return { error };
                    }
                }
                else {
                    return { error: new Error('Spec string must be a url') };
                }
            }
        });
    }
    function resolveToVega(either) {
        if ('$schema' in either && typeof either.$schema === 'string') {
            if (either.$schema.includes('vega-lite')) {
                //compile to vega
                try {
                    const runtime = vegaLite.compile(either);
                    const { spec } = runtime;
                    return { spec };
                }
                catch (error) {
                    //did not compile
                    return { error };
                }
            }
            else if (either.$schema.includes('vega')) {
                return { spec: either };
            }
            else {
                return { error: new Error('$schema property must be a string with vega or vega-lite version.') };
            }
        }
        else {
            return { error: new Error('Missing $schema property, must be a string with vega or vega-lite version.') };
        }
    }

    function urlParam(urlParamName, value) {
        if (value === undefined || value === null)
            return '';
        if (Array.isArray(value)) {
            return value.map(vn => `${urlParamName}[]=${encodeURIComponent(vn)}`).join('&');
        }
        else {
            return `${urlParamName}=${encodeURIComponent(value)}`;
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
    const ignoredSignals = ['width', 'height', 'padding', 'autosize', 'background', 'style', 'parent', 'datum', 'item', 'event', 'cursor'];
    const vegaPlugin = {
        name: 'vega',
        initializePlugin: (md) => definePlugin(md, 'vega'),
        fence: (token, idx) => {
            const vegaId = `vega-${idx}`;
            return sanitizedHTML('div', { id: vegaId, class: 'vega-chart' }, token.content.trim());
        },
        hydrateComponent: (renderer, errorHandler) => __awaiter(void 0, void 0, void 0, function* () {
            const vegaInstances = [];
            const containers = renderer.element.querySelectorAll('.vega-chart');
            const specInits = [];
            for (const [index, container] of containers.entries()) {
                const specInit = yield createSpecInit(container, index, renderer, errorHandler);
                if (specInit) {
                    specInits.push(specInit);
                }
            }
            prioritizeSignalValues(specInits);
            for (const specInit of specInits) {
                const vegaInstance = yield createVegaInstance(specInit, renderer, errorHandler);
                if (vegaInstance) {
                    vegaInstances.push(vegaInstance);
                }
            }
            //make a single array of all the initialSignals that are marked isData
            const dataSignals = vegaInstances.map(vegaInstance => vegaInstance.initialSignals.filter(signal => signal.isData)).flat();
            //spin through all instances to see if its spec has data that matches with dataSignals
            for (const vegaInstance of vegaInstances) {
                if (!vegaInstance.spec.data)
                    continue;
                for (const data of vegaInstance.spec.data) {
                    //find a matching data signal
                    const dataSignal = dataSignals.find(signal => (signal.name === data.name) //exact match
                        ||
                            (`${signal.name}${dataNameSelectedSuffix}` === data.name) //match a selection from Tabulator
                    );
                    if (dataSignal) {
                        //if we find a match, add it to our initialSignals
                        vegaInstance.initialSignals.push({
                            name: data.name,
                            value: data.values,
                            priority: data.values ? 1 : 0,
                            isData: true,
                        });
                    }
                }
            }
            const instances = vegaInstances.map((vegaInstance) => {
                const { spec, view, initialSignals } = vegaInstance;
                const startBatch = (from) => {
                    if (!vegaInstance.batch) {
                        renderer.signalBus.log(vegaInstance.id, 'starting batch', from);
                        vegaInstance.batch = {};
                        view.runAfter(() => {
                            const { batch } = vegaInstance;
                            vegaInstance.batch = undefined;
                            renderer.signalBus.log(vegaInstance.id, 'sending batch', batch);
                            renderer.signalBus.broadcast(vegaInstance.id, batch);
                        });
                    }
                };
                return Object.assign(Object.assign({}, vegaInstance), { initialSignals, recieveBatch: (batch, from) => __awaiter(void 0, void 0, void 0, function* () {
                        renderer.signalBus.log(vegaInstance.id, 'recieved batch', batch, from);
                        return new Promise(resolve => {
                            view.runAfter(() => __awaiter(void 0, void 0, void 0, function* () {
                                if (recieveBatch(batch, renderer, vegaInstance)) {
                                    renderer.signalBus.log(vegaInstance.id, 'running after _pulse, changes from', from);
                                    vegaInstance.needToRun = true;
                                }
                                else {
                                    renderer.signalBus.log(vegaInstance.id, 'no changes');
                                }
                                renderer.signalBus.log(vegaInstance.id, 'running view after _pulse finished');
                                resolve();
                            }));
                        });
                    }), broadcastComplete: () => __awaiter(void 0, void 0, void 0, function* () {
                        renderer.signalBus.log(vegaInstance.id, 'broadcastComplete');
                        if (vegaInstance.needToRun) {
                            view.runAfter(() => {
                                view.runAsync(); //do not await, since we are already in a runAfter
                                vegaInstance.needToRun = false;
                                renderer.signalBus.log(vegaInstance.id, 'running view after broadcastComplete');
                            });
                        }
                    }), beginListening: (sharedSignals) => {
                        var _a, _b;
                        for (const { isData, signalName } of sharedSignals) {
                            if (ignoredSignals.includes(signalName))
                                return;
                            if (isData) {
                                const matchData = (_a = spec.data) === null || _a === void 0 ? void 0 : _a.find(data => data.name === signalName);
                                if (matchData && vegaInstance.dataSignals.includes(matchData.name)) {
                                    renderer.signalBus.log(vegaInstance.id, 'listening to data', signalName);
                                    view.addDataListener(signalName, (name, value) => __awaiter(void 0, void 0, void 0, function* () {
                                        startBatch(`data:${signalName}`);
                                        vegaInstance.batch[name] = { value, isData };
                                    }));
                                }
                            }
                            const matchSignal = (_b = spec.signals) === null || _b === void 0 ? void 0 : _b.find(signal => signal.name === signalName);
                            if (matchSignal) {
                                //only listen to signals that are change sources
                                const isChangeSource = matchSignal.on || // event streams
                                    matchSignal.bind || // ui elements
                                    matchSignal.update // calculations
                                ;
                                if (isChangeSource) {
                                    renderer.signalBus.log(vegaInstance.id, 'listening to signal', signalName);
                                    view.addSignalListener(signalName, (name, value) => __awaiter(void 0, void 0, void 0, function* () {
                                        startBatch(`signal:${signalName}`);
                                        vegaInstance.batch[name] = { value, isData };
                                    }));
                                }
                            }
                        }
                    }, getCurrentSignalValue: (signalName) => {
                        var _a;
                        const matchSignal = (_a = spec.signals) === null || _a === void 0 ? void 0 : _a.find(signal => signal.name === signalName);
                        if (matchSignal) {
                            return view.signal(signalName);
                        }
                        else {
                            return undefined;
                        }
                    }, destroy: () => __awaiter(void 0, void 0, void 0, function* () {
                        vegaInstance.view.finalize();
                    }) });
            });
            return instances;
        }),
    };
    function recieveBatch(batch, renderer, vegaInstance) {
        var _a, _b;
        const { spec, view } = vegaInstance;
        const doLog = renderer.signalBus.logLevel === LogLevel.all;
        doLog && renderer.signalBus.log(vegaInstance.id, 'recieveBatch', batch);
        let hasAnyChange = false;
        for (const signalName in batch) {
            const batchItem = batch[signalName];
            if (ignoredSignals.includes(signalName)) {
                doLog && renderer.signalBus.log(vegaInstance.id, 'ignoring reverved signal name', signalName, batchItem.value);
                continue;
            }
            if (batchItem.isData) {
                let logReason;
                if (!batchItem.value) {
                    logReason = 'not updating data, no value';
                }
                else {
                    const matchData = (_a = spec.data) === null || _a === void 0 ? void 0 : _a.find(data => data.name === signalName);
                    if (!matchData) {
                        logReason = 'not updating data, no match';
                    }
                    else {
                        logReason = 'updating data';
                        view.change(signalName, vega.changeset().remove(() => true).insert(batchItem.value));
                        hasAnyChange = true;
                    }
                }
                doLog && renderer.signalBus.log(vegaInstance.id, `(isData) ${logReason}`, signalName, batchItem.value);
            }
            let logReason = '';
            const matchSignal = (_b = spec.signals) === null || _b === void 0 ? void 0 : _b.find(signal => signal.name === signalName);
            if (!matchSignal) {
                logReason = 'not updating signal, no match';
            }
            else {
                if (matchSignal.update) {
                    logReason = 'not updating signal, it is a calculation';
                }
                else {
                    if (isSignalDataBridge(matchSignal)) {
                        logReason = 'not updating signal, data bridge';
                    }
                    else {
                        const oldValue = view.signal(signalName);
                        if (oldValue === batchItem.value) {
                            logReason = 'not updating signal, same value';
                        }
                        else {
                            logReason = 'updating signal';
                            view.signal(signalName, batchItem.value);
                            hasAnyChange = true;
                        }
                    }
                }
            }
            doLog && renderer.signalBus.log(vegaInstance.id, logReason, signalName, batchItem.value);
        }
        return hasAnyChange;
    }
    function createSpecInit(container, index, renderer, errorHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!container.textContent) {
                container.innerHTML = '<div class="error">Expected a spec object or a url</div>';
                return;
            }
            let result;
            try {
                result = yield resolveSpec(container.textContent);
            }
            catch (e) {
                container.innerHTML = `<div class="error">${e.toString()}</div>`;
                errorHandler(e, 'vega', index, 'resolve', container);
                return;
            }
            if (result.error) {
                container.innerHTML = `<div class="error">${result.error.toString()}</div>`;
                errorHandler(result.error, 'vega', index, 'resolve', container);
                return;
            }
            if (!result.spec) {
                container.innerHTML = '<div class="error">Expected a spec object</div>';
                return;
            }
            const { spec } = result;
            const initialSignals = ((_a = spec.signals) === null || _a === void 0 ? void 0 : _a.map((signal) => {
                if (ignoredSignals.includes(signal.name))
                    return;
                let isData = isSignalDataBridge(signal);
                //support legacy dataPrefix
                if (signal.name.startsWith(renderer.options.dataSignalPrefix)) {
                    isData = true;
                }
                return {
                    name: signal.name,
                    value: signal.value,
                    priority: signal.bind ? 1 : 0,
                    isData,
                };
            }).filter(Boolean)) || [];
            const specInit = { container, index, initialSignals, spec };
            return specInit;
        });
    }
    function createVegaInstance(specInit, renderer, errorHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            const { container, index, initialSignals, spec } = specInit;
            const id = `vega-${index}`;
            let runtime;
            let view;
            try {
                runtime = vega.parse(spec);
            }
            catch (e) {
                container.innerHTML = `<div class="error">${e.toString()}</div>`;
                errorHandler(e, 'vega', index, 'parse', container);
                return;
            }
            try {
                view = new vega.View(runtime, {
                    container,
                    renderer: renderer.options.vegaRenderer,
                    logger: new VegaLogger(error => {
                        errorHandler(error, 'vega', index, 'view', container);
                    }),
                });
                view.run();
                //fix up initial signals
                for (const signal of initialSignals) {
                    if (signal.isData)
                        continue; //skip data signals
                    const currentValue = view.signal(signal.name);
                    if (currentValue !== signal.value) {
                        renderer.signalBus.log(id, 're-setting initial signal', signal.name, signal.value, currentValue);
                        signal.value = currentValue;
                    }
                }
            }
            catch (e) {
                container.innerHTML = `<div class="error">${e.toString()}</div>`;
                errorHandler(e, 'vega', index, 'view', container);
                return;
            }
            //make a dataSignals array that is made of all the signals that are marked as isData, where the name is in the spec data
            const dataSignals = initialSignals.filter(signal => { var _a; return signal.isData && ((_a = spec.data) === null || _a === void 0 ? void 0 : _a.some(data => data.name === signal.name)); }).map(signal => signal.name);
            const instance = Object.assign(Object.assign({}, specInit), { view, id, dataSignals });
            return instance;
        });
    }
    function isSignalDataBridge(signal) {
        return signal.update === `data('${signal.name}')`;
    }
    function prioritizeSignalValues(specInits) {
        var _a;
        const highPrioritySignals = specInits.map(specInit => specInit.initialSignals.filter(signal => signal.priority > 0)).flat();
        for (const specInit of specInits) {
            for (const prioritySignal of highPrioritySignals) {
                const matchSignal = (_a = specInit.spec.signals) === null || _a === void 0 ? void 0 : _a.find(signal => signal.name === prioritySignal.name);
                if (matchSignal && matchSignal.value !== undefined && matchSignal.value !== prioritySignal.value) {
                    matchSignal.value = prioritySignal.value;
                }
            }
        }
    }
    vega.expressionFunction('urlParam', urlParam);
    class VegaLogger {
        constructor(errorHandler) {
            this.errorHandler = errorHandler;
            this.logLevel = 0;
            this.error = this.error.bind(this);
            this.warn = this.warn.bind(this);
            this.info = this.info.bind(this);
            this.debug = this.debug.bind(this);
        }
        level(level) {
            if (level === undefined) {
                return this.logLevel;
            }
            this.logLevel = level;
            return this;
        }
        error(...args) {
            if (this.errorHandler) {
                this.errorHandler(args[0]);
            }
            if (this.logLevel >= 1) {
                console.error(...args);
            }
            return this;
        }
        warn(...args) {
            if (this.logLevel >= 2) {
                console.warn(...args);
            }
            return this;
        }
        info(...args) {
            if (this.logLevel >= 3) {
                console.info(...args);
            }
            return this;
        }
        debug(...args) {
            if (this.logLevel >= 4) {
                console.debug(...args);
            }
            return this;
        }
    }

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    function registerNativePlugins() {
        registerMarkdownPlugin(dropdownPlugin);
        registerMarkdownPlugin(imagePlugin);
        registerMarkdownPlugin(placeholdersPlugin);
        registerMarkdownPlugin(presetsPlugin);
        registerMarkdownPlugin(tabulatorPlugin);
        registerMarkdownPlugin(vegaLitePlugin);
        registerMarkdownPlugin(vegaPlugin);
    }

    var interfaces = /*#__PURE__*/Object.freeze({
        __proto__: null
    });

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    registerNativePlugins();

    exports.Plugins = interfaces;
    exports.Renderer = Renderer;
    exports.definePlugin = definePlugin;
    exports.plugins = plugins;
    exports.registerMarkdownPlugin = registerMarkdownPlugin;

}));
