<template>
  <div>
    <v-select :options="characters" label="_name" @input="updateChar($event, player)" v-model="crtCharacter">
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

    <div v-if="crtCharacter">
      <div class="row-stock-icon m-1" v-for="(row, i) in crtCharacter.maxRow" :key="row" >
        <div v-for="(col, j) in crtCharacter.maxCol" :key="col" class="stock-icon" :style="stockStyles(i, j)" @click="setCurrentChar(player, i, j)"></div>
      </div>
    </div>
    <button @click="player.flipChar()">FLIP</button>
  </div>
</template>

<script>
import vSelect from "vue-select";
import StockIcon from '../ui/StockIcon.vue';
export default {
  components: { vSelect, StockIcon },
  props: {
    player: Object,
    characters: Array,
  },
  data() {
    return {
      crtCharacter: {_name: ''},
    };
  },
  computed: {
    // a computed getter
    maxWidth() {
      return this.crtCharacter.maxCol * 48;
    },
  },
  methods: {
    stockStyles(row, col) {
      return {
        'background-image': `url(${this.crtCharacter.getAllStocksUrl()})`,
        'background-size' : `${this.maxWidth}px ${(this.crtCharacter.maxRow) * 48}px`,
        'background-position': `${col * -48}px ${row * -48}px`
      }
    },
    updateChar(character, player) {
      console.log("update char for player ..");
      if (character)
        player.filename = character.getCharUrl();
      else
        player.filename = '';
      this.crtCharacter = character;
    },
    setCurrentChar(player, row, col) {
      this.crtCharacter.row = row;
      this.crtCharacter.col = this.pad(col, 2);

      this.updateChar(this.crtCharacter, player);
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
</style>