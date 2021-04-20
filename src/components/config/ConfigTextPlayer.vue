<template>
  <div>
    <option-title :title="'Joueur ' + i + ' : ' + player.tag"/>
    <!-- <hr /> TODO HR -->
    <!-- TODO padding -->
    <div class="columns is-gapless">
      <div class="column">
        Taille <input size="3" v-model="player.size" /> <br />
        <input type="color" id="head" name="head" v-model="player.color" />
        <label for="head"> {{ player.color }}</label><br />
        <input type="checkbox" :id="idBold" v-model="player.bold" />
        <label :for="idBold"> Gras </label>
        <input type="checkbox" :id="idItalic" v-model="player.italic" />
        <label :for="idItalic"> Italique </label><br />
      </div>
      <div class="column">
        <!-- TODO component CustomButton ? -->
        <button @click="player.align(null, 'top')" class="button is-small">
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.top"></svg-icon>
          </span></button
        ><button
          @click="player.align(null, 'middle')"
          class="button is-small"
        >
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.middle"></svg-icon>
          </span></button
        ><button
          @click="player.align(null, 'bottom')"
          class="button is-small"
        >
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.bottom"></svg-icon>
          </span>
        </button>
        <br />
        <button @click="player.align('left')" class="button is-small">
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.left"></svg-icon>
          </span>
        </button>
        <button @click="player.align('center')" class="button is-small">
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.center"></svg-icon>
          </span>
        </button>
        <button @click="player.align('right')" class="button is-small">
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