const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const tree = require('../docs/_data/tree.json');

function liquid(layout, title) {
    return `---\nlayout: ${layout}\ntitle: '${title}'\n---\n\n`;
}

function copyReadme(title, packageRoot, packageDir, docRoot, version, fileNameIn, fileNameOut) {
    const docRootPath = path.resolve(docRoot, packageDir);
    if (!fs.existsSync(docRootPath)) return;
    const readMePath = path.resolve(packageRoot, packageDir, fileNameIn);
    if (!fs.existsSync(readMePath)) {
        console.log(`no readme for ${packageDir} at ${readMePath}`);
        return;
    }
    let readme = fs.readFileSync(readMePath, 'utf8');
    readme = rewriteURLs(readme);
    readme = liquid('docs', title) + readme;
    fs.writeFileSync(path.resolve(docRootPath, version, fileNameOut), readme, 'utf8');
    console.log(`readme copied for ${packageDir}`);
}

function convertHomePage() {
    const readmeMarkdown = fs.readFileSync('./README.md', 'UTF8');
    const html = liquid('page', 'Home') + rewriteURLs(marked(readmeMarkdown));
    fs.writeFileSync('./docs/index.html', html, 'UTF8');
}

const map = {
    "https://microsoft.github.io": "",
    "dev.md": "https://github.com/Microsoft/SandDance/blob/master/dev.md",
    "packages/sanddance/README.md": `/SandDance${tree.Components.filter(c=>c.tree==='sanddance')[0].url}/`,
    "packages/sanddance-specs/README.md": `/SandDance${tree.Components.filter(c=>c.tree==='sanddance-specs')[0].url}/`,
    "packages/sanddance-vue/README.md": `/SandDance${tree.Components.filter(c=>c.tree==='sanddance-vue')[0].url}/`,
    "packages/sanddance-react/README.md": `/SandDance${tree.Components.filter(c=>c.tree==='sanddance-react')[0].url}/`,
    "packages/sanddance-explorer/README.md": `/SandDance${tree.Components.filter(c=>c.tree==='sanddance-explorer')[0].url}/`,
    "packages/vega-deck.gl/README.md": `/SandDance${tree.Components.filter(c=>c.tree==='vega-deck.gl')[0].url}/`,
};

//https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function rewriteURLs(html) {
    for (var key in map) {
        var value = map[key];
        var re = new RegExp(escapeRegExp(key), 'g');
        html = html.replace(re, value);
    }
    return html;
}

convertHomePage();
