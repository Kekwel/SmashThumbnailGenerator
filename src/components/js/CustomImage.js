import { fabric } from "fabric";
import { Shadow } from "./Shadow";

class CustomImage {
	number = '';

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
	_shadowOpacity = 1;
	_shadowBlur = 0;
	_shadowColor = '#000000';

	_shadow = new Shadow();

	// TODO data ?
	_width = 640;
	_height = 720;
	_x = 0;
	_y = 0;
	_index = 100;
	_angle = 0;

	_initOpt;

	constructor(canvas, imgOpt, clipPath) {
		this.canvas = canvas;
		this._initOpt = imgOpt;

		//this._filename = imgOpt.filename || this._filename;
		this._character = imgOpt.character || this._character;

		this._index = imgOpt.index || this._index;
		this._x = imgOpt.x || this._x;
		this._y = imgOpt.y || this._y;
		this._width = imgOpt.width || this._width;
		this._height = imgOpt.height || this._height;
		this.number = imgOpt.number || this.number;

		if (clipPath) {
			this.group.clipPath = clipPath;
            this.clipPath = clipPath;
		}

		this.group.perPixelTargetFind = true;
		// this.addImg();
	}

	toJSON() {
        var item = {};
		item.index = this._index;
		item.url = this.filename;
		
		item.x = this.x;
		item.y = this.y;
		item.width = this._width;
		item.height = this._height;
		item.flipX = this._image.get('flipX');

		item.angle = this.group.angle;
		item.scale = {};
		item.scale.x = this.group.scaleX;
		item.scale.y = this.group.scaleY;
		item.width = this.group.width * this.group.scaleX;
		item.height = this.group.height * this.group.scaleY;

		// TODO clippath
		
		item.character = this._character;

		item.shadow = {};
		item.shadow.active = this.shadowActive;
		item.shadow.url = this.filename;
		item.shadow.x = this.ombreX;
		item.shadow.y = this.ombreY;
		item.shadow.blur = this.blur;
		item.shadow.color = this.ombreColor;

		return item;
	}

	addImg() {
		var self = this;
		var newUrl = this.filename;
		
		// omb img
		fabric.Image.fromURL(newUrl, function (oImg) {
			self.initImageShadow(oImg);
			
			//self._y = self.canvas.height - oImg.getScaledHeight();
			//oImg.set('top', self._y);
			oImg.moveTo(self._index - 1);
			oImg.perPixelTargetFind = true;

			// self.addImgToGroup(oImg, true);
			self.group.addWithUpdate(oImg);
			self.canvas.requestRenderAll();
			self._imageShadowLoaded = true;
		}, {crossOrigin: 'Anonymous'});

		// img
		fabric.Image.fromURL(newUrl, function (oImg) {
			self.initImage(oImg);
			
			//self._y = self.canvas.height - oImg.getScaledHeight();
			oImg.set('top', self._y);
			oImg.moveTo(self._index);
			oImg.perPixelTargetFind = true;

			// on l'ajout qu'une fois l'ombre ajouté
			self.addImgToGroup(oImg, self._imageShadowLoaded)
			self._imgLoaded = true;
		}, {crossOrigin: 'Anonymous'});
		
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
		this.group.moveTo(this._index);
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
			if (newUrl) {
				self.updateImage(newUrl);
				self.updateShadow(newUrl);
			}
		}, {crossOrigin: 'Anonymous'});

		this.canvas.renderAll();
		return this._filename;
	}
	// TODO setter _character

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
	get blur() {
		return this._shadowBlur;
	}
	set blur(pBlur) {
		this._shadowBlur = pBlur;
		var filter = new fabric.Image.filters.Blur({
			blur: pBlur
		});
		//if (this._imageShadow.filters[0])
		//	delete this._imageShadow.filters[0];
		
		this._imageShadow.filters[1] = filter;
		this._imageShadow.applyFilters();
		this.canvas.renderAll();
	}
	get opacity() {
		return this._shadowOpacity;
	}
	set opacity(pOpac) {
		this._shadowOpacity = pOpac;
		this._imageShadow.set('opacity', pOpac);
		this.canvas.renderAll();
	}
	get ombreColor() {
		return this._shadowColor;
	}
	set ombreColor(pColor) {
		this._shadowColor = pColor;
		var filter = new fabric.Image.filters.BlendColor({
			color: pColor,
			mode: 'tint',
		});
		//if (this._imageShadow.filters[0])
		//	delete this._imageShadow.filters[0];
		
		this._imageShadow.filters[0] = filter;
		this._imageShadow.applyFilters();
		this.canvas.renderAll();
	}
	/* */

	get x() {
		return this.group.left;
	}
	set x(pX) {
		this.group.set('left', pX);
		this.canvas.renderAll();
	}
	get y() {
		return this.group.top;
	}
	set y(pY) {
		this.group.set('top', pY);
		this.canvas.renderAll();
	}
	get angle() {
		return this.group.angle;
	}
	set angle(pAngle) {
		this._angle = pAngle;
		this.group.set('angle', pAngle);
		this.canvas.renderAll();
		return this._angle;
	}

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

		var newY = this.canvas.height - newImg.getScaledHeight();
		newImg.set({
			left: this._x + this._shadowX,
			top: newY + this._shadowY,
			perPixelTargetFind: true
		});
	}

	updateImage(url) {
		console.log("update img " + url + " .. ");
		var self = this;
		if (this._image) {
			this._image.setSrc(url, function () {
				self.canvas.requestRenderAll();
			}, {crossOrigin: 'Anonymous'});
			/* this._image.scaleToWidth(this._width);
			this._image.scaleToHeight(this._height); */
		}
	}
	updateShadow(url) {
		var self = this;
		if (this._imageShadow) {
			this._imageShadow.setSrc(url, function () {
				self.canvas.requestRenderAll();
			}, {crossOrigin: 'Anonymous'});
			/* this._imageShadow.scaleToWidth(this._width);
			this._imageShadow.scaleToHeight(this._height); */
		}
	}

	flip() {
		this._image.toggle("flipX");
		this._imageShadow.toggle("flipX");
		this.canvas.renderAll();
	}

	reset() {
		this.x = this._initOpt.x;
		this.y = this._initOpt.y;
		this.angle = 0;
		//this.initImage(this._image);
		this.group.scaleX = 1;
		this.group.scaleY = 1;
		this.group.width = this._width;
		//this.group.height = this._height;

		this._image.scaleToWidth(this._width);
		
		this.canvas.renderAll();
	}
}

export {
	CustomImage
};