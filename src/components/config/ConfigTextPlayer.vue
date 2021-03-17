<template>
  <div>
    <option-title :title="'Joueur ' + i + ' : ' + player.tag"/>
    <!-- <hr /> TODO HR -->
    <!-- TODO padding -->
    <div class="columns is-gapless">
      <div class="column">
        Taille <input size="3" v-model="player.tagSize" /> <br />
        <input type="color" id="head" name="head" v-model="player.colorTag" />
        <label for="head"> {{ player.colorTag }}</label
        ><br />
        <input type="checkbox" :id="idBold" v-model="player.tagBold" />
        <label :for="idBold"> Gras </label>
        <input type="checkbox" :id="idItalic" v-model="player.tagItalic" />
        <label :for="idItalic"> Italique </label><br />
      </div>
      <div class="column">
        <!-- TODO component CustomButton ? -->
        <button @click="player.alignTag(null, 'top')" class="button is-small">
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.top"></svg-icon>
          </span></button
        ><button
          @click="player.alignTag(null, 'middle')"
          class="button is-small"
        >
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.middle"></svg-icon>
          </span></button
        ><button
          @click="player.alignTag(null, 'bottom')"
          class="button is-small"
        >
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.bottom"></svg-icon>
          </span>
        </button>
        <br />
        <button @click="player.alignTag('left')" class="button is-small">
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.left"></svg-icon>
          </span>
        </button>
        <button @click="player.alignTag('center')" class="button is-small">
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.center"></svg-icon>
          </span>
        </button>
        <button @click="player.alignTag('right')" class="button is-small">
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.right"></svg-icon>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiFormatAlignCenter,
  mdiFormatAlignLeft,
  mdiFormatAlignRight,
  mdiFormatVerticalAlignBottom,
  mdiFormatVerticalAlignCenter,
  mdiFormatVerticalAlignTop,
} from "@mdi/js";
import OptionTitle from '../ui/OptionTitle.vue';
export default {
  components: { SvgIcon, OptionTitle },
  props: {
    player: Object,
    i: Number,
  },
  data() {
    return {
      idBold: "italicPlayer" + this.i,
      idItalic: "boldPlayer" + this.i,
      icon: {
        left: mdiFormatAlignLeft,
        center: mdiFormatAlignCenter,
        right: mdiFormatAlignRight,
        top: mdiFormatVerticalAlignTop,
        middle: mdiFormatVerticalAlignCenter,
        bottom: mdiFormatVerticalAlignBottom,
      },
    };
  },
};
</script>