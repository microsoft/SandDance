---
layout: api
---

# sanddance .util

## Functions

### isInternalFieldName

```typescript
function isInternalFieldName(columnName: string, includeVegaDeckGLFields: boolean = false): boolean;
```

**Parameters**

| Name                    | Type    | Default value |
| ----------------------- | ------- | ------------- |
| columnName              | string  |               |
| includeVegaDeckGLFields | boolean | false         |

**Return type**

boolean

----------

### getPresenterStyle

```typescript
function getPresenterStyle(options: ViewerOptions): PresenterStyle;
```

**Parameters**

| Name    | Type                                    |
| ------- | --------------------------------------- |
| options | [ViewerOptions][InterfaceDeclaration-4] |

**Return type**

PresenterStyle

[NamespaceImport-4]: util.html#util
[FunctionDeclaration-0]: util.html#isinternalfieldname
[FunctionDeclaration-1]: util.html#getpresenterstyle
[InterfaceDeclaration-4]: types.html#vieweroptions