import {
    fabric
} from "fabric";

class CustomImage {
    canvas;
    clipPath;

    _filename; // TODO img non trouvé
    _image;
    _shadow = {
        color: '#000',
        blur: 0,
        offsetX: -10,
        offsetY: 10,
        opacity: 0.8
    };
    // TODO data ?
    _width = 640;
    _height = 720;
    _x = 0;
    _y = 0;
    _index = -4;

    constructor(canvas, imgOpt, clipPath) {
        this.canvas = canvas;

        this._filename = imgOpt.filename || this._filename;
        this._index = imgOpt.index || this._index;
        this._x = imgOpt.x || this._x;
        this._y = imgOpt.y || this._y;
        this._width = imgOpt.width || this._width;
        this._height = imgOpt.height || this._height;

        if (clipPath) {
            this.clipPath = clipPath;
        }
        // this.addImg();
    }

    addImg() {
        var self = this;
        var newUrl = this.getImgUrl(this._filename);
        fabric.Image.fromURL(newUrl, function (oImg) {
            self.initImage(oImg);

            self._y = self.canvas.height - oImg.getScaledHeight();
            // oImg.set('shadow', new fabric.Shadow(self._shadow));
            oImg.set('top', self._y);
            self.canvas.add(oImg);

            oImg.moveTo(self._index)
        });
    }

    get image() {
        return this._image;
    }

    get filename() {
        return this._filename;
    }
    set filename(filename) {
        var self = this;
        // this.canvas.remove(this._image);
        this._filename = filename;

        var newUrl = this.getImgUrl(this._filename);
        fabric.Image.fromURL(newUrl, function () {
            self.updateImage(newUrl);
            // self.initImage(oImg);
            // self.canvas.add(oImg);
        });

        this.canvas.renderAll()
        return this._filename;
    }

    initImage(newImg) {
        this._image = newImg;
        newImg.scaleToWidth(this._width)

        newImg.set({
            left: this._x,
            top: this._y,
            perPixelTargetFind: true,
            clipPath: this.clipPath
        });
    }

    updateImage(url) {
        console.log("update " + url);
        var self = this;
        this._image.setSrc(url, function () {
            self.canvas.requestRenderAll();
        });
    }

    getImgUrl(char) {
        var images = require.context("../../assets/img/char/ult", false, /\.png$/);
        // require("../assets/img/char/$GAME/$CHARNAME_$ROW_$COL.png")
        return images("./" + char + ".png");
    }

    flip() {
        this._image.toggle("flipX");
        this.canvas.renderAll();
    }
}

export {
    CustomImage
};