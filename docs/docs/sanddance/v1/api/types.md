---
layout: api
---

# sanddance .types

## Interfaces

### SearchExpression

```typescript
interface SearchExpression {
    clause?: SearchExpressionClause;
    name: string;
    operator: SearchExpressionOperators;
    value?: boolean | Date | number | string;
}
```

**Properties**

| Name     | Type                                                | Optional |
| -------- | --------------------------------------------------- | -------- |
| clause   | [SearchExpressionClause][TypeAliasDeclaration-1]    | true     |
| name     | string                                              | false    |
| operator | [SearchExpressionOperators][TypeAliasDeclaration-2] | false    |
| value    | boolean &#124; Date &#124; number &#124; string     | true     |

----------

### SearchExpressionGroup

```typescript
interface SearchExpressionGroup<T extends SearchExpression = SearchExpression> {
    logic?: "!";
    clause?: SearchExpressionClause;
    expressions: T[];
}
```

**Type parameters**

| Name | Constraint                                 | Default                                    |
| ---- | ------------------------------------------ | ------------------------------------------ |
| T    | [SearchExpression][InterfaceDeclaration-1] | [SearchExpression][InterfaceDeclaration-1] |

**Properties**

| Name        | Type                                             | Optional |
| ----------- | ------------------------------------------------ | -------- |
| logic       | "!"                                              | true     |
| clause      | [SearchExpressionClause][TypeAliasDeclaration-1] | true     |
| expressions | T[]                                              | false    |

----------

### Column

Column information.

```typescript
interface Column {
    name: string;
    type: TypeInference;
    quantitative?: boolean;
    stats?: ColumnStats;
}
```

**Properties**

| Name         | Type                                  | Optional | Description                                                  |
| ------------ | ------------------------------------- | -------- | ------------------------------------------------------------ |
| name         | string                                | false    | Name of the column.                                          |
| type         | TypeInference                         | false    | Type of data in the column.                                  |
| quantitative | boolean                               | true     | Optional flag to specify if the column data is quantitative. |
| stats        | [ColumnStats][InterfaceDeclaration-4] | true     | Optional stats object with metadata of column data content.  |

----------

### ColumnStats

Metadata about a column.

```typescript
interface ColumnStats {
    distinctValueCount: number;
    max?: number;
    min?: number;
}
```

**Properties**

| Name               | Type   | Optional | Description                                                 |
| ------------------ | ------ | -------- | ----------------------------------------------------------- |
| distinctValueCount | number | false    | Number of unique values in this column.                     |
| max                | number | true     | Maximum value of data in this column, if column is numeric. |
| min                | number | true     | Minimum value of data in this column, if column is numeric. |

----------

### ColumnTypeMap

```typescript
interface ColumnTypeMap {
    [columnName: string]: TypeInference;
}
```
#### Index

```typescript
[columnName: string]: TypeInference;
```

* *Parameter* `columnName` - string
* *Type* TypeInference


----------

### FacetMargins

```typescript
interface FacetMargins {
    column: number;
    row: number;
    title: number;
}
```

**Properties**

| Name   | Type   | Optional |
| ------ | ------ | -------- |
| column | number | false    |
| row    | number | false    |
| title  | number | false    |

----------

### Facets

Column to use for faceting into small multiples.

```typescript
interface Facets {
    columns: number;
    rows: number;
}
```

**Properties**

| Name    | Type   | Optional | Description                          |
| ------- | ------ | -------- | ------------------------------------ |
| columns | number | false    | Number of columns in the facet grid. |
| rows    | number | false    | Number of rows in the facet grid.    |

----------

### Insight

Options to designate a SandDance visualization.

```typescript
interface Insight {
    chart: Chart;
    size: Size;
    columns: InsightColumns;
    view?: View;
    filter?: Search;
    facets?: Facets;
    colorBin?: ColorBin;
    scheme?: string;
    signalValues?: SignalValues;
}
```

**Properties**

