---
layout: api
---

# sanddance .types

## Interfaces

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

| Name       | Type                                 | Optional | Description                                 |
| ---------- | ------------------------------------ | -------- | ------------------------------------------- |
| specResult | SpecResult                           | false    | Specification result object.                |
| ordinalMap | [OrdinalMap][InterfaceDeclaration-1] | false    | Map of cube ordinals assigned by unique id. |

----------

### TransitionDurations

Lengths of time for a transition animation.

```typescript
interface TransitionDurations extends TransitionDurations {
    scope: number;
}
```

**Extends**

TransitionDurations

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
    fontFamily?: string;
    language: Language;
    tooltipOptions?: TooltipOptions;
    transitionDurations: TransitionDurations;
    onError?: (errors: string[]) => void;
    onColorContextChange?: () => void;
    onDataFilter?: (filter: Search, filteredData: object[]) => void;
    onSelectionChanged?: (search: Search, activeIndex?: number, selectedData?: object[]) => void;
    onStage?: (stage: Stage, deckProps: Partial<DeckProps>) => void;
    onPresent?: () => void;
    onBeforeCreateLayers?: (stage: Stage, specCapabilities: SpecCapabilities) => void;
    getTextColor?: (t: VegaTextLayerDatum) => RGBAColor<number, number, number, number>;
    getTextHighlightColor?: (t: VegaTextLayerDatum) => RGBAColor<number, number, number, number>;
    onTextClick?: (e: MouseEvent | PointerEvent | TouchEvent, o: VegaTextLayerDatum) => void;
    onAxisClick?: (e: TouchEvent | MouseEvent | PointerEvent, serch: SearchExpressionGroup<SearchExpression>) => void;
    onLegendHeaderClick?: (e: TouchEvent | MouseEvent | PointerEvent) => void;
    onLegendRowClick?: (e: TouchEvent | MouseEvent | PointerEvent, legendRow: LegendRowWithSearch) => void;
    onVegaSpec?: (vegaSpec: Spec) => void;
    onNewViewStateTarget?: () => boolean;
    preserveDrawingBuffer?: boolean;
    selectionPolygonZ: number;
}
```

**Extends**

SpecViewOptions

**Properties**

| Name                  | Type                                                                                                          | Optional | Description                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------- |
| colors                | [ColorSettings][InterfaceDeclaration-5]                                                                       | false    | Custom colors of various parts of the visualization.                      |
| fontFamily            | string                                                                                                        | true     | Font family of text elements.                                             |
| language              | [Language][InterfaceDeclaration-7]                                                                            | false    | Language settings for the visualization.                                  |
| tooltipOptions        | [TooltipOptions][InterfaceDeclaration-9]                                                                      | true     | Tooltip options                                                           |
| transitionDurations   | [TransitionDurations][InterfaceDeclaration-3]                                                                 | false    | Lengths of time for a transition animation.                               |
| onError               | (errors: string[]) => void                                                                                    | true     | Optional error handler.                                                   |
| onColorContextChange  | () => void                                                                                                    | true     | Optional handler when color context changes.                              |
| onDataFilter          | (filter: Search, filteredData: object[]) => void                                                              | true     | Optional handler to be invoked when data is filtered.                     |
| onSelectionChanged    | (search: Search, activeIndex?: number, selectedData?: object[]) => void                                       | true     | Optional handler to be invoked when selection has changed.                |
| onStage               | (stage: Stage, deckProps: Partial<DeckProps>) => void                                                         | true     | Optional handler when data is on stage.                                   |
| onPresent             | () => void                                                                                                    | true     | Optional handler when chart is presented.                                 |
| onBeforeCreateLayers  | (stage: Stage, specCapabilities: SpecCapabilities) => void                                                    | true     | Optional handler to modify the stage prior to deck.gl layer construction. |
| getTextColor          | (t: VegaTextLayerDatum) => RGBAColor<number, number, number, number>                                          | true     | Optional handler to get the color of text elements.                       |
| getTextHighlightColor | (t: VegaTextLayerDatum) => RGBAColor<number, number, number, number>                                          | true     | Optional handler to get the highlight color of text elements.             |
| onTextClick           | (e: MouseEvent &#124; PointerEvent &#124; TouchEvent, o: VegaTextLayerDatum) => void                          | true     | Optional click handler for text elements.                                 |
| onAxisClick           | (e: TouchEvent &#124; MouseEvent &#124; PointerEvent, serch: SearchExpressionGroup<SearchExpression>) => void | true     | Optional handler when axis is clicked.                                    |
| onLegendHeaderClick   | (e: TouchEvent &#124; MouseEvent &#124; PointerEvent) => void                                                 | true     | Optional handler when legend header is clicked.                           |
| onLegendRowClick      | (e: TouchEvent &#124; MouseEvent &#124; PointerEvent, legendRow: LegendRowWithSearch) => void                 | true     | Optional handler when legend row is clicked.                              |
| onVegaSpec            | (vegaSpec: Spec) => void                                                                                    | true     | Optional handler when Vega spec is created, prior to it being rendered.   |
| onNewViewStateTarget  | () => boolean                                                                                                 | true     | Optional handler to reset the camera after chart is rendered.             |
| preserveDrawingBuffer | boolean                                                                                                       | true     | Optional flag to preserve the WebGL canvas.                               |
| selectionPolygonZ     | number                                                                                                        | false    | Z value of selection polygons.                                            |

----------

### RenderOptions

```typescript
interface RenderOptions {
    rebaseFilter?: () => boolean;
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
| rebaseFilter               | () => boolean                           | true     |
| columns                    | Column[]                                | true     |
| columnTypes                | ColumnTypeMap                           | true     |
| ordinalMap                 | [OrdinalMap][InterfaceDeclaration-1]    | true     |
| initialColorContext        | [ColorContext][InterfaceDeclaration-12] | true     |
| discardColorContextUpdates | () => boolean                           | true     |

----------

### ColorSettings

Custom colors of various parts of the visualization.

```typescript
interface ColorSettings extends SpecColorSettings {
    activeCube?: string;
    hoveredCube?: string;
    selectedCube?: string;
    axisSelectHighlight?: string;
    unselectedColorMethod?: ColorMethod;
}
```

**Extends**

SpecColorSettings

**Properties**

| Name                  | Type                                  | Optional | Description                              |
| --------------------- | ------------------------------------- | -------- | ---------------------------------------- |
| activeCube            | string                                | true     | Color of the individually selected cube. |
| hoveredCube           | string                                | true     | Color of the cube when mouse hovered.    |
| selectedCube          | string                                | true     | Color of selected cubes.                 |
| axisSelectHighlight   | string                                | true     | Color of axis hover hotspots.            |
| unselectedColorMethod | [ColorMethod][InterfaceDeclaration-6] | true     | Method of coloring unselected cubes.     |

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

SpecLanguage

**Properties**

| Name           | Type                              | Optional | Description                                   |
| -------------- | --------------------------------- | -------- | --------------------------------------------- |
| headers        | [Headers][InterfaceDeclaration-8] | false    | Labels in the sections of the chart panel.    |
| bing           | string                            | false    | Text to use for "search with Bing".           |
| newColorMap    | string                            | false    | Button text to re-map color.                  |
| oldColorMap    | string                            | false    | Button text to keep same color.               |
| deselect       | string                            | false    | Button text to deselect.                      |
| exclude        | string                            | false    | Button text to filter out selected items.     |
| isolate        | string                            | false    | Button text to keep only selected items.      |
| legendOther    | string                            | false    | Text for aggregated legend rows past maximum. |
| nextDetail     | string                            | false    | Button text for next item.                    |
| previousDetail | string                            | false    | Button text for previous item.                |
| reset          | string                            | false    | Button text to remove all filters.            |
| selectionCount | (count: number) => string         | false    | Label preceding number of items in selection. |

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
    color?: RGBAColor<number, number, number, number>;
    unSelected?: boolean;
}
```

**Properties**

| Name       | Type                                      | Optional |
| ---------- | ----------------------------------------- | -------- |
| color      | RGBAColor<number, number, number, number> | true     |
| unSelected | boolean                                   | true     |

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
* *Type* [ColorMappedItem][InterfaceDeclaration-14]


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
| colorMap      | [ColorMap][InterfaceDeclaration-13] | false    |
| legendElement | HTMLElement                         | false    |
| legend        | Legend                              | false    |

----------

### ColorMethod

```typescript
interface ColorMethod {
    (color: RGBAColor<number, number, number, number>): RGBAColor<number, number, number, number>;
}
```
#### Call

```typescript
(color: RGBAColor<number, number, number, number>): RGBAColor<number, number, number, number>;
```

**Parameters**

| Name  | Type                                      |
| ----- | ----------------------------------------- |
| color | RGBAColor<number, number, number, number> |

**Return type**

RGBAColor<number, number, number, number>


----------

### LegendRowWithSearch

```typescript
interface LegendRowWithSearch extends LegendRow {
    search: SearchExpressionGroup<SearchExpression>;
}
```

**Extends**

LegendRow

**Properties**

| Name   | Type                                    | Optional |
| ------ | --------------------------------------- | -------- |
| search | SearchExpressionGroup<SearchExpression> | false    |

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

| Name         | Type     | Optional |
| ------------ | -------- | -------- |
| search       | Search   | true     |
| selectedData | object[] | true     |
| active       | object   | true     |

----------

### TooltipOptions

```typescript
interface TooltipOptions {
    exclude?: (columnName: string) => boolean;
    displayValue?: (value: any) => string;
}
```

**Properties**

| Name         | Type                            | Optional |
| ------------ | ------------------------------- | -------- |
| exclude      | (columnName: string) => boolean | true     |
| displayValue | (value: any) => string          | true     |

----------

### Snapshot

Saved metadata about an Insight.

```typescript
interface Snapshot {
    title?: string;
    description?: string;
    insight?: Insight;
    image?: string;
    bgColor?: string;
}
```

**Properties**

| Name        | Type    | Optional |
| ----------- | ------- | -------- |
| title       | string  | true     |
| description | string  | true     |
| insight     | Insight | true     |
| image       | string  | true     |
| bgColor     | string  | true     |

[NamespaceImport-3]: types.html#types
[InterfaceDeclaration-1]: types.html#ordinalmap
[InterfaceDeclaration-2]: types.html#renderresult
[InterfaceDeclaration-1]: types.html#ordinalmap
[InterfaceDeclaration-3]: types.html#transitiondurations
[InterfaceDeclaration-4]: types.html#vieweroptions
[InterfaceDeclaration-5]: types.html#colorsettings
[InterfaceDeclaration-7]: types.html#language
[InterfaceDeclaration-9]: types.html#tooltipoptions
[InterfaceDeclaration-3]: types.html#transitiondurations
[InterfaceDeclaration-11]: types.html#renderoptions
[InterfaceDeclaration-1]: types.html#ordinalmap
[InterfaceDeclaration-12]: types.html#colorcontext
[InterfaceDeclaration-5]: types.html#colorsettings
[InterfaceDeclaration-6]: types.html#colormethod
[InterfaceDeclaration-8]: types.html#headers
[InterfaceDeclaration-7]: types.html#language
[InterfaceDeclaration-8]: types.html#headers
[InterfaceDeclaration-0]: types.html#colorscheme
[InterfaceDeclaration-14]: types.html#colormappeditem
[InterfaceDeclaration-13]: types.html#colormap
[InterfaceDeclaration-14]: types.html#colormappeditem
[InterfaceDeclaration-12]: types.html#colorcontext
[InterfaceDeclaration-13]: types.html#colormap
[InterfaceDeclaration-6]: types.html#colormethod
[InterfaceDeclaration-10]: types.html#legendrowwithsearch
[InterfaceDeclaration-15]: types.html#selectionstate
[InterfaceDeclaration-9]: types.html#tooltipoptions
[InterfaceDeclaration-16]: types.html#snapshot