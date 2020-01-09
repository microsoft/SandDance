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

### getStats

```typescript
function getStats(data: object[], column: Column): ColumnStats;
```

**Parameters**

| Name   | Type                             |
| ------ | -------------------------------- |
| data   | object[]                         |
| column | [Column][InterfaceDeclaration-3] |

**Return type**

[ColumnStats][InterfaceDeclaration-4]

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
| search | [Search][TypeAliasDeclaration-4] |

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

PresenterStyle

[NamespaceImport-3]: util.html#util
[FunctionDeclaration-6]: util.html#isinternalfieldname
[FunctionDeclaration-7]: util.html#getcolumnsfromdata
[InterfaceDeclaration-5]: types.html#columntypemap
[InterfaceDeclaration-3]: types.html#column
[FunctionDeclaration-8]: util.html#getstats
[InterfaceDeclaration-3]: types.html#column
[InterfaceDeclaration-4]: types.html#columnstats
[FunctionDeclaration-9]: util.html#inferall
[InterfaceDeclaration-3]: types.html#column
[FunctionDeclaration-10]: util.html#ensuresearchexpressiongrouparray
[TypeAliasDeclaration-4]: types.html#search
[InterfaceDeclaration-1]: types.html#searchexpression
[InterfaceDeclaration-2]: types.html#searchexpressiongroup
[FunctionDeclaration-11]: util.html#getpresenterstyle
[InterfaceDeclaration-23]: types.html#vieweroptions