const fs = require('fs');
fs.copyFileSync('./dist/css/sanddance-app.css', '../../docs/tests/v4/es6/css/sanddance-app.css');
fs.copyFileSync('./dist/umd/sanddance-app.js', '../../docs/tests/v4/es6/js/sanddance-app.js');
