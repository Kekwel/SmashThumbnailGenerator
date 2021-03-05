class Player {
    canvas;
    myTag;
    characters;
    bg;

    constructor(canvas, tag, char, bg) {
        this.canvas = canvas;

        // Tag (custom text)
        this.myTag = tag;

        // Characters
        this.characters = char;

        // Background
        this.bg = bg;

        canvas.add(this.bg.rect);
        canvas.add(this.myTag.group);
        
        canvas.sendToBack(this.bg.rect);
        canvas.bringToFront(this.myTag.group);
    }

    // CHARACTERS
    get filename() {
        return this.characters.filename;
    }
    set filename(filename) {
        return this.characters.filename = filename;
    }
    get image(){
        return this.characters.image;
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
    get tagSize() {
        return this.myTag.size;
    }
    set tagSize(size) {
        return this.myTag.size = size;
    }
    get tagBold() {
        return this.myTag.bold;
    }
    set tagBold(idBold) {
        return this.myTag.bold = idBold;
    }
    get tagItalic() {
        return this.myTag.italic;
    }
    set tagItalic(isItalic) {
        return this.myTag.italic = isItalic;
    }
    get colorTagBg() {
        return this.myTag.colorBg;
    }
    set colorTagBg(pColor) {
        return this.myTag.colorBg = pColor;
    }
    get colorTag() {
        return this.myTag.color;
    }
    set colorTag(pColor) {
        return this.myTag.color = pColor;
    }

    alignTag(alignmentH, alignmentV) {
        this.myTag.align(alignmentH, alignmentV);
    }
}

export {
    Player
};