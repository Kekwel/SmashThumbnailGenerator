<template>
  <div>
    <h3>
      Joueur {{ i }} : <b>{{ player.tag }}</b>
    </h3>
    <!-- <hr /> TODO HR -->
    <!-- TODO padding -->
    Taille <input v-model="player.tagSize" /> <br />
    Couleur <input v-model="player.colorTag" /> <br />
    <input type="checkbox" :id="idBold" v-model="player.tagBold" />
    <label :for="idBold"> Gras </label>
    <input type="checkbox" :id="idItalic" v-model="player.tagItalic" />
    <label :for="idItalic"> Italique </label><br />
    
    <!-- TODO component CustomButton ? -->
    <button @click="player.alignTag(null, 'top')" class="button is-small">
      <span class="icon is-small">
        <svg-icon type="mdi" :path="icon.top"></svg-icon>
      </span>
    </button><button @click="player.alignTag(null, 'middle')" class="button is-small">
      <span class="icon is-small">
        <svg-icon type="mdi" :path="icon.middle"></svg-icon>
      </span>
    </button><button @click="player.alignTag(null, 'bottom')" class="button is-small">
      <span class="icon is-small">
        <svg-icon type="mdi" :path="icon.bottom"></svg-icon>
      </span>
    </button>
    <br/>
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
export default {
  components: { SvgIcon },
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