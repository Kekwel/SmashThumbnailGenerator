import { fabric } from "fabric";
import { CustomRect } from "./CustomRect";
import { Shadow } from "./Shadow";

var FontFaceObserver = require('fontfaceobserver');

class CustomText {

  /* Fabric components */
  _canvas;
  text;
  bgTag;
  group;
  clipPath;

  _txt = 'Player X';

  _size = 40;
  _x = 0;
  _y = 0;
  _angle = 0;
  //_width = 640;
  //_height = 100;
  // TODO bordure radius

  _shadow = new Shadow();
  _isShadow = false;
  _isClipPath = true;

  _alignmentX = 'center';
  _alignmentY = 'middle';

  _color = {
    hex: 'black'
  };

  _font = 'Open Sans';

  _bold = false;
  _italic = false;
  _index = 2;

  _initOpt;
  _initOptBg;

  constructor(canvas, tagOptions, bgTagOptions, clipPath) {
    var self = this;
    this._canvas = canvas;

    this._initOpt = tagOptions;
    this._initOptBg = bgTagOptions;

    this._index = tagOptions.index || this._index;

    // Txt
    this._txt = tagOptions.tag || this._txt;

    // Position (middle by default)
    this._x = tagOptions.x || this._x;
    this._y = tagOptions.y || this._y;

    // Alignment
    this._alignmentX = tagOptions.alignmentX || this._alignmentX;
    this._alignmentY = tagOptions.alignmentY || this._alignmentY;

    // Font Properties
    this._size = tagOptions.size || this._size;
    // Color Font
    this._color = tagOptions.color || this._color;
    // TODO Other ? Comment mieux faire ?
    this._bold = tagOptions.bold || this._bold;
    this._italic = tagOptions.italic || this._italic;

    // Fabric object : Text
    this.text = new fabric.Text(this._txt, {
      left: this._x,
      top: this._y,
      fontSize: this._size,
      fill: this._color
    });
    this.text.set('fontWeight', this._bold ? 'bold' : 'normal');
    this.text.set('fontStyle', this._italic ? 'italic' : 'normal');

    // Custom object : CustomRect
    if (bgTagOptions) {
      this.bgTag = new CustomRect(this.canvas, bgTagOptions);

      // Group
      this.group = new fabric.Group([this.bgTag.rect, this.text], {
        left: 0 + this._x,
        top: 0 + this._y,
        strokeWidth: 0,
      });
      this.group.on('scaling', function () {
        var rect = this.item(1),
          scaleX = this.width / (this.width * this.scaleX),
          scaleY = this.height / (this.height * this.scaleY);
        rect.scaleX = scaleX;
        rect.scaleY = scaleY;
        self.align();
      });

      this.bgTag._shadow.canvas = this.canvas;
      this.bgTag._shadow.parent = this.group;
      //this.bgTag._shadow.active = false;
    } else {
      this._shadow = new Shadow();
      this._shadow.canvas = this.canvas;
      this._shadow.parent = this.text;
    }

    if (clipPath) {
      // TODO on/off
      // TODO povoir le déplacer ?
      this.group.clipPath = clipPath;
      this.clipPath = clipPath;
      this._isClipPath = true;
    }

    this.align('center', 'middle');
  }

  toJSON() {
    var item = {};
    item.index = this._index;

    // Texte
    var itemText = {};
    itemText.value = this._txt;
    itemText.x = this.x;
    itemText.y = this.y;
    itemText.fontSize = this._size;
    itemText.fill = this._color;
    itemText.font = this._font;
    itemText.fontWeight = this._bold ? 'bold' : 'normal';
    itemText.fontStyle = this._italic ? 'italic' : 'normal';
    itemText.alignmentX = this._alignmentX;
    itemText.alignmentY = this._alignmentY;

    // Background
    var itemBg = this.bgTag ? this.bgTag.toJSON() : {};
    if (this.bgTag) {
      item.angle = this.group.angle;
      itemBg.scale = {};
      itemBg.scale.x = this.group.scaleX;
      itemBg.scale.y = this.group.scaleY;
      itemBg.width = this.group.width * this.group.scaleX;
      itemBg.height = this.group.height * this.group.scaleY;
    } else {
      item.scale = {};
      item.scale.x = this.text.scaleX;
      item.scale.y = this.text.scaleY;
      item.width = this.text.width * this.text.scaleX;
      item.height = this.text.height * this.text.scaleY;
      item.angle = this.text.angle;
    }

    // Shadow
    var itemShadow = this.bgTag ? this.bgTag._shadow : this._shadow;

    item.text = itemText;
    if (this.bgTag) item.bg = itemBg;
    if (this.ombre) item.shadow = itemShadow;

    return item;
  }

