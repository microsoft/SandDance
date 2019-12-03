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

| Name    | Type                                              | Description                           |
| ------- | ------------------------------------------------- | ------------------------------------- |
| element | HTMLElement                                       | Parent HTMLElement to present within. |
| options | Partial<[ViewerOptions][InterfaceDeclaration-23]> | Optional viewer options object.       |

## Methods

### renderSameLayout(newViewerOptions)

Render the same layout with new options.

```typescript
public renderSameLayout(newViewerOptions?: Partial<ViewerOptions>): void;
```

**Parameters**

| Name             | Type                                              | Description         |
| ---------------- | ------------------------------------------------- | ------------------- |
| newViewerOptions | Partial<[ViewerOptions][InterfaceDeclaration-23]> | New options object. |

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
| insight | [Insight][InterfaceDeclaration-8]        |               | Object to create a visualization specification. |
| data    | object[]                                 |               | Array of data objects.                          |
| options | [RenderOptions][InterfaceDeclaration-30] | {}            |                                                 |

**Return type**

Promise<[RenderResult][InterfaceDeclaration-20]>

----------

### filter(search)

Filter the data and animate.

```typescript
public filter(search: Search): Promise<void>;
```

**Parameters**

| Name   | Type                             | Description                                                          |
| ------ | -------------------------------- | -------------------------------------------------------------------- |
| search | [Search][TypeAliasDeclaration-4] | Filter expression, see https://vega.github.io/vega/docs/expressions/ |

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

| Name   | Type                             | Description                                                          |
| ------ | -------------------------------- | -------------------------------------------------------------------- |
| search | [Search][TypeAliasDeclaration-4] | Filter expression, see https://vega.github.io/vega/docs/expressions/ |

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

[SelectionState][InterfaceDeclaration-34]

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

[Insight][InterfaceDeclaration-8]

----------

### getColumnStats(column)

Gets column stats from current data (filtered or all).

```typescript
public getColumnStats(column: Column): ColumnStats;
```

**Parameters**

| Name   | Type                             | Description              |
| ------ | -------------------------------- | ------------------------ |
| column | [Column][InterfaceDeclaration-3] | Column to get stats for. |

**Return type**

[ColumnStats][InterfaceDeclaration-4]

----------

### getSignalValues()

Gets current signal values.

```typescript
public getSignalValues(): SignalValues;
```

**Return type**

[SignalValues][InterfaceDeclaration-11]

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

[ViewerOptions][InterfaceDeclaration-23]

----------

### specCapabilities

Behavior specified by the visualization type.

```typescript
public specCapabilities: SpecCapabilities;
```

**Type**

[SpecCapabilities][InterfaceDeclaration-13]

----------

### options

Viewer options object.

```typescript
public options: ViewerOptions;
```

**Type**

[ViewerOptions][InterfaceDeclaration-23]

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

[Insight][InterfaceDeclaration-8]

----------

### colorContexts

Color contexts. There is only one color context until data is filtered, after which colors may be re-mapped in another color context.

```typescript
public colorContexts: ColorContext[];
```

**Type**

[ColorContext][InterfaceDeclaration-31][]

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
[InterfaceDeclaration-23]: types.html#vieweroptions
[MethodDeclaration-0]: viewer.html#rendersamelayoutnewvieweroptions
[InterfaceDeclaration-23]: types.html#vieweroptions
[MethodDeclaration-1]: viewer.html#renderinsight-data-options
[InterfaceDeclaration-8]: types.html#insight
[InterfaceDeclaration-30]: types.html#renderoptions
[InterfaceDeclaration-20]: types.html#renderresult
[MethodDeclaration-2]: viewer.html#filtersearch
[TypeAliasDeclaration-4]: types.html#search
[MethodDeclaration-3]: viewer.html#reset
[MethodDeclaration-4]: viewer.html#selectsearch
[TypeAliasDeclaration-4]: types.html#search
[MethodDeclaration-5]: viewer.html#deselect
[MethodDeclaration-6]: viewer.html#getselection
[InterfaceDeclaration-34]: types.html#selectionstate
[MethodDeclaration-7]: viewer.html#activatedatum
[MethodDeclaration-8]: viewer.html#deactivate
[MethodDeclaration-9]: viewer.html#getinsight
[InterfaceDeclaration-8]: types.html#insight
[MethodDeclaration-10]: viewer.html#getcolumnstatscolumn
[InterfaceDeclaration-3]: types.html#column
[InterfaceDeclaration-4]: types.html#columnstats
[MethodDeclaration-11]: viewer.html#getsignalvalues
[InterfaceDeclaration-11]: types.html#signalvalues
[MethodDeclaration-12]: viewer.html#finalize
[PropertyDeclaration-0]: viewer.html#defaultvieweroptions
[InterfaceDeclaration-23]: types.html#vieweroptions
[PropertyDeclaration-1]: viewer.html#speccapabilities
[InterfaceDeclaration-13]: types.html#speccapabilities
[PropertyDeclaration-2]: viewer.html#options
[InterfaceDeclaration-23]: types.html#vieweroptions
[PropertyDeclaration-3]: viewer.html#vegaspec
[PropertyDeclaration-4]: viewer.html#vegaviewgl
[PropertyDeclaration-5]: viewer.html#presenter
[PropertyDeclaration-6]: viewer.html#insight
[InterfaceDeclaration-8]: types.html#insight
[PropertyDeclaration-7]: viewer.html#colorcontexts
[InterfaceDeclaration-31]: types.html#colorcontext
[PropertyDeclaration-8]: viewer.html#currentcolorcontext