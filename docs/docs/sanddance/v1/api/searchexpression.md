---
layout: api
---

# sanddance .searchExpression

## Functions

### compareExpression

```typescript
function compareExpression(a: SearchExpression, b: SearchExpression): boolean;
```

**Parameters**

| Name | Type                                       |
| ---- | ------------------------------------------ |
| a    | [SearchExpression][InterfaceDeclaration-1] |
| b    | [SearchExpression][InterfaceDeclaration-1] |

**Return type**

boolean

----------

### compareGroup

```typescript
function compareGroup(a: SearchExpressionGroup<SearchExpression>, b: SearchExpressionGroup<SearchExpression>): boolean;
```

**Parameters**

| Name | Type                                                                                        |
| ---- | ------------------------------------------------------------------------------------------- |
| a    | [SearchExpressionGroup][InterfaceDeclaration-2]<[SearchExpression][InterfaceDeclaration-1]> |
| b    | [SearchExpressionGroup][InterfaceDeclaration-2]<[SearchExpression][InterfaceDeclaration-1]> |

**Return type**

boolean

----------

### compare

```typescript
function compare(a: Search, b: Search): boolean;
```

**Parameters**

| Name | Type                             |
| ---- | -------------------------------- |
| a    | [Search][TypeAliasDeclaration-3] |
| b    | [Search][TypeAliasDeclaration-3] |

**Return type**

boolean

----------

### invert

```typescript
function invert(search: Search): Search;
```

**Parameters**

| Name   | Type                             |
| ------ | -------------------------------- |
| search | [Search][TypeAliasDeclaration-3] |

**Return type**

[Search][TypeAliasDeclaration-3]

----------

### narrow

```typescript
function narrow(a: Search, b: Search): Search;
```

**Parameters**

| Name | Type                             |
| ---- | -------------------------------- |
| a    | [Search][TypeAliasDeclaration-3] |
| b    | [Search][TypeAliasDeclaration-3] |

**Return type**

[Search][TypeAliasDeclaration-3]

[NamespaceImport-1]: searchexpression.html#searchexpression
[FunctionDeclaration-0]: searchexpression.html#compareexpression
[InterfaceDeclaration-1]: types.html#searchexpression
[InterfaceDeclaration-1]: types.html#searchexpression
[FunctionDeclaration-1]: searchexpression.html#comparegroup
[InterfaceDeclaration-1]: types.html#searchexpression
[InterfaceDeclaration-2]: types.html#searchexpressiongroup
[InterfaceDeclaration-1]: types.html#searchexpression
[InterfaceDeclaration-2]: types.html#searchexpressiongroup
[FunctionDeclaration-2]: searchexpression.html#compare
[TypeAliasDeclaration-3]: types.html#search
[TypeAliasDeclaration-3]: types.html#search
[FunctionDeclaration-3]: searchexpression.html#invert
[TypeAliasDeclaration-3]: types.html#search
[TypeAliasDeclaration-3]: types.html#search
[FunctionDeclaration-4]: searchexpression.html#narrow
[TypeAliasDeclaration-3]: types.html#search
[TypeAliasDeclaration-3]: types.html#search
[TypeAliasDeclaration-3]: types.html#search