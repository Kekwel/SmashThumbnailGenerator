import {
    fabric
} from "fabric";

class CustomColor {
    canvas;
    gradient;
    _origin = {
        x: 0,
        y: 0
    };
    _dest = {
        x: 1280,
        y: 720
    };
    _colors = ['green', 'black'];

    constructor(pCanvas, colorOpt) {
        this.canvas = pCanvas;
        
        this._origin.x = (colorOpt.origin && colorOpt.origin.x) || this._origin.x;
        this._origin.y = (colorOpt.origin && colorOpt.origin.y) || this._origin.y;
        this._dest.x = (colorOpt.dest && colorOpt.dest.x) || this._dest.x;
        this._dest.y = (colorOpt.dest && colorOpt.dest.y) || this._dest.y;
        
        this._colors = colorOpt.colors || this._colors;
        
        this.gradient = new fabric.Gradient({
            type: 'linear',
            gradientUnits: 'pixels', // or 'percentage'
            coords: {
                x1: this._origin.x,
                y1: this._origin.y,
                x2: this._dest.x,
                y2: this._dest.y
            },
            colorStops: [{
                    offset: 0,
                    color: this._colors[0]
                },
                {
                    offset: 1,
                    color: this._colors[1]
                }
            ]
        });
    }

    get colors() {
        return this._colors;
    }
    // TODO getter setter 

}

export {
    CustomColor
};