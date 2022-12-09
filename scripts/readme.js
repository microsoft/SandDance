const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const tree = require('../docs/_data/tree.json');

function liquid(layout, title) {
    return `---\nlayout: ${layout}\ntitle: '${title}'\n---\n\n`;
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
    "packages/sanddance-react/README.md": `/SandDance${tree.Components.filter(c=>c.tree==='sanddance-react')[0].url}/`,
    "packages/sanddance-explorer/README.md": `/SandDance${tree.Components.filter(c=>c.tree==='sanddance-explorer')[0].url}/`,
    "packages/sanddance-embed/README.md": `/SandDance${tree.Components.filter(c=>c.tree==='sanddance-embed')[0].url}/`,
    "packages/vega-deck.gl/README.md": `/SandDance${tree.Components.filter(c=>c.tree==='vega-deck.gl')[0].url}/`,
    "packages/vega-morphcharts/README.md": `/SandDance${tree.Components.filter(c=>c.tree==='vega-morphcharts')[0].url}/`,
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
