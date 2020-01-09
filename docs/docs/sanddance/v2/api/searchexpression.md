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
| a    | [Search][TypeAliasDeclaration-4] |
| b    | [Search][TypeAliasDeclaration-4] |

**Return type**

boolean

----------

### startsWith

```typescript
function startsWith(whole: Search, part: Search): boolean;
```

**Parameters**

| Name  | Type                             |
| ----- | -------------------------------- |
| whole | [Search][TypeAliasDeclaration-4] |
| part  | [Search][TypeAliasDeclaration-4] |

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
| search | [Search][TypeAliasDeclaration-4] |

**Return type**

[Search][TypeAliasDeclaration-4]

----------

### narrow

```typescript
function narrow(a: Search, b: Search): Search;
```

**Parameters**

| Name | Type                             |
| ---- | -------------------------------- |
| a    | [Search][TypeAliasDeclaration-4] |
| b    | [Search][TypeAliasDeclaration-4] |

**Return type**

[Search][TypeAliasDeclaration-4]

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
[TypeAliasDeclaration-4]: types.html#search
[TypeAliasDeclaration-4]: types.html#search
[FunctionDeclaration-3]: searchexpression.html#startswith
[TypeAliasDeclaration-4]: types.html#search
[TypeAliasDeclaration-4]: types.html#search
[FunctionDeclaration-4]: searchexpression.html#invert
[TypeAliasDeclaration-4]: types.html#search
[TypeAliasDeclaration-4]: types.html#search
[FunctionDeclaration-5]: searchexpression.html#narrow
[TypeAliasDeclaration-4]: types.html#search
[TypeAliasDeclaration-4]: types.html#search
[TypeAliasDeclaration-4]: types.html#search