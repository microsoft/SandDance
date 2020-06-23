---
layout: api
---

# sanddance-explorer

## Functions

### getEmbedHTML

```typescript
function getEmbedHTML(data: object[], displayName: string, snapshots?: Snapshot[]): string;
```

**Parameters**

| Name        | Type       |
| ----------- | ---------- |
| data        | object[]   |
| displayName | string     |
| snapshots   | Snapshot[] |

**Return type**

string

----------

### use

Specify the dependency libraries to use for rendering.

```typescript
function use(fluentUI: FluentUIComponents, react: typeof ???, reactDOM: typeof ???, vega: VegaBase, deck: DeckBase, layers: DeckLayerBase, luma: LumaBase): void;
```

**Parameters**

| Name     | Type               | Description             |
| -------- | ------------------ | ----------------------- |
| fluentUI | FluentUIComponents | FluentUI React library. |
| react    | typeof ???         | React library.          |
| reactDOM | typeof ???         |                         |
| vega     | VegaBase           | Vega library.           |
| deck     | DeckBase           |                         |
| layers   | DeckLayerBase      |                         |
| luma     | LumaBase           |                         |

**Return type**

void

----------

### getColorSettingsFromThemePalette

```typescript
function getColorSettingsFromThemePalette(themePalette: Partial<IPalette>): Partial<ColorSettings>;
```

**Parameters**

| Name         | Type              |
| ------------ | ----------------- |
| themePalette | Partial<IPalette> |

**Return type**

Partial<[ColorSettings][InterfaceDeclaration-1]>

## Interfaces

### ColorSettings

```typescript
interface ColorSettings extends ColorSettings {
    clickableText?: string;
    clickableTextHighlight?: string;
    searchText?: string;
    searchTextHighlight?: string;
}
```

**Extends**

ColorSettings

**Properties**

| Name                   | Type   | Optional |
| ---------------------- | ------ | -------- |
| clickableText          | string | true     |
| clickableTextHighlight | string | true     |
| searchText             | string | true     |
| searchTextHighlight    | string | true     |

----------

### DataContent

```typescript
interface DataContent {
    data: object[];
    columns: Column[];
    snapshots?: Snapshot[];
}
```

**Properties**

| Name      | Type       | Optional |
| --------- | ---------- | -------- |
| data      | object[]   | false    |
| columns   | Column[]   | false    |
| snapshots | Snapshot[] | true     |

----------

### DataFile

```typescript
interface DataFile {
    displayName?: string;
    dataUrl?: string;
    snapshotsUrl?: string;
    rawText?: string;
    snapshots?: Snapshot[];
    type: DataFileType;
}
```

**Properties**

| Name         | Type                                   | Optional |
| ------------ | -------------------------------------- | -------- |
| displayName  | string                                 | true     |
| dataUrl      | string                                 | true     |
| snapshotsUrl | string                                 | true     |
| rawText      | string                                 | true     |
| snapshots    | Snapshot[]                             | true     |
| type         | [DataFileType][TypeAliasDeclaration-1] | false    |

----------

### SettingsGroup

```typescript
interface SettingsGroup {
    groupLabel: string;
    children: ReactNode;
}
```

**Properties**

| Name       | Type      | Optional |
| ---------- | --------- | -------- |
| groupLabel | string    | false    |
| children   | ReactNode | false    |

----------

### ViewerOptions

```typescript
interface ViewerOptions extends ViewerOptions {
    colors: ColorSettings;
}
```

**Extends**

ViewerOptions

**Properties**

| Name   | Type                                    | Optional | Description                                          |
| ------ | --------------------------------------- | -------- | ---------------------------------------------------- |
| colors | [ColorSettings][InterfaceDeclaration-1] | false    | Custom colors of various parts of the visualization. |

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

### Options

```typescript
interface Options {
    chartPrefs?: Prefs;
    tooltipExclusions?: string[];
}
```

**Properties**

| Name              | Type                            | Optional |
| ----------------- | ------------------------------- | -------- |
| chartPrefs        | [Prefs][InterfaceDeclaration-6] | true     |
| tooltipExclusions | string[]                        | true     |

----------

### Props

```typescript
interface Props {
    compactUI?: boolean;
    hideSidebarControls?: boolean;
    logoClickUrl?: string;
    logoClickTarget?: string;
    bingSearchDisabled?: boolean;
    searchORDisabled?: boolean;
    theme?: string;
    viewerOptions?: Partial<ViewerOptions>;
    initialView?: View;
    mounted?: (explorer: Explorer_Class<>) => any;
    datasetElement?: Element<>;
    dataExportHandler?: DataExportHandler;
    topBarButtonProps?: ICommandBarItemProps[];
    snapshotProps?: SnapshotProps;
    onSnapshotClick?: (snapshot: Snapshot, selectedSnaphotIndex: number) => void | boolean;
    onSnapshotsChanged?: (snapshots: Snapshot[]) => void;
    onView?: () => void;
    onError?: (e: any) => void;
    onSignalChanged?: (signalName: string, signalValue: any) => void;
    onTooltipExclusionsChanged?: (tooltipExclusions: string[]) => void;
    additionalSettings?: SettingsGroup[];
    systemInfoChildren?: ReactNode;
}
```

