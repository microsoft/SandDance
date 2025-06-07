const fs = require('fs');
if (!fs.existsSync('./dist/fonts')) {
    fs.mkdirSync('./dist/fonts', { recursive: true });
}
const path = require('path');

fs.readdirSync('./fonts').forEach(file => {
    if (file.endsWith('.woff')) {
        fs.copyFileSync(
            path.join('./fonts', file),
            path.join('./dist/fonts', file)
        );
    }
});
