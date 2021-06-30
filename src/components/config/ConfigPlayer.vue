<template>
  <!-- Joueurs -->
  <v-container>
    <v-row no-gutters>
      <v-col>
        <option-title :title="$t('title.match')" />
        <v-text-field v-model="j1.tag" color="red" background-color="red lighten-5" dense shaped filled hide-details onClick="this.select();" />
        <stock-icon-picker ref="charJ1" :characters="characters" :player="j1" :image="j1.firstCharacter" />
        <stock-icon-picker v-if="j1.charArray.length > 1" ref="charJ1bis" :characters="characters" :player="j1" :image="j1.secondCharacter" />
        <v-btn v-if="j1.charArray.length == 1" @click="j1.addImg(game)" color="light-blue" dark elevation="2" small>
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <v-row no-gutters v-if="j1.charArray.length > 1">
          <v-col>
            <v-btn  @click="j1.removeImg();" color="error" dark elevation="2" small>
              <v-icon dark>mdi-minus</v-icon>
            </v-btn>
            <v-btn @click="reverseCharacter(j1)" color="cyan" dark elevation="2" small class="ml-2">
              <v-icon dark>mdi-swap-vertical-bold</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-divider class="mt-2" />

        <v-row no-gutters>
          <v-col cols="10">
            <div class="text-center versus ma-2">VS</div>
          </v-col>
          <v-col cols="2" align-self="center">
            <v-btn @click="reversePlayer();" color="green" dark elevation="2" small>
              <v-icon dark>mdi-swap-vertical-bold</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-divider class="mb-2" />

        <v-text-field v-model="j2.tag" color="blue" background-color="blue lighten-5" dense shaped filled hide-details onClick="this.select();" />
        <stock-icon-picker ref="charJ2" :characters="characters" :player="j2" :image="j2.firstCharacter" />
        <stock-icon-picker v-if="j2.charArray.length > 1" ref="charJ2bis" :characters="characters" :player="j2" :image="j2.secondCharacter" />
        <v-btn v-if="j2.charArray.length == 1" @click="j2.addImg(game);" color="light-blue" dark elevation="2" small>
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <v-row no-gutters v-if="j2.charArray.length > 1">
          <v-col>
            <v-btn @click="j2.removeImg();" color="error" dark elevation="2" small>
              <v-icon dark>mdi-minus</v-icon>
            </v-btn>
            <v-btn @click="reverseCharacter(j2)" color="cyan" dark elevation="2" small class="ml-2">
              <v-icon dark>mdi-swap-vertical-bold</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-divider class="mt-2" />

        <!-- Phase TODO component -->
        <option-title :title="$t('title.phase', {nb: ''})" />
        <v-radio-group v-model="phase1.txt" row @change="focusPhase1()" hide-details>
          <v-radio label="Pools" value="Pools" />
          <v-radio label="Winners" value="Winners" />
          <v-radio label="Losers" value="Losers" />
          <v-radio label="Grand" value="Grand" />
        </v-radio-group>
        <v-text-field ref="phase1Input" class="pa-0" label="" v-model="phase1.txt" single-line hide-details />
        
        <v-radio-group v-model="phase2.txt" row @change="focusPhase2()" hide-details>
          <v-radio label="Round" value="Round " />
          <v-radio label="Quarters" value="Quarters" />
          <v-radio label="Semis" value="Semis" />
          <v-radio label="Finals" value="Finals" />
        </v-radio-group>
        <v-text-field ref="phase2Input" class="pa-0" label="" v-model="phase2.txt" single-line hide-details/>

        <v-divider />

        <option-title :title="$t('title.options')" :tooltip="$t('tooltip.clippath')"/>

        <v-row no-gutters>
          <v-col>
            <v-checkbox v-model="j1.isTagClipPath" :label="$t('label.clippath.player', {opt: '1'})" hide-details />
            <v-checkbox v-model="j2.isTagClipPath" :label="$t('label.clippath.player', {opt: '2'})" hide-details />
          </v-col>
          <v-col>
            <v-checkbox v-model="phase1.isClipPath" :label="$t('label.clippath.phase', {opt: '1'})" hide-details />
            <v-checkbox v-model="phase2.isClipPath" :label="$t('label.clippath.phase', {opt: '2'})" hide-details />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OptionTitle from "../ui/OptionTitle.vue";
