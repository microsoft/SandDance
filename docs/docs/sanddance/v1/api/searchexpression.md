---
layout: api
---

# sanddance .searchExpression

## Functions

### compare

```typescript
function compare(a: Search, b: Search): boolean;
```

**Parameters**

| Name | Type                             |
| ---- | -------------------------------- |
| a    | [Search][TypeAliasDeclaration-0] |
| b    | [Search][TypeAliasDeclaration-0] |

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
| search | [Search][TypeAliasDeclaration-0] |

**Return type**

[Search][TypeAliasDeclaration-0]

----------

### narrow

```typescript
function narrow(a: Search, b: Search): Search;
```

**Parameters**

| Name | Type                             |
| ---- | -------------------------------- |
| a    | [Search][TypeAliasDeclaration-0] |
| b    | [Search][TypeAliasDeclaration-0] |

**Return type**

[Search][TypeAliasDeclaration-0]

[NamespaceImport-1]: searchexpression#searchexpression
[FunctionDeclaration-0]: searchexpression#compare
[TypeAliasDeclaration-0]: types#search
[TypeAliasDeclaration-0]: types#search
[FunctionDeclaration-1]: searchexpression#invert
[TypeAliasDeclaration-0]: types#search
[TypeAliasDeclaration-0]: types#search
[FunctionDeclaration-2]: searchexpression#narrow
[TypeAliasDeclaration-0]: types#search
[TypeAliasDeclaration-0]: types#search
[TypeAliasDeclaration-0]: types#search