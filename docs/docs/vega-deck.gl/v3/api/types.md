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
    title?: VegaTextLayerDatum;
}
```

**Properties**

| Name     | Type                                          | Optional |
| -------- | --------------------------------------------- | -------- |
| domain   | [StyledLine][InterfaceDeclaration-12]         | false    |
| ticks    | [StyledLine][InterfaceDeclaration-12][]       | false    |
| tickText | [TickText][InterfaceDeclaration-13][]         | false    |
| title    | [VegaTextLayerDatum][InterfaceDeclaration-14] | true     |

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
    color: RGBAColor<number, number, number, number>;
    position: Vec3<number, number, number>;
    size: Vec3<number, number, number>;
}
```

**Properties**

| Name     | Type                                                   | Optional | Description                                                                                 |
| -------- | ------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------- |
| ordinal  | number                                                 | true     | Ordinal position.                                                                           |
| isEmpty  | boolean                                                | true     | Flag whether this cube is a "placeholder" and is not to be rendered nor contains cube data. |
| color    | RGBAColor<number, number, number, number>              | false    |                                                                                             |
| position | [Vec3][TypeAliasDeclaration-0]<number, number, number> | false    |                                                                                             |
| size     | [Vec3][TypeAliasDeclaration-0]<number, number, number> | false    |                                                                                             |

----------

### CubeLayerDataProps

```typescript
interface CubeLayerDataProps {
    interpolator?: LinearInterpolator_Class<CubeLayerInterpolatedProps>;
}
```

**Properties**

| Name         | Type                                                                                                  | Optional |
| ------------ | ----------------------------------------------------------------------------------------------------- | -------- |
| interpolator | LinearInterpolator_Class][ClassDeclaration-4]<[CubeLayerInterpolatedProps> | true     |

----------

### CubeLayerDefaultProps

```typescript
interface CubeLayerDefaultProps {
    lightingMix: number;
    getColor?: (o: Cube) => number[];
    getSize?: (o: Cube) => number[];
    getPosition?: (o: Cube) => number[];
    material?: any;
}
```

**Properties**

| Name        | Type                  | Optional |
| ----------- | --------------------- | -------- |
| lightingMix | number                | false    |
| getColor    | (o: Cube) => number[] | true     |
| getSize     | (o: Cube) => number[] | true     |
| getPosition | (o: Cube) => number[] | true     |
| material    | any                   | true     |

----------

### DeckBase

deck.gl/core dependency.

```typescript
interface DeckBase {
    _CameraLight: typeof ???;
    AmbientLight: typeof ???;
    CompositeLayer: typeof ???;
    COORDINATE_SYSTEM: typeof ???;
    Deck: typeof ???;
    DirectionalLight: typeof ???;
    Layer: typeof ???;
    LightingEffect: typeof ???;
    LinearInterpolator: typeof ???;
    OrbitView: typeof ???;
    OrbitController: typeof ???;
    gouraudLighting: typeof ???;
    picking: typeof ???;
    project32: typeof ???;
}
```

**Properties**

| Name               | Type       | Optional |
| ------------------ | ---------- | -------- |
| _CameraLight       | typeof ??? | false    |
| AmbientLight       | typeof ??? | false    |
| CompositeLayer     | typeof ??? | false    |
| COORDINATE_SYSTEM  | typeof ??? | false    |
| Deck               | typeof ??? | false    |
| DirectionalLight   | typeof ??? | false    |
| Layer              | typeof ??? | false    |
| LightingEffect     | typeof ??? | false    |
| LinearInterpolator | typeof ??? | false    |
| OrbitView          | typeof ??? | false    |
| OrbitController    | typeof ??? | false    |
| gouraudLighting    | typeof ??? | false    |
| picking            | typeof ??? | false    |
| project32          | typeof ??? | false    |

----------

### DeckLayerBase

deck.gl/layers dependency.

```typescript
interface DeckLayerBase {
    IconLayer: typeof ???;
    LineLayer: typeof ???;
    PathLayer: typeof ???;
    PolygonLayer: typeof ???;
    TextLayer: typeof ???;
}
```

**Properties**

| Name         | Type       | Optional |
| ------------ | ---------- | -------- |
| IconLayer    | typeof ??? | false    |
| LineLayer    | typeof ??? | false    |
| PathLayer    | typeof ??? | false    |
| PolygonLayer | typeof ??? | false    |
| TextLayer    | typeof ??? | false    |

----------

### FacetRect

Rect area and title for a facet.

```typescript
interface FacetRect {
    datum: any;
    lines: StyledLine[];
}
```

**Properties**

| Name  | Type                                    | Optional |
| ----- | --------------------------------------- | -------- |
| datum | any                                     | false    |
| lines | [StyledLine][InterfaceDeclaration-12][] | false    |

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
    Model: typeof ???;
    Texture2D: typeof ???;
}
```

**Properties**

| Name         | Type       | Optional |
| ------------ | ---------- | -------- |
| CubeGeometry | typeof ??? | false    |
| Model        | typeof ??? | false    |
| Texture2D    | typeof ??? | false    |

----------

### PreStage

Function that can be called prior to presenting the stage.

```typescript
interface PreStage {
    (stage: Stage, deckProps: Partial<DeckProps>): void;
}
```
#### Call

```typescript
(stage: Stage, deckProps: Partial<DeckProps>): void;
```

**Parameters**

| Name      | Type                            |
| --------- | ------------------------------- |
| stage     | [Stage][InterfaceDeclaration-6] |
| deckProps | Partial<DeckProps>              |

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
    onLayerClick?: (info: PickInfo<any>, e: MouseEvent) => any;
    onLegendClick?: (e: MouseEvent | PointerEvent | TouchEvent, legend: Legend, clickedIndex: number) => void;
    onPresent?: () => void;
    shouldViewstateTransition?: () => boolean;
    preLayer?: (stage: Stage) => void;
    onTextClick?: (e: MouseEvent | PointerEvent | TouchEvent, t: VegaTextLayerDatum) => void;
    onTextHover?: (e: MouseEvent | PointerEvent | TouchEvent, t: VegaTextLayerDatum) => boolean;
    getTextColor?: (o: VegaTextLayerDatum) => RGBAColor<number, number, number, number>;
    getTextHighlightColor?: (o: VegaTextLayerDatum) => RGBAColor<number, number, number, number>;
    onSceneRectAssignCubeOrdinal?: (d: object) => number | undefined;
    onTargetViewState?: (height: number, width: number) => { height: number; width: number; newViewStateTarget?: boolean; };
    preserveDrawingBuffer?: boolean;
}
```

