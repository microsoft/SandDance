---
layout: api
---

# sanddance .VegaDeckGl

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

[SourceFile-0]: vegadeckgl.html#vegadeckgl
[FunctionDeclaration-0]: vegadeckgl.html#use
[InterfaceDeclaration-4]: vegadeckgl.types.html#vegabase
[InterfaceDeclaration-1]: vegadeckgl.types.html#deckbase
[InterfaceDeclaration-2]: vegadeckgl.types.html#decklayerbase
[InterfaceDeclaration-3]: vegadeckgl.types.html#lumabase
[EnumDeclaration-0]: vegadeckgl.html#presenterelement
[ClassDeclaration-0]: vegadeckgl.presenter.html#presenter
[NamespaceImport-0]: vegadeckgl.constants.html#constants
[NamespaceImport-1]: vegadeckgl.controls.html#controls
[NamespaceImport-2]: vegadeckgl.defaults.html#defaults
[NamespaceImport-3]: vegadeckgl.types.html#types
[NamespaceImport-4]: vegadeckgl.util.html#util
[VariableDeclaration-0]: vegadeckgl.html#base
[InterfaceDeclaration-0]: vegadeckgl.types.html#base
[VariableDeclaration-1]: vegadeckgl.html#viewgl