**Properties**

| Name                       | Type                                                                      | Optional |
| -------------------------- | ------------------------------------------------------------------------- | -------- |
| compactUI                  | boolean                                                                   | true     |
| hideSidebarControls        | boolean                                                                   | true     |
| logoClickUrl               | string                                                                    | true     |
| logoClickTarget            | string                                                                    | true     |
| bingSearchDisabled         | boolean                                                                   | true     |
| searchORDisabled           | boolean                                                                   | true     |
| theme                      | string                                                                    | true     |
| viewerOptions              | Partial<ViewerOptions>                                                    | true     |
| initialView                | View                                                                      | true     |
| mounted                    | (explorer: Explorer_Class<>) => any                                       | true     |
| datasetElement             | Element<>                                                                 | true     |
| dataExportHandler          | DataExportHandler                              | true     |
| topBarButtonProps          | ICommandBarItemProps[]                                                    | true     |
| snapshotProps              | SnapshotProps                                  | true     |
| onSnapshotClick            | (snapshot: Snapshot, selectedSnaphotIndex: number) => void &#124; boolean | true     |
| onSnapshotsChanged         | (snapshots: Snapshot[]) => void                                           | true     |
| onView                     | () => void                                                                | true     |
| onError                    | (e: any) => void                                                          | true     |
| onSignalChanged            | (signalName: string, signalValue: any) => void                            | true     |
| onTooltipExclusionsChanged | (tooltipExclusions: string[]) => void                                     | true     |
| additionalSettings         | [SettingsGroup][InterfaceDeclaration-4][]                                 | true     |
| systemInfoChildren         | ReactNode                                                                 | true     |

----------

### UIState

```typescript
interface UIState {
    calculating: () => void;
    errors: string[];
    autoCompleteDistinctValues: AutoCompleteDistinctValues;
    search: InputSearchExpressionGroup<>[];
    filteredData: object[];
    sidebarClosed: boolean;
    sidebarPinned: boolean;
    dataFile: DataFile;
    dataContent: DataContent;
    specCapabilities: SpecCapabilities;
    sideTabId: SideTabId;
    dataScopeId: DataScopeId;
    selectedItemIndex: { [key: number]: number; };
    snapshots: Snapshot[];
    selectedSnapshotIndex: number;
    tooltipExclusions: string[];
    positionedColumnMapProps: PositionedColumnMapProps;
    note: string;
    historyIndex: number;
    historyItems: HistoryItem[];
}
```

**Properties**

| Name                       | Type                                                      | Optional |
| -------------------------- | --------------------------------------------------------- | -------- |
| calculating                | () => void                                                | false    |
| errors                     | string[]                                                  | false    |
| autoCompleteDistinctValues | AutoCompleteDistinctValues     | false    |
| search                     | InputSearchExpressionGroup<>[] | false    |
| filteredData               | object[]                                                  | false    |
| sidebarClosed              | boolean                                                   | false    |
| sidebarPinned              | boolean                                                   | false    |
| dataFile                   | [DataFile][InterfaceDeclaration-3]                        | false    |
| dataContent                | [DataContent][InterfaceDeclaration-2]                     | false    |
| specCapabilities           | SpecCapabilities                                          | false    |
| sideTabId                  | [SideTabId][EnumDeclaration-0]                            | false    |
| dataScopeId                | DataScopeId                          | false    |
| selectedItemIndex          | { [key: number]: number; }                                | false    |
| snapshots                  | Snapshot[]                                                | false    |
| selectedSnapshotIndex      | number                                                    | false    |
| tooltipExclusions          | string[]                                                  | false    |
| positionedColumnMapProps   | PositionedColumnMapProps       | false    |
| note                       | string                                                    | false    |
| historyIndex               | number                                                    | false    |
| historyItems               | [HistoryItem][InterfaceDeclaration-22][]                  | false    |

----------

### HistoricInsight

```typescript
interface HistoricInsight extends Insight {
    rebaseFilter?: boolean;
}
```

**Extends**

Insight

**Properties**

| Name         | Type    | Optional |
| ------------ | ------- | -------- |
| rebaseFilter | boolean | true     |

----------

### State

```typescript
interface State extends HistoricInsight, UIState {
}
```

**Extends**

