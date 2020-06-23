---
layout: api
---

# sanddance-explorer .Explorer_Class

```typescript
class Explorer_Class
```
## Constructor

### constructor(props)

```typescript
public constructor(props: Props);
```

**Parameters**

| Name  | Type                             |
| ----- | -------------------------------- |
| props | [Props][InterfaceDeclaration-10] |

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

### signal(signalName, signalValue, newViewStateTarget)

```typescript
public signal(signalName: string, signalValue: any, newViewStateTarget?: boolean): void;
```

**Parameters**

| Name               | Type    |
| ------------------ | ------- |
| signalName         | string  |
| signalValue        | any     |
| newViewStateTarget | boolean |

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

### setInsight(historyAction, newState, partialInsight, rebaseFilter)

```typescript
public setInsight(historyAction: HistoryAction, newState?: Partial<UIState>, partialInsight?: Partial<Insight>, rebaseFilter?: boolean): void;
```

**Parameters**

| Name           | Type                                        |
| -------------- | ------------------------------------------- |
| historyAction  | [HistoryAction][InterfaceDeclaration-11]    |
| newState       | Partial<[UIState][InterfaceDeclaration-12]> |
| partialInsight | Partial<Insight>                            |
| rebaseFilter   | boolean                                     |

**Return type**

void

----------

### reviveSnapshot(snapshotOrIndex)

```typescript
public reviveSnapshot(snapshotOrIndex: Snapshot | number): void;
```

**Parameters**

| Name            | Type                   |
| --------------- | ---------------------- |
| snapshotOrIndex | Snapshot &#124; number |

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
| data              | [DataFile][InterfaceDeclaration-3] &#124; object[]                       |
| getPartialInsight | (columns: Column[]) => Partial<Insight>                                  |
| optionsOrPrefs    | [Prefs][InterfaceDeclaration-6] &#124; [Options][InterfaceDeclaration-9] |

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

### changeInsight(partialInsight, historyAction, additionalUIState)

```typescript
public changeInsight(partialInsight: Partial<Insight>, historyAction: HistoryAction, additionalUIState?: Partial<UIState>): void;
```

**Parameters**

| Name              | Type                                        |
| ----------------- | ------------------------------------------- |
| partialInsight    | Partial<Insight>                            |
| historyAction     | [HistoryAction][InterfaceDeclaration-11]    |
| additionalUIState | Partial<[UIState][InterfaceDeclaration-12]> |

**Return type**

void

----------

### addHistory(historicInsight, historyAction, additionalUIState)

```typescript
public addHistory(historicInsight: Partial<HistoricInsight>, historyAction: HistoryAction, additionalUIState?: Partial<UIState>): void;
```

**Parameters**

| Name              | Type                                                |
| ----------------- | --------------------------------------------------- |
| historicInsight   | Partial<[HistoricInsight][InterfaceDeclaration-23]> |
| historyAction     | [HistoryAction][InterfaceDeclaration-11]            |
| additionalUIState | Partial<[UIState][InterfaceDeclaration-12]>         |

**Return type**

void

----------

### undo()

```typescript
public undo(): void;
```

**Return type**

void

----------

### redo(historyIndex)

```typescript
public redo(historyIndex?: number): void;
```

**Parameters**

| Name         | Type   |
| ------------ | ------ |
| historyIndex | number |

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
public changeColumnMapping(role: InsightColumnRoles, column: Column, options?: ChangeColumnMappingOptions): void;
```

**Parameters**

| Name    | Type                                                  |
| ------- | ----------------------------------------------------- |
| role    | InsightColumnRoles                                    |
| column  | Column                                                |
| options | ChangeColumnMappingOptions |

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

### scrollSnapshotIntoView(selectedSnapshotIndex)

```typescript
public scrollSnapshotIntoView(selectedSnapshotIndex: number): void;
```

**Parameters**

| Name                  | Type   |
| --------------------- | ------ |
| selectedSnapshotIndex | number |

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

[Prefs][InterfaceDeclaration-6]

----------

### div

```typescript
public div: HTMLElement;
```

**Type**

HTMLElement

----------

### snapshotThumbWidth

```typescript
public snapshotThumbWidth: number;
```

**Type**

number

[ClassDeclaration-0]: explorer_class.html#explorer_class
[Constructor-0]: explorer_class.html#constructorprops
[InterfaceDeclaration-10]: ../index.html#props
[MethodDeclaration-0]: explorer_class.html#finalize
[MethodDeclaration-1]: explorer_class.html#updatevieweroptionsvieweroptions
[MethodDeclaration-2]: explorer_class.html#signalsignalname-signalvalue-newviewstatetarget
[MethodDeclaration-3]: explorer_class.html#getinsight
[MethodDeclaration-4]: explorer_class.html#setinsighthistoryaction-newstate-partialinsight-rebasefilter
[InterfaceDeclaration-11]: ../index.html#historyaction
[InterfaceDeclaration-12]: ../index.html#uistate
[MethodDeclaration-5]: explorer_class.html#revivesnapshotsnapshotorindex
[MethodDeclaration-6]: explorer_class.html#loaddata-getpartialinsight-optionsorprefs
[InterfaceDeclaration-3]: ../index.html#datafile
[InterfaceDeclaration-6]: ../index.html#prefs
[InterfaceDeclaration-9]: ../index.html#options
[MethodDeclaration-7]: explorer_class.html#changecharttypechart
[MethodDeclaration-8]: explorer_class.html#calculatecalculating
[MethodDeclaration-9]: explorer_class.html#changeviewview
[MethodDeclaration-10]: explorer_class.html#changeinsightpartialinsight-historyaction-additionaluistate
[InterfaceDeclaration-11]: ../index.html#historyaction
[InterfaceDeclaration-12]: ../index.html#uistate
[MethodDeclaration-11]: explorer_class.html#addhistoryhistoricinsight-historyaction-additionaluistate
[InterfaceDeclaration-23]: ../index.html#historicinsight
[InterfaceDeclaration-11]: ../index.html#historyaction
[InterfaceDeclaration-12]: ../index.html#uistate
[MethodDeclaration-12]: explorer_class.html#undo
[MethodDeclaration-13]: explorer_class.html#redohistoryindex
[MethodDeclaration-14]: explorer_class.html#changespeccapabilitiesspeccapabilities
[MethodDeclaration-15]: explorer_class.html#changecolumnmappingrole-column-options
[MethodDeclaration-16]: explorer_class.html#sidebarsidebarclosed-sidebarpinned
[MethodDeclaration-17]: explorer_class.html#resize
[MethodDeclaration-18]: explorer_class.html#scrollsnapshotintoviewselectedsnapshotindex
[MethodDeclaration-19]: explorer_class.html#componentdidmount
[MethodDeclaration-20]: explorer_class.html#render
[PropertyDeclaration-0]: explorer_class.html#viewer
[PropertyDeclaration-1]: explorer_class.html#vieweroptions
[PropertyDeclaration-2]: explorer_class.html#discardcolorcontextupdates
[PropertyDeclaration-3]: explorer_class.html#prefs
[InterfaceDeclaration-6]: ../index.html#prefs
[PropertyDeclaration-4]: explorer_class.html#div
[PropertyDeclaration-5]: explorer_class.html#snapshotthumbwidth