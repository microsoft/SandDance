const fs = require("fs-extra");

// copy directory, even if it has subdirectories or files
fs.copySync('./node_modules/inuitcss', './docs/_sass/inuitcss');

fs.removeSync('./docs/_sass/inuitcss/.stylelintrc');
fs.removeSync('./docs/_sass/inuitcss/CHANGELOG.md');
fs.removeSync('./docs/_sass/inuitcss/circle.yml');
fs.removeSync('./docs/_sass/inuitcss/example.main.scss');
fs.removeSync('./docs/_sass/inuitcss/package.json');
fs.removeSync('./docs/_sass/inuitcss/README.md');
fs.removeSync('./docs/_sass/inuitcss/components');
fs.removeSync('./docs/_sass/inuitcss/settings/_example.settings.config.scss');
fs.removeSync('./docs/_sass/inuitcss/settings/_example.settings.global.scss');
