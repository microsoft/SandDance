const fs = require('fs');

const base = 'src/vega-deck.gl/base.ts';

let text = fs.readFileSync(base, 'utf8');
fs.writeFileSync(base, text, 'utf8');
