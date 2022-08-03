const fs = require('fs');
const pbiviz = require('../pbiviz.json');
const filename = `${pbiviz.visual.name}.${pbiviz.visual.version}.pbiviz`;
fs.copyFileSync(`./dist/${filename}`, `../../docs/dist/powerbi/v4/${filename}`);
