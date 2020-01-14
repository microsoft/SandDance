---
layout: api
---

# vega-deck.gl .types

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
| domain   | [StyledLine][InterfaceDeclaration-12]   | false    |
| ticks    | [StyledLine][InterfaceDeclaration-12][] | false    |
| tickText | [TickText][InterfaceDeclaration-13][]   | false    |
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

| Name   | Type                                    | Optional |
| ------ | --------------------------------------- | -------- |
| deck   | [DeckBase][InterfaceDeclaration-1]      | false    |
| layers | [DeckLayerBase][InterfaceDeclaration-2] | false    |
| luma   | [LumaBase][InterfaceDeclaration-3]      | false    |
| vega   | [VegaBase][InterfaceDeclaration-4]      | false    |

----------

### Cube

Cuboid information. The cube does not need to have equal dimensions.

```typescript
interface Cube {
    ordinal?: number;
    isEmpty?: boolean;
    color: Color;
    position: Vec3<number, number, number>;
    size: Vec3<number, number, number>;
}
```

**Properties**

| Name     | Type                                                   | Optional | Description                                                                                 |
| -------- | ------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------- |
| ordinal  | number                                                 | true     | Ordinal position.                                                                           |
| isEmpty  | boolean                                                | true     | Flag whether this cube is a "placeholder" and is not to be rendered nor contains cube data. |
| color    | Color                                                  | false    |                                                                                             |
| position | [Vec3][TypeAliasDeclaration-0]<number, number, number> | false    |                                                                                             |
| size     | [Vec3][TypeAliasDeclaration-0]<number, number, number> | false    |                                                                                             |

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
| data         | [Cube][InterfaceDeclaration-7][]                                                                      | false    |
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
| lines      | [StyledLine][InterfaceDeclaration-12][] | false    |

----------

### Legend

```typescript
interface Legend {
    title?: string;
    rows: { [index: number]: LegendRow; };
}
```

**Properties**

| Name  | Type                                                      | Optional |
| ----- | --------------------------------------------------------- | -------- |
| title | string                                                    | true     |
| rows  | { [index: number]: [LegendRow][InterfaceDeclaration-9]; } | false    |

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
| symbol | [LegendRowSymbol][InterfaceDeclaration-10] | true     |

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

| Name      | Type                            |
| --------- | ------------------------------- |
| stage     | [Stage][InterfaceDeclaration-6] |
| deckProps | DeckProps                       |

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
| transitionDurations       | [TransitionDurations][InterfaceDeclaration-19]                                                      | true     |
| preStage                  | [PreStage][InterfaceDeclaration-20]                                                                 | true     |
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
| lightSettings    | { [view extends [View][TypeAliasDeclaration-1]]: LightSettings } | true     |
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
| view | [View][TypeAliasDeclaration-1] | false    |

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
| cubeData        | [Cube][InterfaceDeclaration-7][]                                                | false    |
| legend          | [Legend][InterfaceDeclaration-8]                                                | true     |
| axes            | { x: [Axis][InterfaceDeclaration-11][]; y: [Axis][InterfaceDeclaration-11][]; } | false    |
| textData        | TextLayerDatum[]                                                                | false    |
| view            | [View][TypeAliasDeclaration-1]                                                  | false    |
| gridLines       | [StyledLine][InterfaceDeclaration-12][]                                         | true     |
| facets          | [FacetRect][InterfaceDeclaration-14][]                                          | true     |

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

### TickText

```typescript
interface TickText extends TextLayerDatum {
    value: number | string;
}
```

**Extends**

TextLayerDatum

**Properties**

| Name  | Type                 | Optional |
| ----- | -------------------- | -------- |
| value | number &#124; string | false    |

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

| Name          | Type            | Optional |
| ------------- | --------------- | -------- |
| CanvasHandler | CanvasHandler | false    |
| inferType     | typeof ???      | false    |
| inferTypes    | typeof ???      | false    |
| loader        | typeof ???      | false    |
| parse         | typeof ???      | false    |
| read          | typeof ???      | false    |
| renderModule  | typeof ???      | false    |
| Renderer      | typeof ???      | false    |
| sceneVisit    | typeof ???      | false    |
| scheme        | typeof ???      | false    |
| View          | typeof ???      | false    |

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
| presenter       | [Presenter][ClassDeclaration-0]          | true     |
| presenterConfig | [PresenterConfig][InterfaceDeclaration-18] | true     |
| getView         | { (): [View][TypeAliasDeclaration-1]; }    | true     |

