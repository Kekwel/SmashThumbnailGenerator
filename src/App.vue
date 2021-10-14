<template>
  <v-app>
    <!-- TODO img bg en fonction du jeu ? src="..." -->
    <v-app-bar app dense dark :src="game.bgSrc">
      <v-toolbar-title>
        <v-select style="width: 12em;" class="mr-2" 
            @change="updateGame"
            v-model="game" :items="games" item-text="name" item-value="id"
            filled dense dark hide-details color="light-blue" item-color="blue">
          <template v-slot:selection="{ item }">
            <img :src="item.src" class="mr-2" width="32" height="32" :style="item.id == 0 ? 'opacity: 0;' : ''"> {{ item.name }}
          </template>
          <template v-slot:item="{ item }">
            <img :src="item.src" class="mr-2" width="32" height="32" :style="item.id == 0 ? 'opacity: 0;' : ''"> {{ item.name }}
          </template>
        </v-select>
      </v-toolbar-title>
      <v-toolbar-title>Thumbnail Generator v1.1.0</v-toolbar-title>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-2" dark x-small fab color="lime" @click="randomPNG();" v-bind="attrs" v-on="on">
            <v-icon id="refresh-icon" :class="spin ? 'refresh' : 'refresh spin'" color="black">mdi-autorenew</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('tooltip.random') }}</span>
      </v-tooltip>

      <v-divider class="ml-2" inset vertical></v-divider>

      <!-- TODO caption button ! btn prev/next -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <div>
            <div v-if="quickCrt" class="ml-2 quick-menu">
              <!-- BTN PREV -->
              <v-btn class="mx-2" dark x-small fab color="teal" :disabled="!hasQuickPrev" @click="quickPrev">
                <v-icon>mdi-arrow-left-bold</v-icon>
              </v-btn>
              <!-- ITEM COURANT -->
              <div class="quick-menu-vs" @click.stop="showQuickAdd = true" v-bind="attrs" v-on="on">
                <stock-icon class="mx-1" :width="28" :src="quickCrt.j1.characters.firstStockUrl" /> <div class="text-button">VS</div> <stock-icon class="mx-1" :width="28" :src="quickCrt.j2.characters.firstStockUrl" />
              </div>
              <!-- BTN NEXT -->
              <v-btn class="mx-2" dark x-small fab color="teal" :disabled="!hasQuickNext" @click="quickNext">
                <v-icon>mdi-arrow-right-bold</v-icon>
              </v-btn>
            </div>
            <v-btn v-else class="ml-2" dark x-small fab color="teal" @click.stop="showQuickAdd = true" v-bind="attrs" v-on="on">
              <v-icon>mdi-format-list-numbered</v-icon>
            </v-btn>
          </div>
        </template>
        <span>{{ $t('tooltip.menu.quick') }}</span>
      </v-tooltip>
      <quick-add ref="quickAdd" v-model="showQuickAdd" v-on:quick-infos="updateQuickList"></quick-add>
      <v-spacer></v-spacer>

      <v-btn dark color="light-blue" @click="exportPNG">
        <v-icon dark left>mdi-image-move</v-icon>
        PNG
      </v-btn>

      <v-spacer></v-spacer>

      <!-- TODO components -->
      <v-select style="width: 5em; flex: none;" class="mr-2" 
        @change="updateLocale"
        v-model="$i18n.locale" :items="locales" item-text="locale" item-value="locale"
        filled dense dark hide-details color="light-red" item-color="red">
        <template v-slot:selection="{ item }">
          <country-flag :country='item.flag'/>
        </template>
        <template v-slot:item="{ item }">
          <country-flag :country='item.flag'/>
        </template>
      </v-select>
      <v-divider class="mx-1" inset vertical></v-divider>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click.stop="showCredits = true" v-bind="attrs" v-on="on">
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('tooltip.menu.credits') }}</span>
      </v-tooltip>
      <credits v-model="showCredits"></credits>
      <v-divider class="mx-1" inset vertical></v-divider>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon href="https://twitter.com/Kekwel_SSB" target="_blank" v-bind="attrs" v-on="on">
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('tooltip.menu.twitter') }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon href="https://discordapp.com/users/283681024360054785" target="_blank" v-bind="attrs" v-on="on">
            <v-icon>mdi-discord</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('tooltip.menu.discord') }}</span>
      </v-tooltip>

      <v-divider class="mx-1" inset vertical></v-divider>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon href="https://github.com/Kekwel/SmashThumbnailGenerator" target="_blank" v-bind="attrs" v-on="on">
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('tooltip.menu.github') }}</span>
      </v-tooltip>
      <!-- TODO autres icon ? -->
    </v-app-bar>
    <v-main style="background-color: black">
      <thumbnail ref="main" msg="Smash Thumbnail Generator" v-on:export="exportPNG($event)"/>
    </v-main>
  </v-app>
