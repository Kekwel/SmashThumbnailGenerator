<template>
  <div style="width: 100%;">
    <div class="columns is-gapless is-vcentered is-centered" style="margin-top: 0.5em; margin-bottom: 0.25em;">
      <div class="column">
        <v-select style="width: 20em; margin: auto" :options="characters" label="_name" @input="updateChar($event, player)" v-model="crtCharacter">
          <template #selected-option="{ _name, _firstStockUrl }">
            <div class="stock-icon-selected">
              <stock-icon :width="32" :src="_firstStockUrl" /> {{ _name }}
            </div>
          </template>
          <template #option="option">
            <div class="stock-icon-selected">
              <stock-icon :width="32" :src="option._firstStockUrl" />{{ option._name }}
            </div>
          </template>
        </v-select>
      </div>
      <div class="column">
        <button title="Flip" class="button" style="margin-left: 0.5em;" @click="player.flipChar(); activeFlip = !activeFlip" :class="{'is-primary': activeFlip}">
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.flip"></svg-icon>
          </span></button>
      </div>
    </div>

    <div v-if="crtCharacter">
      <div class="row-stock-icon my-1" v-for="(row, i) in crtCharacter.maxRow" :key="row" >
        <div  v-for="(col, j) in crtCharacter.maxCol" :key="col" 
              :id="getIdStock(i, j)"
              class="stock-icon"
              :class="playerClass" 
              :style="stockStyles(i, j)" 
              @click="setCurrentChar(player, i, j)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import StockIcon from '../ui/StockIcon.vue';
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiFlipHorizontal
} from "@mdi/js";
export default {
  components: { vSelect, StockIcon, SvgIcon },
  props: {
    player: Object,
    characters: Array,
  },
  data() {
    return {
      crtCharacter: {_name: ''},
      stockIconDivs: [],
      activeFlip: false,
      icon: {
        flip: mdiFlipHorizontal
      }
    };
  },
  updated() {
    this.updateActive();
  },
  computed: {
    // a computed getter
    maxWidth() {
      return this.crtCharacter.maxCol * 48;
    },
    playerClass() {
      return this.player.number;
    }
  },
  methods: {
    stockStyles(row, col) {
      return {
        'background-image': `url(${this.crtCharacter.getAllStocksUrl()})`,
        'background-size' : `${this.maxWidth}px ${(this.crtCharacter.maxRow) * 48}px`,
        'background-position': `${col * -48}px ${row * -48}px`
      }
    },
    updateChar(character) {
      this.resetActive();
      console.log("update", character ? character.formatName : 'null', "for player", this.player.number, "..");
      if (character)
        this.player.filename = character.getCharUrl();
      else
        this.player.filename = '';
      this.crtCharacter = character;

      this.initStockIconDivsArray();
      this.updateActive();
    },
    setCurrentChar(player, row, col) {
      this.crtCharacter.row = row;
      this.crtCharacter.col = this.pad(col, 2);
      this.updateChar(this.crtCharacter, player);
    },
    initStockIconDivsArray() {
      var divArray = [];
      var i, j;
      if (this.crtCharacter) {
        for (i = 0; i < this.crtCharacter.maxRow; i++) {
          for (j = 0; j < this.crtCharacter.maxCol; j++) {
            // TODO push directement la div ?
            divArray.push(this.getIdStock(i, j));
          }
        }
      }
      this.stockIconDivs = divArray;
    },
    updateActive() {
      if (this.crtCharacter) {
        var crtDivId = this.stockIconDivs[this.pad(this.crtCharacter.col, 1)];
        var crtDiv = document.getElementById(crtDivId);
        if (crtDiv)
          crtDiv.classList.toggle('active-' + this.player.number);
      }
    },
    resetActive() {
      for (let d of this.stockIconDivs) {
        var crt = document.getElementById(d);
        if (crt)
          crt.classList.remove('active-' + this.player.number);
      }
    },
    getIdStock(row, col) {
      // TODO ajouter player dans id
      // TODO ajouter dans Character ?
      return this.player.number + '-' + this.crtCharacter.formatName + '-' + row + '-' + this.pad(col, 2);
    },
    selectChar(char) {
      this.updateChar(char);
    },
    isActiveFlip(val) {
      return this.activeFlip === val;
    },
    /* TODO UTILS */
    pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length - size);
    }
  },
};
</script>

<style>
.center {
  text-align: center;
}

.row-stock-icon {
  display: flex;
  height: 48px;
}

.stock-icon {
  height: 48px;
  width: 48px;
}

.stock-icon.active-j1 {
  box-shadow: inset 0 0 10px #D41619 !important;
}
.stock-icon:hover.j1 {
  box-shadow: 0 0 10px #D41619;
}
.stock-icon.active-j2{
  box-shadow: inset 0 0 10px #0049B9 !important;
}
.stock-icon:hover.j2 {
  box-shadow: 0 0 10px #0049B9;
}
</style>