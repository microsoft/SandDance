// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export const FieldNames = {
    Active: '__SandDance__Active',
    Collapsed: '__SandDance__Collapsed',
    Contains: '__SandDance__Contains',
    Selected: '__SandDance__Selected',
    Top: '__SandDance__Top',
    TopColor: '__SandDance__TopColor',
    TopIndex: '__SandDance__TopIndex',
    PowerBISelectionId: '__SandDance__PowerBISelectionId',
    FacetRange: '__SandDance__FacetRange',
    Ordinal: '__SandDance__Ordinal',
    WrapCol: '__SandDance__WrapCol',
    WrapRow: '__SandDance__WrapRow'
};

export const DataNames = {
    Main: 'MainData',
    EmptyBin: 'EmptyBinsData',
    TopLookup: 'TopData',
    Legend: 'LegendData',
    FacetCellColTitles: 'data_FacetCellColTitles',
    FacetCellRowTitles: 'data_FacetCellRowTitles',
    QuantitativeData: 'QuantitativeData'
};

export const ScaleNames = {
    Color: 'ColorScale',
    RowTitle: 'RowTitle',
    ColTitle: 'ColTitle',
    X: 'MainXScale',
    Y: 'MainYScale',
    Z: 'MainZScale'
};

//Signal names
export const SignalNames = {
    ViewportWidth: 'ViewportWidth',
    ViewportHeight: 'ViewportHeight',
    MinCellWidth: 'MinCellWidth',
    MinCellHeight: 'MinCellHeight',
    PlotOffsetLeft: 'PlotOffsetLeft',
    PlotOffsetTop: 'PlotOffsetTop',
    PlotOffsetBottom: 'PlotOffsetBottom',
    PlotHeightIn: 'PlotHeightIn',
    PlotWidthIn: 'PlotWidthIn',
    PlotHeightOut: 'PlotHeightOut',
    PlotWidthOut: 'PlotWidthOut',
    ColorBinCount: 'RoleColor_BinCountSignal',
    ColorReverse: 'RoleColor_ReverseSignal',
    FacetBins: 'RoleFacet_BinsSignal',
    FacetVBins: 'RoleFacetV_BinsSignal',
    FacetColumns: 'RoleFacet_ColumnsSignal',
    FacetRows: 'RoleFacet_RowsSignal',
    InnerPadding: 'Chart_InnerPadding',
    OuterPadding: 'Chart_OuterPadding',
    MarkOpacity: 'Mark_OpacitySignal',
    PointSize: 'Chart_PointSizeSignal',
    TextAngleX: 'Text_AngleXSignal',
    TextAngleY: 'Text_AngleYSignal',
    TextScale: 'Text_ScaleSignal',
    TextSize: 'Text_SizeSignal',
    TextTitleSize: 'Text_TitleSizeSignal',
    TreeMapMethod: 'Chart_TreeMapMethodSignal',
    XDomain: 'RoleX_DomainSignal',
    XBins: 'RoleX_BinsSignal',
    XGridSize: 'Chart_XGridSize',
    YBins: 'RoleY_BinsSignal',
    YDomain: 'RoleY_DomainSignal',
    YGridSize: 'Chart_YGridSize',
    ZHeight: 'RoleZ_HeightSignal',
    ZProportion: 'RoleZ_ProportionSignal'
};

//These are special formulaic data values
export const Other = '__Other';

//name of the "no-color" palette
export const ColorScaleNone = 'none';
