const fs = require('fs');
fs.copyFileSync('./dist/css/sanddance-explorer.css', '../../docs/dist/sanddance-explorer/v4/sanddance-explorer.css');
fs.copyFileSync('./dist/umd/sanddance-explorer.js', '../../docs/dist/sanddance-explorer/v4/sanddance-explorer.js');