  get canvas() {
    return this._canvas;
  }
  set canvas(cv) {
    this._canvas = cv;
    if (this.bgTag) {
      this.bgTag.canvas = cv;
      this.bgTag._shadow.canvas = cv;
    } else {
      this._shadow.canvas = cv;
    }
    return this.canvas;
  }

  /* OMBRE */
  get ombre() {
    return this.bgTag ? this.bgTag._shadow.active : this._shadow.active;
  }
  set ombre(pOmbre) {
    if (this.bgTag) this.bgTag._shadow.active = pOmbre;
    else this._shadow.active = pOmbre;
  }
  get ombreX() {
    return this.bgTag ? this.bgTag._shadow.offsetX : this._shadow.offsetX;
  }
  set ombreX(pOffset) {
    if (this.bgTag) this.bgTag._shadow.offsetX = pOffset;
    else this._shadow.offsetX = pOffset;
  }
  get ombreY() {
    return this.bgTag ? this.bgTag._shadow.offsetY : this._shadow.offsetY;
  }
  set ombreY(pOffset) {
    if (this.bgTag) this.bgTag._shadow.offsetY = pOffset;
    else this._shadow.offsetY = pOffset;
  }
  get ombreBlur() {
    return this.bgTag ? this.bgTag._shadow.blur / 100 : this._shadow.blur / 100;
  }
  set ombreBlur(pBlur) {
    if (this.bgTag) this.bgTag._shadow.blur = pBlur * 100;
    else this._shadow.blur = pBlur * 100;
  }
  get ombreOpacity() {
    return this.bgTag ? this.bgTag._shadow.opacity / 100 : this._shadow.opacity / 100;
  }
  set ombreOpacity(pOpac) {
    if (this.bgTag) this.bgTag._shadow.opacity = pOpac * 100;
    else this._shadow.opacity = pOpac * 100;
  }
  get ombreColor() {
    return this.bgTag ? this.bgTag._shadow.color : this._shadow.color;
  }
  set ombreColor(pColor) {
    if (this.bgTag) this.bgTag._shadow.color = pColor;
    else this._shadow.color = pColor;
  }
  /* */

  get txt() {
    return this._txt;
  }
  set txt(txt) {
    this._txt = txt;
    this.text.set('text', txt);
    this.align();
    return this._txt;
  }
  get smallTxt() {
    if (this._txt.startsWith('Round')) {
      return 'R' + this._txt.slice(-1);
    } else {
      switch (this._txt) {
        case 'Winners':
          return 'W';
        case 'Losers':
          return 'L';
        case 'Grand':
          return 'G';
        case 'Quarters':
          return 'Q';
        case 'Semis':
          return 'S';
        case 'Finals':
          return 'F';
        default:
          return '';
      }
    }
  }
  get size() {
    return this._size;
  }
  set size(size) {
    this._size = size;
    this.text.set('fontSize', size);
    this.align();
    return this._size;
  }
  get bold() {
    return this._bold;
  }
  set bold(isBold) {
    this._bold = isBold;
    this.text.set('fontWeight', isBold ? 'bold' : 'normal');
    this.canvas.renderAll();
    return this._bold;
  }
  get italic() {
    return this._italic;
  }
  set italic(isItalic) {
    this._italic = isItalic;
    this.text.set('fontStyle', isItalic ? 'italic' : 'normal');
    this.canvas.renderAll();
    return this._italic;
  }
  get font() {
    return this._font;
  }
  set font(pFont) {
    this._font = pFont;
    /* this.text.set("fontFamily", pFont);
        this.canvas.renderAll(); */
    // eslint-disable-next-line no-unused-vars
    var self = this;
    var myfont = new FontFaceObserver(pFont);
    myfont.load().then(function () {
      // when font is loaded, use it.
      self.text.set("fontFamily", pFont);
      self.canvas.renderAll();
      console.log('font loaded', pFont);

      self.align();
    }).catch(function (e) {
      console.log('font loading failed', pFont, e);
    });
    return pFont;
  }
  get angle() {
    return this.bgTag ? this.group.angle : this.text.angle;
  }
  set angle(pAngle) {
    this._angle = pAngle;
    if (this.bgTag) this.group.set('angle', pAngle);
    else this.text.set('angle', pAngle);
    this.canvas.renderAll();
    return this._angle;
  }

