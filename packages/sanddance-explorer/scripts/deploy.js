const fs = require('fs');
fs.copyFileSync('./dist/css/sanddance-explorer.css', '../../docs/dist/sanddance-explorer/v1/sanddance-explorer.css');
fs.copyFileSync('./dist/umd/sanddance-explorer.js', '../../docs/dist/sanddance-explorer/v1/sanddance-explorer.js');

fs.copyFileSync('./embed/sanddance-embed.css', './dist/umd/sanddance-embed.css');
fs.copyFileSync('./embed/sanddance-embed.html', './dist/umd/sanddance-embed.html');
