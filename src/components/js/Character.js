class Character {
    _game;
    _id;
    _name;
    _formatName;

    _firstStockUrl;
    _allStockUrl;
    
    _row;
    _maxRow;
    _col;
    _maxCol;

    // TODO
    constructor(game, id, name, formatName, maxRow, maxCol) {
        this._game = game;
        this._id = id;
        this._name = name;
        this._formatName = formatName;

        this._row = 0;
        this._maxRow = maxRow;
        this._col = '00';
        this._maxCol = maxCol;

        this._firstStockUrl = this.getfirstStockUrl();
        this._allStockUrl = this.getAllStocksUrl();
    }

    toJSON() {
        var item = {};
        // TODO ?
        return item;
    }

    // img/stock/$GAME/$CHARNAME.png
    getRoot() {
        return process.env.NODE_ENV === 'production'
                        ? '/SmashThumbnailGenerator/'
                        : '/'
    }

    getfirstStockUrl() {
        var stockUrl = this.getRoot() + "img/stock/" + this._game + "/"  + this._formatName + ".png";
        return stockUrl;
    }
    // img/stock/$GAME/$CHARNAME_all.png
    getAllStocksUrl() {
        var stocksUrl = this.getRoot() + "img/stock/" + this._game + "/"  + this._formatName + "_all.png";
		return stocksUrl;
    }
    // img/char/$GAME/$CHARNAME_$ROW_$COL.png
    getCharUrl() {
        var charUrl = this.getRoot() + "img/char/" + this._game + "/mario_" + this._row + "_" + this._col + ".png";
        if (this._formatName)
            charUrl = this.getRoot() + "img/char/" + this._game + "/" + this._formatName + "_" + this._row + "_" + this._col + ".png";
		return charUrl;
    }

    // GETTER SETTER
    get game() {
        return this._game;
    }
    set game(pGame) {
        this._game = pGame;
        return this._game;
    }
    get name() {
        return this._name;
    }
    set name(pName) {
        this._name = pName;
        return this._name;
    }
    get formatName() {
        return this._formatName;
    }
    set formatName(pName) {
        this._formatName = pName;
        return this._formatName;
    }

    get row() {
        return this._row;
    }
    set row(pRow) {
        this._row = pRow;
        return this._row;
    }
    get col() {
        return this._col;
    }
    set col(pCol) {
        this._col = pCol;
        return this._col;
    }
    get maxRow() {
        return this._maxRow;
    }
    set maxRow(pRow) {
        this._maxRow = pRow;
        return this._maxRow;
    }
    get maxCol() {
        return this._maxCol;
    }
    set maxCol(pCol) {
        this._maxCol = pCol;
        return this.maxCol;
    }    
}

export {
    Character
}