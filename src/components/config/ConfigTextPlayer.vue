<template>
  <div>
    <option-title :title="'Joueur ' + i"/>
    <!-- <hr /> TODO HR -->
    <!-- TODO padding -->
    <div class="columns is-gapless">
      <div class="column">
        Taille <input size="3" v-model="player.size" /> <br />
        <input type="color" id="head" name="head" v-model="player.color" />
        <label for="head"> {{ player.color }}</label><br />
        <input type="checkbox" :id="idBold" v-model="player.bold" />
        <label :for="idBold"> Gras </label>
        <br />
        <input type="checkbox" :id="idItalic" v-model="player.italic" />
        <label :for="idItalic"> Italique </label><br />
      </div>
      <div class="column">
        <!-- TODO component CustomButton ? -->
        <button @click="player.align(null, 'top'); activeV = 'top';" class="button is-small" :class="{'is-primary': isActiveV('top')}">
          <span class="icon">
            <svg-icon type="mdi" :path="icon.top"></svg-icon>
          </span>
        </button>
        <button @click="player.align(null, 'middle'); activeV = 'middle';" class="button is-small" :class="{'is-primary': isActiveV('middle')}">
          <span class="icon">
            <svg-icon type="mdi" :path="icon.middle"></svg-icon>
          </span>
        </button>
        <button @click="player.align(null, 'bottom'); activeV = 'bottom';" class="button is-small" :class="{'is-primary': isActiveV('bottom')}">
          <span class="icon">
            <svg-icon type="mdi" :path="icon.bottom"></svg-icon>
          </span>
        </button>
        <br />
        <button @click="player.align('left'); activeH = 'left';" class="button is-small" :class="{'is-primary': isActiveH('left')}">
          <span class="icon">
            <svg-icon type="mdi" :path="icon.left"></svg-icon>
          </span>
        </button>
        <button @click="player.align('center'); activeH = 'center';" class="button is-small" :class="{'is-primary': isActiveH('center')}">
          <span class="icon">
            <svg-icon type="mdi" :path="icon.center"></svg-icon>
          </span>
        </button>
        <button @click="player.align('right'); activeH = 'right';" class="button is-small" :class="{'is-primary': isActiveH('right')}">
          <span class="icon">
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
      activeV: 'middle',
      activeH: 'center',
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
  methods: {
    isActiveV(val) {
      return this.activeV === val;
    },
    isActiveH(val) {
      return this.activeH === val;
    },
  }
};
</script>