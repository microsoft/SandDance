const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const docroot = '../../docs/docs/sanddance/v1/';
const vdgroot = '../../docs/docs/vega-deck.gl';
const vegaDeckGlIndex = path.resolve(docroot, 'api/index/vegadeckgl.md');

function fixVegaDeckGlIndex() {
    //since the use function gets dropped, we will copy it over from a deicated build of the vega-deck.gl entry point
    let text = fs.readFileSync(path.resolve(vdgroot, 'v1/api/index.md'), 'utf8');
    text = text.replace(/index.ts/g, 'VegaDeckGl');
    text = text.replace(/indexts/g, 'vegadeckgl');
    text = text.replace(/index\//g, 'vegadeckgl/');
    text = text.replace(/index.md/g, 'vegadeckgl.md');
    fs.writeFileSync(vegaDeckGlIndex, text, 'utf8');
    rimraf.sync(vdgroot);
}

function flattenFolder(root, folder, ns) {
    const folderPath = path.resolve(root, folder);
    fs.readdirSync(folderPath).forEach(f => {
        let text = fs.readFileSync(path.resolve(folderPath, f), 'utf8');
        text = text.replace(/^#\s/gm, `# ${ns}.`);
        text = text.replace(/(\w*\.)(md)/g, 'vegadeckgl.$1$2');
        text = text.replace(/vegadeckgl.vegadeckgl/g, 'vegadeckgl');
        text = text.replace(/\.\.\/vegadeckgl/g, 'vegadeckgl');
        fs.writeFileSync(path.resolve(root, `${folder}.${f}`), text, 'utf8');
    });
    rimraf.sync(folderPath);
}

function replaceLinks() {
    const f = vegaDeckGlIndex;
    let text = fs.readFileSync(f, 'utf8');
    text = text.replace(/vegadeckgl\//g, `vegadeckgl.`);
    fs.writeFileSync(f, text, 'utf8');
}

fixVegaDeckGlIndex();
flattenFolder(path.resolve(docroot, 'api/index/'), 'vegadeckgl', 'VegaDeckGl');
replaceLinks();

//TODO: link to vega docs

//TODO: link to deck.gl
