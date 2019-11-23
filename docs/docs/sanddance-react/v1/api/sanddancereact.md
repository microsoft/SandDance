---
layout: api
---

# sanddance-react .SandDanceReact

```typescript
class SandDanceReact
```
## Methods

### componentDidMount()

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

```typescript
public componentDidMount(): void;
```

**Return type**

void

----------

### componentDidUpdate()

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

```typescript
public componentDidUpdate(): void;
```

**Return type**

void

----------

### componentWillUnmount()

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

```typescript
public componentWillUnmount(): void;
```

**Return type**

void

----------

### render()

```typescript
public render(): Element;
```

**Return type**

Element

## Properties

### viewer

```typescript
public viewer: Viewer;
```

**Type**

Viewer

[ClassDeclaration-0]: sanddancereact.html#sanddancereact
[MethodDeclaration-0]: sanddancereact.html#componentdidmount
[MethodDeclaration-1]: sanddancereact.html#componentdidupdate
[MethodDeclaration-2]: sanddancereact.html#componentwillunmount
[MethodDeclaration-3]: sanddancereact.html#render
[PropertyDeclaration-0]: sanddancereact.html#viewer