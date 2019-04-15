var transition;
(function (transition) {
    var view;
    var lastText;
    SandDance.use(vega, deck, deck, luma);
    function update(spec) {
        view = new SandDance.VegaDeckGl.ViewGl(vega.parse(spec), { presenter: view && view.presenter, getView: function () { return "3d"; } })
            .renderer('deck.gl')
            .initialize(document.querySelector('#split-right'))
            .run();
        lastText = JSON.stringify(spec);
    }
    transition.update = update;
    function getText(textId) {
        var textarea = document.getElementById(textId);
        var text = textarea.value;
        var errorDiv = document.getElementById('error');
        var splitRight = document.getElementById('split-right');
        try {
            var spec = JSON.parse(text);
            if (JSON.stringify(spec) === lastText)
                return;
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
    transition.getText = getText;
    fetch('./specs/scatter3D.json')
        .then(function (response) { return response.text(); })
        .then(function (text) {
        var textarea = document.getElementById('text1');
        textarea.value = text;
        getText('text1');
    });
    fetch('./specs/titanic.json')
        .then(function (response) { return response.text(); })
        .then(function (text) { return document.getElementById('text2').value = text; });
})(transition || (transition = {}));
