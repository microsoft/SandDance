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

### desaturate

```typescript
function desaturate(color: Color, value: number): Color;
```

**Parameters**

| Name  | Type   |
| ----- | ------ |
| color | Color  |
| value | number |

**Return type**

Color

----------

### isColor

```typescript
function isColor(cssColorSpecifier: string): boolean;
```

**Parameters**

| Name              | Type   |
| ----------------- | ------ |
| cssColorSpecifier | string |

**Return type**

boolean

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

[NamespaceImport-4]: util.html#util
[FunctionDeclaration-2]: util.html#adddiv
[FunctionDeclaration-3]: util.html#addel
[FunctionDeclaration-4]: util.html#clone
[FunctionDeclaration-5]: util.html#colorfromstring
[FunctionDeclaration-6]: util.html#colorisequal
[FunctionDeclaration-7]: util.html#colortostring
[FunctionDeclaration-8]: util.html#deepmerge
[FunctionDeclaration-9]: util.html#desaturate
[FunctionDeclaration-10]: util.html#iscolor
[FunctionDeclaration-11]: util.html#getcubelayer
[FunctionDeclaration-12]: util.html#getcubes
[InterfaceDeclaration-7]: types.html#cube
[FunctionDeclaration-13]: util.html#outersize