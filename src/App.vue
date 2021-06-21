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
            <img :src="item.src" class="mr-2" width="32" height="32"> {{ item.name }}
          </template>
          <template v-slot:item="{ item }">
            <img :src="item.src" class="mr-2" width="32" height="32"> {{ item.name }}
          </template>
        </v-select>
      </v-toolbar-title>
      <v-toolbar-title>Thumbnail Generator</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn dark color="light-blue" @click="exportPNG">
        <v-icon dark left>mdi-image-move</v-icon>
        PNG
      </v-btn>

      <v-spacer></v-spacer>

      <!-- TODO components -->
      <v-btn icon @click.stop="showCredits = true">
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
      <v-dialog v-model="showCredits" max-width="500">
        <v-card>
          <v-card-title class="headline">Credits</v-card-title>
          <v-divider class="ma-2"></v-divider>

          <v-card-text style="height: 350px;">
            <div class="text-h6">Renders</div> 
            <!-- TODO icone jeu ? -->
            <v-divider class="ma-2"></v-divider>
            <v-btn text small color="primary" href="https://www.deviantart.com/rapbattleeditor0510/art/Logos-Super-Smash-Bros-Logo-Icons-737799238" target="_blank">
              <v-icon left>mdi-open-in-new</v-icon> Icônes Smash Bros
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
            </v-btn>- custom stock icones by me

            <div class="text-h6">Polices d'écritures</div>
            <v-divider class="ma-2"></v-divider>
            <v-btn text small color="primary" href="https://www.dafont.com/blacklisted.font" target="_blank" style="font-family: BlackListed">
              <v-icon left>mdi-open-in-new</v-icon> BlackListed
            </v-btn>
            <v-btn text small color="primary" href="https://www.dafont.com/heroes-legend.font" target="_blank" style="font-family: Heroes Legend">
              <v-icon left>mdi-open-in-new</v-icon> Heroes Legend
            </v-btn>
            <v-btn text small color="primary" href="https://www.dafont.com/android-assassin.font" target="_blank" style="font-family: Android Assassin">
              <v-icon left>mdi-open-in-new</v-icon> Android Assassin
            </v-btn>
            <v-btn text small color="primary" href="https://fontsgeek.com/fonts/Gotham-Black-Regular" target="_blank" style="font-family: Gotham Black Regular">
              <v-icon left>mdi-open-in-new</v-icon> Gotham Black
            </v-btn>
            <v-btn text small color="primary" href="https://www.dafontfree.net/freefonts-futura-f30.htm" target="_blank" style="font-family: Futura Bold">
              <v-icon left>mdi-open-in-new</v-icon> Futura
            </v-btn>
            <v-btn text small color="primary" href="https://www.dafontfree.net/freefonts-impact-f129612.htm" target="_blank" style="font-family: Impact">
              <v-icon left>mdi-open-in-new</v-icon> Impact
            </v-btn>
            <v-btn text small color="primary" href="https://www.dafont.com/blacklisted.font" target="_blank" style="font-family: BlackListed">
              <v-icon left>mdi-open-in-new</v-icon> BlackListed
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-divider class="mx-1" inset vertical></v-divider>

      <v-btn icon href="https://twitter.com/Kekwel_SSB" target="_blank">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn icon href="https://discordapp.com/users/283681024360054785" target="_blank">
        <v-icon>mdi-discord</v-icon>
      </v-btn>

      <v-divider class="mx-1" inset vertical></v-divider>

      <v-btn icon href="https://github.com/Kekwel/SmashThumbnailGenerator" target="_blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <!-- TODO autres icon ? langage ? -->
    </v-app-bar>
    <v-main style="background-color: black">
      <thumbnail ref="main" msg="Smash Thumbnail Generator" v-on:export="exportPNG($event)"/>
    </v-main>
  </v-app>
</template>

<script>
import Thumbnail from './components/Thumbnail.vue';
import Games from "./utils/games"

export default {
  name: 'App',
  components: { Thumbnail },
  data() {
    return {
      game: null,
      games: ['Smash Ultimate'],
      showCredits: false,
      panel: [0, 1]
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
    updateGame(id) {
      console.log(id, this.games);
      this.game = this.games[id];
      console.log('.. change game', this.game.name);
      this.$refs.main.updateGame(this.game);
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
</style>
