---
layout: api
---

# sanddance .VegaDeckGl.util

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

Convert a CSS color string to a Deck.gl Color array - (The rgba color of each object, in r, g, b, [a]. Each component is in the 0-255 range.).

```typescript
function colorFromString(cssColorSpecifier: string): Color;
```

**Parameters**

| Name              | Type   | Description                                  |
| ----------------- | ------ | -------------------------------------------- |
| cssColorSpecifier | string | A CSS Color Module Level 3 specifier string. |

**Return type**

Color

----------

### colorIsEqual

Compares 2 colors to see if they are equal.

```typescript
function colorIsEqual(a: Color, b: Color): boolean;
```

**Parameters**

| Name | Type  | Description      |
| ---- | ----- | ---------------- |
| a    | Color | Color to compare |
| b    | Color | Color to compare |

**Return type**

boolean

----------

### colorToString

Convert a Deck.gl color to a CSS rgba() string.

```typescript
function colorToString(color: Color): string;
```

**Parameters**

| Name  | Type  | Description                                                                                                     |
| ----- | ----- | --------------------------------------------------------------------------------------------------------------- |
| color | Color | A Deck.gl Color array - (The rgba color of each object, in r, g, b, [a]. Each component is in the 0-255 range.) |

**Return type**

string

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

### getCubeLayer

```typescript
function getCubeLayer(deckProps: DeckProps): default;
```

**Parameters**

| Name      | Type      |
| --------- | --------- |
| deckProps | DeckProps |

**Return type**

default

----------

### getCubes

```typescript
function getCubes(deckProps: DeckProps): Cube[];
```

**Parameters**

| Name      | Type      |
| --------- | --------- |
| deckProps | DeckProps |

**Return type**

[Cube][InterfaceDeclaration-30][]

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

[NamespaceImport-8]: vegadeckgl.util#util
[FunctionDeclaration-11]: vegadeckgl.util#adddiv
[FunctionDeclaration-12]: vegadeckgl.util#addel
[FunctionDeclaration-13]: vegadeckgl.util#clone
[FunctionDeclaration-14]: vegadeckgl.util#colorfromstring
[FunctionDeclaration-15]: vegadeckgl.util#colorisequal
[FunctionDeclaration-16]: vegadeckgl.util#colortostring
[FunctionDeclaration-17]: vegadeckgl.util#deepmerge
[FunctionDeclaration-18]: vegadeckgl.util#getcubelayer
[FunctionDeclaration-19]: vegadeckgl.util#getcubes
[InterfaceDeclaration-30]: vegadeckgl.types#cube
[FunctionDeclaration-20]: vegadeckgl.util#outersize