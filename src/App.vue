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
      <v-toolbar-title>Thumbnail Generator v1.0.2</v-toolbar-title>

      
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-2" dark x-small fab color="lime" @click="randomPNG();" v-bind="attrs" v-on="on">
            <v-icon id="refresh-icon" :class="spin ? 'refresh' : 'refresh spin'" color="black">mdi-autorenew</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('tooltip.random') }}</span>
      </v-tooltip>
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
      <v-dialog v-model="showCredits" max-width="700">
        <v-card>
          <v-card-title class="headline">Credits</v-card-title>
          <v-divider class="ma-2"></v-divider>

          <v-card-text>
            <div class="text-h6">Renders</div> 
            <!-- TODO icone jeu ? -->
            <v-btn text small color="primary" href="https://www.deviantart.com/rapbattleeditor0510/art/Logos-Super-Smash-Bros-Logo-Icons-737799238" target="_blank">
              <v-icon left>mdi-open-in-new</v-icon> {{ $t("credits.icon") }}
            </v-btn><br/>
            <v-btn text small color="primary" href="https://www.spriters-resource.com/nintendo_switch/supersmashbrosultimate/" target="_blank">
              <v-icon left>mdi-open-in-new</v-icon> Super Smash Bros Ultimate
            </v-btn><br/>
            <v-btn text small color="primary" href="https://www.reddit.com/r/smashbros/comments/4khef3/melee_full_classic_mode_poses_good_for_streams/" target="_blank">
              <v-icon left>mdi-open-in-new</v-icon> Super Smash Bros Melee Classic mode poses
            </v-btn><br/>
            <v-btn text small color="primary" href="https://assets.melee.tv/" target="_blank">
              <v-icon left>mdi-open-in-new</v-icon> Super Smash Bros Melee HD
            </v-btn><br/>
            <v-btn text small color="primary" href="https://projectplusgame.com/download/" target="_blank">
              <v-icon left>mdi-open-in-new</v-icon> Project +
            </v-btn><br/>
            <v-btn text small color="primary" href="https://drive.google.com/drive/folders/1SMjNgynt7c-VdKJJ9_wTcKSasS2NcVSF" target="_blank">
              <v-icon left>mdi-open-in-new</v-icon> Rivals of Aether
            </v-btn>{{ $t("credits.custom") }}<br />
            <v-btn text small color="primary" href="https://github.com/joaorb64/StreamHelperAssets" target="_blank">
              <v-icon left>mdi-open-in-new</v-icon> Nickelodeon All Star Brawl (and others..)
            </v-btn>Thanks you João !<br/>
            <v-btn text small color="primary" href="https://www.reddit.com/user/CandyDrop5/" target="_blank">
              <v-icon left>mdi-open-in-new</v-icon> Nickelodeon All Star Brawl SSBU-like stock icons 
            </v-btn><br/>
            {{ $t("credits.characters") }}

            <v-divider class="ma-2"></v-divider>
            <div class="text-h6">{{ $t("credits.fonts") }}</div>

            <v-btn text small color="primary" href="https://www.dafontfree.net/freefonts-futura-f30.htm" target="_blank" style="font-family: Futura Bold">
              <v-icon left>mdi-open-in-new</v-icon> Futura
            </v-btn>
            <v-btn text small color="primary" href="https://www.dafontfree.net/freefonts-impact-f129612.htm" target="_blank" style="font-family: Impact">
              <v-icon left>mdi-open-in-new</v-icon> Impact
            </v-btn>
            <v-btn text small color="primary" href="https://www.dafont.com/blacklisted.font" target="_blank" style="font-family: BlackListed">
              <v-icon left>mdi-open-in-new</v-icon> BlackListed
            </v-btn>
            <v-btn text small color="primary" href="https://www.dafont.com/android-assassin.font" target="_blank" style="font-family: Android Assassin">
              <v-icon left>mdi-open-in-new</v-icon> Android Assassin
            </v-btn>
            <v-btn text small color="primary" href="https://fontsgeek.com/fonts/Gotham-Black-Regular" target="_blank" style="font-family: Gotham Black Regular">
              <v-icon left>mdi-open-in-new</v-icon> Gotham Black
            </v-btn>
            <v-btn text small color="primary" href="https://www.dafont.com/heroes-legend.font" target="_blank" style="font-family: Heroes Legend">
              <v-icon left>mdi-open-in-new</v-icon> Heroes Legend
            </v-btn>

            <v-divider class="ma-2"></v-divider>
            Made with <a href="https://vuejs.org/" target="_blank"><img :src="getVuejsSVG()" width="16" height="16"/>VueJS</a> 
            and <a href="https://v2.vuetifyjs.com/" target="_blank"><img :src="getVuetifySVG()" width="16" height="16"/>Vuetify</a>
            by Kekwel (c'est moi)
          </v-card-text>
        </v-card>
      </v-dialog>
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
import Utils from "./utils"
import CountryFlag from 'vue-country-flag'

export default {
  name: 'App',
  components: { Thumbnail, CountryFlag },
  data() {
    return {
      game: null,
      games: ['Smash Ultimate'],
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
    getVuejsSVG() {
      return Utils.getRoot() + 'img/icons/vuejs.svg';
    },
    getVuetifySVG() {
      return Utils.getRoot() + 'img/icons/vuetify.svg';
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
