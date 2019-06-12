// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export const FieldNames = {
    Active: "__SandDance__Active",
    Collapsed: "__SandDance__Collapsed",
    Selected: "__SandDance__Selected",
    Top: "__SandDance__Top",
    Index: "__SandDance__Index"
};

export const DataNames = {
    Pre: "PreData",
    Main: "MainData",
    EmptyBin: "EmptyBinsData",
    TopLookup: "TopData",
    Legend: "LegendData",
    FacetGroupCell: "FacetGroupCellData",
    FacetCellTitles: "FacetCellTitlesData"
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
