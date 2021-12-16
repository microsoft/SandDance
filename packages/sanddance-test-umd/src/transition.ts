// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
///<reference path='../node_modules/@msrvida/sanddance/dist/umd/sanddance.d.ts' />
///<reference path='vega.d.ts' />

namespace transition {
    declare const deck: SandDance.VegaDeckGl.types.DeckBase & SandDance.VegaDeckGl.types.DeckLayerBase;
    declare const luma: SandDance.VegaDeckGl.types.LumaBase;
    declare const vega: SandDance.VegaDeckGl.types.VegaBase;

    let view: SandDance.ViewGl_Class;
    let lastSpec: Vega.Spec;
    let viewType: SandDance.types.View = '3d';

    SandDance.use(vega, deck, deck, luma);

    export function toggleView() {
        if (viewType === '3d') {
            viewType = '2d';
        } else {
            viewType = '3d';
        }
        update(lastSpec);
    }

    export function update(spec: Vega.Spec) {
        view = new SandDance.VegaDeckGl.ViewGl(vega.parse(spec), { presenter: view && view.presenter, getView: () => viewType })
            .renderer('deck.gl')
            .initialize(document.querySelector('#split-right'))
            .run();

        lastSpec = spec;
    }

    export function getText(textId) {
        const textarea = document.getElementById(textId) as HTMLTextAreaElement;
        const text = textarea.value;

        const errorDiv = document.getElementById('error');
        const splitRight = document.getElementById('split-right');

        try {
            const spec = JSON.parse(text);

            splitRight.style.opacity = '1';
            errorDiv.style.display = 'none';
            update(spec);
        }
        catch (e) {
            errorDiv.innerText = e;
            errorDiv.style.display = '';
            splitRight.style.opacity = '0.1';
        }
    }

    fetch('./specs/scatter3D.json')
        .then(response => response.text())
        .then(text => {
            const textarea = document.getElementById('text1') as HTMLTextAreaElement;
            textarea.value = text;
            getText('text1');
        });

    fetch('./specs/titanic.json')
        .then(response => response.text())
        .then(text => (document.getElementById('text2') as HTMLTextAreaElement).value = text);

}
