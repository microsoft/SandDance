---
layout: api
---

# sanddance-explorer

## Functions

### use

Specify the dependency libraries to use for rendering.

```typescript
function use(fabric: FabricComponents, vega: VegaBase, deck: DeckBase, layers: DeckLayerBase, luma: LumaBase): void;
```

**Parameters**

| Name   | Type             | Description                     |
| ------ | ---------------- | ------------------------------- |
| fabric | FabricComponents | Office UI Fabric React library. |
| vega   | VegaBase         |                                 |
| deck   | DeckBase         |                                 |
| layers | DeckLayerBase    |                                 |
| luma   | LumaBase         |                                 |

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

Partial<[ColorSettings][InterfaceDeclaration-0]>

## Interfaces

### ColorSettings

```typescript
interface ColorSettings extends ColorSettings {
    clickableText?: Color;
    clickableTextHighlight?: Color;
}
```

**Extends**

ColorSettings

**Properties**

| Name                   | Type  | Optional |
| ---------------------- | ----- | -------- |
| clickableText          | Color | true     |
| clickableTextHighlight | Color | true     |

----------

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
    type: DataFileType;
}
```

**Properties**

| Name    | Type                                   | Optional |
| ------- | -------------------------------------- | -------- |
| dataUrl | string                                 | true     |
| rawText | string                                 | true     |
| type    | [DataFileType][TypeAliasDeclaration-0] | false    |

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
| colors | [ColorSettings][InterfaceDeclaration-0] | false    | Custom colors of various parts of the visualization. |

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
| chartPrefs        | [Prefs][InterfaceDeclaration-5] | true     |
| tooltipExclusions | string[]                        | true     |

----------

### Props

```typescript
interface Props {
    hideSidebarControls?: boolean;
    logoClickUrl?: string;
    logoClickTarget?: string;
    theme?: string;
    viewerOptions?: Partial<ViewerOptions>;
    initialView?: View;
    mounted?: (explorer: Explorer) => any;
    datasetElement?: Element;
    topBarButtonProps?: ICommandBarItemProps[];
    snapshotProps?: SnapshotProps;
    onSnapshotClick?: (snapshot: Snapshot) => void;
    onView?: () => void;
    onSignalChanged?: () => void;
    onTooltipExclusionsChanged?: (tooltipExclusions: string[]) => void;
}
```

**Properties**

| Name                       | Type                                     | Optional |
| -------------------------- | ---------------------------------------- | -------- |
| hideSidebarControls        | boolean                                  | true     |
| logoClickUrl               | string                                   | true     |
| logoClickTarget            | string                                   | true     |
| theme                      | string                                   | true     |
| viewerOptions              | Partial<ViewerOptions>                   | true     |
| initialView                | View                                     | true     |
| mounted                    | (explorer: Explorer) => any              | true     |
| datasetElement             | Element                                  | true     |
| topBarButtonProps          | ICommandBarItemProps[]                   | true     |
| snapshotProps              | SnapshotProps | true     |
| onSnapshotClick            | (snapshot: Snapshot) => void             | true     |
| onView                     | () => void                               | true     |
| onSignalChanged            | () => void                               | true     |
| onTooltipExclusionsChanged | (tooltipExclusions: string[]) => void    | true     |

----------

### State

```typescript
interface State extends Insight {
    calculating: () => void;
    errors: string[];
    autoCompleteDistinctValues: AutoCompleteDistinctValues;
    search: InputSearchExpressionGroup[];
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
    tooltipExclusions: string[];
    positionedColumnMapProps: PositionedColumnMapProps;
}
```

**Extends**

Insight

**Properties**

| Name                       | Type                                                    | Optional |
| -------------------------- | ------------------------------------------------------- | -------- |
| calculating                | () => void                                              | false    |
| errors                     | string[]                                                | false    |
| autoCompleteDistinctValues | AutoCompleteDistinctValues   | false    |
| search                     | InputSearchExpressionGroup[] | false    |
| filteredData               | object[]                                                | false    |
| sidebarClosed              | boolean                                                 | false    |
| sidebarPinned              | boolean                                                 | false    |
| dataFile                   | [DataFile][InterfaceDeclaration-2]                      | false    |
| dataContent                | [DataContent][InterfaceDeclaration-1]                   | false    |
| specCapabilities           | SpecCapabilities                                        | false    |
| sideTabId                  | SideTabId                          | false    |
| dataScopeId                | DataScopeId                        | false    |
| selectedItemIndex          | { [key: number]: number; }                              | false    |
| snapshots                  | [Snapshot][InterfaceDeclaration-3][]                    | false    |
| tooltipExclusions          | string[]                                                | false    |
| positionedColumnMapProps   | PositionedColumnMapProps     | false    |

## Types

### DataFileType

```typescript
type DataFileType = "json" | "csv" | "tsv" | "topojson";
```

**Type**

"json" | "csv" | "tsv" | "topojson"

## Classes

### [Explorer][ClassDeclaration-0]


## Variables

### themePalettes

```typescript
const themePalettes: { [theme: string]: Partial<IPalette>; };
```

**Type**

{ [theme: string]: Partial<IPalette>; }

----------

### version

```typescript
const version: string;
```

**Type**

string

[SourceFile-0]: index#indextsx
[FunctionDeclaration-0]: index#use
[FunctionDeclaration-1]: index#getcolorsettingsfromthemepalette
[InterfaceDeclaration-0]: index#colorsettings
[InterfaceDeclaration-0]: index#colorsettings
[InterfaceDeclaration-1]: index#datacontent
[InterfaceDeclaration-2]: index#datafile
[TypeAliasDeclaration-0]: index#datafiletype
[InterfaceDeclaration-3]: index#snapshot
[InterfaceDeclaration-4]: index#vieweroptions
[InterfaceDeclaration-0]: index#colorsettings
[InterfaceDeclaration-5]: index#prefs
[InterfaceDeclaration-8]: index#options
[InterfaceDeclaration-5]: index#prefs
[InterfaceDeclaration-9]: index#props
[InterfaceDeclaration-10]: index#state
[InterfaceDeclaration-2]: index#datafile
[InterfaceDeclaration-1]: index#datacontent
[InterfaceDeclaration-3]: index#snapshot
[TypeAliasDeclaration-0]: index#datafiletype
[ClassDeclaration-0]: explorer#explorer
[VariableDeclaration-0]: index#themepalettes
[VariableDeclaration-1]: index#version