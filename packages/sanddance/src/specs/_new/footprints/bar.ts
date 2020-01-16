import { Footprint, FootprintProps } from "./footprint";
import { Orientation } from "../../interfaces";

export interface BarProps extends FootprintProps {
    orientation: Orientation;
}

export class Bar extends Footprint {

}
