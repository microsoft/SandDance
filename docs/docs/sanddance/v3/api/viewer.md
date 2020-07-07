---
layout: api
---

# sanddance .Viewer

Component to view a SandDance data visualization.

```typescript
class Viewer
```
## Constructor

### constructor(element, options)

Instantiate a new Viewer.

```typescript
public constructor(element: HTMLElement, options?: Partial<ViewerOptions>);
```

**Parameters**

| Name    | Type                                             | Description                           |
| ------- | ------------------------------------------------ | ------------------------------------- |
| element | HTMLElement                                      | Parent HTMLElement to present within. |
| options | Partial<[ViewerOptions][InterfaceDeclaration-4]> | Optional viewer options object.       |

## Methods

### renderSameLayout(newViewerOptions)

Render the same layout with new options.

```typescript
public renderSameLayout(newViewerOptions?: Partial<ViewerOptions>): void;
```

**Parameters**

| Name             | Type                                             | Description         |
| ---------------- | ------------------------------------------------ | ------------------- |
| newViewerOptions | Partial<[ViewerOptions][InterfaceDeclaration-4]> | New options object. |

**Return type**

void

----------

### render(insight, data, options)

Render data into a visualization.

```typescript
public async render(insight: Insight, data: object[], options: RenderOptions = {}): Promise<RenderResult>;
```

**Parameters**

| Name    | Type                                     | Default value | Description                                     |
| ------- | ---------------------------------------- | ------------- | ----------------------------------------------- |
| insight | Insight                                  |               | Object to create a visualization specification. |
| data    | object[]                                 |               | Array of data objects.                          |
| options | [RenderOptions][InterfaceDeclaration-11] | {}            |                                                 |

**Return type**

Promise<[RenderResult][InterfaceDeclaration-2]>

----------

### filter(search, rebase)

Filter the data and animate.

```typescript
public filter(search: Search, rebase: boolean = false): Promise<void>;
```

**Parameters**

| Name   | Type    | Default value | Description                                                                                             |
| ------ | ------- | ------------- | ------------------------------------------------------------------------------------------------------- |
| search | Search  |               | Filter expression, see https://vega.github.io/vega/docs/expressions/                                    |
| rebase | boolean | false         | Optional flag to apply to entire dataset. A false value will apply the filter upon any existing filter. |

**Return type**

Promise<void>

----------

### reset()

Remove any filtration and animate.

```typescript
public reset(): Promise<void>;
```

**Return type**

Promise<void>

----------

### select(search)

Select cubes by a filter expression.

```typescript
public select(search: Search): Promise<void>;
```

**Parameters**

| Name   | Type   | Description                                                          |
| ------ | ------ | -------------------------------------------------------------------- |
| search | Search | Filter expression, see https://vega.github.io/vega/docs/expressions/ |

**Return type**

Promise<void>

----------

### deselect()

Removes any selection.

```typescript
public deselect(): Promise<void>;
```

**Return type**

Promise<void>

----------

### getSelection()

Gets the current selection.

```typescript
public getSelection(): SelectionState;
```

**Return type**

[SelectionState][InterfaceDeclaration-15]

----------

### activate(datum)

Set one data row to the active state.

```typescript
public activate(datum: object): Promise<void>;
```

**Parameters**

| Name  | Type   |
| ----- | ------ |
| datum | object |

**Return type**

Promise<void>

----------

### deActivate()

Deactivate item.

```typescript
public deActivate(): Promise<void>;
```

**Return type**

Promise<void>

----------

### getInsight()

Gets the current insight with signal values.

```typescript
public getInsight(): Insight;
```

**Return type**

Insight

----------

### getColumnStats(column)

Gets column stats from current data (filtered or all).

```typescript
public getColumnStats(column: Column): ColumnStats;
```

**Parameters**

| Name   | Type   | Description              |
| ------ | ------ | ------------------------ |
| column | Column | Column to get stats for. |

**Return type**

ColumnStats

----------

### getSignalValues()

Gets current signal values.

```typescript
public getSignalValues(): SignalValues;
```

**Return type**

SignalValues

----------

### finalize()

```typescript
public finalize(): void;
```

**Return type**

void

## Properties

### defaultViewerOptions

Default Viewer options.

```typescript
public static defaultViewerOptions: ViewerOptions;
```

**Type**

[ViewerOptions][InterfaceDeclaration-4]

----------

### specCapabilities

Behavior specified by the visualization type.

```typescript
public specCapabilities: SpecCapabilities;
```

**Type**

SpecCapabilities

----------

### options

Viewer options object.

```typescript
public options: ViewerOptions;
```

**Type**

[ViewerOptions][InterfaceDeclaration-4]

----------

### vegaSpec

Vega specification.

```typescript
public vegaSpec: Spec;
```

**Type**

Spec

----------

### vegaViewGl

Vega View instance.

```typescript
public vegaViewGl: ViewGl_Class;
```

**Type**

ViewGl_Class

----------

### presenter

Presenter which does the rendering.

```typescript
public presenter: Presenter;
```

**Type**

Presenter

----------

### insight

Insight object from current rendering.

```typescript
public insight: Insight;
```

**Type**

Insight

----------

### colorContexts

Color contexts. There is only one color context until data is filtered, after which colors may be re-mapped in another color context.

```typescript
public colorContexts: ColorContext[];
```

**Type**

[ColorContext][InterfaceDeclaration-12][]

----------

### currentColorContext

Index of current color context. Change this and then call renderSameLayout().

```typescript
public currentColorContext: number;
```

**Type**

number

[ClassDeclaration-0]: viewer.html#viewer
[Constructor-0]: viewer.html#constructorelement-options
[InterfaceDeclaration-4]: types.html#vieweroptions
[MethodDeclaration-0]: viewer.html#rendersamelayoutnewvieweroptions
[InterfaceDeclaration-4]: types.html#vieweroptions
[MethodDeclaration-1]: viewer.html#renderinsight-data-options
[InterfaceDeclaration-11]: types.html#renderoptions
[InterfaceDeclaration-2]: types.html#renderresult
[MethodDeclaration-2]: viewer.html#filtersearch-rebase
[MethodDeclaration-3]: viewer.html#reset
[MethodDeclaration-4]: viewer.html#selectsearch
[MethodDeclaration-5]: viewer.html#deselect
[MethodDeclaration-6]: viewer.html#getselection
[InterfaceDeclaration-15]: types.html#selectionstate
[MethodDeclaration-7]: viewer.html#activatedatum
[MethodDeclaration-8]: viewer.html#deactivate
[MethodDeclaration-9]: viewer.html#getinsight
[MethodDeclaration-10]: viewer.html#getcolumnstatscolumn
[MethodDeclaration-11]: viewer.html#getsignalvalues
[MethodDeclaration-12]: viewer.html#finalize
[PropertyDeclaration-0]: viewer.html#defaultvieweroptions
[InterfaceDeclaration-4]: types.html#vieweroptions
[PropertyDeclaration-1]: viewer.html#speccapabilities
[PropertyDeclaration-2]: viewer.html#options
[InterfaceDeclaration-4]: types.html#vieweroptions
[PropertyDeclaration-3]: viewer.html#vegaspec
[PropertyDeclaration-4]: viewer.html#vegaviewgl
[PropertyDeclaration-5]: viewer.html#presenter
[PropertyDeclaration-6]: viewer.html#insight
[PropertyDeclaration-7]: viewer.html#colorcontexts
[InterfaceDeclaration-12]: types.html#colorcontext
[PropertyDeclaration-8]: viewer.html#currentcolorcontext