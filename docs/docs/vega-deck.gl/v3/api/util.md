---
layout: api
---

# vega-deck.gl .util

## Functions

### addDiv

Create a new div HTMLElement as a child of another element.

```typescript
function addDiv(parentElement: HTMLElement, className?: string): HTMLDivElement;
```

**Parameters**

| Name          | Type        | Description                                  |
| ------------- | ----------- | -------------------------------------------- |
| parentElement | HTMLElement | Reference of the element to append to.       |
| className     | string      | Optional css class name to apply to the div. |

**Return type**

HTMLDivElement

----------

### addEl

Create a new element as a child of another element.

```typescript
function addEl(tagName: string, parentElement: HTMLElement): HTMLElement;
```

**Parameters**

| Name          | Type        | Description                            |
| ------------- | ----------- | -------------------------------------- |
| tagName       | string      | Tag name of the new tag to create.     |
| parentElement | HTMLElement | Reference of the element to append to. |

**Return type**

HTMLElement

----------

### allTruthy

Returns array with items which are truthy.

```typescript
function allTruthy<T>(args: T[][]): T[];
```

**Type parameters**

| Name |
| ---- |
| T    |

**Parameters**

| Name | Type  | Description                                    |
| ---- | ----- | ---------------------------------------------- |
| args | T[][] | array or arrays to concat into a single array. |

**Return type**

T[]

----------

### clone

```typescript
function clone<T extends object>(objectToClone: T): T;
```

**Type parameters**

| Name | Constraint |
| ---- | ---------- |
| T    | object     |

**Parameters**

| Name          | Type |
| ------------- | ---- |
| objectToClone | T    |

**Return type**

T

----------

### colorFromString

Convert a CSS color string to a Deck.gl RGBAColor array - (The rgba color of each object, in r, g, b, [a]. Each component is in the 0-255 range.).

```typescript
function colorFromString(cssColorSpecifier: string): RGBAColor<number, number, number, number>;
```

**Parameters**

| Name              | Type   | Description                                  |
| ----------------- | ------ | -------------------------------------------- |
| cssColorSpecifier | string | A CSS Color Module Level 3 specifier string. |

**Return type**

RGBAColor<number, number, number, number>

----------

### colorIsEqual

Compares 2 colors to see if they are equal.

```typescript
function colorIsEqual(a: RGBAColor<number, number, number, number>, b: RGBAColor<number, number, number, number>): boolean;
```

**Parameters**

| Name | Type                                      | Description          |
| ---- | ----------------------------------------- | -------------------- |
| a    | RGBAColor<number, number, number, number> | RGBAColor to compare |
| b    | RGBAColor<number, number, number, number> | RGBAColor to compare |

**Return type**

boolean

----------

### colorToString

Convert a Deck.gl color to a CSS rgba() string.

```typescript
function colorToString(color: RGBAColor<number, number, number, number>): string;
```

**Parameters**

| Name  | Type                                      | Description                                                                                                         |
| ----- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| color | RGBAColor<number, number, number, number> | A Deck.gl RGBAColor array - (The rgba color of each object, in r, g, b, [a]. Each component is in the 0-255 range.) |

**Return type**

string

----------

### concat

```typescript
function concat<T>(args: T[][]): T[];
```

**Type parameters**

| Name |
| ---- |
| T    |

**Parameters**

| Name | Type  |
| ---- | ----- |
| args | T[][] |

**Return type**

T[]

----------

### deepMerge

```typescript
function deepMerge<T>(objectsToMerge: T[]): T;
```

**Type parameters**

| Name |
| ---- |
| T    |

**Parameters**

| Name           | Type |
| -------------- | ---- |
| objectsToMerge | T[]  |

**Return type**

T

----------

### desaturate

```typescript
function desaturate(color: RGBAColor<number, number, number, number>, value: number): RGBAColor<number, number, number, number>;
```

**Parameters**

| Name  | Type                                      |
| ----- | ----------------------------------------- |
| color | RGBAColor<number, number, number, number> |
| value | number                                    |

**Return type**

RGBAColor<number, number, number, number>

----------

### getCubeLayer

```typescript
function getCubeLayer(deckProps: Partial<DeckProps>): default<any>;
```

**Parameters**

| Name      | Type               |
| --------- | ------------------ |
| deckProps | Partial<DeckProps> |

**Return type**

default<any>

----------

### getCubes

```typescript
function getCubes(deckProps: Partial<DeckProps>): Cube[];
```

**Parameters**

| Name      | Type               |
| --------- | ------------------ |
| deckProps | Partial<DeckProps> |

**Return type**

[Cube][InterfaceDeclaration-7][]

----------

### outerSize

Measure the outer height and width of an HTMLElement, including margin, padding and border.

```typescript
function outerSize(el: HTMLElement): { };
```

**Parameters**

| Name | Type        | Description              |
| ---- | ----------- | ------------------------ |
| el   | HTMLElement | HTML Element to measure. |

**Return type**

{ }

----------

### push

Add an array to an existing array in place.

```typescript
function push<T>(arr: T[], items: T[]): void;
```

**Type parameters**

| Name |
| ---- |
| T    |

**Parameters**

| Name  | Type | Description               |
| ----- | ---- | ------------------------- |
| arr   | T[]  | Array to append to.       |
| items | T[]  | Arrof of items to append. |

**Return type**

void

[NamespaceImport-4]: util.html#util
[FunctionDeclaration-2]: util.html#adddiv
[FunctionDeclaration-3]: util.html#addel
[FunctionDeclaration-4]: util.html#alltruthy
[FunctionDeclaration-5]: util.html#clone
[FunctionDeclaration-6]: util.html#colorfromstring
[FunctionDeclaration-7]: util.html#colorisequal
[FunctionDeclaration-8]: util.html#colortostring
[FunctionDeclaration-9]: util.html#concat
[FunctionDeclaration-10]: util.html#deepmerge
[FunctionDeclaration-11]: util.html#desaturate
[FunctionDeclaration-12]: util.html#getcubelayer
[FunctionDeclaration-13]: util.html#getcubes
[InterfaceDeclaration-7]: types.html#cube
[FunctionDeclaration-14]: util.html#outersize
[FunctionDeclaration-15]: util.html#push