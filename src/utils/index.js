
import Ultimate from "../utils/ultimate"

const utils = {
    pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length - size);
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    getRandomCharUlt() {
        let characters = Ultimate.STOCKS;
        var rand = characters[this.getRandomInt(characters.length)];
        // tant que random
        while (rand._id === '?') {
            rand = this.getRandomCharUlt();
        }
        // -- random costume
        var randCostum = this.pad(this.getRandomInt(rand.maxCol), 2);
        rand.col = randCostum;
        return rand;
    }
}

export default utils