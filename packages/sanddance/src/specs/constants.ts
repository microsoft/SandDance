// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export const FieldNames = {
    Active: "__SandDanceActive",
    Collapsed: "__SandDanceCollapsed",
    Selected: "__SandDanceSelected",
    Top: "__SandDanceTop"
};

export const DataNames = {
    Pre: "SandDancePreData",
    Main: "SandDanceData",
    EmptyBin: "SandDanceEmptyBins",
    TopLookup: "SandDanceTop",
    Legend: "SandDanceLegend",
    FacetGroupCell: "SandDanceFacetGroupCellData",
    FacetCellTitles: "SandDanceFacetCellTitles"
};

//Scale names
export const ScaleNameColor = "SandDanceColorScale";
export const ScaleNameX = "SandDanceMainXScale";
export const ScaleNameY = "SandDanceMainYScale";
export const ScaleNameZ = "SandDanceMainZScale";

//Signal names
export const ColorBinCountSignal = "SandDanceColorBinCount";
export const PointSizeSignal = "SandDancePointSize";
export const BinXSignal = "SandDanceBinX";
export const BinYSignal = "SandDanceBinY";
export const YDomainSignal = "SandDanceYDomainSignal";
export const TreeMapMethod = "SandDanceTreeMapMethodSignal";
export const FacetColumnsSignal = "SandDanceFacetColumnsSignal";
export const FacetRowsSignal = "SandDanceFacetRowsSignal";
export const TextScaleSignal = "SandDanceTextScale";
export const TextSizeSignal = "SandDanceTextSize";
export const TitleTextSizeSignal = "SandDanceTitleTextSize";
export const TextAngleXSignal = "SandDanceTextAngleX";
export const TextAngleYSignal = "SandDanceTextAngleY";
export const ZHeightSignal = "SandDanceZHeightSignal";
export const ZProportionSignal = "SandDanceZProportion";
export const ColorReverseSignal = "SandDanceColorReverseSignal";

//These are special formulaic data values
export const Other = "__SandDanceOther";

//name of the "no-color" palette
export const ColorScaleNone = "none";
