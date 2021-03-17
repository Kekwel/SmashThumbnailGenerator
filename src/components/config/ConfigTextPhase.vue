<template>
  <div>
    <option-title :title="'Phase ' + i + ' : ' + phase.txt"/>
    <!-- <hr /> TODO HR -->
    <!-- TODO padding -->
    <div class="columns is-gapless">
      <div class="column">
        Taille <input size="3" v-model="phase.size" /> <br />
        <input type="color" id="head" name="head" v-model="phase.color" />
        <label for="head"> {{ phase.color }}</label><br />

        <input type="checkbox" :id="idBold" v-model="phase.bold" />
        <label :for="idBold"> Gras </label>
        <input type="checkbox" :id="idItalic" v-model="phase.italic" />
        <label :for="idItalic"> Italique </label><br />
      </div>
      <div class="column">
        <!-- TODO component CustomButton ? -->
        <button @click="phase.align(null, 'top')" class="button is-small">
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.top"></svg-icon>
          </span></button
        ><button @click="phase.align(null, 'middle')" class="button is-small">
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.middle"></svg-icon>
          </span></button
        ><button @click="phase.align(null, 'bottom')" class="button is-small">
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.bottom"></svg-icon>
          </span>
        </button>
        <br />
        <button @click="phase.align('left')" class="button is-small">
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.left"></svg-icon>
          </span>
        </button>
        <button @click="phase.align('center')" class="button is-small">
          <span class="icon is-small">
            <svg-icon type="mdi" :path="icon.center"></svg-icon>
          </span>
        </button>
        <button @click="phase.align('right')" class="button is-small">
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
    phase: Object,
    i: Number,
  },
  data() {
    return {
      idBold: "italicPhase" + this.i,
      idItalic: "boldPhase" + this.i,
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