const fs = require('fs');
fs.copyFileSync('./dist/css/sanddance-app.css', '../../docs/app/css/sanddance-app.css');
fs.copyFileSync('./dist/umd/sanddance-app.js', '../../docs/app/js/sanddance-app.js');
