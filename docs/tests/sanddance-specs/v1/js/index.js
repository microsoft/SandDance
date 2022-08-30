var dataUrl = '/SandDance/sample-data/demovote.tsv';
var specViewOptions = {
    colors: {
        defaultCube: "steelblue",
        axisLine: "#000",
        axisText: "#000"
    },
    language: {
        count: "Count"
    },
    maxLegends: 20,
    tickSize: 10
};
var data;
var columns;
var container = document.getElementById('vis');
var select = document.getElementById('select-spec');
var insightTextarea = document.getElementById('insight-json');
var insightUdateButton = document.getElementById('insight-update');
var vegaOutput = document.getElementById('vega-spec');
var vegaCopy = document.getElementById('vega-spec-copy');
select.onchange = function () { return selected(select.selectedIndex); };
insightUdateButton.onclick = function () {
    var insight = JSON.parse(insightTextarea.value);
    render(insight);
};
vegaCopy.onclick = function () {
    vegaOutput.select();
    document.execCommand('copy');
    vegaCopy.innerText = 'copied';
    setTimeout(function () {
        vegaCopy.innerText = 'copy';
    }, 2000);
};
function selected(selectedIndex) {
    container.innerHTML = "loading spec...";
    fetchInsight(select.options[selectedIndex].value);
}
function fetchInsight(specFilename) {
    fetch("specs/" + specFilename)
        .then(function (response) { return response.json(); })
        .then(function (insight) { return render(insight); })["catch"](function (error) { return container.innerText = error; });
}
function render(insight) {
    insightTextarea.value = JSON.stringify(insight, null, 2);
    var specColumns = SandDanceSpecs.getSpecColumns(insight, columns);
    var context = { specColumns: specColumns, insight: insight, specViewOptions: specViewOptions };
    var specResult = SandDanceSpecs.build(context, data);
    if (specResult.errors) {
        container.innerText = specResult.errors.map(function (error) { return error; }).join('\n');
    }
    else {
        renderVegaSpec(specResult.vegaSpec);
    }
}
function renderVegaSpec(vegaSpec) {
    var runtime = vega.parse(vegaSpec);
    var vegaView = new vega.View(runtime, { container: container });
    vegaView
        .runAsync()["catch"](function (e) { return container.innerHTML = "error " + e; })
        .then(function () {
        var d0 = vegaSpec.data[0];
        delete d0.values;
        d0.format = {
            parse: 'auto',
            type: 'tsv'
        };
        d0.url = 'https://microsoft.github.io' + dataUrl;
        vegaOutput.value = JSON.stringify(vegaSpec, null, 2);
    });
}
container.innerHTML = "loading " + dataUrl + "...";
vega.loader().load(dataUrl).then(function (tsv_data) {
    data = vega.read(tsv_data, { type: 'tsv', parse: 'auto' });
    columns = SandDanceSpecs.getColumnsFromData(vega.inferTypes, data);
    selected(0);
});
