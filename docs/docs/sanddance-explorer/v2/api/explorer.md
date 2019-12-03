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
| props | [Props][InterfaceDeclaration-9] |

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

### getInsight()

```typescript
public getInsight(): Insight;
```

**Return type**

Insight

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

### load(data, getPartialInsight, optionsOrPrefs)

```typescript
public load(data: DataFile | object[], getPartialInsight?: (columns: Column[]) => Partial<Insight>, optionsOrPrefs?: Prefs | Options): Promise<void>;
```

**Parameters**

| Name              | Type                                                                     |
| ----------------- | ------------------------------------------------------------------------ |
| data              | [DataFile][InterfaceDeclaration-2] &#124; object[]                       |
| getPartialInsight | (columns: Column[]) => Partial<Insight>                                  |
| optionsOrPrefs    | [Prefs][InterfaceDeclaration-5] &#124; [Options][InterfaceDeclaration-8] |

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

| Name     | Type                                      |
| -------- | ----------------------------------------- |
| newState | Partial<[State][InterfaceDeclaration-10]> |

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

[Prefs][InterfaceDeclaration-5]

----------

### div

```typescript
public div: HTMLElement;
```

**Type**

HTMLElement

[ClassDeclaration-0]: explorer.html#explorer
[Constructor-0]: explorer.html#constructorprops
[InterfaceDeclaration-9]: ../index.html#props
[MethodDeclaration-0]: explorer.html#finalize
[MethodDeclaration-1]: explorer.html#updatevieweroptionsvieweroptions
[MethodDeclaration-2]: explorer.html#signalsignalname-signalvalue
[MethodDeclaration-3]: explorer.html#getinsight
[MethodDeclaration-4]: explorer.html#setinsightpartialinsight
[MethodDeclaration-5]: explorer.html#loaddata-getpartialinsight-optionsorprefs
[InterfaceDeclaration-2]: ../index.html#datafile
[InterfaceDeclaration-5]: ../index.html#prefs
[InterfaceDeclaration-8]: ../index.html#options
[MethodDeclaration-6]: explorer.html#changecharttypechart
[MethodDeclaration-7]: explorer.html#calculatecalculating
[MethodDeclaration-8]: explorer.html#changeviewview
[MethodDeclaration-9]: explorer.html#changeinsightnewstate
[InterfaceDeclaration-10]: ../index.html#state
[MethodDeclaration-10]: explorer.html#changespeccapabilitiesspeccapabilities
[MethodDeclaration-11]: explorer.html#changecolumnmappingrole-column-options
[MethodDeclaration-12]: explorer.html#sidebarsidebarclosed-sidebarpinned
[MethodDeclaration-13]: explorer.html#resize
[MethodDeclaration-14]: explorer.html#componentdidmount
[MethodDeclaration-15]: explorer.html#render
[PropertyDeclaration-0]: explorer.html#viewer
[PropertyDeclaration-1]: explorer.html#vieweroptions
[PropertyDeclaration-2]: explorer.html#discardcolorcontextupdates
[PropertyDeclaration-3]: explorer.html#prefs
[InterfaceDeclaration-5]: ../index.html#prefs
[PropertyDeclaration-4]: explorer.html#div