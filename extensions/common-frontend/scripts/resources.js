const path = require('path');
const fs = require('fs');

const resources = [
    '../common-frontend/dist/app.css',
    '../common-frontend/dist/app.js',
    '../../packages/sanddance-explorer/dist/umd/sanddance-explorer.js',
    '../../node_modules/vega/build/vega.js',
    '../../node_modules/react/umd/react.production.min.js',
    '../../node_modules/react-dom/umd/react-dom.production.min.js',
    '../../node_modules/@fluentui/react/dist/fluentui-react.js',
    '../../node_modules/@msrvida/fluentui-icons/dist/umd/fluentui-icons.js',
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
