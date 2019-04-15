const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

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
    const baseDir = path.resolve(packageDir, 'v1/api');
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
        fs.renameSync(path.resolve(indexDir, f), dest);
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

packageDirs('./docs/docs');
