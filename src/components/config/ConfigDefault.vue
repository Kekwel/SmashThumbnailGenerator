<template>
  <div style="margin: 1em auto;">
    <option-title :title="'Texte'"/>
      <!-- <h4 class="subtitle is-4">Texte</h4> -->
    <div class="box">
      Taille <input size="3" v-model="text.size"/> <br />
      <input type="color" id="head" name="head" v-model="text.HEX" />
      <label for="head"> {{ text.HEX }} </label><br />
      <input type="checkbox" id="idBold" v-model="text.bold" />
      <label for="idBold"> Gras </label>
      <input type="checkbox" id="idItalic" v-model="text.italic" />
      <label for="idItalic"> Italique </label><br />

      <p class="apply-font" style="margin: 0.5em 1em;">Google Font</p>
      <font-picker :api-key="key" :active-font="fontFamily" @change="updateFont" class="font-select" /> <button class="button is-small is-danger" @click="forceUpdate">FORCE UPDATE</button>
      
      <p style="margin: 0.5em 1em;">Custom Font</p>
      <!-- <select v-model="fontFamily"> -->
      <div class="select">
        <select v-model="customFontFamily" @change="updateCustomFont">
          <option v-for="font in customFonts" :key="font.name" >
            {{ font.name }}
          </option>
        </select>
      </div>
    </div>
      <option-title :title="'Ombre Personnage'"/>
      <!-- <h4 class="subtitle is-4">Ombre Personnage</h4> -->
    <div class="box columns">
      <div class="column">
        <shadow-setting :title="'Joueur 1'" :i="1" :obj="j1"/>
        <shadow-setting :title="'Versus'" :i="7" :obj="versus"/>
      </div>
      <div class="column">
        <shadow-setting :title="'Joueur 2'" :i="2" :obj="j2"/>
      </div>
    </div>
      <!-- <h4 class="subtitle is-4">Ombre Bandeau</h4> -->
      <option-title :title="'Ombre Bandeau'"/>
    <div class="box columns">
      <div class="column">
        <shadow-setting :title="'Tag J1'" :i="3" :obj="j1.myTag"/>
        <shadow-setting :title="'Phase 1'" :i="5" :obj="phase1"/>
      </div>
      <div class="column">
        <shadow-setting :title="'Tag J2'" :i="4" :obj="j2.myTag"/>
        <shadow-setting :title="'Phase 2'" :i="6" :obj="phase2"/>
      </div>
    </div>
  </div>
</template>

<script>
import OptionTitle from '../ui/OptionTitle.vue';
import FontPicker from 'font-picker-vue';
import CustomFonts from "../../utils"
import ShadowSetting from '../ui/ShadowSetting.vue';
export default {
  components: { OptionTitle, FontPicker, ShadowSetting },
  props: {
    // TODO array object ?
    j1: Object,
    j2: Object,
    phase1: Object,
    phase2: Object,
    versus: Object
  },
  data() {
    return {
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