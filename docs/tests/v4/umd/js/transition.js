var transition;
(function (transition) {
    var lastSpec;
    var viewType = '3d';
    SandDance.use(vega);
    function toggleView() {
        if (viewType === '3d') {
            viewType = '2d';
        }
        else {
            viewType = '3d';
        }
        update(lastSpec);
    }
    transition.toggleView = toggleView;
    function update(spec) {
        transition.view = new SandDance.VegaMorphCharts.ViewGl(vega.parse(spec), { presenter: transition.view && transition.view.presenter, getView: function () { return viewType; } })
            .renderer('morphcharts')
            .initialize(document.querySelector('#split-right'))
            .run();
        lastSpec = spec;
    }
    transition.update = update;
    function getText(textId) {
        var textarea = document.getElementById(textId);
        var text = textarea.value;
        var errorDiv = document.getElementById('error');
        var splitRight = document.getElementById('split-right');
        try {
            var spec = JSON.parse(text);
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
