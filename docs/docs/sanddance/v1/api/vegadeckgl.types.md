---
layout: api
---

# sanddance .VegaDeckGl.types

## Interfaces

### Axis

```typescript
interface Axis {
    domain: StyledLine;
    ticks: StyledLine[];
    tickText: TickText[];
    title?: TextLayerDatum;
}
```

**Properties**

| Name     | Type                                    | Optional |
| -------- | --------------------------------------- | -------- |
| domain   | [StyledLine][InterfaceDeclaration-36]   | false    |
| ticks    | [StyledLine][InterfaceDeclaration-36][] | false    |
| tickText | TickText[]   | false    |
| title    | TextLayerDatum                          | true     |

----------

### Base

References to dependency libraries.

```typescript
interface Base {
    deck: DeckBase;
    layers: DeckLayerBase;
    luma: LumaBase;
    vega: VegaBase;
}
```

**Properties**

| Name   | Type                                     | Optional |
| ------ | ---------------------------------------- | -------- |
| deck   | [DeckBase][InterfaceDeclaration-46]      | false    |
| layers | [DeckLayerBase][InterfaceDeclaration-47] | false    |
| luma   | [LumaBase][InterfaceDeclaration-48]      | false    |
| vega   | [VegaBase][InterfaceDeclaration-45]      | false    |

----------

### Cube

Cuboid information. The cube does not need to have equal dimensions.

```typescript
interface Cube {
    ordinal?: number;
    isEmpty?: boolean;
    color: Color;
    position: [number, number, number]<number, number, number>;
    size: [number, number, number]<number, number, number>;
}
```

**Properties**

| Name     | Type                                             | Optional | Description                                                                                 |
| -------- | ------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------- |
| ordinal  | number                                           | true     | Ordinal position.                                                                           |
| isEmpty  | boolean                                          | true     | Flag whether this cube is a "placeholder" and is not to be rendered nor contains cube data. |
| color    | Color                                            | false    |                                                                                             |
| position | [number, number, number]<number, number, number> | false    |                                                                                             |
| size     | [number, number, number]<number, number, number> | false    |                                                                                             |

----------

### CubeLayerDataProps

```typescript
interface CubeLayerDataProps {
    data: Cube[];
    interpolator?: LinearInterpolator_Class<CubeLayerInterpolatedProps>;
}
```

**Properties**

