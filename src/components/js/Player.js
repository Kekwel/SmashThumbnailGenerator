import { fabric } from "fabric";
import { CustomImage } from "./CustomImage";
//import { Character } from "./Character";
import Utils from "../../utils"

class Player {
    _number;
    _canvas;
    myTag;
    charArray = [];
    tmpCharSeparator;
    bg;

    constructor(nb, canvas, tag, char, bg) {
        this.number = nb;

        this._canvas = canvas;

        // Tag (custom text)
        this.myTag = tag;

        // Characters
        this.charArray.push(char);

        if (this.number === 'j1')
            this.tmpCharSeparator = new fabric.Polygon([{x: 5, y: 0}, {x: 645, y: 720}, {x: 635, y: 720}, {x: 0, y: 5}, {x: 0, y: 0}], 
                {absolutePositioned: true, strokeWidth: 0, perPixelTargetFind: true});
        else 
            this.tmpCharSeparator = new fabric.Polygon([{x: 1275, y: 0}, {x: 635, y: 720}, {x: 645, y: 720}, {x: 1280, y: 5}, {x: 1280, y: 0}], 
                {absolutePositioned: true, strokeWidth: 0, perPixelTargetFind: true});


        // Background
        this.bg = bg;
    }

    reverseCharacter() {
        let tmp = this.charArray[0];
        this.charArray[0] = this.charArray[1];
        this.charArray[1] = tmp;
    }

    addToCanvas() {
        // console.log(".. add to canvas", this.tag);
        this.canvas.add(this.bg.rect);
        this.canvas.add(this.myTag.group);

        for (const element of this.charArray) {
            element.addImg();
        }

        this.canvas.sendToBack(this.bg.rect);
        //this.canvas.bringToFront(this.myTag.group);
        this.myTag.group.moveTo(200);
    }

    align(alignmentH, alignmentV) {
        console.log(".. align tag", alignmentH ? alignmentH : alignmentV, this.tag);
        this.myTag.align(alignmentH, alignmentV);
    }

    renderAll() {
        this.canvas.renderAll();
    }

    addImg(game) {
        // separator
        this.canvas.add(this.tmpCharSeparator);
        this.tmpCharSeparator.moveTo(125);

        let img0 = this.charArray[0];

        // random char
        var char1 = Utils.getRandomChar(game);
        let newX1 = -100, newY1 = 205;
        var imgOpt;
        var clipPath, clipPath0;
        if (this.number === 'j1') {
            img0.x = img0.x + 100;
            img0.y = 0;
            clipPath0 = new fabric.Polygon([{x: 0, y: 0}, {x: 640, y: 0}, {x: 640, y: 720}], {absolutePositioned: true, strokeWidth: 0});
            
            clipPath = new fabric.Polygon([{x: 0, y: 0}, {x: 0, y: 720}, {x: 640, y: 720}], {absolutePositioned: true, strokeWidth: 0});
            imgOpt = { number: this.number, character: char1, x: newX1, y: newY1 };
        } else {
            img0.x = 640 - 100;
            img0.y = 0;
            clipPath0 = new fabric.Polygon([{x: 1280, y: 0}, {x: 640, y: 0}, {x: 640, y: 720}], {absolutePositioned: true, strokeWidth: 0});

            clipPath = new fabric.Polygon([{x: 1280, y: 0}, {x: 1280, y: 720}, {x: 640, y: 720}], {absolutePositioned: true, strokeWidth: 0});
            imgOpt = {number: this.number, character: char1, x: 640 + 100, y: newY1 };
        }
        var img = new CustomImage(this.canvas, imgOpt, clipPath);
        img0.group.clipPath = clipPath0;

        this.charArray.push(img);
        img.addImg();
        img.group.moveTo(150);

        // set ombre
        this.initNewShadow(img, img0);

        return char1;
    }
    initNewShadow(newImg, firstImg) {
		var self = this;
		if (!newImg._imageShadowLoaded) {
			// Image not loaded yet, need to wait
			setTimeout(function () { self.initNewShadow(newImg, firstImg) }, 500);
			return;
		}

        // index
        /* if (this.number === 'j1') {
            this.tmpCharSeparator.moveTo(firstImg._index - 3);
        } else {
            this.tmpCharSeparator.moveTo(firstImg._index);
        } */
        
        newImg.ombre = firstImg.ombre;
        newImg.ombreX = firstImg.ombreX;
        newImg.ombreY = firstImg.ombreY;
        newImg.blur = firstImg.blur;
        newImg.ombreColor = firstImg.ombreColor;
    }

