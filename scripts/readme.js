const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const pubversion = 'v3';

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

function packageSingleDir(title, packageRoot, packageDir, docRoot) {
    const fullPath = path.resolve(packageRoot, packageDir);
    if (fs.statSync(fullPath).isDirectory()) {
        //console.log(`folder: ${f}`);
        copyReadme(title, packageRoot, packageDir, docRoot, pubversion, 'README.md', 'index.md');
    }
}

function convertHomePage() {
    const readmeMarkdown = fs.readFileSync('./README.md', 'UTF8');
    const html = liquid('page', 'Home') + rewriteURLs(marked(readmeMarkdown));
    fs.writeFileSync('./docs/index.html', html, 'UTF8');
}

const map = {
    "https://microsoft.github.io": "",
    "dev.md": "https://github.com/Microsoft/SandDance/blob/master/dev.md",
    "packages/sanddance/README.md": `/SandDance/docs/sanddance/${pubversion}/`,
    "packages/sanddance-vue/README.md": `/SandDance/docs/sanddance-vue/${pubversion}/`,
    "packages/sanddance-react/README.md": `/SandDance/docs/sanddance-react/${pubversion}/`,
    "packages/sanddance-explorer/README.md": `/SandDance/docs/sanddance-explorer/${pubversion}/`
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

packageSingleDir('@msrvida/sanddance-vue', './packages', 'sanddance-vue', './docs/docs');
convertHomePage();
