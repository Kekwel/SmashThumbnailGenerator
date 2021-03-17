<template>
  <div>
    <option-title :title="'Joueur ' + i + ' : ' + player.tag"/>
      <div v-if="!lockTag">
        <config-color
          :id="'j'+i"
          :title="'Tag'"
          :obj="player.myTag"
          :lockTag="lockTag"
        ></config-color>
      </div>
      <config-color
        :id="'j'+i"
        :title="'Fond'"
        :obj="player.bg"
        :lockTag="lockTag"
      ></config-color>
  </div>
</template>

<script>
import OptionTitle from '../ui/OptionTitle.vue';
import ConfigColor from "./ConfigColor.vue";
export default {
  components: { ConfigColor, OptionTitle },
  props: {
    player: Object,
    i: Number,
    lockTag: Boolean,
  },
};
</script>