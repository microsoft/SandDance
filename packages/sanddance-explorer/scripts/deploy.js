const fs = require('fs');
fs.copyFileSync('./dist/css/sanddance-explorer.css', '../../docs/dist/sanddance-explorer/v3/sanddance-explorer.css');
fs.copyFileSync('./dist/umd/sanddance-explorer.js', '../../docs/dist/sanddance-explorer/v3/sanddance-explorer.js');

fs.copyFileSync('./dist/css/sanddance-explorer.css', '../sanddance-embed/dist/css/sanddance-explorer.css');
fs.copyFileSync('./dist/umd/sanddance-explorer.js', '../sanddance-embed/dist/umd/sanddance-explorer.js');
