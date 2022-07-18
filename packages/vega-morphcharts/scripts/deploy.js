const fs = require('fs');

const pubversion = 'v1';

fs.copyFileSync('./dist/umd/vega-morphcharts.js', `../../docs/dist/vega-morphcharts/${pubversion}/vega-morphcharts.js`);
