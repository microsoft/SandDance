// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as fs from 'fs';
import * as path from 'path';
import * as Vega from 'vega-typings';
import * as VegaLite from 'vega-lite';
import { TopLevelUnitSpec } from 'vega-lite/build/src/spec/unit';
import { unitizeBar, UnitStyle } from './bar';
import { Encoding } from 'vega-lite/build/src/encoding';
import { PositionFieldDef } from 'vega-lite/build/src/channeldef';

const base = '../../docs/tests/specs';

const filenames = fs.readdirSync(path.join(base, 'input'));

interface Conversion {
    src: string;
    outputs: string[];
}

const conversions: Conversion[] = [];

function out(filename: string, outputSpec: Vega.Spec) {
    process.stdout.write(`writing ${filename} \n`);
    fs.writeFileSync(path.join(base, 'output', filename), JSON.stringify(outputSpec, null, 2), 'utf8');
}

function aggregateToUnitStyles(encoding: Encoding<any>): UnitStyle[] {
    const unitStyles: UnitStyle[] = [];
    for (let name in encoding) {
        let e = encoding[name] as PositionFieldDef<any>;
        if (e.aggregate) {
            switch (e.aggregate) {
                case 'count': {
                    unitStyles.push('square');
                    break;
                }
                case 'sum': {
                    unitStyles.push('treemap');
                    break;
                }
            }
        }
    }
    return unitStyles;
}

filenames.forEach(src => {
    const conversion: Conversion = { src, outputs: [] };
    conversions.push(conversion);
    const json = fs.readFileSync(path.join(base, 'input', src), 'utf8');
    let vegaLiteSpec: TopLevelUnitSpec;
    try {
        vegaLiteSpec = JSON.parse(json);
    }
    catch (e) {
        process.stderr.write(e);
    }
    if (vegaLiteSpec) {
        const output = VegaLite.compile(vegaLiteSpec);
        const spec = output.spec as Vega.Spec;
        switch (vegaLiteSpec.mark) {
            case 'bar': {
                const unitStyles = aggregateToUnitStyles(vegaLiteSpec.encoding);
                unitStyles.forEach(unitStyle => {
                    const outputSpec = JSON.parse(JSON.stringify(spec));
                    unitizeBar(vegaLiteSpec, outputSpec, unitStyle);
                    const dest = `${unitStyle}-${src.replace('.vl.', '.vg.')}`;
                    conversion.outputs.push(dest);
                    out(dest, outputSpec);
                });
            }
        }
    }
});

fs.writeFileSync(path.join(base, 'conversions.js'), `var conversions = ${JSON.stringify(conversions, null, 2)};`, 'utf8');
