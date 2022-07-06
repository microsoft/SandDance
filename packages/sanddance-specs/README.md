# @msrvida/sanddance-specs

[Vega specifications](https://vega.github.io/vega/docs/specification/) for unit visualizations.

![image](https://user-images.githubusercontent.com/11507384/82498036-238d5380-9aa4-11ea-85b0-8fcb31522461.png)

[Demo](https://microsoft.github.io/SandDance/tests/sanddance-specs/v1/)

## Usage

You will need an array of data objects, so that columns types can be inferred.

```js
    import { inferTypes } from 'vega';

    const data = [
        //your data objects
    ];

    const insight = {
        "colorBin": "quantize",
        "columns": {
            "x": "Gender",
            "color": "Survived",
            "sort": "Survived",
            "facet": "Age"
        },
        "scheme": "set1",   //see https://vega.github.io/vega/docs/schemes/#reference
        "facetStyle": "wrap",
        "size": {
            "height": 600,
            "width": 800
        },
        "chart": "barchartV"
    };

    const columns = getColumnsFromData(inferTypes, data);
    const specColumns = getSpecColumns(insight, columns);
    const specViewOptions = {
        colors: {
            defaultCube: "steelblue",
            axisLine: "#000",
            axisText: "#000"
        },
        language: {
            count: "Count"
        },
        maxLegends: 20,
        tickSize: 10
    };
    const context = { specColumns, insight, specViewOptions };
    const specResult = build(context, data);

    if (specResult.errors) {
        console.log(specResult.errors);
    } else {
        console.log(specResult.vegaSpec);
    }
```

## Versions

### 1.5.0 Changes

* Added background image

### 1.4.0 Changes

* Show z-axis scale

### 1.3.0 Changes

* Fix for last bin of quantitative band scale

## For more information
Please visit the [SandDance website](https://microsoft.github.io/SandDance/).
