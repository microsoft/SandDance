import { Footprint, FootprintProps } from "./footprint";
import { Scopes } from "../../interfaces";

export interface DensityProps extends FootprintProps {
    mode: 'square' | 'cube';
}

export class Density extends Footprint {
    constructor(public props: DensityProps & Scopes) {
        super(props);
    }
}
