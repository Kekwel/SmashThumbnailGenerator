<template>
  <v-container class="pa-2">
    <v-row no-gutters>
      <v-col>
        <option-title class="pb-4" title="Par défaut" />
        <v-row no-gutters>
          <v-col>
            <v-text-field style="width: 3.5em;" v-model="text.size" label="Taille" dense hide-details />
            <input type="color" id="head" name="head" v-model="text.HEX" />
            <label for="head"> {{ text.HEX }} </label><br />

            <v-checkbox v-model="text.bold" label="Gras" hide-details dense></v-checkbox>
            <v-checkbox v-model="text.italic" label="Italique" hide-details dense></v-checkbox>
          </v-col>

          <v-col>
            <p class="apply-font" style="margin: 0.5em 1em;">Google Font</p>
            <font-picker :api-key="key" :active-font="fontFamily" @change="updateFont" class="font-select" /> 
            
            <v-btn @click="forceUpdate" class="pa-1 no-min-width" color="error" dark small>
              <v-icon dense dark>mdi-refresh</v-icon>FORCE UPDATE
            </v-btn>
            
            <v-select class="mt-4" :items="customFonts" item-text="name" label="Custom Font" dense hide-details v-model="customFontFamily" @change="updateCustomFont"></v-select>
          </v-col>
        </v-row>

        <v-divider class="my-2"/>

        <v-row no-gutters>
          <v-col>
            <config-text-player :title="'Joueur 1'" :player="j1" />
          </v-col>

          <v-divider inset vertical class="mx-1"/>

          <v-col>
            <config-text-player :title="'Joueur 2'" :player="j2" />
          </v-col>
        </v-row>

        <v-divider class="my-2"/>

        <v-row no-gutters>
          <v-col>
            <config-text-player :title="'Phase 1'" :player="phase1" />
          </v-col>

          <v-divider inset vertical class="mx-1"/>

          <v-col>
            <config-text-player :title="'Phase 2'" :player="phase2" />
          </v-col>
        </v-row>

        <v-divider class="my-2"/>

        <v-row no-gutters>
          <v-col>
            <config-text-player :title="'Versus'" :player="versus" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OptionTitle from "../ui/OptionTitle.vue";
import FontPicker from 'font-picker-vue';
import CustomFonts from "../../utils"
import ConfigTextPlayer from "./ConfigTextPlayer.vue";
export default {
  components: { ConfigTextPlayer, FontPicker, OptionTitle },
  props: {
    j1: Object,
    j2: Object,
    phase1: Object,
    phase2: Object,
    versus: Object,
  },
  data() {
    return {
      isActive: true,
      text: {
        size: 40,
        HEX: "#000000",
        bold: false,
        italic: false,
      },
      key: 'AIzaSyBK9DgEY5MY3DNBps6r9vYbKeJ7fXW6HmA',
      fontFamily: '',
      customFontFamily: 'Futura Bold',
      customFonts: CustomFonts.FONTS
    };
  },
  updated() {
    this.updateAll();
  },
  methods: {
    updateText(text) {
      // TODO ?
      if (text !== this.versus) {
        if (this.text.size != text.size) {
            text.size = this.text.size;
          text.align();
        }
        text.color = this.text.HEX;
        text.bold = this.text.bold;
        text.italic = this.text.italic;
      } else {
        // TODO
        //this.versus.text.center();
      }
    },
    updateCustomFont() {
      this.j1.font = this.customFontFamily;
      this.j2.font = this.customFontFamily;
      this.versus.font = this.customFontFamily;
      this.phase1.font = this.customFontFamily;
      this.phase2.font = this.customFontFamily;
    },
    updateFont(font) {
      this.fontFamily = font.family;
      this.j1.font = this.fontFamily;
      this.j2.font = this.fontFamily;
      this.versus.font = this.fontFamily;
      this.phase1.font = this.fontFamily;
      this.phase2.font = this.fontFamily;
    },
    forceUpdate() {
      this.updateAll();
    },
    updateAll() {
      this.updateText(this.j1);
      this.updateText(this.j2);
      this.updateText(this.versus);
      this.updateText(this.phase1);
      this.updateText(this.phase2);
    },
  }
};
</script>

<style>
.font-select ul {
  flex-direction: column;
}
</style>