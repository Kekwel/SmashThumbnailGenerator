
import Stocks from "./stocks"

const utils = {
    pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length - size);
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    getRandomChar(game) {
        let characters = Stocks.ULT;
        switch (game.id) {
            case 0:
                characters = Stocks.ULT;
                break;
            case 1:
                characters = Stocks.MELEE;
                break;
            case 2:
                characters = Stocks.PPLUS;
                break;
        }
        var rand = characters[this.getRandomInt(characters.length)];
        // tant que random
        while (rand._id === '?') {
            rand = this.getRandomChar(game);
        }
        // -- random costume
        var randCostum = this.pad(this.getRandomInt(rand.maxCol), 2);
        rand.col = randCostum;
        return rand;
    },
    getRoot() {
        return process.env.NODE_ENV === 'production'
                        ? '/SmashThumbnailGenerator/'
                        : '/'
    }
}

export default utils