## Types

### CubeLayerProps

```typescript
type CubeLayerProps = LayerProps & CubeLayerDefaultProps & CubeLayerDataProps;
```

**Type**

LayerProps & [CubeLayerDefaultProps][InterfaceDeclaration-28] & [CubeLayerDataProps][InterfaceDeclaration-25]

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

[NamespaceImport-3]: types.html#types
[InterfaceDeclaration-11]: types.html#axis
[InterfaceDeclaration-12]: types.html#styledline
[InterfaceDeclaration-12]: types.html#styledline
[InterfaceDeclaration-13]: types.html#ticktext
[InterfaceDeclaration-0]: types.html#base
[InterfaceDeclaration-1]: types.html#deckbase
[InterfaceDeclaration-2]: types.html#decklayerbase
[InterfaceDeclaration-3]: types.html#lumabase
[InterfaceDeclaration-4]: types.html#vegabase
[InterfaceDeclaration-7]: types.html#cube
[TypeAliasDeclaration-0]: types.html#vec3
[TypeAliasDeclaration-0]: types.html#vec3
[InterfaceDeclaration-25]: types.html#cubelayerdataprops
[InterfaceDeclaration-7]: types.html#cube
[InterfaceDeclaration-28]: types.html#cubelayerdefaultprops
[InterfaceDeclaration-1]: types.html#deckbase
[InterfaceDeclaration-2]: types.html#decklayerbase
[InterfaceDeclaration-14]: types.html#facetrect
[InterfaceDeclaration-12]: types.html#styledline
[InterfaceDeclaration-8]: types.html#legend
[InterfaceDeclaration-9]: types.html#legendrow
[InterfaceDeclaration-9]: types.html#legendrow
[InterfaceDeclaration-10]: types.html#legendrowsymbol
[InterfaceDeclaration-10]: types.html#legendrowsymbol
[InterfaceDeclaration-3]: types.html#lumabase
[InterfaceDeclaration-20]: types.html#prestage
[InterfaceDeclaration-6]: types.html#stage
[InterfaceDeclaration-18]: types.html#presenterconfig
[InterfaceDeclaration-19]: types.html#transitiondurations
[InterfaceDeclaration-20]: types.html#prestage
[InterfaceDeclaration-15]: types.html#presenterstyle
[TypeAliasDeclaration-1]: types.html#view
[InterfaceDeclaration-16]: types.html#queuedanimationoptions
[InterfaceDeclaration-17]: types.html#scene3d
[TypeAliasDeclaration-1]: types.html#view
[InterfaceDeclaration-6]: types.html#stage
[InterfaceDeclaration-7]: types.html#cube
[InterfaceDeclaration-8]: types.html#legend
[InterfaceDeclaration-11]: types.html#axis
[InterfaceDeclaration-11]: types.html#axis
[TypeAliasDeclaration-1]: types.html#view
[InterfaceDeclaration-12]: types.html#styledline
[InterfaceDeclaration-14]: types.html#facetrect
[InterfaceDeclaration-12]: types.html#styledline
[InterfaceDeclaration-13]: types.html#ticktext
[InterfaceDeclaration-19]: types.html#transitiondurations
[InterfaceDeclaration-4]: types.html#vegabase
[InterfaceDeclaration-21]: types.html#viewglconfig
[ClassDeclaration-0]: presenter.html#presenter
[InterfaceDeclaration-18]: types.html#presenterconfig
[TypeAliasDeclaration-1]: types.html#view
[TypeAliasDeclaration-2]: types.html#cubelayerprops
[InterfaceDeclaration-28]: types.html#cubelayerdefaultprops
[InterfaceDeclaration-25]: types.html#cubelayerdataprops
[TypeAliasDeclaration-0]: types.html#vec3
[TypeAliasDeclaration-1]: types.html#view