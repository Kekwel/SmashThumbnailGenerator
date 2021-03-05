import {
    fabric
} from "fabric";
import {
    CustomColor
} from "./CustomColor";

class CustomRect {
    canvas;
    _width = 640;
    _height = 100;
    _x = 0;
    _y = 0;
    _index = 0;

    _grad;

    constructor(pCanvas, bgOptions) {
        this.canvas = pCanvas;

        this._width = bgOptions.width || this._width;
        this._height = bgOptions.height || this._height;
        this._x = bgOptions.x || this._x;
        this._y = bgOptions.y || this._y;
        this._color = bgOptions.color || this._color;
        this._color2 = bgOptions.color2 || this._color;
        this._index = bgOptions.index || this._index;

        this.rect = new fabric.Rect({
            fill: this._color,
            left: this._x,
            top: this._y,
            width: this._width,
            height: this._height,
            originX: "left",
            originY: "top",
        });
        this._grad = new CustomColor(this.canvas, {
            colors: [this._color, this._color2],
            dest: {
                x: this._x + this._width,
                y: this._y + this._height
            }
        });

        this.updateColor();

        this.rect.moveTo(this._index);
    }

    get color() {
        return this._grad.colors[0];
    }
    set color(pColor) {
        if (this.isColor(pColor)) {
            /* this._color = pColor; */
            this._grad.colors[0] = pColor;
            this.updateColor();
        }
        return this._grad.colors[0];
    }
    get color2() {
        return this._grad.colors[1];
    }
    set color2(pColor2) {
        if (this.isColor(pColor2)) {
            /* this._color2 = pColor2; */
            this._grad.colors[1] = pColor2;
            this.updateColor();
        }
        return this._grad.colors[1];
    }

    updateColor() {
        this._grad = new CustomColor(this.canvas, {
            colors: [this._grad.colors[0], this._grad.colors[1]],
            origin: {
                x: this._x,
                y: this._y
            }, dest: {
                x: this._x + this._width,
                y: this._y + this._height
            }
        });
        /* this._gradient = new fabric.Gradient({
            type: 'linear',
            gradientUnits: 'pixels', // or 'percentage'
            coords: {
                x1: 0,
                y1: 0,
                x2: this.rect.width,
                y2: this.rect.height
            },
            colorStops: [{
                    offset: 0,
                    color: this._color
                },
                {
                    offset: 1,
                    color: this._color2
                }
            ]
        });
        this.rect.set('fill', this._gradient); */
        this.rect.set('fill', this._grad.gradient);
        this.canvas.renderAll();
    }

    // TODO a deplacer !
    isColor(strColor) {
        var s = new Option().style;
        s.color = strColor;
        return s.color == strColor;
    }
}

export {
    CustomRect
};