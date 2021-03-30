class Character {
    _game;
    _id;
    _name;

    _firstStockUrl;
    

    _row;
    _col;

    // TODO
    constructor(game, id, name) {
        this._game = game;
        this._id = id;
        this._name = name;

        this._row = 0;
        this._col = '00';

        this._firstStockUrl = this.getfirstStockUrl();
    }

    // img/stock/$GAME/$CHARNAME.png
    getfirstStockUrl() {
        var stockUrl = "/img/stock/" + this._game + "/"  + this._name.toLowerCase() + ".png";
		return stockUrl;
	}
    // img/stock/$GAME/$CHARNAME_all.png
    getAllStocksUrl() {
        var stocksUrl = "/img/stock/" + this._game + "/"  + this._name.toLowerCase() + "_all.png";
		return stocksUrl;
    }
    // img/char/$GAME/$CHARNAME_$ROW_$COL.png
    getCharUrl() {
        var charUrl = "/img/char/" + this._game + "/" + this._name.toLowerCase() + "_" + this._row + "_" + this._col + ".png";
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
}

export {
    Character
}