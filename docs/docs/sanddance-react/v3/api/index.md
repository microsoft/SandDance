---
layout: api
---

# sanddance-react

## Functions

### use

Specify the dependency libraries to use for rendering.

```typescript
function use(react: typeof ???, reactDOM: typeof ???, vega: VegaBase, deck: DeckBase, layers: DeckLayerBase, luma: LumaBase): void;
```

**Parameters**

| Name     | Type          | Description    |
| -------- | ------------- | -------------- |
| react    | typeof ???    | React library. |
| reactDOM | typeof ???    |                |
| vega     | VegaBase      | Vega library.  |
| deck     | DeckBase      |                |
| layers   | DeckLayerBase |                |
| luma     | LumaBase      |                |

**Return type**

void

## Interfaces

### Props

```typescript
interface Props {
    viewerOptions?: Partial<ViewerOptions>;
    insight: Insight;
    data: object[];
    renderOptions?: RenderOptions;
    onView?: (renderResult: RenderResult) => void;
    onError?: (error: any) => void;
    onMount?: (element: HTMLElement) => boolean | void;
}
```

**Properties**

| Name          | Type                                          | Optional |
| ------------- | --------------------------------------------- | -------- |
| viewerOptions | Partial<ViewerOptions>                        | true     |
| insight       | Insight                                       | false    |
| data          | object[]                                      | false    |
| renderOptions | RenderOptions                                 | true     |
| onView        | (renderResult: RenderResult) => void          | true     |
| onError       | (error: any) => void                          | true     |
| onMount       | (element: HTMLElement) => boolean &#124; void | true     |

## Namespaces

### SandDance - instance of [sanddance](../../../sanddance/v3/api)

----------

### [util][NamespaceImport-1]


## Variables

### SandDanceReact

```typescript
const SandDanceReact: typeof SandDanceReact_Class;
```

**Type**

typeof SandDanceReact_Class

----------

### version

```typescript
const version: string;
```

**Type**

string

[SourceFile-0]: index.html#indexts
[FunctionDeclaration-0]: index.html#use
[InterfaceDeclaration-0]: index.html#props
[NamespaceImport-0]: sanddance.html#sanddance
[NamespaceImport-1]: util.html#util
[VariableDeclaration-2]: index.html#sanddancereact
[VariableDeclaration-3]: index.html#version