</template>

<script>
import Thumbnail from './components/Thumbnail.vue';
import Games from "./utils/games"
import CountryFlag from 'vue-country-flag'
import QuickAdd from './components/ui/dialog/QuickAdd.vue';
import Credits from './components/ui/dialog/Credits.vue';
import StockIcon from './components/ui/StockIcon.vue';

export default {
  name: 'App',
  components: { Thumbnail, CountryFlag, QuickAdd, Credits, StockIcon },
  data() {
    return {
      game: null,
      games: ['Smash Ultimate'],
      showQuickAdd: false,
      showCredits: false,
      panel: [0, 1],
      locales: [{
        locale: 'fr',
        flag: 'fr'
      }, {
        locale: 'en',
        flag: 'gb'
      }],
      spin: false,
      quickList: [],
      quickCrt: null,
    }
  },
  computed: {
    hasQuickPrev: function() {
      // si l'index de l'item courant -1 existe
      return this.quickList.indexOf(this.quickCrt) - 1 >= 0;
    },
    hasQuickNext: function() {
      // si l'index de l'item courant -1 existe
      return this.quickList.indexOf(this.quickCrt) + 1 < this.quickList.length;
    }
  },
  created() {
    this.games = Games.GAMES;
    this.game = Games.ULT;
  },
  mounted() {
      this.$refs.quickAdd.updateCharacters();
    
  },
  methods: {
    exportPNG() {
      this.$refs.main.exportPNG();
    },
    randomPNG() {
      this.updateGame(this.game.id);
      // spin icon
      this.spin = !this.spin;
    },
    updateGame(id) {
      this.game = this.games[id];

      console.log('.. change game', this.game.name);
      this.$refs.main.updateGame(this.game);
      this.$refs.quickAdd.updateCharacters();
    },
    updateLocale(locale) {
      if (this.$i18n.locale !== locale)
        this.$i18n.locale = locale;
    },
    // ** QUICK LIST ** //
    updateQuickList(infos) {
      // infos = array -> id, p1 {tag, char}, p2 {...}, phase
      this.quickList = infos;
      this.quickCrt = infos[0];

      // set info
      this.$refs.main.importInfos(this.quickCrt);
      // update char select
      this.$refs.main.$refs.confPlayer.selectQuickChar(this.quickCrt.j1.characters.game, this.quickCrt.j1, this.quickCrt.j2);

    },
    quickPrev() {
      this.quickCrt = this.quickList[this.quickList.indexOf(this.quickCrt) - 1];
      this.$refs.main.importInfos(this.quickCrt);
    },
    quickNext() {
      this.quickCrt = this.quickList[this.quickList.indexOf(this.quickCrt) + 1];
      this.$refs.main.importInfos(this.quickCrt);
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.v-toolbar__image {
  opacity: 0.15;
}
.refresh{
  transform: rotate(0deg);
  transition: transform 0.5s linear;
}
.refresh.spin{
  transform: rotate(360deg);
  transition: transform 0.5s linear;
}

.quick-menu {
  display: flex;
  align-items: center;
}
.quick-menu-vs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: solid aqua 1px;
  border-radius: 5px;
  background-color: teal;
}
.quick-menu-vs:hover {
  cursor: pointer;
  border-radius: 5px;
  color: black;
  // light-blue lighten-4
  background-color: #B3E5FC;
}
</style>
