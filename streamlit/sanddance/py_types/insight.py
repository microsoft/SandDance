# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

from enum import Enum
from typing import Optional, List, Dict, Any

class Chart(Enum):
    BARCHART = 'barchart'
    BARCHARTH = 'barchartH'
    BARCHARTV = 'barchartV'
    DENSITY = 'density'
    GRID = 'grid'
    SCATTERPLOT = 'scatterplot'
    STACKS = 'stacks'
    STRIPS = 'strips'
    TREEMAP = 'treemap'

class ColorBin(Enum):
    CONTINUOUS = 'continuous'
    QUANTIZE = 'quantize'
    QUANTILE = 'quantile'

class FacetStyle(Enum):
    WRAP = 'wrap'
    CROSS = 'cross'

class TotalStyle(Enum):
    COUNT_SQUARE = 'count-square'
    COUNT_STRIP = 'count-strip'
    SUM_STRIP = 'sum-strip'
    SUM_STRIP_PERCENT = 'sum-strip-percent'
    SUM_TREEMAP = 'sum-treemap'

class Facets:
    columns: int
    rows: int

class Extents:
    bottom: int
    left: int
    right: int
    top: int

class Size:
    height: int
    width: int

class BackgroundImage:
    url: str
    size: Size
    extents: Optional[Extents]

class InsightColumns:
    uid: Optional[str]
    x: Optional[str]
    y: Optional[str]
    z: Optional[str]
    group: Optional[str]
    size: Optional[str]
    color: Optional[str]
    sort: Optional[str]
    facet: Optional[str]
    facetV: Optional[str]

class View(Enum):
    _2D = '2d'
    _3D = '3d'

class Search:
    pass  # Placeholder for future definition

class SignalValues:
    key: Dict[str, Any]

class Transforms:
    pass  # Placeholder for future definition

class Insight:
    backgroundImage: Optional[BackgroundImage]
    chart: Chart
    size: Size
    columns: InsightColumns
    view: Optional[View]
    filter: Optional[Search]
    facetStyle: Optional[FacetStyle]
    totalStyle: Optional[TotalStyle]
    colorBin: Optional[ColorBin]
    scheme: Optional[str]
    signalValues: Optional[SignalValues]
    hideAxes: Optional[bool]
    hideLegend: Optional[bool]
    directColor: Optional[bool]
    transform: Optional[List[Transforms]]
