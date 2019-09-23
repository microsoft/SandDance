// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export const FieldNames = {
    Active: "__SandDance__Active",
    Collapsed: "__SandDance__Collapsed",
    Selected: "__SandDance__Selected",
    Top: "__SandDance__Top",
    TopIndex: "__SandDance__TopIndex",
    Index: "__SandDance__Index",
    PowerBISelectionId: "__SandDance__PowerBISelectionId",
    BarChartBin0: "__SandDance__BarChartBin0",
    BarChartBin1: "__SandDance__BarChartBin1",
    BarChartStack0: "__SandDance__BarChartStack0",
    BarChartStack1: "__SandDance__BarChartStack1",
    DensityCount: "__SandDance__DensityCount",
    DensityRow: "__SandDance__DensityRow",
    DensityXBin0: "__SandDance__DensityXBin0",
    DensityXBin1: "__SandDance__DensityXBin1",
    DensityYBin0: "__SandDance__DensityYBin0",
    DensityYBin1: "__SandDance__DensityYBin1",
    FacetBin0: "__SandDance__FacetBin0",
    FacetBin1: "__SandDance__FacetBin1",
    GridIndex: "__SandDance__GridIndex",
    StacksLatBin0: "__SandDance__StacksLatBin0",
    StacksLatBin1: "__SandDance__StacksLatBin1",
    StacksLongBin0: "__SandDance__StacksLongBin0",
    StacksLongBin1: "__SandDance__StacksLongBin1",
    StacksStart: "__SandDance__StacksStart",
    StacksEnd: "__SandDance__StacksEnd",
    TreemapStackChildren: "__SandDance__TreemapStackChildren",
    TreemapStackDepth: "__SandDance__TreemapStackDepth",
    TreemapStackX0: "__SandDance__TreemapStackX0",
    TreemapStackX1: "__SandDance__TreemapStackX1",
    TreemapStackY0: "__SandDance__TreemapStackY0",
    TreemapStackY1: "__SandDance__TreemapStackY1",
};

export const DataNames = {
    Pre: "PreData",
    Main: "MainData",
    EmptyBin: "EmptyBinsData",
    TopLookup: "TopData",
    Legend: "LegendData",
    FacetGroupCell: "FacetGroupCellData",
    FacetCellTitles: "FacetCellTitlesData",
    QuantitativeData: "QuantitativeData"
};

export const ScaleNames = {
    Color: "ColorScale",
    X: "MainXScale",
    Y: "MainYScale",
    Z: "MainZScale"
};

//Signal names
export const SignalNames = {
    ColorBinCount: "RoleColor_BinCountSignal",
    ColorReverse: "RoleColor_ReverseSignal",
    FacetColumns: "RoleFacet_ColumnsSignal",
    FacetRows: "RoleFacet_RowsSignal",
    InnerPadding: "Chart_InnerPadding",
    OuterPadding: "Chart_OuterPadding",
    PointSize: "Chart_PointSizeSignal",
    TextAngleX: "Text_AngleXSignal",
    TextAngleY: "Text_AngleYSignal",
    TextScale: "Text_ScaleSignal",
    TextSize: "Text_SizeSignal",
    TextTitleSize: "Text_TitleSizeSignal",
    TreeMapMethod: "Chart_TreeMapMethodSignal",
    XBins: "RoleX_BinsSignal",
    XGridSize: "Chart_XGridSize",
    YBins: "RoleY_BinsSignal",
    YDomain: "RoleY_DomainSignal",
    YGridSize: "Chart_YGridSize",
    ZHeight: "RoleZ_HeightSignal",
    ZProportion: "RoleZ_ProportionSignal"
};

//These are special formulaic data values
export const Other = "__Other";

//name of the "no-color" palette
export const ColorScaleNone = "none";
