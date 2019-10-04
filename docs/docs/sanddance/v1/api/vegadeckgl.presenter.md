---
layout: api
---

# sanddance .VegaDeckGl.Presenter

Class which presents a Stage of chart data using Deck.gl to render.

```typescript
class Presenter
```
## Constructor

### constructor(el, style)

Instantiate a new Presenter.

```typescript
public constructor(el: HTMLElement, style?: PresenterStyle);
```

**Parameters**

| Name  | Type                                      | Description                              |
| ----- | ----------------------------------------- | ---------------------------------------- |
| el    | HTMLElement                               | Parent HTMLElement to present within.    |
| style | [PresenterStyle][InterfaceDeclaration-49] | Optional PresenterStyle styling options. |

## Methods

### animationCancel()

Cancels any pending animation, calling animationCanceled() on original queue.

```typescript
public animationCancel(): void;
```

**Return type**

void

----------

### animationQueue(handler, timeout, options)

Stops the current animation and queues a new animation.

```typescript
public animationQueue(handler: () => void, timeout: number, options?: QueuedAnimationOptions): void;
```

**Parameters**

| Name    | Type                                              | Description                                         |
| ------- | ------------------------------------------------- | --------------------------------------------------- |
| handler | () => void                                        | Function to invoke when timeout is complete.        |
| timeout | number                                            | Length of time to wait before invoking the handler. |
| options | [QueuedAnimationOptions][InterfaceDeclaration-52] | Optional QueuedAnimationOptions object.             |

**Return type**

void

----------

### getElement(type)

Retrieve a sub-element of the rendered output.

```typescript
public getElement(type: PresenterElement): HTMLElement;
```

**Parameters**

| Name | Type                                  | Description                                           |
| ---- | ------------------------------------- | ----------------------------------------------------- |
| type | [PresenterElement][EnumDeclaration-0] | PresenterElement type of the HTMLElement to retrieve. |

**Return type**

HTMLElement

----------

### present(sceneOrStage, height, width, config)

Present the Vega Scene, or Stage object using Deck.gl.

```typescript
public present(sceneOrStage: Scene3d | Stage, height: number, width: number, config?: PresenterConfig): void;
```

**Parameters**

| Name         | Type                                                                       | Description                                                      |
| ------------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| sceneOrStage | [Scene3d][InterfaceDeclaration-53] &#124; [Stage][InterfaceDeclaration-30] | Vega Scene object, or Stage object containing chart layout info. |
| height       | number                                                                     | Height of the rendering area.                                    |
| width        | number                                                                     | Width of the rendering area.                                     |
| config       | [PresenterConfig][InterfaceDeclaration-54]                                 | Optional presentation configuration object.                      |

**Return type**

void

----------

### rePresent(stage, modifyConfig)

Present the same recently rendered Stage with only slight modifications such as a color change,
using the previous Stage values as a basis.

```typescript
public rePresent(stage: Partial<Stage>, modifyConfig?: PresenterConfig): void;
```

**Parameters**

| Name         | Type                                       | Description                                          |
| ------------ | ------------------------------------------ | ---------------------------------------------------- |
| stage        | Partial<[Stage][InterfaceDeclaration-30]>  | Partially populated Stage object containing changes. |
| modifyConfig | [PresenterConfig][InterfaceDeclaration-54] | Optional presentation configuration object.          |

**Return type**

void

----------

### homeCamera()

Home the camera to the last initial position.

```typescript
public homeCamera(): void;
```

**Return type**

void

----------

### getCubeData()

Get cube data array from the cubes layer.

```typescript
public getCubeData(): Cube[];
```

**Return type**

[Cube][InterfaceDeclaration-31][]

----------

### showGuides()

Show guidelines of rendering height/width and center of OrbitView.

```typescript
public showGuides(): void;
```

**Return type**

void

----------

### finalize()

```typescript
public finalize(): void;
```

**Return type**

void

## Properties

### animationTimer

Handle of the timer for animation.

```typescript
public animationTimer: number;
```

**Type**

number

----------

### deckgl

Deck.gl instance for rendering WebGL.

```typescript
public deckgl: DeckGL_Class;
```

**Type**

DeckGL_Class

----------

### logger

Logger, such as console.log

```typescript
public logger: (message?: any, optionalParams: any[]) => void;
```

**Type**

(message?: any, optionalParams: any[]) => void

----------

### stage

Get the previously rendered Stage object.

```typescript
public get stage: Stage;
```

**Type**

[Stage][InterfaceDeclaration-30]

----------

### style

Options for styling the output.

```typescript
public style: PresenterStyle;
```

**Type**

[PresenterStyle][InterfaceDeclaration-49]

----------

### view

Get the current View camera type.

```typescript
public get view: View;
```

**Type**

[View][TypeAliasDeclaration-7]

[ClassDeclaration-0]: vegadeckgl.presenter#presenter
[Constructor-0]: vegadeckgl.presenter#constructorel-style
[InterfaceDeclaration-49]: vegadeckgl.types#presenterstyle
[MethodDeclaration-0]: vegadeckgl.presenter#animationcancel
[MethodDeclaration-1]: vegadeckgl.presenter#animationqueuehandler-timeout-options
[InterfaceDeclaration-52]: vegadeckgl.types#queuedanimationoptions
[MethodDeclaration-2]: vegadeckgl.presenter#getelementtype
[EnumDeclaration-0]: vegadeckgl#presenterelement
[MethodDeclaration-3]: vegadeckgl.presenter#presentsceneorstage-height-width-config
[InterfaceDeclaration-53]: vegadeckgl.types#scene3d
[InterfaceDeclaration-30]: vegadeckgl.types#stage
[InterfaceDeclaration-54]: vegadeckgl.types#presenterconfig
[MethodDeclaration-4]: vegadeckgl.presenter#representstage-modifyconfig
[InterfaceDeclaration-30]: vegadeckgl.types#stage
[InterfaceDeclaration-54]: vegadeckgl.types#presenterconfig
[MethodDeclaration-5]: vegadeckgl.presenter#homecamera
[MethodDeclaration-6]: vegadeckgl.presenter#getcubedata
[InterfaceDeclaration-31]: vegadeckgl.types#cube
[MethodDeclaration-7]: vegadeckgl.presenter#showguides
[MethodDeclaration-8]: vegadeckgl.presenter#finalize
[PropertyDeclaration-0]: vegadeckgl.presenter#animationtimer
[PropertyDeclaration-1]: vegadeckgl.presenter#deckgl
[PropertyDeclaration-3]: vegadeckgl.presenter#logger
[GetAccessor-0]: vegadeckgl.presenter#stage
[InterfaceDeclaration-30]: vegadeckgl.types#stage
[PropertyDeclaration-4]: vegadeckgl.presenter#style
[InterfaceDeclaration-49]: vegadeckgl.types#presenterstyle
[GetAccessor-1]: vegadeckgl.presenter#view
[TypeAliasDeclaration-7]: vegadeckgl.types#view