| Name         | Type                                      | Optional | Description                                                                                                      |
| ------------ | ----------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| chart        | [Chart][TypeAliasDeclaration-6]           | false    |                                                                                                                  |
| size         | [Size][InterfaceDeclaration-9]            | false    |                                                                                                                  |
| columns      | [InsightColumns][InterfaceDeclaration-10] | false    |                                                                                                                  |
| view         | [View][TypeAliasDeclaration-8]            | true     |                                                                                                                  |
| filter       | [Search][TypeAliasDeclaration-0]          | true     |                                                                                                                  |
| facets       | [Facets][InterfaceDeclaration-7]          | true     |                                                                                                                  |
| colorBin     | [ColorBin][TypeAliasDeclaration-7]        | true     | Type of color binning to use on color scale. Only applicable when the column in the color role is quantitative.  |
| scheme       | string                                    | true     | Name of the color scheme. See https://vega.github.io/vega/docs/schemes/                                          |
| signalValues | [SignalValues][InterfaceDeclaration-11]   | true     | Vega signal values for this insight.                                                                             |

----------

### InsightColumns

```typescript
interface InsightColumns {
    uid: string;
    x?: string;
    y?: string;
    z?: string;
    group?: string;
    size?: string;
    color?: string;
    sort?: string;
    facet?: string;
}
```

**Properties**

| Name  | Type   | Optional |
| ----- | ------ | -------- |
| uid   | string | false    |
| x     | string | true     |
| y     | string | true     |
| z     | string | true     |
| group | string | true     |
| size  | string | true     |
| color | string | true     |
| sort  | string | true     |
| facet | string | true     |

----------

### SpecRoleCapabilities

```typescript
interface SpecRoleCapabilities {
    role: InsightColumnRoles;
    excludeCategoric?: boolean;
    allowNone?: boolean;
    binnable?: boolean;
    axisSelection?: AxisSelectionType;
    signals?: string[];
}
```

**Properties**

| Name             | Type                                         | Optional | Description                             |
| ---------------- | -------------------------------------------- | -------- | --------------------------------------- |
| role             | [InsightColumnRoles][TypeAliasDeclaration-9] | false    |                                         |
| excludeCategoric | boolean                                      | true     |                                         |
| allowNone        | boolean                                      | true     |                                         |
| binnable         | boolean                                      | true     |                                         |
| axisSelection    | [AxisSelectionType][TypeAliasDeclaration-5]  | true     |                                         |
| signals          | string[]                                     | true     | Signals associated with this spec role. |

----------

### SpecCapabilities

Interaction behavior on a visualization type.

```typescript
interface SpecCapabilities {
    roles: SpecRoleCapabilities[];
    signals?: string[];
}
```

**Properties**

| Name    | Type                                              | Optional | Description                             |
| ------- | ------------------------------------------------- | -------- | --------------------------------------- |
| roles   | [SpecRoleCapabilities][InterfaceDeclaration-12][] | false    | Roles to map columns.                   |
| signals | string[]                                          | true     | Signals associated with this spec type. |

----------

### SpecColorSettings

Custom colors of various parts of the visualization.

```typescript
interface SpecColorSettings {
    defaultCube?: Color;
    axisLine?: Color;
    axisText?: Color;
    cellFillerLine?: Color;
}
```

**Properties**

| Name           | Type  | Optional | Description                                         |
| -------------- | ----- | -------- | --------------------------------------------------- |
| defaultCube    | Color | true     | Color of cubes when there is no coloring specified. |
| axisLine       | Color | true     | Color of axes lines.                                |
| axisText       | Color | true     | Color of axes text.                                 |
| cellFillerLine | Color | true     | Color of inactive facets lines.                     |

----------

### SpecLanguage

Language settings.

```typescript
interface SpecLanguage {
    treeMapMethod: string;
    scatterPointSize: string;
    barChartBinSize: string;
    colorBinCount: string;
    colorReverse: string;
    facetColumns: string;
    facetRows: string;
    textScaleSignal: string;
    xAxisTextAngleSignal: string;
    yAxisTextAngleSignal: string;
    zScaleProportion: string;
}
```

**Properties**

| Name                 | Type   | Optional | Description                              |
| -------------------- | ------ | -------- | ---------------------------------------- |
| treeMapMethod        | string | false    | Label for treemap method dropdown.       |
| scatterPointSize     | string | false    | Label for scatterPlot point size slider. |
| barChartBinSize      | string | false    | Label for bar chart bin size slider.     |
| colorBinCount        | string | false    | Label for the color bin count slider.    |
| colorReverse         | string | false    | Label for the color reverse checkbox.    |
| facetColumns         | string | false    | Label for facet columns slider.          |
| facetRows            | string | false    | Label for facet rows slider.             |
| textScaleSignal      | string | false    | Label for text scale slider.             |
| xAxisTextAngleSignal | string | false    | Label for x axis text angle slider.      |
| yAxisTextAngleSignal | string | false    | Label for y axis text angle slider.      |
| zScaleProportion     | string | false    | Label for z scale proportion slider.     |

