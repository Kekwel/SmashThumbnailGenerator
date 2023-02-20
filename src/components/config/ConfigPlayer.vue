<template>
  <!-- Joueurs -->
  <v-container>
    <v-row no-gutters>
      <v-col>
        <option-title :title="$t('title.match')" />
        <v-text-field v-model="j1.tag" color="red" background-color="red lighten-5" dense shaped filled hide-details onClick="this.select();" />
        <!-- TODO composant pour ajouter "autant" qu'on veut -->
        <div v-for="(character, index) in characters_j1" :key="index">
            <!-- TODO taille select -->
          <v-select class="my-2" :options="icons" label="name" v-model="character.info">
            <!-- TODO taille img -->
            <template #selected-option="{ name, url }">
              <div class="stock-icon-selected">
                <img class="mr-1" width="28" :src="url"/>
                <span>{{name}}</span>
              </div>
            </template>
            
            <template #option="{ name, url }">
              <div class="stock-icon-selected">
                <img class="mr-1" width="28" :src="url"/>
                <span>{{name}}</span>
              </div>
            </template>
          </v-select>

          <v-select class="my-2" :options="character.info.skins" label="name" v-model="character.info.skin" @input="updateChar(index)">
            <template #selected-option="{ name, download_url }">
              <div class="stock-icon-selected">
                <img class="mr-1" width="28" :src="download_url"/>
                <span>{{ character.info.skins.findIndex(el => el.name === name) }}</span>
              </div>
            </template>
            
            <template #option="{ name, download_url }">
              <div class="stock-icon-selected">
                <img class="mr-1" width="28" :src="download_url"/>
                <span>{{ character.info.skins.findIndex(el => el.name === name) }}</span>
              </div>
            </template>
          </v-select>
        </div>
        <stock-icon-picker ref="charJ1" :characters="characters" :player="j1" :image="j1.firstCharacter" />
        <stock-icon-picker v-if="j1.charArray.length > 1" ref="charJ1bis" :characters="characters" :player="j1" :image="j1.secondCharacter" isSecond />
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
        <stock-icon-picker v-if="j2.charArray.length > 1" ref="charJ2bis" :characters="characters" :player="j2" :image="j2.secondCharacter" isSecond />
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
import vSelect from "vue-select";
import axios from 'axios';
import OptionTitle from "../ui/OptionTitle.vue";
import "vue-select/dist/vue-select.css";
import StockIconPicker from "../ui/StockIconPicker.vue";

import Utils from "../../utils"
import { Character } from '../js/Character';
export default {
  components: { OptionTitle, StockIconPicker, vSelect },
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
      characters_j1: [{ info: {} }],
      // github
      config: {},
      configAsset: {},
      game_github: null,
      icons: [],
      crt_test_github: null
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
    async selectChar(game, charJ1, charJ2){
      const gameAPI = 'ssbu'
      // const assetName = 'base_files'
      // recup config
        // recup tous les persos (dans "character_to_codename")
      const config = await this.getConfig(gameAPI);
        // recup config base_files/icon (prefix et postfix)
      const configAsset = await this.getConfigAsset(gameAPI);
      const prefix = configAsset.prefix ?? '';
      const postfix = configAsset.postfix ?? '';

      // filtre pour ne recup que les "base_files/icon"
      let iconsFiles = await this.getAsset(gameAPI);

      //console.log(this.config);
      //console.log(this.configAsset);
      Object.entries(config["character_to_codename"]).forEach(([name, charData]) => {
        //console.log(name, charData);
        // tous les assets d'un perso
        let characterAssets = iconsFiles.filter(entry => entry.name.startsWith(`${prefix}${charData.codename}${postfix}`));
        //console.log(characterAssets);
        // on prend le 1er
        let firstChar = characterAssets[0]
        if (firstChar) {
          // TODO a revoir
          if (!firstChar.name.endsWith("webm")) {
            this.icons.push({
              // width / height ?
              codename: charData.codename,
              name: name,
              url: firstChar.download_url,
              skins: characterAssets
            })
          }
        }
      });

      // --- old
      this.game = game;

      this.$refs.charJ1.selectChar(charJ1);
      this.$refs.charJ2.selectChar(charJ2);
      this.j1.filename = charJ1.getCharUrl();
      this.j2.filename = charJ2.getCharUrl();
    },
    selectQuickChar(game, j1, j2){
      this.game = game;

      this.$refs.charJ1.selectQuickChar(j1);
      this.$refs.charJ2.selectQuickChar(j2);
      this.j1.filename = j1.url;
      this.j2.filename = j2.url;

      // si plusieurs chars, o najoute
      if (j1.duo?.length > 1) {
        let j = j1;
        let quickChar = new Character(j.characters.game, '1', j.duo[1].name, j.duo[1].formatName, j.duo[1].maxRow, j.duo[1].maxCol)
        quickChar.row = j.duo[1].row;
        quickChar.col = j.duo[1].col;
        this.j1.addImg(j1.characters.game, quickChar);
      }
      if (j2.duo?.length > 1) {
        let j = j2;
        let quickChar = new Character(j.characters.game, '2', j.duo[1].name, j.duo[1].formatName, j.duo[1].maxRow, j.duo[1].maxCol)
        quickChar.row = j.duo[1].row;
        quickChar.col = j.duo[1].col;
        this.j2.addImg(j2.characters.game, quickChar);
      }
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
    async updateGame(game) {
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
    },
    async getConfig(game, asset = 'base_files') {
      const response = await axios.get(`https://raw.githubusercontent.com/joaorb64/StreamHelperAssets/main/games/${game}/${asset}/config.json`)
      return response.data;
    },
    async getConfigAsset(game, asset = "base_files/icon") {
      const response = await axios.get(`https://raw.githubusercontent.com/joaorb64/StreamHelperAssets/main/games/${game}/${asset}/config.json`)
      this.configAsset = response.data;
      return response.data;
    },
    async getAsset(game, asset = "base_files/icon") {
      let response = await axios.get(`https://api.github.com/repos/joaorb64/StreamHelperAssets/contents/games/${game}/${asset}`)
      return response.data;
    },
    async updateChar(index) {
      // skin : url base_files/icon,
      // index: index correspond au n° du perso du joueurs (0 = 1er perso, 1 = 2eme perso etc)
      //console.log(index, skin);
      let crtChar = this.characters_j1[index];
      console.log(crtChar);
      console.log("--");
      //console.log(this.j1.charArray[index])
      
      // TODO recup tout les asset possible
      const game = 'ssbu'
      const asset = 'full'
      const config = await this.getConfig(game);
      const configAsset = await this.getConfigAsset(game, asset);
      const iconsFiles = await this.getAsset(game, asset);
      
      const prefix = configAsset.prefix ?? '';
      const postfix = configAsset.postfix ?? '';

      // TODO ne recup QUE l'image du skin selectionné à l'index index
      // TODO pb avce smash et le _0X.png ...
      Object.entries(config["character_to_codename"]).forEach(([name, charData]) => {
        // tous les assets d'un perso
        console.log(`search ${prefix}${crtChar.info.codename}${postfix}`);
        let characterAssets = iconsFiles.filter(entry => entry.name.startsWith(`${prefix}${crtChar.info.codename}${postfix}`));
        //console.log(characterAssets);
        // on prend le 1er
        let firstChar = characterAssets[0]
        if (firstChar) {
          console.log('YES ', firstChar, name, charData);
        }
      }) 
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