**Properties**

| Name                         | Type                                                                                                | Optional |
| ---------------------------- | --------------------------------------------------------------------------------------------------- | -------- |
| transitionDurations          | [TransitionDurations][InterfaceDeclaration-20]                                                      | true     |
| preStage                     | [PreStage][InterfaceDeclaration-21]                                                                 | true     |
| redraw                       | () => void                                                                                          | true     |
| onCubeHover                  | (e: MouseEvent &#124; PointerEvent &#124; TouchEvent, cube: Cube) => void                           | true     |
| onCubeClick                  | (e: MouseEvent &#124; PointerEvent &#124; TouchEvent, cube: Cube) => void                           | true     |
| onLayerClick                 | (info: PickInfo<any>, e: MouseEvent) => any                                                         | true     |
| onLegendClick                | (e: MouseEvent &#124; PointerEvent &#124; TouchEvent, legend: Legend, clickedIndex: number) => void | true     |
| onPresent                    | () => void                                                                                          | true     |
| shouldViewstateTransition    | () => boolean                                                                                       | true     |
| preLayer                     | (stage: Stage) => void                                                                              | true     |
| onTextClick                  | (e: MouseEvent &#124; PointerEvent &#124; TouchEvent, t: VegaTextLayerDatum) => void                | true     |
| onTextHover                  | (e: MouseEvent &#124; PointerEvent &#124; TouchEvent, t: VegaTextLayerDatum) => boolean             | true     |
| getTextColor                 | (o: VegaTextLayerDatum) => RGBAColor<number, number, number, number>                                | true     |
| getTextHighlightColor        | (o: VegaTextLayerDatum) => RGBAColor<number, number, number, number>                                | true     |
| onSceneRectAssignCubeOrdinal | (d: object) => number &#124; undefined                                                              | true     |
| onTargetViewState            | (height: number, width: number) => { height: number; width: number; newViewStateTarget?: boolean; } | true     |
| preserveDrawingBuffer        | boolean                                                                                             | true     |

----------

### PresenterStyle

```typescript
interface PresenterStyle {
    cssPrefix?: string;
    defaultCubeColor?: RGBAColor<number, number, number, number>;
    highlightColor?: RGBAColor<number, number, number, number>;
    fontFamily?: string;
}
```

**Properties**

| Name             | Type                                      | Optional |
| ---------------- | ----------------------------------------- | -------- |
| cssPrefix        | string                                    | true     |
| defaultCubeColor | RGBAColor<number, number, number, number> | true     |
| highlightColor   | RGBAColor<number, number, number, number> | true     |
| fontFamily       | string                                    | true     |

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

| Name | Type | Optional |
| ---- | ---- | -------- |
| view | View | false    |

----------

### Stage

Data structure containing all that is necessary to present a chart.

```typescript
interface Stage {
    backgroundColor?: RGBAColor<number, number, number, number>;
    cubeData: Cube[];
    legend?: Legend;
    axes: { x: Axis[]; y: Axis[]; };
    textData: VegaTextLayerDatum[];
    view: View;
    gridLines?: StyledLine[];
    facets?: FacetRect[];
}
```

**Properties**

| Name            | Type                                                                            | Optional |
| --------------- | ------------------------------------------------------------------------------- | -------- |
| backgroundColor | RGBAColor<number, number, number, number>                                       | true     |
| cubeData        | [Cube][InterfaceDeclaration-7][]                                                | false    |
| legend          | [Legend][InterfaceDeclaration-8]                                                | true     |
| axes            | { x: [Axis][InterfaceDeclaration-11][]; y: [Axis][InterfaceDeclaration-11][]; } | false    |
| textData        | [VegaTextLayerDatum][InterfaceDeclaration-14][]                                 | false    |
| view            | View                                                                            | false    |
| gridLines       | [StyledLine][InterfaceDeclaration-12][]                                         | true     |
| facets          | [FacetRect][InterfaceDeclaration-15][]                                          | true     |

----------

### StyledLine

```typescript
interface StyledLine {
    color?: RGBAColor<number, number, number, number>;
    sourcePosition: Vec3<number, number, number>;
    strokeWidth?: number;
    targetPosition: Vec3<number, number, number>;
}
```

**Properties**

| Name           | Type                                                   | Optional |
| -------------- | ------------------------------------------------------ | -------- |
| color          | RGBAColor<number, number, number, number>              | true     |
| sourcePosition | [Vec3][TypeAliasDeclaration-0]<number, number, number> | false    |
| strokeWidth    | number                                                 | true     |
| targetPosition | [Vec3][TypeAliasDeclaration-0]<number, number, number> | false    |

----------

### TickText

```typescript
interface TickText extends VegaTextLayerDatum {
    value: number | string;
}
```

**Extends**

[VegaTextLayerDatum][InterfaceDeclaration-14]

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
    truncate: typeof ???;
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
| truncate      | typeof ???      | false    |
| View          | typeof ???      | false    |

----------

### VegaTextLayerDatum

```typescript
interface VegaTextLayerDatum {
    color: RGBAColor<number, number, number, number>;
    text: string;
    position: Position;
    size: number;
    angle?: number;
    textAnchor?: TextAnchor;
    alignmentBaseline?: AlignmentBaseline;
    metaData?: any;
}
```

**Properties**

| Name              | Type                                      | Optional |
| ----------------- | ----------------------------------------- | -------- |
| color             | RGBAColor<number, number, number, number> | false    |
| text              | string                                    | false    |
| position          | Position                                  | false    |
| size              | number                                    | false    |
| angle             | number                                    | true     |
| textAnchor        | TextAnchor                                | true     |
| alignmentBaseline | AlignmentBaseline                         | true     |
| metaData          | any                                       | true     |

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
| presenterConfig | [PresenterConfig][InterfaceDeclaration-19] | true     |
| getView         | { (): View; }                              | true     |

## Types

### CubeLayerProps

```typescript
type CubeLayerProps = LayerProps<Cube> & CubeLayerDefaultProps & CubeLayerDataProps;
```

**Type**

LayerProps<[Cube][InterfaceDeclaration-7]> & [CubeLayerDefaultProps][InterfaceDeclaration-29] & [CubeLayerDataProps][InterfaceDeclaration-26]

----------

### Vec3

3 dimensional array of numbers.

```typescript
type Vec3 = [number, number, number];
```

**Type**

[number, number, number]

[NamespaceImport-3]: types.html#types
[InterfaceDeclaration-11]: types.html#axis
[InterfaceDeclaration-12]: types.html#styledline
[InterfaceDeclaration-12]: types.html#styledline
[InterfaceDeclaration-13]: types.html#ticktext
[InterfaceDeclaration-14]: types.html#vegatextlayerdatum
[InterfaceDeclaration-0]: types.html#base
[InterfaceDeclaration-1]: types.html#deckbase
[InterfaceDeclaration-2]: types.html#decklayerbase
[InterfaceDeclaration-3]: types.html#lumabase
[InterfaceDeclaration-4]: types.html#vegabase
[InterfaceDeclaration-7]: types.html#cube
[TypeAliasDeclaration-0]: types.html#vec3
[TypeAliasDeclaration-0]: types.html#vec3
[InterfaceDeclaration-26]: types.html#cubelayerdataprops
[InterfaceDeclaration-29]: types.html#cubelayerdefaultprops
[InterfaceDeclaration-1]: types.html#deckbase
[InterfaceDeclaration-2]: types.html#decklayerbase
[InterfaceDeclaration-15]: types.html#facetrect
[InterfaceDeclaration-12]: types.html#styledline
[InterfaceDeclaration-8]: types.html#legend
[InterfaceDeclaration-9]: types.html#legendrow
[InterfaceDeclaration-9]: types.html#legendrow
[InterfaceDeclaration-10]: types.html#legendrowsymbol
[InterfaceDeclaration-10]: types.html#legendrowsymbol
[InterfaceDeclaration-3]: types.html#lumabase
[InterfaceDeclaration-21]: types.html#prestage
[InterfaceDeclaration-6]: types.html#stage
[InterfaceDeclaration-19]: types.html#presenterconfig
[InterfaceDeclaration-20]: types.html#transitiondurations
[InterfaceDeclaration-21]: types.html#prestage
[InterfaceDeclaration-16]: types.html#presenterstyle
[InterfaceDeclaration-17]: types.html#queuedanimationoptions
[InterfaceDeclaration-18]: types.html#scene3d
[InterfaceDeclaration-6]: types.html#stage
[InterfaceDeclaration-7]: types.html#cube
[InterfaceDeclaration-8]: types.html#legend
[InterfaceDeclaration-11]: types.html#axis
[InterfaceDeclaration-11]: types.html#axis
[InterfaceDeclaration-14]: types.html#vegatextlayerdatum
[InterfaceDeclaration-12]: types.html#styledline
[InterfaceDeclaration-15]: types.html#facetrect
[InterfaceDeclaration-12]: types.html#styledline
[TypeAliasDeclaration-0]: types.html#vec3
[TypeAliasDeclaration-0]: types.html#vec3
[InterfaceDeclaration-13]: types.html#ticktext
[InterfaceDeclaration-14]: types.html#vegatextlayerdatum
[InterfaceDeclaration-20]: types.html#transitiondurations
[InterfaceDeclaration-4]: types.html#vegabase
[InterfaceDeclaration-14]: types.html#vegatextlayerdatum
[InterfaceDeclaration-22]: types.html#viewglconfig
[ClassDeclaration-0]: presenter.html#presenter
[InterfaceDeclaration-19]: types.html#presenterconfig
[TypeAliasDeclaration-1]: types.html#cubelayerprops
[InterfaceDeclaration-7]: types.html#cube
[InterfaceDeclaration-29]: types.html#cubelayerdefaultprops
[InterfaceDeclaration-26]: types.html#cubelayerdataprops
[TypeAliasDeclaration-0]: types.html#vec3