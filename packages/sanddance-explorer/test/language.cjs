/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const source = fs.readFileSync(path.join(__dirname, '..', 'src', 'language.ts'), 'utf8');
const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
});
const context = { exports: {} };
vm.runInNewContext(outputText, context);
const { strings } = context.exports;

describe('Color field explanations', function () {
    const maliciousName = '<img src=x onerror="alert(1)">';
    const encodedName = '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;';

    it('escapes malicious column names in the palette explanation', function () {
        assert.equal(
            strings.labelColorFieldInfo(maliciousName, 'integer', true, 2),
            `Field <span className="fieldname">${encodedName}</span> is of type <span className="fieldtype">integer</span> and has 2 distinct values.`,
        );
    });

    it('escapes malicious column names in the direct-color explanation', function () {
        assert.equal(
            strings.labelColorFieldIsColorData(maliciousName),
            `Field <span className="fieldname">${encodedName}</span> contains direct color data.`,
        );
    });

    it('preserves literal entities, ampersands, and quotes in both explanations', function () {
        const name = 'A & B < "C" > \'D\' &lt;img&gt;';
        const encoded = 'A &amp; B &lt; &quot;C&quot; &gt; &#39;D&#39; &amp;lt;img&amp;gt;';
        assert.equal(
            strings.labelColorFieldInfo(name, 'number', false, 100),
            `Field <span className="fieldname">${encoded}</span> is of type <span className="fieldtype">number</span>.`,
        );
        assert.equal(
            strings.labelColorFieldIsColorData(name),
            `Field <span className="fieldname">${encoded}</span> contains direct color data.`,
        );
    });

    it('escapes the column type as text', function () {
        assert.equal(
            strings.labelColorFieldInfo('Revenue', maliciousName, false, 0),
            `Field <span className="fieldname">Revenue</span> is of type <span className="fieldtype">${encodedName}</span>.`,
        );
    });

    it('preserves ordinary names and explanation formatting', function () {
        assert.equal(
            strings.labelColorFieldInfo('Revenue', 'integer', true, 3),
            'Field <span className="fieldname">Revenue</span> is of type <span className="fieldtype">integer</span> and has 3 distinct values.',
        );
        assert.equal(
            strings.labelColorFieldIsColorData('Color'),
            'Field <span className="fieldname">Color</span> contains direct color data.',
        );
    });
});
