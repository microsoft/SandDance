const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const pubversion = 'v3';

function replaceInfile(packageName, f) {
    const text = fs.readFileSync(f, 'utf8');
    const newText = text.replace(/index\//g, '');

    let pos = newText.indexOf('# index.ts');
    if (pos > 0) {
        pos = newText.indexOf('\n', pos);
    }

    fs.writeFileSync(f, `# ${packageName}` + newText.substring(pos), 'utf8');
}

function moveFilesInPackage(packageName, packageDir) {
    const baseDir = path.resolve(packageDir, `${pubversion}/api`);
    if (!fs.existsSync(baseDir)) {
        console.log(`no api folder @ ${baseDir}`);
        return;
    }
    const indexDir = path.resolve(baseDir, 'index');
    fs.readdirSync(indexDir).forEach(f => {
        const dest = path.resolve(baseDir, f);
        if (fs.existsSync(dest)) {
            const stat = fs.statSync(dest);
            if (stat.isDirectory()) {
                rimraf.sync(dest);
            } else {
                fs.unlinkSync(dest);
            }
        }
        const src = path.resolve(indexDir, f);

        //remove blank typecast from output
        const text = fs.readFileSync(src, 'utf8').replace(/<>/g, '');

        //write file in lew location
        fs.writeFileSync(dest, text);

        //delete original
        fs.unlinkSync(src);

        console.log(`- ${f}`);
    });
    rimraf.sync(indexDir);
    replaceInfile(packageName, path.resolve(baseDir, 'index.md'));
}

function packageDirs(root) {
    fs.readdirSync(root).forEach(f => {
        const fullPath = path.resolve(root, f);
        if (fs.statSync(fullPath).isDirectory()) {
            console.log(`folder: ${f}`);
            moveFilesInPackage(f, fullPath);
        }
    })
}

console.log('Moving docs...');

packageDirs('./docs/docs');
