class Shadow {
    _parent;
    canvas;
    data = {
		color: '#000',
		blur: 0,
		offsetX: -10,
		offsetY: 10,
		opacity: 0.8
	};
    _active = true;
    
    constructor(parent) {
        this._parent = parent;
    }

    set parent(pParent) {
        return this._parent = pParent;
    }

    get active() {
        return this._active;
    }
    set active(pActive) {
        this._active = pActive;
        this.update();
    }

    get color() {
        return this.data.color;
    }
    set color(pColor) {
        return this.data.color = pColor;
    }
    get blur() {
        return this.data.blur;
    }
    set blur(pBlur) {
        return this.data.blur = pBlur;
    }
    get offsetX() {
        return this.data.offsetX;
    }
    set offsetX(pX) {
        this.data.offsetX = pX;
        this.update();
    }
    get offsetY() {
        return this.data.offsetY;
    }
    set offsetY(pY) {
        this.data.offsetY = pY;
        this.update();
    }
    get opacity() {
        return this.data.opacity;
    }
    set opacity(pOpacity) {
        return this.data.opacity = pOpacity;
    }

    update() {
        this._parent.set('shadow', this.active ? this.data : '');
        //if (this.canvas)
                this.canvas.requestRenderAll();
    }
}

export {
	Shadow
};