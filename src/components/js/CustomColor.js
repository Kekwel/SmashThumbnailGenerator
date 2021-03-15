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
    
    _color = {id: 0, hex: "#243B55"};
    _color2= {id: 1, hex: "#141E30"};
    _colors = [this._color, this._color2];

    constructor(pCanvas, colorOpt) {
        this.canvas = pCanvas;
        
        if (colorOpt.origin) {
            this._origin.x = colorOpt.origin.x;
            this._origin.y = colorOpt.origin.y;
        }
        if (colorOpt.dest) {
            this._dest.x = colorOpt.dest.x;
            this._dest.y = colorOpt.dest.y;
        }
        /*  console.log(this._origin);
        console.log(this._dest);
        console.log('--'); */
        
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
                    color: this._colors[0].hex
                },
                {
                    offset: 1,
                    color: this._colors[1].hex
                }
            ]
        });
    }

    get colors() {
        return this._colors;
    }
    set colors(pColors) {
        this._colors = pColors;
        return this._colors;
    }
    // TODO getter setter 

}

export {
    CustomColor
};