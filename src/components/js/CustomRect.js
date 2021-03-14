import {
    fabric
} from "fabric";
import {
    CustomColor
} from "./CustomColor";

class CustomRect {
    canvas;

    _colors;
    _origin;
    _dest;

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

        this._colors = bgOptions.colors || this._colors;
        this._origin = {
            x: 0,
            y: 0
        }
        this._dest = {
            x: this._width,
            y: this._height
        }

        this._index = bgOptions.index || this._index;

        this.rect = new fabric.Rect({
            left: this._x,
            top: this._y,
            width: this._width,
            height: this._height,
            originX: "left",
            originY: "top",
        });
        this._grad = new CustomColor(this.canvas, {
            colors: this._colors,
            origin: this._origin,
            dest: this._dest
        });
        // si couleur tjs undefinded 
        if (!this._colors)
            this.colors = this._grad.colors;

        this.updateColor();

        this.rect.moveTo(this._index);
    }

    get colors() {
        return this._colors;
    }
    set colors(pColors) {
        if (pColors) {
            this._colors = pColors;
            this._grad.colors = this._colors;
            this.updateColor();
        }
        return this._colors;
    }

    get colorDirection() {
        // TODO recup origin dset courant
        var dir = {
            origin: this._grad._origin,
            dest: this._grad._dest
        }
        return dir;
    }
    set colorDirection(dirLib) {
        var x1, y1, x2, y2;
        switch (dirLib) {
            case 'topleft':
                x1 = this._width; y1 = this._height;
                x2 = 0; y2 = 0;
                break;
            case 'up':
                x1 = this._width / 2; y1 = this._height;
                x2 = this._width / 2; y2 = 0;
                break;
            case 'topright':
                x1 = 0; y1 = this._height;
                x2 = this._width; y2 = 0;
                break;
            case 'left':
                x1 = this._width; y1 = this._height / 2;
                x2 = 0; y2 = this._height / 2;
                break;
            case 'right':
                x1 = 0; y1 = this._height / 2;
                x2 = this._width; y2 = this._height / 2;
                break;
            case 'bottomleft':
                x1 = this._width; y1 = 0;
                x2 = 0; y2 = this._height;
                break;
            case 'down':
                x1 = this._width / 2; y1 = 0;
                x2 = this._width / 2; y2 = this._height;
                break;
            case 'bottomright':
                x1 = 0; y1 = 0;
                x2 = this._width; y2 = this._height;
                break;
            default:
                break;
        }
        this._origin = {x: x1, y: y1};
        this._dest = {x: x2, y: y2};
        console.log(this._origin, this._dest);
        this.updateColor();
        return dirLib;
    }

    updateColor() {
        this._grad = new CustomColor(this.canvas, {
            colors: this._colors,
            origin: this._origin,
            dest: this._dest
        });
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