  get colors() {
    return this.bgTag.colors;
  }
  set colors(pColors) {
    return this.bgTag.colors = pColors;
  }

  get colorDirection() {
    return this.bgTag.colorDirection;
  }
  set colorDirection(pDir) {
    return this.bgTag.colorDirection = pDir
  }

  get color2Bg() {
    return this.bgTag.color2;
  }
  set color2Bg(pColor2) {
    return this.bgTag.color2 = pColor2;
  }

  get color() {
    return this._color;
  }
  set color(pColor) {
    this.text.set('fill', pColor);
    this.canvas.renderAll();
    this._color = pColor;
    return this._color;
  }

  get isClipPath() {
    return this._isClipPath;
  }
  set isClipPath(isClipP) {
    this._isClipPath = isClipP;
    if (isClipP) {
      this.group.clipPath = this.clipPath;
    } else {
      this.group.clipPath = null;
      var tmpColors = this.bgTag.colors;
      this.bgTag.colors = tmpColors;
    }
    this.canvas.renderAll();
    return this._isClipPath;
  }

  get x() {
    return this.bgTag ? this.group.left : this.text.left;
  }
  set x(pX) {
    if (this.bgTag)
      this.group.set('left', pX);
    else
      this.text.set('left', pX);
    this.canvas.renderAll();
  }
  get y() {
    return this.bgTag ? this.group.top : this.text.top;
  }
  set y(pY) {
    if (this.bgTag)
      this.group.set('top', pY);
    else
      this.text.set('top', pY);
    this.canvas.renderAll();
  }

  align(alignmentH, alignmentV) {
    if (alignmentH)
      this._alignmentX = alignmentH;
    if (alignmentV)
      this._alignmentY = alignmentV;

    if (this.bgTag) {
      // TODO padding
      var padding = 25;
      var textW = this.text.getScaledWidth(),
        textH = this.text.getScaledHeight();
      var rectW = this.bgTag.rect.width,
        rectH = this.bgTag.rect.height;

      switch (this._alignmentX) {
        case 'left':
          this.text.set('left', (-rectW / 2) + padding);
          break;
        case 'center':
          this.text.set('left', -(textW / 2));
          break;
        case 'right':
          this.text.set('left', (rectW / 2 - textW) - padding);
          break;
      }
      switch (this._alignmentY) {
        case 'top':
          this.text.set('top', -rectH / 2);
          break;
        case 'middle':
          this.text.set('top', -(textH / 2));
          break;
        case 'bottom':
          this.text.set('top', rectH / 2 - textH);
          break;
        default:
          break;
      }
    }
    if (this.canvas)
      this.canvas.renderAll();
  }

  reset() {
    this.x = this._initOpt.x;
    this.y = this._initOpt.y;
    this.size = this._initOpt.size;
    this.color = this._initOpt.color;
    this.angle = 0;
    this.text.scaleX = 1;
    this.text.scaleY = 1;

    if (this._initOptBg) {
      this.group.scaleX = 1;
      this.group.scaleY = 1;
      this.bgTag.resetSize();

      this.align('center', 'middle');
    } else {
      this.text.center();
    }

    this.canvas.renderAll();
  }
}

export {
  CustomText
};