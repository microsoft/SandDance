// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
///<reference path='../node_modules/@msrvida/sanddance/dist/umd/sanddance.d.ts' />

namespace transition {
    declare var deck: SandDance.VegaDeckGl.types.DeckBase & SandDance.VegaDeckGl.types.DeckLayerBase;
    declare var luma: SandDance.VegaDeckGl.types.LumaBase;
    declare var vega: SandDance.VegaDeckGl.types.VegaBase;

    var view: SandDance.ViewGl_Class;
    let lastText;

    SandDance.use(vega, deck, deck, luma);

    export function update(spec) {
        view = new SandDance.VegaDeckGl.ViewGl(vega.parse(spec), { presenter: view && view.presenter, getView: ()=> "3d" })
            .renderer('deck.gl')
            .initialize(document.querySelector('#split-right'))
            .run();

        lastText = JSON.stringify(spec);
    }

    export function getText(textId) {
        const textarea = document.getElementById(textId) as HTMLTextAreaElement;
        const text = textarea.value;

        const errorDiv = document.getElementById('error');
        const splitRight = document.getElementById('split-right');

        try {
            var spec = JSON.parse(text);

            if (JSON.stringify(spec) === lastText) return;

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
            var textarea = document.getElementById('text1') as HTMLTextAreaElement;
            textarea.value = text;
            getText('text1');
        });

    fetch('./specs/titanic.json')
        .then(response => response.text())
        .then(text => (document.getElementById('text2') as HTMLTextAreaElement).value = text);

}
