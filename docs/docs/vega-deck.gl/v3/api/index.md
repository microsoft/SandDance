---
layout: api
---

# vega-deck.gl

## Functions

### use

Specify the dependency libraries to use for rendering.

```typescript
function use(vega: VegaBase, deck: DeckBase, layers: DeckLayerBase, luma: LumaBase): void;
```

**Parameters**

| Name   | Type                                    | Description          |
| ------ | --------------------------------------- | -------------------- |
| vega   | [VegaBase][InterfaceDeclaration-4]      | Vega library.        |
| deck   | [DeckBase][InterfaceDeclaration-1]      | deck/core library.   |
| layers | [DeckLayerBase][InterfaceDeclaration-2] | deck/layers library. |
| luma   | [LumaBase][InterfaceDeclaration-3]      | luma.gl library.     |

**Return type**

void

## Enums

### PresenterElement

HTML elements outputted by the presenter.


```typescript
enum PresenterElement {
     root = 0,
     gl = 1,
     panel = 2,
     legend = 3,
     vegaControls = 4
}
```

**Members**

| Name         | Value |
| ------------ | ----- |
| root         | 0     |
| gl           | 1     |
| panel        | 2     |
| legend       | 3     |
| vegaControls | 4     |

## Classes

### [Presenter][ClassDeclaration-0]

Class which presents a Stage of chart data using Deck.gl to render.


## Namespaces

### [constants][NamespaceImport-0]


----------

### [controls][NamespaceImport-1]


----------

### [defaults][NamespaceImport-2]


----------

### [types][NamespaceImport-3]


----------

### [util][NamespaceImport-4]


## Variables

### base

References to dependency libraries.

```typescript
const base: Base;
```

**Type**

[Base][InterfaceDeclaration-0]

----------

### ViewGl

Subclass of Vega.View, with added properties for accessing a Presenter.
This is instantiatable by calling `new ViewGl()`. See https://vega.github.io/vega/docs/api/view/

```typescript
const ViewGl: typeof ViewGl_Class;
```

**Type**

typeof ViewGl_Class

[SourceFile-0]: index.html#indexts
[FunctionDeclaration-0]: index.html#use
[InterfaceDeclaration-4]: types.html#vegabase
[InterfaceDeclaration-1]: types.html#deckbase
[InterfaceDeclaration-2]: types.html#decklayerbase
[InterfaceDeclaration-3]: types.html#lumabase
[EnumDeclaration-0]: index.html#presenterelement
[ClassDeclaration-0]: presenter.html#presenter
[NamespaceImport-0]: constants.html#constants
[NamespaceImport-1]: controls.html#controls
[NamespaceImport-2]: defaults.html#defaults
[NamespaceImport-3]: types.html#types
[NamespaceImport-4]: util.html#util
[VariableDeclaration-0]: index.html#base
[InterfaceDeclaration-0]: types.html#base
[VariableDeclaration-1]: index.html#viewgl