----------

### SignalValues

```typescript
interface SignalValues {
    [key: string]: any;
}
```
#### Index

```typescript
[key: string]: any;
```

* *Parameter* `key` - string
* *Type* any


----------

### Size

Rectangle size.

```typescript
interface Size {
    height: number;
    width: number;
}
```

**Properties**

| Name   | Type   | Optional |
| ------ | ------ | -------- |
| height | number | false    |
| width  | number | false    |

----------

### SpecColumns

Specified columns for a SandDance visualization.

```typescript
interface SpecColumns {
    uid: Column;
    x?: Column;
    y?: Column;
    z?: Column;
    size?: Column;
    group?: Column;
    color?: Column;
    sort?: Column;
    facet?: Column;
}
```

**Properties**

| Name  | Type                             | Optional | Description                                                               |
| ----- | -------------------------------- | -------- | ------------------------------------------------------------------------- |
| uid   | [Column][InterfaceDeclaration-3] | false    | Column with a unique id for each row.                                     |
| x     | [Column][InterfaceDeclaration-3] | true     | Column to use as x-axis in a visualization.                               |
| y     | [Column][InterfaceDeclaration-3] | true     | Column to use as y-axis in a visualization, optional for bar chart.       |
| z     | [Column][InterfaceDeclaration-3] | true     | Column to use as z-axis in a visualization.                               |
| size  | [Column][InterfaceDeclaration-3] | true     | Column to use as size in a visualization.                                 |
| group | [Column][InterfaceDeclaration-3] | true     | Column to use for grouping in a visualization.                            |
| color | [Column][InterfaceDeclaration-3] | true     | Column to use for coloring a visualization.                               |
| sort  | [Column][InterfaceDeclaration-3] | true     | Column to use for sorting a visualization, not applicable to scatterplot. |
| facet | [Column][InterfaceDeclaration-3] | true     | Column to use for faceting a visualization.                               |

----------

### SpecViewOptions

```typescript
interface SpecViewOptions {
    colors: SpecColorSettings;
    language: SpecLanguage;
    maxLegends: number;
    facetMargins: FacetMargins;
    tickSize: number;
}
```

**Properties**

| Name         | Type                                         | Optional | Description                                          |
| ------------ | -------------------------------------------- | -------- | ---------------------------------------------------- |
| colors       | [SpecColorSettings][InterfaceDeclaration-14] | false    | Custom colors of various parts of the visualization. |
| language     | [SpecLanguage][InterfaceDeclaration-15]      | false    | Language settings for the visualization.             |
| maxLegends   | number                                       | false    | Maximum number of rows in a legend.                  |
| facetMargins | [FacetMargins][InterfaceDeclaration-6]       | false    |                                                      |
| tickSize     | number                                       | false    |                                                      |

----------

### OrdinalMap

Map of ordinals per unique Id.

```typescript
interface OrdinalMap {
    [uid: string]: number;
}
```
#### Index

```typescript
[uid: string]: number;
```

* *Parameter* `uid` - string
* *Type* number


----------

### RenderResult

Result of an attempt to render.

```typescript
interface RenderResult {
    specResult: SpecResult;
    ordinalMap: OrdinalMap;
}
```

**Properties**

| Name       | Type                                  | Optional | Description                                 |
| ---------- | ------------------------------------- | -------- | ------------------------------------------- |
| specResult | SpecResult | false    | Specification result object.                |
| ordinalMap | [OrdinalMap][InterfaceDeclaration-18] | false    | Map of cube ordinals assigned by unique id. |

----------

### TransitionDurations

Lengths of time for a transition animation.

```typescript
interface TransitionDurations extends TransitionDurations {
    scope: number;
}
```

**Extends**

[TransitionDurations][InterfaceDeclaration-22]

**Properties**

| Name  | Type   | Optional | Description                                         |
| ----- | ------ | -------- | --------------------------------------------------- |
| scope | number | false    | Transition time when a filter is applied / removed. |

----------

