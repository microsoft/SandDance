---
layout: api
---

# sanddance-react

## Interfaces

### Props

```typescript
interface Props {
    viewerOptions?: Partial<ViewerOptions>;
    insight: Insight;
    data: object[];
    renderOptions?: RenderOptions;
    onView?: (renderResult: RenderResult) => void;
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
| onMount       | (element: HTMLElement) => boolean &#124; void | true     |

## Classes

### [SandDanceReact][ClassDeclaration-0]


## Namespaces

### SandDance - instance of [sanddance](../../../sanddance/v1/api)

----------

### [util][NamespaceImport-1]


## Variables

### version

```typescript
const version: string;
```

**Type**

string

[SourceFile-0]: index#indexts
[InterfaceDeclaration-0]: index#props
[ClassDeclaration-0]: sanddancereact#sanddancereact
[NamespaceImport-0]: sanddance#sanddance
[NamespaceImport-1]: util#util
[VariableDeclaration-2]: index#version