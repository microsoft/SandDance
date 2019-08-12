---
layout: api
---

# sanddance-explorer .Explorer

```typescript
class Explorer
```
## Constructor

### constructor(props)

```typescript
public constructor(props: Props);
```

**Parameters**

| Name  | Type                            |
| ----- | ------------------------------- |
| props | [Props][InterfaceDeclaration-6] |

## Methods

### finalize()

```typescript
public finalize(): void;
```

**Return type**

void

----------

### updateViewerOptions(viewerOptions)

```typescript
public updateViewerOptions(viewerOptions: Partial<ViewerOptions>): void;
```

**Parameters**

| Name          | Type                   |
| ------------- | ---------------------- |
| viewerOptions | Partial<ViewerOptions> |

**Return type**

void

----------

### signal(signalName, signalValue)

```typescript
public signal(signalName: string, signalValue: any): void;
```

**Parameters**

| Name        | Type   |
| ----------- | ------ |
| signalName  | string |
| signalValue | any    |

**Return type**

void

----------

### setInsight(partialInsight)

```typescript
public setInsight(partialInsight: Partial<Insight>): void;
```

**Parameters**

| Name           | Type             |
| -------------- | ---------------- |
| partialInsight | Partial<Insight> |

**Return type**

void

----------

### load(data, getPartialInsight, prefs)

```typescript
public load(data: DataFile | object[], getPartialInsight?: (columns: Column[]) => Partial<Insight>, prefs?: Prefs): Promise<void>;
```

**Parameters**

| Name              | Type                                               |
| ----------------- | -------------------------------------------------- |
| data              | [DataFile][InterfaceDeclaration-1] &#124; object[] |
| getPartialInsight | (columns: Column[]) => Partial<Insight>            |
| prefs             | [Prefs][InterfaceDeclaration-3]                    |

**Return type**

Promise<void>

----------

### changeChartType(chart)

```typescript
public changeChartType(chart: Chart): void;
```

**Parameters**

| Name  | Type  |
| ----- | ----- |
| chart | Chart |

**Return type**

void

----------

### calculate(calculating)

```typescript
public calculate(calculating: () => any): void;
```

**Parameters**

| Name        | Type      |
| ----------- | --------- |
| calculating | () => any |

**Return type**

void

----------

### changeView(view)

```typescript
public changeView(view: View): void;
```

**Parameters**

| Name | Type |
| ---- | ---- |
| view | View |

**Return type**

void

----------

### changeInsight(newState)

```typescript
public changeInsight(newState: Partial<State>): void;
```

**Parameters**

| Name     | Type                                     |
| -------- | ---------------------------------------- |
| newState | Partial<[State][InterfaceDeclaration-7]> |

**Return type**

void

----------

### changespecCapabilities(specCapabilities)

```typescript
public changespecCapabilities(specCapabilities: SpecCapabilities): void;
```

**Parameters**

| Name             | Type             |
| ---------------- | ---------------- |
| specCapabilities | SpecCapabilities |

**Return type**

void

----------

### changeColumnMapping(role, column, options)

```typescript
public changeColumnMapping(role: InsightColumnRoles, column: Column, options?: { scheme?: string; }): void;
```

**Parameters**

| Name    | Type                 |
| ------- | -------------------- |
| role    | InsightColumnRoles   |
| column  | Column               |
| options | { scheme?: string; } |

**Return type**

void

----------

### sidebar(sidebarClosed, sidebarPinned)

```typescript
public sidebar(sidebarClosed: boolean, sidebarPinned: boolean): void;
```

**Parameters**

| Name          | Type    |
| ------------- | ------- |
| sidebarClosed | boolean |
| sidebarPinned | boolean |

**Return type**

void

----------

### resize()

```typescript
public resize(): void;
```

**Return type**

void

----------

### componentDidMount()

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

```typescript
public componentDidMount(): void;
```

**Return type**

void

----------

### render()

```typescript
public render(): Element;
```

**Return type**

Element

## Properties

### viewer

```typescript
public viewer: Viewer;
```

**Type**

Viewer

----------

### viewerOptions

```typescript
public viewerOptions: Partial<ViewerOptions>;
```

**Type**

Partial<ViewerOptions>

----------

### discardColorContextUpdates

```typescript
public discardColorContextUpdates: boolean;
```

**Type**

boolean

----------

### prefs

```typescript
public prefs: Prefs;
```

**Type**

[Prefs][InterfaceDeclaration-3]

[ClassDeclaration-0]: explorer#explorer
[Constructor-0]: explorer#constructorprops
[InterfaceDeclaration-6]: ../index#props
[MethodDeclaration-0]: explorer#finalize
[MethodDeclaration-1]: explorer#updatevieweroptionsvieweroptions
[MethodDeclaration-2]: explorer#signalsignalname-signalvalue
[MethodDeclaration-3]: explorer#setinsightpartialinsight
[MethodDeclaration-4]: explorer#loaddata-getpartialinsight-prefs
[InterfaceDeclaration-1]: ../index#datafile
[InterfaceDeclaration-3]: ../index#prefs
[MethodDeclaration-5]: explorer#changecharttypechart
[MethodDeclaration-6]: explorer#calculatecalculating
[MethodDeclaration-7]: explorer#changeviewview
[MethodDeclaration-8]: explorer#changeinsightnewstate
[InterfaceDeclaration-7]: ../index#state
[MethodDeclaration-9]: explorer#changespeccapabilitiesspeccapabilities
[MethodDeclaration-10]: explorer#changecolumnmappingrole-column-options
[MethodDeclaration-11]: explorer#sidebarsidebarclosed-sidebarpinned
[MethodDeclaration-12]: explorer#resize
[MethodDeclaration-13]: explorer#componentdidmount
[MethodDeclaration-14]: explorer#render
[PropertyDeclaration-0]: explorer#viewer
[PropertyDeclaration-1]: explorer#vieweroptions
[PropertyDeclaration-2]: explorer#discardcolorcontextupdates
[PropertyDeclaration-3]: explorer#prefs
[InterfaceDeclaration-3]: ../index#prefs