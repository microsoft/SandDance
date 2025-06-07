const fs = require('fs');
const path = require('path');

// Ensure src directory exists
if (!fs.existsSync('./src')) {
    fs.mkdirSync('./src', { recursive: true });
}

// Find the WOFF file and convert to base64
fs.readdirSync('./fonts').forEach(file => {
    if (file.endsWith('.woff')) {
        const fontPath = path.join('./fonts', file);
        const fontBuffer = fs.readFileSync(fontPath);
        const base64Font = `data:font/woff;base64,${fontBuffer.toString('base64')}`;
        
        // Create filename from font name (convert hyphens to underscores)
        const baseName = path.basename(file, '.woff');
        const fileName = baseName.replace(/-/g, '_');
        
        // Create TypeScript file with the base64 data using constant export name
        const tsContent = `// Auto-generated font data - do not edit manually
export const fabricIconsWoff = "${base64Font}";
`;
        
        fs.writeFileSync(`./src/${fileName}.ts`, tsContent);
        console.log(`Generated ${fileName}.ts with export 'fabricIconsWoff' from ${file}`);
    }
});