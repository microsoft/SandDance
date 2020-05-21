// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as SandDance from '@msrvida/sanddance';

export { SandDance };
export { version } from './version';

import SandDanceVue from './SandDanceVue.vue';

export function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('SandDanceVue', SandDanceVue);
}

const plugin = {
    install,
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

export default SandDanceVue;
