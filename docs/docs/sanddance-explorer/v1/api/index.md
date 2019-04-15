---
layout: api
---

# sanddance-explorer

## Functions

### use

Specify the dependency libraries to use for rendering.

```typescript
function use(reactDomRender: Renderer, fabric: FabricComponents, vega: VegaBase, deck: DeckBase, layers: DeckLayerBase, luma: LumaBase): void;
```

**Parameters**

| Name           | Type             | Description                     |
| -------------- | ---------------- | ------------------------------- |
| reactDomRender | Renderer         |                                 |
| fabric         | FabricComponents | Office UI Fabric React library. |
| vega           | VegaBase         |                                 |
| deck           | DeckBase         |                                 |
| layers         | DeckLayerBase    |                                 |
| luma           | LumaBase         |                                 |

**Return type**

void

## Interfaces

### DataContent

```typescript
interface DataContent {
    data: object[];
    columns: Column[];
}
```

**Properties**

| Name    | Type     | Optional |
| ------- | -------- | -------- |
| data    | object[] | false    |
| columns | Column[] | false    |

----------

### DataFile

```typescript
interface DataFile {
    dataUrl?: string;
    rawText?: string;
    type: string;
}
```

**Properties**

| Name    | Type   | Optional |
| ------- | ------ | -------- |
| dataUrl | string | true     |
| rawText | string | true     |
| type    | string | false    |

----------

### Snapshot

```typescript
interface Snapshot {
    description: string;
    insight: Insight;
    image: string;
    bgColor: string;
}
```

**Properties**

| Name        | Type    | Optional |
| ----------- | ------- | -------- |
| description | string  | false    |
| insight     | Insight | false    |
| image       | string  | false    |
| bgColor     | string  | false    |

----------

### Prefs

```typescript
interface Prefs {
    [chart: string]: SpecTypePrefs;
}
```
#### Index

```typescript
[chart: string]: SpecTypePrefs;
```

* *Parameter* `chart` - string
* *Type* SpecTypePrefs


----------

### Props

```typescript
interface Props {
    viewerOptions?: Partial<ViewerOptions>;
    initialView?: View;
    mounted?: (explorer: Explorer) => any;
    datasetElement?: Element;
    topBarButtonProps?: Props[];
    snapshotProps?: SnapshotProps;
    onSnapshotClick?: (snapshot: Snapshot) => void;
}
```

**Properties**

| Name              | Type                                     | Optional |
| ----------------- | ---------------------------------------- | -------- |
| viewerOptions     | Partial<ViewerOptions>                   | true     |
| initialView       | View                                     | true     |
| mounted           | (explorer: Explorer) => any              | true     |
| datasetElement    | Element                                  | true     |
| topBarButtonProps | Props[]       | true     |
| snapshotProps     | SnapshotProps | true     |
| onSnapshotClick   | (snapshot: Snapshot) => void             | true     |

----------

### State

```typescript
interface State {
    calculating: () => void;
    errors: string[];
    autoCompleteDistinctValues: AutoCompleteDistinctValues;
    search: SearchExpressionGroup<InputSearchExpression>[];
    filter: Search;
    filteredData: object[];
    toolbarClosed: boolean;
    toolbarPinned: boolean;
    view: View;
    dataFile: DataFile;
    dataContent: DataContent;
    specCapabilities: SpecCapabilities;
    facets: Facets;
    scheme: string;
    chart: Chart;
    columns: InsightColumns;
    size: Size;
    colorBin: ColorBin;
    sideTabId: SideTabId;
    dataScopeId: DataScopeId;
    selectedItemIndex: { [key: number]: number; };
    initialPointSize: number;
    initialColorBinCount: number;
    initialXBinCount: number;
    initialTreeMapMethod: string;
    snapshots: Snapshot[];
}
```

**Properties**

| Name                       | Type                                                                     | Optional |
| -------------------------- | ------------------------------------------------------------------------ | -------- |
| calculating                | () => void                                                               | false    |
| errors                     | string[]                                                                 | false    |
| autoCompleteDistinctValues | AutoCompleteDistinctValues                     | false    |
| search                     | SearchExpressionGroup<InputSearchExpression>[] | false    |
| filter                     | Search                                                                   | false    |
| filteredData               | object[]                                                                 | false    |
| toolbarClosed              | boolean                                                                  | false    |
| toolbarPinned              | boolean                                                                  | false    |
| view                       | View                                                                     | false    |
| dataFile                   | [DataFile][InterfaceDeclaration-1]                                       | false    |
| dataContent                | [DataContent][InterfaceDeclaration-0]                                    | false    |
| specCapabilities           | SpecCapabilities                                                         | false    |
| facets                     | Facets                                                                   | false    |
| scheme                     | string                                                                   | false    |
| chart                      | Chart                                                                    | false    |
| columns                    | InsightColumns                                                           | false    |
| size                       | Size                                                                     | false    |
| colorBin                   | ColorBin                                                                 | false    |
| sideTabId                  | SideTabId                                           | false    |
| dataScopeId                | DataScopeId                                         | false    |
| selectedItemIndex          | { [key: number]: number; }                                               | false    |
| initialPointSize           | number                                                                   | false    |
| initialColorBinCount       | number                                                                   | false    |
| initialXBinCount           | number                                                                   | false    |
| initialTreeMapMethod       | string                                                                   | false    |
| snapshots                  | [Snapshot][InterfaceDeclaration-2][]                                     | false    |

## Classes

### [Explorer][ClassDeclaration-0]


[SourceFile-0]: index#indextsx
[FunctionDeclaration-0]: index#use
[InterfaceDeclaration-0]: index#datacontent
[InterfaceDeclaration-1]: index#datafile
[InterfaceDeclaration-2]: index#snapshot
[InterfaceDeclaration-3]: index#prefs
[InterfaceDeclaration-6]: index#props
[InterfaceDeclaration-7]: index#state
[InterfaceDeclaration-1]: index#datafile
[InterfaceDeclaration-0]: index#datacontent
[InterfaceDeclaration-2]: index#snapshot
[ClassDeclaration-0]: explorer#explorer