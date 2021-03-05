import {
    fabric
} from "fabric";

fabric.RectWithText = fabric.util.createClass(fabric.Rect, {
    type: 'rectWithText',
    text: null,
    alignment: 'center',
    textOffsetLeft: 0,
    textOffsetTop: 0,
    _prevObjectStacking: null,
    _prevAngle: 0,

    recalcTextPosition: function () {
        const sin = Math.sin(fabric.util.degreesToRadians(this.angle))
        const cos = Math.cos(fabric.util.degreesToRadians(this.angle))
        const newTop = sin * this.textOffsetLeft + cos * this.textOffsetTop
        const newLeft = cos * this.textOffsetLeft - sin * this.textOffsetTop
        const rectLeftTop = this.getPointByOrigin('left', 'top')
        this.text.set('left', rectLeftTop.x + newLeft)
        this.text.set('top', rectLeftTop.y + newTop)

        
        switch (this.alignment) {
            case 'left':
                this.text.set('left', 0);
                break;
            case 'center':
                this.text.set('left', rectLeftTop.x + this.width/2 - this.text.width/2);
                break;
            case 'right':
                // this.text.set('left', rectW / 2 - textW);
                break;
            
            case 'top':
                // this.text.set('top', -rectH / 2);
                break;
            case 'middle':
                // this.text.set('top', -textH / 2);
                break;
            case 'bottom':
                // this.text.set('top', rectH / 2 - textH);
                break;
            default:
                break;
        }
    },

    initialize: function (rectOptions, textOptions, text) {
        this.callSuper('initialize', rectOptions)
        this.text = new fabric.Textbox(text, {
            ...textOptions,
            selectable: false,
            evented: false,
        })
        this.textOffsetLeft = this.text.left - this.left
        this.textOffsetTop = this.text.top - this.top
        this.on('moving', () => {
            this.recalcTextPosition()
        })
        this.on('rotating', () => {
            this.text.rotate(this.text.angle + this.angle - this._prevAngle)
            this.recalcTextPosition()
            this._prevAngle = this.angle
        })
        this.on('scaling', () => {
            this.recalcTextPosition()
            console.log(this.width);
        })
        this.on('added', () => {
            this.canvas.add(this.text)
        })
        this.on('removed', () => {
            this.canvas.remove(this.text)
        })
        this.on('mousedown:before', () => {
            this._prevObjectStacking = this.canvas.preserveObjectStacking
            this.canvas.preserveObjectStacking = true
        })
        this.on('mousedblclick', () => {
            this.text.selectable = true
            this.text.evented = true
            this.canvas.setActiveObject(this.text)
            this.text.enterEditing()
            this.selectable = false
        })
        this.on('deselected', () => {
            this.canvas.preserveObjectStacking = this._prevObjectStacking
        })
        this.text.on('editing:exited', () => {
            this.text.selectable = false
            this.text.evented = false
            this.selectable = true
        })
    }
});