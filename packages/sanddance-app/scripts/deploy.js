const fs = require('fs');
//specific version
fs.copyFileSync('./dist/css/sanddance-app.css', '../../docs/tests/v4/es6/css/sanddance-app.css');
fs.copyFileSync('./dist/umd/sanddance-app.js', '../../docs/tests/v4/es6/js/sanddance-app.js');
//main app
fs.copyFileSync('./dist/css/sanddance-app.css', '../../docs/app/css/sanddance-app.css');
fs.copyFileSync('./dist/umd/sanddance-app.js', '../../docs/app/js/sanddance-app.js');