| Name         | Type                                                                                                  | Optional |
| ------------ | ----------------------------------------------------------------------------------------------------- | -------- |
| data         | [Cube][InterfaceDeclaration-31][]                                                                     | false    |
| interpolator | LinearInterpolator_Class][ClassDeclaration-4]<[CubeLayerInterpolatedProps> | true     |

----------

### CubeLayerDefaultProps

```typescript
interface CubeLayerDefaultProps {
    lightingMix: number;
    fp64?: boolean;
    getColor?: (o: Cube) => number[];
    getSize?: (o: Cube) => number[];
    getPosition?: (o: Cube) => number[];
}
```

**Properties**

| Name        | Type                  | Optional |
| ----------- | --------------------- | -------- |
| lightingMix | number                | false    |
| fp64        | boolean               | true     |
| getColor    | (o: Cube) => number[] | true     |
| getSize     | (o: Cube) => number[] | true     |
| getPosition | (o: Cube) => number[] | true     |

----------

### DeckBase

deck.gl/core dependency.

```typescript
interface DeckBase {
    CompositeLayer: typeof ???;
    COORDINATE_SYSTEM: typeof ???;
    Deck: typeof ???;
    Layer: typeof ???;
    LinearInterpolator: typeof ???;
    OrbitView: typeof ???;
    _OrbitController: typeof ???;
}
```

**Properties**

| Name               | Type       | Optional |
| ------------------ | ---------- | -------- |
| CompositeLayer     | typeof ??? | false    |
| COORDINATE_SYSTEM  | typeof ??? | false    |
| Deck               | typeof ??? | false    |
| Layer              | typeof ??? | false    |
| LinearInterpolator | typeof ??? | false    |
| OrbitView          | typeof ??? | false    |
| _OrbitController   | typeof ??? | false    |

----------

### DeckLayerBase

deck.gl/layers dependency.

```typescript
interface DeckLayerBase {
    IconLayer: typeof ???;
    LineLayer: typeof ???;
    PolygonLayer: typeof ???;
    TextLayer: typeof ???;
}
```

**Properties**

| Name         | Type       | Optional |
| ------------ | ---------- | -------- |
| IconLayer    | typeof ??? | false    |
| LineLayer    | typeof ??? | false    |
| PolygonLayer | typeof ??? | false    |
| TextLayer    | typeof ??? | false    |

----------

### FacetRect

Rect area and title for a facet.

```typescript
interface FacetRect {
    facetTitle?: TextLayerDatum;
    lines: StyledLine[];
}
```

**Properties**

| Name       | Type                                    | Optional |
| ---------- | --------------------------------------- | -------- |
| facetTitle | TextLayerDatum                          | true     |
| lines      | [StyledLine][InterfaceDeclaration-36][] | false    |

----------

### Legend

```typescript
interface Legend {
    title?: string;
    rows: { [index: number]: LegendRow; };
}
```

**Properties**

| Name  | Type                                                       | Optional |
| ----- | ---------------------------------------------------------- | -------- |
| title | string                                                     | true     |
| rows  | { [index: number]: [LegendRow][InterfaceDeclaration-33]; } | false    |

----------

### LegendRow

```typescript
interface LegendRow {
    label?: string;
    value?: string;
    symbol?: LegendRowSymbol;
}
```

**Properties**

| Name   | Type                                       | Optional |
| ------ | ------------------------------------------ | -------- |
| label  | string                                     | true     |
| value  | string                                     | true     |
| symbol | [LegendRowSymbol][InterfaceDeclaration-34] | true     |

----------

### LegendRowSymbol

```typescript
interface LegendRowSymbol {
    bounds: { x1: number; y1: number; x2: number; y2: number; };
    fill: string;
    shape: string;
}
```

**Properties**

| Name   | Type                                                | Optional |
| ------ | --------------------------------------------------- | -------- |
| bounds | { x1: number; y1: number; x2: number; y2: number; } | false    |
| fill   | string                                              | false    |
| shape  | string                                              | false    |

----------

### LumaBase

luma.gl dependency.

```typescript
interface LumaBase {
    CubeGeometry: typeof ???;
    fp64: typeof ???;
    Model: typeof ???;
    Texture2D: typeof ???;
}
```

**Properties**

| Name         | Type       | Optional |
| ------------ | ---------- | -------- |
| CubeGeometry | typeof ??? | false    |
| fp64         | typeof ??? | false    |
| Model        | typeof ??? | false    |
| Texture2D    | typeof ??? | false    |

----------

### PreStage

Function that can be called prior to presenting the stage.

```typescript
interface PreStage {
    (stage: Stage, deckProps: DeckProps): void;
}
```
#### Call

```typescript
(stage: Stage, deckProps: DeckProps): void;
```

**Parameters**

| Name      | Type                             |
| --------- | -------------------------------- |
| stage     | [Stage][InterfaceDeclaration-30] |
| deckProps | DeckProps                        |

**Return type**

void


----------

### PresenterConfig

Configuration options to be used by the Presenter.

```typescript
interface PresenterConfig {
    transitionDurations?: TransitionDurations;
    preStage?: PreStage;
    redraw?: () => void;
    onCubeHover?: (e: MouseEvent | PointerEvent | TouchEvent, cube: Cube) => void;
    onCubeClick?: (e: MouseEvent | PointerEvent | TouchEvent, cube: Cube) => void;
    onLayerClick?: (info: PickInfo, pickedInfos: PickInfo[], e: MouseEvent) => any;
    onLegendClick?: (e: MouseEvent | PointerEvent | TouchEvent, legend: Legend, clickedIndex: number) => void;
    onPresent?: () => void;
    shouldViewstateTransition?: () => boolean;
    preLayer?: (stage: Stage) => void;
    onTextClick?: (e: MouseEvent | PointerEvent | TouchEvent, t: TextLayerDatum) => void;
    onTextHover?: (e: MouseEvent | PointerEvent | TouchEvent, t: TextLayerDatum) => boolean;
    getTextColor?: (o: TextLayerDatum) => Color;
    getTextHighlightColor?: (o: TextLayerDatum) => Color;
}
```

**Properties**

| Name                      | Type                                                                                                | Optional |
| ------------------------- | --------------------------------------------------------------------------------------------------- | -------- |
| transitionDurations       | [TransitionDurations][InterfaceDeclaration-23]                                                      | true     |
| preStage                  | [PreStage][InterfaceDeclaration-55]                                                                 | true     |
| redraw                    | () => void                                                                                          | true     |
| onCubeHover               | (e: MouseEvent &#124; PointerEvent &#124; TouchEvent, cube: Cube) => void                           | true     |
| onCubeClick               | (e: MouseEvent &#124; PointerEvent &#124; TouchEvent, cube: Cube) => void                           | true     |
| onLayerClick              | (info: PickInfo, pickedInfos: PickInfo[], e: MouseEvent) => any                                     | true     |
| onLegendClick             | (e: MouseEvent &#124; PointerEvent &#124; TouchEvent, legend: Legend, clickedIndex: number) => void | true     |
| onPresent                 | () => void                                                                                          | true     |
| shouldViewstateTransition | () => boolean                                                                                       | true     |
| preLayer                  | (stage: Stage) => void                                                                              | true     |
| onTextClick               | (e: MouseEvent &#124; PointerEvent &#124; TouchEvent, t: TextLayerDatum) => void                    | true     |
| onTextHover               | (e: MouseEvent &#124; PointerEvent &#124; TouchEvent, t: TextLayerDatum) => boolean                 | true     |
| getTextColor              | (o: TextLayerDatum) => Color                                                                        | true     |
| getTextHighlightColor     | (o: TextLayerDatum) => Color                                                                        | true     |

----------

### PresenterStyle

```typescript
interface PresenterStyle {
    cssPrefix?: string;
    defaultCubeColor?: Color;
    highlightColor?: Color;
    lightSettings?: { [view extends View]: LightSettings };
    fontFamily?: string;
}
```

**Properties**

| Name             | Type                                                             | Optional |
| ---------------- | ---------------------------------------------------------------- | -------- |
| cssPrefix        | string                                                           | true     |
| defaultCubeColor | Color                                                            | true     |
| highlightColor   | Color                                                            | true     |
| lightSettings    | { [view extends [View][TypeAliasDeclaration-7]]: LightSettings } | true     |
| fontFamily       | string                                                           | true     |

----------

### QueuedAnimationOptions

Options to pass to Presenter.queueAnimation()

```typescript
interface QueuedAnimationOptions {
    waitingLabel?: string;
    handlerLabel?: string;
    animationCanceled?: () => void;
}
```

**Properties**

| Name              | Type       | Optional | Description                                                                       |
| ----------------- | ---------- | -------- | --------------------------------------------------------------------------------- |
| waitingLabel      | string     | true     | Debug label to observe which animation is waiting.                                |
| handlerLabel      | string     | true     | Debug label to observe which handler is invoked.                                  |
| animationCanceled | () => void | true     | Function to invoke if animation was interrupted when another animation is queued. |

----------

### Scene3d

Vega Scene plus camera type.

```typescript
interface Scene3d extends Scene {
    view: View;
}
```

**Extends**

Scene

**Properties**

| Name | Type                           | Optional |
| ---- | ------------------------------ | -------- |
| view | [View][TypeAliasDeclaration-7] | false    |

----------

### Stage

Data structure containing all that is necessary to present a chart.

```typescript
interface Stage {
    backgroundColor?: Color;
    cubeData: Cube[];
    legend?: Legend;
    axes: { x: Axis[]; y: Axis[]; };
    textData: TextLayerDatum[];
    view: View;
    gridLines?: StyledLine[];
    facets?: FacetRect[];
}
```

**Properties**

| Name            | Type                                                                            | Optional |
| --------------- | ------------------------------------------------------------------------------- | -------- |
| backgroundColor | Color                                                                           | true     |
| cubeData        | [Cube][InterfaceDeclaration-31][]                                               | false    |
| legend          | [Legend][InterfaceDeclaration-32]                                               | true     |
| axes            | { x: [Axis][InterfaceDeclaration-35][]; y: [Axis][InterfaceDeclaration-35][]; } | false    |
| textData        | TextLayerDatum[]                                                                | false    |
| view            | [View][TypeAliasDeclaration-7]                                                  | false    |
| gridLines       | [StyledLine][InterfaceDeclaration-36][]                                         | true     |
| facets          | [FacetRect][InterfaceDeclaration-38][]                                          | true     |

----------

### StyledLine

```typescript
interface StyledLine extends LineLayerDatum {
    strokeWidth?: number;
}
```

**Extends**

LineLayerDatum

**Properties**

| Name        | Type   | Optional |
| ----------- | ------ | -------- |
| strokeWidth | number | true     |

----------

### TransitionDurations

Lengths of time for a transition animation.

```typescript
interface TransitionDurations {
    color?: number;
    position?: number;
    size?: number;
    view?: number;
}
```

**Properties**

| Name     | Type   | Optional |
| -------- | ------ | -------- |
| color    | number | true     |
| position | number | true     |
| size     | number | true     |
| view     | number | true     |

----------

### VegaBase

Vega library dependency.

```typescript
interface VegaBase {
    CanvasHandler: CanvasHandler;
    inferType: typeof ???;
    inferTypes: typeof ???;
    loader: typeof ???;
    parse: typeof ???;
    read: typeof ???;
    renderModule: typeof ???;
    Renderer: typeof ???;
    sceneVisit: typeof ???;
    scheme: typeof ???;
    View: typeof ???;
}
```

**Properties**

| Name          | Type          | Optional |
| ------------- | ------------- | -------- |
| CanvasHandler | CanvasHandler | false    |
| inferType     | typeof ???    | false    |
| inferTypes    | typeof ???    | false    |
| loader        | typeof ???    | false    |
| parse         | typeof ???    | false    |
| read          | typeof ???    | false    |
| renderModule  | typeof ???    | false    |
| Renderer      | typeof ???    | false    |
| sceneVisit    | typeof ???    | false    |
| scheme        | typeof ???    | false    |
| View          | typeof ???    | false    |

----------

### ViewGlConfig

Options for the View.

```typescript
interface ViewGlConfig {
    presenter?: Presenter;
    presenterConfig?: PresenterConfig;
    getView?: { (): View; };
}
```

**Properties**

| Name            | Type                                       | Optional |
| --------------- | ------------------------------------------ | -------- |
| presenter       | [Presenter][ClassDeclaration-0]            | true     |
| presenterConfig | [PresenterConfig][InterfaceDeclaration-54] | true     |
| getView         | { (): [View][TypeAliasDeclaration-7]; }    | true     |

## Types

### CubeLayerProps

```typescript
type CubeLayerProps = LayerProps & CubeLayerDefaultProps & CubeLayerDataProps;
```

**Type**

LayerProps & [CubeLayerDefaultProps][InterfaceDeclaration-63] & [CubeLayerDataProps][InterfaceDeclaration-60]

----------

### Vec3

3 dimensional array of numbers.

```typescript
type Vec3 = [number, number, number];
```

**Type**

[number, number, number]

----------

### View

Types of camera views.

```typescript
type View = "2d" | "3d";
```

**Type**

"2d" | "3d"

[NamespaceImport-8]: vegadeckgl.types#types
[InterfaceDeclaration-35]: vegadeckgl.types#axis
[InterfaceDeclaration-36]: vegadeckgl.types#styledline
[InterfaceDeclaration-36]: vegadeckgl.types#styledline
[InterfaceDeclaration-50]: vegadeckgl.types#base
[InterfaceDeclaration-46]: vegadeckgl.types#deckbase
[InterfaceDeclaration-47]: vegadeckgl.types#decklayerbase
[InterfaceDeclaration-48]: vegadeckgl.types#lumabase
[InterfaceDeclaration-45]: vegadeckgl.types#vegabase
[InterfaceDeclaration-31]: vegadeckgl.types#cube
[InterfaceDeclaration-60]: vegadeckgl.types#cubelayerdataprops
[InterfaceDeclaration-31]: vegadeckgl.types#cube
[InterfaceDeclaration-63]: vegadeckgl.types#cubelayerdefaultprops
[InterfaceDeclaration-46]: vegadeckgl.types#deckbase
[InterfaceDeclaration-47]: vegadeckgl.types#decklayerbase
[InterfaceDeclaration-38]: vegadeckgl.types#facetrect
[InterfaceDeclaration-36]: vegadeckgl.types#styledline
[InterfaceDeclaration-32]: vegadeckgl.types#legend
[InterfaceDeclaration-33]: vegadeckgl.types#legendrow
[InterfaceDeclaration-33]: vegadeckgl.types#legendrow
[InterfaceDeclaration-34]: vegadeckgl.types#legendrowsymbol
[InterfaceDeclaration-34]: vegadeckgl.types#legendrowsymbol
[InterfaceDeclaration-48]: vegadeckgl.types#lumabase
[InterfaceDeclaration-55]: vegadeckgl.types#prestage
[InterfaceDeclaration-30]: vegadeckgl.types#stage
[InterfaceDeclaration-54]: vegadeckgl.types#presenterconfig
[InterfaceDeclaration-23]: vegadeckgl.types#transitiondurations
[InterfaceDeclaration-55]: vegadeckgl.types#prestage
[InterfaceDeclaration-49]: vegadeckgl.types#presenterstyle
[TypeAliasDeclaration-7]: vegadeckgl.types#view
[InterfaceDeclaration-52]: vegadeckgl.types#queuedanimationoptions
[InterfaceDeclaration-53]: vegadeckgl.types#scene3d
[TypeAliasDeclaration-7]: vegadeckgl.types#view
[InterfaceDeclaration-30]: vegadeckgl.types#stage
[InterfaceDeclaration-31]: vegadeckgl.types#cube
[InterfaceDeclaration-32]: vegadeckgl.types#legend
[InterfaceDeclaration-35]: vegadeckgl.types#axis
[InterfaceDeclaration-35]: vegadeckgl.types#axis
[TypeAliasDeclaration-7]: vegadeckgl.types#view
[InterfaceDeclaration-36]: vegadeckgl.types#styledline
[InterfaceDeclaration-38]: vegadeckgl.types#facetrect
[InterfaceDeclaration-36]: vegadeckgl.types#styledline
[InterfaceDeclaration-23]: vegadeckgl.types#transitiondurations
[InterfaceDeclaration-45]: vegadeckgl.types#vegabase
[InterfaceDeclaration-56]: vegadeckgl.types#viewglconfig
[ClassDeclaration-0]: vegadeckgl.presenter#presenter
[InterfaceDeclaration-54]: vegadeckgl.types#presenterconfig
[TypeAliasDeclaration-7]: vegadeckgl.types#view
[TypeAliasDeclaration-9]: vegadeckgl.types#cubelayerprops
[InterfaceDeclaration-63]: vegadeckgl.types#cubelayerdefaultprops
[InterfaceDeclaration-60]: vegadeckgl.types#cubelayerdataprops
[TypeAliasDeclaration-10]: vegadeckgl.types#vec3
[TypeAliasDeclaration-7]: vegadeckgl.types#view