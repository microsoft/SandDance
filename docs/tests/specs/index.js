function addElement(tagName, innerText, parentElement) {
    const el = document.createElement(tagName);
    if (innerText) {
        el.innerText = innerText;
    }
    (parentElement || document.body).appendChild(el);
    return el;
}

function view(name, spec) {
    addElement('h3', name);
    const div = addElement('div');
    try {
        const runtime = vega.parse(spec);
        new vega.View(runtime).initialize(div).renderer('canvas').run();
    } catch (e) {
        div.innerText = `failed: ${e}`;
    }
}

function addCell(parentElement, title, spec) {
    const div = addElement('div', null, parentElement);
    addElement('h4', title, div);
    const textarea = addElement('textarea', null, div);
    textarea.value = JSON.stringify(spec, null, 2);
}

function list() {
    addElement('h1', 'Vega-Lite ➧ Vega ➧ Unit Visualization');
    conversions.forEach(conversion => {
        const h2 = addElement('h2');
        const a = addElement('a', conversion.src, h2);
        a.setAttribute('href', `?${conversion.src}`);
        const spec = vegaLite.compile(conversion.vegaLiteSpec).spec;
        view('original from vega lite', spec);
        conversion.downloads.forEach(download => {
            view(download.src, download.spec);
            if (urlFilter) {
                const div = addElement('div');
                div.setAttribute('class', 'spec-table');
                addCell(div, 'original', spec);
                addCell(div, 'converted', download.spec);
            }
        })
        addElement('hr');
    });
}

function Tally() {
    this.goal = 0;
    this.actual = 0;
}

const tally = {
    src: new Tally(),
    outputs: new Tally()
};

function checkAll() {
    if (tally.src.actual == tally.src.goal && tally.outputs.actual === tally.outputs.goal) {
        conversions.forEach(conversion => conversion.downloads.sort((a, b) => a.src.localeCompare(b.src)));
        list();
    }
}

const urlFilter = document.location.search.substring(1);
if (urlFilter) {
    conversions = conversions.filter(c => c.src === urlFilter);
}

conversions.sort((a, b) => a.src.localeCompare(b.src));

conversions.forEach(conversion => {
    tally.src.goal++;
    tally.outputs.goal += conversion.outputs.length;
    fetch(`input/${conversion.src}`).then(response => {
        response.json().then(spec => {
            conversion.vegaLiteSpec = spec;
            tally.src.actual++;
            checkAll();
        });
    });
    conversion.downloads = [];
    conversion.outputs.forEach(src => {
        fetch(`output/${src}`).then(response => {
            response.json().then(spec => {
                const download = { src, spec };
                conversion.downloads.push(download);
                tally.outputs.actual++;
                checkAll();
            });
        });
    });
});
