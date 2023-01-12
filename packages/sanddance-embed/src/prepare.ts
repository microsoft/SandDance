/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

namespace SandDanceEmbed {

    export let deps: EmbedDependency[];

    export let localDev: boolean;

    function getUnloadedDeps(depType: EmbedDependencyType, tagType: string, tagAttr: string) {
        const depsToLoad = deps.filter(dep => dep.type === depType);
        const elements = [
            ...Array.from(document.head.querySelectorAll(tagType)),
            ...Array.from(document.body.querySelectorAll(tagType)),
        ];
        depsToLoad.forEach(dep => {
            const element = elements.find(element => element.attributes[tagAttr]?.nodeValue === dep.url);
            if (element) {
                dep.existed = true;
                dep.loaded = true;
            }
        });
        return depsToLoad.filter(dep => !dep.loaded);
    }

    function loadStyleSheets() {
        const promises: Promise<void>[] = [];
        const deps = getUnloadedDeps('stylesheet', 'link', 'href');
        deps.forEach(dep => {
            promises.push(new Promise<void>((resolve, reject) => {
                const el = document.createElement('link');
                el.rel = 'stylesheet';
                el.type = 'text/css';
                el.href = dep.url;
                el.onload = () => {
                    dep.loaded = true;
                    resolve();
                };
                document.head.appendChild(el);
            }));
        });
        return promises;
    }

    function loadScripts() {
        const deps = getUnloadedDeps('script', 'script', 'src');
        const promise = new Promise<void>((resolve, reject) => {
            const next = (index: number) => {
                if (index >= deps.length) {
                    resolve();
                } else {
                    const dep = deps[index];
                    const el = document.createElement('script');
                    el.src = dep.url;
                    el.onload = () => {
                        dep.loaded = true;
                        next(++index);
                    };
                    document.head.appendChild(el);
                }
            }
            next(0);
        });
        return [promise];
    }

    export const prepare = new Promise<void>((resolve, reject) => {
        deps = defaultDependencies(localDev);
        Promise.all([...loadStyleSheets(), ...loadScripts()]).then(() => resolve());
    });

}