import "vue-select/dist/vue-select.css";
import StockIconPicker from "../ui/StockIconPicker.vue";

import Utils from "../../utils"
export default {
  components: { OptionTitle, StockIconPicker },
  props: {
    title: {
      type: String,
      default: "Tab",
    },
    j1: Object,
    j2: Object,
    phase1: Object,
    phase2: Object,
    characters: Array,
  },
  data() {
    return {
      game: null,
    };
  },
  updated() {
    this.$nextTick(function () {
      if (this.$refs.charJ1bis) {
        this.$refs.charJ1bis.updateChar(this.j1.secondCharacter._character);
      }
      if (this.$refs.charJ2bis) {
        this.$refs.charJ2bis.updateChar(this.j2.secondCharacter._character);
      }
    })
  },
  methods: {
    focusPhase1() {
      this.$refs.phase1Input.focus();
    },
    focusPhase2() {
      this.$refs.phase2Input.focus();
    },
    selectChar(game, charJ1, charJ2){
      this.game = game;

      this.$refs.charJ1.selectChar(charJ1);
      this.$refs.charJ2.selectChar(charJ2);
      this.j1.filename = charJ1.getCharUrl();
      this.j2.filename = charJ2.getCharUrl();
    },
    reversePlayer() {
      // TAG
      let tagJ1 = this.j1.tag;
      let tagJ2 = this.j2.tag;
      this.j1.tag = tagJ2;
      this.j2.tag = tagJ1;

      // CHAR
      /* let charJ1 = this.j1.filename;
      let charJ2 = this.j2.filename; */
      let char1 = this.$refs.charJ1.crtCharacter;
      let char2 = this.$refs.charJ2.crtCharacter;

      /* this.j1.filename = charJ2;
      this.j2.filename = charJ1; */
      this.$refs.charJ1.selectChar(char2);
      this.$refs.charJ2.selectChar(char1);
      // TODO flip ?
    },
    reverseCharacter(player) {
      /* let charJ1 = player.filename;
      let charJ2 = player.filename; */

      let char1 = player === this.j1 ? this.$refs.charJ1.crtCharacter : this.$refs.charJ2.crtCharacter;
      let char2 = player === this.j1 ? this.$refs.charJ1bis.crtCharacter : this.$refs.charJ2bis.crtCharacter;

      /* player.filename = charJ2;
      player.filename = charJ1; */
      if (player === this.j1) {
        this.$refs.charJ1.selectChar(char2);
        this.$refs.charJ1bis.selectChar(char1);
      } else {
        this.$refs.charJ2.selectChar(char2);
        this.$refs.charJ2bis.selectChar(char1);
      }
    },
    updateGame(game) {
      this.game = game;

      let charJ1 = Utils.getRandomChar(game);
      let charJ2 = Utils.getRandomChar(game);

      if (charJ1) {
        this.j1.filename = charJ1.getCharUrl();
      } else {
        this.j1.filename = '';
      }
      this.$refs.charJ1.selectChar(charJ1);
      if (charJ2) {
        this.j2.filename = charJ2.getCharUrl();
      } else {
        this.j2.filename = '';
      }
      this.$refs.charJ2.selectChar(charJ2);
    }
  },
  mounted() {
    // this.$refs.mySelect.open = true
  },
};
</script>

<style>
.v-select .vs__dropdown-menu {
  display: block;
}
.stock-icon-selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.input-tag {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.versus {
  font-weight: bold;
  font-size: x-large;
}
</style>