// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Footprint, FootprintProps } from "./footprint";
import { Orientation } from "../../interfaces";

export interface PercentProps extends FootprintProps {
    orientation: Orientation;
}

export class Percent extends Footprint {

}
