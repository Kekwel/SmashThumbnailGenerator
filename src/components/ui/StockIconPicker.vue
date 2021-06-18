<template>
  <v-container class="pa-0">
    <v-row no-gutters>
      <v-col>
        <v-row no-gutters>
          <v-col cols="10">
            <!-- TODO v-autocomplete ? -->
            <v-select class="my-2" style="width: 15.5em" :options="characters" label="_name" @input="updateChar($event, image)" v-model="crtCharacter">
              <template #selected-option="{ _name, _firstStockUrl }">
                <div class="stock-icon-selected">
                  <stock-icon :width="28" :src="_firstStockUrl" /> {{ _name }}
                </div>
              </template>
              <template #option="option">
                <div class="stock-icon-selected">
                  <stock-icon :width="28" :src="option._firstStockUrl" />{{ option._name }}
                </div>
              </template>
            </v-select>
          </v-col>
          <v-col cols="2" align-self="center" class="d-flex justify-end">
            <v-btn @click="image.flip(); updateActive(); activeFlip = !activeFlip" :color="activeFlip ? 'primary' : ''" :dark="activeFlip" elevation="2" small>
              <v-icon dark left>mdi-flip-horizontal</v-icon> Flip
            </v-btn>
          </v-col>
        </v-row>

        <div v-if="crtCharacter">
          <div class="row-stock-icon my-1" v-for="(row, i) in crtCharacter.maxRow" :key="row" >
            <div  v-for="(col, j) in crtCharacter.maxCol" :key="col" 
                  :id="getIdStock(i, j)"
                  class="stock-icon"
                  :class="playerClass" 
                  :style="stockStyles(i, j)" 
                  @click="setCurrentChar(image, i, j)">
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import vSelect from "vue-select";
import StockIcon from '../ui/StockIcon.vue';
export default {
  components: { vSelect, StockIcon },
  props: {
    player: Object,
    image: Object,
    characters: Array,
  },
  data() {
    return {
      crtCharacter: {_name: ''},
      stockIconDivs: [],
      activeFlip: false,
    };
  },
  updated() {
    this.updateActive();
  },
  computed: {
    maxColWidth() {
      return this.crtCharacter.maxCol * this.maxWidth;
    },
    maxWidth() {
      var widthscrencan = screen.width;
      var maxW = 48;
      if (widthscrencan <= 1264) // md
        maxW = 36;
      else if (widthscrencan <= 1500) // md bis
        maxW = 42;
      else if (widthscrencan <= 1904) // lg
        maxW = 48;
      else // xl
        maxW = 48;
      return maxW;
    },
    playerClass() {
      return this.image.number;
    },
    size () {
      const size = {xs:'x-small', sm:'small', md:'small', lg:'small', xl:'small'}[this.$vuetify.breakpoint.name];
      return size ? { [size]: true } : {}
    },
  },
  methods: {
    stockStyles(row, col) {
      /*var maxW = this.maxWidth();*/
      return {
        'background-image': `url(${this.crtCharacter.getAllStocksUrl()})`,
        'background-size' : `${this.maxColWidth}px ${(this.crtCharacter.maxRow) * this.maxWidth}px`,
        'background-position': `${col * -this.maxWidth}px ${row * -this.maxWidth}px`,
        'height' : `${this.maxWidth}px`,
        'width' : `${this.maxWidth}px`
      }
    },
    maxWidth2() {
      var widthscrencan = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      var maxW = 48;
      if (widthscrencan <= 1264) { // md
        maxW = 36;
      } else if (widthscrencan <= 1500) { // md bis
        maxW = 42;
      } else if (widthscrencan <= 1904) { // lg
        maxW = 48;
      } else { // xl
        maxW = 48;
      }
      return maxW;
    },
    updateChar(character) {
      this.resetActive();
      console.log("update", character ? character.formatName : 'null', "for player", this.image.number, "..");
      if (character)
        this.image.filename = character.getCharUrl();
      else
        this.image.filename = '';
      this.crtCharacter = character;

      this.initStockIconDivsArray();
      this.updateActive();
    },
    setCurrentChar(image, row, col) {
      this.crtCharacter.row = row;
      this.crtCharacter.col = this.pad(col, 2);
      this.updateChar(this.crtCharacter, image);
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
          crtDiv.classList.toggle('active-' + this.image.number);
      }
    },
    resetActive() {
      for (let d of this.stockIconDivs) {
        var crt = document.getElementById(d);
        if (crt)
          crt.classList.remove('active-' + this.image.number);
      }
    },
    getIdStock(row, col) {
      // TODO ajouter player dans id
      // TODO ajouter dans Character ?
      return this.image.number + '-' + this.crtCharacter.formatName + '-' + row + '-' + this.pad(col, 2);
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