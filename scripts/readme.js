const fs = require('fs');
const marked = require('marked');

const pubversion = 'v3';

function liquid(layout, title) {
    return `---\nlayout: ${layout}\ntitle: ${title}\n---\n\n`;
}

function convertHomePage() {
    const readmeMarkdown = fs.readFileSync('./README.md', 'UTF8');
    const html = liquid('page', 'Home') + rewriteURLs(marked(readmeMarkdown));
    fs.writeFileSync('./docs/index.html', html, 'UTF8');
}

const map = {
    "https://microsoft.github.io/SandDance": "",
    "dev.md": "https://github.com/Microsoft/SandDance/blob/master/dev.md",
    "packages/sanddance/README.md": `/docs/sanddance/${pubversion}/`,
    "packages/sanddance-vue/README.md": `/docs/sanddance-vue/${pubversion}/`,
    "packages/sanddance-react/README.md": `/docs/sanddance-react/${pubversion}/`,
    "packages/sanddance-explorer/README.md": `/docs/sanddance-explorer/${pubversion}/`
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
