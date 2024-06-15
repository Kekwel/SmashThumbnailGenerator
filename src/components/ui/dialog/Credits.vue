<template>
  <v-dialog v-model="show" max-width="700">
    <v-card>
      <v-card-title class="headline">Credits</v-card-title>
      <v-divider class="ma-2"></v-divider>

      <v-card-text>
        <div class="text-h6">Renders</div>
        <!-- TODO icone jeu ? -->
        <v-btn
          text
          small
          color="primary"
          href="https://www.deviantart.com/rapbattleeditor0510/art/Logos-Super-Smash-Bros-Logo-Icons-737799238"
          target="_blank"
        >
          <v-icon left>mdi-open-in-new</v-icon> {{ $t("credits.icon") }} </v-btn
        ><br />
        <v-btn
          text
          small
          color="primary"
          href="https://www.spriters-resource.com/nintendo_switch/supersmashbrosultimate/"
          target="_blank"
        >
          <v-icon left>mdi-open-in-new</v-icon> Super Smash Bros Ultimate </v-btn
        ><br />
        <v-btn
          text
          small
          color="primary"
          href="https://www.reddit.com/r/smashbros/comments/4khef3/melee_full_classic_mode_poses_good_for_streams/"
          target="_blank"
        >
          <v-icon left>mdi-open-in-new</v-icon> Super Smash Bros Melee Classic
          mode poses </v-btn
        ><br />
        <v-btn
          text
          small
          color="primary"
          href="https://assets.melee.tv/"
          target="_blank"
        >
          <v-icon left>mdi-open-in-new</v-icon> Super Smash Bros Melee HD </v-btn
        ><br />
        <v-btn
          text
          small
          color="primary"
          href="https://projectplusgame.com/download/"
          target="_blank"
        >
          <v-icon left>mdi-open-in-new</v-icon> Project + </v-btn
        ><br />
        <v-btn
          text
          small
          color="primary"
          href="https://drive.google.com/drive/folders/1SMjNgynt7c-VdKJJ9_wTcKSasS2NcVSF"
          target="_blank"
        >
          <v-icon left>mdi-open-in-new</v-icon> Rivals of Aether </v-btn
        >{{ $t("credits.custom") }}<br />
        <v-btn
          text
          small
          color="primary"
          href="https://github.com/joaorb64/StreamHelperAssets"
          target="_blank"
        >
          <v-icon left>mdi-open-in-new</v-icon> Nickelodeon All Star Brawl (and
          others..) </v-btn
        >Thanks you João !<br />
        <v-btn
          text
          small
          color="primary"
          href="https://www.reddit.com/user/CandyDrop5/"
          target="_blank"
        >
          <v-icon left>mdi-open-in-new</v-icon> Nickelodeon All Star Brawl
          SSBU-like stock icons </v-btn
        ><br />
        {{ $t("credits.characters") }}

        <v-divider class="ma-2"></v-divider>
        <div class="text-h6">{{ $t("credits.fonts") }}</div>

        <v-btn
          text
          small
          color="primary"
          href="https://www.dafontfree.net/freefonts-futura-f30.htm"
          target="_blank"
          style="font-family: Futura Bold"
        >
          <v-icon left>mdi-open-in-new</v-icon> Futura
        </v-btn>
        <v-btn
          text
          small
          color="primary"
          href="https://www.dafontfree.net/freefonts-impact-f129612.htm"
          target="_blank"
          style="font-family: Impact"
        >
          <v-icon left>mdi-open-in-new</v-icon> Impact
        </v-btn>
        <v-btn
          text
          small
          color="primary"
          href="https://www.dafont.com/blacklisted.font"
          target="_blank"
          style="font-family: BlackListed"
        >
          <v-icon left>mdi-open-in-new</v-icon> BlackListed
        </v-btn>
        <v-btn
          text
          small
          color="primary"
          href="https://www.dafont.com/android-assassin.font"
          target="_blank"
          style="font-family: Android Assassin"
        >
          <v-icon left>mdi-open-in-new</v-icon> Android Assassin
        </v-btn>
        <v-btn
          text
          small
          color="primary"
          href="https://fontsgeek.com/fonts/Gotham-Black-Regular"
          target="_blank"
          style="font-family: Gotham Black Regular"
        >
          <v-icon left>mdi-open-in-new</v-icon> Gotham Black
        </v-btn>
        <v-btn
          text
          small
          color="primary"
          href="https://www.dafont.com/heroes-legend.font"
          target="_blank"
          style="font-family: Heroes Legend"
        >
          <v-icon left>mdi-open-in-new</v-icon> Heroes Legend
        </v-btn>

        <v-divider class="ma-2"></v-divider>
        Made with
        <a href="https://vuejs.org/" target="_blank"
          ><img :src="getVuejsSVG()" width="16" height="16" />VueJS</a
        >
        and
        <a href="https://v2.vuetifyjs.com/" target="_blank"
          ><img :src="getVuetifySVG()" width="16" height="16" />Vuetify</a
        >
        by Kekwel (c'est moi)
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Utils from "../../../utils"
export default {
  props: {
    value: Boolean,
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    getVuejsSVG() {
      return Utils.getRoot() + 'img/icons/vuejs.svg';
    },
    getVuetifySVG() {
      return Utils.getRoot() + 'img/icons/vuetify.svg';
    },
  }
};
</script>
