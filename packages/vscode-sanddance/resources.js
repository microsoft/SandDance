const path = require('path');
const fs = require('fs');

const resources = [
    "./node_modules/common-extensions/dist/app-test.js",
    "./node_modules/common-extensions/dist/app.css",
    "./node_modules/common-extensions/dist/app.js",
    "./node_modules/common-extensions/node_modules/@msrvida/sanddance-explorer/dist/umd/sanddance-explorer.js",
    "./node_modules/vega-lib/build/vega.js",
    "./node_modules/deck.gl/deckgl.min.js",
    "./node_modules/react/umd/react.production.min.js",
    "./node_modules/react-dom/umd/react-dom.production.min.js",
    "./node_modules/office-ui-fabric-react/dist/office-ui-fabric-react.js"
];

const errors = [];
const resourcesPath = 'resources';

if (!fs.existsSync(resourcesPath)) {
    fs.mkdirSync(resourcesPath);
}

resources.forEach(resource => {
    const dest = path.resolve(resourcesPath, path.basename(resource));
    if (fs.existsSync(dest)) {
        fs.unlinkSync(dest);
    }
    if (fs.existsSync(resource)) {
        fs.copyFile(resource, dest, err => errors.push({ err, resource }));
    } else { 
        errors.push('file does not exist', resource);
    }
});

if (errors.length) {
    console.log(errors);
    process.exitCode = 1;
}
