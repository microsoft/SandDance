import { globSync } from 'glob';
import { readFileSync, writeFileSync } from 'fs';

const oldVersion = {
    major: 5,
    minor: 22,
    patch: 1,
};

const newVersion = {
    major: 5,
    minor: 25,
    patch: 0,
};

const patterns = [
    {
        glob: 'docs/{embed,tests}/v4/**/*.html',
        pattern: ({ major, minor }) => [
            `vega@${major}.${minor}`,
            `vega@^${major}.${minor}`,
        ],
    },
    {
        glob: '{extensions,packages}/*/package.json',
        pattern: ({ major, minor, patch }) => [
            `"vega": "${major}.${minor}.${patch}"`,
        ],
    },
    {
        glob: 'packages/*/src/**/*.ts',
        pattern: ({ major, minor }) => [
            `vega@${major}.${minor}`,
        ],
    },
    {
        glob: 'packages/*/README.md',
        pattern: ({ major, minor }) => [
            `vega@^${major}.${minor}`,
            `"vega": "^${major}.${minor}"`,
        ],
    },
];

//loop through keys & values in patterns
patterns.forEach(value => {
    const searches = value.pattern(oldVersion);
    const replacements = value.pattern(newVersion);

    console.log(`Updating ${value.glob}`);

    const files = globSync(`${value.glob}`);

    files.forEach(file => {
        let content = readFileSync(file, 'utf8');
        let updatedContent = content;
        searches.forEach((searchStr, i) => {
            if (updatedContent.includes(searchStr)) {

                //just log it for now
                //console.log(`Found ${searchStr} in ${file}, to be replaced with ${replacements[i]}`);

                updatedContent = updatedContent.replace(searchStr, replacements[i]);
            }
        });
        if (updatedContent !== content) {
            try {
                writeFileSync(file, updatedContent);
                console.log(`Updated file: ${file}`);
            } catch (err) {
                console.error(`Error writing file: ${err}`);
            }
        }
    });
});
