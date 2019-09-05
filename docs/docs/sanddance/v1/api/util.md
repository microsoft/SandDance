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

### getColumnsFromData

Derive column metadata from the data array.

```typescript
function getColumnsFromData(data: object[], columnTypes?: ColumnTypeMap): Column[];
```

**Parameters**

| Name        | Type                                    | Description            |
| ----------- | --------------------------------------- | ---------------------- |
| data        | object[]                                | Array of data objects. |
| columnTypes | [ColumnTypeMap][InterfaceDeclaration-5] |                        |

**Return type**

[Column][InterfaceDeclaration-3][]

----------

### inferAll

Populate columns with type inferences and stats.

```typescript
function inferAll(columns: Column[], data: object[]): void;
```

**Parameters**

| Name    | Type                               | Description            |
| ------- | ---------------------------------- | ---------------------- |
| columns | [Column][InterfaceDeclaration-3][] | Array of columns.      |
| data    | object[]                           | Array of data objects. |

**Return type**

void

----------

### ensureSearchExpressionGroupArray

```typescript
function ensureSearchExpressionGroupArray(search: Search): SearchExpressionGroup<SearchExpression>[];
```

**Parameters**

| Name   | Type                             |
| ------ | -------------------------------- |
| search | [Search][TypeAliasDeclaration-3] |

**Return type**

[SearchExpressionGroup][InterfaceDeclaration-2]<[SearchExpression][InterfaceDeclaration-1]>[]

----------

### getPresenterStyle

```typescript
function getPresenterStyle(options: ViewerOptions): PresenterStyle;
```

**Parameters**

| Name    | Type                                     |
| ------- | ---------------------------------------- |
| options | [ViewerOptions][InterfaceDeclaration-23] |

**Return type**

[PresenterStyle][InterfaceDeclaration-48]

[NamespaceImport-3]: util#util
[FunctionDeclaration-6]: util#isinternalfieldname
[FunctionDeclaration-7]: util#getcolumnsfromdata
[InterfaceDeclaration-5]: types#columntypemap
[InterfaceDeclaration-3]: types#column
[FunctionDeclaration-8]: util#inferall
[InterfaceDeclaration-3]: types#column
[FunctionDeclaration-9]: util#ensuresearchexpressiongrouparray
[TypeAliasDeclaration-3]: types#search
[InterfaceDeclaration-1]: types#searchexpression
[InterfaceDeclaration-2]: types#searchexpressiongroup
[FunctionDeclaration-10]: util#getpresenterstyle
[InterfaceDeclaration-23]: types#vieweroptions
[InterfaceDeclaration-48]: vegadeckgl/types#presenterstyle