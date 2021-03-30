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
    }

    addToCanvas() {
        // console.log(".. add to canvas", this.tag);
        this.canvas.add(this.bg.rect);
        this.canvas.add(this.myTag.group);

        this.characters.addImg();

        this.canvas.sendToBack(this.bg.rect);
        this.canvas.bringToFront(this.myTag.group);
    }

    alignTag(alignmentH, alignmentV) {
		console.log(".. align tag", alignmentH ? alignmentH : alignmentV, this.tag);
        this.myTag.align(alignmentH, alignmentV);
    }

    flipChar() {
        console.log(".. flip image char", this.tag);
        this.characters.flip();
    }

    // CHARACTERS
    get filename() {
        return this.characters.filename;
    }
    set filename(filename) {
        if (filename)
            return this.characters.filename = filename;
        else
            return this.characters.filename = null;
    }
    get image() {
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
    get isTagClipPath() {
        return this.myTag.isClipPath;
    }
    set isTagClipPath(isClipP) {
        return this.myTag.isClipPath = isClipP;
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

    get colorTag() {
        return this.myTag.color;
    }
    set colorTag(pColor) {
        return this.myTag.color = pColor;
    }
}

export {
    Player
};