---
layout: api
---

# sanddance

## Functions

### use

Specify the dependency libraries to use for rendering.

```typescript
function use(vega: VegaBase, deck: DeckBase, layers: DeckLayerBase, luma: LumaBase): void;
```

**Parameters**

| Name   | Type                                     | Description          |
| ------ | ---------------------------------------- | -------------------- |
| vega   | [VegaBase][InterfaceDeclaration-45]      | Vega library.        |
| deck   | [DeckBase][InterfaceDeclaration-46]      | deck/core library.   |
| layers | [DeckLayerBase][InterfaceDeclaration-47] | deck/layers library. |
| luma   | [LumaBase][InterfaceDeclaration-48]      | luma.gl library.     |

**Return type**

void

## Classes

### [Viewer][ClassDeclaration-5]

Component to view a SandDance data visualization.


## Namespaces

### [constants][NamespaceImport-0]


----------

### [searchExpression][NamespaceImport-1]


----------

### [types][NamespaceImport-2]


----------

### [util][NamespaceImport-3]


----------

### [VegaDeckGl][NamespaceImport-4]


## Variables

### colorSchemes

Array of color schemes.

```typescript
const colorSchemes: ColorScheme[];
```

**Type**

[ColorScheme][InterfaceDeclaration-0][]

----------

### version

```typescript
const version: string;
```

**Type**

string

[SourceFile-0]: index.html#indexts
[FunctionDeclaration-5]: index.html#use
[InterfaceDeclaration-45]: vegadeckgl/types.html#vegabase
[InterfaceDeclaration-46]: vegadeckgl/types.html#deckbase
[InterfaceDeclaration-47]: vegadeckgl/types.html#decklayerbase
[InterfaceDeclaration-48]: vegadeckgl/types.html#lumabase
[ClassDeclaration-5]: viewer.html#viewer
[NamespaceImport-0]: constants.html#constants
[NamespaceImport-1]: searchexpression.html#searchexpression
[NamespaceImport-2]: types.html#types
[NamespaceImport-3]: util.html#util
[NamespaceImport-4]: vegadeckgl.html#vegadeckgl
[VariableDeclaration-0]: index.html#colorschemes
[InterfaceDeclaration-0]: types.html#colorscheme
[VariableDeclaration-19]: index.html#version