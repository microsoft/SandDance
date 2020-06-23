const fs = require('fs');
const path = require('path');
const unified = require('unified');
const markdown = require('remark-parse');
const toc = require('mdast-util-toc');

const pubversion = 'v3';

function removeToc(mdPath) {
    const text = fs.readFileSync(mdPath, 'utf8');
    let pos = text.search(/#\s.*Table of contents/i);
    if (pos >= 0) {
        pos = text.indexOf('#', pos + 1);
        fs.writeFileSync(mdPath, text.substring(pos), 'utf8');
    }
}

function prefixName(packageName, mdPath) {
    const text = fs.readFileSync(mdPath, 'utf8');
    const newText = text.replace(/#\s/, `# ${packageName} .`);
    fs.writeFileSync(mdPath, newText, 'utf8');
}

function getTOC(mdPath) {
    const text = fs.readFileSync(mdPath, 'utf8');
    const processor = unified().use(markdown, { commonmark: true });
    const tree = processor.parse(text);
    return toc(tree);
}

function injectLiquid(mdPath) {
    let text = fs.readFileSync(mdPath, 'utf8');
    text = text.replace(/\.md#/g, '.html#');
    const liquid = `---\nlayout: api\n---\n\n`;
    fs.writeFileSync(mdPath, liquid + text, 'utf8');
}

function getOutline(headings) {
    function getLeaves(child) {
        if (!child) return;
        if (child.children) {
            child.children.forEach(getLeaves);
        } else {
            leaves.push(child.value.split(' ')[0]);
        }
    }

    const leaves = [];
    headings.forEach(heading => getLeaves(heading.children[0]));
    leaves.sort((a, b) => a.localeCompare(b));
    return leaves;
}

function getTree(headings) {
    function getLeaves(child) {
        if (!child) return;
        if (child.children) {
            child.children.forEach(getLeaves);
        } else {
            leaves.push(child.value.split(' ')[0]);
        }
    }

    const leaves = [];
    headings.forEach(heading => getLeaves(heading.children[1]));
    leaves.sort((a, b) => a.localeCompare(b));
    return leaves;
}

function tocFilesInPackage(packageName, packageDir) {
    const dir = path.resolve(packageDir, `${pubversion}/api`);
    if (!fs.existsSync(dir)) {
        console.log(`no api folder @ ${dir}`);
        return;
    }
    outlines[packageName] = {};
    fs.readdirSync(dir).forEach(f => {
        const mdPath = path.resolve(dir, f);
        if (fs.statSync(mdPath).isDirectory()) return;
        if (f === 'index.md') {
            tree[packageName] = getTree(getTOC(mdPath).map.children[0].children[1].children);
        } else {
            removeToc(mdPath);
            prefixName(packageName, mdPath);
            const thisToc = getTOC(mdPath);
            const node = thisToc.map.children[0].children[1]
            if (node) {
                outlines[packageName][f] = getOutline(node.children);
            }
        }
        injectLiquid(mdPath);
        console.log(`- ${f}`);
    });
}

function packageDirs(root) {
    fs.readdirSync(root).forEach(f => {
        const fullPath = path.resolve(root, f);
        if (fs.statSync(fullPath).isDirectory()) {
            console.log(`folder: ${f}`);
            tocFilesInPackage(f, fullPath);
        }
    })
}

const outlines = {};
const tree = {};

console.log('Generating table of contents...');

packageDirs('./docs/docs');

fs.writeFileSync('./docs/_data/outlines.json', JSON.stringify(outlines, null, 2), 'utf8');
fs.writeFileSync('./docs/_data/apitree.json', JSON.stringify(tree, null, 2), 'utf8');
