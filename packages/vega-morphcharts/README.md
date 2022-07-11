# @msrvida/vega-morphcharts

View component for [Vega](https://vega.github.io/) visualizations, using MorphCharts for WebGL rendering.

This project combines two great visualization libraries into one. You have the expressiveness of [Vega specifications](https://vega.github.io/vega/docs/specification/) and the WebGL rendering of MorphCharts. As a result, you have the option of visualizing data in 3 dimensions.

## Limitations

This project does not fully implement every feature provided by Vega. Some interactive features are omitted due to the nature of the 3D rendering model which breaks correspondence to the 2D rendering plane. Other features simply have yet to be developed, for these we will gladly accept a pull request.

## Feature additions

Rect elements can be rendered as 3D cuboids. To do this, add `"z"` / `"depth"` encodings where you normally use `"x"` / `"width"` and `"y"` / `"height"`.
