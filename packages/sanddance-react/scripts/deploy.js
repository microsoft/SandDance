const fs = require('fs');

const pubversion = 'v4';

fs.copyFileSync('./dist/umd/sanddance-react.js', `../../docs/dist/sanddance-react/${pubversion}/sanddance-react.js`);
