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

      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-2" dark x-small fab color="lime" @click="randomPNG();" v-bind="attrs" v-on="on">
            <v-icon id="refresh-icon" :class="spin ? 'refresh' : 'refresh spin'" color="black">mdi-autorenew</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('tooltip.random') }}</span>
      </v-tooltip>

      <v-divider class="ml-2" inset vertical></v-divider>

      <!-- TODO caption button !-->
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-2" dark x-small fab color="teal" @click.stop="showQuickAdd = true" v-bind="attrs" v-on="on">
            <v-icon>mdi-format-list-numbered</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('tooltip.menu.quick') }}</span>
      </v-tooltip>
      <quick-add v-model="showQuickAdd"></quick-add>     
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

export default {
  name: 'App',
  components: { Thumbnail, CountryFlag, QuickAdd, Credits },
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
      spin: false
    }
  },
  created() {
    this.games = Games.GAMES;
    this.game = Games.ULT;
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
    },
    updateLocale(locale) {
      if (this.$i18n.locale !== locale)
        this.$i18n.locale = locale;
    },
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
</style>
