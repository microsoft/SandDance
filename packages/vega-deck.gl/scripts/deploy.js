const fs = require('fs');

const pubversion = 'v3';

fs.copyFileSync('./dist/umd/vega-deck.gl.js', `../../docs/dist/vega-deck.gl/${pubversion}/vega-deck.gl.js`);