[HistoricInsight][InterfaceDeclaration-23]

[UIState][InterfaceDeclaration-12]

----------

### HistoryAction

```typescript
interface HistoryAction {
    insert?: boolean;
    omit?: boolean;
    label: string;
}
```

**Properties**

| Name   | Type    | Optional |
| ------ | ------- | -------- |
| insert | boolean | true     |
| omit   | boolean | true     |
| label  | string  | false    |

----------

### HistoryItem

```typescript
interface HistoryItem {
    label: string;
    historicInsight: Partial<HistoricInsight>;
}
```

**Properties**

| Name            | Type                                                | Optional |
| --------------- | --------------------------------------------------- | -------- |
| label           | string                                              | false    |
| historicInsight | Partial<[HistoricInsight][InterfaceDeclaration-23]> | false    |

## Types

### DataExportType

```typescript
type DataExportType = DataFileType | "html";
```

**Type**

[DataFileType][TypeAliasDeclaration-1] | "html"

----------

### DataFileType

```typescript
type DataFileType = "json" | "csv" | "tsv" | "topojson";
```

**Type**

"json" | "csv" | "tsv" | "topojson"

## Enums

### SideTabId


```typescript
enum SideTabId {
     ChartType = 0,
     Data = 1,
     Search = 2,
     Color = 3,
     Snapshots = 4,
     History = 5,
     Settings = 6,
     Pin = 7,
     Collapse = 8
}
```

**Members**

| Name      | Value |
| --------- | ----- |
| ChartType | 0     |
| Data      | 1     |
| Search    | 2     |
| Color     | 3     |
| Snapshots | 4     |
| History   | 5     |
| Settings  | 6     |
| Pin       | 7     |
| Collapse  | 8     |

## Classes

### [Explorer_Class][ClassDeclaration-0]


## Namespaces

### [controls][NamespaceImport-0]


## Variables

### capabilities

```typescript
const capabilities: { webgl: boolean; webgl2: boolean; };
```

**Type**

{ webgl: boolean; webgl2: boolean; }

----------

### themePalettes

```typescript
const themePalettes: { [theme: string]: Partial<IPalette>; };
```

**Type**

{ [theme: string]: Partial<IPalette>; }

----------

### Explorer

```typescript
const Explorer: typeof Explorer_Class;
```

**Type**

typeof Explorer_Class

----------

### version

```typescript
const version: string;
```

**Type**

string

[SourceFile-0]: index.html#indexts
[FunctionDeclaration-1]: index.html#getembedhtml
[FunctionDeclaration-2]: index.html#use
[FunctionDeclaration-3]: index.html#getcolorsettingsfromthemepalette
[InterfaceDeclaration-1]: index.html#colorsettings
[InterfaceDeclaration-1]: index.html#colorsettings
[InterfaceDeclaration-2]: index.html#datacontent
[InterfaceDeclaration-3]: index.html#datafile
[TypeAliasDeclaration-1]: index.html#datafiletype
[InterfaceDeclaration-4]: index.html#settingsgroup
[InterfaceDeclaration-5]: index.html#vieweroptions
[InterfaceDeclaration-1]: index.html#colorsettings
[InterfaceDeclaration-6]: index.html#prefs
[InterfaceDeclaration-9]: index.html#options
[InterfaceDeclaration-6]: index.html#prefs
[InterfaceDeclaration-10]: index.html#props
[InterfaceDeclaration-4]: index.html#settingsgroup
[InterfaceDeclaration-12]: index.html#uistate
[InterfaceDeclaration-3]: index.html#datafile
[InterfaceDeclaration-2]: index.html#datacontent
[EnumDeclaration-0]: index.html#sidetabid
[InterfaceDeclaration-22]: index.html#historyitem
[InterfaceDeclaration-23]: index.html#historicinsight
[InterfaceDeclaration-24]: index.html#state
[InterfaceDeclaration-23]: index.html#historicinsight
[InterfaceDeclaration-12]: index.html#uistate
[InterfaceDeclaration-11]: index.html#historyaction
[InterfaceDeclaration-22]: index.html#historyitem
[InterfaceDeclaration-23]: index.html#historicinsight
[TypeAliasDeclaration-0]: index.html#dataexporttype
[TypeAliasDeclaration-1]: index.html#datafiletype
[TypeAliasDeclaration-1]: index.html#datafiletype
[EnumDeclaration-0]: index.html#sidetabid
[ClassDeclaration-0]: explorer_class.html#explorer_class
[NamespaceImport-0]: controls.html#controls
[VariableDeclaration-0]: index.html#capabilities
[VariableDeclaration-1]: index.html#themepalettes
[VariableDeclaration-2]: index.html#explorer
[VariableDeclaration-3]: index.html#version