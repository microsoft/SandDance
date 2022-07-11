/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { RGBAColor } from '../interfaces';

export class ColorMap {
    private colorMap: { [key: string]: { index: number, rgbaColor: RGBAColor } };
    private colorArray: RGBAColor[];

    constructor(public quant = 5) {
        this.colorMap = {};
        this.colorArray = [];
    }

    private getColorKey(rgbaColor: RGBAColor) {
        const color = rgbaColor.slice(0, 3).map(e => Math.floor(e / this.quant) * this.quant);
        color[3] = rgbaColor[3]; //retain alpha
        return JSON.stringify(color);
    }

    public registerColor(rgbaColor: RGBAColor) {
        const colorKey = this.getColorKey(rgbaColor);
        if (!this.colorMap[colorKey]) {
            this.colorMap[colorKey] = {
                index: this.colorArray.length,
                rgbaColor,
            };
            this.colorArray.push(rgbaColor);
        }
        return this.colorMap[colorKey].index;
    }

    public getPalette() {
        return {
            palette: new Uint8Array(this.colorArray.flat()),
            maxColor: this.colorArray.length - 1,
        };
    }
}