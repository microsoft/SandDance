import { globSync } from 'glob';
import { readFileSync, writeFileSync } from 'fs';

const oldVersion = {
    vega: {
        major: '5',
        minor: '24',
        patch: '',
    },
    typings: {
        major: '0',
        minor: '24',
        patch: '0',
    },
};

const newVersion = {
    vega: {
        major: '5',
        minor: '25',
        patch: '0',
    },
    typings: {
        major: '0',
        minor: '24',
        patch: '1',
    },
};

const packages = {
    vega: [
        {
            glob: 'docs/{embed,tests}/v4/**/*.html',
            pattern: ({ major, minor }) => [
                `vega@${major}.${minor}`,
                `vega@^${major}.${minor}`,
            ],
        },
        {
            glob: 'docs/tests/{data-inference,sanddance-specs}/v1/index.html',
            pattern: ({ major, minor }) => [
                `vega@^${major}.${minor}`,
            ],
        },
        {
            glob: '{extensions,packages}/*/package.json',
            pattern: ({ major, minor, patch }) => [
                `"vega": "${major}.${minor}${patch.length ? '.' : ''}${patch}"`,
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
    ],
    typings: [
        {
            glob: 'packages/*/package.json',
            pattern: ({ major, minor, patch }) => [
                `"vega-typings": "~${major}.${minor}${patch.length ? '.' : ''}${patch}"`,
            ],
        },
    ],
};

//loop through keys & values in packages object
Object.entries(packages).forEach(([key, patterns]) => {

    console.log(`key: ${key}`);

    patterns.forEach(value => {
        const searches = value.pattern(oldVersion[key]);
        const replacements = value.pattern(newVersion[key]);

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
});
