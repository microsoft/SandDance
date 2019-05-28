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

[NamespaceImport-1]: searchexpression#searchexpression
[FunctionDeclaration-0]: searchexpression#compareexpression
[InterfaceDeclaration-1]: types#searchexpression
[InterfaceDeclaration-1]: types#searchexpression
[FunctionDeclaration-1]: searchexpression#comparegroup
[InterfaceDeclaration-1]: types#searchexpression
[InterfaceDeclaration-2]: types#searchexpressiongroup
[InterfaceDeclaration-1]: types#searchexpression
[InterfaceDeclaration-2]: types#searchexpressiongroup
[FunctionDeclaration-2]: searchexpression#compare
[TypeAliasDeclaration-3]: types#search
[TypeAliasDeclaration-3]: types#search
[FunctionDeclaration-3]: searchexpression#invert
[TypeAliasDeclaration-3]: types#search
[TypeAliasDeclaration-3]: types#search
[FunctionDeclaration-4]: searchexpression#narrow
[TypeAliasDeclaration-3]: types#search
[TypeAliasDeclaration-3]: types#search
[TypeAliasDeclaration-3]: types#search