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
public render(insight: Insight, data: object[], options: RenderOptions = {}): Promise<RenderResult>;
```

**Parameters**

| Name    | Type                                     | Default value | Description                                     |
| ------- | ---------------------------------------- | ------------- | ----------------------------------------------- |
| insight | [Insight][InterfaceDeclaration-8]        |               | Object to create a visualization specification. |
| data    | object[]                                 |               | Array of data objects.                          |
| options | [RenderOptions][InterfaceDeclaration-37] | {}            |                                                 |

**Return type**

Promise<[RenderResult][InterfaceDeclaration-19]>

----------

### filter(search)

Filter the data and animate.

```typescript
public filter(search: Search): Promise<void>;
```

**Parameters**

| Name   | Type                             | Description                                                          |
| ------ | -------------------------------- | -------------------------------------------------------------------- |
| search | [Search][TypeAliasDeclaration-0] | Filter expression, see https://vega.github.io/vega/docs/expressions/ |

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
| search | [Search][TypeAliasDeclaration-0] | Filter expression, see https://vega.github.io/vega/docs/expressions/ |

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

[SelectionState][InterfaceDeclaration-41]

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

### getSignalValues()

Gets current signal values.

```typescript
public getSignalValues(): SignalValues;
```

**Return type**

[SignalValues][InterfaceDeclaration-11]

## Properties

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

[Presenter][ClassDeclaration-0]

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

[ColorContext][InterfaceDeclaration-38][]

----------

### currentColorContext

Index of current color context. Change this and then call renderSameLayout().

```typescript
public currentColorContext: number;
```

**Type**

number

[ClassDeclaration-5]: viewer#viewer
[Constructor-2]: viewer#constructorelement-options
[InterfaceDeclaration-23]: types#vieweroptions
[MethodDeclaration-9]: viewer#rendersamelayoutnewvieweroptions
[InterfaceDeclaration-23]: types#vieweroptions
[MethodDeclaration-10]: viewer#renderinsight-data-options
[InterfaceDeclaration-8]: types#insight
[InterfaceDeclaration-37]: types#renderoptions
[InterfaceDeclaration-19]: types#renderresult
[MethodDeclaration-11]: viewer#filtersearch
[TypeAliasDeclaration-0]: types#search
[MethodDeclaration-12]: viewer#reset
[MethodDeclaration-13]: viewer#selectsearch
[TypeAliasDeclaration-0]: types#search
[MethodDeclaration-14]: viewer#deselect
[MethodDeclaration-15]: viewer#getselection
[InterfaceDeclaration-41]: types#selectionstate
[MethodDeclaration-16]: viewer#activatedatum
[MethodDeclaration-17]: viewer#deactivate
[MethodDeclaration-18]: viewer#getinsight
[InterfaceDeclaration-8]: types#insight
[MethodDeclaration-19]: viewer#getsignalvalues
[InterfaceDeclaration-11]: types#signalvalues
[PropertyDeclaration-16]: viewer#speccapabilities
[InterfaceDeclaration-13]: types#speccapabilities
[PropertyDeclaration-17]: viewer#options
[InterfaceDeclaration-23]: types#vieweroptions
[PropertyDeclaration-18]: viewer#vegaspec
[PropertyDeclaration-19]: viewer#vegaviewgl
[PropertyDeclaration-20]: viewer#presenter
[ClassDeclaration-0]: vegadeckgl/presenter#presenter
[PropertyDeclaration-21]: viewer#insight
[InterfaceDeclaration-8]: types#insight
[PropertyDeclaration-22]: viewer#colorcontexts
[InterfaceDeclaration-38]: types#colorcontext
[PropertyDeclaration-23]: viewer#currentcolorcontext