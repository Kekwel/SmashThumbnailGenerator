import { fabric } from "fabric";
import { Shadow } from "./Shadow";

class CustomImage {
	_canvas;
	group = new fabric.Group();
	clipPath;

	_filename; // TODO img non trouvé
	_character;

	_image;
	_imgLoaded = false;

	_imageShadow;
	_imgShadowLoaded = false;
	shadowActive = true;
	_shadowX = -10;
	_shadowY = 10;

	_shadow = new Shadow();

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
			this.group.clipPath = clipPath;
            this.clipPath = clipPath;
		}

		// this.addImg();
	}

	addImg() {
		var self = this;
		var newUrl = this.filename;
		
		// omb img
		fabric.Image.fromURL(newUrl, function (oImg) {
			self.initImageShadow(oImg);
			
			self._y = self.canvas.height - oImg.getScaledHeight();
			//oImg.set('top', self._y);
			oImg.moveTo(self._index - 1);

			// self.addImgToGroup(oImg, true);
			self.group.addWithUpdate(oImg);
			self.canvas.requestRenderAll();
			self._imageShadowLoaded = true;
		});

		// img
		fabric.Image.fromURL(newUrl, function (oImg) {
			self.initImage(oImg);
			
			self._y = self.canvas.height - oImg.getScaledHeight();
			oImg.set('top', self._y);
			oImg.moveTo(self._index);

			// on l'ajout qu'une fois l'ombre ajouté
			self.addImgToGroup(oImg, self._imageShadowLoaded)
			self._imageLoaded = true;
		});
		
		this._canvas.add(this.group).renderAll();
	}

	addImgToGroup(oImg) {
		var self = this;
		if (!self._imageShadowLoaded) {
			// Image not loaded yet, need to wait
			setTimeout(function () { self.addImgToGroup(oImg) }, 100);
			return;
		}
		this.group.addWithUpdate(oImg);
		this.canvas.requestRenderAll();
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
		this._filename = filename;

		var newUrl = filename ? this._filename : '';
		fabric.Image.fromURL(newUrl, function () {
			self.updateImage(newUrl);
			self.updateShadow(newUrl);
		});

		this.canvas.renderAll();
		return this._filename;
	}

	/* ombre */
	get ombre() {
        return this.shadowActive;
    }
    set ombre(pOmbre) {
		this.shadowActive = pOmbre;
		this._imageShadow.set('opacity', pOmbre ? '1' : '0');
		this.canvas.renderAll();
        return this.shadowActive;
    }
    get ombreX() {
        return this._shadowX;
    }
    set ombreX(pOffset) {
		var pOffsetInt = parseInt(pOffset);
		var newX = this._image.left + parseInt(pOffset);
		this._imageShadow.set('left', newX);
		this.canvas.renderAll();
        return this._shadowX = pOffsetInt;
    }
    get ombreY() {
        return this._shadowY;
    }
    set ombreY(pOffset) {
        var pOffsetInt = parseInt(pOffset);
		var newY = this._image.top + parseInt(pOffset);
		
		this._imageShadow.set('top', newY);
		this.canvas.renderAll();
        return this._shadowY = pOffsetInt;
    }
	/* */

	initImage(newImg) {
		this._image = newImg;

		this._shadow._parent = newImg;
		this._shadow.canvas = this.canvas;
		newImg.scaleToWidth(this._width);

		newImg.set({
			left: this._x,
			top: this._y,
			perPixelTargetFind: true
		});
	}
	initImageShadow(newImg) {
		this._imageShadow = newImg;
		var filter = new fabric.Image.filters.BlendColor({
			color: 'black',
			mode: 'tint',
		});
		this._imageShadow.filters.push(filter);
		this._imageShadow.applyFilters();

		newImg.scaleToWidth(this._width);

		var newY = this.canvas.height - newImg.getScaledHeight()
		newImg.set({
			left: this._x + this._shadowX,
			top: newY + this._shadowY,
			perPixelTargetFind: true
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
	updateShadow(url) {
		var self = this;
		if (this._imageShadow) {
			this._imageShadow.setSrc(url, function () {
				self.canvas.requestRenderAll();
			});
		}
	}

	flip() {
		this._image.toggle("flipX");
		this._imageShadow.toggle("flipX");
		this.canvas.renderAll();
	}
}

export {
	CustomImage
};