### ViewerOptions

Customization options for the Viewer.

```typescript
interface ViewerOptions extends SpecViewOptions {
    colors: ColorSettings;
    language: Language;
    lightSettings?: { [view extends View]: LightSettings };
    transitionDurations: TransitionDurations;
    onError?: (errors: string[]) => void;
    onColorContextChange?: () => void;
    onDataFilter?: (filter: Search, filteredData: object[]) => void;
    onSelectionChanged?: (search?: Search, activeIndex?: number) => void;
    onStage?: (stage: Stage, deckProps: DeckProps) => void;
    onPresent?: () => void;
    onAxisClick?: (e: TouchEvent | MouseEvent | PointerEvent, serch: SearchExpressionGroup<SearchExpression>) => void;
    onLegendRowClick?: (e: TouchEvent | MouseEvent | PointerEvent, legendRow: LegendRowWithSearch) => void;
    selectionPolygonZ: number;
}
```

**Extends**

[SpecViewOptions][InterfaceDeclaration-17]

**Properties**

| Name                 | Type                                                                                                          | Optional | Description                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------- |
| colors               | [ColorSettings][InterfaceDeclaration-24]                                                                      | false    | Custom colors of various parts of the visualization.                        |
| language             | [Language][InterfaceDeclaration-26]                                                                           | false    | Language settings for the visualization.                                    |
| lightSettings        | { [view extends [View][TypeAliasDeclaration-8]]: LightSettings }                                              | true     | Optional map of light settings for the visualization, per camera view type. |
| transitionDurations  | [TransitionDurations][InterfaceDeclaration-21]                                                                | false    | Lengths of time for a transition animation.                                 |
| onError              | (errors: string[]) => void                                                                                    | true     | Optional error handler.                                                     |
| onColorContextChange | () => void                                                                                                    | true     | Optional handler when color context changes.                                |
| onDataFilter         | (filter: Search, filteredData: object[]) => void                                                              | true     | Optional handler to be invoked when data is filtered.                       |
| onSelectionChanged   | (search?: Search, activeIndex?: number) => void                                                               | true     | Optional handler to be invoked when selection has changed.                  |
| onStage              | (stage: Stage, deckProps: DeckProps) => void                                                                  | true     | Optional handler when data is on stage.                                     |
| onPresent            | () => void                                                                                                    | true     | Optional handler when chart is presented.                                   |
| onAxisClick          | (e: TouchEvent &#124; MouseEvent &#124; PointerEvent, serch: SearchExpressionGroup<SearchExpression>) => void | true     | Optional handler when axis is clicked.                                      |
| onLegendRowClick     | (e: TouchEvent &#124; MouseEvent &#124; PointerEvent, legendRow: LegendRowWithSearch) => void                 | true     | Optional handler when legend row is clicked.                                |
| selectionPolygonZ    | number                                                                                                        | false    | Z value of selection polygons.                                              |

----------

### RenderOptions

```typescript
interface RenderOptions {
    columns?: Column[];
    columnTypes?: ColumnTypeMap;
    ordinalMap?: OrdinalMap;
    initialColorContext?: ColorContext;
    discardColorContextUpdates?: () => boolean;
}
```

**Properties**

| Name                       | Type                                    | Optional |
| -------------------------- | --------------------------------------- | -------- |
| columns                    | [Column][InterfaceDeclaration-3][]      | true     |
| columnTypes                | [ColumnTypeMap][InterfaceDeclaration-5] | true     |
| ordinalMap                 | [OrdinalMap][InterfaceDeclaration-18]   | true     |
| initialColorContext        | [ColorContext][InterfaceDeclaration-38] | true     |
| discardColorContextUpdates | () => boolean                           | true     |

----------

### ColorSettings

Custom colors of various parts of the visualization.

```typescript
interface ColorSettings extends SpecColorSettings {
    activeCube?: Color;
    hoveredCube?: Color;
    selectedCube?: Color;
    axisSelectHighlight?: Color;
    unselectedColorMethod?: ColorMethod;
}
```

**Extends**

[SpecColorSettings][InterfaceDeclaration-14]

**Properties**

| Name                  | Type                                   | Optional | Description                              |
| --------------------- | -------------------------------------- | -------- | ---------------------------------------- |
| activeCube            | Color                                  | true     | Color of the individually selected cube. |
| hoveredCube           | Color                                  | true     | Color of the cube when mouse hovered.    |
| selectedCube          | Color                                  | true     | Color of selected cubes.                 |
| axisSelectHighlight   | Color                                  | true     | Color of axis hover hotspots.            |
| unselectedColorMethod | [ColorMethod][InterfaceDeclaration-25] | true     | Method of coloring unselected cubes.     |

----------

### Headers

Labels in the sections of the chart panel.

```typescript
interface Headers {
    chart: string;
    legend: string;
    selection: string;
    details: string;
}
```

**Properties**

| Name      | Type   | Optional | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| chart     | string | false    | Label above chart controls.  |
| legend    | string | false    | Label above legend.          |
| selection | string | false    | Label above selection area.  |
| details   | string | false    | Label above details section. |

----------

### Language

Language settings.

```typescript
interface Language extends SpecLanguage {
    headers: Headers;
    bing: string;
    newColorMap: string;
    oldColorMap: string;
    deselect: string;
    exclude: string;
    isolate: string;
    legendOther: string;
    nextDetail: string;
    previousDetail: string;
    reset: string;
    selectionCount: (count: number) => string;
}
```

**Extends**

[SpecLanguage][InterfaceDeclaration-15]

**Properties**

| Name           | Type                               | Optional | Description                                   |
| -------------- | ---------------------------------- | -------- | --------------------------------------------- |
| headers        | [Headers][InterfaceDeclaration-27] | false    | Labels in the sections of the chart panel.    |
| bing           | string                             | false    | Text to use for "search with Bing".           |
| newColorMap    | string                             | false    | Button text to re-map color.                  |
| oldColorMap    | string                             | false    | Button text to keep same color.               |
| deselect       | string                             | false    | Button text to deselect.                      |
| exclude        | string                             | false    | Button text to filter out selected items.     |
| isolate        | string                             | false    | Button text to keep only selected items.      |
| legendOther    | string                             | false    | Text for aggregated legend rows past maximum. |
| nextDetail     | string                             | false    | Button text for next item.                    |
| previousDetail | string                             | false    | Button text for previous item.                |
| reset          | string                             | false    | Button text to remove all filters.            |
| selectionCount | (count: number) => string          | false    | Label preceding number of items in selection. |

----------

### ColorScheme

Custom Vega color scheme.

```typescript
interface ColorScheme {
    scheme: string;
    colors: string[];
}
```

**Properties**

| Name   | Type     | Optional | Description               |
| ------ | -------- | -------- | ------------------------- |
| scheme | string   | false    | Name of the color scheme. |
| colors | string[] | false    | Array of CSS colors.      |

----------

### ColorMappedItem

```typescript
interface ColorMappedItem {
    color?: Color;
    unSelected?: boolean;
}
```

**Properties**

| Name       | Type    | Optional |
| ---------- | ------- | -------- |
| color      | Color   | true     |
| unSelected | boolean | true     |

----------

### ColorMap

Map of ordinal to color.

```typescript
interface ColorMap {
    [ordinal: number]: ColorMappedItem;
}
```
#### Index

```typescript
[ordinal: number]: ColorMappedItem;
```

* *Parameter* `ordinal` - number
* *Type* [ColorMappedItem][InterfaceDeclaration-40]


----------

### ColorContext

ColorMap plus an HTMLElement legend containing color.

```typescript
interface ColorContext {
    colorMap: ColorMap;
    legendElement: HTMLElement;
    legend: Legend;
}
```

**Properties**

| Name          | Type                                | Optional |
| ------------- | ----------------------------------- | -------- |
| colorMap      | [ColorMap][InterfaceDeclaration-39] | false    |
| legendElement | HTMLElement                         | false    |
| legend        | [Legend][InterfaceDeclaration-30]   | false    |

----------

### ColorMethod

```typescript
interface ColorMethod {
    (color: Color): Color;
}
```
#### Call

```typescript
(color: Color): Color;
```

**Parameters**

| Name  | Type  |
| ----- | ----- |
| color | Color |

**Return type**

Color


----------

### LegendRowWithSearch

```typescript
interface LegendRowWithSearch extends LegendRow {
    search: SearchExpressionGroup<SearchExpression>;
}
```

**Extends**

[LegendRow][InterfaceDeclaration-31]

**Properties**

| Name   | Type                                                                                        | Optional |
| ------ | ------------------------------------------------------------------------------------------- | -------- |
| search | [SearchExpressionGroup][InterfaceDeclaration-2]<[SearchExpression][InterfaceDeclaration-1]> | false    |

----------

### SelectionState

```typescript
interface SelectionState {
    search?: Search;
    selectedData?: object[];
    active?: object;
}
```

**Properties**

| Name         | Type                             | Optional |
| ------------ | -------------------------------- | -------- |
| search       | [Search][TypeAliasDeclaration-0] | true     |
| selectedData | object[]                         | true     |
| active       | object                           | true     |

## Types

### SearchExpressionClause

```typescript
type SearchExpressionClause = "&&" | "||";
```

**Type**

"&&" | "||"

----------

### SearchExpressionStringSearchOperators

```typescript
type SearchExpressionStringSearchOperators = "starts" | "contains";
```

**Type**

"starts" | "contains"

----------

### SearchExpressionOperators

```typescript
type SearchExpressionOperators = "==" | "!=" | "<" | "<=" | ">" | ">=" | "isnullorEmpty" | SearchExpressionStringSearchOperators;
```

**Type**

"==" | "!=" | "<" | "<=" | ">" | ">=" | "isnullorEmpty" | [SearchExpressionStringSearchOperators][TypeAliasDeclaration-3]

----------

### SearchExpressionGroupLogic

```typescript
type SearchExpressionGroupLogic = "!";
```

**Type**

"!"

----------

### Search

```typescript
type Search = SearchExpression | SearchExpressionGroup<SearchExpression> | SearchExpressionGroup<SearchExpression>[];
```

**Type**

[SearchExpression][InterfaceDeclaration-1] | [SearchExpressionGroup][InterfaceDeclaration-2]<[SearchExpression][InterfaceDeclaration-1]> | [SearchExpressionGroup][InterfaceDeclaration-2]<[SearchExpression][InterfaceDeclaration-1]>[]

----------

### AxisSelectionType

Type of selection scope on an axis.

```typescript
type AxisSelectionType = "exact" | "range";
```

**Type**

"exact" | "range"

----------

### Chart

Types of SandDance visualizations.

```typescript
type Chart = "scatterplot" | "barchart" | "treemap" | "stacks";
```

**Type**

"scatterplot" | "barchart" | "treemap" | "stacks"

----------

### ColorBin

```typescript
type ColorBin = "continuous" | "quantize" | "quantile";
```

**Type**

"continuous" | "quantize" | "quantile"

----------

### InsightColumnRoles

```typescript
type InsightColumnRoles = "uid" | "x" | "y" | "z" | "group" | "size" | "color" | "facet" | "sort";
```

**Type**

"uid" | "x" | "y" | "z" | "group" | "size" | "color" | "facet" | "sort"

[NamespaceImport-2]: types#types
[InterfaceDeclaration-1]: types#searchexpression
[TypeAliasDeclaration-1]: types#searchexpressionclause
[TypeAliasDeclaration-2]: types#searchexpressionoperators
[InterfaceDeclaration-2]: types#searchexpressiongroup
[InterfaceDeclaration-1]: types#searchexpression
[InterfaceDeclaration-1]: types#searchexpression
[TypeAliasDeclaration-1]: types#searchexpressionclause
[InterfaceDeclaration-3]: types#column
[InterfaceDeclaration-4]: types#columnstats
[InterfaceDeclaration-4]: types#columnstats
[InterfaceDeclaration-5]: types#columntypemap
[InterfaceDeclaration-6]: types#facetmargins
[InterfaceDeclaration-7]: types#facets
[InterfaceDeclaration-8]: types#insight
[TypeAliasDeclaration-6]: types#chart
[InterfaceDeclaration-9]: types#size
[InterfaceDeclaration-10]: types#insightcolumns
[TypeAliasDeclaration-8]: vegadeckgl/types#view
[TypeAliasDeclaration-0]: types#search
[InterfaceDeclaration-7]: types#facets
[TypeAliasDeclaration-7]: types#colorbin
[InterfaceDeclaration-11]: types#signalvalues
[InterfaceDeclaration-10]: types#insightcolumns
[InterfaceDeclaration-12]: types#specrolecapabilities
[TypeAliasDeclaration-9]: types#insightcolumnroles
[TypeAliasDeclaration-5]: types#axisselectiontype
[InterfaceDeclaration-13]: types#speccapabilities
[InterfaceDeclaration-12]: types#specrolecapabilities
[InterfaceDeclaration-14]: types#speccolorsettings
[InterfaceDeclaration-15]: types#speclanguage
[InterfaceDeclaration-11]: types#signalvalues
[InterfaceDeclaration-9]: types#size
[InterfaceDeclaration-16]: types#speccolumns
[InterfaceDeclaration-3]: types#column
[InterfaceDeclaration-3]: types#column
[InterfaceDeclaration-3]: types#column
[InterfaceDeclaration-3]: types#column
[InterfaceDeclaration-3]: types#column
[InterfaceDeclaration-3]: types#column
[InterfaceDeclaration-3]: types#column
[InterfaceDeclaration-3]: types#column
[InterfaceDeclaration-3]: types#column
[InterfaceDeclaration-17]: types#specviewoptions
[InterfaceDeclaration-14]: types#speccolorsettings
[InterfaceDeclaration-15]: types#speclanguage
[InterfaceDeclaration-6]: types#facetmargins
[InterfaceDeclaration-18]: types#ordinalmap
[InterfaceDeclaration-19]: types#renderresult
[InterfaceDeclaration-18]: types#ordinalmap
[InterfaceDeclaration-21]: types#transitiondurations
[InterfaceDeclaration-22]: vegadeckgl/types#transitiondurations
[InterfaceDeclaration-23]: types#vieweroptions
[InterfaceDeclaration-17]: types#specviewoptions
[InterfaceDeclaration-24]: types#colorsettings
[InterfaceDeclaration-26]: types#language
[TypeAliasDeclaration-8]: vegadeckgl/types#view
[InterfaceDeclaration-21]: types#transitiondurations
[InterfaceDeclaration-37]: types#renderoptions
[InterfaceDeclaration-3]: types#column
[InterfaceDeclaration-5]: types#columntypemap
[InterfaceDeclaration-18]: types#ordinalmap
[InterfaceDeclaration-38]: types#colorcontext
[InterfaceDeclaration-24]: types#colorsettings
[InterfaceDeclaration-14]: types#speccolorsettings
[InterfaceDeclaration-25]: types#colormethod
[InterfaceDeclaration-27]: types#headers
[InterfaceDeclaration-26]: types#language
[InterfaceDeclaration-15]: types#speclanguage
[InterfaceDeclaration-27]: types#headers
[InterfaceDeclaration-0]: types#colorscheme
[InterfaceDeclaration-40]: types#colormappeditem
[InterfaceDeclaration-39]: types#colormap
[InterfaceDeclaration-40]: types#colormappeditem
[InterfaceDeclaration-38]: types#colorcontext
[InterfaceDeclaration-39]: types#colormap
[InterfaceDeclaration-30]: vegadeckgl/types#legend
[InterfaceDeclaration-25]: types#colormethod
[InterfaceDeclaration-36]: types#legendrowwithsearch
[InterfaceDeclaration-31]: vegadeckgl/types#legendrow
[InterfaceDeclaration-1]: types#searchexpression
[InterfaceDeclaration-2]: types#searchexpressiongroup
[InterfaceDeclaration-41]: types#selectionstate
[TypeAliasDeclaration-0]: types#search
[TypeAliasDeclaration-1]: types#searchexpressionclause
[TypeAliasDeclaration-3]: types#searchexpressionstringsearchoperators
[TypeAliasDeclaration-2]: types#searchexpressionoperators
[TypeAliasDeclaration-3]: types#searchexpressionstringsearchoperators
[TypeAliasDeclaration-4]: types#searchexpressiongrouplogic
[TypeAliasDeclaration-0]: types#search
[InterfaceDeclaration-1]: types#searchexpression
[InterfaceDeclaration-1]: types#searchexpression
[InterfaceDeclaration-2]: types#searchexpressiongroup
[InterfaceDeclaration-1]: types#searchexpression
[InterfaceDeclaration-2]: types#searchexpressiongroup
[TypeAliasDeclaration-5]: types#axisselectiontype
[TypeAliasDeclaration-6]: types#chart
[TypeAliasDeclaration-7]: types#colorbin
[TypeAliasDeclaration-9]: types#insightcolumnroles