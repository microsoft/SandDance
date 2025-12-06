# @msrvida/data-inference

Infer column types in tabular data. Inference is from [vega-loader's `inferTypes` function](https://github.com/vega/vega/tree/main/packages/vega-loader#inferTypes) (or similar function of your choice). This library enriches the column metadata with a [ColumnStats object](https://github.com/microsoft/SandDance/blob/main/packages/chart-types/src/stats.ts). 

[Demo](https://microsoft.github.io/SandDance/tests/data-inference/v2/)

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
<script src="https://unpkg.com/vega@^6.2/build/vega.js" charset="utf-8"></script>
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

## Pandas-style simulation
As of version 1.2, the **pandasSimulation** namespace provides **describe()**, **head()**, and **info()** functions to emit data inferences in similar format of [Python's Pandas library](https://pandas.pydata.org/)

### head
```js
console.log(DataInference.pandasSimulation.head(columns, data));
```

```
                       Name Miles_per_Gallon Cylinders Displacement Horsepower \
1 chevrolet chevelle malibu               18         8          307        130
2         buick skylark 320               15         8          350        165
3        plymouth satellite               18         8          318        150
4             amc rebel sst               16         8          304        150
5               ford torino               17         8          302        140

Weight_in_lbs Acceleration       Year Origin
         3504           12 1970-01-01    USA
         3693         11.5 1970-01-01    USA
         3436           11 1970-01-01    USA
         3433           12 1970-01-01    USA
         3449         10.5 1970-01-01    USA
```

### info
```js
console.log(DataInference.pandasSimulation.info(columns, data));
```

```
info
<class 'pandas.core.frame.DataFrame'>
Index: 406 entries, 0 to 405
Data columns (total 9 columns):

# Column           Non-Null Count Dtype         
- ---------------- -------------- --------------
0 Name             406 non-null   object        
1 Miles_per_Gallon 398 non-null   float64       
2 Cylinders        406 non-null   int64         
3 Displacement     406 non-null   float64       
4 Horsepower       400 non-null   int64         
5 Weight_in_lbs    406 non-null   int64         
6 Acceleration     406 non-null   float64       
7 Year             406 non-null   datetime64[ns]
8 Origin           406 non-null   object        


dtypes: 3 float64, 3 int64, 2 object
memory usage: 21.0 KB
```

## For more information
Please visit the [SandDance website](https://microsoft.github.io/SandDance/).