    removeImg() {
        let img0 = this.charArray[0];
        this.canvas.remove(this.charArray[1].group);
        this.charArray.pop();

        var clipPath;
        if (this.number === 'j1') {
            // remettre position original
            img0.x = 0;
            img0.y = 85;
            
            // remettre clippath original
            clipPath = new fabric.Rect({ width: 640, height: 720, top: 0, left: 0, absolutePositioned: true, strokeWidth: 0 });
        } else {
            img0.x = 640;
            img0.y = 85;

            clipPath = new fabric.Rect({ width: 640, height: 720, top: 0, left: 640, absolutePositioned: true, strokeWidth: 0 });
        }
        
        img0.group.clipPath = clipPath;

        this.canvas.remove(this.tmpCharSeparator);
        this.renderAll();
    }

    toJSON() {
        // TODO characters array
        return {
            player: this._number,
            tag: this.myTag,
						bg: this.bg,
            characters: this.firstCharacter
        }
    }

    get firstCharacter() {
        return this.charArray[0];
    }
    get secondCharacter() {
        return this.charArray[1];
    }

    get canvas() {
        return this._canvas;
    }
    set canvas(cv) {
        this._canvas = cv;
        this.myTag.canvas = cv;
        for (const element of this.charArray) {
            element.canvas = cv;
        }
        this.bg.canvas = cv;
        return this.canvas;
    }

    get number() {
        return this._number;
    }  
    set number(nb) {
        this._number = nb;
        return this._number;
    }

    // CHARACTERS
    get filename() {
        // retourne seulement le 1er personnage
        return this.charArray[0].filename;
    }
    set filename(filename) {
        if (filename)
            return this.charArray[0].filename = filename;
        else
            return this.charArray[0].filename = null;
    }
    get image() {
        return this.charArray[0].image;
    }

    // OMBRE
    get ombre() {
        return this.charArray[0].ombre;
    }
    set ombre(pOmbre) {
        for (const element of this.charArray) {
            element.ombre = pOmbre;
        }
    }
    get ombreX() {
        return this.charArray[0].ombreX;
    }
    set ombreX(pOmbre) {
        for (const element of this.charArray) {
            element.ombreX = pOmbre;
        }
    }
    get ombreY() {
        return this.charArray[0].ombreY;
    }
    set ombreY(pOmbre) {
        for (const element of this.charArray) {
            element.ombreY = pOmbre;
        }
    }
    get ombreColor() {
        return this.charArray[0].ombreColor;
    }
    set ombreColor(pOmbre) {
        for (const element of this.charArray) {
            element.ombreColor = pOmbre;
        }
    }
    get ombreBlur() {
        return this.charArray[0].blur;
    }
    set ombreBlur(pOmbre) {
        for (const element of this.charArray) {
            element.blur = pOmbre;
        }
    }
    get ombreOpacity() {
        return this.charArray[0].opacity;
    }
    set ombreOpacity(pOpac) {
        for (const element of this.charArray) {
            element.opacity = pOpac;
        }
    }

    get ombreTag() {
        return this.myTag.ombre;
    }
    set ombreTag(pOmbre) {
        return this.myTag.ombre = pOmbre;
    }

    get colorBg() {
        return this.bg.color;
    }
    set colorBg(pColor) {
        return this.bg.color = pColor;
    }
    get color2Bg() {
        return this.bg.color2;
    }
    set color2Bg(pColor2) {
        return this.bg.color2 = pColor2;
    }

    // TAG
    // TODO comment mieux faire/déléguer ?
    get tag() {
        return this.myTag.txt;
    }
    set tag(txt) {
        return this.myTag.txt = txt;
    }
    get size() {
        return this.myTag.size;
    }
    set size(size) {
        return this.myTag.size = size;
    }
    get bold() {
        return this.myTag.bold;
    }
    set bold(idBold) {
        return this.myTag.bold = idBold;
    }
    get italic() {
        return this.myTag.italic;
    }
    set italic(isItalic) {
        return this.myTag.italic = isItalic;
    }
    get isTagClipPath() {
        return this.myTag.isClipPath;
    }
    set isTagClipPath(isClipP) {
        return this.myTag.isClipPath = isClipP;
    }
    get font() {
        return this.myTag.font;
    }
    set font(pFont) {
        return this.myTag.font = pFont;
    }
    get angle() {
        return this.myTag.angle;
    }
    set angle(pAngle) {
        return this.myTag.angle = pAngle;
    }

    get colorsTagBg() {
        return this.myTag.colors;
    }
    set colorsTagBg(pColors) {
        return this.myTag.colors = pColors;
    }

    get color2TagBg() {
        return this.myTag.color2Bg;
    }
    set color2TagBg(pColor2) {
        return this.myTag.color2Bg = pColor2;
    }

    get color() {
        return this.myTag.color;
    }
    set color(pColor) {
        return this.myTag.color = pColor;
    }

		/* IMPORT */

}

export {
    Player
};