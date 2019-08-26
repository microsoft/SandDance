declare module '@mapbox/tiny-sdf' {
    export default class TinySDF {
        public size: number;
        public canvas: HTMLCanvasElement;
        public ctx: CanvasRenderingContext2D;
        public gridOuter: Float64Array;
        public gridInner: Float64Array;
        public f: Float64Array;
        public z: Float64Array;
        public v: Uint16Array;
        public middle: number;

        constructor(public fontSize: number, public buffer: number, public radius: number, public cutoff: number, public fontFamily: string, public fontWeight: number) { }

        public draw(char: string): Uint8ClampedArray;
    }
}
