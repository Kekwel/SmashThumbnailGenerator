import {
	fabric
} from "fabric";

class CustomImage {
	_canvas;
	clipPath;

	_filename; // TODO img non trouvé
	_character;

	_image;
	_isShadow = true;
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

		//this._filename = imgOpt.filename || this._filename;
		this._character = imgOpt.character || this._character;

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
		var newUrl = this.filename;
		
		fabric.Image.fromURL(newUrl, function (oImg) {
			self.initImage(oImg);

			self._y = self.canvas.height - oImg.getScaledHeight();
			oImg.set('shadow', new fabric.Shadow(self._shadow));
			oImg.set('top', self._y);
			self.canvas.add(oImg);

			oImg.moveTo(self._index)
		});
	}

	get canvas() {
        return this._canvas;
    }
    set canvas(cv) {
        this._canvas = cv;
        return this.canvas;
    }
	get image() {
		return this._image;
	}

	get filename() {
		return this._character.getCharUrl();
	}
	set filename(filename) {
		var self = this;
		// this.canvas.remove(this._image);
		this._filename = filename;

		var newUrl = filename ? this._filename : '';
		fabric.Image.fromURL(newUrl, function () {
			self.updateImage(newUrl);
			// self.initImage(oImg);
			// self.canvas.add(oImg);
		});

		this.canvas.renderAll()
		return this._filename;
	}

	get ombre() {
        return this._isShadow;
    }
    set ombre(pOmbre) {
        this._isShadow = pOmbre;
		this._image.set('shadow', this._isShadow ? this._shadow : '');
		
		this.updateImage(this._filename);
        return this.maxCol;
    }
    get ombreX(){
        return this._shadow.offsetX;
    }
    set ombreX(pOffset) {
        this._shadow.offsetX = pOffset
        this._image.set('shadow', this.ombre ? this._shadow : '');

        this.updateImage(this._filename);
        return this._shadow.offsetX;
    }
    get ombreY(){
        return this._shadow.offsetY;
    }
    set ombreY(pOffset) {
        this._shadow.offsetY = pOffset
        this._image.set('shadow', this.ombre ? this._shadow : '');

        this.updateImage(this._filename);
        return this._shadow.offsetY;
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
		console.log("update img " + url);
		var self = this;
		if (this._image) {
			this._image.setSrc(url, function () {
				self.canvas.requestRenderAll();
			});
		}
	}

	flip() {
		this._image.toggle("flipX");
		this.canvas.renderAll();
	}
}

export {
	CustomImage
};