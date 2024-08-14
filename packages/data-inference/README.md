# @msrvida/data-inference

Infer column types in tabular data. Inference is from [vega-loader's `inferTypes` function](https://github.com/vega/vega/tree/main/packages/vega-loader#inferTypes) (or similar function of your choice). This library enriches the column metadata with a [ColumnStats object](https://microsoft.github.io/SandDance/docs/chart-types/v1/interfaces/ColumnStats.html). 

[Demo](https://microsoft.github.io/SandDance/tests/data-inference/v1/)

## Usage

You will need an array of data objects, so that columns types can be inferred.

### Modules
```js
import * as DataInference from '@msrvida/data-inference';
import { inferTypes } from 'vega-loader';

const data = [
    {
        Name: 'chevrolet chevelle malibu',
        Miles_per_Gallon: 18,
        Cylinders: 8,
        Displacement: 307,
        Horsepower: 130,
        Weight_in_lbs: 3504,
        Acceleration: 12,
        Year: '1970-01-01',
        Origin: 'USA',
    },
    {
        Name: 'buick skylark 320',
        Miles_per_Gallon: 15,
        Cylinders: 8,
        Displacement: 350,
        Horsepower: 165,
        Weight_in_lbs: 3693,
        Acceleration: 11.5,
        Year: '1970-01-01',
        Origin: 'USA',
    },
];

const columns = DataInference.getColumnsFromData(inferTypes, data);
console.log(columns);
```

### Pre-built library
```html
<script src="https://unpkg.com/vega@^5.30/build/vega.js" charset="utf-8"></script>
<script src="https://unpkg.com/@msrvida/data-inference@1.0.0/dist/umd/data-inference.js" charset="utf-8"></script>
    <script>
        const data = [
            {
                Name: 'chevrolet chevelle malibu',
                Miles_per_Gallon: 18,
                Cylinders: 8,
                Displacement: 307,
                Horsepower: 130,
                Weight_in_lbs: 3504,
                Acceleration: 12,
                Year: '1970-01-01',
                Origin: 'USA',
            },
            {
                Name: 'buick skylark 320',
                Miles_per_Gallon: 15,
                Cylinders: 8,
                Displacement: 350,
                Horsepower: 165,
                Weight_in_lbs: 3693,
                Acceleration: 11.5,
                Year: '1970-01-01',
                Origin: 'USA',
            },
        ];

        const columns = DataInference.getColumnsFromData(vega.inferTypes, data);
        console.log(columns);
    </script>
```

## Sample output
```json
[
    {
        "name": "Name",
        "type": "string",
        "quantitative": false,
        "stats": {
            "distinctValueCount": 2,
            "max": null,
            "mean": null,
            "min": null
        },
        "isColorData": false
    },
    {
        "name": "Miles_per_Gallon",
        "type": "integer",
        "quantitative": true,
        "stats": {
            "distinctValueCount": 2,
            "max": 18,
            "mean": 16.5,
            "min": 15,
            "hasNegative": false,
            "isSequential": false
        }
    },
    {
        "name": "Cylinders",
        "type": "integer",
        "quantitative": true,
        "stats": {
            "distinctValueCount": 1,
            "max": 8,
            "mean": 8,
            "min": 8,
            "hasNegative": false,
            "isSequential": false
        }
    },
    .
    .
    .
]
```

## For more information
Please visit the [SandDance website](https://microsoft.github.io/SandDance/).
